'use client';

import { socket } from '@/configs/socket';
import { ecg } from '@/data/data.medical_result';
import {
  AutoCursorModes,
  AxisTickStrategies,
  ColorHEX,
  ColorRGBA,
  emptyLine,
  lightningChart,
  PointShape,
  SolidFill,
  Themes,
} from '@lightningchart/lcjs';
import { useEffect, useState } from 'react';


interface ECGDataPoint {
  x: number;
  y: number;
}

interface ChannelInfo {
  name: string;
  yMin: number;
  yMax: number;
}

type Props = {
  order_id: string
}


export default function ECG({ order_id }: Props) {
  const id = order_id + '_ecg'
  const [maxLength, setMaxLenght] = useState<{
    add: number,
    delete: number
  }>({ add: 100, delete: -100 })
  setInterval(() => {

  }, 5000)

  let newDataEcg = []

  async function fetchData() {
    let ecgData: any[]
    let i = 1
    let lengthData = 250
    ecgData = ecg
    let arrayBuffer: {id: number, data: number[]}[] = {} as {id: number, data: number[]}[]
    let nd = 0
    let curNd = 0

    socket.emit('data-tranfer', { order_id, message: order_id });
    socket.off('data-tranfer-ecg')
    socket.on('data-tranfer-ecg', (message: any) => {
      nd++
      console.log('pleth ', JSON.parse(message).ecg);
      newDataEcg = JSON.parse(message).ecg
      const data = {
        id: nd,
        data: newDataEcg
      }
      arrayBuffer.push(data)
      ecgData = arrayBuffer[curNd].data
    })

    const container = document.getElementById(id) as HTMLDivElement;
    if (!container) return;

    const channelCount = 1;
    const dataRateHz = 250;
    const xViewMs = 15 * 250;
    const CHANNELS: ChannelInfo[] = new Array(channelCount).fill(0).map((_, i) => ({ name: `ECG`, yMin: maxLength.delete, yMax: maxLength.add }));

    const lc = lightningChart({
      license: "0002-n3Kei2+JqP3mbgcisdTOqyUYkI9dKwBznrJ7kaTi8nYLPWlsFq7MjLj6N0CRKnGEhitt1MItFk92rt167zJjsqiu-MEUCIDmZsdNiMy4uw/r8V7eEl10rvnW8OF+DmWC7itAAEChIAiEA2cNQHKBUzKVR56eimH17WbRLSvoAhWAI7IMSB0PCUyg=",
      licenseInformation: {
        appTitle: "LightningChart JS Trial",
        company: "LightningChart Ltd."
      },
    })

    const chart = lc.ChartXY({
      theme: Themes.darkGold,
      container
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
        .setStrokeStyle((stroke) => stroke.setThickness(2).setFillStyle(new SolidFill({
          color: ColorRGBA(60, 179, 113),
          fillType: 'solid'
        })))
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
        .setStrokeStyle((stroke) => stroke.setThickness(2).setFillStyle(new SolidFill({
          color: ColorRGBA(60, 179, 113),
          fillType: 'solid'
        })))
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
    let index = 0
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

      if (index < ecgData.length)  {
        index++
        console.log('++');
        requestAnimationFrame(streamData);

      }
      // else {
      //   ecgData = []
      //   arrayBuffer = arrayBuffer.filter(r => r.id !== curNd )
      //   curNd++
      //   ecgData.push(arrayBuffer[curNd].data)
      //   requestAnimationFrame(streamData);
      // }

    };
    streamData();

  };

  useEffect(() => {
    fetchData();
  }, []);

  return <div id={id} style={{ width: "100%", height: "100%" }}></div>;
};
