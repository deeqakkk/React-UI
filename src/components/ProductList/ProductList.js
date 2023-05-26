import { Button, message, Pagination } from 'antd';
import Search from 'antd/es/input/Search';
import { useEffect, useState } from 'react';
import { API_URL } from '../../config/constant';
import ProductFormModal from '../AddProduct/AddProduct';
import Product from '../product/Product';
import './productList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filteredProductData, setProductFilteredData] = useState([]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const fetchProducts = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    if (data && data.products) {
      setProducts(data.products);
      setProductFilteredData(data.products);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const selectPageHandler = (selectedPage) => {
    if (selectedPage >= 1 && selectedPage <= filteredProductData.length / 10 && selectedPage !== page) {
      setPage(selectedPage);
    }
  };

  const filterData = () => {
    const filteredData = products.filter((product) => {
      return product.title.toLowerCase().includes(searchText.toLowerCase());
    });
    setProductFilteredData(filteredData);
  };

  const deleteProduct = (productId) => {
    const updatedProducts = products.filter((product) => product.id !== productId);
    setProducts(updatedProducts);
    filterData();
    message.warning('Item deleted successfully');
  };

  useEffect(() => {
    filterData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText, filteredProductData]);

  const onSearch = (value) => {
    setSearchText(value);
  };

  const onFinish = (values) => {
    const { ProductTitle, ProductDescription } = values;
    const newProduct = {
      id: Math.floor(Math.random() * 900) + 100,
      title: ProductTitle,
      description: ProductDescription,
    };
    setProducts((prevProducts) => [newProduct, ...prevProducts]);
    setProductFilteredData((prevFilteredData) => [newProduct, ...prevFilteredData]);
    handleOk();
    message.success('Item added successfully');
  };
  return (
    <div className='main-container'>
      <div className='navbar-container'>
        <div className='searchBar-container'>
          <Search
            placeholder='input search text'
            allowClear
            enterButton='Search'
            onSearch={onSearch}
          />
        </div>
        <div className='addItem-container'>
          <Button type='primary' onClick={showModal}>
            Add Item +
          </Button>
          <ProductFormModal
            isOpen={isModalOpen}
            handleOk={handleOk}
            handleCancel={handleCancel}
            onFinish={onFinish}
          />
        </div>
      </div>
      {filteredProductData.length > 0 ? (
        <div className='products'>
          {filteredProductData.slice(page * 10 - 10, page * 10).map((prod) => {
            return (
              <Product
                key={prod?.id}
                title={prod?.title}
                id={prod?.id}
                description={prod?.description}
                onDelete={deleteProduct}
              />
            );
          })}
        </div>
      ) : (
        <div className='no-data'>No Data Found</div>
      )}

      <div className='pagination-container'>
        {products.length > 0 && (
          <Pagination
            defaultCurrent={page}
            total={products.length}
            pageSize={10}
            onChange={(pageNumber) => selectPageHandler(pageNumber)}
          />
        )}
      </div>
    </div>
  );
};

export default ProductList;
