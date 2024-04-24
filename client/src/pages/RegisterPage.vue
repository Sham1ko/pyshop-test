<template>
  <q-page padding>
    <register-form />
  </q-page>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue';
import RegisterForm from 'src/components/RegisterForm.vue';

defineComponent({
  name: 'RegisterPage',
});
</script>
