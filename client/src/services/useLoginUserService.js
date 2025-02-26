import { useState } from "react";
import axios, { AxiosError } from "axios";

const useLoginUserService = (email, password) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [data, setData] = useState([]);
  const [status, setStatus] = useState(0);
  const signUser = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:4000/api/signin", {
        email,
        password,
      });
      if (response.status !== 200) {
        throw new Error("Erro ao fazer a requisição.");
      }
      setData(response.data);
      localStorage.setItem("token", response.data.token);
      setMessage("Requisição feita com sucesso!");
      setStatus(response.status);
    } catch (error) {
      if (error instanceof AxiosError) {
        setMessage(error.response.data.message);
        setMessage("Erro ao fazer a requisição. Por favor, tente novamente.");
      }
      setMessage("Erro ao fazer a requisição. Por favor, tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return {
    status,
    data,
    loading,
    message,
    signUser,
  };
};

export default useLoginUserService;
