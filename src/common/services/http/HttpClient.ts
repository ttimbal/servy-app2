import axios, {Axios, AxiosResponse} from 'axios';
import header from "../../components/elements/Header";

export class HttpClient{
    static client:Axios=axios;


    static setClient(client?: Axios) {
        if (!!client) {
            HttpClient.client = client;
        }else{
            HttpClient.client=axios;
        }
    }

    public static async get<T>(url:string,options:any={}):Promise<AxiosResponse<T>>{

        return await HttpClient.client.get<T>(url,{
            headers:options
        });
    }

    public static async post<T>(url:string,payload:any={},options:any={}):Promise<AxiosResponse<T>>{
        return await HttpClient.client.post<T>(url,payload,{
            headers:options
        });
    }

    public static async put<T>(url:string):Promise<AxiosResponse<T>>{
        return await HttpClient.client.put<T>(url);
    }

    public static async delete<T>(url:string):Promise<AxiosResponse<T>>{
        return await HttpClient.client.delete<T>(url);
    }

}