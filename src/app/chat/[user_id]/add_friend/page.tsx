'use client'

import React, { useCallback, useEffect, useState } from 'react'
import AppBarChat from '../components/AppBarChat'
import Nav from '@/components/nav/Nav'
import UserProfileAddFriend from './UserProfileAddFriend'
import styled from 'styled-components'

import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import { Users } from '@/models/users.model'
import { toast } from '@/services/alert.service'
import { findUsers } from '@/services/user.service'

const BodyFriend = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 50px;
`

export default function page() {
  const [users, setUsers] = useState<Users[]>({} as Users[])

  const onFeedUser = useCallback(async () => {
    try {
      const result = await findUsers(1, 10)
      setUsers(result.data)
    } catch (error: any) {
      toast(error.message, 'error')
    }
  }, [setUsers])

  useEffect(() => {
    onFeedUser()
  }, [onFeedUser])
  return (
    <>
      <Nav />
      <BodyFriend>
        <Paper
          elevation={4}
          component="form"
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%', minWidth: 320, margin: '20px 0' }}
        >
          <IconButton sx={{ p: '10px' }} aria-label="menu">
            <MenuIcon />
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="ค้นหาผู้ใช้งาน"
            inputProps={{ 'aria-label': 'search google maps' }}
          />
          <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
            <SearchIcon />
          </IconButton>
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
            <DirectionsIcon />
          </IconButton>
        </Paper>

        {
          Array.isArray(users) && users.length > 0 ? (
            users.map((r, i) => <UserProfileAddFriend key={i} />)
          ) : (
            <p>ไม่พบข้อมูลผู้ใช้งาน</p>
          )
        }
      </BodyFriend>
    </>
  )
}
