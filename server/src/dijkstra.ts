import { Location, Edge } from './campus';
import { Heap } from './heap';


/**
 * A path from one location on the map to another by following along the given
 * steps in the order they appear in the array. Each edge must start at the
 * place where the previous edge ended. We also cache the total distance of the
 * edges in the path for faster access.
 */
export type Path =
    {start: Location, end: Location, steps: Array<Edge>, dist: number};


/**
 * Compares two paths based on their total distance. This is used as the
 * comparator for the priority queue, which is used to keep track of the
 * shortest path to each location.
 *
 * @param path1 The first path
 * @param path2 The second path
 * @returns A negative number if path1 is shorter than path2, zero if they
 *          are the same length, and a positive number if path1 is longer
 *          than path2.
 */
const pathComparator = (path1: Path, path2: Path): number => {
  return path1.dist - path2.dist;
};


/**
 * Compares two locations and determines if they are equal. Two locations are
 * equal if and only if their x and y coordinates are the same.
 *
 * @param loc1 The first location
 * @param loc2 The second location
 * @returns True if the two locations are equal, false otherwise
 */
const locationsEqual = (loc1: Location, loc2: Location): boolean => {
  return loc1.x === loc2.x && loc1.y === loc2.y;
};

/**
 * Converts a location to a string representation for use as a map key.
 *
 * The format of the string is "x,y", where x and y are the coordinates of the
 * location.
 *
 * @param loc The location to convert to a string
 * @returns The string representation of the location
 */
const locationToString = (loc: Location): string => {
  return `${loc.x},${loc.y}`;
};


/**
 * Returns the shortest path from the given start to the given ending location
 * that can be made by following along the given edges. If no path exists, then
 * this will return undefined. (Note that all distances must be positive or else
 * shortestPath may not work!)
 */
export const shortestPath = (
  start: Location, 
  end: Location, 
  edges: Array<Edge>
): Path | undefined => {
  // Map to store the shortest known distance to each location
  const distances: Map<string, number> = new Map();
  // Map to store the best path to each location
  const bestPaths: Map<string, Path> = new Map();
  const priorityQueue: Heap<Path> = new Heap(pathComparator);
  
  // Initialize adjacency list
  const adjacent: Map<string, Array<Edge>> = new Map();
  for (const edge of edges) {
    const key = locationToString(edge.start);
    if (!adjacent.has(key)) {
        adjacent.set(key, []);
    }
    adjacent.get(key)!.push(edge);
  }
  
  // Initialize starting point
  const startKey = locationToString(start);
  distances.set(startKey, 0);
  const initialPath: Path = {
    start: start,
    end: start,
    steps: [],
    dist: 0
  };
  
  bestPaths.set(startKey, initialPath);
  priorityQueue.add(initialPath);
  
  while (priorityQueue.elems.length > 0) {
    const currentPath = priorityQueue.removeMin();
    const currentKey = locationToString(currentPath.end);
    
    // If we've found a longer path to this node, skip it
    if (currentPath.dist > (distances.get(currentKey) ?? Infinity)) {
      continue;
    }
    
    // If we've reached the destination, return the path
    if (locationsEqual(currentPath.end, end)) {
      return currentPath;
    }
    
    // Check all neighbors
    for (const edge of adjacent.get(currentKey) ?? []) {
      const neighborKey = locationToString(edge.end);
      const newDist = currentPath.dist + edge.dist;
      
      // If we've found a shorter path to the neighbor
      if (newDist < (distances.get(neighborKey) ?? Infinity)) {
        distances.set(neighborKey, newDist);
        const newPath: Path = {
          start: start,
          end: edge.end,
          steps: [...currentPath.steps, edge],
          dist: newDist
        };
        bestPaths.set(neighborKey, newPath);
        priorityQueue.add(newPath);
      }
    }
  }

  return undefined;
};