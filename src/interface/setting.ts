interface SettingProrps {
  notion:{
    link:boolean,
    image:boolean
  }
}

export type Setting = Partial<SettingProrps>;
