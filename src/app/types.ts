export interface Horodate {
  seconds: number;
  nanoseconds: number;
}

export interface Model {
  id?: string;
  label: string;
  type: string;
  icon: string;
  lastUpdate: Horodate;
  definition: { [key: string]: any };
}

export interface Content {
  [key: string]: any;
}

export interface ModelsState {
  models: Model[];
  isLoaded: boolean;
  isCreated: boolean;
  isUpdated: boolean;
  error: Error;
}

export interface ContentState {
  contentList: any[];
  isLoaded: boolean;
}

export interface AppState {
  models: ModelsState;
  content: ContentState;
}
