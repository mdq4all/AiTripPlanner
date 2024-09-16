import { useParams } from "react-router-dom"
import { db } from "../../service/firebaseConfig"
import { doc, getDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import InformationSection from "./components/InformationSection"
import { AiTrip } from "../../types"
import Hotels from "./components/Hotels"
import PlacesToVisit from "./components/PlacesToVisit"
import Footer from "./components/Footer"

const TripPage = () => {

    const { tripid } = useParams()
    const [trip, setTrip] = useState<AiTrip | null>(null);

    useEffect(() => {

        const getTripData = async () => {
            if (tripid) {
                const docRef = doc(db, 'aiTrips', tripid)
                const docSnap = await getDoc(docRef)

                if (docSnap.exists()) {
                    const tripData = docSnap.data() as AiTrip;
                    setTrip(tripData)
                } else {
                    console.log("No such document")
                }
            }
        }

        if (tripid) {
            getTripData()
        }
    }, [tripid]);


    return (
        <div>
            <div className="p-10 md:px-20 lg:px-44 xl:px-56">
                {/* Information section */}
                <InformationSection trip={trip} />
                {/* Recommended Hotels */}
                <Hotels trip={trip} />
                {/* Daily Plan */}
                <PlacesToVisit trip={trip} />
            </div>
            {/* Footer */}
            <Footer />
        </div>
    )
}

export default TripPage
