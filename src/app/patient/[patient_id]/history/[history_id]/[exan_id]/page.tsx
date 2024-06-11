'use client'
import React from 'react'
import exan_idCss from './exan_id.module.css'
import { Box, Card, Fab, TextField, Typography } from '@mui/material'
import { useParams, usePathname, useSearchParams } from 'next/navigation'
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import { Button, Textarea } from '@mui/joy'
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { Exans, ImageExan } from '@/models/exan.model'
import { NIL } from 'uuid'
import { createExanByHistoryId } from '@/services/exan.service'

type Props = {
  params: {
    exan_id: string,
    patient_id: string,
    history_id: string
  }
}

export default function page({ params }: Props) {
  const el_id = useSearchParams().get('el_id')

  const [exan, setExan] = React.useState<Exans>({} as Exans)
  const [addImage, setAddImage] = React.useState<boolean>(false)
  const [load, setLoad] = React.useState<boolean>(false)
  const [created, setCreated] = React.useState<boolean>(false)
  const [imageExan, setImageExan] = React.useState<ImageExan[]>({} as ImageExan[])
  const [previewImage, setPreviewImage] = React.useState<string[]>({} as string[])

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
        if (result) {
          console.log(result.data);
          setAddImage(true)
          setLoad(false)
        }
      } catch (error) {
        console.log(error);

      }
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
            {
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
                    <input onChange={(e) => {
                      if (e.target.files) {
                        const file = URL.createObjectURL(e.target.files[0])
                        setPreviewImage([...previewImage, file])
                        console.log(previewImage);
                        
                      }
                    }} hidden id='imageUpload' type="file" accept="image/*" capture />
                  </Card>
                  <Box sx={{ marginTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'end', width: '100%' }}>
                    <Button variant='soft' color='neutral' sx={{ marginRight: '10px' }}>Cancel</Button>
                    <Button variant='soft' color='primary' sx={{ background: '#2c387e', color: 'white' }}>Save</Button>
                  </Box>
                </div> :
                null
            }
          </Box>
        </Card>
      </div>
    )
  }
}
