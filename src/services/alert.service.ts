import { Confirm } from 'notiflix';
import Swal from 'sweetalert2';

export function toast(txt: string, icons: any, time?: number) {
  if (!time) {
    time = 5000;
  }
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-right',
    showConfirmButton: false,
    timer: time,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });
  return Toast.fire({
    icon: icons,
    title: txt,
  });
}

export function comfirm() {}
