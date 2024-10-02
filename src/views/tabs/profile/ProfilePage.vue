<template>
  <ion-page>
    <ion-header>
    </ion-header>
    <ion-content :fullscreen="true">

      <ion-item lines="none" id="log-out-item" @click="logOut">
        <ion-icon aria-hidden=true size="md" :icon="logOutSharp"></ion-icon>
        <ion-label> Log out </ion-label>
      </ion-item>

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">

  import { useUserStore } from '@/stores/user';
  import { IonPage, IonHeader, IonContent, IonItem, IonLabel, IonIcon} from '@ionic/vue';
  import { logOutSharp } from 'ionicons/icons';
  import { computed } from 'vue';
  import { useRouter } from 'vue-router';

  const userStore = useUserStore();
  const userFirstName = computed(() => userStore.currentUser ? userStore.getCurrentUserFirstName : "BYE!");
  const userSecondName = computed(() => userStore.currentUser ? userStore.getCurrentUserSecondName : "BYE!");

  const router = useRouter();

  const logOut = () => {
    userStore.logOut();
    router.push({path:"/log-in"})
  } 

</script>

<style scoped>

  ion-icon {
    margin-right: 8px;
  }

</style>