interface OwnerAvatarProps {
  imgUrl: string;
}

const OwnerAvatar = ({ imgUrl }: OwnerAvatarProps) => {
  return (
    <div className="h-16 w-16">
      <img
        className="h-full w-full rounded-[50%] object-cover"
        src={imgUrl}
        alt="Avatar of the owner"
      />
    </div>
  );
};

export default OwnerAvatar;
