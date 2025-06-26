export default function BannerSkeleton() {
    return (
      <section className="w-full flex mt-3 gap-4">

        <div className="w-full xl:w-[70%] h-[600px] bg-grey rounded-lg animate-pulse" />
  
        <div className="hidden xl:flex flex-col gap-y-4 w-[30%]">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="w-full h-[190px] bg-grey rounded-lg animate-pulse"
            />
          ))}
        </div>
      </section>
    );
  }