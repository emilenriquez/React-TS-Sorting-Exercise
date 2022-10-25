import { Application as AppType } from './application';

export type TActiveBCAPFilters = {
  BCAP1: string[]
  BCAP2: string[]
  BCAP3: string[]
}
export type TFilter = {
  key: keyof AppType,
  value: TActiveBCAPFilters | number
}
