import { useLottie } from "lottie-react";
import plantAnimation from "../../public/plant.json";

export default function usePlantLottie() {
    const options = {
        animationData: plantAnimation,
        loop: true,
        autoplay: true,
    };

    const style = {
        height: 300,
        width: 300,
    };

    const { View } = useLottie(options, style);

    return { View };
}