import { useState } from "react";
import axios from "axios";

const useLoginUser = (email, password) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [data, setData] = useState([]);
  const signUser = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:4000/api/login", {
        email,
        password,
      });
      if (response.status !== 200) {
        throw new Error("Erro ao fazer a requisição.");
      }
      setData(response.data);
      setSuccess("Requisição feita com sucesso!");
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setError("Erro ao fazer a requisição. Por favor, tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    success,
    signUser,
  };
};

export default useLoginUser;
