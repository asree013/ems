'use client'
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';

import { Missions } from '@/models/mission.model';
import { findMission, findMissionCurrent } from '@/services/mission.service';
import { MissionContexts } from '@/contexts/missions.context';
import { OpenModalUserContext } from '@/contexts/modalUser.context';
import ModalUser from '@/components/ModalUser';
import { findUsers, saveLocation } from '@/services/user.service';
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

const drawerWidth = 240;

export default function Page() {
  const UTM = new utmObj('Everest');
  const [openUser, setOpenUser] = useState(false);
  const [missions, setMissions] = useState<Missions[]>([]);
  const [missionId, setMissionId] = useState<Missions>({} as Missions);
  const [missionUser, setMissionUser] = useState<Missions[]>({} as Missions[]);
  const [userLocate, setUserLocate] = useState<Locations>({} as Locations);
  const [users, setUsers] = useState<Users[]>([]);
  const [load, setLoad] = useState<boolean>(false)
  let role = ''
  const { findMe, setFindMe } = useContext<TFindContext>(FindMeContext)


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
        setMissionUser([])
      }
      setMissionUser(result.data)
      localStorage.setItem('mission_id', result.data[0].id)
    } catch (error) {
      console.log(error);
      timeOutJwt(error)
    } finally {
      setLoad(false)
    }
  }, [setMissionUser])

  useEffect(() => {
    pushLocationUser();
    findMissionByUsre()

    // const saveLo = setInterval(() => {
    //   pushLocationUser();
    //   console.log('5 secon');

    // }, 5000);

    return () => {
      // clearInterval(saveLo);
    };
  }, [pushLocationUser, findMissionByUsre]);


  return (
    <>
      <MissionContexts.Provider value={{ missions, setMissions }}>
        <OpenModalUserContext.Provider value={{ openUser, setOpenUser, missionId, setMissionId }}>
          <UsersContexts.Provider value={{ users, setUsers }} >

            <CurrentMissionContext.Provider value={{ missionUser, setMissionUser }} >
              <LocateContextUser.Provider value={{ userLocate, setUserLocate }} >

                <HomeContent />

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

