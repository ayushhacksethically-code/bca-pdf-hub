import std/[asynchttpserver, asyncdispatch, strutils, os, logging, uri]

let logger = newConsoleLogger(lvlInfo)
addHandler(logger)

proc getMimeType(filePath: string): string =
  let ext = filePath.split(".")[^1].toLowerAscii()
  case ext
  of "html", "htm": "text/html"
  of "css": "text/css"
  of "js": "application/javascript"
  of "json": "application/json"
  of "png": "image/png"
  of "jpg", "jpeg": "image/jpeg"
  of "gif": "image/gif"
  of "svg": "image/svg+xml"
  of "webp": "image/webp"
  of "ico": "image/x-icon"
  of "txt": "text/plain"
  of "pdf": "application/pdf"
  else: "application/octet-stream"

proc handleRequest(req: Request) {.async.} =
  var filePath = decodeUrl(req.url.path)

  if filePath == "/":
    filePath = "index.html"
  else:
    filePath = filePath.strip(chars = {'/'})

  # Allow relative paths (including ../) but block absolute paths
  if filePath.startsWith("/"):
    info("Blocked absolute path: " & filePath)
    await req.respond(Http400, "Invalid path")
    return

  info($req.reqMethod & " " & filePath)

  if fileExists(filePath):
    try:
      let content = readFile(filePath)
      let mimeType = getMimeType(filePath)
      let headers = newHttpHeaders([("Content-Type", mimeType)])
      await req.respond(Http200, content, headers)
      info("Served: " & filePath)
    except IOError as e:
      error("IO Error: " & e.msg)
      await req.respond(Http500, "Error reading file")
  else:
    warn("File not found: " & filePath)
    await req.respond(Http404, "404 - File not found")

proc main() =
  let port = Port(8081)   # <-- changed to 8081
  let server = newAsyncHttpServer()
  info("Starting server on port " & $(port.int))
  asyncCheck server.serve(port, handleRequest)
  runForever()

when isMainModule:
  main()