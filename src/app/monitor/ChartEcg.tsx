'use client';
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import Chart from 'chart.js/auto';
import { ecg, ecgNull } from '@/data/data.medical_result';
import './monitor.css';
import MenuChart from '@/app/monitor/MenuChart';
import { Patients } from '@/models/patient';
import { findPatientById } from '@/services/paitent.service';
import { OrderTranfer } from '@/models/order_tranfer.model';
import {
  CompletedOrderTranferByOrderId,
  editOrderTranferByOrderId,
} from '@/services/order_tranfer.service';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { socket } from '@/configs/socket';
import { EcgTransfer } from '@/models/ecg.model';
import StartChart from './StartChart';
import { referfToken } from '@/services/authen.service';
import { useRouter } from 'next/navigation';

var x: number[] = [];
var a: number[] = []
for (let j = 0; j < 250; j++) {
  a.push(j);
}
for (let j = 0; j < 126; j++) {
  x.push(j);
}
let p = 0;
let i = 0;
let pp = 0;
let ii = 0;
let data: any = [];
let dataSpo2: any = [];
let arrs: number[][] = [];
let arrSpo: number[][] = [];
let isNotData: boolean = false;

interface GrachProps {
  el_id: number;
  index: number;
  onChangeDeleteDeviceID: (id: string) => void;
  orderTranFer: OrderTranfer[];
}

