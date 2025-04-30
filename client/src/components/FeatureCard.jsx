export function FeatureCard({ title, description, icon }) {
  return (
    <div className="rounded-lg bg-white p-6 shadow-md transition-transform duration-300 hover:-translate-y-2">
      <div className="mb-4 text-4xl">{icon}</div>
      <h3 className="mb-2 text-xl font-semibold text-gray-800">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
