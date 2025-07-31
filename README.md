<h3 align="center">AI Resume Analyzer</h3>

<div align="center">
  <div>
    <img src="https://img.shields.io/badge/-React-black?style=for-the-badge&logo=react&logoColor=61DAFB" alt="react" />
    <img src="https://img.shields.io/badge/-TypeScript-black?style=for-the-badge&logo=typescript&logoColor=3178C6" alt="typescript" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logo=tailwindcss&logoColor=38BDF8" alt="tailwind" />
    <img src="https://img.shields.io/badge/-React_Router-black?style=for-the-badge&logo=react-router&logoColor=CA4245" alt="react-router" />
    <img src="https://img.shields.io/badge/-Puter-black?style=for-the-badge&logoColor=white&color=6366F1" alt="puter" />
    <img src="https://img.shields.io/badge/-PDF.js-black?style=for-the-badge&logoColor=white&color=FF6B6B" alt="pdfjs" />
  </div>
</div>

---

## 📋 Table of Contents

1. 🧠 [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. 💪 [Features](#features)
4. 🚀 [Quick Start](#quick-start)
5. 📁 [Project Structure](#project-structure)
6. 🔧 [Development](#development)

---

## 🧠 Introduction

**AI Resume Analyzer** is an intelligent resume analysis tool that helps job seekers optimize their resumes for Applicant Tracking Systems (ATS) and improve their chances of getting hired. The application uses AI to provide personalized feedback on resume content, structure, tone, and ATS compatibility based on specific job descriptions.

Key capabilities include:
- **ATS Optimization**: Analyzes resume compatibility with Applicant Tracking Systems
- **Personalized Feedback**: Provides targeted suggestions based on job descriptions
- **Multi-category Scoring**: Evaluates content, structure, tone, and skills
- **Visual Analysis**: Converts PDF resumes to images for comprehensive review
- **Progress Tracking**: Monitors application status and improvement over time

---

## ⚙️ Tech Stack

* **Framework:** React 19 with React Router v7
* **Language:** TypeScript
* **Styling:** Tailwind CSS
* **Backend:** Puter Cloud Platform
* **File Processing:** PDF.js for PDF conversion
* **State Management:** Zustand
* **File Upload:** React Dropzone
* **Build Tool:** Vite

---

## 💪 Key Features

👉 **Smart Resume Analysis:** AI-powered analysis of resume content, structure, and ATS compatibility  
👉 **Job-Specific Feedback:** Personalized recommendations based on job descriptions  
👉 **Multi-Dimensional Scoring:** Separate scores for ATS, tone, content, structure, and skills  
👉 **PDF Processing:** Automatic conversion of PDF resumes to images for analysis  
👉 **Secure File Storage:** Cloud-based file management with Puter  
👉 **Progress Tracking:** Monitor application status and resume improvements  
👉 **Modern UI:** Clean, responsive interface with intuitive navigation  
👉 **Real-time Processing:** Live status updates during analysis  

---

## 🚀 Quick Start

Get started locally with these steps:

### 🔧 Prerequisites

* [Node.js](https://nodejs.org/) (v18 or higher)
* [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
* [Git](https://git-scm.com/)

### 📁 Clone the Repo

```bash
git clone https://github.com/Yaswanth1320/ai-resume-analyzer.git
cd ai-resume-analyzer
```

### 📦 Install Dependencies

```bash
npm install
```

### 🚀 Run Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### 🏗️ Build for Production

```bash
npm run build
```

---

## 📁 Project Structure

```
ai-resume-analyzer/
├── app/
│   ├── components/          # React components
│   │   ├── FileUploader.tsx
│   │   ├── Navbar.tsx
│   │   ├── ResumeCard.tsx
│   │   └── ScoreCircle.tsx
│   ├── lib/                # Utility functions
│   │   ├── puter.ts        # Puter integration
│   │   └── utils.ts        # Helper functions
│   ├── routes/             # Application routes
│   │   ├── auth.tsx        # Authentication
│   │   ├── home.tsx        # Dashboard
│   │   └── upload.tsx      # Resume upload
│   └── root.tsx            # Root component
├── constants/              # Application constants
├── public/                 # Static assets
│   ├── icons/             # SVG icons
│   └── images/            # Image assets
├── types/                  # TypeScript type definitions
└── package.json           # Dependencies and scripts
```

---

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run typecheck` - Run TypeScript type checking

### Key Components

- **FileUploader**: Handles PDF file upload with drag-and-drop
- **ResumeCard**: Displays resume analysis results
- **ScoreCircle**: Visual representation of analysis scores
- **Navbar**: Application navigation

### AI Analysis Features

The application analyzes resumes across five key dimensions:

1. **ATS Compatibility**: Evaluates how well the resume passes through Applicant Tracking Systems
2. **Content Quality**: Assesses the relevance and impact of resume content
3. **Structure**: Reviews the organization and formatting of the resume
4. **Tone & Style**: Analyzes the professional tone and writing style
5. **Skills Assessment**: Evaluates the alignment of skills with job requirements

Each dimension provides:
- Numerical score (0-100)
- Specific improvement tips
- Detailed explanations for recommendations

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [Puter](https://puter.com/) for cloud infrastructure
- [React Router](https://reactrouter.com/) for routing
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [PDF.js](https://mozilla.github.io/pdf.js/) for PDF processing
