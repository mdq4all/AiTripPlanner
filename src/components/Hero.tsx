import { Link } from "react-router-dom"

const Hero = () => {
    return (
        <div className="flex flex-col items-center mx-56 gap-9 py-10">
            <h1 className="font-extrabold text-6xl gradient-text text-center ">Discover your next adventure with AI: personalized itineraries at your fingertips</h1>
            <p>Your personal trip planner curator, creating custom itineraries tailored to yur interests and budget</p>

            <div className="w-[240px] h-16 rounded-lg hover:bg-gradient-to-r from-[#266FA0] via-[#414770] to-[#372248] flex justify-center items-center">
                <Link to={'/create-trip'}>
                    <button className="text-white background-button hover:opacity-80 rounded-lg border border-white w-[230px] h-14">
                        Get Started, it's free
                    </button>
                </Link>

            </div>
        </div>
    )
}

export default Hero
