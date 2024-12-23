import { View, StyleSheet } from "react-native";

import { Portal } from "@gorhom/portal";

import { ServiceList } from "./ServicesList";

export const FixedServiceList = (props) => (
  <Portal>
    <View style={styles.wrapper}>
      <ServiceList {...props} />
    </View>
  </Portal>
);

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    position: "absolute",
    top: 70,
  },
});
