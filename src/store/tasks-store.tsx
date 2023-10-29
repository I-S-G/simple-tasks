import { create } from "zustand";
import { persist, subscribeWithSelector } from "zustand/middleware";
import { updateTasks } from "../utils/firebase/firebase.utils";
import { useUserStore } from "./user-store";

export enum STATUS_TYPES {
    planned = "PLANNED",
    ongoing = "ONGOING",
    completed = "COMPLETED"
}

export type TaskType = {
    title: string,
    status: STATUS_TYPES
}

type StoreType = {
    tasks: TaskType[],
    draggedTask: null | string,
    setTasks: (tasks: TaskType[]) => void,
    addTask: (title: string, status: STATUS_TYPES) => void,
    removeTask: (title: string) => void,
    setDraggedTask: (title: string | null) => void,
    moveTask: (title: string, status: STATUS_TYPES) => void
}

export const useTaskStore = create(subscribeWithSelector(persist<StoreType>((set) => ({
    tasks: [],
    draggedTask: null,
    setTasks: (tasks: TaskType[]) => set({tasks}),
    addTask: (title: string, status: STATUS_TYPES) => set((prevState) => ({tasks: [...prevState.tasks, {title, status}]})),
    removeTask: (title: string) => set((prevState) => ({ tasks: prevState.tasks.filter((task) => task.title !== title) })),
    setDraggedTask: (title: string | null) => set({draggedTask: title}),
    moveTask: (title: string, status: STATUS_TYPES) => set((prevState) => ({tasks: prevState.tasks.map((task) => task.title === title? {title, status}: task)}))
}), {name: "taskstore"})))

useTaskStore.subscribe(
    (store => store.tasks),
    async (newTasks,_) => {
        const uid = useUserStore.getState().currentUser;
        if(uid) {
            await updateTasks(uid, newTasks);
    }
})