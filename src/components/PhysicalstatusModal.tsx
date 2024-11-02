'use client'; // ต้องเพิ่มบรรทัดนี้สำหรับการใช้ client components ใน Next.js

import * as React from 'react';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import { PhysicalStatus, TriageLevels } from '@/models/historyDetail.model';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import CardTriageLevel from './CardTriageLevel';
import CardPhysicalStatus from './CardPhysicalStatus';
import { Chip, Divider } from '@mui/material';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import { useReactToPrint } from 'react-to-print';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Patients } from '@/models/patient';
import { HistoryInCar } from '@/app/home/vehicle/CarHistoryItem';

type Props = {
    historys: HistoryInCar
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    triageLevel: TriageLevels;
    physicalStatus: PhysicalStatus;
    name: {first_name: string, last_name: string, gender: string}
};

export default function PhysicalStatusModal({ open, setOpen, physicalStatus, triageLevel, historys, name }: Props) {
    const contentRef = React.useRef<HTMLDivElement>(null);
    const reactToPrintFn = useReactToPrint({ contentRef });
    const [selected, setSelected] = React.useState<{ triage: boolean; physic: boolean }>({ triage: true, physic: true });

    // ฟังก์ชันสำหรับการพิมพ์
    const handlePrint = useReactToPrint({
        contentRef: contentRef
    });

    const handleDownloadPDF = async () => {
        if (contentRef.current) {
            const canvas = await html2canvas(contentRef.current);
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();

            const imgWidth = 190; // กำหนดความกว้างของภาพใน PDF
            const pageHeight = pdf.internal.pageSize.height;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            let heightLeft = imgHeight;

            let position = 0;

            pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            while (heightLeft >= 0) {
                position = heightLeft;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            pdf.save(`${name.first_name}_${name.last_name}_${new Date(historys.create_date).toLocaleString('th-TH')}.pdf`);
        }
    };

    return (
        <React.Fragment>
            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={open}
                onClose={() => setOpen(false)}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
                <Sheet variant="outlined" sx={{ borderRadius: 'md', p: 3, boxShadow: 'lg' }}>
                    <ModalClose variant="plain" sx={{ m: 1 }} />
                    <Typography
                        component="h2"
                        id="modal-title"
                        level="h4"
                        textColor="inherit"
                        sx={{ fontWeight: 'lg', mb: 1 }}
                        className='modalBodyPhysical'
                    >
                        ข้อมูล
                    </Typography>
                    <div className='mt-4 mb-4'>
                        <Button onClick={() => handlePrint()} endDecorator={<LocalPrintshopIcon />}>ปริ้นเอกสาร</Button>
                        <Button className='ml-3' color='success' onClick={handleDownloadPDF} endDecorator={<FileDownloadIcon />}>ดาวน์โหลดเอกสาร</Button>
                    </div>
                    <div>
                        <FormGroup style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        onChange={(event) => setSelected({ ...selected, triage: event.target.checked })}
                                        checked={selected.triage}
                                    />
                                }
                                label="Triage level"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        onChange={(event) => setSelected({ ...selected, physic: event.target.checked })}
                                        checked={selected.physic}
                                    />
                                }
                                label="Physical Status"
                            />
                        </FormGroup>
                    </div>
                    <div style={{ overflow: 'scroll', height: '450px', background: '#f9f8f8' }}>
                        <div ref={contentRef} style={{padding: '20px 30px'}}>
                            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: "column", margin: '15px 0'}}>
                                <h1 style={{fontSize: '18px', fontWeight: 600}}>ข้อมูล Physical Status</h1>
                                <p>ของผู้ป่วย {name.gender.toLowerCase().includes("male")? 'นาย': 'นาง'}{name.first_name} {name.last_name}</p>
                            </div>
                            {selected.triage && (
                                <div className='mt-4'>
                                    <Divider className='mb-3'>Triage level</Divider>
                                    <CardTriageLevel triage={triageLevel} />
                                </div>
                            )}
                            {selected.physic && (
                                <div className='mt-4'>
                                    <Divider className='mb-4'>Physical Status</Divider>
                                    <CardPhysicalStatus physical={physicalStatus} />
                                </div>
                            )}
                        </div>
                    </div>
                </Sheet>
            </Modal>
        </React.Fragment>
    );
}

