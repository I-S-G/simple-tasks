import { create } from "zustand";
import { getUserData } from "../utils/firebase/firebase.utils";
import { useTaskStore } from "./tasks-store";

type UserStoreType = {
    currentUser: null | string,
    loadUser: (uid: string) => Promise<void>,
    signOutUser: () => void
}

export const useUserStore = create<UserStoreType>((set) => ({
    currentUser: null,
    signOutUser: () => {
        set({currentUser: null})
    },
    loadUser: async (uid: string) => {
        const setTasks = useTaskStore.getState().setTasks;
        set({currentUser: uid});
        const userData = await getUserData(uid);
        if (userData?.tasks) {
            setTasks(userData.tasks);
        }
    }
}))
