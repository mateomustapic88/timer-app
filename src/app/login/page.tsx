"use client";

import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import eyeIcon from "@/assets/eyeIcon.svg";
import registerIcon from "@/assets/registerIcon.svg"; // Register icon import

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await login(email, password);
      router.push("/trackers");
    } catch (error) {
      setError("Login failed. Please try again.");
      console.error("Login failed", error);
    }
  };

  const handleRedirectToRegister = () => {
    router.push("/register");
  };

  return (
    <div>
      <div className='login-container'>
        <h1>Login</h1>
        <form onSubmit={handleLogin} className='login-form'>
          <input
            type='email'
            placeholder='Username'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className='input-field'
          />
          <div className='password-container'>
            <input
              type={showPassword ? "text" : "password"}
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className='input-field'
            />
            <Image
              src={eyeIcon}
              alt='Toggle visibility'
              width={20}
              height={20}
              className='eye-icon'
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>
          <button type='submit' className='login-btn'>
            Login
          </button>
          {error && <p className='error-message'>{error}</p>}
        </form>
      </div>
      <div className='register-account'>
        <div className='register-icon'>
          <Image
            src={registerIcon}
            alt='Register Icon'
            width={80}
            height={80}
            className='register-img'
          />
        </div>
        <div className='register-text'>
          <p>Need an account?</p>
          <span onClick={handleRedirectToRegister} className='register-link'>
            Register here
          </span>
        </div>
      </div>
    </div>
  );
}
