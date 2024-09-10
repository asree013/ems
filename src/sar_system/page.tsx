'use client';

import { ChangeEvent, useState, useEffect } from 'react';
import sar from './sar.module.css';
import { Box, Button, Card, Input, Snackbar } from '@mui/material';
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
import { Users } from '@/models/users.model';
import { v4 } from 'uuid';
import { SarLocalUser } from '@/models/sar.local.db.model';
import Loadding from '@/components/Loadding';
import { db } from '@/configs/pouchDb.config';


const ariaLabel = { 'aria-label': 'description' };

export default function Page() {
    const [forms, setForms] = useState<Users>({} as Users);
    const [load, setLoad] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const oflineId = localStorage.getItem('oflineUserId');

    useEffect(() => {
        if (oflineId) {
            setLoad(true);
            window.location.href = '/sar_system/sar_patient'
        }
    }, [oflineId]);

    async function onLoginByIdCardAndPhone(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        const datas = {} as SarLocalUser

        datas._id = v4(),
            datas.type = 'userLogin',
            datas.first_name = forms.first_name,
            datas.last_name = forms.last_name,
            datas.id_card = forms.id_card,
            datas.phone_number = forms.phone_number,

            setLoad(true);

        try {
            const result = await db.find({
                selector: {
                    id_card: datas.id_card,
                    phone_number: datas.phone_number,
                },
            });

            if (result.docs.length === 0) {
                const putResult = await db.put(datas);
                localStorage.setItem('oflineUserId', JSON.stringify(putResult.id));
                window.location.href = ('/sar_system/sar_patient');
            } else {
                localStorage.setItem('oflineUserId', JSON.stringify(result.docs[0]._id));
                window.location.href = ('/sar_system/sar_patient');
            }
        } catch (error) {
            console.error('Error retrieving documents:', error);
            setErrorMessage('Failed to log in. Please check your details and try again.');
        } finally {
            setLoad(false);
        }
    }

    async function onRegisterByIdCardAndPhone(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        const datas: SarLocalUser = {
            _id: v4(),
            type: 'userRegister',
            first_name: forms.first_name,
            last_name: forms.last_name,
            username: forms.username,
            password: forms.password,
            id_card: forms.id_card,
            phone_number: forms.phone_number,
        };

        setLoad(true);

        try {
            const putResult = await db.put(datas);
            localStorage.setItem('oflineUserId', JSON.stringify(putResult.id));
            window.location.href = ('/sar_system/sar_patient');
        } catch (error) {
            console.error('Error registering documents:', error);
            setErrorMessage('Failed to register. Please try again.');
        } finally {
            setLoad(false);
        }
    }

    const handleCloseSnackbar = () => {
        setErrorMessage('');
    };

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
                            <FormControl>
                                <FormLabel>บัตรประชาชน</FormLabel>
                                <Input
                                    onChange={(e) => setForms({ ...forms, id_card: e.target.value })}
                                    type="text"
                                    placeholder="0000-0000-000-000"
                                    inputProps={ariaLabel}
                                    required
                                />
                                <FormHelperText>* กรอกเลขบัตรประชาชนที่ใช้ในการสมัคร</FormHelperText>
                            </FormControl>
                            <FormControl className="mt-3">
                                <FormLabel>เบอร์โทร</FormLabel>
                                <Input
                                    onChange={(e) => setForms({ ...forms, phone_number: e.target.value })}
                                    type="text"
                                    placeholder="000-000-0000"
                                    inputProps={ariaLabel}
                                    required
                                />
                                <FormHelperText>* กรอกเลขเบอร์โทรที่ใช้ในการสมัคร</FormHelperText>
                            </FormControl>
                            <FormControl className="mt-3">
                                <FormLabel>ชื่อ</FormLabel>
                                <Input
                                    onChange={(e) => setForms({ ...forms, first_name: e.target.value })}
                                    type="text"
                                    placeholder="นายสมชาย"
                                    inputProps={ariaLabel}
                                    required
                                />
                                <FormHelperText>* กรอกชื่อเพื่อใช้งานโหมดออฟไลน์</FormHelperText>
                            </FormControl>
                            <FormControl className="mt-3">
                                <FormLabel>สกุล</FormLabel>
                                <Input
                                    onChange={(e) => setForms({ ...forms, last_name: e.target.value })}
                                    type="text"
                                    placeholder="สมเกีรยติ"
                                    inputProps={ariaLabel}
                                    required
                                />
                                <FormHelperText>* กรอกสกุลเพื่อใช้งานโหมดออฟไลน์</FormHelperText>
                            </FormControl>
                            <Box className="mt-3">
                                <Button sx={{ width: '100%' }} type="submit" variant="contained" color="success">
                                    ใช้งานระบบ
                                </Button>
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
                                <Input
                                    onChange={(e) => setForms({ ...forms, username: e.target.value })}
                                    type="text"
                                    placeholder="test001"
                                    inputProps={ariaLabel}
                                />
                                <FormHelperText>* กรอกชื่อผู้ใช้ในการเข้าสู่ระบบ</FormHelperText>
                            </FormControl>
                            <FormControl className="mt-3">
                                <FormLabel>รหัสผ่าน</FormLabel>
                                <Input
                                    onChange={(e) => setForms({ ...forms, password: e.target.value })}
                                    type="password"
                                    placeholder="*******"
                                    inputProps={ariaLabel}
                                />
                                <FormHelperText>* กรอกรหัสผ่าน</FormHelperText>
                            </FormControl>
                            <FormControl className="mt-3">
                                <FormLabel>บัตรประชาชน</FormLabel>
                                <Input
                                    onChange={(e) => setForms({ ...forms, id_card: e.target.value })}
                                    type="text"
                                    placeholder="0000-0000-000-000"
                                    inputProps={ariaLabel}
                                    required
                                />
                                <FormHelperText>* กรอกเลขบัตรประชาชน</FormHelperText>
                            </FormControl>
                            <FormControl className="mt-3">
                                <FormLabel>เบอร์โทร</FormLabel>
                                <Input
                                    onChange={(e) => setForms({ ...forms, phone_number: e.target.value })}
                                    type="text"
                                    placeholder="000-000-0000"
                                    inputProps={ariaLabel}
                                    required
                                />
                                <FormHelperText>* กรอกเบอร์โทร</FormHelperText>
                            </FormControl>
                            <FormControl className="mt-3">
                                <FormLabel>ชื่อ</FormLabel>
                                <Input
                                    onChange={(e) => setForms({ ...forms, first_name: e.target.value })}
                                    type="text"
                                    placeholder="นายสมชาย"
                                    inputProps={ariaLabel}
                                    required
                                />
                                <FormHelperText>* กรอกชื่อ</FormHelperText>
                            </FormControl>
                            <FormControl className="mt-3">
                                <FormLabel>สกุล</FormLabel>
                                <Input
                                    onChange={(e) => setForms({ ...forms, last_name: e.target.value })}
                                    type="text"
                                    placeholder="สมเกีรยติ"
                                    inputProps={ariaLabel}
                                    required
                                />
                                <FormHelperText>* กรอกสกุล</FormHelperText>
                            </FormControl>
                            <Box className="mt-3">
                                <Button sx={{ width: '100%' }} type="submit" variant="contained" color="error">
                                    ลงทะเบียน
                                </Button>
                            </Box>
                        </form>
                    </TabPanel>
                </Tabs>
                {load && <Loadding />}
                <Snackbar
                    open={!!errorMessage}
                    autoHideDuration={6000}
                    onClose={handleCloseSnackbar}
                    message={errorMessage}
                />
            </div>
        </>
    );
}
