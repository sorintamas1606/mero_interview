import { View, Text, StyleSheet } from "react-native";

export const ReviewsSectionOverview = (props) => {
  const { score, total } = props;

  return (
    <View style={styles.header}>
      <Text style={styles.title}>Recenzii și evaluări</Text>
      <Text style={styles.rating}>
        {Math.round(score * 10) / 10}
      </Text>
      <Text style={styles.counter}>{total} evaluări</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: { paddingHorizontal: 16 },
  title: { fontSize: 24 },
  rating: { fontSize: 40, fontFamily: "Merriweather" },
  counter: { fontsize: 14 },
});
