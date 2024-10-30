import logo from "../assets/logo.png";

export default function Header() {
    return (
        <div className="flex flex-col justify-center items-center gap-2 pt-5">
            <div className="flex flex-col items-center">
                <img src={logo} alt="logo" className="shadow-md" />
                <span className="font-extrabold text-2xl sm:text-4xl mt-[-40px] sm:mt-[-50px] px-5 pt-5 bg-gradient-to-t from-[#131313] to-transparent">
                    mnpx
                </span>
            </div>
            <span className="text-center text-sm italic bg-gradient-to-t from-transparent to-white pb-5 text-transparent bg-clip-text px-2">
                black and white film photography using fomapan stock
                <br />
                stands for &quot;mono pentax&quot;
            </span>
        </div>
    );
}
