import React, { useState } from 'react';

const useDebounce = () => {
  const [typingTimeout, setTypingTimeout] = useState('');

  const debounce = (func, time = 500) => {
    clearTimeout(typingTimeout);

    const timeout = setTimeout(() => {
      func();
    }, time);

    setTypingTimeout(timeout);
  };

  return debounce;
};

export default useDebounce;
