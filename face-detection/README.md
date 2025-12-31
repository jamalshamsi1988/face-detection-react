🧱 قدم ۱: ساخت پروژه React
npx create-react-app face-detection-react
cd face-detection-react
npm start

📦 قدم ۲: نصب کتابخانه تشخیص چهره
npm install face-api.js

📁 قدم ۳: اضافه کردن مدل‌های هوش مصنوعی

داخل پوشه public یک پوشه بساز:

public/models


مدل‌ها رو از این لینک دانلود کن و داخلش بذار 👇
https://github.com/jamalshamsi1988/face-detection-react/tree/main/face-detection/public/models

🧠 قدم ۴: ساخت کامپوننت FaceDetection

داخل src فایل زیر رو بساز:

src/FaceDetection.jsx

🧩 قدم ۵: استفاده از کامپوننت در App.js
import FaceDetection from "./FaceDetection";


🧠 توضیح مفهومی (خیلی مهم)
🔹 useRef
const videoRef = useRef();
برای دسترسی مستقیم به تگ <video> (وبکم)

🔹 loadModels

مدل‌های هوش مصنوعی رو از پوشه public/models لود می‌کنه
بدون این مرحله هیچ تشخیصی انجام نمی‌شه

🔹 getUserMedia
navigator.mediaDevices.getUserMedia({ video: true })

اجازه دسترسی به وبکم از مرورگر

🔹 detectAllFaces
faceapi.detectAllFaces(video, options)

پیدا کردن چهره‌ها

سریع و مناسب Real-time

🔹 Canvas

Canvas روی ویدیو قرار می‌گیره و:

کادر چهره

نقاط صورت
رو رسم می‌کنه

✅ نتیجه

🎥 وبکم روشن
🧠 تشخیص چهره زنده
📦 بدون بک‌اند
⚡ اجرا داخل مرورگر

🧠 توضیح مهم بخش‌های جدید
🔹 withFaceExpressions()
.withFaceExpressions()


احساسات رو به صورت درصد تشخیص می‌ده:

happy

sad

angry

surprised

neutral

fearful

disgusted

📌 مثلا:

expressions.happy = 0.92

🔹 withAgeAndGender()
.withAgeAndGender()


age → عدد تقریبی سن

gender → male / female

genderProbability → دقت تشخیص

📌 سن کاملاً تخمینیه (±5 سال طبیعی)

🔹 رسم متن روی صورت
new faceapi.draw.DrawTextField(
  ["25 سال - male"],
  box.bottomLeft
).draw(canvas);


برای نمایش اطلاعات کنار صورت استفاده می‌شه

📊 نکات دقت و عملکرد

✔ نور خوب = دقت بالا
✔ دوربین جلو بهتر از وبکم ضعیف
❌ ماسک و عینک = دقت کمتر
❌ صورت چرخیده = تشخیص سخت‌تر
