import { useState } from 'react';

const useSignUp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const signUp = async ({ username, password }) => {
    
    setLoading(true);
    setError(null);
  
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      const result = await response.json();
      setLoading(false);
  
      //Kiểm tra theo "code"
      if (result.code !== "1000") {
        setError(result.result || 'Đăng ký thất bại, tên đăng nhập bị trùng');
        return false;
      }
  
      return true;
    } catch (err) {
      setLoading(false);
      setError('Lỗi kết nối đến máy chủ');
      return false;
    }
  };
  

  return { signUp, loading, error };
};

export default useSignUp;
