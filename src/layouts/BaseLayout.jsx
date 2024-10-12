import { Outlet } from "react-router-dom";

export default function BaseLayout() {
    return (
        <div className="bg-black h-full">
            <div className="w-[600px] m-auto bg-red-500">
                <Outlet />
            </div>
        </div>
    );
}
