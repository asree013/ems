'use client';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Button, Divider, FormControl } from '@mui/material';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox'
import logoImage from '@/assets/icon/user_6543039.png';
import newLogo from '@/assets/image/icon_menu/logo4.png'
import 'react-toastify/dist/ReactToastify.css';
import './login.css';
import Loadding from '../../components/Loadding';
import { Logins } from '../../models/authen.model';
import { FindUserMe, logins } from '../../services/authen.service';
import { useEffect, useState } from 'react';
import { toast } from '@/services/alert.service'
import { escape } from 'querystring';
import { socket } from '@/configs/socket';
import styled from 'styled-components';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HttpsIcon from '@mui/icons-material/Https';
// import { useSearchParams } from 'next/navigation';

const TStyleButton = styled.button`
    background: linear-gradient(125deg, #021B79, #0575E6);
    color: white;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2), 0 8px 20px rgba(2, 27, 121, 0.5);
    border-radius: 5px;
    font-size: 22px;
    font-weight: 600;

    &:hover{
        transform: scale(1.1);
        transition: 0.4s;
    }
`

export default function Page() {
  const [login, setLogin] = useState<Logins>({} as Logins);
  const [isLoad, setIsLoad] = useState(false);
  const [errUser, setErrUser] = useState(false);
  const [errPass, setErrPass] = useState(false);
  // const usernamePath = useSearchParams().get('username')
  console.log('---> ', process.env.NEXT_PUBLIC_KEY_VALUE)
  

  async function onSubmitLogin(e: any) {
    e.preventDefault();
    setIsLoad(true);
    if (auto) {
      const encodeUser = btoa(encodeURIComponent(login.username));
      const encodePass = btoa(encodeURIComponent(login.password));
      localStorage.setItem('camera', JSON.stringify({ status: encodeUser, message: encodePass }))
    }
    try {
      await logins(login);
      const findme = await FindUserMe()
      localStorage.setItem('user_id', JSON.stringify(findme.data.id))
      socket.emit('is-online', { user_id: findme.data.id })
      toast('เข้าสู่ระบบ', 'success')
      window.location.href = '/home'
    } catch (error: any) {
      console.log(error);
      toast(JSON.stringify(error.message), 'error')
      setIsLoad(false)
      if (error.response.data.status === 400) {
        toast(error.response.data.message, 'error');
        if (error.response.data.message.includes('not fount username')) {
          setErrUser(true);
          setErrPass(false);
        } else {
          setErrUser(false);
          setErrPass(true);
        }
      }
      if (error.response.data.status > 404) {
        toast('เกิดข้อผิดพลายจากภายนอก', 'error');
      }
    }
  }

  const [windowHeight, setWindowHeight] = useState<number>(0);
  const [auto, setAuto] = useState<boolean>(false);

  async function onCheckAutoLogin() {
    const camera = localStorage.getItem('camera')
    if (camera) {
      setIsLoad(true)
      const decodeUser = decodeURIComponent(atob(JSON.parse(camera).status));
      const decodePass = decodeURIComponent(atob(JSON.parse(camera).message))
      try {
        await logins({ username: decodeUser, password: decodePass })
        const findMe = await FindUserMe()
        const roleUser = btoa(encodeURIComponent(findMe.data.role));
        localStorage.setItem('sika', roleUser)

        if (Object.keys(findMe).length > 0) {
          if (Object.keys(findMe.data.Responsibilities).length === 0 && findMe.data.role.toLocaleLowerCase().includes('user')) {
            window.location.href = '/forbidden'
          }
          if (findMe.data.role.toLocaleLowerCase() === 'admin' || 'rootadmin') {
            window.location.href = '/home'

          }
        }
      } catch (error: any) {
        toast(JSON.stringify(error.message), 'error')
      }
    }
    else {
      return
    }
  }

  const checkFindMe = React.useCallback(async () => {
    try {
      await FindUserMe()
      window.location.href = '/home'
    } catch (error) {
      return
    }
  }, [])



  useEffect(() => {
    setWindowHeight(window.innerHeight);
    onCheckAutoLogin()
    // if(usernamePath){
    //   setLogin({...login, username: usernamePath.toLocaleLowerCase()})
    //   return
    // }
    // checkFindMe()

    return () => {
      // checkFindMe
    }
  }, [onCheckAutoLogin]);

  const HoverParagraph = styled.p`
    color: white;
    transition: color 0.3s;
    cursor: pointer;

    &:hover {
      transform: scale(1.1);
      transition: 0.4s;
    }
  `;

  return (
    <>
      <div id='page' className='themesLogin' style={{
        width: '100%', height: windowHeight,
      }}>

        <div className="homeLogin">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img style={{ width: '4.2rem' }} src={newLogo.src} alt="" />
            <p style={{ marginLeft: '10px', color: 'white', fontSize: '2.9rem', fontWeight: 700 }}>Marine-EMS</p>
          </div>
          <form onSubmit={(e) => onSubmitLogin(e)}>
            <Card sx={{ width: 345 }}>
              <CardContent>
                <FormControl style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
                  <AccountCircleIcon />
                  <TextField
                    error={errUser}
                    onChange={(e) =>
                      setLogin({ ...login, username: e.target.value.toLocaleLowerCase() })
                    }
                    id="filled-basic"
                    label="Username"
                    variant="standard"
                    style={{ width: '100%', textAlign: 'center', marginBottom: '15px', marginLeft: '15px' }}
                    InputProps={{
                      disableUnderline: true,
                    }}
                    required
                  />
                </FormControl>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Divider sx={{ height: '1px', background: 'black', width: '250px' }} />
                </div>
                <FormControl style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
                  <HttpsIcon />
                  <TextField
                    error={errPass}
                    type="password"
                    onChange={(e) =>
                      setLogin({ ...login, password: e.target.value })
                    }
                    id="filled-basic"
                    label="password"
                    variant="standard"
                    style={{ width: '100%', textAlign: 'center', marginBottom: '15px', marginLeft: '15px' }}
                    InputProps={{
                      disableUnderline: true,
                    }}
                    required
                  />
                </FormControl>

                <FormControlLabel control={<Checkbox checked={auto} onChange={() => setAuto(!auto)} />} label="auto Login" />
              </CardContent>
              <CardActions style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <TStyleButton
                  type="submit"
                  style={{ width: '85%', height: '3rem' }}
                >
                  Login
                </TStyleButton>
              </CardActions>
              {/* <CardActions>
                <Button
                  type="button"
                  size="large"
                  color='success'
                  variant="contained"
                  style={{ width: '100%' }}
                  onClick={() => {
                    setIsLoad(true)
                    window.location.href = '/sar_system'
                  }}
                >
                  ใช้งานแบบ ofline(SAR)
                </Button>
              </CardActions> */}
            </Card>
          </form>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <HoverParagraph onClick={() => toast('อัพเดทเร็วๆนี้', 'warning')} style={{ fontSize: '18px', color: 'white' }}>ลืมรหัสผ่าน</HoverParagraph>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '15px' }}>
              <div style={{ border: '0.8px solid white', width: 70 }} />
              <p style={{ margin: '0 10px', color: 'white', textAlign: 'center', fontSize: '14px' }}>หรือ</p>
              <div style={{ border: '0.8px solid white', width: 70 }} />
            </div>

            <HoverParagraph onClick={() => {
              window.location.href = '/register'
              setIsLoad(true)
            }} style={{ fontSize: '22px', fontWeight: 500, marginTop: '15px' }}>สมัครสมาชิก</HoverParagraph>
          </div>
        </div>
        {isLoad ? <Loadding /> : null}
      </div>
    </>
  );
}
