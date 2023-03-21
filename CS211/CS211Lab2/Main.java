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

        try {
            Task answer = link.seToLast();
            System.out.println("the second is "+answer);
        } catch (Exception e) {
            //throw new RuntimeException(e);
            System.out.println("not exist");
        }
        finally {
            System.out.println("I am in final block");
        }

//        first method print
      // System.out.println(link);

      link.print();
       // link.print();

//-----------------------------------------------------------------------------
        //LAB2 Friday
        Order O1 = new Order("C1", "Banana cake", 60);
        Order O2 = new Order("C2", "Cheesecake", 20);
        Order O3 = new Order("C3", "Chocolate coconut cake", 40);
        Order O4 = new Order("C4", "Carrot and walnut cake", 80);

        //create SinglyLinkedList object to restore the Tasks
        SinglyLinkedList<Order> linkCake = new SinglyLinkedList<>();
        linkCake.addLast(O1);
        linkCake.addLast(O2);
        linkCake.addLast(O3);
        linkCake.addLast(O4);

        System.out.println(linkCake.toString());
        linkCake.rotate();


        System.out.println(linkCake.toString());

    }

//    public  static void Print(SinglyLinkedList<Task> s){
//
//        while (!s.isEmpty()){
//            System.out.print(s.first());
//            s.removeFirst();
//            System.out.print("->");
//        }
//        System.out.println();
//    }


}
