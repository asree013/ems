'use client';
import React, { useState, useEffect, useRef, use } from 'react';
import Chart from 'chart.js/auto';
import { ecg, temp } from '@/data/data.medical_result';
import { ChartMonitor } from '@/models/chart';
import '../monitor.css';

import { useRouter } from 'next/navigation';

var x: number[] = [];
for (let j = 0; j < 550; j++) {
  x.push(j);
}
let p = 0;
let i = 0;
let data: any = [];
let min: number = 0;
let max: number = 100;

export default function Temp() {
  const router = useRouter();
  const [chart, setChart] = useState<Chart | null>(null);

  let alldata = useRef(temp);
  data = useRef<number[]>(alldata.current.slice(0, 550));

  useEffect(() => {
    let animationFrameId: number;

    const updateChart = () => {
      data.current[i] = alldata.current[p];
      i++;
      p++;
      if (p >= alldata.current.length) {
        p = 0;
      }
      if (i >= data.current.length) {
        i = 0;
      }
      if (chart) {
        chart.update();
      }
      animationFrameId = requestAnimationFrame(updateChart);
    };

    animationFrameId = requestAnimationFrame(updateChart);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [chart]);

  useEffect(() => {
    const ctx = document.getElementById(`temp`) as HTMLCanvasElement;
    const option: any = {
      type: 'line',
      data: {
        labels: x,
        datasets: [
          {
            label: 'ECG Data',
            data: data.current,
            borderColor: '#fdb44b',
            fill: false,
            pointRadius: 1,
            pointStyle: false,
            borderWidth: 1,
          },
        ],
      },
      options: {
        spanGaps: true,
        elements: {
          point: {
            radius: 0,
          },
        },
        animation: false,
        plugins: {
          legend: {
            display: false,
            labels: {
              color: 'rgb(49, 163, 79)',
            },
          },
        },
        scales: {
          x: {
            display: false,
          },
          y: {
            beginAtZero: false,
            display: false,
            min: min,
            max: max,
          },
        },
        responsive: true,
      },
    };
    const newChart = new Chart(ctx!, option);
    setChart(newChart);

    return () => {
      newChart.destroy();
    };
  }, []);

  return (
    <div className="mini">
      <div style={{ color: '#fdb44b' }}>
        <p>{max}</p>
        <p>{min}</p>
      </div>
      <canvas id={`temp`}></canvas>
    </div>
  );
}
