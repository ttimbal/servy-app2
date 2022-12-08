import {
    addDoc,
    collection,
    DocumentData,
    onSnapshot,
    query,
    QuerySnapshot,
    Unsubscribe,
    where
} from "@firebase/firestore";
import {FirestoreClient} from "../../../common/services/firebase/FirestoreClient";
import {STATE_SUCCESS} from "../../../common/models/State";
import {IProject} from "../models/IProject";
import {GenerateRandomString} from "../../../common/utils/Generator";
import {db} from "../../../common/config/FirebaseConfig";

const COLLECTION_NAME = "projects";
const PREFIX_ID = "PRID";

async function addProject(project: IProject): Promise<IProject> {
    project.id = GenerateRandomString(PREFIX_ID);
    project.repository = '';
    project.repository_url = '';
    project.branch = '';
    project.created_at = new Date().toISOString();
    //const documentReference = await FirestoreClient.add(collectionName, project);
    await FirestoreClient.set(COLLECTION_NAME, project, project.id)

    return project;
}

async function getProject(id: string): Promise<IProject | undefined> {
    return await FirestoreClient.get<IProject>(COLLECTION_NAME, id);
}

function listenProjects(teamID: string, callback: Function): Unsubscribe {
    const q = query(collection(db, COLLECTION_NAME), where("team_id", "==", teamID));
    return FirestoreClient.listenDocuments(q, (querySnapshot: QuerySnapshot<IProject>) => {
        const projects: IProject[] = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data()
            data.id = doc.id
            projects.push(data)
        });
        callback(projects)
    });
}

async function updateProject(id: string, values: any) {
    await FirestoreClient.updateField(COLLECTION_NAME, id, values);
}

export {
    addProject,
    getProject,
    listenProjects,
    updateProject
}