import { useState } from "react";
import axios from "axios";

const useRegisterUserService = (email, password, confirmPassword) => {
  const [message, setMessage] = useState("");
  const [data, setData] = useState([]);
  const [status, setStatus] = useState(0);
  const signUser = async () => {
    try {
      const response = await axios.post("http://localhost:4000/api/signup", {
        email,
        password,
        confirmPassword,
      });
      if (response.status !== 200) {
        throw new Error("Erro ao fazer a requisição.");
      }
      setData(response.data);
      setStatus(200);
      setMessage("Cadastro reaizado com sucesso!");
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setMessage("Erro ao fazer a requisição. Por favor, tente novamente.");
      setStatus(400);
    }
  };

  return {
    status,
    data,
    message,
    signUser,
  };
};

export default useRegisterUserService;
