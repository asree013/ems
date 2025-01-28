'use client'
import { PateintAllInMission } from '@/models/mission.model'
import { Avatar, IconButton } from '@mui/material'
import React from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility';

type Prosp = {
    pateint: any
}

export default function TableResultPateint({ pateint }: Prosp) {
    return (
        <tr>
            <td><Avatar src={pateint.image} /></td>
            <td>{pateint.first_name} {pateint.last_name}</td>
            <td>{pateint.gender.toLocaleLowerCase() === 'male' ? <p>ชาย</p> : <p>หญิง</p>}</td>
            <td>{pateint.age?? 'ไม่ทราบอายุ'}</td>
            <td>{pateint.id_card ?? 'ไม่ทราบเลขบัตร'}</td>
            <td>
                <IconButton>
                    <VisibilityIcon />
                </IconButton>
            </td>
        </tr>
    )
}
