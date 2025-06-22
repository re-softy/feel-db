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
            <div
              key={person.id}
              className="flex items-center gap-1 px-2 py-2 bg-gray-800 text-gray-300 rounded-full"
            >
              <span className="text-sm lg:text-base xl:text-lg">{person.full_name}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

export default PersonList;