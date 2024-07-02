import { ref, watch } from 'vue';
import { themes } from '../data/colorSistems';

interface Theme {
  light: string;
  dark?: string;
  color?: string;
  name?: string;
}

interface SelectedTheme {
  name: string;
  isDark: boolean;
  hasModeDark: boolean;
}

const DEFAULT_THEME: SelectedTheme = { name: 'lara-light-blue', isDark: false, hasModeDark: true };

const currentTheme = ref<SelectedTheme>({ ...DEFAULT_THEME });

const useThemeColor = () => {

  const changeThemeCurrent = (name: string) => {
    let theme = themes.find(theme => theme.light === name || theme.dark === name);

    if (theme) {
      currentTheme.value = {
        name: theme.light === name ? theme.light : theme.dark as string,
        isDark: theme.dark === name,
        hasModeDark: !!theme.dark
      };
      applyTheme();
    } else {
      console.log(`Theme with name ${name} not found.`);
    }
  };

  const applyTheme = () => {
    const themeClass = currentTheme.value.isDark ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', `${currentTheme.value.name}-${themeClass}`);
  };

  const saveThemeToLocalStorage = () => {
    localStorage.setItem('currentTheme', JSON.stringify(currentTheme.value));
  };

  const loadThemeFromLocalStorage = () => {
    const savedTheme = localStorage.getItem('currentTheme');

    if (savedTheme) {
      try {
        currentTheme.value = JSON.parse(savedTheme);
      } catch (error) {
        console.error('Error parsing saved theme from localStorage:', error);
        currentTheme.value = { ...DEFAULT_THEME };
      }
    } else {
      currentTheme.value = { ...DEFAULT_THEME };
    }

    applyTheme();
  };

  watch(currentTheme, saveThemeToLocalStorage, { deep: true });

  const themesLight = themes.map((theme: Theme) => ({
    name: theme.light,
    color: theme.color
  }));

  loadThemeFromLocalStorage();

  return {
    currentTheme,
    changeThemeCurrent,
    themesLight,
    themes
  };
}

export default useThemeColor;
