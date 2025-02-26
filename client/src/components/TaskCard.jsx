/* eslint-disable react/prop-types */
import { useDraggable } from "@dnd-kit/core";
import { Card, CardTitle } from "./ui/card";

export function TaskCard({ task }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
      }
    : undefined;

  return (
    <Card
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="cursor-grab rounded-lg bg-neutral-700 p-4 shadow-sm hover:shadow-md"
      style={style}
    >
      <CardTitle className="font-medium text-neutral-100">
        {task.title}
      </CardTitle>
      <p className="mt-2 text-sm text-neutral-400">{task.description}</p>
    </Card>
  );
}
