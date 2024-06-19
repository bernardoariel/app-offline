import { ref, watch, watchEffect } from 'vue';
import { themes } from '../data/colorSistems';
interface Theme{
  light:string,
  dark?:string,
  color?:string,
  name?: string; 
}
interface SelectedTheme{
  name:string,
  isDark:boolean,
  hasModeDark:boolean
}

const currentTheme = ref<SelectedTheme>({ name: 'lara-light-blue', isDark:false, hasModeDark: true })

const useThemeColor = ()=>{

  const changeThemeCurrent = (name: string) => {
    let theme = themes.find(theme => theme.light === name );

    if (!theme){
      theme = themes.find(theme => theme.dark === name );
      currentTheme.value = { name: theme.dark, isDark:true, hasModeDark: true };
    }else{
      const hasModeDark = !theme.dark ? false:true

      
      currentTheme.value = { name: theme.light, isDark:false,hasModeDark:hasModeDark };
    }

  };
  const saveThemeToLocalStorage = () => {
    localStorage.setItem('currentTheme', JSON.stringify(currentTheme.value));
  };
  const loadThemeFromLocalStorage = () => {
    const savedTheme = localStorage.getItem('currentTheme');

    if (savedTheme) {
      currentTheme.value = JSON.parse(savedTheme);
    }else{
      currentTheme.value = { name: 'lara-light-blue', isDark:false, hasModeDark: true }
    }
  };
  
  watch(currentTheme, saveThemeToLocalStorage, { deep: true });

  const themesLight = themes.map((theme: Theme) => {
    return {
      name: theme.light,
      color: theme.color
    };
  });
  
  return {
    currentTheme,
    changeThemeCurrent,
    themesLight,
    themes
  };
}
export default useThemeColor
