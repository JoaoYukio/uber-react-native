import {
	FlatList,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	Image,
} from "react-native";
import React from "react";
import tw from "twrnc";
import { Icon } from "react-native-elements/dist/icons/Icon";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectOrigin } from "../slices/navSlice";

const data = [
	{
		id: "123",
		title: "Get a ride.",
		image: "https://links.papareact.com/3pn",
		screen: "MapScreen",
	},
	{
		id: "456",
		title: "Order food.",
		image: "https://links.papareact.com/28w",
		screen: "EatsScreen",
	},
	{
		id: "789",
		title: "Pet ride.",
		image: "https://img.icons8.com/ios-glyphs/256/pets.png",
		screen: "PetScreen",
	},
];

const NavOptions = () => {
	const navigation = useNavigation(); //Usado para mudar de pagina
	const origin = useSelector(selectOrigin);
	return (
		<FlatList
			data={data}
			keyExtractor={(item) => item.id}
			horizontal
			renderItem={({ item }) => {
				return (
					<TouchableOpacity
						onPress={() => {
							navigation.navigate(item.screen);
						}}
						style={tw`p-2 pl-6 pb-8 pt-4 bg-gray-200 m-2 w-40 rounded-xl`}
						disabled={origin === null} // So vai pra pagina caso tenha um destino
					>
						<View style={tw`${origin === null && "opacity-20"}`}>
							<Image
								style={{
									width: 120,
									height: 120,
									resizeMode: "contain",
								}}
								source={{ uri: item.image }}
							></Image>
							<Text style={tw`mt-2 text-lg font-semibold`}>
								{item.title}
							</Text>
							<Icon
								style={tw`p-2 bg-black rounded-full w-15 mt-4`}
								name="arrowright"
								color="white"
								type="antdesign"
							></Icon>
						</View>
					</TouchableOpacity>
				);
			}}
		/>
	);
};

export default NavOptions;

const styles = StyleSheet.create({});
