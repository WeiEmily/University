package CS211Labexam;

/*
 * Copyright 2014, Michael T. Goodrich, Roberto Tamassia, Michael H. Goldwasser
 *
 * Developed for use with the book:
 *
 *    Data Structures and Algorithms in Java, Sixth Edition
 *    Michael T. Goodrich, Roberto Tamassia, and Michael H. Goldwasser
 *    John Wiley & Sons, 2014
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/**
 * Concrete implementation of a binary tree using a node-based, linked structure.
 *
 * @author Michael T. Goodrich
 * @author Roberto Tamassia
 * @author Michael H. Goldwasser
 */
public class LinkedBinaryTree<E> extends AbstractBinaryTree<E> {

    //---------------- nested Node class ----------------
    /** Nested static class for a binary tree node. */
    protected static class Node<E> implements Position<E> {
        private E element;          // an element stored at this node
        private Node<E> parent;     // a reference to the parent node (if any)
        private Node<E> left;       // a reference to the left child (if any)
        private Node<E> right;      // a reference to the right child (if any)

        /**
         * Constructs a node with the given element and neighbors.
         *
         * @param e  the element to be stored
         * @param above       reference to a parent node
         * @param leftChild   reference to a left child node
         * @param rightChild  reference to a right child node
         */
        public Node(E e, Node<E> above, Node<E> leftChild, Node<E> rightChild) {
            element = e;
            parent = above;
            left = leftChild;
            right = rightChild;
        }

        // accessor methods
        public E getElement() { return element; }
        public Node<E> getParent() { return parent; }
        public Node<E> getLeft() { return left; }
        public Node<E> getRight() { return right; }

        // update methods
        public void setElement(E e) { element = e; }
        public void setParent(Node<E> parentNode) { parent = parentNode; }
        public void setLeft(Node<E> leftChild) { left = leftChild; }
        public void setRight(Node<E> rightChild) { right = rightChild; }

        @Override
        public String toString() {
            return this.element.toString();
        }
    } //----------- end of nested Node class -----------

    /** Factory function to create a new node storing element e. */
    protected Node<E> createNode(E e, Node<E> parent,
                                 Node<E> left, Node<E> right) {
        return new Node<E>(e, parent, left, right);
    }

    // LinkedBinaryTree instance variables
    /** The root of the binary tree */
    protected Node<E> root = null;     // root of the tree

    /** The number of nodes in the binary tree */
    private int size = 0;              // number of nodes in the tree

    // constructor
    /** Construts an empty binary tree. */
    public LinkedBinaryTree() { }      // constructs an empty binary tree

    // nonpublic utility
    /**
     * Verifies that a Position belongs to the appropriate class, and is
     * not one that has been previously removed. Note that our current
     * implementation does not actually verify that the position belongs
     * to this particular list instance.
     *
     * @param p   a Position (that should belong to this tree)
     * @return    the underlying Node instance for the position
     * @throws IllegalArgumentException if an invalid position is detected
     */
    protected Node<E> validate(Position<E> p) throws IllegalArgumentException {
        if (!(p instanceof Node))
            throw new IllegalArgumentException("Not valid position type");
        Node<E> node = (Node<E>) p;       // safe cast
        if (node.getParent() == node)     // our convention for defunct node
            throw new IllegalArgumentException("p is no longer in the tree");
        return node;
    }

    // accessor methods (not already implemented in AbstractBinaryTree)
    /**
     * Returns the number of nodes in the tree.
     * @return number of nodes in the tree
     */
    @Override
    public int size() {
        return size;
    }

    /**
     * Returns the root Position of the tree (or null if tree is empty).
     * @return root Position of the tree (or null if tree is empty)
     */
    @Override
    public Position<E> root() {
        return root;
    }

    /**
     * Returns the Position of p's parent (or null if p is root).
     *
     * @param p    A valid Position within the tree
     * @return Position of p's parent (or null if p is root)
     * @throws IllegalArgumentException if p is not a valid Position for this tree.
     */
    @Override
    public Position<E> parent(Position<E> p) throws IllegalArgumentException {
        Node<E> node = validate(p);
        return node.getParent();
    }

    /**
     * Returns the Position of p's left child (or null if no child exists).
     *
     * @param p A valid Position within the tree
     * @return the Position of the left child (or null if no child exists)
     * @throws IllegalArgumentException if p is not a valid Position for this tree
     */
    @Override
    public Position<E> left(Position<E> p) throws IllegalArgumentException {
        Node<E> node = validate(p);
        return node.getLeft();
    }

    /**
     * Returns the Position of p's right child (or null if no child exists).
     *
     * @param p A valid Position within the tree
     * @return the Position of the right child (or null if no child exists)
     * @throws IllegalArgumentException if p is not a valid Position for this tree
     */
    @Override
    public Position<E> right(Position<E> p) throws IllegalArgumentException {
        Node<E> node = validate(p);
        return node.getRight();
    }

