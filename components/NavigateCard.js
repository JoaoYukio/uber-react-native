import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useDispatch } from "react-redux";
import { setDestination } from "../slices/navSlice";
import { useNavigation } from "@react-navigation/native";
import NavFavourites from "./NavFavourites";
import { Icon } from "react-native-elements/dist/icons/Icon";

const NavigateCard = () => {
	const dispatch = useDispatch();
	const navigation = useNavigation();
	return (
		<SafeAreaView style={tw`bg-white flex-1`}>
			<View style={tw`border-t-4 border-gray-200 flex-shrink `}>
				<GooglePlacesAutocomplete
					placeholder="Para onde?"
					styles={styles}
					onPress={(data, details = null) => {
						console.log(details.geometry.location);
						dispatch(
							setDestination({
								location: details.geometry.location,
								description: data.description,
							})
						);
						navigation.navigate("RideOptionsCard");
					}}
					fetchDetails={true}
					minLength={2}
					enablePoweredByContainer={false}
					query={{
						key: GOOGLE_MAPS_APIKEY,
						language: "pt-BR",
					}}
					nearbyPlacesAPI="GooglePlacesSearch"
					debounce={400}
				/>
			</View>
			<NavFavourites></NavFavourites>
			<View
				style={[
					{
						flexDirection: "row",
						backgroundColor: "white",
						justifyContent: "space-evenly",
					},
					tw`py-2 mt-auto border-t border-gray-100`,
				]}
			>
				<TouchableOpacity
					onPress={() => navigation.navigate("RideOptionsCard")}
					style={tw`flex flex-row justify-between bg-black w-24 px-4 py-3 rounded-full`}
				>
					<Icon
						name="car"
						type="font-awesome"
						color="white"
						size={16}
					></Icon>
					<Text style={tw`text-white text-center`}>Rides</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => navigation.navigate("RideOptionsCard")}
					style={tw`flex flex-row justify-between w-24 px-4 py-3 rounded-full border border-gray-400`}
				>
					<Icon
						name="fast-food-outline"
						type="ionicon"
						color="black"
						size={16}
					></Icon>
					<Text style={tw`text-center`}>Eats</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

export default NavigateCard;

const styles = StyleSheet.create({
	container: {
		backgroundColor: "white",
		paddingTop: 20,
		flex: 0,
	},
	textInput: {
		backgroundColor: "#DDDDDF",
		borderRadius: 5,
		fontSize: 18,
	},
	textInputContainer: {
		paddingHorizontal: 20,
		paddingBottom: 0,
	},
});
