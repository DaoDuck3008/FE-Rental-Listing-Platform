import ListingCard2 from "./listingCard2";

export default function RecommendedListings() {
  return (
    <div className="mt-16 mb-10 flex flex-col gap-6">
      <h2 className="text-2xl font-bold text-slate-900">
        Nhà tương tự tại Quận 1
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <ListingCard2
          title="Căn hộ Loft cao cấp trung tâm"
          cost="2.400.000"
          address="123 Đường Hai Bà Trưng, Quận 1"
          imgUrl="/HomePage/Listing1.png"
          beds={2}
          baths={2}
          status={null}
        />
        <ListingCard2
          title="Căn hộ Loft cao cấp trung tâm"
          cost="2.400.000"
          address="123 Đường Hai Bà Trưng, Quận 1"
          imgUrl="/HomePage/Listing1.png"
          beds={2}
          baths={2}
          status={null}
        />
        <ListingCard2
          title="Căn hộ Loft cao cấp trung tâm"
          cost="2.400.000"
          address="123 Đường Hai Bà Trưng, Quận 1"
          imgUrl="/HomePage/Listing1.png"
          beds={2}
          baths={2}
          status={null}
        />
        <ListingCard2
          title="Căn hộ Loft cao cấp trung tâm"
          cost="2.400.000"
          address="123 Đường Hai Bà Trưng, Quận 1"
          imgUrl="/HomePage/Listing1.png"
          beds={2}
          baths={2}
          status={null}
        />
      </div>
    </div>
  );
}
