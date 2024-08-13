'use client';
import React, { useCallback, useEffect, useState } from 'react';
import HistoryItem from './HistoryItem';
import { Box, Divider, Fab, SpeedDial } from '@mui/material';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';

import historyCss from './historyCss.module.css';
import HistoryTab from './HistoryTab';

import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import { Historys } from '@/models/history.model';
import {
  createHistory,
  findHistoryByPatientId,
} from '@/services/history.service';

import AssignmentIcon from '@mui/icons-material/Assignment';
import { Input } from '@mui/joy';
import Loadding from '@/components/Loadding';

import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import AddCircleIcon from '@mui/icons-material/AddCircle';
type Props = {
  params: {
    patient_id: string
  }
}

export default function Page({ params }: Props) {

  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [historyFrom, setHistoryFrom] = useState<boolean>(false);
  const [err, setErr] = useState<boolean>(false);

  const [created, setCreated] = useState<boolean>(false);

  const [history, setHistory] = useState<Historys[]>({} as Historys[]);
  const [historyFilter, setHistoryFilter] = useState<Historys[]>(
    {} as Historys[],
  );
  const [symtop_detail, setSymtom_detail] = useState<string>('');
  const [history_id, setHistory_id] = useState<string>('');

  async function onChangFilterHistory(key: number) {
    console.log(key);

    switch (true) {
      case key === 0:
        const result = await findHistoryByPatientId(params.patient_id);
        setHistory(result.data);
        return setHistoryFilter(result.data);
      case key === 1:
        return setHistoryFilter(
          history.filter((r) => r.status.includes('Draft')),
        );
      case key === 2:
        return setHistoryFilter(
          history.filter((r) => r.status.includes('Completed')),
        );
      case key === 3:
        return setHistoryFilter(
          history.filter((r) => r.status.includes('Cancel')),
        );
      case key === 4:
        return setHistoryFilter(
          history.filter((r) => r.status.includes('Close')),
        );
    }
  }

  const onFeedHistoryByPatientId = useCallback(async () => {
    try {
      const result = await findHistoryByPatientId(params.patient_id);
      setHistory(result.data);
      setHistoryFilter(result.data);
    } catch (error: any) {
      console.log(error);
      if (error.response.data.statusCode === 401) {
        setIsLoad(true);
        window.location.href = '/login';
      }
    }
  }, [setHistory, setHistoryFilter, setIsLoad]);

  useEffect(() => {
    onFeedHistoryByPatientId();
  }, [onFeedHistoryByPatientId]);

  async function onCreateHistory() {
    setCreated(true);
    setErr(false);
    if (symtop_detail.length === 0) {
      return setErr(true);
    }
    try {
      const data = {} as Historys;
      data.symptom_details = symtop_detail;
      data.status = 'Draft';
      data.patient_id = params.patient_id;
      const result = await createHistory(data);
      setHistory([...history, result.data]);
      setHistory_id(result.data.id);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className={historyCss.homePage}>
        <div className={historyCss.item}>

          <HistoryTab />
          <Divider style={{ margin: '10px 0' }} />
          <div className={historyCss.history_item}>
            {history.length > 0
              ? historyFilter.map((r, i) => <HistoryItem value={r} key={i} />)
              : null}
          </div>
        </div>
        <Box className={historyCss.buttonCreate}>
          <Fab
            style={{ background: '#2c387e', color: 'white' }}
            onClick={() => {
              setHistoryFrom(true);
              setCreated(false);
              setHistory_id('');
            }}
          >
            <SpeedDialIcon />
          </Fab>
        </Box>
      </div>
      {historyFrom ? (
        <Modal
          aria-labelledby="modal-title"
          aria-describedby="modal-desc"
          open={historyFrom}
          onClose={() => setHistoryFrom(false)}
          className={historyCss.modalCreate}
        >
          <Sheet
            variant="outlined"
            sx={{
              borderRadius: 'md',
              p: 3,
              boxShadow: 'lg',
            }}
            className={historyCss.sheet}
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
              Creact History
            </Typography>
            <Input
              onChange={(e) => setSymtom_detail(e.target.value)}
              placeholder="Symptom Detail"
              startDecorator={<AssignmentIcon />}
              error={err}
              disabled={created}
            />
            <Button
              sx={{ fontSize: '1.2rem', width: '100%', marginTop: '10px' }}
              onClick={onCreateHistory}
              loading={created}
            >
              Add History
            </Button>
            <div hidden={!created}>
              <Alert
                sx={{ marginTop: '10px' }}
                icon={<CheckIcon fontSize="inherit" />}
                severity="success"
              >
                Created History
              </Alert>
              <Box className={historyCss.buttonGroup}>
                <Button
                  className={historyCss.button}
                  onClick={() => setHistoryFrom(false)}
                  color="neutral"
                >
                  Cancel
                </Button>
                <Button
                  className={historyCss.button}
                  onClick={() => {
                    window.location.href = 'history/' + history_id
                    setIsLoad(true);
                  }}
                  startDecorator={<AddCircleIcon />}
                  color="success"
                >
                  Add Exan
                </Button>
              </Box>
            </div>
          </Sheet>
        </Modal>
      ) : null}
      {isLoad ? <Loadding /> : null}
    </>
  );
}
