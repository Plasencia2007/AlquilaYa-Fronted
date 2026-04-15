export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <div className="w-full max-w-md animate-fade-in">
        <div className="flex items-center justify-center gap-2 mb-10 transition-transform hover:scale-105">
          <span className="text-3xl font-black tracking-tighter text-primary">
            Alquila<span className="text-primary-container">Ya</span>
          </span>
        </div>
        {children}
      </div>
    </div>
  );
}

