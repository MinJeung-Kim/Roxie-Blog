export default function Skeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <div className="space-y-4" key={index}>
          <div className="rounded-xl h-44 w-80 animate-highlight" />
          <div className="w-3/4 h-8 rounded animate-highlight" />
          <div className="w-1/2 h-8 rounded animate-highlight" />
        </div>
      ))}
    </div>
  );
}
