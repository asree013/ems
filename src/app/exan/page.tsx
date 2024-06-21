'use client';
import React, { useState } from 'react';
import exan from './exan.module.css';
import BodyHuman from '../../components/BodyHuman';
export default function Page() {
  const [value, setValue] = useState<string[]>([
    'head',
    'rightShoulder',
    'rightArm',
    'rightHand',
    'rightLeg',
    'rightFoot',
    'leftShoulder',
    'leftArm',
    'leftHand',
    'leftLeg',
    'leftFoot',
    'chest',
    'stomach',
  ]);

  async function setParamBody(txt: string) {
    if (txt) {
      // router.push(`/patient/${patien_id}/history/${params.history_id}/exan/${nil}?el_id=${txt}`)
    }
  }
  return (
    <>
      <div className={exan.home_body}>
        <BodyHuman
          onChangeData={setParamBody}
          organ={value}
          key={value.length}
        />
        {value.includes('head') ? (
          <div className={exan.head}>
            <div className={exan.line}></div>
            <div className={exan.line_value} onClick={() => alert('head')}>
              3
            </div>
          </div>
        ) : null}
        {value.includes('rightShoulder') ? (
          <div className={exan.rightShoulder}>
            <div className={exan.line}></div>
            <div
              className={exan.line_value}
              onClick={() => alert('rightShoulder')}
            >
              2
            </div>
          </div>
        ) : null}
        {value.includes('rightArm') ? (
          <div className={exan.rightArm}>
            <div className={exan.line}></div>
            <div
              className={exan.line_value}
              onClick={() => alert('rightShoulder')}
            >
              5
            </div>
          </div>
        ) : null}
        {value.includes('rightHand') ? (
          <div className={exan.rightHand}>
            <div className={exan.line}></div>
            <div
              className={exan.line_value}
              onClick={() => alert('rightShoulder')}
            >
              1
            </div>
          </div>
        ) : null}
        {value.includes('rightLeg') ? (
          <div className={exan.rightLeg}>
            <div className={exan.line}></div>
            <div
              className={exan.line_value}
              onClick={() => alert('rightShoulder')}
            >
              1
            </div>
          </div>
        ) : null}
        {value.includes('leftFoot') ? (
          <div className={exan.rightFoot}>
            <div className={exan.line}></div>
            <div
              className={exan.line_value}
              onClick={() => alert('rightShoulder')}
            >
              1
            </div>
          </div>
        ) : null}
        {value.includes('leftShoulder') ? (
          <div className={exan.leftShoulder}>
            <div
              className={exan.line_value}
              onClick={() => alert('leftShoulder')}
            >
              2
            </div>
            <div className={exan.line}></div>
          </div>
        ) : null}
        {value.includes('leftArm') ? (
          <div className={exan.leftArm}>
            <div className={exan.line_value} onClick={() => alert('leftArm')}>
              5
            </div>
            <div className={exan.line}></div>
          </div>
        ) : null}
        {value.includes('leftHand') ? (
          <div className={exan.leftHand}>
            <div className={exan.line_value} onClick={() => alert('leftHand')}>
              1
            </div>
            <div className={exan.line}></div>
          </div>
        ) : null}
        {value.includes('leftLeg') ? (
          <div className={exan.leftLeg}>
            <div className={exan.line_value} onClick={() => alert('leftLeg')}>
              1
            </div>
            <div className={exan.line}></div>
          </div>
        ) : null}
        {value.includes('leftFoot') ? (
          <div className={exan.leftFoot}>
            <div className={exan.line_value} onClick={() => alert('leftFoot')}>
              1
            </div>
            <div className={exan.line}></div>
          </div>
        ) : null}
        {value.includes('chest') ? (
          <div className={exan.chest}>
            <div className={exan.line_value} onClick={() => alert('chest')}>
              1
            </div>
            <div className={exan.line_second}></div>
          </div>
        ) : null}
        {value.includes('stomach') ? (
          <div className={exan.stomach}>
            <div className={exan.line_second}></div>
            <div className={exan.line_value} onClick={() => alert('stomach')}>
              1
            </div>
          </div>
        ) : null}
      </div>
    </>
  );

  function renderValue() {}
}
