'use client'

import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Divider from '@mui/joy/Divider';
import Typography from '@mui/joy/Typography';
import { Missions } from '@/models/mission.model';
import { Avatar, Button } from '@mui/material';
import { Locations } from "@/models/location.model"
import { haversines } from '@/services/sum_lat_long.service';
import { addCarToMissionByMissionIdAndCarId, joinMission, unAddCarToMissionByMissionIdAndCarId } from '@/services/mission.service';
import { timeOutJwt } from '@/services/timeout.service';
import { toast } from '@/services/alert.service';
import { useParams, useSearchParams } from 'next/navigation';
import Loadding from '@/components/Loadding';
import { addShipInMission } from '@/services/ship.service';
import { addHelicopterInMission } from '@/services/helicopter.service';

type Props = {
  mission: Missions
  currentLo: Locations
  returnLoad: (bool: boolean) => void
}

export default function MissionItem({ mission, currentLo, returnLoad }: Props) {
  const vehicleId = useParams().vehicle.toString()
  const key = useSearchParams().get('key')
  const [load, setLoad] = React.useState(false)
  console.log("Mission ====> " ,mission);



  async function onJoinMission() {
    try {
      setLoad(true)
      if (key?.includes('car')) {
        await addCarToMissionByMissionIdAndCarId(mission.id, vehicleId)
        window.location.href = '/mission/' + mission.id + '/mission_detail'
        localStorage.setItem('mission_id', mission.id)
        returnLoad(true)
        toast('เข้าร่วมภารกิจ', 'seccess')
        return
      }
      if (key?.includes('ship')) {
        const result = await addShipInMission(mission.id, vehicleId)
        localStorage.setItem('mission_id', mission.id)
        returnLoad(true)
        toast('เข้าร่วมภารกิจ', 'seccess')
        window.location.href = '/mission/' + mission.id + '/mission_detail'
        return
      }
      if (key?.includes('helicopter')) {
        const result = await addHelicopterInMission(mission.id, vehicleId)
        localStorage.setItem('mission_id', mission.id)
        returnLoad(true)
        toast('เข้าร่วมภารกิจ', 'seccess')
        window.location.href = '/mission/' + mission.id + '/mission_detail'
        return
      }
    } catch (error: any) {
      // timeOutJwt(error)
      setLoad(false)
      toast(JSON.stringify(error.message), 'error')

    }
  }
  return (
    <>
      <Card variant="outlined" sx={{ width: 320 }}>
        <CardOverflow>
          {/* <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '10px'}}>
          <Avatar style={{width: '2rem', height: '2rem'}} src='' />
          <p>name</p>
        </div> */}
          <AspectRatio ratio="2">

            <img
              src={mission.image}
              srcSet={mission.image}
              loading="lazy"
              alt=""
            />
          </AspectRatio>
        </CardOverflow>
        <CardContent>
          <Typography level="title-md">{mission.title}</Typography>
          <Typography level="body-sm">{mission.address}</Typography>
        </CardContent>
        <CardContent>
          <Button variant='contained' onClick={onJoinMission} type='button'>นำยานพาหนะร่วมภารกิจ</Button>
        </CardContent>
        <CardOverflow variant="soft" sx={{ bgcolor: 'background.level1' }}>
          <Divider inset="context" />
          <CardContent orientation="horizontal">
            <Typography level="body-xs" fontWeight="md" textColor="text.secondary">
              {/* สมาชิก {mission?._count.Users?? 0} คน */}
            </Typography>
            <Divider orientation="horizontal" />
            <Typography level="body-xs" fontWeight="md" textColor="text.secondary" sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: "60%" }}>
              ระยะห่างจากภารกิจ <p style={{color: 'red'}}>{haversines(Number(mission?.lat), Number(mission?.long), Number(currentLo?.lat), Number(currentLo?.long)).toFixed(2)}</p> KM.
            </Typography>
          </CardContent>
        </CardOverflow>
      </Card>

      {
        load?
        <Loadding />:
        null
      }
    </>
  );
}
