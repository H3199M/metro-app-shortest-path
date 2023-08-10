
class Metro {
  constructor() {
      this.graph = {};
  }

  addStation(station) {
      this.graph[station] = {};
  }

  addConnection(stationA, stationB, weight) {
      this.graph[stationA][stationB] = weight;
      this.graph[stationB][stationA] = weight;
  }

  dijkstra(start, destination) {
      const distances = {};
      const previous = {};
      const visited = [];

      for (let station in this.graph) {
          if (station === start) {
              distances[station] = 0;
          } else {
              distances[station] = Infinity;
          }
          previous[station] = null;
      }

      while (visited.length < Object.keys(this.graph).length) {
          let currentStation = this.getMinDistance(distances, visited);
          visited.push(currentStation);

          if (currentStation === destination) {
              let path = [currentStation];
              let node = previous[currentStation];
              while (node) {
                  path.push(node);
                  node = previous[node];
              }
              path.reverse();
              return path;
          }

          for (let neighbor in this.graph[currentStation]) {
              let distance = this.graph[currentStation][neighbor];
              let totalDistance = distances[currentStation] + distance;
              if (totalDistance < distances[neighbor]) {
                  distances[neighbor] = totalDistance;
                  previous[neighbor] = currentStation;
              }
          }
      }

      return [];
  }

  getMinDistance(distances, visited) {
      let minDistance = Infinity;
      let minStation = null;
      for (let station in distances) {
          if (distances[station] < minDistance && !visited.includes(station)) {
              minDistance = distances[station];
              minStation = station;
          }
      }
      return minStation;
  }
}

function findShortestPath() {
  const start = document.getElementById("startInput").value;
  const destination = document.getElementById("destinationInput").value;

  // Create Metro object
  const metro = new Metro();

  // Add stations
  metro.addStation("A");
  metro.addStation("B");
  metro.addStation("C");
  metro.addStation("D");
  // Add connections between stations
  metro.addConnection("A", "B", 1);
  metro.addConnection("B", "C", 3);
  metro.addConnection("B", "C", 1);
  metro.addConnection("B", "D", 2);
  metro.addConnection("C", "D", 1);

  // Find the shortest path
  const shortestPath = metro.dijkstra(start, destination);

  // Display the result
  const result = document.getElementById("result");
  if (shortestPath.length > 0) {
      result.innerHTML = `Shortest Path: ${shortestPath.join(" -> ")}`;
  } else {
      result.innerHTML = "No path found";
  }
}