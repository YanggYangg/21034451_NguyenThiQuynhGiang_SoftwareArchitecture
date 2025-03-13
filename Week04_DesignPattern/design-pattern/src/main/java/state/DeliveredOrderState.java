package state;

public class DeliveredOrderState implements OrderState {
    @Override
    public void xuLyYeuCau() {
        System.out.println("Đã giao: Cập nhật trạng thái đơn hàng là đã giao");
    }
}
