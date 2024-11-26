'use client'
import { findAllBedInShipByShipId } from '@/services/bedInShip.service'
import { Box, Card, Divider, TextField } from '@mui/material'
import { useParams } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import styled from 'styled-components'
import Loadding from '@/components/Loadding'

import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import { BedInShips } from '@/models/bedShip.model'
import { Button, Option, Select } from '@mui/joy'

const CardItems = styled.div`
    width: 200px;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`

export default function BedInShip() {
    const vehicle_id = useParams()
    const [bedShips, setBedShips] = useState<BedInShips[]>({} as BedInShips[])
    const [load, setLoad] = useState<boolean>(false)

    const [open, setOpen] = React.useState<boolean>(false);

    const onFeedBedByShipId = useCallback(async () => {
        setLoad(true)
        try {
            const resutl = await findAllBedInShipByShipId(String(vehicle_id.vehicle), 1, 10)
            console.log(resutl.data);

            setBedShips(resutl.data)
        } catch (error) {

        } finally {
            setLoad(false)
        }
    }, [setBedShips])

    useEffect(() => {
        onFeedBedByShipId()
    }, [onFeedBedByShipId])
    return (
        <>
            <div>
                <p>เตียงในเรือ</p>
                <div>
                    <CardItems onClick={() => {
                        setOpen(true)

                    }}>
                        <Card sx={{ width: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }} elevation={4}>
                            <AddIcon sx={{ height: 100, width: 100 }} />
                            <p>เพิ่มเตียงภายในเรือ</p>
                        </Card>
                    </CardItems>
                </div>
            </div>

            <CreateBedModal />

            {
                load ?
                    <Loadding /> :
                    null
            }
        </>
    )

    function CreateBedModal() {
        const [bedItem, setBedItem] = useState<BedInShips[]>({} as BedInShips[])
        const [bed, setBed] = useState<BedInShips>({} as BedInShips)
        const [selected, setSelected] = useState<string>('')

        function addList() {
            if (bedItem.length > 0) {
                setBedItem([...bedItem, bed]);
                setBed({} as BedInShips)
            }
            else {
                const arr = []
                arr.push(bed)
                setBedItem(arr);
                setBed({} as BedInShips)

            }
            setBed({} as BedInShips);
        }

        return (
            <React.Fragment>
                <Modal
                    aria-labelledby="modal-title"
                    aria-describedby="modal-desc"
                    open={open}
                    onClose={() => setOpen(false)}
                    sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                >
                    <Sheet
                        variant="outlined"
                        sx={{ maxWidth: 500, borderRadius: 'md', p: 3, boxShadow: 'lg' }}
                    >
                        <ModalClose variant="plain" sx={{ m: 1 }} />
                        <Typography
                            component="h2"
                            id="modal-title"
                            level="h4"
                            textColor="inherit"
                            sx={{ fontWeight: 'lg', mb: 1 }}
                        >
                            สร้างเตียง
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                            <label htmlFor="">เลือกวิธีการเพิ่มเตียง</label>
                            <Select onChange={(e, v: string | null) => {
                                setSelected(String(v))
                            }} defaultValue={''} value={selected ?? ''} sx={{ width: 250 }}>
                                <Option value='' disabled>เลือกวิธีเพิ่มเตียง</Option>
                                <Option value="one">เพิ่มทีละเตียง</Option>
                                <Option value="many">เพิ่มทีละหลายเตียง</Option>
                            </Select>
                            {
                                selected === '' ?
                                    null :
                                    <div>
                                        <TextField value={bed.name ?? ''} onChange={(e) => setBed({ ...bed, name: e.target.value })} sx={{ marginTop: 1, width: '100%' }} label={'ชื่อ/หมายเลขเตียง'} />
                                        <TextField value={bed.description ?? ''} onChange={(e) => setBed({ ...bed, description: e.target.value })} sx={{ marginTop: 1, width: '100%' }} label={'รายละเอียดเตียง/เช่น เตีงฉุเฉิน'} />
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'end', marginTop: '10px' }}>
                                            {
                                                selected === 'one' ?
                                                    <Button variant='solid' sx={{ width: '100%', fontSize: '20px' }} color='primary'>เพิ่มเตียง</Button>
                                                    : <Button variant='soft' onClick={addList} color='neutral'>เพิ่มในลิส</Button>
                                            }
                                        </div>
                                        {
                                            selected === 'one' ?
                                                null :
                                                <div>
                                                    <Divider sx={{ marginTop: '10px' }} variant='fullWidth' >ลิสเตียง</Divider>
                                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', marginTop: '10px' }}>
                                                        <div style={{ width: 300, overflow: 'scroll', height: 180, border: '1px solid black', borderRadius: 20 }}>

                                                            <table style={{ margin: '10px', width: '100%' }} className="table">
                                                                <thead>
                                                                    <tr>
                                                                        <th scope="col">#</th>
                                                                        <th scope="col">ชื่อ</th>
                                                                        <th scope="col">รายละเอียด</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody >
                                                                    {
                                                                        bedItem.length > 0 ?
                                                                            bedItem.map((r, i) =>
                                                                                <tr key={i}>
                                                                                    <td>{i + 1}</td>
                                                                                    <td>{r.name}</td>
                                                                                    <td>{r.description}</td>
                                                                                </tr>
                                                                            ) : null
                                                                    }
                                                                </tbody>
                                                            </table>

                                                        </div>
                                                        <Button variant='solid' sx={{ width: '100%', fontSize: '20px', marginTop: '10px' }} color='primary'>เพิ่มเตียง</Button>
                                                    </div>
                                                </div>
                                        }
                                    </div>
                            }
                        </Box>
                    </Sheet>
                </Modal>
            </React.Fragment>
        );
    }
}
