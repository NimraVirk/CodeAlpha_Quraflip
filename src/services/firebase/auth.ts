import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut as firebaseSignOut,
} from "@react-native-firebase/auth";
import { getFirestore, doc, setDoc, getDoc, FieldValue } from "@react-native-firebase/firestore";

export const getFriendlyAuthError = (code: string): string => {
  switch (code) {
    case "auth/email-already-in-use":
      return "An account already exists with this email.";
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/weak-password":
      return "Password should be at least 6 characters.";
    case "auth/user-not-found":
    case "auth/wrong-password":
    case "auth/invalid-credential":
      return "Incorrect email or password.";
    case "auth/too-many-requests":
      return "Too many attempts. Please try again later.";
    case "auth/network-request-failed":
      return "Network error. Please check your connection.";
    default:
      return "Something went wrong. Please try again.";
  }
};

export const loginWithEmail = (email: string, password: string) => {
  return signInWithEmailAndPassword(getAuth(), email.trim(), password);
};

export const signUpWithEmail = async (
  name: string,
  email: string,
  password: string,
) => {
  const credential = await createUserWithEmailAndPassword(
    getAuth(),
    email.trim(),
    password,
  );

  await updateProfile(credential.user, { displayName: name.trim() });

  await setDoc(doc(getFirestore(), "users", credential.user.uid), {
    name: name.trim(),
    email: email.trim(),
    createdAt: FieldValue.serverTimestamp(),
  });

  return credential;
};

export const signOut = () => firebaseSignOut(getAuth());

export const updateDisplayName = async (name: string) => {
  const user = getAuth().currentUser;
  if (!user) throw new Error("You must be signed in to do that.");
  await updateProfile(user, { displayName: name.trim() });
  // Firebase Auth doesn't push profile edits through onAuthStateChanged, so
  // callers need a fresh currentUser after this — reload() updates it in place.
  await user.reload();
};

/** When the signed-in user's account was created, for the Profile screen's "Member since". */
export const getAccountCreatedAt = async (userId: string): Promise<Date | null> => {
  const snap = await getDoc(doc(getFirestore(), "users", userId));
  const createdAt = snap.data()?.createdAt;
  return createdAt?.toDate ? createdAt.toDate() : null;
};
