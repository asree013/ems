import React, { ChangeEvent, useContext, useState } from 'react'
import update from 'immutability-helper'
import { Identifier, XYCoord } from 'dnd-core';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend'
import { MissionTag } from '@/models/mission.model';
import { BookmarkPlus, CircleX, FilePlus2, Trash2 } from 'lucide-react';
import Swal from 'sweetalert2';
import { toast } from '@/services/alert.service';
import { Button } from '@mui/joy';
import { cartTagContext, dammyDataContext, TCartTagContext, TDammyContext } from './mission_detail.context';

type Props = {
    retunArrayUseTag: (newArr: MissionTag[]) => void
}

export default function MissionEditTag({ retunArrayUseTag }: Props) {
    const [open, setOpen] = useState<boolean>(false)
    return (
        <div >
            <DndProvider backend={HTML5Backend}>
                <div className='flex flex-col-reverse md:flex-row items-center md:items-start justify-center'>
                    <div className='border border-gray-400 rounded-lg p-2 pr-3 pl-3'>
                        <div className='flex flex-row items-center justify-between'>
                            <p>สถาณะของภารกิจ</p>
                            <button onClick={() => setOpen(!open)}
                                className={`
                                ${open ? 'bg-red-600 hover:bg-red-700' : ' bg-blue-900 hover:bg-blue-950'} rounded-lg 
                                text-white p-2 flex flex-row items-center justify-center

                            `}>
                                {
                                    open ?
                                        <CircleX /> :
                                        <FilePlus2 />

                                }
                                {
                                    open ?
                                        null :
                                        <span className='ml-1'>เพิ่ม</span>
                                }
                            </button>
                        </div>
                        <ContainerItem retunArrayUseTag={retunArrayUseTag} />
                    </div>

                    {
                        open ?
                            <div className='ml-3 border border-gray-400 rounded-lg p-2 pr-3 pl-3'>
                                <p className='text-blue-700'>แทกอื่น</p>
                                <ContainerCart />
                            </div> : null
                    }
                </div>
            </DndProvider>
        </div>
    )
}

export interface Item {
    id: number
    text: string
}

const ContainerItem: React.FC<{ retunArrayUseTag: (newArr: MissionTag[]) => void }> = ({ retunArrayUseTag }) => {
    const { selectTag, setSelectTag } = useContext<TDammyContext>(dammyDataContext)
    const {cartTag} = useContext<TCartTagContext>(cartTagContext)


    const moveCard = React.useCallback((dargIndex: number, hoverIndex: number) => {
        setSelectTag((prev: MissionTag[]) =>
            update(prev, {
                $splice: [
                    [dargIndex, 1],
                    [hoverIndex, 0, prev[dargIndex] as MissionTag]
                ]
            })
        )

    }, [setSelectTag])

    function onDeleteTagInCart(data: MissionTag) {
        Swal.fire({
            title: "คุณแน่ใจ",
            text: "คุณต้องการลบแทกนี้ออกจากลิสภารกิจนี้ใช่ไหม!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "ลบแทกออก",
            cancelButtonText: 'ยกเลิก'
        }).then((result) => {
            if (result.isConfirmed) {
                setSelectTag(selectTag.filter(r => r !== data))
                toast('ลบแทกออกจากลิส', 'success')
            }
        });
    }

    const renderCard = React.useCallback((data: MissionTag, index: number) => {
        return <CardItem returnOnDelete={onDeleteTagInCart} index={index} moveCard={moveCard} missionTag={data} key={data.id} />
    }, [])

    React.useEffect(() => {
        setSelectTag(selectTag)
    }, [selectTag]);

    return (
        <>
            <div className='w-full h-[510px] overflow-y-scroll'>
                <p>แทกที่เลือกไว้ {selectTag.length}/{cartTag.length}</p>
                {selectTag.map((selectTag, i) => renderCard(selectTag, i))}
            </div>
        </>
    )
}

