import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';

import { Entypo, FontAwesome } from '@expo/vector-icons';
import ApiService from './service/api';
import HomeScreen from './screens/home';
import { drawerBackgroundColor } from './styles/colors';

const TestScreen = () => (
	<View>
		<Text>Test</Text>
	</View>
);

const HeaderLeft = ({ navigation }: any) => {
	return (
		<View style={styles.globalPadding}>
			<Entypo name="menu" size={32} color="white" onPress={() => navigation.toggleDrawer()} />
		</View>
	);
};

const App = ({ navigation }: any) => {
	const [ data, setData ] = useState(null);

	useEffect(() => {
		ApiService.getTown('110912679983683131652').then((data) => setData(data));
	}, []);
	return (
		<View style={styles.container}>
			<Text onPress={() => navigation.openDrawer()}>{JSON.stringify(data)}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#141d26',
		height: '100%',
		color: '#fff'
	},
	icon: {
		width: 24,
		height: 24
	},
	globalPadding: {
		padding: 8
	},
	basicText: {}
});

const MyDrawerNavigator = createDrawerNavigator(
	{
		Home: {
			screen: App,
			navigationOptions: {
				drawerIcon: <FontAwesome name="dashboard" color="white" size={16} />
			}
		},
		Notifications: {
			screen: TestScreen
		},
		TestForYou: {
			screen: HomeScreen
		}
	},
	{
		drawerBackgroundColor,
		contentOptions: {
			inactiveTintColor: '#fff'
		}
	}
);

export const MainStackNavigator = createStackNavigator(
	{
		Main: {
			screen: MyDrawerNavigator,
			navigationOptions: (props) => ({
				title: 'AC:New Leaf Companion',
				headerLeft: () => {
					return <HeaderLeft {...props} />;
				}
			})
		}
	},
	{
		defaultNavigationOptions: {
			headerStyle: {
				backgroundColor: '#6ebc3b'
			},
			headerTintColor: '#fff',
			headerTitleStyle: {
				fontWeight: 'bold'
			}
		}
	}
);

export default MainStackNavigator;
