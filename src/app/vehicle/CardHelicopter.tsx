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
import { Cars, Helicopters } from '@/models/vehicle.model';
import { Button, Chip } from '@mui/material';
import { findCarByCarId, tranfromPatientCarToHelicopter, updateDriverInCar, updateUserInCar } from '@/services/car.service';
import { timeOutJwt } from '@/services/timeout.service';
import Loadding from '@/components/Loadding';
import { TabValueVehicleContext, TtabvalueC } from './tabValue.context';

import DetailIcon from '@/assets/icon/detail.png'
import EditIcon from '@/assets/icon/eidt.png'
import PatientIcon from '@/assets/icon/patient_menu.png'
import EmployeIcon from '@/assets/icon/employees.png'

import vehicleCss from './vehicle.module.css'
import { useSearchParams } from 'next/navigation';
import { toast } from '@/services/alert.service';
import { findHelicopterById, updateDriverInHelicopter, updateUserInHelicpter } from '@/services/helicopter.service';

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
    data: Helicopters
    ho_id?: string
}

export default function CardHelicopter({ data, ho_id }: Props) {
    const [helicopter, setHelicopter] = React.useState<Helicopters>(data)
    const [expanded, setExpanded] = React.useState(false);
    const [load, setLoad] = React.useState<boolean>(false);
    const { value, setValue } = React.useContext<TtabvalueC>(TabValueVehicleContext)
    const tranfrom = useSearchParams().get('tranfrom')
    const car_id = useSearchParams().get('car_id')
    const patient_id = useSearchParams().get('patient_id')

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    async function hanlerAddHelicopter() {
        setLoad(true)
        const user_id = localStorage.getItem('user_id')
        if (!user_id) {
            setLoad(false)
            window.location.href = '/login'
        }
        else {
            try {
                await updateDriverInHelicopter(helicopter.id, user_id)
                window.location.reload()
                setValue(0)
            } catch (error) {
                timeOutJwt(error)
            } finally {
                setLoad(false)
            }
        }
    }

    const feedHelicopter = React.useCallback(async (hId: string) => {
        setLoad(true)
        try {
            const result = await findHelicopterById(hId)
            setHelicopter(result.data)
        } catch (error) {
            timeOutJwt(error)
        } finally {
            setLoad(false)
        }
    }, [ho_id])

    async function handlerAddUserInHelicopter() {
        setLoad(true)
        try {
            await updateUserInHelicpter(helicopter.id)
            setValue(0)
        } catch (error) {
            timeOutJwt(error)
        } finally {
            setLoad(false)
        }
    }

    React.useEffect(() => {
        if (ho_id) {
            feedHelicopter(ho_id)
            console.log('findata');
        }

        return () => {
            feedHelicopter
        }
    }, [feedHelicopter])

    return (
        <>
            <Card sx={{ minWidth: 245, marginTop: '15px', width: '100%' }} elevation={8}>
                <CardHeader
                    title={helicopter.calling}
                    subheader={helicopter.driver_id ? helicopter.driver_id : 'ยังไม่มีผลขับรถ'}
                />
                <ImageList sx={{ minWidth: 205, minHeight: 200, width: '100%' }}>
                    <ImageListItem key="Subheader" cols={2}>
                        <ListSubheader component="div">ป้ายทะเบียน: {helicopter.number}</ListSubheader>
                    </ImageListItem>
                    <ImageListItem >
                        <img
                            srcSet={helicopter.image_front}
                            src={helicopter.image_front}
                            alt={helicopter.image_front}
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
                            srcSet={helicopter.image_back}
                            src={helicopter.image_back}
                            alt={helicopter.image_back}
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
                            srcSet={helicopter.image_left}
                            src={helicopter.image_left}
                            alt={helicopter.image_left}
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
                            srcSet={helicopter.image_rigth}
                            src={helicopter.image_rigth}
                            alt={helicopter.image_rigth}
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
                        !tranfrom ?
                            ho_id ?
                                null :
                                <div>
                                    {
                                        helicopter.driver_id ?
                                            null :
                                            <Button type='button' onClick={hanlerAddHelicopter}>ขับ ฮ.</Button>
                                    }
                                    <Button type='button' onClick={handlerAddUserInHelicopter}>เข้ามร่วม ฮ.</Button>
                                </div>
                            :
                            car_id ?
                                <Button style={{ width: '100%' }} color='success' variant='outlined' onClick={async () => {
                                    setLoad(true)
                                    if (patient_id && car_id) {
                                        try {
                                            const data = {
                                                patient_id: patient_id,
                                                helicopter_id: helicopter.id
                                            }
                                            const result = await tranfromPatientCarToHelicopter(car_id, data)
                                            console.log(result.data);
                                            history.back()
                                        } catch (error: any) {
                                            toast(error.message, 'error')
                                        }
                                    }
                                    else {
                                        setLoad(false)
                                        toast('เกิดข้อผิดพลาด', 'warning')
                                    }
                                }}>ย้ายจากรถไป ฮ.</Button> : null
                    }
                </CardContent>
                {
                    tranfrom ?
                        null :
                        <div>
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
                                                window.location.href = '/vehicle/' + helicopter.id + '/car/detail'
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
                                                window.location.href = '/vehicle/' + helicopter.id + '/car'
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
                                                window.location.href = '/vehicle/' + helicopter.id + '/car/detail?key=patient'
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
                                                window.location.href = '/vehicle/' + helicopter.id + '/car/detail?key=employes'
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
                }
            </Card>

            {
                load ?
                    <Loadding /> :
                    null
            }
        </>
    );
}