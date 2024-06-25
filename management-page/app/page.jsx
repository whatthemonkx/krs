'use client';

import Image from 'next/image'
import './globals.css'
import { getUsers } from './api/users';
import { useEffect, useState } from "react";

export default function Home() {
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    const fetchUsers = async () => {
        const users = await getUsers();
        setUsers(users);
    };
    fetchUsers();
  }, []);

  return (
    <div>Management Page</div>
  )
}
