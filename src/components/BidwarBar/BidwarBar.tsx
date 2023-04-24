import { useEffect, useMemo, useState } from 'react';
import './BidwarBar.css';

const BIDWAR_ENDPOINT = `${import.meta.env.VITE_API_BASE_URL}/bidwar`;

const BidwarBar: React.FC = () => {

  const searchParams = new URLSearchParams(document.location.search);
  const user = searchParams.get('user');
  const firstIncentive = searchParams.get('firstIncentive');
  const secondIncentive = searchParams.get('secondIncentive');

  const [firstAmount, setFirstAmount] = useState(0);
  const [secondAmount, setSecondAmount] = useState(0);

  const getFirstPercentage = useMemo(() => {
    return 100 * firstAmount / (firstAmount + secondAmount) + '%';
  }, [firstAmount, secondAmount]);

  const getSecondPourcentage = useMemo(() => {
    return 100 * secondAmount / (firstAmount + secondAmount) + '%';
  }, [firstAmount, secondAmount]);

  useEffect(() => {
    const INTERVAL_TIME_MS = 15000;
    const getBidwarDatas = () => {
      fetch(`${BIDWAR_ENDPOINT}/${user}/${firstIncentive}/${secondIncentive}`)
      .then(response => response.json())
      .then(json => {
        setFirstAmount(json.firstResult.amount);
        setSecondAmount(json.secondResult.amount);
      })
      .catch(error => console.error(error));
    }
    
    getBidwarDatas();
    const interval = setInterval(getBidwarDatas, INTERVAL_TIME_MS);

    return () => clearInterval(interval);
  }, [user, firstIncentive, secondIncentive]);

  return (
   <div className='bidwar-bar'>
      <div className='first-incentive' style={{width: getFirstPercentage}}>
        <span className='label'>#{firstIncentive?.toUpperCase()} {firstAmount}€</span>
      </div>
      <div className='second-incentive' style={{width: getSecondPourcentage}}>
        <span className='label'>#{secondIncentive?.toUpperCase()} {secondAmount}€</span>
      </div>
    </div>  
  );
}

export default BidwarBar;