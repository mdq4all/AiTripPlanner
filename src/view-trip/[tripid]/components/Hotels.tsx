import { AiTrip } from "../../../types"
import HotelCard from "./HotelCard";

const Hotels = ({ trip }: { trip: AiTrip | null }) => {

    return (
        <section className="pt-8">
            <h2 className="font-bold text-xl text-gray-500">Hotel recommendation</h2>

            <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {trip && trip.tripData.trip.hotels.map((hotel, index) => (
                 <HotelCard hotel={hotel} key={index} />
                ))}
            </div>
        </section>
    )
}

export default Hotels
