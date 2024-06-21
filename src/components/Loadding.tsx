import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Modal from '@mui/joy/Modal';

export default function Loadding() {
  return (
    <Modal
      open={true}
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <Box sx={{ width: '80%' }}>
        <LinearProgress />
      </Box>
    </Modal>
  );
}
