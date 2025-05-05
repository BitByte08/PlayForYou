import React, { useState } from 'react';
import axios from 'axios'; // axios 추가
interface props {
  isOpen: boolean;
  closeModal: () => void;
}
const AuthModal = ({ isOpen, closeModal }:props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true); // 로그인/회원가입 토글
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [error, setError] = useState(''); // 에러 메시지

  const handleAuth = async () => {
    setLoading(true); // 로딩 시작
    setError(''); // 이전 에러 메시지 초기화

    try {
      const url = isLogin
        ? `${process.env.NEXT_PUBLIC_BACKEND}/login`
        : `${process.env.NEXT_PUBLIC_BACKEND}/signin`;

      const response = await axios.post(url, { email, password });
      console.log(response);
      alert(isLogin ? '로그인 성공' : '회원가입 성공');
      closeModal(); // 모달 닫기
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false); // 로딩 끝
    }
  };

  if (!isOpen) return null; // 모달이 열려 있지 않으면 렌더링하지 않음

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg max-w-sm w-full">
        <h2 className="text-2xl font-semibold text-center mb-4">{isLogin ? '로그인' : '회원가입'}</h2>

        {/* 에러 메시지 표시 */}
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAuth();
          }}
        >
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">이메일</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              disabled={loading}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">비밀번호</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              disabled={loading}
            />
          </div>
          <button
            type="submit"
            className={`w-full p-2 rounded-md ${loading ? 'bg-gray-400' : 'bg-blue-500 text-white'} hover:bg-blue-600`}
            disabled={loading}
          >
            {loading ? '로딩 중...' : isLogin ? '로그인' : '회원가입'}
          </button>
        </form>

        {/* 로그인 / 회원가입 토글 버튼 */}
        <button
          onClick={() => {
            setIsLogin(!isLogin);
            setEmail('');
            setPassword('');
            setError('');
          }}
          className="mt-4 text-sm text-blue-500 hover:underline w-full"
        >
          {isLogin ? '회원가입으로 가기' : '로그인으로 가기'}
        </button>

        <button
          onClick={closeModal}
          className="mt-4 text-sm text-red-500 hover:underline w-full"
        >
          모달 닫기
        </button>
      </div>
    </div>
  );
};

export default AuthModal;
