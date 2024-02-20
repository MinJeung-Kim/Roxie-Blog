export default function Skeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <div className="space-y-4" key={index}>
          <div className="h-40 rounded-xl animate-highlight" />
          <div className="w-3/4 h-8 rounded animate-highlight" />
          <div className="w-1/2 h-8 rounded animate-highlight" />
        </div>
      ))}
    </div>
  );
}
