import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const AddTaskService = (task) => {
  const [data, setData] = useState([]);
  const addTask = async () => {
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
      toast.success("Success Notification !", {
        position: "bottom-left",
      });
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error("Error Notification !", {
        position: "bottom-left",
      });
    }
  };

  return {
    data,
    addTask,
  };
};

export default AddTaskService;
