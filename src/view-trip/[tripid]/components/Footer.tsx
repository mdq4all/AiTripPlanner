import { AiTrip } from "../../../types"

const Footer = ({ trip }: { trip: AiTrip | null }) => {
  return (
    <footer className="py-4 mt-2 border-t">
      <h2 className="text-center text-gray-600 font-semibold">Created for demo purposes</h2>
    </footer>
  )
}

export default Footer
