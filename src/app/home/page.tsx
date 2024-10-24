'use client'
import React, { Component, useCallback, useContext, useEffect, useRef, useState } from 'react';

import { Missions } from '@/models/mission.model';
import { findMission, findMissionCurrent } from '@/services/mission.service';
import { MissionContexts } from '@/contexts/missions.context';
import { OpenModalUserContext } from '@/contexts/modalUser.context';
import ModalUser from '@/components/ModalUser';
import { findCurrentVehicleByUser, findUsers, saveLocation } from '@/services/user.service';
const utmObj = require('utm-latlng')
import * as mgrs from 'mgrs'
import { Locations } from '@/models/location.model';
import HomeContent from './HomeContent';
import { UsersContexts } from '@/contexts/users.context';
import { Users } from '@/models/users.model';
import { FindUserMe } from '@/services/authen.service';
import Loadding from '@/components/Loadding';
import { CurrentMissionContext } from '@/contexts/currentMission.context';
import { LocateContextUser } from '@/contexts/locate.context';
import { FindMeContext, TFindContext } from '@/contexts/findme.context';
import { timeOutJwt } from '@/services/timeout.service';
import { Cars, Vehicles } from '@/models/vehicle.model';
import { CurrentCarsContext, CurrentVehicleContext } from './CurrentVehicle.context';
import { toast } from '@/services/alert.service';
import { findCarByCarId } from '@/services/car.service';
import { IconVehicleContext, TIconVehicleC } from './IconVehicleContext';

const drawerWidth = 240;

export default function Page() {
  const UTM = new utmObj('Everest');
  const [openUser, setOpenUser] = useState(false);
  const [missions, setMissions] = useState<Missions[]>([]);
  const [missionId, setMissionId] = useState<Missions>({} as Missions);
  const [missionUser, setMissionUser] = useState<Missions>({} as Missions);
  const [userLocate, setUserLocate] = useState<Locations>({} as Locations);
  const [users, setUsers] = useState<Users[]>([]);
  const [load, setLoad] = useState<boolean>(false)
  const { findMe, setFindMe } = useContext<TFindContext>(FindMeContext)
  const [vehicle, setVehicle] = useState<Vehicles>({} as Vehicles)
  const {setIcon} = useContext<TIconVehicleC>(IconVehicleContext)

  const pushLocationUser = useCallback(async () => {
    try {
      return new Promise<void>((resolve, reject) => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              try {
                const { latitude, longitude } = position.coords;
                const utm = UTM.convertLatLngToUtm(longitude, latitude, 1);
                const mgrss = mgrs.forward([longitude, latitude]);
                const g = {} as Locations;
                g.lat = latitude.toString();
                g.long = longitude.toString();
                g.mgrs = mgrss;
                g.utm = JSON.stringify(utm);

                await saveLocation(g);
                setUserLocate(g);

                resolve();
              } catch (error) {
                setLoad(true)
                timeOutJwt(error)
              }
            },
            (error) => {
              console.error("Error getting geolocation:", error);
              reject(error);
            }
          );
        } else {
          const error = new Error("Geolocation is not supported by this browser.");
          console.error(error);
          reject(error);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, [setUserLocate]);



  const findMissionByUsre = useCallback(async () => {
    setLoad(true)
    try {
      const result = await findMissionCurrent()
      if (!result.data) {
        localStorage.removeItem('mission_id')
        setMissionUser({} as Missions)
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


    // const saveLo = setInterval(() => {
    //   pushLocationUser();
    //   console.log('5 secon');

    // }, 5000);

    return () => {
      // clearInterval(saveLo);
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


