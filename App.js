import { StatusBar } from "expo-status-bar";
import { Platform, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import HomeScreen from "./screens/HomeScreen";
import MapScreen from "./screens/MapScreen";
import { store } from "./store";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { KeyboardAvoidingView } from "react-native";

// Deps : npm install @react-navigation/native, icons, tailwind -> twrnc, stackNavigator
// react-native-google-places-autocomplete, redux

export default function App() {
	const Stack = createNativeStackNavigator();

	return (
		<Provider store={store}>
			<NavigationContainer>
				<SafeAreaProvider>
					<KeyboardAvoidingView
						behavior={Platform.OS === "ios" ? "padding" : "height"}
						style={styles.container}
						keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
					>
						<Stack.Navigator>
							{/* Aqui vao as possiveis Screens */}
							<Stack.Screen
								name="HomeScreen"
								component={HomeScreen}
								options={{
									headerShown: false,
								}}
							/>
							<Stack.Screen
								name="MapScreen"
								component={MapScreen}
								options={{
									headerShown: false,
								}}
							/>
						</Stack.Navigator>
					</KeyboardAvoidingView>
				</SafeAreaProvider>
			</NavigationContainer>
		</Provider>
	);
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
