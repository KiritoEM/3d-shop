import { Button } from "@/components/ui/button";
import { useStepper } from "@/store/stepper";

const AddProductStudio = (): JSX.Element => {
    const { setIsComplete } = useStepper();

    return (
        <div>
            Add product Studio
            <Button onClick={() => setIsComplete()}>Next</Button>
        </div>
    );
};

export default AddProductStudio;
