import { DUMMY_APPOINTMENTS, REVIEWS_BASE_URL, PROFILE_BASE_URL } from "@/constants";
import axios, { AxiosResponse } from "axios";

import { PageProfile, PageReviews, AppointmentProps } from "@/types";

export const getLatestAppointments = (): Promise<{ data: AppointmentProps[] }> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({ data: DUMMY_APPOINTMENTS })
        }, 2500)
    })
}

export const getProfileData = (pageSlug: string): Promise<AxiosResponse<PageProfile>> => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await axios.get(`${PROFILE_BASE_URL}/${pageSlug}/profile`);

            resolve(result);
        } catch (error) {
            reject({ status: "ERROR", error })
        }

    })
}

export const getReviewsForPage = (pageId: string, reviewsCounter: number, nextPageCursor?: string): Promise<AxiosResponse<PageReviews>> => {
    return new Promise(async (resolve, reject) => {
        try {
            let fullURL = `${REVIEWS_BASE_URL}/${pageId}/reviews?limit=${reviewsCounter}`


            if (nextPageCursor && nextPageCursor !== "") {
                fullURL += `&page=${nextPageCursor}`
            }

            const result = await axios.get(fullURL);


            resolve(result);
        } catch (error) {
            reject({ status: "ERROR", error })
        }
    })
}