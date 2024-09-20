# set -e ใช้สำหรับเช็ค ให้หยุดทำงานเมื่อมี err
set -e

git add .
git commit -m "update"
git push origin 

echo "เริมการ build เพื่อ deploy"
echo "กำลังลบโฟลเดอร์ public/_next ..."
echo ""
echo ""
# rm -rf public/_next สั่งให้ลบ folder public/_next
rm -rf public/_next
echo ""
echo "กำลังสร้าง Docker image ..."
echo ""
# สั่ง build docker docker.compose.build.yml
docker compose -f docker.compose.build.yml build 

echo ""
echo "build เสร็จสิ้น.... กำลัง push Docker image ขึ้น hub ..."
echo ""
# สั่ง push docker docker.compose.build.yml ขึ้น hub

docker compose -f docker.compose.build.yml push 
echo ""
echo "ดำเนินการเสร็จสิ้น!"
echo ""
