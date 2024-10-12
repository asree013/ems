'use client'
import { Input } from '@mui/joy'
import React, { ChangeEvent, useContext, useState } from 'react'
import { TraigeLevelContext, TTriageLvelContext } from '../StepContext';
import { tranformStringToNumber } from '@/services/sum_lat_long.service';

export default function Vs() {
    const [load, setLoad] = useState<boolean>(false)
    
    const { setTriageLevel, triageLevel } = useContext<TTriageLvelContext>(TraigeLevelContext)

    return (
        <div style={{width: 280}}>
            <div>
                <label htmlFor="T">Temp(T)</label>
                <Input value={triageLevel.v_s ? triageLevel.v_s.t ?? '' : ''} onChange={(e) => {
                    setTriageLevel({
                        ...triageLevel, v_s: {
                            ...triageLevel.v_s, t: tranformStringToNumber(e)
                        }
                    })
                }} id='T' placeholder='T' endDecorator={'C'} />
            </div>
            <div className='mt-2'>
                <label htmlFor="PR">Pulse Rate(PR)</label>
                <Input value={triageLevel.v_s ? triageLevel.v_s.pr ?? '' : ''} onChange={(e) => {
                    setTriageLevel({
                        ...triageLevel, v_s: {
                            ...triageLevel.v_s, pr: e.target.value
                        }
                    })
                }} id='PR' placeholder='PR' endDecorator={'min'} />
            </div>
            <div className='mt-2'>
                <label htmlFor="RR">Respiratory Rate(RR)</label>
                <Input value={triageLevel.v_s ? triageLevel.v_s.rr ?? '' : ''} onChange={(e) => {
                    setTriageLevel({
                        ...triageLevel, v_s: {
                            ...triageLevel.v_s, rr: e.target.value
                        }
                    })
                }} id='RR' placeholder='RR' endDecorator={'min'} />
            </div>
            <div className='mt-2'>
                <label htmlFor="BP">Blood Pressure(BP)</label>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Input value={triageLevel.v_s ? triageLevel.v_s.bp ? triageLevel.v_s.bp.front ? triageLevel.v_s.bp.front : '' : '' : ''}
                        onChange={(e) => {
                            setTriageLevel({
                                ...triageLevel, v_s: {
                                    ...triageLevel.v_s, bp: {
                                        ...triageLevel.v_s.bp, front: tranformStringToNumber(e)
                                    }
                                }
                            })
                        }}
                        id='BP-font' placeholder='BP' />
                    <p style={{ margin: '0 8px' }}>/</p>
                    <Input value={triageLevel.v_s ? triageLevel.v_s.bp ? triageLevel.v_s.bp.back ? triageLevel.v_s.bp.back : '' : '' : ''}
                        onChange={(e) => {
                            setTriageLevel({
                                ...triageLevel, v_s: {
                                    ...triageLevel.v_s, bp: {
                                        ...triageLevel.v_s.bp, back: tranformStringToNumber(e)
                                    }
                                }
                            })
                        }}
                        id='BP-bacg' endDecorator={'mmHg'} />
                </div>
            </div>
            <div className='mt-2'>
                <label htmlFor="spo2">O2 Sat(spo2)</label>
                <Input value={triageLevel.v_s ? triageLevel.v_s.o2_sat ?? '' : ''} onChange={(e) => {
                    setTriageLevel({
                        ...triageLevel, v_s: {
                            ...triageLevel.v_s, o2_sat: tranformStringToNumber(e)
                        }
                    })
                }} id='spo2' placeholder='spo2' endDecorator={'%'} />
            </div>
            <div className='mt-2'>
                <label htmlFor="pain_score">Pain Score</label>
                <Input value={triageLevel.pain_score ?? ''} onChange={(e) => {
                    setTriageLevel({
                        ...triageLevel, pain_score: parseInt(tranformStringToNumber(e))
                    })
                }} id='pain_score' placeholder='Pain Score' />
            </div>
        </div>
    )
}
