import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";

export function useOnlineStatus() {
  const isOnline = ref(navigator.onLine);
  const router = useRouter();

  const handleOnline = () => {
    isOnline.value = true;
  };

  const handleOffline = () => {
    isOnline.value = false;
  };

  onMounted(() => {
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
  });

  onUnmounted(() => {
    window.removeEventListener("online", handleOnline);
    window.removeEventListener("offline", handleOffline);
  });

  return { isOnline };
}
