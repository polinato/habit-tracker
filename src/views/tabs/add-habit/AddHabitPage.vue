<template>
  <ion-page>
    <ion-content class="gradient-content">

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
              <ion-button @click="editHabit(habit.id)" class="habit-button" id="edit-habit-button">
                <ion-icon class="habit-management-icon" aria-hidden="true" size="small" :icon="icons.hammerSharp"></ion-icon>
              </ion-button>
              <ion-button @click="deleteHabit(habit.id)" class="habit-button" id="delete-habit-button">
                <ion-icon class="habit-management-icon" aria-hidden="true" size="small" :icon="icons.trashBinSharp"></ion-icon>
              </ion-button>
            </div>
          </div>
        </ion-card>
      </ul>

      <!--Add new habit modal-->
      <ion-modal 
        :initial-breakpoint="0.26" 
        ref="modal" 
        :is-open="modals.addHabit" 
        class="modal" 
        aria-hidden="!modals.addHabit"
        trigger="add-habit-button-tab"
        :swipe-to-close="false"
        :backdrop-dismiss="false">
        <ion-content class="ion-padding">
          
          <ion-modal :is-open="modals.iconPicker" @will-dismiss="closeModal('iconPicker')">
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
            <ion-button id="pick-icon-button" @click="openModal('iconPicker')">
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
              <ion-select-option value="daily" aria-selected="true">daily</ion-select-option>
              <ion-select-option value="weekly">weekly</ion-select-option>
            </ion-select>
          </ion-item>

          <ion-item lines="none">
            <ion-button id="close-button" @click="closeManagement('addHabit')">Close</ion-button>
            <ion-button id="add-habit-button" @click="addHabit">Add</ion-button>
          </ion-item>
        </ion-content>
      </ion-modal>

      <!--Edit habit modal-->
      <ion-modal 
        :initial-breakpoint="0.26" 
        ref="modal" 
        :is-open="modals.editHabit" 
        class="modal" 
        aria-hidden="!modals.editHabit"
        :swipe-to-close="false"
        :backdrop-dismiss="false">
        <ion-content class="ion-padding">
          
          <ion-modal :is-open="modals.iconPicker" @will-dismiss="closeModal('iconPicker')">
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
            <ion-button id="pick-icon-button" @click="openModal('iconPicker')">
              <ion-icon :icon="getIcon(editedHabit.icon)" aria-hidden="true" size="large"></ion-icon>
            </ion-button>

            <ion-input
              v-model="editedHabit.name"
              id="habit-name"
              class="ion-margin-horizontal"
              label="Habit's name:"
              label-placement="stacked"
              placeholder="Drink water">
            </ion-input>
          </ion-item>

          <ion-item lines="none">
            <ion-input
              v-model="editedHabit.amount"
              id="habit-amount"
              label="Amount:"
              label-placement="stacked"
              type="number"
              placeholder="10"
              value="1">
            </ion-input>
            <ion-input
              v-model="editedHabit.unit"
              id="habit-unit"
              label="Unit:"
              label-placement="stacked"
              placeholder="cups">
            </ion-input>
            <ion-select
              v-model="editedHabit.frequency"
              id="habit-frequency"
              label="Frequency:"
              label-placement="stacked"
              interface="popover"
              value="editedHabit.frequency">
              <ion-select-option value="daily">daily</ion-select-option>
              <ion-select-option value="weekly">weekly</ion-select-option>
            </ion-select>
          </ion-item>

          <ion-item lines="none">
            <ion-button id="close-button" @click="closeManagement('editHabit')">Close</ion-button>
            <ion-button id="update-habit-button" @click="updateHabit">Update</ion-button>
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
  id: 0,
  name: "",
  frequency: "",
  unit: "",
  amount: 0,
  icon: "waterSharp"
});

const editedHabit = ref(newHabit);
const resetedHabit = ref(newHabit);

const userStore = useUserStore();
const habits = computed(() => userStore.getCurrentUserHabits);

