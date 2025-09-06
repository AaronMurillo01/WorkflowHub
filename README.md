# Zenith Dashboard

> **Note**: This project is a prototype intended to showcase my skills. The original version is deployed for my client as part of my freelance work.

A modern, production-quality SaaS dashboard application built with React (TypeScript) and FastAPI. Features a sleek, minimalist design inspired by platforms like Linear, Vercel, and Stripe.

## 📸 Screenshots

### Welcome Screen
![Welcome Screen](https://github.com/user-attachments/assets/welcome-screen.png)
*Step 1 of the onboarding flow - introducing users to Zenith Dashboard's key features*

### Workspace Setup
![Workspace Setup](https://github.com/user-attachments/assets/workspace-setup.png)
*Step 2 of the onboarding flow - helping users customize their workspace*

### Main Dashboard
![Main Dashboard](https://github.com/user-attachments/assets/main-dashboard.png)
*The main dashboard showing project statistics, recent projects, and key metrics*

### AI Assistant
![AI Assistant](https://github.com/user-attachments/assets/ai-assistant.png)
*Built-in AI assistant for project management and productivity insights*

## 🚀 Features

### Frontend
- **React 18+ with TypeScript** - Modern React with full type safety
- **Vite** - Lightning-fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **shadcn/ui** - Beautiful, accessible component library
- **Framer Motion** - Smooth animations and micro-interactions
- **Lucide React** - Beautiful, customizable icons
- **Dark Mode** - Professional dark theme by default
- **Responsive Design** - Works perfectly on mobile, tablet, and desktop
- **ESLint & Prettier** - Code quality and consistent formatting

### Backend
- **FastAPI** - Modern, fast web framework for building APIs
- **Pydantic** - Data validation and serialization
- **CORS Support** - Cross-origin resource sharing for frontend integration
- **RESTful API** - Clean, well-documented API endpoints
- **Type Hints** - Full Python type safety

## 📁 Project Structure

```
zenith-dashboard/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   │   ├── ui/          # shadcn/ui components
│   │   │   └── layout/      # Layout components (Sidebar, Header)
│   │   ├── pages/           # Page components
│   │   ├── lib/             # Utility functions
│   │   └── assets/          # Static assets
│   ├── public/              # Public static files
│   ├── package.json         # Frontend dependencies
│   ├── tailwind.config.js   # Tailwind CSS configuration
│   ├── vite.config.ts       # Vite configuration
│   └── tsconfig.json        # TypeScript configuration
├── backend/                 # FastAPI backend application
│   ├── main.py             # FastAPI app and routes
│   ├── schemas.py          # Pydantic models
│   ├── data.py             # Mock data and business logic
│   └── requirements.txt    # Python dependencies
└── README.md               # This file
```

## 🛠️ Installation & Setup

### Prerequisites

- **Node.js** (v18 or higher)
- **Python** (v3.8 or higher)
- **npm** or **yarn** package manager

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

   The frontend will be available at `http://localhost:5173`

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment (recommended):
   ```bash
   python -m venv venv
   
   # On Windows
   venv\\Scripts\\activate
   
   # On macOS/Linux
   source venv/bin/activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Start the development server:
   ```bash
   python main.py
   ```

   The backend API will be available at `http://localhost:8000`

### API Documentation

Once the backend is running, you can access:
- **Interactive API docs**: `http://localhost:8000/docs`
- **ReDoc documentation**: `http://localhost:8000/redoc`

## 🎨 Design System

### Color Palette
- **Background**: Deep charcoal/slate (`hsl(222.2, 84%, 4.9%)`)
- **Cards**: Slightly lighter charcoal (`hsl(222.2, 84%, 4.9%)`)
- **Primary**: Electric blue (`hsl(217.2, 91.2%, 59.8%)`)
- **Text**: High contrast white (`hsl(210, 40%, 98%)`)
- **Muted Text**: Subtle gray (`hsl(215, 20.2%, 65.1%)`)

### Typography
- **Font Family**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700

### Components
- **Buttons**: Multiple variants (default, outline, ghost, etc.)
- **Cards**: Clean, elevated design with subtle borders
- **Inputs**: Consistent styling with focus states
- **Navigation**: Collapsible sidebar with smooth animations

## 📱 Pages & Features

### Dashboard
- **Statistics Cards**: Key metrics and KPIs
- **Project Grid**: Recent projects with status indicators
- **Progress Tracking**: Visual progress bars and completion status
- **Quick Actions**: Add new projects, filter, search

### Projects
- **Project Management**: View all projects in a grid layout
- **Search & Filter**: Find projects quickly
- **Status Management**: Track project progress
- **Team Information**: See team size and collaboration details

### Settings
- **Profile Management**: Personal information and preferences
- **Notifications**: Configure alert preferences
- **Security**: Account security settings
- **Appearance**: Theme and display options
- **Integrations**: Third-party service connections

## 🔌 API Endpoints

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/{id}` - Get specific project
- `POST /api/projects` - Create new project
- `PUT /api/projects/{id}` - Update project
- `DELETE /api/projects/{id}` - Delete project
- `GET /api/projects/status/{status}` - Filter by status

### Statistics
- `GET /api/stats` - Get dashboard statistics

### Health
- `GET /health` - Health check endpoint

## 🚀 Development

### Frontend Development
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

### Backend Development
```bash
# Start with auto-reload
uvicorn main:app --reload --host 0.0.0.0 --port 8000

# Run with specific host/port
python main.py
```

## 🎯 Key Features Implemented

### Frontend
- ✅ Modern React 18+ with TypeScript
- ✅ Vite for fast development and building
- ✅ Tailwind CSS for styling
- ✅ shadcn/ui component library
- ✅ Framer Motion animations
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Dark mode theme
- ✅ Collapsible sidebar navigation
- ✅ Project cards with status indicators
- ✅ Dashboard with statistics
- ✅ Settings page with multiple sections
- ✅ Smooth page transitions
- ✅ ESLint and Prettier configuration

### Backend
- ✅ FastAPI with automatic API documentation
- ✅ Pydantic for data validation
- ✅ CORS middleware for frontend integration
- ✅ RESTful API design
- ✅ Mock data for development
- ✅ Type hints throughout
- ✅ Error handling and validation
- ✅ Health check endpoint

## 🔧 Customization

### Adding New Pages
1. Create a new component in `frontend/src/pages/`
2. Add the route to `App.tsx`
3. Update the sidebar navigation in `Sidebar.tsx`

### Adding New API Endpoints
1. Define Pydantic models in `schemas.py`
2. Add business logic in `data.py`
3. Create route handlers in `main.py`

### Styling Customization
- Modify `frontend/tailwind.config.js` for theme changes
- Update CSS variables in `frontend/src/index.css`
- Customize component styles in individual component files

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For support, email support@zenith-dashboard.com or create an issue in the repository.

---

**Built with ❤️ using React, TypeScript, FastAPI, and modern web technologies.**
