package ObserverPattern;

public interface Subject {
    //Subject giong nhu mot cai kenh
    public void register(Observer obj);
    public void unregister(Observer obj);
    public void notifyObservers();
    public Object getUpdate(Observer obj);
}
