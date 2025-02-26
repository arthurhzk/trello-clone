import { useState } from "react";
import axios from "axios";
const AddTaskService = (task) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const addTask = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:4000/api/add",
        {
          title: task.title,
          description: task.description,
          status: task.status,
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
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    addTask,
  };
};

export default AddTaskService;
