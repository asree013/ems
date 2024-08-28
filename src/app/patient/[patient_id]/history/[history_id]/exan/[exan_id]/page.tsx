'use client';
import React, { useEffect, useCallback, useState } from 'react';
import exan_idCss from './exan_id.module.css';
import { Box, Card, CardMedia, Fab, Typography } from '@mui/material';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import { Button, Textarea } from '@mui/joy';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { ExanShows, Exans, ImageExan } from '@/models/exan.model';
import { NIL } from 'uuid';
import {
  createExanByHistoryId,
  findExanByExanId,
  updateExanByExanId,
} from '@/services/exan.service';
import { toast } from '@/services/alert.service';
import { useSearchParams, useRouter } from 'next/navigation';
import ModalCreateImageExan from './ModalCreateImageExan';
import { ModalImageExanContext } from '@/contexts/modalImageExan.context';
import { OpenModalCreateImageContext } from '@/contexts/openModalCreateImage.context';

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
  const onFeedExan = useCallback(async () => {
    setLoad(true);
    try {
      const result = await findExanByExanId(params.history_id, params.exan_id);
      setExan(result.data);
      setPreviewImage(result.data.ImageExan);
      setLoad(false);
    } catch (error) {
      toast('has Error', 'error');
      console.log(error);
      router.push('/login');
    }
  }, [params.history_id, params.exan_id, router]); // Include all dependencies in the dependency array

  // Ensure useEffect is always called in the same order
  useEffect(() => {
    onFeedExan();
  }, [onFeedExan]);

  const onCreateExan = async () => {
    if (el_id) {
      setLoad(true);
      setCreated(true);
      try {
        const e = {} as Exans;
        e.element_id = el_id;
        e.text = exan.text;
        e.history_id = params.history_id;
        const result = await createExanByHistoryId(e);
        toast('create exan', 'success');
        if (result) {
          setAddImage(true);
          setLoad(false);
        }
      } catch (error) {
        console.log(error);
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
        toast('update exan', 'success');
      } catch (error) {
        toast('has Error', 'error');
        console.log(error);
        router.push('/login');
      }
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const FR = new FileReader();

      FR.onload = (event) => {
        if (event.target && event.target.result) {
          const base64 = event.target.result as string;
          const img = {} as ImageExan;
          img.src = base64;
          setPreviewImage((prev) => [...prev, img]);
        }
      };

      FR.readAsDataURL(file);
    }
  };

  // Separate rendering functions to avoid conditional hook calls within the main component
  const renderCreateExan = () => (
    <div className={exan_idCss.home}>
      <Card className={exan_idCss.cardBody} elevation={8}>
        <Box className={exan_idCss.cardContent}>
          <Fab sx={{ cursor: 'default' }}>
            <CreateNewFolderIcon sx={{ color: '#2c387e' }} fontSize="large" />
          </Fab>
          <h1 style={{ marginTop: '20px' }}>Create Exan</h1>
          <Textarea
            placeholder="Exan Detail"
            minRows={3}
            variant="soft"
            sx={{ width: '100%', marginTop: '20px' }}
            onChange={(e) => setExan({ ...exan, text: e.target.value })}
            disabled={created}
          />
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

  const renderUpdateExan = () => (
    <ModalImageExanContext.Provider value={{ previewImage, setPreviewImage }}>
      <div className={exan_idCss.home}>
        <Card className={exan_idCss.cardBody} elevation={8}>
          <Box className={exan_idCss.cardContent}>
            <Fab sx={{ cursor: 'default' }}>
              <CreateNewFolderIcon sx={{ color: '#2c387e' }} fontSize="large" />
            </Fab>
            <h1 style={{ marginTop: '20px' }}>Update Exan</h1>
            <Textarea
              placeholder="Exan Detail"
              minRows={3}
              variant="soft"
              sx={{ width: '100%', marginTop: '20px' }}
              onChange={(e) => setExan({ ...exan, text: e.target.value })}
              value={exan.text}
            />
            <Button
              onClick={onUpdateExan}
              loading={load}
              variant="plain"
              sx={{ background: '#2c387e', color: 'white', width: '100%' }}
            >
              Update Exan
            </Button>
            <Button
              onClick={() => setOpen(true)}
              loading={load}
              variant="plain"
              sx={{ background: '#2c387e', color: 'white', width: '100%', marginTop: '20px' }}
            >
              Upload Image
            </Button>
            {previewImage.length > 0 &&
              previewImage.map((r) => (
                <CardMedia key={r.id} component={'img'} image={r.src} style={{ marginTop: '10px' }} />
              ))}
          </Box>
          <Box>
            <Button>Cancel</Button>
            <Button onClick={() => router.back()}>Save</Button>
          </Box>
        </Card>
        <OpenModalCreateImageContext.Provider value={{ open, setOpen }}>
          <ModalCreateImageExan params={params} />
        </OpenModalCreateImageContext.Provider>
      </div>
    </ModalImageExanContext.Provider>
  );

  // Conditionally render the create or update view based on the exan_id
  return params.exan_id.includes(NIL) ? renderCreateExan() : renderUpdateExan();
}
