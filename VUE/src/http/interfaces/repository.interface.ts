export interface RepositoryInterface {
    get(id: number): Promise<any>;
    post(data: {}): Promise<any>;
    getAll(): Promise<any>;
    put(id: number, data: {}): Promise<any>;
    delete(id: number): Promise<any>;
    deleteAll(data: {}): Promise<any>;
}