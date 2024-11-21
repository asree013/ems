'use client'
import { PateintAllInMission, UserInMissionId } from '@/models/mission.model'
import { Avatar, IconButton } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import ChatIcon from '@mui/icons-material/Chat';
import { timeOutJwt } from '@/services/timeout.service';
import { Users } from '@/models/users.model';
import { FindUserMe } from '@/services/authen.service';
import Loadding from '@/components/Loadding';

type Prosp = {
    user: UserInMissionId
}

export default function TableResultUser({ user }: Prosp) {
    const [load, setload] = useState(false)
    const [findMe, setFindMe] = useState<Users>({} as Users)
    const findUserFindMe = useCallback(async () => {
        setload(true)
        try {
            const result = await FindUserMe()
            setFindMe(result.data)
        } catch (error) {
            timeOutJwt(error)
        } finally {
            setload(false)
        }
    }, [setFindMe])

    useEffect(() => {
        findUserFindMe()
    }, [findUserFindMe])
    return (
        <>
            <tr>
                <td><Avatar src={user.image} /></td>
                <td >{user.first_name} {user.last_name}</td>
                <td>{user.career}</td>
                <td>{user.phone_number}</td>
                <td>{user.Responsibilities?.role}</td>
                <td>{onConvertRole(user.role)}</td>
                <td>
                    <IconButton onClick={() => {
                        setload(true)
                        window.location.href = '/chat/' + findMe.id + '/'
                    }}>
                        <ChatIcon color='warning' />
                    </IconButton>
                </td>
            </tr>

            {
                load?
                <Loadding />:
                null
            }
        </>
    )

    function onConvertRole(value: string) {
        if (value.toLocaleLowerCase().includes('user')) return 'ผู้ใช้งาน'
        else if (value.toLocaleLowerCase() === 'admin') return 'ผู้ดูแล'
        else return 'ผู้ดูแลสูงสุด'
    }
}
