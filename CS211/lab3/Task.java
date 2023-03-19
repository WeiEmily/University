package CS211Lab3;

public class Task {
    private String name;
    private int length;

    public Task() {
    }

    public Task(String name, int length) {
        this.name = name;
        this.length = length;
    }
    //name getter
    public String getName() {
        return name;
    }
    //length getter
    public int getLength() {
        return length;
    }
    //name setter
    public void setName(String name) {
        this.name = name;
    }
    //length setter
    public void setLength(int length) {
        this.length = length;
    }
    //a Print(CS211Lab3.SinglyLinkedList S)
    public String toString() {

        StringBuilder print = new StringBuilder();
        print.append(name);
        print.append(",");
        print.append(length +" ");

        return print.toString();
    }



}