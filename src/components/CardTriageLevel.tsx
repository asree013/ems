'use client'
import { TriageLevels } from '@/models/historyDetail.model'
import React from 'react'
import style from './styles/triagelevel.module.css'
type Props = {
    triage: TriageLevels
}

export default function CardTriageLevel({ triage }: Props) {
    return (
        <div>
            <p style={{ textDecoration: 'underline', fontWeight: 600 }}>Triage level</p>
            <div className={style.flexItem}>
                <div className='ml-2'>
                    <input type="radio" value={'resuscitation'} checked={triage.triage_level_value.includes('resuscitation') ? true : false} />
                    <label htmlFor="" className='ml-2'>Resuscitation</label>
                </div>
                <div className='ml-2'>
                    <input type="radio" value={'emergency'} checked={triage.triage_level_value.includes('emergency') ? true : false} />
                    <label htmlFor="" className='ml-2'>Emergency</label>
                </div>
                <div className='ml-2'>
                    <input type="radio" value={'urgent'} checked={triage.triage_level_value.includes('urgent') ? true : false} />
                    <label htmlFor="" className='ml-2'>Urgent</label>
                </div>
                <div className='ml-2'>
                    <input type="radio" value={'non-urgent'} checked={triage.triage_level_value.includes('non-urgent') ? true : false} />
                    <label htmlFor="" className='ml-2'>Non-urgent</label>
                </div>
            </div>
            <p className='mt-3' style={{ textDecoration: 'underline', fontWeight: 600 }}>V/S</p>
            <div className={style.flexItem}>
                <div className='ml-3' style={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
                    <p>T</p>
                    <p style={{ textDecoration: 'underline', textDecorationStyle: 'dotted' }}>..{triage.v_s.t ?? '...'}..</p>
                    <p>C</p>
                </div>
                <div className='ml-3' style={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
                    <p>PR</p>
                    <p style={{ textDecoration: 'underline', textDecorationStyle: 'dotted' }}>..{triage.v_s.pr ?? '...'}..</p>
                    <p>/min</p>
                </div>
                <div className='ml-3' style={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
                    <p>RR</p>
                    <p style={{ textDecoration: 'underline', textDecorationStyle: 'dotted' }}>..{triage.v_s.rr ?? '...'}..</p>
                    <p>/min</p>
                </div>
                <div className='ml-3' style={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
                    <p>BP</p>
                    <p style={{ textDecoration: 'underline', textDecorationStyle: 'dotted' }}>..{triage.v_s.bp.front ?? '...'}..</p>
                    <p>/</p>
                    <p style={{ textDecoration: 'underline', textDecorationStyle: 'dotted' }}>..{triage.v_s.bp.back ?? '...'}..</p>
                    <p>/min</p>
                </div>
                <div className='ml-3' style={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
                    <p>O2 sat</p>
                    <p style={{ textDecoration: 'underline', textDecorationStyle: 'dotted' }}>..{triage.v_s.o2_sat ?? '...'}..</p>
                    <p>%</p>
                </div>
                <div className='ml-3' style={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
                    <p>Pain score</p>
                    <p style={{ textDecoration: 'underline', textDecorationStyle: 'dotted' }}>..{triage.pain_score ?? '...'}..</p>
                </div>
            </div>
        </div>
    )
}
