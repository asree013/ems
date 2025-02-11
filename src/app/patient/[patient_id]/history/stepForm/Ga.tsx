'use client'
import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Input, Textarea } from '@mui/joy';
import { PhysicalStatusContext, TPhysicalStatusContext } from '../StepContext';

export default function Ga() {
  const [isNsf, setIsNsf] = React.useState<boolean>(false)

  const { physicalStatus, setPhysicalStatus } = React.useContext<TPhysicalStatusContext>(PhysicalStatusContext)

  return (
    <>
      <div style={{ height: '27.5rem', overflow: 'scroll' }}>
        <div style={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
          <div></div>
          <a onClick={() => {
            setPhysicalStatus({ ...physicalStatus, ga: '' })
            setIsNsf(false)
          }}>เคลียร์ Ga</a>
        </div>
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">เลือก Ga</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            value={physicalStatus ? physicalStatus?.ga ?? '' : ''}
            name="radio-buttons-group"
            onChange={(e) => {
              if (e.target.value === 'NSF') {
                setIsNsf(true)
              }
              setPhysicalStatus({ ...physicalStatus, ga: e.target.value })

            }}
          >
            <FormControlLabel value="NSF" control={<Radio />} label="NSF" />
            <FormControlLabel disabled={isNsf} value="confuse" control={<Radio />} label="confuse" />
            <FormControlLabel disabled={isNsf} value="depress" control={<Radio />} label="depress" />
            <FormControlLabel disabled={isNsf} value="drowsy" control={<Radio />} label="drowsy" />
            <FormControlLabel disabled={isNsf} value="anxious" control={<Radio />} label="anxious" />
            <FormControlLabel disabled={isNsf} value="disorient" control={<Radio />} label="disorient" />
            <FormControlLabel disabled={isNsf} value="unresponsive" control={<Radio />} label="unresponsive" />
            <FormControlLabel disabled={isNsf} value="anxious" control={<Radio />} label="anxious" />
            <FormControlLabel disabled={isNsf} value="anxious" control={<Radio />} label="anxious" />
          </RadioGroup>
        </FormControl>
        <div className='mt-2'>
          <label htmlFor="Sedated">Sedated</label>
          <Textarea onChange={(e) => {
            setPhysicalStatus({
              ...physicalStatus, sedated: {
                ...physicalStatus?.sedated, drug: e.target.value
              }
            })
          }} value={physicalStatus?.sedated ? physicalStatus?.sedated?.drug ?? '' : ''} id='Sedated' placeholder='Drug' minRows={2} />
        </div>
        <div className='mt-1'>
          <label htmlFor="RR">Time Drug</label>
          <Input onChange={(e) => {
            setPhysicalStatus({
              ...physicalStatus, sedated: {
                ...physicalStatus.sedated, time: e.target.value
              }
            })
          }} value={physicalStatus?.sedated ? physicalStatus?.sedated?.time ?? '' : ''} type='time' />
        </div>
        <div className='mt-1'>
          <label htmlFor="RR">Restriant Time</label>
          <Input onChange={(e) => {
            setPhysicalStatus({
              ...physicalStatus, sedated: {
                ...physicalStatus.sedated, restraint_time: e.target.value
              }
            })
          }} value={physicalStatus?.sedated ? physicalStatus?.sedated?.restraint_time ?? '' : ''} type='time' />
        </div>
      </div>
    </>
  );
}
