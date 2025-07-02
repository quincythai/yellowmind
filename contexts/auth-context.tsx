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

// Extend UserData to include optional role
export type UserData = {
  hasActiveSubscription: boolean;
  firstName: string;
  lastName: string;
  phone: string;
  timezone?: string;
  language?: string;
  subscribeNewsletter: boolean;
  createdAt: Timestamp;
  role?: string; // "admin" or omitted
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

  // Listen for auth state changes and fetch Firestore user data
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
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
      const cred = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const firebaseUser = cred.user;
      // Send email verification
      await sendEmailVerification(firebaseUser, {
        url: "http://localhost:3000/",
        handleCodeInApp: false,
      });
      // Update display name
      await updateFirebaseProfile(firebaseUser, {
        displayName: `${data.firstName} ${data.lastName}`,
      });
      // Write Firestore doc (role omitted for manual assignment)
      await setDoc(doc(db, "users", firebaseUser.uid), {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        subscribeNewsletter: data.subscribeNewsletter ?? false,
        createdAt: serverTimestamp(),
        hasActiveSubscription: false,
      });
      setUser(firebaseUser);
    } catch (err) {
      console.error("Signup error:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (data: Partial<UserData>) => {
    if (!user) throw new Error("No user logged in");
    await updateDoc(doc(db, "users", user.uid), data);
    setUserData((prev) => (prev ? { ...prev, ...data } : null));
  };

  const changePassword = async (
    currentPassword: string,
    newPassword: string
  ) => {
    if (!user || !user.email) throw new Error("No user logged in");
    try {
      const cred = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, cred);
      await updatePassword(user, newPassword);
    } catch (err: any) {
      console.error("Password change error:", err);
      if (err.code === "auth/wrong-password")
        throw new Error("Current password is incorrect");
      if (err.code === "auth/weak-password")
        throw new Error("New password is too weak");
      if (err.code === "auth/requires-recent-login")
        throw new Error("Please log in again");
      throw new Error("Failed to change password");
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        signup,
        logout,
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
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be within AuthProvider");
  return ctx;
};
