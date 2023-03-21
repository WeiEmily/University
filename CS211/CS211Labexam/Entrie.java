package CS211Labexam;

public class Entrie {
    int key;
    String value;

    public Entrie() {
    }

    public Entrie(int key, String value) {
        this.key = key;
        this.value = value;
    }

    public int getKey() {
        return key;
    }

    public void setKey(int key) {
        this.key = key;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    @Override
    public String toString() {
        StringBuilder ans = new StringBuilder();
        ans.append("(");
        ans.append(key);
        ans.append(", ");
        ans.append(value);
        ans.append(")");
        return ans.toString();
    }
}
