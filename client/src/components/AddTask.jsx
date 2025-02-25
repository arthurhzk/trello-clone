import { useState } from "react";
import AddTaskService from "../services/addTaskService.js";
import { Button } from "./ui/button.jsx";
import { Input } from "./ui/input.jsx";
import { Label } from "./ui/label.jsx";
// eslint-disable-next-line react/prop-types
const AddTask = ({ columnId, onTaskAdded }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const task = {
      title,
      description,
      columnId,
      completed: false,
    };

    try {
      const newTask = await AddTaskService(task);
      onTaskAdded(newTask);
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("Erro ao adicionar tarefa:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Título</Label>
        <Input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Descrição</Label>
        <Input
          id="description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <Button type="submit" className="w-full">
        Adicionar Tarefa
      </Button>
    </form>
  );
};

export default AddTask;
