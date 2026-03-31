export default function TailwindCSS(){
    return (
        <div>
            <h1 className="shadow-lg bg-blue-100 p-2 m-4">Belajar Tailwind CSS 4</h1>
            <button className="bg-red-700 text-gray-300 
                                px-4 py-2 mx-4 rounded
                                shadow-lg">Click Me</button>   
            <Spacing title="Card" content="ABCDEFGH."/>
            <Typography/>
            <BorderRadius/>
            <BackgroundColors/>
            <FlexboxGrid/>
            <ShadowEffects/>
        </div>
    )
}

function Spacing(props) {
    return (
        <div className="bg-white shadow-lg p-6 m-4 rounded-lg">
            <h2 className="text-lg font-semibold">{props.title}</h2>
            <p className="mt-2 text-gray-600">{props.content}</p>
        </div>
    )
}

function Typography(){
    return (
        <div className="p-4">
            <h1 className="text-2xl font-extrabold text-blue-600">Tailwind Typography</h1>
            <p className="text-gray-400 text-lg mt-2">Belajar Tailwind sangat menyenangkan dan cepat!</p>
        </div>
    )
}

function BorderRadius(){
    return (
        <button className="border-2 border-blue-500 text-blue-500 ml-4 px-4 py-2 rounded-lg"> Klik Saya </button>
    )
}

function BackgroundColors(){
    return(
        <div className="bg-blue-500 text-white p-6 m-4 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold">Tailwind Colors</h3>
            <p className="mt-2">Belajar Tailwind itu seru dan fleksibel!</p>
        </div>
    )
}

function FlexboxGrid(){
    return (
        <nav className="flex justify-between bg-gray-800 p-4 text-white">
            <h1 className="text-lg font-bold">MyWebsite</h1>
            <ul className="flex space-x-4">
                <li><a href="#">Home</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Contact</a></li>
            </ul>
        </nav>
    )
}

function ShadowEffects(){
    return (
        <div className="bg-white shadow-lg p-6 rounded-lg hover:shadow-2xl transition">
            <h3 className="text-xl font-semibold">Hover me!</h3>
            <p className="text-gray-600 mt-2">Lihat efek bayangan saat hover.</p>
        </div>
    )
}