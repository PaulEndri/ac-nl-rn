import React, { FC } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { primaryTextColor, secondaryTextColor } from '../styles/colors';
import { FontAwesome } from '@expo/vector-icons';
import { TouchableHighlight } from 'react-native-gesture-handler';

const coreItemDetails = {
	paddingLeft: 10,
	paddingRight: 10,
	color: primaryTextColor,
	borderRadius: 30,
	marginLeft: 3
};
const listItemStyles = StyleSheet.create({
	container: {
		width: '100%'
	},
	primaryView: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
		width: '100%'
	},
	loggedInView: {
		marginTop: 5,
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
		width: '28%'
	},
	text: {
		color: primaryTextColor,
		paddingRight: 5,
		paddingLeft: 15,
		fontSize: 16
	},
	theme: {
		backgroundColor: 'cadetblue',
		...coreItemDetails
	},
	look: {
		backgroundColor: 'forestgreen',
		...coreItemDetails
	},
	style: {
		backgroundColor: 'orangered',
		...coreItemDetails
	},
	color: {
		backgroundColor: 'yellowgreen',
		...coreItemDetails,
		flexWrap: 'nowrap'
	},
	item: {
		alignContent: 'flex-start',
		flexDirection: 'row'
	},
	footer: {
		textAlign: 'center',
		width: '92%',
		fontStyle: 'italic',
		color: secondaryTextColor
	}
});

const PROPERTY_STYLES = {
	Theme: listItemStyles.theme,
	Color: listItemStyles.color,
	Look: listItemStyles.look,
	Style: listItemStyles.style
};

interface Props {
	toggleRecord: Function;
	loggedIn?: boolean;
	collected?: boolean;
	data: {
		Theme?: string;
		Style?: string;
		Color?: string;
		Source?: string;
		SalePrice?: any;
		Price?: any;
		Look?: string;
		Name?: string;
	};
}

export const ListItem: FC<Props> = ({
	data,
	loggedIn = false,
	collected = false,
	toggleRecord
}) => {
	const { Name, Price, SalePrice, Source, ...properties } = data;

	const toggle = () => toggleRecord(!collected);

	return (
		<View style={listItemStyles.container as any}>
			<TouchableHighlight onPress={toggle}>
				<View style={listItemStyles.primaryView}>
					{loggedIn && (
						<View style={listItemStyles.loggedInView}>
							<FontAwesome
								color={collected ? 'green' : 'red'}
								size={24}
								name={collected ? 'check-square' : 'square-o'}
							/>
							<Text style={listItemStyles.text}>{Name}</Text>
						</View>
					)}

					<View
						style={{
							display: 'flex',
							flexDirection: 'row',
							flexWrap: 'wrap',
							width: loggedIn ? '100%' : '72%',
							alignContent: 'center'
						}}
					>
						{Object.entries(properties).map(([ k, v ]) => (
							<Text style={PROPERTY_STYLES[k]} key={k}>
								{v ? `${v}`.replace('/', ' ') : 'N/A'}
							</Text>
						))}
						<Text style={listItemStyles.footer}>{Source}</Text>
					</View>
				</View>
			</TouchableHighlight>
		</View>
	);
};

export default ListItem;
