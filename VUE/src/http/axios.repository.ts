import axios from "axios";
import { EnvironmentConstants } from "../constants/enviromentConstants";
import { RepositoryInterface } from "@/http/interfaces/repository.interface";

export abstract class AxiosRepository implements RepositoryInterface {
    private URL: string;

    protected constructor(resource: string) {
        this.URL = EnvironmentConstants.HOST + resource;
    }

    public async delete(id: number): Promise<any> {
        return (await axios.delete(this.URL + '/' + id)).data;
    }

    public async deleteAll(data: {}): Promise<any> {
        return (await axios.delete(this.URL, { data })).data;
    }

    public async get(id: number): Promise<any> {
        return (await axios.get(this.URL + '/' + id)).data;
    }

    public async getAll(): Promise<any> {
        return (await axios.get(this.URL)).data;
    }

    async post(data: {}): Promise<any> {
        return (await axios.post(this.URL, data)).data;
    }

    async put(id: number, data: {}): Promise<any> {
        return (await axios.put(this.URL + '/' + id, data)).data;
    }
}