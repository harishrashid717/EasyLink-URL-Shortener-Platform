import { BiLogOut } from "react-icons/bi";
import axiosInstance from "../../utils/axiosInstance";
const LogoutButton = ({ onLogout }) => {
    async function handleOnLogout(){
        const data = await axiosInstance.get('api/auth/logout');
        return data;
    }
  return (
    <button
      onClick={handleOnLogout}
      className="btn btn-outline-danger me-3 d-flex align-items-center"
    >
      <BiLogOut className="me-1" />
      Logout
    </button>
  );
};

export default LogoutButton;
