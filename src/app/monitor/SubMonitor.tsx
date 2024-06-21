'use client';
import React, { useContext, useEffect, useState } from 'react';
import CreateMonitor from './CreateMonitor';
import ChartEcg from './ChartEcg';
import {
  createOrderTranfer,
  findAllOrderTranfer,
} from '@/services/order_tranfer.service';
import { CreateOrder, OrderTranfer } from '@/models/order_tranfer.model';
import { useRouter } from 'next/navigation';
import { toast } from '@/services/alert.service';
import { signal } from '@preact/signals-core';
import { OrderContext, TOrderContext } from './page';

type props = {
  el_id: number;
  index: number;
};

export default function SubMonitor({ el_id, index }: props) {
  const { order, setOrder } = useContext<TOrderContext>(OrderContext);
  const router = useRouter();
  // const [order, setOrder] = useState<number[]>([])
  const [orderTranfer, setOrderTranfer] = useState<number[]>([]);
  const [isLoad, setisLoad] = useState(false);

  async function onReturnCreateMonitor(el_id: number, device_id: string) {
    try {
      const c = {} as CreateOrder;
      c.device_id = device_id;
      c.element_seq = el_id;
      const result = await createOrderTranfer(c);
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
        setOrderTranfer(or.map((r) => r.element_seq));
      } catch (error: any) {
        if (error.message.includes('Network Error')) {
          router.push('/login');
        }
      } finally {
        setisLoad(false);
      }
    }

    onFeedOrder();
  }, []);

  function onChangeDeleteDevices(id: string) {
    console.log('Update OrderTranfer', id);
  }
  if (orderTranfer.includes(el_id)) {
    return (
      <>
        <ChartEcg
          key={index}
          orderTranFer={order}
          el_id={el_id}
          index={index}
          onChangeDeleteDeviceID={onChangeDeleteDevices}
        />
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
