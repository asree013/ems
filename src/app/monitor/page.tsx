'use client';
import React, { createContext, useState } from 'react';
import './monitor.css';
import SubMonitor from './SubMonitor';
import { OrderTranfer } from '@/models/order_tranfer.model';

export type TOrderContext = {
  order: OrderTranfer[];
  setOrder: React.Dispatch<React.SetStateAction<OrderTranfer[]>>;
};

export const OrderContext = createContext<TOrderContext>({} as TOrderContext);

export const chart: { el_id: number }[] = [
  { el_id: 1 },
  { el_id: 2 },
  { el_id: 3 },
  { el_id: 4 },
  { el_id: 5 },
  { el_id: 6 },
  { el_id: 7 },
  { el_id: 8 }
];

export default function Page() {
  const [order, setOrder] = useState<OrderTranfer[]>([]);

  return (
    <OrderContext.Provider value={{ order, setOrder }}>
      <div style={{ display: "flex", alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        <div className="bodyHomeChart">
          <div className="monitorChart">
            {chart.map((r, i) => (
              <SubMonitor key={i} el_id={r.el_id} index={i} />
            ))}
          </div>
        </div>
      </div>
    </OrderContext.Provider>
  );
}
