'use client'
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
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
import { findCurrentVehicleByUser, onSaveLocation } from '@/services/user.service';
import { toast } from '@/services/alert.service';
import HomeContent from './HomeContent';
import { IconVehicleContext, TIconVehicleC } from './IconVehicleContext';
import { CurrentVehicleContext } from './CurrentVehicle.context';
import { getIsOnline } from '@/services/endpoint.service';

const utmObj = require('utm-latlng');

export default function Page() {
  const UTM = new utmObj('Everest');
  const [openUser, setOpenUser] = useState(false);
  const [missions, setMissions] = useState<Missions[]>([]);
  const [missionId, setMissionId] = useState<Missions>({} as Missions);
  const [missionUser, setMissionUser] = useState<MissionById>({} as MissionById);
  const [userLocate, setUserLocate] = useState<Locations>({} as Locations);
  const [users, setUsers] = useState<Users[]>([]);
  const [load, setLoad] = useState<boolean>(false);
  const [vehicle, setVehicle] = useState<Vehicles>({} as Vehicles);
  const { setIcon } = useContext<TIconVehicleC>(IconVehicleContext);
  const [isOnline, setIsOnline] = useState<boolean>(getIsOnline());
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const pushLocationUser = useCallback(async () => {
    const getLo = await onSaveLocation();
    if (!getLo) {
      return toast('ไม่สามารถเข้าถึงที่ตั้งได้', 'error');
    }
    setUserLocate(getLo);
  }, [setUserLocate]);

  const findMissionByUser = useCallback(async () => {
    setLoad(true);
    try {
      const result = await findMissionCurrent();
      console.log('current Mission :' ,result);
      
      if (!result.data) {
        localStorage.removeItem('mission_id');
        setMissionUser({} as MissionById);
      } else {
        setMissionUser(result.data);
        localStorage.setItem('mission_id', result.data.id);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoad(false);
    }
  }, [setMissionUser]);

  const findCurrentVehicle = useCallback(async () => {
    setLoad(true);
    try {
      const result = await findCurrentVehicleByUser();
      setVehicle(result.data);
      if (result.data.car) setIcon('car');
      else if (result.data.helicopter) setIcon('helicopter');
      else if (result.data.ship) setIcon('ship');
    } catch (error) {
      console.error('findCurrentVehicle:', error);
    } finally {
      setLoad(false);
    }
  }, [setIcon, setVehicle]);

  useEffect(() => {
    const updateOnlineStatus = () => {
      const online = getIsOnline()
      setIsOnline(online);
      if (online) {
        pushLocationUser();
        findMissionByUser();
        findCurrentVehicle();
      }
      else {
        findMissionByUser();
        findCurrentVehicle();
      }
    };

    intervalRef.current = setInterval(() => {
      pushLocationUser();
      console.log('Saving location every 15 seconds');
    }, 15000);

    if (typeof window !== 'undefined') {
      window.addEventListener('online', updateOnlineStatus);
      window.addEventListener('offline', updateOnlineStatus);
    }

    updateOnlineStatus();

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, [pushLocationUser, findMissionByUser, findCurrentVehicle]);

  return (
    <>
      <MissionContexts.Provider value={{ missions, setMissions }}>
        <OpenModalUserContext.Provider value={{ openUser, setOpenUser, missionId, setMissionId }}>
          <UsersContexts.Provider value={{ users, setUsers }}>
            <CurrentMissionContext.Provider value={{ missionUser, setMissionUser }}>
              <LocateContextUser.Provider value={{ userLocate, setUserLocate }}>
                <CurrentVehicleContext.Provider value={{ vehicle, setVehicle }}>
                  <HomeContent />
                </CurrentVehicleContext.Provider>
              </LocateContextUser.Provider>
            </CurrentMissionContext.Provider>
            <ModalUser />
          </UsersContexts.Provider>
        </OpenModalUserContext.Provider>
      </MissionContexts.Provider>
      {load ? <Loadding /> : null}
    </>
  );
}
