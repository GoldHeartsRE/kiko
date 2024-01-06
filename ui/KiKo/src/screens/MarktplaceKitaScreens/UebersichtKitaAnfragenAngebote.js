import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { Dimensions, FlatList, StyleSheet, View } from "react-native";
import { Drawer } from "react-native-drawer-layout";
import { IconButton, List, Portal, Modal as RNModal } from "react-native-paper";
import AngebotAnfrageKitaView from "../../components/KitaMarktplaceComponents/AngebotAnfrageKitaView";
import DrawerKita from "../../components/MainComponents/DrawerKita";
import Header from "../../components/MainComponents/Header";
import { IP } from "../../constants/constants";

export default function UebersichtKitaAnfragenAngebote({ navigation }) {
  const screenWidth = Dimensions.get("window").width * 0.95;
  const [open, setOpen] = React.useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("all");

  const [requests, setRequests] = useState([]);

  const fetchData = async () => {
    setRequests([]);
    var valueToken = await AsyncStorage.getItem("token");
    const valueId = parseInt(await AsyncStorage.getItem("id"), 10);
    console.log(valueToken);
    console.log(`Bearer ${valueToken}`);

    await fetch(
      "http://" + IP + `:8080/api/v1/anfrage/getfromkita/${valueId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${valueToken}`,
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        if (data && Object.keys(data).length > 0) {
          console.log("TEST", data);
          setRequests(filterRequests(data, selectedFilter));
        } else {
          console.log("Die Antwort ist leer.");
        }
      })
      .catch((error) => console.error("Fehler:", error));
  };

  useFocusEffect(
    useCallback(() => {
      setTimeout(function () {
        fetchData();
      }, 500);
    }, [navigation])
  );

  useEffect(() => {
    fetchData();
  }, [selectedFilter]);

  const handleDelete = async (id) => {
    const valueToken = await AsyncStorage.getItem("token");

    const response = await fetch(
      `http://${IP}:8080/api/v1/anfrage/delete/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${valueToken}`,
        },
      }
    );
    if (response.ok) {
      console.log("Erfolgreich gelöscht:", response.status);
      setTimeout(function () {
        fetchData();
      }, 500);
    } else {
      console.error("Fehler beim Löschen:", response.status);
    }
  };

  const handleEnd = async (id) => {
    const valueToken = await AsyncStorage.getItem("token");

    const response = await fetch(`http://${IP}:8080/api/v1/anfrage/end/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${valueToken}`,
      },
      body: JSON.stringify({}),
    });
    if (response.ok) {
      console.log("Anfrage erfolgreich beendet:", response.status);
      setTimeout(function () {
        fetchData();
      }, 500);
    } else {
      console.error("Fehler beim Beenden der Anfrage:", response.status);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchData();
    setIsRefreshing(false);
  };

  const filterRequests = (data, filter) => {
    if (filter === "all") {
      return data;
    }
    return data.filter((item) => item.status === filter);
  };

  const openFilterModal = () => {
    setIsFilterModalVisible(true);
  };

  const closeFilterModal = () => {
    setIsFilterModalVisible(false);
  };

  const handleFilterOptionSelect = (filter) => {
    setSelectedFilter(filter);
    closeFilterModal();
  };

  const renderFilterModal = () => (
    <RNModal
      visible={isFilterModalVisible}
      onDismiss={closeFilterModal}
      contentContainerStyle={styles.modalContent}
    >
      <List.Item
        title="Alle Anfragen"
        onPress={() => handleFilterOptionSelect("all")}
        right={() => (
          <List.Icon icon={selectedFilter === "all" ? "check" : "cancel"} />
        )}
      />
      <List.Item
        title="Wartende Anfragen"
        onPress={() => handleFilterOptionSelect("wartend")}
        right={() => (
          <List.Icon icon={selectedFilter === "wartend" ? "check" : "cancel"} />
        )}
      />
      <List.Item
        title="Angenommene Anfragen"
        onPress={() => handleFilterOptionSelect("angenommen")}
        right={() => (
          <List.Icon
            icon={selectedFilter === "angenommen" ? "check" : "cancel"}
          />
        )}
      />
      <List.Item
        title="Abgelehnte Anfragen"
        onPress={() => handleFilterOptionSelect("abgelehnt")}
        right={() => (
          <List.Icon
            icon={selectedFilter === "abgelehnt" ? "check" : "cancel"}
          />
        )}
      />
      <List.Item
        title="Beendete Anfragen"
        onPress={() => handleFilterOptionSelect("beendet")}
        right={() => (
          <List.Icon icon={selectedFilter === "beendet" ? "check" : "cancel"} />
        )}
      />
    </RNModal>
  );

  const renderItem = ({ item }) => (
    <AngebotAnfrageKitaView
      requestId={item.anfrageId}
      offerId={item.angebotId}
      partnerId={item.partnerId}
      status={item.status}
      createDate={item.erstelltAm}
      updateDate={item.geaendertAm}
      onDelete={() => {
        handleDelete(item.anfrageId);
      }}
      onEnd={() => {
        handleEnd(item.anfrageId);
      }}
      navigation={navigation}
    />
  );

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
        items="Eigene Anfragen"
        icon="menu"
        onPress={() => setOpen((prevOpen) => !prevOpen)}
      ></Header>
      <View
        style={{
          flex: 1,
          width: screenWidth,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        {/* Abstandhalter für den Header */}
        <View style={{ height: 70 }} />
        <View style={{ flexDirection: "row" }}>
          {/* <BackButton goBack ={navigation.goBack} /> */}
          <View style={{ flex: 1 }}>
            {/* <IconButton icon='arrow-left-bold' onPress={() => navigation.goBack} /> */}
          </View>
          <View style={{ flex: 1, alignItems: "flex-end" }}>
            <IconButton icon="filter" onPress={openFilterModal} />
          </View>
        </View>
        <View>
          <FlatList
            data={requests}
            keyExtractor={(item) => item.anfrageId.toString()}
            renderItem={renderItem}
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
          />
        </View>
      </View>
      {/* Platzhalter am unteren Rand für das Modal */}
      <View style={{ height: 155 }} />
      <Portal>{renderFilterModal()}</Portal>
    </Drawer>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    flexDirection: "column",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    margin: 20,
  },
  background: {
    flex: 1,
    width: "100%",
    backgroundColor: "#f8f4ec",
  },
});
