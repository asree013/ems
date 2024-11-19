import { lightningChart, Themes, emptyLine, AxisTickStrategies, ColorHEX, SolidFill, PointShape } from "@lightningchart/lcjs";
import { useEffect, useId, useState } from "react";

interface ChartLightningProps {
  data: number[];
  lineColor: any;
  yMin: number;
  yMax: number;
  sig_name: string;
  rateHz: number;
  xView: number;
}

export default function ChartLightling(props: ChartLightningProps): JSX.Element {
  const { data, lineColor, yMin, yMax, sig_name, rateHz, xView } = props;

  const id = useId();
  const [maxLength] = useState({ add: yMax, delete: yMin });

  const channelCount = 1;
  const dataRateHz = rateHz;
  const xViewMs = xView * rateHz;
  const CHANNELS = new Array(channelCount).fill(0).map(() => ({
    name: sig_name,
    yMin: maxLength.delete,
    yMax: maxLength.add,
  }));

  const ecgData = data;

  useEffect(() => {
    const container: any = document.getElementById(id);
    if (!container) return;

    const lc = lightningChart({
      license: "0002-n3Kei2+JqP3mbgcisdTOqyUYkI9dKwBznrJ7kaTi8nYLPWlsFq7MjLj6N0CRKnGEhitt1MItFk92rt167zJjsqiu-MEUCIDmZsdNiMy4uw/r8V7eEl10rvnW8OF+DmWC7itAAEChIAiEA2cNQHKBUzKVR56eimH17WbRLSvoAhWAI7IMSB0PCUyg=",
      licenseInformation: {
        appTitle: "LightningChart JS Trial",
        company: "LightningChart Ltd."
      },
    })

    const chart = lc.ChartXY({
      theme: Themes.darkGold,
      container,
    });

    const ecgBackgroundFill = new SolidFill({
      color: ColorHEX('#000000'),
    });

    chart
      .setSeriesBackgroundFillStyle(ecgBackgroundFill)
      .setSeriesBackgroundStrokeStyle(emptyLine)
      .setMouseInteractions(false)
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

      const seriesLeft = chart
        .addLineSeries({
          dataPattern: { pattern: "ProgressiveX" },
          automaticColorIndex: iCh,
          yAxis: axisY,
        })
        .setName(info.name)
        .setStrokeStyle((stroke) =>
          stroke.setThickness(2).setFillStyle(new SolidFill({ color: lineColor, fillType: "solid" }))
        )
        .setEffect(false);

      const seriesRight = chart
        .addLineSeries({
          dataPattern: { pattern: "ProgressiveX" },
          automaticColorIndex: iCh,
          yAxis: axisY,
        })
        .setName(info.name)
        .setStrokeStyle((stroke) =>
          stroke.setThickness(2).setFillStyle(new SolidFill({ color: lineColor, fillType: "solid" }))
        )
        .setEffect(false);

      const seriesOverlayRight = chart.addRectangleSeries({ yAxis: axisY }).setEffect(false);
      const figureOverlayRight = seriesOverlayRight
        .add({ x1: 0, y1: 0, x2: 0, y2: 0 })
        .setFillStyle(ecgBackgroundFill)
        .setStrokeStyle(emptyLine)
        .setMouseInteractions(false);

      const seriesHighlightLastPoints = chart
        .addPointSeries({ pointShape: PointShape.Circle, yAxis: axisY })
        .setPointFillStyle(new SolidFill({ color: chart.getTheme().examples?.highlightPointColor }))
        .setPointSize(5)
        .setEffect(false);

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
    const handleIncomingData = (dataPointsAllChannels: Array<{ x: number; y: number }[]>) => {
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
          let dataCurrentSweep: { x: number; y: number }[] = [];
          let dataNextSweep: { x: number; y: number }[] = [];
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
        const newDataPoints: any = [];
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
  }, [id, ecgData, lineColor, maxLength, rateHz, sig_name, xView, xViewMs]);

  return <div id={id} style={{ width: "100%", height: "100%" }}></div>;
}
