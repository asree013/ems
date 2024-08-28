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
          {/* <Box
            sx={{
              margin: '10px',
              display: 'flex',
              alignItems: 'start',
              justifyContent: 'center',
              flexDirection: 'column',
            }}
          >
            <Typography>Select Risk Level</Typography>
            <FormControl>
              <FormLabel>Variants</FormLabel>
              <RadioGroup
                name="radio-buttons-group"
                onChange={(e) => {
                  setPatient({ ...patient, risk_level: e.target.value });
                  returnStateOpenRisk(false);
                }}
              >
                <Sheet
                  variant="outlined"
                  sx={{ padding: '10px', marginTop: '5px', width: '250px' }}
                >
                  <Radio
                    value="W"
                    label="W (บาดเจ็ยเล็กน้อย/ไม่อันราย)"
                    variant="outlined"
                  />
                </Sheet>
                <Sheet
                  variant="outlined"
                  sx={{
                    padding: '10px',
                    marginTop: '5px',
                    width: '250px',
                    background: 'green',
                  }}
                >
                  <Radio
                    value="G"
                    label="G (ปลอดภัย)"
                    variant="soft"
                    sx={{ color: 'white' }}
                  />
                </Sheet>
                <Sheet
                  variant="outlined"
                  sx={{
                    padding: '10px',
                    marginTop: '5px',
                    width: '250px',
                    background: 'yellow',
                  }}
                >
                  <Radio
                    value="Y"
                    label="Y (บาดเจ็ยเล็กน้อย/อันราย)"
                    variant="soft"
                  />
                </Sheet>
                <Sheet
                  variant="outlined"
                  sx={{
                    padding: '10px',
                    marginTop: '5px',
                    width: '250px',
                    background: 'red',
                  }}
                >
                  <Radio
                    value="R"
                    label="R (บาดเจ็บสาหัส)"
                    variant="soft"
                    sx={{ color: 'white' }}
                  />
                </Sheet>
                <Sheet
                  variant="outlined"
                  sx={{
                    padding: '10px',
                    marginTop: '5px',
                    width: '250px',
                    background: 'black',
                  }}
                >
                  <Radio
                    value="B"
                    label="B (เสียชีวิต)"
                    variant="soft"
                    sx={{ color: 'white' }}
                  />
                </Sheet>
              </RadioGroup>
            </FormControl>
          </Box> */}
        </Sheet>
      </Modal>
    </Fragment>
  );
}
