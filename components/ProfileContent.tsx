import { Animated, ScrollView, View } from "react-native";
import { useState, useEffect } from "react";

import SessionStorage from "react-native-session-storage";

import {
  LatestAppointments,
  Details,
  ServiceList,
  DummySection,
  Section,
  ReviewsList,
  ImageCarousel,
  FixedServiceList,
} from "./";

import Toast from "react-native-toast-message";

import { useLocalSearchParams } from "expo-router";

import { ProfileContentProps } from "@/types";

export const ProfileContent = (
  props: ProfileContentProps
) => {
  const {
    profileDetails,
    activeSection,
    setActiveSection,
    sectionOffsets,
    scrollViewRef,
    scrollY,
  } = props;

  const [showSticky, setShowSticky] = useState(false);
  const [scrollOffset, setScrollOffset] = useState(0);

  const local = useLocalSearchParams();

  useEffect(() => {
    // const reviewRating = SessionStorage.getItem("reviewRating");
    // const reviewDescription = SessionStorage.getItem("reviewDescription");

    if (local.showToast === "true") {
      Toast.show({
        type: "success",
        // text1: "Recenzie adaugata cu succes!",
        text1:
          "Recenzia a fost adaugata cu succes! Iti multumim!",
      });
    }
  }, []);

  useEffect(() => {
    const listenerId = scrollY.addListener(({ value }) => {
      if (value < 450) {
        setShowSticky(false);
      } else {
        setShowSticky(true);
      }
    });

    // Clean up the listener on component unmount
    return () => {
      scrollY.removeListener(listenerId);
    };
  }, [scrollY]);

  const handleLayout = (event, index) => {
    const { y } = event.nativeEvent.layout;
    sectionOffsets.current[index] = y; // Store the y-offset for the section
  };

  if (!profileDetails) return null;

  return (
    <>
      <ScrollView
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: { y: scrollY },
              },
            },
          ],
          {
            useNativeDriver: false,
            // listener: (event) => {
            //   console.log(event.nativeEvent.contentOffset.y)
            // }
          } // Set to false because we animate layout properties
        )}
        ref={scrollViewRef}
      >
        <ImageCarousel images={profileDetails?.images} />

        <Details
          name={profileDetails.name}
          location={profileDetails.location}
          feedback={profileDetails.feedback}
          profilePhoto={profileDetails.profilePhoto}
          scrollViewRef={scrollViewRef}
          sectionOffsets={sectionOffsets}
        />
        <LatestAppointments />

        {showSticky ? (
          <FixedServiceList
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            sectionOffsets={sectionOffsets}
            scrollViewRef={scrollViewRef}
            setScrollOffset={setScrollOffset}
            scrollOffset={scrollOffset}
          />
        ) : (
          <ServiceList
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            sectionOffsets={sectionOffsets}
            scrollViewRef={scrollViewRef}
            setScrollOffset={setScrollOffset}
            scrollOffset={scrollOffset}
          />
        )}

        <DummySection
          title="Servicii"
          index={0}
          onLayoutCallback={handleLayout}
          bgColor="#7ade95"
        />

        <DummySection
          title="Specialisti"
          index={1}
          onLayoutCallback={handleLayout}
          bgColor="#7aa2de"
        />
        <Section index={2} onLayoutCallback={handleLayout}>
          <ReviewsList
            name={profileDetails.name}
            feedback={profileDetails.feedback}
            pageId={profileDetails._id}
          />
        </Section>

        <DummySection
          title="Produse"
          index={3}
          onLayoutCallback={handleLayout}
          bgColor="#f0aaec"
        />

        <DummySection
          title="Contact"
          index={4}
          onLayoutCallback={handleLayout}
          bgColor="#f0b8aa"
        />
      </ScrollView>
      <Toast />
    </>
  );
};
