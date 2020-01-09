import * as React from 'react';
import { connect } from 'react-redux';
import { getUserLoggedInStatus, getUserAccessToken } from '../store/user/selectors';
import { setUserData } from '../store/user/actions';
import { setModal } from '../store/modals/actions';
import {
	getStoredData,
	clearStoredData,
	signOutWithGoogleAsync,
	signInWithGoogleAsync
} from '../service/auth';
import ApiService from '../service/api';
import { FontAwesome } from '@expo/vector-icons';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { View, Text } from 'react-native';
import { initialUserState } from '../store/user/reducer';
import { MODAL_OPTIONS } from '../store/modals/reducer';
import { primaryTextColor } from '../styles/colors';

const mapStateToProps = (state) => ({
	isLoggedIn: getUserLoggedInStatus(state),
	accessToken: getUserAccessToken(state)
});

const mapDispatchToProps = {
	setUserData,
	setModal
};

interface AuthProps {
	isLoggedIn: boolean;
	accessToken: string;
	setModal: Function;
	setUserData: Function;
}

interface AuthState {
	running?: boolean;
}

class AuthComponent extends React.Component<AuthProps, AuthState> {
	state = {
		running: null
	};

	componentDidMount() {
		this.getStoredData()
			.then(() => console.log('success'))
			.catch(async () => await clearStoredData());
	}

	async getStoredData() {
		const results = await getStoredData();

		if (results) {
			const { email, accessToken } = results;

			return await this.fetchData(email, accessToken);
		}

		return Promise.reject();
	}

	async handleGoogleLogout() {
		await signOutWithGoogleAsync(this.props.accessToken);

		this.props.setUserData(initialUserState);
	}

	async handleGoogleLogin() {
		if (this.state.running) {
			return;
		} else {
			this.setState({ running: true });
		}

		const data = await signInWithGoogleAsync();
		if (data) {
			const { email, id, accessToken } = data;
			const results = await this.fetchData(email, accessToken);

			if (!results) {
				this.props.setUserData({ Email: email, GoogleId: id, accessToken });
				this.props.setModal(MODAL_OPTIONS.User, email);
			}
		}

		this.setState({ running: false });
	}

	async fetchData(email: string, accessToken: string) {
		const data = await ApiService.getPlayer(email);

		if (!data) {
			console.error('No User Found');
			return false;
		}

		this.props.setUserData({
			...data,
			Email: email,
			isLoggedIn: true,
			accessToken
		});

		return true;
	}

	render() {
		const { isLoggedIn } = this.props;

		const pressHandler = async () =>
			isLoggedIn ? await this.handleGoogleLogout() : await this.handleGoogleLogin();

		const color = isLoggedIn ? 'black' : 'white';
		return (
			<TouchableHighlight onPress={pressHandler} style={{ backgroundColor: '#6ebc3b' }}>
				<View style={{ display: 'flex', flexDirection: 'row' }}>
					<Text
						style={{
							color: primaryTextColor,
							paddingLeft: 5,
							paddingRight: 10,
							marginTop: 5
						}}
					>
						Sign {isLoggedIn ? 'Out' : 'In'}
					</Text>
					<FontAwesome
						name="power-off"
						color={color}
						style={{ color, paddingRight: 10 }}
						size={28}
					/>
				</View>
			</TouchableHighlight>
		);
	}
}

export const AuthHeader = connect(mapStateToProps, mapDispatchToProps)(AuthComponent);
export default AuthHeader;
