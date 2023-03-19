package CS211Lab1;

public class StackPoI<E> implements Stack<E>{

    private static class Node<E> {
        private E element;
        private StackPoI.Node<E> next;

        public Node(E e, StackPoI.Node<E> n) {
            element = e;
            next = n;
        }

        public E getElement() {
            return element;
        }

        public StackPoI.Node<E> getNext() {
            return next;
        }

        public void setNext(StackPoI.Node<E> n) {
            next = n;
        }
    }


    private StackPoI.Node<E> head = null;
    private StackPoI.Node<E> tail = null;
    private int size = 0;

    /* Returns the number of elements in the stack. */
    @Override
    public int size() {
        return size;
    }
    /*Tests whether the stack is empty. @return true if the stack is empty, false otherwise*/
    @Override
    public boolean isEmpty() {
        return size == 0;
    }
    /* Inserts an element at the top of the stack. @param e the element to be inserted */
    @Override
    public void push(E e) {
        Node<E> newest = new Node<E>(e,null);
        if(isEmpty()){
            head = newest;
        }else{
            Node<E> temp = head;
            head = newest;
            newest.next = temp;
        }
        size++;
    }

    @Override
    public E top() {
        if (isEmpty()) {
            return null;
        }
        return head.getElement();

    }

    /* Removes and returns the top element from the stack. @return element removed (or null if empty)
     */
    @Override
    public E pop() {
        Node<E> curr = head;
        if (isEmpty()) {
            return null;
        }else{
            head = head.next;
        }
        size--;
        return curr.getElement();
    }


    /*
    * Task 2: Add a method to your implemented Stack that takes another Stack
    object as input and concatenatesit to the end of the current Stack. Then, it prints
    the contents by traversing the Stack. Test your implementation by creating a
    new stack with two nodes and concatenating the previous one with the new
    one*/

    public StackPoI<E> concatenate(StackPoI<E> q) {
        while(!q.isEmpty()){
            this.push(q.pop());
        }
        return this;
    }

}
