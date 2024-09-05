import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import InfoIcon from '@mui/icons-material/Info';
import { Cars } from '@/models/vehicle.model';
import { Button, Chip } from '@mui/material';
import { findCarByCarId, updateDriverInCar, updateUserInCar } from '@/services/car.service';
import { timeOutJwt } from '@/services/timeout.service';
import Loadding from '@/components/Loadding';
import { TabValueVehicleContext, TtabvalueC } from './tabValue.context';

import DetailIcon from '@/assets/icon/detail.png'
import EditIcon from '@/assets/icon/eidt.png'
import PatientIcon from '@/assets/icon/patient_menu.png'
import EmployeIcon from '@/assets/icon/employees.png'

import vehicleCss from './vehicle.module.css'

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
    car_id?: string
}

export default function CarCard({ data, car_id }: Props) {
    const [car, setCar] = React.useState<Cars>(data)
    const [expanded, setExpanded] = React.useState(false);
    const [load, setLoad] = React.useState<boolean>(false);
    const { value, setValue } = React.useContext<TtabvalueC>(TabValueVehicleContext)

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
        } catch (error) {
            timeOutJwt(error)
        } finally {
            setLoad(false)
        }
    }, [car_id])

    async function handlerAddUserInCar() {
        try {
            await updateUserInCar(car.id)
            setValue(0)
        } catch (error) {
            timeOutJwt(error)
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
            <Card sx={{ maxWidth: 345, marginTop: '15px' }} elevation={8}>
                <CardHeader
                    action={
                        car.status === 'NotInUse' ?
                            <Chip color='error' label="ออฟไลน์" /> :
                            <Chip color='success' label="ออนไลน์" />
                    }
                    title={car.calling}
                    subheader={car.driver_id ? car.driver_id : 'ยังไม่มีผลขับรถ'}
                />
                <ImageList sx={{ maxWidth: 500, maxHeight: 450 }}>
                    <ImageListItem key="Subheader" cols={2}>
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
                            subtitle={'item.author'}
                            actionIcon={
                                <IconButton
                                    sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                    aria-label={`info about `}
                                >
                                    <InfoIcon />
                                </IconButton>
                            }
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
                            title={'หน้ารถ'}
                            subtitle={'item.author'}
                            actionIcon={
                                <IconButton
                                    sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                    aria-label={`info about `}
                                >
                                    <InfoIcon />
                                </IconButton>
                            }
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
                            title={'หน้ารถ'}
                            subtitle={'item.author'}
                            actionIcon={
                                <IconButton
                                    sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                    aria-label={`info about `}
                                >
                                    <InfoIcon />
                                </IconButton>
                            }
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
                            title={'หน้ารถ'}
                            subtitle={'item.author'}
                            actionIcon={
                                <IconButton
                                    sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                    aria-label={`info about `}
                                >
                                    <InfoIcon />
                                </IconButton>
                            }
                        />
                    </ImageListItem>
                </ImageList>
                <CardContent>
                    {
                        car_id ?
                            null :
                            <div>
                                {
                                    car.driver_id ?
                                        null :
                                        <Button type='button' onClick={hanlerAddDriver}>ขับรถ</Button>
                                }
                                <Button type='button' onClick={handlerAddUserInCar}>เข้ามร่วมรถ</Button>
                            </div>
                    }
                </CardContent>
                <CardActions disableSpacing onClick={handleExpandClick}>
                    <IconButton aria-label="add to favorites">
                        <ExpandMoreIcon />
                    </IconButton>
                    <IconButton aria-label="share">
                        <ShareIcon />
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
                                }} className={vehicleCss.menuItem} style={{cursor: 'pointer'}}>
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
                                }} className={vehicleCss.menuItem} style={{cursor: 'pointer'}}>
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
                                }} className={vehicleCss.menuItem} style={{cursor: 'pointer'}}>
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
                                }} className={vehicleCss.menuItem} style={{cursor: 'pointer'}}>
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
            </Card>

            {
                load ?
                    <Loadding /> :
                    null
            }
        </>
    );
}