const addHabit = () => {
  if (newHabit.value.name && newHabit.value.frequency && newHabit.value.unit && newHabit.value.amount) {
    userStore.addHabit(newHabit.value.name, newHabit.value.frequency, newHabit.value.unit, newHabit.value.amount, newHabit.value.icon);

    //resetHabit("newHabit");
    closeModal("addHabit");
  }
};

const deleteHabit = (habitId: number) => {
  userStore.deleteHabit(habitId);
};

const editHabit = (habitId: number) => {
  const habit = userStore.getUsersHabitById(habitId);

  if (habit) {
    editedHabit.value = { ...habit };
    openModal("editHabit");
  } 
  else {
    console.error("Habit not found.");
  }
};

const updateHabit = () => {
  if (
    editedHabit.value.name &&
    editedHabit.value.frequency &&
    editedHabit.value.unit &&
    editedHabit.value.amount
  ) {
    userStore.editHabit(
      editedHabit.value.id, 
      editedHabit.value.name,
      editedHabit.value.frequency,
      editedHabit.value.unit,
      editedHabit.value.amount,
      editedHabit.value.icon
    );
    //resetHabit("editedHabit");
    closeModal("editHabit");
  } else {
    console.error("Please fill in all fields");
  }
};

const selectedIcon = ref(icons.waterSharp); 
const myIcons = ref<string[]>([]);

const selectIcon = (iconName: string) => {
  selectedIcon.value = getIcon(iconName); 
  newHabit.value.icon = iconName; 
  closeModal("iconPicker");
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

const modals = ref({
  addHabit: true,
  editHabit: false,
  iconPicker: false
})

const closeManagement = (modal: "addHabit" | "editHabit") => {
  closeModal(modal);
}

const openModal = (modal: "addHabit" | "editHabit" | "iconPicker") => {
 /* if(modal == "addHabit") resetHabit("newHabit"); 
  else if (modal == "editHabit") resetHabit("editedHabit");*/
  modals.value[modal] = true;
};

const closeModal = (modal: "addHabit" | "editHabit" | "iconPicker") => {
  modals.value[modal] = false;
};
/*
const resetHabit = (habit: "newHabit" | "editedHabit" ) => {
  if (habit == "newHabit") {
    newHabit.value = Object.assign(resetedHabit);
    console.log(newHabit);
  }
  else {
    editedHabit.value = Object.assign(resetedHabit);
    console.log(editedHabit);
  }
}
*/
onMounted(() => {
 /* openModal("addModal");*/
  loadIcons();
  console.log(userStore.getCurrentUserHabits);
});
</script>

<style scoped>

.gradient-content {
  position: relative;
  --padding-start: 0; /* Remove default padding */
  padding: 0; /* Custom padding */
  display: flex;
  flex-direction: column;
  height: 100%; /* Ensures it fills the space between header and footer */
  overflow-y: auto; /* Enable scrolling if necessary */
}

.card-list {
  flex: 1;
  overflow-y: scroll;
  position: relative;
  padding: 12px;
  scroll-padding: 12px;
}

/* Gradient Fading Effect at Top and Bottom */
.gradient-content::before, 
.gradient-content::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  height: 50px; /* Size of the gradient area */
  pointer-events: none; /* Allow interaction with items below */
  z-index: 1;
}

.gradient-content::before {
  top: 0;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
}

.gradient-content::after {
  bottom: 0;
  background: linear-gradient(to top, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
}

ion-content {
  display: contents;
  padding: 8px;
  --padding-top:8px;
  --padding-bottom:8px;
}

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
  justify-content: space-around;
  margin-left: 16px;
}

.habit-header {
  text-align: left;
  padding: 0px;
  font-size: large;
  font-weight: bold;
  color: var(--ion-text-color);
}

.habit-label {
  text-align: left;
  font-size: medium;
  color: var(--ion-text-color-step-100);
}

.card-list {
  padding: 0px 8px 8px 8px;
  display: contents;
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

.inner-scroll {
  padding-top: 8px;
  top: 8px !important;
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

#add-habit-button, #update-habit-button, #close-button {
  width: -webkit-fill-available;
  width: fill-available;
  height: 36px;
}

#close-button.button-solid {
  --background: var(--ion-color-primary-tint) !important;
}

</style>
