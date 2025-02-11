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
      className='bg-gray-200 p-3'
      onChange={(e) => setTriageLevel({...triageLevel, triage_level_value: e.target.value})}
        aria-labelledby="demo-radio-buttons-group-label"
        value={triageLevel?.triage_level_value?? null}
        name="radio-buttons-group"
      >
        <FormControlLabel className='border-r-8 pr-4 border-red-500' value="Resuscitation" control={<Radio />} label="Resuscitation" />
        <FormControlLabel className='border-r-8 pr-4 border-red-500 mt-2' value="Emergency" control={<Radio />} label="Emergency" />
        <FormControlLabel className='border-r-8 pr-4 border-yellow-500 mt-2' value="Urgent" control={<Radio />} label="Urgent" />
        <FormControlLabel className='border-r-8 pr-4 border-green-500 mt-2' value="semi-urgent" control={<Radio />} label="semi-urgent" />
        <FormControlLabel className='border-r-8 pr-4 border-white mt-2' value="Non-Urgent" control={<Radio />} label="Non-Urgent" />
        <FormControlLabel className='border-r-8 pr-4 border-black mt-2' value="death" control={<Radio />} label="Non-Urgent" />
      </RadioGroup>
    </FormControl>
  );
}