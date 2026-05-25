interface PageImageProps {
  src: string;
  alt: string;
}

const PageImage = ({ src, alt }: PageImageProps) => (
  <img
    src={src}
    alt={alt}
    style={{
      maxWidth: '100%',
      height: '60vh',
      marginBottom: '20px'
    }}
  />
);

export default PageImage;