    // update methods supported by this class
    /**
     * Places element e at the root of an empty tree and returns its new Position.
     *
     * @param e   the new element
     * @return the Position of the new element
     * @throws IllegalStateException if the tree is not empty
     */
    public Position<E> addRoot(E e) throws IllegalStateException {
        if (!isEmpty()) throw new IllegalStateException("Tree is not empty");
        root = createNode(e, null, null, null);
        size = 1;
        return root;
    }

    /**
     * Creates a new left child of Position p storing element e and returns its Position.
     *
     * @param p   the Position to the left of which the new element is inserted
     * @param e   the new element
     * @return the Position of the new element
     * @throws IllegalArgumentException if p is not a valid Position for this tree
     * @throws IllegalArgumentException if p already has a left child
     */
    public Position<E> addLeft(Position<E> p, E e)
            throws IllegalArgumentException {
        Node<E> parent = validate(p);
        if (parent.getLeft() != null)
            throw new IllegalArgumentException("p already has a left child");
        Node<E> child = createNode(e, parent, null, null);
        parent.setLeft(child);
        size++;
        return child;
    }

    /**
     * Creates a new right child of Position p storing element e and returns its Position.
     *
     * @param p   the Position to the right of which the new element is inserted
     * @param e   the new element
     * @return the Position of the new element
     * @throws IllegalArgumentException if p is not a valid Position for this tree.
     * @throws IllegalArgumentException if p already has a right child
     */
    public Position<E> addRight(Position<E> p, E e)
            throws IllegalArgumentException {
        Node<E> parent = validate(p);
        if (parent.getRight() != null)
            throw new IllegalArgumentException("p already has a right child");
        Node<E> child = createNode(e, parent, null, null);
        parent.setRight(child);
        size++;
        return child;
    }

    /**
     * Replaces the element at Position p with element e and returns the replaced element.
     *
     * @param p   the relevant Position
     * @param e   the new element
     * @return the replaced element
     * @throws IllegalArgumentException if p is not a valid Position for this tree.
     */
    public E set(Position<E> p, E e) throws IllegalArgumentException {
        Node<E> node = validate(p);
        E temp = node.getElement();
        node.setElement(e);
        return temp;
    }

    /**
     * Attaches trees t1 and t2, respectively, as the left and right subtree of the
     * leaf Position p. As a side effect, t1 and t2 are set to empty trees.
     *
     * @param p   a leaf of the tree
     * @param t1  an independent tree whose structure becomes the left child of p
     * @param t2  an independent tree whose structure becomes the right child of p
     * @throws IllegalArgumentException if p is not a valid Position for this tree
     * @throws IllegalArgumentException if p is not a leaf
     */
    public void attach(Position<E> p, LinkedBinaryTree<E> t1,
                       LinkedBinaryTree<E> t2) throws IllegalArgumentException {
        Node<E> node = validate(p);
        if (isInternal(p)) throw new IllegalArgumentException("p must be a leaf");
        size += t1.size() + t2.size();
        if (!t1.isEmpty()) {                  // attach t1 as left subtree of node
            t1.root.setParent(node);
            node.setLeft(t1.root);
            t1.root = null;
            t1.size = 0;
        }
        if (!t2.isEmpty()) {                  // attach t2 as right subtree of node
            t2.root.setParent(node);
            node.setRight(t2.root);
            t2.root = null;
            t2.size = 0;
        }
    }

    /**
     * Removes the node at Position p and replaces it with its child, if any.
     *
     * @param p   the relevant Position
     * @return element that was removed
     * @throws IllegalArgumentException if p is not a valid Position for this tree.
     * @throws IllegalArgumentException if p has two children.
     */
    public E remove(Position<E> p) throws IllegalArgumentException {
        Node<E> node = validate(p);
        if (numChildren(p) == 2)
            throw new IllegalArgumentException("p has two children");
        Node<E> child = (node.getLeft() != null ? node.getLeft() : node.getRight() );
        if (child != null)
            child.setParent(node.getParent());  // child's grandparent becomes its parent
        if (node == root)
            root = child;                       // child becomes root
        else {
            Node<E> parent = node.getParent();
            if (node == parent.getLeft())
                parent.setLeft(child);
            else
                parent.setRight(child);
        }
        size--;
        E temp = node.getElement();
        node.setElement(null);                // help garbage collection
        node.setLeft(null);
        node.setRight(null);
        node.setParent(node);                 // our convention for defunct node
        return temp;
    }


    //swap the children of oen parent
    public void swapChildren(Position<E> p) throws IllegalArgumentException{
        Node<E> node = validate(p);// Verifies that a Position belongs to the appropriate class
        if(numChildren(p) == 0) throw new IllegalArgumentException("p has no children"); //throw exception
        else if(numChildren(p) == 2){ // if p have two children
            Node<E> temp = node.getLeft();
            node.setLeft(node.getRight()); //direct swap
            node.setRight(temp);
        } else{
            if(node.getLeft() != null){
                node.setRight(node.getLeft());
                node.setLeft(null);
            }
            if(node.getRight() != null){// if right node have one node
                node.setLeft(node.getRight()); //set left one to right
                node.setRight(null); //set right side is null
            }
        }
    }

