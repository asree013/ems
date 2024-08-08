'use client'
import PaginationThemplete from '@/components/PaginationThemplete'
import React from 'react'

export default function page() {
  function onUpdatePage(page: number){
    console.log(page);
    
  }
  function onUpdateLimit(limit: number){
    console.log('limit: ', limit);
    
  }
  return (
    <>
      <div>
        <PaginationThemplete returnCurrent={onUpdatePage} />
      </div>
    </>
  )
}
