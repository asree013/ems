'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { NIL } from 'uuid'
import CardSettingTag from './CardSettingTag'
import { MissionTagSetting } from '@/models/missionTagSetting.model'
import { getMissionTagSetting } from '@/services/mission_tag_setting.service'
import { toast } from '@/services/alert.service'
import BreadCrumb, { TBreadCrumd } from '@/components/BreadCrumb'

const items: TBreadCrumd[] = [
    {
        labe: "หน้าหลัก",
        path: '/home'
    },
    {
        labe: "ลักษณะภารกิจ",
        path: '/mission_tag_setting'
    }
]

export default function page() {
    const [setting, setSetting] = useState<MissionTagSetting[]>({} as MissionTagSetting[])

    function onUpdateData(value: MissionTagSetting) {
        console.log(value);
        const update = setting.map((item) => {
            if(item.id === value.id) return value
            else{
              return item
            }
          })
        setSetting(update)       
    }

    const onFeedMissionTagSetting = useCallback(async () => {
        try {
            const result = await getMissionTagSetting(1, 50)
            console.log(result.data);

            setSetting(result.data)
        } catch (error: any) {
            toast(error.message, 'error')
        }
    }, [setSetting])

    useEffect(() => {
        onFeedMissionTagSetting()

    }, [onFeedMissionTagSetting])

    return (
        <div className='max-w-full'>
            <BreadCrumb item={items} />

            <div className='p-2 flex flex-col 2xl:flex-row xl:flex-row lg:flex-col md:flex-col sm:flex-col md:items-center sm:items-center items-start justify-center mt-8 gap-6'>
                <div>
                    <button onClick={() => {
                        const path = '/mission_tag_setting/' + NIL + `?vehicle=car&count=${setting.filter(r => r.is_car === true).length}`
                        console.log(path);
                        window.location.href = path
                    }} className=' bg-gray-300 text-black hover:bg-gray-700 hover:text-white p-3 rounded-t-lg'>
                        <p className='text-start font-bold'>สร้าง</p>
                        <p className='mt-0 text-xl font-bold'>Setting Tag Car</p>
                    </button>
                    <div className='pt-3 pl-8 pr-8 pb-8  border border-gray-300 rounded-b-lg rounded-e-lg min-w-[300px] mix-w-[400px] h-[400px] max-w-full hover:shadow-shadow '>
                        <p>แท็กรถยนต์</p>
                        <div className='mt-6 w-[250px] h-[300px] overflow-y-scroll'>
                            {
                                setting.length > 0 ?
                                    setting.filter(r => r.is_car === true).sort((a, b) => a.seq - b.seq).map((r, i) => (
                                        <CardSettingTag key={i} returnNewData={onUpdateData} data={r} />
                                    )) :
                                    null
                            }
                        </div>
                    </div>
                </div>
                <div>
                    <button onClick={() => {
                        const path = '/mission_tag_setting/' + NIL + `?vehicle=helicopter&count=${setting.filter(r => r.is_helicopter === true).length}`
                        console.log(path);
                        window.location.href = path
                    }} className=' bg-gray-300 text-black hover:bg-gray-700 hover:text-white p-3 rounded-t-lg'>
                        <p className='text-start font-bold'>สร้าง</p>
                        <p className='mt-0 text-xl font-bold'>Setting Tag Helicopter</p>
                    </button>
                    <div className='pt-3 pl-8 pr-8 pb-8  border border-gray-300 rounded-b-lg rounded-e-lg min-w-[300px] mix-w-[400px] h-[400px] max-w-full hover:shadow-shadow '>
                        <p>แท็ก ฮ.</p>
                        <div className='mt-6 w-[250px] h-[300px] overflow-y-scroll'>
                            {
                                setting.length > 0 ?
                                    setting.filter(r => r.is_helicopter === true).sort((a, b) => a.seq - b.seq).map((r, i) => (
                                        <CardSettingTag returnNewData={onUpdateData} key={i} data={r} />
                                    )) :
                                    null
                            }
                        </div>
                    </div>
                </div>
                <div>
                    <button onClick={() => {
                        const path = '/mission_tag_setting/' + NIL + `?vehicle=ship&count=${setting.filter(r => r.is_ship === true).length}`
                        console.log(path);
                        window.location.href = path
                    }} className=' bg-gray-300 text-black hover:bg-gray-700 hover:text-white p-3 rounded-t-lg'>
                        <p className='text-start font-bold'>สร้าง</p>
                        <p className='mt-0 text-xl font-bold'>Setting Tag Ship</p>
                    </button>
                    <div className='pt-3 pl-8 pr-8 pb-8  border border-gray-300 rounded-b-lg rounded-e-lg min-w-[300px] mix-w-[400px] h-[400px] max-w-full hover:shadow-shadow '>
                        <p>แท็กเรือ</p>
                        <div className='mt-6 w-[250px] h-[300px] overflow-y-scroll'>
                            {
                                setting.length > 0 ?
                                    setting.filter(r => r.is_ship === true).sort((a, b) => a.seq - b.seq).map((r, i) => (
                                        <CardSettingTag returnNewData={onUpdateData} key={i} data={r} />
                                    )) :
                                    null
                            }
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
