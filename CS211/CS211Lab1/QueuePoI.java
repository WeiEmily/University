package CS211Lab1;

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

    @Override
    public E first() {
        if (isEmpty()) {
            return null;
        } else {
            return head.getElement();
        }
    }

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

    public QueuePoI<E> concatenate(QueuePoI<E> q) {
        while (!q.isEmpty()) {
            E e = q.dequeue();
            this.enqueue(e);
        }
        return this;
    }
}
