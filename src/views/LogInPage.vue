<template>
  <ion-page>
    <ion-header :translucent="true">
    </ion-header>

    <ion-content :fullscreen="true">
      <div class="form-wrapper">
          <ion-card class="form-container ion-justify-content-center">
              <ion-grid>
                  <ion-row class="">
                      <ion-col>
                      <h1 class="ion-padding">Sign in</h1>
                      </ion-col>
                  </ion-row>
                  <ion-row>
                      <ion-col>
                      <form @submit.prevent="logIn">  
                          <ion-input 
                          class="input-field" 
                          v-model="newUser.email" 
                          fill="solid" 
                          label-placement="floating" 
                          label="Email" 
                          type="email"
                          required>  
                          </ion-input>
                          <ion-input 
                          class="input-field" 
                          v-model="newUser.password" 
                          fill="solid" 
                          label-placement="floating" 
                          label="Password" 
                          :type="passwordType"
                          required
                          minlength="8">  
                          <ion-button 
                              class="password-show-hide-button" 
                              id="show-hide" 
                              fill="clear" 
                              aria-label="Show/hide" 
                              @click="togglePasswordVisability">
                              <ion-icon :icon="eyeIcon" aria-hidden="true"></ion-icon>
                          </ion-button>
                          </ion-input>
                          <ion-button 
                          class="log-in-button ion-justify-content-center ion-margin-top" 
                          fill="solid"
                          type="submit"> 
                          Log in
                          </ion-button>
                      </form>
                      </ion-col>
                  </ion-row>
              </ion-grid>
          </ion-card>
      </div>
    </ion-content>
  </ion-page>
</template>

<script >
  import { 
    IonPage, 
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
    IonCard,
    IonGrid, 
    IonRow, 
    IonCol, 
    IonInput, 
    IonButton, 
    IonIcon 
  } from '@ionic/vue';
  import { defineComponent, ref, computed, onMounted } from 'vue';
  import { arrowBackOutline, eye, eyeOff } from 'ionicons/icons';
  import { useUserStore } from '@/stores/user.js';
  import { useRouter } from 'vue-router';

  export default defineComponent({
    components: { 
      IonPage, 
      IonHeader, 
      IonToolbar, 
      IonTitle, 
      IonContent, 
      IonCard,
      IonGrid, 
      IonRow, 
      IonCol, 
      IonInput, 
      IonButton, 
      IonIcon,
    },
    
    setup() {

      const isPasswordVisible = ref(false);

      const togglePasswordVisability = () => {
        isPasswordVisible.value = !isPasswordVisible.value;
      };

      const eyeIcon = computed(() => (isPasswordVisible.value ? eyeOff : eye));
      const passwordType = computed(() => (isPasswordVisible.value ? 'text' : 'password'));

      const userStore = useUserStore();

      const router = useRouter();

      const isLoggedIn = () => {
        if (userStore.currentUser) {
          router.push({path: "tabs/main"});
        }
      }

      onMounted(() => {
        isLoggedIn();
      });

      const newUser = ref({
        email: '',
        password: '',
      });

      const logIn = () => {
        if (userStore.logIn(newUser.value.email, newUser.value.password)) {
          console.log(userStore.currentUser);
          router.push({path: "tabs/main"});
        }
        else {
          console.error('Login failed. Invalid credentials.');
        }
        console.log(userStore.users)
      }

      return { 
        arrowBackOutline, 
        eyeIcon,
        passwordType,
        togglePasswordVisability, 
        newUser,
        logIn, 
        isLoggedIn
      };
    },
  });
</script>

<style>
  .input-field {
    margin: 10px;
    width: auto;
    --background: transparent !important; 
  }
  .password-show-hide-button {
    position: absolute;
    right: 0;
    z-index: 1;
  }
  .log-in-button {
    display: inline;
  }
  .form-container {
    max-width: 350px;
    margin: auto;
    padding: 20px;
    background: var(--ion-background-color, #fff);
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  .form-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
  }
</style>