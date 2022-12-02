export const SynonymList = ({ synonyms }) => {
  return (
    <div className="w-4/12 flex flex-wrap justify-center">
      {synonyms &&
        synonyms.lenght !== 0 &&
        synonyms.map((item, i = 0) => {
          return (
            <span
              key={i++}
              className="pt-2 pb-3 pr-3 pl-3 bg-gray-300 mr-2 h-10"
            >
              {item}{" "}
            </span>
          );
        })}
    </div>
  );
};
