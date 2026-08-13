import { Link } from "react-router-dom";

type BannerProps = {
  title: string;
  image: string;
  to?: string;
  video?: boolean;
  shop?: boolean;
};

export function Banner({ title, image, to, video, shop }: BannerProps) {
  const inner = (
    <>
      <div className="banner__media">
        {video ? (
          <video
            poster={image}
            muted
            playsInline
            loop
            autoPlay
            aria-label={title}
          />
        ) : (
          <img src={image} alt="" />
        )}
      </div>
      <div className="banner__veil" />
      <h2 className="banner__title">
        {title.split("\n").map((line) => (
          <span key={line}>{line}</span>
        ))}
      </h2>
    </>
  );

  const className = `banner${shop ? " banner--shop" : ""}${video ? "" : " banner--static"}`;

  if (to) {
    return (
      <Link to={to} className={className}>
        {inner}
      </Link>
    );
  }

  return <section className={className}>{inner}</section>;
}
