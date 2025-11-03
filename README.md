# Forklift Safety AI

Advanced AI-powered forklift safety system that detects people near forklifts and triggers automatic braking to prevent workplace accidents.

## Features

- **Real-time Person Detection**: Uses YOLOv5-style AI models to detect people in video footage
- **Automatic Brake Triggering**: Visual alerts when a person is detected near the forklift
- **Browser-based Processing**: All AI processing happens directly in your browser
- **Download Annotated Frames**: Save analyzed frames with bounding boxes and alerts

## Technologies Used

- **React** - UI framework
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **Hugging Face Transformers** - AI object detection models
- **Supabase** - Backend infrastructure

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd forklift-safety-ai
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:8080`

## Deployment

### GitHub Pages

This project is configured to automatically deploy to GitHub Pages when you push to the main branch.

#### Setup Steps:

1. Go to your repository Settings > Pages
2. Under "Build and deployment", select "GitHub Actions" as the source
3. Push to the main branch to trigger automatic deployment

Your site will be available at: `https://<username>.github.io/<repository-name>`

### Custom Domain

To use a custom domain:
1. Add a `CNAME` file in the `public` folder with your domain
2. Configure DNS settings with your domain provider
3. Enable "Enforce HTTPS" in GitHub Pages settings

## Usage

1. Click "Upload Video" to select a forklift surveillance video
2. Click "Analyze Video" to process the first frame
3. The AI will detect people and display bounding boxes
4. If a person is detected, a "BRAKES TRIGGERED" alert appears
5. Download the annotated frame for your records

## Development

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## Project Structure

```
├── src/
│   ├── components/      # React components
│   ├── lib/            # Utility functions and AI detection
│   ├── pages/          # Page components
│   └── integrations/   # External integrations
├── public/             # Static assets
└── supabase/          # Backend configuration
```

## License

MIT
