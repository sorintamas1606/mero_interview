import {
  View,
  Text,
  Pressable,
  Image,
  StyleSheet,
  Platform,
  Alert,
  Modal,
  TouchableOpacity,
} from "react-native";

import { useState } from "react";

import { usePathname, useRouter } from "expo-router";
import emptyRatingStar from "@images/emptyRatingStar.png";
import filledRatingStar from "@images/filledRatingStar.png";

import dots from "@images/dots.png";

import SessionStorage from "react-native-session-storage";

import {
  ReviewCardProps,
  ProfilePictureProps,
} from "@/types";

export const ReviewCard = (props: ReviewCardProps) => {
  const {
    isAnonymous = false,
    firstName,
    lastName,
    image,
    description,
    rating,
    ownReview = false,
    setOwnReview,
  } = props;

  const [showConfirmationModal, setShowConfirmationModal] =
    useState(false);

  const router = useRouter();

  const handleEditOwnComment = () => {
    if (Platform.OS === "android") {
      Alert.alert("", "", [
        {
          text: "Editeaza recenzia",
          onPress: () => router.push("/add-review"),
        },
        {
          text: "Sterge recenzia",
          onPress: () => {
            setShowConfirmationModal(true);
          },
        },
        { text: "Anuleaza", style: "cancel" },
      ]);
    } else if (Platform.OS === "ios") {
      // missing code
      // I wasn't able to test on iOS
    }
  };

  const onRemoveCallback = () => {
    SessionStorage.removeItem("ownReview");
    setOwnReview(null);
  };

  return (
    <View style={styles.reviewCard}>
      {ownReview ? (
        <View style={styles.ownReviewCard}>
          <Text style={styles.ownReviewCardTitle}>
            Recenzia ta
          </Text>
          <Pressable
            style={styles.imageWrapper}
            onPress={handleEditOwnComment}
          >
            <Image source={dots} style={styles.image} />
          </Pressable>
        </View>
      ) : null}
      <View style={styles.reviewCardContent}>
        <View>
          <ProfilePicture
            isAnonymous={isAnonymous}
            firstName={firstName}
            lastName={lastName}
            image={image}
          />
        </View>
        <View style={styles.contentWrapper}>
          <Text style={styles.name}>
            {isAnonymous
              ? "Anonim"
              : `${firstName} ${lastName}`}
          </Text>
          <Rating rating={rating} />
          {description && (
            <Text style={styles.description}>
              {description}
            </Text>
          )}
        </View>
      </View>
      <ConfirmationModal
        isModalVisible={showConfirmationModal}
        setIsModalVisible={setShowConfirmationModal}
        onRemoveCallback={onRemoveCallback}
      />
    </View>
  );
};

const ConfirmationModal = (props) => {
  const {
    isModalVisible,
    setIsModalVisible,
    onRemoveCallback,
  } = props;

  const handleConfirmRemove = () => {
    setIsModalVisible(false);
    onRemoveCallback();
  };

  return (
    <Modal
      transparent={true}
      visible={isModalVisible}
      animationType="fade"
      onRequestClose={() => setIsModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>
            Confirma stergere
          </Text>
          <Text style={styles.modalMessage}>
            Esti sigur ca doresti sa iti stergi recenzia ?
          </Text>
          <View style={styles.modalActions}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={() => setIsModalVisible(false)}
            >
              <Text style={styles.buttonText}>Nu</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.confirmButton]}
              onPress={handleConfirmRemove}
            >
              <Text style={styles.buttonText}>Da</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const ProfilePicture = (props: ProfilePictureProps) => {
  const { image, firstName, lastName, isAnonymous } = props;

  if (!image) {
    if (!isAnonymous) {
      return (
        <Text
          style={styles.profilePictureInitials}
        >{`${firstName?.charAt(0)}${lastName?.charAt(
          0
        )}`}</Text>
      );
    } else {
      return (
        <Text style={styles.profilePictureInitials}>?</Text>
      );
    }
  } else {
    return (
      <Image
        source={{ uri: image }}
        style={styles.profilePicture}
      />
    );
  }
};

const Rating = ({ rating }: { rating: number }) => {
  const ratingStars = Array.from(new Array(5).keys());

  return (
    <View style={styles.ratingWrapper}>
      <View style={styles.ratingStarsWrapper}>
        {ratingStars.map((ratingStar, index) => {
          return (
            <Image
              key={index}
              source={
                ratingStar + 1 <= rating
                  ? filledRatingStar
                  : emptyRatingStar
              }
              style={styles.ratingStar}
            />
          );
        })}
      </View>
      <View>
        <Text>{` ${rating} din 5`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ownReviewCard: {
    marginVertical: 16,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  ownReviewCardTitle: { fontSize: 18, fontWeight: "bold" },

  reviewCard: {
    flex: 1,
    display: "flex",
    marginHorizontal: 16,
    padding: 16,
    backgroundColor: "#FFFFFF",
    elevation: 5,

    shadowColor: "rgba(0, 0, 0, 0.2)",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowRadius: 8,

    borderRadius: 8,

    zIndex: 9,
  },
  reviewCardContent: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingRight: 36,
  },
  contentWrapper: { flex: 1 },
  name: { fontWeight: "bold" },
  description: { flex: 1 },
  ratingWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },

  ratingStarsWrapper: {
    display: "flex",
    flexDirection: "row",
    gap: 2,
  },
  ratingStar: { width: 12, height: 12 },

  profilePicture: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },

  profilePictureInitials: {
    display: "flex",
    width: 32,
    height: 32,
    textAlign: "center",
    textAlignVertical: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E9ECEF",
    borderRadius: 16,
  },
  imageWrapper: {
    padding: 12,
  },
  image: { width: 16, height: 4 },

  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#f8f8f8",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#ccc",
  },
  confirmButton: {
    backgroundColor: "red",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
