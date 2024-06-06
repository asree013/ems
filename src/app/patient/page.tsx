import React from 'react'
import PatientList from './PatientList'
import PatientItem from './PatientItem'
import './patient.css'

export default function page() {
  return (
    <>
        {/* <PatientList patient={{} as Patient}/> */}
        <PatientItem />
    </>
  )
}
