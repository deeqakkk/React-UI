import { Button, Card } from 'antd';
import './product.css'
const { Meta } = Card;
const Product = ({ id, title, description, onDelete }) => {
  const handleDelete = () => {
    onDelete(id);
  };
  return <>
    <Card
      hoverable
      style={{
        width: 240,
        height: 'fit-content',
      }}
    >
      <Meta title={title} description={description.slice(0, 50) + '...'} />
      <Button type="primary" danger onClick={handleDelete} >
        Delete
      </Button>
    </Card>
  </>;
};
export default Product;