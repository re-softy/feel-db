import MediaCardSkeleton from "./MediaCardSkeleton";

export default function MediaCarouselSkeleton() {
  return (
    <div className="flex flex-col w-full">
      <div className="w-full">
        <div className="flex flex-wrap -ml-2 md:-ml-4 gap-y-4">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="
                pl-2 md:pl-4
                basis-full
                min-[375px]:basis-full
                min-[420px]:basis-[83.33%]
                min-[500px]:basis-[71.43%]
                min-[550px]:basis-[66.67%]
                min-[600px]:basis-[55.56%]
                min-[670px]:basis-1/2
                min-[720px]:basis-[47.62%]
                min-[768px]:basis-[45.45%]
                min-[800px]:basis-[41.67%]
                min-[850px]:basis-[40%]
                min-[900px]:basis-[38.46%]
                min-[950px]:basis-[35.71%]
                min-[1000px]:basis-[34.48%]
                min-[1060px]:basis-1/3
                min-[1100px]:basis-[31.25%]
                min-[1150px]:basis-[30.30%]
                min-[1200px]:basis-[28.57%]
                min-[1250px]:basis-[27.78%]
                min-[1290px]:basis-[27.03%]
                min-[1350px]:basis-[26.32%]
                min-[1400px]:basis-1/4
                min-[1500px]:basis-1/4
                min-[1536px]:basis-[27.03%]
                min-[1600px]:basis-[24.39%]
                min-[1800px]:basis-[22.73%]
                min-[1900px]:basis-[21.74%]
                min-[2000px]:basis-[24.39%]
                min-[2050px]:basis-[23.81%]
                min-[2200px]:basis-[22.22%]
                min-[2300px]:basis-[22.22%]
                min-[2400px]:basis-[21.74%]
                min-[2500px]:basis-[19.61%]
              "
            >
              <MediaCardSkeleton />
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="block sm:hidden">
            <div className="w-16 h-5 bg-grey rounded animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}