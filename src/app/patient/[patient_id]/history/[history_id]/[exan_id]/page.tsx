'use client'
import React from 'react'
import exan_idCss from './exan_id.module.css'
import { Box, Card, CardMedia, Fab, Typography } from '@mui/material'
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import { Button, Textarea } from '@mui/joy'
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { ExanShows, Exans, ImageExan } from '@/models/exan.model'
import { NIL } from 'uuid'
import { createExanByHistoryId, findExanByExanId, updateExanByExanId } from '@/services/exan.service'
import { toast } from '@/services/alert.service'
import { useSearchParams, useRouter } from 'next/navigation'
import ModalCreateImageExan from './ModalCreateImageExan';

type Props = {
  params: {
    exan_id: string,
    patient_id: string,
    history_id: string
  }
}

export type TModalImageExan = {
  previewImage: ImageExan[]
  setPreviewImage: React.Dispatch<React.SetStateAction<ImageExan[]>>
}

export type TModalCreate = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const ModalImageExanContext = React.createContext<TModalImageExan>({} as TModalImageExan)
export const OpenModalCreateImageContext = React.createContext<TModalCreate>({} as TModalCreate)

export default function Page({ params }: Props) {
  const el_id = useSearchParams().get('el_id')
  const router = useRouter()

  const [open, setOpen] = React.useState<boolean>(false)

  const [exan, setExan] = React.useState<ExanShows>({} as ExanShows)
  const [addImage, setAddImage] = React.useState<boolean>(false)
  const [load, setLoad] = React.useState<boolean>(false)
  const [created, setCreated] = React.useState<boolean>(false)
  const [previewImage, setPreviewImage] = React.useState<ImageExan[]>([])

  async function onCreateExan() {
    if (el_id) {
      setLoad(true)
      setCreated(true)
      try {
        const e = {} as Exans
        e.element_id = el_id
        e.text = exan.text
        e.history_id = params.history_id
        const result = await createExanByHistoryId(e)
        toast('create exan', 'success')
        if (result) {
          console.log(result.data)
          setAddImage(true)
          setLoad(false)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  async function onUpdateExan() {
    if (el_id) {
      const e = {} as ExanShows
      e.history_id = params.history_id
      e.element_id = el_id
      e.text = exan.text
      try {
        const result = await updateExanByExanId(params.history_id, params.exan_id, e)
        setExan(result.data)
        toast('update exan', 'success')
      } catch (error) {
        toast('has Error', 'error')
        console.log(error)
        router.push('/login')
      }
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const FR = new FileReader();

      FR.onload = (event) => {
        if (event.target && event.target.result) {
          const base64 = event.target.result as string;
          const img = {} as ImageExan
          img.src = base64
          setPreviewImage((prev) => [...prev, img]);
          console.log(base64);
        }
      };

      FR.readAsDataURL(file);
    }
  }

  if (params.exan_id.includes(NIL)) {
    return (
      <div className={exan_idCss.home}>
        <Card className={exan_idCss.cardBody}>
          <Box className={exan_idCss.cardContent}>
            <Fab sx={{ cursor: 'default' }}>
              <CreateNewFolderIcon sx={{ color: '#2c387e' }} fontSize='large' />
            </Fab>

            <h1 style={{ marginTop: '20px' }}>Create Exan</h1>
            <Textarea
              placeholder="Exan Detail"
              minRows={3} variant='soft'
              sx={{ width: '100%', marginTop: '20px' }}
              onChange={(e) => setExan({ ...exan, text: e.target.value })}
              disabled={created}
            />
            <Button onClick={onCreateExan} loading={load} disabled={created} variant='plain' sx={{ background: '#2c387e', color: 'white', width: '100%' }}>Add Exan</Button>
            {/* {
              addImage || previewImage.length === 0 ?
                <div style={{ width: '100%' }}>
                  <Card className={exan_idCss.CardUpload}>
                    <div onClick={() => {
                      document.getElementById('imageUpload')?.click()
                    }}>
                      <Typography variant="body1" color="initial" component='div' sx={{ textAlign: 'center' }}>
                        <CameraAltIcon />
                      </Typography>
                      <Typography variant="body1" color="initial" component='div' sx={{ textAlign: 'center' }}>
                        upload image
                      </Typography>
                      <Typography variant="body1" color="initial" component='div' sx={{ textAlign: 'center' }}>
                        Click for Upload
                      </Typography>
                    </div>
                    <input onChange={handleImageUpload} hidden id='imageUpload' type="file" accept="image/*" capture />
                  </Card>
                  <Box sx={{ marginTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'end', width: '100%' }}>
                    <Button variant='soft' color='neutral' sx={{ marginRight: '10px' }}>Cancel</Button>
                    <Button variant='soft' color='primary' sx={{ background: '#2c387e', color: 'white' }}>Save</Button>
                  </Box>
                </div> :
                null
            } */}
          </Box>
        </Card>
      </div>
    )
  } else {
    // console.log(previewImage);

    const onFeedExan = React.useCallback(async () => {
      setLoad(true)
      try {
        const result = await findExanByExanId(params.history_id, params.exan_id)
        setExan(result.data)
        setPreviewImage(result.data.ImageExan)
        setLoad(false)
      } catch (error) {
        toast('has Error', 'error')
        console.log(error)
        router.push('/login')
      }
    }, [setExan, setPreviewImage])

    React.useEffect(() => {
      onFeedExan()
    }, [onFeedExan])
    return (
      <>
        <ModalImageExanContext.Provider value={{ previewImage, setPreviewImage }}>
          <div className={exan_idCss.home}>
            <Card className={exan_idCss.cardBody}>
              <Box className={exan_idCss.cardContent}>
                <Fab sx={{ cursor: 'default' }}>
                  <CreateNewFolderIcon sx={{ color: '#2c387e' }} fontSize='large' />
                </Fab>

                <h1 style={{ marginTop: '20px' }}>Create image</h1>
                <Textarea
                  placeholder="Exan Detail"
                  minRows={3} variant='soft'
                  sx={{ width: '100%', marginTop: '20px' }}
                  onChange={(e) => setExan({ ...exan, text: e.target.value })}
                  disabled={created}
                  value={exan.text}
                />
                <Button onClick={onUpdateExan} loading={load} disabled={created} variant='plain' sx={{ background: '#2c387e', color: 'white', width: '100%' }}>Update Exan</Button>
                <Button onClick={() => setOpen(true)} loading={load} disabled={created} variant='plain' sx={{ background: '#2c387e', color: 'white', width: '100%', marginTop: '20px' }}>upload image</Button>

                {
                  previewImage.length > 0 ?
                    previewImage.map(r =>
                      <CardMedia
                        key={r.id}
                        component={'img'}
                        image={r.src}
                        style={{ marginTop: '10px' }}
                      />
                    ) :
                    null
                }
              </Box>
              <Box>
                <Button>cancel</Button>
                <Button onClick={()=> router.back()}>save</Button>
              </Box>
            </Card>
            <OpenModalCreateImageContext.Provider value={{ open, setOpen }}>
              <ModalCreateImageExan params={params} />
            </OpenModalCreateImageContext.Provider>

          </div>
        </ModalImageExanContext.Provider>
      </>
    )
  }
}
