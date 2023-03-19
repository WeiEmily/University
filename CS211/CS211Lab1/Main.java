
package CS211Lab1;

public class Main {
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		PoI p1 = new PoI("Ireland", "dublin");
		PoI p2 = new PoI("Ireland", "dublin");
		PoI p3 = new PoI("Ireland", "dublin");
		
		SinglyLinkList<PoI> box = new SinglyLinkList<PoI>();
		
		
		
		
	}
	public static class PoI {
		String country;
		String city;
		//constructor
		public PoI() {
			
		}
		
		public PoI(String country, String city ) {
			this.country = country;
			this.city = city;
		}
		
		public String getCountry() {
			return this.country;
		}
		
		public void setCity(String country,String city ) {
			this.country = country;
			this.city = city;
		}
		
	}
	
	 public interface Queue<E> {
		/** Returns the number of elements in the queue. */
		int size( );
		/** Tests whether the queue is empty. */
		boolean isEmpty( );
		/** Inserts an element at the rear of the queue. */
		void enqueue(E e);
		/** Returns, but does not remove, the first element of the queue (null if empty). */
		E first( );
		/** Removes and returns the first element of the queue (null if empty). */
		E dequeue( );
		}
		
	public class SinglyLinkList<E> implements Queue<E> {
		private static class Node<E> {
			private E  element;
			private Node<E> next;
			public Node(E e, Node<E> n) {
				element = e;
				next = n;
			}
			public E getElement() {
				return element;
			}
			
			public Node<E> getNext(){return next;}
			public void setNext(Node<E> n) {next = n;}
		}
		
		
		private Node<E> head = null;
		private Node<E> tail = null;
		private int size = 0;
		public  SinglyLinkList() {}
		public int size() {return this.size;};
		public boolean isEmpty() {return size ==0;}
		public E first() {
			if(isEmpty()) return null;
			return head.getElement();
		}
		public void enqueue(E e) {
			head = new Node<>(e, head);
			if(size == 0)
				tail = head;
			size++;
		}
		public E dequeue() {
			if(isEmpty()) return null;
			E answer = head.getElement();
			head = head.getNext();
			size--;
			if(size==0)
				tail = null;
			return answer;
		}
		
	}

}
