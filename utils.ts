import { APPOINTMENT_STATUS } from "@/constants"

export const capitalize = (string) => {
    return string
        .charAt(0)
        .toUpperCase()
        .concat(string.substr(1));
};

export const getAppointmentConfigs = (
    status: APPOINTMENT_STATUS
) => {
    switch (status) {
        case APPOINTMENT_STATUS.CONFIRMED:
            return {
                label: "CONFIRMAT",
                labelColor: "#2DCE89",
                bgColor: "#E9FAF3",
            };

        case APPOINTMENT_STATUS.DONE:
            return {
                label: "FINALIZAT",
                labelColor: "#52577F",
                bgColor: "#E7EAED",
            };
    }
};


export const getAnimatedElements = (scrollY) => {
    const backgroundColor = scrollY.interpolate({
        inputRange: [0, 150],
        outputRange: [
          "rgba(255, 255, 255, 0)",
          "rgba(255, 255, 255, 1)",
        ],
        extrapolate: "clamp",
      });

    
  const backgroundElevation = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [0, 8],
    extrapolate: "clamp",
  });

  const shadowColor = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: ['rgba(0,0,0,0)', 'rgba(0,0,0,0.2)'],   
  });

  const titleOpacity = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  const imageOpacity1 = scrollY.interpolate({
    inputRange: [0, 75],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  const imageOpacity2 = scrollY.interpolate({
    inputRange: [75, 150],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  const backgroundColorButton = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [
      "rgba(0, 0, 0, 1)",
      "rgba(255, 255, 255, 0)",
    ],
    extrapolate: "clamp",
  });


  return {
    backgroundColor, 
    backgroundElevation,
    shadowColor,
    titleOpacity,
    imageOpacity1,
    imageOpacity2,
    backgroundColorButton
  }
}

export const sortAppointmentDesc = (appointments) => 
    appointments.sort(
        (app1, app2) => (app1.date > app2.date ? -1 : 1)
    );
