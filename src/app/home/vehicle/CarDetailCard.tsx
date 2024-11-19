'use client'
import Clock from '@/components/Clock'
import Loadding from '@/components/Loadding'
import { CurrentMissionContext, TCurrentMission } from '@/contexts/currentMission.context'
import { MissionTag } from '@/models/mission.model'
import { toast } from '@/services/alert.service'
import { findMissionTagByMissionId } from '@/services/mission.service'
import { haversines } from '@/services/sum_lat_long.service'
import { Divider } from '@mui/material'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import styled from 'styled-components'

const DetailStyle = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    .noneMission{
      height: 270px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    @media only screen and (max-width: 1024px) {
      .cursorIpad{
        width: 100%;
        height: 140px;
        overflow: scroll;
        display: flex;
        align-items: start;
        flex-direction: column;
        justify-content: start;
        background: #f5f3f3;
    }
    .noneMission{
      height: 170px;
    }
  }
`

const CurrentMissionStyle = styled.div`
width: 100%;
  display: flex;
  align-items: start;
  justify-content: center;
  flex-direction: column;
  .titel{
    font-size: 1rem;
    font-weight: 600;
  }
  .label{
    font-size: 1.3rem;
    color: green;
  }
  .labelTxt{
      font-size: 18px;
    }

  @media only screen and (max-width: 820px) {
    .titel{
      font-size: 14px;
    }
    .label{
      font-size: 16px;
    }
    .labelTxt{
      font-size: 16px;
    }
  }
`

const LatLongStyle = styled.div`
  width: 100%;
  display: flex;
  align-items: start;
  justify-content: end;
  flex-direction: column;
  .titel{
    font-size: 1rem;
    font-weight: 600;
  }

`

const TitleMission = styled.p`
  background: linear-gradient(125deg, #021B79, #0575E6);
  padding: 5px;
  width: 100%;
  text-align: center;
  margin: 5px 0;
  font-size: 1rem;
  font-weight: 500;
  border-radius: 10px;
  color: white;
  @media only screen and (max-width: 1370px) {
    font-size: 1rem;
  }
`

type Props = {
  latlngMission: { lat: string, long: string }
  latlngUser: { lat: string, long: string }
}

export default function CarDetailCard({ latlngMission, latlngUser }: Props) {
  const { missionUser, setMissionUser } = useContext<TCurrentMission>(CurrentMissionContext)
  const [missionTag, setMissionTag] = useState<MissionTag[]>({} as MissionTag[])
  const [currentTag, setCurrentTag] = useState<MissionTag>({} as MissionTag)
  const [load, setLoad] = useState<boolean>(false)

  const onFeddMissionTag = useCallback(async () => {
    setLoad(true)
    try {
      const result = await findMissionTagByMissionId(missionUser.id)

      setMissionTag(result.data)
      if (result.data) {
        const findCurrent = result.data.flatMap((r) => {
          if (r.date_time_tag?.length > 0) {
            return r;
          }
          return [];
        });

        if (findCurrent) {
          const lastTimeStamp = findCurrent[findCurrent.length - 1];

          setCurrentTag(lastTimeStamp)
        }
      }
    } catch (error: any) {
      toast(error.message, 'error')
    } finally {
      setLoad(false)
    }
  }, [setMissionTag, missionUser])

  useEffect(() => {
    onFeddMissionTag()
  }, [onFeddMissionTag])

  return (
    <>
      <DetailStyle>
        <Clock />
        <Divider flexItem />
        <TitleMission>รายละเอียดภารกิจ</TitleMission>
        {
          missionUser ?
            <div className='cursorIpad'>
              <LatLongStyle>
                <p className='titel'>ระยะทาง</p>
                <p style={{ fontSize: '1.4rem', fontWeight: 600, color: 'red' }}>- {haversines(
                  Number(latlngMission.lat),
                  Number(latlngMission.long),
                  Number(latlngUser.lat),
                  Number(latlngUser.long)
                ).toFixed(2)} km.</p>
              </LatLongStyle>
              <CurrentMissionStyle>
                <p className='titel'>สถาณะภารกิจ  {Array.isArray(missionTag) ? `
            ${missionTag.filter(r => r.date_time_tag?.length > 0).length}/${missionTag.length}
          `: null}</p>
                <p className='label'>- {currentTag?.label}</p>
                <p className='titel'>การลงเวลาสถาณะปัจจุบัน</p>
                <p className='labelTxt'>- {new Date(currentTag?.date_time_tag).toLocaleString('th-TH')}</p>
                <p className='titel'>ภารกิจ</p>
                <p className='labelTxt'>- {missionUser?.title}</p>
                <p className='titel'>สถานที่เกิดเหตุ</p>
                <p className='labelTxt'>- {missionUser.address}</p>
              </CurrentMissionStyle>
            </div> :
            <div className='noneMission'>
              <p style={{fontSize: '1.5rem'}}>ยังไม่มีภารกิจ กรุณาเพิ่มภากิจ</p>
            </div>
        }

      </DetailStyle>

      {
        load ?
          <Loadding />
          : null
      }
    </>
  )
}
