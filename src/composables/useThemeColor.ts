import { ref, watch, watchEffect } from 'vue';

import { themes } from '../data/colorSistems';
interface Theme{
  light:string,
  dark?:string,
  color?:string,
  name?: string; 
}


const defaultDarkMode:null|string = 'lara-dark-blue';
const currentTheme = ref({ name: 'lara-light-blue', isDark:false, hasModeDark: true })

const useThemeColor = ()=>{

  const changeThemeCurrent = (name: string) => {
    let theme = themes.find(theme => theme.light === name );

    if (!theme){
      theme = themes.find(theme => theme.dark === name );
      currentTheme.value = { name: theme.dark, isDark:true, hasModeDark: true };
    }else{
      const hasModeDark = !theme.dark ? false:true
      console.log('theme::: ', theme);
      console.log('hasModeDark::: ', hasModeDark);
      
      currentTheme.value = { name: theme.light, isDark:false,hasModeDark:hasModeDark };
    }

  };

  // quiero devolver themes solo con la propiedad light
  const themesLight = themes.map((theme:Theme)=>{
  return {
  name:theme.light,
  color:theme.color
  }
  })

    return {
      currentTheme,
      changeThemeCurrent,
      themesLight,
      themes
    };
}
export default useThemeColor
