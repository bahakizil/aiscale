'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface MediaFile {
  name: string;
  url: string;
  size: number;
  createdAt: string;
  modifiedAt: string;
}

export default function MediaLibraryPage() {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState<'images' | 'videos' | 'documents'>('images');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [selectedFile, setSelectedFile] = useState<MediaFile | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    fetchFiles();
  }, [selectedFolder]);

  const fetchFiles = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/media/list?folder=${selectedFolder}`);
      if (!response.ok) throw new Error('Failed to fetch files');
      const data = await response.json();
      setFiles(data.files || []);
    } catch (error) {
      console.error('Error fetching files:', error);
      setMessage({ type: 'error', text: 'Dosyalar yüklenemedi' });
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', selectedFolder);

      const response = await fetch('/api/media/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Upload failed');
      }

      setMessage({ type: 'success', text: '✅ Dosya başarıyla yüklendi!' });
      fetchFiles();

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error: any) {
      console.error('Error uploading file:', error);
      setMessage({ type: 'error', text: error.message || 'Dosya yüklenemedi' });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (filename: string) => {
    if (!confirm('Bu dosyayı silmek istediğinizden emin misiniz?')) return;

    try {
      const response = await fetch(`/api/media/delete?filename=${filename}&folder=${selectedFolder}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Delete failed');

      setMessage({ type: 'success', text: '✅ Dosya silindi' });
      setSelectedFile(null);
      fetchFiles();
    } catch (error) {
      console.error('Error deleting file:', error);
      setMessage({ type: 'error', text: 'Dosya silinemedi' });
    }
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    setMessage({ type: 'success', text: '✅ URL kopyalandı!' });
    setTimeout(() => setMessage(null), 2000);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gradient-to-r from-gray-800 to-gray-900 border-b border-gray-700 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-6">
              <button
                onClick={() => router.push('/admin/dashboard-v2')}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ← Geri
              </button>
              <h1 className="text-2xl font-bold text-transparent bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text">
                📁 Medya Kütüphanesi
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleUpload}
                className="hidden"
                accept={selectedFolder === 'images' ? 'image/*' : selectedFolder === 'videos' ? 'video/*' : '.pdf,.doc,.docx'}
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="px-4 py-2 bg-teal-600 hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg text-sm transition-colors font-semibold"
              >
                {uploading ? '📤 Yükleniyor...' : '📤 Dosya Yükle'}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Message Banner */}
      {message && (
        <div className={`${
          message.type === 'success'
            ? 'bg-green-500/10 border-green-500/50 text-green-400'
            : 'bg-red-500/10 border-red-500/50 text-red-400'
        } border-b px-4 py-3 text-center text-sm font-medium`}>
          {message.text}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Folder Tabs */}
        <div className="mb-6">
          <div className="flex gap-2 bg-gray-800 p-2 rounded-lg inline-flex">
            {(['images', 'videos', 'documents'] as const).map((folder) => (
              <button
                key={folder}
                onClick={() => setSelectedFolder(folder)}
                className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedFolder === folder
                    ? 'bg-teal-600 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
              >
                {folder === 'images' && '🖼️ Görseller'}
                {folder === 'videos' && '🎥 Videolar'}
                {folder === 'documents' && '📄 Dökümanlar'}
                <span className="ml-2 text-xs opacity-75">({files.length})</span>
              </button>
            ))}
          </div>
        </div>

        {/* File Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto mb-4"></div>
              <div className="text-white text-xl">Yükleniyor...</div>
            </div>
          </div>
        ) : files.length === 0 ? (
          <div className="bg-gray-800 rounded-xl p-12 text-center border border-gray-700">
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-white text-xl font-semibold mb-2">Henüz dosya yok</h3>
            <p className="text-gray-400 mb-6">İlk dosyanızı yüklemek için yukarıdaki butona tıklayın</p>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-semibold transition-colors"
            >
              📤 İlk Dosyayı Yükle
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {files.map((file) => (
              <div
                key={file.name}
                onClick={() => setSelectedFile(file)}
                className={`bg-gray-800 rounded-lg border-2 transition-all cursor-pointer hover:border-teal-500/50 ${
                  selectedFile?.name === file.name ? 'border-teal-500' : 'border-gray-700'
                }`}
              >
                <div className="aspect-square bg-gray-900 rounded-t-lg relative overflow-hidden">
                  {selectedFolder === 'images' ? (
                    <Image
                      src={file.url}
                      alt={file.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <span className="text-5xl">
                        {selectedFolder === 'videos' ? '🎥' : '📄'}
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <p className="text-xs text-white truncate font-medium">{file.name}</p>
                  <p className="text-xs text-gray-500 mt-1">{formatFileSize(file.size)}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* File Details Sidebar */}
        {selectedFile && (
          <div className="fixed right-0 top-16 bottom-0 w-80 bg-gray-800 border-l border-gray-700 shadow-2xl overflow-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-semibold">Dosya Detayları</h3>
                <button
                  onClick={() => setSelectedFile(null)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              {/* Preview */}
              <div className="mb-4 bg-gray-900 rounded-lg p-4">
                {selectedFolder === 'images' && (
                  <div className="relative w-full aspect-square">
                    <Image
                      src={selectedFile.url}
                      alt={selectedFile.name}
                      fill
                      className="object-contain"
                      sizes="320px"
                    />
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="space-y-3 mb-6">
                <div>
                  <label className="text-xs text-gray-400">Dosya Adı</label>
                  <p className="text-sm text-white break-all">{selectedFile.name}</p>
                </div>
                <div>
                  <label className="text-xs text-gray-400">Boyut</label>
                  <p className="text-sm text-white">{formatFileSize(selectedFile.size)}</p>
                </div>
                <div>
                  <label className="text-xs text-gray-400">Yüklenme Tarihi</label>
                  <p className="text-sm text-white">
                    {new Date(selectedFile.createdAt).toLocaleDateString('tr-TR')}
                  </p>
                </div>
                <div>
                  <label className="text-xs text-gray-400 mb-1 block">URL</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={selectedFile.url}
                      readOnly
                      className="flex-1 text-xs bg-gray-900 text-gray-300 px-3 py-2 rounded border border-gray-700"
                    />
                    <button
                      onClick={() => copyToClipboard(selectedFile.url)}
                      className="px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded text-xs transition-colors"
                    >
                      📋
                    </button>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2">
                <button
                  onClick={() => window.open(selectedFile.url, '_blank')}
                  className="w-full px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-sm transition-colors"
                >
                  🔗 Yeni Sekmede Aç
                </button>
                <button
                  onClick={() => handleDelete(selectedFile.name)}
                  className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm transition-colors"
                >
                  🗑️ Sil
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
