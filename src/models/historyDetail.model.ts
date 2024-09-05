export interface TriageLevels {
    id: string
    triage_level_value: string
    v_s: {
        t: string
        pr: string
        rr: string
        bp: {
            front: string
            back: string
        }
        o2_sat: string
    }
    pain_score: number
    history_id: string
    create_date: Date
    update_date: Date
} 

export interface PhysicalStatus {
    id: string
    history_id: string
    ga: string
    sedated: {
        drug: string
        time: string
        restraint_time: string
    }
    airway: {
        nsf: boolean
        stridor: boolean
        secretion: boolean
        injury: boolean
        bleeding: boolean
        checked: string
        tube: {
            trachostomy_tobe: string
            no: number
            fix: number
        }
    }
    respi: {
        nsf: boolean
        tachyypnea: boolean
        dyspnea: boolean
        wheezing: boolean
        lmp: number
    }
    cvs: {
        nsf: boolean
        orthopnea: boolean
        dyspnea: boolean
        active_bleed: boolean
        pale: boolean
        edema: boolean
        dvt_risk: boolean
    }
    neuro: {
        e: string
        v: string
        m: string
        total: string
        motor_power: {
            left_arm: {
                part: number
                of_part: number
            }
            right_arm: {
                part: number
                of_part: number
            }
            left_leg: {
                part: number
                of_part: number
            }
            right_leg: {
                part: number
                of_part: number
            }
        }
        pupli: {
            rt: {
                size: number
                react: number
            }
            lt: {
                size: number
                react: number
            }
        }
    }
    deformity_protection: {
        nsf: boolean
        collar: boolean
        traction: boolean
        cast: boolean
        orther: {
            titel: string
        }
    }
    distal_pulse: string
    drain: {
        nsf: boolean
        ng_tube: boolean
        icd: boolean
        foley_cath: boolean
        ventroculostomy_tube: boolean
        redivac_drain: boolean
        cystostomy: boolean
        colostomy_bag: boolean
        other: {
            title: string
        }
    }
}