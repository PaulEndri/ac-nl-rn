import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
	View,
	Text,
	StyleSheet,
	Image,
	TouchableHighlight,
	SafeAreaView,
	SectionList
} from 'react-native';
import { IItem, Fishes, CalenderService, Furnitures } from 'ac-nl-sdk';
import ImageService from '../service/image';
import { FontAwesome } from '@expo/vector-icons';
import PanelStyles from '../styles/panel';
import Panel from '../components/panel';
import { primaryTextColor } from '../styles/colors';
import ListViewItem from '../components/listViewItem';
import { signInWithGoogleAsync } from '../service/auth';

const styles = StyleSheet.create({
	container: PanelStyles.panelContainer,
	item: {
		...PanelStyles.panelitem,

		borderBottomColor: '#fff',
		borderBottomWidth: 1
	},
	genericText: {
		color: primaryTextColor,
		// flex: 1,
		fontSize: 16
	},
	text: {
		color: '#fff',
		flex: 1,
		marginTop: 14,
		fontSize: 16
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
		marginTop: 10
	},
	panel: PanelStyles.panel,
	sectionFooter: {
		marginBottom: 10
	}
});

interface MyItemProps {
	item: IItem;
	root: string;
}

const HomeScreenComponent = () => {
	const [ collapsedItems, setCollapsedItems ] = useState([]);
	const service = new CalenderService(new Date().toDateString());
	const { Bugs, Fishes, Villagers, Events, DeepSea } = service.getAll(true);

	const toggleCollapsed = (title: string) => {
		if (collapsedItems.indexOf(title) >= 0) {
			setCollapsedItems(collapsedItems.filter((t) => t !== title));
		} else {
			setCollapsedItems([ ...collapsedItems, title ]);
		}
	};

	const MyItemTitle = (title: string) => (
		<View style={styles.header as any}>
			<FontAwesome
				color="white"
				size={24}
				onPress={() => toggleCollapsed(title)}
				name={collapsedItems.indexOf(title) >= 0 ? 'plus' : 'minus'}
			/>
			<Text onPress={() => toggleCollapsed(title)} style={styles.genericText as any}>
				{title}
			</Text>
		</View>
	);
	const MyItem = ({ item, root }: MyItemProps) => (
		<TouchableHighlight onPress={() => console.log('HELLO')} style={styles.item as any}>
			<View style={styles.flex}>
				<Image
					style={{ width: 62, height: 48 }}
					source={{
						uri: ImageService.getImageUrl(root, item.Name)
					}}
				/>
				<Text style={styles.text}>{item.Name}</Text>
				<FontAwesome
					name="external-link-square"
					size={24}
					color="white"
					style={styles.icon}
				/>
			</View>
		</TouchableHighlight>
	);

	let fullData: any = [
		{
			title: "Today's Birthdays",
			data: Villagers,
			type: 'villagers'
		},
		{
			title: 'Mainland Fishes Available Right Now',
			data: Fishes,
			type: 'fish'
		},
		{
			title: 'Mainland Bugs Right Now',
			data: Bugs,
			type: 'bug'
		},
		{
			title: 'Mainland Deep Sea Creatures Right Now',
			data: DeepSea,
			type: 'deepsea'
		}
	];

	if (collapsedItems.length > 0) {
		fullData = fullData.map((item) => ({
			...item,
			data: collapsedItems.indexOf(item.title) < 0 ? item.data : []
		}));
	}
	return (
		<View style={styles.container}>
			<Panel style={styles.sectionFooter} header="test">
				<ListViewItem data={Furnitures[0]} collected={false} toggleRecord={() => null} />
			</Panel>
			<ListViewItem data={Furnitures[0]} collected={false} toggleRecord={() => null} />
			<TouchableHighlight onPress={async () => await signInWithGoogleAsync()}>
				<Text>Hello</Text>
			</TouchableHighlight>
			{/* <SafeAreaView style={styles.panel as any}>
				<SectionList
					keyExtractor={(i: IItem, index) => i.Name + index}
					sections={fullData as any}
					renderItem={({ item, section }) => {
						return <MyItem root={section.type} item={item as any} />;
					}}
					renderSectionHeader={({ section: { title } }) => MyItemTitle(title)}
					renderSectionFooter={() => <View style={styles.sectionFooter} />}
				/>
			</SafeAreaView> */}
		</View>
	);
};

export const HomeScreen = connect(null, null)(HomeScreenComponent);

export default HomeScreen;
