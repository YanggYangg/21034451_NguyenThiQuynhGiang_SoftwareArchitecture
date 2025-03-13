package singleton;

public class ThreadSafeSingleton {
    //volatile
    private static volatile ThreadSafeSingleton instance;
    public String value;

    private ThreadSafeSingleton(String value){
        try {
            Thread.sleep(1000);
        }catch (InterruptedException e){
            e.printStackTrace();
        }
        this.value = value;
    }

    //Khong co synchronized nay ra thi se xem duoc luong nao chay instance nao
    //Muon chay cung 1 instance thi them synchronized
    public static synchronized ThreadSafeSingleton getInstance(String value){
        if(instance == null){
            instance = new ThreadSafeSingleton(value);
        }
        return instance;
    }
}
