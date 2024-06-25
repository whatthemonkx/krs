import { useEffect, useState } from "react";
import { getUsers } from './api/users';
import ProductsList from '../components/ProductsList';
import { Button } from "@nextui-org/react";

export default function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getUsers();
      setUsers(users);
    };
    fetchUsers();
  }, []);

  console.log(users);

  return (
    <div>
      <div>
        <h1>Welcome to Our Store</h1>
        <ProductsList />
        <a href="/cart"><button>go to cart</button></a>
        <Button>Click me</Button>
      </div>
    </div>
  );
}
