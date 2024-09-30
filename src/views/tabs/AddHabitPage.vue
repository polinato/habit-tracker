<template>
    <ion-page>
      
      <ion-content :fullscreen="true">
        <!--list of habits-->
        <ul class="card-list">
          <ion-card v-for="habit in habits" :key="habit.id" class="habit-card">
            <div class="habit-content">
              <div class="habit-icon-container">
                <ion-icon aria-hidden="true" :icon="waterSharp" class="habit-icon"></ion-icon>
              </div>
              <div class="habit-details">
                <ion-card-header class="habit-header">{{ habit.name }}</ion-card-header>
                <ion-label class="habit-label">{{ habit.amount }} {{ habit.unit }} {{ habit.frequency }}</ion-label>
              </div>
              <div class="habit-management">
                <ion-button class="habit-button" id="edit-habit-button">
                  <ion-icon class="habit-management-icon" aria-hidden=true size="small" :icon="hammerSharp">  </ion-icon>
                </ion-button>
                <ion-button @click="deleteHabit(habit.id)" class="habit-button" id="delete-habit-button">
                  <ion-icon class="habit-management-icon" aria-hidden=true size="small" :icon="trashBinSharp">  </ion-icon>
                </ion-button>
              </div>
            </div>
          </ion-card>
        </ul>

        <ion-modal 
          :initial-breakpoint="0.26" 
          :breakpoints="[0, 0.26, 0.5]"      
          ref="modal"
          :is-open="isModalOpen"
          class="modal"
          :inert="!isModalOpen"
          :aria-hidden="!isModalOpen"
          trigger="add-habit-button" >
          <ion-content class="ion-padding">
            <ion-item lines="none" >
            <ion-button id="pick-icon-button">
              <ion-icon aria-hidden=true size="large" :icon="waterSharp">  </ion-icon>
            </ion-button>
            <ion-input 
              v-model="newHabit.name"
              id="habit-name"
              class="ion-margin-horizontal" 
              label="Habit's name:" 
              label-placement="stacked"
              placeholder="Drink water">  
            </ion-input>
          </ion-item>
          <ion-item lines="none" >
            <ion-input 
              v-model="newHabit.amount"
              id="habit-amount"
              label="Amount:" 
              label-placement="stacked"
              type="number"
              placeholder="10"
              value="1">  
            </ion-input>
            <ion-input 
              v-model="newHabit.unit"
              id="habit-unit"
              label="Unit:" 
              label-placement="stacked"
              placeholder="cups">  
            </ion-input>
            <ion-select
              v-model="newHabit.frequency"
              id="habit-frequency"
              label="Frequency:" 
              label-placement="stacked"
              interface="popover"
              value="daily" >
              <ion-select-option value="daily">daily</ion-select-option>
              <ion-select-option value="weekly">weekly</ion-select-option>
            </ion-select>
          </ion-item>    
          <ion-item lines="none">
            <ion-button id="add-habit-button" @click="addHabit">Add</ion-button>
          </ion-item>
          </ion-content>
        </ion-modal>
      </ion-content>
    </ion-page>
  </template>
  
  <script setup lang="ts">
  import { useUserStore } from '@/stores/user';
  import { IonPage, IonCard, IonContent, IonModal, IonButton, IonIcon, IonInput, IonSelect, IonSelectOption, IonItem, modalController, IonImg, IonCardHeader, IonLabel } from '@ionic/vue';
  import { hammerSharp, trashBinSharp, trashSharp, waterSharp } from 'ionicons/icons';
  import { computed, onBeforeUnmount, onMounted, ref } from 'vue';

  /* add beforeunload for checking changes on modal before going to another page */

  const newHabit = ref({
    name: "",
    frequency: "",
    unit: "",
    amount: 0
  });

  const userStore = useUserStore();
  const habits = computed(() => userStore.getCurrentUserHabits); 
  const isModalOpen = ref(true);

  const addHabit = () => {
    if (newHabit.value.name && newHabit.value.frequency && newHabit.value.unit && newHabit.value.amount) {
      userStore.addHabit(newHabit.value.name, newHabit.value.frequency, newHabit.value.unit, newHabit.value.amount);
    }
    closeModal();
  }

  const deleteHabit = (habitId: number) => {
      userStore.deleteHabit(habitId);
  }

  const openModal = () => {
    isModalOpen.value = true;
  };

  const closeModal = () => {
    isModalOpen.value = false;
  };  

  onMounted(() => { 
    openModal(); 
  })

  </script>

  <style scoped>
    #pick-icon-button {
      width: 50px;
      height: 50px;
    }
    #habit-name {
      width: auto;
    }
    .modal {
    /*margin-bottom:57px;*/
    }
    #add-habit-button {
      width: -webkit-fill-available;
      width: fill-available;
      height:36px;
    }

    .habit-card {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px;
      height:100px;
    }

    .habit-content {
      display: flex;
      align-items: center;
      width: 100%;
    }

    .habit-icon {
      width: 56px;
      height: 56px;
    }

    .habit-icon-container {
      display: center;
    }

    .habit-details {
      height: 50px;
      width: -webkit-fill-available;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-left: 16px;
    }

    .habit-header {
      text-align: left;
      padding: 0px;
      font-size: x-large;
      font-weight: bold;
    }

    .habit-label {
      text-align: left;
      font-size: larger;
      color: gray;
    }

    .card-list {
      padding: 16px;
    }

    .habit-management {
      display: grid;
      margin-top: -6px;
      margin-bottom: -6px;
    }

    .habit-button {
      width: 36px;
      height: 36px;
      padding: 0px;
    }

    .button-native {
      padding: 0px;
    }

    .habit-management-icon {
      margin: -8px;
    }

  </style>
  