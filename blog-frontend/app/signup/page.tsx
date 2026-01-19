'use client'

import NavigationBar from "@/app/_components/ui/navbar"
import React, { useState } from "react"
import Signup from "@/app/_serverActions/(auth)/signup"

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
      <div className="mt-8">
        <form className="flex flex-col max-w-sm mx-auto" onSubmit={HandleSubmit}>
          <label htmlFor="email">Email Address</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="bg-white" />
          {errors.email && <p className="text-red-500/60 font-light">{errors.email}</p>}
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} className="bg-white" />
          {errors.username && <p className="text-red-500/60 font-light">{errors.username}</p>}
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className="bg-white" />
          {errors.password && <p className="text-red-500/60 font-light">{errors.password}</p>}
          <button disabled={loading} type="submit" className="bg-white my-8 p-2 hover:cursor-pointer hover:bg-black/20 duration-800" >{loading ? "Signing up..." : "Sign Up"}</button>
        </form>
      </div>
      <div className="mx-auto text-center">
        {message && message.type === "success" ? <p className="text-green-500/60 font-light">{message.text}</p> : <p className="text-red-500/60">{message.text}</p>}
      </div>
    </div>
  )
}
