export default function Container({ children, className = "" }) {
  return (
    <div className={`w-full min-h-screen py-8 px-6 ${className}`}>
      {children}
    </div>
  );
}