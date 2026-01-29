export default function Avatar({
  avatar,
  name,
}: {
  avatar: string | null;
  name: string;
}) {
  return (
    <div>
      {avatar && (
        <div className=" rounded-full bg-slate-200 flex items-center justify-center  overflow-hidden">
          <img src={avatar} className="object-cover size-12" />
        </div>
      )}
      {!avatar && (
        <div className="size-12 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold uppercase overflow-hidden">
          {name.charAt(0) || "U"}
        </div>
      )}
    </div>
  );
}
