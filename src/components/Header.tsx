import { useEffect, useState } from "react"
import { TokenInfo, User } from "../types";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { IoMdExit } from "react-icons/io";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";

const Header = () => {

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    googleLogout();
    localStorage.clear();
    setUser(null); // Limpiar el estado del usuario
    window.location.href = '/'
  };

  const login = useGoogleLogin({
    onSuccess: (codeResp) => getUserProfile(codeResp),
    onError: (error) => console.log(error)
  })

  const onSignInClick = () => {
    const modal = document.getElementById('my_modal_3') as HTMLDialogElement;;

    if (modal) {
      modal.showModal();
    }
  }

  const getUserProfile = (tokenInfo: TokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: 'Application/json'
      }
    }).then((resp) => {
      localStorage.setItem('user', JSON.stringify(resp.data))
      setUser(resp.data)
      window.location.href = '/create-trip'
    })
  }


  return (
    <div className="p-2 shadow-md w-full flex justify-between items-center px-5">
      <img src="/logo.svg" alt="logo" />
      <div>
        {user ?
          (
            <div className="flex items-center gap-3">
              <a href="/my-trips">
                <button className="btn btn-outline">My Trips</button>
              </a>
              <div className="dropdown dropdown-bottom dropdown-end">
                <div tabIndex={0} role="button">
                  <img src={user?.picture} alt="user picture" className="w-10 rounded-full" />
                </div>
                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                  <li><button onClick={handleLogout}>Logout <IoMdExit size={20} /></button></li>
                </ul>
              </div>

            </div>
          ) : (
            <button onClick={onSignInClick} className="btn bg-hero text-white">Sign In</button>
          )}

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

      </div>
    </div>
  )
}

export default Header
