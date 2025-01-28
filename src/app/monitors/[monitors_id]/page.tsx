import NavBarLayout from '@/components/layouts/NavBarLayout'
import React from 'react'
import ChartDetail from './ChartDetail'
import BreadCrumb, { TBreadCrumd } from '@/components/BreadCrumb'

type Props = {
    params: {
        monitors_id: string
    }
}

export default function page({ params }: Props) {
    const items: TBreadCrumd[] = [
        {
            labe: 'หน้าหลัก',
            path: '/home'
        },
        {
            labe: 'จอแสดงเครื่องวัดสัญญาชีพทั้งหมด',
            path: '/monitors'
        },
        {
            labe: 'จอแสดงเครื่องวัดสัญญาชีพ ของ',
            path: '/monitors/' + params.monitors_id
        },
    ]
    return (
        <NavBarLayout>
            <div className='mt-[50px] mb-3'>
                <BreadCrumb item={items} />
            </div>

            <div className='flex flex-col items-center justify-start'>
                <ChartDetail device={{ device_id: params.monitors_id } as Device} />
            </div>
        </NavBarLayout>
    )
}
