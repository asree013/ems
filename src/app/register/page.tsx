'use client';

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
import axios from 'axios';


const Pelement = styled.p`
    position: absolute;
    margin-bottom: 28px;
    margin-left: 100px;
    font-size: 14px;
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
                await registerByUser(formUser);
                window.location.href = `/login`;
            } catch (error: any) {
                if (axios.isAxiosError(error)) {
                    console.error("❌ Axios Error:", error.response?.data || error.message);
                    toast(JSON.stringify(error.response?.data || error.message), "error");
                } else {
                    console.error("❌ Unknown Error:", error);
                    toast("เกิดข้อผิดพลาดที่ไม่คาดคิด", "error");
                }
            } finally {
                setLoad(false);
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
            <div className='w-full h-auto min-h-screen bg-gradient-to-t from-blue-gd-from to-blue-gd-to p-4' >
                <Button variant='soft' color='neutral' onClick={() => {
                    setLoad(true)
                    window.location.href = '/login'
                }} className='btn_back'><ArrowBackIcon /></Button>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', flexDirection: 'column', maxHeight: 790 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                        <p style={{ fontSize: '2.4rem' }} className='text-white'>สมัครมาชิก</p>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <img style={{ width: '1.8rem' }} src={newLogo.src} alt="" />
                            <p style={{ marginLeft: '10px', color: 'white', fontSize: '1.5rem', fontWeight: 700 }}>Marine-EMS</p>
                        </div>
                    </div>

                    <Card elevation={4} style={{ width: 340, padding: '10px 20px', marginTop: '10px' }} className='h-screen'>

                        <div className='flex items-center justify-between' id='username'>
                            <div style={{ height: '2rem', width: '20%' }}>
                                <AccountCircleIcon />
                            </div>
                            <TextField error={err.username} onChange={(e) => {
                                setErr({ ...err, username: false })

                                if (e.target.value.length < 8) setErr({ ...err, username: true })
                                else setFormUser({ ...formUser, username: e.target.value.toLocaleLowerCase() })
                            }} type='text' style={{ width: "100%", marginLeft: '10px' }} label="รหัสผู้ใช้งาน" variant="standard" />
                            {err.username ? <Pelement style={{ color: 'red' }}>*รหัสผู้ใช้งานน้อยกว่า 8 ตัวอักษร</Pelement> : null}
                        </div>

                        <div className='flex items-center justify-between' id='password'>
                            <div style={{ height: '1rem', width: '20%' }}>
                                <LockIcon />
                            </div>
                            <TextField error={err.password} onChange={(e) => {
                                setErr({ ...err, password: false })

                                if (e.target.value.length < 8) setErr({ ...err, password: true })
                                else setCkPass(e.target.value)

                            }} type='password' style={{ width: '100%', marginLeft: '10px' }} label="รหัสผ่าน" variant="standard" />
                            {err?.password ? <Pelement style={{ color: 'red' }}>*รหัสผ่านน้อยกว่า 7 ตัวอักษร</Pelement> : null}
                        </div>

                        <div className='flex items-center justify-between' id='ChkPass'>
                            <div style={{ height: '1rem', width: '20%' }}>
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
                            }} type='password' style={{ width: '100%', marginLeft: '10px' }} label="เช็ค รหัสผ่าน" variant="standard" />
                            {err.ck_passowrd ? <Pelement style={{ color: 'red' }}>*รหัสผ่านไม่ตรงกัน</Pelement> : null}
                        </div>

                        <div className='flex items-center justify-between'>
                            <div style={{ height: '1rem', width: '20%' }}>
                                <BadgeIcon />
                            </div>
                            <TextField error={err.first_name} onChange={(e) => {
                                setErr({ ...err, first_name: false })

                                if (e.target.value.length < 5) setErr({ ...err, first_name: true })
                                else setFormUser({ ...formUser, first_name: e.target.value })
                            }} type='text' style={{ width: '100%', marginLeft: '10px' }} label="ชื่อ" variant="standard" />
                            {err.first_name ? <Pelement style={{ color: 'red' }}>*ชื่อสั้นเกินไป</Pelement> : null}
                        </div>

                        <div className='flex items-center justify-between'>
                            <div style={{ height: '1rem', width: '20%' }}>
                                <BadgeIcon />
                            </div>
                            <TextField error={err.last_name} onChange={(e) => {
                                setErr({ ...err, last_name: false })

                                if (e.target.value.length < 5) setErr({ ...err, last_name: true })
                                else setFormUser({ ...formUser, last_name: e.target.value })
                            }} type='text' style={{ width: '100%', marginLeft: '10px' }} label="นามสกุล" variant="standard" />
                            {err.last_name ? <Pelement style={{ color: 'red' }}>*นามสกุลสั้นเกินไป</Pelement> : null}
                        </div>

                        <div className='flex items-center justify-between'>
                            <div style={{ height: '1rem', width: '20%' }}>
                                <MailIcon />
                            </div>
                            <TextField error={err.email} onChange={(e) => {
                                setErr({ ...err, email: false })

                                if (e.target.value.includes('@')) setFormUser({ ...formUser, email: e.target.value })
                                else setErr({ ...err, email: true })
                            }} type='text' style={{ width: '100%', marginLeft: '10px' }} label="อีเมล" variant="standard" />
                            {err.email ? <p style={{ color: 'red' }}>*อีเมลไม่ถูกต้อง</p> : null}
                        </div>

                        <div className='flex items-center justify-between'>
                            <div style={{ height: '1rem', width: '20%' }}>
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
                                style={{ width: '100%', marginLeft: '10px' }}
                                inputProps={{ maxLength: 16 }} // จำกัดจำนวนตัวอักษรสูงสุด (รวมขีด)
                                label="บัตรประชาชน"
                                variant="standard"
                            />
                            {err.id_card ? <p style={{ color: 'red' }}>*บัตรประชาชนต้องมี 13 หลัก</p> : null}
                        </div>

                        <div className='flex items-center justify-between'>
                            <div style={{ height: '1rem', width: '20%' }}>
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
                                style={{ width: '100%', marginLeft: '10px' }}
                                label="เบอร์"
                                variant="standard"
                            />
                            {err.phone && <p style={{ color: 'red' }}>*เบอร์น้อยกว่า 9 หลัก</p>}
                        </div>

                        <div className='flex items-center justify-between'>
                            <div style={{ height: '1rem', width: '20%' }}>
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
                        </div>
                        <div className='flex items-center justify-between mt-2'>
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
                                    setLoad(true)
                                    try {
                                        const image = await uploadImage(file)
                                        setFormUser({ ...formUser, image: image.data.result })
                                    } catch (error) {
                                        toast('ฮัพโหลดรุปภาพไม่สำเร็จ', 'error')
                                    } finally {
                                        setLoad(false)
                                    }
                                }
                            }} />
                            <p className='text-sm text-red-500'>*จำเป็น</p>

                        </div>
                        <Divider sx={{ margin: '10px 0' }} />
                        <button className='bg-gradient-to-t from-blue-gd-from to-blue-gd-to text-white p-2 rounded-lg hover:bg-gradient-to-t hover:from-gray-300 hover:to-gray-500 hover:text-blue-gd-from' onClick={onRegister} style={{ padding: 10, width: '100%' }}>
                            สมัครสมาชิก
                        </button>
                    </Card>
                </div>
            </div>

            {
                load ?
                    <Loadding />
                    : null
            }
        </>
    );
}
