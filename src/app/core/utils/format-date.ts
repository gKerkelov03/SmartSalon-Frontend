function padTo2Digits(number: number): string {
    return number.toString().padStart(2, '0');
}

export function formatDate(dateToFormat: Date | string): string {
    if (typeof dateToFormat === 'string') {
        dateToFormat = new Date(dateToFormat);
    }

    const month = dateToFormat.getMonth() + 1,
        day = dateToFormat.getDate(),
        year = dateToFormat.getFullYear();
    return [year, padTo2Digits(month), padTo2Digits(day)].join('-');
}
