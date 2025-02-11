import { ExanShows, Exans } from '@/models/exan.model';
import { endpoint } from './endpoint.service';
import { enviromentDev } from '@/configs/enviroment.dev';

export function createExam(item: Exans) {
  try {
    return endpoint.post<ExanShows>(
      `${enviromentDev.patient}/${item.patient_id}${enviromentDev.exan}`,
      item,
    );
  } catch (error) {
    throw error;
  }
}

export function findExamByPatientId(patient_id: string) {
  return endpoint.get<ExanShows[]>(
    `${enviromentDev.patient}/${patient_id}${enviromentDev.exan}`,
  );
}

export function findExanByHistoryId(history_id: string) {
  try {
    return endpoint.get<ExanShows[]>(
      `${enviromentDev.history}/${history_id}${enviromentDev.exan}`,
    );
  } catch (error) {
    throw error;
  }
}

export function findExanByExanId(history_id: string, exan_id: string) {
  try {
    return endpoint.get<ExanShows>(
      `${enviromentDev.history}/${history_id}${enviromentDev.exan}/${exan_id}`,
    );
  } catch (error) {
    throw error;
  }
}

export function updateExanByExanId(
  history_id: string,
  exan_id: string,
  data: ExanShows,
) {
  try {
    return endpoint.put<ExanShows>(
      `${enviromentDev.history}/${history_id}${enviromentDev.exan}/${exan_id}`,
      data,
    );
  } catch (error) {
    throw error;
  }
}

export function convertStringToThai(str: string) {
  switch (true) {
    case !str:
      return;
    case str.includes('head'):
      return 'หัว';
    case str.includes('leftShoulder'):
      return 'ไหล่ขวา';
    case str.includes('rightShoulder'):
      return 'ไหล่ซ้าย';
    case str.includes('leftArm'):
      return 'แขนขวา';
    case str.includes('rightArm'):
      return 'แขนซ้าย';
    case str.includes('chest'):
      return 'หน้าอก';
    case str.includes('stomach'):
      return 'ท้อง และหลัง';
    case str.includes("leftLeg"):
      return 'ขาขวา';
    case str.includes("rightLeg"):
      return 'ขาซ้าย';
    case str.includes("rightHand"):
      return 'มือซ้าย';
    case str.includes("leftHand"):
      return 'มือขวา';
    case str.includes("leftFoot"):
      return 'เท้าขวา';
    case str.includes("rightFoot"):
      return 'เท้าซ้าย';
  }
}
