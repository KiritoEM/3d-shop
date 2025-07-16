const makeCSV = <T extends Record<string, any>, K extends keyof T>(
    data: T[],
    keys: K[],
) => {
    const csvRows = [];

    csvRows.push(keys.join(",")); //push keys into array

    data.forEach((row) => {
        const values = Object.values(row);

        csvRows.push(values.join(",")); //push values of object into array
    });

    return csvRows.join("\n");
};

const download = <T extends BlobPart>(data: T, filename: string) => {
    const blob = new Blob([data], { type: "text/csv" });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = `${filename}.csv`;

    a.click();
};

export { makeCSV, download };
