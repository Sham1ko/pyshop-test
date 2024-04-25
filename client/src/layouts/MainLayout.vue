<template>
  <q-layout view="lHh Lpr lFf">
    <navigation-header />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import NavigationHeader from 'src/components/NavigationHeader.vue';
</script>
