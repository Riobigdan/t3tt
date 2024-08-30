export default function Layer2Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="h-full w-full text-blue-500">Layout 2</div>
      {children}
    </div>
  );
}
