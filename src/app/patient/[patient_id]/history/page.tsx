'use client';

import Loadding from '@/components/Loadding';
import { Historys } from '@/models/history.model';
import { PhysicalStatus, TriageLevels } from '@/models/historyDetail.model';
import { findHistoryByPatientId } from '@/services/history.service';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Sheet from '@mui/joy/Sheet';
import { Divider } from '@mui/material';
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';

import HistoryItem from '../../../../components/HistoryItem';
import historyCss from './historyCss.module.css';
import { HistoryDetailContext, PhysicalStatusContext, TraigeLevelContext } from './StepContext';
import StepHistory from './StepHistory';
import BreadCrumb, { TBreadCrumd } from '@/components/BreadCrumb';

type Props = {
  params: {
    patient_id: string
  }
}


export default function Page({ params }: Props) {

  const items: TBreadCrumd[] = [
    {
      labe: 'หน้าหลัก',
      path: '/home'
    },
    {
      labe: 'ผู้ป่วย',
      path: '/patient/'
    },
    {
      labe: 'ประวัติการรักษา',
      path: '/history'
    },
  ]
  

  const [historyDetail, setHistoryDetail] = useState<Historys>({} as Historys)
  const [historyFrom, setHistoryFrom] = useState<boolean>(true);

  const [load, setLoad] = useState(false)
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
    setLoad(true)
    try {
      const result = await findHistoryByPatientId(params.patient_id);
      setHistory(result.data);
    } catch (error: any) {
      console.log(error);
      if (error.response.data.statusCode === 401) {
        window.location.href = '/login';
      }
    } finally {
      setLoad(false)
    }
  }, [setHistory]);

  useEffect(() => {
    onFeedHistoryByPatientId();
  }, [onFeedHistoryByPatientId]);

  return (
    <>
    <BreadCrumb item={items} />
      <div className={historyCss.homePage}>
        <div className={historyCss.item}>
         {
          history.length> 0 ?
          null:
          <Button variant='solid' color='primary' onClick={() => {
            setHistoryFrom(true);
            setHistory_id('');
          }}>เพิ่มประวัติ</Button>
         }

          {/* <HistoryTab /> */}

          <Divider style={{ margin: '10px 0' }} />
          <div className={historyCss.history_item}>
            {history.length > 0
              ? history.map((r, i) => (
                r.Patient ? (
                  <HistoryItem
                    name={{ first_name: r.Patient.first_name, last_name: r.Patient.last_name, patient_id: r.Patient.id, gender: r.Patient.gender }}
                    value={r}
                    key={i}
                  />
                ) : null
              ))
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


      {load ? <Loadding /> : null}
    </>
  );
}
