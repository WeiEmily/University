package CS211Lab1;

public class PoI {
    private String country;
    private String city;

    public String get_country() {
        return country;
    }

    public String get_city() {
        return city;
    }

    public PoI(String country, String city){
        this.country = country;
        this.city = city;
    }
}
