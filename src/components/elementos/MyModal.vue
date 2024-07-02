  <script setup lang="ts">
  import { defineProps, defineEmits } from 'vue';
  import Dialog from 'primevue/dialog';
  import Button from 'primevue/button';
  
  const props = defineProps({ 
    visible: Boolean,
    title: String,
    icon: String,
    iconColor: String,
    message: String,
    showAcceptButton: Boolean,
    showCancelButton: Boolean,
  });
  
  const emits = defineEmits(['update:visible', 'accept', 'cancel']);
  
  const onHide = () => {
    emits('update:visible', false);
  };
  
  const onAccept = () => {
    emits('accept');
    emits('update:visible', false);
  };
  
  const onCancel = () => {
    emits('cancel');
    emits('update:visible', false);
  };
  </script>

  <template>
    <Dialog :visible="visible" @hide="onHide" modal :style="{ width: '500px' }">
      <template #header>
        <div class="modal-header">
          <h2>{{ title }}</h2>
        </div>
      </template>
      <div class="modal-body">
        <i :class="['pi', icon]" :style="{ fontSize: '2rem', color: iconColor }"></i>
        <p>{{ message }}</p>
      </div>
      <template #footer>
        <div class="modal-footer">
          <Button v-if="showAcceptButton" label="Aceptar" @click="onAccept" />
          <Button v-if="showCancelButton" label="Cancelar" class="p-button-secondary" @click="onCancel" />
        </div>
      </template>
    </Dialog>
  </template>
  
  <style scoped>
  .modal-header {
    display: flex;
    width: 100%;
    height: auto;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid #ddd;
  }
  
  .modal-body {
    display: flex;
    align-items: center;
    justify-items: center;
    padding: 1rem;
    gap: 1rem;
  }
  
  .modal-body p{
    font-size: 20px;
  }
  .modal-footer {
    display: flex;
    justify-content: flex-end;
    padding: 1rem;
    gap: 1rem;
  }
  </style>
  