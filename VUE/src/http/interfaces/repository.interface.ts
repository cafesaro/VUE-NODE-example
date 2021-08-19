export interface RepositoryInterface {
    get(id: number | string, resource: string): Promise<any>;
    post(data: {}, resource: string): Promise<any>;
    getAll(resource: string): Promise<any>;
    put(data: {}, resource: string): Promise<any>;
    delete(id: number, resource: string): Promise<any>;
    deleteAll(data: {}, resource: string): Promise<any>;
}