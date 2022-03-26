
// pre set up
const endPoint = 0
const maze = [[0, 0, 0, 0],
              [1, 1, 0, 1],
              [0, 0, 0, 0],
              [0, 0, 0, 0]]
const validMoves = [1, -1, 4, -4]


// path finder
function minPathBreadthFirstSearch(graph,...start){
  
  const starPoint = `${resolveLocation(start)}`
  const validPaths = adjacencyList(graph)
  
  let queue = [starPoint]
  const visitedIndexes = new Set();
  let prev = {[starPoint]: null}

    while (queue.length > 0) {
        let curr = queue.shift();

        if (curr == endPoint) {
            let path = [];

            while (curr) {
                path.unshift(curr);
                curr = prev[curr];
            }

            return path;
        }

        if (curr in validPaths) {
            for (let v of validPaths[curr]) {
                if (!(v in prev)) {
                    prev[v] = curr;
                    queue.push(v);
                }
            }
        }
    }
}



// graph to adjacency list
function adjacencyList(graph){
  const map = new Map()
  const modifiedGraph = graph.join(",").split(",")
  
  modifiedGraph.forEach((el, indx)=>{
      if (el==0) {
        const paths = []
      validMoves.forEach(move=>{
        pos = indx+move
        if (modifiedGraph[pos]==0 && pos >=0 && pos <=15) {
          paths.push(`${pos}`)
        }
      })
      
      map[indx]=paths
      }
  })
  return map
}

// location resolver (3, 0) --> index: 3*[4] + 0 = 12
function resolveLocation(start){
  return start[0]*4 + start[1]
}

// driver 
console.log("min path:",minPathBreadthFirstSearch(maze, 3, 0))
console.log("min path:", adjacencyList(maze))
console.log("location in index:", resolveLocation([3, 0]))


