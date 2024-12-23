import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";

import CloseIcon from "@images/close.png";
import SessionStorage from "react-native-session-storage";

import { PAGE_SLUG } from "@/constants";

export const PageHeader = (props) => {
  const router = useRouter();

  const { title } = props;

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>{title}</Text>
      <Pressable
        style={styles.imageWrapper}
        onPress={() => {
          SessionStorage.removeItem("reviewRating");

          router.replace({
            pathname: "/profile",
            params: {
              showToast: false,
              pageSlug: PAGE_SLUG,
            },
          });
        }}
      >
        <Image source={CloseIcon} style={styles.image} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    elevation: 5,
    backgroundColor: "#FFFFFF",

    shadowColor: "rgba(0,0,0,0.2)",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowRadius: 8,

    zIndex: 2,
  },
  title: { textAlign: "center" },
  imageWrapper: {
    position: "absolute",
    right: 16,
  },
  image: { width: 22, height: 22 },
});
