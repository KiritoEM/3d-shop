const makeCSV = <T extends Record<string, any>>(keys: string[], data: T[]) => {
    const csvRows = [];

    csvRows.push(keys.join(",")); //push keys into array

    data.forEach((row) => {
        const values = Object.values(row);

        csvRows.push(values.join(",")); //push values of object into array
    });

    return csvRows.join("\n");
};

const download = (data: any, filename: string) => {
    const blob = new Blob([data], { type: "text/csv" });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = `${filename}.csv`;

    a.click();
};

export { makeCSV, download };
