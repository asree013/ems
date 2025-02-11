'use client'
import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import { FindMeTabContext, TfindMeSubC } from './subContext/findMeTab.content';
import { Input } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { logout } from '@/services/authen.service';
import { enviromentDev } from '@/configs/enviroment.dev';

import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { editUserByUserCookie } from '@/services/user.service';
import { Users } from '@/models/users.model';
import { toast } from '@/services/alert.service';
import { timeOutJwt } from '@/services/timeout.service';
import Divider from '@mui/material/Divider';
import Loadding from './Loadding';
import { uploadBase64Image, uploadImage } from '@/services/uploadImage.service';

import style from './styles/Profile.module.css'

export default function ProfileComponent() {

    const { findMe, setFindMe } = React.useContext<TfindMeSubC>(FindMeTabContext)
    const [isEdit, setIsEdit] = React.useState<boolean>(false)
    const [load, setLoad] = React.useState<boolean>(false)

    async function handlerUploadImage(e: React.ChangeEvent<HTMLInputElement>) {
        setLoad(true)
        e.preventDefault()
        if (e.target.files) {
            try {
                const image = await uploadImage(e.target.files[0])
                const u = {} as Users
                u.image = String(image.data.result)
                await editUserByUserCookie(u)
                setFindMe({ ...findMe, image: String(image.data.result) })

                setLoad(false)
            } catch (error:any) {
                toast(error.message, 'error')
                setLoad(false)
            }
        }
    }

    async function handlerOnUpdateUser() {
        try {
            const result = await editUserByUserCookie(findMe)
            setFindMe(result.data)
            setIsEdit(false)
            toast('แก้ไขข้อมูลส่วนตัวสำเร็จ', 'success')

        } catch (error) {
            timeOutJwt(error)
            console.log(error);
        }
    }
    return (
        <>
            <Box
                sx={{

                    width: '100%',
                    position: 'relative',
                    overflow: { xs: 'auto', sm: 'initial' },
                }}
            >
                <Box
                />
                <Card
                    // orientation="horizontal"
                    sx={{
                        width: '100%',
                        overflow: 'auto',
                        resize: 'horizontal',
                    }}
                >
                    <ImageListItem className='flex flex-col items-center justify-center'>
                        <input type="file" id='img_profile' hidden onChange={handlerUploadImage} />
                        <img
                            src={`${findMe.image ?? enviromentDev.noImage}`}
                            alt={findMe.image}
                            loading="lazy"
                            style={{ width: '18rem', height: '18rem', objectFit: 'cover' }}
                            className="border border-gray-400 rounded-lg"
                        />
                        <button className='bg-gray-500 flex flex-row items-center justify-center p-3 rounded-lg text-white w-[300px]' onClick={() => document.getElementById('img_profile')?.click()}>
                            <p>คลิก เพื้อแก้ไข</p>
                            <IconButton
                                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                aria-label={`info about`}
                            >
                                <CameraAltIcon />
                            </IconButton>
                        </button>
                        {/* <ImageListItemBar
                                title={'คลิก'}
                                subtitle={'เพื้อแก้ไข'}
                                onClick={() => document.getElementById('img_profile')?.click()}
                                actionIcon={
                                    <IconButton
                                        sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                        aria-label={`info about`}
                                    >
                                        <CameraAltIcon />
                                    </IconButton>
                                }
                            /> */}
                    </ImageListItem>
                    <CardContent>
                        <Typography fontSize="xl" fontWeight="lg">
                            {findMe.first_name}
                        </Typography>
                        <Typography level="body-sm" fontWeight="lg" textColor="text.tertiary">
                            {findMe.last_name}
                        </Typography>
                        <Button color='danger' endDecorator={<ExitToAppIcon />} onClick={async () => {
                            localStorage.clear()
                            window.location.href = '/login'
                            await logout()
                        }} >ออกจากระบบ</Button>
                        {
                            isEdit === false ?
                                <div>
                                    <Sheet
                                        sx={{
                                            bgcolor: 'background.level1',
                                            borderRadius: 'sm',
                                            p: 1.5,
                                            my: 1.5,
                                            display: 'flex',
                                            gap: 2,
                                            '& > div': { flex: 1 },
                                        }}
                                    >
                                        <div>
                                            <Typography level="body-xs" fontWeight="lg">
                                                ชื่อ
                                            </Typography>
                                            <Typography fontWeight="lg">{findMe.first_name ?? 'ไม่มีข้อมูล'}</Typography>
                                        </div>
                                        <div>
                                            <Typography level="body-xs" fontWeight="lg">
                                                นามสกุล
                                            </Typography>
                                            <Typography fontWeight="lg">{findMe.last_name ?? 'ไม่มีข้อมูล'}</Typography>
                                        </div>
                                    </Sheet>
                                    <Sheet
                                        sx={{
                                            bgcolor: 'background.level1',
                                            borderRadius: 'sm',
                                            p: 1.5,
                                            my: 1.5,
                                            display: 'flex',
                                            gap: 2,
                                            '& > div': { flex: 1 },
                                            zIndex: 0
                                        }}
                                    >
                                        <div>
                                            <Typography level="body-xs" fontWeight="lg">
                                                อีเมล
                                            </Typography>
                                            <Typography fontWeight="lg">{findMe.email ?? 'ไม่มีข้อมูล'}</Typography>
                                        </div>
                                        <div>
                                            <Typography level="body-xs" fontWeight="lg">
                                                อาชีพ
                                            </Typography>
                                            <Typography fontWeight="lg">{findMe.career ?? 'ไม่มีข้อมูล'}</Typography>
                                        </div>
                                    </Sheet>
                                    <Sheet
                                        sx={{
                                            bgcolor: 'background.level1',
                                            borderRadius: 'sm',
                                            p: 1.5,
                                            my: 1.5,
                                            display: 'flex',
                                            gap: 2,
                                            '& > div': { flex: 1 },
                                            zIndex: 0
                                        }}
                                    >
                                        <div>
                                            <Typography level="body-xs" fontWeight="lg">
                                                ที่อยู่
                                            </Typography>
                                            <Typography fontWeight="lg">{findMe.address ?? 'ไม่มีข้อมูล'}</Typography>
                                        </div>
                                        <div>
                                            <Typography level="body-xs" fontWeight="lg">
                                                เบอร์โทร
                                            </Typography>
                                            <Typography fontWeight="lg">{findMe.phone_number ?? 'ไม่มีข้อมูล'}</Typography>
                                        </div>
                                    </Sheet>
                                </div> :
                                <div>
                                    <Sheet
                                        sx={{
                                            bgcolor: 'background.level1',
                                            borderRadius: 'sm',
                                            p: 1.5,
                                            my: 1.5,
                                            display: 'flex',
                                            gap: 2,
                                            '& > div': { flex: 1 },
                                        }}
                                    >
                                        <div>
                                            <Typography level="body-xs" fontWeight="lg">
                                                ชื่อ
                                            </Typography>
                                            <Input type='text' onChange={(e) => setFindMe({ ...findMe, first_name: e.target.value })} value={findMe.first_name} />
                                        </div>
                                        <div>
                                            <Typography level="body-xs" fontWeight="lg">
                                                นามสกุล
                                            </Typography>
                                            <Input type='text' onChange={(e) => setFindMe({ ...findMe, last_name: e.target.value })} value={findMe.last_name} />
                                        </div>
                                    </Sheet>
                                    <Sheet
                                        sx={{
                                            bgcolor: 'background.level1',
                                            borderRadius: 'sm',
                                            p: 1.5,
                                            my: 1.5,
                                            display: 'flex',
                                            gap: 2,
                                            '& > div': { flex: 1 },
                                            zIndex: 0
                                        }}
                                    >
                                        <div>
                                            <Typography level="body-xs" fontWeight="lg">
                                                อีเมล
                                            </Typography>
                                            <Input type='text' onChange={(e) => setFindMe({ ...findMe, email: e.target.value })} value={findMe.email} />
                                        </div>
                                        <div>
                                            <Typography level="body-xs" fontWeight="lg">
                                                อาชีพ
                                            </Typography>
                                            <Input type='text' onChange={(e) => setFindMe({ ...findMe, career: e.target.value })} value={findMe.career} />
                                        </div>
                                    </Sheet>
                                    <Sheet
                                        sx={{
                                            bgcolor: 'background.level1',
                                            borderRadius: 'sm',
                                            p: 1.5,
                                            my: 1.5,
                                            display: 'flex',
                                            gap: 2,
                                            '& > div': { flex: 1 },
                                            zIndex: 0
                                        }}
                                    >
                                        <div>
                                            <Typography level="body-xs" fontWeight="lg">
                                                ที่อยู่
                                            </Typography>
                                            <Input type='text' onChange={(e) => setFindMe({ ...findMe, address: e.target.value })} value={findMe.address} />
                                        </div>
                                        <div>
                                            <Typography level="body-xs" fontWeight="lg">
                                                เบอร์โทร
                                            </Typography>
                                            <Input type='text' onChange={(e) => setFindMe({ ...findMe, phone_number: e.target.value })} value={findMe.phone_number} />
                                        </div>
                                    </Sheet>
                                </div>
                        }
                        <Divider>โรงพยาบาล</Divider>
                        {
                            findMe?.Hospital ?
                                <Button>เพื่มโรงพยาบาล</Button> :
                                <Sheet
                                    sx={{
                                        bgcolor: 'background.level1',
                                        borderRadius: 'sm',
                                        p: 1.5,
                                        my: 1.5,
                                        display: 'flex',
                                        gap: 2,
                                        '& > div': { flex: 1 },
                                        zIndex: 0
                                    }}
                                >
                                    <div>
                                        <Typography level="body-xs" fontWeight="lg">
                                            ชื่อโรงพยาบาล
                                        </Typography>
                                        <Typography fontWeight="lg">{findMe?.Hospital?.hospital_name ?? 'ไม่มีข้อมูล'}</Typography>
                                    </div>
                                    <div>
                                        <Typography level="body-xs" fontWeight="lg">
                                            เบอร์โทร
                                        </Typography>
                                        <Typography fontWeight="lg">{findMe?.Hospital?.hospital_tel ?? 'ไม่มีข้อมูล'}</Typography>
                                    </div>
                                </Sheet>
                        }
                        <Box sx={{ marginTop: '8px', display: 'flex', gap: 1.5, '& > button': { flex: 1 }, zIndex: 0 }}>
                            {
                                isEdit === false ?
                                    <Button variant="outlined" color="neutral" onClick={() => setIsEdit(true)}>
                                        แก้ไขข้อมูล
                                    </Button> :
                                    <Button variant="solid" color="primary" onClick={handlerOnUpdateUser}>
                                        บันทึกข้อมูล
                                    </Button>
                            }
                            {
                                isEdit === false ?
                                    <Button variant="solid" color="primary" endDecorator={<ExitToAppIcon />}>
                                        ย้อนกลับ
                                    </Button> :
                                    <Button variant="outlined" color="neutral" endDecorator={<ExitToAppIcon />} onClick={async () => {
                                        setIsEdit(false)
                                    }}>
                                        ยกเลิก
                                    </Button>
                            }
                        </Box>
                    </CardContent>
                </Card>
            </Box>

            {
                load ?
                    <Loadding /> :
                    null
            }
        </>
    );
}
