import { contentReducer } from "./content/content.reducer";
import { modelsReducer } from "./models/models.reducer";

export const reducers = {
  models: modelsReducer,
  content: contentReducer,
};
