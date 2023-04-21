package CS211Lab8;

public class MapEntry <K,V> implements Entry<K, V>{
    private K k; // key
    private V v; // value
    // public methods of the Entry interface
    public MapEntry(K key, V value){
        k = key;
        v = value;
    }

    /**
     * Returns the key stored in this entry.
     * @return the entry's key
     */
    @Override
    public K getKey(){return k;}

    /**
     * Returns the value stored in this entry.
     * @return the entry's value
     */
    @Override
    public V getValue(){return v;}
}
