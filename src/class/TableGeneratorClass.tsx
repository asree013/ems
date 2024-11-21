'use client';

import React from 'react';

export class TableGeneratorClass<T> {
    data: T[];
    headers: (keyof T)[];

    constructor(data: T[], headers: (keyof T)[]) {
        this.data = data;
        this.headers = headers;
    }

    renderTable(): JSX.Element {
        return (
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
                <thead>
                    <tr>
                        {this.headers.map((header, index) => (
                            <th key={index} style={{ border: '1px solid #ddd', padding: '8px' }}>
                                {String(header)}
                            </th>
                        ))}
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>
                            {'action'}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {this.data.map((item, rowIndex) => (
                        <tr key={rowIndex}>
                            {this.headers.map((header, colIndex) => (
                                <td
                                    key={colIndex}
                                    style={{ border: '1px solid #ddd', padding: '8px' }}
                                >
                                    {String(item[header]) ?? 'ไม่ระบุ'}
                                </td>
                            ))}
                            <td
                                style={{ border: '1px solid #ddd', padding: '8px' }}
                            >
                                {String('action')}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }

}
