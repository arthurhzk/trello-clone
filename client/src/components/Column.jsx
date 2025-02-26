/* eslint-disable react/prop-types */
import { useDroppable } from "@dnd-kit/core";
import { TaskCard } from "./TaskCard";
import { Card, CardContent, CardTitle } from "./ui/card";

export function Column({ column, tasks }) {
  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  return (
    <Card className="flex w-80 flex-col rounded-lg bg-neutral-800 p-4">
      <CardTitle className="mb-4 font-semibold text-neutral-100">
        {column.title}
      </CardTitle>
      <CardContent ref={setNodeRef} className="flex flex-1 flex-col gap-4">
        {tasks.map((task) => {
          return <TaskCard key={task.id} task={task} />;
        })}
      </CardContent>
    </Card>
  );
}
