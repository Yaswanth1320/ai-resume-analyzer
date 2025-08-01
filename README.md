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
7. 📊 [AI Analysis](#ai-analysis)
8. 🤝 [Contributing](#contributing)

---

## 🧠 Introduction

**AI Resume Analyzer** is a cutting-edge resume optimization platform that leverages artificial intelligence to help job seekers create ATS-friendly resumes and maximize their chances of landing interviews. Built with modern web technologies, this application provides comprehensive resume analysis, personalized feedback, and actionable insights to improve your job application success rate.

### 🎯 **What Makes This Project Special**

- **AI-Powered Analysis**: Advanced machine learning algorithms analyze your resume across multiple dimensions
- **Job-Specific Feedback**: Tailored recommendations based on actual job descriptions and requirements
- **ATS Optimization**: Ensures your resume passes through Applicant Tracking Systems
- **Visual Resume Review**: Convert PDF resumes to images for comprehensive visual analysis
- **Real-time Processing**: Live status updates and instant feedback
- **Cloud-Based Storage**: Secure file management with Puter cloud platform

### 🚀 **Key Capabilities**

- **Smart Resume Analysis**: AI-powered analysis of resume content, structure, and ATS compatibility
- **Personalized Feedback**: Provides targeted suggestions based on specific job descriptions
- **Multi-Dimensional Scoring**: Separate scores for ATS, tone, content, structure, and skills
- **PDF Processing**: Automatic conversion of PDF resumes to images for analysis
- **Secure File Storage**: Cloud-based file management with Puter
- **Progress Tracking**: Monitor application status and resume improvements over time
- **Modern UI/UX**: Clean, responsive interface with intuitive navigation
- **Real-time Processing**: Live status updates during analysis

---

## ⚙️ Tech Stack

### **Frontend**
* **Framework:** React 19 with React Router v7
* **Language:** TypeScript for type safety
* **Styling:** Tailwind CSS for modern, responsive design
* **State Management:** Zustand for lightweight state management
* **File Upload:** React Dropzone for seamless file handling

### **Backend & Infrastructure**
* **Cloud Platform:** Puter Cloud Platform
* **File Processing:** PDF.js for robust PDF conversion
* **Build Tool:** Vite for fast development and building
* **Authentication:** Puter's built-in authentication system

### **Development Tools**
* **Package Manager:** npm
* **Type Checking:** TypeScript
* **Code Quality:** ESLint and Prettier (recommended)
* **Version Control:** Git

---

## 💪 Features

### 🎯 **Core Features**

#### **Smart Resume Analysis**
- AI-powered analysis of resume content, structure, and ATS compatibility
- Real-time processing with live status updates
- Comprehensive feedback across multiple dimensions

#### **Job-Specific Feedback**
- Personalized recommendations based on job descriptions
- Industry-specific optimization tips
- Role-targeted content suggestions

#### **Multi-Dimensional Scoring**
- **ATS Compatibility**: Evaluates resume parsing by Applicant Tracking Systems
- **Content Quality**: Assesses relevance and impact of resume content
- **Structure**: Reviews organization and formatting
- **Tone & Style**: Analyzes professional tone and writing style
- **Skills Assessment**: Evaluates skill alignment with job requirements

#### **Advanced PDF Processing**
- Automatic PDF to image conversion for visual analysis
- High-quality rendering with configurable settings
- Support for multi-page PDF documents
- Memory-efficient processing

### 🎨 **User Experience**

#### **Modern Interface**
- Clean, responsive design with Tailwind CSS
- Intuitive navigation and user flow
- Mobile-friendly responsive layout
- Smooth animations and transitions

#### **Visual Feedback**
- Interactive score circles and gauges
- Color-coded feedback indicators
- Progress tracking visualization
- Real-time status updates

#### **File Management**
- Drag-and-drop file upload
- Secure cloud storage
- Resume image preview
- PDF viewer integration

### 🔒 **Security & Performance**

#### **Data Security**
- Secure file storage with Puter cloud platform
- Encrypted data transmission
- User authentication and authorization
- Privacy-focused design

#### **Performance Optimization**
- Lazy loading of components
- Efficient PDF processing
- Optimized image rendering
- Fast build times with Vite

---

## 🚀 Quick Start

Get started with AI Resume Analyzer in minutes:

### 🔧 **Prerequisites**

* [Node.js](https://nodejs.org/) (v18 or higher)
* [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
* [Git](https://git-scm.com/)

### 📁 **Clone the Repository**

```bash
git clone https://github.com/Yaswanth1320/ai-resume-analyzer.git
cd ai-resume-analyzer
```

### 📦 **Install Dependencies**

```bash
npm install
```

### 🚀 **Run Development Server**

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### 🏗️ **Build for Production**

```bash
npm run build
```

### 🚀 **Start Production Server**

```bash
npm run start
```

---

## 📁 Project Structure

```
ai-resume-analyzer/
├── app/
│   ├── components/          # React components
│   │   ├── Accordion.tsx   # Collapsible content sections
│   │   ├── ATS.tsx         # ATS analysis component
│   │   ├── Details.tsx     # Detailed feedback component
│   │   ├── FileUploader.tsx # File upload with drag-drop
│   │   ├── Navbar.tsx      # Navigation component
│   │   ├── ResumeCard.tsx  # Resume preview card
│   │   ├── ScoreBadge.tsx  # Score display component
│   │   ├── ScoreCircle.tsx # Circular score indicator
│   │   ├── ScoreGauge.tsx  # Gauge-style score display
│   │   └── Summary.tsx     # Analysis summary component
│   ├── lib/                # Utility functions
│   │   ├── pdf2image.ts    # PDF to image conversion
│   │   ├── puter.ts        # Puter cloud integration
│   │   └── utils.ts        # Helper functions
│   ├── routes/             # Application routes
│   │   ├── auth.tsx        # Authentication page
│   │   ├── home.tsx        # Dashboard/home page
│   │   ├── resume.tsx      # Resume analysis view
│   │   ├── upload.tsx      # Resume upload page
│   │   └── wipe.tsx        # Data cleanup utility
│   ├── app.css             # Global styles
│   └── root.tsx            # Root component
├── constants/              # Application constants
│   └── index.ts           # AI prompts and configurations
├── public/                 # Static assets
│   ├── icons/             # SVG icons
│   ├── images/            # Image assets
│   └── pdf.worker.min.mjs # PDF.js worker file
├── types/                  # TypeScript type definitions
│   ├── index.d.ts         # Global type definitions
│   └── puter.d.ts         # Puter-specific types
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── vite.config.ts         # Vite build configuration
└── README.md              # Project documentation
```

---

## 🔧 Development

### **Available Scripts**

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run typecheck` - Run TypeScript type checking

### **Key Components**

- **FileUploader**: Handles PDF file upload with drag-and-drop functionality
- **ResumeCard**: Displays resume analysis results in card format
- **ScoreCircle**: Visual representation of analysis scores
- **Navbar**: Application navigation and user interface
- **ATS**: ATS-specific analysis and recommendations
- **Summary**: Overall analysis summary and insights

### **Development Guidelines**

1. **TypeScript**: All code should be properly typed
2. **Component Structure**: Use functional components with hooks
3. **Styling**: Use Tailwind CSS classes for styling
4. **File Organization**: Keep components modular and well-organized
5. **Error Handling**: Implement proper error boundaries and user feedback

---

## 📊 AI Analysis

The application provides comprehensive resume analysis across five key dimensions:

### **1. ATS Compatibility (0-100)**
Evaluates how well your resume passes through Applicant Tracking Systems:
- Keyword optimization
- Format compatibility
- Parsing accuracy
- Industry-specific requirements

### **2. Content Quality (0-100)**
Assesses the relevance and impact of your resume content:
- Achievement descriptions
- Quantified results
- Professional language
- Content relevance to job requirements

### **3. Structure (0-100)**
Reviews the organization and formatting of your resume:
- Layout consistency
- Section organization
- Visual hierarchy
- Professional formatting

### **4. Tone & Style (0-100)**
Analyzes the professional tone and writing style:
- Professional language
- Confidence level
- Clarity and conciseness
- Industry-appropriate tone

### **5. Skills Assessment (0-100)**
Evaluates the alignment of skills with job requirements:
- Skill relevance
- Technical proficiency
- Soft skills integration
- Industry-specific skills

### **Analysis Features**
- **Numerical Scoring**: Each dimension receives a score from 0-100
- **Specific Tips**: Actionable improvement suggestions
- **Detailed Explanations**: In-depth reasoning for recommendations
- **Job-Specific Feedback**: Tailored advice based on job descriptions

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### **Getting Started**

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Test thoroughly
5. Commit your changes (`git commit -m 'Add some amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### **Development Guidelines**

- Follow the existing code style and conventions
- Add proper TypeScript types
- Include tests for new features
- Update documentation as needed
- Ensure responsive design for mobile devices

### **Feature Requests**

We're always looking for new ideas! Feel free to:
- Open an issue for bug reports
- Suggest new features
- Improve documentation
- Enhance the user experience

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [Puter](https://puter.com/) for cloud infrastructure and file management
- [React Router](https://reactrouter.com/) for seamless client-side routing
- [Tailwind CSS](https://tailwindcss.com/) for modern, utility-first styling
- [PDF.js](https://mozilla.github.io/pdf.js/) for robust PDF processing
- [React Dropzone](https://react-dropzone.js.org/) for file upload functionality
- [Zustand](https://github.com/pmndrs/zustand) for lightweight state management

---

## 📈 **Future Roadmap**

### **Planned Features**
- **Resume Comparison**: Compare multiple versions side-by-side
- **Job Application Tracker**: Track application status and follow-ups
- **Cover Letter Generator**: AI-powered cover letter creation
- **Skills Gap Analysis**: Identify missing skills and learning paths
- **Interview Preparation**: Mock interviews and question banks
- **Salary Negotiation Assistant**: Market rate analysis and negotiation tips
- **Mobile App**: Native mobile experience
- **Advanced Analytics**: Detailed career insights and trends

### **Technical Improvements**
- **Performance Optimization**: Faster loading and processing
- **Enhanced AI**: More sophisticated analysis algorithms
- **Better UX**: Improved user interface and experience
- **Integration APIs**: Connect with job boards and LinkedIn
- **Data Export**: Export resume data and analytics

---

## 📞 **Support & Contact**

- **Issues**: [GitHub Issues](https://github.com/Yaswanth1320/ai-resume-analyzer/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Yaswanth1320/ai-resume-analyzer/discussions)
- **Email**: [Your Email]

---

## ⭐ **Star the Repository**

If this project helps you in your job search journey, please consider giving it a star! It motivates us to keep improving and adding new features.

---

## PDF to Image Conversion

The application includes a robust PDF to image conversion system using the official Mozilla PDF.js library.

### Functions

#### `convertPdfToImage(file, options)`

Converts a PDF file to a PNG image.

**Parameters:**
- `file` (File): The PDF file to convert
- `options` (object, optional):
  - `scale` (number): Rendering scale factor (default: 2.0)
  - `pageNumber` (number): Page to convert (default: 1)
  - `quality` (number): Image quality 0-1 (default: 1.0)

**Returns:**
```typescript
Promise<PdfConversionResult>
```

**Example:**
```typescript
import { convertPdfToImage } from '~/lib/pdf2image';

const result = await convertPdfToImage(file, {
  scale: 2.0,
  pageNumber: 1,
  quality: 1.0
});

if (result.file) {
  // Use the converted image
  console.log(result.imageUrl);
}
```

#### `convertPdfToMultipleImages(file, options)`

Converts multiple pages of a PDF to images.

**Parameters:**
- `file` (File): The PDF file to convert
- `options` (object, optional):
  - `scale` (number): Rendering scale factor (default: 2.0)
  - `quality` (number): Image quality 0-1 (default: 1.0)
  - `startPage` (number): First page to convert (default: 1)
  - `endPage` (number): Last page to convert (default: all pages)

**Returns:**
```typescript
Promise<PdfConversionResult[]>
```

### Technical Details

- **Library**: Uses Mozilla PDF.js v5.4.54
- **Worker**: Configured to use `/pdf.worker.min.mjs` (must match library version)
- **Format**: Outputs high-quality PNG images
- **Memory Management**: Proper cleanup of PDF documents and resources
- **Error Handling**: Comprehensive error handling with detailed messages
- **TypeScript**: Fully typed with proper interfaces

### Version Compatibility

**Important**: The worker file (`/pdf.worker.min.mjs`) must match the PDF.js library version. If you encounter version mismatch errors, update the worker file:

```bash
cp node_modules/pdfjs-dist/build/pdf.worker.min.mjs public/pdf.worker.min.mjs
```

### Performance Features

- **Lazy Loading**: PDF.js library is loaded only when needed
- **Memory Efficient**: Uses TypedArrays for better memory management
- **High Quality**: Configurable rendering scale and quality
- **Background Rendering**: White background for better visibility

### Error Handling

The functions provide detailed error messages for common issues:
- Invalid page numbers
- Failed canvas context creation
- PDF loading errors
- Rendering failures
