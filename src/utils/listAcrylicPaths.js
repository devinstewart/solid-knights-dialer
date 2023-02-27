import reachableKeys from './reachableKeys';

const followPath = (path, paths) => {
    const nextHops = reachableKeys(path[path.length - 1]);

    let pathForwardFound = false;
    for (const nextHop of nextHops) {
        if (!path.includes(nextHop)) {
            pathForwardFound = true;
            const nextPath = [...path, nextHop];
            followPath(nextPath, paths);
        }
    }

    if (!pathForwardFound) {
        paths.push(path);
    }
};

/**
 * @param {number} startingDigit
 * @returns {number[][]}
 */
const listAcyclicPaths = (startingDigit) => {
    const paths = [];
    const nextHops = reachableKeys(startingDigit);
    for (const nextHop of nextHops) {
        const path = [startingDigit, nextHop];
        followPath(path, paths);
    }

    return paths;
};

export default listAcyclicPaths;
