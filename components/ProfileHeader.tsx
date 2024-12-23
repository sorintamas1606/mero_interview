import {
  Text,
  View,
  Animated,
  StyleSheet,
  Share,
  Alert,
} from "react-native";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";

import { AnimatedPressable } from "./AnimatedPressable";

import backIcon from "@images/back.png";
import backIconBlack from "@images/back-black.png";

import favoriteIcon from "@images/favorite.png";
import favoriteIconBlack from "@images/favorite-black.png";
import favoriteIconRed from "@images/favorite-red.png";

import shareIconBlack from "@images/share-black.png";
import shareIcon from "@images/share.png";

import SessionStorage from "react-native-session-storage";

import { getAnimatedElements } from "@/utils";

export const ProfileHeader = ({
  scrollY,
  name,
}: {
  scrollY: any;
  name?: string;
}) => {
  const router = useRouter();

  const {
    backgroundColor,
    backgroundElevation,
    shadowColor,
    titleOpacity,
    imageOpacity1,
    imageOpacity2,
    backgroundColorButton,
  } = getAnimatedElements(scrollY);

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const data = SessionStorage.getItem("favorite");

    if (data) {
      setIsFavorite(data);
    }
  }, []);

  const onShareHandler = async () => {
    try {
      const result = await Share.share({
        message: "Distribuie",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

  return (
    <Animated.View
      style={[
        styles.header,
        {
          backgroundColor,
          elevation: backgroundElevation,
          shadowColor,
        },
      ]}
    >
      <View style={styles.headerButtons}>
        <View style={styles.backButtonWrapper}>
          <AnimatedPressable
            style={[
              styles.button,
              styles.backButton,
              {
                backgroundColor: backgroundColorButton,
              },
            ]}
            onPress={() => router.replace("/")}
          >
            <Animated.Image
              source={backIcon}
              resizeMode="cover"
              style={[
                styles.backImage,
                {
                  opacity: imageOpacity1,
                },
              ]}
            />
            <Animated.Image
              source={backIconBlack}
              resizeMode="cover"
              style={[
                styles.backImage,
                {
                  opacity: imageOpacity2,
                },
              ]}
            />
          </AnimatedPressable>
        </View>

        <View style={styles.titleWrapper}>
          <Animated.Text
            style={{ opacity: titleOpacity }}
            numberOfLines={1}
          >
            {name}
          </Animated.Text>
        </View>
        <View style={styles.rightButtonsWrapper}>
          <AnimatedPressable
            style={[
              styles.button,
              { backgroundColor: backgroundColorButton },
            ]}
            onPress={() => {
              const newFavoriteState = !isFavorite;
              setIsFavorite(newFavoriteState);
              SessionStorage.setItem(
                "favorite",
                newFavoriteState
              );
            }}
          >
            <Animated.Image
              source={
                isFavorite ? favoriteIconRed : favoriteIcon
              }
              resizeMode="contain"
              style={[
                styles.favoriteIcon,
                {
                  opacity: imageOpacity1,
                },
              ]}
            />
            <Animated.Image
              source={
                isFavorite
                  ? favoriteIconRed
                  : favoriteIconBlack
              }
              resizeMode="contain"
              style={[
                styles.favoriteIcon,
                {
                  opacity: imageOpacity2,
                },
              ]}
            />
          </AnimatedPressable>
          <AnimatedPressable
            style={[
              styles.button,
              { backgroundColor: backgroundColorButton },
            ]}
            onPress={onShareHandler}
          >
            <Animated.Image
              style={[
                styles.shareIcon,
                {
                  opacity: imageOpacity1,
                },
              ]}
              source={shareIcon}
              resizeMode="contain"
            />
            <Animated.Image
              style={[
                styles.shareIcon,
                {
                  opacity: imageOpacity2,
                },
              ]}
              source={shareIconBlack}
              resizeMode="contain"
            />
          </AnimatedPressable>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 70,
    zIndex: 10,
    justifyContent: "center",
    shadowColor: "rgba(0,0,0,0.2)",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowRadius: 8,
  },
  headerButtons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  backButtonWrapper: { width: 100 },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  button: {
    width: 42,
    height: 42,
    borderRadius: 21,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
  },
  backImage: {
    width: 20,
    height: 17,
    position: "absolute",
  },
  titleWrapper: {
    flex: 1,
    display: "flex",
    alignItems: "center",
  },
  rightButtonsWrapper: {
    display: "flex",
    flexDirection: "row",
    gap: 16,
  },
  favoriteIcon: {
    height: 22,
    marginTop: 3,
    position: "absolute",
  },
  shareIcon: {
    width: 18,
    height: 25,
    position: "absolute",
  },
});
