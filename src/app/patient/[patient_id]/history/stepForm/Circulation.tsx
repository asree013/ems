import { Plus, Trash2 } from 'lucide-react'
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { boolean } from 'zod'

type Circulations = {
    iv_fluid: boolean,
    nss: boolean,
    rls: boolean,
    half_d_n_two: boolean,
    ten_d_n_two: boolean,
    acetar: boolean,
    on_heparin_lock: boolean,
    other: {
        bool: boolean,
        txt: string
    },
    stop_bleed: boolean,
    direct_pressure: boolean,
    pressure_dressing: boolean,
    tourniquet: boolean,
    immobilization: boolean,
    sprint: boolean,
    pressure: boolean,
    ked: boolean,
    cpr: boolean,
    aed: boolean

}

export default function Circulation() {
    const [circulation, setCirculation] = useState<Circulations>({
        acetar: false,
        half_d_n_two: false,
        iv_fluid: false,
        nss: false,
        on_heparin_lock: false,
        rls: false,
        ten_d_n_two: false,
        other: {
            bool: false,
            txt: ''
        },
        direct_pressure: false,
        pressure_dressing: false,
        stop_bleed: false,
        tourniquet: false,
        immobilization: false,
        ked: false,
        pressure: false,
        sprint: false,
        cpr: false,
        aed: false
    })

    const [cartMedicine, setCartMedicine] = useState<{ id: number, txt: string }[]>([])

    const onChangeCirculationIvFluid = () => {
        setCirculation({
            ...circulation,
            acetar: false,
            half_d_n_two: false,
            iv_fluid: false,
            nss: false,
            on_heparin_lock: false,
            rls: false,
            ten_d_n_two: false,
            other: {
                bool: false,
                txt: ""
            }
        })

    }

    const onChangeStopBleeding = () => {
        setCirculation({
            ...circulation,
            direct_pressure: false,
            pressure_dressing: false,
            stop_bleed: false,
            tourniquet: false,
        })
    }

    const onChangeImmobilization = () => {
        setCirculation({
            ...circulation,
            immobilization: false,
            ked: false,
            pressure: false,
            sprint: false
        })
    }

    const onChangeCPR = () => {
        setCirculation({
            ...circulation,
            cpr: false,
            aed: false
        })
    }

    function onChangeUpdateCartMedicine(e: ChangeEvent<HTMLInputElement>) {
        const findCartMedicine = cartMedicine.find((r) => r.id === Number(e.target.id))
        console.log(findCartMedicine);
        
        if (findCartMedicine) {
            setCartMedicine([...cartMedicine, findCartMedicine])
        }
    }


    return (
        <div className='w-full p-1 h-[350px] min-h-[200px] flex flex-col items-center justify-between overflow-y-scroll border border-gray-400 rounded-md'>
            <div className='flex flex-row items-center justify-start border-b border-gray-400 mb-3'>
                <p className='mr-2 text-lg font-bold'>IV Fluid</p>
                <div className={`mr-2 border-r border-gray-400 h-full ${circulation?.other?.bool ? "min-h-[350px]" : "min-h-[280px]"}`}></div>
                <div className=''>
                    <div className='flex-row items-center justify-between border-b border-gray-400 py-3'>
                        <ul className="grid w-full gap-6 md:grid-cols-2">
                            <li>
                                <input checked={circulation?.iv_fluid ? false : true} onChange={onChangeCirculationIvFluid} type="radio" id="hosting-big" className="hidden peer" />
                                <label htmlFor="hosting-big" className=" text-gray-500 bg-white border border-gray-200  peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 inline-flex items-center justify-center w-full p-1 hover:bg-gray-1 rounded-lg cursor-pointer ">
                                    <div className="block">
                                        <div className="w-full text-lg font-semibold">No</div>
                                    </div>

                                </label>
                            </li>
                            <li>
                                <input checked={circulation?.iv_fluid ? true : false} onChange={(e) => setCirculation({ ...circulation, iv_fluid: true })} type="radio" id="hosting-small" className="hidden peer" required />
                                <label htmlFor="hosting-small" className="inline-flex items-center  justify-center w-full p-1 text-gray-500 bg-white border border-gray-200  peer-checked:border-red-600 peer-checked:text-red-600 hover:text-gray-600 hover:bg-gray-100 rounded-lg cursor-pointer ">
                                    <div className="block">
                                        <div className="w-full text-lg font-semibold">Yes</div>
                                    </div>
                                </label>
                            </li>

                        </ul>
                    </div>

                    <div className='flex-row items-center justify-between border-b border-gray-400 py-3'>
                        <ul className="grid w-full gap-6 md:grid-cols-2">
                            <li>
                                <input disabled={!circulation?.iv_fluid} checked={circulation?.nss ? true : false} onChange={(e) => setCirculation({ ...circulation, nss: e.target.checked })} type="checkbox" id="NSS" className="hidden peer" />
                                <label htmlFor="NSS" className={`
                                    ${circulation?.iv_fluid ?
                                        circulation?.nss ?
                                            "text-gray-500 bg-white border border-gray-200  peer-checked:border-red-600 peer-checked:text-red-600" :
                                            'text-gray-500 bg-white border border-gray-200  peer-checked:border-blue-600 peer-checked:text-blue-600'
                                        : 'bg-gray-300 text-gray-400'
                                    }
                                        inline-flex items-center justify-center w-full p-1 hover:bg-gray-1 rounded-lg cursor-pointer 
                                    `}>
                                    <div className="block">
                                        <div className="w-full text-lg font-semibold">NSS</div>
                                    </div>

                                </label>
                            </li>
                            <li>
                                <input checked={circulation?.rls ? true : false} onChange={(e) => setCirculation({ ...circulation, rls: e.target.checked })} type="checkbox" id="RLS" className="hidden peer" required />
                                <label htmlFor="RLS" className={`
                                    ${circulation?.iv_fluid ?
                                        circulation?.rls ?
                                            "text-gray-500 bg-white border border-gray-200  peer-checked:border-red-600 peer-checked:text-red-600" :
                                            'text-gray-500 bg-white border border-gray-200  peer-checked:border-blue-600 peer-checked:text-blue-600'
                                        : 'bg-gray-300 text-gray-400'
                                    }
                                        inline-flex items-center justify-center w-full p-1 hover:bg-gray-1 rounded-lg cursor-pointer 
                                    `}>
                                    <div className="block">
                                        <div className="w-full text-lg font-semibold">RLS</div>
                                    </div>
                                </label>
                            </li>

                        </ul>

                        <ul className="grid w-full gap-6 md:grid-cols-2">
                            <li className='mt-3'>
                                <input checked={circulation?.half_d_n_two ? true : false} onChange={(e) => setCirculation({ ...circulation, half_d_n_two: e.target.checked })} type="checkbox" id="half_d_n_two" className="hidden peer" />
                                <label htmlFor="half_d_n_two" className={`
                                    ${circulation?.iv_fluid ?
                                        circulation?.half_d_n_two ?
                                            "text-gray-500 bg-white border border-gray-200  peer-checked:border-red-600 peer-checked:text-red-600" :
                                            'text-gray-500 bg-white border border-gray-200  peer-checked:border-blue-600 peer-checked:text-blue-600'
                                        : 'bg-gray-300 text-gray-400'
                                    }
                                        inline-flex items-center justify-center w-full p-1 hover:bg-gray-1 rounded-lg cursor-pointer 
                                    `}>
                                    <div className="block">
                                        <div className="w-full text-lg font-semibold">5% D/N/2</div>
                                    </div>

                                </label>
                            </li>
                            <li className='mt-3'>
                                <input checked={circulation?.ten_d_n_two ? true : false} onChange={(e) => setCirculation({ ...circulation, ten_d_n_two: e.target.checked })} type="checkbox" id="ten_d_n_two" className="hidden peer" required />
                                <label htmlFor="ten_d_n_two" className={`
                                    ${circulation?.iv_fluid ?
                                        circulation?.ten_d_n_two ?
                                            "text-gray-500 bg-white border border-gray-200  peer-checked:border-red-600 peer-checked:text-red-600" :
                                            'text-gray-500 bg-white border border-gray-200  peer-checked:border-blue-600 peer-checked:text-blue-600'
                                        : 'bg-gray-300 text-gray-400'
                                    }
                                        inline-flex items-center justify-center w-full p-1 hover:bg-gray-1 rounded-lg cursor-pointer 
                                    `}>
                                    <div className="block">
                                        <div className="w-full text-lg font-semibold">10% D/N/2</div>
                                    </div>
                                </label>
                            </li>

                        </ul>

                        <ul className="grid w-full gap-6 md:grid-cols-2">
                            <li className='mt-3'>
                                <input checked={circulation?.acetar ? true : false} onChange={(e) => setCirculation({ ...circulation, acetar: e.target.checked })} type="checkbox" id="acetar" className="hidden peer" />
                                <label htmlFor="acetar" className={`
                                    ${circulation?.iv_fluid ?
                                        circulation?.acetar ?
                                            "text-gray-500 bg-white border border-gray-200  peer-checked:border-red-600 peer-checked:text-red-600" :
                                            'text-gray-500 bg-white border border-gray-200  peer-checked:border-blue-600 peer-checked:text-blue-600'
                                        : 'bg-gray-300 text-gray-400'
                                    }
                                        inline-flex items-center justify-center w-full p-1 hover:bg-gray-1 rounded-lg cursor-pointer 
                                    `}>
                                    <div className="block">
                                        <div className="w-full text-lg font-semibold">Acetar</div>
                                    </div>

                                </label>
                            </li>
                            <li className='mt-3'>
                                <input checked={circulation?.on_heparin_lock ? true : false} onChange={(e) => setCirculation({ ...circulation, on_heparin_lock: e.target.checked })} type="checkbox" id="on_heparin_lock" className="hidden peer" required />
                                <label htmlFor="on_heparin_lock" className={`
                                    ${circulation?.iv_fluid ?
                                        circulation?.on_heparin_lock ?
                                            "text-gray-500 bg-white border border-gray-200  peer-checked:border-red-600 peer-checked:text-red-600" :
                                            'text-gray-500 bg-white border border-gray-200  peer-checked:border-blue-600 peer-checked:text-blue-600'
                                        : 'bg-gray-300 text-gray-400'
                                    }
                                        inline-flex items-center justify-center w-full p-2 hover:bg-gray-1 rounded-lg cursor-pointer00 
                                    `}>
                                    <div className="block">
                                        <div className="w-full text-sm font-semibold">On heparin lock</div>
                                    </div>
                                </label>
                            </li>

                        </ul>
                    </div>

                    <div className='mt-2 p-2'>
                        <ul>
                            <li>
                                <input checked={circulation?.other?.bool ? true : false} onChange={(e) => setCirculation({
                                    ...circulation, other: {
                                        ...circulation.other, bool: e.target.checked
                                    }
                                })} type="checkbox" id="other" className="hidden peer" required />
                                <label htmlFor="other" className={`
                                    ${circulation?.iv_fluid ?
                                        circulation?.other?.bool ?
                                            "text-gray-500 bg-white border border-gray-200  peer-checked:border-red-600 peer-checked:text-red-600" :
                                            'text-gray-500 bg-white border border-gray-200  peer-checked:border-blue-600 peer-checked:text-blue-600'
                                        : 'bg-gray-300 text-gray-400'
                                    }
                                        inline-flex items-center justify-center w-full p-1 hover:bg-gray-1 rounded-lg cursor-pointer 
                                    `}>
                                    <div className="block">
                                        <div className="w-full text-sm font-semibold">Other</div>
                                    </div>
                                </label>
                            </li>
                        </ul>
                        {
                            circulation?.other?.bool ?
                                <div className='mt-2 p-1 flex flex-row items-center justify-center'>
                                    <label htmlFor="">ระบุ :</label>
                                    <textarea onChange={(e) => setCirculation({
                                        ...circulation, other: {
                                            ...circulation.other, txt: e.target.value
                                        }
                                    })} className='ml-2 border border-gray-400 rounded-lg p-2' rows={2} placeholder='ระบุรายละเอียด' id=""></textarea>
                                </div> : null
                        }
                    </div>
                </div>
            </div>

            <div className='flex flex-row items-center justify-start w-full border-b border-gray-400 mb-3'>
                <p className='mr-2 text-lg font-bold'>Stop Bleed</p>
                <div className={`mr-4 border-r border-gray-400 h-full min-h-[180px]`}></div>
                <div className=''>
                    <div className='flex-row items-center justify-between border-b border-gray-400 py-3'>
                        <ul className="grid w-full gap-6 md:grid-cols-2">
                            <li>
                                <input checked={circulation?.stop_bleed ? false : true} onChange={onChangeStopBleeding} type="radio" id="stop_bleed_no" className="hidden peer" />
                                <label htmlFor="stop_bleed_no" className=" text-gray-500 bg-white border border-gray-200  peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 inline-flex items-center justify-center w-full p-1 hover:bg-gray-1 rounded-lg cursor-pointer ">
                                    <div className="block">
                                        <div className="w-full text-lg font-semibold">No</div>
                                    </div>

                                </label>
                            </li>
                            <li>
                                <input checked={circulation?.stop_bleed ? true : false} onChange={(e) => setCirculation({ ...circulation, stop_bleed: true })} type="radio" id="stop_bleed" className="hidden peer" required />
                                <label htmlFor="stop_bleed" className="inline-flex items-center  justify-center w-full p-1 text-gray-500 bg-white border border-gray-200  peer-checked:border-red-600 peer-checked:text-red-600 hover:text-gray-600 hover:bg-gray-100 rounded-lg cursor-pointer ">
                                    <div className="block">
                                        <div className="w-full text-lg font-semibold">Yes</div>
                                    </div>
                                </label>
                            </li>

                        </ul>
                    </div>

                    <div className='flex-row items-center justify-between  py-3'>
                        <ul className="grid w-full gap-3 md:grid-cols-2">
                            <li>
                                <input disabled={!circulation?.stop_bleed} checked={circulation?.direct_pressure ? true : false} onChange={(e) => setCirculation({ ...circulation, direct_pressure: e.target.checked })} type="checkbox" id="direct_pressure" className="hidden peer" />
                                <label htmlFor="direct_pressure" className={`
                                    ${circulation?.stop_bleed ?
                                        circulation?.direct_pressure ?
                                            "text-gray-500 bg-white border border-gray-200  peer-checked:border-red-600 peer-checked:text-red-600" :
                                            'text-gray-500 bg-white border border-gray-200  peer-checked:border-blue-600 peer-checked:text-blue-600'
                                        : 'bg-gray-300 text-gray-400'
                                    }
                                        inline-flex items-center justify-center w-full p-1 hover:bg-gray-1 rounded-lg cursor-pointer 
                                    `}>
                                    <div className="block">
                                        <div className="w-full text-md font-semibold">Direct pressure</div>
                                    </div>

                                </label>
                            </li>
                            <li>
                                <input checked={circulation?.pressure_dressing ? true : false} onChange={(e) => setCirculation({ ...circulation, pressure_dressing: e.target.checked })} type="checkbox" id="pressure_dressing" className="hidden peer" required />
                                <label htmlFor="pressure_dressing" className={`
                                    ${circulation?.stop_bleed ?
                                        circulation?.pressure_dressing ?
                                            "text-gray-500 bg-white border border-gray-200  peer-checked:border-red-600 peer-checked:text-red-600" :
                                            'text-gray-500 bg-white border border-gray-200  peer-checked:border-blue-600 peer-checked:text-blue-600'
                                        : 'bg-gray-300 text-gray-400'
                                    }
                                        inline-flex items-center justify-center w-full p-1 hover:bg-gray-1 rounded-lg cursor-pointer 
                                    `}>
                                    <div className="block">
                                        <div className="w-full text-md font-semibold">Pressure dressing</div>
                                    </div>
                                </label>
                            </li>

                            <li>
                                <input checked={circulation?.tourniquet ? true : false} onChange={(e) => setCirculation({ ...circulation, tourniquet: e.target.checked })} type="checkbox" id="tourniquet" className="hidden peer" />
                                <label htmlFor="tourniquet" className={`
                                    ${circulation?.stop_bleed ?
                                        circulation?.tourniquet ?
                                            "text-gray-500 bg-white border border-gray-200  peer-checked:border-red-600 peer-checked:text-red-600" :
                                            'text-gray-500 bg-white border border-gray-200  peer-checked:border-blue-600 peer-checked:text-blue-600'
                                        : 'bg-gray-300 text-gray-400'
                                    }
                                        inline-flex items-center justify-center w-full p-1 hover:bg-gray-1 rounded-lg cursor-pointer 
                                    `}>
                                    <div className="block">
                                        <div className="w-full text-md font-semibold">Tourniquet</div>
                                    </div>

                                </label>
                            </li>

                        </ul>
                    </div>

                </div>
            </div>

            <div className='flex flex-row items-center justify-start w-full border-b border-gray-400 mb-3'>
                <p className='mr-2 text-md font-bold'>Immobilization</p>
                <div className={`mr-4 border-r border-gray-400 h-full min-h-[180px]`}></div>
                <div className=''>
                    <div className='flex-row items-center justify-between border-b border-gray-400 py-3'>
                        <ul className="grid w-full gap-6 md:grid-cols-2">
                            <li>
                                <input checked={circulation?.immobilization ? false : true} onChange={onChangeImmobilization} type="radio" id="immobilization_no" className="hidden peer" />
                                <label htmlFor="immobilization_no" className=" text-gray-500 bg-white border border-gray-200  peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 inline-flex items-center justify-center w-full p-1 hover:bg-gray-1 rounded-lg cursor-pointer ">
                                    <div className="block">
                                        <div className="w-full text-lg font-semibold">No</div>
                                    </div>

                                </label>
                            </li>
                            <li>
                                <input checked={circulation?.immobilization ? true : false} onChange={(e) => setCirculation({ ...circulation, immobilization: true })} type="radio" id="immobilization" className="hidden peer" required />
                                <label htmlFor="immobilization" className="inline-flex items-center  justify-center w-full p-1 text-gray-500 bg-white border border-gray-200  peer-checked:border-red-600 peer-checked:text-red-600 hover:text-gray-600 hover:bg-gray-100 rounded-lg cursor-pointer ">
                                    <div className="block">
                                        <div className="w-full text-lg font-semibold">Yes</div>
                                    </div>
                                </label>
                            </li>

                        </ul>
                    </div>

                    <div className='flex-row items-center justify-between  py-3'>
                        <ul className="grid w-full gap-3 md:grid-cols-2">
                            <li>
                                <input disabled={!circulation?.immobilization} checked={circulation?.pressure ? true : false} onChange={(e) => setCirculation({ ...circulation, pressure: e.target.checked })} type="checkbox" id="pressure" className="hidden peer" />
                                <label htmlFor="pressure" className={`
                                    ${circulation?.immobilization ?
                                        circulation?.pressure ?
                                            "text-gray-500 bg-white border border-gray-200  peer-checked:border-red-600 peer-checked:text-red-600" :
                                            'text-gray-500 bg-white border border-gray-200  peer-checked:border-blue-600 peer-checked:text-blue-600'
                                        : 'bg-gray-300 text-gray-400'
                                    }
                                        inline-flex items-center justify-center w-full p-1 hover:bg-gray-1 rounded-lg cursor-pointer 
                                    `}>
                                    <div className="block">
                                        <div className="w-full text-md font-semibold">Pressure</div>
                                    </div>

                                </label>
                            </li>
                            <li>
                                <input checked={circulation?.sprint ? true : false} onChange={(e) => setCirculation({ ...circulation, sprint: e.target.checked })} type="checkbox" id="sprint" className="hidden peer" required />
                                <label htmlFor="sprint" className={`
                                    ${circulation?.immobilization ?
                                        circulation?.sprint ?
                                            "text-gray-500 bg-white border border-gray-200  peer-checked:border-red-600 peer-checked:text-red-600" :
                                            'text-gray-500 bg-white border border-gray-200  peer-checked:border-blue-600 peer-checked:text-blue-600'
                                        : 'bg-gray-300 text-gray-400'
                                    }
                                        inline-flex items-center justify-center w-full p-1 hover:bg-gray-1 rounded-lg cursor-pointer 
                                    `}>
                                    <div className="block">
                                        <div className="w-full text-md font-semibold">Sprint</div>
                                    </div>
                                </label>
                            </li>

                            <li>
                                <input checked={circulation?.ked ? true : false} onChange={(e) => setCirculation({ ...circulation, ked: e.target.checked })} type="checkbox" id="ked" className="hidden peer" />
                                <label htmlFor="ked" className={`
                                    ${circulation?.immobilization ?
                                        circulation?.ked ?
                                            "text-gray-500 bg-white border border-gray-200  peer-checked:border-red-600 peer-checked:text-red-600" :
                                            'text-gray-500 bg-white border border-gray-200  peer-checked:border-blue-600 peer-checked:text-blue-600'
                                        : 'bg-gray-300 text-gray-400'
                                    }
                                        inline-flex items-center justify-center w-full p-1 hover:bg-gray-1 rounded-lg cursor-pointer 
                                    `}>
                                    <div className="block">
                                        <div className="w-full text-md font-semibold">KED</div>
                                    </div>

                                </label>
                            </li>

                        </ul>
                    </div>

                </div>
            </div>

            <div className='flex flex-row items-center justify-start w-full border-b border-gray-400 mb-3'>
                <p className='mr-2 text-md font-bold'>CPR</p>
                <div className={`mr-4 border-r border-gray-400 h-full min-h-[60px]`}></div>
                <div className='w-full'>
                    <div className='flex-row items-center justify-between border-b border-gray-400 py-3 w-full'>
                        <ul className="grid w-full gap-2 p-1 grid-cols-3">
                            <li>
                                <input checked={circulation?.cpr ? false : true} onChange={onChangeCPR} type="radio" id="cpr_no" className="hidden peer" />
                                <label htmlFor="cpr_no" className=" text-gray-500 bg-white border border-gray-200  peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 inline-flex items-center justify-center w-full p-1 hover:bg-gray-1 rounded-lg cursor-pointer ">
                                    <div className="block">
                                        <div className="w-full text-lg font-semibold">No</div>
                                    </div>

                                </label>
                            </li>

                            <li>
                                <input checked={circulation?.cpr ? true : false} onChange={(e) => setCirculation({ ...circulation, cpr: true })} type="radio" id="cpr" className="hidden peer" required />
                                <label htmlFor="cpr" className="inline-flex items-center  justify-center w-full p-1 text-gray-500 bg-white border border-gray-200  peer-checked:border-red-600 peer-checked:text-red-600 hover:text-gray-600 hover:bg-gray-100 rounded-lg cursor-pointer ">
                                    <div className="block">
                                        <div className="w-full text-lg font-semibold">Yes</div>
                                    </div>
                                </label>
                            </li>

                            <li>
                                <input disabled={!circulation?.cpr} checked={circulation?.aed ? true : false} onChange={(e) => setCirculation({ ...circulation, aed: e.target.checked })} type="checkbox" id="aed" className="hidden peer" />
                                <label htmlFor="aed" className={`
                                    ${circulation?.cpr ?
                                        circulation?.aed ?
                                            "text-gray-500 bg-white border border-gray-200  peer-checked:border-red-600 peer-checked:text-red-600" :
                                            'text-gray-500 bg-white border border-gray-200  peer-checked:border-blue-600 peer-checked:text-blue-600'
                                        : 'bg-gray-300 text-gray-400'
                                    }
                                        inline-flex items-center justify-center w-full p-2 hover:bg-gray-1 rounded-lg cursor-pointer 
                                    `}>
                                    <div className="block">
                                        <div className="w-full text-md font-semibold">AED</div>
                                    </div>

                                </label>
                            </li>

                        </ul>
                    </div>

                </div>
            </div>

            <div className='flex flex-col items-center justify-start w-full mb-3'>
                <p className='mr-2 text-md font-bold border-b border-gray-400 mb-2 w-full text-center'>Medicine</p>

                {
                    Array.isArray(cartMedicine) ?
                        cartMedicine.map((r, i) =>
                            <div id={String(i)} className='w-full mt-2 flex flex-row items-center justify-start shadow-lg border border-gray-400 rounded-lg p-2' key={i}>
                                <p>{i + 1}: </p>
                                <input onChange={onChangeUpdateCartMedicine} className='ml-1 w-full p-2 border border-gray-400 rounded-md' value={r.txt ?? ''} type="text" placeholder='พิมพ์รายละเอียด' />
                                <button className='bg-red-600 p-1 ml-1 rounded-md'><Trash2 className='text-white' /></button>
                            </div>
                        ) : null
                }
                <div className='mt-2'>
                    <button onClick={() => setCartMedicine([...cartMedicine, { id: cartMedicine.length + 1, txt: "" }])} className='bg-blue-900 rounded-2xl p-1 text-white '><Plus /></button>
                </div>
            </div>
        </div>
    )
}
