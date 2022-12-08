import {HttpClient} from "../../../common/services/http/HttpClient";
import {IBranch, IRepository, Webhook} from "../models/IRepository";



async function getRepositories(userName: string, token: string): Promise<IRepository[]> {


    const url = 'https://api.github.com/user/repos';
    try {
        const response = await HttpClient.get<IRepository[]>(url, {
            'Authorization': `Bearer ${token}`
        });


            //const res = await HttpClient.post('https://lcar0i6l50.execute-api.us-east-1.amazonaws.com/v1/auth/authorization');
    //const res = await HttpClient.post('https://0l3y1drtyf.execute-api.us-east-1.amazonaws.com/prod/webhook',{'data':'test'});
    //console.log(res);
        return response.data
    } catch (e) {
        return []
    }
}

async function getBranches(userName: string, repo: string, token: string): Promise<IBranch[]> {
    const url = `https://api.github.com/repos/${userName}/${repo}/branches`;
    try {
        const response = await HttpClient.get<IBranch[]>(url, {
            'Authorization': `Bearer ${token}`
        });
        return response.data
    } catch (e) {
        return []
    }
}

async function createWebHook(userName: string, repo: string, token: string): Promise<Webhook | undefined> {
    const url = `https://api.github.com/repos/${userName}/${repo}/hooks`;
    const payload = {
        "name": "web",
        "active": true,
        "events": ["push"],
        "config": {
            "url": "https://28vctepgr3.execute-api.us-east-1.amazonaws.com/api/database/create",
            "content_type": "json",
            "insecure_ssl": "0"
        }
    }

    try {
        const response = await HttpClient.post<Webhook>(url, payload, {
            'Authorization': `Bearer ${token}`
        });
        return response.data
    } catch (e) {
        return undefined;
    }
}

export {
    getRepositories,
    getBranches,
    createWebHook
}