import {auth, db} from '../../../common/config/FirebaseConfig'
import {GithubAuthProvider, onAuthStateChanged, signInWithPopup, UserCredential} from "firebase/auth";
import {STATE_AUTHENTICATED, STATE_FAILURE} from '../../../common/models/State';
import {HttpClient} from "../../../common/services/http/HttpClient";
import {UserGitHub} from "../../../common/models/UserGitHub";
import {AuthState} from "../models/AuhState";
import {User} from "../../../common/models/User";
import {FirestoreClient} from "../../../common/services/firebase/FirestoreClient";
import {collection, query, where} from "@firebase/firestore";

const COLLECTION_NAME='users';

async function signInWithGitHub(): Promise<AuthState> {
    const provider = new GithubAuthProvider();
    provider.addScope('repo,gist,auth,profile');
    const authState: AuthState = {
        value: null,
        status: STATE_FAILURE
    }

    try {
        const userResult: UserCredential = await signInWithPopup(auth, provider);
        const credential = GithubAuthProvider.credentialFromResult(userResult);
        console.log(userResult)

        if (credential === null) {
            return authState
        }
        const githubToken = credential.accessToken ?? "";
        const userAuthenticated = userResult.user;

        if (userAuthenticated.providerData.length >= 0) {
            const githubUID = userAuthenticated.providerData[0].uid;
            const userGitHub: UserGitHub | null = await getGitHubUserData(githubUID);

            if (userGitHub === null) {
                return authState
            }

            const user: User = {
                githubToken: githubToken ?? "",
                id: userAuthenticated.uid,
                email: userAuthenticated.email ?? "",
                photoURL: userAuthenticated.photoURL ?? "",
                username: userGitHub.login,
                userGitHub: userGitHub
            }

            await saveUser(user);

            authState.value = user
            authState.status = STATE_AUTHENTICATED
            return authState
        }

        return authState
    } catch (e) {
        return authState
    }
}

function onAuthChanged(callback:Function) {
    onAuthStateChanged(auth, (user) => {
        callback(user)
    });

}

function getCurrentAuthUser(){
    return auth.currentUser;
}

async function saveUser(user: User){
    await FirestoreClient.set(COLLECTION_NAME,user,user.id);
}

async function getUserSavedByUsername(username: string):Promise<User | undefined> {
    const q = query(collection(db, COLLECTION_NAME), where("username", "==", username));
    const users=await FirestoreClient.getWithQuery<User>(q);

    return users.length===0?undefined:users[0]
}

async function getUserSaved(id: string):Promise<User | undefined> {
    return await FirestoreClient.get<User>(COLLECTION_NAME,id);
}

async function getGitHubUserData(githubIdOrLogin: string): Promise<UserGitHub | null> {
    const url = `https://api.github.com/user/${githubIdOrLogin}`
    try {
        const userRaw = await HttpClient.get<UserGitHub>(url);
        return userRaw.data
    } catch (e) {
        return null
    }
}

export {
    signInWithGitHub,
    getCurrentAuthUser,
    onAuthChanged,
    getUserSaved,
    getUserSavedByUsername
}