'use client';
import React, { useState } from 'react';
import './monitor.css';
import { OrderTranfer } from '@/models/order_tranfer.model'; 
import SubMonitor from './SubMonitor';
import { OrderContext } from '@/contexts/order.context';
import { Monitorchart } from '@/data/monitor.data';



const Page: React.FC = () => {
  const [order, setOrder] = useState<OrderTranfer[]>([]);

  return (
    <OrderContext.Provider value={{ order, setOrder }}>
      <div className="bodyHomeChart">
        <div className="monitorChart">
          {Monitorchart.map((r, i) => (
            <SubMonitor key={i} el_id={r.el_id} index={i} />
          ))}
        </div>
      </div>
    </OrderContext.Provider>
  );
}

export default Page; 
