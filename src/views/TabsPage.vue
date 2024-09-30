<template>
  <ion-page>
    <ion-header class="no-shadow">
      <ion-toolbar class="no-shadow">
        <ion-icon aria-hidden=true slot="start" size="large" :icon="personCircleSharp"></ion-icon>
        <ion-label> {{userFirstName + " " + userSecondName}}  </ion-label>
      </ion-toolbar>
    </ion-header>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button id="main-button" tab="main" href="/tabs/main">
          <ion-icon aria-hidden="true" :icon="homeSharp" size="md" />
        </ion-tab-button>
        
        <ion-tab-button id="staistic-button" tab="statistic" href="/tabs/statistic">
          <ion-icon aria-hidden="true" :icon="statsChartSharp" size="md" />
        </ion-tab-button>

        <ion-tab-button id="add-habit-button" tab="add-habit" href="/tabs/add-habit">
          <ion-icon aria-hidden="true" :icon="addCircleSharp" size="md" />
        </ion-tab-button>

        <ion-tab-button id="blocks-button" tab="blocks" href="/tabs/blocks">
          <ion-icon aria-hidden="true" :icon="calendarSharp" size="md" />
        </ion-tab-button>

        <ion-tab-button id="profile-button" tab="profile" href="/tabs/profile">
          <ion-icon aria-hidden="true" :icon="personSharp" size="md" />
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
  import { computed, defineComponent } from 'vue';

  import { homeSharp, calendarSharp, personSharp, statsChartSharp, addCircleSharp, personCircleSharp } from 'ionicons/icons';
  import { IonHeader, IonToolbar, IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage, IonRouterOutlet, IonTitle, IonLabel, IonItem } from '@ionic/vue';
  import { useUserStore } from '@/stores/user';

  const userStore = useUserStore();
  const userFirstName = computed(() => userStore.currentUser ? userStore.getCurrentUserFirstName : "BYE!");
  const userSecondName = computed(() => userStore.currentUser ? userStore.getCurrentUserSecondName : "BYE!");

</script>

<style scoped>

.no-shadow {
  --ion-shadow-none: none;
  box-shadow: none !important;
}

ion-header {
  display: contents;
  height: 56px;
}

ion-toolbar {
  padding-left: 16px;
}

</style>
