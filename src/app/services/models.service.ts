import { Injectable } from "@angular/core";
import { AngularFirestore, DocumentReference } from "@angular/fire/firestore";
import { Store } from "@ngrx/store";
import { map, take } from "rxjs/operators";
import * as firebase from "firebase";
import {
  createModelSuccess,
  createModelFail,
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
        take(1),
        map((changes) =>
          changes.map((c) => ({
            id: c.payload.doc.id,
            ...(c.payload.doc.data() as Model),
          }))
        )
      );
  }

  createModel(model: Model): Promise<DocumentReference> {
    return this.firestore.collection("models").add(model);
  }

  updateModel(model: Model): Promise<void> {
    const { id, ...modelWithoutId } = model;
    const timestamp = this.updateTimestamp();
    return this.firestore
      .doc("models/" + id)
      .update({ ...modelWithoutId, lastUpdate: timestamp });
  }

  deleteModel(modelId: string): Promise<void> {
    return this.firestore.doc("models/" + modelId).delete();
  }

  updateTimestamp(): any {
    return firebase.firestore.FieldValue.serverTimestamp();
  }
}
