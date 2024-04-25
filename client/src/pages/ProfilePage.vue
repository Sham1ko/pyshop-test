<template>
  <q-page class="container">
    <h4 class="text-h4 q-mt-none">Profile Page</h4>
    <h6 class="text-h6 q-ma-none">Hello , {{ userEmail }}</h6>
    <div class="profile-form">
      <div class="row justify-between q-px-xl">
        <q-input
          outlined
          v-model="user.email"
          label="Email"
          lazy-rules
          :rules="[(val) => !!val || 'Email is required']"
        ></q-input>
        <q-input outlined v-model="user.name" label="Name" lazy-rules></q-input>
      </div>
      <div class="row justify-between q-px-xl">
        <q-input
          outlined
          v-model="user.phoneNumber"
          label="Phone Number"
          mask="(###) ###-####"
          lazy-rules
        ></q-input>
        <q-input
          outlined
          v-model="user.address"
          label="Address"
          lazy-rules
        ></q-input>
      </div>
    </div>
  </q-page>
</template>
<script setup lang="ts">
import { useAuthStore } from 'src/stores/authStore';
import { ref, watch } from 'vue';

const authStore = useAuthStore();
const user = ref(authStore.user);
const userEmail = authStore.user.email;

watch(authStore.user, () => {
  user.value = authStore.user;
});
</script>
<style lang="css">
.container {
  width: 100%;
  max-width: 70rem;
  margin: 0 auto;
}

.profile-form {
  margin: 0 auto;
  width: 70%;
  margin-top: 2rem;
  border: 1px solid #ccc;
}
</style>
