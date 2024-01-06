import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { Drawer } from "react-native-drawer-layout";
import { Card, Text } from "react-native-paper";
import DrawerKita from "../../components/MainComponents/DrawerKita";
import Header from "../../components/MainComponents/Header";
import Button from "../../components/MainComponents/ProfileButton";
import { IP } from "../../constants/constants";

/**
 * @memberof ProfileKitaScreens
 * @class ProfileKitaScreen
 * @description Zuständig für das Anzeigen der eigenen Daten im Profil
 */

export default function ProfileKitaScreen({ navigation }) {
  const screenWidth = Dimensions.get("window").width * 0.95;
  const [open, setOpen] = React.useState(false);

  const [name_kita, setNameKita] = useState(null);
  const [email_kita, setEmailKita] = useState(null);
  const [anrede_kita, setAnredeKita] = useState(null);
  const [vorname_kita, setVornameKita] = useState(null);
  const [nachname_kita, setNachnameKita] = useState(null);
  const [straße_kita, setStraßeKita] = useState(null);
  const [ort_kita, setOrtKita] = useState(null);
  const [plz_kita, setplzKita] = useState(null);
  const [nr_kita, setNrKita] = useState(null);

  /**
   * @method fetchData
   * @memberof ProfileKitaScreens.ProfileKitaScreen
   * @async
   * @description Async Methode welche die Daten auf dem Profil anzeigt
   */

  const fetchData = async () => {
    try {
      var valueToken = await AsyncStorage.getItem("token");
      const valueId = parseInt(await AsyncStorage.getItem("id"), 10);

      fetch("http://" + IP + ":8080/api/v1/profil/kita/" + valueId, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${valueToken}`,
        },
      })
        .then((response) => response.json()) // Mapping auf JSON
        .then((data) => {
          setNameKita(data.name_kita);
          setEmailKita(data.email);
          setAnredeKita(data.anrede_ansprechperson);
          setVornameKita(data.vorname_ansprechperson);
          setNachnameKita(data.nachname_ansprechperson);
          setStraßeKita(data.adresse.strasse);
          setOrtKita(data.adresse.ort);
          setplzKita(data.adresse.plz.toString());
          setNrKita(data.adresse.nr);
          console.log("Wert geladen!");
        })
        .catch((error) => console.error("Fehler:", error));
    } catch (error) {
      console.error("Fehler beim Abrufen der Daten:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setTimeout(function () {
        fetchData();
      }, 500);
    }, [navigation])
  );

  /**
   * @method onEditPressed
   * @memberof ProfileKitaScreens.ProfileKitaScreen
   * @description Methode welche durch Klicken auf einen Button zum Editieren des Profils weiterleitet
   */

  const onEditPressed = async () => {
    navigation.navigate("ProfileKitaEditScreen");
  };

  return (
    <Drawer
      style={styles.background}
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      renderDrawerContent={() => {
        return <DrawerKita></DrawerKita>;
      }}
    >
      <Header
        items="Profil"
        icon="menu"
        onPress={() => setOpen((prevOpen) => !prevOpen)}
      ></Header>

      <View
        style={{
          flex: 1,
          top: 60,
          width: screenWidth,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            <Text variant="headlineMedium">{name_kita}</Text>
            <Button mode="contained" onPress={onEditPressed}>
              Profil bearbeiten
            </Button>
          </View>
        </View>

        <View style={{ flex: 3 }}>
          <Card>
            <Card.Content>
              <Text variant="titleLarge">Kontaktdaten:</Text>
              <Text variant="bodyMedium">Email: {email_kita}</Text>
              <Text variant="bodyMedium">
                Ansprechperson: {anrede_kita} {vorname_kita} {nachname_kita}
              </Text>
              <Text variant="bodyMedium"></Text>
              <Text variant="bodyMedium">
                Straße: {straße_kita} {nr_kita}
              </Text>
              <Text variant="bodyMedium">
                Ort: {plz_kita} {ort_kita}
              </Text>
            </Card.Content>
          </Card>
        </View>
      </View>
    </Drawer>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    backgroundColor: "#f8f4ec",
  },
});
