from flask import Flask, request
from flask_cors import CORS
from dotenv import load_dotenv
from google import genai
import os

load_dotenv()

app = Flask(__name__)
CORS(app)

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))


@app.route("/")
def home():
    return "AI Order Service calisiyor!"


@app.route("/test-ai")
def test_ai():
    try:
        cevap = client.models.generate_content(
            model="gemini-3.5-flash-lite",
            contents="Merhaba, kısaca kendini tanıt."
        )

        print("GEMINI CEVABI:", cevap.text)

        return cevap.text

    except Exception as e:
        print("HATA:", e)
        return "HATA: " + str(e), 500


@app.route("/extract-order", methods=["POST"])
def extract_order():
    try:
        data = request.get_json(silent=True)

        print("GELEN VERI:", data)

        if not data:
            return "JSON verisi alınamadı.", 400

        metin = data.get("message")

        if not metin:
            return "Sipariş mesajı gönderilmedi.", 400

        prompt = f"""
Sen bir sipariş asistanısın.

Kullanıcının sipariş mesajından aşağıdaki bilgileri çıkar:

- product_name
- quantity
- customer_name
- phone_number
- address

Eksik olan bilgileri null olarak bırak.

Sadece JSON formatında cevap ver.
Markdown veya kod bloğu kullanma.

Kullanıcı mesajı:
{metin}
"""

        cevap = client.models.generate_content(
            model="gemini-3.5-flash-lite",
            contents=prompt
        )

        print("GEMINI CEVABI:", cevap.text)

        return cevap.text, 200, {
            "Content-Type": "application/json"
        }

    except Exception as e:
        print("HATA:", e)
        return "HATA: " + str(e), 500

app.run(port=5000)