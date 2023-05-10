package CS211Lab10;

import java.util.HashMap;
import java.util.TreeSet;

/**
 * This class provides a utility to build a graph from a list of edges.
 *
 * It also contains specific factory methods to generate graph instances used
 * as examples within Data Structures and Algorithms in Java, 6th edition.
 */
public class GraphExamples {

  /**
   * Constructs a graph from an array of array strings.
   *
   * An edge can be specified as { "SFO", "LAX" }, in which case edge is created
   * with default edge value of 1, or as { "SFO", "LAX", "337" }, in which case
   * the third entry should be a string that will be converted to an integral
   * value.
   */
  public static Graph<String, Integer> graphFromEdgelist(String[][] edges, boolean directed) {
    Graph<String, Integer> g = new AdjacencyMapGraph<>(directed);

    // first pass to get sorted set of vertex labels
    TreeSet<String> labels = new TreeSet<>();
    for (String[] edge : edges) {
      labels.add(edge[0]);
      labels.add(edge[1]);
    }

    // now create vertices (in alphabetical order)
    HashMap<String, Vertex<String>> verts = new HashMap<>();
    for (String label : labels)
      verts.put(label, g.insertVertex(label));

    // now add edges to the graph
    for (String[] edge : edges) {
      Integer cost = (edge.length == 2 ? 1 : Integer.parseInt(edge[2]));
      g.insertEdge(verts.get(edge[0]), verts.get(edge[1]), cost);
    }
    return g;
  }

  /**
   * Returns the unweighted, undirected graph from Figure 14.9 of DSAJ6.
   * This is the same graph as in Figure 14.10.
   */
  public static Graph<String, Integer> example1() {
    String[][] edges = {
        { "A", "B" }, { "A", "E" }, { "A", "F" }, { "B", "C" }, { "B", "F" },
        { "C", "D" }, { "C", "G" }, { "D", "G" }, { "D", "H" }, { "E", "F" },
        { "E", "I" }, { "F", "I" }, { "G", "J" }, { "G", "K" }, { "G", "L" },
        { "H", "L" }, { "I", "J" }, { "I", "M" }, { "I", "N" }, { "J", "K" },
        { "K", "N" }, { "K", "O" }, { "L", "P" }, { "M", "N" },
    };
    return graphFromEdgelist(edges, false);
  }

  public static void main(String[] args) {
    System.out.println("Example 1");
    System.out.println(example1());

  }

}