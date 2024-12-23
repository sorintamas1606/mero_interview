import { View, Text, StyleSheet } from "react-native";
import { Section } from "./Section";

export const DummySection = (props) => {
  const { bgColor, title, index, onLayoutCallback } = props;
  return (
    <Section
      index={index}
      onLayoutCallback={onLayoutCallback}
    >
      <View
        style={[
          styles.wrapper,
          // {
          //   backgroundColor: bgColor,
          // },
        ]}
      >
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
    </Section>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: 200,
    width: "100%",
    padding: 16,
  },
  sectionTitle: {
    fontSize: 24,
  },
});
