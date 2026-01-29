import Link from "next/link";

interface Breadcrumb {
  province: {
    label: string;
    href: string;
  };
  ward: {
    label: string;
    href: string;
  };
  title: string;
}

export default function ListingBreadcrumb({
  province,
  ward,
  title,
}: Breadcrumb) {
  return (
    <>
      <div className="flex flex-wrap gap-2 py-4 text-sm">
        <Link
          className="text-[#92adc9] hover:text-primary font-medium"
          href="#"
        >
          Trang chủ
        </Link>
        <span className="text-[#92adc9] font-medium">/</span>
        <Link
          className="text-[#92adc9] hover:text-primary font-medium"
          href={province.href}
        >
          {province.label}
        </Link>
        <span className="text-[#92adc9] font-medium">/</span>
        <Link
          className="text-[#92adc9] hover:text-primary font-medium"
          href={ward.href}
        >
          {ward.label}
        </Link>
        <span className="text-[#92adc9] font-medium">/</span>
        <span className="text-slate-900 font-medium">{title}</span>
      </div>
    </>
  );
}
