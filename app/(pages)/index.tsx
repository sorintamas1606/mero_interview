import { Button, View, StyleSheet } from "react-native";

import { useRouter } from "expo-router";
import { PAGE_SLUG } from "@/constants";

export default function InitialPage() {
  const router = useRouter();

  const buttonHandler = () =>
    router.push(`/profile?pageSlug=${PAGE_SLUG}`);

  return (
    <View style={styles.container}>
      <Button
        title="View profile"
        onPress={buttonHandler}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
