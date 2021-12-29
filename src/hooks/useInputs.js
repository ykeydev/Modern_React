import { useState, useCallback } from "react";
//input change event 에 대한 custom hooks
//input 입력값 변경에 따른 state 변경과 onchange, reset 함수 리턴
const useInputs = (initialForm) => {
  const [form, setForm] = useState(initialForm);

  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((form) => ({ ...form, [name]: value }));
  }, []);
  const reset = useCallback(() => {
    setForm(initialForm);
  }, [initialForm]);
  return [form, onChange, reset];
};

export default useInputs;
