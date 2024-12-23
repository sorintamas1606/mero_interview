import {
  ScrollView,
  View,
  Text,
  StyleSheet,
} from "react-native";
import { useEffect, useState, useRef } from "react";
import { SECTION_TARGET_OFFSET } from "@/constants";

export const ServiceList = (props) => {
  const {
    activeSection,
    setActiveSection,
    sectionOffsets,
    scrollViewRef,
    scrollOffset,
    setScrollOffset,
  } = props;

  const horizontalOffset = useRef(0);

  useEffect(() => {
    return () => {
      setScrollOffset(horizontalOffset.current);
    };
  }, []);

  return (
    <View style={styles.outerWrapper}>
      <ScrollView
        horizontal
        style={[styles.whiteBackground]}
        onScroll={(event) => {
          horizontalOffset.current =
            event.nativeEvent.contentOffset.x;
        }}
        contentOffset={{ x: scrollOffset, y: 0 }}
      >
        <View style={styles.wrapper}>
          <ServiceItem
            label="Servicii"
            isSelected={activeSection === 0}
            setActiveSection={() => {
              setActiveSection(0);

              scrollViewRef.current.scrollTo({
                x: 0,
                y:
                  sectionOffsets.current[0] -
                  SECTION_TARGET_OFFSET -
                  50,
              });
            }}
          />
          <ServiceItem
            label="Specialisti"
            isSelected={activeSection === 1}
            setActiveSection={() => {
              setActiveSection(1);

              scrollViewRef.current.scrollTo({
                x: 0,
                y:
                  sectionOffsets.current[1] -
                  SECTION_TARGET_OFFSET -
                  50,
              });
            }}
          />
          <ServiceItem
            label="Recenzii"
            isSelected={activeSection === 2}
            setActiveSection={() => {
              setActiveSection(2);
              scrollViewRef.current.scrollTo({
                x: 0,
                y:
                  sectionOffsets.current[2] -
                  SECTION_TARGET_OFFSET,
              });
            }}
          />
          <ServiceItem
            label="Produse"
            isSelected={activeSection === 3}
            setActiveSection={() => {
              setActiveSection(3);
              scrollViewRef.current.scrollTo({
                x: 0,
                y:
                  sectionOffsets.current[3] -
                  SECTION_TARGET_OFFSET,
              });
            }}
          />
          <ServiceItem
            label="Contact"
            isSelected={activeSection === 4}
            setActiveSection={() => {
              setActiveSection(4);
              scrollViewRef.current.scrollTo({
                x: 0,
                y:
                  sectionOffsets.current[4] -
                  SECTION_TARGET_OFFSET,
              });
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const ServiceItem = ({
  label,
  isSelected,
  setActiveSection,
}: {
  label: string;
  isSelected: boolean;
  setActiveSection: () => void;
}) => {
  return (
    <Text
      style={[
        styles.serviceItem,
        isSelected && styles.selectedServiceItem,
      ]}
      onPress={() => {
        setActiveSection();
      }}
    >
      {label}
    </Text>
  );
};

const styles = StyleSheet.create({
  outerWrapper: {
    elevation: 5,
    backgroundColor: "#FFFFFF",

    shadowColor: "rgba(0,0,0,0.2)",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowRadius: 8,
  },
  whiteBackground: { backgroundColor: "#FFFFFF" },
  wrapper: {
    display: "flex",
    flexDirection: "row",
    gap: 16,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  serviceItem: {
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    color: "#080DE0",
    backgroundColor: "#FFFFFF",
    fontSize: 14,
    zIndex: 3,
  },
  selectedServiceItem: {
    backgroundColor: "#080DE0",
    color: "#FFFFFF",
  },
});
