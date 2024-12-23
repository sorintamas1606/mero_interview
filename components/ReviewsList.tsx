import {
  Text,
  View,
  StyleSheet,
  Image,
  Modal,
  Pressable,
} from "react-native";

import { getReviewsForPage } from "@/api";

import { useState, useEffect } from "react";

import { useRouter } from "expo-router";

import starShape from "@images/addReviewStarShape.png";

import SessionStorage from "react-native-session-storage";

import { INITIAL_REVIEWS_COUNT } from "@/constants";

import { ReviewsSectionOverview } from "./ReviewsSectionOverview";
import { ReviewCard } from "./ReviewCard";

import {
  OwnReviewProps,
  PublicFeedbackDetails,
} from "@/types";

export const ReviewsList = (props) => {
  const {
    name,
    pageId,
    feedback: { score, total },
  } = props;

  const [modalVisible, setModalVisible] = useState(false);
  const [ownReview, setOwnReview] =
    useState<OwnReviewProps | null>(null);

  const [reviews, setReviews] = useState<
    PublicFeedbackDetails[] | null
  >(null);
  const [moreReviews, setMoreReviews] = useState(false);

  const router = useRouter();

  useEffect(() => {
    getReviewsForPage(pageId, INITIAL_REVIEWS_COUNT).then(
      (response) => {
        const _reviews = response?.data?.data;
        const _moreReviews = response?.data?.next;

        if (_reviews) {
          setReviews(_reviews);
        }

        setMoreReviews(!!_moreReviews);
      }
    );

    const ownReview = SessionStorage.getItem("ownReview");

    if (ownReview) {
      const { rating, description } = JSON.parse(ownReview);
      setOwnReview({ rating, description });
    }
  }, []);

  useEffect(() => {
    const ownReview = SessionStorage.getItem("ownReview");
  }, [router]);

  return (
    <View style={styles.wrapper}>
      <ReviewsSectionOverview score={score} total={total} />

      <View style={styles.reviewCardsWrapper}>
        {ownReview ? (
          <ReviewCard
            firstName="Joe"
            lastName="Doe"
            rating={ownReview.rating}
            description={ownReview.description}
            ownReview
            setOwnReview={setOwnReview}
          />
        ) : null}
        {reviews?.map((review, index) => {
          const {
            feedback: { score, review: description },
          } = review;

          let firstName, lastName, profilePhoto;

          if ("user" in review) {
            ({
              user: {
                firstname: firstName,
                lastname: lastName,
                profilePhoto,
              },
            } = review);
          }

          return (
            <ReviewCard
              key={index}
              firstName={firstName}
              lastName={lastName}
              image={profilePhoto?.small || undefined}
              rating={score}
              description={description}
            />
          );
        })}
      </View>
      <View style={styles.buttonsWrapper}>
        {moreReviews && (
          <Pressable
            onPress={() => {
              // set score, total, name and pageId
              SessionStorage.setItem(
                "ratingOverview",
                JSON.stringify({
                  name,
                  score,
                  total,
                  pageId,
                })
              );

              router.push("/reviews");
            }}
          >
            <Text style={styles.seeMoreReviewsButton}>
              Vezi mai multe recenzii
            </Text>
          </Pressable>
        )}
        {!ownReview && (
          <Pressable
            style={styles.addReviewButton}
            onPress={() => {
              setModalVisible(true);
            }}
          >
            <Text>Adauga recenzie</Text>
          </Pressable>
        )}
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalInnerWrapper}>
          <Pressable
            style={styles.backdrop}
            onPress={() => setModalVisible(false)}
          />
          <View style={styles.ratingContentWrapper}>
            <Text style={styles.ratingContentTitle}>
              Evaluează serviciile oferite de Robert de la
              One Barbeshop
            </Text>
            <Text style={styles.ratingContentDescription}>
              Click pe o stea pentru a evalua
            </Text>

            <AddRating />

            <Pressable
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.buttonLabel}>
                Mai târziu
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const AddRating = () => {
  const router = useRouter();

  const ratingStars = Array.from(new Array(5).keys());

  const labels = [
    "Oribil",
    "Slab",
    "Bine",
    "Foarte bine",
    "Excelent",
  ];

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      {ratingStars.map((index) => (
        <Pressable
          key={index}
          style={styles.ratingStarItemWrapper}
          onPress={() => {
            const rating = index + 1;

            SessionStorage.setItem("reviewRating", rating);

            SessionStorage.setItem(
              "ownReview",
              JSON.stringify({
                rating,
              })
            );
            router.push({
              pathname: "/add-review",
              params: { rating },
            });
          }}
        >
          <Image source={starShape} style={styles.image} />
          <View style={styles.labelWrapper}>
            <Text style={styles.label}>
              {labels[index]}
            </Text>
          </View>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 32,
    paddingVertical: 20,
  },

  reviewCardsWrapper: {
    gap: 16,
    marginTop: 16,
  },

  name: {
    fontSize: 16,
    fontWeight: 500,
  },
  description: {
    color: "#52577F",
  },

  buttonsWrapper: {
    display: "flex",
    marginTop: 36,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  seeMoreReviewsButton: {
    backgroundColor: "#F2F2FE",
    color: "#080DE0",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 32,
    marginBottom: 20,
  },

  addReviewButton: {
    color: "#080DE0",
    alignSelf: "center",
    borderRadius: 32,
    // backgroundColor: "red",
    paddingHorizontal: 24,
    paddingVertical: 12,
  },

  modalInnerWrapper: {
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "flex-end",
  },
  backdrop: {
    flex: 1,
  },
  ratingContentWrapper: {
    padding: 24,
    backgroundColor: "white",
  },
  ratingContentTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  ratingContentDescription: {
    fontSize: 16,
    color: "#52577F",
    marginBottom: 16,
  },
  buttonLabel: {
    fontSize: 16,
    textAlign: "center",
    padding: 20,
  },
  ratingStarItemWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  image: { height: 40, width: 40 },
  labelWrapper: {
    display: "flex",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  label: { textAlign: "center" },
});
