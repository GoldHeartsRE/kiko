import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";
import { Drawer } from "react-native-drawer-layout";
import { SegmentedButtons, Text } from "react-native-paper";
import TextInput from "../../components/KitaCreationComponents/TextInput";
import DrawerKita from "../../components/MainComponents/DrawerKita";
import Header from "../../components/MainComponents/Header";
import Button from "../../components/MainComponents/ProfileButton";
import { IP } from "../../constants/constants";
import {
  nummerValidator,
  ortValidator,
  plzValidator,
  straßeValidator,
} from "../../validator/adressValidator";
import { emailValidator } from "../../validator/emailValidator";
import {
  kitaNameValidator,
  nachnameValidator,
  vornameValidator,
} from "../../validator/nameValidator";

/**
 * @memberof ProfileKitaScreens
 * @class ProfileKitaEditScreen
 * @description Ermöglicht im Profil die Editierung des eigenen Profils
 */

export default function ProfileKitaEditScreen({ navigation }) {
  const screenWidth = Dimensions.get("window").width * 0.95;
  const [openDrawer, setOpenDrawer] = React.useState(false);

  // Daten holen, AsyncStorage (erstmal Mock)
  const [name_kita, setNameKita] = useState({ value: "", error: "" });
  const [email_kita, setEmailKita] = useState({ value: "", error: "" });
  const [anrede_kita, setAnredeKita] = useState({ value: "", error: "" });
  const [vorname_kita, setVornameKita] = useState({ value: "", error: "" });
  const [nachname_kita, setNachnameKita] = useState({ value: "", error: "" });
  const [straße_kita, setStraßeKita] = useState({ value: "", error: "" });
  const [ort_kita, setOrtKita] = useState({ value: "", error: "" });
  const [plz_kita, setplzKita] = useState({ value: "", error: "" });
  const [nr_kita, setNrKita] = useState({ value: "", error: "" });

  const [open, setOpen] = useState(false);

  /**
   * @method fetchData
   * @memberof ProfileKitaScreens.ProfileKitaScreens
   * @async
   * @description Async Methode welche durch initaliseren der Seite ausgeführt wird, Ruft alle Daten des eigenen Profils ab
   */

  useEffect(() => {
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
            AsyncStorage.setItem("name_kita", data.name_kita);
            AsyncStorage.setItem("email", data.email);
            AsyncStorage.setItem(
              "anrede_ansprechperson",
              data.anrede_ansprechperson
            );
            AsyncStorage.setItem(
              "vorname_ansprechperson",
              data.vorname_ansprechperson
            );
            AsyncStorage.setItem(
              "nachname_ansprechperson",
              data.nachname_ansprechperson
            );
            AsyncStorage.setItem("plz", data.adresse.plz.toString());
            AsyncStorage.setItem("ort", data.adresse.ort);
            AsyncStorage.setItem("strasse", data.adresse.strasse);
            AsyncStorage.setItem("nr", data.adresse.nr);
            console.log("Wert geladen!");
          })
          .catch((error) => console.error("Fehler:", error));

        const name = await AsyncStorage.getItem("name_kita");
        const email = await AsyncStorage.getItem("email");
        const anrede = await AsyncStorage.getItem("anrede_ansprechperson");
        const vorname = await AsyncStorage.getItem("vorname_ansprechperson");
        const nachname = await AsyncStorage.getItem("nachname_ansprechperson");
        const straße = await AsyncStorage.getItem("strasse");
        const ort = await AsyncStorage.getItem("ort");
        const plz = await AsyncStorage.getItem("plz");
        const nr = await AsyncStorage.getItem("nr");
        setNameKita({ value: name, error: "" });
        setEmailKita({ value: email, error: "" });
        setAnredeKita({ value: anrede, error: "" });
        setVornameKita({ value: vorname, error: "" });
        setNachnameKita({ value: nachname, error: "" });
        setStraßeKita({ value: straße, error: "" });
        setOrtKita({ value: ort, error: "" });
        setplzKita({ value: plz, error: "" });
        setNrKita({ value: nr, error: "" });
      } catch (error) {
        console.error("Fehler beim Abrufen der Daten:", error);
      }
    };
    fetchData();
  }, []);

  /**
   * @method onSavePressed
   * @memberof ProfileKitaScreens.ProfileKitaScreens
   * @async
   * @description Async Methode welche alle geänderten Daten mithilfe eines PUT-Requests an die Datenbank sendet
   */

  const onSavePressed = async () => {
    //Validieren
    const nameError = kitaNameValidator(name_kita.value);
    const emailError = emailValidator(email_kita.value);
    const vornameError = vornameValidator(vorname_kita.value);
    const nachnameError = nachnameValidator(nachname_kita.value);
    const plzError = plzValidator(plz_kita.value);
    const ortError = ortValidator(ort_kita.value);
    const straßeError = straßeValidator(straße_kita.value);
    const nummerError = nummerValidator(nr_kita.value);
    if (
      nameError ||
      emailError ||
      plzError ||
      ortError ||
      straßeError ||
      nummerError ||
      vornameError ||
      nachnameError
    ) {
      setNameKita({ ...name_kita, error: nameError });
      setplzKita({ ...plz_kita, error: plzError });
      setOrtKita({ ...ort_kita, error: ortError });
      setStraßeKita({ ...straße_kita, error: straßeError });
      setNrKita({ ...nr_kita, error: nummerError });
      setEmailKita({ ...email_kita, error: nummerError });
      setVornameKita({ ...vorname_kita, error: vornameError });
      setNachnameKita({ ...nachname_kita, error: nachnameError });
      return;
    }
    navigation.navigate("ProfileKitaScreen");

    var valueToken = await AsyncStorage.getItem("token");
    const valueId = parseInt(await AsyncStorage.getItem("id"), 10);
    console.log(valueToken);
    console.log(`Bearer ${valueToken}`);

    fetch("http://" + IP + ":8080/api/v1/profil/kita/" + valueId, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${valueToken}`,
      },
      body: JSON.stringify({
        email: email_kita.value,
        name_kita: name_kita.value,
        anrede_ansprechperson: anrede_kita.value,
        vorname_ansprechperson: vorname_kita.value,
        nachname_ansprechperson: nachname_kita.value,
        adresse: {
          plz: plz_kita.value,
          ort: ort_kita.value,
          strasse: straße_kita.value,
          nr: nr_kita.value,
        },
      }),
    })
      .then((data) => {
        navigation.navigate("DashboardKitaScreen");
        return;
      })
      .catch((error) => console.error("Fehler:", error));
  };

  // /**
  //  * @method onBackPressed
  //  * @memberof ProfileKitaScreens.ProfileKitaScreens
  //  * @description Methode um zurück zum Profil zu gelangen
  //  */

  // const onBackPressed = async() => {
  //   navigation.navigate('DashboardKitaScreen')
  // }

  return (
    <Drawer
      style={styles.background}
      open={openDrawer}
      onOpen={() => setOpenDrawer(true)}
      onClose={() => setOpenDrawer(false)}
      renderDrawerContent={() => {
        return <DrawerKita></DrawerKita>;
      }}
    >
      <Header
        items="Profil bearbeiten"
        icon="menu"
        onPress={() => setOpenDrawer((prevOpen) => !prevOpen)}
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
              justifyContent: "space-around",
            }}
          >
            <Button mode="contained" onPress={onSavePressed}>
              Speichern
            </Button>
            {/* <Button mode="contained" onPress={onBackPressed}>
              Zurück
              </Button> */}
          </View>
        </View>

        <View style={{ flex: 3 }}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ flex: 1 }}
            contentContainerStyle={styles.scrollViewContent}
          >
            <TextInput
              label="Kita"
              returnKeyType="next"
              autoCapitalize="none"
              onChangeText={(text) => setNameKita({ value: text })}
              error={!!name_kita.error}
              errorText={name_kita.error}
              value={name_kita.value}
              autoCompleteType="off"
              textContentType="none"
              keyboardType="default"
            />
            <TextInput
              label="E-Mail"
              returnKeyType="next"
              autoCapitalize="none"
              onChangeText={(text) => setEmailKita({ value: text, error: "" })}
              error={!!email_kita.error}
              errorText={email_kita.error}
              value={email_kita.value}
              autoCompleteType="off"
              textContentType="none"
              keyboardType="default"
            />
            {/* Ansprechpartner */}
            <View style={{ alignItems: "center" }}>
              <View style={{ flex: 1, alignItems: "center" }}>
                <Text variant="labelLarge">Anrede</Text>
              </View>
              <SegmentedButtons
                value={anrede_kita}
                onValueChange={(value) => setAnredeKita(value)}
                style={{ backgroundColor: "white", width: screenWidth }}
                buttons={[
                  { value: "Herr", label: "Herr" },
                  { value: "Frau", label: "Frau" },
                  { value: "Divers", label: "Divers" },
                ]}
              />
            </View>
            <TextInput
              label="Vorname"
              returnKeyType="next"
              value={vorname_kita.value}
              onChangeText={(text) =>
                setVornameKita({ value: text, error: "" })
              }
              error={!!vorname_kita.error}
              errorText={vorname_kita.error}
              autoCapitalize="none"
              autoCompleteType="off"
              textContentType="none"
              keyboardType="default"
            />
            <TextInput
              label="Nachname"
              returnKeyType="done"
              value={nachname_kita.value}
              onChangeText={(text) =>
                setNachnameKita({ value: text, error: "" })
              }
              error={!!nachname_kita.error}
              errorText={nachname_kita.error}
              autoCapitalize="none"
              autoCompleteType="off"
              textContentType="none"
              keyboardType="default"
            />
            {/* Adresse */}
            <TextInput
              label="PLZ"
              returnKeyType="next"
              value={plz_kita.value}
              onChangeText={(text) => setplzKita({ value: text, error: "" })}
              error={!!plz_kita.error}
              errorText={plz_kita.error}
              autoCapitalize="none"
              autoCompleteType="off"
              textContentType="none"
              keyboardType="numeric"
            />
            <TextInput
              label="Ort"
              returnKeyType="next"
              value={ort_kita.value}
              onChangeText={(text) => setOrtKita({ value: text, error: "" })}
              error={!!ort_kita.error}
              errorText={ort_kita.error}
              autoCapitalize="none"
              autoCompleteType="off"
              textContentType="none"
              keyboardType="default"
            />
            <TextInput
              label="Straße"
              returnKeyType="next"
              value={straße_kita.value}
              onChangeText={(text) => setStraßeKita({ value: text, error: "" })}
              error={!!straße_kita.error}
              errorText={straße_kita.error}
              autoCapitalize="none"
              autoCompleteType="off"
              textContentType="none"
              keyboardType="default"
            />
            <TextInput
              label="Nr."
              returnKeyType="done"
              value={nr_kita.value}
              onChangeText={(text) => setNrKita({ value: text, error: "" })}
              error={!!nr_kita.error}
              errorText={nr_kita.error}
              autoCompleteType="off"
              textContentType="none"
              keyboardType="numeric"
            />
            <View style={{ height: 100 }}></View>
          </ScrollView>
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
  scrollViewContent: {
    flexDirection: "column",
  },
});
