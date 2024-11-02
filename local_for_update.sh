set -e 

echo ""
echo "เริ่มการอัพเดท"
echo ""
echo "หยุดการทำงาน...."
echo ""
sudo docker compose down

sudo docker compose pull

echo ""
echo "การอัพเดทเสร็จสิ้น"
echo ""

sudo docker compose up -d

echo "ลบ Images ที่ไม่ใช้งาน..."
sudo docker image prune -a -f

echo "ลบ Containers ที่ไม่ใช้งาน..."
sudo docker container prune -f

echo "ลบ Local Volumes ที่ไม่ใช้งาน..."
sudo docker volume prune -f

echo ""
echo "ระบบพร้อมใช่งาน"
echo ""