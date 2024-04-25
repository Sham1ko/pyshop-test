<template lang="">
  <form @submit.prevent="handleSubmit" class="column content-center">
    <h2 class="form-title">Login</h2>
    <input placeholder="Email" class="input-field" v-model="email" />
    <input placeholder="Password" class="input-field" v-model="password" />
    <button type="submit" class="submit-btn">Login</button>
    <p class="sign-in-text">
      Don't have an account? <router-link to="/register">Register</router-link>
    </p>
  </form>
</template>

<script setup lang="ts">
import { useAuthStore } from 'src/stores/authStore';
import { ref } from 'vue';

const registrationStore = useAuthStore();

const email = ref('');
const password = ref('');

function handleSubmit() {
  registrationStore.login(email.value, password.value);
}
</script>

<style lang="css">
.form-title {
  text-align: center;
  margin-bottom: 20px;
}

.input-field {
  width: 50%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
}

.submit-btn {
  width: 50%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-btn:hover {
  background-color: #0056b3;
}

.sign-in-text {
  text-align: center;
  margin-top: 20px;
  color: #666;
}
</style>
