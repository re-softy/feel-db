import Link from "next/link";

import 'swiper/css/navigation';
import 'swiper/css';

interface MediaListProps {
  title: string;
  linkHref: string;
  linkText: string;
  children: React.ReactNode;
}

function MediaList({ title, linkHref, linkText, children }: MediaListProps) {
  return (
    <section className="w-full">
      <div className="flex items-center my-6 justify-between border-l-4 pl-2 border-[#ff7f50]">
        <span className="text-xl text-[#E2E2E9] uppercase">{title}</span>
        <Link href={linkHref} className="text-[#ff7f50]">
          {linkText}
        </Link>
      </div>
      {children}
    </section>
  );
}

export default MediaList;
