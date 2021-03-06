import React, { Component, useState } from 'react';
import { Modal, Text, TouchableHighlight, View, Alert } from 'react-native';

export const TestModal = () => {
	const [ modalVisible, setModalVisible ] = useState(false);
	return (
		<View style={{ marginTop: 22 }}>
			<Modal
				animationType="slide"
				transparent={false}
				visible={modalVisible}
				onRequestClose={() => {
					Alert.alert('Modal has been closed.');
				}}
			>
				<View style={{ marginTop: 22 }}>
					<View>
						<Text>Hello World!</Text>

						<TouchableHighlight
							onPress={() => {
								setModalVisible(!modalVisible);
							}}
						>
							<Text>Hide Modal</Text>
						</TouchableHighlight>
					</View>
				</View>
			</Modal>

			<TouchableHighlight
				onPress={() => {
					setModalVisible(true);
				}}
			>
				<Text>Show Modal</Text>
			</TouchableHighlight>
		</View>
	);
};

export default TestModal;
