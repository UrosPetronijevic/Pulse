import { defineStore } from "pinia";
import { ref } from "vue";

export const useThemeStore = defineStore("theme", () => {
  const isDark = ref<boolean>(localStorage.getItem("isDark") === "true");

  function applyTheme(): void {
    if (isDark.value) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }

  function toggleTheme(): void {
    isDark.value = !isDark.value;
    localStorage.setItem("isDark", String(isDark.value));
    applyTheme();
  }

  // apply correct theme immediately when store initializes
  applyTheme();

  return { isDark, toggleTheme };
});
