import { useState } from 'react';

export default function useThrowAsyncError() {
  const [, setState] = useState();

  return (err: Error) => {
    setState(() => {
      throw err;
    });
  };
}
