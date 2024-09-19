

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-stone-50 w-full h-screen">
        {children}
    </div>
  );
}
