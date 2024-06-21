'use client';
import BodyHuman from '@/components/BodyHuman';
import React, { Dispatch, SetStateAction, createContext, useCallback, useEffect, useState } from 'react';
import exanCss from './exan.module.css';
import ExanElement from './ExanElement';
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

type Props = {
  params: {
    history_id: string;
    pateint_id: string;
  };
};

export type TypeOpenExanContext = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};
export type TypeElIDContext = {
  el_id: string;
  setEl_id: Dispatch<SetStateAction<string>>;
};
export type TypeExanContext = {
  exan: ExanShows[];
  setExan: Dispatch<SetStateAction<ExanShows[]>>;
};
export const OpenExanImage = createContext<TypeOpenExanContext>(
  {} as TypeOpenExanContext,
);
export const ElIdExanImage = createContext<TypeElIDContext>(
  {} as TypeElIDContext,
);
export const ExanContextBody = createContext<TypeExanContext>(
  {} as TypeExanContext,
);

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
              <ExanElement organ={value} exan={exan} />
              <ExanDetail />
            </div>
          </ExanContextBody.Provider>
        </ElIdExanImage.Provider>
      </OpenExanImage.Provider>
    </>
  );

  function renderValue() { }
}
