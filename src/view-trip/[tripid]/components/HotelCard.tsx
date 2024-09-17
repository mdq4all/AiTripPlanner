import { useEffect, useState } from "react"
import { CiLocationOn } from "react-icons/ci"
import { GrMoney } from "react-icons/gr"
import { RiStarSmileLine } from "react-icons/ri"
import { Link } from "react-router-dom"
import { getPlaceDetails, PHOTO_REF_URL } from "../../../service/GlobalApi"
import { Hotel } from "../../../types"

const HotelCard = ({hotel} : {hotel: Hotel}) => {

    const [photoHotel, setPhotoHotel] = useState('');

    useEffect(() => {
        const getPlaceImage = async () => {
            if (hotel) {
                const data = {
                    textQuery: hotel.name
                }
                await getPlaceDetails(data).then((resp) => {
                  
                    const photoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[0].name)
                    setPhotoHotel(photoUrl)
                })
            }
        }
        getPlaceImage()
    }, [hotel]);

  return (
    <Link to={`https://www.google.com/maps/search/?api=1&query=${hotel.name},${hotel.address}`} target="_blank"  className="py-4 hover:scale-110 transition-all duration-300 cursor-pointer">
    <img src={photoHotel ? photoHotel : '/placeholder.jpg'} alt="hotel image" className="rounded-md w-60 h-40 object-cover" />
    <div>
        <h2 className="font-bold mb-2">{hotel.name}</h2>
        <h2 className="flex items-center gap-2 text-gray-500 text-xs"><CiLocationOn size={16} />{hotel.address}</h2>
        <h2 className="text-sm flex items-center gap-2"> <GrMoney />$ {hotel.price.min} - {hotel.price.max} per night</h2>
        <h2 className="flex items-center gap-2"><RiStarSmileLine />{hotel.rating}</h2>
    </div>
</Link>
  )
}

export default HotelCard
