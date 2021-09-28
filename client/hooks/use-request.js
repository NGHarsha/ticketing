import { useState } from "react";
import axios from "axios";

const useRequest = ({ url, method, body, onSuccess }) => {
  const [errors, setErrors] = useState(null);

  const doRequest = async () => {
    try {
      setErrors(null);
      const res = await axios[method](url, body);
      if (onSuccess) {
        onSuccess(res.data);
      }
    } catch (err) {
      setErrors(
        <div className="alert alert-danger">
          <h4>Oopss...</h4>
          <ul className="my-0">
            {err.response.data.errors.map((e) => {
              return <li key={e.message}>{e.message}</li>;
            })}
          </ul>
        </div>
      );
    }
  };

  return { doRequest, errors };
};

export default useRequest;
