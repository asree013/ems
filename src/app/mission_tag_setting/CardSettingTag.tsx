import { MissionTagSetting } from '@/models/missionTagSetting.model'
import { Divider } from '@mui/material'
import React, { useState } from 'react'
import { FileCog, Trash2 } from 'lucide-react'
import CardUpdateSetting from './CardUpdateSetting'
import Swal from 'sweetalert2'
import { updateMissionTagSetting } from '@/services/mission_tag_setting.service'
import { toast } from '@/services/alert.service'

type Props = {
    data: MissionTagSetting,
    returnNewData: (newData: MissionTagSetting) => void
}

export default function CardSettingTag({ data, returnNewData }: Props) {
    const [open, setOpen] = useState<boolean>(false)

    function onEditData(newValue: MissionTagSetting) {
        console.log(newValue);
        Swal.fire({
            title: "คุณต้องบันทึกการแก้ไขข้อมูลใช่ไหม",
            showCancelButton: true,
            confirmButtonText: "บันทึก",
            cancelButtonText: 'ยกเลิก',
            confirmButtonColor: '#2189b2',
            customClass: {
                popup: 'z-40'
            },
        }).then(async (result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                try {
                    const result = await updateMissionTagSetting(newValue.id, newValue)
                    returnNewData(result.data)
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "แก้ไขข้อมูลสำเร็จ",
                        showConfirmButton: false,
                        timer: 1000
                    });
                    setOpen(false)
                } catch (error: any) {
                    toast(JSON.stringify(error.message), 'error')
                }
            }
        });
    }
    return (
        <>
            <div className='shadow-shadow rounded-md mt-2'>
                <div className='flex flex-row items-start justify-between mt-2'>
                    <p className='text-lg font-bold w-[60px]'>ขั้นที่ {data.seq}</p>
                    <p className=''>{data.label}</p>
                </div>
                <div className='flex flex-row items-center justify-between'>
                    <FileCog onClick={() => setOpen(true)} className='mr-2 cursor-pointer' color="#103489" />
                    {
                        data.is_default ?
                            <p className='text-red-700 text-[12px]'>(บังคับ)</p> :
                            <p className='text-yellow-600 text-[12px]'>(ไม่บังคับ)</p>


                    }
                </div>
                <Divider className='mt-2' />
            </div>

            <CardUpdateSetting open={open} returnUpdateTagSetting={onEditData} setOpen={setOpen} tagSetting={data} />
        </>
    )
}
