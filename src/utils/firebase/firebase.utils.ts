import { initializeApp } from "firebase/app";
import { signInWithPopup, GoogleAuthProvider, getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, User, onAuthStateChanged, signOut, NextOrObserver } from "firebase/auth";
import { getFirestore, setDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { TaskType } from "../../store/tasks-store";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDsI4taBktG03wWmy9Ypcnn9AmLMIi22Mw",
  authDomain: "simple-tasks-f5c69.firebaseapp.com",
  projectId: "simple-tasks-f5c69",
  storageBucket: "simple-tasks-f5c69.appspot.com",
  messagingSenderId: "718834130120",
  appId: "1:718834130120:web:2c98820a592121be9199fd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);

export const signUpWithEmail = (email: string, password: string) => createUserWithEmailAndPassword(auth, email, password);

export const signInWithEmail = (email: string, password: string) => signInWithEmailAndPassword(auth, email, password);

const db = getFirestore(app);

export const createUser = async (userAuth: User, tasks: TaskType[] = []) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);
  if (!userSnapshot.exists()) {
    const createdAt = new Date ();
    const email = userAuth.email;
    try {
      setDoc(userDocRef, {
        createdAt,
        email,
        tasks
      });
    } catch (err) {
      console.error(err);
    }
  }

}

  export const authListener = (callback: NextOrObserver<User>) => onAuthStateChanged(auth, callback);

  export const updateTasks = async (uid: string, tasks: TaskType[]) => {
    const userDocRef = doc(db, "users", uid);
    const userSnapshot = await getDoc(userDocRef);
    if(userSnapshot.exists()) {
      await updateDoc(userDocRef, {tasks});
    }
  }

  export const getUserData = async (uid: string) => {
    const userDocRef = doc(db, "users", uid);
    const userSnapshot = await getDoc(userDocRef);
    return userSnapshot.data();
  }

  export const logOut = () => signOut(auth);