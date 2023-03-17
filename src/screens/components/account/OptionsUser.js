import { StyleSheet, View, Text } from "react-native";
import React, { useState } from "react";
import { Icon, ListItem } from "react-native-elements";
import { map } from "lodash";
import Modal from "../common/Modal";

export default function OptionsUser() {
  const [showModal, setShowModal] = useState(false);
  const [contained, setcontained] = useState(null);
  const openClose = () => {
    setShowModal((prevState) => !prevState);
  };
  const selectComponent = (word) => {
    if (word == "name") {
      setcontained(<Text>Nombre</Text>);
    }
    if (word == "email") {
      setcontained(<Text>Email</Text>);
    }
    if (word == "pass") {
      setcontained(<Text>Contraseña</Text>);
    }
    openClose();
  };

  const renderOpc = () => getOpc(selectComponent);

  return (
    <View>
      {map(renderOpc(), (opc, index) => (
        <ListItem
          bottomDivider
          key={index}
          title={opc.title}
          onPress={opc.onPress}
          containerStyle={styles.containerStyle}
        >
          <Icon
            type={opc.iconType}
            name={opc.iconNameLeft}
            color={opc.iconColorLeft}
          />
          <ListItem.Content>
            <ListItem.Title>{opc.title}</ListItem.Title>
          </ListItem.Content>
          <Icon
            type={opc.iconType}
            name={opc.iconNameRight}
            color={opc.iconColorRight}
          />
        </ListItem>
      ))}
      <Modal visible={false} close={openClose}>
        {contained}
      </Modal>
    </View>
  );

  function getOpc(selectComponent) {
    return [
      {
        title: "Cambiar Nombre y Apellidos",
        iconType: "material-community",
        iconNameLeft: "account-circle",
        iconColorLeft: "#ccc",
        iconNameRight: "chevron-right",
        iconColorRight: "#ccc",
        onPress: () => selectComponent("name"),
      },
      {
        title: "Cambiar Email",
        iconType: "material-community",
        iconNameLeft: "at",
        iconColorLeft: "#ccc",
        iconNameRight: "chevron-right",
        iconColorRight: "#ccc",
        onPress: () => selectComponent("email"),
      },
      {
        title: "Cambiar Contraseña",
        iconType: "material-community",
        iconNameLeft: "lock-reset",
        iconColorLeft: "#ccc",
        iconNameRight: "chevron-right",
        iconColorRight: "#ccc",
        onPress: () => selectComponent("pass"),
      },
    ];
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  containerStyle: {
    borderBottomWidth: 1,
    borderBottomColor: "#e3e3e3",
  },
});
