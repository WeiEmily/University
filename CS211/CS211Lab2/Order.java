package CS211Lab2;

public class Order {
    private String clientName;
    private String cakeName;
    private int prepTime;

    public Order() {
    }

    public Order(String clientName, String cakeName, int prepTime) {
        this.clientName = clientName;
        this.cakeName = cakeName;
        this.prepTime = prepTime;
    }

    public String getClientName() {
        return clientName;
    }

    public void setClientName(String clientName) {
        this.clientName = clientName;
    }

    public String getCakeName() {
        return cakeName;
    }

    public void setCakeName(String cakeName) {
        this.cakeName = cakeName;
    }

    public int getPrepTime() {
        return prepTime;
    }

    public void setPrepTime(int prepTime) {
        this.prepTime = prepTime;
    }

    @Override
    public String toString() {
        StringBuilder print = new StringBuilder();

        print.append(clientName);
        print.append(",");
        print.append(cakeName +" ");
        print.append(",");
        print.append(prepTime +" ");

        return print.toString();
    }
}
