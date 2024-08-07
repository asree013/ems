'use client'
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';

import { Missions } from '@/models/mission.model';
import { findMission, findMissionByUser } from '@/services/mission.service';
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
import { LocateContext } from '@/contexts/locate.context';
import { FindMeContext, TFindContext } from '@/contexts/findme.context';

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
  // const { findMe, setFindMe } = useContext<TFindContext>(FindMeContext)
  const [findMe, setFindMe] = useState<Users>({} as Users)

  const feedMission = useCallback(async () => {
    setLoad(true)
    try {
      const result = await findMission(1, 10);
      setMissions(result.data);
    } catch (error) {
      console.log(error);
      alert('mission')
    } finally {
      setLoad(false)
    }
  }, [setMissionId]);

  const pushLocationUser = useCallback(async () => {
    try {
      return new Promise<void>((resolve, reject) => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords;
              const utm = UTM.convertLatLngToUtm(longitude, latitude, 1);
              const mgrss = mgrs.forward([longitude, latitude]);
              const g = {} as Locations;
              g.lat = latitude.toString();
              g.long = longitude.toString();
              g.mgrs = mgrss;
              g.utm = JSON.stringify(utm);

              const a = await saveLocation(g);
              setUserLocate(g);

              resolve();
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

  const feedUser = useCallback(async () => {
    try {
      const result = await findUsers(1, 10);
      setUsers(result.data);
      console.log(result.data);
    } catch (error) {
      console.log(error);
      alert('find user')
    }
  }, [setUsers]);


  const findMissionUsre = useCallback(async () => {
    setLoad(true)
    try {
      const result = await findMissionByUser()
      setMissionUser(result.data)
      console.log('---------------> ', result.data);
    } catch (error) {
      console.log(error);
      alert('find mission by user')

    } finally {
      setLoad(false)
    }
  }, [setMissionUser])

  const feedFindMe = useCallback(async() => {
    try {
      const resutl = await FindUserMe()
      setFindMe(resutl.data)
      if (resutl.data.role.toLocaleLowerCase().includes('user')) {
        findMissionUsre()
        setLoad(false)
      }
      if (resutl.data.role.toLocaleLowerCase().includes('admin' || 'rootadmin')) {
        feedMission()
        setLoad(false)
      }
    } catch (error) {
      console.log(error);
      
    }
  }, [setFindMe])

  useEffect(() => {
    setLoad(true)
    feedFindMe()
    
    pushLocationUser();
    const saveLo = setInterval(() => {
      pushLocationUser();
    }, 5000);

    return () => {
      clearInterval(saveLo);
    };
  }, [pushLocationUser]);


  return (
    <>
      <MissionContexts.Provider value={{ missions, setMissions }}>
        <OpenModalUserContext.Provider value={{ openUser, setOpenUser, missionId, setMissionId }}>
          <UsersContexts.Provider value={{ users, setUsers }} >

            <CurrentMissionContext.Provider value={{ missionUser, setMissionUser }} >
              <LocateContext.Provider value={{ userLocate, setUserLocate }} >

                <HomeContent />

              </LocateContext.Provider>
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

