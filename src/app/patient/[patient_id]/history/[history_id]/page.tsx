'use client'
import BodyHuman from '@/components/BodyHuman'
import React from 'react'
import exanCss from './exan.module.css'
import ExanElement from './ExanElement'
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import Input from '@mui/joy/Input';
import { Textarea } from '@mui/joy'
import { Box, Button } from '@mui/material'
import ExanDetail from './ExanDetail'
import { Historys } from '@/models/history.model'
import { findHistoryByPatientIdById } from '@/services/history.service'
import { findExanByHistoryId } from '@/services/exan.service'
import { ExanShows, Exans } from '@/models/exan.model'

type Props = {
  params: {
    history_id: string,
    pateint_id: string
  }
}

export type TypeOpenExanContext = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export const OpenExanImage = React.createContext<TypeOpenExanContext>({} as TypeOpenExanContext)

export default function page({ params }: Props) {

  const [open, setOpen] = React.useState<boolean>(false)

  const [history, setHistory] = React.useState<Historys>({} as Historys)

  const [exan, setExan] = React.useState<ExanShows[]>({} as ExanShows[])

  const [value, setValue] = React.useState<string[]>([])

  const onFeedHistoryByHistoryId = React.useCallback(async() => {
    try {
      const result = await findHistoryByPatientIdById(params.pateint_id, params.history_id)
      setHistory(result.data)      
    } catch (error) {
      console.log(error);
      
    }
  }, [setHistory])

  const onFeedExanByHistoyrId = React.useCallback(async() => {
    try {
      const result = await findExanByHistoryId(params.history_id)
      console.log(result.data);
      const arr = result.data.map(r => r.element_id)
      setValue(arr)
    } catch (error) {
      console.log(error);
      
    }
  }, [setExan, setValue])

  React.useEffect(() => {
    onFeedHistoryByHistoryId()
    onFeedExanByHistoyrId()
  }, [onFeedHistoryByHistoryId, onFeedExanByHistoyrId])

  return (
    <>
      <OpenExanImage.Provider value={{open, setOpen}} >
        <div className={exanCss.homeHistoryId}>
          <FormControl className={exanCss.formControl}>
            <FormLabel>Symtom_detail</FormLabel>
            <Textarea
              placeholder="Try to submit with no text!"
              variant='soft'
              value={history.symptom_details}
              minRows={3}
              sx={{ mb: 1 }}
            />
            <Box className={exanCss.boxButton}>
              <FormHelperText>This is a helper text.</FormHelperText>
              <Button variant='contained' color='primary' >Update</Button>
            </Box>
          </FormControl>
          <ExanElement organ={value} exan={exan} />
          <ExanDetail exan={exan} />
        </div>
      </OpenExanImage.Provider>
    </>
  )

  function renderValue() {

  }

}
