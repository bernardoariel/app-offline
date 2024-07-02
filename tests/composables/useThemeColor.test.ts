import { ref, nextTick } from 'vue';
import useThemeColor from '@/composables/useThemeColor';
import { themes } from '@/data/colorSistems';

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

describe('useThemeColor', () => {
  beforeEach(() => {
    localStorageMock.clear();
    document.documentElement.setAttribute('data-theme', '');
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('debe inicializar con el tema predeterminado', () => {
    const { currentTheme } = useThemeColor();
    expect(currentTheme.value.name).toBe('lara-light-blue');
    expect(currentTheme.value.isDark).toBe(false);
    expect(currentTheme.value.hasModeDark).toBe(true);
  });

  test('debe cambiar a un nuevo tema y aplicarlo', () => {
    const { currentTheme, changeThemeCurrent } = useThemeColor();
    const newTheme = themes[1].light; // Cambia al segundo tema en la lista

    changeThemeCurrent(newTheme);

    expect(currentTheme.value.name).toBe(newTheme);
    expect(currentTheme.value.isDark).toBe(false);
    expect(currentTheme.value.hasModeDark).toBe(!!themes[1].dark);
    expect(document.documentElement.getAttribute('data-theme')).toBe(`${newTheme}-light`);
  });

  test('debe guardar el tema actual en localStorage', async () => {
    const { currentTheme, changeThemeCurrent } = useThemeColor();
    const newTheme = themes[1].light; // Cambia al segundo tema en la lista

    changeThemeCurrent(newTheme);
    await nextTick(); // Espera a que se resuelvan las reactividades

    expect(localStorage.getItem('currentTheme')).toBe(JSON.stringify(currentTheme.value));
  });

  test('debe cargar el tema desde localStorage', () => {
    const { currentTheme, changeThemeCurrent } = useThemeColor();
    const newTheme = themes[1].light; // Cambia al segundo tema en la lista

    changeThemeCurrent(newTheme);

    const { currentTheme: newCurrentTheme } = useThemeColor();
    expect(newCurrentTheme.value.name).toBe(newTheme);
    expect(newCurrentTheme.value.isDark).toBe(false);
    expect(newCurrentTheme.value.hasModeDark).toBe(!!themes[1].dark);
    expect(document.documentElement.getAttribute('data-theme')).toBe(`${newTheme}-light`);
  });

  test('debe manejar nombres de tema inválidos correctamente', () => {
    const consoleSpy = vi.spyOn(console, 'log');
    const { currentTheme, changeThemeCurrent } = useThemeColor();

    changeThemeCurrent('nombre-de-tema-invalido');

    expect(currentTheme.value.name).toBe('lara-light-blue'); // Debe permanecer en el predeterminado
    expect(consoleSpy).toHaveBeenCalledWith('Theme with name nombre-de-tema-invalido not found.');
  });

  test('debe aplicar correctamente el tema oscuro', () => {
    const { currentTheme, changeThemeCurrent } = useThemeColor();
    const darkTheme = themes.find((theme) => theme.dark); // Encuentra un tema con una variante oscura

    if (darkTheme) {
      changeThemeCurrent(darkTheme.dark as string);

      expect(currentTheme.value.name).toBe(darkTheme.dark);
      expect(currentTheme.value.isDark).toBe(true);
      expect(currentTheme.value.hasModeDark).toBe(true);
      expect(document.documentElement.getAttribute('data-theme')).toBe(`${darkTheme.dark}-dark`);
    }
  });

  test('debe inicializar y guardar el tema predeterminado si no existe en localStorage', async () => {
    // arrange: Asegúrate de que no haya tema en el localStorage
    localStorageMock.clear();
    
    // act: Inicializa el composable
    const { currentTheme } = useThemeColor();
    await nextTick(); // Espera a que se resuelvan las reactividades

    // assert: Verifica que se inicializa con el tema predeterminado y se guarda en localStorage
    expect(currentTheme.value.name).toBe('lara-light-blue');
    expect(currentTheme.value.isDark).toBe(false);
    expect(currentTheme.value.hasModeDark).toBe(true);
    expect(localStorage.getItem('currentTheme')).toBe(JSON.stringify(currentTheme.value));
  });
});
