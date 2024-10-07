import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    users: [],
    currentUser: null,
  }),

  persist: true,

  actions: {
    addUser(firstName, secondName, email, password) {
      const newUser = {
        id: Math.floor(100000 + Math.random() * 900000),
        firstName,
        secondName,
        email,
        password,
        habits: [],
      };
      this.users.push(newUser);
    },

    addHabit(name, frequency, unit, amount, icon) {

        if (this.currentUser) {
            const user = this.users.find((user) => user.id === this.currentUser);
      
            if (user) {

                if (!user.habits) {
                    user.habits = [];
                }
        
                const newHabit = {
                    id: user.habits ? user.habits[user.habits.length-1] : 0, 
                    name,
                    frequency,
                    unit,
                    amount,
                    icon
                };

                user.habits.push(newHabit);
            } 
            
            else {
                console.error("User not found. Cannot add habit.");
            }
        } 

        else {
            console.error("No current user is logged in.");
        }
    },

    deleteHabit(habitId) {

        if (this.currentUser) {
            const user = this.users.find((user) => user.id === this.currentUser);
            
            if (user) {
              const habitIndex = user.habits.findIndex((habit) => habit.id === habitId);
              
              if (habitIndex !== -1) {
                user.habits.splice(habitIndex, 1);
              } 
              else {
                console.error("Habit not found.");
              }
            } 
            else {
              console.error("User not found. Cannot delete habit.");
            }
          } 
          else {
            console.error("No current user is logged in.");
        }
    },

    editHabit(id, name, frequency, unit, amount, icon) {

      if (this.currentUser) {
        const user = this.users.find((user) => user.id === this.currentUser);
    
        if (user) {
          const habit = user.habits.find((habit) => habit.id === id);
    
          if (habit) {
            habit.name = name;
            habit.frequency = frequency;
            habit.unit = unit;
            habit.amount = amount;
            habit.icon = icon;
          } 
          else {
            console.error("Habit not found.");
          }
        } 
        else {
          console.error("User not found.");
        }
      } 
      else {
        console.error("No current user is logged in.");
      }
    },
      
    logIn(email, password) {
      const user = this.users.find((user) => user.email === email && user.password === password);

      if (user) {
        this.currentUser = user.id;
        return true;
      } 
      else return false;
    },

    logOut() {
      this.currentUser = null;
    },
  },

  getters: {
    isExist: (state) => (newEmail) => {
      return state.users.some((user) => user.email === newEmail);
    },

    getCurrentUser: (state) => {
      return state.currentUser
        ? state.users.find((user) => user.id === state.currentUser)
        : null;
    },

    getCurrentUserFirstName: (state) => {
      const user = state.currentUser
        ? state.users.find((user) => user.id === state.currentUser)
        : null;
      return user ? user.firstName : null;
    },

    getCurrentUserSecondName: (state) => {
      const user = state.currentUser
        ? state.users.find((user) => user.id === state.currentUser)
        : null;
      return user ? user.secondName : null;
    },

    getCurrentUserEmail: (state) => {
      const user = state.currentUser
        ? state.users.find((user) => user.id === state.currentUser)
        : null;
      return user ? user.email : null;
    },

    getCurrentUserHabits: (state) => {
      const user = state.currentUser
        ? state.users.find((user) => user.id === state.currentUser)
        : null;
      return user ? user.habits : [];
    },
  
    getUsersHabitById: (state) => (habitId) => {

     /* const user = state.currentUser
        ? state.users.find((user) => user.id === state.currentUser)
        : null;
      
      if (user && Array.isArray(user.habits)) {*/
      const user = state.users.find((user) => user.id === state.currentUser);
      return user ? user.habits.find((habit) => habit.id === habitId) : null;
     /* }
      
      return null;*/
    },
  }
});
