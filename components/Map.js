import { StyleSheet, Text, View } from "react-native";
import React from "react";
import MapView, { Marker } from "react-native-maps";
import tw from "twrnc";
import { useSelector } from "react-redux";
import {
	selectDestination,
	selectOrigin,
	setTravelTimeInformation,
} from "../slices/navSlice";
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useRef, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const Map = () => {
	// usa o useSelector para pegar o estado do redux
	const origin = useSelector(selectOrigin);
	const destination = useSelector(selectDestination);
	const dispatch = useDispatch();
	const [mapReady, setMapReady] = useState(false);

	const mapRef = useRef();

	useEffect(() => {
		if (origin && destination && mapReady) {
			mapRef.current.fitToSuppliedMarkers(["origin", "destination"], {
				edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
			});
		} else {
			return;
		}
	}, [origin, destination, mapReady]);

	useEffect(() => {
		if (!origin || !destination) return;
		const getTravelTime = async () => {
			fetch(
				`https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${origin.description}&destinations=${destination.description}&key=${GOOGLE_MAPS_APIKEY}`
			)
				.then((res) => res.json())
				.then((data) => {
					console.log(data["rows"][0]["elements"]);
					dispatch(
						setTravelTimeInformation(data.rows[0].elements[0])
					);
				});
		};
		getTravelTime();
	}, [origin, destination, GOOGLE_MAPS_APIKEY]);

	return (
		<MapView
			mapType="mutedStandard"
			ref={mapRef}
			onMapReady={() => setMapReady(true)}
			style={tw`flex-1`}
		>
			{origin && destination && (
				<MapViewDirections
					origin={origin.description}
					destination={destination.description}
					apikey={GOOGLE_MAPS_APIKEY}
					strokeWidth={3}
					strokeColor="black"
				/>
			)}
			{origin?.location && (
				<Marker
					coordinate={{
						latitude: origin.location.lat,
						longitude: origin.location.lng,
					}}
					title="Origem"
					description={origin.description}
					identifier="origin"
					pinColor="green"
				/>
			)}
			{destination?.location && (
				<Marker
					coordinate={{
						latitude: destination.location.lat,
						longitude: destination.location.lng,
					}}
					title="Destino"
					description={destination.description}
					identifier="destination"
				/>
			)}
		</MapView>
	);
};

export default Map;

const styles = StyleSheet.create({});
