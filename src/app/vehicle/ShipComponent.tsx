'use client'
import Loadding from '@/components/Loadding'
import { Cars, Helicopters, Ships } from '@/models/vehicle.model'
import { Button } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import { NIL } from 'uuid'
import CarCard from './CarICard'
import { findCarAll } from '@/services/car.service'
import { timeOutJwt } from '@/services/timeout.service'
import { findHalecopterAll } from '@/services/helicopter.service'
import CardHelicopter from './CardHelicopter'
import SailingIcon from '@mui/icons-material/Sailing';
import { findShipAll } from '@/services/ship.service'
import CardShip from './CardShip'
import PaginationThemplete from '@/components/PaginationThemplete'

export default function ShipComponent() {
  const [load, setLoad] = useState<boolean>(false)
  const [ships, setShips] = useState<Ships[]>({} as Ships[])
  const [page, setPage] = useState<number>(1)

  async function onUpdatePage(page: number) {
    setLoad(true)
    try {
      const result = await findShipAll(page, 10)
      setShips(result.data)
      console.log(result.data);

    } catch (error) {
      console.log(error);
      timeOutJwt(error)
    } finally {
      setLoad(false)
    }
  }

  const feedShipAll = useCallback(async () => {
    try {
      const result = await findShipAll(page, 10)
      setShips(result.data)
      console.log(result.data);

    } catch (error) {
      console.log(error);
      timeOutJwt(error)
    }
  }, [setShips])

  useEffect(() => {
    feedShipAll()

    return () => {
      feedShipAll
    }
  }, [feedShipAll])

  return (
    <>
      <Button onClick={() => {
        window.location.href = '/vehicle/' + NIL + '/ship'
        setLoad(true)
      }} endIcon={<SailingIcon />} type='button' sx={{ width: '100%', fontSize: '1.2rem' }} variant='contained' color='primary'>สร้างเรือรับส่ง</Button>

      {
        Object.keys(ships).length === 0 ?
          null :
          ships.map((r, i) =>
            <CardShip key={i} data={r} />
          )
      }
      <PaginationThemplete returnCurrent={onUpdatePage} />

      {
        load ?
          <Loadding /> :
          null
      }
    </>
  )
}
