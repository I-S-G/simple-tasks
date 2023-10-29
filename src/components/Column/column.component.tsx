import { useMemo, useState } from "react";
import { Group, Stack, Popover, Button } from "@mantine/core";
import { useForm, SubmitHandler } from "react-hook-form";

import { STATUS_TYPES, useTaskStore } from "../../store/tasks-store";
import Task from "../Task/task.component";

import Add from "../../assets/add.svg";
import "./column.styles.scss";

type ColumnPropsType = {
    state: STATUS_TYPES
}

type Inputs = {
    title: string;
}

export default function Column({state}: ColumnPropsType) {

    const tasks = useTaskStore((store) => store.tasks);
    const filteredTasks = useMemo(() => tasks.filter((task) => task.status === state), [state, tasks]);

    const draggedTask = useTaskStore((store) => store.draggedTask);

    const addTask = useTaskStore((store) => store.addTask);
    const setDraggedTask = useTaskStore((store) => store.setDraggedTask)
    const moveTask = useTaskStore((store) => store.moveTask);

    const [opened, setOpened] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm<Inputs>()

      const onSubmit: SubmitHandler<Inputs> = (data) => {
        !errors.title && setOpened(false);
        reset();
        addTask(data.title, state);
      }

    return (
        <Stack className="column" 
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
                e.preventDefault();
                draggedTask && moveTask(draggedTask, state);
                setDraggedTask(null);
            }}
        >
            <Group justify="space-between">
                <span> {state} </span>
                <Popover width={300} trapFocus position="bottom" withArrow shadow="md" opened={opened} onChange={setOpened}>
                    <Popover.Target>
                        <img src= {Add} onClick={() => setOpened((o) => !o)} />
                    </Popover.Target>
                    <Popover.Dropdown>
                        <form onSubmit={handleSubmit(onSubmit)} className="popover-form" >
                            <input {...register("title", {
                                required: "Task is required",
                                validate: (value) => {
                                    let val: boolean | string = true;
                                    tasks.forEach((task) => {
                                        if (task.title === value) val = "Task must be unique";
                                    });
                                    return val;
                                }
                            })} />
                            {
                                errors.title && <p>{errors.title.message}</p>
                            }
                            <Button type="submit" color="teal"> Add </Button>
                        </form>
                    </Popover.Dropdown>
                </Popover>
            </Group>
            {
                filteredTasks.map((task) => <Task task= {task} key={task.title} />)
            }
        </Stack>
    )
}