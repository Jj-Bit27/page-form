export function Button({
  children,
  variant = "primary",
  size = "medium",
  fullWidth = false,
  loading = false,
  className = "",
  ...props
}) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50";

  const variantStyles = {
    primary: "bg-purple-600 text-white hover:bg-purple-700",
    outline:
      "border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50",
    text: "bg-transparent text-gray-700 hover:bg-gray-100",
  };

  const sizeStyles = {
    small: "px-3 py-1.5 text-sm",
    medium: "px-4 py-2",
    large: "px-6 py-3 text-lg",
  };

  const widthStyle = fullWidth ? "w-full" : "";

  const classes = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${className}`;

  return (
    <button className={classes} disabled={loading || props.disabled} {...props}>
      {loading ? (
        <>
          <svg
            className="mr-2 h-4 w-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c

0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Cargando...
        </>
      ) : (
        children
      )}
    </button>
  );
}
