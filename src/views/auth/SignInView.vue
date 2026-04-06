<script setup lang="ts">
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import AuthCard from "@/components/auth/AuthCard.vue";
import OAuthButtons from "@/components/auth/OAuthButtons.vue";
import BaseInput from "@/components/ui/BaseInput.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import BaseCheckbox from "@/components/ui/BaseCheckbox.vue";

const router = useRouter();
const authStore = useAuthStore();

const form = reactive({
  email: "",
  password: "",
  remember: false,
});

const errors = reactive({
  email: "",
  password: "",
});

function validate() {
  let valid = true;

  errors.email = "";
  errors.password = "";

  if (!form.email.trim()) {
    errors.email = "Required";
    valid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Invalid email";
    valid = false;
  }

  if (!form.password) {
    errors.password = "Required";
    valid = false;
  }

  return valid;
}

function handleOAuth(provider: string) {
  console.log(`OAuth with ${provider}`);
}

function handleSubmit() {
  if (!validate()) return;

  authStore.login();
  router.push("/dashboard");
}
</script>

<template>
  <div class="page">
    <div class="bg-gradient" />

    <AuthCard
      label="Welcome Back"
      title="Sign in to your account"
      subtitle="Access your dashboard and manage your projects"
    >
      <div class="oauth-wrapper">
        <OAuthButtons @oauth="handleOAuth" />
      </div>

      <div class="divider">
        <div class="divider-line" />
        <span class="divider-text">Or continue with email</span>
        <div class="divider-line" />
      </div>

      <div class="form-fields">
        <BaseInput
          v-model="form.email"
          label="Email address"
          type="email"
          placeholder="you@example.com"
          icon="mail"
          :error="errors.email"
        />
        <BaseInput
          v-model="form.password"
          label="Password"
          type="password"
          placeholder="Enter your password"
          icon="lock"
          :error="errors.password"
        />
      </div>

      <div class="form-actions">
        <div class="remember-row">
          <BaseCheckbox v-model="form.remember">Remember me</BaseCheckbox>
          <RouterLink to="/forgot-password" class="forgot-link">
            Forgot password?
          </RouterLink>
        </div>

        <BaseButton type="submit" @click="handleSubmit">Sign in</BaseButton>

        <p class="footer-text">
          Don't have an account?
          <RouterLink to="/signup">Create one</RouterLink>
        </p>
      </div>
    </AuthCard>
  </div>
</template>

<style scoped>
.page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 24px;
}

.bg-gradient {
  position: fixed;
  width: 700px;
  height: 700px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 9999px;
  border: 1px solid #00e0ff1a;
  box-shadow: #00e0ff1a 0px 0px 160px 0px, #00e0ff0d 0px 0px 160px 0px inset;
  pointer-events: none;
}

.oauth-wrapper {
  width: 100%;
  margin-bottom: 24px;
}

.divider {
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
  margin-bottom: 20px;
}

.divider-line {
  flex: 1;
  height: 1px;
  background-color: #ffffff14;
}

.divider-text {
  color: #ffffff4d;
  font-size: 11px;
  text-transform: uppercase;
  white-space: nowrap;
}

.form-fields {
  display: flex;
  flex-direction: column;
  gap: 14px;
  width: 100%;
  margin-bottom: 16px;
}

.form-actions {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
}

.remember-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.forgot-link {
  color: #00e0ff;
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
  white-space: nowrap;
}

.forgot-link:hover {
  text-decoration: underline;
}

.footer-text {
  text-align: center;
  color: #ffffff66;
  font-size: 13px;
}

.footer-text a {
  color: #00e0ff;
  font-weight: 600;
  text-decoration: none;
}

.footer-text a:hover {
  text-decoration: underline;
}
</style>
