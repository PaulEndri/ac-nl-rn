import React, { FC, useState } from 'react';
import { StyleSheet, View, Text, ViewStyle } from 'react-native';
import PanelStyles from '../styles/panel';
import { primaryTextColor } from '../styles/colors';
import { FontAwesome } from '@expo/vector-icons';
import { TouchableHighlight } from 'react-native-gesture-handler';

const panelStyles = StyleSheet.create({
	panel: PanelStyles.panel,
	header: PanelStyles.panelHeader,
	headerText: PanelStyles.panelHeaderText as any,
	content: PanelStyles.panelitem,
	icon: {
		position: 'absolute',
		right: 16,
		top: 8
	}
});

interface Props {
	header: string;
	toggleable?: boolean;
	style: ViewStyle;
}
export const Panel: FC<Props> = ({ header, style, children, toggleable = true }) => {
	const [ visible, toggleVisible ] = useState(true);

	return (
		<View style={style}>
			<View style={panelStyles.panel as any}>
				<TouchableHighlight onPress={() => toggleVisible(!visible)}>
					<View style={panelStyles.header as any}>
						<Text style={panelStyles.headerText}>{header}</Text>
						{toggleable && (
							<FontAwesome
								style={panelStyles.icon}
								color="white"
								size={24}
								name={!visible ? 'plus' : 'minus'}
							/>
						)}
					</View>
				</TouchableHighlight>
				{visible ? <View style={panelStyles.content as any}>{children}</View> : null}
			</View>
		</View>
	);
};

export default Panel;
