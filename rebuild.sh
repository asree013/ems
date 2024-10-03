set -e

echo "เริ่มการ re build"
echo ""
echo "ลบ public/_next"
echo ""

rm -rf public/_next

echo "ลบ public/_next สำเร็จ"
echo "ทำการ build"

npm run build
echo ""
echo "build เสร็จสิ้น"

