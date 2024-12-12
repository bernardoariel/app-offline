import { ref, onMounted, onUnmounted } from "vue";

export function useOnlineStatus() {
  const isOnline = ref(navigator.onLine);

  const handleOnline = () => {
    isOnline.value = true;
    console.log("Tenés internet");
    alert("Ahora hay internet");
  };

  const handleOffline = () => {
    isOnline.value = false;
    console.log("Hola, te quedaste sin internet");
    alert("No hay más internet");
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
