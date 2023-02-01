import {
	FlatList,
	SafeAreaView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import React from "react";
import tw from "twrnc";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { Image } from "react-native";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectTravelTimeInformation } from "../slices/navSlice";

const data = [
	{
		id: "Uber-X-123",
		title: "Uber X",
		multiplier: 1,
		image: "https://links.papareact.com/3pn",
	},
	{
		id: "Uber-XL-456",
		title: "Uber XL",
		multiplier: 1.2,
		image: "https://links.papareact.com/5w8",
	},
	{
		id: "Uber-LUX-789",
		title: "Uber LUX",
		multiplier: 1.75,
		image: "https://links.papareact.com/7pf",
	},
];

const RideOptionsCard = () => {
	const navigation = useNavigation();
	const [selected, setSelected] = useState(null);
	const travelTimeInformation = useSelector(selectTravelTimeInformation);
	return (
		<SafeAreaView style={tw`bg-white flex-grow`}>
			<View
				style={{
					flexDirection: "row",
					alignItems: "center",
				}}
			>
				<TouchableOpacity
					onPress={() => {
						navigation.navigate("NavigateCard");
					}}
					style={tw`p-3 rounded-full ml-5 mr-8`}
				>
					<Icon name="chevron-left" type="fontawesome"></Icon>
				</TouchableOpacity>
				<Text style={tw`text-center text-xl items-center`}>
					Escolha uma corrida -{" "}
					{travelTimeInformation?.distance?.text}
				</Text>
			</View>
			<FlatList
				data={data}
				keyExtractor={(item) => item.id}
				renderItem={({
					item: { id, title, multiplier, image },
					item,
				}) => {
					return (
						<TouchableOpacity
							onPress={() => {
								setSelected(item);
							}}
							style={tw`flex-row items-center justify-between px-10 ${
								id === selected?.id && "bg-gray-200"
							}`}
						>
							<Image
								style={{
									width: 90,
									height: 90,
									resizeMode: "contain",
								}}
								source={{ uri: image }}
							></Image>
							<View style={tw`-ml-6`}>
								<Text style={tw`text-xl font-semibold`}>
									{title}
								</Text>
								<Text>
									Tempo de viagem{" "}
									{travelTimeInformation?.duration?.text}
								</Text>
							</View>
							<Text style={tw`text-xl`}>
								R$
								{(
									parseFloat(
										travelTimeInformation?.distance?.text
									) * multiplier
								).toFixed(2)}
							</Text>
						</TouchableOpacity>
					);
				}}
			></FlatList>
			<View>
				<TouchableOpacity
					disabled={selected === null}
					style={tw`bg-black py-3 m-3 rounded-md ${
						selected === null && "bg-gray-300"
					}`}
				>
					<Text style={tw`text-center text-white text-xl`}>
						Escolher {selected?.title}
					</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

export default RideOptionsCard;

const styles = StyleSheet.create({});
