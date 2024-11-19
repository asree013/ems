// components/Clock.tsx
import { useState, useEffect } from 'react';

const Clock: React.FC = () => {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formattedTime = now.toLocaleTimeString('th-TH', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
      setTime(formattedTime);
    };

    updateTime(); // อัปเดตเวลาครั้งแรกทันที
    const interval = setInterval(updateTime, 1000); // อัปเดตทุกๆ 1 วินาที

    return () => clearInterval(interval); // ลบ interval เมื่อ component ถูก unmount
  }, []);

  return <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{time}</p>;
};

export default Clock;
