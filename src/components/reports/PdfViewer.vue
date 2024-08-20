<template>
  <div>
    <div id="pdf-container"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onActivated } from 'vue';
import PDFObject from 'pdfobject';
import { useViewPdf } from '@/composables/useViewPdf';

const { generatePdf, pdfUrl } = useViewPdf();
const pdfContainer = ref(null);

const embedPdf = () => {
  if (pdfUrl.value) {
    PDFObject.embed(pdfUrl.value, "#pdf-container", {
      height: "600px",
      width: "100%",
      pdfOpenParams: {
        toolbar: "0",
        navpanes: "0",
        statusbar: "0",
        view: "FitH"
      }
    });
  }
};

const generateAndEmbedPdf = async () => {
  try {
    await generatePdf();
    embedPdf();
  } catch (error) {
    console.error("Error generating and embedding PDF:", error);
  }
};

onMounted(() => {
  generateAndEmbedPdf();
});

onActivated(() => {
  generateAndEmbedPdf();
});

watch(pdfUrl, (newUrl) => {
  if (newUrl) {
    embedPdf();
  }
});
</script>

<style scoped>
/* Add your styles here */
</style>