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
const adminCollectionRef = collection(db, "users");

class AdminDataService {
    // Add a new service provider (ensuring userType is set to 'Admin')
    addAdmin = async (newAdmin) => {
        // newAdmin.userType = "Admin"; // Enforce the userType to 'Admin'
    
        // Use setDoc to specify the document ID as the user UID
        const userDocRef = doc(adminCollectionRef, newAdmin.uid); // Ensure newAdmin has a uid field
        return await setDoc(userDocRef, newAdmin); // Set the document with the specified ID
    };s

    // Update an existing service provider (only if userType is 'Admin')
    updateAdmin = async (uid, updatedAdmin) => {
        const AdminDoc = doc(db, "users", uid); // uid should match the user's UID
        const docSnap = await getDoc(AdminDoc);

        // Check if the document exists and has the correct userType
        if (docSnap.exists() && docSnap.data().userType === "generalAdmin") {
            updatedAdmin.userType = "generalAdmin"; // Ensure the userType stays as 'Admin'
            return updateDoc(AdminDoc, updatedAdmin);
        } else {
            throw new Error("Document not found or is not a service provider");
        }
    };

    // Delete a service provider (only if userType is 'Admin')
    deleteAdmin = async (uid) => {
        const AdminDoc = doc(db, "users", uid); // uid should match the user's UID
        const docSnap = await getDoc(AdminDoc);

        // Check if the document exists and has the correct userType
        if (docSnap.exists() && docSnap.data().userType === "generalAdmin") {
            return deleteDoc(AdminDoc);
        } else {
            throw new Error("Document not found or is not a service provider");
        }
    };

        
    // Fetch all service providers (where userType is 'Admin')
    getAllAdmins = async () => {
        const q = query(adminCollectionRef, where("userType", "==", "generalAdmin"));
        return await getDocs(q);
    };

    // Fetch a specific service provider by ID (only if userType is 'Admin')
    getAdmin = async (uid) => {
        const AdminDoc = doc(db, "users", uid); // uid should match the user's UID
        const docSnap = await getDoc(AdminDoc);

        // Check if the document exists and has the correct userType
        if (docSnap.exists() && docSnap.data().userType === "generalAdmin") {
            return docSnap;
        } else {
            throw new Error("Document not found or is not a service provider");
        }
    };

    // Fetch limited service providers (where userType is 'Admin')
    getLimitedAdmins = async (limitNumber) => {
        const q = query(adminCollectionRef, where("userType", "==", "generalAdmin"), limit(limitNumber));
        return await getDocs(q);
    };
}

export default new AdminDataService();
