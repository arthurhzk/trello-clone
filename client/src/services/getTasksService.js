import { useState } from "react";
import axios from "axios";

const useLoginUser = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [data, setData] = useState([]);
  const signUser = async (taskID) => {
    setLoading(true);
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/delete/${taskID}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status !== 200) {
        throw new Error("Erro ao deletar task.");
      }
      setData(response.data);
      setMessage("Task deletada com sucesso!");
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
