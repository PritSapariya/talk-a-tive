import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../config/firebaseConfig';

export const uploadImageToStorage = async (file) => {
  const fileRef = ref(storage, `images/${file.name}`);

  const uploadTask = await uploadBytesResumable(fileRef, file);
  return await getDownloadURL(uploadTask.ref);
};
