วิธีการใช้งาน
  -ใช้งานแบบปกติ(Manual) 
    - ไปที่พาท src/configs/environment.dev.ts แก้ไข จากเดิม baseUrl: 'https://ems.monitor-test.cloud/v1' เปลี่ยนเป็น "http://localhost:3333/v1"
    - พิมพ์คำสั้ง npm i
    - พิมพ์คำสั้ง npm run dev
    - ให้เข้า path http://localhost:3000
  -ใช้งานผ่าน docker
    - พิมพ์คำสั้ง docker compose docker-compose.build.yml -d up 
    - พิมพ์คำสั้ง docker compose docker-compose.yml -d up app
    - ให้เข้า path http://localhost:3000

  -login coushDb
    - พิมพ์คำสั่ง curl -X GET http://admin:admin@localhost:5984/sar_local_db
    - เข้าหน้าฐานข้มูล http://localhost:5984/_utils/#

    npm install --legacy-peer-deps
