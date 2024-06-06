'use client'
import React from 'react'
import HistoryItem from './HistoryItem'
import { Box, Divider, Fab, SpeedDial } from '@mui/material'
import SpeedDialIcon from '@mui/material/SpeedDialIcon';

import History from './History.module.css'
import HistoryTab from './HistoryTab';

import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';

export default function page() {
  const [historyFrom, setHistoryFrom] = React.useState<boolean>(false)
  return (
    <>
      <div className={History.homePage}>
        <div className={History.item}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h1>History</h1>
            <HistoryTab />
          </div>
          <Divider style={{ margin: '15px 0' }} />
          <HistoryItem />
        </div>
        <Box className={History.buttonCreate} >
          <Fab style={{ background: '#2c387e', color: 'white' }} onClick={() => {
            setHistoryFrom(true)
          }}>
            <SpeedDialIcon />
          </Fab>
        </Box>
      </div>
      {
        historyFrom ?
          <Modal
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
            open={historyFrom}
            onClose={() => setHistoryFrom(false)}
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
              <Typography
                component="h2"
                id="modal-title"
                level="h4"
                textColor="inherit"
                fontWeight="lg"
                mb={1}
              >
                This is the modal title
              </Typography>
              <Typography id="modal-desc" textColor="text.tertiary">
                Make sure to use <code>aria-labelledby</code> on the modal dialog with an
                optional <code>aria-describedby</code> attribute.
              </Typography>
            </Sheet>
          </Modal> :
          null
      }
    </>
  )
}

