import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Store } from "@ngrx/store";
import { map } from "rxjs/operators";
import * as firebase from "firebase";
import {
  createModel,
  deleteModel,
  updateModel,
} from "../ngrx/models/models.actions";
import { Model } from "../types";

@Injectable({
  providedIn: "root",
})
export class ModelsService {
  constructor(private firestore: AngularFirestore, private store: Store) {}

  getModels() {
    return this.firestore
      .collection("models")
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({
            id: c.payload.doc.id,
            ...(c.payload.doc.data() as Model),
          }))
        )
      );
  }

  createModel(model: Model): Promise<void> {
    return this.firestore
      .collection("models")
      .add(model)
      .then((modelRes) => {
        this.store.dispatch(createModel());
      });
  }

  updateModel(model: Model): Promise<void> {
    const modelId = model.id;
    delete model.id;
    return this.firestore
      .doc("models/" + modelId)
      .update(model)
      .then((modelRes) => {
        this.store.dispatch(updateModel());
      });
  }

  deleteModel(modelId: string): any {
    return this.firestore
      .doc("models/" + modelId)
      .delete()
      .then(() => {
        this.store.dispatch(deleteModel({ modelId }));
      })
      .catch((e) => console.error(e));
  }

  updateTimestamp(): any {
    return firebase.firestore.FieldValue.serverTimestamp();
  }
}
