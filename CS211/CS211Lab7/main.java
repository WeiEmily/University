package CS211Lab7;

public class main {
    public static void main(String[] args) {
        HeapPriorityQueue<Integer, Integer> step2_1 = new HeapPriorityQueue<>();
        step2_1.insert(10, 10);
        step2_1.insert(6, 6);
        step2_1.insert(2, 2);
        step2_1.insert(8, 8);
        step2_1.insert(5, 5);
        step2_1.insert(12, 12);
        step2_1.insert(20, 20);
        step2_1.insert(18, 18);
        step2_1.insert(19, 19);

        System.out.println(step2_1.Contains(2, 2));


        System.out.println(step2_1.getMax());

//        System.out.println(step2_1.getMax().getKey());
    }
}
