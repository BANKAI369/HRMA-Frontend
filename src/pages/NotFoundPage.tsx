// src/pages/NotFoundPage.tsx
export default function NotFoundPage() {
  return (
    <main className="min-h-screen bg-(--bg) p-4 text-[13px] text-(--text)">
      <h1 className="text-xl font-semibold">404 - Not Found</h1>
      <p className="mt-2">The page you requested does not exist.</p>
      <a href="/" className="mt-4 inline-block text-(--primary) hover:underline">
        Return to Home
      </a>
    </main>
  );
}


