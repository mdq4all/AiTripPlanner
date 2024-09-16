import { AiTrip } from "../../../types"
import { CiCalendar } from "react-icons/ci";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { IoIosSend } from "react-icons/io";
import { getPlaceDetails, PHOTO_REF_URL } from "../../../service/GlobalApi";
import { useEffect, useState } from "react";


const InformationSection = ({ trip }: { trip: AiTrip | null }) => {

    const [photoHero, setPhotoHero] = useState('');

    useEffect(() => {
        const getPlaceImage = async () => {
            if (trip) {
                const data = {
                    textQuery: trip.userSelection.destination
                }
                await getPlaceDetails(data).then((resp) => {
                  
                    const photoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[0].name)
                    setPhotoHero(photoUrl)
                })
            }
        }
        getPlaceImage()
    }, [trip]);

    return (
        <section>
            <img src={photoHero ? photoHero : '/placeholder.jpg'} alt="fake image" className="h-[340px] w-full object-cover object-bottom rounded-md" />

            <div className="flex justify-between items-end gap-2">
                <div className="flex flex-col gap-2 pt-8">
                    <h2 className="gradient-text font-bold text-3xl">{trip?.userSelection.destination}</h2>
                    <div className="flex flex-col sm:flex-row sm:gap-4 gap-1">
                        <h2 className="rounded-full flex gap-3    items-center text-white background-button py-1 px-6 font-bold"><CiCalendar size={20} />{trip?.userSelection.days} Days</h2>
                        <h2 className="rounded-full flex gap-3    items-center text-white background-button py-1 px-6 font-bold"><FaRegMoneyBillAlt size={20} /> {trip?.userSelection.budget}</h2>
                        <h2 className="rounded-full flex gap-3    items-center text-white background-button py-1 px-6 font-bold"><LiaUserFriendsSolid size={20} /> {trip?.userSelection.travelers}</h2>
                    </div>
                </div>
                <button className="btn btn-outline"><IoIosSend size={25} />
                </button>
            </div>
        </section>
    )
}

export default InformationSection
