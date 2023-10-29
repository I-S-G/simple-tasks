import "./task.styles.scss"
import Trash from "../../assets/trash.svg";

import { Group, Menu } from "@mantine/core";
import { STATUS_TYPES, TaskType, useTaskStore } from "../../store/tasks-store";

type TaskPropsType = {
    task: TaskType
}
 
export default function Task ({task}: TaskPropsType) {

    const removeTask = useTaskStore((store) => store.removeTask);
    const setDraggedTask = useTaskStore((store) => store.setDraggedTask);
    const moveTask = useTaskStore((store) => store.moveTask);

    const handleRemove = () => removeTask(task.title);
    const handleSwitch = (newStatus: STATUS_TYPES) => {
        moveTask(task.title, newStatus);
    }

    return (
        <div className="task" draggable onDrag={(e) => {
            e.preventDefault();
            setDraggedTask(task.title)
        }}>
            <p>{task.title}</p>
            <Group justify="space-between">
                <img src = {Trash} alt= "trash" onClick={handleRemove} />
                <Menu>
                    <Menu.Target>
                        <div className= {`status ${task.status}`}> {task.status} </div>
                    </Menu.Target>
                    <Menu.Dropdown>
                        <Menu.Item disabled= {task.status === STATUS_TYPES.planned} onClick={() => handleSwitch(STATUS_TYPES.planned)}>
                            Planned
                        </Menu.Item>
                        <Menu.Item disabled= {task.status === STATUS_TYPES.ongoing} onClick={() => handleSwitch(STATUS_TYPES.ongoing)}>
                            Ongoing
                        </Menu.Item>
                        <Menu.Item disabled= {task.status === STATUS_TYPES.completed} onClick={() => handleSwitch(STATUS_TYPES.completed)}>
                            Completed
                        </Menu.Item>
                    </Menu.Dropdown>
                </Menu>
            </Group>
        </div>
    )
}