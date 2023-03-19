package CS211Lab3;

public class MySinglyLinkedList<E> extends SinglyLinkedList<E> {

    private static class Node<E> {

        /** The element stored at this node */
        private E element;          // reference to the element stored at this node

        /** A reference to the subsequent node in the list */
        private MySinglyLinkedList.Node<E> next;         // reference to the subsequent node in the list

        /**
         * Creates a node with the given element and next node.
         *
         * @param e  the element to be stored
         * @param n  reference to a node that should follow the new node
         */
        public Node(E e, MySinglyLinkedList.Node<E> n) {
            element = e;
            next = n;
        }

            // Accessor methods
        /**
         * Returns the element stored at the node.
         * @return the element stored at the node
         */
        public E getElement() { return element; }

        /**
         * Returns the node that follows this one (or null if no such node).
         * @return the following node
         */
        public MySinglyLinkedList.Node<E> getNext() { return next; }

        // Modifier methods
        /**
         * Sets the node's next reference to point to Node n.
         * @param n    the node that should follow this oneone
         */
        public void setNext(MySinglyLinkedList.Node<E> n) { next = n; }
    } //----------- end of nested Node class -----------

    private Node<Task> head = null;
    private Node<Task> tail = null;

    private int size = 0;

    public MySinglyLinkedList() {
        super();
    }

    public int size() { return size; }

    public void insertSorted(Task insert){
        MySinglyLinkedList.Node<Task> temp = new MySinglyLinkedList.Node<>(insert, null);
        if (size == 0 ){
            head = temp;
            tail = head;                           // special case: new node becomes tail also
        } else{
            MySinglyLinkedList.Node<Task> walk = head;
            MySinglyLinkedList.Node<Task> run = head.next;
            if(walk.getElement().getLength() > insert.getLength()){
                temp.next = walk;
                head = temp;
            }else{
                while( run != null && walk.getElement().getLength() < insert.getLength()
                        && insert.getLength() > run.getElement().getLength()){
                    walk = walk.next;//
                    run = run.next;
                }
                if(run == null){
                    walk.setNext(temp);
                    tail = temp;
                }else{
                    temp.setNext(run);
                    walk.setNext(temp);
                }
            }

        }
        size++;
    }

    public String toString() {
        StringBuilder sb = new StringBuilder("(");
        MySinglyLinkedList.Node<Task> walk = head;
        while (walk != null) {
            sb.append(walk.getElement());
            if (walk != tail)
                sb.append(", ");
            walk = walk.getNext();
        }
        sb.append(")");
        return sb.toString();
    }

    public String printTime() {
        int time = 0;
        StringBuilder sb = new StringBuilder("(");
        MySinglyLinkedList.Node<Task> walk = head;
        String eachTask;
        int eachTime = 0;

        while (walk != null) {
            sb.append(walk.getElement().getName());
            sb.append(": finished in ");
            eachTime = walk.getElement().getLength();
            time += eachTime;
            sb.append(time);
            if (walk != tail)
                sb.append(", ");
            walk = walk.getNext();
        }
        sb.append(")");
        return sb.toString();
    }
}

