// import { useEffect, useState } from 'react';
import { AdminLayout } from '../Layout';
import { OrderTable } from '../components';
// import { useDispatch, useSelector } from 'react-redux';


const OrderPage = () => {


// const {orders} = useSelector((state) => state.user);
// const dispatch = useDispatch();

// useEffect(()=>{
//   dispatch(getOrders());
// },[])




  return (
     <AdminLayout>
          <OrderTable />
       </AdminLayout>
  );
};

export default OrderPage;
