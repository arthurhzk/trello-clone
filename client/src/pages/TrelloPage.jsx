import { useState, useEffect } from "react";
import { Column } from "../components/Column";
import { DndContext } from "@dnd-kit/core";
import { Input } from "../components/ui/input";
import useGetTasksService from "../services/getTasksService.js";
import Modal from "../components/Modal";

const COLUMNS = [
  { id: "TODO", title: "Em Aberto" },
  { id: "IN_PROGRESS", title: "Em Andamento" },
  { id: "DONE", title: "Publicado / Fechado" },
  { id: "TEST", title: "Teste" },
];

// const INITIAL_TASKS = [
//   {
//     id: "1",
//     title: "Research Project",
//     description: "Gather requirements and create initial documentation",
//     status: "TODO",
//   },
//   {
//     id: "2",
//     title: "Design System",
//     description: "Create component library and design tokens",
//     status: "TODO",
//   },
//   {
//     id: "3",
//     title: "API Integration",
//     description: "Implement REST API endpoints",
//     status: "IN_PROGRESS",
//   },
//   {
//     id: "4",
//     title: "Testing",
//     description: "Write unit tests for core functionality",
//     status: "DONE",
//   },
// ];

export default function TrelloPage() {
  const { data, signUser } = useGetTasksService();
  const [tasks, setTasks] = useState(data);

  useEffect(() => {
    signUser();
  }, []);

  function handleDragEnd(event) {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id;
    const newStatus = over.id;

    setTasks(() =>
      tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: newStatus,
            }
          : task
      )
    );
  }
  return (
    <div className="p-4">
      <DndContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
          {COLUMNS.map((column) => (
            <Column
              key={column.id}
              column={column}
              tasks={tasks.filter((task) => task.status === column.id)}
            />
          ))}
        </div>
      </DndContext>
      <Modal
        title={"Adicionar tarefas no Kanban"}
        buttonText={"Adicionar Task"}
        description={"Adicione uma nova tarefa ao seu Kanban"}
      >
        <Input placeholder="Título da tarefa" />
        <Input placeholder="Descrição da tarefa" />
        <Input placeholder="Status da tarefa" />
      </Modal>
    </div>
  );
}
