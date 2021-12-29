export interface ClickableOptionWithImageProps {
  image: any;
  title: string;
  onClick: () => void;
}

const ClickableOptionWithImage: React.SFC<ClickableOptionWithImageProps> = ({
  image,
  title,
  onClick,
}) => {
  return (
    <div onClick={onClick}>
      <h2>{title}</h2>
      <img src={image} alt="..." style={{ maxWidth: 400, maxHeight: 400 }} />
    </div>
  );
};

export default ClickableOptionWithImage;
