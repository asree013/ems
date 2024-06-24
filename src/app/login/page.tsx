'use client';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import { useRouter } from 'next/navigation';
import { ToastContainer } from 'react-toastify';
import logoImage from '@/assets/icon/user_6543039.png';
import 'react-toastify/dist/ReactToastify.css';
import './login.css';
import Loadding from '../../components/Loadding';
import { Logins } from '../../models/authen.model';
import { logins } from '../../services/authen.service';
import { useEffect, useState } from 'react';
import { toast } from '@/services/alert.service'

export default function Page() {
  const [login, setLogin] = useState<Logins>({} as Logins);
  const [isLoad, setIsLoad] = useState(false);
  const [errUser, setErrUser] = useState(false);
  const [errPass, setErrPass] = useState(false);

  async function onSubmitLogin(e: any) {
    e.preventDefault();
    setIsLoad(true);
    try {
      await logins(login);
      // await FindUserMe()
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

  useEffect(() => {
    const viewportHeight = window.innerHeight;
console.log('Viewport height:', viewportHeight);
    
  }, [])
  
  return (
    <>
      <ToastContainer />
      <div id='page' style={{ background: '#2c387e', width: '100%', height:window.innerHeight ,
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
                  Login EMS system
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
              </CardContent>
              <CardActions>
                <Button
                  type="submit"
                  size="large"
                  variant="outlined"
                  style={{ width: '100%' }}
                >
                  Login
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
