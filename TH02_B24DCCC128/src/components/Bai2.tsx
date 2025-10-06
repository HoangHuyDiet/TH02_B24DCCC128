import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import type { CurrencyData } from '../types/exchange';

const Bai2: React.FC = () => {
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [targetCurrency, setTargetCurrency] = useState('VND');
  const [amount, setAmount] = useState<number>(1);
  const [exchangeData, setExchangeData] = useState<CurrencyData | null>(null);
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRates = async () => {
      setLoading(true);
      setError(null);
      try {
        const url = `https://open.er-api.com/v6/latest/${baseCurrency}`;
        const response = await axios.get<CurrencyData>(url);
        if (response.data.rates) {
            setExchangeData(response.data);
            if (!response.data.rates[targetCurrency]) {
                 setTargetCurrency(Object.keys(response.data.rates)[0] || 'USD'); 
            }
        } else {
             setError("Không có dữ liệu tỉ giá hợp lệ.");
             setExchangeData(null);
        }
      } catch (err) {
        setError(`Không thể tải tỉ giá cho ${baseCurrency}.`);
        setExchangeData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
  }, [baseCurrency, targetCurrency]);

  useEffect(() => {
    if (exchangeData && exchangeData.rates && amount > 0) {
      const rate = exchangeData.rates[targetCurrency];
      if (rate) {
        const convertedAmount = amount * rate;
        setResult(`${amount} ${baseCurrency} = ${convertedAmount.toFixed(2)} ${targetCurrency}`);
      } else {
        setResult(`Không tìm thấy tỉ giá cho ${targetCurrency}`);
      }
    } else if (exchangeData && amount <= 0) {
        setResult('Vui lòng nhập số tiền hợp lệ (> 0)');
    } else {
        setResult('Đang chờ dữ liệu...');
    }
  }, [amount, baseCurrency, targetCurrency, exchangeData]);

  const currencies = useMemo(() => 
    exchangeData ? Object.keys(exchangeData.rates).sort() : []
  , [exchangeData]);


  return (
    <div>
      <h2>Bài 2: Quy đổi Tỉ giá Tiền tệ</h2>
      {loading && <p>Đang tải tỉ giá...</p>}
      {error && <p style={{ color: 'red' }}>Lỗi: {error}</p>}

      <div style={{ display: 'flex', gap: '15px', alignItems: 'center', marginBottom: '20px' }}>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value) || 0)}
          placeholder="Số tiền"
          style={{ padding: '8px' }}
        />

        <select 
          value={baseCurrency} 
          onChange={(e) => setBaseCurrency(e.target.value)}
          style={{ padding: '8px' }}
          disabled={loading}
        >
          {currencies.map(curr => <option key={curr} value={curr}>{curr}</option>)}
        </select>
        
        <span>&rarr;</span>

        <select 
          value={targetCurrency} 
          onChange={(e) => setTargetCurrency(e.target.value)}
          style={{ padding: '8px' }}
          disabled={loading}
        >
          {currencies.map(curr => <option key={curr} value={curr}>{curr}</option>)}
        </select>
      </div>

      <div style={{ padding: '15px', border: '1px solid green', backgroundColor: '#e6ffe6' }}>
        <strong>Kết quả:</strong> {result}
        {exchangeData && exchangeData.rates[targetCurrency] && <p style={{ fontSize: '0.8em', marginTop: '5px' }}>Tỉ giá: 1 {baseCurrency} = {exchangeData.rates[targetCurrency].toFixed(4)} {targetCurrency}</p>}
      </div>
    </div>
  );
};

export default Bai2;