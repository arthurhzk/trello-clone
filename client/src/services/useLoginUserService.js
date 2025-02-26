/* eslint-disable no-unused-vars */
import { useState } from "react";
import axios from "axios";

const useLoginUserService = (email, password) => {
  const [message, setMessage] = useState("");
  const [data, setData] = useState([]);
  const [status, setStatus] = useState(0);
  const signUser = async () => {
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
      setMessage("Erro ao fazer a requisição. Por favor, tente novamente.");
    }
  };

  return {
    status,
    data,
    message,
    signUser,
  };
};

export default useLoginUserService;
