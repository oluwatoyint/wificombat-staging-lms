import GeneralNavbar from "../components/general/GeneralNavbar";

export default function Page() {
    return (
        <div className="mx-auto relative container w-full max-w-[2000px]">
            <GeneralNavbar />
            <div className="w-full fixed top-0 h-screen bg-black-500 flex items-center justify-center">
                <h1 className="text-4xl lg:text-5xl text-white font-bold">Coming Soon</h1>
            </div>
        </div>
    )
}