'use client'
import DetailIcon from '@/assets/icon/detail.png';
import EditIcon from '@/assets/icon/eidt.png';
import EmployeIcon from '@/assets/icon/employees.png';
import PatientIcon from '@/assets/icon/patient_menu.png';
import Loadding from '@/components/Loadding';
import { Cars } from '@/models/vehicle.model';
import { toast } from '@/services/alert.service';
import { findCarByCarId, updateDriverInCar, updateUserInCar } from '@/services/car.service';
import { tranformPatientHelicopterToCar } from '@/services/helicopter.service';
import { timeOutJwt } from '@/services/timeout.service';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ShareIcon from '@mui/icons-material/Share';
import { Button, Chip } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Collapse from '@mui/material/Collapse';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import { styled } from '@mui/material/styles';
import { useSearchParams } from 'next/navigation';
import * as React from 'react';

import { TabValueVehicleContext, TtabvalueC } from './tabValue.context';
import vehicleCss from './vehicle.module.css';
import { Locations } from '@/models/location.model';
import { findLocationByUserId } from '@/services/user.service';

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

type Props = {
    data: Cars
    car_id?: string,
}

export default function CarCard({ data, car_id }: Props) {
    const [car, setCar] = React.useState<Cars>(data)
    const [expanded, setExpanded] = React.useState(false);
    const [load, setLoad] = React.useState<boolean>(false);
    const { value, setValue } = React.useContext<TtabvalueC>(TabValueVehicleContext)
    const [driverLocate, setDriverLocate] = React.useState<Locations[]>({} as Locations[])
    const twentyMinutesInMillis = 20 * 60 * 1000;

    const tranfrom = useSearchParams().get('tranfrom')

    const helicopter_id = useSearchParams().get('heliopter_id')
    const patient_id = useSearchParams().get('patient_id')

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    async function hanlerAddDriver() {
        setLoad(true)
        const user_id = localStorage.getItem('user_id')
        if (!user_id) {
            setLoad(false)
            window.location.href = '/login'
        }
        else {
            try {
                await updateDriverInCar(car.id, user_id)
                window.location.reload()
                setValue(0)
            } catch (error) {
                timeOutJwt(error)
            } finally {
                setLoad(false)
            }
        }
    }

    const feedCarById = React.useCallback(async (cId: string) => {
        setLoad(true)
        try {
            const result = await findCarByCarId(cId)
            setCar(result.data)
            const findLocate = await findLocationByUserId(result.data.Driver.id, 1, 3)
            setDriverLocate(findLocate.data)
        } catch (error) {
            timeOutJwt(error)
        } finally {
            setLoad(false)
        }
    }, [car_id])

    async function tranfromHeliocpterToCar() {
        setLoad(true)
        if (patient_id && car.id) {
            try {
                const data = {
                    patient_id: patient_id,
                    car_id: car.id
                }
                await tranformPatientHelicopterToCar(String(helicopter_id), data)
                history.back()
            } catch (error: any) {
                toast(error.message, 'error')
            } finally {
                setLoad(false)
            }
        }
        else {
            setLoad(false)
            toast('เกิดข้อผิดพลาด', 'warning')
        }
    }

    async function handlerAddUserInCar() {
        setLoad(true)
        try {
            await updateUserInCar(car.id)
            setValue(0)
            window.location.reload()
        } catch (error) {
            timeOutJwt(error)
        } finally {
            setLoad(false)
        }
    }

    React.useEffect(() => {
        if (car_id) {
            feedCarById(car_id)
            console.log('findata');
        }
    }, [feedCarById])

    return (
        <>
            <Card className='mt-4 flex flex-col lg:w-[320px] justify-center items-center w-[280px] h-[400px]' elevation={8}>
                <div>
                    <CardActions disableSpacing onClick={handleExpandClick}>
                        <CardHeader
                            className='text-start'
                            action={
                                new Date(driverLocate[0]?.create_date).getTime() > new Date(driverLocate[3]?.create_date).getTime() || new Date().getTime() - new Date(driverLocate[0]?.create_date).getTime() > twentyMinutesInMillis ?
                                    <Chip className='ml-2' color='error' label="off" /> :
                                    <Chip className='ml-2' color='success' label="on" />
                            }
                            title={car.calling}
                            subheader={car.driver_id ? <p>พลขับรถ</p> : 'ยังไม่มีผลขับรถ'}
                        />
                        <IconButton aria-label="add to favorites">
                            <ExpandMoreIcon />
                        </IconButton>
                        <ExpandMore
                            expand={expanded}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                        </ExpandMore>
                    </CardActions>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            <div>
                                <Card elevation={5}>
                                    <div onClick={() => {
                                        setLoad(true)
                                        window.location.href = '/vehicle/' + car.id + '/car/detail'
                                    }} className={vehicleCss.menuItem} style={{ cursor: 'pointer' }}>
                                        <img src={DetailIcon.src} style={{ height: '4rem', width: '4rem' }} alt="" />
                                        <div className={vehicleCss.menuDetail}>
                                            <h3>รายละเอียดรถ</h3>
                                            <p>detail</p>
                                        </div>
                                    </div>
                                </Card>
                                <Card elevation={5} className='mt-4'>
                                    <div onClick={() => {
                                        setLoad(true)
                                        window.location.href = '/vehicle/' + car.id + '/car'
                                    }} className={vehicleCss.menuItem} style={{ cursor: 'pointer' }}>
                                        <img src={EditIcon.src} style={{ height: '4rem', width: '4rem' }} alt="" />
                                        <div className={vehicleCss.menuDetail}>
                                            <h3>แก้ไขรถ</h3>
                                            <p>detail</p>
                                        </div>
                                    </div>
                                </Card>
                                <Card elevation={5} className='mt-4'>
                                    <div onClick={() => {
                                        setLoad(true)
                                        window.location.href = '/vehicle/' + car.id + '/car/detail?key=patient'
                                    }} className={vehicleCss.menuItem} style={{ cursor: 'pointer' }}>
                                        <img src={PatientIcon.src} style={{ height: '4rem', width: '4rem' }} alt="" />
                                        <div className={vehicleCss.menuDetail}>
                                            <h3>ผู้ป่วย</h3>
                                            <p>detail</p>
                                        </div>
                                    </div>
                                </Card>
                                <Card elevation={5} className='mt-4'>
                                    <div onClick={() => {
                                        setLoad(true)
                                        window.location.href = '/vehicle/' + car.id + '/car/detail?key=employes'
                                    }} className={vehicleCss.menuItem} style={{ cursor: 'pointer' }}>
                                        <img src={EmployeIcon.src} style={{ height: '4rem', width: '4rem' }} alt="" />
                                        <div className={vehicleCss.menuDetail}>
                                            <h3>สมาชิกยานพาหนะ</h3>
                                            <p>detail</p>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </CardContent>
                    </Collapse>
                </div>
                <ImageList className='w-[250px] h-[200px] object-contain shadow-md p-2'>
                    <ImageListItem cols={2}>
                        <ListSubheader component="div">ป้ายทะเบียน: {car.number}</ListSubheader>
                    </ImageListItem>
                    <ImageListItem >
                        <img
                            srcSet={car.image_front}
                            src={car.image_front}
                            alt={car.image_front}
                            loading="lazy"
                        />
                        <ImageListItemBar
                            title={'หน้ารถ'}
                        />
                    </ImageListItem>

                    <ImageListItem >
                        <img
                            srcSet={car.image_back}
                            src={car.image_back}
                            alt={car.image_back}
                            loading="lazy"
                        />
                        <ImageListItemBar
                            title={'หลังรถ'}
                        />
                    </ImageListItem>

                    <ImageListItem >
                        <img
                            srcSet={car.image_left}
                            src={car.image_left}
                            alt={car.image_left}
                            loading="lazy"
                        />
                        <ImageListItemBar
                            title={'ซ้ายรถ'}
                        />
                    </ImageListItem>

                    <ImageListItem >
                        <img
                            srcSet={car.image_rigth}
                            src={car.image_rigth}
                            alt={car.image_rigth}
                            loading="lazy"
                        />
                        <ImageListItemBar
                            title={'ขวารถ'}
                        />
                    </ImageListItem>
                </ImageList>
                <CardContent>
                    {
                        !tranfrom ?
                            helicopter_id ?
                                null :
                                <div>
                                    {
                                        car.driver_id ?
                                            null :
                                            <Button type='button' onClick={hanlerAddDriver}>ขับรถ</Button>
                                    }
                                    <Button type='button' onClick={handlerAddUserInCar}>เข้ามร่วม รถ</Button>
                                </div>
                            :
                            helicopter_id ? <Button style={{ width: '100%' }} color='success' variant='outlined' onClick={tranfromHeliocpterToCar}>ย้ายจาก ฮ. ไปรถ</Button> : null
                    }
                </CardContent>

            </Card>

            {
                load ?
                    <Loadding /> :
                    null
            }
        </>
    );
}