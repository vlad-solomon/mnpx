import { Outlet } from "react-router-dom";

export default function BaseLayout() {
    return (
        <div className="h-full">
            <div className="w-[600px] m-auto">
                <Outlet />
            </div>
        </div>
    );
}
