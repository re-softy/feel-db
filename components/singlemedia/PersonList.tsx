import { PersonListProps } from "@/types/types";
import Link from "next/link";

function PersonList({ people, title }: PersonListProps) {
    if (!people || people.length === 0) return null;
  
    const pluralTitle = people.length > 1 ? `${title}s` : title;
  
    return (
      <div className="flex items-start gap-2">
        <h3 className="w-28 shrink-0 text-sm lg:text-xl xl:text-2xl font-semibold text-white">
          {pluralTitle}
        </h3>
        <div className="flex flex-wrap gap-2">
          {people.map((person) => (
            <Link
              key={person.id}
              href={`/search?people=${encodeURIComponent(person.full_name)}`}
              className="flex items-center gap-1 px-2 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white rounded-full transition-colors duration-200 cursor-pointer"
            >
              <span className="text-sm lg:text-base xl:text-lg">{person.full_name}</span>
            </Link>
          ))}
        </div>
      </div>
    );
  }

export default PersonList;