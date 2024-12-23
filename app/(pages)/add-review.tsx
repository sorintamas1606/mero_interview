import {
  View,
  Text,
  KeyboardAvoidingView,
  Image,
  StyleSheet,
  TextInput,
  ScrollView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  Pressable,
} from "react-native";

import { useRouter } from "expo-router";

import SessionStorage from "react-native-session-storage";

import { useState } from "react";

import { format } from "date-fns";

import fullStar from "@images/addReviewFullStar.png";
import starShape from "@images/addReviewStarShape.png";

import { PageHeader } from "@/components";
import { PAGE_SLUG } from "@/constants";

export default function ReviewPage() {
  // const reviewRating = SessionStorage.getItem("reviewRating");
  // const reviewDescription = SessionStorage.getItem("reviewDescription");

  const {
    rating: reviewRating,
    description: reviewDescription,
  } = JSON.parse(SessionStorage.getItem("ownReview"));

  const [description, onChangeDescription] = useState(
    reviewDescription || ""
  );

  const router = useRouter();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, display: "flex" }}
      behavior={
        Platform.OS === "ios" ? "padding" : "height"
      }
      keyboardVerticalOffset={50}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <>
          <PageHeader title={"Descrie experiența ta"} />
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
          >
            <>
              <View
                style={{
                  flex: 1,
                }}
              >
                <RatingSummary
                  location="Robert - One Barbershop"
                  rating={reviewRating}
                />
                <Separator />
                <NewReviewSection
                  firstName="Sorin"
                  lastName="Tamas"
                  description={description}
                  onChangeDescription={onChangeDescription}
                />
                {/* <View style={{ height: 100 }} /> */}
              </View>

              <Pressable
                style={{
                  backgroundColor: "#080DE0",
                  marginBottom: 42,
                  alignItems: "center",
                  justifyContent: "center",
                  paddingVertical: 12,
                  paddingHorizontal: 2,
                  marginHorizontal: 24,
                  borderRadius: 24,
                }}
                onPress={() => {
                  SessionStorage.setItem(
                    "reviewRating",
                    reviewRating
                  );
                  SessionStorage.setItem(
                    "reviewDescription",
                    description
                  );

                  SessionStorage.setItem(
                    "ownReview",
                    JSON.stringify({
                      rating: reviewRating,
                      description,
                    })
                  );

                  router.replace({
                    pathname: "/profile",
                    params: {
                      showToast: true,
                      pageSlug: PAGE_SLUG,
                    },
                  });
                }}
              >
                <Text style={{ color: "#FFFFFF" }}>
                  Trimite
                </Text>
              </Pressable>
            </>
          </ScrollView>
        </>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const RatingSummary = (props) => {
  const { location, rating } = props;
  const today = new Date();

  const date = format(today, "d MMM. y");

  const ratingStars = Array.from(new Array(5).keys());
  return (
    <View style={styles.ratingSummaryWrapper}>
      <View style={styles.dateAndNameWrapper}>
        <Text style={styles.date}>{date}</Text>
        <Text
          style={styles.location}
        >{` (${location})`}</Text>
      </View>

      <View style={styles.ratingStarsWrapper}>
        {ratingStars.map((ratingStar, index) => {
          return (
            <Image
              key={index}
              source={
                ratingStar + 1 <= rating
                  ? fullStar
                  : starShape
              }
              style={styles.ratingStar}
            />
          );
        })}
      </View>
    </View>
  );
};

const Separator = () => {
  return <View style={styles.separator} />;
};

const NewReviewSection = (props) => {
  const {
    firstName,
    lastName,
    image,
    description,
    onChangeDescription,
  } = props;

  return (
    <View style={styles.contentWrapper}>
      <View style={styles.imageAndNameWrapper}>
        <View style={styles.nameWrapper} />
        <Text style={styles.nameLabel}>
          {firstName} {lastName.charAt(0)}.
        </Text>
      </View>
      <Text style={styles.title}>
        Descrie experiența ta
      </Text>
      <Text style={styles.description}>
        Opinia ta îi ajută la îmbunătățirea calității
        serviciilor, iar viitorii clienți primesc
        așteptările corecte.
      </Text>

      <TextInput
        onChangeText={onChangeDescription}
        value={description}
        placeholder="Ajută-i pe alții oferind detalii despre experiența ta ..."
        style={styles.inputText}
        multiline
        editable
        numberOfLines={4}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
  },
  ratingStarsWrapper: {
    marginTop: 12,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
  },
  ratingStar: { width: 28, height: 28 },

  ratingSummaryWrapper: { marginTop: 24 },
  dateAndNameWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  date: { color: "#000000" },
  location: { color: "#52577F" },
  separator: {
    height: 1,
    backgroundColor: "#E9ECEF",
    margin: 24,
  },

  contentWrapper: { paddingHorizontal: 24 },
  imageAndNameWrapper: {
    display: "flex",
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  nameWrapper: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "gray",
  },
  nameLabel: { fontWeight: 500, fontSize: 16 },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
  },
  description: { fontSize: 16, marginBottom: 12 },
  inputText: {
    borderColor: "#DEE2E6",
    borderWidth: 1,
    borderRadius: 8,
    padding: 14,
    height: 100,
  },
});
