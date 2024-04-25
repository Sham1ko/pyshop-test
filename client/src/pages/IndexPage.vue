<template>
  <q-page class="row items-center justify-evenly">
    {{ user }}
  </q-page>
</template>

<script setup lang="ts">
import { useAuthStore } from 'src/stores/authStore';
import { ref } from 'vue';

const authStore = useAuthStore();

const user = ref(authStore.user);
</script>
