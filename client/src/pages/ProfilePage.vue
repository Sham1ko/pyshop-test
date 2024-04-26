<template>
  <q-page class="container q-pa-md">
    <div class="text-center">
      <h4 class="text-h4 q-mt-none">Profile Page</h4>
    </div>
    <div class="profile-form q-mt-lg">
      <div class="full-width q-mb-md">
        <label class="text-h6">User Information</label>
      </div>
      <q-input
        outlined
        v-model="user.name"
        label="Name"
        lazy-rules
        class="full-width q-mb-md"
      ></q-input>
      <q-input
        outlined
        v-model="user.phoneNumber"
        label="Phone Number"
        mask="(###) ###-####"
        lazy-rules
        class="full-width q-mb-md"
      ></q-input>
      <q-input
        outlined
        v-model="user.address"
        label="Address"
        lazy-rules
        class="full-width q-mb-md"
      ></q-input>
      <button
        class="full-width q-mb-md bg-green-8 text-white border-radius-inherit"
        label="Save"
        @click="handleUpdateUser"
      >
        Save
      </button>
    </div>
    <button
      class="q-mt-md bg-red-8 text-white q-mx-auto full-width"
      label="Logout"
      @click="showDeleteDialog = true"
    >
      Delete Account
    </button>

    <q-dialog v-model="showDeleteDialog">
      <q-card>
        <q-toolbar>Delete Account</q-toolbar>
        <q-card-section>
          Are you sure you want to delete your account?
        </q-card-section>
        <q-card-actions align="right">
          <q-btn label="Cancel" color="primary" flat v-close-popup />
          <q-btn
            label="Delete"
            color="negative"
            flat
            @click="authStore.deleteAccount"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
}

.full-width {
  flex: 1;
}

.profile-form {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
}
</style>
<script setup lang="ts">
import { useAuthStore } from 'src/stores/authStore';
import { ref, watch } from 'vue';
import { Notify } from 'quasar';

const authStore = useAuthStore();
const user = ref(authStore.user);

watch(authStore.user, () => {
  user.value = authStore.user;
});

const showDeleteDialog = ref(false);

function handleUpdateUser() {
  const updatedUser = {
    name: user.value.name,
    address: user.value.address,
    phoneNumber: user.value.phoneNumber,
  };

  const response = authStore.updateUser(updatedUser);
  if (!response) {
    return Notify.create({
      message: 'Failed to update user information',
      color: 'red-8',
      position: 'top',
    });
  } else {
    Notify.create({
      message: 'User information updated successfully',
      color: 'green-8',
      position: 'top',
    });
  }
}
</script>
