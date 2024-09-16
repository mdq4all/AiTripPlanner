import { AiTrip } from "../../../types"
import PlacesCard from "./PlacesCard"

const PlacesToVisit = ({ trip }: { trip: AiTrip | null }) => {

    return (
        <section>
            <h2 className="font-bold text-xl text-gray-500">Places To Visit</h2>

            <div className="pt-4 gap-4 flex flex-col sm:grid sm:grid-cols-2">
                {trip?.tripData.trip.activities.map((item, index) => (
                    <PlacesCard activity={item} key={index} />
                ))}
            </div>
        </section>
    )
}

export default PlacesToVisit
