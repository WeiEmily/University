package CS211Lab3;

public class MyDoublyLinkedList<E> extends DoublyLinkedList<E> {

    private static class Node<E> {

        /** The element stored at this node */
        private E element;               // reference to the element stored at this node

        /** A reference to the preceding node in the list */
        private MyDoublyLinkedList.Node<E> prev;            // reference to the previous node in the list

        /** A reference to the subsequent node in the list */
        private MyDoublyLinkedList.Node<E> next;            // reference to the subsequent node in the list

        /**
         * Creates a node with the given element and next node.
         *
         * @param e  the element to be stored
         * @param p  reference to a node that should precede the new node
         * @param n  reference to a node that should follow the new node
         */
        public Node(E e, MyDoublyLinkedList.Node<E> p, MyDoublyLinkedList.Node<E> n) {
            element = e;
            prev = p;
            next = n;
        }

        // public accessor methods
        /**
         * Returns the element stored at the node.
         * @return the element stored at the node
         */
        public E getElement() { return element; }

        /**
         * Returns the node that precedes this one (or null if no such node).
         * @return the preceding node
         */
        public MyDoublyLinkedList.Node<E> getPrev() { return prev; }

        /**
         * Returns the node that follows this one (or null if no such node).
         * @return the following node
         */
        public MyDoublyLinkedList.Node<E> getNext() { return next; }

        // Update methods
        /**
         * Sets the node's previous reference to point to Node n.
         * @param p    the node that should precede this one
         */
        public void setPrev(MyDoublyLinkedList.Node<E> p) { prev = p; }

        /**
         * Sets the node's next reference to point to Node n.
         * @param n    the node that should follow this one
         */
        public void setNext(MyDoublyLinkedList.Node<E> n) { next = n; }
    } //----------- end of nested Node class -----------


    private MyDoublyLinkedList.Node<Task> head = null;
    private MyDoublyLinkedList.Node<Task> tail = null;

    private int size = 0;

    public MyDoublyLinkedList() {
        super();
    }

    public int size() { return size; }

    public void insertSorted(Task insert){

        MyDoublyLinkedList.Node<Task> temp = new MyDoublyLinkedList.Node<>(insert,null ,null);
        if (size == 0 ){
            head = temp;
            tail = head;                           // special case: new node becomes tail also
        } else{
            MyDoublyLinkedList.Node<Task> walk = head;
            if(walk.getElement().getLength() > insert.getLength()){
                temp.next = walk;
                head = temp;
            }else{
                while( walk.next != null && walk.getElement().getLength() < insert.getLength() &&
                        walk.next.getElement().getLength() < insert.getLength()){
                    walk = walk.next;//
                }
                if(walk.next == null){
                    walk.next = temp;
                    tail = temp;
                }else{
                    temp.setNext(walk.next);
                    walk.setNext(temp);
                }
            }
        }
        size++;
    }

    public String toString() {
        StringBuilder sb = new StringBuilder("(");
        MyDoublyLinkedList.Node<Task> walk = head;
        while (walk != null) {
            sb.append(walk.getElement());
            if (walk != tail)
                sb.append(", ");
            walk = walk.getNext();
        }
        sb.append(")");
        return sb.toString();
    }

}
