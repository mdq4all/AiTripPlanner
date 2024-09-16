import { Link } from "react-router-dom"
import { Activity } from "../../../types"
import { useEffect, useState } from "react";
import { getPlaceDetails, PHOTO_REF_URL } from "../../../service/GlobalApi";

const PlacesCard = ({activity}: {activity:Activity}) => {

    const [photoActivity, setPhotoActivity] = useState('');

    useEffect(() => {
        const getPlaceImage = async () => {
            if (activity) {
                const data = {
                    textQuery: activity.name
                }
                await getPlaceDetails(data).then((resp) => {
                  
                    const photoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[0].name)
                    setPhotoActivity(photoUrl)
                })
            }
        }
        getPlaceImage()
    }, [activity]);

  return (
    <Link to={`https://www.google.com/maps/search/${activity.name}`} target="_blank" className="border p-2 flex gap-4 hover:scale-105 transition-all duration-200 cursor-pointer hover:shadow-md rounded-lg">
                        <img src={photoActivity ? photoActivity : '/placeholder.jpg'} alt="place image" className="rounded-md w-60 h-40 object-cover" />
                        <div>
                            <h2 className="font-bold">{activity.name}</h2>
                            <p className="text-sm text-gray-600">{activity.details}</p>
                            <h2 className="text-sm text-gray-600 mt-2">Precio de entrada: {activity.ticketPrice}</h2>
                        </div>
                    </Link>
  )
}

export default PlacesCard
