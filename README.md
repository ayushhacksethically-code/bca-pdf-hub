# BCA PDF Hub

A simple web portal serving BCA semester syllabus, resources, assignments, and previous year questions (PYQs). It is powered by a custom static file server written in Nim.

## Tech Stack
- **Frontend**: HTML5, CSS3 (Vanilla CSS with a modern theme)
- **Backend**: Nim standard library (`asynchttpserver`, `asyncdispatch`)
  
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
