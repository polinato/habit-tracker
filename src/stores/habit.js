import { defineStore } from "pinia";
import { useUserStore } from "./user";

export const useHobyStore = defineStore("habit", {
    state: () => ({
        habits: [],
    }),

    persist: true,

    actions: {
        setHabbit (userId, habitId) {

            if(userId && habitId) {

                const newHabit = {

                    habitId,
                    userId,
                    date: new Date(),
                    progress: 0
                }
            }
        }
    }

})