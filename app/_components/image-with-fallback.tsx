import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

interface ImageWithFallbackProps extends ImageProps {
  fallback: string;
}

export const ImageWithFallback = ({ fallback, alt, src, ...props }: ImageWithFallbackProps) => {
  const [error, setError] = useState(false);

  return <Image alt={alt} onError={() => setError(true)} src={error ? fallback : src} {...props} />;
};
