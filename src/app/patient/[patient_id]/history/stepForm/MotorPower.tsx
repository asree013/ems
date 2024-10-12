'use client'
import React, { useContext } from 'react'
import { PhysicalStatusContext, TPhysicalStatusContext } from '../StepContext'
import { tranformStringToNumber } from '@/services/sum_lat_long.service'

export default function MotorPower() {
    const { physicalStatus, setPhysicalStatus } = useContext<TPhysicalStatusContext>(PhysicalStatusContext)

    return (
        <div>
            <p style={{ fontWeight: 600 }}>Motor power</p>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <div>
                    <div className='m-3' id='leftpart' style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: 108, height: 40 }}>
                        <input onChange={(e) => {
                            setPhysicalStatus({
                                ...physicalStatus,
                                neuro: {
                                    ...physicalStatus.neuro,
                                    motor_power: {
                                        ...physicalStatus.neuro?.motor_power,  // Ensure motor_power exists
                                        left_arm: {
                                            ...physicalStatus.neuro?.motor_power?.left_arm,  // Ensure left_arm exists
                                            part: Number(tranformStringToNumber(e))
                                        }
                                    }
                                }
                            });
                        }} type="number" defaultValue={0} value={physicalStatus?.neuro?.motor_power?.left_arm.part} style={{ width: 40, height: 40, textAlign: 'center', boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px;' }} />
                        <p>/</p>
                        <input onChange={(e) => {
                            setPhysicalStatus({
                                ...physicalStatus,
                                neuro: {
                                    ...physicalStatus.neuro,
                                    motor_power: {
                                        ...physicalStatus.neuro?.motor_power,  // Ensure motor_power exists
                                        left_arm: {
                                            ...physicalStatus.neuro?.motor_power?.left_arm,  // Ensure left_arm exists
                                            of_part: Number(tranformStringToNumber(e))
                                        }
                                    }
                                }
                            });
                        }} type="number" defaultValue={0} style={{ width: 40, height: 40, textAlign: 'center', boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px;' }} />
                    </div>
                    <div style={{ border: '1px solid black' }}></div>
                    <div className='m-3' style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: 108, height: 40 }}>
                        <input onChange={(e) => {
                            setPhysicalStatus({
                                ...physicalStatus,
                                neuro: {
                                    ...physicalStatus.neuro,
                                    motor_power: {
                                        ...physicalStatus.neuro?.motor_power,  // Ensure motor_power exists
                                        left_leg: {
                                            ...physicalStatus.neuro?.motor_power?.left_leg,  // Ensure left_arm exists
                                            part: Number(tranformStringToNumber(e))
                                        }
                                    }
                                }
                            });
                        }} type="number" defaultValue={0} style={{ width: 40, height: 40, textAlign: 'center', boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px;' }} name="" id="" />
                        <p> / </p>
                        <input onChange={(e) => {
                            setPhysicalStatus({
                                ...physicalStatus,
                                neuro: {
                                    ...physicalStatus.neuro,
                                    motor_power: {
                                        ...physicalStatus.neuro?.motor_power,  // Ensure motor_power exists
                                        left_leg: {
                                            ...physicalStatus.neuro?.motor_power?.left_leg,  // Ensure left_arm exists
                                            of_part: Number(tranformStringToNumber(e))
                                        }
                                    }
                                }
                            });
                        }} type="number" defaultValue={0} style={{ width: 40, height: 40, textAlign: 'center', boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px;' }} name="" id="" />
                    </div>
                </div>
                <div style={{ border: '1px solid black', height: '10rem' }}></div>
                <div>
                    <div className='m-3' style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: 108, height: 40 }}>
                        <input onChange={(e) => {
                            setPhysicalStatus({
                                ...physicalStatus,
                                neuro: {
                                    ...physicalStatus.neuro,
                                    motor_power: {
                                        ...physicalStatus.neuro?.motor_power,  // Ensure motor_power exists
                                        right_arm: {
                                            ...physicalStatus.neuro?.motor_power?.right_arm,  // Ensure left_arm exists
                                            part: Number(tranformStringToNumber(e))
                                        }
                                    }
                                }
                            });
                        }} type="number" defaultValue={0} style={{ width: 40, height: 40, textAlign: 'center', boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px;' }} />
                        <p> / </p>
                        <input onChange={(e) => {
                            setPhysicalStatus({
                                ...physicalStatus,
                                neuro: {
                                    ...physicalStatus.neuro,
                                    motor_power: {
                                        ...physicalStatus.neuro?.motor_power,  // Ensure motor_power exists
                                        right_arm: {
                                            ...physicalStatus.neuro?.motor_power?.right_arm,  // Ensure left_arm exists
                                            of_part: Number(tranformStringToNumber(e))
                                        }
                                    }
                                }
                            });
                        }} type="number" defaultValue={0} style={{ width: 40, height: 40, textAlign: 'center', boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px;' }} />
                    </div>
                    <div style={{ border: '1px solid black' }}></div>
                    <div className='m-3' style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: 108, height: 40 }}>
                        <input onChange={(e) => {
                            setPhysicalStatus({
                                ...physicalStatus,
                                neuro: {
                                    ...physicalStatus.neuro,
                                    motor_power: {
                                        ...physicalStatus.neuro?.motor_power,  // Ensure motor_power exists
                                        right_leg: {
                                            ...physicalStatus.neuro?.motor_power?.right_leg,  // Ensure left_arm exists
                                            part: Number(tranformStringToNumber(e))
                                        }
                                    }
                                }
                            });
                        }} type="number" defaultValue={0} style={{ width: 40, height: 40, textAlign: 'center', boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px;' }} />
                        <p> / </p>
                        <input onChange={(e) => {
                            setPhysicalStatus({
                                ...physicalStatus,
                                neuro: {
                                    ...physicalStatus.neuro,
                                    motor_power: {
                                        ...physicalStatus.neuro?.motor_power,  // Ensure motor_power exists
                                        right_leg: {
                                            ...physicalStatus.neuro?.motor_power?.right_leg,  // Ensure left_arm exists
                                            of_part: Number(tranformStringToNumber(e))
                                        }
                                    }
                                }
                            });
                        }} type="number" defaultValue={0} style={{ width: 40, height: 40, textAlign: 'center', boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px;' }} />
                    </div>
                </div>
            </div>
        </div>
    )
}
