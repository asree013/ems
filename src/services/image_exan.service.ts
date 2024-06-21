import { ImageExan } from '@/models/exan.model';
import { endpoint } from './endpoint.service';
import { enviromentDev } from '@/config/enviroment.dev';

export function createImageExan(
  history_id: string,
  exan_id: string,
  data: ImageExan,
) {
  try {
    return endpoint.post<ImageExan>(
      `${enviromentDev.history}/${history_id}${enviromentDev.exan}/${exan_id}/add-image`,
      data,
    );
  } catch (error) {
    throw error;
  }
}

// export function findImageByExanId() {

// }
