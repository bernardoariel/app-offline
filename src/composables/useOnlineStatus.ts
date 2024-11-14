import { ref, watch } from 'vue';
const isOnline = ref(navigator.onLine);

const updateOnlineStatus = () => {
    isOnline.value = navigator.onLine;
};

// Agrega los eventos `online` y `offline` al cargar
window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);

// // Observa cambios en el estado de conexión y consologuea cada cambio
// watch(isOnline, (newStatus) => {
//     console.log(newStatus ? "Conectado a internet" : "Sin conexión a internet");
// });

export function useOnlineStatus() {
    return { isOnline };
}
