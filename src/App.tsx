import * as React from 'react';
import { getExchangeRate } from './api/nbu.api';

export default function App() {
  const [date, setDate] = React.useState('2022-06-19');
  const [usd, setUsd] = React.useState(0);
  const [sum, setSum] = React.useState('0');

  React.useEffect(() => {
    const match = date.match(/(\d{4})-(\d{2})-(\d{2})/);
    if (match) {
      const [, year, month, day] = match;

      getExchangeRate({ valcode: 'USD', date: `${year}${month}${day}` }).then(([usdData]) =>
        setUsd(usdData.rate)
      );
    }
  }, [date]);

  return (
    <div>
      <div>
        <label htmlFor='in-date'>In day</label>
        <input id='in-date' type='date' value={date} onChange={(e) => setDate(e.target.value)} />
      </div>
      <p>USD: {usd.toString()}</p>
      <div>
        <label htmlFor='in-sum'>In sum</label>
        <input
          id='in-sum'
          type='number'
          step='any'
          value={sum}
          onChange={(e) => setSum(e.target.value)}
        />
      </div>
      <p>ST: {parseInt(sum) * usd * 0.05}</p>
    </div>
  );
}
