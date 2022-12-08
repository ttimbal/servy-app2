import {IMember, ITeam} from "../models/ITeam";
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
import {STATE_SUCCESS} from "../../../common/models/State";
import {IProject} from "../../projects/models/IProject";
import {db} from "../../../common/config/FirebaseConfig";
import {GenerateRandomString} from "../../../common/utils/Generator";

const COLLECTION_NAME = "teams";
const PREFIX_ID = "TMID";

async function addTeam(team: ITeam): Promise<ITeam> {
    team.id = GenerateRandomString(PREFIX_ID);
    team.members=[]
    team.created_at=new Date().toISOString();
    //const documentReference = await FirestoreClient.add(COLLECTION_NAME, team);
    await FirestoreClient.set(COLLECTION_NAME, team, team.id)

    return team;
}

async function addMember(teamID: string, member:IMember): Promise<void> {
    await FirestoreClient.addToArray(COLLECTION_NAME, teamID, 'members',member)
    await FirestoreClient.addToArray(COLLECTION_NAME, teamID, 'members_id',member.id)
}

async function getTeam(id: string): Promise<ITeam | undefined> {
    return await FirestoreClient.get<ITeam>(COLLECTION_NAME, id);
}

function listenTeams(userID: string, callback: Function): Unsubscribe {
    const q = query(collection(db, COLLECTION_NAME),where('members_id', 'array-contains', userID));
    return FirestoreClient.listenDocuments(q, (querySnapshot: QuerySnapshot<ITeam>) => {
        const teams: ITeam[] = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data()
            data.id = doc.id
            teams.push(data);
        });

        callback(teams)
    });
}

export {
    addTeam,
    getTeam,
    addMember,
    listenTeams
}