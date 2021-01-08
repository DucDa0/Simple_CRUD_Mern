/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllProducts } from '../../redux/actions/productAction';
import { Loader } from '../../components';

import { Row, Col, Card, Button, Input, message } from 'antd';
import {
  CloseOutlined,
  EditOutlined,
  PlusOutlined,
  LogoutOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import store from '../../store';
import { FormModal, ComfirmModal } from '../../components';
import { LOGOUT } from '../../redux';
import './styles.css';

const Home = ({ products, getAllProducts, auth: { user } }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [visible_remove, setVisibleRemove] = useState(false);
  const [id, setId] = useState(null);
  const [item, setItem] = useState(null);
  const [edit, setEdit] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      await getAllProducts();
      setIsLoading(false);
    }
    getData();
  }, [getAllProducts]);
  const showModalAdd = () => {
    setEdit(false);
    setVisible(true);
  };
  const showModalEdit = () => {
    setEdit(true);
    setVisible(true);
  };
  const onSearch = (value) => {
    if (value) {
      const data = products.filter((p) => {
        return p.name.toLowerCase().includes(value.toLowerCase());
      });
      if (data.length <= 0) {
        return message.info('Không có kết quả!');
      }
      setSearchResults(data);
    }
  };
  return (
    <section className='home'>
      <div className='home__wrap container'>
        <FormModal
          edit={edit}
          item={item}
          visible={visible}
          setVisible={setVisible}
        />
        <ComfirmModal
          visible_remove={visible_remove}
          setVisibleRemove={setVisibleRemove}
          id={id}
        />
        {user && (
          <div className='home__user'>
            <h3 className='home__username'>Hello, {user.name}</h3>
            <Button
              onClick={() => store.dispatch({ type: LOGOUT })}
              danger
              icon={<LogoutOutlined />}
              type='primary'
            />
          </div>
        )}

        <h1 className='home__title'>Mern App - FlashCards Management</h1>
        <div className='home__add'>
          <Button icon={<PlusOutlined />} type='primary' onClick={showModalAdd}>
            Add flashcard
          </Button>
        </div>
        <div className='home__search'>
          <Input.Search
            placeholder='Input search text...'
            allowClear
            onSearch={onSearch}
            style={{ maxWidth: 300, marginRight: '1rem' }}
          />
          {searchResults.length > 0 && (
            <Button
              icon={<CloseCircleOutlined />}
              onClick={() => {
                setSearchResults([]);
              }}
            />
          )}
        </div>
        <div className='home__content'>
          <Row gutter={[16, 16]}>
            {isLoading || !products ? (
              <Loader className={'loader'} />
            ) : (
              (searchResults.length > 0 ? searchResults : products).map((p) => (
                <Col key={p._id} xs={24} sm={12} md={8} lg={6}>
                  <Card
                    actions={[
                      <CloseOutlined
                        onClick={() => {
                          setId(p._id);
                          setVisibleRemove(true);
                        }}
                        style={{ fontSize: '1.2rem', color: '#dc3545' }}
                      />,
                      <EditOutlined
                        onClick={() => {
                          setItem(p);
                          showModalEdit();
                        }}
                        style={{ fontSize: '1.2rem', color: '#106eea' }}
                      />,
                    ]}
                    title={p.name}
                    hoverable
                    cover={
                      <img
                        style={{
                          objectFit: 'contain',
                          height: 200,
                          maxWidth: '100%',
                        }}
                        alt='example'
                        src={p.image[0]}
                      />
                    }
                  >
                    <p className='home__desc'>{p.description}</p>
                  </Card>
                </Col>
              ))
            )}
          </Row>
        </div>
      </div>
    </section>
  );
};

Home.propTypes = {
  getAllProducts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  products: state.product.products,
  auth: state.auth,
});
export default connect(mapStateToProps, { getAllProducts })(Home);
