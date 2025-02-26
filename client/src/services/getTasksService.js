import { useState } from "react";
import axios from "axios";

const useGetTasksService = () => {
  const [data, setData] = useState([]);
  const signUser = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/list`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.status !== 200 && response.status !== 204) {
        throw new Error("Erro ao buscar tasks.");
      }
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  return {
    data,
    signUser,
  };
};

export default useGetTasksService;
