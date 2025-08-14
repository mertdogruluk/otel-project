# 🏨 StayEase – Hotel Booking & Reservation Platform

StayEase is a Next.js 15 + TypeScript powered hotel booking application that makes it easy to browse, book, and manage stays at top-rated hotels.
The project features real-time availability, a smooth multi-step booking flow, user & hotel owner panels, live support, and an admin dashboard — all with a modern, responsive design.

---

## 🚀 Live Demo & Source Code

🔗 **Live Demo:** [](https://quickmind-quiz-app.netlify.app)

💻 **GitHub Repository:** [https://github.com/mertdogruluk/otel-project.git](https://github.com/aniltanriverdiler/quickmind-quiz)

---

## ✨ Features

### 🛏️ Booking System (User Panel)
- ✅ **Search & Filter Hotels:** Find hotels by location, price range, and amenities.
- ✅ **Hotel Details Page:** View full hotel information, room types, and images.
- ✅ **Multi-Step Booking Flow:** From room selection to payment, all in one seamless process.
- ✅ **Booking Summary:** See a detailed breakdown before confirming.
- ✅ **Live Chat Support:** Get instant help from support agents during booking.
- ✅ **Secure Payment Integration:** Supports multiple payment methods.
- ✅ **Confirmation Page:** Get instant booking confirmation with all details..

### 👤 User System
- 🔑 **Register & Login:** Create an account or log in to manage your bookings.
- 📂 **Personal Reservation History:** View and manage your past and upcoming stays.
- ✏️ **Profile Management:** Update personal details and preferences.
- 🚪 **Logout Option:** Secure logout to keep your account safe.

### 🛠️ Hotel Owner Panel
- 🏨 **Hotel Management:** Add, edit, or remove hotels.
- 🛋 **Room Type Management:** Add or edit different types of rooms for each hotel.
- 📅 **Reservation Management:** View, confirm, or cancel bookings.
- 📡 **Live Chat Monitoring:** Track and respond to customer chats.  

### 💬 Live Support Panel
- 🟢 **Online/Offline Mode:** Manage your availability for customer chats.
- 💬 **Real-Time Messaging:** Reply instantly to customer inquiries.
- 📩 **Delayed Message Templates:** Send predefined responses for frequent questions.
- 👤 **One-on-One Chat:** Communicate directly with individual customers.

## 🎨 Design
- 📱 Responsive Layout: Works perfectly on desktop, tablet, and mobile.
- ✨ Modern UI: Styled with TailwindCSS and Shadcn/UI.
- 🖼 Image Galleries: High-quality hotel images with carousel previews.

---

## 🛠️ Installation & Run
- 1️⃣ Install dependencies:
  - `npm install`
- 2️⃣ Run development server:
  - `npm run dev`
- 3️⃣ Open the app in your browser:
  - `http://localhost:5173`

--- 

## 🏗️ Tech Stack

- ▲ **Next.js 15** – Full-stack React framework
- 🟦 **TypeScript** – Type-safe development
- 🎨 **Tailwind CSS** – Utility-first styling
- 🧩 **Shadcn UI** – Elegant UI components
- 🗂 **Zustand** – Lightweight state management
- 🗄 **Next.js** API Routes – Built-in backend API
- ☁ **Vercel** – Deployment & hosting  

---

## 📂 Project Structure
```
frontend/
└── src/
    ├── app/                                      # Next.js App Router pages
    │   ├── (admin)/                              # Admin dashboard pages
    │   │   ├── dashboard/                        # Admin main dashboard
    │   │   │   └── page.tsx
    │   │   ├── reservations/                     # Manage reservations
    │   │   │   └── page.tsx
    │   │   ├── rooms/                             # Manage rooms
    │   │   │   └── page.tsx
    │   │   └── users/                             # Manage users
    │   │       ├── page.tsx
    │   │       └── layout.tsx
    │   │
    │   ├── (routes)/                              # Public user routes
    │   │   ├── layout.tsx                         # Layout for public routes
    │   │   ├── (homepage)/                        # Home page
    │   │   │   └── page.tsx
    │   │   ├── auth/                              # Authentication pages
    │   │   │   ├── login/                         # Login page
    │   │   │   │   └── page.tsx
    │   │   │   └── register/                      # Registration page
    │   │   │       └── page.tsx
    │   │   ├── booking/                           # Booking process
    │   │   │   ├── checkout/                      # Checkout & payment
    │   │   │   │   └── page.tsx
    │   │   │   ├── confirmation/                  # Booking confirmation
    │   │   │   │   └── page.tsx
    │   │   │   └── info/                           # Booking info
    │   │   │       └── page.tsx
    │   │   └── products/                          # Product detail pages
    │   │       └── [slug]/                        # Dynamic product route
    │   │           └── page.tsx
    │   │
    │   ├── api/                                   # API route handlers
    │   │   ├── auth/                              # Authentication API
    │   │   │   └── route.ts
    │   │   ├── reservation/                       # Reservation API
    │   │   │   └── route.ts
    │   │   └── rooms/                             # Rooms API
    │   │       └── route.ts
    │   │
    │   ├── globals.css                            # Global styles
    │   └── layout.tsx                             # Root layout component
    │
    ├── components/                                # Reusable UI components
    │   ├── booking/                               # Booking stepper & summary
    │   │   ├── BookingStepper.tsx
    │   │   └── BookingSummary.tsx
    │   ├── carousel/                              # Carousel/slider components
    │   │   └── Carousel.tsx
    │   ├── categories/                            # Destination/category carousels
    │   │   └── DestinationCarousel.tsx
    │   ├── filters/                               # Filtering UI
    │   │   ├── FiltersSidebar.tsx
    │   │   └── PriceRange.tsx
    │   ├── forms/                                 # Form components
    │   │   ├── DatePicker.tsx
    │   │   ├── Input.tsx
    │   │   └── PaymentForm.tsx
    │   ├── gallery/                               # Image galleries
    │   │   └── ProductGallery.tsx
    │   ├── hotel-card/                            # Hotel card component
    │   │   └── HotelCard.tsx
    │   ├── layout/                                # Layout components
    │   │   ├── footer/
    │   │   │   └── Footer.tsx
    │   │   └── header/
    │   │       └── Header.tsx
    │   ├── tab/                                   # Tab navigation components
    │   └── ui/                                    # Generic UI components
    │
    ├── hooks/                                     # Custom React hooks
    │   ├── useAuth.ts                             # Authentication logic
    │   ├── useBooking.ts                          # Booking state management
    │   └── useProducts.ts                         # Product fetching logic
    │
    ├── store/                                     # State management (Zustand/Redux/etc.)
    │   ├── bookingStore.ts                        # Booking-related global state
    │   ├── productStore.ts                        # Product-related global state
    │   ├── uiStore.ts                             # UI-related state
    │   └── userStore.ts                           # User-related global state
    │
    ├── lib/                                       # Helper functions and services
    │
    └── types/                                     # TypeScript type definitions
        ├── booking.ts
        ├── hotel.ts
        └── user.ts
```
  

## 🎮 How to Use

🎮 How to Use

1️⃣ Register or Login – Create an account to book and manage reservations.
2️⃣ Search Hotels – Use filters to find the best hotel for your needs.
3️⃣ Book a Room – Select dates, confirm details, and pay securely.
4️⃣ View Reservations – Check upcoming and past bookings in your dashboard.
5️⃣ Manage Bookings – Cancel or update reservations easily.
6️⃣ Hotel Owners – Manage hotels, rooms, and track bookings.
7️⃣ Live Support Agents – Respond to customer messages in real-time.  

---

## 📌 Notes

- This project is full-stack — API routes handle data processing.
- State management is done with Zustand for performance and simplicity.
- Styled with TailwindCSS and Shadcn/UI for a modern look.
- Future improvements: Integration with third-party hotel APIs & advanced analytics. 

---

## 🤝 Contribution

💡 Have an idea or found a bug?

- Fork the repo  
- Create a new branch (`feature/your-feature`)  
- Submit a Pull Request  

🚀 Let’s make StayEase even better!
