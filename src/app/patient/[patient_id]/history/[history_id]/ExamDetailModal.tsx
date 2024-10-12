'use client'
import * as React from 'react';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import { ExanShows } from '@/models/exan.model';

import AspectRatio from '@mui/joy/AspectRatio';
import Link from '@mui/joy/Link';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Chip from '@mui/joy/Chip';
import { convertStringToThai } from '@/services/exan.service';
import { usePathname } from 'next/navigation';
import { NIL } from 'uuid';
import Loadding from '@/components/Loadding';

type Props = {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    exam: ExanShows[]
    el_id: string
}

export default function ExamDetailModal({ open, setOpen, exam, el_id }: Props) {
    const pathName = usePathname()
    const [load, setLoad] = React.useState(false)
    return (
        <>
            <React.Fragment>
                {/* <Button variant="outlined" color="neutral" onClick={() => setOpen(true)}>
        Open modal
      </Button> */}
                <Modal
                    aria-labelledby="modal-title"
                    aria-describedby="modal-desc"
                    open={open}
                    onClose={() => setOpen(false)}
                    sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                >
                    <Sheet
                        variant="outlined"
                        sx={{ borderRadius: 'md', p: 3, boxShadow: 'lg', maxHeight: 580 }}

                    >
                        <ModalClose variant="plain" sx={{ m: 1 }} />
                        <Typography
                            component="div"

                            sx={{ fontWeight: 'lg', mb: 1, display: 'flex', alignItems: 'center', justifyItems: 'start' }}
                        >
                            <p style={{ fontWeight: 700, fontSize: '1.2rem' }}>รายละเอียดรูปภาพส่วน</p>
                            <p style={{ fontWeight: 700, fontSize: '1.2rem' }}>{convertStringToThai(el_id)}</p>
                        </Typography>
                        <div>
                            <Button onClick={() => {
                                setLoad(true)
                                window.location.href = pathName + '/exan/' + NIL + '?el_id=' + el_id
                            }} style={{ width: '100%', margin: '10px 0' }}>เพิ่มรูปภาพส่วน {convertStringToThai(el_id)}</Button>
                            <div style={{overflow: 'scroll', height: 380, background: 'rgb(237, 234, 234)' }}>
                                {
                                    Object.keys(exam).length === 0 ?
                                        <p>ยังไม่มีข้อมูล</p> :
                                        exam.map((r, i) => {
                                            if (r.element_id.includes(el_id)) {
                                                return (
                                                    <InteractiveCard key={i} data={r} />
                                                )
                                            }
                                            else {
                                                return
                                            }
                                        }
                                        )
                                }
                            </div>
                        </div>
                    </Sheet>
                </Modal>
            </React.Fragment>

            {
                load ?
                    <Loadding /> :
                    null
            }
        </>
    );

    function InteractiveCard(data: { data: ExanShows }) {
        return (
            <Card
                variant="outlined"
                orientation="horizontal"
                sx={{
                    margin: '5px',
                    width: 320,
                    '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' },
                }}
            >
                <AspectRatio ratio="1" sx={{ width: 90 }}>
                    <img
                        src={data.data.image}
                        loading="lazy"
                        alt=""
                    />
                </AspectRatio>
                <CardContent>
                    <Typography level="title-lg" id="card-description">
                        {data.data.text}
                    </Typography>
                    <Typography
                        level="body-sm"
                        aria-describedby="card-description"
                        sx={{ mb: 1 }}
                    >
                        <Link
                            overlay
                            underline="none"
                            href="#interactive-card"
                            sx={{ color: 'text.tertiary' }}
                        >
                            อัพโหลดเมื่อ: {new Date(data.data.create_date).toLocaleString('th-TH')}
                        </Link>
                    </Typography>
                    <Chip
                        variant="outlined"
                        color="primary"
                        size="sm"
                        sx={{ pointerEvents: 'none' }}
                    >
                        บาดแผลส่วน {convertStringToThai(data.data.element_id)}
                    </Chip>
                </CardContent>
            </Card>
        );
    }


}


