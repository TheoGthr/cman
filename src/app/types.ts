export interface Horodate {
  seconds: number;
  nanoseconds: number;
}

export interface Model {
  id: string;
  label: string;
  type: string;
  icon: string;
  lastUpdate: Horodate;
  definition: any;
}

export interface ModelsState {
  modelsList: Model[];
  isLoaded: boolean;
}

export interface AppState {
  models: ModelsState;
}
