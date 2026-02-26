# Rakshak AI: Litigation Intelligence Platform

Rakshak AI is a high-velocity Litigation Intelligence platform designed to mitigate legal friction for industrial enterprises. It leverages advanced pattern detection algorithms to identify vexatious litigation, predatory filing behaviors, and strategic litigation spikes across millions of judicial records in milliseconds.

## 🚀 Key Features

- **Pattern Intelligence**: Automatically detect non-random filing density and temporal clusters that deviate from standard litigation exposure.
- **Vexatious Litigation Detection**: Identify "predatory" petitioners who abuse judicial processes across name variations and jurisdictions.
- **Intelligence Docket**: Deep-dive analysis of petitioner profiles with automated judicial sentiment extraction powered by Gemini 1.5 Flash.
- **Respondent Surface Mapping**: Visualize the blast radius of litigation spikes across name variations and corporate entities.
- **Command Center Dashboard**: A technical, immersive interface featuring interactive network graphs (Collusion Graphs), timeline telemetry, and forum heatmaps.
- **Clean History Verification**: Dedicated verification states for entities with zero recorded judicial reprimands.

## 🛠 Tech Stack

- **Frontend**: 
  - React.js with `framer-motion` for technical animations.
  - `recharts` for dynamic litigation telemetry.
  - `lucide-react` for high-end technical iconography.
  - Custom Vanilla CSS + Tailwind for a "Command Center" aesthetic.
- **Backend**: 
  - Node.js & Express.
  - MongoDB for high-velocity case indexing.
- **AI Engine**: 
  - Google Generative AI (Gemini .5 Flash) for judicial sentiment analysis and MO summarization.

## 🏁 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB instance
- Google Generative AI API Key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/hritika2024-15/RakshakAI.git 
   cd rakshak-ai
   ```

2. **Setup Backend**
   ```bash
   cd server
   npm install
   # Create a .env file with:
   # PORT=5000
   # MONGODB_URI=your_mongodb_uri
   # GEMINI_API_KEY=your_api_key
   npm run dev
   ```

3. **Setup Frontend**
   ```bash
   cd ../client
   npm install
   npm run dev
   ```

## 🛡 Security & Ethics
Rakshak AI is designed for professional legal risk reduction. The platform focuses on **objective pattern detection** and **judicial facts** rather than subjective labeling, ensuring a purely analytical approach to litigation management.

---
*Built for the future of Judicial Intelligence.*
