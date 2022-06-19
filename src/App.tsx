import * as React from 'react';

export default function App() {
  const [date, setDate] = React.useState('2022-06-19');
  const [usd, setUsd] = React.useState(0);
  const [sum, setSum] = React.useState('0');

  React.useEffect(() => {
    const match = date.match(/(\d{4})-(\d{2})-(\d{2})/);
    if (match) {
      const [, year, month, day] = match;

      fetch(
        `https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?date=${year}${month}${day}&json`
      )
        .then((data) => data.json())
        .then((data) => data.find((item: any) => item.cc === 'USD'))
        .then((item: any) => setUsd(item.rate));
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
