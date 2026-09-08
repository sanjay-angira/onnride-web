import Image, { type ImageProps } from 'next/image';
import { isRemoteImageSrc } from '@/lib/image-variants';

type RemoteImageProps = Omit<ImageProps, 'unoptimized'> & {
  src: string;
};

/** next/image wrapper — remote CDN URLs skip the server optimizer (TLS/proxy issues in dev). */
export function RemoteImage({ src, ...props }: RemoteImageProps) {
  return <Image src={src} unoptimized={isRemoteImageSrc(src)} {...props} />;
}
