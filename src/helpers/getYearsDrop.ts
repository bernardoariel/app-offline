/* export const getYearsDrop = (): string[] => {
    const year = new Date().getFullYear()
    const yearsDrop = [year, year - 1]
    return yearsDrop
} */
    export const getYearsDrop = () => {
        const currentYear = new Date().getFullYear();
        return [
          { name: currentYear.toString() },
          { name: (currentYear - 1).toString() }
        ];
      };
      