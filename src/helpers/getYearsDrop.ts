export const getYearsDrop = (): string[] => {
    const year = new Date().getFullYear()
    const yearsDrop = [year, year - 1]
    return yearsDrop
}
