'use client'
import React from 'react'
import { PhysicalStatusContext, TPhysicalStatusContext } from '../StepContext';
import { Checkbox, Divider, FormControlLabel, FormGroup, MenuItem, TextField } from '@mui/material';
import { PhysicalStatus } from '@/models/historyDetail.model';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function Cvs() {
  const { physicalStatus, setPhysicalStatus } = React.useContext<TPhysicalStatusContext>(PhysicalStatusContext);
  const [isNsf, setIsNsf] = React.useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedStatus = {
      ...physicalStatus,
      respi: {
        ...physicalStatus.respi,
        [event.target.name.toLowerCase()]: event.target.checked,
      },
    };

    if (event.target.name === 'NSF' && physicalStatus?.airway?.nsf !== true) {
      setIsNsf(!isNsf);
      setPhysicalStatus({
        ...physicalStatus, respi: {
          ...physicalStatus.respi, nsf: physicalStatus?.cvs?.nsf ? !physicalStatus?.cvs?.nsf : true, dyspnea: false, tachyypnea: false, wheezing: false
        }
      })
      console.log('nsf');


    }
    else {
      setPhysicalStatus({
        ...physicalStatus, cvs: {
          ...physicalStatus.cvs, nsf: false, dyspnea: false, active_bleed: false, dvt_risk: false, edema: false, orthopnea: false, pale: false
        }
      })
      setIsNsf(false)
      setPhysicalStatus(updatedStatus);

    }

  };

  React.useEffect(() => {
    if (isNsf === true || physicalStatus?.cvs?.nsf === true) {
      setPhysicalStatus({
        ...physicalStatus, cvs: {
          ...physicalStatus.cvs, nsf: true, dyspnea: false, active_bleed: false, dvt_risk: false, edema: false, orthopnea: false, pale: false
        }
      })
      setIsNsf(true)

    }
    // else{
    //     setPhysicalStatus({
    //         ...physicalStatus, airway: {
    //             ...physicalStatus.airway, nsf: false
    //         }
    //     })
    //     setIsNsf(false)
    // }

  }, [setPhysicalStatus])
  return (
    <div>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={physicalStatus?.cvs?.nsf}
              onChange={handleChange}
              name="NSF"
            />
          }
          label="NSF"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={physicalStatus?.cvs?.orthopnea}
              onChange={handleChange}
              name="orthopnea"
              disabled={isNsf}
            />
          }
          label="orthopnea"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={physicalStatus?.cvs?.dyspnea}
              onChange={handleChange}
              name="dyspnea"
              disabled={isNsf}
            />
          }
          label="Dyspnea"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={physicalStatus?.cvs?.active_bleed}
              onChange={handleChange}
              name="active_bleed"
              disabled={isNsf}
            />
          }
          label="Active Bleed"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={physicalStatus?.cvs?.pale}
              onChange={handleChange}
              name="pale"
              disabled={isNsf}
            />
          }
          label="Pale"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={physicalStatus?.cvs?.edema}
              onChange={handleChange}
              name="edema"
              disabled={isNsf}
            />
          }
          label="Edema"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={physicalStatus?.cvs?.dvt_risk}
              onChange={handleChange}
              name="dvt_risk"
              disabled={isNsf}
            />
          }
          label="DVT risk"
        />
      </FormGroup>
    </div>
  )
}
