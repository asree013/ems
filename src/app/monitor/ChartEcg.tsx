'use client';
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import Chart from 'chart.js/auto';
import { ecg, ecgNull, spo2 } from '@/data/data.medical_result';
import './monitor.css'
import MenuChart from '@/app/monitor/MenuChart'
import { Patients } from '@/models/patient';
import { findPatientById } from '@/services/paitent.service';
import { OrderTranfer } from '@/models/order_tranfer.model';
import { CompletedOrderTranferByOrderId, editOrderTranferByOrderId } from '@/services/order_tranfer.service';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { socket } from '@/config/socket'
import { EcgTransfer } from '@/models/ecg.model';
import StartChart from './StartChart';
import { referfToken } from '@/services/authen.service';
import { useRouter } from 'next/navigation';

let newData = [
  18, 16, 16, 14, 14, 13, 13, 13, 14, 16, 18, 22, 26, 32, 38, 46, 52, 58, 64, 68, 72, 75, 78, 80, 82, 83, 84, 85, 86, 86,
  86, 85, 85, 84, 84, 83, 83, 81, 80, 78, 77, 75, 74, 72, 71, 69, 68, 66, 65, 63, 62, 61, 61, 59, 59, 58, 58, 57, 57, 56,
  56, 55, 55, 54, 54, 52, 52, 51, 51, 49, 49, 47, 47, 45, 45, 43, 43, 41, 40, 38, 38, 36, 36, 34, 33, 31, 31, 29, 29, 27,
  27, 25, 25, 23, 23, 21, 21, 19, 19, 17, 17, 15, 15, 14, 14, 14, 15, 17, 20, 25, 29, 35, 41, 49, 55, 61, 66, 70, 74, 77,
  80, 81, 83, 84, 85, 18, 16, 16, 14, 14, 13, 13, 13, 14, 16, 18, 22, 26, 32, 38, 46, 52, 58, 64, 68, 72, 75, 78, 80, 82,
  83, 84, 85, 86, 86, 86, 85, 85, 84, 84, 83, 83, 81, 80, 78, 77, 75, 74, 72, 71, 69, 68, 66, 65, 63, 62, 61, 61, 59, 59,
  58, 58, 57, 57, 56, 56, 55, 55, 54, 54, 52, 52, 51, 51, 49, 49, 47, 47, 45, 45, 43, 43, 41, 40, 38, 38, 36, 36, 34, 33,
  31, 31, 29, 29, 27, 27, 25, 25, 23, 23, 21, 21, 19, 19, 17, 17, 15, 15, 14, 14, 14, 15, 17, 20, 25, 29, 35, 41, 49, 55,
  61, 66, 70, 74, 77, 80, 81, 83, 84, 85, 86, 86, 86, 86, 86, 86, 85, 85, 84, 84, 82, 82, 80, 79, 77, 76, 74, 73, 70, 69,
  67, 66, 64, 63, 61, 61, 59, 59, 58, 58, 57, 57, 56, 56, 55, 55, 54, 54, 53, 53, 51, 51, 49, 49, 47, 47, 46, 46, 44, 43,
  41, 41, 39, 39, 37, 37, 35, 34, 32, 32, 30, 30, 28, 28, 26, 26, 24, 24, 22, 22, 20, 20, 19, 19, 17, 17, 17, 17, 18, 19,
  21, 24, 29, 34, 41, 47, 53, 59, 64, 69, 73, 76, 78, 81, 82, 84, 85, 86, 86, 86, 86, 86, 86, 85, 85, 84, 84, 82, 81, 79,
  78, 76, 75, 73, 72, 70, 69, 67, 66, 64, 64, 63, 63, 62, 62, 61, 61, 60, 60, 59, 59, 58, 58, 57, 57, 55, 55, 54, 54, 52,
  52, 50, 50, 48, 48, 46, 46, 44, 44, 42, 42, 40, 40, 38, 37, 35, 35, 33, 33, 32, 32, 30, 30, 28, 28, 26, 26, 24, 24, 23,
  23, 22, 22, 22, 23, 25, 27, 32, 36, 42, 47, 53, 59, 65, 70, 74, 78, 80, 83, 85, 87, 88, 89, 89, 90, 90, 90, 90, 90, 89,
  89, 87, 87, 85, 84, 82, 81, 79, 78, 76, 75, 73, 72, 70, 70, 68, 68, 66, 66, 65, 65, 64, 64, 63, 63, 62, 62, 61, 61, 60
]


