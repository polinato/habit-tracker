import { defineStore } from "pinia";
import { useUserStore } from "./user";

export const useHobyStore = defineStore("hobby", {
    state: () => ({
        hobbies: [],
    }),

    persist: true,

    actions: {
        setHabbit (userId, habitId) {

            if(userId && habitId) {

                const newHabit = {

                    habitId,
                    userId,
                }
            }
        }
    }

})