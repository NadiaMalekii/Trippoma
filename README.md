# Trippoma

<p align="center">
  <img src="https://img.shields.io/badge/.NET-10-512BD4?style=for-the-badge&logo=dotnet&logoColor=white" alt=".NET" />
  <img src="https://img.shields.io/badge/React-Latest-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/Vite-Latest-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" />
  <img src="https://img.shields.io/badge/Architecture-Clean-success?style=for-the-badge" alt="Clean Architecture" />
</p>

**Travel / Places discovery platform**

Full-stack application for exploring places, categories, reviews, favorites, and more.  
Built with **Clean Architecture** on the backend and a modern **React + Vite + Tailwind** frontend.

---

## Features

- Browse places by category
- Place details with images
- User reviews
- Favorites system
- Clean Architecture backend (Domain · Application · Infrastructure · WebApi)
- Modern React frontend with Tailwind CSS

---

## Tech Stack

| Layer        | Technology                              |
|--------------|-----------------------------------------|
| Backend      | ASP.NET Core (.NET 10)                  |
| Architecture | Clean Architecture + CQRS style         |
| Frontend     | React + Vite + Tailwind CSS             |
| Icons        | Lucide React                            |

---

## Project Structure
Trippoma/
├── src/
│   ├── backend/
│   │   ├── Trippoma.Domain
│   │   ├── Trippoma.Application
│   │   ├── Trippoma.Infrastructure
│   │   └── Trippoma.WebApi
│   └── frontend/               # React + Vite + Tailwind
├── Trippoma.slnx
└── README.md
