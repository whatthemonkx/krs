"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import React, { useContext, useState } from 'react'
import { useRouter } from 'next/navigation' 
import { AuthContext } from './context/authContext';

export default function LoginForm() {
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const [err, setErr] = useState(null);
  const router = useRouter();
  const { login } = useContext(AuthContext);

  function handleChange(e) {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleLogin(e) {
    e.preventDefault();
    try {
      await login(inputs)
      router.push("/dashboard");
    } catch (err) {
      setErr(err.response.data);
    }
  }

  return (
    <div className="flex flex-col w-full h-[100vh] justify-center items-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <h1 className='title text-center w-full'>KoNGA-71</h1>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input required type="email" placeholder='email' name='email' onChange={handleChange} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input required type="password" placeholder='password' name='password' onChange={handleChange} />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleLogin} className="w-full">Sign in</Button>
        </CardFooter>
      </Card>
      {err && <p>{err}</p>}
    </div>
  )
}

