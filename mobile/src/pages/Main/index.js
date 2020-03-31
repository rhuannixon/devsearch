import React, { useState, useEffect } from 'react';
import MapView, { Marker, Callout } from "react-native-maps";
import { StyleSheet, Image, View, Text, TouchableOpacity, Keyboard } from "react-native";
import { requestPermissionsAsync, getCurrentPositionAsync } from "expo-location";
import { TextInput } from 'react-native-gesture-handler';
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import api from "./../../services/api";
import { connect, disconnect } from "./../../services/socket";

export default function Main({ navigation }) {
    const [currentRegion, setCurrentRegion] = useState(null);
    const [devs, setDevs] = useState([]);
    const [techs, setTechs] = useState("");

    const setupSocket = () => {
        connect();
    };

    const loadDevs = async () => {
        Keyboard.dismiss();
        const { latitude, longitude } = currentRegion;

        const res = await api.get('/search', {
            params: {
                latitude, longitude, techs: techs
            }
        });
        setDevs(res.data);
        setupSocket();
    }

    const handleRegionChanged = (region) => {
        setCurrentRegion(region);
    }
    useEffect(() => {
        async function loadInitialPosition() {
            const { granted } = await requestPermissionsAsync();
            if (granted) {
                const { coords } = await getCurrentPositionAsync({
                    enableHighAccuracy: true
                });

                const { latitude, longitude } = coords;

                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.04,
                    longitudeDelta: 0.04
                })
            }
        }

        loadInitialPosition();
    }, []);


    if (!currentRegion) {
        return null
    }


    return (
        <>
            <MapView
                onRegionChangeComplete={handleRegionChanged}
                onPress={Keyboard.dismiss}
                style={styles.map}
                initialRegion={currentRegion}>
                {devs.map(dev => (
                    <Marker key={dev._id} coordinate={{
                        latitude: dev.geolocation.coordinates[1],
                        longitude: dev.geolocation.coordinates[0]
                    }}>
                        <Image style={styles.avatar} source={{ uri: dev.avatar_url }} />
                        <Callout onPress={() => navigation.navigate('Profile', { github_username: dev.github_username })}>
                            <View style={styles.callout}>
                                <Text style={styles.devName}>{dev.name}</Text>
                                <Text style={styles.devBio}>{dev.bio}</Text>
                                <Text style={styles.devTechs}>{dev.techs.join(', ')}</Text>
                            </View>
                        </Callout>
                    </Marker>
                ))}
            </MapView >
            <View style={styles.searchForm}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Buscar devs por techs"
                    placeholderTextColor="#999"
                    autoCapitalize="words"
                    autoCorrect={false}
                    value={techs}
                    onChangeText={setTechs}
                />
                <TouchableOpacity
                    style={styles.loadButton}
                    onPress={loadDevs}>
                    <MaterialIcons name="my-location" size={20} color="#FFF" />
                </TouchableOpacity>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    },
    avatar: {
        width: 54,
        height: 54,
        borderRadius: 4,
        borderWidth: 4,
        borderColor: '#FFF'
    },
    callout: {
        width: 260,
        borderRadius: 4,
    },
    devName: {
        fontWeight: "bold",
        fontSize: 16
    },
    devBio: {
        color: '#666',
        marginTop: 5

    },

    devTechs: {
        marginTop: 5
    },

    searchForm: {
        position: "absolute",
        top: 20,
        left: 20,
        right: 20,
        zIndex: 5,
        flexDirection: "row"
    },
    searchInput: {
        flex: 1,
        height: 50,
        backgroundColor: "#FFF",
        color: "#333",
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 4,
            height: 4
        },
        elevation: 2
    },

    loadButton: {
        width: 50,
        height: 50,
        backgroundColor: "tomato",
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 15
    }

});