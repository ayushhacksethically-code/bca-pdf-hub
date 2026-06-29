# BCA PDF Hub

A simple web portal serving BCA semester syllabus, resources, assignments, and previous year questions (PYQs). It is powered by a custom static file server written in Nim.

## Tech Stack
- **Frontend**: HTML5, CSS3 (Vanilla CSS with a modern theme)
- **Backend**: Nim standard library (`asynchttpserver`, `asyncdispatch`)

## Getting Started

### Running the Pre-compiled Server
If you already have the compiled executable `server` (or compile it yourself), you can run it directly:
```bash
./server
```
The server will start listening on port `8081`. Open your browser and navigate to `http://localhost:8081`.

### Running with Nim
If you have Nim installed, you can compile and run the server in a single command:
```bash
nim c -r server.nim
```

### Compiling for Production
To compile the server with optimization:
```bash
nim c -d:release server.nim
```

## Directory Structure
- `index.html`: Main home portal
- `semester1.html`: 1st Semester resources
- `semester2.html`: 2nd Semester resources
- `style.css`: Stylesheet for the portal
- `server.nim`: Nim server implementation
- `assignment/`: Assignments PDFs directory
- `pdfs/`: Syllabus PDFs directory
- `pyqs/`: Previous Year Questions directory
- `Extra_Resource/`: Additional resources
- `archive/`: Legacy / backup files (archived templates, unused code)
