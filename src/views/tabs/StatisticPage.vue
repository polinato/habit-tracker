<template>
  <ion-page>
    <ion-content :fullscreen="true">

      <ion-item lines="none" id="frequency-item">
        
    <ion-tabs id="tabs-frequency">
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar id="tab-bar-frequency">
        <ion-tab-button tab="days" href="/tabs/statistic/days">
          <ion-label>Days</ion-label>
        </ion-tab-button>
        
        <ion-tab-button tab="weeks" href="/tabs/statistic/weeks">
          <ion-label>Weeks</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="months" href="/tabs/statistic/months">
          <ion-label>Months</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
    </ion-item>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
  import { useUserStore } from '@/stores/user';
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonIcon, IonTabBar, IonTabButton, IonRouterOutlet, IonTabs} from '@ionic/vue';

  import { personCircleSharp } from 'ionicons/icons';
  import { computed } from 'vue';
  
  const userStore = useUserStore();
  const userFirstName = computed(() => userStore.currentUser ? userStore.getCurrentUserFirstName : "BYE!");
  const userSecondName = computed(() => userStore.currentUser ? userStore.getCurrentUserSecondName : "BYE!");

</script>

<style>

  #user-item {
    margin:8px 24px 16px 24px;
  }

  ion-icon[slot="start"] {
    margin-right:8px;
  }

  #tab-bar-frequency .ion-tab-button {
    border: none;
    border-radius: 0;
    --background: transparent;
  }

  #tab-bar-frequency {
    background-color: aliceblue;
    border-radius: 40px;
    width:200px;
    height:40px;
  }

  #frequency-item {
    text-align: -webkit-center;
    margin: 0px 24px 16px 24px;
  }


  #tab-bar-frequency .ion-tab-button:first-child {
    border-top-left-radius: 40px;
    border-bottom-left-radius: 40px;
  }

  #tab-bar-frequency .ion-tab-button:last-child {
    border-top-right-radius: 40px;
    border-bottom-right-radius: 40px;
  }

  #tab-bar-frequency .tab-selected {
    background-color:lightskyblue;
    border-radius: 40px;
  }

  ion-tab-bar {
    --background: transparent;
  }
  
  ion-content {
    --padding-top:64px;
    --padding-left:8px;
    --padding-right:8px;
  }
</style>