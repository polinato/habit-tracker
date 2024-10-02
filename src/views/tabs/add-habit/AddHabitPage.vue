<template>
  <ion-page>
    <ion-content :fullscreen="true">
      
      <ul class="card-list">
        <ion-card v-for="habit in habits" :key="habit.id" class="habit-card">
          <div class="habit-content">
            <div class="habit-icon-container">
              <ion-icon :icon=getIcon(habit.icon) class="habit-icon" aria-hidden="true"></ion-icon>
            </div>
            <div class="habit-details">
              <ion-card-header class="habit-header">{{ habit.name }}</ion-card-header>
              <ion-label class="habit-label">{{ habit.amount }} {{ habit.unit }} {{ habit.frequency }}</ion-label>
            </div>
            <div class="habit-management">
              <ion-button class="habit-button" id="edit-habit-button">
                <ion-icon class="habit-management-icon" aria-hidden="true" size="small" :icon="icons.hammerSharp"></ion-icon>
              </ion-button>
              <ion-button @click="deleteHabit(habit.id)" class="habit-button" id="delete-habit-button">
                <ion-icon class="habit-management-icon" aria-hidden="true" size="small" :icon="icons.trashBinSharp"></ion-icon>
              </ion-button>
            </div>
          </div>
        </ion-card>
      </ul>

      <ion-modal :initial-breakpoint="0.26" :breakpoints="[0, 0.26, 0.5]" ref="modal" :is-open="isModalOpen" class="modal" aria-hidden="!isModalOpen" trigger="add-habit-button-tab">
        <ion-content class="ion-padding">
          
          <ion-modal :is-open="isIconPickerOpen" @will-dismiss="closeIconPicker">
            <ion-content class="ion-padding">
              <div class="icon-grid">
                <ion-button
                  v-for="iconName in myIcons"
                  :key="iconName"
                  class="icon-picker-button"
                  @click="selectIcon(iconName)">
                  <ion-icon :icon="getIcon(iconName)" aria-hidden="true" size="large"></ion-icon>
                </ion-button>
              </div>
            </ion-content>
          </ion-modal>

          <ion-item lines="none">
            <ion-button id="pick-icon-button" @click="openIconPicker">
              <ion-icon :icon="selectedIcon" aria-hidden="true" size="large"></ion-icon>
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

          <ion-item lines="none">
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
              value="daily">
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
import { IonPage, IonCard, IonContent, IonModal, IonButton, IonIcon, IonInput, IonSelect, IonSelectOption, IonItem, IonLabel, IonCardHeader } from '@ionic/vue';
import * as icons from 'ionicons/icons';
import { computed, ref, onMounted } from 'vue';

const newHabit = ref({
  name: "",
  frequency: "",
  unit: "",
  amount: 0,
  icon: icons.waterSharp 
});

const userStore = useUserStore();
const habits = computed(() => userStore.getCurrentUserHabits);
const isModalOpen = ref(true);

const addHabit = () => {
  if (newHabit.value.name && newHabit.value.frequency && newHabit.value.unit && newHabit.value.amount) {
    userStore.addHabit(newHabit.value.name, newHabit.value.frequency, newHabit.value.unit, newHabit.value.amount, newHabit.value.icon);
    closeModal();
  }
};

const deleteHabit = (habitId: number) => {
  userStore.deleteHabit(habitId);
};

const selectedIcon = ref(icons.waterSharp); 
const isIconPickerOpen = ref(false);
const myIcons = ref<string[]>([]);

const openIconPicker = () => {
  isIconPickerOpen.value = true;
};

const closeIconPicker = () => {
  isIconPickerOpen.value = false;
};

const selectIcon = (iconName: string) => {
  selectedIcon.value = getIcon(iconName); 
  newHabit.value.icon = iconName; 
  closeIconPicker();
};

const loadIcons = async () => {
  try {
    const response = await fetch('src/stores/icons.txt');
    const data = await response.text();
    myIcons.value = data.split('\n').map(icon => icon.trim()).filter(icon => icon);
  } 
  catch (error) {
    console.error('Error fetching icons:', error);
  }
};

const getIcon = (iconName: string) => {
  return icons[iconName as keyof typeof icons]; 
};

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

onMounted(() => {
  openModal();
  loadIcons();
  console.log(userStore.getCurrentUserHabits);
});
</script>

<style scoped>
.icon-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

/* Modal styling */
.modal {
  /* margin-bottom:57px; */
}

#pick-icon-button {
  width: 50px;
  height: 50px;
}

/* Styling for habit cards */
.habit-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  height: 100px;
  background-color: var(--ion-background-color);
}

.habit-content {
  display: flex;
  align-items: center;
  width: 100%;
}

.habit-icon {
  width: 56px;
  height: 56px;
  color: var(--ion-color-tertiary);
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
  font-size: 20px;
  font-weight: bold;
  color: var(--ion-text-color);
}

.habit-label {
  text-align: left;
  font-size: medium;
  color: var(--ion-text-color-step-100);
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

.habit-button.button-solid {
  --background: var(--ion-background-color-step-50) !important;
}

.button-native {
  padding: 0px;
}

.habit-management-icon {
  margin: -8px;
}

#delete-habit-button .habit-management-icon {
  color: var(--ion-color-danger);
}

#edit-habit-button .habit-management-icon {
  color: var(--ion-color-warning);
}

#habit-name {
  width: auto;
}

#add-habit-button {
  width: -webkit-fill-available;
  width: fill-available;
  height: 36px;
}
</style>
