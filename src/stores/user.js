import { defineStore } from "pinia";

export const useUserStore = defineStore('user', {
    state: () => ({
        users: []
    }),
    persist: true,
    actions: {
        addUser (firstName, secondName, email, password) {
            const newUser = {
                id: Math.floor(100000 + Math.random() * 900000),
                firstName,
                secondName,
                email,
                password,
            }
            this.users.push(newUser);
        }
    },
    getters: {
            
        isExist: (state) => (newEmail) => {
            return state.users.some((user) => user.email === newEmail);
        },
        checkUser: (state) => (checkEmail, checkPassword) => {
            return state.users.some((user) => user.email === checkEmail && user.password === checkPassword);
        }
    },
    persist: true
})