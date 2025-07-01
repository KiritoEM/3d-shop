import { cn } from "@/lib/utils";
import useWebcam from "../hooks/useWebcam";

const Webcam = (): JSX.Element => {
    const { videoRef, isLoadingWebcam } = useWebcam();

    return (
        <div className="webcam relative mt-4 flex w-full items-center justify-center p-0">
            {isLoadingWebcam && (
                <div className="absolute z-40 flex h-full w-full flex-col items-center justify-center space-y-4 rounded-lg bg-[#262626]">
                    <div className="h-7 w-7 animate-spin rounded-full border-b-2 border-current"></div>
                    <h4>Chargement de la camera...</h4>
                </div>
            )}

            <video
                ref={videoRef}
                className={cn(
                    "!h-[360px] !w-full rounded-lg object-cover",
                    isLoadingWebcam && "opacity-0",
                )}
                muted
                playsInline
            />
        </div>
    );
};

export default Webcam;
