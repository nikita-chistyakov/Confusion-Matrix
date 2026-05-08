# Classification Metrics Demystified

[**Test out the app here!**](https://confusion-matrix-1092934500596.europe-west2.run.app
)

An interactive, visual guide designed to help developers and data scientists understand classification metrics through the lens of a Confusion Matrix. 

This React application visualizes how metrics like **Precision**, **Recall**, and **F1 Score** behave under different scenarios (e.g., imbalanced datasets like Spam Filters or Disease Screening).

App Screenshot
<img width="484" height="320" alt="Screen Shot 2026-05-08 at 3 42 21 PM" src="https://github.com/user-attachments/assets/726144c1-1fc6-40e2-84fc-560ffe5eb381" />


## 🚀 Features

- **Interactive Confusion Matrix**: Visualize True Positives, False Positives, False Negatives, and True Negatives in a 2x2 grid.
- **Real-time Metrics**: Instantly calculate Accuracy, Recall (Sensitivity), Precision, F1 Score, and Specificity as you adjust values.
- **Scenarios**: Pre-built presets to demonstrate common machine learning problems:
  - **Balanced**: Standard 50/50 dataset.
  - **Spam Filter**: High accuracy but focuses on Precision (avoiding false alarms).
  - **Disease Screening**: Focuses on Recall (catching every positive case).
- **Custom Mode**: Use sliders to manually adjust the confusion matrix values and test your own edge cases.
- **Sample Visualizer**: A "Dots" view that represents individual samples, highlighting which ones contribute to specific metrics.

## 🛠️ Built With

- **React 18**: Core UI library.
- **TypeScript**: For type-safe data structures (metrics, scenarios).
- **Tailwind CSS**: For a modern, dark-themed responsive design.
- **Lucide React**: Iconography.
- **Google Fonts**: IBM Plex Mono & DM Serif Display for a distinct data-science aesthetic.

## 📦 Installation

This project is built using standard web technologies. You can run it locally using any static file server or a modern bundler like Vite.

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/classification-metrics-demystified.git
   cd classification-metrics-demystified
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or if using Vite
   npm run dev
   ```

## 🧮 How It Works

### The Metrics
The app breaks down complex formulas into simple English explanations:

| Metric | Formula | Why it matters |
|--------|---------|----------------|
| **Accuracy** | `(TP + TN) / All` | General performance, but misleading on imbalanced data. |
| **Recall** | `TP / (TP + FN)` | Critical when missing a positive is dangerous (e.g., cancer detection). |
| **Precision** | `TP / (TP + FP)` | Critical when false alarms are annoying/costly (e.g., spam filters). |
| **F1 Score** | `2*TP / (2*TP + FP + FN)` | Harmonic mean; useful when you need to balance Precision and Recall. |
| **Specificity** | `TN / (TN + FP)` | The ability to correctly reject negatives (e.g., healthy people testing negative). |

## 🎨 Project Structure

```
├── components/
│   ├── ConfusionMatrix.tsx   # The 2x2 grid visualization
│   ├── MetricsPanel.tsx      # List of clickable metric cards
│   ├── CustomPanel.tsx       # Sliders for manual input
│   └── DotsVisualizer.tsx    # Particle view of the dataset
├── App.tsx                   # Main layout and state management
├── constants.tsx             # Metric formulas and Scenario presets
├── types.ts                  # TypeScript interfaces
└── index.html                # Entry HTML with Tailwind CDN
```

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
