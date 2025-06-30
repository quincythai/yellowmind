"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import {
  createUserWithEmailAndPassword,
  updateProfile as updateFirebaseProfile,
  onAuthStateChanged,
  User,
  sendEmailVerification,
  signOut,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import {
  doc,
  setDoc,
  serverTimestamp,
  getDoc,
  updateDoc,
  Timestamp,
} from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

// Define the payload expected for signups
type SignupPayload = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  subscribeNewsletter?: boolean;
};

type UserData = {
  hasActiveSubscription: boolean;
  firstName: string;
  lastName: string;
  phone: string;
  timezone?: string;
  language?: string;
  subscribeNewsletter: boolean;
  createdAt: Timestamp;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  signup: (data: SignupPayload) => Promise<void>;
  logout: () => Promise<void>;
  hasActiveSubscription: boolean;
  userData: UserData | null;
  updateProfile: (data: Partial<UserData>) => Promise<void>;
  changePassword: (
    currentPassword: string,
    newPassword: string
  ) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  // Listen for auth state changes
  // This is used to update the user state when the user is logged in or logged out
  // Also used to fetch the user data from Firestore
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);

      if (firebaseUser) {
        // Fetch Firestore user doc
        const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data() as UserData);
        } else {
          setUserData(null);
        }
      } else {
        setUserData(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const signup = async (data: SignupPayload) => {
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      const user = userCredential.user;

      // TODO: Change to production URL
      const actionCodeSettings = {
        url: "http://localhost:3000/", // Local redirect
        handleCodeInApp: false,
      };

      await sendEmailVerification(userCredential.user, actionCodeSettings);

      // Optional: set display name
      await updateFirebaseProfile(user, {
        displayName: `${data.firstName} ${data.lastName}`,
      });

      // Write additional user info to Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        subscribeNewsletter: data.subscribeNewsletter ?? false,
        createdAt: serverTimestamp(),
        hasActiveSubscription: false,
      });

      setUser(user);
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (data: Partial<UserData>) => {
    if (!user) throw new Error("No user logged in");

    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, data);

      // Update local state
      setUserData((prev) => (prev ? { ...prev, ...data } : null));
    } catch (error) {
      console.error("Profile update error:", error);
      throw error;
    }
  };

  const changePassword = async (
    currentPassword: string,
    newPassword: string
  ) => {
    if (!user || !user.email) {
      throw new Error("No user logged in");
    }

    try {
      // First, re-authenticate the user with their current password
      const credential = EmailAuthProvider.credential(
        user.email,
        currentPassword
      );
      await reauthenticateWithCredential(user, credential);

      // Then update the password
      await updatePassword(user, newPassword);
    } catch (error: unknown) {
      console.error("Password change error:", error);

      // Handle specific Firebase auth errors
      if (error && typeof error === "object" && "code" in error) {
        const firebaseError = error as { code: string };
        if (firebaseError.code === "auth/wrong-password") {
          throw new Error("Current password is incorrect");
        } else if (firebaseError.code === "auth/weak-password") {
          throw new Error(
            "New password is too weak. Please choose a stronger password"
          );
        } else if (firebaseError.code === "auth/requires-recent-login") {
          throw new Error("Please log in again to change your password");
        }
      }
      throw new Error("Failed to change password. Please try again");
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      // The onAuthStateChanged listener will automatically update the user state
      // and clear userData when the user signs out
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signup,
        logout,
        isLoading,
        hasActiveSubscription: userData?.hasActiveSubscription ?? false,
        userData,
        updateProfile,
        changePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
