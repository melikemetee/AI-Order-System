import { useEffect, useState } from "react";

function Admin() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    const result = await fetch(
      "http://127.0.0.1:8000/api/orders"
    );

    const data = await result.json();

    setOrders(data);
  };

  const updateStatus = async (id, status) => {
    const result = await fetch(
      "http://127.0.0.1:8000/api/orders/" + id,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          status: status
        })
      }
    );

    const data = await result.json();

    console.log(data);

    getOrders();
  };

  return (
    <div>
      <h1>Admin Paneli</h1>

      <h2>Siparişler</h2>

      {orders.map((order) => (
        <div key={order.id}>

          <p>Sipariş No: {order.id}</p>

          <p>Müşteri: {order.customer_name}</p>

          <p>Ürün: {order.product_name}</p>

          <p>Adet: {order.quantity}</p>

          <p>Telefon: {order.phone_number}</p>

          <p>Adres: {order.addresss}</p>

          <p>Toplam Fiyat: {order.total_price} TL</p>

          <p>Durum:</p>

          <select
            value={order.status}
            onChange={(e) =>
              updateStatus(order.id, e.target.value)
            }
          >
            <option value="pending">pending</option>
            <option value="confirmed">confirmed</option>
            <option value="shipped">shipped</option>
            <option value="completed">completed</option>
          </select>

          <hr />

        </div>
      ))}
    </div>
  );
}

export default Admin;