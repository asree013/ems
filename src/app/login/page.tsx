'use client';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox'
import logoImage from '@/assets/icon/user_6543039.png';
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



export default function Page() {
  const [login, setLogin] = useState<Logins>({} as Logins);
  const [isLoad, setIsLoad] = useState(false);
  const [errUser, setErrUser] = useState(false);
  const [errPass, setErrPass] = useState(false);

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
      window.location.href = '/select_mode'
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
          if (findMe.data.role.toLocaleLowerCase().includes('admin' || 'rootadmin')) {
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
    // checkFindMe()

    return () => {
      // checkFindMe
    }
  }, [onCheckAutoLogin]);


  return (
    <>
        <div id='page' className='themesLogin' style={{
          width: '100%', height: windowHeight,
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div className="homeLogin">
            <form onSubmit={(e) => onSubmitLogin(e)}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  sx={{ height: 190 }}
                  image={logoImage.src}
                  title="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Login EMS system New Api
                  </Typography>
                  <TextField
                    error={errUser}
                    onChange={(e) =>
                      setLogin({ ...login, username: e.target.value.toLocaleLowerCase() })
                    }
                    id="filled-basic"
                    label="Username"
                    variant="filled"
                    style={{ width: '100%' }}
                    required
                  />
                  <TextField
                    error={errPass}
                    type="password"
                    onChange={(e) =>
                      setLogin({ ...login, password: e.target.value })
                    }
                    id="filled-basic"
                    label="password"
                    variant="filled"
                    style={{ width: '100%', marginTop: '10px' }}
                    required
                  />
                  <FormControlLabel control={<Checkbox checked={auto} onChange={() => setAuto(!auto)} />} label="auto Login" />
                </CardContent>
                <CardActions>
                  <Button
                    type="submit"
                    size="large"
                    variant="contained"
                    style={{ width: '100%' }}
                  >
                    Login
                  </Button>
                </CardActions>
                <CardActions>
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
                </CardActions>
              </Card>
            </form>
          </div>
          {isLoad ? <Loadding /> : null}
        </div>
    </>
  );
}
