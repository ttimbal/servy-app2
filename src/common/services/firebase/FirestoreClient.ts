import {db} from '../../config/FirebaseConfig'
import {
    addDoc, arrayUnion,
    collection,
    CollectionReference, doc, DocumentData,
    DocumentReference,
    Firestore, FirestoreDataConverter, getDoc, getDocs,
    onSnapshot, PartialWithFieldValue, Query,
    query, QueryDocumentSnapshot, setDoc, SetOptions, SnapshotOptions, Unsubscribe, updateDoc, where, WithFieldValue
} from "@firebase/firestore";

const postConverter = {
    toFirestore<T>(post: T): DocumentData {
        return <DocumentData>post;
    },
    fromFirestore<T>(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): T {
        const data = snapshot.data(options)!;
        return data as T
    }
};

export class FirestoreClient {
    static client: Firestore = db


    static setClient(client?: Firestore) {
        if (!!client) {
            FirestoreClient.client = client;
        } else {
            FirestoreClient.client = db;
        }
    }

    public static async add(collectionName: string, value: any): Promise<DocumentReference<any>> {
        return await addDoc(collection(FirestoreClient.client, collectionName), value);
    }

    public static async set(collectionName: string, value: any, id:string): Promise<void> {
        return await setDoc(doc(db, collectionName, id), value);
    }

    public static listenDocuments<T>(q: Query,callback: Function): Unsubscribe {
        return onSnapshot(q, (querySnapshot) => {
            callback(querySnapshot);
        });
    }

    public static async get<T>(collectionName: string,docID: string) : Promise<T | undefined> {
        const docRef = doc(db, collectionName, docID).withConverter<T>(postConverter);
        const docSnap = await getDoc(docRef);
         return docSnap.data();
    }

    public static async getWithQuery<T>(q: Query) :Promise<T[]> {
        q.withConverter<T>(postConverter);
        const querySnapshot = await getDocs(q);
        const items:any[]=[];
        querySnapshot.forEach((doc) => {
            items.push(doc.data())
        });

        return items
    }

    public static async addToArray<T>(collectionName: string, id:string,field:string, value: T): Promise<void> {
        const docRef = doc(db, collectionName, id);

        const data:any={}
        data[field]=arrayUnion(value);
        return await updateDoc(docRef, data);
    }

    public static async updateField<T>(collectionName: string, id:string,data:any): Promise<void> {
        const washingtonRef = doc(db, collectionName, id);

    /*    const data:any={}
        data[field]=value;*/

        return await updateDoc(washingtonRef,data);
    }
}