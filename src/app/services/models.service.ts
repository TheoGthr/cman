import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  DocumentChangeAction,
  DocumentReference,
} from "@angular/fire/firestore";
import * as firebase from "firebase";
import { Observable } from "rxjs";
import { Model } from "../types";

@Injectable({
  providedIn: "root",
})
export class ModelsService {
  constructor(private firestore: AngularFirestore) {}

  getModelsNames(): Observable<DocumentChangeAction<any>[]> {
    return this.firestore.collection("models").snapshotChanges();
  }

  createModel(model: Model): Promise<DocumentReference> {
    return this.firestore.collection("models").add(model);
  }

  updateModel(model: Model): Promise<void> {
    const modelId = model.id;
    delete model.id;
    return this.firestore.doc("models/" + modelId).update(model);
  }

  deleteModel(modelId: string): any {
    return this.firestore.doc("models/" + modelId).delete();
  }

  updateTimestamp(): any {
    return firebase.firestore.FieldValue.serverTimestamp();
  }
}
