'use client'
import React, { useEffect, useState } from 'react';
import { findOrderTranferByOrderId } from '@/services/order_tranfer.service';
import './monitor_id.css';
import Loadding from '@/components/Loadding';
import { OrderTranfer } from '@/models/order_tranfer.model';
import Monitor_id_detail from './Monitor_id_detail';

type Props = {
  params: {
    monitor_id: string;
  };
};

export default function Page({ params }: Props) {
  const [isLoad, setIsLoad] = useState(false);
  const [order, setOrder] = useState<OrderTranfer>({} as OrderTranfer);

  useEffect(() => {
    async function fetchOrderTranfer() {
      setIsLoad(true);
      try {
        const result = await findOrderTranferByOrderId(params.monitor_id);
        setOrder(result.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoad(false);
      }
    }

    fetchOrderTranfer();
  }, [params.monitor_id]);

  return (
    <>
      {isLoad ? (
        <Loadding />
      ) : (
        <div className="monitor_id_home">
          <div className="monitor_id_detail">
            <h1 style={{ color: 'white' }}>monitorId {params.monitor_id}</h1>
            <Monitor_id_detail patient_id={order.patient_id} />
          </div>
        </div>
      )}
    </>
  );
}
