import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar';

const AccountPage = () => {
  const router = useRouter();
  const { id } = router.query;


  return (
    <div className='pageContainer'>
      <Navbar />
      <div className='itemsSection'>
        <h1>Account Details for ID: {id}</h1>
      </div>
    </div>
  );
};

export default AccountPage;