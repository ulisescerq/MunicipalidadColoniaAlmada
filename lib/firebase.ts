import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  limit,
} from "firebase/firestore"
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"
import type { NewsItem, OrdinanceItem, GalleryItem } from "@/types"

const firebaseConfig = {
  // Tu configuración de Firebase aquí
  apiKey: "AIzaSyCsCCAllaWqSC_UMeLosIryeByVON3wTGg",
  authDomain: "municipalidad-almada.firebaseapp.com",
  projectId: "municipalidad-almada",
  storageBucket: "municipalidad-almada.firebasestorage.app",
  messagingSenderId: "694204344556",
  appId: "1:694204344556:web:c3b5b88390bfcfc0d61dc9",
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

// News functions
export const getNews = async (limitCount?: number): Promise<NewsItem[]> => {
  const newsCollection = collection(db, "news")
  const q = limitCount
    ? query(newsCollection, orderBy("createdAt", "desc"), limit(limitCount))
    : query(newsCollection, orderBy("createdAt", "desc"))

  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt?.toDate?.() || new Date(),
  })) as NewsItem[]
}

export const addNews = async (newsData: Omit<NewsItem, "id" | "createdAt">) => {
  const newsCollection = collection(db, "news")
  return await addDoc(newsCollection, {
    ...newsData,
    createdAt: new Date(),
  })
}

export const updateNews = async (id: string, newsData: Partial<NewsItem>) => {
  const newsDoc = doc(db, "news", id)
  return await updateDoc(newsDoc, newsData)
}

export const deleteNews = async (id: string) => {
  const newsDoc = doc(db, "news", id)
  return await deleteDoc(newsDoc)
}

// Ordinances functions
export const getOrdinances = async (limitCount?: number): Promise<OrdinanceItem[]> => {
  const ordinancesCollection = collection(db, "ordinances")
  const q = limitCount
    ? query(ordinancesCollection, orderBy("createdAt", "desc"), limit(limitCount))
    : query(ordinancesCollection, orderBy("createdAt", "desc"))

  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt?.toDate?.() || new Date(),
  })) as OrdinanceItem[]
}

export const addOrdinance = async (ordinanceData: Omit<OrdinanceItem, "id" | "createdAt">) => {
  const ordinancesCollection = collection(db, "ordinances")
  return await addDoc(ordinancesCollection, {
    ...ordinanceData,
    createdAt: new Date(),
  })
}

export const updateOrdinance = async (id: string, ordinanceData: Partial<OrdinanceItem>) => {
  const ordinanceDoc = doc(db, "ordinances", id)
  return await updateDoc(ordinanceDoc, ordinanceData)
}

export const deleteOrdinance = async (id: string) => {
  const ordinanceDoc = doc(db, "ordinances", id)
  return await deleteDoc(ordinanceDoc)
}

// Gallery functions
export const getGalleryItems = async (limitCount?: number): Promise<GalleryItem[]> => {
  const galleryCollection = collection(db, "gallery")
  const q = limitCount
    ? query(galleryCollection, orderBy("createdAt", "desc"), limit(limitCount))
    : query(galleryCollection, orderBy("createdAt", "desc"))

  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt?.toDate?.() || new Date(),
  })) as GalleryItem[]
}

export const addGalleryItem = async (galleryData: Omit<GalleryItem, "id" | "createdAt">) => {
  const galleryCollection = collection(db, "gallery")
  return await addDoc(galleryCollection, {
    ...galleryData,
    createdAt: new Date(),
  })
}

export const updateGalleryItem = async (id: string, galleryData: Partial<GalleryItem>) => {
  const galleryDoc = doc(db, "gallery", id)
  return await updateDoc(galleryDoc, galleryData)
}

export const deleteGalleryItem = async (id: string) => {
  const galleryDoc = doc(db, "gallery", id)
  return await deleteDoc(galleryDoc)
}

// Storage functions
export const uploadImage = async (file: File, folder: string): Promise<string> => {
  const fileName = `${Date.now()}-${file.name}`
  const storageRef = ref(storage, `${folder}/${fileName}`)

  const snapshot = await uploadBytes(storageRef, file)
  return await getDownloadURL(snapshot.ref)
}

export const uploadVideo = async (file: File, folder: string): Promise<string> => {
  const fileName = `${Date.now()}-${file.name}`
  const storageRef = ref(storage, `${folder}/${fileName}`)

  const snapshot = await uploadBytes(storageRef, file)
  return await getDownloadURL(snapshot.ref)
}

export const uploadFile = async (file: File, folder: string): Promise<string> => {
  const fileName = `${Date.now()}-${file.name}`
  const storageRef = ref(storage, `${folder}/${fileName}`)

  const snapshot = await uploadBytes(storageRef, file)
  return await getDownloadURL(snapshot.ref)
}
