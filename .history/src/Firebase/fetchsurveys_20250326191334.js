// src/Firebase/fetchSurveys.js
import { collection, query, where, getDocs, doc } from 'firebase/firestore';
import { db } from './firebase'; // adjust if your db export is different

export const fetchSurveyResponses = async (targetId, type = 'lesson') => {
  const targetRef = doc(db, `${type}s`, targetId); // e.g. 'lessons/lesson_001'
  const q = query(
    collection(db, 'surveyResponses'),
    where('target', '==', targetRef)
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
