'use client'
import React, { useState } from 'react'
import homeCss from './home.module.css'
import { Button } from '@mui/material'
import { comfirm, toast } from '@/services/alert.service'
import Swal from 'sweetalert2'
import Divider from '@mui/material/Divider';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';


type Props = {
  hightMap: number
}

interface SaveMission {
  start_system: number
  start_mission: number
  arrive: number
  leave: number
  finish: number
}

export default function Vitalsing({ hightMap }: Props) {

  const [saveMision, setSaveMision] = useState<SaveMission>({} as SaveMission)
  const [disabled, setDisabled] = useState<boolean>(false)
  function onSaveMission() {
    Swal.fire({
      title: "Are you sure?",
      text: "You won to Save Mission!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, for Save Mission"
    }).then((result) => {
      if (result.isConfirmed) {
        toast('Mission Saved!', 'success')
        setDisabled(true)
      }
    });
  }
  return (
    <>
      <div className={homeCss.vatalsing} >
        <div className={homeCss.head}>
          <p>Operation</p>
          <div className={homeCss.line}></div>
        </div>
        <div className={homeCss.operater}>
          <Button disabled={disabled} onClick={() => {
            if(saveMision.start_system > 0 ){
              setSaveMision({ ...saveMision, start_system: {} as number })
            }
            else{
              setSaveMision({ ...saveMision, start_system: new Date().getTime() })
            }
          }} 
          variant={saveMision.start_system > 0? 'contained': 'outlined'} color='primary'><span>Start System</span><span>{saveMision.start_system > 0 ? convertTime(saveMision.start_system ) : ''}</span></Button>

          <Button disabled={disabled} onClick={() => {
            if(saveMision.start_mission > 0 ){
              setSaveMision({ ...saveMision, start_mission: {} as number })
            }
            else{
              setSaveMision({ ...saveMision, start_mission: new Date().getTime() })
            }
          }} 
          variant={saveMision.start_mission > 0? 'contained': 'outlined'} color='primary'><span>Start Mission</span><span>{saveMision.start_mission > 0 ? convertTime(saveMision.start_mission) : ''}</span></Button>

          <Button disabled={disabled} onClick={() => {
            if(saveMision.arrive > 0 ){
              setSaveMision({ ...saveMision, arrive: {} as number })
            }
            else{
              setSaveMision({ ...saveMision, arrive: new Date().getTime() })
            }
          }} 
          variant={saveMision.arrive > 0? 'contained': 'outlined'} color='primary'><span>Arrive at the place</span><span>{saveMision.arrive > 0 ? convertTime(saveMision.arrive) : ''}</span></Button>

          <Button disabled={disabled} onClick={() => {
            if(saveMision.leave > 0 ){
              setSaveMision({ ...saveMision, leave: {} as number })
            }
            else{
              setSaveMision({ ...saveMision, leave: new Date().getTime() })
            }
          }}
          variant={saveMision.leave > 0? 'contained': 'outlined'} color='primary'><span>leave</span><span>{saveMision.leave > 0 ? convertTime(saveMision.leave) : ''}</span></Button>

          <Button disabled={disabled} onClick={() => {
              onSaveMission()

            if(saveMision.finish > 0 ){
              setSaveMision({ ...saveMision, finish: {} as number })
            }
            else{
              setSaveMision({ ...saveMision, finish: new Date().getTime() })
            }
          }}
          variant={saveMision.finish > 0? 'contained': 'outlined'} color='primary'><span>Finished</span><span>{saveMision.finish > 0 ? convertTime(saveMision.finish ): ''}</span></Button>

        </div>
        <Divider />
        <div className={homeCss.emegency}>
          <Button variant='contained' color='error'><LocalPhoneIcon fontSize='large' /> Emegency Call</Button>
        </div>
      </div>
    </>
  )

  function convertTime(time: number) {
    const date = new Date(time)
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    return `เวลา: ${hours}:${minutes}:${seconds}`
  }
}
