import React from 'react';
import MainStackNavigator from './src/app';
import { createReduxContainer } from 'react-navigation-redux-helpers';
import { connect, Provider } from 'react-redux';
import Store from './src/store';

const App = createReduxContainer(MainStackNavigator);
const mapStateToProps = (state) => ({
	state: state.nav
});

const AppWithNavigationState = connect(mapStateToProps)(App);

class Root extends React.Component {
	render() {
		return (
			<Provider store={Store}>
				<AppWithNavigationState />
			</Provider>
		);
	}
}
export default Root;
