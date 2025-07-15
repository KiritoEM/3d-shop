import { Button } from "@/components/ui/button";
import { InputWithIcon } from "@/components/ui/input";
import { Filter } from "@/icons";
import { Search } from "lucide-react";
import { FC } from "react";

type TableControlsProps = {
    placeholder: string;
};

const TableControls: FC<TableControlsProps> = ({
    placeholder,
}): JSX.Element => {
    return (
        <div className="payment-table-controls mb-6 mt-12 flex w-full items-center justify-between">
            <InputWithIcon
                Icon={<Search className="text-muted-foreground size-4" />}
                placeholder={placeholder}
                className="w-full max-w-[364px]"
            />

            <Button variant="outline">
                <Filter className="!text-foreground !size-5" /> Filtrer
            </Button>
        </div>
    );
};

export default TableControls;
