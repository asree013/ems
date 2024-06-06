import React, { useEffect, useState } from 'react'
import { BodyComponent,  } from "reactjs-human-body";
import { useRouter } from 'next/navigation';
import { BodyHumans } from '@/models/body.human';


interface ChildProps {
  onChangeData: (data: string) => void;
  organ: string[]
}

export default function BodyHuman({onChangeData, organ}: ChildProps) {

  const router = useRouter()
  
  const [organResult, setOrganResult] = useState<BodyHumans>({
    head: { show: true, selected: Boolean(organ.find(r => r.includes('head')))},
    leftArm: { show: true, selected: Boolean (organ.find(r => r.includes('leftArm')))},
    chest: { show: true, selected: Boolean (organ.find(r => r.includes('chest')))},
    leftFoot: { show: true, selected: Boolean (organ.find(r => r.includes('leftFoot')))},
    leftHand: { show: true, selected: Boolean (organ.find(r => r.includes('leftHand')))},
    leftLeg: { show: true, selected: Boolean (organ.find(r => r.includes('leftLeg')))},
    leftShoulder: { show: true, selected: Boolean (organ.find(r => r.includes('leftShoulder')))},
    rightArm: { show: true, selected: Boolean (organ.find(r => r.includes('rightArm')))},
    rightFoot: { show: true, selected: Boolean (organ.find(r => r.includes('rightFoot')))},
    rightHand: { show: true, selected: Boolean (organ.find(r => r.includes('rightHand')))},
    rightLeg: { show: true, selected: Boolean (organ.find(r => r.includes('rightLeg')))},
    rightShoulder: { show: true, selected: Boolean (organ.find(r => r.includes('rightShoulder')))},
    stomach: { show: true, selected: Boolean (organ.find(r => r.includes('stomach')))},
  })
  
  useEffect(() => {
    if(organ) {
      console.log('body: ',organ);
    }
    return () => {

    }
  }, [])

  function showBodyPart(element_id: string) {
    alert(element_id)
    onChangeData(element_id);
    router.refresh();
  }
  return (
        <div className="body_human_com">
          <BodyComponent 
            partsInput={organResult}
            onClick={(e:string) => showBodyPart(e)}
          />
        </div>
  )
}
