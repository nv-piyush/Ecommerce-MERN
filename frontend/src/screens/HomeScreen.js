import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Row, Col} from 'react-bootstrap'
import Product from '../components/Product'
import {listProducts} from '../actions/productActions'
import Message from '../components/Message'
import Loading from '../components/Loading'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'
import Meta from '../components/Meta'
import {Link} from 'react-router-dom'
 
const HomeScreen = ({match}) => {
    const keyword = match.params.keyword

    const pageNumber = match.params.pageNumber || 1

    const dispatch = useDispatch()  //Alternative to high order method like connect(mapDispatchToProps,matchStateToProps)

    const productList = useSelector(state => state.productList)
    const {loading, error, products, page, pages} = productList

    useEffect(() => {
       dispatch(listProducts(keyword, pageNumber))
    }, [dispatch, keyword, pageNumber])

    return (
        <>
            <Meta/>
            {!keyword 
                ? <ProductCarousel/> 
                : <Link to='/' className='btn btn-light'>
                    Go Back
                  </Link>
            }
            <h1>Latest Products</h1>
            {loading 
                ? <Loading />
                : error 
                    ? <Message variant = 'danger'>{error}</Message>
                :
                <>
                    <Row>
                        {products.map(product => (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product}/>
                            </Col>
                        ))}
                    </Row>
                    <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''}/>
                </>
            }
        </>
    )
}

export default HomeScreen
