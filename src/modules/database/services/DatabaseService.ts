import {
    addDoc,
    collection,
    DocumentData,
    onSnapshot, orderBy,
    query,
    QuerySnapshot,
    Unsubscribe,
    where
} from "@firebase/firestore";
import {FirestoreClient} from "../../../common/services/firebase/FirestoreClient";
import {IDatabase} from "../models/IDatabase";
import {GenerateRandomString} from "../../../common/utils/Generator";
import {db} from "../../../common/config/FirebaseConfig";

const COLLECTION_NAME = "databases";
const PREFIX_ID= "DBID";

async function addDatabase(database: IDatabase): Promise<IDatabase> {
    database.id = GenerateRandomString(PREFIX_ID);
    database.created_at=new Date().toISOString();
    //const documentReference = await FirestoreClient.add(COLLECTION_NAME, database);
    await FirestoreClient.set(COLLECTION_NAME,database,database.id)

    return database;
}

function listenDatabases(teamID: string, callback: Function): Unsubscribe {
    const q = query(collection(db, COLLECTION_NAME), where("team_id", "==", teamID));
    return FirestoreClient.listenDocuments(q, (querySnapshot: QuerySnapshot<IDatabase>) => {
        const databases: IDatabase[] = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data()
            data.id = doc.id
            databases.push(data)
        });
        callback(databases)
    });
}

export {
    addDatabase,
    listenDatabases
}