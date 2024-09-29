<template>
    <ion-page>
      
      <ion-content :fullscreen="true">
        <!--list of habits-->

        <ion-modal 
          :initial-breakpoint="0.25" 
          :breakpoints="[0, 0.25, 0.5, 0.75]"      
          ref="modal"
          :is-open="true"
          id="modal">
          <ion-content class="ion-padding">
            <ion-item lines="none" >
            <ion-button id="pick-icon-button">
              <ion-icon aria-hidden=true size="md" :icon="waterSharp">  </ion-icon>
            </ion-button>
            <ion-input 
              id="hobby-name" 
              class="ion-margin-horizontal" 
              label="Hobby's name:" 
              label-placement="stacked"
              placeholder="Trink water">  
            </ion-input>
          </ion-item>
          <ion-item lines="none" >
            <ion-input 
              id="hobby-amount"
              label="Amount:" 
              label-placement="stacked"
              type="number"
              placeholder="10">  
            </ion-input>
            <ion-input 
              id="hobby-unit"
              label="Unit:" 
              label-placement="stacked"
              placeholder="cups">  
            </ion-input>
            <ion-select
              id="hobby-frequency"
              label="Frequency:" 
              label-placement="stacked"
              value="daily">
              <ion-select-option value="daily">daily</ion-select-option>
              <ion-select-option value="weekly">weekly</ion-select-option>
            </ion-select>
          </ion-item>    
          <ion-item lines="none">
            <ion-button id="add-habit-button">Add</ion-button>
          </ion-item>
          </ion-content>
        </ion-modal>
      </ion-content>
    </ion-page>
  </template>
  
  <script setup lang="ts">
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonModal, IonButton, IonIcon, IonInput, IonSelect, IonSelectOption } from '@ionic/vue';
  import { waterSharp } from 'ionicons/icons';

  /* add beforeunload for checking changes on modal before going to another page */
  </script>

  <style scoped>
    #pick-icon-button {
      width: 50px;
      height: 50px;
    }
    #hobby-name {
      width: auto;
    }
    #modal {
    /*margin-bottom:57px;*/
    }
    #add-habit-button {
      width: -webkit-fill-available;
      width: fill-available;
    }
  </style>
  