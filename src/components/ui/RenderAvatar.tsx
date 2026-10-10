import avatarPlaceholder from '../../assets/avatar-placeholder.svg';

export default function RenderAvatar({
  src,
  alt = 'no avatar',
  size = 100,
}: {
  src: Blob;
  size?: number;
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
      width={size}
      height={size}
      className='border border-gray-300 rounded-xl overflow-clip object-cover aspect-square'
    />
  );
}
