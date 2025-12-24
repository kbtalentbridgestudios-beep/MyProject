// CandidateGallery.jsx (Photos / Videos / Audio / Documents)
import React, { useEffect, useState, useRef } from "react";

/* Detect File Type */
function detectType(mime) {
  if (!mime) return "document";
  if (mime.startsWith("image/")) return "photo";
  if (mime.startsWith("video/")) return "video";
  if (mime.startsWith("audio/")) return "audio";
  return "document";
}

export default function CandidateGallery({
  candidate,
  setCandidate,
  BASE_URL,
  token,
}) {
  /* ------------------ STATE ------------------ */
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [gallery, setGallery] = useState([]);
  const mountedRef = useRef(true);

  /* -------------------------------------------------
     Load gallery from candidate
  ------------------------------------------------- */
  useEffect(() => {
    mountedRef.current = true;

    if (candidate?.gallery) {
      setGallery([...candidate.gallery].reverse());
    } else {
      setGallery([]);
    }

    return () => {
      mountedRef.current = false;
      selectedFiles.forEach((f) => f.preview && URL.revokeObjectURL(f.preview));
    };
  }, [candidate]); // eslint-disable-line

  /* -------------------------------------------------
     Fetch Profile
  ------------------------------------------------- */
  const fetchProfile = async () => {
    if (!token) return;

    try {
      const res = await fetch(`${BASE_URL}/api/candidate/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) return;
      const data = await res.json();

      if (mountedRef.current) {
        setCandidate(data);
        if (data.gallery) setGallery([...data.gallery].reverse());
      }
    } catch (err) {
      console.error(err);
    }
  };

  /* -------------------------------------------------
     Select Files
  ------------------------------------------------- */
  const onFilesSelected = (fileList) => {
    const arr = Array.from(fileList).map((file) => {
      const mime = file.type;
      const preview =
        mime.startsWith("image/") ||
        mime.startsWith("video/") ||
        mime.startsWith("audio/")
          ? URL.createObjectURL(file)
          : null;

      return {
        id: `${file.name}-${Date.now()}`,
        file,
        preview,
        type: detectType(mime),
        progress: 0,
        xhr: null,
        error: null,
      };
    });

    setSelectedFiles((prev) => [...prev, ...arr]);
  };

  /* -------------------------------------------------
     Remove From Pending Upload
  ------------------------------------------------- */
  const removeSelected = (id) => {
    setSelectedFiles((prev) => {
      const found = prev.find((f) => f.id === id);
      if (found?.preview) URL.revokeObjectURL(found.preview);
      if (found?.xhr?.abort) found.xhr.abort();

      return prev.filter((f) => f.id !== id);
    });
  };

  /* -------------------------------------------------
     Upload All Files Sequentially
  ------------------------------------------------- */
  const uploadAll = async () => {
    if (!selectedFiles.length) return;

    setUploading(true);

    for (const entry of [...selectedFiles]) {
      if (entry.error) continue;

      const fileType = entry.type;
      const uploadType =
        fileType === "photo"
          ? "photoPost"
          : fileType === "video"
          ? "video"
          : fileType === "audio"
          ? "audio"
          : "document";

      await uploadSingle(entry, uploadType);
    }

    setUploading(false);
  };

  /* Upload Single File */
  const uploadSingle = (entry, uploadType) =>
    new Promise((resolve) => {
      const form = new FormData();
      form.append("file", entry.file);

      if (entry.type === "photo") form.append("purpose", "post");

      const xhr = new XMLHttpRequest();
      entry.xhr = xhr;

      xhr.upload.onprogress = (e) => {
        if (!e.lengthComputable) return;

        const pct = Math.round((e.loaded / e.total) * 100);
        setSelectedFiles((prev) =>
          prev.map((f) => (f.id === entry.id ? { ...f, progress: pct } : f))
        );
      };

      xhr.onreadystatechange = async () => {
        if (xhr.readyState !== 4) return;

        if (xhr.status >= 200 && xhr.status < 300) {
          let response = {};
          try {
            response = JSON.parse(xhr.responseText);
          } catch {}

          if (response.user) {
            setCandidate(response.user);
            setGallery([...response.user.gallery].reverse());
          } else {
            await fetchProfile();
          }

          setSelectedFiles((prev) =>
            prev.filter((f) => {
              if (f.id === entry.id && f.preview)
                URL.revokeObjectURL(f.preview);
              return f.id !== entry.id;
            })
          );
        } else {
          setSelectedFiles((prev) =>
            prev.map((f) =>
              f.id === entry.id ? { ...f, error: `Failed (${xhr.status})` } : f
            )
          );
        }

        resolve();
      };

      xhr.open("POST", `${BASE_URL}/api/v1/upload/Candidate/${uploadType}`);
      xhr.setRequestHeader("Authorization", `Bearer ${token}`);
      xhr.send(form);
    });

  /* -------------------------------------------------
     🔥 FINAL FIX: Open RAW Cloudinary Docs Using Correct MIME
  ------------------------------------------------- */
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

      const response = await fetch(item.url);
      const data = await response.arrayBuffer();

      const blob = new Blob([data], { type: mime });
      const blobUrl = URL.createObjectURL(blob);

      window.open(blobUrl, "_blank");
    } catch (err) {
      console.error("Failed to open document:", err);
      alert("Unable to open document.");
    }
  };

  /* -------------------------------------------------
     Categorized Gallery
  ------------------------------------------------- */
  const photos = gallery.filter((g) => g.type === "photo");
  const videos = gallery.filter((g) => g.type === "video");
  const audios = gallery.filter((g) => g.type === "audio");
  const documents = gallery.filter((g) => g.type === "document");

  /* -------------------------------------------------
     UI START
  ------------------------------------------------- */
  return (
    <section className="mb-16">
      <h2 className="text-2xl font-bold mb-6">My Gallery</h2>

      {/* ---------------- Upload Panel ---------------- */}
      <div className="bg-white p-4 rounded shadow-sm mb-10">
        <label className="cursor-pointer inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded">
          Select Files
          <input
            type="file"
            multiple
            className="hidden"
            onChange={(e) => onFilesSelected(e.target.files)}
          />
        </label>

        <button
          onClick={uploadAll}
          disabled={!selectedFiles.length || uploading}
          className="ml-3 px-4 py-2 rounded bg-green-600 text-white disabled:opacity-50"
        >
          {uploading ? "Uploading…" : "Upload All"}
        </button>

        {/* Pending Uploads */}
        {selectedFiles.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            {selectedFiles.map((s) => (
              <div key={s.id} className="bg-gray-50 p-3 rounded border">
                <div className="flex justify-between">
                  <div>
                    <div className="font-medium">{s.file.name}</div>
                    <div className="text-xs text-gray-500">
                      {(s.file.size / 1024 / 1024).toFixed(2)} MB
                    </div>
                  </div>

                  <button
                    className="text-red-600"
                    onClick={() => removeSelected(s.id)}
                  >
                    Remove
                  </button>
                </div>

                {s.preview && s.type === "photo" && (
                  <img
                    src={s.preview}
                    className="rounded mt-2 w-full h-48 object-cover"
                  />
                )}

                {s.preview && s.type === "video" && (
                  <video
                    controls
                    src={s.preview}
                    className="rounded mt-2 w-full h-48 object-cover"
                  />
                )}

                {s.preview && s.type === "audio" && (
                  <audio controls className="w-full mt-2" src={s.preview} />
                )}

                <div className="mt-2 text-sm">Progress: {s.progress}%</div>
                <div className="w-full bg-gray-200 h-2 rounded">
                  <div
                    className="h-2 bg-blue-600 rounded"
                    style={{ width: `${s.progress}%` }}
                  ></div>
                </div>

                {s.error && (
                  <p className="text-red-600 text-sm mt-2">{s.error}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* -------------------------------------------------
         GALLERY SECTIONS
      ------------------------------------------------- */}

      {/* PHOTOS */}
      <h3 className="text-xl font-semibold mb-3">Photos</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
        {photos.length ? (
          photos.map((item, idx) => (
            <img
              key={idx}
              src={item.url}
              className="rounded w-full h-40 object-cover border"
            />
          ))
        ) : (
          <p className="text-gray-600 col-span-full">No photos uploaded.</p>
        )}
      </div>

      {/* VIDEOS */}
      <h3 className="text-xl font-semibold mb-3">Videos</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        {videos.length ? (
          videos.map((item, idx) => (
            <video
              key={idx}
              controls
              src={item.url}
              className="rounded w-full h-52 object-cover bg-black"
            />
          ))
        ) : (
          <p className="text-gray-600 col-span-full">No videos uploaded.</p>
        )}
      </div>

      {/* AUDIO */}
      <h3 className="text-xl font-semibold mb-3">Audio</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        {audios.length ? (
          audios.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-3 rounded shadow-sm border flex items-center gap-3"
            >
              <audio controls src={item.url} className="w-full" />
            </div>
          ))
        ) : (
          <p className="text-gray-600 col-span-full">No audio files uploaded.</p>
        )}
      </div>

      {/* DOCUMENTS */}
      <h3 className="text-xl font-semibold mb-3">Documents</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {documents.length ? (
          documents.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-3 rounded shadow-sm border flex justify-between items-center"
            >
              <span>{item.originalName}</span>

              <button
                onClick={() => openDocument(item)}
                className="text-indigo-600 underline"
              >
                Open
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-600 col-span-full">No documents uploaded.</p>
        )}
      </div>
    </section>
  );
}
