import { useState, useEffect } from 'react';
import axios from 'axios';

export default function RecuperarScreen() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8080/api-seda/piso/1')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  if (!data) {
    return <></>;
  }

  return (
    <div></div>
  );
}
