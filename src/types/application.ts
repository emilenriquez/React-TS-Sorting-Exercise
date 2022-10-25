import { TFilter } from "./filter";

export type Application = {
  id: string,
  name: string,
  spend: number,
  BCAP1: string,
  BCAP2: string,
  BCAP3: string
}; /* use `interface` if exporting so that consumers can extend */


export type TAppState = {
  data: Application[],
  filteredData: Application[],
  isFiltered: boolean,
  filters: TFilter[]
}
