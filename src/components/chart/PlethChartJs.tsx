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
for (let j = 0; j < 240; j++) {
    d_time = d_time + Math.floor(1000 / 60);
    graph_label.push(d_time);
}

let oldData: (number | null)[] = [];

type Props = {
    device: Device
}

export default function PlethChartJs({device}: Props): JSX.Element {
    const [newData, setNewData] = useState<number[] | undefined>();
    const [temp1Data, setTemp1Data] = useState({
        labels: ["00"],
        datasets: [
            {
                label: 'Pleth',
                data: [] as (number | null)[],
                borderColor: '#22d3ee',
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
                min: -20,
                max: 120,
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
        socket.off('pleth/'+ device.device_id);
        socket.on('pleth/'+ device.device_id, (message: { data: string[], device_id: string }) => {
            console.log('message: ', message);    
            if(message.device_id !== device.device_id) return
            if (message?.data.length > 0) {
                cacheData.push(message);
                console.log('Pleth cache data remain : ', cacheData.length);
                if (cacheData.length > 4 && isFinish.current) {
                    isFinish.current = false;
                    const temp = cacheData.splice(0, 4);
                    manageData(temp).then((d) => {
                        oldData = newData?.length ? [...newData] : new Array(240).fill(0);
                        setNewData(d);
                    });
                }
            }
        });
    }, [newData]);

    useEffect(() => {
        if (!newData) return;
        let i = 0;

        const animate = () => {
            if (i < 235) {
                oldData[i] = newData[i];
                oldData[i + 1] = null;
                oldData[i + 2] = null;
                oldData[i + 3] = null;
                oldData[i + 4] = null;
                oldData[i + 5] = null;
            } else {
                oldData[i] = newData[i];
            }
            setTemp1Data({
                labels: graph_label as any,
                datasets: [
                    {
                        label: 'Pleth',
                        data: oldData,
                        borderColor: '#22d3ee',
                        borderWidth: 2,
                    },
                ],
            });

            if (i < newData.length) {
                i++;
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
        isFinish.current = true;
    }, [newData]);

    return (
        <div className='bg-black p-1'>
            <div className="flex flex-row min-w-[200px] sm:min-w-[500px] h-20 p-1 justify-between">
                <p className="flex items-center text-sky-400">
                    Pleth
                </p>
                <Line data={temp1Data} options={options as any} className='min-w-[248px] sm:min-w-[470px] h-[60px]' />
            </div>
        </div>
    );
}
