'use client'
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import React, { Fragment, useContext } from 'react';
import { OpenModalMapContext, TOpenModalMap } from '@/contexts/openModal.context';
import { TMissionC, MissionContext } from '@/contexts/missions.context';
import GoogleApiMap from '@/app/home/GoogleApiMap';
import MapSelect from './MapSelect';

export default function MapModal() {
  const {open, setOpen} = useContext<TOpenModalMap>(OpenModalMapContext)


  return (
    <Fragment>
      
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => setOpen(false)}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Sheet
          variant="outlined"
          sx={{
            maxWidth: '99%',
            borderRadius: 'md',
            p: 3,
            boxShadow: 'lg',
          }}
        >
          <ModalClose variant="plain" sx={{ m: 1 }} />
          <Typography
            component="div"
            id="modal-title"
            level="h4"
            textColor="inherit"
            fontWeight="lg"
            mb={1}
          >
            Click for Add Location
          </Typography>
          <Typography id="modal-desc"  component={'div'}>
            <MapSelect />
          </Typography>
        </Sheet>
      </Modal>
    </Fragment>
  );
}