const Container = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center w-full px-6 py-10 bg-white/5 border border-white/10 rounded-xl shadow-xl backdrop-blur-lg transition-all duration-300 ${className}`}
    >
      {children}
    </div>
  );
};

export default Container;
