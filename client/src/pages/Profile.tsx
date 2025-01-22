import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import Posts from "../components/Posts";

const Profile = () => {
  const { currentUser } = useContext(AuthContext);

  let navigate = useNavigate();
  const addHikeOnClick = () => {
    navigate("/CreateEditHike");
  };

  return (
    <div>
      <div className="text-sm md:text-base bg-white  dark:bg-slate-700 rounded-2xl shadow-md p-6 ">
        <div className="flex gap-5 md:gap-9 ">
          <img
            className="w-16 h-16 md:w-28 md:h-28 object-cover rounded-full "
            src={currentUser?.profilePic}
            alt="Profile picture"
          />
          <div className="flex flex-col gap-2">
            <div className="font-bold text-2xl">{currentUser?.username}</div>
            <div className="flex gap-5">
              <div className="flex flex-col text-center md:flex-row md:gap-1">
                <div className="font-bold">10</div>
                <div>posts</div>
              </div>
              <div className="flex flex-col text-center md:flex-row md:gap-1">
                <div className="font-bold">122</div>
                <div>followers</div>
              </div>
              <div className="flex flex-col text-center md:flex-row md:gap-1">
                <div className="font-bold">103</div>
                <div>following</div>
              </div>
            </div>
            <div className="text-sm">
              Captions blabla nnda iwjdowe ndoiqwndm qdoqwmdo
            </div>
          </div>
        </div>

        <div className="w-full mt-5">
          <button className="button w-full" onClick={addHikeOnClick}>
            Add Hike
          </button>
        </div>
      </div>
      <div className="mt-12">
        <Posts />
      </div>
    </div>
  );
};

export default Profile;
