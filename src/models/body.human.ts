export interface BodyHumans {
  head: OptionBody;
  leftShoulder: OptionBody;
  rightShoulder: OptionBody;
  leftArm: OptionBody;
  rightArm: OptionBody;
  chest: OptionBody;
  stomach: OptionBody;
  leftLeg: OptionBody;
  rightLeg: OptionBody;
  rightHand: OptionBody;
  leftHand: OptionBody;
  leftFoot: OptionBody;
  rightFoot: OptionBody;
}

export interface OptionBody {
  selected?: boolean;
  show?: boolean;
}
