'use client'
import BodyHuman from '@/components/BodyHuman'
import React from 'react'
import exanCss from './exan.module.css'
import { OpenExanImage, TypeOpenExanContext } from './page'
import { useParams, useRouter } from 'next/navigation'
import { NIL } from 'uuid'
import { ExanShows, Exans } from '@/models/exan.model'
import Loadding from '@/components/Loadding'

type Props = {
  organ: string[]
  exan: ExanShows[]
}


export default function ExanElement({ organ, exan }: Props) {
  const router = useRouter()
  const patient_id = useParams().patient_id
  const history_id = useParams().history_id
  const [load, setLoad] = React.useState<boolean>(false)

  const { open, setOpen } = React.useContext<TypeOpenExanContext>(OpenExanImage)
  async function setParamBody(txt: string) {
    if (txt) {
      router.push(`/patient/${patient_id}/history/${history_id}/${NIL}?el_id=${txt}`)
      setLoad(true)
    }
  }

  function onOpenImage() {
    setOpen(true)
  }
  // function renderCountImage(e: ExanShows[], key: string) {
  //   console.log('e: ', e);
  //   console.log('k: ', key);

  //   const el_id = Boolean(e.find(r => r.element_id.includes(key)))
  //   if(el_id){
  //     return e.find(r => r.element_id.includes(key))?._count.ImageExan
  //   }
  //   else{
  //     return 0
  //   }
  // }
  return (
    <>
      <div className={exanCss.home_body}>
        <BodyHuman onChangeData={setParamBody} organ={organ} key={organ.length} />
        {
          organ.includes('head') ?
            <div className={exanCss.head}>
              <div className={exanCss.line}></div>
              <div className={exanCss.line_value} onClick={onOpenImage}>
                {
                  Array.isArray(exan) ? (
                    exan.find(r => r.element_id.includes('head'))?.element_id
                  ) :
                    0
                }
              </div>
            </div> :
            null
        }
        {
          organ.includes('rightShoulder') ?
            <div className={exanCss.rightShoulder}>
              <div className={exanCss.line}></div>
              <div className={exanCss.line_value} onClick={onOpenImage}>
                {
                  Array.isArray(exan) ? (
                    exan.find(r => r.element_id.includes('rightShoulder'))?.element_id
                  ) :
                    0
                }
              </div>
            </div> :
            null
        }
        {
          organ.includes('rightArm') ?
            <div className={exanCss.rightArm}>
              <div className={exanCss.line}></div>
              <div className={exanCss.line_value} onClick={onOpenImage}>
                {
                  Array.isArray(exan) ? (
                    exan.find(r => r.element_id.includes('rightArm'))?.element_id
                  ) :
                    0
                }
              </div>
            </div> :
            null
        }
        {
          organ.includes('rightHand') ?
            <div className={exanCss.rightHand}>
              <div className={exanCss.line}></div>
              <div className={exanCss.line_value} onClick={onOpenImage}>
                {
                  Array.isArray(exan) ? (
                    exan.find(r => r.element_id.includes('rightHand'))?.element_id
                  ) :
                    0
                }
              </div>
            </div> :
            null
        }
        {
          organ.includes('rightLeg') ?
            <div className={exanCss.rightLeg}>
              <div className={exanCss.line}></div>
              <div className={exanCss.line_value} onClick={onOpenImage}>
                {
                  Array.isArray(exan) ? (
                    exan.find(r => r.element_id.includes('rightLeg'))?.element_id
                  ) :
                    0
                }
              </div>
            </div> :
            null
        }
        {
          organ.includes('rightFoot') ?
            <div className={exanCss.rightFoot}>
              <div className={exanCss.line}></div>
              <div className={exanCss.line_value} onClick={onOpenImage}>
                {
                  Array.isArray(exan) ? (
                    exan.find(r => r.element_id.includes('rightFoot'))?.element_id
                  ) :
                    0
                }
              </div>
            </div> :
            null
        }
        {
          organ.includes('leftShoulder') ?
            <div className={exanCss.leftShoulder}>
              <div className={exanCss.line_value} onClick={onOpenImage}>
                {
                  Array.isArray(exan) ? (
                    exan.find(r => r.element_id.includes('leftShoulder'))?.element_id
                  ) :
                    0
                }
              </div>
              <div className={exanCss.line}></div>
            </div> :
            null
        }
        {
          organ.includes('leftArm') ?
            <div className={exanCss.leftArm}>
              <div className={exanCss.line_value} onClick={onOpenImage}>
                {
                  Array.isArray(exan) ? (
                    exan.find(r => r.element_id.includes('leftArm'))?.element_id
                  ) :
                    0
                }
              </div>
              <div className={exanCss.line}></div>
            </div> :
            null
        }
        {
          organ.includes('leftHand') ?
            <div className={exanCss.leftHand}>
              <div className={exanCss.line_value} onClick={onOpenImage}>
                {
                  Array.isArray(exan) ? (
                    exan.find(r => r.element_id.includes('leftHand'))?.element_id
                  ) :
                    0
                }
              </div>
              <div className={exanCss.line}></div>
            </div> :
            null
        }
        {
          organ.includes('leftLeg') ?
            <div className={exanCss.leftLeg}>
              <div className={exanCss.line_value} onClick={onOpenImage}>
                {
                  Array.isArray(exan) ? (
                    exan.find(r => r.element_id.includes('leftLeg'))?.element_id
                  ) :
                    0
                }
              </div>
              <div className={exanCss.line}></div>
            </div> :
            null
        }
        {
          organ.includes('leftFoot') ?
            <div className={exanCss.leftFoot}>
              <div className={exanCss.line_value} onClick={onOpenImage}>
                {
                  Array.isArray(exan) ? (
                    exan.find(r => r.element_id.includes('leftFoot'))?.element_id
                  ) :
                    0
                }
              </div>
              <div className={exanCss.line}></div>
            </div> :
            null
        }
        {
          organ.includes('chest') ?
            <div className={exanCss.chest}>
              <div className={exanCss.line_value} onClick={onOpenImage}>
                {
                  Array.isArray(exan) ? (
                    exan.find(r => r.element_id.includes('chest'))?.element_id
                  ) :
                    0
                }
              </div>
              <div className={exanCss.line_second}></div>
            </div> :
            null
        }
        {
          organ.includes('stomach') ?
            <div className={exanCss.stomach}>
              <div className={exanCss.line_second}></div>
              <div className={exanCss.line_value} onClick={onOpenImage}>
                {
                  Array.isArray(exan) ? (
                    exan.find(r => r.element_id.includes('stomach'))?.element_id
                  ) :
                    0
                }
              </div>
            </div> :
            null
        }
      </div>

      {
        load ?
          <Loadding /> :
          null
      }

    </>
  )

}
