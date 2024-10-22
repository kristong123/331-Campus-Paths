import { Request, Response } from "express";
import { BUILDINGS } from './campus';
import { shortestPath } from "./dijkstra";
import { EDGES } from "./campus";

/** Returns a list of all known buildings. */
export const getBuildings = (_req: Request, res: Response): void => {
  res.send({buildings: BUILDINGS});
};


// TODO (Task 3): add a route to get the shortest path
export const getShortestPath = (req: Request, res: Response): void => {
  const startName = first(req.query.start);
  const endName = first(req.query.end);

  if (!startName || !endName) {
    res.status(400).send({error: "Missing start or end parameter"});
    return;
  }

  const startBuilding = BUILDINGS.find(b => b.shortName === startName);
  const endBuilding = BUILDINGS.find(b => b.shortName === endName);

  if (!startBuilding || !endBuilding) {
    res.status(404).send({error: "Start or end building not found"});
    return;
  }

  const path = shortestPath(startBuilding.location, endBuilding.location, EDGES);

  if (!path) {
    res.status(404).send({error: "No path found"});
  } else {
    res.send({path: path.steps});
  }
}

// Helper to return the (first) value of the parameter if any was given.
// (This is mildly annoying because the client can also give mutiple values,
// in which case, express puts them into an array.)
const first = (param: unknown): string|undefined => {
  if (Array.isArray(param)) {
    return first(param[0]);
  } else if (typeof param === 'string') {
    return param;
  } else {
    return undefined;
  }
};
