'use client';
import { findOrderTranferByOrderId } from '@/services/order_tranfer.service';
import React from 'react';
import './monitor_id.css';
import Loadding from '@/components/Loadding';
import Monitor_id_detail from './Monitor_id_detail';
import { OrderTranfer } from '@/models/order_tranfer.model';

type Props = {
  params: {
    monitor_id: string;
  };
};

export default function page({ params }: Props) {
  const [isload, setIsload] = React.useState(false);
  const [order, setOrder] = React.useState<OrderTranfer>({} as OrderTranfer);

  React.useEffect(() => {
    async function feedOrderTranfer() {
      setIsload(true);
      try {
        const result = await findOrderTranferByOrderId(params.monitor_id);
        setOrder(result.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsload(false);
      }
    }

    feedOrderTranfer();
  }, []);
  return (
    <>
      {isload ? (
        <Loadding />
      ) : (
        <div className="monitor_id_home">
          <div className="monitor_id_detail">
            <h1 color="white">monitorId {params.monitor_id}</h1>
            <Monitor_id_detail patient_id={order.patient_id} />
          </div>
        </div>
      )}
    </>
  );
}
