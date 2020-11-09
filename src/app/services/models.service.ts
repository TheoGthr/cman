import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Store } from "@ngrx/store";
import { map } from "rxjs/operators";
import * as firebase from "firebase";
import {
  createModelSuccess,
  createModelFail,
  updateModelSuccess,
  updateModelFail,
  deleteModelSuccess,
  deleteModelFail,
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
        this.store.dispatch(createModelSuccess({ model }));
      })
      .catch((error) => {
        this.store.dispatch(createModelFail({ error }));
      });
  }

  updateModel(model: Model): Promise<void> {
    const { id, ...modelWithoutId } = model;
    const timestamp = this.updateTimestamp();
    return this.firestore
      .doc("models/" + id)
      .update({ ...modelWithoutId, lastUpdate: timestamp });
    // .then(() => {
    //   model.id = modelId;
    //   this.store.dispatch(updateModelSuccess({ model }));
    // })
    // .catch((error) => this.store.dispatch(updateModelFail({ error })));
  }

  deleteModel(modelId: string): any {
    return this.firestore
      .doc("models/" + modelId)
      .delete()
      .then(() => {
        this.store.dispatch(deleteModelSuccess({ modelId }));
      })
      .catch((error) => this.store.dispatch(deleteModelFail({ error })));
  }

  updateTimestamp(): any {
    return firebase.firestore.FieldValue.serverTimestamp();
  }
}