    //print Childre of one parent
    public void printChildren(Position<E> p)throws IllegalArgumentException {
        Node<E> node = validate(p);
        if(numChildren(p) == 0) throw new IllegalArgumentException("p has no children");//throw exception
        else{
            if(node.getLeft() != null){
                System.out.println("The left child of c is: " + node.getLeft().toString());
                if(node.getRight() == null) throw new IllegalArgumentException("p right is empty");
            }
            if(node.getRight() != null){
                System.out.println("The right child of c is: " + node.getRight().toString());
                if(node.getLeft() == null) throw new IllegalArgumentException("p left is empty");
            }
        }
    }

    //swap p and q
//    public void swap(Position<E> p, Position<E> q){
//
//        Node<E> swap1 = validate(p);
//        Node<E> swap2 = validate(q);
//
//
//        if(swap1.getParent() != null && swap2.getParent() != null){
//            Node<E> tempParent = swap1.getParent();
//            swap1.setParent(swap2.getParent());
//            swap2.setParent(tempParent);
//        }else{
//            if(swap1.getParent() != null) swap2.setParent(swap1.getParent());
//            if(swap2.getParent() == null) swap1.setParent(swap2.getParent());
//        }
//
//
//        if(swap1.getRight() == null){
//            if(swap2.getRight() != null){
//                swap1.setRight(swap2.getRight());
//                swap2.setRight(null);
//            }
//        }else{
//            if(swap2.getRight() == null){
//                swap2.setRight(swap1.getRight());
//                swap1.setRight(null);
//            }
//        }
//        if(swap1.getLeft() == null){
//            if(swap2.getLeft() != null){
//                swap1.setLeft(swap2.getLeft());
//                swap2.setLeft(null);
//            }
//        }else{
//            if(swap2.getLeft() == null){
//                swap2.setLeft(swap1.getLeft());
//                swap1.setLeft(null);
//            }
//        }
//        if(numChildren(swap1) == 2 && numChildren(swap2) == 2){
//            Node<E> swap1Right = swap1.getRight();
//            Node<E> swap2Left = swap1.getLeft();
//
//            swap1.setRight(swap2.getRight());
//            swap2.setRight(swap1Right);
//
//
//            swap1.setLeft(swap2.getLeft());
//            swap2.setLeft(swap2Left);
//        }
//
//    }

    //Step 4: Add support in LinkedBinaryTree for a method, swap(p, q), that has the
    //effect of restructuring the tree so that the node referenced by p takes the place of the node
    //referenced by q, and vice versa. Ensure to properly handle the case of P and q when one of
    //the nodes is the parent of the other. Use the function in step 3 to print the children of p and
    //q to test your implemented method.

    public void swap(Position<E> p, Position<E> q) {
        Node<E> swap1 = validate(p);
        Node<E> swap2 = validate(q);

        Node<E> temp1 = new Node<>(swap2.getElement(), swap2.parent, swap2.getLeft(), swap2.getRight());
        Node<E> temp2 = new Node<>(swap1.getElement(), swap1.parent, swap1.getLeft(), swap1.getRight());


        set(p, temp1.element);
        set(q, temp2.element);
    }



    public int countExt( Position<E> p){
        Node<E> checkNode = validate(p);
        if(isRoot(checkNode) && numChildren(root) != 0){
            return checkExt(left(p)) + checkExt(right(p));
        }else {
            return 0;
        }
    }
    public int checkExt (Position<E> p) {
        Node<E> checkNode = validate(p);
        if(numChildren(checkNode) == 0){
            return 1;
        }else {
           return  checkExt(left(p)) + checkExt(right(p));
        }
    }



    public int sumHeight(Position<E> p){
        int h = 0;
        if(isRoot(p) && numChildren(p)==0){
            return 0;
        }else{
            if(left(p) != null){
                h += caculate(left(p));
            }
            if(right(p) != null){
                h += caculate(right(p));
            }
        }
        return h;
    }
    public int caculate(Position<E> p){
        if(numChildren(p) == 0){
            return 1;
        }
        if(numChildren(p) == 2){
            return 1 + caculate(left(p)) + caculate(right(p));
        }
        if(numChildren(p) == 1){
            if(left(p) != null){
                return 1 + caculate(left(p));
            }
            if(right(p) != null){
                return 1 + caculate(right(p));
            }
        }
        return 0;
    }




//int sumheight = 0;
//    public void sumHeight( Position<E> p){
//
//        Node<E> checkNode = validate(p);
//        for (Position<E> c : children(p)){
//            if(isExternal(c)){
//                sumheight += height(p);
//            }
//            if(left(p) != null)
//            p = left(p);
//            if(right(p) != null)
//                p = right(p);
//        }
//
//    }
//    public int height(Position<E> p)  {
//        int h = 0;                          // base case if p is external
//        for (Position<E> c : children(p))
//            h = Math.max(h, 1 + height(c));
//        return h;
//    }

    // Sorry I make two question together so I upload twice
    public boolean properTree( Position<E> p){
        if(numChildren(p) == 2){
            return properTree(left(p)) && properTree(right(p));
        }
        else if(numChildren(p) == 1){
            return false;
        }
        else{
            return true;
        }
    }



} //----------- end of LinkedBinaryTree class -----------



