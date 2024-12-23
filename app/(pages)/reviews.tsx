import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import {
  PageHeader,
  ReviewsSectionOverview,
  ReviewCard,
} from "@/components";

import { useState, useEffect, useRef } from "react";
import { REVIEWS_PER_PAGE } from "@/constants";

import { getReviewsForPage } from "@/api";

import {
  PublicFeedbackDetails,
  OwnReviewProps,
} from "@/types";

import SessionStorage from "react-native-session-storage";

export default function Reviews(props) {
  const data = SessionStorage.getItem("ratingOverview");

  const { name, score, total, pageId } = JSON.parse(data);

  const [ownReview, setOwnReview] =
    useState<OwnReviewProps | null>(null);
  const [reviews, setReviews] = useState<
    PublicFeedbackDetails[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [nextCursor, setNextCursor] = useState<
    string | undefined
  >("");

  const latestFetchedCursor = useRef<string | null>(null);

  const fetchData = (nextCursor: string = "") => {
    if (nextCursor === latestFetchedCursor.current) {
      return;
    }
    latestFetchedCursor.current = nextCursor;
    setLoading(true);
    getReviewsForPage(pageId, REVIEWS_PER_PAGE, nextCursor)
      .then((response) => {
        const _reviews = response?.data?.data;
        const _nextPageCursor = response?.data?.next;

        if (_reviews) {
          setReviews(reviews.concat(_reviews));
          setNextCursor(_nextPageCursor);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const loadMoreData = async () => {
    if (loading || !nextCursor) {
      return;
    }
    setLoading(true);
    await fetchData(nextCursor);
  };

  useEffect(() => {
    fetchData();

    const _rating = SessionStorage.getItem("ownReview");

    let reviewRating, reviewDescription;

    if (_rating) {
      ({ rating, description } = JSON.parse(_rating));
      setOwnReview({ rating, description });
    }
  }, []);

  const renderItem = ({
    item,
  }: {
    item: PublicFeedbackDetails;
  }) => {
    const {
      _id,
      feedback: { score, review },
      isAnonymous,
    } = item;

    let firstName, lastName, profilePhoto;

    if ("user" in item) {
      ({
        user: {
          firstname: firstName,
          lastname: lastName,
          profilePhoto,
        },
      } = item);
    }

    return (
      <View style={styles.reviewCardWrapper}>
        <ReviewCard
          isAnonymous={isAnonymous}
          firstName={firstName}
          lastName={lastName}
          image={profilePhoto?.small || undefined}
          rating={score}
          description={review}
          key={_id}
        />
      </View>
    );
  };

  return (
    <View style={styles.wrapper}>
      <PageHeader title={name} />

      <View style={styles.reviewsListWrapper}>
        <FlatList
          data={reviews}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          ListHeaderComponent={
            <View style={styles.overviewSectionWrapper}>
              <ReviewsSectionOverview
                score={score}
                total={total}
              />
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
            </View>
          }
          onEndReached={() => {
            loadMoreData();
          }}
          onEndReachedThreshold={0.5} // Trigger when 50% from the bottom
        />

        {loading && (
          <ActivityIndicator
            size="large"
            style={styles.activityIndicator}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { display: "flex", flex: 1 },
  overviewSectionWrapper: { marginTop: 32 },
  reviewCardWrapper: { marginTop: 18 },
  reviewCardMargin: {
    marginTop: 16,
  },
  reviewsListWrapper: { flex: 1 },
  activityIndicator: { marginTop: 20, height: 50 },
});
