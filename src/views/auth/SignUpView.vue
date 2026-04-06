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
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  agreed: false,
});

function handleOAuth(provider: string) {
  console.log(`OAuth with ${provider}`);
}

function handleSubmit() {
  // hook up to backend later
  console.log(form);
}
</script>

<template>
  <div class="page">
    <!-- Background gradient -->
    <div class="bg-gradient" />

    <AuthCard
      label="Get Started"
      title="Create your account"
      subtitle="Join thousands of users building amazing projects"
    >
      <OAuthButtons @oauth="handleOAuth" />

      <div class="divider">
        <div class="divider-line" />
        <span class="divider-text">Or continue with email</span>
        <div class="divider-line" />
      </div>

      <div class="form-fields">
        <BaseInput
          v-model="form.name"
          label="Full name"
          placeholder="Enter your full name"
          icon="user"
        />
        <BaseInput
          v-model="form.email"
          label="Email address"
          type="email"
          placeholder="you@example.com"
          icon="mail"
        />
        <div class="field-with-hint">
          <BaseInput
            v-model="form.password"
            label="Password"
            type="password"
            placeholder="Create a password"
            icon="lock"
          />
          <span class="field-hint">Must be at least 8 characters</span>
        </div>
        <BaseInput
          v-model="form.confirmPassword"
          label="Confirm password"
          type="password"
          placeholder="Confirm your password"
          icon="lock"
        />
      </div>

      <BaseCheckbox v-model="form.agreed">
        I agree to the
        <a href="#">Terms of Service</a>
        and
        <a href="#">Privacy Policy</a>
      </BaseCheckbox>

      <BaseButton type="submit" @click="handleSubmit">
        Create account
      </BaseButton>

      <p class="footer-text">
        Already have an account?
        <RouterLink to="/signin">Sign in</RouterLink>
      </p>
    </AuthCard>
  </div>
</template>

<style scoped>
.page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.bg-gradient {
  position: fixed;
  inset: 0;
  background-image: linear-gradient(
    135deg,
    #00e0ff14 0%,
    #00000000 25%,
    #7800ff0f 50%,
    #00000000 75%,
    #00c8ff12 100%
  );
  pointer-events: none;
}

.divider {
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
  margin-bottom: 28px;
}

.divider-line {
  flex: 1;
  height: 1px;
  background-color: #ffffff14;
}

.divider-text {
  color: #ffffff4d;
  font-size: 12px;
  text-transform: uppercase;
  white-space: nowrap;
}

.form-fields {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  margin-bottom: 20px;
}

.field-with-hint {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.field-hint {
  color: #ffffff33;
  font-size: 12px;
  line-height: 1.33333;
}

.footer-text {
  margin-top: 28px;
  color: #ffffff66;
  font-size: 14px;
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
