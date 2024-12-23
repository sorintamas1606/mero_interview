import { PageImage } from "@/types";
import {
  View,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";

export const ImageCarousel = ({
  images,
}: {
  images: PageImage[];
}) => {
  const { width } = Dimensions.get("window");

  return (
    <ScrollView horizontal>
      <View
        style={[
          styles.imageWrapper,
          {
            height: width * 0.65,
          },
        ]}
      >
        {images?.map((image: PageImage) => (
          <Image
            style={[
              {
                width: width * 0.65,
                height: width * 0.65,
              },
            ]}
            key={image._id}
            source={{ uri: image.croppedLarge }}
            resizeMode="contain"
          />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  imageWrapper: {
    flexDirection: "row",
    gap: 1,
    backgroundColor: "#C1C1C1",
  },
});