export default function ChartEcg({
  el_id,
  index,
  onChangeDeleteDeviceID,
  orderTranFer,
}: GrachProps) {  

  const dataChart = useRef<number[]>(ecgNull);
  const dataChartSpo = useRef<number[]>(ecgNull);
  const intervals = useRef<NodeJS.Timeout | null>(null);
  const [chart, setChart] = useState<Chart | null>(null);
  const [spo2Chart, setSpo2Chart] = useState<Chart | null>(null);
  const [checkBox, setCheckBox] = useState<string>('ecg');
  const [patient, setPatient] = useState<Patients>({} as Patients);
  const [order] = useState<OrderTranfer>(
    orderTranFer.find((r) => r.element_seq === Number(el_id)) ||
      ({} as OrderTranfer),
  );

  const [hr, setHr] = React.useState<number>(0);
  const [spo2Press, setSpo2Press] = React.useState<number>(0);
  const [sys, setSys] = React.useState<number>(0);
  const [dia, setDia] = React.useState<number>(0);

  let [hidden, setHidden] = useState<string[]>([]);
  data = useRef<number[]>(dataChart.current.slice(0 ,250));
  dataSpo2 = useRef<number[]>(dataChartSpo.current);

  function activeCheckBox(cb: string, el_id: string) {
    setCheckBox(cb);
    const i = el_id.split('_')[1];
    const element_id = el_id.split('_')[0];
    if (element_id === 'spo2') {
      setHidden(hidden.filter((r) => r !== `ecgChart${i}`));
    } else {
      setHidden([...hidden, `ecgChart${i}`]);
    }
  }

  function onStartMonitor(status: boolean) {
    const orderId = order.id;
    if (status === true) {
      dataChartSpo.current = [];
      dataChartSpo.current = ecgNull;
      dataChart.current = [];
      dataChart.current = ecgNull;
      arrSpo = [];
      socket.emit('data-tranfer-leave-room', orderId);

      // if (intervals.current) {
      //   console.log('Interval ถูกยกเลิกแล้ว');
      //   clearInterval(intervals.current);
      // } else {
      //   console.log('ไม่มี Interval ที่ต้องยกเลิก');
      // }
    } else {
      socket.emit('data-tranfer-join-room', orderId);

      socket.emit('data-tranfer', { orderId, message: orderId });
    }
  }

  function onChangeDelete(id: string) {
    onChangeDeleteDeviceID(id);
  }

  async function onUpdateOrderTranfer(id: string, status: string) {
    try {
      const ot = {} as OrderTranfer;
      if (status.length === 0) {
        const close = await CompletedOrderTranferByOrderId(id);
        console.log(close);
        toast.success('Close Case');
        window.location.reload();
      } else {
        await editOrderTranferByOrderId(id, ot);
        toast.success('Completed Case');
        window.location.reload();
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  const feedPatientById = useCallback(async () => {
    try {
      const result = await findPatientById(order.patient_id);
      setPatient(result.data);
    } catch (error) {
    }
  }, [setPatient]);

  const runSocket = useCallback(() => {
    const orderId = order.id;
    socket.on('data-tranfer-ecg', (message: any) => {
      if (JSON.parse(message).order_id !== orderId || !order) {
        console.log('ไม่ได้ทำงาน');
        return
      }
      let ecg: number[] = JSON.parse(message).ecg
      if (arrs.flat().length < 2500) {
        arrs.push(ecg);
        console.log('add ecg 1', arrs);
      } else {
        arrs.push(ecg);
        console.log('ecg -----> ', arrs.flat());
        dataChart.current = [];
        dataChart.current = arrs.flat();
        console.log('data current length : ', dataChart.current.length);
        arrs = [];
      }

    });

    socket.on('data-tranfer-pleth', (message: any) => {
      if (JSON.parse(message).order_id !== orderId || !order) {
        console.log('ไม่ได้ทำงาน');
        return;
      }
      let pleth: number[] = JSON.parse(message).pleth;
      if (arrSpo.flat().length < 1250) {
        arrSpo.push(pleth);
        console.log('add arr 1', arrSpo);
      } else {
        arrSpo.push(pleth);
        console.log('-----> ', arrSpo.flat());
        dataChartSpo.current = [];
        dataChartSpo.current = arrSpo.flat();
        console.log('data current length : ', dataChartSpo.current.length);
        arrSpo = [];
      }
      
    });

    socket.on('data-tranfer-press', (message: any) => {
      if (JSON.parse(message).order_id !== orderId || !order || !message) {
        console.log('ไม่ได้ทำงาน');
        return;
      }
      setHr(JSON.parse(message).hr);
      setSpo2Press(JSON.parse(message).spo2);
      setDia(JSON.parse(message).dia);
      setSys(JSON.parse(message).sys);
    });

    function onDisconnect() {
      console.log('disconnect');
    }
    function onConnect() {
      console.log('connected monitor');
    }
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      if (intervals.current) clearInterval(intervals.current);
    };
  }, [socket]);

  const onFeedChart = useCallback(() => {
    const ctx = document.getElementById(
      `ecgChart${index}`,
    ) as HTMLCanvasElement;

    const option: any = {
      type: 'line',
      data: {
        labels: a,
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
    };
    const newChart = new Chart(ctx!, option);
    setChart(newChart);

    const spo2 = document.getElementById(
      `spo2Chart${index}`,
    ) as HTMLCanvasElement;
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
    };

    const spoCahrt = new Chart(spo2!, option2);

    setSpo2Chart(spoCahrt);
    setHidden([
      'ecgChart0',
      'ecgChart1',
      'ecgChart2',
      'ecgChart3',
      'ecgChart4',
      'ecgChart5',
      'ecgChart6',
      'ecgChart7',
    ]);

    return {
      ecg: newChart,
      spo: spoCahrt,
    };
  }, [setChart, setSpo2Chart, setHidden]);

  useEffect(() => {
    let animationFrameId: number;
    let animationFrameIdSpo: number;

    function updateChart() {
      data.current[ii] = dataChart.current[pp];
      ii++;
      pp++;
      if (pp >= dataChart.current.length) {
        pp = 0;
      }
      if (ii >= data.current.length) {
        ii = 0;
      }
      if (chart) {
        chart.update();
      }
      animationFrameId = requestAnimationFrame(updateChart);
    }

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
        spo2Chart?.update();
      }
      animationFrameIdSpo = requestAnimationFrame(updateChartSpo);
    }

    // const s = setInterval(() => {
    //   updateChartSpo()
    //   clearInterval(s)
    // }, 1000/dataChartSpo.current.length)

    animationFrameId = requestAnimationFrame(updateChart);
    animationFrameIdSpo = requestAnimationFrame(updateChartSpo);

    return () => {
      cancelAnimationFrame(animationFrameId);
      cancelAnimationFrame(animationFrameIdSpo);
    };
  }, [chart, spo2Chart, hidden]);

  useEffect(() => {
    runSocket();
    feedPatientById();
    const chartDestroy = onFeedChart();
    return () => {
      chartDestroy.ecg.destroy();
      chartDestroy.spo.destroy();
    };
  }, [feedPatientById, runSocket, onFeedChart]);

  return (
    <>
      <div className="monitorItems" id={order.id}>
        <StartChart funOnOpen={onStartMonitor} />
        <ToastContainer />
        <div className="hearder_monitor">
          <div className="name_monitor">
            <p style={{ fontSize: '18px' }}>
              {patient.first_name
                ? patient.first_name
                : 'โปรดเพิ่มข้อมูลผู้ป่วย'}
            </p>
          </div>
          {patient.risk_level && (
            <div className="status_monitor">
              <p
                style={{
                  padding: '8px',
                  background: getRiskLevelColor(patient.risk_level),
                  color: getRiskFont(patient.risk_level),
                  fontWeight: 700,
                  fontSize: '22px',
                }}
              >
                {patient.risk_level}
              </p>
            </div>
          )}
          <div className="menu_monitor">
            <MenuChart
              orderTranfer={order}
              patient={patient}
              returnOnDelete={onChangeDelete}
              returnOnUpdate={onUpdateOrderTranfer}
            />
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
            <p style={{ fontSize: '1.8rem', margin: '10px', color: 'red' }}>
              {sys}/{dia}
            </p>
            <p style={{ color: 'red' }}>mmHg</p>
          </div>
          {checkBox === 'ecg' ? (
            ''
          ) : (
            <div className="spo2">
              <p style={{ color: '#5fc9f3' }}>Spo2</p>
              <p style={{ fontSize: '2rem', color: '#5fc9f3' }}>{spo2Press}</p>
            </div>
          )}
        </div>
        <div className="chart_option">
          <div className="check_box_monitor">
            <div>
              <p>EKG</p>
              <div className="checkbox-wrapper-7">
                <input
                  className="tgl tgl-ios"
                  id={`ecg_${index}`}
                  type="checkbox"
                  onChange={() => activeCheckBox(`ecg`, `ecg_${index}`)}
                  checked={checkBox.includes('ecg')}
                />
                <label className="tgl-btn" htmlFor={`ecg_${index}`} />
              </div>
            </div>
            <div>
              <p>Spo2</p>
              <div className="checkbox-wrapper-7">
                <input
                  className="tgl tgl-ios"
                  id={`spo2_${index}`}
                  type="checkbox"
                  onChange={() => activeCheckBox(`spo2`, `spo2_${index}`)}
                  checked={checkBox.includes('spo2')}
                />
                <label className="tgl-btn" htmlFor={`spo2_${index}`} />
              </div>
            </div>
          </div>
          <div className="canvas">
            <div
              hidden={
                hidden.filter((r) => r === `ecgChart${index}`).length !== 0
                  ? false
                  : true
              }
            >
              <canvas id={`ecgChart${index}`}></canvas>
            </div>
            <div
              hidden={
                hidden.filter((r) => r === `ecgChart${index}`).length !== 0
                  ? true
                  : false
              }
            >
              <canvas id={`spo2Chart${index}`}></canvas>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  function getRiskLevelColor(level: string): string {
    switch (level) {
      case 'W':
        return 'white';
      case 'G':
        return 'green';
      case 'Y':
        return 'rgb(118, 118, 14)';
      case 'R':
        return 'red';
      case 'B':
        return 'black';
      default:
        return 'gray';
    }
  }

  function getRiskFont(level: string) {
    if(level.includes('W')){
      return 'black'
    }
    else{
      return 'white'
    }
  }
}
