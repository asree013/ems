'use client'
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import 'chartjs-adapter-moment';
import { useEffect, useRef, useState } from 'react';
import { socket } from '@/configs/socket.config';

Chart.register(...registerables);

const cacheData: any[] = [];
let d_time = 0;
const graph_label: number[] = [];
for (let j = 0; j < 2000; j++) {
    d_time = d_time + Math.floor(1000 / 500);
    graph_label.push(d_time);
}

let oldData: (number | null)[] = [];

type Props = {
    device: Device
}

export default function EcgChartJS({device}: Props): JSX.Element {
    const [newData, setNewData] = useState<number[] | undefined>();
    const [temp1Data, setTemp1Data] = useState({
        labels: ["00"],
        datasets: [
            {
                label: 'ECG',
                data: [] as (number | null)[],
                borderColor: '#34D399',
                borderWidth: 2,
            },
        ],
    });

    const isFinish = useRef(true);

    const options = {
        plugins: {
            legend: {
                display: false,
            },
        },
        animation: false,
        showLine: true,
        elements: {
            point: {
                radius: 0,
            },
            line: {
                tension: 0.0,
            },
        },
        scales: {
            y: {
                display: false,
                min: -500,
                max: 1000,
                grid: {
                    display: false,
                },
            },
            x: {
                display: false,
                type: 'linear' as const,
                grid: {
                    display: false,
                },
            },
        },
    };

    const manageData = async (message: { data: string[] }[]): Promise<number[]> => {
        const pdata: number[] = [];
        for await (const f of message) {
            for await (const e of f.data) {
                pdata.push(e === '32767' ? 0 : parseInt(e, 10));
            }
        }
        return pdata;
    };

    useEffect(() => {
        socket.off('ecg_lead_II/'+ device.device_id);
        socket.on('ecg_lead_II/' + device.device_id, (message: { data: string[], device_id: string }) => {
            if(message.device_id !== device.device_id) return
            if (message?.data.length > 0) {
                cacheData.push(message);
                console.log('Ecg cache data remain : ', cacheData.length);
                if (cacheData.length > 4 && isFinish.current) {
                    isFinish.current = false;
                    const temp = cacheData.splice(0, 4);
                    manageData(temp).then((d) => {
                        oldData = newData?.length ? [...newData] : new Array(2000).fill(0);
                        setNewData(d);
                    });
                }
            }
        });
    }, [newData]);

    useEffect(()=> {
        if(!newData) return
    
        for (let i=0;i<newData.length;i++){
    
          setTimeout(() => {
            if(i < 1980){
              oldData[i] = newData[i];
              oldData[i+1] = null;
              oldData[i+2] = null;
              oldData[i+3] = null;
              oldData[i+4] = null;
              oldData[i+5] = null;
              oldData[i+6] = null;
              oldData[i+7] = null;
              oldData[i+8] = null;
              oldData[i+9] = null;
              oldData[i+10] = null;
              oldData[i+11] = null;
              oldData[i+12] = null;
              oldData[i+13] = null;
              oldData[i+14] = null;
              oldData[i+15] = null;
              oldData[i+16] = null;
              oldData[i+17] = null;
              oldData[i+18] = null;
              oldData[i+19] = null;
              oldData[i+20] = null;
            } else {
              oldData[i] = newData[i];
            }
            setTemp1Data({
              labels: graph_label as any,
              datasets: [
                  {
                      label: 'ECG',
                      data: oldData,
                      borderColor: '#34d399',
                      borderWidth: 2
                  }
              ]
            });
          }, i * 2);
    
        }
    
        isFinish.current = true;
    
      },[newData]);

    return (
        <div className='bg-black p-1'>
            <div className="flex flex-row min-w-[200px] h-20 p-1 justify-between">
                <p className="flex items-center text-green-600" >
                    ECG
                </p>
                <Line data={temp1Data} options={options as any} className='min-w-[257px] sm:min-w-[470px] h-[60px]' />
            </div>
        </div>
    );
}
