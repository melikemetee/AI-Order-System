import { useEffect, useState } from "react";
import "./App.css";
import Admin from "./Admin";

function App() {

  const [message, setMessage] = useState("");
  const [response, setResponse] = useState(null);
  const [products, setProducts] = useState([]);
  const [missingInfo, setMissingInfo] = useState([]);
  const [previousMessage, setPreviousMessage] = useState("");
  const [orderNumber, setOrderNumber] = useState(null);
  const [messages, setMessages] = useState([]);


  useEffect(() => {
    getProducts();
  }, []);


  const getProducts = async () => {

    try {

      const result = await fetch(
        "http://127.0.0.1:8000/api/products"
      );

      const data = await result.json();

      setProducts(data);

    } catch (error) {

      console.log("Ürünler alınamadı:", error);

    }

  };


  const sendMessage = async () => {

    if (!message) {
      return;
    }

    let orderMessage = message;

    if (previousMessage) {
      orderMessage = previousMessage + " " + message;
    }


    try {

      const result = await fetch(
        "http://127.0.0.1:5000/extract-order",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            message: orderMessage
          })
        }
      );


      const data = await result.json();

      console.log("AI CEVABI:", data);


      setResponse(data);
      setPreviousMessage(orderMessage);
      setMessage("");


      const missing = [];


      if (!data.product_name) {
        missing.push("Ürün");
      }

      if (!data.quantity) {
        missing.push("Adet");
      }

      if (!data.customer_name) {
        missing.push("Ad Soyad");
      }

      if (!data.phone_number) {
        missing.push("Telefon");
      }

      if (!data.address) {
        missing.push("Adres");
      }


      setMissingInfo(missing);


      if (missing.length > 0) {

        setMessages([
          ...messages,
          "Kullanıcı: " + message,
          "Sistem: Eksik bilgiler: " + missing.join(", ")
        ]);

      } else {

        setMessages([
          ...messages,
          "Kullanıcı: " + message,
          "Sistem: Sipariş bilgileri tamamlandı. Siparişinizi onaylayabilirsiniz."
        ]);

      }


    } catch (error) {

      console.log("HATA:", error);

    }

  };


  const confirmOrder = async () => {

    try {

      const result = await fetch(
        "http://127.0.0.1:8000/api/orders",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            product_name: response.product_name,
            quantity: response.quantity,
            customer_name: response.customer_name,
            phone_number: response.phone_number,
            addresss: response.address
          })
        }
      );


      const data = await result.json();


      if (!result.ok) {

        alert(data.message);

        return;
      }


      console.log("SİPARİŞ SONUCU:", data);

      setOrderNumber(data.order.id);


    } catch (error) {

      console.log("Sipariş oluşturulamadı:", error);

    }

  };


  if (window.location.pathname === "/admin") {

    return <Admin />;

  }


  return (

    <div className="container">

      <h1>AI Sipariş Asistanı</h1>

      <p>
        Aşağıdaki ürünlerden istediğinizi doğal bir cümle ile
        sipariş edebilirsiniz.
      </p>


      <div className="products">

        <h2>Mevcut Ürünler</h2>


        {products.map((product) => (

          <div className="product" key={product.id}>

            <span>{product.name}</span>

            <span>
              - {product.price} TL - Stok: {product.stock}
            </span>

          </div>

        ))}

      </div>


      <h2>Siparişinizi Yazın</h2>


      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Örnek: 2 adet Kablosuz Mouse istiyorum..."
      />


      <button onClick={sendMessage}>
        Siparişi Analiz Et
      </button>


      <div className="messages">

        <h2>Mesajlar</h2>

        {messages.map((msg, index) => (

          <p key={index}>
            {msg}
          </p>

        ))}

      </div>


      {response && (

        <div className="result">

          <h2>Sipariş Bilgileri</h2>


          <p>
            <strong>Ürün:</strong>{" "}
            {response.product_name || "Belirtilmedi"}
          </p>


          <p>
            <strong>Adet:</strong>{" "}
            {response.quantity || "Belirtilmedi"}
          </p>


          <p>
            <strong>Müşteri:</strong>{" "}
            {response.customer_name || "Belirtilmedi"}
          </p>


          <p>
            <strong>Telefon:</strong>{" "}
            {response.phone_number || "Belirtilmedi"}
          </p>


          <p>
            <strong>Adres:</strong>{" "}
            {response.address || "Belirtilmedi"}
          </p>


          {missingInfo.length > 0 && (

            <div>

              <h3>Eksik Bilgiler</h3>

              <p>
                Siparişi tamamlamak için şu bilgileri girmeniz gerekiyor:
              </p>


              <ul>

                {missingInfo.map((info, index) => (

                  <li key={index}>
                    {info}
                  </li>

                ))}

              </ul>


              <p>
                Eksik bilgileri mesaj kutusuna yazabilirsiniz.
              </p>

            </div>

          )}


          {missingInfo.length === 0 && (

            <div>

              <h3>Sipariş bilgileri tamamlandı.</h3>

              <p>
                Siparişinizi onaylamak istiyor musunuz?
              </p>


              <p>
                <strong>Toplam Tutar:</strong>{" "}
                {products.find(
                  (product) => product.name === response.product_name
                )?.price * parseInt(response.quantity)} TL
              </p>


              <button onClick={confirmOrder}>
                Siparişi Onayla
              </button>

            </div>

          )}

        </div>

      )}


      {orderNumber && (

        <div className="result">

          <h2>Siparişiniz Başarıyla Oluşturuldu!</h2>

          <p>
            <strong>Sipariş Numaranız:</strong> {orderNumber}
          </p>

        </div>

      )}

    </div>

  );

}


export default App;
