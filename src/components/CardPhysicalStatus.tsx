'use client'
import { PhysicalStatus } from '@/models/historyDetail.model'
import React from 'react'
import styles from './styles/triagelevel.module.css'

type Props = {
    physical: PhysicalStatus
}
export default function CardPhysicalStatus({ physical }: Props) {
    return (
        <div className={styles.borders}>
            <div className='m-3' style={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
                <p style={{ fontWeight: 600, fontSize: '18px' }}>Physical status</p>
                <p className='ml-2'>({physical.ga.toUpperCase()}) {physical.ga.toLocaleLowerCase().includes('nsf') ? 'No Singnigicant Finding' : ''}</p>
            </div>
            <div className={styles.broderLine}></div>

            <div className={`${styles.flexItem} m-2`}>
                <p style={{ fontWeight: 600 }}>GA</p>
                <div className='ml-2'>
                    <input type="radio" value={'nsf'} checked={physical.ga.includes('nsf')} />
                    <label className='ml-2' htmlFor="">NSF</label>
                </div>
                <div className='ml-2'>
                    <input type="radio" value={'confuse'} checked={physical.ga.includes('confuse')} />
                    <label className='ml-2' htmlFor="">Confuse</label>
                </div>
                <div className='ml-2'>
                    <input type="radio" value={'depress'} checked={physical.ga.includes('depress')} />
                    <label className='ml-2' htmlFor="">Depress</label>
                </div>
                <div className='ml-2'>
                    <input type="radio" value={'anxious'} checked={physical.ga.includes('anxious')} />
                    <label className='ml-2' htmlFor="">Anxious</label>
                </div>
                <div className='ml-2'>
                    <input type="radio" value={'disorient'} checked={physical.ga.includes('disorient')} />
                    <label className='ml-2' htmlFor="">Disorient</label>
                </div>
            </div>
            <div className={styles.broderLine}></div>

            <div className='m-2' style={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
                <p style={{ fontWeight: 600 }}>Sedated : </p>
                <p> Drug</p>
                <p style={{ textDecoration: 'underline', textDecorationStyle: 'dotted' }}>....{physical.sedated.drug ?? '...'}....</p>
                <p>time</p>
                <p style={{ textDecoration: 'underline', textDecorationStyle: 'dotted' }}>....{physical.sedated.time ?? '...'}....</p>
            </div>
            <div className={styles.broderLine}></div>

            <div className={`m-2 ${styles.flexItem}`}>
                <p style={{ fontWeight: 600 }}>Airway : </p>
                <div className='ml-2'>
                    <input type="checkbox" value={'nsf'} checked={physical.airway.nsf} />
                    <label className='ml-2' htmlFor="">NSF</label>
                </div>
                <div className='ml-2'>
                    <input type="checkbox" value={'stridor'} checked={physical.airway.stridor} />
                    <label className='ml-2' htmlFor="">Stridor</label>
                </div>
                <div className='ml-2'>
                    <input type="checkbox" value={'stridor'} checked={physical.airway.secretion} />
                    <label className='ml-2' htmlFor="">Secretion</label>
                </div>
                <div className='ml-2'>
                    <input type="checkbox" value={'injury'} checked={physical.airway.injury} />
                    <label className='ml-2' htmlFor="">Injury</label>
                </div>
                <div className='ml-2'>
                    <input type="checkbox" value={'bleeding'} checked={physical.airway.bleeding} />
                    <label className='ml-2' htmlFor="">Bleeding</label>
                </div>
            </div>
            <div className={`m-2 ${styles.flexItem}`}>
                <div className='ml-2'>
                    <input type="radio" value={'orai_airway'} checked={physical.airway.checked.includes('orai_airway')} />
                    <label className='ml-2' htmlFor="">Orai Airway</label>
                </div>
                <div className='ml-2'>
                    <input type="radio" value={'nasal_airway'} checked={physical.airway.checked.includes('nasal_airway')} />
                    <label className='ml-2' htmlFor="">Nasal airway</label>
                </div>
                <div className='ml-2'>
                    <input type="radio" value={'nasotracheal_tube'} checked={physical.airway.checked.includes('nasotracheal_tube')} />
                    <label className='ml-2' htmlFor="">Nasotracheal tube</label>
                </div>
                <div className='ml-2'>
                    <input type="radio" value={'orotracheal_tube'} checked={physical.airway.checked.includes('orotracheal_tube')} />
                    <label className='ml-2' htmlFor="">Orotracheal tube</label>
                </div>
                <div className='ml-2'>
                    <input type="radio" value={'tracheostomy_tube'} checked={physical.airway.checked.includes('tracheostomy_tube')} />
                    <label className='ml-2' htmlFor="">Tracheostomy tube</label>
                </div>
            </div>
            {
                physical.airway.checked.includes('tracheostomy_tube' || 'orotracheal_tube' || 'nasotracheal_tube') ?
                    <div className='m-2' style={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
                        <div className='ml-3' style={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
                            <p>tube: </p>
                            <p>{physical.airway.tube.trachostomy_tobe}</p>
                        </div>
                        <div className='ml-3' style={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
                            <p>NO</p>
                            <p style={{ textDecoration: 'underline', textDecorationStyle: 'dotted' }}>....{physical.airway.tube.no ?? '...'}....</p>
                            <p>Fix</p>
                            <p style={{ textDecoration: 'underline', textDecorationStyle: 'dotted' }}>....{physical.airway.tube.fix ?? '...'}....</p>

                        </div>
                    </div> :
                    null
            }
            <div className={styles.broderLine}></div>

            <div className={`m-2 ${styles.flexItem}`}>
                <p style={{ fontWeight: 600 }}>Respi : </p>
                <div className='ml-2'>
                    <input type="checkbox" value={'nsf'} checked={physical.respi.nsf} />
                    <label className='ml-2' htmlFor="">NSF</label>
                </div>
                <div className='ml-2'>
                    <input type="checkbox" value={'tachyypnea'} checked={physical.respi.tachyypnea} />
                    <label className='ml-2' htmlFor="">Tachyypnea</label>
                </div>
                <div className='ml-2'>
                    <input type="checkbox" value={'dyspnea'} checked={physical.respi.dyspnea} />
                    <label className='ml-2' htmlFor="">Dyspnea</label>
                </div>
                <div className='ml-2'>
                    <input type="checkbox" value={'wheezing'} checked={physical.respi.wheezing} />
                    <label className='ml-2' htmlFor="">Wheezing</label>
                </div>
            </div>
            <div className={`m-2 ${styles.flexItem}`}>
                <div className='ml-2'>
                    <input type="radio" value={'o2_cannula'} checked={physical.respi.respi_checked.includes('o2_cannula')} />
                    <label className='ml-2' htmlFor="">O2 Cannula</label>
                </div>
                <div className='ml-2'>
                    <input type="radio" value={'o2_mask'} checked={physical.respi.respi_checked.includes('o2_mask')} />
                    <label className='ml-2' htmlFor="">O2 Mask</label>
                </div>
                <div className='ml-2'>
                    <input type="radio" value={'collar_mask'} checked={physical.respi.respi_checked.includes('collar_mask')} />
                    <label className='ml-2' htmlFor="">Collar Mask</label>
                </div>
                <div className='ml-2'>
                    <input type="radio" value={'t_piece'} checked={physical.respi.respi_checked.includes('t_piece')} />
                    <label className='ml-2' htmlFor="">T-piece</label>
                </div>
            </div>
            <div className={styles.broderLine}></div>

            <div className={`m-2 ${styles.flexItem}`}>
                <p style={{ fontWeight: 600 }}>CVS : </p>
                <div className='ml-2'>
                    <input type="checkbox" value={'nsf'} checked={physical.cvs.nsf} />
                    <label className='ml-2' htmlFor="">NSF</label>
                </div>
                <div className='ml-2'>
                    <input type="checkbox" value={'orthopnea'} checked={physical.cvs.orthopnea} />
                    <label className='ml-2' htmlFor="">Orthopnea</label>
                </div>
                <div className='ml-2'>
                    <input type="checkbox" value={'dyspnea'} checked={physical.cvs.dyspnea} />
                    <label className='ml-2' htmlFor="">Dyspnea</label>
                </div>
                <div className='ml-2'>
                    <input type="checkbox" value={'active_bleed'} checked={physical.cvs.active_bleed} />
                    <label className='ml-2' htmlFor="">Active Bleed</label>
                </div>
                <div className='ml-2'>
                    <input type="checkbox" value={'pale'} checked={physical.cvs.pale} />
                    <label className='ml-2' htmlFor="">Pale</label>
                </div>
                <div className='ml-2'>
                    <input type="checkbox" value={'edema'} checked={physical.cvs.edema} />
                    <label className='ml-2' htmlFor="">Edema</label>
                </div>
                <div className='ml-2'>
                    <input type="checkbox" value={'dvt_risk'} checked={physical.cvs.dvt_risk} />
                    <label className='ml-2' htmlFor="">DVT risk</label>
                </div>
            </div>
            <div className={styles.broderLine}></div>

            <div className={`m-2 ${styles.flexItem}`}>
                <p style={{ fontWeight: 600 }}>Neuro : </p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
                    <div className='ml-2'>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
                            <p>E </p>
                            <p style={{ textDecoration: 'underline', textDecorationStyle: 'dotted' }}>....{physical.neuro.e ?? '...'}....</p>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
                            <p>V </p>
                            <p style={{ textDecoration: 'underline', textDecorationStyle: 'dotted' }}>....{physical.neuro.v ?? '...'}....</p>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
                            <p>M</p>
                            <p style={{ textDecoration: 'underline', textDecorationStyle: 'dotted' }}>....{physical.neuro.m ?? '...'}....</p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }} >
                        <p>=</p>
                        <p style={{ textDecoration: 'underline', textDecorationStyle: 'dotted' }}>....{physical.neuro.e ?? '...'}....</p>
                    </div>
                </div>
                <div className={styles.broderLineHeigh}></div>

                <div>
                    <p style={{ fontWeight: 600 }}>Motor power</p>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <div>
                            <div className='m-3'>
                                <p>{physical.neuro.motor_power.left_arm.part} / {physical.neuro.motor_power.left_arm.of_part}</p>
                            </div>
                            <div style={{ border: '1px solid black' }}></div>
                            <div className='m-3'>
                                <p>{physical.neuro.motor_power.left_leg.part} / {physical.neuro.motor_power.left_leg.of_part}</p>
                            </div>
                        </div>
                        <div style={{ border: '1px solid black', height: '5rem' }}></div>
                        <div>
                            <div className='m-3'>
                                <p>{physical.neuro.motor_power.right_arm.part} / {physical.neuro.motor_power.right_arm.of_part}</p>
                            </div>
                            <div style={{ border: '1px solid black' }}></div>
                            <div className='m-3'>
                                <p>{physical.neuro.motor_power.right_leg.part} / {physical.neuro.motor_power.right_leg.of_part}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.broderLineHeigh}></div>

                <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600 }}>
                        <p>pupil</p>
                        <p className='ml-5'>size</p>
                        <p className='ml-5'>react</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
                        <p>Rt</p>
                        <p style={{ marginLeft: '45px', textDecoration: 'underline', textDecorationStyle: 'dotted' }}>....{physical.neuro.pupil.rt.size ?? '...'}....</p>
                        <p style={{ textDecoration: 'underline', textDecorationStyle: 'dotted' }}>....{physical.neuro.pupil.rt.react ?? '...'}....</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
                        <p>Lt</p>
                        <p style={{ marginLeft: '45px', textDecoration: 'underline', textDecorationStyle: 'dotted' }}>....{physical.neuro.pupil.lt.size ?? '...'}....</p>
                        <p style={{ textDecoration: 'underline', textDecorationStyle: 'dotted' }}>....{physical.neuro.pupil.lt.react ?? '...'}....</p>
                    </div>
                </div>
            </div>
            <div className={styles.broderLine}></div>

            <div className={`m-2 ${styles.flexItem}`}>
                <p style={{ fontWeight: 600 }}>Deformity&Protection : </p>
                <div className='ml-2'>
                    <input type="checkbox" value={'nfs'} checked={physical.deformity_protection.nsf} />
                    <label className='ml-2' htmlFor="">NSF</label>
                </div>
                <div className='ml-2'>
                    <input type="checkbox" value={'collar'} checked={physical.deformity_protection.collar} />
                    <label className='ml-2' htmlFor="">Collar</label>
                </div>
                <div className='ml-2'>
                    <input type="checkbox" value={'traction'} checked={physical.deformity_protection.traction} />
                    <label className='ml-2' htmlFor="">Traction</label>
                </div>
                <div className='ml-2'>
                    <input type="checkbox" value={'cast'} checked={physical.deformity_protection.cast} />
                    <label className='ml-2' htmlFor="">Cast</label>
                </div>
                {
                    physical.deformity_protection.orther.titel.length > 0 ?
                        <div className='ml-2'>
                            <input type="checkbox" value={'cast'} checked={physical.deformity_protection.orther.titel.length > 0} />
                            <label className='ml-2' htmlFor="">Order....{physical.deformity_protection.orther.titel}....</label>
                        </div> :
                        null
                }
            </div>
            <div className={styles.broderLine}></div>

            <div className={`m-2 ${styles.flexItem}`}>
                <p style={{ fontWeight: 600 }}>Drain</p>
                <div className='ml-2'>
                    <input type="checkbox" value={'nsf'} checked={physical.drain.nsf} />
                    <label className='ml-2' htmlFor="">NSF</label>
                </div>
                <div className='ml-2'>
                    <input type="checkbox" value={'ng_tube'} checked={physical.drain.ng_tube} />
                    <label className='ml-2' htmlFor="">NG tube</label>
                </div>
                <div className='ml-2'>
                    <input type="checkbox" value={'icd'} checked={physical.drain.icd} />
                    <label className='ml-2' htmlFor="">ICD</label>
                </div>
                <div className='ml-2'>
                    <input type="checkbox" value={'foley_cath'} checked={physical.drain.foley_cath} />
                    <label className='ml-2' htmlFor="">Foley cath</label>
                </div>
                <div className='ml-2'>
                    <input type="checkbox" value={'ventroculostomy_tube'} checked={physical.drain.ventroculostomy_tube} />
                    <label className='ml-2' htmlFor="">Ventroculostomy tube</label>
                </div>

            </div>
            <div className={`m-2 ${styles.flexItem}`}>
                <div className='ml-2'>
                    <input type="checkbox" value={'redivac_drain'} checked={physical.drain.redivac_drain} />
                    <label className='ml-2' htmlFor="">Redivac drain</label>
                </div>
                <div className='ml-2'>
                    <input type="checkbox" value={'cystostomy'} checked={physical.drain.cystostomy} />
                    <label className='ml-2' htmlFor="">Cystostomy</label>
                </div>
                <div className='ml-2'>
                    <input type="checkbox" value={'redivac_drain'} checked={physical.drain.redivac_drain} />
                    <label className='ml-2' htmlFor="">Redivac Drain</label>
                </div>
                <div className='ml-2'>
                    <input type="checkbox" value={'colostomy_bag'} checked={physical.drain.colostomy_bag} />
                    <label className='ml-2' htmlFor="">Colostomy bag</label>
                </div>
            </div>
            <div className={`m-2 ${styles.flexItem}`}>
                <div className='ml-2'>
                    <input type="checkbox" value={'colostomy_bag'} checked={physical.drain.other.title.length > 0} />
                    <label className='ml-2' htmlFor="">....{physical.drain.other.title}....</label>
                </div>
            </div>

        </div>
    )
}
