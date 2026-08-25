import React from 'react';

const DomainChart = ({ data, title }) => {
    const maxVal = Math.max(...(data ? data.map(d => d.value) : [1]), 1);

    return (
        <div className="domain-chart" style={{ border: '1px solid #ccc', padding: '16px', borderRadius: '8px' }}>
            <h3>{title}</h3>
            <div style={{ display: 'flex', alignItems: 'flex-end', height: '150px', gap: '20px', marginTop: '20px' }}>
                {data && data.map((item, index) => {
                    const heightPercent = (item.value / maxVal) * 100;
                    return (
                        <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                            <div 
                                style={{ 
                                    width: '30px', 
                                    height: `${heightPercent}%`, 
                                    backgroundColor: '#2563eb', 
                                    borderRadius: '4px 4px 0 0' 
                                }} 
                            />
                            <span style={{ fontSize: '12px', marginTop: '8px' }}>{item.label}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default DomainChart;