import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Store } from "@ngrx/store";
import { map } from "rxjs/operators";
import * as firebase from "firebase";
import {
  createContent,
  getContentList,
  deleteContent,
  updateContent,
} from "../ngrx/content.actions";
import { Content } from "../types";

@Injectable({
  providedIn: "root",
})
export class ContentService {
  constructor(private firestore: AngularFirestore, private store: Store) {}

  getContentByType(type: string) {
    let contentList: Content[];

    this.firestore
      .collection("content", (ref) => ref.where("type", "==", type))
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({
            id: c.payload.doc.id,
            ...(c.payload.doc.data() as Content),
          }))
        )
      )
      .subscribe((data) => {
        contentList = data.map((e: Content) => {
          return {
            ...e,
          };
        });
        this.store.dispatch(getContentList({ contentList }));
      });
    return contentList;
  }

  createContent(content: any): Promise<void> {
    return this.firestore
      .collection("content")
      .add(content)
      .then((modelRes) => {
        this.store.dispatch(createContent());
      });
  }

  updateContent(content: any): Promise<void> {
    const contentId = content.id;
    delete content.id;
    return this.firestore
      .doc("content/" + contentId)
      .update(content)
      .then((modelRes) => {
        this.store.dispatch(updateContent());
      });
  }

  deleteContent(contentId: string): any {
    return this.firestore
      .doc("content/" + contentId)
      .delete()
      .then(() => {
        this.store.dispatch(deleteContent({ contentId }));
      })
      .catch((e) => console.error(e));
  }

  updateTimestamp(): any {
    return firebase.firestore.FieldValue.serverTimestamp();
  }
}
