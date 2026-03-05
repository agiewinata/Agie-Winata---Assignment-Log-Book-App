
# Assignment Logbook API

A REST API built with Next.js for managing assignments.

---

## Getting Started

### Prerequisites
- Node.js
- npm

### Installation
```bash
npm install
npm run dev
```

Server runs at `http://localhost:3000`

---

## API Design Table

| No | Endpoint | Method | Description | Request Body | Success Response | Error Response |
|----|----------|--------|-------------|--------------|-----------------|----------------|
| 1 | `/api/assignments` | GET | Get all assignments | - | `200` - List of assignments | - |
| 2 | `/api/assignments` | POST | Create a new assignment | `title`, `subject`, `dueDate`, `description` | `201` - Created assignment | `400` - Missing required fields |
| 3 | `/api/assignments/:id` | GET | Get assignment by ID | - | `200` - Single assignment | `404` - Assignment not found |
| 4 | `/api/assignments/:id` | PUT | Update an assignment | `title`, `subject`, `dueDate`, `description` | `200` - Updated assignment | `404` - Not found, `400` - Missing fields |
| 5 | `/api/assignments/:id` | DELETE | Delete an assignment | - | `200` - Deleted assignment | `404` - Assignment not found |

