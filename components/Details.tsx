import {
  Image,
  View,
  Text,
  StyleSheet,
  Pressable,
} from "react-native";

import fullStar from "@images/addReviewFullStar.png";

import { SECTION_TARGET_OFFSET } from "@/constants";
import { DetailsProps } from "@/types";

export const Details = (props: DetailsProps) => {
  const {
    name,
    location: { address },
    feedback: { score, total },
    profilePhoto,
    scrollViewRef,
    sectionOffsets,
  } = props;

  return (
    <View style={styles.sectionWrapper}>
      <View style={styles.contentWrapper}>
        <Text style={styles.title}>{name}</Text>
        <View style={styles.ratingWrapper}>
          <Image
            source={fullStar}
            style={styles.starIcon}
          />
          <View style={styles.rating}>
            <Text style={styles.ratingScore}>
              {Math.round(score * 100) / 100}
            </Text>
            <Pressable
              onPress={() => {
                scrollViewRef.current.scrollTo({
                  x: 0,
                  y:
                    sectionOffsets.current[2] -
                    SECTION_TARGET_OFFSET,
                });
              }}
            >
              <Text style={styles.ratingCount}>
                ({total} evaluări)
              </Text>
            </Pressable>
          </View>
        </View>

        <Text style={styles.address}>{address}</Text>
      </View>

      <Image
        source={{ uri: profilePhoto.small }}
        style={styles.logo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  sectionWrapper: {
    padding: 16,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  contentWrapper: {
    display: "flex",
    gap: 8,
    flex: 1,
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  ratingWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  starIcon: {
    width: 14,
    height: 14,
  },
  rating: {
    display: "flex",
    flexDirection: "row",
    gap: 6,
    fontSize: 14,
  },
  ratingScore: {
    fontWeight: "bold",
  },
  ratingCount: {
    color: "#080DE0",
  },
  address: {
    color: "#52577F",
    fontSize: 14,
  },

  logo: {
    width: 58,
    height: 58,
    borderRadius: 29,
  },
});
