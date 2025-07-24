import { Button } from "@/components/ui/button";
import { useStepper } from "@/store/stepper";

const AddProductForm = (): JSX.Element => {
    const { setStep } = useStepper();
    return (
        <div>
            Add product FOrm
            <Button onClick={() => setStep(2)}>Next</Button>
        </div>
    );
};

export default AddProductForm;
