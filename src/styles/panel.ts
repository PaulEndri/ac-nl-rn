import {
	borderColor,
	itemBackgroundColor,
	headerBackgroundColor,
	secondaryTextColor,
	primaryBackgroundColor
} from './colors';

const PanelStyles = {
	panelContainer: {
		backgroundColor: primaryBackgroundColor
	},
	panelitem: {
		backgroundColor: itemBackgroundColor,
		borderStyle: 'solid',
		padding: 15
	},
	panelHeader: {
		backgroundColor: headerBackgroundColor,
		borderBottomColor: borderColor,
		borderStyle: 'solid',
		borderBottomWidth: 2,
		paddingTop: 8,
		paddingBottom: 8,
		paddingLeft: 16
	},
	panelHeaderText: {
		fontSize: 18,
		fontWeight: '700',
		color: secondaryTextColor
	},
	panel: {
		borderColor,
		borderStyle: 'solid',
		borderWidth: 1
	}
};

export default PanelStyles;
