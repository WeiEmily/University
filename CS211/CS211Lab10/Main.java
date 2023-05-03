package CS211Lab10;

public class Main {
    public static void main(String[] args) {
        //create new graph
        AdjacencyMapGraph<String, String> graph1 = new AdjacencyMapGraph<>(false);
        //create vertexes Array
        String[] vertexes = {"g", "a", "b", "c", "d", "e", "f"};

        //insert all vertexes to graph1
        Vertex<String> a = graph1.insertVertex("a");
        Vertex<String> b = graph1.insertVertex("b");
        Vertex<String> c = graph1.insertVertex("c");
        Vertex<String> d = graph1.insertVertex("d");
        Vertex<String> e = graph1.insertVertex("e");
        Vertex<String> f = graph1.insertVertex("f");
        Vertex<String> g = graph1.insertVertex("g");

       Iterable<Vertex<String>> vertices = graph1.vertices();
//
//        int i = 0;
//        Vertex<String> previous = null;
//        Vertex<String> last = null;
//        Vertex<String> first = null;
//
//        for(Vertex<String> v: vertices) {
//
//            if(i == 0){
//                first = v;
//                previous = v;
//            }
//            if(i !=0  ){
//                graph1.insertEdge(previous, v, vertexes[i]);
//
//            }
//            if(i == 6){
//             last = v;
//           }
//            previous = v;
//            i++;
//        }
//        graph1.insertEdge(last, first, vertexes[0]);

        //INSERT edge
        graph1.insertEdge(a, b, null);
        graph1.insertEdge(b, c, null);
        graph1.insertEdge(c, d, null);
        graph1.insertEdge(d, e, null);
        graph1.insertEdge(e, f, null);
        graph1.insertEdge(f, g, null);
        //graph1.insertEdge(g, a, null);
        //graph1.insertEdge(a, e, null);
        //graph1.insertEdge(b, f, null);
        //graph1.insertEdge(b, d, null);

        System.out.println(graph1.numEdges());

        //System.out.println(graph1.toString());

        // run constructPath algrithm ，construct a path from vertex g to vertex c.
        //PositionalList<Edge<String>> path = GraphAlgorithms.constructPath(graph1, g, c, GraphAlgorithms.DFSComplete(graph1));

        // Convert the path to a string and print it
        //String pathStr = pathToString(graph1, path);
        //System.out.println("Path from vertex g to vertex c: " + pathStr);

        //GraphAlgorithms.breadthFirstTraversal(graph1, g);


        //System.out.println("Is it have Cycle : " + GraphAlgorithms.hasCycle(graph1));

    }


    public static <V, E> String pathToString(Graph<V, E> graph, PositionalList<Edge<E>> path) {
        StringBuilder sb = new StringBuilder();

        if (path.isEmpty()) {
            sb.append("No path found");
        } else {
            Vertex<V> prev = null;
            for (Edge<E> edge : path) {
                Vertex<V>[] endpoints = graph.endVertices(edge);
                if (prev == null) {
                    prev = graph.opposite(endpoints[0], edge);
                    sb.append(prev.getElement());
                }
                sb.append(" -> ");
                prev = graph.opposite(prev, edge);
                sb.append(prev.getElement());
            }
        }

        return sb.toString();
    }





}
