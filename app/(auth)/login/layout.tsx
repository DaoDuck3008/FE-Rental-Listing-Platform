import GuestGuard from "@/components/guard/guestGuard";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <GuestGuard>{children}</GuestGuard>
    </>
  );
}
