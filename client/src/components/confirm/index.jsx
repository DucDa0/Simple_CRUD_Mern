import { useState } from 'react';
import { Modal, Button } from 'antd';
import { connect } from 'react-redux';
import { RemoveProduct } from '../../redux/actions/productAction';

const ConfirmModal = ({
  visible_remove,
  setVisibleRemove,
  RemoveProduct,
  id,
}) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const handleCancel = () => {
    setVisibleRemove(false);
  };
  const onFinish = async () => {
    console.log(id);
    setConfirmLoading(true);
    const res = await RemoveProduct(id);
    setConfirmLoading(false);
    if (res) {
      setVisibleRemove(false);
    }
  };
  return (
    <Modal
      centered
      maskClosable={!confirmLoading}
      onOk={onFinish}
      closable={false}
      footer={false}
      onCancel={handleCancel}
      confirmLoading={confirmLoading}
      visible={visible_remove}
    >
      <h3 style={{ textAlign: 'center' }}>Bạn có chắc muốn xóa chứ!?</h3>
      <div style={{ textAlign: 'center' }}>
        <Button
          style={{ marginRight: '2rem' }}
          disabled={confirmLoading}
          onClick={handleCancel}
        >
          Hủy
        </Button>
        <Button type='primary' onClick={onFinish} loading={confirmLoading}>
          Đồng ý
        </Button>
      </div>
    </Modal>
  );
};
export default connect(null, { RemoveProduct })(ConfirmModal);
