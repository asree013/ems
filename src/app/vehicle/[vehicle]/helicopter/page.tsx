'use client'
import * as React from 'react';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardContent from '@mui/joy/CardContent';
import Checkbox from '@mui/joy/Checkbox';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';

import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import RadioIcon from '@mui/icons-material/Radio';
import ClearIcon from '@mui/icons-material/Clear';
import BadgeIcon from '@mui/icons-material/Badge';
import AddIcon from '@/assets/icon/4211763.png'

import { Helicopters } from '@/models/vehicle.model';

import helicopterCss from './helicapter.module.css'
import { toast } from '@/services/alert.service';
import { createCar } from '@/services/car.service';
import { timeOutJwt } from '@/services/timeout.service';
import { createHelicopter } from '@/services/helicopter.service';
import Loadding from '@/components/Loadding';
import { uploadImage } from '@/services/uploadImage.service';

export default function Page() {

  const [helicopter, setHelicopter] = React.useState<Helicopters>({} as Helicopters)
  const [load, setLoad] = React.useState<boolean>(false)

  async function handleUploadImage(e: React.ChangeEvent<HTMLInputElement>, key: string) {
    e.preventDefault()
    const FR = new FileReader()
    if (e.target.files) {
      if (key.includes('front')) {
        const upload = await uploadImage(e.target.files[0])
        setHelicopter({ ...helicopter, image_front: upload.data.result })
      }
      else if (key.includes('back')) {
        const upload = await uploadImage(e.target.files[0])      
        setHelicopter({ ...helicopter, image_back: upload.data.result })

      }
      else if (key.includes('left')) {
        const upload = await uploadImage(e.target.files[0])   
        setHelicopter({ ...helicopter, image_left: upload.data.result })

      }
      else if (key.includes('right')) {
        const upload = await uploadImage(e.target.files[0])
        setHelicopter({ ...helicopter, image_rigth: upload.data.result })

      }
    }
  }
  async function onSubmitCreateCar(e: React.ChangeEvent<HTMLFormElement>) {
    setLoad(true)
    e.preventDefault()
    try {
      await createHelicopter(helicopter)
      history.back()
    } catch (error) {
      // timeOutJwt(error)
    } finally {
      setLoad(false)
    }
  }
  return (
    <>
      <form onSubmit={onSubmitCreateCar}>
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
          <Typography level="title-lg" startDecorator={<LocalShippingIcon color='primary' />}>
            เพิ่มแฮลิค็อปเตอร์รับส่ง
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
              <FormLabel>นามเรียกขาน</FormLabel>
              <Input onChange={(e) => {
                setHelicopter({ ...helicopter, calling: e.target.value })
              }} endDecorator={<BadgeIcon />} placeholder='ป. กุ้งเผา' required />
            </FormControl>
            <FormControl>
              <FormLabel>เลขแฮลิค็อปเตอร์</FormLabel>
              <Input onChange={(e) => {
                setHelicopter({ ...helicopter, number: e.target.value })
              }} endDecorator={<CreditCardIcon />} placeholder='กก-1234' required />
            </FormControl>
            <FormControl>
              <FormLabel>ช่องสัญญานวิทยุ</FormLabel>
              <Input onChange={(e) => {
                setHelicopter({ ...helicopter, radio: e.target.value })
              }} endDecorator={<RadioIcon />} placeholder='96.25' required />
            </FormControl>
            <FormControl sx={{ gridColumn: '1/-1' }}>
              <FormLabel>รายละเอียดอื่นๆ</FormLabel>
              <Input onChange={(e) => {
                setHelicopter({ ...helicopter, description: e.target.value })
              }} placeholder="ไม่จำเป็นต้องกรอก" />
            </FormControl>

            {/* <FormControl sx={{ gridColumn: '1/-1' }}>
            <Typography id="segmented-controls-example" fontWeight="lg" fontSize="sm">
              ประเภทรถ:
            </Typography>
            <RadioGroup
              orientation="horizontal"
              aria-labelledby="segmented-controls-example"
              name="Fr"
              value={car.type ? car.type : ''}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setHelicopter({ ...helicopter, type: event.target.value })
              }
              sx={{
                minHeight: 48,
                padding: '4px',
                borderRadius: '12px',
                bgcolor: 'neutral.softBg',
                '--RadioGroup-gap': '4px',
                '--Radio-actionRadius': '8px',
              }}
            >
              {['Fr', 'Basic', 'Advance'].map((item) => (
                <Radio
                  key={item}
                  color="neutral"
                  value={item}
                  disableIcon
                  label={item}
                  variant="plain"
                  sx={{
                    px: 2,
                    alignItems: 'center',
                  }}
                  slotProps={{
                    action: ({ checked }) => ({
                      sx: {
                        ...(checked && {
                          bgcolor: 'background.surface',
                          boxShadow: 'sm',
                          '&:hover': {
                            bgcolor: 'background.surface',
                          },
                        }),
                      },
                    }),
                  }}
                />
              ))}
            </RadioGroup>
          </FormControl> */}
            <div className={helicopterCss.bodyImage}>
              <input type="file" id='front' onChange={(e) => handleUploadImage(e, 'front')} hidden />
              {
                !helicopter.image_front ?
                  <div onClick={() => document.getElementById('front')?.click()}>
                    <ImageListItem className={helicopterCss.imageCars}  >
                      <img

                        srcSet={AddIcon.src}
                        src={AddIcon.src}
                        alt={'item.title'}
                        loading="lazy"
                      />
                      <ImageListItemBar
                        title={'คลิกเพื่อ upload หน้า ฮ.'}
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
                  <ImageListItem className={helicopterCss.imageCars} >
                    <img

                      srcSet={helicopter.image_front}
                      src={helicopter.image_front}
                      alt={'item.title'}
                      loading="lazy"
                    />
                    <ImageListItemBar
                      title={'หน้า ฮ.'}
                      subtitle={'item.author'}
                      actionIcon={
                        <IconButton
                          onClick={() => setHelicopter({ ...helicopter, image_front: '' })}
                          sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                          aria-label={`info about `}
                        >
                          <ClearIcon />
                        </IconButton>
                      }
                    />
                  </ImageListItem>
              }

              <input type="file" id='back' onChange={(e) => handleUploadImage(e, 'back')} hidden />
              {
                !helicopter.image_back ?
                  <div onClick={() => document.getElementById('back')?.click()}>
                    <ImageListItem className={helicopterCss.imageCars}  >
                      <img

                        srcSet={AddIcon.src}
                        src={AddIcon.src}
                        alt={'item.title'}
                        loading="lazy"
                      />
                      <ImageListItemBar
                        title={'คลิกเพื่อ upload หลังนช ฮ.'}
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
                  <ImageListItem className={helicopterCss.imageCars} >
                    <img

                      srcSet={helicopter.image_back}
                      src={helicopter.image_back}
                      alt={'item.title'}
                      loading="lazy"
                    />
                    <ImageListItemBar
                      title={'หน้า ฮ.'}
                      subtitle={'item.author'}
                      actionIcon={
                        <IconButton
                          onClick={() => setHelicopter({ ...helicopter, image_back: '' })}
                          sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                          aria-label={`info about `}
                        >
                          <ClearIcon />
                        </IconButton>
                      }
                    />
                  </ImageListItem>
              }
              <input type="file" id='left' onChange={(e) => handleUploadImage(e, 'left')} hidden />
              {
                !helicopter.image_left ?
                  <div onClick={() => document.getElementById('left')?.click()}>
                    <ImageListItem className={helicopterCss.imageCars}  >
                      <img

                        srcSet={AddIcon.src}
                        src={AddIcon.src}
                        alt={'item.title'}
                        loading="lazy"
                      />
                      <ImageListItemBar
                        title={'คลิกเพื่อ upload ซ้าย ฮ.'}
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
                  <ImageListItem className={helicopterCss.imageCars} >
                    <img

                      srcSet={helicopter.image_left}
                      src={helicopter.image_left}
                      alt={'item.title'}
                      loading="lazy"
                    />
                    <ImageListItemBar
                      title={'หน้า ฮ.'}
                      subtitle={'item.author'}
                      actionIcon={
                        <IconButton
                          onClick={() => setHelicopter({ ...helicopter, image_left: '' })}
                          sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                          aria-label={`info about `}
                        >
                          <ClearIcon />
                        </IconButton>
                      }
                    />
                  </ImageListItem>
              }

              <input type="file" id='right' onChange={(e) => handleUploadImage(e, 'right')} hidden />
              {
                !helicopter.image_rigth ?
                  <div onClick={() => document.getElementById('right')?.click()}>
                    <ImageListItem className={helicopterCss.imageCars}  >
                      <img

                        srcSet={AddIcon.src}
                        src={AddIcon.src}
                        alt={'item.title'}
                        loading="lazy"
                      />
                      <ImageListItemBar
                        title={'คลิกเพื่อ upload ขวา ฮ.'}
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
                  <ImageListItem className={helicopterCss.imageCars} >
                    <img

                      srcSet={helicopter.image_rigth}
                      src={helicopter.image_rigth}
                      alt={'item.title'}
                      loading="lazy"
                    />
                    <ImageListItemBar
                      title={'หน้า ฮ.'}
                      subtitle={'item.author'}
                      actionIcon={
                        <IconButton
                          onClick={() => setHelicopter({ ...helicopter, image_rigth: '' })}
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
                เพิ่มแฮลิค็อปเตอร์รับส่ง
              </Button>
            </CardActions>
          </CardContent>
        </Card>
      </form>

      {
        load?
        <Loadding />:
        null
      }
    </>
  );
}
