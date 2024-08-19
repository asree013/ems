import * as React from 'react';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import { Alert, Box, CardMedia, Paper, TextField } from '@mui/material';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import exanCss from './exan_id.module.css';
import { ImageExan } from '@/models/exan.model';
import ModalImageDetail from './ModalImageDetail';
import { toast } from '@/services/alert.service';
import { createImageExan } from '@/services/image_exan.service';
import { useParams } from 'next/navigation';
import { ChangeEvent, useContext, useState } from 'react';
import { TModalImageExan, ModalImageExanContext } from '@/contexts/modalImageExan.context';
import { TModalCreate, OpenModalCreateImageContext } from '@/contexts/openModalCreateImage.context';

type Props = {
  params: {
    history_id: string;
    exan_id: string;
  };
};

export default function ModalCreateImageExan({ params }: Props) {
  const { previewImage, setPreviewImage } = useContext<TModalImageExan>(
    ModalImageExanContext,
  );
  const [images, setImages] = useState<string>('');
  const [imageExan, setImageExan] = useState<ImageExan>({} as ImageExan);
  const [nameNull, setNameNull] = useState<boolean>(false);
  const { open, setOpen } = useContext<TModalCreate>(
    OpenModalCreateImageContext,
  );

  function handleImageUpload(e: ChangeEvent<HTMLInputElement>) {
    setNameNull(false);
    if (e.target.files) {
      const file = e.target.files[0];
      const FR = new FileReader();

      FR.onload = (event) => {
        if (event.target && event.target.result) {
          const base64 = event.target.result as string;
          console.log('Base64:', base64); // เพิ่ม console.log เพื่อตรวจสอบค่า base64
          setImages(base64);
          setImageExan({ ...imageExan, src: base64 });
        }
      };

      FR.readAsDataURL(file);
    }
  }

  async function uploadImage() {
    setNameNull(false);
    if (!imageExan.name || !imageExan.src) {
      setNameNull(true);
    } else {
      try {
        const ie = {} as ImageExan;
        ie.exan_id = params.exan_id;
        ie.name = imageExan.name;
        ie.src = imageExan.src;
        const result = await createImageExan(
          params.history_id,
          params.exan_id,
          ie,
        );
        setPreviewImage([...previewImage, result.data]);
        setImages('');
        setImageExan({} as ImageExan);
        setOpen(false);
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <React.Fragment>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        // onClose={open === false}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Sheet
          variant="outlined"
          sx={{
            maxWidth: 2000,
            borderRadius: 'md',
            p: 3,
            boxShadow: 'lg',
          }}
        >
          <ModalClose variant="plain" sx={{ m: 1 }} />
          <Typography
            component="h2"
            id="modal-title"
            level="h4"
            textColor="inherit"
            fontWeight="lg"
            mb={1}
            className={exanCss.modalImage}
          >
            This is the modal title
          </Typography>
          <Alert
            hidden={!nameNull}
            style={{ marginTop: '10px' }}
            severity="error"
          >
            โปรดกรอกข้อมูลใหครบก่อนบันทึก!
          </Alert>

          <div>
            {images.length > 0 ? (
              <div>
                <CardMedia
                  component="img"
                  className={exanCss.imagePreview}
                  image={images}
                  alt="Uploaded Image"
                />
                <TextField
                  error={nameNull}
                  onChange={(e) =>
                    setImageExan({
                      ...imageExan,
                      name: e.target.value.toString(),
                    })
                  }
                  style={{ marginTop: '10px', width: '100%' }}
                  id="filled-basic"
                  label="Detail"
                  variant="filled"
                />
              </div>
            ) : (
              <div
                onClick={() => document.getElementById('imageUpload')?.click()}
              >
                <Paper
                  elevation={3}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    width: '100%',
                    height: '9rem',
                  }}
                >
                  <AddAPhotoIcon sx={{ fontSize: '4rem' }} />
                </Paper>
              </div>
            )}
          </div>
          <Typography style={{ marginTop: '10px' }} component="div">
            <Button onClick={uploadImage} style={{ margin: '3px' }}>
              Save
            </Button>
            <Button onClick={() => setOpen(false)} style={{ margin: '3px' }}>
              Cancel
            </Button>
          </Typography>
          <input
            onChange={handleImageUpload}
            hidden
            id="imageUpload"
            type="file"
            accept="image/*"
            capture
          />
        </Sheet>
      </Modal>
    </React.Fragment>
  );
}
