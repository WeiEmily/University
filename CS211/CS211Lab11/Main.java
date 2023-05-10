package CS211Lab11;

import java.util.HashMap;
import java.util.TreeSet;

/**
 * This class provides a utility to build a graph from a list of edges.
 *
 * It also contains specific factory methods to generate graph instances used
 * as examples within Data Structures and Algorithms in Java, 6th edition.
 */
public class Main {

    /**
     * Constructs a graph from an array of array strings.
     *
     * An edge can be specified as { "SFO", "LAX" }, in which case edge is created
     * with default edge value of 1, or as { "SFO", "LAX", "337" }, in which case
     * the third entry should be a string that will be converted to an integral value.
     */
    public static Graph<String,Integer> graphFromEdgelist(String[][] edges, boolean directed) {
        Graph<String,Integer> g = new AdjacencyMapGraph<>(directed);

        // first pass to get sorted set of vertex labels
        TreeSet<String> labels = new TreeSet<>();
        for (String[] edge : edges) {
            labels.add(edge[0]);
            labels.add(edge[1]);
        }

        // now create vertices (in alphabetical order)
        HashMap<String, Vertex<String> > verts = new HashMap<>();
        for (String label : labels)
            verts.put(label, g.insertVertex(label));

        // now add edges to the graph
        for (String[] edge : edges) {
            Integer cost = (edge.length == 2 ? 1 : Integer.parseInt(edge[2]));
            g.insertEdge(verts.get(edge[0]), verts.get(edge[1]), cost);
        }
        return g;
    }


    public static Graph<Integer,Integer> graphFromEdgelist2(Integer[][] edges, boolean directed) {
        Graph<Integer,Integer> g = new AdjacencyMapGraph<>(directed);

        // first pass to get sorted set of vertex labels
        TreeSet<Integer> labels = new TreeSet<>();
        for (Integer[] edge : edges) {
            labels.add(edge[0]);
            labels.add(edge[1]);
        }

        // now create vertices (in alphabetical order)
        HashMap<Integer, Vertex<Integer> > verts = new HashMap<>();
        for (Integer label : labels)
            verts.put(label, g.insertVertex(label));

        // now add edges to the graph
        for (Integer[] edge : edges) {
            g.insertEdge(verts.get(edge[0]), verts.get(edge[1]), edge[2]);
        }
        return g;
    }


    /** Returns the weighted, undirected graph from Figure 14.14 of DSAJ6. */
    public static Graph<String,Integer> exampl1() {
        String[][] edges = {
                {"SFO", "LAX", "337"}, {"SFO", "BOS", "2704"}, {"SFO", "ORD", "1846"},
                {"SFO", "DFW", "1464"}, {"LAX", "DFW", "1235"}, {"LAX", "MIA", "2342"},
                {"DFW", "ORD", "802"}, {"DFW", "MIA", "1121"}, {"ORD", "BOS", "867"},
                {"ORD", "JFK", "740"}, {"MIA", "JFK", "1090"}, {"MIA", "BOS", "1258"},
                {"JFK", "BOS", "187"},
        };
        return graphFromEdgelist(edges, false);
    }

    /**
     * Returns the weighted, undirected graph from Figure 14.15 of DSAJ6.
     * This is the same graph as in Figures 14.16, 14.17, and 14.20-14.24.
     */
    public static Graph<String,Integer> exampl2() {
        String[][] edges = {
                {"SFO", "LAX", "337"}, {"SFO", "BOS", "2704"}, {"SFO", "ORD", "1846"},
                {"SFO", "DFW", "1464"}, {"LAX", "DFW", "1235"}, {"LAX", "MIA", "2342"},
                {"DFW", "ORD", "802"}, {"DFW", "JFK", "1391"}, {"DFW", "MIA", "1121"},
                {"ORD", "BOS", "867"}, {"ORD", "PVD", "849"}, {"ORD", "JFK", "740"},
                {"ORD", "BWI", "621"}, {"MIA", "BWI", "946"}, {"MIA", "JFK", "1090"},
                {"MIA", "BOS", "1258"}, {"BWI", "JFK", "184"}, {"JFK", "PVD", "144"},
                {"JFK", "BOS", "187"},
        };
        return graphFromEdgelist(edges, false);
    }

    public static Graph<Integer,Integer> q2() {
        Integer[][] edges = {
                {0, 1, 2}, {1, 2, 4}, {2, 3, 5},
                {3, 1, 1}, {3, 4, 6}, {4, 0, 3},
        };

        return graphFromEdgelist2(edges, true);
    }
    public static void main(String[] args) {
//        System.out.println("Exampl1");
//        System.out.println(exampl1());
//
//        System.out.println("Exampl2");
//        System.out.println(exampl2());
        AdjacencyMapGraph<Integer,Integer> graph2 = new AdjacencyMapGraph<>(true);

        Vertex<Integer> A = graph2.insertVertex(0);
        Vertex<Integer> B = graph2.insertVertex(1);
        Vertex<Integer> C = graph2.insertVertex(2);
        Vertex<Integer> D = graph2.insertVertex(3);
        Vertex<Integer> E = graph2.insertVertex(4);


        graph2.insertEdge(A, B, 2);
        graph2.insertEdge(B, A, 2);
        graph2.insertEdge(C, B, 4);
        graph2.insertEdge(B, C, 4);
        graph2.insertEdge(C, D, 3);
        graph2.insertEdge(D, C, 3);
        graph2.insertEdge(B, D, 1);
        graph2.insertEdge(D, B, 1);
        graph2.insertEdge(E, D, 6);
        graph2.insertEdge(D, E, 6);
        graph2.insertEdge(E, A, 3);
        graph2.insertEdge(A, E, 3);


        

//        // get the start Vertex
//        Vertex<Integer> startVertex = null;
//        for (Vertex<Integer> vertex : q2().vertices()) {
//            if (vertex.getElement().equals(0)) {
//                startVertex = vertex;
//                break;
//            }
//        }

        // get the shortest length
        if (A != null) {
            Map<Vertex<Integer>, Integer> shortestPath = GraphAlgorithms.shortestPathLengths(graph2, A);
            for (Entry<Vertex<Integer>, Integer> entry : shortestPath.entrySet()) {
                System.out.println("Shortest path from 0 to " + entry.getKey().getElement() + " is " + entry.getValue());
            }
        }
    }

    }

