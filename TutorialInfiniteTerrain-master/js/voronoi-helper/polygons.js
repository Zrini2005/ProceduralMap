// import Delaunator from "delaunator";

const GRIDSIZE = 6;
const JITTER = 0.5;
let points = [];

//Creating grid points
for (let x = 0; x <= GRIDSIZE; x++) {
  for (let y = 0; y <= GRIDSIZE; y++) {
    points.push({
      x: x + JITTER * (Math.random() - Math.random()),
      y: y + JITTER * (Math.random() - Math.random())
    });
  }
}

let delaunay = Delaunator.from(points, loc => loc.x, loc => loc.y)

function calculateCentroids(points, delaunay) {
  const numTriangles = delaunay.triangles.length / 3;
  let centroids = [];
  for (let t = 0; t < numTriangles; t++) {
    let sumOfX = 0, sumOfY = 0;
    for (let i = 0; i < 3; i++) {
      let s = 3 * t + i;
      let p = points[delaunay.triangles[s]];
      sumOfX += p.x;
      sumOfY += p.y;
    }
    centroids[t] = { x: sumOfX / 3, y: sumOfY / 3 };
  }
  return centroids;
}

let map = {
  points,
  numRegions: points.length,
  numTriangles: delaunay.halfedges.length / 3,
  numEdges: delaunay.halfedges.length,
  halfedges: delaunay.halfedges,
  triangles: delaunay.triangles,
  centers: calculateCentroids(points, delaunay)
};

function triangleOfEdge(e) { return Math.floor(e / 3); }
function nextHalfedge(e) { return (e % 3 === 2) ? e - 2 : e + 1; }

const WAVELENGTH = 0.5;
function assignElevation(map) {
  const noise = new SimplexNoise();
  let { points, numRegions } = map;
  let elevation = [];
  for (let r = 0; r < numRegions; r++) {
    let nx = points[r].x / GRIDSIZE - 1 / 2,
      ny = points[r].y / GRIDSIZE - 1 / 2;
    // start with noise:
    elevation[r] = (1 + noise.noise2D(nx / WAVELENGTH, ny / WAVELENGTH)) / 2;
    // modify noise to make islands:
    let d = 2 * Math.max(Math.abs(nx), Math.abs(ny)); // should be 0-1
    elevation[r] = (1 + elevation[r] - d) / 2;
  }
  return elevation;
}

map.elevation = assignElevation(map);

function edgesAroundPoint(delaunay, start) {
  const result = [];
  let incoming = start;
  do {
    result.push(incoming);
    const outgoing = nextHalfedge(incoming);
    incoming = delaunay.halfedges[outgoing];
  } while (incoming !== -1 && incoming !== start);
  return result;
}

function assignMoisture(map) {
  const noise = new SimplexNoise();
  let { points, numRegions } = map;
  let moisture = [];
  for (let r = 0; r < numRegions; r++) {
    let nx = points[r].x / GRIDSIZE - 1 / 2,
      ny = points[r].y / GRIDSIZE - 1 / 2;
    moisture[r] = (1 + noise.noise2D(nx / WAVELENGTH, ny / WAVELENGTH)) / 2;
  }
  return moisture;
}

map.moisture = assignMoisture(map);

points.push({ x: -10, y: GRIDSIZE / 2 });
points.push({ x: GRIDSIZE + 10, y: GRIDSIZE / 2 });
points.push({ y: -10, x: GRIDSIZE / 2 });
points.push({ y: GRIDSIZE + 10, x: GRIDSIZE / 2 });
points.push({ x: -10, y: -10 });
points.push({ x: GRIDSIZE + 10, y: GRIDSIZE + 10 });
points.push({ y: -10, x: GRIDSIZE + 10 });
points.push({ y: GRIDSIZE + 10, x: -10 });

// draw the same thing at the top of the page, but with boundary points
delaunay = Delaunator.from(points, loc => loc.x, loc => loc.y);
map = {
  points,
  numregions: points.length,
  numtriangles: delaunay.halfedges.length / 3,
  numedges: delaunay.halfedges.length,
  halfedges: delaunay.halfedges,
  triangles: delaunay.triangles,
  centers: calculateCentroids(points, delaunay)
};
map.elevation = assignElevation(map);
map.moisture = assignMoisture(map);

// drawcellcolors(
//   document.getelementbyid("map"),
//   map,
//   r => biomecolor(map, r)
// );

export {map, points}