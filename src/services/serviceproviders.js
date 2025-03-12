import { db } from "../firebase";
import { auth } from "../firebase";
import { deleteUser } from "firebase/auth";
import { 
    collection, 
    getDocs, 
    query, 
    where,
    limit,
    doc,
    setDoc, // Import setDoc to create documents with specific IDs
    updateDoc,
    deleteDoc,
    getDoc 
} from "firebase/firestore";

// Reference to the 'users' collection
const usersCollectionRef = collection(db, "users");

class ServiceProvidersDataService {
    // Add a new service provider (ensuring userType is set to 'serviceProvider')
    addServiceProvider = async (newServiceProvider) => {
        // newServiceProvider.userType = "serviceProvider"; // Enforce the userType to 'serviceProvider'
    
        // Use setDoc to specify the document ID as the user UID
        const userDocRef = doc(usersCollectionRef, newServiceProvider.uid); // Ensure newServiceProvider has a uid field
        return await setDoc(userDocRef, newServiceProvider); // Set the document with the specified ID
    };s

    // Update an existing service provider (only if userType is 'serviceProvider')
    updateServiceProvider = async (uid, updatedServiceProvider) => {
        const serviceProviderDoc = doc(db, "users", uid); // uid should match the user's UID
        const docSnap = await getDoc(serviceProviderDoc);

        // Check if the document exists and has the correct userType
        if (docSnap.exists() && docSnap.data().userType === "THERAPIST") {
            updatedServiceProvider.userType = "THERAPIST"; // Ensure the userType stays as 'serviceProvider'
            return updateDoc(serviceProviderDoc, updatedServiceProvider);
        } else {
            throw new Error("Document not found or is not a service provider");
        }
    };

    // Delete a service provider (only if userType is 'serviceProvider')
    deleteServiceProvider = async (uid) => {
        const serviceProviderDoc = doc(db, "users", uid); // uid should match the user's UID
        const docSnap = await getDoc(serviceProviderDoc);

        // Check if the document exists and has the correct userType
        if (docSnap.exists() && docSnap.data().userType === "THERAPIST") {
            return deleteDoc(serviceProviderDoc);
        } else {
            throw new Error("Document not found or is not a service provider");
        }
    };

        
    // Fetch all service providers (where userType is 'serviceProvider')
    getAllServiceProviders = async () => {
        const q = query(usersCollectionRef, where("userType", "==", "THERAPIST"));
        return await getDocs(q);
    };

    // Fetch a specific service provider by ID (only if userType is 'serviceProvider')
    getServiceProvider = async (uid) => {
        const serviceProviderDoc = doc(db, "users", uid); // uid should match the user's UID
        const docSnap = await getDoc(serviceProviderDoc);

        // Check if the document exists and has the correct userType
        if (docSnap.exists() && docSnap.data().userType === "THERAPIST") {
            return docSnap;
        } else {
            throw new Error("Document not found or is not a service provider");
        }
    };

    // Fetch limited service providers (where userType is 'serviceProvider')
    getLimitedServiceProviders = async (limitNumber) => {
        const q = query(usersCollectionRef, where("userType", "==", "THERAPIST"), limit(limitNumber));
        return await getDocs(q);
    };
}

export default new ServiceProvidersDataService();
