'use client';
import React, { useEffect, useCallback, useState } from 'react';
import exan_idCss from './exan_id.module.css';
import { Box, Card, CardMedia, Fab, Typography } from '@mui/material';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import { Button, Textarea } from '@mui/joy';
import { ExanShows, Exans, ImageExan } from '@/models/exan.model';
import { NIL } from 'uuid';
import {
  createExanByHistoryId,
  updateExanByExanId,
} from '@/services/exan.service';
import { toast } from '@/services/alert.service';
import { useSearchParams, useRouter } from 'next/navigation';

import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';

import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { uploadBase64Image, uploadImage } from '@/services/uploadImage.service';
import CancelIcon from '@mui/icons-material/Cancel';

type Props = {
  params: {
    exan_id: string;
    patient_id: string;
    history_id: string;
  };
};

export default function Page({ params }: Props) {
  const el_id = useSearchParams().get('el_id');
  const router = useRouter();

  const [open, setOpen] = useState<boolean>(false);
  const [exan, setExan] = useState<ExanShows>({} as ExanShows);
  const [addImage, setAddImage] = useState<boolean>(false);
  const [load, setLoad] = useState<boolean>(false);
  const [created, setCreated] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<ImageExan[]>([]);

  // Use useCallback to memoize the fetch function to prevent unnecessary re-renders

  const onCreateExan = async () => {
    if (el_id) {
      setLoad(true);
      setCreated(true);

      try {
        const e = {} as Exans;
        e.element_id = el_id;
        e.text = exan.text;
        e.image = exan.image
        e.history_id = params.history_id;
        const result = await createExanByHistoryId(e);
        console.log(result.data);

        toast('create exan', 'success');
        history.back()
      } catch (error) {
        console.log(error);
      } finally {
        setLoad(false)
        setCreated(false)
      }
    }
  };

  const onUpdateExan = async () => {
    if (el_id) {
      const e = {} as ExanShows;
      e.history_id = params.history_id;
      e.element_id = el_id;
      e.text = exan.text;
      try {
        const result = await updateExanByExanId(params.history_id, params.exan_id, e);
        setExan(result.data);
        console.log(result.data);

        toast('update exan', 'success');
      } catch (error) {
        toast('has Error', 'error');
        console.log(error);
        router.push('/login');
      }
    }
  };


  // Separate rendering functions to avoid conditional hook calls within the main component
  return (
    <div className={exan_idCss.home}>
      <Card className={exan_idCss.cardBody} elevation={8}>
        <Box className={exan_idCss.cardContent}>
          <Fab sx={{ cursor: 'default' }}>
            <CreateNewFolderIcon sx={{ color: '#2c387e' }} fontSize="large" />
          </Fab>
          <h1 style={{ marginTop: '20px' }}>Create Exan</h1>
          <Textarea
            placeholder="Exan Detail"
            minRows={2}
            variant="soft"
            sx={{ width: '100%', marginTop: '20px' }}
            onChange={(e) => setExan({ ...exan, text: e.target.value })}
            disabled={created}
          />
          <input type="file" id='image_exam' hidden onChange={async (e) => {
            if (e.target.files) {
              try {
                const image = await uploadBase64Image(e.target.files[0])
                setExan({ ...exan, image: image as string })
              } catch (error) {

              }
            }
          }} />

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', margin: '20px 0' }}>
            {
              !exan.image ?
                <Card elevation={3} className={exan_idCss.imageUploadSize} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div onClick={() => document.getElementById('image_exam')?.click()}>

                    <AddAPhotoIcon style={{ width: 180, height: 180 }} />
                  </div>
                </Card> :
                <ImageListItem className={exan_idCss.imageUploadSize}>
                  <img
                    src={exan.image}
                    alt={'item.title'}
                    loading="lazy"
                    className={exan_idCss.imageUploadSize}
                    style={{ objectFit: 'contain' }}
                  />
                  <ImageListItemBar
                    onClick={() => {
                      setExan({ ...exan, image: '' })
                    }}
                    title={'รูปภาพ'}
                    subtitle={'ที่คุณอัพโหลด'}
                    actionIcon={
                      <IconButton
                        sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                        aria-label={`info about `}
                      >
                        <CancelIcon color='error' />
                      </IconButton>
                    }
                  />
                </ImageListItem>

            }
          </div>
          <Button
            onClick={onCreateExan}
            loading={load}
            disabled={created}
            variant="plain"
            sx={{ background: '#2c387e', color: 'white', width: '100%' }}
          >
            Add Exan
          </Button>
        </Box>
      </Card>
    </div>
  );


  // Conditionally render the create or update view based on the exan_id

}
