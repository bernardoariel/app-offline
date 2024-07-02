import { useFontSize } from '@/composables/useFontSize';
import { describe, test, expect, beforeEach } from 'vitest';
import { ref } from 'vue';

// Mock de localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem(key: string) {
      return store[key] || null;
    },
    setItem(key: string, value: string) {
      store[key] = value;
    },
    clear() {
      store = {};
    },
    removeItem(key: string) {
      delete store[key];
    },
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('useFontSize', () => {
  beforeEach(() => {
    localStorageMock.clear();
    document.documentElement.style.fontSize = '';
  });

  test('debe aplicar el tamaño de fuente predeterminado si no hay valor en localStorage', () => {
    const { loadFontSize, fontSize } = useFontSize();
    loadFontSize();
    expect(fontSize.value).toBe(14);
    expect(document.documentElement.style.fontSize).toBe('14px');
  });

  test('debe aplicar el tamaño de fuente guardado en localStorage', () => {
    localStorage.setItem('fontSize', '18');
    const { loadFontSize, fontSize } = useFontSize();
    loadFontSize();
    expect(fontSize.value).toBe(18);
    expect(document.documentElement.style.fontSize).toBe('18px');
  });
});
