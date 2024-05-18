export function createRange(range: number): unknown[] {
    return new Array(parseInt(range.toString())).fill(0);
}
