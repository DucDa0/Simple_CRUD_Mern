import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllProducts } from '../../redux/actions/productAction';
import { Loader } from '../../components';

import { Row, Col, Card, Button } from 'antd';
import { CloseOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';

import './styles.css';

const Home = ({ products, getAllProducts }) => {
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      await getAllProducts();
      setIsLoading(false);
    }
    getData();
  }, [getAllProducts]);
  return (
    <section className='home'>
      <div className='home__wrap container'>
        <h1 className='home__title'>Mern App - Product Management</h1>
        <div className='home__add'>
          <Button icon={<PlusOutlined />} type='primary'>
            Add product
          </Button>
        </div>
        <div className='home__content'>
          <Row gutter={[16, 16]}>
            {isLoading || !products ? (
              <Loader className={'loader'} />
            ) : (
              products.map((p) => (
                <Col key={p._id} xs={24} sm={12} md={8} lg={6}>
                  <Card
                    actions={[
                      <Button
                        type='text'
                        icon={
                          <CloseOutlined
                            style={{ fontSize: '1.2rem', color: '#dc3545' }}
                          />
                        }
                        onClick={() => {}}
                      />,
                      <Button
                        type='text'
                        icon={
                          <EditOutlined
                            style={{ fontSize: '1.2rem', color: '#106eea' }}
                          />
                        }
                        onClick={() => {}}
                      />,
                    ]}
                    title={p.name}
                    hoverable
                    cover={
                      <img
                        width='100%'
                        height='100%'
                        alt='example'
                        src={p.image}
                      />
                    }
                  >
                    <p className='home__desc'>{p.description}</p>
                    <p className='home__price'>{p.price}</p>
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
  products: state.products.products,
});
export default connect(mapStateToProps, { getAllProducts })(Home);
