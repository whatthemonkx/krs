import React, { useEffect, useState } from 'react';
import Loading from '../components/Loading';

export default function Success() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading && <Loading />}
      <div className='checkoutNavbar'>
        <a href='/'><div className='title'>KoNGA-71</div></a>
      </div>
      <div className='successCheckout'>
        <p>
          We appreciate your business! A confirmation email will be sent to your email.
          <br /><br /><br />
          If you have any questions, please email <a href="mailto:orders@konga71.com">orders@konga71.com</a>.
        </p>
      </div>
    </>
  );
}
