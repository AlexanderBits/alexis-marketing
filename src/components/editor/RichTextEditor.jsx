import React, { useEffect, useState } from 'react';

// Lazy import para evitar problemas de SSR (mesmo em Vite, evita hydration issues)
let ReactQuill;

export default function RichTextEditor({ value, onChange, placeholder }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    import('react-quill').then((mod) => {
      ReactQuill = mod.default;
      setLoaded(true);
    });
    // Importar o CSS do Quill
    import('react-quill/dist/quill.snow.css');
  }, []);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['blockquote'],
      ['clean'],
    ],
  };

  const formats = ['header', 'bold', 'italic', 'underline', 'strike', 'list', 'bullet', 'blockquote'];

  if (!loaded) {
    return (
      <div className="h-40 bg-slate-800 border border-slate-700 rounded-lg flex items-center justify-center">
        <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="quill-dark">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
      />
    </div>
  );
}
