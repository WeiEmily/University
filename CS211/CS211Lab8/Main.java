package CS211Lab8;

public class Main {
    public static void main(String[] args) {
        //create new hashtable input1
        ProbeHashMap input1 = new ProbeHashMap(5);
       //create new objetc array
        MapEntry<Integer, Integer>[] table1 = new MapEntry[5];

        table1[0] = new MapEntry<>(1, 2);
        table1[1] = new MapEntry<>(2, 4);
        table1[2] = new MapEntry<>(3, 6);
        table1[3] = new MapEntry<>(4, 8);
        table1[4] = new MapEntry<>(5, 10);

        for (int i = 0; i < table1.length; i++) {
            input1.put(table1[i].getKey(), table1[i].getValue());
        }

        //for test is it insert successful and find it out
        //System.out.println("test for 2 is 6: "+ input1.get(table1[0].getKey()));

        //create new hashtable input2
        ProbeHashMap input2 = new ProbeHashMap(10);

        //create new objetc array
        MapEntry<Integer, Integer>[] table2 = new MapEntry[10];
        table2[0] = new MapEntry<>(0, 0);
        table2[1] = new MapEntry<>(1, 2);
        table2[2] = new MapEntry<>(2, 4);
        table2[3] = new MapEntry<>(3, 6);
        table2[4] = new MapEntry<>(4, 8);
        table2[5] = new MapEntry<>(5, 10);
        table2[6] = new MapEntry<>(6, 12);
        table2[7] = new MapEntry<>(7, 14);
        table2[8] = new MapEntry<>(8, 16);
        table2[9] = new MapEntry<>(9, 18);

        for (int i = 0; i < table2.length; i++) {
            input2.put(table2[i].getKey(), table2[i].getValue());
        }
        //System.out.println("test for 8 is 16: "+ input2.get(table2[8].getKey()));

        //create new hashtable input3
        ProbeHashMap input3 = new ProbeHashMap(3);
        MapEntry<Integer, Integer>[] table3 = new MapEntry[5];
        table3[0] = new MapEntry<>(10, 20);
        table3[1] = new MapEntry<>(30, 40);
        table3[2] = new MapEntry<>(50, 60);
        table3[3] = new MapEntry<>(70, 80);
        table3[4] = new MapEntry<>(90, 100);

        for (int i = 0; i < table3.length; i++) {
            input3.put(table3[i].getKey(), table3[i].getValue());
        }
        //System.out.println("test for 3 is 80: "+ input3.get(table3[3].getKey()));


        //Step 3 for test :
        System.out.println(input2.getLoadFactor());


        //step 4
        System.out.println("collisions: "+ input3.getCollisions());

        //step5
        //in the bucketRemove function s
        System.out.println(input3.n);
        input3.remove(table3[0]);
        input3.remove(table3[1]);
        input3.remove(table3[2]);
        input3.remove(table3[3]);


        System.out.println(input3.n);
        //System.out.println("test for 3 is 80: "+ input3.get(table3[3].getKey()));
    }
}
