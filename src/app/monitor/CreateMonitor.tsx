import React, { useState } from 'react';
import './monitor.css';
import Camera from './Camera';
import { ChartMonitor } from '@/models/chart';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { Button, Fab, TextField } from '@mui/material';
import { findDeviceAll, validateDeviceId } from '@/services/device.service';
import { toast } from '@/services/alert.service';

interface Propotys {
  el_id: number;
  returnMonitor: (el: number, str: string) => void;
}
export default function CreateMonitor({ el_id, returnMonitor }: Propotys) {
  const [select, setSelect] = useState<boolean>(false);
  const [status, setStatus] = useState<boolean>(false);
  const [camera, setCamera] = useState<boolean>(false);
  const [txtDevice, setTxtDevice] = useState<string>('');
  function createMonitor() {
    setCamera(true);
    setStatus(false);
  }
  function getOnchange(el: string, res: any) {
    setTxtDevice(el);
    // const find = chart.find(r => r.el_id === element.id.toString())
    // if(find){
    //   setCamera(false)
    //   setMonitor(false)
    //   find.device_id = el
    // }
  }
  function getOnErorr(err: any) {
    console.log(err);
  }
  const d = {} as Device;
  const [device, setDevice] = useState<Device>(d);

  async function onClickFindDevice() {
    try {
      const result = await validateDeviceId(txtDevice);
      if (!result.data) {
        toast('ไม่มี DeviceID นี้ในระบบ', 'error');
      } else {
        result.data.is_active === true
          ? toast('DeviceID นี้มีผู้ใช้งานแล้ว', 'error')
          : returnMonitor(el_id, txtDevice);
        setStatus(false);
      }
    } catch (error: unknown) {
      toast(JSON.stringify(error), 'error');
    }
    // if (result) {
    //   const validate = Boolean(result.find(r => r.device_id.includes(txtDevice)))
    //   if (validate) {
    //     const findUse = Boolean(monitor.find((r: ChartMonitor) => r.device_id === txtDevice))
    //     console.log('has a monitor: ', findUse);
    //     if (!findUse) {
    //       returnMonitor(el_id, txtDevice)

    //     }
    //     else {
    //       toast('is used!', 'error')
    //     }
    //   }
    //   else {
    //     toast('is not device_id', 'error')
    //     setTxtDevice('')
    //   }
    // }
  }

  return (
    <div>
      <div className="monitorItems">
        <p
          className="create_monitor"
          onClick={() => setStatus(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            textAlign: 'center',
            width: '4rem',
            height: '4rem',
            borderRadius: '4.5rem',
            background: 'whitesmoke',
            cursor: 'pointer',
          }}
        >
          +
        </p>
      </div>
      {status === true ? (
        <div className="modal_create_monitor">
          <p
            style={{ fontSize: '3rem', cursor: 'pointer', color: 'white' }}
            onClick={() => setStatus(false)}
          >
            x
          </p>
          <div className="modal_item_open">
            <div style={{ display: 'flex' }}>
              <TextField
                id="filled-basic"
                label="Device id"
                value={txtDevice}
                onChange={(e) => setTxtDevice(e.target.value)}
                variant="filled"
              />
              <Button
                variant="contained"
                type="button"
                onClick={onClickFindDevice}
                style={{ background: '#1976d2' }}
              >
                Add
              </Button>
            </div>
            <Fab
              variant="extended"
              style={{ height: '16rem', width: '16rem' }}
              onClick={createMonitor}
            >
              <AddAPhotoIcon style={{ height: '11rem', width: '11rem' }} />
            </Fab>
          </div>
        </div>
      ) : null}
      {camera === true ? (
        <div className="modal_create_monitor">
          <p
            style={{ fontSize: '3rem', cursor: 'pointer', color: 'white' }}
            onClick={() => setCamera(false)}
          >
            x
          </p>
          <div className="modal_item_open">
            <div style={{ display: 'flex' }}>
              <TextField
                id="filled-basic"
                label="Device id"
                value={txtDevice}
                onChange={(e) => setTxtDevice(e.target.value)}
                variant="filled"
              />
              <Button
                variant="contained"
                type="button"
                onClick={onClickFindDevice}
              >
                Add
              </Button>
            </div>
            <Camera
              onChangeScanSuccess={getOnchange}
              onChangeScanFailure={getOnErorr}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
