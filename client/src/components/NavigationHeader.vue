<template>
  <header
    class="row q-pa-md q-mx-auto"
    style="
      max-width: 70rem;
      width: 100%;
      gap: 1rem;
      line-height: 1.5rem;
      font-size: 1rem;
    "
  >
    <router-link to="/" class="header-logo row">PyShopJL</router-link>
    <nav class="">
      <ul class="row q-ma-none" style="gap: ">
        <li class="q-ml-sm" v-for="(item, index) in links" v-bind:key="index">
          <router-link
            :to="item.path"
            v-if="item.name !== 'Profile' || isUserAuthorized"
            >{{ item.name }}</router-link
          >
        </li>
      </ul>
    </nav>
    <button
      class="q-ml-auto"
      :onclick="authStore.logout"
      v-if="isUserAuthorized"
    >
      Logout
    </button>
    <template v-if="!isUserAuthorized">
      <div class="q-ml-auto row">
        <router-link to="/login" class="q-mr-xs">Login</router-link>
        <router-link to="/register">Register</router-link>
      </div>
    </template>
  </header>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useAuthStore } from 'src/stores/authStore';

const authStore = useAuthStore();

const links = ref([
  { name: 'Profile', path: '/profile' },
  { name: 'About', path: '/about' },
]);
const isUserAuthorized = ref(authStore.isLoggedIn);

watch(
  () => authStore.isLoggedIn,
  (value) => {
    isUserAuthorized.value = value;
  }
);

// watch(authStore.isLoggedIn, (value) => {
//   isUserAuthorized.value = value;
// });
</script>
<style>
.header-logo {
  background: linear-gradient(to right, #dd33b3, #1ca6b5);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  /* font-weight: bold; */
}
.router-link-active {
  color: #ff6347;
}
</style>
