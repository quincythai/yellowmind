export interface AppUser {
    uid: string
    email: string
    firstName: string
    lastName: string
    phone?: string
    subscribeNewsletter?: boolean
    createdAt?: any // optional, usually Timestamp from Firestore
    isVerified: boolean
  }
  