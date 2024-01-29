const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;
module.exports=app;

// Bước 3: Kết nối MongoDB
mongoose.connect('mongodb+srv://nanh7374:vanhvip1@cluster0.5st5v34.mongodb.net/?retryWrites=true&w=majority', {});
const carSchema = new mongoose.Schema({
  id: Number,
  name: String,
  brand: String,
  price: Number
});

const Car = mongoose.model('Car', carSchema);

// Bước 4: Khởi tạo dữ liệu ô tô
const initialCars = [
  { id: 1, name: 'Car1', brand: 'Brand1', price: 10000 },
  { id: 2, name: 'Car2', brand: 'Brand2', price: 15000 },
  // Thêm các ô tô khác nếu cần
];

// Thêm dữ liệu vào MongoDB
Car.insertMany(initialCars)
    .then(() => {
      console.log('Dữ liệu ô tô đã được thêm vào MongoDB.');
    })
    .catch((error) => {
      console.error(error);
    });

// Bước 5: Tạo chức năng trả về danh sách ô tô dưới dạng JSON
app.get('/cars', async (req, res) => {
  try {
    const cars = await Car.find({});
    res.json(cars);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Bước 6: Lắng nghe cổng
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
