type ThemeProps = Partial<typeof light>;

declare module "@emotion/react" {
  export interface Theme extends ThemeProps {}
}

export const light = {
  color: 'rgba(0, 0, 0, 0.9)',
  background:'rgb(247, 246, 243)',
  hoverColor: 'rgb(71, 76, 80)'
};

export const dark = {
  color: 'rgba(255, 255, 255, 0.8)',
  background:'rgb(55, 60, 63)',
  hoverColor: 'rgb(71, 76, 80)'
};