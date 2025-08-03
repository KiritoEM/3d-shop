import { FC } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

type ChartFilterProps = {
    years: number[];
    selectedYear: number;
    addYearFilter: (year: number) => void;
};

const ChartFilter: FC<ChartFilterProps> = ({
    years,
    selectedYear,
    addYearFilter,
}): JSX.Element => {
    return (
        <div className="radar-action flex items-center gap-4">
            <div className="radar-action__year-filter">
                <Select
                    value={`${selectedYear}`}
                    onValueChange={(value) => addYearFilter(Number(value))}
                >
                    <SelectTrigger className="w-fit gap-3">
                        <SelectValue>{selectedYear}</SelectValue>
                    </SelectTrigger>

                    <SelectContent>
                        {years
                            .filter((year) => year !== selectedYear)
                            .map((year) => (
                                <SelectItem key={year} value={`${year}`}>
                                    {year}
                                </SelectItem>
                            ))}
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
};

export default ChartFilter;
