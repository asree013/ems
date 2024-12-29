'use client'
import { MissionTagSettingSchema, TMissionTagSettingsFrom } from '@/schema/mission_tag_setting_schema';
import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { MissionTagSetting } from '@/models/missionTagSetting.model';
import { useSearchParams } from 'next/navigation';
import { Divider } from '@mui/material';
import { createMissionTagSetting } from '@/services/mission_tag_setting.service';
import { toast } from '@/services/alert.service';
import BreadCrumb, { TBreadCrumd } from '@/components/BreadCrumb';
import { Delete, FileCog } from 'lucide-react';
import Swal from 'sweetalert2';
import CardUpdateSetting from '../CardUpdateSetting';
import Loadding from '@/components/Loadding';

type Props = {
  params: {
    mission_tag_setting_id: string
  }
}


export default function page({ params }: Props) {
  const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm<TMissionTagSettingsFrom>({
    resolver: zodResolver(MissionTagSettingSchema)
  });

  const vehicle = useSearchParams().get('vehicle');
  const count = useSearchParams().get('count');

  const vihecleType = () => {
    if (vehicle?.includes('car')) {
      return 'รถรับส่ง'
    }
    else if (vehicle?.includes('ship')) {
      return 'เรื่อรับส่ง'
    }
    else {
      return 'ฮ. รับส่ง'
    }
  }

  const items: TBreadCrumd[] = [
    {
      labe: "หน้าหลัก",
      path: '/home'
    },
    {
      labe: "ลักษณะภารกิจ",
      path: '/mission_tag_setting'
    },
    {
      labe: `เพิ่มลักษณะภารกิจ${vihecleType()}`,
      path: '/mission_tag_setting'
    },

  ]

  const currentCount = useRef(0);
  const [cartSetting, setCartSetting] = useState<MissionTagSetting[]>([]);
  const [open, setOpen] = React.useState<boolean>(false);
  const [currentSetting, setCurrentSetting] = useState<MissionTagSetting>({} as MissionTagSetting)
  const [load, setLoad] = useState<boolean>(false)

  function onSubmit(data: TMissionTagSettingsFrom) {
    currentCount.current++;

    const cs = {} as MissionTagSetting;
    cs.seq = Number(count) + currentCount.current;
    cs.label = data.label;
    cs.is_default = false

    if (vehicle && vehicle === 'car') cs.is_car = true;
    if (vehicle && vehicle === 'helicopter') cs.is_helicopter = true;
    if (vehicle && vehicle === 'ship') cs.is_ship = true;

    console.log(cs);
    setCartSetting([...cartSetting, cs]);

    // รีเซ็ตฟอร์มหลังจากส่งข้อมูล
    reset();
  }

  const handleClear = () => {
    alert('clear')
    reset();
  };

  async function onCreateSettingTag() {
    setLoad(true)
    try {
      const loopSetting = cartSetting.map(async (r) => {
        const result = await createMissionTagSetting(r)
        console.log(result.data);
        return result.data
      })
      history.back()
      console.log('array tag create', loopSetting);

    } catch (error: any) {
      toast(JSON.stringify(error.message), 'error')
      setLoad(false)
    } 
  }

  async function onDeleteCart(value: MissionTagSetting) {
    Swal.fire({
      title: "คุณต้องการลบแทกภารกิจนี้?",
      text: 'หากคุณต้องการลบแทก "' + value.label + '" ภารกิจนี้ออกจากเมนู กรุณากดลบ',
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ลบออก",
      cancelButtonText: 'ยกเลิก'
    }).then((result) => {
      if (result.isConfirmed) {
        setCartSetting(cartSetting.filter(r => r.id !== value.id))
        Swal.fire({
          title: "ลบออกเรียบร้อย!",
          text: 'คุณลบ "' + value.label + '" เรีบร้อย',
          icon: "success",
          showConfirmButton: false,
          timer: 1500
        });
      }
    });
  }

  function onOpenEdit(value: MissionTagSetting) {
    setCurrentSetting(value)
    setOpen(true)
  }

  function onUpdate(value: MissionTagSetting) {
    setOpen(false)
    const update = cartSetting.map((item) => {
      if(item.id === value.id) return value
      else{
        return item
      }
    })
    
    setCartSetting(update)
  }

  return (
    <>
      <div>
        <BreadCrumb item={items} />
        <div className='max-w-full h-full min-h-[60vh] flex flex-col items-center justify-center mt-2'>
          <div className='flex flex-col 2xl:flex-row xl:flex-row lg:flex-col md:flex-col sm:flex-col items-center justify-center w-full'>

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
                      cartSetting?.map((r, i) => (
                        <div key={i} className='p-2 flex flex-row w-full items-center justify-between mt-1 bg-white rounded-md border border-gray-500 hover:shadow-shadow cursor-pointer'>
                          <div className=''>
                            <label htmlFor="" className='text-[12px]'>แทกที่ {r.seq}</label>
                            <div className=' flex flex-row justify-between items-center'>
                              <p className='text-green-800 font-medium'>{r.label}</p>
                            </div>
                          </div>
                          <div>
                            <FileCog onClick={() => onOpenEdit(r)} color="#086fdd" />
                            <Delete onClick={() => onDeleteCart(r)} className='mt-2' color="#e00000" />
                          </div>
                        </div>
                      ))
                    }

                  </div>
                  <Divider className='mt-2' />
                  <div className='flex flex-row items-center justify-end mt-3'>
                    <button onClick={() => setCartSetting([])} className='p-2 border w-[100px] text-lg font-medium border-gray-300 hover:bg-gray-100 rounded-lg'>เคลียกล่อง</button>
                    <button onClick={onCreateSettingTag}
                      className='ml-2 p-2 border w-[100px] text-lg font-medium bg-blue-900 text-white hover:bg-blue-950 rounded-lg'>บันทึก</button>
                  </div>
                </div>
            }
          </div>
        </div>
      </div>

      {
        load?
        <Loadding />: 
        null
      }

      <CardUpdateSetting open={open} setOpen={setOpen} tagSetting={currentSetting} returnUpdateTagSetting={onUpdate} />
    </>
  );
}
