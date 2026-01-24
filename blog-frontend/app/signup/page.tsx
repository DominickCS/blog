'use client'

import NavigationBar from "@/components/ui/navbar"
import React, { useState } from "react"
import Signup from "@/app/_serverActions/(auth)/signup"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function LoginPage() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ type: "", text: "" })
  const [errors, setErrors] = useState({
    email: "",
    username: "",
    password: ""
  })
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: ""
  })

  const validateForm = () => {
    const newErrors = {
      email: "",
      username: "",
      password: ""
    };

    if (!formData.email) {
      newErrors.email = "Email cannot be empty"
    }

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
      const registrationRequest = await Signup(formData.email, formData.username, formData.password)
      setMessage({ type: "", text: "" })
      if (registrationRequest.data?.token) {
        document.cookie = `token=${registrationRequest.data?.token}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Strict; Secure`
        setMessage({ type: "success", text: 'Registration successful! Redirecting to feed...' });
        setTimeout(() => {
          setLoading(false)
          window.location.href = '/';
        }, 2000);
      } else {
        setMessage({ type: "failure", text: "Registration failed" });
        setLoading(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="">
      <NavigationBar />
      <Card className="mt-8 sm:max-w-lg md:max-w-2xl mx-auto max-w-xs lg:max-w-4xl xl:max-w-6xl">
        <CardHeader>
          <CardTitle>Register for an account</CardTitle>
          <CardDescription>Enter your credentials</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={HandleSubmit}>
            <Label htmlFor="email">Email Address</Label>
            <Input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="bg-white" />
            {errors.email && <p className="text-red-500/80 text-xs font-light">{errors.email}</p>}
            <Label htmlFor="username">Username</Label>
            <Input type="text" id="username" name="username" value={formData.username} onChange={handleChange} className="bg-white" />
            {errors.username && <p className="text-red-500/80 text-xs font-light">{errors.username}</p>}
            <Label htmlFor="password">Password</Label>
            <Input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className="bg-white" />
            {errors.password && <p className="text-red-500/80 text-xs font-light">{errors.password}</p>}
            <Button disabled={loading} type="submit" className="hover:cursor-pointer mt-4" >{loading ? "Signing up..." : "Sign Up"}</Button>
          </form>
        </CardContent>
        <CardFooter className={loading || message.text.length > 0 ? "mx-auto" : "hidden"}>
          {message && message.type === "success" ? <p className="text-green-500/60 font-medium">{message.text}</p> : <p className="text-red-500/60">{message.text}</p>}
        </CardFooter>
      </Card>
    </div>
  )
}
