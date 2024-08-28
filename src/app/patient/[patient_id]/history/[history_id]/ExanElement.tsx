'use client';
import BodyHuman from '@/components/BodyHuman';
import React, { useContext, useState } from 'react';
import exanCss from './exan.module.css';
import { useParams, useRouter } from 'next/navigation';
import { NIL } from 'uuid';
import { ExanShows, Exans } from '@/models/exan.model';
import Loadding from '@/components/Loadding';
import { TypeElIDContext, ElIdExanImage } from '@/contexts/elIdExanImage.context';
import { TypeOpenExanContext, OpenExanImage } from '@/contexts/openExanImage.context';

type Props = {
  organ: string[];
  exan: ExanShows[];
};

export default function ExanElement({ organ, exan }: Props) {
  const router = useRouter();
  const patient_id = useParams().patient_id;
  const history_id = useParams().history_id;
  const [load, setLoad] = useState<boolean>(false);

  const { open, setOpen } =
    useContext<TypeOpenExanContext>(OpenExanImage);
  const { el_id, setEl_id } = useContext<TypeElIDContext>(ElIdExanImage);
  async function setParamBody(txt: string) {
    if (txt) {
      router.push(
        `/patient/${patient_id}/history/${history_id}/exan/${NIL}?el_id=${txt}`,
      );
      setLoad(true);
    }
  }

  function onOpenImage(el_id: string) {
    setOpen(true);
    setEl_id(el_id);
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
        <BodyHuman
          onChangeData={setParamBody}
          organ={organ}
          key={organ.length}
        />
        {organ.includes('head') ? (
          <div className={exanCss.head}>
            <div className={exanCss.line}></div>
            <div
              className={exanCss.line_value}
              onClick={() => onOpenImage('head')}
            >
              {
                exan.find((r) => r.element_id.includes('head'))?._count
                  .ImageExan
              }
            </div>
          </div>
        ) : null}
        {organ.includes('rightShoulder') ? (
          <div className={exanCss.rightShoulder}>
            <div className={exanCss.line}></div>
            <div
              className={exanCss.line_value}
              onClick={() => onOpenImage('rightShoulder')}
            >
              {
                exan.find((r) => r.element_id.includes('rightShoulder'))?._count
                  .ImageExan
              }
            </div>
          </div>
        ) : null}
        {organ.includes('rightArm') ? (
          <div className={exanCss.rightArm}>
            <div className={exanCss.line}></div>
            <div
              className={exanCss.line_value}
              onClick={() => onOpenImage('rightArm')}
            >
              {
                exan.find((r) => r.element_id.includes('rightArm'))?._count
                  .ImageExan
              }
            </div>
          </div>
        ) : null}
        {organ.includes('rightHand') ? (
          <div className={exanCss.rightHand}>
            <div className={exanCss.line}></div>
            <div
              className={exanCss.line_value}
              onClick={() => onOpenImage('rightHand')}
            >
              {
                exan.find((r) => r.element_id.includes('rightHand'))?._count
                  .ImageExan
              }
            </div>
          </div>
        ) : null}
        {organ.includes('rightLeg') ? (
          <div className={exanCss.rightLeg}>
            <div className={exanCss.line}></div>
            <div
              className={exanCss.line_value}
              onClick={() => onOpenImage('rightLeg')}
            >
              {
                exan.find((r) => r.element_id.includes('rightLeg'))?._count
                  .ImageExan
              }
            </div>
          </div>
        ) : null}
        {organ.includes('rightFoot') ? (
          <div className={exanCss.rightFoot}>
            <div className={exanCss.line}></div>
            <div
              className={exanCss.line_value}
              onClick={() => onOpenImage('rightFoot')}
            >
              {
                exan.find((r) => r.element_id.includes('rightFoot'))?._count
                  .ImageExan
              }
            </div>
          </div>
        ) : null}
        {organ.includes('leftShoulder') ? (
          <div className={exanCss.leftShoulder}>
            <div
              className={exanCss.line_value}
              onClick={() => onOpenImage('leftShoulder')}
            >
              {
                exan.find((r) => r.element_id.includes('leftShoulder'))?._count
                  .ImageExan
              }
            </div>
            <div className={exanCss.line}></div>
          </div>
        ) : null}
        {organ.includes('leftArm') ? (
          <div className={exanCss.leftArm}>
            <div
              className={exanCss.line_value}
              onClick={() => onOpenImage('leftArm')}
            >
              {
                exan.find((r) => r.element_id.includes('leftArm'))?._count
                  .ImageExan
              }
            </div>
            <div className={exanCss.line}></div>
          </div>
        ) : null}
        {organ.includes('leftHand') ? (
          <div className={exanCss.leftHand}>
            <div
              className={exanCss.line_value}
              onClick={() => onOpenImage('leftHand')}
            >
              {
                exan.find((r) => r.element_id.includes('leftHand'))?._count
                  .ImageExan
              }
            </div>
            <div className={exanCss.line}></div>
          </div>
        ) : null}
        {organ.includes('leftLeg') ? (
          <div className={exanCss.leftLeg}>
            <div
              className={exanCss.line_value}
              onClick={() => onOpenImage('leftLeg')}
            >
              {
                exan.find((r) => r.element_id.includes('leftLeg'))?._count
                  .ImageExan
              }
            </div>
            <div className={exanCss.line}></div>
          </div>
        ) : null}
        {organ.includes('leftFoot') ? (
          <div className={exanCss.leftFoot}>
            <div
              className={exanCss.line_value}
              onClick={() => onOpenImage('leftFoot')}
            >
              {
                exan.find((r) => r.element_id.includes('leftFoot'))?._count
                  .ImageExan
              }
            </div>
            <div className={exanCss.line}></div>
          </div>
        ) : null}
        {organ.includes('chest') ? (
          <div className={exanCss.chest}>
            <div
              className={exanCss.line_value}
              onClick={() => onOpenImage('chest')}
            >
              {
                exan.find((r) => r.element_id.includes('chest'))?._count
                  .ImageExan
              }
            </div>
            <div className={exanCss.line_second}></div>
          </div>
        ) : null}
        {organ.includes('stomach') ? (
          <div className={exanCss.stomach}>
            <div className={exanCss.line_second}></div>
            <div
              className={exanCss.line_value}
              onClick={() => onOpenImage('stomach')}
            >
              {
                exan.find((r) => r.element_id.includes('stomach'))?._count
                  .ImageExan
              }
            </div>
          </div>
        ) : null}
      </div>

      {load ? <Loadding /> : null}
    </>
  );
}
