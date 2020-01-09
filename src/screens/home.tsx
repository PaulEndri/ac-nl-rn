import React from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, TouchableHighlight, SectionList, Dimensions } from 'react-native';
import { IItem, CalenderService, Villagers, Events } from 'ac-nl-sdk';

import PanelStyles from '../styles/panel';
import { primaryTextColor, drawerBackgroundColor } from '../styles/colors';
import ItemSectionListView from '../components/itemSectionListView';
import { getUserData } from '../store/user/selectors';
import { UserState } from '../store/user/reducer';
import Panel from '../components/panel';
import GlobalStyles from '../styles/global';
import { getGlobalDate } from '../store/global/selectors';
import Layout from '../components/layout';

const itemCardStyle = {
	width: 150,
	height: 150,
	padding: 10,
	margin: 10
};

const styles = StyleSheet.create({
	container: {
		...GlobalStyles.panelContainer
	},
	item: {
		...PanelStyles.panelitem,

		borderBottomColor: '#fff',
		borderBottomWidth: 1
	},
	genericText: {
		color: primaryTextColor,
		flex: 1,
		fontSize: 16,
		marginLeft: 16
	},
	text: {
		color: primaryTextColor,
		flex: 1,
		marginTop: 37,
		marginLeft: 16,
		fontSize: 16
	},
	innerText: {
		color: primaryTextColor
	},
	flex: {
		display: 'flex',
		flexDirection: 'row'
	},
	flexReverse: {
		display: 'flex',
		flexDirection: 'row-reverse'
	},
	flexItem: {
		flex: 1
	},
	marginLeft: {
		marginLeft: 10
	},
	header: {
		...PanelStyles.panelHeader,
		display: 'flex',
		flexDirection: 'row-reverse'
	},
	icon: {
		marginTop: 37
	},
	panel: PanelStyles.panel,
	sectionFooter: {
		marginBottom: 10
	}
});

const mapStateToProps = (state) => ({
	userData: getUserData(state),
	date: getGlobalDate(state)
});

interface Props {
	date: string;
	userData: UserState;
}

const HomeScreenComponent = ({ userData, date }: Props) => {
	const service = new CalenderService(date);
	const villagers = service.getVillagers(Villagers);
	const currentEvents = service.getEvents();

	const sectionListData = [];

	if (villagers.length > 0) {
		sectionListData.push({
			title: "Today's Birthdays",
			data: villagers as any[],
			type: 'villagers'
		});
	}

	if (currentEvents.length > 0) {
		sectionListData.push({
			title: "Today's Events",
			data: currentEvents as any[],
			type: 'villager'
		});
	}
	return (
		<Layout>
			{userData &&
			userData.isLoggedIn && (
				<Panel style={{ marginVertical: 20 }} header="Welcome Back">
					<Text style={styles.innerText}>Hello {userData.Name}</Text>
					<Text style={styles.innerText}>
						Isabelle reports all goes well in {userData.NewLeaf.TownName}!
					</Text>
				</Panel>
			)}

			{sectionListData.length === 0 && (
				<Panel style={{ marginVertical: 20 }} header="Nothing to report today!">
					<Text style={styles.innerText}>Booker has nothing to report today!</Text>
				</Panel>
			)}

			{sectionListData.length > 0 && (
				<View>
					<ItemSectionListView data={sectionListData} />
				</View>
			)}

			<View
				style={{
					display: 'flex',
					flexDirection: 'row',
					flexWrap: 'wrap',
					alignContent: 'center',
					alignItems: 'center'
				}}
			>
				<TouchableHighlight onPress={() => {}}>
					<Text
						style={{
							width: Dimensions.get('screen').width * 0.27,
							height: Dimensions.get('screen').width * 0.27,
							padding: 10,
							margin: 10,
							color: 'white',
							backgroundColor: 'teal'
						}}
					>
						Test
					</Text>
				</TouchableHighlight>
				<TouchableHighlight onPress={() => {}}>
					<View
						style={{
							width: Dimensions.get('screen').width * 0.27,
							height: Dimensions.get('screen').width * 0.27,
							padding: 10,
							margin: 10,
							backgroundColor: 'olive',
							flexDirection: 'column'
						}}
					>
						<Text>Available Now</Text>
						<Text
							style={{
								color: 'white',

								fontSize: 36
							}}
						>
							50 Fish
						</Text>
					</View>
				</TouchableHighlight>
				<TouchableHighlight onPress={() => {}}>
					<Text
						style={{
							width: Dimensions.get('screen').width * 0.27,
							height: Dimensions.get('screen').width * 0.27,
							padding: 10,
							margin: 10,
							color: 'white',
							backgroundColor: 'maroon'
						}}
					>
						Test
					</Text>
				</TouchableHighlight>
				<TouchableHighlight onPress={() => true}>
					<Text
						style={{
							width: Dimensions.get('screen').width * 0.27,
							height: Dimensions.get('screen').width * 0.27,
							borderRadius: Dimensions.get('screen').width * 0.278,
							padding: 10,
							margin: 10,
							backgroundColor: 'red'
						}}
					>
						Test
					</Text>
				</TouchableHighlight>
			</View>
		</Layout>
	);
};

export const HomeScreen = connect(mapStateToProps, null)(HomeScreenComponent);

export default HomeScreen;
