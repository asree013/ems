import React from 'react';

export class TableGenerator<TD extends Record<string, any>> {
  selectedColumns: string[];

  constructor(selectedColumns: string[]) {
    this.selectedColumns = selectedColumns;
  }

  // ฟังก์ชันสำหรับการแสดงชื่อคอลัมน์
  onGenerateColumn(cols: string[]) {
    return (
      <tr>
        {cols.map((col, i) => (
          <th className='px-6 py-3' key={i}>{col}</th>
        ))}
      </tr>
    );
  }

  // ฟังก์ชันสำหรับการแสดงข้อมูลในแต่ละแถว
  onGenerateRow(data: TD[]) {
    return data.map((row, i) => (
      <tr className='bg-white border-b border-gray-500 dark:bg-gray-800 dark:border-gray-700' key={i}>
        {this.selectedColumns.map((key, j) => {
          if (row[key]) {
            return (
              <td className='px-6 py-4' key={j}>
                {key.includes('image') ? (
                  <img className='w-[60px] h-[60px] object-contain' src={row[key]} alt={key} />
                ) : (
                  typeof row[key] === 'object' ? JSON.stringify(row[key]) : row[key]
                )}
              </td>
            );
          }
          return null;
        })}
      </tr>
    ));
  }
}
