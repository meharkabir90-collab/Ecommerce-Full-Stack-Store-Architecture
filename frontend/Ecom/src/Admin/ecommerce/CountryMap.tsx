interface CountryMapProps {
  mapColor?: string;
}

const CountryMap = ({ mapColor = "#D0D5DD" }: CountryMapProps) => {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl">
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ backgroundColor: mapColor }}
      >
        <div className="text-center">
          <p className="text-sm font-medium text-gray-500">
            Customer Demographics
          </p>
          <p className="mt-1 text-xs text-gray-400">
            World map
          </p>
        </div>
      </div>
    </div>
  );
};

export default CountryMap;