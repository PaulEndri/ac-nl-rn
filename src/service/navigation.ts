import { NavigationActions } from 'react-navigation';

let navigator;

const setTopLevelNavigator = (navigatorRef) => {
	navigator = navigatorRef;
};

const navigate = (routeName, params) => {
	navigator.dispatch(
		NavigationActions.navigate({
			type: NavigationActions.NAVIGATE,
			routeName,
			params
		} as any)
	);
};

// add other navigation functions that you need and export them

export const NavigationService = {
	navigate,
	setTopLevelNavigator
};
export default NavigationService;
