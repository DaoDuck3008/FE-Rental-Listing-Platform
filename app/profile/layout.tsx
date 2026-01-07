import AuthGuard from "@/components/guard/authGuard";

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AuthGuard>{children}</AuthGuard>
    </>
  );
}
