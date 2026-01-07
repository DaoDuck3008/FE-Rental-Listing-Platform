import GuestGuard from "@/components/guard/guestGuard";

export default function RegisterLayout({
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
