package CS211Labexam;

import CS211Lab5.LinkedBinaryTree;
import CS211Lab5.Position;

public class Main {
    public static void main(String[] args) {
        CS211Lab5.LinkedBinaryTree<Entrie> bsTree = new LinkedBinaryTree<>();
        Entrie Olivia = new Entrie(1, "Olivia");
        Entrie John = new Entrie(2, "John");
        Entrie Stephen = new Entrie(3, "Stephen");
        Entrie Emma = new Entrie(4, "Emma");
        Entrie Tom = new Entrie(5, "Tom");
        Entrie Charlotte = new Entrie(6, "Charlotte");
        Entrie Joe = new Entrie(8, "Joe");
        Entrie Sophia = new Entrie(9, "Sophia");

        //root
        bsTree.addRoot(Tom);
        //root's left
        Position<Entrie> l1left = bsTree.addLeft(bsTree.root, Olivia);

        //l1left's left
        Position<Entrie> l2leftLeft = bsTree.addLeft(l1left, Joe);
        //l1left's right
        Position<Entrie> l2leftRight = bsTree.addRight(l1left, Emma);
        //l2left's left
        Position<Entrie> l3leftLeft = bsTree.addLeft(l2leftLeft, John);


        //root's right
        Position<Entrie> l1right = bsTree.addRight(bsTree.root, Charlotte);
        //l1right's right
        Position<Entrie> l2rightRight = bsTree.addRight(l1right, Sophia);
        //l1right's left
        Position<Entrie> l2rightLeft = bsTree.addLeft(l1right, Stephen);

        //print the inorder tree
        System.out.println(bsTree.inorder());
    }
}
