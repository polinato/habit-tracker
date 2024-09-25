import { defineStore } from "pinia";

export const useUserStore = defineStore('user', {
    state: () => ({
        users: [],
        currentUser: null,
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
                habits: [],
            }
            this.users.push(newUser);
        },

        addHabit(name, frequency, unit, amount) {
           
            if (this.currentUser) {
                
                const newHabit = {
                    id: Math.floor(1000 + Math.random() * 900),
                    name,
                    frequency,
                    unit,
                    amount
                }

                this.users.find(user => user.id ==this.currentUser).habits.push(newHabit);
            }
        },
        
        logIn(email, password) {
            const user = this.users.find(user => user.email == email && user.password == password);

            if (user) {
                this.currentUser = user.id;
                return true;
            }
            else return false;
        },

        logOut(){
            this.currentUser = null;
        },
    },
    getters: {

        isExist: (state) => (newEmail) => {
            return state.users.some((user) => user.email === newEmail);
        },

        getCurrentUser() {
            return this.currentUser ? this.users.find(user => user.id ==this.currentUser) : null;
        },

        getCurrentUserFirstName() {
            return this.getCurrentUser.firstName;
        },

        getCurrentUserSecondName() {
            return this.getCurrentUser.secondName;
        },
        getCurrentUserEmail() {
            return this.getCurrentUser.email;
        },

        getCurrentUserHabits() {
            return this.getCurrentUser.habits;
        }
    }
})