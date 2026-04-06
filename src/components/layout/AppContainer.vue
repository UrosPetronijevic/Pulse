<!-- src/components/layout/AppContainer.vue -->
<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import TopBar from "./TopBar.vue";

const authStore = useAuthStore();
</script>

<template>
  <div class="app-wrapper">
    <TopBar v-if="authStore.isLoggedIn" />
    <main>
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.app-wrapper {
  background-color: #080c14;
}
</style>
