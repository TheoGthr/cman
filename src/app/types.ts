export class Model {
  id: string;
  type: string;
  icon: string;
  lastUpdate: Date;
  definition: any;
}

export interface ModelsState {
  modelsList: Model[];
  isLoaded: boolean;
}

export interface AppState {
  models: ModelsState;
}
