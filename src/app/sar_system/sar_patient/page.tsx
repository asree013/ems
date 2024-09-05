'use client';

import { db } from '@/configs/pouchDb.config';
import React, { useEffect } from 'react'

export default function Page() {
  async function findUserOfline() {
    try {
    const result = await db.allDocs({include_docs: true})
      console.log(result);
      
    } catch (error) {
      console.log(error);
      
    }
  }
  useEffect(() => {
    findUserOfline()

  }, [])
  return (
    <div>
      <p>patient</p>

    </div>
  )
}
