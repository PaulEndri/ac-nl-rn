import React from 'react';
import { getGlobalDate } from '../store/global/selectors';
import { connect } from 'react-redux';
import {
	primaryBackgroundColor,
	drawerBackgroundColor,
	primaryTextColor,
	secondaryTextColor,
	primaryColor
} from '../styles/colors';
import { View, Text } from 'react-native';
import { useState } from 'react';
import { setGlobalTimeAction } from '../store/global/actions';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FontAwesome } from '@expo/vector-icons';

const buttonStyle = {
	color: primaryTextColor,
	backgroundColor: primaryColor,
	paddingVertical: 10,
	paddingHorizontal: 8
};

const mapStateToProps = (state) => ({
	date: getGlobalDate(state)
});

const mapDispatchToProps = {
	setDate: setGlobalTimeAction
};

interface Props {
	date: string;
	setDate: Function;
}

const LayoutComponent: React.FC<Props> = ({ date, setDate, children }) => {
	const [ mode, toggleMode ] = useState('');

	const handleChange = (e, date) => {
		toggleMode('');

		if (date) {
			setDate(date);
		}
	};

	return (
		<View style={{ height: '100%', backgroundColor: primaryBackgroundColor }}>
			<View
				style={{
					width: '100%',
					backgroundColor: drawerBackgroundColor,
					alignContent: 'flex-start',
					display: 'flex',
					flexWrap: 'nowrap',
					flexDirection: 'row'
				}}
			>
				<View style={{ flexDirection: 'row' }}>
					<FontAwesome
						name="calendar"
						color="white"
						size={16}
						style={{ alignSelf: 'center', marginLeft: 8 }}
					/>
					<Text style={{ color: secondaryTextColor, padding: 10 }}>
						It is currently {new Date(date).toDateString()}
					</Text>
				</View>

				<View
					style={{
						flexDirection: 'row',
						alignContent: 'flex-end',
						alignItems: 'flex-end',
						alignSelf: 'flex-end',
						justifyContent: 'flex-end',
						width: '46%'
					}}
				>
					<Text
						style={{
							...buttonStyle,
							borderRightColor: 'rgba(255, 255, 255, 0.1)',
							borderRightWidth: 1,
							borderLeftColor: 'rgba(0, 0, 0, 0.1)',
							borderLeftWidth: 1
						}}
						onPress={() => toggleMode('date')}
					>
						SET DATE
					</Text>
					<Text style={buttonStyle} onPress={() => toggleMode('time')}>
						SET TIME
					</Text>
					{mode !== '' && (
						<DateTimePicker
							value={new Date(date)}
							mode={mode as any}
							is24Hour={true}
							display="default"
							onChange={handleChange}
						/>
					)}
				</View>
			</View>

			<View style={{ backgroundColor: primaryBackgroundColor }}>{children}</View>
		</View>
	);
};

const Layout = connect(mapStateToProps, mapDispatchToProps)(LayoutComponent);
export default Layout;
