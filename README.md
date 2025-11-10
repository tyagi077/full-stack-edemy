[Live Link](https://full-stack-edemy.vercel.app/)

https://github.com/user-attachments/assets/de0acf61-df8c-4ce7-b7e8-ca4fad11ea4f


## 📦 Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/tyagi077/full-stack-edemy.git
   cd server
   
2. Install dependencies:
   ```sh
   npm install

4. Create a .env file in the root directory and add the following environment variables:
   ```sh
   DB_URL=your_mongodb_connection_string
   CLOUD_NAME=your_cloudinary_cloud_name
   API_KEY=your_cloudinary_api_key
   API_SECRET=your_cloudinary_api_secret
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret
   JWT_SECRET=your_jwt_secret


6. Start the server:
   ```sh
   node server.js

 ### Frontend Setup
 1. Navigate to the frontend directory:
    ```sh
    cd ../client

2. Install dependencies:
   ```sh
   npm install
   
3. Create a .env file in the root directory and add the following environment variables:
   ```sh
   VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
   VITE_REACT_APP_BACKEND_BASEURL=your_backend_url || http://localhost:1000000

3. Start the development server:
   ```sh
   npm run dev


💡 Contributions are welcome! Feel free to open issues or submit PRs. 🚀
