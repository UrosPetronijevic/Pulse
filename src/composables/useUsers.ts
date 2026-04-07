import { ref } from "vue";
import type { User } from "@/types/user";

const users = ref<User[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);

export function useUsers() {
  async function fetchUsers(): Promise<void> {
    if (users.value.length > 0) return; // already fetched, skip
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
