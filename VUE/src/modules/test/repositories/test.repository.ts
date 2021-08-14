import { AxiosRepository } from '@/http/axios.repository';
import { Test } from '@/modules/test/interfaces/test.interface';

const RESOURCE = 'tests';
export class TestRepository extends AxiosRepository {
    
    constructor() {
        super(RESOURCE);
    }

    async getTest(id: number): Promise<Test[]> {
        return super.get(id);
    }

    async getTests(): Promise<Test[]> {
        return super.getAll();
    }

    async postTest(data: Test): Promise<Test> {
        return super.post(data);
    }

    async putTest(id: number, data: Test): Promise<boolean> {
        return super.put(id, data);
    }

    async deleteTest(id: number): Promise<boolean> {
        return super.delete(id);
    }
}

export const testHttpRepository = new TestRepository();