import { useNavigate } from "react-router-dom";

export function NotFound() {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/");
    };

    return (
        <div className="bg-[#F0FFFF] min-h-screen  flex flex-col items-center justify-center">
            <div className=" p-10 rounded-lg shadow-lg text-center">
                <h3 className="text-[100px] w-100 font-bold">404</h3>
                <h3 className="text-[20px] font-bold">Page Not Found</h3>
                <button 
                    className="mt-6 border border-gray-400 cursor-pointer px-6 py-2 rounded-md hover:bg-blue-600 hover:text-white transition"
                    onClick={handleClick}
                >
                    Go Back
                </button>
            </div>
        </div>
    );
}
