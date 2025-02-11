'use client';
import React, { useContext, useEffect, useState } from 'react';
import { BodyComponent } from 'reactjs-human-body';
import { useRouter } from 'next/navigation';

import { TypeOpenExanContext, OpenExanImage } from '@/contexts/openExanImage.context';
import styled from 'styled-components';
import { NIL } from 'uuid';

interface ChildProps {
  onChangeData: (data: string) => void;
  organ: string[];
}

const Styled = styled.div`
//   .bodyHuman{
//     position: absolute;
//     top: 30%;
// }

// @media only screen and (max-width: 1025px) {
//     .bodyHuman{
//         position: fixed;
//         top: 20%;
//     }
// }
`

export default function BodyHuman({ onChangeData, organ }: ChildProps) {
  const router = useRouter();

  const { open, setOpen } =
    useContext<TypeOpenExanContext>(OpenExanImage);

  const organResult = {
    head: {
      show: true,
      selected: Boolean(organ.find((r) => r.includes('head'))),
    },
    leftArm: {
      show: true,
      selected: Boolean(organ.find((r) => r.includes('leftArm'))),
    },
    chest: {
      show: true,
      selected: Boolean(organ.find((r) => r.includes('chest'))),
    },
    leftFoot: {
      show: true,
      selected: Boolean(organ.find((r) => r.includes('leftFoot'))),
    },
    leftHand: {
      show: true,
      selected: Boolean(organ.find((r) => r.includes('leftHand'))),
    },
    leftLeg: {
      show: true,
      selected: Boolean(organ.find((r) => r.includes('leftLeg'))),
    },
    leftShoulder: {
      show: true,
      selected: Boolean(organ.find((r) => r.includes('leftShoulder'))),
    },
    rightArm: {
      show: true,
      selected: Boolean(organ.find((r) => r.includes('rightArm'))),
    },
    rightFoot: {
      show: true,
      selected: Boolean(organ.find((r) => r.includes('rightFoot'))),
    },
    rightHand: {
      show: true,
      selected: Boolean(organ.find((r) => r.includes('rightHand'))),
    },
    rightLeg: {
      show: true,
      selected: Boolean(organ.find((r) => r.includes('rightLeg'))),
    },
    rightShoulder: {
      show: true,
      selected: Boolean(organ.find((r) => r.includes('rightShoulder'))),
    },
    stomach: {
      show: true,
      selected: Boolean(organ.find((r) => r.includes('stomach'))),
    },
  };

  function showBodyPart(element_id: string) {
    router.push('exan/'+ NIL+ '?el_id='+ element_id);
    onChangeData(element_id);
    // router.refresh();
  }
  return (
    <Styled>
      <div className={'bodyHuman'} style={{zIndex: 0, position: 'relative', cursor: 'pointer'}}>
        <BodyComponent
          partsInput={organResult}
          onClick={(e: string) => showBodyPart(e)}
        />
      </div>
    </Styled>
  );
}
