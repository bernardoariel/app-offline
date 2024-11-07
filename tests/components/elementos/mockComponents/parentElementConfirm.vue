<template>
  <div>
    <MyConfirmPopup
      v-if="isConfirmVisible"
      :config="confirmConfig"
      @accepted="handleAccepted"
      @rejected="handleRejected"
    />
    <button @click="showConfirm">Show Confirm</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { MyConfirmPopup } from "@/components/elementos/index";
import { useConfirm } from "primevue/useconfirm";

const confirmConfig = ref({
  message: "Are you sure?",
  icon: "pi pi-exclamation-triangle",
  rejectClass: "p-button-secondary",
  acceptClass: "p-button-primary",
  rejectLabel: "No",
  acceptLabel: "Yes",
  event: null,
});

const isConfirmVisible = ref(false);
const emit = defineEmits(["accepted", "rejected"]);

const showConfirm = () => {
  isConfirmVisible.value = true;
  const confirm = useConfirm();
  confirm.require({
    message: confirmConfig.value.message,
    icon: confirmConfig.value.icon,
    rejectClass: confirmConfig.value.rejectClass,
    acceptClass: confirmConfig.value.acceptClass,
    rejectLabel: confirmConfig.value.rejectLabel,
    acceptLabel: confirmConfig.value.acceptLabel,
    accept: () => {
      emit("accepted");
    },
    reject: () => {
      emit("rejected");
    },
  });
};

const handleAccepted = () => {
  console.log("Accepted");
  isConfirmVisible.value = false;
};

const handleRejected = () => {
  console.log("Rejected");
  isConfirmVisible.value = false;
};
</script>
