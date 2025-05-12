// app/loading.js
export default function GlobalLoading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <span className="text-xl">Loading...</span>
      {/* Ya spinner ya animation bhi laga sakte ho */}
    </div>
  );
}
