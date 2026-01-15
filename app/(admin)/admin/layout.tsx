import AuthGuard from "@/components/guard/authGuard";
import RoleGuard from "@/components/guard/roleGuard";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <RoleGuard allowedRoles={["ADMIN"]}>{children}</RoleGuard>
    </AuthGuard>
  );
}
