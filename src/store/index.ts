import React from 'react';
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import { globalReducer } from './global/reducer';
import { modalReducer } from './modals/reducer';
import thunk from 'redux-thunk';
import { userReducer } from './user/reducer';
import MainStackNavigator from '../app';
import {
	createReactNavigationReduxMiddleware,
	createNavigationReducer
} from 'react-navigation-redux-helpers';

const navReducer = createNavigationReducer(MainStackNavigator);
const nativeMiddleware = createReactNavigationReduxMiddleware((state: any) => state.nav, 'root');

export const Store = createStore(
	combineReducers({
		global: globalReducer,
		modal: modalReducer,
		user: userReducer,
		nav: navReducer
	}),
	applyMiddleware(nativeMiddleware, thunk)
);

export default Store;
