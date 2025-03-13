package state;

public class Order {
    //quan ly trang thai don hang
    private OrderState state;

    public void setState(OrderState state) {
        this.state = state;
    }

    public void xuLyDonHang() {
        if (state != null) {
            state.xuLyYeuCau();
        } else {
            System.out.println("Chưa có trạng thái cho đơn hàng");
        }
    }}
