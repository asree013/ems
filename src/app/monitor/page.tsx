// pages/monitor.tsx (เปลี่ยนชื่อไฟล์จาก page.tsx เป็น monitor.tsx)
'use client'
import React, { useState } from 'react';
import './monitor.css';
import { OrderTranfer } from '@/models/order_tranfer.model'; // ปรับเปลี่ยนเส้นทางตามโครงสร้างโปรเจกต์ของท่าน
import SubMonitor from './SubMonitor';
import { OrderContext } from '@/contexts/order.context';


const chart: { el_id: number }[] = [
  { el_id: 1 },
  { el_id: 2 },
  { el_id: 3 },
  { el_id: 4 },
  { el_id: 5 },
  { el_id: 6 },
];

const Page: React.FC = () => { // กำหนดให้เป็น React.FC (Functional Component) และตั้งชื่อเป็น MonitorPage

  const [order, setOrder] = useState<OrderTranfer[]>([]);

  return (
    <OrderContext.Provider value={{ order, setOrder }}>
      <>
        <div className="bodyHomeChart">
          <div className="monitorChart">
            {chart.map((r, i) => (
              <SubMonitor key={i} el_id={r.el_id} index={i} />
            ))}
          </div>
        </div>
      </>
    </OrderContext.Provider>
  );
}

export default Page; // ส่งออก MonitorPage ให้ Next.js ได้ใช้เป็นหน้าเว็บ