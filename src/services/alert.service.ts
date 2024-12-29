import styled from 'styled-components';
import Swal from 'sweetalert2';

export function toast(txt: string, icons: any, time?: number) {
  if (!time) {
    time = 5000;
  }
  const Toast = Swal.mixin({
    toast: true,
    position: 'bottom',
    showConfirmButton: false,
    timer: time,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
    customClass: {
      popup: 'z-50'
    }
  });
  return Toast.fire({
    icon: icons,
    title: txt,
  });
}

export function comfirm() {}
