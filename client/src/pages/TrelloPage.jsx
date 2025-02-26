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

const COLUMNS = [
  { id: "TODO", title: "Em Aberto" },
  { id: "IN_PROGRESS", title: "Em Andamento" },
  { id: "DONE", title: "Publicado / Fechado" },
  { id: "TEST", title: "Teste" },
];

export default function TrelloPage() {
  const { data, signUser } = useGetTasksService();
  const [tasks, setTasks] = useState(data);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const { addTask } = AddTaskService({ title, description, status });

  useEffect(() => {
    signUser();
  }, []);

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

  function handleAddTask() {
    const newTask = {
      id: String(tasks.length + 1),
      title,
      description,
      status,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    addTask();
    setTasks([...tasks, newTask]);
    setTitle("");
    setDescription("");
    setStatus("");
  }

  return (
    <div className="p-4">
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
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
          className="mt-2 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="" disabled>
            Selecione o status
          </option>
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
