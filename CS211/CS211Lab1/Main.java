
package CS211Lab1;

public class Main {
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		PoI p1 = new PoI("Ireland", "dublin");
		PoI p2 = new PoI("Ireland", "dublin");
		PoI p3 = new PoI("Ireland", "dublin");

		QueuePoI<Integer> list = new QueuePoI<>();
		QueuePoI<Integer> secondList = new QueuePoI<>();

		list.enqueue(2);
		list.enqueue(4);
		list.enqueue(6);
		list.dequeue();

		secondList.enqueue(15);
		secondList.enqueue(14);

		list.dequeue();

		list.concatenate(secondList);

		System.out.println(list.size());

		while(!list.isEmpty()){
			System.out.print(list.dequeue());
			System.out.print("->");
		}
		System.out.println();
		System.out.println("--------------------------------------");
		StackPoI<Integer> stack = new StackPoI<>();
		StackPoI<Integer> secondStack = new StackPoI<>();

		stack.push(11);
		stack.push(12);
		stack.push(13);

		secondStack.push(14);
		secondStack.push(15);

		stack.concatenate(secondStack);

		while(!stack.isEmpty()){
			System.out.print(stack.pop());
			System.out.print("->");
		}
	}
	
	
		
	

}
