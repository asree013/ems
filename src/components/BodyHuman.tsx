'use client';
import React, { useContext, useEffect, useState } from 'react';
import { BodyComponent } from 'reactjs-human-body';
import { useRouter } from 'next/navigation';
import { BodyHumans } from '@/models/body.human.module';

import bodyHumanCss from './styles/BodyHuman.module.css';
import { TypeOpenExanContext, OpenExanImage } from '@/contexts/openExanImage.context';

interface ChildProps {
  onChangeData: (data: string) => void;
  organ: string[];
}

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
    router.push('');
    onChangeData(element_id);
    // router.refresh();
  }
  return (
    <div className={bodyHumanCss.body}>
      <BodyComponent
        partsInput={organResult}
        onClick={(e: string) => showBodyPart(e)}
      />
    </div>
  );
}
