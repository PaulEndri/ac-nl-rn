import * as Google from 'expo-google-app-auth';
import env from '../env';
import { AsyncStorage } from 'react-native';

export const USER_DATA = '@AcNlCompanion:email';

const GOOGLE_CONFIG = {
	androidClientId: env.EXPO_ANDROID,
	iosClientId: env.EXPO_IOS,
	clientId: env.EXPO_WEB,
	scopes: [ 'email' ]
};

export const getStoredData = async () => {
	try {
		const results = await AsyncStorage.getItem(USER_DATA);

		if (results) {
			const [ email, id, accessToken ] = results.split('||');

			return { email, id, accessToken };
		}

		return null;
	} catch (e) {
		console.log(e);
		return null;
	}
};

export const signInWithGoogleAsync = async () => {
	try {
		const { user: { email, id }, accessToken }: any = await Google.logInAsync(GOOGLE_CONFIG);

		await AsyncStorage.setItem(USER_DATA, `${email}||${id}||${accessToken}`);

		return {
			email,
			id,
			accessToken
		};
	} catch (e) {
		console.log(e);
		return null;
	}
};

export const signOutWithGoogleAsync = async (accessToken: string) => {
	try {
		await Google.logOutAsync({
			...GOOGLE_CONFIG,
			accessToken
		});

		await clearStoredData();
		return true;
	} catch (e) {
		console.log(e);
		return false;
	}
};

export const clearStoredData = async () => await AsyncStorage.removeItem(USER_DATA);
