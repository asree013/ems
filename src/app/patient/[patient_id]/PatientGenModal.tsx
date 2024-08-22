'use client';
import * as React from 'react';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Sheet from '@mui/joy/Sheet';
import ManIcon from '@mui/icons-material/Man';
import WomanIcon from '@mui/icons-material/Woman';
import { Box, Fab } from '@mui/material';

type Props = {
  openModel: boolean;
  returnGender: (txt: string) => void;
  returnStateOpen: (bool: boolean) => void;
};

export default function PatientGenModel({
  openModel,
  returnGender,
  returnStateOpen,
}: Props) {
  return (
    <React.Fragment>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={openModel}
        onClose={() => returnStateOpen(false)}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Sheet
          variant="outlined"
          sx={{
            maxWidth: 500,
            borderRadius: 'md',
            p: 3,
            boxShadow: 'lg',
          }}
        >
          <ModalClose variant="plain" sx={{ m: 1 }} />
          <Box sx={{ margin: '10px' }}>
            <Fab
              variant="extended"
              sx={{
                width: '120px',
                height: '120px',
                margin: '4px',
                cursor: 'pointer',
              }}
              onClick={() => {
                returnStateOpen(false);
                returnGender('Male');
              }}
            >
              <ManIcon
                color="primary"
                sx={{ width: '120px', height: '120px' }}
              />
            </Fab>
            <Fab
              variant="extended"
              sx={{
                width: '120px',
                height: '120px',
                margin: '4px',
                cursor: 'pointer',
              }}
              onClick={() => {
                returnStateOpen(false);
                returnGender('Female');
              }}
            >
              <WomanIcon
                color="error"
                sx={{ width: '120px', height: '120px' }}
              />
            </Fab>
          </Box>
        </Sheet>
      </Modal>
    </React.Fragment>
  );
}
