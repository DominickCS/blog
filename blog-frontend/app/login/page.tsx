'use client'

import NavigationBar from "@/components/ui/navbar"
import Login from "@/app/_serverActions/(auth)/login"
import React, { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function LoginPage() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ type: "", text: "" })
  const [errors, setErrors] = useState({
    username: "",
    password: ""
  })
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  })

  const validateForm = () => {
    const newErrors = {
      username: "",
      password: ""
    };

    if (!formData.username) {
      newErrors.username = "Username cannot be empty"
    }

    if (!formData.password) {
      newErrors.password = 'Password cannot be empty';
    }

    setErrors(newErrors);
    return newErrors.username.length == 0 && newErrors.password.length == 0
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target as { name: keyof typeof formData; value: string };
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const HandleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setLoading(true)

    if (!validateForm()) {
      setLoading(false)
      return;
    }

    try {
      const loginRequest = await Login(formData.username, formData.password)
      setMessage({ type: "", text: "" })
      if (loginRequest.data?.token) {
        document.cookie = `token=${loginRequest.data?.token}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Strict; Secure`
        setMessage({ type: "success", text: 'Login successful! Redirecting to feed...' });
        setTimeout(() => {
          setLoading(false)
          window.location.href = '/';
        }, 2000);
      } else {
        setMessage({ type: "failure", text: "Login failed" });
        setLoading(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <NavigationBar />
      <Card className="mt-8 md:max-w-xl mx-auto max-w-3xs">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>Enter your credentials</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={HandleSubmit}>
            <Label htmlFor="username">Username</Label>
            <Input type="text" id="username" name="username" value={formData.username} onChange={handleChange} className="bg-white" />
            {errors.username && <p className="text-xs text-red-600/80 font-light">{errors.username}</p>}
            <Label htmlFor="password">Password</Label>
            <Input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className="bg-white" />
            {errors.password && <p className="text-xs text-red-600/80 font-light">{errors.password}</p>}
            <Button disabled={loading} type="submit" className="mt-4 hover:cursor-pointer" >{loading ? "Logging in..." : "Login"}</Button>
          </form>
        </CardContent>
        <CardFooter className={loading || message.text.length > 0 ? "mx-auto" : "hidden"}>
          {message && message.type === "success" ? <p className="text-green-500/80 text-center">{message.text}</p> : <p className="text-red-500/80 text-center">{message.text}</p>}
        </CardFooter>
      </Card>
    </div>
  )
}
