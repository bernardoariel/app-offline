import { ref } from 'vue';

const fontSize = ref(14);

export const useFontSize = () => {

  const loadFontSize = () => {
    const savedFontSize = localStorage.getItem('fontSize');
    fontSize.value = savedFontSize ? parseInt(savedFontSize) : fontSize.value;
    document.documentElement.style.fontSize = `${fontSize.value}px`;
  };

  return {
    fontSize,
    loadFontSize
  };
};