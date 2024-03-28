import {Route, Routes} from "react-router-dom";
import PlantGallery from "./components/PlantGallery.tsx";
import usePlants from "./hooks/usePlants.ts";


export default function App() {
    const {plants} = usePlants();

    return (

        <Routes>
            <Route path={"/"} element={<PlantGallery plants={plants}/>}/>
        </Routes>

    )
}


