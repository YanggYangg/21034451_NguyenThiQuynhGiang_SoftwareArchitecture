package state;

public class Test {
    public static void main(String[] args) {
        Order order = new Order();
        order.setState(new NewOrderState());//Moi tao
        order.xuLyDonHang();
        order.setState(new ProcessingOrderState());//Dang xu ly
        order.xuLyDonHang();
        order.setState(new DeliveredOrderState());//Da giao hang
        order.xuLyDonHang();
        order.setState(new CanceledOrderState());//Huy don hang
        order.xuLyDonHang();
    }
}
