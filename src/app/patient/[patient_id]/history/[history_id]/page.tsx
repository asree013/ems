'use client';
import BodyHuman from '@/app/patient/[patient_id]/history/[history_id]/exan/BodyHuman';
import React, { Dispatch, SetStateAction, createContext, useCallback, useEffect, useState } from 'react';
import exanCss from './exan.module.css';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import Input from '@mui/joy/Input';
import { Textarea } from '@mui/joy';
import { Box, Button } from '@mui/material';
import ExanDetail from './ExanDetail';
import { Historys } from '@/models/history.model';
import { findHistoryByPatientIdById } from '@/services/history.service';
import { findExanByHistoryId } from '@/services/exan.service';
import { ExanShows, Exans } from '@/models/exan.model';
import { ExanContextBody } from '@/contexts/exan.context';
import { ElIdExanImage } from '@/contexts/elIdExanImage.context';
import { OpenExanImage } from '@/contexts/openExanImage.context';
import ExanElement from './ExanElement';

type Props = {
  params: {
    history_id: string;
    pateint_id: string;
  };
};

export default function Page({ params }: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const [el_id, setEl_id] = useState<string>('');

  const [history, setHistory] = useState<Historys>({} as Historys);

  const [exan, setExan] = useState<ExanShows[]>({} as ExanShows[]);

  const [value, setValue] = useState<string[]>([]);

  const onFeedHistoryByHistoryId = useCallback(async () => {
    try {
      const result = await findHistoryByPatientIdById(
        params.pateint_id,
        params.history_id,
      );
      setHistory(result.data);
    } catch (error) {
      console.log(error);
    }
  }, [setHistory]);

  const onFeedExanByHistoyrId = useCallback(async () => {
    try {
      const result = await findExanByHistoryId(params.history_id);
      const arr = result.data.map((r) => r.element_id);
      setValue(arr);
      setExan(result.data);
    } catch (error) {
      console.log(error);
    }
  }, [setExan, setValue]);

  useEffect(() => {
    onFeedHistoryByHistoryId();
    onFeedExanByHistoyrId();
    return () => {
      onFeedHistoryByHistoryId();
      onFeedExanByHistoyrId();
    }
  }, [onFeedHistoryByHistoryId, onFeedExanByHistoyrId]);

  return (
    <>
      <OpenExanImage.Provider value={{ open, setOpen }}>
        <ElIdExanImage.Provider value={{ el_id, setEl_id }}>
          <ExanContextBody.Provider value={{ exan, setExan }}>
            <div className={exanCss.homeHistoryId}>
              <FormControl className={exanCss.formControl}>
                <FormLabel>Symtom_detail</FormLabel>
                <Textarea
                  placeholder="Try to submit with no text!"
                  variant="soft"
                  value={history.symptom_details}
                  minRows={3}
                  sx={{ mb: 1 }}
                />
                <Box className={exanCss.boxButton}>
                  <FormHelperText>This is a helper text.</FormHelperText>
                  <Button variant="contained" color="primary">
                    Update
                  </Button>
                </Box>
              </FormControl>
              {/* <ExanDetail /> */}
              <div className={exanCss.cardEelement}>
                <ExanElement organ={value} exan={exan} />
              </div>
            </div>

          </ExanContextBody.Provider>
        </ElIdExanImage.Provider>
      </OpenExanImage.Provider>
    </>
  );

}
