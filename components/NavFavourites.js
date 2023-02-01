import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { FlatList } from "react-native-gesture-handler";
import { TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements/dist/icons/Icon";
import tw from "twrnc";
import { setDestination, setOrigin } from "../slices/navSlice";
import { useDispatch } from "react-redux";

const data = [
	{
		id: "123",
		icon: "home",
		location: "Home",
		destination: "Code Street, London, UK",
		lat: 51.509865,
		lon: -0.118092,
	},
	{
		id: "456",
		icon: "briefcase",
		location: "Work",
		destination: "London Eye, London, UK",
		lat: 51.503399,
		lon: -0.119519,
	},
];

const NavFavourites = () => {
	const dispatch = useDispatch();
	return (
		<FlatList
			data={data}
			keyExtractor={(item) => item.id}
			ItemSeparatorComponent={() => {
				return <View style={[tw`bg-gray-200`, { height: 1 }]} />;
			}}
			renderItem={({
				item: { location, destination, icon, lat, lon },
			}) => {
				return (
					<TouchableOpacity style={tw`flex-row items-center p-5`}>
						<Icon
							style={tw`mr-4 rounded-full bg-gray-300 p-3 `}
							name={icon}
							color="white"
							type="ionicon"
							size={18}
						></Icon>
						<View>
							<Text style={tw`font-semibold text-lg`}>
								{location}
							</Text>
							<Text style={tw`text-gray-500`}>{destination}</Text>
						</View>
					</TouchableOpacity>
				);
			}}
		/>
	);
};

export default NavFavourites;

const styles = StyleSheet.create({});
