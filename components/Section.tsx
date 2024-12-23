import { View, Text } from "react-native";

export const Section = (props) => {
  const { children, onLayoutCallback, index } = props;
  return (
    <View
      onLayout={(event) => {
        onLayoutCallback(event, index);
      }}
    >
      {children}
    </View>
  );
};
