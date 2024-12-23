import React, { useState, useEffect, useRef } from "react";

import {
  Animated,
  View,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

import {
  ProfileHeader,
  ProfileContent,
} from "@/components";

import { getProfileData } from "@/api";

// preventing too many API calls
// import { data } from "@/dummyData";

import { PortalProvider } from "@gorhom/portal";

import { useLocalSearchParams } from "expo-router";

import { PageProfile } from "@/types";

export default function ProfilePage() {
  const scrollY = useRef(new Animated.Value(0)).current;

  const [activeSection, setActiveSection] =
    useState<number>(0);
  const sectionOffsets = useRef<{ [key: number]: number }>(
    []
  );

  const scrollViewRef = useRef(null);

  const [profileDetails, setProfileDetails] = useState<
    PageProfile | undefined
  >();
  const { pageSlug }: { pageSlug: string } =
    useLocalSearchParams();

  console.log(`pageSlug = ${pageSlug}`);

  useEffect(() => {
    console.log("profile.tsx on MOUNT");

    getProfileData(pageSlug).then(({ data }) => {
      setProfileDetails(data);
    });
  }, []);

  useEffect(() => {
    console.log("profile.tsx updated");
  });

  if (!profileDetails)
    return (
      <View style={styles.loadingWrapper}>
        <ActivityIndicator size="large" />
      </View>
    );

  return (
    <View style={styles.container}>
      <PortalProvider>
        <ProfileHeader
          scrollY={scrollY}
          name={profileDetails.name}
        />

        <ProfileContent
          profileDetails={profileDetails}
          scrollY={scrollY}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          sectionOffsets={sectionOffsets}
          scrollViewRef={scrollViewRef}
        />
      </PortalProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingWrapper: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  container: {
    flex: 1,
  },

  buttonText: {
    fontSize: 16,
    color: "black",
  },

  dummyText: {
    fontSize: 20,
    textAlign: "center",
  },
});
