import { PersonListProps } from "@/types/types";

function PersonList({ people, title }: PersonListProps) {
    if (!people || people.length === 0) return null;
  
    const pluralTitle = people.length > 1 ? `${title}s` : title;
  
    return (
      <div className="flex items-center gap-8">
        <h3 className="text-sm lg:text-2xl font-semibold text-white">
          {pluralTitle}
        </h3>
        <div className="flex flex-wrap gap-2">
          {people.map((person) => (
            <div
              key={person.id}
              className="flex items-center gap-2 px-3 py-2 bg-gray-900 text-gray-300 rounded-lg border border-gray-600"
            >
              <span className="text-lg">{person.full_name}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

export default PersonList;