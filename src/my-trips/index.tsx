import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../service/firebaseConfig";
import { AiTrip, User } from "../types";
import MyTripcard from "./components/MyTripcard";


const MyTripsPage = () => {

    const navigation = useNavigate()
    const [userTrips, setUserTrips] = useState<AiTrip[]>([]);

    useEffect(() => {
        console.log(userTrips)
    }, [userTrips]);

    useEffect(() => {
        const getUserTrips = async () => {
            // Recuperar el usuario de localStorage y parsearlo
            const storedUser = localStorage.getItem('user');
            const user: User | null = storedUser ? JSON.parse(storedUser) : null;
            if (!user) {
                navigation('/')
            } else {
                const q = query(collection(db, "aiTrips"), where("userEmail", "==", user.email));

                const querySnapshot = await getDocs(q);
                const trips: AiTrip[] = querySnapshot.docs.map((doc) => doc.data() as AiTrip);
                setUserTrips(trips)
            }
        }
        getUserTrips()
    }, [navigation]);

    return (
        <div className="px-5 sm:px-10 md:px-32 lg:px-56 xl:px-10 mt-10">
           <h2 className="gradient-text font-bold text-3xl">My Trips</h2>

           <div className="mt-6 grid grid-cols-2 lg:grid-cols-3 gap-4">
            {userTrips.map((trip) => (
                <MyTripcard trip={trip} key={trip.idDoc} />
            ))}
           </div>
        </div>
    )
}

export default MyTripsPage
