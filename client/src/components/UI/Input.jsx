export function Input({ label, icon, error, className = "", ...props }) {
  const inputClasses = `
    w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm
    focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500
    disabled:cursor-not-allowed disabled:opacity-50
    ${error ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}
    ${icon ? "pl-10" : ""}
    ${className}
  `;

  return (
    <div className="w-full">
      {label && (
        <label className="mb-1 block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
            {icon}
          </div>
        )}
        <input className={inputClasses} {...props} />
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
