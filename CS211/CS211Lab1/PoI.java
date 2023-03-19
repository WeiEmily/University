package CS211Lab1;
//this is Task1.A '
/*
* Create a class called PoI (point of interest) that stores the names of
countries and cities you would like to visit. The constructor method takes two
strings, country, and city. The get_country() and get_city() methods
return the country and city attributes, respectively
* */
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
