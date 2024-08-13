'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { lightningChart, Themes, emptyLine, AutoCursorModes, AxisTickStrategies, ColorHEX, SolidFill, PointShape } from '@lightningchart/lcjs';
import { ecg, ecgNull, spo2 } from '@/data/data.medical_result';

interface ECGDataPoint {
  x: number;
  y: number;
}

interface ChannelInfo {
  name: string;
  yMin: number;
  yMax: number;
}

export default function SPO() {

  const chartRef = useRef<HTMLDivElement | null>(null);

  setInterval(() => {

  }, 5000)

  async function fetchData() {
    // const response = await fetch('http://localhost:3333/v1/ecg?page=0&limit=10');
    // const testData = await response.json();
    let ecgData: any[]
    let i = 1
    // let lengthData = testData.length | 250
    let lengthData = 250
    ecgData = spo2

    setInterval(() => {
      console.log(i);

      // if (testData) {
      //   ecgData = testData[i].ecg
      //   i += 1
      //   if (i === lengthData) {
      //     i = 0
      //   }
      // }

    }, 10000)

    const channelCount = 1;
    const dataRateHz = 250;
    const xViewMs = 15 * 250;
    const CHANNELS: ChannelInfo[] = new Array(channelCount).fill(0).map((_, i) => ({ name: `SPO-${i + 1}`, yMin: 0, yMax: 200 }));

    const lc = lightningChart({
      license: "0002-n4og2qUEgC6VgJvI1q8/aqe6hqXfKwCLIOOxHIgwgZiT1g4X529OLq7Qtbgve7sJrvgeOl7HcTSHb1/Y+RjhShb/-MEQCIEa3i+fOlLW4WKbQ2wNSu0PG0mWEK0agBgFqenq8XG2BAiB6H8X14CvUnu5vd+SpvMYtJkka1/HGxZxvWDNDrQL0tw==",
      licenseInformation: {
        appTitle: "LightningChart JS Trial",
        company: "LightningChart Ltd."
      },
    });

    const chart = lc.ChartXY({
      theme: Themes.darkGold,
    });

    const theme = chart.getTheme();
    const ecgBackgroundFill = new SolidFill({
      color: theme.isDark ? ColorHEX('#000000') : ColorHEX('#ffffff'),
    });

    chart
      .setSeriesBackgroundFillStyle(ecgBackgroundFill)
      .setSeriesBackgroundStrokeStyle(emptyLine)
      .setMouseInteractions(false)
      .setAutoCursorMode(AutoCursorModes.disabled)
      .setTitle('');

    const axisX = chart
      .getDefaultAxisX()
      .setTickStrategy(AxisTickStrategies.Empty)
      .setStrokeStyle(emptyLine)
      .setScrollStrategy(undefined)
      .setInterval({ start: 0, end: xViewMs, stopAxisAfter: false });

    chart.getDefaultAxisY().dispose();

    const channels = CHANNELS.map((info, iCh) => {
      const axisY = chart
        .addAxisY({ iStack: CHANNELS.length - iCh })
        .setStrokeStyle(emptyLine)
        .setInterval({ start: info.yMin, end: info.yMax })
        .setTickStrategy(AxisTickStrategies.Empty)
        .setTitle(info.name)
        .setTitleRotation(0)
        .setMouseInteractions(false);

      let seriesRight = chart
        .addLineSeries({
          dataPattern: { pattern: 'ProgressiveX' },
          automaticColorIndex: iCh,
          yAxis: axisY,
        })
        .setName(info.name)
        .setStrokeStyle((stroke) => stroke.setThickness(2))
        .setEffect(false);

      const seriesOverlayRight = chart.addRectangleSeries({ yAxis: axisY }).setEffect(false);
      const figureOverlayRight = seriesOverlayRight
        .add({ x1: 0, y1: 0, x2: 0, y2: 0 })
        .setFillStyle(ecgBackgroundFill)
        .setStrokeStyle(emptyLine)
        .setMouseInteractions(false);

      let seriesLeft = chart
        .addLineSeries({
          dataPattern: { pattern: 'ProgressiveX' },
          automaticColorIndex: iCh,
          yAxis: axisY,
        })
        .setName(info.name)
        .setStrokeStyle((stroke) => stroke.setThickness(2))
        .setEffect(false);

      const seriesHighlightLastPoints = chart
        .addPointSeries({ pointShape: PointShape.Circle, yAxis: axisY })
        .setPointFillStyle(new SolidFill({ color: theme.examples?.highlightPointColor }))
        .setPointSize(5)
        .setEffect(false);

      let isHighlightChanging = false;
      [seriesLeft, seriesRight].forEach((series) => {
        series.onHighlight((value) => {
          if (isHighlightChanging) {
            return;
          }
          isHighlightChanging = true;
          seriesLeft.setHighlight(true);
          seriesRight.setHighlight(true);
          isHighlightChanging = false;
        });
      });

      return {
        seriesLeft,
        seriesRight,
        seriesOverlayRight,
        figureOverlayRight,
        seriesHighlightLastPoints,
        axisY,
      };
    });

    let prevPosX = 0;
    const handleIncomingData = (dataPointsAllChannels: ECGDataPoint[][]) => {
      let posX = 0;

      for (let iCh = 0; iCh < CHANNELS.length; iCh += 1) {
        const newDataPointsTimestamped = dataPointsAllChannels[iCh];
        const channel = channels[iCh];

        const newDataPointsSweeping = newDataPointsTimestamped.map((dp) => ({
          x: dp.x % xViewMs,
          y: dp.y,
        }));
        const newDataPointsCount = newDataPointsSweeping.length;

        posX = Math.max(posX, newDataPointsSweeping[newDataPointsSweeping.length - 1].x);

        let fullSweepsCount = 0;
        let signPrev = false;
        for (const dp of newDataPointsSweeping) {
          const sign = dp.x < prevPosX;
          if (sign === true && sign !== signPrev) {
            fullSweepsCount += 1;
          }
          signPrev = sign;
        }

        if (fullSweepsCount > 1) {
          channel.seriesRight.clear();
          channel.seriesLeft.clear();
        } else if (fullSweepsCount === 1) {
          let dataCurrentSweep: ECGDataPoint[] = [];
          let dataNextSweep: ECGDataPoint[] = [];
          for (let i = 0; i < newDataPointsCount; i += 1) {
            if (newDataPointsSweeping[i].x <= prevPosX) {
              dataCurrentSweep = newDataPointsSweeping.slice(0, i);
              dataNextSweep = newDataPointsSweeping.slice(i + 1);
              break;
            }
          }
          channel.seriesLeft.add(dataCurrentSweep);
          const nextLeft = channel.seriesRight;
          const nextRight = channel.seriesLeft;
          channel.seriesLeft = nextLeft;
          channel.seriesRight = nextRight;
          channel.seriesRight.setDrawOrder({ seriesDrawOrderIndex: 0 });
          channel.seriesOverlayRight.setDrawOrder({ seriesDrawOrderIndex: 1 });
          channel.seriesLeft.setDrawOrder({ seriesDrawOrderIndex: 2 });
          channel.seriesLeft.clear();
          channel.seriesLeft.add(dataNextSweep);
        } else {
          channel.seriesLeft.add(newDataPointsSweeping);
        }

        const highlightPoints = [newDataPointsSweeping[newDataPointsSweeping.length - 1]];
        channel.seriesHighlightLastPoints.clear().add(highlightPoints);
      }

      const overlayXStart = 0;
      const overlayXEnd = posX + xViewMs * 0.03;
      channels.forEach((channel) => {
        channel.figureOverlayRight.setDimensions({
          x1: overlayXStart,
          x2: overlayXEnd,
          y1: channel.axisY.getInterval().start,
          y2: channel.axisY.getInterval().end,
        });
      });

      prevPosX = posX;
    };

    let tStart = window.performance.now();
    let pushedDataCount = 0;
    const xStep = 1000 / dataRateHz;

    const streamData = () => {
      const tNow = window.performance.now();
      const shouldBeDataPointsCount = Math.floor((dataRateHz * (tNow - tStart)) / 1000);
      const newDataPointsCount = shouldBeDataPointsCount - pushedDataCount;
      if (newDataPointsCount > 0) {
        const newDataPoints: ECGDataPoint[] = [];
        for (let iDp = 0; iDp < newDataPointsCount; iDp++) {
          const x = (pushedDataCount + iDp) * xStep;
          const iData = (pushedDataCount + iDp) % ecgData.length;
          const y = ecgData[iData];
          const point = { x, y };
          newDataPoints.push(point);
        }

        handleIncomingData(new Array(CHANNELS.length).fill(0).map(() => newDataPoints));
        pushedDataCount += newDataPointsCount;
      }

      requestAnimationFrame(streamData);
    };
    streamData();
    let spo = document.getElementById('spo');
    let chart2 = document.getElementById('chart-3');
    let chart1 = document.getElementById('chart-1');
    let lcjs = document.getElementById('lcjs-auto-flexbox');

    if (chart2) {
      chart2.remove()
    }
    if(spo){
        spo.style.height = '200px'
    }
    // if (chart1) {
    //   chart1.style.display = "none";
    // }
    if (lcjs && spo) {
        lcjs.style.height = '300px'

      spo.appendChild(lcjs);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div id='spo' ref={chartRef}></div>
    </>
  )
};