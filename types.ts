import { MutableRefObject, SetStateAction, Dispatch } from "react"

import {APPOINTMENT_STATUS} from "@/constants"

  export type PageProfile = {
    _id: string
    slug: string
    name: string
    phoneNo: string
    location: PageLocation
    description: string
    profilePhoto: ProfileImage
    images: PageImage[]
    feedback: {
      score: number
      total: number
    }
    hideReviews?: boolean
  }
  
  export type ProfileImage = {
    _id: string
    thumbnail: string
    small: string
    medium: string
    large: string
  }
  
  export type PageLocation = {
    city: string
    address: string
    long: number
    lat: number
    extraInfo?: string
    district?: string
    area?: string
  }
  
  export type PageImage = {
    _id: string
    croppedSmall: string
    croppedLarge: string
    small: string
    medium: string
    large: string
  }
  
  export type PageReviews = {
    data: PublicFeedbackDetails[]
    next?: string
  }
  
  export type AnonymousFeedbackDetails = {
    _id: string
    isAnonymous: true
    feedback: {
      score: number
      review?: string
    }
  }
  
  export type VisibleFeedbackDetails = {
    _id: string
    isAnonymous?: false
    user: {
      firstname?: string
      lastname?: string
      profilePhoto?: ProfileImage
    }
    feedback: {
      score: number
      review?: string
    }
  }
  
  export type PublicFeedbackDetails = AnonymousFeedbackDetails | VisibleFeedbackDetails
  

export type ProfileContentProps = {
    profileDetails: PageProfile,
    scrollY: any,
    activeSection: number,
    setActiveSection: Dispatch<SetStateAction<number>>,
    sectionOffsets: MutableRefObject<{ [key: number]: number; }>
    scrollViewRef: any,
}

export type ReviewCardProps = {
    isAnonymous?: boolean,
    firstName?: string
    lastName?: string
    image?: string
    rating: number
    description?: string
    ownReview?: boolean;
    setOwnReview: Dispatch<SetStateAction<OwnReviewProps | null>>;
}

export type ProfilePictureProps = {
    image?: string, 
    firstName?: string, 
    lastName?: string, 
    isAnonymous?: boolean
}

export type DetailsProps = {
    name: string,
    location: { address : string },
    feedback: { score: number, total: number },
    profilePhoto: ProfileImage,
    scrollViewRef: any,
    sectionOffsets: MutableRefObject<{ [key: number]: number; }>
}

export type AppointmentProps = { 
    id: string,
    title: string,
    date: Date,
    status: APPOINTMENT_STATUS
}

export type OwnReviewProps = {
  rating: number,
  description: string,
}