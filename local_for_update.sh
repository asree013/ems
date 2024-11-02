set -e 

echo ""
echo "เริ่มการอัพเดท"
echo ""
echo "หยุดการทำงาน...."
echo ""
docker compose down

docker compose pull

echo ""
echo "การอัพเดทเสร็จสิ้น"
echo ""

docker compose up -d

echo "ลบ Images ที่ไม่ใช้งาน..."
docker image prune -a -f

echo "ลบ Containers ที่ไม่ใช้งาน..."
docker container prune -f

echo "ลบ Local Volumes ที่ไม่ใช้งาน..."
docker volume prune -f

echo ""
echo "ระบบพร้อมใช่งาน"
echo ""