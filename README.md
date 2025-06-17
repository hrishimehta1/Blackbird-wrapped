# Blackbird Wrapped 2025

An interactive, Spotify Wrapped-style visualization of your dining data using NFC interactions. Built with Next.js, TypeScript, and Framer Motion.

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18.0.0 or higher)
- npm (v9.0.0 or higher)
- Git

## Installation Steps

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/blackbird-wrapped.git
cd blackbird-wrapped
```

2. **Install dependencies**
```bash
npm install
```

3. **Install required packages**
```bash
npm install next@latest react@latest react-dom@latest
npm install framer-motion@latest
npm install react-icons@latest
npm install react-countup@latest
npm install @next/font
```

4. **Install development dependencies**
```bash
npm install -D typescript @types/react @types/node @types/react-dom
npm install -D tailwindcss postcss autoprefixer
npm install -D @types/react-countup
```

5. **Initialize Tailwind CSS**
```bash
npx tailwindcss init -p
```

## Project Structure

```
blackbird-wrapped/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── NFCReader.tsx
│   │   │   ├── Phone.tsx
│   │   │   ├── Instructions.tsx
│   │   │   └── ProgressDots.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── data/
│   │   └── data.json
│   └── lib/
│       ├── nfc-audio.ts
│       └── nfc-animations.ts
├── public/
├── package.json
├── tsconfig.json
└── README.md
```

## Configuration Files

1. **Update tsconfig.json**
```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

2. **Update tailwind.config.js**
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

## Running the Application

1. **Development Mode**
```bash
npm run dev
```
The application will be available at `http://localhost:3000`

2. **Build for Production**
```bash
npm run build
```

3. **Start Production Server**
```bash
npm start
```

## Features

- Interactive NFC tap simulation
- Animated phone interface
- Dynamic data visualization
- Smooth transitions and animations
- Responsive design
- Custom particle effects
- Sound wave visualizations

## Browser Support

The application works best in modern browsers that support:
- CSS Grid and Flexbox
- CSS Animations
- Web Audio API
- CSS Variables

## Troubleshooting

1. **If you see module not found errors:**
```bash
rm -rf node_modules .next
npm install
```

2. **If styles aren't loading:**
```bash
npm run dev -- --clear
```

3. **If TypeScript errors occur:**
```bash
npm run build
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Inspired by Spotify Wrapped
- Built with Next.js and Framer Motion
- Uses React Icons for UI elements
