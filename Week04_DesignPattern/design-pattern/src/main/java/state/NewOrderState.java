package state;

public class NewOrderState implements OrderState {
    @Override
    public void xuLyYeuCau() {
        System.out.println("Mới tạo: Kiểm tra thông tin đơn hàng");
    }
}
