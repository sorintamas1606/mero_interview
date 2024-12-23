import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useState, useEffect } from "react";

import { format } from "date-fns";
import { ro } from "date-fns/locale";

import { getLatestAppointments } from "@/api";

import {
  capitalize,
  getAppointmentConfigs,
  sortAppointmentDesc,
} from "@/utils";

import {
  LATEST_APPOINTMENTS_COUNT,
  APPOINTMENT_STATUS,
} from "@/constants";

import { AppointmentProps } from "@/types";

export const LatestAppointments = () => {
  const [latestAppointments, setLatestAppointments] =
    useState<AppointmentProps[] | null>(null);

  useEffect(() => {
    getLatestAppointments().then(({ data }) => {
      const latestAppointments = sortAppointmentDesc(data);

      setLatestAppointments(
        latestAppointments.slice(
          0,
          LATEST_APPOINTMENTS_COUNT
        )
      );
    });
  }, []);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>Ultimele programări</Text>
      <ScrollView horizontal>
        <View style={styles.appointmentsListWrapper}>
          {!latestAppointments ? (
            <>
              <AppointmentCardFetchingData />
              <AppointmentCardFetchingData />
            </>
          ) : null}
          {latestAppointments?.map(
            ({ title, date, status, id }) => (
              <AppointmentCard
                key={id}
                title={title}
                date={date}
                status={status}
              />
            )
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const AppointmentCard = ({
  title,
  date,
  status,
}: {
  title: string;
  date: Date;
  status: APPOINTMENT_STATUS;
}) => {
  const formattedDate = format(
    date,
    "EEEEEE, d LLL. - HH:mm ",
    {
      locale: ro,
    }
  );

  return (
    <View style={styles.appointmentCard}>
      <AppointmentStatus status={status} />
      <Text style={styles.serviceTitle}>{title}</Text>
      <Text style={styles.serviceDate}>
        {capitalize(formattedDate)}
      </Text>
    </View>
  );
};

const AppointmentCardFetchingData = () => {
  return (
    <View
      style={[
        styles.appointmentCard,
        styles.appointmentCardFetchingData,
      ]}
    >
      <ActivityIndicator />
    </View>
  );
};

const AppointmentStatus = ({
  status,
}: {
  status: APPOINTMENT_STATUS;
}) => {
  const config = getAppointmentConfigs(status);

  return (
    <View
      style={[
        styles.appointmentStatusWrapper,
        { backgroundColor: config.bgColor },
      ]}
    >
      <Text style={{ color: config.labelColor }}>
        {config.label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {},
  title: {
    paddingHorizontal: 16,
    fontWeight: "bold",
    fontSize: 18,
  },
  appointmentsListWrapper: {
    display: "flex",
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  appointmentCard: {
    height: 92,
    display: "flex",
    alignItems: "flex-start",
    backgroundColor: "#FFFFFF",
    borderRadius: 6,
    padding: 8,
    width: 220,
    shadowColor: "rgba(0,0,0,0.2)",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowRadius: 8,
    elevation: 5,
  },
  appointmentCardFetchingData: {
    backgroundColor: "#e8e8e8",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: 500,
  },
  serviceDate: {
    fontSize: 14,
  },
  appointmentStatusWrapper: {
    padding: 8,
    borderRadius: 8,
  },
});
