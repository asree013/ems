'use client';
import React, { useContext, useEffect, useState } from 'react';
import CreateMonitor from './CreateMonitor';
import ChartEcg from './ChartEcg';
import {
  createOrderTranfer,
  findAllOrderTranfer,
} from '@/services/order_tranfer.service';
import { CreateOrder } from '@/models/order_tranfer.model';
import { useRouter } from 'next/navigation';
import { toast } from '@/services/alert.service';
import { TOrderContext, OrderContext } from '@/contexts/order.context';
import MonitorItem from './MonitorItem';

type Props = {
  el_id: number;
  index: number;
};

export default function SubMonitor({ el_id, index }: Props) {
  const { order, setOrder } = useContext<TOrderContext>(OrderContext);
  const router = useRouter();
  const [orderTranfer, setOrderTranfer] = useState<number[]>([]);
  const [orderId, setOrderId] = useState<string>('');
  const [isLoad, setisLoad] = useState(false);

  async function onReturnCreateMonitor(el_id: number, device_id: string) {
    try {
      const c = {} as CreateOrder;
      c.device_id = device_id;
      c.element_seq = el_id;
      await createOrderTranfer(c);
      toast('Add Monitor', 'success');
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    async function onFeedOrder() {
      setisLoad(true);
      try {
        const result = await findAllOrderTranfer();
        const sot = result.filter(
          (r) => r.element_seq === el_id && r.status_order === 'Transfer',
        );

        setOrder(sot);
        const or = result.filter((r) => r.status_order === 'Transfer');
        const a = or.find(r => r.element_seq === el_id)
        if (a) {
          setOrderId(a.id)
          setOrderTranfer(or.map((r) => r.element_seq));

        }
      } catch (error: any) {
        if (error.message.includes('Network Error')) {
          router.push('/login');
        }
      } finally {
        setisLoad(false);
      }
    }

    onFeedOrder();
  }, [el_id, router, setOrder]);

  function onChangeDeleteDevices(id: string) {
    console.log('Update OrderTranfer', id);
  }

  if (orderTranfer.includes(el_id)) {
    return (
      <>
        <MonitorItem order_id={orderId} el_id={el_id} key={index} />
      </>
    );
  } else {
    return (
      <>
        <CreateMonitor
          key={index}
          el_id={el_id}
          returnMonitor={onReturnCreateMonitor}
        />
      </>
    );
  }
}
