package singleton;

public class TestSingleTon {
    public static void main(String[] args) {
        //System.out.println("=== Test Singleton ===");
        Thread thread1 = new Thread(new Thread1());
        Thread thread2 = new Thread(new Thread2());
        Thread thread3 = new Thread(new Thread3());
        Thread thread4 = new Thread(new Thread4());
        Thread thread5 = new Thread(new Thread5());

        thread1.start();
        thread2.start();
        thread3.start();
        thread4.start();
        thread5.start();
    }

    static class Thread1 implements Runnable{

        @Override
        public void run() {
            ThreadSafeSingleton singleton = ThreadSafeSingleton.getInstance("111");
            System.out.println(singleton.hashCode() + "-----" + singleton.value);
        }
    }
    static class Thread2 implements Runnable{

        @Override
        public void run() {
            ThreadSafeSingleton singleton = ThreadSafeSingleton.getInstance("222");
            System.out.println(singleton.hashCode() + "-----" + singleton.value);
        }
    }

    static class Thread3 implements Runnable{
        @Override
        public void run() {
            ThreadSafeSingleton singleton = ThreadSafeSingleton.getInstance("333");
            System.out.println(singleton.hashCode() + "-----" + singleton.value);
        }
    }

    static class Thread4 implements Runnable{
        @Override
        public void run() {
            ThreadSafeSingleton singleton = ThreadSafeSingleton.getInstance("444");
            System.out.println(singleton.hashCode() + "-----" + singleton.value);
        }
    }

    static class Thread5 implements Runnable{
        @Override
        public void run() {
            ThreadSafeSingleton singleton = ThreadSafeSingleton.getInstance("555");
            System.out.println(singleton.hashCode() + "-----" + singleton.value);
        }
    }
}
