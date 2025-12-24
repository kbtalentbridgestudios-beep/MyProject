// CandidateGalleryView.jsx (Read-only Admin Viewer)
import React from "react";

// Same type detection used by CandidateGallery.jsx
function detectType(mime) {
  if (!mime) return "document";
  if (mime.startsWith("image/")) return "photo";
  if (mime.startsWith("video/")) return "video";
  if (mime.startsWith("audio/")) return "audio";
  return "document";
}

export default function CandidateGalleryView({ uploads = [] }) {
  // Normalize all items so BOTH systems work:
  const normalized = uploads.map((item) => ({
    url: item.url,
    originalName: item.originalName,
    type: item.type || detectType(item.mimeType || ""),
    mimeType: item.mimeType,
  }));

  const photos = normalized.filter((u) => u.type === "photo");
  const videos = normalized.filter((u) => u.type === "video");
  const audios = normalized.filter((u) => u.type === "audio");
  const documents = normalized.filter((u) => u.type === "document");

  // SAME document opening logic as CandidateGallery.jsx
  const openDocument = async (item) => {
    try {
      const ext = item.originalName?.split(".").pop().toLowerCase() || "pdf";
      const mime =
        ext === "pdf"
          ? "application/pdf"
          : ext === "docx"
          ? "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          : ext === "doc"
          ? "application/msword"
          : ext === "pptx"
          ? "application/vnd.openxmlformats-officedocument.presentationml.presentation"
          : ext === "xlsx"
          ? "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          : "application/octet-stream";

      const res = await fetch(item.url);
      const buf = await res.arrayBuffer();
      const blob = new Blob([buf], { type: mime });
      const blobUrl = URL.createObjectURL(blob);
      window.open(blobUrl, "_blank");
    } catch (e) {
      alert("Unable to open document file");
    }
  };

  return (
    <div className="space-y-6">

      {/* PHOTOS */}
      <div>
        <h4 className="font-semibold mb-2">Photos</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {photos.length ? (
            photos.map((p, i) => (
              <img
                key={i}
                src={p.url}
                className="h-32 w-full object-cover rounded border"
              />
            ))
          ) : (
            <p className="text-gray-500 text-sm col-span-full">
              No photos uploaded.
            </p>
          )}
        </div>
      </div>

      {/* VIDEOS */}
      <div>
        <h4 className="font-semibold mb-2">Videos</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {videos.length ? (
            videos.map((v, i) => (
              <video
                key={i}
                controls
                src={v.url}
                className="rounded w-full h-44 object-cover bg-black"
              />
            ))
          ) : (
            <p className="text-gray-500 text-sm">No videos uploaded.</p>
          )}
        </div>
      </div>

      {/* AUDIO */}
      <div>
        <h4 className="font-semibold mb-2">Audio</h4>
        {audios.length ? (
          audios.map((a, i) => (
            <audio key={i} controls src={a.url} className="w-full" />
          ))
        ) : (
          <p className="text-gray-500 text-sm">No audio files uploaded.</p>
        )}
      </div>

      {/* DOCUMENTS */}
      <div>
        <h4 className="font-semibold mb-2">Documents</h4>
        {documents.length ? (
          documents.map((d, i) => (
            <div
              key={i}
              className="p-2 border rounded flex justify-between items-center"
            >
              <span className="text-sm">{d.originalName || "Document"}</span>

              <button
                onClick={() => openDocument(d)}
                className="text-indigo-600 underline text-sm"
              >
                Open
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No documents uploaded.</p>
        )}
      </div>

    </div>
  );
}
