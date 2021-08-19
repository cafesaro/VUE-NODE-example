import axios from "axios";
import { EnvironmentConstants } from "../constants/enviromentConstants";
import { RepositoryInterface } from "@/http/interfaces/repository.interface";

export abstract class AxiosRepository implements RepositoryInterface {
    private host = EnvironmentConstants.HOST;

    public async delete(id: number, resource: string): Promise<any> {
        return (await axios.delete(this.host + resource + '/' + id)).data;
    }

    public async deleteAll(data: {}, resource: string): Promise<any> {
        return (await axios.delete(this.host + resource, { data })).data;
    }

    public async get(id: number | string, resource: string): Promise<any> {
        return (await axios.get(this.host + resource + '/' + id)).data;
    }

    public async getAll(resource: string): Promise<any> {
        return (await axios.get(this.host + '/'+ resource)).data;

    }

    async post(data: {}, resource: string): Promise<any> {
        return (await axios.post(this.host + '/'+resource, data)).data;
    }

    async postData(data: {}, resource: string): Promise<any> {
        return (await axios.post(this.host + resource, data,{
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        })).data;
    }

    async put(data: {}, resource: string): Promise<any> {
        return (await axios.put(this.host + resource + '/', data)).data;
    }
}