import { Historys } from '@/models/history.model';

export interface Exans {
  element_id: string;
  text: string;
  create_date: string;
  update_date: string;
  history_id: string;
  user_create_id: string;
  user_update_id: string;
}

export interface ExanShows {
  id: string;
  element_id: string;
  text: string;
  create_date: string;
  update_date: string;
  history_id: string;
  user_create_id: string;
  user_update_id: string;
  History: Historys;
  ImageExan: ImageExan[];
  _count: {
    ImageExan: number;
  };
}

export interface ImageExan {
  id: string;
  src: string;
  name: string;
  create_date: string;
  update_date: string;
  exan_id: string;
  user_create_id: string;
  user_update_id: string;
}
