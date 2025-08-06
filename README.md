### 🔧 Setup

### Project Structure

ChatBotUsingGemiinLLM/
├── client/             # Frontend 
│   └── public/
│       └── index.html
├── server/             # Backend (Node.js + Express)
│   ├── server.js
│   └── .env            # (Not tracked by Git)
├── .gitignore
├── README.md
└── package.json



### Installation & Setup
1. Clone the repo:
git clone https://github.com/Sasikanth1215/ChatBotUsingGemiinLLM.git
cd ChatBotUsingGemiinLLM

2. Install backend dependencies:
cd server
npm install

3. Create .env file:
cp .env.example .env
Add your Gemini API key in server/.env:
GEMINI_API_KEY=your_real_api_key_here

4. Start the server:
node server.js

### server/.env
GEMINI_API_KEY=your_api_key_here
MONGODB_URI=your_mongodb_uri
PORT=5000

i. Copy `server/.env.example` to `server/.env`
ii. Add your actual Gemini API key and config values
