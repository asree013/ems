'use client';
import * as React from 'react';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import { Box } from '@mui/material';
import Checkbox from '@mui/joy/Checkbox';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import { PContext, PatientContext } from '@/contexts/patient.context';
import { Fragment, useContext } from 'react';

type Props = {
  openModel: boolean;
  returnRiskLevel: (txt: string) => void;
  returnStateOpenRisk: (bool: boolean) => void;
};

export default function RiskLevelModal({
  openModel,
  returnRiskLevel,
  returnStateOpenRisk,
}: Props) {
  const { patient, setPatient } = useContext<PContext>(PatientContext);
  return (
    <Fragment>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={openModel}
        onClose={() => returnStateOpenRisk(false)}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
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
        </Sheet>
      </Modal>
    </Fragment>
  );
}