const ContainerCart: React.FC = () => {
    const { selectTag, setSelectTag } = useContext<TDammyContext>(dammyDataContext)
    const { cartTag } = useContext<TCartTagContext>(cartTagContext)
    const [showData, setShowData] = useState<MissionTag[]>(cartTag)
    function onAddSelectTag(data: MissionTag) {
        setSelectTag([...selectTag, data])
    }

    function onSearch(e: ChangeEvent<HTMLInputElement>) {
        e.preventDefault()
        if (e.target.value.length === 0) {
            setShowData(cartTag)
        }
        setShowData(cartTag.filter(r => r.label.includes(e.target.value)))

    }

    function onAddTagCar() {

    }
    return (
        <div className='w-full p-2'>
            <div className=''>
                <div className='flex flex-row flex-wrap max-w-[300px] gap-2 items-center justify-between'>
                    <button onClick={onAddTagCar} className='border-[2px] border-red-300 hover:border-red-600 p-2 rounded-lg text-red-600'>เพิ่มแทกรถ</button>
                    <button className='border-[2px] border-green-300 hover:border-green-600 p-2 rounded-lg text-green-600'>เพิ่มแทก ฮ.</button>
                    <button className='border-[2px] border-blue-300 hover:border-blue-600 p-2 rounded-lg text-blue-600'>เพิ่มแทกเรือ</button>
                    <button className='border-[2px] border-orange-300 hover:border-orange-600 p-2 rounded-lg text-orange-600'>เพิ่มแทกรถ และเรือ</button>
                    <button className='border-[2px] border-purple-300 hover:border-purple-600 p-2 rounded-lg text-purple-600'>เพิ่มแทกรถ และ ฮ.</button>
                </div>
                <div className='mt-3 flex flex-row items-center justify-between'>
                    <input onChange={onSearch} className='w-full p-2 bg-gray-200 rounded-lg' type="text" placeholder='ค้นหาแทก' />
                    <button className='ml-2 p-2 w-[80px] rounded-lg bg-blue-900 text-white'>ค้นหา</button>
                </div>
            </div>
            <div className='mt-3 border border-gray-400 w-full'></div>
            <div className='h-full max-h-[350px] overflow-x-scroll'>
                {showData.map((r, i) =>
                    <div key={i} className='p-2 rounded-lg border border-gray-400 mt-4' >
                        <p>แทรที่ :{r.status}</p>
                        <p className='mb-3'>{r.label}</p>
                        <Button disabled={selectTag.find(s => s.id === r.id) ? true : false} onClick={() => onAddSelectTag(r)}>
                            <BookmarkPlus />
                            <span className='ml-1'>เพิ่ม</span>
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}

type PropsCard = {
    missionTag: MissionTag
    index: number
    moveCard: (dragIndex: number, hoverIndex: number) => void
    returnOnDelete: (data: MissionTag) => void
}

interface DragItem {
    index: number
    id: string
    type: string
}

const ItemTypes = {
    CARD: 'card',
}

const CardItem: React.FC<PropsCard> = ({ index, moveCard, missionTag }) => {
    const ref = React.useRef<HTMLDivElement>(null)
    const { selectTag, setSelectTag } = useContext<TDammyContext>(dammyDataContext)
    const [{ handlerId }, drop] = useDrop<
        DragItem,
        void,
        { handlerId: Identifier | null }
    >({
        accept: ItemTypes.CARD,
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover(item: DragItem, monitor) {
            if (!ref.current) {
                return
            }
            const dragIndex = item.index
            const hoverIndex = index

            if (dragIndex === hoverIndex) {
                return
            }

            const hoverBoundingRect = ref.current?.getBoundingClientRect()

            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

            const clientOffset = monitor.getClientOffset()

            const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }

            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }

            moveCard(dragIndex, hoverIndex)

            item.index = hoverIndex
        },
    })
    const [{ isDragging }, drag] = useDrag({
        type: ItemTypes.CARD,
        item: () => {
            return { missionTag, index }
        },
        collect: (monitor: any) => ({
            isDragging: monitor.isDragging(),
        }),
    })


    const opacity = isDragging ? 0 : 1
    drag(drop(ref))

    function onDeleteCardItem() {
        setSelectTag(selectTag.filter(r => r.id !== missionTag.id))
    }
    return (
        <div ref={ref} className='hover:shadow-shadow cursor-move border border-gray-400 rounded-lg mt-5 p-2' style={{ opacity }} data-handler-id={handlerId}>
            <p className='text-red-600'>ลำดับที่: {index + 1}</p>
            <p>แท็กที่ {missionTag.status}</p>
            <p>{missionTag.label}</p>
            <div className='flex flex-row items-center justify-end'>
                <button onClick={onDeleteCardItem} className='p-2 border rounded-lg hover:border-red-600'>
                    <Trash2 className='text-red-600' />
                </button>
            </div>
        </div>
    )
}
