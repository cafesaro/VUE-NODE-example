import { Module } from 'vuex';
import TestsTypes from '@/store/test/methods/test.methods';
import { testHttpRepository }from '@/modules/test/repositories/test.repository';
import { TEST_EMPTY_STATE } from './test.state';
import { TestStateInterface } from './interfaces/test.state.interface';
import { Test } from '@/modules/test/interfaces/test.interface';

const test: Module<TestStateInterface, any> = {
    namespaced: true,
    state: TEST_EMPTY_STATE,
    getters: {
        [TestsTypes.getters.GET_TESTS](state): Test[] {
            return state.tests;
        },
        [TestsTypes.getters.GET_TOTAL_TESTS](state): number {
            return state.totalTests;
        }
    },
    mutations: {
        [TestsTypes.mutations.SET_TESTS](state, tests: Test[]): void {
            state.tests = tests;
        },
        [TestsTypes.mutations.SET_TOTAL_TESTS](state, testsLength: number): void {
            state.totalTests = testsLength;
        }
    },
    actions: {
        async [TestsTypes.actions.FETCH_TESTS]({ commit }): Promise<boolean> {
            try {
                const tests: Test[] = await testHttpRepository.getTests();
                commit(TestsTypes.mutations.SET_TESTS, tests);
                commit(TestsTypes.mutations.SET_TOTAL_TESTS, tests.length);
                return true;
            } catch (e) {
                return false;
            }
        }
    },
};

export default test;
