'use client'
import React, { useEffect, useState } from 'react'
import { socket } from '@/config/socket'

export default function page() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState([]);

  useEffect(() => {
    function onConnect() {
      console.log('connect');
      
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onFooEvent(value: any) {
      console.log("value: ", value);
      
      setFooEvents([...fooEvents,]);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('pong', onFooEvent);

    return () => {
      socket.off('connect', onConnect);
      socket.emit('ping', JSON.stringify({id: 123, name: 'hisamß'}))
      socket.off('disconnect', onDisconnect);
      socket.off('pong', onFooEvent);
    };
  }, []);

  return (
    <div >
      {
        isConnected === true ?
        <p>connect</p>
        : <p>no connect</p>
      }
    </div>
  );
}

