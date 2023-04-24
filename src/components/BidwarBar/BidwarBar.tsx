import { useMemo, useState } from 'react';
import './Bidwar.css'

const BidwarBar: React.FC = () => {
  const [montantVerlan, setMontantVerlan] = useState(9000);
  const [montantAnglais, setMontantAnglais] = useState(4500);

  const getVerlanPourcentage = useMemo(() => {
    return 100 * montantVerlan / (montantVerlan + montantAnglais) + '%'
  }, [montantVerlan, montantAnglais])

  const getAnglaisPourcentage = useMemo(() => {
    return 100 * montantAnglais / (montantVerlan + montantAnglais) + '%'
  }, [montantVerlan, montantAnglais])

  return (
   <div className='bidwar-bar'>
      <div className='verlan' style={{width: getVerlanPourcentage}}>
        <span className='label'>#VERLAN {montantVerlan}€</span>
      </div>
      <div className='anglais' style={{width: getAnglaisPourcentage}}>
        <span className='label'>#ANGLAIS {montantAnglais}€</span>
      </div>
    </div>  
  )
}

export default BidwarBar