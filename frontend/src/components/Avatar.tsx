
const Avatar = ({ name, imageUrl }: { name: string; imageUrl?: string }) => {
  if (imageUrl) {
    return <img src={imageUrl} alt={name} className="w-10 h-10 rounded-full" />;
  }

  const initials = name ? name[0].toUpperCase() : "?";
  const bgColor = `hsl(${(name.charCodeAt(0) * 10) % 360}, 60%, 60%)`; // Random color

  return (
    <div
      className="w-10 h-10 flex items-center justify-center rounded-full text-white font-bold"
      style={{ backgroundColor: bgColor }}
    >
      {initials}
    </div>
  );
};

export default Avatar;
