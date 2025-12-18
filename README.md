# Wycliff Kimutai - Geospatial Data Scientist & Full-Stack Developer Portfolio

A high-performance, responsive portfolio website built with **Next.js 15**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**. This site showcases geospatial expertise, software development projects, and professional experience with a premium, modern aesthetic.

## 🚀 Technologies Used

-   **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
-   **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
-   **Animations**: [Framer Motion](https://www.framer.com/motion/)
-   **Icons**: [Lucide React](https://lucide.dev/)
-   **Theme**: [next-themes](https://github.com/pacocoursey/next-themes) (Dark/Light mode)
-   **Forms**: Server Actions + [Zod](https://zod.dev/) validation
-   **Email**: [Resend](https://resend.com/)
-   **Package Manager**: [Bun](https://bun.sh/)

## ✨ Features

-   **Dynamic Hero Section**: Immersive background image slider with smooth cross-fade animations.
-   **Responsive Design**: Mobile-first architecture using standard Tailwind breakpoints.
-   **Theme Support**: Toggle between Light and Dark modes with persistent preference.
-   **Interactive Sections**:
    -   **Skills**: Categorized grid of technical expertise.
    -   **Experience**: Vertical timeline of professional history.
    -   **Projects**: Filterable gallery (GIS, Web, ML, etc.) with detailed cards.
-   **Contact Form**: Fully functional server-side form handling with email delivery via Resend.
-   **Performance**: Optimized images, fonts (Geist), and rigorous SEO metadata.

## 🛠️ Getting Started

### Prerequisites

-   [Bun](https://bun.sh/) installed on your machine.

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/yourusername/portfolio.git
    cd portfolio
    ```

2.  Install dependencies:
    ```bash
    bun install
    ```

3.  Set up Environment Variables:
    Create a `.env.local` file in the root directory and add your Resend API key:
    ```env
    RESEND_API_KEY=re_123456789
    EMAIL_SENDER_ADDRESS=onboarding@resend.dev
    ```

4.  Run the Development Server:
    ```bash
    bun dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser.

## 📦 Build & Deploy

To create a production build:

```bash
bun run build
bun start
```

This project is optimized for deployment on [Vercel](https://vercel.com/).

## 📄 License

This project is licensed under the MIT License.
