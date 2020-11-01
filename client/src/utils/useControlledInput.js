import { useState } from 'react';


const useControlledInput = (defaultValue) => {
  const [value, setValue] = useState(defaultValue);

  return [
    value,
    e => { setValue(e.target.value); }
  ];
};


export default useControlledInput;
