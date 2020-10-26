import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  DocumentChangeAction,
  DocumentReference,
} from "@angular/fire/firestore";
import * as firebase from "firebase";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ContentService {
  constructor(private firestore: AngularFirestore) {}

  getContentByType(type: string): Observable<DocumentChangeAction<any>[]> {
    return this.firestore
      .collection("content", (ref) => ref.where("type", "==", type))
      .snapshotChanges();
  }

  createContent(content: any): Promise<DocumentReference> {
    return this.firestore.collection("content").add(content);
  }

  updateContent(content: any): Promise<void> {
    const contentId = content.id;
    delete content.id;
    return this.firestore.doc("content/" + contentId).update(content);
  }

  deleteContent(contentId: string): any {
    return this.firestore.doc("content/" + contentId).delete();
  }

  updateTimestamp(): any {
    return firebase.firestore.FieldValue.serverTimestamp();
  }
}
