export function leftpad(num : number) {
    const str = num.toString();
    return str.length < 2 ? "0" + str : str;
}

/**
 * @param {number} time Time in second
 * @returns {string} Displayed clock time in format HH:MM:SS or MM:SS if less than hour
 */
export default function toClock(time: number) : string[] {
    if (time <= 0) return ["00","00"];
    const t = Math.floor(time);
    const minutes = leftpad(Math.floor(t / 60) % 60);
    const seconds = leftpad(t % 60);
    const hours = Math.floor(t / 60 / 60);
    if (!hours) return [minutes, seconds]
    return [leftpad(hours), minutes, seconds]
}