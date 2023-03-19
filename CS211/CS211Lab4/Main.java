package CS211Lab4;

import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        LinkedBinaryTree<String> tree = new LinkedBinaryTree<>();
        LinkedBinaryTree<String> change = new LinkedBinaryTree<>();

        tree.addRoot("0");

//        tree.addLeft(tree.root, "1");
//
//        tree.addRight(tree.root, "2");



        Position<String> l1left = tree.addLeft(tree.root, "1");
        Position<String> l1right = tree.addRight(tree.root, "2");

        Position<String> l2left1 = tree.addLeft(l1left, "3");
        Position<String> l2left2 = tree.addRight(l1left, "4");

        Position<String> l2right1 = tree.addLeft(l1right, "5");
        Position<String> l2right2 = tree.addRight(l1right, "6");






        System.out.println("================");

//        tree.swapChildren(tree.root);
//
//        tree.printChildren(tree.root);
//
//
//
//        System.out.println("==================");
//       tree.swap(tree.root, tree.root.getLeft());
//
//        tree.printChildren(tree.root);



        //get the parent
        System.out.println(tree.parent(l2left1).getElement());
        System.out.println(l2left1.getElement());

        tree.swap(l2left1,  l2right1);

        System.out.println(tree.parent(l2left1).getElement());
        System.out.println(l2left1.getElement());



    }
}
