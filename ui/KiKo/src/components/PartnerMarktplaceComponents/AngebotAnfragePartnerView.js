import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Card, Chip, Divider, Text } from "react-native-paper";
import { IP } from "../../constants/constants";

/**
 * @method formatiereDatumUhrzeit
 * @description Methode, um die Uhrzeit richtig zu formatieren
 */

function formatiereDatumUhrzeit(isoString) {
  const date = new Date(isoString);

  const tag = String(date.getDate()).padStart(2, "0");
  const monat = String(date.getMonth() + 1).padStart(2, "0");
  const jahr = date.getFullYear();

  const stunde = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");
  const sekunde = String(date.getSeconds()).padStart(2, "0");

  return `${tag}.${monat}.${jahr} Uhrzeit: ${stunde}:${minute}:${sekunde}`;
}

/**
 * @method AngebotAnfragePartnerView
 * @memberof PartnerMarketplaceComponents
 * @description AngebotAnfragePartnerView für die PartnerMarketplaceComponents, ist die Card Komponente wo alle Anfragen für ein Angebot von einem Partner angezeigt werden
 */

export default function AngebotAnfragePartnerView({
  offerId,
  kitaId,
  status,
  createDate,
  updateDate,
  onAccept,
  onRefuse,
  onEnd,
}) {
  //Getter und Setter für Extensions und Komponenten
  const navigation = useNavigation();
  const [chipColor, setChipColor] = useState();
  const [chipIcon, setChipIcon] = useState("");
  const [statusText, setStatusText] = useState("");
  const [acceptButtonVisible, setAcceptButtonVisible] = useState(false);
  const [refuseButtonVisible, setRefuseButtonVisible] = useState(false);
  const [endButtonVisible, setEndButtonVisible] = useState(false);

  //Getter und Setter für Requests
  const [angebote, setAngebote] = useState([]);
  const [wochentags, setWochentags] = useState([]);
  const [kita, setKita] = useState([]);
  const [straße_kita, setStraßeKita] = useState(null);
  const [ort_kita, setOrtKita] = useState(null);
  const [plz_kita, setplzKita] = useState(null);
  const [nr_kita, setNrKita] = useState(null);

  /**
   * @method fetchData
   * @description Methode, um mit einem GetRequest alle aktive Angebote zu bekommen
   */

  useEffect(() => {
    const fetchData = async () => {
      var valueToken = await AsyncStorage.getItem("token");
      const angebotId = parseInt(offerId, 10);

      try {
        const response = await fetch(
          "http://" + IP + ":8080/api/v1/angebot/" + angebotId,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${valueToken}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log("Angebot: ", data);
          setAngebote(data);
          setWochentags(data.wochentag);
          setStatus(status);
        } else {
          console.log("Die Antwort ist leer.");
        }
      } catch (error) {
        console.error("Fehler:", error);
      }
    };

    /**
     * @method fetchKita
     * @description Methode, um mit einem GET-Request zum Angebot die dazugehörige Kita zu bekommen
     */

    const fetchKita = async () => {
      var valueToken = await AsyncStorage.getItem("token");

      try {
        const kitaResponse = await fetch(
          "http://" + IP + ":8080/api/v1/profil/kita/" + kitaId,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${valueToken}`,
            },
          }
        );

        if (kitaResponse.ok) {
          const kitaData = await kitaResponse.json();
          console.log("Kitadaten zu Angebot: ", kitaData);
          if (kitaData) {
            setKita(kitaData);
            setStraßeKita(kitaData.adresse.strasse);
            setOrtKita(kitaData.adresse.ort);
            setplzKita(kitaData.adresse.plz.toString());
            setNrKita(kitaData.adresse.nr);
          } else {
            console.log("Ungültige Kitadaten erhalten");
          }
        }
      } catch (error) {
        console.error("Fehler:", error);
      }
    };

    /**
     * @method setStatus
     * @description Methode, welche je nach Status gewisse Icons setzt
     */

    const setStatus = (status) => {
      switch (status) {
        case "wartend":
          setAcceptButtonVisible(true);
          setRefuseButtonVisible(true);
          setChipColor("blue");
          setChipIcon("clock-outline");
          setStatusText("wartend");
          break;
        case "angenommen":
          setEndButtonVisible(true);
          setChipColor("green");
          setChipIcon("check");
          setStatusText("angenommen");
          break;
        case "abgelehnt":
          setChipColor("red");
          setChipIcon("cancel");
          setStatusText("abgelehnt");
          break;
        case "beendet":
          setChipColor("grey");
          setChipIcon("clock-remove-outline");
          setStatusText("beendet");
          break;
      }
    };

    fetchData();
    fetchKita();
  }, [offerId, status]);

  return (
    <View>
      <Card>
        <Card.Title
          title={angebote.kurstitel}
          right={(props) => (
            <Chip mode="outlined" selectedColor={chipColor} icon={chipIcon}>
              {statusText}
            </Chip>
          )}
        />
        <Card.Content>
          <Text variant="bodyMedium">
            Altersgruppe: {angebote.altersgruppe_min} -{" "}
            {angebote.altersgruppe_max}
          </Text>
          <Text variant="bodyMedium">
            Gruppengröße: {angebote.anzahlKinder_min} -{" "}
            {angebote.anzahlKinder_max}
          </Text>
          <Text variant="bodyMedium">Wochentag: {wochentags.join(", ")}</Text>
          <Text variant="bodyMedium">Dauer: {angebote.dauer}</Text>
          <Text variant="bodyMedium">Kosten: {angebote.kosten}</Text>
          <Divider />
          <Text variant="bodyLarge">Kontaktdaten:</Text>
          <Text variant="bodyMedium">Kita: {kita.name_kita}</Text>
          <Text variant="bodyMedium">
            Ansprechperson: {kita.anrede_ansprechperson}{" "}
            {kita.vorname_ansprechperson} {kita.nachname_ansprechperson}
          </Text>
          <Text variant="bodyMedium">Email: {kita.email}</Text>
          <Text>
            Straße: {straße_kita} {nr_kita}
          </Text>
          <Text variant="bodyMedium">
            Ort: {plz_kita} {ort_kita}
          </Text>
          <Divider />
          <Text variant="bodyMedium">
            Angefragt am: {formatiereDatumUhrzeit(createDate)}
          </Text>
          <Text variant="bodyMedium">
            Status geändert am: {formatiereDatumUhrzeit(updateDate)}
          </Text>
        </Card.Content>
        {acceptButtonVisible && (
          <Card.Actions>
            <Button mode="contained" buttonColor="green" onPress={onAccept}>
              Annehmen
            </Button>
          </Card.Actions>
        )}
        {refuseButtonVisible && (
          <Card.Actions>
            <Button mode="contained" buttonColor="red" onPress={onRefuse}>
              Ablehnen
            </Button>
          </Card.Actions>
        )}
        {endButtonVisible && (
          <Card.Actions>
            <Button mode="contained" buttonColor="red" onPress={onEnd}>
              Beenden
            </Button>
          </Card.Actions>
        )}
      </Card>
      <View style={{ height: 10 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  cards: {
    marginTop: 20,
  },
});
