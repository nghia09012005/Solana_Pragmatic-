import { useState } from 'react';

const useSignIn = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const signIn = async ({ username, password }) => {
    setLoading(true);
    setMessage("");  // Reset message trước khi thực hiện yêu cầu

    try {
      const response = await fetch('http://localhost:8080/api/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok && data.code === "1000") {
        // Lưu token và username vào localStorage
        localStorage.setItem('token', data.result.token);
        localStorage.setItem('username', data.result.username);
        console.log(data)

        setMessage("Đăng nhập thành công!");
        return { success: true };
      } else {
        setMessage(data.message || "Sai tài khoản hoặc mật khẩu.");
        return { success: false };
      }
    } catch (error) {
      console.error('Sign in error:', error);
      setMessage("Có lỗi xảy ra khi đăng nhập.");
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  return { signIn, loading, message };
};

export default useSignIn;
