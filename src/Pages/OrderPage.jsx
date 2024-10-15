// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { AdminLayout } from '../Layout';
import { OrderTable } from '../components';
// import { getOrders } from '../slices/order.slice';
// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';


const OrderPage = () => {


// const {orders} = useSelector((state) => state.order);
// const dispatch = useDispatch();

// useEffect(()=>{
//   dispatch(getOrders());
// },[dispatch])

// const newOrders = orders.map(order => ({
//   orderId: order.orderId,
//   createdAt: order.createdAt,
//   status: order.status,
//   customerPhoneNumber: order.customerPhoneNumber,
//   quantity: order.orderItems[0].quantity,
//   pizzaName: order.orderItems[0].pizzaName,
//   toppings: order.orderItems[0].toppings,
// }));

  return (
    <AdminLayout>
          <OrderTable />
    </AdminLayout>
  );
};

export default OrderPage;
