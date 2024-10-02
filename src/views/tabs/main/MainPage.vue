<template>
  <ion-page>
    <ion-header>
    </ion-header>
    <ion-content :fullscreen="true">
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">

  import { useUserStore } from '@/stores/user';
  import { IonPage, IonHeader, IonToolbar, IonContent, IonItem, IonLabel, IonIcon} from '@ionic/vue';

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

</style>



