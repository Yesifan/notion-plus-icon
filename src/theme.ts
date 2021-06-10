type ThemeProps = typeof light;

declare module "@emotion/react" {
  export interface Theme extends ThemeProps {}
}

export const light = {
  color: 'rgb(55, 53, 47)',
  subColor: 'rgba(55, 53, 47, 0.6)',
  menu:{
    color: 'rgba(0, 0, 0, 0.9)',
    background:'rgb(247, 246, 243)',
    hoverColor: 'rgb(71, 76, 80)'
  },
  button:{
    color:'rgba(55, 53, 47, 0.08)',
    color2:'rgba(55, 53, 47, 0.16)'
  },
  input:{
    background: 'rgba(242, 241, 238, 0.6)'
  },
  clear: 'rgba(55, 53, 47, 0.3)'
};

export const dark = {
  color: 'rgba(255, 255, 255, 0.9)',
  subColor: 'rgba(255, 255, 255, 0.6)',
  menu:{
    color: 'rgba(255, 255, 255, 0.8)',
    background:'rgb(55, 60, 63)',
    hoverColor: 'rgb(71, 76, 80)'
  },
  button:{
    color:'rgb(71, 76, 80)',
    color2:'rgb(63, 68, 71)'
  },
  input:{
    background: 'rgba(15, 15, 15, 0.3)'
  },
  clear: 'rgba(202, 204, 206, 0.4)'
};