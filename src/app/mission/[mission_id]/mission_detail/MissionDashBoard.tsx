'use client'
import { MissionById } from '@/models/mission.model';
import React from 'react';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import MissionPateintCard from './MissionPateintCard';
import ManIcon from '@mui/icons-material/Man';
import WomanIcon from '@mui/icons-material/Woman';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import LocalTaxiIcon from '@mui/icons-material/LocalTaxi';
import DirectionsBoatIcon from '@mui/icons-material/DirectionsBoat';
import LocalAirportIcon from '@mui/icons-material/LocalAirport';
import { TableGenerator } from '@/libs/TableGenerated';

type Props = {
  mission: MissionById;
}

export default function MissionDashBoard({ mission }: Props) {
  const selectedColumns = ['รูป', 'นามเรียกขาน', 'ป้ายทะเบียน', 'ประเภทรถ', 'action'];
  const cars = mission.CarJoinMission
  const helicopter = mission.HelicopterJoinMission

  return (
    <div>
      <div className='flex flex-col md:flex-row flex-wrap gap-10 justify-start items-center md:items-start w-full'>
        <MissionPateintCard
          Icon={DirectionsCarFilledIcon}
          background='bg-gray-100 cursor-pointer'
          border='border-gray-300 hover:border-gray-500'
          color={''}
          fontColor={'text-black'}
          count={`${mission.CarJoinMission?.length + mission.HelicopterJoinMission?.length + mission.ShipJoinMission?.length} คัน`}
          title='จำนวนยานพาหนะ'
        />
        <MissionPateintCard
          Icon={LocalTaxiIcon}
          background='bg-orange-100 cursor-pointer'
          border='border-orange-300 hover:border-orange-500'
          color={'warning'}
          fontColor={'text-orange-700'}
          count={`${mission.CarJoinMission?.length} คัน`}
          title='จำนวนรถรับส่ง'
        />
        <MissionPateintCard
          Icon={LocalAirportIcon}
          background='bg-sky-100 cursor-pointer'
          border='border-sky-300 hover:border-sky-500'
          color={'info'}
          fontColor={'text-sky-700'}
          count={`${mission.HelicopterJoinMission?.length} คัน`}
          title='จำนวน ฮ.รับส่ง'
        />
        <MissionPateintCard
          Icon={DirectionsBoatIcon}
          background='bg-purple-100 cursor-pointer'
          border='border-purple-300 hover:border-purple-500'
          color={'secondary'}
          fontColor={'text-purple-700'}
          count={`${mission.ShipJoinMission?.length} คัน`}
          title='จำนวนเรือรับส่ง'
        />
        <MissionPateintCard
          Icon={SupervisorAccountIcon}
          background='bg-green-100 cursor-pointer'
          border='border-green-300 hover:border-green-600'
          color={'success'}
          fontColor={'text-green-900'}
          count={`${mission.patients.length} คน`}
          title='จำนวนผู้ป่วยทั้งหมด'
        />
        <MissionPateintCard
          Icon={ManIcon}
          background='bg-blue-100 cursor-pointer'
          border='border-blue-300 hover:border-blue-500'
          color={'primary'}
          fontColor={'text-blue-800'}
          count={`${mission.patients.filter(r => r.gender.toLocaleLowerCase() === 'male').length} คน`}
          title='จำนวนผู้ป่วยเพศชาย'
        />
        <MissionPateintCard
          Icon={WomanIcon}
          background='bg-red-100 cursor-pointer'
          border='border-red-300 hover:border-red-500'
          color={'error'}
          fontColor={'text-red-700'}
          count={`${mission.patients.filter(r => r.gender.toLocaleLowerCase() === 'female').length} คน`}
          title='จำนวนผู้ป่วยเพศหญิง'
        />
      </div>

      <div className='flex flex-row items-start justify-start'>
        <div className='mt-5 border border-gray-300 rounded-md p-2'>
          <table className='text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
            <thead className='text-xs text-gray-700'>
              <tr>
                {selectedColumns.map((col, i) => (
                  <th className='px-6 py-3' key={i}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {
                !Array.isArray(cars) ?
                  <td className='px-6 py-4' >
                    ไม่มีข้อมูล
                  </td>
                  : cars?.map((key, j) =>
                    <tr className='bg-white border-b border-gray-500 dark:bg-gray-800 dark:border-gray-700' key={j}>
                      <td className='px-6 py-4' >
                        <img className='w-[50px] h-[50px] object-contain' src={key.image_front} alt={key.image_front} />
                      </td>
                      <td className='px-6 py-4' >
                        {key.calling}
                      </td>
                      <td className='px-6 py-4' >
                        {key.number}
                      </td>
                      <td className='px-6 py-4' >
                        {key.type}
                      </td>
                      <td className='px-6 py-4' >
                        ...
                      </td>
                    </tr>

                  )
              }
            </tbody>
          </table>
        </div>

        <div className='mt-5 border border-gray-300 rounded-md p-2'>
          <p>แฮลิคอปเตอร์</p>
          <table className='text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
            <thead className='text-xs text-gray-700'>
              <tr>
                {selectedColumns.map((col, i) => (
                  <th className='px-6 py-3 ' key={i}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {
                !Array.isArray(helicopter) ?
                    <td className='p-5 w-full' >
                      ไม่มีข้อมูล
                    </td>
                  : helicopter.map((key, j) =>
                    <tr className='bg-white border-b border-gray-500 dark:bg-gray-800 dark:border-gray-700' key={j}>
                      <td className='px-6 py-4' >
                        <img className='w-[50px] h-[50px] object-contain' src={key.image_front} alt={key.image_front} />
                      </td>
                      <td className='px-6 py-4' >
                        {key.calling}
                      </td>
                      <td className='px-6 py-4' >
                        {key.number}
                      </td>
                      <td className='px-6 py-4' >
                        {key.description}
                      </td>
                      <td className='px-6 py-4' >
                        ...
                      </td>
                    </tr>

                  )
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
