'use client';

import { TStyleButton, TStyleThem, TStyleThemAuto } from '@/app/styles/themes';
import React, { useEffect, useRef, useState } from 'react';
import newLogo from '@/assets/image/icon_menu/logo4.png'
import { Avatar, Badge, Card, Divider, FormControl, TextField } from '@mui/material';

import LockIcon from '@mui/icons-material/Lock';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PasswordIcon from '@mui/icons-material/Password';
import MailIcon from '@mui/icons-material/Mail';
import WorkIcon from '@mui/icons-material/Work';
import PhoneIcon from '@mui/icons-material/Phone';
import CreditCardIcon from '@mui/icons-material/CreditCard';

import styled from 'styled-components';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Users } from '@/models/users.model';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { Button } from '@mui/joy';
import { uploadImage } from '@/services/uploadImage.service';
import { toast } from '@/services/alert.service';

import BadgeIcon from '@mui/icons-material/Badge';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Loadding from '@/components/Loadding';
import { registerByUser } from '@/services/user.service';

const FormControlInputStyle = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
width: 100%;
margin-top: 5px;

p{
    position: absolute;
    margin-bottom: 28px;
    margin-left: 100px;
    font-size: 14px;
}

`

type ErrorMessage = {
    username: boolean
    password: boolean
    first_name: boolean
    last_name: boolean
    ck_passowrd: boolean
    email: boolean
    id_card: boolean
    phone: boolean
    career: boolean
    image: boolean
}

export default function Page() {

    const [hw, setHw] = useState(0)
    const [formUser, setFormUser] = useState<Users>({} as Users)
    const [load, setLoad] = useState<boolean>(false)
    const [err, setErr] = useState<ErrorMessage>({
        username: false,
        password: false,
        first_name: false,
        last_name: false,
        ck_passowrd: false,
        email: false,
        id_card: false,
        phone: false,
        career: false,
        image: false
    })
    const [ckPass, setCkPass] = useState<string>('')

    async function onRegister() {
        if (
            !formUser.username || !formUser.password || !formUser.first_name ||
            !formUser.last_name || !formUser.image || !formUser.email ||
            !formUser.phone_number || !formUser.career || !formUser.id_card
        ) {
            toast('กรุณากรอกข้อมูลให้ครบ', 'error')
            return
        }
        else{
            setLoad(true)
            try {
                const result = await registerByUser(formUser)
                window.location.href = `/login?username=${result.data.username}`
            } catch (error: any) {
                toast(JSON.stringify(error.message), 'error')
            } finally {
                setLoad(false)
            }
        }

    }

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setHw(window.innerHeight)

        }
    }, []);


    return (
        <>
            <TStyleThemAuto style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                <Button variant='soft' color='neutral' onClick={() => {
                    setLoad(true)
                    window.location.href = '/login'
                }} className='btn_back'><ArrowBackIcon /></Button>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', flexDirection: 'column', maxHeight: 790 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                        <p style={{ fontSize: '2.4rem' }}>สมัครมาชิก</p>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <img style={{ width: '1.8rem' }} src={newLogo.src} alt="" />
                            <p style={{ marginLeft: '10px', color: 'white', fontSize: '1.5rem', fontWeight: 700 }}>Emsink</p>
                        </div>
                    </div>

                    <Card elevation={4} style={{ width: 340, padding: '10px 20px', marginTop: '10px' }}>

                        <FormControlInputStyle id='username'>
                            <div style={{ height: '1rem' }}>
                                <AccountCircleIcon />
                            </div>
                            <TextField error={err.username} onChange={(e) => {
                                setErr({ ...err, username: false })

                                if (e.target.value.length < 8) setErr({ ...err, username: true })
                                else setFormUser({ ...formUser, username: e.target.value.toLocaleLowerCase() })
                            }} type='text' style={{ width: 300, marginLeft: '10px' }} label="ยูเซอร์เนม" variant="standard" />
                            {err.username ? <p style={{ color: 'red' }}>*ยูเซอร์เนมน้อยกว่า 8 ตัวอักษร</p> : null}
                        </FormControlInputStyle>

                        <FormControlInputStyle id='password'>
                            <div style={{ height: '1rem' }}>
                                <LockIcon />
                            </div>
                            <TextField error={err.password} onChange={(e) => {
                                setErr({ ...err, password: false })

                                if (e.target.value.length < 8) setErr({ ...err, password: true })
                                else setCkPass(e.target.value)

                            }} type='password' style={{ width: 300, marginLeft: '10px' }} label="พาสเวิร์ด" variant="standard" />
                            {err?.password ? <p style={{ color: 'red' }}>*พาสเวิร์ดน้อยกว่า 7 ตัวอักษร</p> : null}
                        </FormControlInputStyle>

                        <FormControlInputStyle id='ChkPass'>
                            <div style={{ height: '1rem' }}>
                                <PasswordIcon />
                            </div>
                            <TextField error={err.ck_passowrd} onChange={(e) => {
                                if (e) {
                                    setErr({ ...err, ck_passowrd: false })
                                    if (e.target.value.includes(ckPass)) {
                                        setFormUser({ ...formUser, password: e.target.value })
                                    }
                                    else {
                                        setErr({ ...err, ck_passowrd: true })
                                    }

                                }
                                // setFormUser({...formUser, phone_number: e.target.value})
                            }} type='password' style={{ width: 300, marginLeft: '10px' }} label="เช็ค พาสเวิร์ด" variant="standard" />
                            {err.ck_passowrd ? <p style={{ color: 'red' }}>*พาสเวิร์ดไม่ตรงกัน</p> : null}
                        </FormControlInputStyle>

                        <FormControlInputStyle>
                            <div style={{ height: '1rem' }}>
                                <BadgeIcon />
                            </div>
                            <TextField error={err.first_name} onChange={(e) => {
                                setErr({ ...err, first_name: false })

                                if (e.target.value.length < 5) setErr({ ...err, first_name: true })
                                else setFormUser({ ...formUser, first_name: e.target.value })
                            }} type='text' style={{ width: 300, marginLeft: '10px' }} label="ชื่อ" variant="standard" />
                            {err.first_name ? <p style={{ color: 'red' }}>*ชื่อสั้นเกินไป</p> : null}
                        </FormControlInputStyle>

                        <FormControlInputStyle>
                            <div style={{ height: '1rem' }}>
                                <BadgeIcon />
                            </div>
                            <TextField error={err.last_name} onChange={(e) => {
                                setErr({ ...err, last_name: false })

                                if (e.target.value.length < 5) setErr({ ...err, last_name: true })
                                else setFormUser({ ...formUser, last_name: e.target.value })
                            }} type='text' style={{ width: 300, marginLeft: '10px' }} label="นามสกุล" variant="standard" />
                            {err.last_name ? <p style={{ color: 'red' }}>*นามสกุลสั้นเกินไป</p> : null}
                        </FormControlInputStyle>

                        <FormControlInputStyle>
                            <div style={{ height: '1rem' }}>
                                <MailIcon />
                            </div>
                            <TextField error={err.email} onChange={(e) => {
                                setErr({ ...err, email: false })

                                if (e.target.value.includes('@')) setFormUser({ ...formUser, email: e.target.value })
                                else setErr({ ...err, email: true })
                            }} type='text' style={{ width: 300, marginLeft: '10px' }} label="อีเมล" variant="standard" />
                            {err.email ? <p style={{ color: 'red' }}>*อีเมลไม่ถูกต้อง</p> : null}
                        </FormControlInputStyle>

                        <FormControlInputStyle>
                            <div style={{ height: '1rem' }}>
                                <CreditCardIcon />
                            </div>
                            <TextField
                                error={err.id_card}
                                value={formUser.id_card || ''} // ใช้ค่า id_card จาก state
                                onChange={(e) => {
                                    // กรองเฉพาะตัวเลข
                                    const numericValue = e.target.value.replace(/[^0-9]/g, '');

                                    // สร้างรูปแบบใหม่
                                    let formattedValue = '';
                                    for (let i = 0; i < numericValue.length; i++) {
                                        if (i === 1 || i === 5 || i === 10) {
                                            formattedValue += '-'; // เพิ่มขีดถ้าถึงตำแหน่งที่กำหนด
                                        }
                                        formattedValue += numericValue[i];
                                    }

                                    setErr({ ...err, id_card: false });

                                    // ตรวจสอบความยาวไม่เกิน 13 ตัว
                                    if (formattedValue.replace(/-/g, '').length <= 13) {
                                        setFormUser({ ...formUser, id_card: formattedValue });
                                    }

                                    // แสดงข้อความเตือนถ้า id_card น้อยกว่า 13 หลัก
                                    if (formattedValue.replace(/-/g, '').length < 13) {
                                        setErr({ ...err, id_card: true });
                                    }
                                }}
                                onKeyPress={(e) => {
                                    // ตรวจสอบว่าเป็นตัวเลขหรือไม่
                                    if (!/[0-9]/.test(e.key)) {
                                        e.preventDefault(); // ป้องกันการกรอกตัวอักษร
                                    }
                                }}
                                type='text'
                                style={{ width: 300, marginLeft: '10px' }}
                                inputProps={{ maxLength: 16 }} // จำกัดจำนวนตัวอักษรสูงสุด (รวมขีด)
                                label="บัตรประชาชน"
                                variant="standard"
                            />
                            {err.id_card ? <p style={{ color: 'red' }}>*บัตรประชาชนต้องมี 13 หลัก</p> : null}
                        </FormControlInputStyle>

                        <FormControlInputStyle>
                            <div style={{ height: '1rem' }}>
                                <PhoneIcon />
                            </div>
                            <TextField
                                error={err.phone}
                                value={formUser.phone_number || ''} // ใช้ค่า phone_number จาก state
                                onChange={(e) => {
                                    const rawValue = e.target.value.replace(/[^0-9]/g, ''); // กรองเฉพาะตัวเลข
                                    setErr({ ...err, phone: false });

                                    // สร้างรูปแบบใหม่
                                    let formattedValue = '';
                                    for (let i = 0; i < rawValue.length; i++) {
                                        if (i === 3 || i === 6) {
                                            formattedValue += '-'; // เพิ่มขีดถ้าถึงตำแหน่งที่กำหนด
                                        }
                                        formattedValue += rawValue[i];
                                    }
                                    if (rawValue.length < 9) {
                                        setErr({ ...err, phone: true });
                                    }
                                    if (rawValue.length <= 10) {
                                        setFormUser({ ...formUser, phone_number: formattedValue })
                                    }
                                }}
                                type='text'
                                style={{ width: 300, marginLeft: '10px' }}
                                label="เบอร์"
                                variant="standard"
                            />
                            {err.phone && <p style={{ color: 'red' }}>*เบอร์น้อยกว่า 9 หลัก</p>}
                        </FormControlInputStyle>

                        <FormControlInputStyle>
                            <div style={{ height: '1rem' }}>
                                <WorkIcon />
                            </div>
                            <FormControl style={{ marginLeft: '10px' }} fullWidth size='small' variant='standard'>
                                <InputLabel id="demo-simple-select-label">อาชีพ</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={formUser.career ?? ''}
                                    label=""
                                    onChange={(e) => setFormUser({ ...formUser, career: e.target.value })}
                                >
                                    <MenuItem value={'medic'}>แพทย์</MenuItem>
                                    <MenuItem value={'medic_officers'}>เจ้าหน้าที่ทางการแพทย์</MenuItem>
                                    <MenuItem value={'government_officers'}>เจ้าหน้าที่ภาครัฐ</MenuItem>
                                    <MenuItem value={'general_publics'}>บุคคลทั่วไป</MenuItem>
                                </Select>
                            </FormControl>
                        </FormControlInputStyle>
                        <FormControlInputStyle>
                            <CameraAltIcon />
                            {
                                !formUser.image ?
                                    <Button sx={{ marginLeft: '10px' }} fullWidth onClick={() => document.getElementById('imageProfile')?.click()} variant='outlined' color='neutral'>เปิดกล้อง/อัพโหลดรูปภาพ</Button> :
                                    <div onClick={() => document.getElementById('imageProfile')?.click()} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' , cursor: 'pointer'}}>
                                        <Badge badgeContent={'x'} color="error" sx={{ marginTop: '10px' }}>
                                            <Avatar
                                                alt="Remy Sharp"
                                                src={formUser.image}
                                                sx={{ width: 86, height: 86 }}
                                            />
                                        </Badge>
                                    </div>
                            }
                            <input type="file" id='imageProfile' hidden onChange={async (e) => {
                                if (e.target.files) {
                                    const file = e.target.files[0]
                                    const formData = new FormData()
                                    formData.append('file', file)
                                    setLoad(true)
                                    try {
                                        const image = await uploadImage(formData)
                                        setFormUser({ ...formUser, image: image.data.result })
                                    } catch (error) {
                                        toast('ฮัพโหลดรุปภาพไม่สำเร็จ', 'error')
                                    } finally {
                                        setLoad(false)
                                    }
                                }
                            }} />

                        </FormControlInputStyle>
                        <Divider sx={{ margin: '10px 0' }} />
                        <TStyleButton onClick={onRegister} style={{ padding: 10, width: '100%' }}>
                            สมัครสมาชิก
                        </TStyleButton>
                    </Card>
                </div>
            </TStyleThemAuto>

            {
                load ?
                    <Loadding />
                    : null
            }
        </>
    );
}
