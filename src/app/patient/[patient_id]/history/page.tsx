'use client';
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import HistoryItem from '../../../../components/HistoryItem';
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
import { Input, Textarea } from '@mui/joy';
import Loadding from '@/components/Loadding';

import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import StepHistory from './StepHistory';
import { HistoryDetailContext, PhysicalStatusContext, StepContext, TraigeLevelContext } from './StepContext';
import { PhysicalStatus, TriageLevels } from '@/models/historyDetail.model';
type Props = {
  params: {
    patient_id: string
  }
}

export default function Page({ params }: Props) {

  const [historyDetail, setHistoryDetail] = useState<Historys>({} as Historys)
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [historyFrom, setHistoryFrom] = useState<boolean>(false);


  const [history, setHistory] = useState<Historys[]>({} as Historys[]);
  const [historyFilter, setHistoryFilter] = useState<Historys[]>(
    {} as Historys[],
  );

  const [history_id, setHistory_id] = useState<string>('');

  const [triageLevel, setTriageLevel] = useState<TriageLevels>({} as TriageLevels)
  const [physicalStatus, setPhysicalStatus] = useState<PhysicalStatus>({} as PhysicalStatus)

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
      // setHistoryFilter(result.data);

    } catch (error: any) {
      console.log(error);
      if (error.response.data.statusCode === 401) {
        setIsLoad(true);
        window.location.href = '/login';
      }
    }
  }, [setHistory, setIsLoad]);

  useEffect(() => {
    onFeedHistoryByPatientId();
  }, [onFeedHistoryByPatientId]);

  return (
    <>
      <div className={historyCss.homePage}>
        <h1>ประวัติการรักษา</h1>
        <div className={historyCss.item}>
          <Button variant='solid' color='primary' onClick={() => {
            setHistoryFrom(true);
            setHistory_id('');
          }}>เพิ่มประวัติ</Button>

          {/* <HistoryTab /> */}

          <Divider style={{ margin: '10px 0' }} />
          <div className={historyCss.history_item}>
            {Object.keys(history).length > 0
              ? history.map((r, i) => <HistoryItem name={{ first_name: r.Patient.first_name, last_name: r.Patient.last_name }} value={r} key={i} />)
              : null}
          </div>
        </div>
      </div>
      {
        historyFrom ?
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
              <HistoryDetailContext.Provider value={{ historyDetail, setHistoryDetail }} >
                <TraigeLevelContext.Provider value={{ triageLevel, setTriageLevel }}>
                  <PhysicalStatusContext.Provider value={{ physicalStatus, setPhysicalStatus }} >

                    <StepHistory />

                  </PhysicalStatusContext.Provider>
                </TraigeLevelContext.Provider>
              </HistoryDetailContext.Provider>
            </Sheet>
          </Modal>

          : null
      }


      {isLoad ? <Loadding /> : null}
    </>
  );
}
