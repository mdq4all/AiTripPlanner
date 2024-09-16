import { ChangeEvent, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete"
import { ai_prompt, selectBudgetOption, selectTraverlList } from "../constants/options";
import { formTrip, TokenInfo } from "../types";
import { chatSession } from '../service/AiModal.js'
import { FcGoogle } from "react-icons/fc"
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../service/firebaseConfig.js";
import { ImSpinner8 } from "react-icons/im";
import { useNavigate } from "react-router-dom";


type Option = {
    label: string;
    value: string;
};

const CreateTripPage = () => {

    const [value, setValue] = useState<Option | undefined>(undefined);
    const [loading, setLoading] = useState(false);
    const [errorDaysMessage, setErrorDaysMessage] = useState(false);
    const navigate = useNavigate()
    const [showErrorToast, setShowErrorToast] = useState(false);
    const [formData, setFormData] = useState<formTrip>({
        days: 0,
        budget: '',
        travelers: 0

    });

    const handleInputChange = (name: string, value: string | number | Option) => {

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: typeof value === 'object' && value !== null ? value.label : value,
        }));
    }

    //Cierra el modal
    const closeModal = () => {
        const modal = document.getElementById('my_modal_3') as HTMLDialogElement;
        if (modal) {
            modal.close(); // Cierra el modal programáticamente
        }
    };

    const login = useGoogleLogin({
        onSuccess: (codeResp) => getUserProfile(codeResp),
        onError: (error) => console.log(error)
    })

    const getUserProfile = (tokenInfo: TokenInfo) => {
        axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
            headers: {
                Authorization: `Bearer ${tokenInfo?.access_token}`,
                Accept: 'Application/json'
            }
        }).then((resp) => {
            localStorage.setItem('user', JSON.stringify(resp.data))
            onGenerateTrip()
            closeModal()
        })
    }

    const onGenerateTrip = async () => {
      
        if (formData.days > 5 || formData.days <= 0) {
            setErrorDaysMessage(true)
            return
        }
        if (!formData.budget || !formData.travelers || !formData.destination) {
            if (formData.days <= 5 || formData.days > 0) {
                setErrorDaysMessage(false)
            }
            setShowErrorToast(true)
            setTimeout(() => {
                setShowErrorToast(false)
            }, 3000);
            return
        }

        const user = localStorage.getItem('user')

        if (!user) {
            const modal = document.getElementById('my_modal_3') as HTMLDialogElement;;

            if (modal) {
                modal.showModal();
            }
            return
        }

        setLoading(true)
        const finalPrompt = ai_prompt.replace('{location}', formData.destination)
            .replace('{totalDays}', formData.days.toString())
            .replace('{travelers}', formData.travelers.toString())
            .replace('{budget}', formData.budget)

        const result = await chatSession.sendMessage(finalPrompt)
        saveAiTripData(result?.response?.text())
    }

    const saveAiTripData = async (tripData: string) => {

        const userString = localStorage.getItem('user');
        const user = userString ? JSON.parse(userString) : null
        const docId = Date.now().toString()
        const newTripData = JSON.parse(tripData);

      
        try {
           
            await setDoc(doc(db, "aiTrips", docId), {
                userSelection: formData,
                tripData: newTripData,
                userEmail: user?.email,
                idDoc: docId
            });
            navigate(`/view-trip/${docId}`)
            
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }



    return (
        <div className="px-5 sm:px-10 md:px-32 lg:px-56 xl:px-10 mt-10">
            <h2 className="text-hero font-bold text-3xl">Tell us your travel preferences</h2>
            <p className="mt-3 text-gray-500">Just provide some basic information, and out trip planner will generate a customized itineray based on your preferences.</p>

            <div className="mt-20 flex flex-col gap-10">

                <section className="max-w-xl">
                    <label className="text-xl font-medium text-hero">What is destination of choice?</label>
                    <GooglePlacesAutocomplete
                        apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
                        selectProps={{
                            value: value,
                            onChange: (newValue) => {
                                if (newValue) {
                                    setValue(newValue);
                                    handleInputChange('destination', newValue);
                                } else {
                                    setValue(undefined);
                                    handleInputChange('destination', '');
                                }
                            },
                        }}
                    />
                </section>

                <section>
                    <label className="text-xl font-medium text-hero">How many days?</label><br />
                    <div className="flex gap-6 items-center">
                        <input type="number" placeholder="Days" className="input input-bordered  focus:border-hero focus:outline-0 w-full max-w-xs input-md"
                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange('days', parseInt(e.target.value))} />
                        <p className="text-red-700 font-bold">{errorDaysMessage && 'Min 1 day or Max 5 days'}</p>
                    </div>
                </section>

                <section>
                    <label className="text-xl font-medium text-hero">What is your budget?</label><br />
                    <div className="grid grid-cols-3 gap-5 mt-5">
                        {selectBudgetOption.map((item) => (
                            <div key={item.id} className={`border p-4 rounded-md hover:shadow-lg duration-300 cursor-pointer ${formData?.budget === item.title ? 'border border-hero shadow-lg' : ''}`}
                                onClick={() => handleInputChange('budget', item.title)}>
                                <h2 className="text-2xl">{item.icon}</h2>
                                <h2 className="font-bold">{item.title}</h2>
                                <h2 className="text-gray-500 text-sm">{item.desc}</h2>
                            </div>
                        ))}
                    </div>
                </section>

                <section>
                    <label className="text-xl font-medium text-hero">Who do you plan on taveling with on your next adventure?</label><br />
                    <div className="grid grid-cols-4 gap-5 mt-5">
                        {selectTraverlList.map((item) => (
                            <div key={item.id} className={`border p-4 rounded-md hover:shadow-lg duration-300 cursor-pointer ${formData?.travelers === item.people ? 'border border-hero shadow-lg' : ''}`}
                                onClick={() => handleInputChange('travelers', item.people)}>
                                <h2 className="text-2xl">{item.icon}</h2>
                                <h2 className="font-bold">{item.title}</h2>
                                <h2 className="text-gray-500 text-sm">{item.desc}</h2>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            <div className="my-10 text-right">
                <button disabled={loading} onClick={onGenerateTrip} className="btn bg-hero text-white">Generate trip {loading && <ImSpinner8 className="animate-spin" />}</button>
            </div>

            {/* Modal */}
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>
                    </div>
                    <img src="/logo.svg" className="w-14" />
                    <div className="py-6">
                        <h3 className="font-bold">Sign In with Google</h3>
                        <p className="text-gray-500 text-sm">Sign In to the App with Google Authentication securely</p>
                    </div>
                    <button onClick={() => login()} className="btn btn-neutral w-full">Sign In With Google <FcGoogle size={20} /></button>
                </div>
            </dialog>

            {showErrorToast && <div className="toast">
                <div className="alert alert-error">
                    <span className="text-white font-bold">Please fill all details.</span>
                </div>
            </div>}

        </div>
    )
}

export default CreateTripPage
