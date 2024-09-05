import Banner from "../assets/Banner.png";

import AddIcon from '@mui/icons-material/Add';

function HomePageBanner() {
  return (
    <section className="w-full flex flex-col gap-2 mt-3 h-[320px]">
      <div
        className="flex-1 rounded-[15px] w-full bg-cover bg-center flex flex-col justify-end p-5 gap-4"
        style={{ backgroundImage: `url(${Banner.src})` }}
      >
        <h1 className="text-3xl font-medium">Godzilla X Kong</h1>
        <div className="flex items-center gap-2">
          <span className="text-md">👍 98% • </span>
          <span className="text-md">2021 • </span>
          <span className="text-md">PG-13 • </span>
          <span className="text-md">Action Thriller Sci-Fi</span>
        </div>
        <div className="flex items-end justify-between">
          <button className="flex items-center gap-3 border-2 border-orange-600 rounded-full py-2 px-4"><AddIcon />Favorites</button>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <span>😈</span>
              <span className="text-md font-semibold">24%</span>
              <span className="text-gray-500 text-md">(10)</span>
            </div>
            <div className="flex items-center gap-1">
              <span>😈</span>
              <span className="text-md font-semibold">24%</span>
              <span className="text-gray-500 text-md">(10)</span>
            </div>
            <div className="flex items-center gap-1">
              <span>😈</span>
              <span className="text-md font-semibold">24%</span>
              <span className="text-gray-500 text-md">(10)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomePageBanner;
