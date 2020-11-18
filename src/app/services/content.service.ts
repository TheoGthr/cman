import { Injectable } from "@angular/core";
import { AngularFirestore, DocumentReference } from "@angular/fire/firestore";
import { map, take } from "rxjs/operators";
import * as firebase from "firebase";
import { Content } from "../types";

@Injectable({
  providedIn: "root",
})
export class ContentService {
  constructor(private firestore: AngularFirestore) {}

  getContentByType(type: string) {
    return this.firestore
      .collection("content", (ref) => ref.where("type", "==", type))
      .snapshotChanges()
      .pipe(
        take(1),
        map((changes) =>
          changes.map((c) => ({
            id: c.payload.doc.id,
            ...(c.payload.doc.data() as Content),
          }))
        )
      );
  }

  createContent(content: Content): Promise<DocumentReference> {
    return this.firestore.collection("content").add(content);
  }

  updateContent(content: Content): Promise<void> {
    const { id, ...contentWithoutId } = content;
    const timestamp = this.updateTimestamp();
    return this.firestore
      .doc("content/" + id)
      .update({ ...contentWithoutId, lastUpdate: timestamp });
  }

  deleteContent(contentId: string): Promise<void> {
    return this.firestore.doc("content/" + contentId).delete();
  }

  updateTimestamp(): any {
    return firebase.firestore.FieldValue.serverTimestamp();
  }
}
