'use client'
import Loadding from '@/components/Loadding';
import ModalUser from '@/components/ModalUser';
import { CurrentMissionContext } from '@/contexts/currentMission.context';
import { FindMeContext, TFindContext } from '@/contexts/findme.context';
import { LocateContextUser } from '@/contexts/locate.context';
import { MissionContexts } from '@/contexts/missions.context';
import { OpenModalUserContext } from '@/contexts/modalUser.context';
import { UsersContexts } from '@/contexts/users.context';
import { Locations } from '@/models/location.model';
import { MissionById, Missions } from '@/models/mission.model';
import { Users } from '@/models/users.model';
import { Vehicles } from '@/models/vehicle.model';
import { findMissionCurrent } from '@/services/mission.service';
import { timeOutJwt } from '@/services/timeout.service';
import { findCurrentVehicleByUser, onSaveLocation, saveLocation } from '@/services/user.service';
import * as mgrs from 'mgrs';
import React, { Component, useCallback, useContext, useEffect, useRef, useState } from 'react';

import { CurrentVehicleContext } from './CurrentVehicle.context';
import HomeContent from './HomeContent';
import { IconVehicleContext, TIconVehicleC } from './IconVehicleContext';
import { toast } from '@/services/alert.service';

const utmObj = require('utm-latlng')

export default function Page() {
  const UTM = new utmObj('Everest');
  const [openUser, setOpenUser] = useState(false);
  const [missions, setMissions] = useState<Missions[]>([]);
  const [missionId, setMissionId] = useState<Missions>({} as Missions);
  const [missionUser, setMissionUser] = useState<MissionById>({} as MissionById);
  const [userLocate, setUserLocate] = useState<Locations>({} as Locations);
  const [users, setUsers] = useState<Users[]>([]);
  const [load, setLoad] = useState<boolean>(false)
  const [vehicle, setVehicle] = useState<Vehicles>({} as Vehicles)
  const {setIcon} = useContext<TIconVehicleC>(IconVehicleContext)

  const pushLocationUser = useCallback(async () => {
    const getLo = await onSaveLocation()
    if(!getLo){
      return toast('ไม่สามารถเข้าถึงที่ตั้งได้', 'error')
    }
    setUserLocate(getLo)
  }, [setUserLocate]);

  const findMissionByUsre = useCallback(async () => {
    setLoad(true)
    try {
      const result = await findMissionCurrent()
      if (!result.data) {
        localStorage.removeItem('mission_id')
        setMissionUser({} as MissionById)
      }
      setMissionUser(result.data)
      localStorage.setItem('mission_id', result.data.id)
    } catch (error) {
      console.log(error);
      // timeOutJwt(error)
    } finally {
      setLoad(false)
    }
  }, [setMissionUser])

  const findCurrentVehicle = useCallback(async () => {
    setLoad(true)
    try {
      const result = await findCurrentVehicleByUser()
      setVehicle(result.data)
      if(result.data.car) return setIcon('car')
      if(result.data.helicopter) return setIcon('helicopter')
        if(result.data.ship) return setIcon('ship')
    } catch (error: any) {
      console.log('findCurrent: ' ,error);
      
      // toast(JSON.stringify(error.message), 'error')
      // timeOutJwt(error)
    } finally {
      setLoad(false)
    }
  }, [setVehicle])

  useEffect(() => {
    pushLocationUser();
    findMissionByUsre()
    findCurrentVehicle()


    const saveLo = setInterval(() => {
      pushLocationUser();
      console.log('15 secon');

    }, 15000);

    return () => {
      clearInterval(saveLo);
      pushLocationUser
      findMissionByUsre
      findCurrentVehicle
    };
  }, [pushLocationUser, findMissionByUsre, findCurrentVehicle]);


  return (
    <>
      <MissionContexts.Provider value={{ missions, setMissions }}>
        <OpenModalUserContext.Provider value={{ openUser, setOpenUser, missionId, setMissionId }}>
          <UsersContexts.Provider value={{ users, setUsers }} >

            <CurrentMissionContext.Provider value={{ missionUser, setMissionUser }} >
              <LocateContextUser.Provider value={{ userLocate, setUserLocate }} >
                <CurrentVehicleContext.Provider value={{ vehicle, setVehicle }} >


                    <HomeContent />

                </CurrentVehicleContext.Provider>
              </LocateContextUser.Provider>
            </CurrentMissionContext.Provider>

            <ModalUser />

          </UsersContexts.Provider>
        </OpenModalUserContext.Provider>
      </MissionContexts.Provider>

      {
        load ?
          <Loadding /> :
          null
      }
    </>
  );

}


