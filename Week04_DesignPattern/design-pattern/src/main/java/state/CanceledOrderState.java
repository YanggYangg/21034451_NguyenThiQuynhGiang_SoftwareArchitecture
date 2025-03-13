package state;

public class CanceledOrderState implements OrderState{
    @Override
    public void xuLyYeuCau() {
        System.out.println("Hủy: Hủy đơn hàng và hoàn tiền");
    }
}
