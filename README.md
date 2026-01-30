# CodeMate Frontend 💻❤️

> **React Frontend for CodeMate – The Developer Dating App**

A modern, responsive React application for CodeMate featuring a bold Neo-Brutalist design. Swipe through developer profiles, manage connections, and chat in real-time.

![React](https://img.shields.io/badge/React-19-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-38B2AC?logo=tailwind-css)
![Redux](https://img.shields.io/badge/Redux_Toolkit-2.x-764ABC?logo=redux)

---

## 🔗 Related Repository

**Backend Repository:** [CodeMate API](https://github.com/gauravzyadav/codeMate-backend) – Express.js backend with MongoDB & Socket.io

---

## ✨ Features

- **Swipe Interface** – Tinder-style card swiping with smooth animations
- **Real-Time Chat** – Instant messaging with Socket.io
- **Profile Management** – Edit profile with live preview
- **Image Upload** – Upload photos with client-side compression
- **Neo-Brutalist UI** – Bold, modern design that stands out
- **Responsive Design** – Works on desktop, tablet, and mobile
- **Redux State** – Centralized state management

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| React 19 | UI Library |
| Vite | Build Tool & Dev Server |
| Redux Toolkit | State Management |
| React Router v7 | Client-Side Routing |
| Tailwind CSS v4 | Utility-First Styling |
| DaisyUI | UI Component Library |
| Socket.io-client | Real-Time Communication |
| Axios | HTTP Client |
| Lucide React | Icon Library |
| Radix UI | Accessible Components |

---

## 📁 Project Structure

```
devTinder-web/
├── public/
│   └── images/               # Static images
│
├── src/
│   ├── components/
│   │   ├── ui/               # Reusable UI components (Button, Card, Input, etc.)
│   │   ├── Body.jsx          # Layout wrapper with auth check
│   │   ├── NavBar.jsx        # Navigation with user dropdown
│   │   ├── Footer.jsx        # Footer component
│   │   ├── LandingPage.jsx   # Marketing homepage
│   │   ├── Login.jsx         # Login & Signup forms
│   │   ├── Feed.jsx          # Swipeable user cards
│   │   ├── UserCard.jsx      # Individual profile card
│   │   ├── Profile.jsx       # Profile page wrapper
│   │   ├── EditProfile.jsx   # Profile editor with preview
│   │   ├── Connections.jsx   # Matches list + Chat interface
│   │   └── Request.jsx       # Incoming connection requests
│   │
│   ├── utils/
│   │   ├── appStore.js       # Redux store configuration
│   │   ├── userSlice.js      # User state (current user)
│   │   ├── feedSlice.js      # Feed state (users to swipe)
│   │   ├── connectionSlice.js # Connections state (matches)
│   │   ├── requestSlice.js   # Requests state (pending)
│   │   ├── constants.js      # API base URL config
│   │   └── socket.js         # Socket.io connection
│   │
│   ├── lib/
│   │   └── utils.js          # Utility functions (cn helper)
│   │
│   ├── App.jsx               # Root component with routes
│   ├── main.jsx              # React entry point
│   └── index.css             # Global styles & Tailwind config
│
├── package.json
├── vite.config.js            # Vite configuration
├── vercel.json               # Vercel deployment config
└── tsconfig.json             # TypeScript config (for IDE support)
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- CodeMate Backend running (see [Backend Repository](https://github.com/gauravzyadav/codeMate-backend))

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/gauravzyadav/codeMate-web.git
cd devTinder-web
```

**2. Install dependencies**
```bash
npm install
```

**3. Configure API URL (Optional)**

The app automatically connects to:
- **Development:** `http://localhost:3000`

To change this, edit `src/utils/constants.js`:
```javascript
export const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:3000"
    : "https://your-backend-url.com";
```

**4. Start the development server**
```bash
npm run dev
```

The app will be running at `http://localhost:5173`

---

## 🎨 Design System

### Neo-Brutalist Style

The app uses a bold Neo-Brutalist design with:

- **Heavy black borders** (2-4px)
- **Offset shadows** (`shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`)
- **Bright accent colors** (Pink, Yellow, Blue)
- **Sharp corners** (no border-radius or minimal)
- **Bold typography** (font-black, uppercase)

### Color Palette

| Color | Usage | Tailwind Class |
|-------|-------|----------------|
| Cream | Background | `bg-[#FFFDF5]` |
| Pink | Primary CTA | `bg-pink-500` |
| Yellow | Secondary/Highlights | `bg-yellow-400` |
| Blue | Info/Chat | `bg-blue-400` |
| Black | Borders/Text | `border-black` |

### UI Components

Located in `src/components/ui/`:
- `button.jsx` – Styled buttons with variants
- `card.jsx` – Card container components
- `input.jsx` – Form input fields
- `label.jsx` – Form labels
- `select.jsx` – Dropdown select
- `textarea.jsx` – Multi-line input
- `avatar.jsx` – User avatar display
- `alert.jsx` – Alert messages
- `badge.jsx` – Status badges
- `separator.jsx` – Horizontal dividers

---

## 📱 Pages & Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | `LandingPage` | Marketing homepage (public) |
| `/login` | `Login` | User login form |
| `/signup` | `Login` | User registration form |
| `/feed` | `Feed` | Swipe through developers |
| `/profile` | `Profile` | Edit your profile |
| `/connections` | `Connections` | View matches & chat |
| `/requests` | `Request` | Manage connection requests |

### Route Protection

The `Body` component wraps authenticated routes and:
1. Checks for auth token in localStorage
2. Fetches user profile if not in Redux store
3. Redirects to `/login` if unauthorized

---

## 🗃️ State Management (Redux)

### Store Structure

```javascript
{
  user: User | null,           // Current logged-in user
  feed: User[] | null,         // Users available to swipe
  connections: User[] | null,  // Accepted connections (matches)
  requests: Request[] | null   // Pending incoming requests
}
```

### Slices

| Slice | Actions | Description |
|-------|---------|-------------|
| `userSlice` | `addUser`, `removeUser` | Manages current user |
| `feedSlice` | `addFeed`, `removeUserFromFeed` | Manages swipe feed |
| `connectionSlice` | `addConnections`, `removeConnections` | Manages matches |
| `requestSlice` | `addRequests`, `removeRequest` | Manages requests |

---

## 💬 Real-Time Chat

### How It Works

1. User opens chat with a connection
2. Socket connects and joins a unique room
3. Messages are sent via socket events
4. Both users receive messages instantly

### Socket Events

```javascript
// Join a chat room
socket.emit("joinChat", {
  firstName: "John",
  userId: "your_user_id",
  targetUserId: "target_user_id"
});

// Send a message
socket.emit("sendMessage", {
  firstName: "John",
  lastName: "Doe",
  userId: "your_user_id",
  targetUserId: "target_user_id",
  text: "Hello!"
});

// Receive messages
socket.on("messageReceived", ({ firstName, lastName, text }) => {
  // Add message to UI
});
```

### Socket Configuration

Located in `src/utils/socket.js`:
```javascript
export const createSocketConnection = () => {
  return io(BASE_URL, {
    transports: ['websocket', 'polling'],
    withCredentials: true
  });
};
```

---

## 🔐 Authentication

### Token Storage
- JWT token stored in `localStorage` as `authToken`
- Sent via `Authorization: Bearer <token>` header
- Cookies used as fallback for same-domain requests

### Auth Flow

```
1. User logs in / signs up
         │
         ▼
2. Backend returns JWT token
         │
         ▼
3. Token saved to localStorage
         │
         ▼
4. All API requests include token in header
         │
         ▼
5. On 401 error → Clear token → Redirect to /login
```

### Making Authenticated Requests

```javascript
const token = localStorage.getItem("authToken");

const res = await axios.get(BASE_URL + "/profile/view", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
  withCredentials: true,
});
```

---

## 🖼️ Image Upload

### Features
- Client-side image compression before upload
- Support for URL input or file upload
- Live preview in UserCard component
- 5MB file size limit
- Automatic format conversion to JPEG

### Compression Settings
```javascript
const compressImage = (file, maxWidth = 800, maxHeight = 800, quality = 0.8)
```

---

## 🌐 Deployment

### Vercel (Current)

The frontend is deployed on Vercel:
```
https://dev-tinder-web-match-making.vercel.app/
```

### Deploy Your Own

**1. Push to GitHub**

**2. Connect to Vercel**
- Import your repository
- Framework preset: Vite
- Build command: `npm run build`
- Output directory: `dist`

**3. Environment Variables (if needed)**
Set in Vercel dashboard if you need custom API URL.

The `vercel.json` handles SPA routing:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

---

## 📜 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

---

## 🧩 Key Components

### `UserCard.jsx`
The swipeable profile card with:
- Profile photo and info display
- Like/Pass action buttons
- Animated exit on swipe
- Preview mode for profile editing

### `Connections.jsx`
Split-view layout with:
- Left panel: List of matched connections
- Right panel: Real-time chat interface
- Socket.io integration for instant messaging

### `EditProfile.jsx`
Profile editor featuring:
- Live preview using UserCard
- Image upload with compression
- URL or file upload toggle
- Form validation

### `Feed.jsx`
Main swiping interface:
- Fetches users from `/feed` endpoint
- Displays one card at a time
- Handles Like/Pass actions
- Loading and empty states

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 👨‍💻 Author

**Gaurav Yadav**
- LinkedIn: [gaurav-yadavvv](https://www.linkedin.com/in/gaurav-yadavvv/)

---

## 📄 License

ISC License

---

<p align="center">
  <b>Built with ❤️ for developers who code and connect</b>
</p>
