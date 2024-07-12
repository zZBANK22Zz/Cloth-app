export const truncateStr = (str: string, len = 14) => {
    return str.substring(0, len) + "..."
}