'use client'
import { MissionTagSettingSchema, TMissionTagSettingsFrom } from '@/schema/mission_tag_setting_schema';
import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { MissionTagSetting } from '@/models/missionTagSetting.model';
import { useSearchParams } from 'next/navigation';
import { Divider } from '@mui/material';

type Props = {
  params: {
    mission_tag_setting_id: string
  }
}

export default function page({ params }: Props) {
  const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm<TMissionTagSettingsFrom>({
    resolver: zodResolver(MissionTagSettingSchema)
  });

  const searchParams = useSearchParams();
  const currentCount = useRef(0);
  const [cartSetting, setCartSetting] = useState<MissionTagSetting[]>([]);

  function onSubmit(data: TMissionTagSettingsFrom) {
    console.log(data);
    currentCount.current++;

    const cs = {} as MissionTagSetting;
    cs.seq = Number(searchParams.get('count')) + currentCount.current;
    cs.label = data.label;

    const vehicle = searchParams.get('vehicle');
    if (vehicle && vehicle === 'car') cs.is_car = true;
    if (vehicle && vehicle === 'helicopter') cs.is_helicopter = true;
    if (vehicle && vehicle === 'ship') cs.is_ship = true;

    console.log(cs);
    setCartSetting([...cartSetting, cs]);

    // รีเซ็ตฟอร์มหลังจากส่งข้อมูล
    reset();
  }

  const handleClear = () => {
    reset(); // รีเซ็ตฟอร์ม
    setCartSetting([]); // เคลียร์ cartSetting
  };

  return (
    <div className='container max-w-full h-[60vh] flex flex-col items-center justify-center'>
      <div className='flex 2xl:flex-row sm:flex-col items-center justify-center w-full'>

        <div className='w-[350px] h-[300px] p-7 rounded-xl border border-gray-400 shadow-lg m-2'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='mt-2 flex flex-col items-start justify-center'>
              <label className="text-blue-gd-from text-xl font-bold" htmlFor="label">
                ขั้นตอนการปฎิบัติการ <span className='text-red-600'>*</span>
              </label>
              <textarea
                rows={3}
                className={`
                  w-full border ${errors.label?.message ? 'border-red-600 outline-none' : 'border-gray-400'} rounded-lg p-2
                `}
                id="label"
                placeholder='กรอกรายละเอีดการปฎิบัติการ'
                {...register('label')}
              ></textarea>
              {errors.label && <p className='text-red-600'>{errors.label.message}</p>}
            </div>
            <div className='mt-8 flex flex-row items-center justify-between'>
              <button type='submit' className='bg-gray-500 font-medium hover:bg-gray-700 text-white w-[140px] p-2 text-lg rounded-xl'>
                เพิ่ม
              </button>
              <button type='button' onClick={handleClear} className='bg-gray-200 font-medium hover:bg-gray-300 w-[140px] p-2 text-lg rounded-xl'>
                เคลียตัวอักษร
              </button>
            </div>
          </form>
        </div>
        {
          cartSetting.length === 0 ?
            null : <div className='w-[350px] h-[300px] p-5 rounded-xl border border-gray-400 shadow-lg m-2'>
              <p className='text-blue-gd-from text-xl'>ตรวจสอบรายละเอียดการสร้าง</p>
              <div className='bg-gray-300 w-[300px] h-[165px] p-2 rounded-md overflow-y-scroll'>
                {
                  cartSetting.map((r, i) => (
                    <div key={i} className='p-2 mt-1 bg-white rounded-md border border-gray-500 hover:shadow-shadow cursor-pointer'>
                      <label htmlFor="" className='text-[12px]'>แทกที่ {r.seq}</label>
                      <div className=' flex flex-row justify-between items-center'>
                        <p className='text-green-800 font-medium'>{r.label}</p>
                        <p className='text-red-600'>{r.is_ship ? 'แทกเรือ' : null}</p>
                        <p className='text-red-600'>{r.is_car ? 'แทกรถ' : null}</p>
                        <p className='text-red-600'>{r.is_helicopter ? 'แทก ฮ.' : null}</p>
                      </div>
                    </div>
                  ))
                }

              </div>
              <Divider className='mt-2' />
              <div className='flex flex-row items-center justify-end mt-3'>
                <button className='p-2 border w-[100px] text-lg font-medium border-gray-300 hover:bg-gray-100 rounded-lg'>เคลียกล่อง</button>
                <button className='ml-2 p-2 border w-[100px] text-lg font-medium bg-blue-900 text-white hover:bg-blue-950 rounded-lg'>บันทึก</button>
              </div>
            </div>
        }
      </div>
    </div>
  );
}
