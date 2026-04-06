<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import AuthCard from "@/components/auth/AuthCard.vue";
import BaseInput from "@/components/ui/BaseInput.vue";
import BaseButton from "@/components/ui/BaseButton.vue";

const router = useRouter();

const submitted = ref(false);

const form = reactive({
  email: "",
});

const errors = reactive({
  email: "",
});

function validate() {
  let valid = true;

  errors.email = "";

  if (!form.email.trim()) {
    errors.email = "Required";
    valid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Invalid email";
    valid = false;
  }

  return valid;
}

function handleSubmit() {
  if (!validate()) return;
  submitted.value = true;
}
</script>

<template>
  <div class="page">
    <div class="bg-gradient" />

    <AuthCard
      title="Forgot password?"
      subtitle="No worries — enter the email address associated with your account and we'll send you a link to reset your password."
    >
      <template #icon>
        <div class="key-icon">
          <svg
            width="22"
            height="22"
            stroke="currentColor"
            fill="none"
            stroke-width="1.75"
            viewBox="0 0 24 24"
            stroke-linecap="round"
            stroke-linejoin="round"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="7.5" cy="15.5" r="5.5" />
            <path d="M21 2l-9.6 9.6" />
            <path d="M15.5 7.5l3 3L22 7l-3-3" />
          </svg>
        </div>
      </template>

      <div class="form-container">
        <!-- Success state -->
        <div v-if="submitted" class="success-box">
          <svg
            width="18"
            height="18"
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            viewBox="0 0 24 24"
            stroke-linecap="round"
            stroke-linejoin="round"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span>Reset link sent! Check your inbox.</span>
        </div>

        <!-- Form state -->
        <template v-else>
          <div class="form-fields">
            <BaseInput
              v-model="form.email"
              label="Email address"
              type="email"
              placeholder="you@example.com"
              icon="mail"
              :error="errors.email"
            />
          </div>

          <div class="form-actions">
            <BaseButton type="submit" @click="handleSubmit">
              Send reset link
            </BaseButton>
          </div>
        </template>
      </div>
      <div class="divider">
        <div class="divider-line" />
        <span class="divider-text">or</span>
        <div class="divider-line" />
      </div>

      <RouterLink to="/signin" class="back-link">
        <svg
          width="16"
          height="16"
          stroke="currentColor"
          fill="none"
          stroke-width="2"
          viewBox="0 0 24 24"
          stroke-linecap="round"
          stroke-linejoin="round"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
        Back to sign in
      </RouterLink>
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

.key-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #00c8ff26 0%, #00e0ff1a 100%);
  border: 1px solid #00e0ff33;
  border-radius: 16px;
  color: #00e0ff;
  box-shadow: #00e0ff26 0px 0px 30px 0px;
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
  width: 100%;
}

.divider {
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
  margin-top: 24px;
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

.back-link {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #00e0ff;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  transition: opacity 0.2s ease;
}

.back-link:hover {
  opacity: 0.8;
}

.success-box {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 14px 16px;
  margin-bottom: 16px;
  background-color: #00e0ff0f;
  border: 1px solid #00e0ff33;
  border-radius: 12px;
  color: #00e0ff;
  font-size: 13px;
  font-weight: 500;
}

.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 144px;
}
</style>
