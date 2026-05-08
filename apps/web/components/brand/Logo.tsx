import Image from 'next/image';

type Props = { size?: number };

/** Replace /logo.svg with /logo.png once the real logo PNG is saved to public/. */
export function Logo({ size = 44 }: Props) {
  return (
    <Image
      src="/logo.svg"
      alt="פרי לי"
      width={size}
      height={size}
      priority
      style={{ objectFit: 'contain', flexShrink: 0 }}
    />
  );
}
