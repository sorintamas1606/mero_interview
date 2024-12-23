import {
  View,
  Text,
  Image,
  StyleSheet,
} from "react-native";

export const RatingStarsList = (props) => {
  const { rating, emptyStarImage, fullStarImage } = props;

  const ratingStars = Array.from(new Array(5).keys());

  return (
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
  );
};

const styles = StyleSheet.create({
  ratingStarsWrapper: {
    display: "flex",
    flexDirection: "row",
    gap: 2,
  },
});
