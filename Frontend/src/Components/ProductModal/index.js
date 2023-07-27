import React from 'react';
import { Button, Modal } from 'antd';

const ProductModal = ({ product, visible, onCancel, onAddToCart }) => {
  return (
    <Modal
      open={visible}
      title={product.title}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="addToCart" type="primary" onClick={() => onAddToCart(product.id)}>
          Add to Cart
        </Button>,
      ]}
    >
      <div>
        <img src={'https://media.istockphoto.com/id/619052288/photo/laptop-and-computer-parts.jpg?s=612x612&w=0&k=20&c=ejIT6Owx79tk4E3z4FxS16kWQHPHL3VDE7TQRMauMLU='} alt={product.title.toUpperCase().charAt(0)} style={{ width: '100%', maxHeight: 400, objectFit: 'contain' }} />
        <p>Price: ₹{product.price}</p>
        <p>Description: {product.description}</p>
      </div>
    </Modal>
  );
};

export default ProductModal;
