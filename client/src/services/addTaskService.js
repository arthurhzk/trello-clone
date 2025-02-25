import { useState } from "react";
import axios from "axios";
import { Toaster } from "../components/ui/sonner";
const AddTaskService = (email, password) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const signUser = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:4000/api/add",
        {
          email,
          password,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status !== 200) {
        throw new Error("Erro ao criar task.");
      }
      setData(response.data);
      Toaster("success", "Task criada com sucesso!");
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      Toaster("error", "Erro ao criar task.");
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    signUser,
  };
};

export default AddTaskService;
