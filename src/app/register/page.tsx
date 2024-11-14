"use client";

import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { register } = useAuth();
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await register(email, password);
      router.push("/trackers");
    } catch (error) {
      setError("Registration failed. Please try again.");
      console.error("Registration failed", error);
    }
  };

  return (
    <>
      <div className='register-container'>
        <h1>Register</h1>
        <form onSubmit={handleRegister} className='register-form'>
          <input
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className='input-field'
          />
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className='input-field'
          />
          <button type='submit' className='register-btn'>
            Register
          </button>
          {error && <p className='error-message'>{error}</p>}
        </form>
      </div>
      <div className='login-redirect'>
        <p>
          Already have an account?
          <span onClick={() => router.push("/login")} className='login-link'>
            Login here
          </span>
        </p>
      </div>
    </>
  );
}
