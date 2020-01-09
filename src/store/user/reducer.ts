import { createReducer } from 'typesafe-actions';
import {
	setUserLoggedInStatus,
	setUserData,
	addMuseumRecord,
	addCatalogRecord,
	addCatalogFurnitureRecord,
	removeMuseumRecord,
	removeCatalogRecord,
	removeCatalogFurnitureRecord,
	addUserVillager,
	removeUserVillager,
	addUserProjects,
	removeUserProjects
} from './actions';
import { IPlayer } from '../../interfaces/IPlayer';

export interface IUserState extends IPlayer {
	isLoggedIn: boolean;
	lastUpdated: Date;
	accessToken: string;
}

export const initialUserState: IUserState = {
	Email: '',
	GoogleId: '',
	Name: '',
	NewLeaf: {
		TownName: null,
		FriendCode: '',
		Projects: [],
		Villagers: [],
		Museum: {
			Fishes: [],
			DeepSea: [],
			Bugs: [],
			Art: [],
			Fossils: []
		},
		Catalogued: {
			Furniture: {
				Furniture: [],
				Wallpapers: [],
				Flooring: [],
				Paper: [],
				Gyroids: []
			},
			Clothing: [],
			Fishes: [],
			Bugs: [],
			Art: [],
			Fossils: [],
			DeepSea: [],
			Songs: []
		}
	},
	lastUpdated: null,
	isLoggedIn: false,
	accessToken: null
};

const genericAction = (state, action) => ({
	...state,
	...action.payload,
	lastUpdated: new Date()
});

export const userReducer = createReducer(initialUserState)
	.handleAction(setUserLoggedInStatus, genericAction)
	.handleAction(setUserData, genericAction)
	.handleAction(addUserVillager, (state, { payload }) => {
		const record = state.NewLeaf.Villagers || [];

		return {
			...state,
			lastUpdated: new Date(),
			NewLeaf: {
				...state.NewLeaf,
				Villagers: record.indexOf(payload.name) < 0 ? [ ...record, payload.name ] : record
			}
		};
	})
	.handleAction(addUserProjects, (state, { payload }) => {
		const record = state.NewLeaf.Projects || [];

		return {
			...state,
			lastUpdated: new Date(),
			NewLeaf: {
				...state.NewLeaf,
				Projects: record.indexOf(payload.name) < 0 ? [ ...record, payload.name ] : record
			}
		};
	})
	.handleAction(addMuseumRecord, (state, { payload }) => {
		const record = state.NewLeaf.Museum[payload.key] || [];

		return {
			...state,
			lastUpdated: new Date(),
			NewLeaf: {
				...state.NewLeaf,
				Museum: {
					...state.NewLeaf.Museum,
					[payload.key]:
						record.indexOf(payload.name) < 0 ? [ ...record, payload.name ] : record
				}
			}
		};
	})
	.handleAction(addCatalogRecord, (state, { payload }) => {
		const record = state.NewLeaf.Catalogued[payload.key] || [];

		return {
			...state,
			lastUpdated: new Date(),
			NewLeaf: {
				...state.NewLeaf,
				Catalogued: {
					...state.NewLeaf.Catalogued,
					[payload.key]:
						record.indexOf(payload.name) < 0 ? [ ...record, payload.name ] : record
				}
			}
		};
	})
	.handleAction(addCatalogFurnitureRecord, (state, { payload }) => {
		const record = state.NewLeaf.Catalogued.Furniture[payload.key] || [];

		return {
			...state,
			lastUpdated: new Date(),
			NewLeaf: {
				...state.NewLeaf,
				Catalogued: {
					...state.NewLeaf.Catalogued,
					Furniture: {
						...state.NewLeaf.Catalogued.Furniture,
						[payload.key]:
							record.indexOf(payload.name) < 0 ? [ ...record, payload.name ] : record
					}
				}
			}
		};
	})
	.handleAction(removeUserVillager, (state, { payload }) => {
		const record = state.NewLeaf.Villagers || [];

		return {
			...state,
			lastUpdated: new Date(),
			NewLeaf: {
				...state.NewLeaf,
				Villagers:
					record.indexOf(payload.name) < 0
						? record
						: record.filter((r) => r !== payload.name)
			}
		};
	})
	.handleAction(removeUserProjects, (state, { payload }) => {
		const record = state.NewLeaf.Projects || [];

		return {
			...state,
			lastUpdated: new Date(),
			NewLeaf: {
				...state.NewLeaf,
				Projects:
					record.indexOf(payload.name) < 0
						? record
						: record.filter((r) => r !== payload.name)
			}
		};
	})
	.handleAction(removeMuseumRecord, (state, { payload }) => {
		const record = state.NewLeaf.Museum[payload.key] || [];

		return {
			...state,
			lastUpdated: new Date(),
			NewLeaf: {
				...state.NewLeaf,
				Museum: {
					...state.NewLeaf.Museum,
					[payload.key]:
						record.indexOf(payload.name) < 0
							? record
							: record.filter((r) => r !== payload.name)
				}
			}
		};
	})
	.handleAction(removeCatalogRecord, (state, { payload }) => {
		const record = state.NewLeaf.Catalogued[payload.key] || [];

		return {
			...state,
			lastUpdated: new Date(),
			NewLeaf: {
				...state.NewLeaf,
				Catalogued: {
					...state.NewLeaf.Catalogued,
					[payload.key]:
						record.indexOf(payload.name) < 0
							? record
							: record.filter((r) => r !== payload.name)
				}
			}
		};
	})
	.handleAction(removeCatalogFurnitureRecord, (state, { payload }) => {
		const record = state.NewLeaf.Catalogued.Furniture[payload.key] || [];

		return {
			...state,
			lastUpdated: new Date(),
			NewLeaf: {
				...state.NewLeaf,
				Catalogued: {
					...state.NewLeaf.Catalogued,
					Furniture: {
						...state.NewLeaf.Catalogued.Furniture,
						[payload.key]:
							record.indexOf(payload.name) < 0
								? record
								: record.filter((r) => r !== payload.name)
					}
				}
			}
		};
	});

export type UserState = ReturnType<typeof userReducer>;
