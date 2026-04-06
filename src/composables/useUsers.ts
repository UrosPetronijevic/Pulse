import { ref } from "vue";
import type { User } from "@/types/user";

export function useUsers() {
  const users = ref<User[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function fetchUsers(): Promise<void> {
    loading.value = true;
    error.value = null;
    try {
      const res = await fetch("/mockup-users.json");
      if (!res.ok) throw new Error("Failed to fetch users");
      users.value = await res.json();
    } catch (e) {
      error.value = (e as Error).message;
    } finally {
      loading.value = false;
    }
  }

  return { users, loading, error, fetchUsers };
}
