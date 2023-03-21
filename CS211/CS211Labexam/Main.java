package CS211Labexam;


public class Main {
    public static void main(String[] args) {
        CS211Labexam.LinkedBinaryTree<Entrie> bsTree = new LinkedBinaryTree<>();
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
        System.out.println(" in-order traverse the Q1 tree: ");
        System.out.println(bsTree.inorder());
        //show the Q1 tree is it proper
        System.out.println("q1 tree is it proper tree : " + bsTree.properTree(bsTree.root));
        //create Q2 tree
        CS211Labexam.LinkedBinaryTree<Integer> q2 = new LinkedBinaryTree<>();

        q2.addRoot(1);
        //add l1 right
        q2.addRight(q2.root, 3);
        //add l1 left
        Position<Integer> q2l1Left = q2.addLeft(q2.root, 2);
        //add 5
        q2.addLeft(q2l1Left, 5);
        //add 6
        q2.addRight(q2l1Left, 6);

        //check is it proper
        System.out.println("q2 tree is it proper tree : "+ q2.properTree(q2.root));
    }

    }
