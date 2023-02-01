import { SafeAreaView, StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import tw from "twrnc";
import NavOptions from "../components/NavOptions";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useDispatch } from "react-redux";
import { setDestination, setOrigin } from "../slices/navSlice";
import NavFavourites from "../components/NavFavourites";

//rnfes

const HomeScreen = () => {
	const dispatch = useDispatch();
	return (
		<SafeAreaView style={tw`bg-white h-full`}>
			{/* Padding 5 px -> tailwind */}

			<View style={tw`p-5`}>
				<Image
					style={{
						width: 100,
						height: 100,
						resizeMode: "contain",
					}}
					source={{ uri: "https://links.papareact.com/gzs" }}
				/>
				<GooglePlacesAutocomplete
					placeholder="De onde?"
					styles={{
						container: {
							flex: 0,
						},
						textInput: {
							fontSize: 18,
						},
					}}
					onPress={(data, details = null) => {
						dispatch(
							setOrigin({
								location: details.geometry.location,
								description: data.description,
							})
						);
						dispatch(setDestination(null));
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
				<NavOptions></NavOptions>
				<NavFavourites></NavFavourites>
			</View>
		</SafeAreaView>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	text: {
		color: "blue",
	},
});
