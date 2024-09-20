import CardPhysicalStatus from '@/components/CardPhysicalStatus'
import CardTriageLevel from '@/components/CardTriageLevel'
import { PhysicalStatus, TriageLevels } from '@/models/historyDetail.model'
import React from 'react'

export default function page() {
    const t: TriageLevels = {
        id: '',
        triage_level_value: 'urgent',
        v_s: {
            t: '23',
            pr: '44',
            rr: '52',
            bp: {
                front: '12',
                back: '56'
            },
            o2_sat: '126'
        },
        pain_score: 0,
        history_id: '',
        create_date: new Date(),
        update_date: new Date()
    }

    const p: PhysicalStatus = {
        id: '',
        history_id: '',
        ga: 'nsf',
        sedated: {
            drug: 'อุบัติเหตุรถชน',
            time: '3',
            restraint_time: '3'
        },
        airway: {
            nsf: false,
            stridor: false,
            secretion: true,
            injury: true,
            bleeding: false,
            checked: 'tracheostomy_tube',
            tube: {
                trachostomy_tobe: 'cuffed',
                no: '4',
                fix: '5'
            }
        },
        respi: {
            nsf: true,
            tachyypnea: false,
            dyspnea: false,
            wheezing: false,
            respi_checked: '',
            lmp: ''
        },
        cvs: {
            nsf: false,
            orthopnea: false,
            dyspnea: false,
            active_bleed: false,
            pale: true,
            edema: true,
            dvt_risk: false
        },
        neuro: {
            e: 3,
            v: 4,
            m: 5,
            total: 12,
            motor_power: {
                left_arm: {
                    part: 3,
                    of_part: 4
                },
                right_arm: {
                    part: 5,
                    of_part: 5
                },
                left_leg: {
                    part: 1,
                    of_part: 5
                },
                right_leg: {
                    part: 2,
                    of_part: 3
                }
            },
            pupil: {
                rt: {
                    size: 1,
                    react: 1
                },
                lt: {
                    size: 3,
                    react: 4
                }
            }
        },
        deformity_protection: {
            nsf: false,
            collar: false,
            traction: false,
            cast: false,
            orther: {
                titel: 'test'
            }
        },
        distal_pulse: 'good',
        drain: {
            nsf: true,
            ng_tube: false,
            icd: false,
            foley_cath: false,
            ventroculostomy_tube: false,
            redivac_drain: false,
            cystostomy: false,
            colostomy_bag: false,
            other: {
                title: ''
            }
        }
    }
    return (
        <div>
            <CardTriageLevel triage={t} />
            <div className='mt-4'>
                <CardPhysicalStatus physical={p} />
            </div>
        </div>
    )
}
