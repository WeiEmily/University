package CS211Lab3;

public class Main {
    public static void main(String[] args) {
        //(T1,20), (T2,5), (T3,25), (T4,30), (T5,10), (T6,15)
        Task T1 = new Task("T1", 19);
        Task T2 = new Task("T2", 18);
        Task T3 = new Task("T3", 7);
        Task T4 = new Task("T4", 6);
        Task T5 = new Task("T5", 16);
        Task T6 = new Task("T6", 33);

        //create CS211Lab3.SinglyLinkedList object to restore the Tasks
       // CS211Lab3.SinglyLinkedList<CS211Lab3.Task> link = new CS211Lab3.SinglyLinkedList<>();


        //single link insertSort
        MySinglyLinkedList<Task> link = new MySinglyLinkedList<>();
        link.insertSorted(T1);
        link.insertSorted(T2);
        link.insertSorted(T3);
        link.insertSorted(T4);
        link.insertSorted(T5);
        link.insertSorted(T6);


        System.out.println(link);
        System.out.println(link.printTime());

        //double link insertSort

//        CS211Lab3.MyDoublyLinkedList<CS211Lab3.Task> link = new CS211Lab3.MyDoublyLinkedList<>();
//        link.insertSorted(T1);
//        link.insertSorted(T2);
//        link.insertSorted(T3);
//        link.insertSorted(T4);
//        link.insertSorted(T5);
//        link.insertSorted(T6);
//
//
//        System.out.println(link);

//        try {
//            CS211Lab3.Task answer = link.seToLast();
//            System.out.println(answer);
//        } catch (Exception e) {
//            //throw new RuntimeException(e);
//            System.out.println("not exist");
//        }



    }

    public  static void Print(SinglyLinkedList<Task> s){
        while (!s.isEmpty()){
            System.out.println(s.first());
            s.removeFirst();
        }
    }


}
