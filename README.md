# 🛡️ ScamSense

### AI-Powered Scam & Phishing Detection

ScamSense is an AI-powered security tool that analyzes suspicious messages, images, and URLs to identify phishing, scams, credential theft, and other fraud indicators.

It combines a Go backend with Google's Gemini AI to provide a risk score, threat classification, explanation of suspicious indicators, and actionable recommendations.

---

## ✨ Features

### 📝 Text Analysis

Paste a suspicious:

- SMS
- Email
- WhatsApp message
- Chat message
- Other text-based communication

ScamSense analyzes the content and identifies potential scam or phishing indicators.

### 🖼️ Image Analysis

Upload a screenshot containing a suspicious message.

ScamSense can analyze visible:

- Text
- Links
- Sender information
- Banking/payment references
- Other suspicious content

This is useful when the suspicious message cannot be copied as text.

### 🔗 URL Analysis

Submit a suspicious URL for analysis.

ScamSense evaluates the URL for indicators such as:

- Phishing patterns
- Brand impersonation
- Suspicious domains
- Credential-theft indicators
- Suspicious URL structure

The URL is analyzed without requiring ScamSense to execute the website.

---

## 📊 Analysis Results

Each analysis produces a structured security report containing:

- **Risk Score** — 0–100
- **Risk Level** — Low, Medium, High, or Critical
- **Category** — Phishing, Scam, Credential Theft, etc.
- **Confidence Score**
- **Summary**
- **Red Flags**
- **Security Recommendations**


---

## 🏗️ Architecture

```text
                         ScamSense
                            │
             ┌──────────────┼──────────────┐
             │              │              │
          📝 Text         🖼 Image        🔗 URL
             │              │              │
             └──────────────┼──────────────┘
                            │
                            ▼
                     React Frontend
                            │
                       REST API
                            │
                            ▼
                      Go + Gin API
                            │
                     Service Layer
                            │
                            ▼
                    Gemini Integration
                            │
                            ▼
                     Gemini 2.5 Flash
                            │
                            ▼
                   Structured JSON Result
                            │
                            ▼
                       Result Card
```

---

## 🛠️ Tech Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- Lucide Icons

### Backend

- Go
- Gin
- REST APIs
- Google Gemini API

### AI

- Gemini 2.5 Flash
- Structured JSON responses

### Security

- Server-side API key management
- Backend rate limiting
- Request validation
- Configurable CORS
- No Gemini API key exposed to the frontend

---

## 🚀 Running Locally

### Prerequisites

Make sure you have:

- Node.js
- Go
- A Google Gemini API key

---

### 1. Clone the repository

```bash
git clone https://github.com/S-ishita/ScamSense-AI.git
cd ScamSense-AI
```

---

## 🔧 Backend Setup

Move into the backend:

```bash
cd backend
```

Create a `.env` file:

```env
GEMINI_API_KEY=your_gemini_api_key
```

Install dependencies:

```bash
go mod download
```

Start the server:

```bash
go run ./cmd/server
```

The backend will run on:

```text
http://localhost:8080
```

Health check:

```text
GET http://localhost:8080/health
```

---

## 🎨 Frontend Setup

Open another terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create:

```text
frontend/.env
```

with:

```env
VITE_API_URL=http://localhost:8080
```

Start the development server:

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

---

## 🔌 API Endpoints

### Health Check

```http
GET /health
```

### Text Analysis

```http
POST /api/v1/analyze
```

Example request:

```json
{
  "type": "text",
  "content": "Your suspicious message here"
}
```

### Image Analysis

```http
POST /api/v1/analyze-image
```

Accepts an uploaded image for scam analysis.

### URL Analysis

```http
POST /api/v1/analyze-url
```

Example request:

```json
{
  "url": "https://example.com/login"
}
```

---

### Important

ScamSense is an analysis and awareness tool. Its results should not be treated as definitive proof that a message or URL is safe or malicious.

Users should independently verify suspicious communications through trusted official channels.


---

## 🧪 Testing

### Backend

```bash
cd backend
go build ./...
```

### Frontend

```bash
cd frontend
npm run build
```

---


## 🤝 Contributing

Contributions, ideas, and improvements are welcome.

1. Fork the repository.

2. Create a feature branch:

```bash
git checkout -b feature/your-feature
```

3. Make your changes.

4. Test the application.

5. Commit your changes:

```bash
git commit -m "Add your feature"
```

6. Push the branch:

```bash
git push origin feature/your-feature
```

7. Open a Pull Request.

---

## 📌 Current Capabilities

- [x] Text scam analysis
- [x] Image/screenshot analysis
- [x] URL analysis
- [x] AI-generated risk scoring
- [x] Red flag detection
- [x] Security recommendations
- [x] Backend rate limiting
- [x] Configurable CORS
- [x] Responsive web interface

---

## ⚠️ Disclaimer

ScamSense is intended for educational, informational, and security-awareness purposes.

AI-generated analysis may occasionally be incorrect. Always verify suspicious messages, websites, and financial communications through official and trusted sources before taking action.
