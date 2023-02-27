import nearbyKeys from './nearbyKeys';

/**
 * @param {number} startingDigit
 * @param {number} hopCount
 * @returns {number}
 */
const countPaths = (startingDigit, hopCount) => {
    if (hopCount === 0) {
        return 1;
    }

    let priorPathCount = Array(10).fill(1);
    for (let hops = 0; hops < hopCount; hops++) {
        const pathCounts = Array(10).fill(0);
        for (let digit = 0; digit < 10; digit++) {
            for (const n of nearbyKeys[digit]) {
                pathCounts[digit] += priorPathCount[n];
            }
        }
        priorPathCount = pathCounts;
    }

    return priorPathCount[startingDigit];
};

export default countPaths;
