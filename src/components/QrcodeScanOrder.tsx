
import React, { useEffect, useRef, useState } from 'react';
import QrScanner from 'qr-scanner';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import { Button, IconButton, TextField } from '@mui/material';
import styled from 'styled-components';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';

import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';

import CheckIcon from '@mui/icons-material/Check';
import ToggleButton from '@mui/material/ToggleButton';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import BakeryDiningIcon from '@mui/icons-material/BakeryDining';
import CloseIcon from '@mui/icons-material/Close';

type Props = {
    onSendResult: (key: string) => void
    onClickSearch: (txt: string) => void
    onSetDefault: () => void
}

export default function QRScannerOrder({ onSendResult, onClickSearch, onSetDefault }: Props) {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const qrScannerRef = useRef<QrScanner | null>(null); // เก็บ instance ของ QrScanner
    const [scanResult, setScanResult] = useState<string | null>(null);
    const [isCameraActive, setIsCameraActive] = useState<boolean>(false); // สำหรับเปิด/ปิดกล้อง
    const [open, setOpen] = useState(false)
    const [cameraCount, setCameraCount] = useState<{ id: string, label: string }[]>({} as { id: string, label: string }[])
    const [currentCamera, setCurrentCamera] = useState<{ id: string, label: string }>({} as { id: string, label: string })
    const [str, setStr] = useState<string>('')
    let intervals: any
    const [selected, setSelected] = React.useState(false);


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
            setStr(result)
        }
    };

    useEffect(() => {
        autoSelectCamera()
        // Cleanup when the component unmounts
        return () => {
            qrScannerRef.current?.stop();
            qrScannerRef.current?.destroy();
            clearInterval(intervals)
            autoSelectCamera()
        };
    }, [autoSelectCamera]);

    return (
        <>
            <React.Fragment>
                <Card
                    data-resizable
                    sx={{
                        textAlign: 'center',
                        alignItems: 'center',
                        maxWidth: 483,
                        // to make the demo resizable
                        overflow: 'auto',
                        resize: 'horizontal',
                        '--icon-size': '100px',
                    }}
                >
                    <CardOverflow variant="solid" color="primary" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', flexDirection: 'row' }}>
                        <AspectRatio
                            variant="outlined"
                            color="primary"
                            ratio="1"
                            sx={{
                                cursor: 'pointer',
                                m: 'auto',
                                transform: 'translateY(50%)',
                                borderRadius: '50%',
                                width: 'var(--icon-size)',
                                boxShadow: 'sm',
                                bgcolor: 'background.surface',
                                position: 'relative',
                            }}
                        >
                            <div onClick={toggleCamera}>
                                <CameraAltIcon color="primary" sx={{ fontSize: '4rem' }} />
                            </div>
                        </AspectRatio>
                        <AspectRatio
                            variant="outlined"
                            color="success"
                            ratio="1"
                            sx={{
                                cursor: 'pointer',
                                m: 'auto',
                                transform: 'translateY(50%)',
                                borderRadius: '50%',
                                width: 'var(--icon-size)',
                                boxShadow: 'sm',
                                bgcolor: 'background.surface',
                                position: 'relative',
                            }}
                        >
                            <div onClick={() => document.getElementById('uploadBarcode')?.click()}>
                                <DriveFolderUploadIcon color="success" sx={{ fontSize: '4rem' }} />
                            </div>
                        </AspectRatio>

                        <AspectRatio
                            variant="outlined"
                            color="neutral"
                            ratio="1"
                            sx={{
                                cursor: 'pointer',
                                m: 'auto',
                                transform: 'translateY(50%)',
                                borderRadius: '50%',
                                width: 'var(--icon-size)',
                                boxShadow: 'sm',
                                bgcolor: 'background.surface',
                                position: 'relative',
                            }}
                        >
                            <div>
                                <ToggleButton
                                    value="check"
                                    selected={selected}
                                    color='secondary'
                                    onChange={() => setSelected((prevSelected) => !prevSelected)}
                                >
                                    <KeyboardIcon color={selected ? 'action' : "secondary"} sx={{ fontSize: '4rem' }} />

                                </ToggleButton>
                            </div>
                        </AspectRatio>
                    </CardOverflow>
                    <Typography level="title-lg" sx={{ mt: 'calc(var(--icon-size) / 2)' }}>
                        เลื่อรูปแบบในการกรอก Device Id
                    </Typography>
                    <CardContent sx={{ maxWidth: '40ch' }}>
                        {
                            selected || str.length > 0?
                            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
                                <TextField onChange={(e) => {
                                    setStr(e.target.value)
                                }}  value={str?? ''} id="outlined-basic" label="พิมพ์ Device Id" variant="outlined" />
                                <IconButton style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}} onClick={() => {
                                    setScanResult('')
                                    setSelected(false)
                                }}>
                                    <CloseIcon />
                                    <p>clear</p>
                                </IconButton>
                            </div>
                            :
                            null
                        }
                    </CardContent>
                    <CardActions
                        orientation="vertical"
                        buttonFlex={1}
                        sx={{
                            '--Button-radius': '40px',
                            width: 'clamp(min(100%, 160px), 50%, min(100%, 200px))',
                        }}
                    >
                        {
                            selected || str.length > 0?
                                <Button variant='contained' type='button' color="primary" onClick={() => {
                                    console.log(str);
                                    onClickSearch(str)
                                }}>
                                    เพิ่มจอแสดงกราฟ
                                </Button>:
                                null
                        }
                        
                    </CardActions>
                </Card>
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
