
import React, { useEffect, useState } from 'react';
import {
  CategoryScale,
  Chart as ChartJS,
  LineElement,
  LinearScale,
  PointElement,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import ecg from './ekg';
import { connect } from "nats.ws";

ChartJS.register(
  CategoryScale, 
  LinearScale, 
  PointElement,
  LineElement
);


var x = [];

for(let j=0;j<ecg.length;j++){
  let newValue = { time: parseInt(j), value: ecg[j] };
  x.push(newValue);
}

const totalDuration = 3000;
const delayBetweenPoints = totalDuration / x.length;
const previousY = (ctx) => ctx.index === 0 ? ctx.chart.scales.y.getPixelForValue(100) : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y;
const animation = {
  x: {
      type: 'number',
      easing: 'linear',
      duration: delayBetweenPoints,
      from: NaN, // the point is initially skipped
      delay(ctx) {
          if (ctx.type !== 'data' || ctx.xStarted) {
              return 0;
          }
          ctx.xStarted = true;
          return ctx.index * delayBetweenPoints;
      }
  },
  y: {
      type: 'number',
      easing: 'linear',
      duration: delayBetweenPoints,
      from: previousY,
      delay(ctx) {
          if (ctx.type !== 'data' || ctx.yStarted) {
              return 0;
          }
          ctx.yStarted = true;
          return ctx.index * delayBetweenPoints;
      }
  },
  onComplete: ({initial}) => {
    if (initial){
      console.log('Complete');
    }
  }
};

export const options = {
  animation,
  maintainAspectRatio: false,
  // aspectRatio: 1,
  interaction: {
      intersect: false
  },
  plugins: {
      legend: false
  },
  scales: {
      x: {
          type: 'linear',
          display: false,
      },
      y: {
        display: false
      }
  }
};

export const data = {
  labels: x,
  datasets: [
      {
          label: "ECG Data",
          data: x,
          borderColor: "#21eb56",
          fill: false,
          pointRadius: 1,
          pointStyle: false,
          borderWidth: 1,
          parsing: {
            xAxisKey: 'time',
            yAxisKey: 'value'
        },
      },
  ],
};



export default function App() {

  const [nats, setNats] = useState();

  useEffect(() => {
    (async () => {
      const nc = await connect({
        servers: ["ws://127.0.0.1:4222"],
      });
      setNats(nc)
      console.log("connected to NATS")
    })();

    console.log(nats);

    return () => {
      nats?.drain();
      console.log("closed NATS connection")
    }
  }, [])


  return (
    <div style={{ width: 285, margin: 50, backgroundColor: 'black' }}>
      <Line options={options} data={data} redraw={true}/>
    </div>
  )
    
  
}
