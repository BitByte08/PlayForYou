'use client';
import { useState } from 'react'
import supabase from '@/supabaseClient'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setMessage(error ? error.message : '로그인 성공!')
  }

  const handleSignup = async () => {
    const { error } = await supabase.auth.signUp({ email, password })
    setMessage(error ? error.message : '회원가입 성공! 이메일 확인 필요')
  }

  return (
    <div className="flex flex-col">
      <h2>로그인 / 회원가입</h2>
      <input type="email" placeholder="이메일" onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="비밀번호" onChange={e => setPassword(e.target.value)} />
      <button onClick={handleLogin}>로그인</button>
      <button onClick={handleSignup}>회원가입</button>
      <p>{message}</p>
    </div>
  )
}

export default Login