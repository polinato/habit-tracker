<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ userName }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="main" href="/tabs/main">
          <ion-icon aria-hidden="true" :icon="homeSharp" />
        </ion-tab-button>
        
        <ion-tab-button tab="statistic" href="/tabs/statistic">
          <ion-icon aria-hidden="true" :icon="statsChartSharp" />
        </ion-tab-button>

        <ion-tab-button tab="add-habit" href="/tabs/add-habit">
          <ion-icon aria-hidden="true" :icon="addCircleSharp" />
        </ion-tab-button>

        <ion-tab-button tab="blocks" href="/tabs/blocks">
          <ion-icon aria-hidden="true" :icon="calendarSharp" />
        </ion-tab-button>

        <ion-tab-button tab="profile" href="/tabs/profile">
          <ion-icon aria-hidden="true" :icon="personSharp" />
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
  import { useUserStore } from '@/stores/user';
  import { computed, defineComponent } from 'vue';

  import { homeSharp, calendarSharp, personSharp, statsChartSharp, addCircleSharp } from 'ionicons/icons';
  import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage, IonRouterOutlet, IonTitle } from '@ionic/vue';

  const userStore = useUserStore();
  const userName = computed(() => userStore.currentUser ? userStore.getCurrentUserFirstName : "BYE!");

</script>
