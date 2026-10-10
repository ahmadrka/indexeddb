import avatarPlaceholder from '../../assets/avatar-placeholder.svg';

export default function RenderAvatar({
  src,
  alt = 'no avatar',
  width = 100,
}: {
  src: Blob;
  width?: number;
  alt?: string;
}) {
  return (
    <img
      src={
        src instanceof Blob && src.size > 0
          ? URL.createObjectURL(src)
          : avatarPlaceholder
      }
      alt={alt}
      className={`w-[${width}px] h-[${width}px] border border-gray-300 rounded-xl overflow-clip object-cover`}
    />
  );
}
