import React, { useState } from 'react';
import {
	View,
	Text,
	StyleSheet,
	Image,
	TouchableHighlight,
	SafeAreaView,
	SectionList
} from 'react-native';
import { IItem } from 'ac-nl-sdk';
import ImageService from '../service/image';
import { FontAwesome } from '@expo/vector-icons';
import PanelStyles from '../styles/panel';
import { primaryTextColor, secondaryTextColor } from '../styles/colors';

const styles = StyleSheet.create({
	container: PanelStyles.panelContainer,
	item: {
		...PanelStyles.panelitem,
		borderBottomColor: '#fff',
		borderBottomWidth: 1
	},
	genericText: {
		color: primaryTextColor,
		flex: 1,
		paddingLeft: 16,
		fontSize: 16
	},
	headerText: {
		...PanelStyles.panelHeaderText,
		flex: 1,
		paddingLeft: 16
	},
	text: {
		color: primaryTextColor,
		flex: 1,
		marginTop: 32,
		paddingLeft: 10
	},
	flex: {
		display: 'flex',
		flexDirection: 'row'
	},
	header: {
		...PanelStyles.panelHeader,
		display: 'flex',
		flexDirection: 'row-reverse'
	},
	icon: {
		marginTop: 32
	},
	panel: PanelStyles.panel,
	sectionFooter: {
		marginBottom: 10
	}
});

interface Props {
	data: {
		title: string;
		data: IItem[];
		type: string;
	}[];
}

export const ItemSectionListView = ({ data }: Props) => {
	const [ collapsedItems, setCollapsedItems ] = useState([]);
	let localData = data.map((d) => d);

	const toggleCollapsed = (title: string) => {
		if (collapsedItems.indexOf(title) >= 0) {
			setCollapsedItems(collapsedItems.filter((t) => t !== title));
		} else {
			setCollapsedItems([ ...collapsedItems, title ]);
		}
	};

	const myItemTitle = (title: string) => (
		<TouchableHighlight onPress={() => toggleCollapsed(title)}>
			<View style={styles.header as any}>
				<FontAwesome
					color="white"
					size={24}
					onPress={() => toggleCollapsed(title)}
					name={collapsedItems.indexOf(title) >= 0 ? 'plus' : 'minus'}
				/>
				<Text style={styles.headerText as any}>{title}</Text>
			</View>
		</TouchableHighlight>
	);

	const myItem = (item: IItem, root) => (
		<TouchableHighlight onPress={() => console.log('HELLO')} style={styles.item as any}>
			<View style={styles.flex}>
				<Image
					style={{ width: 70, height: 90 }}
					width={60}
					height={90}
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

	if (collapsedItems.length > 0) {
		localData = localData.map((item) => ({
			...item,
			data: collapsedItems.indexOf(item.title) < 0 ? item.data : []
		}));
	}

	return (
		<View style={styles.container}>
			<View style={styles.panel as any}>
				<SectionList
					keyExtractor={(i: IItem, index) => i.Name + index}
					sections={localData as any}
					renderItem={({ item, section }) => myItem(item, section.type)}
					renderSectionHeader={({ section: { title } }) => myItemTitle(title)}
					renderSectionFooter={({ section: { title } }) => {
						if (
							localData.findIndex((item) => item.title === title) ===
							localData.length - 1
						) {
							return null;
						}

						return <View style={{ marginBottom: 20 }} />;
					}}
				/>
			</View>
		</View>
	);
};

export default ItemSectionListView;
