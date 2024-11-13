'use client'
import AddIcon from '@/assets/icon/4211763.png';
import Loadding from '@/components/Loadding';
import { Ships } from '@/models/vehicle.model';
import { toast } from '@/services/alert.service';
import { creaetShip, findShipById } from '@/services/ship.service';
import { timeOutJwt } from '@/services/timeout.service';
import { uploadImage } from '@/services/uploadImage.service';
import BadgeIcon from '@mui/icons-material/Badge';
import ClearIcon from '@mui/icons-material/Clear';
import RadioIcon from '@mui/icons-material/Radio';
import SailingIcon from '@mui/icons-material/Sailing';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardContent from '@mui/joy/CardContent';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import IconButton from '@mui/material/IconButton';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import * as React from 'react';
import { NIL } from 'uuid';

import ModalTypeShipt from './components/ModalTypeShipt';
import shipCss from './ship.module.css';

type Props = {
  params: {
    vehicle: string
  }
}

export default function Page({ params }: Props) {

  const [ship, setShip] = React.useState<Ships>({} as Ships)
  const [load, setLoad] = React.useState<boolean>(false)
  const [txtTypeShip, setTxtTypeShip] = React.useState<string>('')

  async function handleUploadImage(e: React.ChangeEvent<HTMLInputElement>, key: string) {
    e.preventDefault()
    setLoad(true)
    if (e.target.files) {
      const file = new FormData()
      file.append('file', e.target.files[0])
      const image = await uploadImage(file)
      setShip({ ...ship, image: image.data.result })
      setLoad(false)
    }
  }
  async function onSubmitShips(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!ship.type_id) {
      return toast('กรุณาเลือกประเภทเรือ', 'warning')
    }
    setLoad(true)

    try {
      await creaetShip(ship)
      history.back()
    } catch (error) {
      timeOutJwt(error)
    } finally {
      setLoad(false)
    }
  }

  function onAssingIdTypeShip(id: string, nameType: string) {
    setShip({ ...ship, type_id: id })
    setTxtTypeShip(nameType)
  }

  React.useEffect(() => {
    if (params.vehicle !== NIL) {
      findShipById(params.vehicle)
    }

  }, [findShipById])
  return (
    <>
      <form onSubmit={onSubmitShips}>
        <Card
          variant="outlined"
          sx={{
            maxHeight: 'max-content',
            maxWidth: '100%',
            mx: 'auto',
            // to make the demo resizable
            overflow: 'auto',
            resize: 'horizontal',
          }}
        >
          <Typography level="title-lg" startDecorator={<SailingIcon color='primary' />}>
            {params.vehicle === NIL ? 'เพิ่มเรือรับส่ง' : 'แก้ไขเรือรับส่ง'}
          </Typography>
          <Divider inset="none" />
          <CardContent
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, minmax(80px, 1fr))',
              gap: 1.5,
            }}
          >
            <FormControl sx={{ gridColumn: '1/-1' }}>
              <ModalTypeShipt onReturnIdTypeShip={onAssingIdTypeShip} />
              <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', padding: '5px'}}>
                {
                  txtTypeShip.length === 0?
                  null:
                  <Typography color='primary' sx={{fontSize: '1.2rem', fontWeight: 600}}>ประเภทของเรือ {txtTypeShip}</Typography>
                }
              </Box>
            </FormControl>
            <FormControl sx={{ gridColumn: '1/-1' }}>
              <FormLabel>ชื่อเรือ</FormLabel>
              <Input value={ship.name ?? ''} onChange={(e) => {
                setShip({ ...ship, name: e.target.value })
              }} endDecorator={<BadgeIcon />} placeholder='เรือหลวงจักรีนฤเบศร' required />
            </FormControl>
            <FormControl sx={{ gridColumn: '1/-1' }}>
              <FormLabel>นามเรียกขาน</FormLabel>
              <Input value={ship.calling ?? ''} onChange={(e) => {
                setShip({ ...ship, calling: e.target.value })
              }} endDecorator={<BadgeIcon />} placeholder='ป. กุ้งเผา' required />
            </FormControl>
            <FormControl>
              <FormLabel>ช่องสัญญานวิทยุ</FormLabel>
              <Input value={ship.radio ?? ''} onChange={(e) => {
                setShip({ ...ship, radio: e.target.value })
              }} endDecorator={<RadioIcon />} placeholder='96.25' required />
            </FormControl>
            <FormControl>
              <FormLabel>เบอร์ติดต่อ</FormLabel>
              <Input value={ship.phone_number ?? ''} onChange={(e) => {
                setShip({ ...ship, phone_number: e.target.value })
              }} endDecorator={<RadioIcon />} placeholder='080-000-0000' required />
            </FormControl>
            <FormControl sx={{ gridColumn: '1/-1' }}>
              <FormLabel>รายละเอียดอื่นๆ</FormLabel>
              <Input value={ship.description ?? ''} onChange={(e) => {
                setShip({ ...ship, description: e.target.value })
              }} placeholder="ไม่จำเป็นต้องกรอก" />
            </FormControl>

            <div className={shipCss.bodyImage}>
              <input type="file" id='front' onChange={(e) => handleUploadImage(e, 'front')} hidden />
              {
                !ship.image ?
                  <div onClick={() => document.getElementById('front')?.click()}>
                    <ImageListItem className={shipCss.imageCars}  >
                      <img

                        srcSet={AddIcon.src}
                        src={AddIcon.src}
                        alt={'item.title'}
                        loading="lazy"
                      />
                      <ImageListItemBar
                        title={'คลิกเพื่อ upload หน้ารถ'}
                        subtitle={'item.author'}
                        actionIcon={
                          <IconButton
                            sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                            aria-label={`info about `}
                          >
                            <ClearIcon />
                          </IconButton>
                        }
                      />
                    </ImageListItem>
                  </div> :
                  <ImageListItem className={shipCss.imageCars} >
                    <img

                      srcSet={ship.image}
                      src={ship.image}
                      alt={'item.title'}
                      loading="lazy"
                    />
                    <ImageListItemBar
                      title={'หน้ารถ'}
                      subtitle={'item.author'}
                      actionIcon={
                        <IconButton
                          onClick={() => setShip({ ...ship, image: '' })}
                          sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                          aria-label={`info about `}
                        >
                          <ClearIcon />
                        </IconButton>
                      }
                    />
                  </ImageListItem>
              }

            </div>


            {/* <Checkbox label="Save card" sx={{ gridColumn: '1/-1', my: 1 }} /> */}
            <CardActions sx={{ gridColumn: '1/-1' }}>
              <Button variant="solid" color="primary" type='submit'>
                เพิ่มรถรับส่ง
              </Button>
            </CardActions>
          </CardContent>
        </Card>

      </form>

      {
        load ?
          <Loadding />
          : null
      }
    </>
  );
}
