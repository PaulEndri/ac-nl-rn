import { createReducer } from 'typesafe-actions';
import { setGlobalTimeAction, setGlobalSavePending } from './actions';

export interface IGlobalState {
	readonly activeVillagerIndex: number;
	readonly date: Date;
	readonly saving: boolean;
}

export const initialGlobalState: IGlobalState = {
	activeVillagerIndex: undefined,
	date: new Date(),
	saving: false
};

const genericAction = (state, action) => ({
	...state,
	...action.payload
});

export const globalReducer = createReducer(initialGlobalState)
	.handleAction(setGlobalTimeAction, genericAction)
	.handleAction(setGlobalSavePending, genericAction);

export type GlobalState = ReturnType<typeof globalReducer>;
