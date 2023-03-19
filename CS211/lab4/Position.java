package CS211Lab4;

import java.util.Iterator;

public interface Position<E> {

    /**
     * Returns the element stored at this position.
     *
     * @return the stored element
     * @throws IllegalStateException if position no longer valid
     */
    E getElement( ) throws IllegalStateException;

}
