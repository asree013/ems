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
              checked={physicalStatus.airway?.nsf ?? false}
              onChange={handleChange}
              name="NSF"
            />
          }
          label="NSF"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={physicalStatus.airway?.stridor ?? false}
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
              checked={physicalStatus.airway?.secretion ?? false}
              onChange={handleChange}
              name="secrection"
              disabled={isNsf}
            />
          }
          label="Secretion"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={physicalStatus.airway?.injury ?? false}
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
              checked={physicalStatus.airway?.bleeding ?? false}
              onChange={handleChange}
              name="bleeding"
              disabled={isNsf}
            />
          }
          label="Bleeding"
        />
      </FormGroup>
      <Divider />
      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          value={physicalStatus?.airway?.checked?? ''}
          name="radio-buttons-group"
          onChange={(e) => setPhysicalStatus({...physicalStatus, airway: {
            ...physicalStatus.airway, checked: e.target.value
          }})}
        >
          <FormControlLabel value="female" control={<Radio />} label="Orai airway" />
          <FormControlLabel value="male" control={<Radio />} label="Nasal airway" />
          <FormControlLabel value="nasotrachealtube" control={<Radio />} label="Nasotracheal tube" />
          <FormControlLabel value="orotrachealtube" control={<Radio />} label="Orotracheal tube" />
          <FormControlLabel value="tracheostomytube" control={<Radio />} label="tracheostomy tube" />

        </RadioGroup>
      </FormControl>
    </div>
  );
}
