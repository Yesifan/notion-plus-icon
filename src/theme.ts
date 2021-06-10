type ThemeProps = typeof light;

declare module "@emotion/react" {
  export interface Theme extends ThemeProps {}
}

export const light = {
  color: 'rgb(55, 53, 47)',
  subColor: 'rgba(55, 53, 47, 0.6)',
  underline: 'rgb(55, 53, 47)',
  menu:{
    color: 'rgba(0, 0, 0, 0.9)',
    background:'rgb(247, 246, 243)',
    hoverColor: 'rgb(71, 76, 80)'
  },
  button:{
    color:'rgba(55, 53, 47, 0.08)',
    color2:'rgba(55, 53, 47, 0.16)'
  }
};

export const dark = {
  color: 'rgba(255, 255, 255, 0.9)',
  subColor: 'rgba(255, 255, 255, 0.6)',
  underline: 'rgba(255, 255, 255, 0.9)',
  menu:{
    color: 'rgba(255, 255, 255, 0.8)',
    background:'rgb(55, 60, 63)',
    hoverColor: 'rgb(71, 76, 80)'
  },
  hover:{
    color:'rgb(71, 76, 80)',
    color2:'rgb(63, 68, 71)'
  },
  button:{
    color:'rgba(55, 53, 47, 0.08)',
    color2:'rgba(55, 53, 47, 0.16)'
  }
};