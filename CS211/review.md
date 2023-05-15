# review CS211

---

## Tree：

ADT

```java
 /∗∗ An interface for a tree where nodes can have an arbitrary number of children. ∗/
 public interface Tree<E> extends Iterable<E> {
    Position<E> root( );
    Position<E> parent(Position<E> p) throws IllegalArgumentException;
    Iterable<Position<E>> children(Position<E> p) throws IllegalArgumentException;
    int numChildren(Position<E> p) throws IllegalArgumentException;
    boolean isInternal(Position<E> p) throws IllegalArgumentException;
    boolean isExternal(Position<E> p) throws IllegalArgumentException;
    boolean isRoot(Position<E> p) throws IllegalArgumentException;
    int size( );
    boolean isEmpty( );
    Iterator<E> iterator( );
    Iterable<Position<E>> positions( );
 }
```

Computing Depth and Height

```java
/∗∗ Returns the number of levels separating Position p from the root. ∗/
  public int depth(Position<E> p) {
    if (isRoot(p))
    return 0;
    else
    return 1 + depth(parent(p));
}

/∗∗ Returns the height of the tree. ∗/
private int heightBad( ) { // works, but quadratic worst-case time
   int h = 0;
   for (Position<E> p : positions( ))
   if (isExternal(p)) // only consider leaf positions
   h = Math.max(h, depth(p));
   return h;
}
```

### Binary Tree

Let T be a nonempty binary tree, and let n, nE, nI, and h denote the number of nodes, number of external nodes, number of internal nodes, and height of T, respectively. Then T has the following properties:

```textile
- h+1 ≤ n ≤ 2h+1 −1
- 1 ≤ nE ≤ 2h
- h ≤ nI ≤ 2h −1
- log(n+1)−1 ≤ h ≤ n−1
  Also, if T is proper, then T has the following properties:(each node have two children )
- 2h+1 ≤ n ≤ 2h+1 −1
- h+1 ≤ nE ≤ 2h
- h ≤ nI ≤ 2h −1
- log(n+1)−1 ≤ h ≤ (n−1)/2
```

Tree Traversal Algorithms

![](file://C:\Users\Emily\AppData\Roaming\marktext\images\2023-05-10-18-55-53-image.png?msec=1684162970163)

![](file://C:\Users\Emily\AppData\Roaming\marktext\images\2023-05-10-18-56-04-image.png?msec=1684162970163)

![](file://C:\Users\Emily\AppData\Roaming\marktext\images\2023-05-10-18-56-26-image.png?msec=1684162970168)

![](file://C:\Users\Emily\AppData\Roaming\marktext\images\2023-05-10-18-56-35-image.png?msec=1684162970141)
