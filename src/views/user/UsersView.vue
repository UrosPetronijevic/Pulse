<script setup lang="ts">
import { onMounted } from "vue";
import { useUsers } from "@/composables/useUsers";
import DashboardPanel from "@/components/dashboard/DashboardPanel.vue";
import BaseIcon from "@/components/ui/BaseIcon.vue";

const { users, loading, error, fetchUsers } = useUsers();

onMounted(fetchUsers);
</script>

<template>
  <div class="users-view">
    <div class="page-header">
      <div class="page-header-text">
        <h1 class="page-title">Users</h1>
        <p class="page-subtitle">Manage and monitor all registered users</p>
      </div>
      <button class="add-user-btn">
        <BaseIcon name="plus" :size="15" :stroke-width="2.5" />
        <span>Add User</span>
      </button>
    </div>

    <div v-if="loading" class="state-message">Loading...</div>

    <div v-else-if="error" class="state-message state-message--error">
      {{ error }}
    </div>

    <div v-else class="table-container">
      <DashboardPanel
        title="All Users"
        dot="cyan"
        :users="users"
        :columns="[
          'id',
          'username',
          'fullName',
          'createdAt',
          'isActive',
          'isLoggedIn',
          'action',
        ]"
      />
    </div>
  </div>
</template>

<style scoped src="@/assets/css/views/user/UsersView.css"></style>
