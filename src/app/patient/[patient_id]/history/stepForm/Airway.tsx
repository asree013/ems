"use client";

import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { PhysicalStatusContext, TPhysicalStatusContext } from '../StepContext';
import { Divider } from '@mui/material';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import Box from '@mui/joy/Box';
import RadioJ from '@mui/joy/Radio';
import RadioGroupJ from '@mui/joy/RadioGroup';
import Typography from '@mui/joy/Typography';
import { Input } from '@mui/joy';

import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

const currencies = [
  {
    value: '0.5',
    label: '0.5',
  },
  {
    value: '1',
    label: '1',
  },
  {
    value: '1.5',
    label: '1.5',
  },
  {
    value: '2',
    label: '2',
  },
  {
    value: '2.5',
    label: '2.5',
  },
  {
    value: '3',
    label: '3',
  },
  {
    value: '3.5',
    label: '3.5',
  },
  {
    value: '4',
    label: '4',
  },
  {
    value: '4.5',
    label: '4.5',
  },
  {
    value: '5',
    label: '5',
  },
  {
    value: '5',
    label: '5.5',
  },
  {
    value: '6',
    label: '6',
  },
  {
    value: '6.5',
    label: '6.5',
  },
  {
    value: '7',
    label: '7',
  },
  {
    value: '7.5',
    label: '7.5',
  },
  {
    value: '8',
    label: '8',
  },
  {
    value: '8.5',
    label: '8.5',
  },
  {
    value: '9',
    label: '9',
  },
  {
    value: '9.5',
    label: '9.5',
  },
  {
    value: '10',
    label: '10',
  },
];

export default function Airway() {
  const { physicalStatus, setPhysicalStatus } = React.useContext<TPhysicalStatusContext>(PhysicalStatusContext);

  // ใช้ useEffect เพื่อดึงข้อมูลจาก localStorage
  const [defaultValue, setDefaultValue] = React.useState<any>({ airway: {}, isNsf: false });
  const [isNsf, setIsNsf] = React.useState<boolean>(false);

  React.useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('airway_select') ?? '{}');
    setDefaultValue(savedData);
    console.log(savedData);

    setIsNsf(savedData.isNsf)
  }, []);


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedStatus = {
      ...physicalStatus,
      airway: {
        ...physicalStatus.airway,
        [event.target.name.toLowerCase()]: event.target.checked,
      },
    };

    setPhysicalStatus(updatedStatus);

    if (event.target.name === 'NSF') {
      setIsNsf(!isNsf);

    }

    const newPhysicalStatus = { ...updatedStatus, isNsf: !isNsf };
    localStorage.setItem('airway_select', JSON.stringify(newPhysicalStatus));
  };

  return (
    <div style={{ height: '25rem', overflow: 'scroll' }}>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={defaultValue?.airway?.nsf? true: false}
              onChange={handleChange}
              name="NSF"
            />
          }
          label="NSF"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={defaultValue?.airway?.stridor}
              onChange={handleChange}
              name="stridor"
              disabled={isNsf}
            />
          }
          label="Stridor"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={defaultValue?.airway?.secretion}
              onChange={handleChange}
              name="secretion"
              disabled={isNsf}
            />
          }
          label="Secretion"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={defaultValue?.airway?.injury}
              onChange={handleChange}
              name="injury"
              disabled={isNsf}
            />
          }
          label="Injury"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={defaultValue?.airway?.bleeding}
              onChange={handleChange}
              name="bleeding"
              disabled={isNsf}
            />
          }
          label="Bleeding"
        />
      </FormGroup>
      <Divider />
      <FormControl className='mt-2'>
        <FormLabel id="demo-radio-buttons-group-label">Option อื่นๆ</FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          value={physicalStatus?.airway?.checked ?? ''}
          name="radio-buttons-group"
          onChange={(e) => {
            setPhysicalStatus({
              ...physicalStatus, airway: {
                ...physicalStatus.airway, checked: e.target.value
              }
            })
            if (e.target.value === 'nasotracheal_tube' || e.target.value === 'orotracheal_tube' || e.target.value === 'tracheostomy_tube') {
              document.getElementById('tubeF')?.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        >
          <FormControlLabel value="orai_airway" control={<Radio />} label="Orai airway" />
          <FormControlLabel value="nasal_airway" control={<Radio />} label="Nasal airway" />
          <FormControlLabel value="nasotracheal_tube" control={<Radio />} label="Nasotracheal tube" />
          <FormControlLabel value="orotracheal_tube" control={<Radio />} label="Orotracheal tube" />
          <FormControlLabel value="tracheostomy_tube" control={<Radio />} label="tracheostomy tube" />

        </RadioGroup>
      </FormControl>

      {
        physicalStatus?.airway?.checked === 'nasotracheal_tube' || physicalStatus?.airway?.checked === 'orotracheal_tube' || physicalStatus?.airway?.checked === 'tracheostomy_tube'
          ? <div>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography
                id="segmented-controls-example"
                sx={{ fontWeight: 'lg', fontSize: 'sm' }}
              >
                Tube:
              </Typography>
              <RadioGroupJ
                orientation="horizontal"
                aria-labelledby="segmented-controls-example"
                name=""
                value={physicalStatus?.airway?.tube?.trachostomy_tobe ?? ''}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  console.log(event)
                  setPhysicalStatus({
                    ...physicalStatus, airway: {
                      ...physicalStatus.airway, tube: {
                        ...physicalStatus.airway.tube, trachostomy_tobe: event.target.value.toLocaleLowerCase()
                      }
                    }
                  })
                }}

                sx={{
                  minHeight: 48,
                  padding: '4px',
                  borderRadius: '12px',
                  bgcolor: 'neutral.softBg',
                  '--RadioGroup-gap': '4px',
                  '--Radio-actionRadius': '8px',
                }}
              >
                {['cuffed', 'uncuffed'].map((item) => (
                  <RadioJ
                    key={item}
                    color="neutral"
                    value={item}
                    disableIcon
                    label={item}
                    variant="plain"
                    sx={{ px: 2, alignItems: 'center' }}
                    slotProps={{
                      action: ({ checked }) => ({
                        sx: {
                          ...(checked && {
                            bgcolor: 'background.surface',
                            boxShadow: 'sm',
                            '&:hover': {
                              bgcolor: 'background.surface',
                            },
                          }),
                        },
                      }),
                    }}
                  />
                ))}
              </RadioGroupJ>
            </Box>
            <div className='mt-3'>
              <TextField
                id="outlined-select-currency"
                select
                label="NO."
                helperText="กรอกขนาดท่อ"
                sx={{width: '100%'}}
              >
                {currencies.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </div>
          :
          null
      }

    </div>
  );
}
