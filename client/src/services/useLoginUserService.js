import { useState } from "react";
import axios from "axios";

const useLoginUser = (email, password) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
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
      localStorage.setItem("token", response.data.token);
      setMessage("Requisição feita com sucesso!");
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setMessage("Erro ao fazer a requisição. Por favor, tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    message,
    signUser,
  };
};

export default useLoginUser;
