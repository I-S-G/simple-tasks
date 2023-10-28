import "./task.styles.scss"
import Trash from "../../assets/trash.svg";

import { Group } from "@mantine/core";
import { TaskType, useTaskStore } from "../../store/tasks-store";

type TaskPropsType = {
    task: TaskType
}
 
export default function Task ({task}: TaskPropsType) {

    const removeTask = useTaskStore((store) => store.removeTask);
    const setDraggedTask = useTaskStore((store) => store.setDraggedTask);

    const handleRemove = () => removeTask(task.title);

    return (
        <div className="task" draggable onDrag={(e) => {
            e.preventDefault();
            setDraggedTask(task.title)
        }}>
            <p>{task.title}</p>
            <Group justify="space-between">
                <img src = {Trash} alt= "trash" onClick={handleRemove} />
                <div className= {`status ${task.status}`}> {task.status} </div>
            </Group>
        </div>
    )
}