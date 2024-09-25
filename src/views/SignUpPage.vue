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
                        <h1 class="ion-padding">Create an account</h1>
                        </ion-col>
                    </ion-row>
                    <ion-row>
                        <ion-col>
                        <form @submit.prevent="signUp">  
                            <ion-input 
                            class="input-field" 
                            v-model="newUser.firstName"
                            fill="solid" 
                            label-placement="floating" 
                            label="First name" 
                            type="text"
                            required>  
                            </ion-input>
                            <ion-input 
                            class="input-field" 
                            v-model="newUser.secondName" 
                            fill="solid" 
                            label-placement="floating" 
                            label="Second name" 
                            type="text"
                            required>  
                            </ion-input>
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
                            class="sign-up-button ion-justify-content-center ion-margin-top" 
                            fill="solid"
                            type="submit"> 
                            Sign up 
                            </ion-button>
                            <ion-alert
                                v-if="alertData.showAlert"
                                :is-open="alertData.showAlert"
                                :header="alertData.alertHeader"
                                :message="alertData.alertMessage"
                                :buttons="alertButtons"      
                                @didDismiss="resetAlert">
                            </ion-alert>
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
    IonIcon, 
    IonAlert
  } from '@ionic/vue';
  import { defineComponent, ref, computed, reactive } from 'vue';
  import { arrowBackOutline, eye, eyeOff } from 'ionicons/icons';
  import { useUserStore } from '@/stores/user.js';

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
      IonAlert
    },
    
    setup() {
      const isPasswordVisible = ref(false);
      const togglePasswordVisability = () => {
        isPasswordVisible.value = !isPasswordVisible.value;
      };
      const eyeIcon = computed(() => (isPasswordVisible.value ? eyeOff : eye));
      const passwordType = computed(() => (isPasswordVisible.value ? 'text' : 'password'));

      const userStore = useUserStore();

      const newUser = ref({
        firstName: '',
        secondName: '',
        email: '',
        password: '',
      });

      const alertData = reactive({
        showAlert: false,
        alertHeader: '',
        alertMessage: '',
      });

      const signUp = () => {
        if (userStore.isExist(newUser.value.email)) {
          alertData.alertHeader = "Oops!";
          alertData.alertMessage = "This email is already signed up!";
        } 
        else {
          userStore.addUser(newUser.value.firstName, newUser.value.secondName, newUser.value.email, newUser.value.password);
          alertData.alertHeader = "Congratulation!";
          alertData.alertMessage = "You are signed up!";
        }
        //console.log(userStore.users)
        alertData.showAlert = true;
      };

      const resetAlert = () => {
        alertData.showAlert = false;
        alertData.alertHeader = '';
        alertData.alertMessage = '';
      };

      const alertButtons = ['OK'];

      return { 
        arrowBackOutline, 
        eyeIcon,
        passwordType,
        togglePasswordVisability, 
        newUser,
        signUp,
        alertData,
        alertButtons,
        resetAlert
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
    .sign-up-button {
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