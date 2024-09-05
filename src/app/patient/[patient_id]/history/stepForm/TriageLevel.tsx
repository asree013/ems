'use client'
import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { TraigeLevelContext, TTriageLvelContext } from '../StepContext';

export default function TriageLevel() {
    const {setTriageLevel, triageLevel} = React.useContext<TTriageLvelContext>(TraigeLevelContext)
  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">Triage Level</FormLabel>
      <RadioGroup
      onChange={(e) => setTriageLevel({...triageLevel, triage_level_value: e.target.value})}
        aria-labelledby="demo-radio-buttons-group-label"
        value={triageLevel.triage_level_value?? null}
        name="radio-buttons-group"
      >
        <FormControlLabel value="Resuscitation" control={<Radio />} label="Resuscitation" />
        <FormControlLabel value="Emergency" control={<Radio />} label="Emergency" />
        <FormControlLabel value="Urgent" control={<Radio />} label="Urgent" />
        <FormControlLabel value="semi-urgent" control={<Radio />} label="semi-urgent" />
        <FormControlLabel value="Non-Urgent" control={<Radio />} label="Non-Urgent" />
      </RadioGroup>
    </FormControl>
  );
}