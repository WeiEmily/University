package CS211Lab1;

/*
* Task 1. B  : Implement the Queue ADT (abstract data type) with the given
methods in Moodle using a singly-linked list and Generics. You are not allowed
to use any linked list libraries. Test your implementation by creating three PoI
objects, enqueue them, and try to dequeue four elements from the queue.
Remember to Catch possible Exceptions.
* */
public class QueuePoI<E> implements Queue<E> {
    private static class Node<E> {
        private E element;
        private Node<E> next;

        public Node(E e, Node<E> n) {
            element = e;
            next = n;
        }

        public E getElement() {
            return element;
        }

        public Node<E> getNext() {
            return next;
        }

        public void setNext(Node<E> n) {
            next = n;
        }
    }

    private Node<E> head = null;
    private Node<E> tail = null;
    private int size = 0;

    @Override
    public int size() {
        return size;
    }

    @Override
    public boolean isEmpty() {
        return size == 0;
    }
    /** Inserts an element at the rear of the queue. */
    @Override
    public void enqueue(E e) {
        Node<E> newest = new Node<>(e, null);
        if (isEmpty()) {
            head = newest;
        } else {
            tail.setNext(newest);
        }
        tail = newest;
        size++;
    }
    /** Returns, but does not remove, the first element of the queue (null if empty). */
    @Override
    public E first() {
        if (isEmpty()) {
            return null;
        } else {
            return head.getElement();
        }
    }

    ///** Removes and returns the first element of the queue (null if empty). */
    @Override
    public E dequeue() {
        if (isEmpty()) {
            return null;
        }
        E answer = head.getElement();
        head = head.getNext();
        size--;
        if (size == 0) {
            tail = null;
        }
        return answer;
    }
    /*
    * Task 2: Add a method to your implemented Queue that takes another Queue
    object as input and concatenates it to the end of the current queue. Then, it
    prints the contents by traversing the queue. Test your implementation by
    creating a new queue with two nodes and concatenating the previous one with
    the new one.
    Public Queue<E> concatenate (Queue<E>)
    * */
    public QueuePoI<E> concatenate(QueuePoI<E> q) {
        while (!q.isEmpty()) {
            E e = q.dequeue();
            this.enqueue(e);
        }
        return this;
    }

}
