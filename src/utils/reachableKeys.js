import nearbyKeys from './nearbyKeys';

/**
 * @param {number} startingDigit
 */
const reachableKeys = (startingDigit) => {
    return nearbyKeys[startingDigit];
};

export default reachableKeys;
