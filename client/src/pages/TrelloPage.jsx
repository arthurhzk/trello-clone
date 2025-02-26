import { useState, useEffect } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Column } from "../components/Column";
import { Input } from "../components/ui/input";
import useGetTasksService from "../services/getTasksService.js";
import Modal from "../components/Modal";
import { Button } from "../components/ui/button";
import AddTaskService from "../services/addTaskService.js";
import { toast } from "react-toastify";

const COLUMNS = [
  { id: "TODO", title: "Em Aberto" },
  { id: "IN_PROGRESS", title: "Em Andamento" },
  { id: "DONE", title: "Publicado / Fechado" },
  { id: "TEST", title: "Teste" },
];

export default function TrelloPage() {
  const { data, signUser } = useGetTasksService();
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const { addTask } = AddTaskService({ title, description, status });

  useEffect(() => {
    signUser();
  }, []);

  useEffect(() => {
    setTasks(data);
  }, [data]);

  function handleDragEnd(event) {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id;
    const newStatus = over.id;

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: newStatus,
            }
          : task
      )
    );
  }

  async function handleAddTask() {
    const newTask = {
      title,
      description,
      status,
    };
    const response = await addTask(newTask)
      .then(() => toast.success("Tarefa adicionada com sucesso!"))
      .catch(() =>
        toast.error("Erro ao adicionar tarefa. Por favor, tente novamente.")
      );
    if (response.status === true) {
      setTasks((prevTasks) => [...prevTasks, response.data]);
      setTitle("");
      setDescription("");
      setStatus("");
    }
  }

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">Trello Clone</h1>

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={tasks.map((task) => task.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
            {COLUMNS.map((column) => (
              <Column
                key={column.id}
                column={column}
                tasks={tasks.filter((task) => task.status === column.id)}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
      <Modal
        title={"Adicionar tarefas no Kanban"}
        buttonText={"Adicionar Task"}
        description={"Adicione uma nova tarefa ao seu Kanban"}
        onConfirm={handleAddTask}
      >
        <Input
          placeholder="Título da tarefa"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          placeholder="Descrição da tarefa"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="mt-2 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none sm:text-sm"
        >
          <option disabled>Selecione o status</option>
          {COLUMNS.map((column) => (
            <option key={column.id} value={column.id}>
              {column.title}
            </option>
          ))}
        </select>
        <Button onClick={handleAddTask}>Adicionar</Button>
      </Modal>
    </div>
  );
}
