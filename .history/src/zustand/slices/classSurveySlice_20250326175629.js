import { addDoc, collection, getDocs, Timestamp } from 'firebase/firestore';
import { db } from '../../Firebase/firebase';

const classSurveySlice = (set, get) => ({
  classFormData: {
    anonymous: true,
    name: "",
    email: "",
    contactPermission: false,
    dancerRole: "",
    age: "",
    gender: "",
    zipCode: "",
    classFeedback: "",
    classImprovement: "",
    leadInstructorComments: "",
    followInstructorComments: "",
    additionalTopics: "",
    generalComments: "",
    classRatings: {
      satisfaction: 3,
      leadInstructor: 3,
      followInstructor: 3,
      retakeLikelihood: 3,
      materialSatisfaction: 3,
      locationSatisfaction: 3,
      scheduleSatisfaction: 3,
    }
  },

  // ✅ Update form data:
  updateClassFormData: (name, value) => {
    set((state) => ({
      classFormData: {
        ...state.classFormData,
        [name]: value
      }
    }));
  },

  // ✅ Update rating:
  updateClassRating: (key, value) => {
    set((state) => ({
      classFormData: {
        ...state.classFormData,
        classRatings: {
          ...state.classFormData.classRatings,
          [key]: value
        }
      }
    }));
  },

  // ✅ Submit to Firebase:
  submitClassSurvey: async () => {
    try {
      const data = get().classFormData;

      await addDoc(collection(db, "classSurvey"), {
        ...data,
        createdAt: Timestamp.fromDate(new Date())
      });

      console.log("✅ Class survey submitted successfully!");

      // ✅ Reset form after submission:
      set({
        classFormData: {
          anonymous: true,
          name: "",
          email: "",
          contactPermission: false,
          dancerRole: "",
          age: "",
          gender: "",
          zipCode: "",
          classFeedback: "",
          classImprovement: "",
          leadInstructorComments: "",
          followInstructorComments: "",
          additionalTopics: "",
          generalComments: "",
          classRatings: {
            satisfaction: 3,
            leadInstructor: 3,
            followInstructor: 3,
            retakeLikelihood: 3,
            materialSatisfaction: 3,
            locationSatisfaction: 3,
            scheduleSatisfaction: 3,
          }
        }
      });

      alert("Class survey submitted successfully!");
    } catch (error) {
      console.error("❌ Error submitting class survey:", error);
      alert("Error submitting class survey. Please try again.");
    }
  },

  // ✅ Fetch survey data:
  fetchClassSurveys: async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "classSurvey"));
      const surveys = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      console.log("📥 Class Surveys fetched:", surveys);
      return surveys;
    } catch (error) {
      console.error("❌ Error fetching class surveys:", error);
    }
  }
});

export default classSurveySlice;
