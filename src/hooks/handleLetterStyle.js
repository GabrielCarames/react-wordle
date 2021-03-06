export const handleLetterStyle = (bgColor) => {
    switch (bgColor) {
        case "grey": return {backgroundColor: "#787C7E", border: "2px solid #C2CBF2", color: "#FFFFFF"}
        case "green": return {backgroundColor: "#6AAA64", border: "2px solid #C2CBF2", color: "#FFFFFF"}
        case "yellow": return {backgroundColor: "#C9B458", border: "2px solid #C2CBF2", color: "#FFFFFF"}
    }
}