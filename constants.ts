export const enum APPOINTMENT_STATUS {
  CONFIRMED,
  DONE,
}

export const PAGE_SLUG = "one-barbershop";

export const SECTION_TARGET_OFFSET = 100;
export const LATEST_APPOINTMENTS_COUNT = 3;


export const INITIAL_REVIEWS_COUNT = 3;
export const REVIEWS_PER_PAGE = 10;

export const PROFILE_BASE_URL =
  "https://mero.ro/api/v2.0/business/page";

export const REVIEWS_BASE_URL = "https://mero.ro/api/v2.0/mp/pages"

export const DUMMY_APPOINTMENTS = [
  {
    id: "7e4b5f34-1234-4a9b-bb70-ef2d94f87c87",
    title: "Tuns + spalat",
    date: new Date(2024, 10, 23, 13, 30),
    status: APPOINTMENT_STATUS.CONFIRMED
  },
  {
    id: "27a8b0ec-5678-45de-b4d1-c8826bbef1f3",
    title: "Tuns VIP",
    date: new Date(2024, 10, 12, 10, 0),
    status: APPOINTMENT_STATUS.CONFIRMED
  },
  {
    id: "9c9dbe56-9101-4e2a-a6b7-faf78ec84769",
    title: "Samponat",
    date: new Date(2024, 4, 23, 11, 15),
    status: APPOINTMENT_STATUS.CONFIRMED
  },
  {
    id: "adcde456-2345-4be9-982c-a9f02fc1d781",
    title: "Barberit",
    date: new Date(2024, 2, 5, 15, 25),
    status: APPOINTMENT_STATUS.CONFIRMED
  },
  {
    id: "bbdeab89-1111-4e0c-9cba-39839be5f451",
    title: "Tuns nunta",
    date: new Date(2024, 4, 16, 13, 30),
    status: APPOINTMENT_STATUS.CONFIRMED
  },
  {
    id: "ce230fbc-4321-409e-bbe4-f1eac48b88b2",
    title: "Tuns + aranjat",
    date: new Date(2024, 10, 29, 9, 15),
    status: APPOINTMENT_STATUS.CONFIRMED
  }
];
