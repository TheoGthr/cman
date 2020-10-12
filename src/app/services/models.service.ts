import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Model } from "../types";

@Injectable({
  providedIn: "root",
})
export class ModelsService {
  constructor(private firestore: AngularFirestore) {}

  getModelsNames() {
    return this.firestore.collection("models").valueChanges();
  }

  createModel(model: Model) {
    return this.firestore.collection("models").add(model);
  }

  updateModel(model: Model) {
    model.lastUpdate.seconds = Date.now();
    this.firestore.doc("models/" + model.id).update(model);
  }

  deleteModel(modelId: string) {
    return this.firestore.doc("models/" + modelId).delete();
  }
}
