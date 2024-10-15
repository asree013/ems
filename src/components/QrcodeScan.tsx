
import React, { useEffect, useRef, useState } from 'react';
import QrScanner from 'qr-scanner';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import { Button } from '@mui/material';
import styled from 'styled-components';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import ClearIcon from '@mui/icons-material/Clear';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';

type Props = {
  onSendResult: (key: string) => void
  onClickSearch: (txt: string) => void
  onSetDefault: () => void
}

export default function QRScannerComponent({ onSendResult, onClickSearch, onSetDefault }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const qrScannerRef = useRef<QrScanner | null>(null); // เก็บ instance ของ QrScanner
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false); // สำหรับเปิด/ปิดกล้อง
  const [open, setOpen] = useState(false)
  const [cameraCount, setCameraCount] = useState<{ id: string, label: string }[]>({} as { id: string, label: string }[])
  const [currentCamera, setCurrentCamera] = useState<{ id: string, label: string }>({} as { id: string, label: string })
  const [str, setStr] = useState<string>('')
  let intervals: any

  // ฟังก์ชันเปิด/ปิดกล้อง
  const toggleCamera = () => {
    setOpen(true)
    intervals = setInterval(async () => {
      if (isCameraActive) {
        // ปิดกล้อง
        qrScannerRef.current?.stop();
        qrScannerRef.current?.destroy();
        qrScannerRef.current = null;
      } else {
        if (videoRef.current) {
          qrScannerRef.current = new QrScanner(
            videoRef.current,
            (result) => {
              setScanResult(result.data);
              onSendResult(result.data)
              qrScannerRef.current?.stop();
              qrScannerRef.current?.destroy();
              clearInterval(intervals)
              setOpen(false)
            },
            {
              onDecodeError: (error) => {
                console.error('QR Code decoding error:', error);
              },
            }
          );
          await qrScannerRef.current.start();

        }
      }
      setIsCameraActive((prev) => !prev);
      clearInterval(intervals)
    }, 500)
  };

  async function autoSelectCamera() {
    const data = await QrScanner.listCameras()
    const newData = data.filter(r => r.label.includes('ด้านหลัง'))
    if (!newData) {
      setCameraCount(data)
      setCurrentCamera(data[0])
      qrScannerRef.current?.setCamera(data[0].id)
    }
    else {
      setCameraCount(data)
      setCurrentCamera(newData[0])
      qrScannerRef.current?.setCamera(newData[0].id)
    }
  }

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const result = await QrScanner.scanImage(file);
      setScanResult(result);
      onSendResult(result);
    }
  };

  useEffect(() => {
    autoSelectCamera()
    // Cleanup when the component unmounts
    return () => {
      qrScannerRef.current?.stop();
      qrScannerRef.current?.destroy();
      clearInterval(intervals)
    };
  }, []);

  return (
    <>
      <React.Fragment>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', margin: '20px 0' }}>
          <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%' }}
            elevation={3}
          >
            <IconButton sx={{ p: '10px' }} aria-label="menu">
              <MenuIcon />
            </IconButton>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search Qr-Number"
              inputProps={{ 'aria-label': 'search google maps' }}
              onChange={(e) => {
                setStr(e.target.value)
              }}
              value={str}
            />
            {
              str.length >0 ?
              <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={() => {
                setStr('')
                onSetDefault()
              }} >
                <ClearIcon />
              </IconButton>: null
            }
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={() => {
              onClickSearch(str)
            }} >
              <SearchIcon />
            </IconButton>

            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions" onClick={toggleCamera}>
              <DocumentScannerIcon />
            </IconButton>

            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions" onClick={() => document.getElementById('uploadBarcode')?.click()}>
              <DriveFolderUploadIcon color='success' />
            </IconButton>
          </Paper>
        </div>
        <input id='uploadBarcode' onChange={handleUpload} type="file" hidden />
        <Modal
          aria-labelledby="modal-title"
          aria-describedby="modal-desc"
          open={open}
          onClose={() => {
            setOpen(false)
            qrScannerRef.current?.stop();
            qrScannerRef.current?.destroy();
            clearInterval(intervals)
          }}
          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <Sheet
            variant="outlined"
            sx={{ maxWidth: 500, borderRadius: 'md', p: 3, boxShadow: 'lg' }}
          >
            <ModalClose variant="plain" sx={{ m: 1 }} />
            <Typography
              component="h2"
              id="modal-title"
              level="h4"
              textColor="inherit"
              sx={{ fontWeight: 'lg', mb: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              This is the modal title
            </Typography>
            <FormControl >
              <FormLabel>จำนวนกล้องของคุณมี {cameraCount.length}</FormLabel>
              <RadioGroup onChange={async (e) => {
                const device = JSON.parse(e.target.value) as { id: string, label: string }
                if (qrScannerRef.current) {
                  setCurrentCamera(device)
                  alert('change cam' + device.label)
                  qrScannerRef.current.stop();
                  qrScannerRef.current.setCamera(device.id)
                  qrScannerRef.current.start()
                }

              }} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                name="radio-buttons-group" defaultValue={JSON.stringify(currentCamera)} value={JSON.stringify(currentCamera)}>
                {
                  cameraCount.length > 0 ?
                    cameraCount.map(r =>
                      <Radio key={r.id} value={JSON.stringify({ id: r.id, label: r.label })} label={r.label} variant="outlined" />
                    ) :
                    null
                }
              </RadioGroup>
            </FormControl>
            <div style={{ width: 200, height: 150, display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
              <video ref={videoRef} style={{ width: 200, height: 150 }} >
              </video>
            </div>
            <div>
              <p>ไม่มีข้อมูล</p>
            </div>
          </Sheet>
        </Modal>
      </React.Fragment >
    </>
  );
};
