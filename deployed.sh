#!/bin/bash

set -e  # หยุดทำงานเมื่อเกิดข้อผิดพลาด

# git add .
# git commit -m "update"
# git push origin/main 

echo "เริ่มการ build เพื่อ deploy"
echo "กำลังลบโฟลเดอร์ public/_next ที่ใช้ generate ใหม่..."
rm -rf public/_next

echo ""
echo "ลบ container, network ที่ไม่จำเป็น..."
# ลบ container และ network ที่ไม่ได้ใช้งาน
docker system prune --volumes -f  # ลบ volumes ด้วยเพื่อเคลียร์พื้นที่

echo ""
echo "ลบเฉพาะ dangling images ที่ไม่ได้ใช้งาน..."
# ลบ image ที่ไม่มี tag (dangling images)
docker image prune -f

echo ""
echo "สร้าง Docker image โดยใช้ cache เพื่อลดเวลา..."
# ใช้ cache ในการ build docker image เพื่อลดเวลา
docker compose -f docker.compose.build.yml build --pull --no-cache=false

echo ""
echo "build เสร็จสิ้น.... กำลัง push Docker image ถ้าจำเป็น..."
# ตรวจสอบว่ามีการเปลี่ยนแปลง image หรือไม่ ก่อนทำการ push
docker compose -f docker.compose.build.yml push


echo ""
echo "ดำเนินการเสร็จสิ้น!"
