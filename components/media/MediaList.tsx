import Link from "next/link";
import MediaCard from "./MediaCard";

import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';


function MediaList() {

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    justifyContent: "center"
  };

  return (
    <section className="w-full">
      <div className="flex items-center justify-between m-6 border-l-4 pl-2 border-[#ff7f50]">
        <span className="text-xl text-[#E2E2E9] uppercase">top 20 most popular</span>
        <Link href={"#"} className="text-[#ff7f50]">
          See All</Link>
      </div> 
      <div className="w-[100%] grid grid-cols-4 my-3 gap-4" style={gridStyle}>
          <MediaCard />
          <MediaCard />
          <MediaCard />
          <MediaCard />
          <MediaCard />
        </div>
      <div className="flex items-center cursor-pointer justify-end">
        <KeyboardArrowLeftIcon fontSize="large"/>
        <KeyboardArrowRightIcon fontSize="large"/>
      </div>
    </section>
  )
}

export default MediaList;