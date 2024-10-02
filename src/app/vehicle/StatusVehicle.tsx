'use client'
import * as React from 'react';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardActions from '@mui/joy/CardActions';
import CircularProgress from '@mui/joy/CircularProgress';
import Typography from '@mui/joy/Typography';
import SvgIcon from '@mui/joy/SvgIcon';
import HourglassFullTwoToneIcon from '@mui/icons-material/HourglassFullTwoTone';
import Loadding from '@/components/Loadding';

type Props = {
    statusbol: boolean
    mission_id: string
    isDriver: boolean
}

export default function StatusVehicle({mission_id, statusbol, isDriver}: Props) {
    const [load, setLoad] = React.useState<boolean>(false)

    return (
        <>
            <Card variant="soft" color={statusbol? "warning": "success"} invertedColors>
                <CardContent orientation="horizontal">
                    <CircularProgress size="lg" determinate value={20}>
                        <SvgIcon>
                            <HourglassFullTwoToneIcon />
                        </SvgIcon>
                    </CircularProgress>
                    <CardContent>
                        <Typography level="body-md">สถานะของยานพาหนะของคุณ</Typography>
                        <Typography level="h4">กำลังปฏิบัติภารกิจ</Typography>
                    </CardContent>
                </CardContent>
                <Typography
                            textColor="text.secondary"
                            sx={{ fontSize: 'sm', fontWeight: 'md' }}
                            className='m-4'
                        >
                            คุณคือ
                            {
                                isDriver ?
                                    <Typography
                                        textColor="warning.400"
                                        className='ml-3'
                                        sx={{ fontSize: 'xl2', fontWeight: 'xl', mt: 1 }}
                                    >
                                        ผลขับรถ
                                    </Typography>
                                    : <Typography
                                        className='ml-3'
                                        textColor="warning.400"
                                        sx={{ fontSize: 'xl2', fontWeight: 'xl', mt: 1 }}
                                    >
                                        เจ้าหน้าที่รถ
                                    </Typography>
                            }

                        </Typography>
                <CardActions>
                    <Button variant="solid" size="sm" onClick={() => {
                        setLoad(true)
                        window.location.href = '/mission/'+ mission_id + '/mission_detail'
                    }}>
                        รายละเอียดภารกิจ
                    </Button>
                </CardActions>
            </Card>

            {
                load?
                <Loadding />:
                null
            }
        </>
    );
}