'use client'
import React, { useState } from 'react'
import sar from './sar.module.css'
import { Box, Button, Card, Input } from '@mui/material'
import PouchDB from 'pouchdb';
import Autocomplete from '@mui/joy/Autocomplete';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab, { tabClasses } from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import Typography from '@mui/joy/Typography';
import sar_local_db from '@/configs/pouchDb.config';
import { Users } from '@/models/users.model';
import { v4 } from 'uuid';
import { SarLocalUser } from '@/models/sar.local.db.model';
import Loadding from '@/components/Loadding';

const ariaLabel = { 'aria-label': 'description' };

export default function page() {

    const [forms, setForms] = useState<Users>({} as Users)
    const [load, setLoad] = useState<boolean>(false)
    const oflineId = localStorage.getItem('oflineUserId')

    if (oflineId) {
        setLoad(true)
        return window.location.href = 'SAR/patient'
    }

    async function onLoginByIdCardAndPhone(e: React.ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
        const datas = {} as SarLocalUser
        datas._id = v4()
        datas.type = 'userLogin'
        datas.first_name = forms.first_name
        datas.last_name = forms.last_name
        datas.id_card = forms.id_card
        datas.phone_number = forms.phone_number
        console.log(datas);
        setLoad(true)

        try {
            const result = await sar_local_db.find({
                selector: {
                    id_card: datas.id_card,
                    phone_number: datas.phone_number,
                }
            });
            console.log(result.docs);


            if (result.docs.length === 0) {
                const result = await sar_local_db.put(datas)
                localStorage.setItem('oflineUserId', JSON.stringify(result.id))
                window.location.href = 'SAR/patient'
            }
            else {
                window.location.href = 'SAR/patient'
                localStorage.setItem('oflineUserId', JSON.stringify(result.docs[0]._id))
            }

        } catch (error) {
            console.error('Error retrieving documents:', error);
            setLoad(false)
        }


    }

    async function onRegisterByIdCardAndPhone(e: React.ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
        const datas = {} as SarLocalUser
        datas._id = v4()
        datas.type = 'userRegister'
        datas.first_name = forms.first_name
        datas.last_name = forms.last_name
        datas.username = forms.username
        datas.password = forms.password
        datas.id_card = forms.id_card
        datas.phone_number = forms.phone_number
        console.log(datas);
        setLoad(true)

        try {
            const result = await sar_local_db.put(datas)
            localStorage.setItem('oflineUserId', JSON.stringify(result.id))
            window.location.href = 'SAR/patient'

        } catch (error) {
            console.error('Error retrieving documents:', error);
            setLoad(false)
        }


    }

    return (
        <>
            <div className={sar.home}>
                <h1>SAR HOME</h1>


                <Tabs
                    variant="outlined"
                    aria-label="Pricing plan"
                    defaultValue={0}
                    sx={{ width: 343, borderRadius: 'lg', boxShadow: 'sm', overflow: 'auto' }}
                >
                    <TabList
                        disableUnderline
                        tabFlex={1}
                        sx={{
                            [`& .${tabClasses.root}`]: {
                                fontSize: 'sm',
                                fontWeight: 'lg',
                                [`&[aria-selected="true"]`]: {
                                    color: 'primary.500',
                                    bgcolor: 'background.surface',
                                },
                                [`&.${tabClasses.focusVisible}`]: {
                                    outlineOffset: '-4px',
                                },
                            },
                        }}
                    >
                        <Tab disableIndicator variant="soft" sx={{ flexGrow: 1 }}>
                            <Typography
                                textColor="success.400"
                                sx={{ fontSize: 'xl2', fontWeight: 'xl', mt: 1 }}
                            >
                                มี{' '}
                                <Typography
                                    textColor="text.secondary"
                                    sx={{ fontSize: 'sm', fontWeight: 'md' }}
                                >
                                    ID สมาชิกอยู่แล้ว
                                </Typography>
                            </Typography>
                        </Tab>
                        <Tab disableIndicator variant="soft" sx={{ flexGrow: 1 }}>
                            <Typography
                                textColor="danger.500"
                                sx={{ fontSize: 'xl2', fontWeight: 'xl', mt: 1 }}
                            >
                                ไม่มี{' '}
                                <Typography
                                    textColor="text.secondary"
                                    sx={{ fontSize: 'sm', fontWeight: 'md' }}
                                >
                                    ID สมาชิก
                                </Typography>
                            </Typography>
                        </Tab>
                    </TabList>
                    <TabPanel value={0}>
                        <Typography level="inherit">
                            หากมี ID สมาชิกอยู่แล้วกรูณากรอกข้อมูลเพื่อใช้งาน offline
                        </Typography>
                        <form onSubmit={onLoginByIdCardAndPhone} style={{ margin: '20px 0' }}>
                            <FormControl >
                                <FormLabel>บัตรประชาชน</FormLabel>
                                <Input onChange={(e) => setForms({ ...forms, id_card: e.target.value })}
                                    type='text' placeholder='0000-0000-000-000' inputProps={ariaLabel} required />
                                <FormHelperText>* กรอกเลขบัตรประชาชนที่ใช้ในการสมัคร</FormHelperText>
                            </FormControl>
                            <FormControl className='mt-3'>
                                <FormLabel>เบอร์โทร</FormLabel>
                                <Input onChange={(e) => setForms({ ...forms, phone_number: e.target.value })}
                                    type='text' placeholder='000-000-0000' inputProps={ariaLabel} required />
                                <FormHelperText>* กรอกเลขเบอร์โทรที่ใช้ในการสมัคร</FormHelperText>
                            </FormControl>
                            <FormControl className='mt-3'>
                                <FormLabel>ชื่อ</FormLabel>
                                <Input onChange={(e) => setForms({ ...forms, first_name: e.target.value })}
                                    type='text' placeholder='นายสมชาย' inputProps={ariaLabel} required />
                                <FormHelperText>* กรอกชื่อเพื่อใช้งานโหมดออฟไลน์</FormHelperText>
                            </FormControl>
                            <FormControl className='mt-3'>
                                <FormLabel>สกุล</FormLabel>
                                <Input onChange={(e) => setForms({ ...forms, last_name: e.target.value })}
                                    type='text' placeholder='สมเกีรยติ' inputProps={ariaLabel} required />
                                <FormHelperText>* กรอกสกุลเพื่อใช้งานโหมดออฟไลน์</FormHelperText>
                            </FormControl>
                            <Box className='mt-3'>
                                <Button sx={{ width: '100%' }} type='submit' variant='contained' color='success'>ใช้งานระบบ</Button>
                            </Box>
                        </form>


                    </TabPanel>
                    <TabPanel value={1}>
                        <Typography level="inherit">
                            หากไม่มี ID สมาชิกกรุณากรอกข้อมูลเพื่อสร้างสมาชิก และใช้งาน offline
                        </Typography>
                        <form onSubmit={onRegisterByIdCardAndPhone} style={{ margin: '20px 0' }}>
                            <FormControl>
                                <FormLabel>ID</FormLabel>
                                <Input onChange={(e) => setForms({ ...forms, username: e.target.value })} type='text' placeholder='test001' inputProps={ariaLabel} />
                                <FormHelperText>* กรอกเลขเบอร์โทรที่ใช้ในการสมัคร</FormHelperText>
                            </FormControl>
                            <FormControl className='mt-3'>
                                <FormLabel>Password</FormLabel>
                                <Input onChange={(e) => setForms({ ...forms, password: e.target.value })}
                                    type='text' placeholder='12345678' inputProps={ariaLabel} required />
                                <FormHelperText>* กรอกเลขเบอร์โทรที่ใช้ในการสมัคร</FormHelperText>
                            </FormControl>
                            <FormControl className='mt-3'>
                                <FormLabel>บัตรประชาชน</FormLabel>
                                <Input onChange={(e) => setForms({ ...forms, id_card: e.target.value })}
                                    type='text' placeholder='0000-0000-000-000' inputProps={ariaLabel} required />
                                <FormHelperText>* กรอกเลขบัตรประชาชนที่ใช้ในการสมัคร</FormHelperText>
                            </FormControl>
                            <FormControl className='mt-3'>
                                <FormLabel>เบอร์โทร</FormLabel>
                                <Input onChange={(e) => setForms({ ...forms, phone_number: e.target.value })}
                                    type='text' placeholder='000-000-0000' inputProps={ariaLabel} required />
                                <FormHelperText>* กรอกเลขเบอร์โทรที่ใช้ในการสมัคร</FormHelperText>
                            </FormControl>
                            <FormControl className='mt-3'>
                                <FormLabel>ชื่อ</FormLabel>
                                <Input onChange={(e) => setForms({ ...forms, first_name: e.target.value })}
                                    type='text' placeholder='นายสมชาย' inputProps={ariaLabel} required />
                                <FormHelperText>* กรอกชื่อเพื่อใช้งานโหมดออฟไลน์</FormHelperText>
                            </FormControl>
                            <FormControl className='mt-3'>
                                <FormLabel>สกุล</FormLabel>
                                <Input onChange={(e) => setForms({ ...forms, last_name: e.target.value })}
                                    type='text' placeholder='สมเกีรยติ' inputProps={ariaLabel} required />
                                <FormHelperText>* กรอกสกุลเพื่อใช้งานโหมดออฟไลน์</FormHelperText>
                            </FormControl>

                            <Box className='mt-3'>
                                <Button sx={{ width: '100%' }} type='button' variant='contained' color='error'>ใช้งานระบบ และสมัครสมาชิก</Button>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'end', width: '100%' }}>
                                    <p style={{ color: 'red' }}>* ระบบจะทำงานสมัครสมาชิกเมื่อเจออินเตอร์เน็ต</p>
                                </div>
                            </Box>
                        </form>

                    </TabPanel>
                </Tabs>
            </div>


            {
                load ?
                    <Loadding />
                    : null
            }
        </>
    );
}

