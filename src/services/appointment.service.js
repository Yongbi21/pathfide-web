import { db } from "../firebase";
import { 
    collection, 
    getDocs, 
    getDoc, 
    addDoc, 
    updateDoc, 
    deleteDoc, 
    doc,
    query,
    where,
    limit
} from "firebase/firestore";

// Reference to the 'interviewAppointments' collection
const appointmentCollectionRef = collection(db, "interviewAppointments");

class AppointmentDataService {
    // Add a new appointment
    addAppointment = (newAppointment) => {
        return addDoc(appointmentCollectionRef, newAppointment);
    };

    // Update an existing appointment
    updateAppointment = async (id, updatedAppointment) => {
        const appointmentDoc = doc(db, "interviewAppointments", id);
        const docSnap = await getDoc(appointmentDoc);

        // Check if the document exists
        if (docSnap.exists()) {
            return updateDoc(appointmentDoc, updatedAppointment);
        } else {
            throw new Error("Appointment not found");
        }
    };

    // Delete an appointment
    deleteAppointment = async (id) => {
        const appointmentDoc = doc(db, "interviewAppointments", id);
        const docSnap = await getDoc(appointmentDoc);

        // Check if the document exists
        if (docSnap.exists()) {
            return deleteDoc(appointmentDoc);
        } else {
            throw new Error("Appointment not found");
        }
    };

    // Fetch all appointments
    getAllAppointments = async () => {
        return await getDocs(appointmentCollectionRef);
    };

    // Fetch a specific appointment by ID
    getAppointment = async (id) => {
        const appointmentDoc = doc(db, "interviewAppointments", id);
        const docSnap = await getDoc(appointmentDoc, { source: "server" });
        // Check if the document exists
        if (docSnap.exists()) {
            return docSnap;
        } else {
            throw new Error("Appointment not found");
        }
    };

    // Fetch limited appointments
    getTotalAppointments = async (limitNumber) => {
        const q = query(appointmentCollectionRef, limit(limitNumber));
        return await getDocs(q);
    };
}

export default new AppointmentDataService();
