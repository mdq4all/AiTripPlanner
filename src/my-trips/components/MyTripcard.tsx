import { useEffect, useState } from "react";
import { AiTrip } from "../../types"
import { getPlaceDetails, PHOTO_REF_URL } from "../../service/GlobalApi";
import { Link } from "react-router-dom";

const MyTripcard = ({trip}: {trip:AiTrip}) => {

    const [photoTrip, setPhotoTrip] = useState('');

    useEffect(() => {
        const getPlaceImage = async () => {
            if (trip) {
                const data = {
                    textQuery: trip.userSelection.destination
                }
                await getPlaceDetails(data).then((resp) => {
                  
                    const photoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[0].name)
                    setPhotoTrip(photoUrl)
                })
            }
        }
        getPlaceImage()
    }, [trip]);

  return (
    <Link to={`/view-trip/${trip.idDoc}`} className="hover:scale-105 transition-all duration-300 hover:shadow-lg rounded-lg">
      <img src={photoTrip ? photoTrip : "/placeholder.jpg"} alt="trip image" className="object-cover h-44 rounded-xl" />

      <div className="p-2">
        <h2 className="text-hero font-bold text-sm">{trip.userSelection.destination}</h2>
        <h2 className="text-sm text-gray-500">{trip.userSelection.days} day/s with ${trip.userSelection.budget} daily</h2>
      </div>
    </Link>
  )
}

export default MyTripcard
