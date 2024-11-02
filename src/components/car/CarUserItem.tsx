'use client'
import { Users } from '@/models/users.model'
import { toast } from '@/services/alert.service'
import { findUserById } from '@/services/user.service'
import { AspectRatio, Box, CardContent, CardOverflow, Typography, Card } from '@mui/joy'
import React, { useCallback, useEffect, useState } from 'react'

type Props = {
    user_id: string
    keyValue: string
}

export default function CarUserItem({ user_id, keyValue }: Props) {
    const [user, setUser] = useState<Users>({} as Users)

    const findUser = useCallback(async () => {
        try {
            const result = await findUserById(user_id)
            setUser(result.data)
        } catch (error: any) {
            toast(JSON.stringify(error.message), 'error')
        }
    }, [setUser])

    useEffect(() => {
        findUser()

        return () => {
            findUser
        }
    }, [findUser])
    return (
        <Box>

            {
                keyValue.includes('commader') ?
                    user?.role?.toLocaleLowerCase().includes('rootadmin') || user?.role?.toLocaleLowerCase('admin') || user.Responsibilities?.role?.toLocaleLowerCase().includes('leader')?
                        <Card
                            orientation="horizontal"
                            size="sm"
                            sx={{ bgcolor: 'background.surface', borderRadius: 0, mb: 1, marginTop: 2 }}
                        >
                            <CardOverflow>
                                <AspectRatio
                                    ratio="1"
                                    sx={{ minWidth: 90, '& img[data-first-child]': { p: 1.5 } }}
                                >
                                    <img
                                        src={user.image}
                                        srcSet={user.image}
                                        loading="lazy"
                                        alt=""
                                    />
                                </AspectRatio>
                            </CardOverflow>
                            <CardContent>
                                <Typography level="title-md">{user.first_name} {user.last_name}</Typography>
                                <Typography level="body-sm">{user.career ?? 'ผู้บังคะบบัญชา'}</Typography>
                                <Typography level="body-sm">{user.phone_number ?? 'ไมมีเบอร์ติดต่อ'}</Typography>
                            </CardContent>
                        </Card> : <p>ไม่มี แพทย์</p>
                    : null
            }

            {
                keyValue.includes('career') ?
                    user?.career?.includes('medic') ?
                        <Card
                            orientation="horizontal"
                            size="sm"
                            sx={{ bgcolor: 'background.surface', borderRadius: 0, mb: 1, marginTop: 2 }}
                        >
                            <CardOverflow>
                                <AspectRatio
                                    ratio="1"
                                    sx={{ minWidth: 90, '& img[data-first-child]': { p: 1.5 } }}
                                >
                                    <img
                                        src={user.image}
                                        srcSet={user.image}
                                        loading="lazy"
                                        alt=""
                                    />
                                </AspectRatio>
                            </CardOverflow>
                            <CardContent>
                                <Typography level="title-md">{user.first_name} {user.last_name}</Typography>
                                <Typography level="body-sm">{user.career ?? 'ผู้บังคะบบัญชา'}</Typography>
                                <Typography level="body-sm">{user.phone_number ?? 'ไมมีเบอร์ติดต่อ'}</Typography>
                            </CardContent>
                        </Card> : <p>ไม่มี แพทย์</p>
                    : null
            }

{
                keyValue.includes('staff') ?
                    user?.career?.includes('medic') ?
                        <Card
                            orientation="horizontal"
                            size="sm"
                            sx={{ bgcolor: 'background.surface', borderRadius: 0, mb: 1, marginTop: 2 }}
                        >
                            <CardOverflow>
                                <AspectRatio
                                    ratio="1"
                                    sx={{ minWidth: 90, '& img[data-first-child]': { p: 1.5 } }}
                                >
                                    <img
                                        src={user.image}
                                        srcSet={user.image}
                                        loading="lazy"
                                        alt=""
                                    />
                                </AspectRatio>
                            </CardOverflow>
                            <CardContent>
                                <Typography level="title-md">{user.first_name} {user.last_name}</Typography>
                                <Typography level="body-sm">{user.career ?? 'ผู้บังคะบบัญชา'}</Typography>
                                <Typography level="body-sm">{user.phone_number ?? 'ไมมีเบอร์ติดต่อ'}</Typography>
                            </CardContent>
                        </Card> : <p>ไม่มี เจ้าหน้าที่</p>
                    : null
            }
        </Box>
    )
}
