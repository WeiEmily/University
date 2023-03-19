package CS211Lab2;

public class Main {
    public static void main(String[] args) {
        //(T1,20), (T2,5), (T3,25), (T4,30), (T5,10), (T6,15)
        Task T1 = new Task("T1", 20);
        Task T2 = new Task("T2", 5);
        Task T3 = new Task("T3", 25);
        Task T4 = new Task("T4", 30);
        Task T5 = new Task("T5", 10);
        Task T6 = new Task("T6", 15);

        //create SinglyLinkedList object to restore the Tasks
        SinglyLinkedList<Task> link = new SinglyLinkedList<>();

        link.addLast(T1);
        link.addLast(T2);
        link.addLast(T3);
        link.addLast(T4);
        link.addLast(T5);
        link.addLast(T6);
//        first method print
      // System.out.println(link);

      Print(link);
       // link.print();




        try {
            Task answer = link.seToLast();
            System.out.println(answer);
        } catch (Exception e) {
            //throw new RuntimeException(e);
            System.out.println("not exist");
        }
        finally {
            System.out.println("I am in final block");
        }


    }

    public  static void Print(SinglyLinkedList<Task> s){

        while (!s.isEmpty()){
            System.out.println(s.first());
            s.removeFirst();


        }
    }


}
