'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { lightningChart, Themes, emptyLine, AutoCursorModes, AxisTickStrategies, ColorHEX, SolidFill, PointShape, ColorRGBA } from '@lightningchart/lcjs';
import { ecgNull } from '@/data/data.medical_result';

interface ECGDataPoint {
  x: number;
  y: number;
}

interface ChannelInfo {
  name: string;
  yMin: number;
  yMax: number;
}

export default function SpoChart() {

  const chartRef = useRef<any>(null);

  setInterval(() => {

  }, 5000)

  async function fetchData() {
    const response = await fetch('http://localhost:3333/v1/Pleth?page=0&limit=10');
    const testData = await response.json();
    let spoData: any[]
    let i = 1
    let lengthData = testData.length
    spoData = ecgNull

    setInterval(() => {
      console.log(i);

      spoData = testData[i].ecg
      i += 1
      if (i === lengthData) {
    
        i = 0
      }
    }, 10000)

    const channelCount = 2;
    const dataRateHz = 250;
    const xViewMs = 15 * 250;
    const CHANNELS: ChannelInfo[] = new Array(channelCount).fill(0).map((_, i) => ({ name: `Spo-${i + 1}`, yMin: -550, yMax: 550 }));

    const lc = lightningChart({
      license: "0002-n4og2qUEgC6VgJvI1q8/aqe6hqXfKwCLIOOxHIgwgZiT1g4X529OLq7Qtbgve7sJrvgeOl7HcTSHb1/Y+RjhShb/-MEQCIEa3i+fOlLW4WKbQ2wNSu0PG0mWEK0agBgFqenq8XG2BAiB6H8X14CvUnu5vd+SpvMYtJkka1/HGxZxvWDNDrQL0tw==",
      licenseInformation: {
        appTitle: "LightningChart JS Trial",
        company: "LightningChart Ltd."
      },
    });

    const spo = lc.ChartXY({
      theme: Themes.darkGold,
    });

    const theme = spo.getTheme();
    const ecgBackgroundFill = new SolidFill({
      color: theme.isDark ? ColorHEX('#000000') : ColorHEX('#ffffff'),
    });

    spo
      .setSeriesBackgroundFillStyle(ecgBackgroundFill)
      .setSeriesBackgroundStrokeStyle(emptyLine)
      .setMouseInteractions(false)
      .setAutoCursorMode(AutoCursorModes.disabled)

    const axisX = spo
      .getDefaultAxisX()
      .setTickStrategy(AxisTickStrategies.Empty)
      .setStrokeStyle(emptyLine)
      .setScrollStrategy(undefined)
      .setInterval({ start: 0, end: xViewMs, stopAxisAfter: false });

    spo.getDefaultAxisY().dispose();

    const channels = CHANNELS.map((info, iCh) => {
      const axisY = spo
        .addAxisY({ iStack: CHANNELS.length - iCh })
        .setStrokeStyle(emptyLine)
        .setInterval({ start: info.yMin, end: info.yMax })
        .setTickStrategy(AxisTickStrategies.Empty)
        .setTitle(info.name)
        .setTitleRotation(0)
        .setMouseInteractions(false);

      let seriesRight = spo
        .addLineSeries({
          dataPattern: { pattern: 'ProgressiveX' },
          automaticColorIndex: iCh,
          yAxis: axisY,

        })
        .setName(info.name)
        .setStrokeStyle((stroke) => stroke.setThickness(3).setFillStyle(new SolidFill({
          color: ColorRGBA(255, 0, 0),
          fillType: 'solid'
        })))
        .setEffect(false);


      const seriesOverlayRight = spo.addRectangleSeries({ yAxis: axisY }).setEffect(false);
      const figureOverlayRight = seriesOverlayRight
        .add({ x1: 0, y1: 0, x2: 0, y2: 0 })
        .setFillStyle(ecgBackgroundFill)
        .setStrokeStyle(emptyLine)
        .setMouseInteractions(false);

      let seriesLeft = spo
        .addLineSeries({
          dataPattern: { pattern: 'ProgressiveX' },
          automaticColorIndex: iCh,
          yAxis: axisY,
        })
        .setName(info.name)
        .setStrokeStyle((stroke) => stroke.setThickness(3).setFillStyle(new SolidFill({
          color: ColorRGBA(255, 0, 0),
          fillType: 'solid'
        })))
        .setEffect(false);

      const seriesHighlightLastPoints = spo
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
          const iData = (pushedDataCount + iDp) % spoData.length;
          const y = spoData[iData];
          const point = { x, y };
          newDataPoints.push(point);
        }

        handleIncomingData(new Array(CHANNELS.length).fill(0).map(() => newDataPoints));
        pushedDataCount += newDataPointsCount;
      }

      requestAnimationFrame(streamData);
    };
    streamData();

    let chartSpo = document.getElementById('chartSpo');
    let chart4 = document.getElementById('chart-1');
    let chart3 = document.getElementById('chart-2');
    let lcjs = document.getElementById('lcjs-auto-flexbox');

    if (chart3) {
      chart3.style.display = "none";
    }
    // if (chart1) {
    //   chart1.style.display = "none";
    // }
    if (lcjs) {
      chartSpo?.appendChild(lcjs)
      lcjs.style.height = "200px";
      // lcjs.style.width = "24.3%";
      // lcjs.style.position = 'static'
      // lcjs.style.top = '41%'
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div id='chartSpo' ref={chartRef.current}></div>
    </>
  )
};

