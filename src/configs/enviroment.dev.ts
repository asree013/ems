const isBrowser = typeof window !== 'undefined';
let newUrl: string = '';
function onAssignWindow() {
  if(isBrowser){
    newUrl = window.location.protocol + '//' +window.location.host.split(':')[0] + ':3333/v1'
  }
}

onAssignWindow()
export const enviromentDev = {
  myUrl: process.env,
  baseUrl: 'https://api-ems.m-mert.com/v1',
  baseUrl_base_v1: 'https://api-ems.m-mert.com/v1',
  baseUrl_base_v2: 'https://api-ems.m-mert.com/v2',
  baseUrl_base_onLine: 'https://api-ems.m-mert.com/v1',
  localUrl: newUrl,
  patient: '/patient',
  login: '/login',
  device: '/device',
  orderTranfer: '/order',
  auth: '/auth',
  history: '/history',
  exan: '/exan',
  keyGoogleApi: "AIzaSyApM9zSMh9ZSP3LInOHZ3YGWkrnthaZz-U",
  keyGoogleDev: "AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg",
  mission: '/missions',
  user: '/users',
  chat: '/chat',
  room: '/rooms',
  car: '/car',
  ship: '/ship',
  helicopter: '/helicopter',
  noImage: 'https://us.123rf.com/450wm/koblizeek/koblizeek2208/koblizeek220800254/190563481-no-image-vector-symbol-missing-available-icon-no-gallery-for-this-moment-placeholder.jpg',
  upload_image: 'https://storage.m-mert.com/storage',
  communicate: '/communication',
  respository: '/responsibility',
  typeShip: '/type_ship',
};

export const enviromentPath = {
  noImage:
    'https://banffventureforum.com/wp-content/uploads/2019/08/no-photo-icon-22.png',
};
