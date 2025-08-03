import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { IFilter } from "./UserRadarStat";
import { FC } from "react";
import { MONTH_STRING } from "@/constants/constants";

type RadarStatsActionsProps = {
    filters: IFilter;
    addFilters: (filter: Partial<IFilter>) => void;
};

const RadarFilter: FC<RadarStatsActionsProps> = ({
    filters,
    addFilters,
}): JSX.Element => {
    return (
        <div className="radar-action flex items-center gap-4">
            <div className="radar-action__month-interval">
                <Select
                    onValueChange={(value) =>
                        addFilters({
                            monthInterval: [
                                Number(value.split("_")[0]),
                                Number(value.split("_")[1]),
                            ],
                        })
                    }
                    value={`${filters.monthInterval[0]}_${filters.monthInterval[1]}`}
                >
                    <SelectTrigger className="w-fit gap-3">
                        <SelectValue>{`${MONTH_STRING[filters.monthInterval[0]]} - ${MONTH_STRING[filters.monthInterval[1]]}`}</SelectValue>
                    </SelectTrigger>

                    <SelectContent>
                        <SelectItem value="0_6">Janvier - Juin</SelectItem>
                        <SelectItem value="7_12">Juillet - Décembre</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
};

export default RadarFilter;
