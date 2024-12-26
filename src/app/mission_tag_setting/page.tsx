'use client'

import React, { useState } from 'react'
import { NIL } from 'uuid'

export default function page() {
    const [setting, setSetting] = useState<any>({} as any)
    return (
        <div className='container p-2 flex 2xl:flex-row xl:flex-row lg:flex-col sm:flex-col items-start justify-center mt-8 gap-6 max-w-full'>

            <div className='p-8 border border-gray-300 rounded-lg min-w-[320px] max-w-full hover:shadow-shadow cursor-pointer'>
                <button onClick={() => {
                    const path = '/mission_tag_setting/' + NIL + `?vehicle=car&count=0`
                    console.log(path);
                    window.location.href = path
                }} className='absolute top-28 ml-3 bg-gray-300 text-black hover:bg-gray-700 hover:text-white p-4 rounded-lg'>
                    <p className='text-xl font-bold'>Setting Tag Car</p>
                </button>
                <div className='mt-6'>
                    test
                </div>
            </div>
            <div className='p-8 border border-gray-300 rounded-lg min-w-[320px] max-w-full hover:shadow-shadow cursor-pointer'>
                <button onClick={() => {
                    const path = '/mission_tag_setting/' + NIL + `?vehicle=helicopter&count=0`
                    console.log(path);

                    window.location.href = path
                }} className='absolute top-28 ml-3 bg-gray-300 text-black hover:bg-gray-700 hover:text-white p-4 rounded-lg'>
                    <p className='text-xl font-bold'>Setting Tag Helicopter</p>
                </button>
                <div className='mt-6'>
                    test
                </div>
            </div>
            <div className='p-8 border border-gray-300 rounded-lg min-w-[320px] max-w-full hover:shadow-shadow cursor-pointer'>
                <button className='absolute top-28 ml-3 bg-gray-300 text-black hover:bg-gray-700 hover:text-white p-4 rounded-lg'>
                    <p className='text-xl font-bold'>Setting Tag Ship</p>
                </button>
                <div className='mt-6'>
                    test
                </div>
            </div>
        </div>
    )
}