var x: number[] = [];
for (let j = 0; j < 625; j++) {
  x.push(j);
}
let p = 0;
let i = 0;
let data: any = [];
let dataSpo2: any = []
let arrs: number[][] = []
let arrSpo: number[][] = []
let isNotData: boolean = false



interface GrachProps {
  el_id: number
  index: number
  onChangeDeleteDeviceID: (id: string) => void
  orderTranFer: OrderTranfer[]
}

export default function ChartEcg({ el_id, index, onChangeDeleteDeviceID, orderTranFer }: GrachProps) {

  const router = useRouter()  

  const dataChart = useRef<number[]>(ecgNull);
  const dataChartSpo = useRef<number[]>(ecgNull);
  const intervals = useRef<NodeJS.Timeout | null>(null)
  const [arrEcg, setArrEcg] = useState<number[][] | null>([{} as number[]])
  const [ecgData, setEcgData] = useState<number[]>({} as number[])
  const [chart, setChart] = useState<Chart | null>(null);
  const [spo2Chart, setSpo2Chart] = useState<Chart | null>(null);
  const [checkBox, setCheckBox] = useState<string>('ecg')
  const [patient, setPatient] = useState<Patients>({} as Patients)
  const [order] = useState<OrderTranfer>(orderTranFer.find(r => r.element_seq === Number(el_id)) || {} as OrderTranfer)

  const [hr, setHr] = React.useState<number>(0)
  const [spo2Press, setSpo2Press] = React.useState<number>(0)
  const [sys, setSys] = React.useState<number>(0)
  const [dia, setDia] = React.useState<number>(0)

  let [hidden, setHidden] = useState<string[]>([])
  data = useRef<number[]>(dataChart.current);
  dataSpo2 = useRef<number[]>(dataChartSpo.current)

  function activeCheckBox(cb: string, el_id: string) {
    setCheckBox(cb)
    const i = el_id.split('_')[1]
    const element_id = el_id.split('_')[0]
    if (element_id === 'spo2') {
      setHidden(hidden.filter(r => r !== `ecgChart${i}`))
    }
    else {
      setHidden([...hidden, `ecgChart${i}`])
    }
  }

  function onStartMonitor(status: boolean) {
    const orderId = order.id
    if (status === true) {
      dataChartSpo.current = []
      dataChartSpo.current = ecgNull
      dataChart.current = []
      dataChart.current = ecgNull
      arrSpo = []
      socket.emit('data-tranfer-leave-room', orderId);

      // if (intervals.current) {
      //   console.log('Interval ถูกยกเลิกแล้ว');
      //   clearInterval(intervals.current);
      // } else {
      //   console.log('ไม่มี Interval ที่ต้องยกเลิก');
      // }
    }
    else {
      socket.emit('data-tranfer-join-room', orderId);

      socket.emit('data-tranfer', { orderId, message: orderId });
    }

  }

  function onChangeDelete(id: string) {
    onChangeDeleteDeviceID(id)
  }

  async function onUpdateOrderTranfer(id: string, status: string) {
    try {

      const ot = {} as OrderTranfer
      if (status.length === 0) {
        const close = await CompletedOrderTranferByOrderId(id)
        console.log(close);
        toast.success('Close Case')
        window.location.reload()
      }
      else {
        await editOrderTranferByOrderId(id, ot)
        toast.success('Completed Case')
        window.location.reload()
      }
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  const feedPatientById = useCallback(async () => {
    try {
      // await referfToken()
      const result = await findPatientById(order.patient_id)
      setPatient(result.data)
    } catch (error) {
      // router.push('/login')
      // toast.error(JSON.stringify(error))
    }
  }, [setPatient])

  const runSocket = useCallback(() => {
    const orderId = order.id
    // dataChart.current = ecg
    // socket.on('data-tranfer-ecg', (message: any) => {
    //   // setEcgData(JSON.parse(message).ecg)
    //   if (JSON.parse(message).order_id !== orderId || !order) {
    //     console.log('ไม่ได้ทำงาน');
    //     return
    //   }
    //   // console.log('message: ', message);
    //   let value: number[] = JSON.parse(message).ecg
    //   if (arrs.length === 0) {
    //     arrs.push(value)
    //     // console.log('add arr 1', arrs);    
    //   }
    //   if (arrs.length >= 1) {
    //     arrs.push(value)
    //     // console.log('add arr 2', arrs);
    //   }
    //   if (arrs.length >= 2) {
    //     // console.log('add arr 3', arrs);
    //     arrs.push(value)
    //   }
    //   if (arrs.length >= 3) {
    //     // console.log('add arr 4', arrs);
    //     arrs.push(value)
    //     dataChart.current = []
    //     console.log('data current before agsign: ', dataChart.current);

    //     const temps = arrs.filter((r, i) => {
    //       if (i >= 4) {
    //         return
    //       }
    //       else {
    //         return r
    //       }
    //     })

    //     dataChart.current = temps.flat()
    //     console.log('data current length : ', dataChart.current.length);

    //     arrs = []
    //     console.log('data current length : ', arrs);

    //     // console.log('arrs null: ', arrs);

    //     const checkData = setInterval(() => {
    //       if (arrs.length === 0) {
    //         dataChart.current = ecgNull
    //         isNotData = true
    //         clearInterval(checkData)
    //         console.log('claer');
    //       }
    //     }, 5000)
    //   }

    // });

    socket.on('data-tranfer-pleth', (message: any) => {

      // setEcgData(JSON.parse(message).ecg)
      if (JSON.parse(message).order_id !== orderId || !order) {
        console.log('ไม่ได้ทำงาน');
        return
      }
      // console.log('message: ', message);
      let pleth: number[] = JSON.parse(message).pleth
      if (arrSpo.flat().length < 1250) {
        arrSpo.push(pleth)
        console.log('add arr 1', arrSpo);
      }
      else {
        arrSpo.push(pleth)
        console.log('-----> ', arrSpo.flat());
        dataChartSpo.current = []
        const a = Array.from(new Set(arrSpo.flat()))
        // console.log('arr ----> ',arrSpo.flat().filter(r => r));
        dataChartSpo.current = arrSpo.flat()
        console.log('data current length : ', dataChartSpo.current.length);
        arrSpo= []
        // setInterval(() => {
        //   dataChartSpo.current.length = 0
        // },3000)
      }
    })

    socket.on('data-tranfer-press', (message: any) => {
      if (JSON.parse(message).order_id !== orderId || !order || !message) {
        console.log('ไม่ได้ทำงาน');
        return
      }
      setHr(JSON.parse(message).hr)
      setSpo2Press(JSON.parse(message).spo2)
      setDia(JSON.parse(message).dia)
      setSys(JSON.parse(message).sys)
    })

    function onDisconnect() {
      console.log('disconnect');
    }
    function onConnect() {
      console.log('connected monitor')
    }
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      if (intervals.current) clearInterval(intervals.current);
    };

  }, [socket, setArrEcg])

  const onFeedChart = useCallback(() => {
    const ctx = document.getElementById(`ecgChart${index}`) as HTMLCanvasElement

    const option: any = {
      type: 'line',
      data: {
        labels: x,
        datasets: [
          {
            label: 'ECG Data',
            data: data.current,
            borderColor: '#21eb56',
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
            min: -100,
            max: 100,
          },
        },
        responsive: true,
      },

    }
    const newChart = new Chart(ctx!, option);
    setChart(newChart);


    const spo2 = (document.getElementById(`spo2Chart${index}`) as HTMLCanvasElement)
    const option2: any = {
      type: 'line',
      data: {
        labels: x,
        datasets: [
          {
            label: 'SPO2 Data',
            data: dataSpo2.current,
            borderColor: 'red',
            fill: false,
            pointRadius: 1,
            pointStyle: false,
            borderWidth: 3,
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
            min: 0,
            max: 100,
          },
        },
        responsive: true,
      },
    }

    const spoCahrt = new Chart(spo2!, option2)

    setSpo2Chart(spoCahrt);
    setHidden(['ecgChart0', 'ecgChart1', 'ecgChart2', 'ecgChart3', 'ecgChart4', 'ecgChart5', 'ecgChart6', 'ecgChart7'])

    return {
      ecg: newChart,
      spo: spoCahrt
    }
  }, [setChart, setSpo2Chart, setHidden])

  useEffect(() => {

    let animationFrameId: number;
    let animationFrameIdSpo: number;

    function updateChart() {
      data.current[i] = dataChart.current[p];
      i++;
      p++;
      if (p >= dataChart.current.length) {
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

    function updateChartSpo() {
      dataSpo2.current[i] = dataChartSpo.current[p];
      i++;
      p++;
      if (p >= dataChartSpo.current.length) {
        p = 0;
      }
      if (i >= dataSpo2.current.length) {
        i = 0;
      }
      if (chart) {
        spo2Chart?.update()
      }
      animationFrameIdSpo = requestAnimationFrame(updateChartSpo);
    };

    // const intervalId = setInterval(() => {
    //   updateChartSpo()
    //   clearInterval(intervalId)
    // }, 2500);
    animationFrameId = requestAnimationFrame(updateChart);
    animationFrameIdSpo = requestAnimationFrame(updateChartSpo);

    return () => {
      // clearInterval(intervalId)
      cancelAnimationFrame(animationFrameId);
      cancelAnimationFrame(animationFrameIdSpo);
    };
  }, [chart, spo2Chart, hidden]);

  useEffect(() => {
    runSocket()
    feedPatientById()
    // onFeedChart()
    const chartDestroy = onFeedChart()
    return () => {
      chartDestroy.ecg.destroy();
      chartDestroy.spo.destroy()
    };
  }, [feedPatientById, runSocket, onFeedChart]);


  return (
    <>
      <div className='monitorItems' id={order.id}>
        <StartChart funOnOpen={onStartMonitor} />
        <ToastContainer />
        <div className="hearder_monitor">
          <div className="name_monitor">
            <p style={{ fontSize: '18px' }}>{patient.first_name ? patient.first_name : 'โปรดเพิ่มข้อมูลผู้ป่วย'}</p>
          </div>
          {
            patient.risk_level && (
              <div className="status_monitor">
                <p style={{
                  padding: '8px',
                  background: getRiskLevelColor(patient.risk_level),
                  color: 'white',
                  fontWeight: 700,
                  fontSize: '22px'
                }}>{patient.risk_level}</p>
              </div>
            )
          }
          <div className="menu_monitor">
            <MenuChart orderTranfer={order} patient={patient} returnOnDelete={onChangeDelete} returnOnUpdate={onUpdateOrderTranfer} />
          </div>
        </div>
        <div className="body_monitor">
          <div className="hr">
            <p style={{ color: '#21eb56' }}>HR</p>
            <b style={{ fontSize: '2rem', color: '#21eb56' }}>{hr}</b>
          </div>
          <div className="ecg">
            <p style={{ color: '#21eb56' }}>ECG</p>
            <b style={{ fontSize: '2rem', color: '#21eb56' }}>0</b>
          </div>
          <div className="trindal">
            <p style={{ color: 'yellow' }}>tridal</p>
            <b style={{ fontSize: '2rem', color: 'yellow' }}>0</b>
          </div>
        </div>
        <div className="body_monitor2">
          <div className="nibp">
            <p style={{ color: 'red' }}>NIBP</p>
            <p style={{ fontSize: '1.8rem', margin: '10px', color: 'red' }}>{sys}/{dia}</p>
            <p style={{ color: 'red' }}>mmHg</p>
          </div>
          {
            checkBox === 'ecg'
              ? ''
              : <div className="spo2">
                <p style={{ color: '#5fc9f3' }}>Spo2</p>
                <p style={{ fontSize: '2rem', color: '#5fc9f3' }}>{spo2Press}</p>
              </div>
          }
        </div>
        <div className="chart_option">
          <div className='check_box_monitor'>
            <div>
              <p>EKG</p>
              <div className="checkbox-wrapper-7">
                <input className="tgl tgl-ios" id={`ecg_${index}`} type="checkbox"
                  onChange={() => activeCheckBox(`ecg`, `ecg_${index}`)} checked={checkBox.includes('ecg')} />
                <label className="tgl-btn" htmlFor={`ecg_${index}`} />
              </div>
            </div>
            <div>
              <p>Spo2</p>
              <div className="checkbox-wrapper-7">
                <input className="tgl tgl-ios" id={`spo2_${index}`} type="checkbox"
                  onChange={() => activeCheckBox(`spo2`, `spo2_${index}`)} checked={checkBox.includes('spo2')} />
                <label className="tgl-btn" htmlFor={`spo2_${index}`} />
              </div>
            </div>
          </div>
          <div className="canvas" >
            <div hidden={hidden.filter((r) => r === `ecgChart${index}`).length !== 0 ? false : true}>
              <canvas id={`ecgChart${index}`} ></canvas>
            </div>
            <div hidden={hidden.filter((r) => r === `ecgChart${index}`).length !== 0 ? true : false}>
              <canvas id={`spo2Chart${index}`} ></canvas>
            </div>
          </div>
        </div>
      </div>
    </>
  )

  function getRiskLevelColor(level: string): string {
    switch (level) {
      case 'W': return 'white';
      case 'G': return 'green';
      case 'Y': return 'rgb(118, 118, 14)';
      case 'R': return 'red';
      case 'B': return 'black';
      default: return 'gray';
    }
  }
};



