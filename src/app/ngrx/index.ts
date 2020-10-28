import { contentReducer } from "./content.reducer";
import { modelsReducer } from "./models.reducer";

export const reducers = {
  models: modelsReducer,
  content: contentReducer,
};
