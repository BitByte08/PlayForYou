'use client';
import {useEffect, useState} from 'react'
import supabase from '@/supabaseClient'
import {ColorButton} from "@/components/ui/button";
import {useSocketStore} from "@/stores/socketStore";

const Login = () => {
	const socket = useSocketStore(state => state.socket);
	const { disconnect } = useSocketStore(state => state.actions);

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

	useEffect(() => {
		window.addEventListener('beforeunload', disconnect);
		return () => window.removeEventListener('beforeunload', disconnect);
	}, [socket,disconnect]);

  return (
    <div className="flex flex-col p-6">
      <h2>로그인 / 회원가입</h2>
      <input type="email" placeholder="이메일" onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="비밀번호" onChange={e => setPassword(e.target.value)} />
      <ColorButton function={()=>{handleLogin()}} >로그인</ColorButton>
      <button onClick={handleSignup}>회원가입</button>
      <p>{message}</p>
    </div>
  )
}

export default Login