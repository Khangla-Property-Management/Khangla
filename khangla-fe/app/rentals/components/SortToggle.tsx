export default function SortToggle({ count, isNewestFirst, toggle }: any) {
  return (
    <div className="flex justify-between items-center mb-8">
      <h2 className="font-bold text-xl">
        Available Homes
        <span className="text-[#5B7C99] ml-2">{count} found</span>
      </h2>

      <button
        onClick={toggle}
        className="px-4 py-2 bg-white border border-[#E2E8F0] rounded-full"
      >
        Sort by {isNewestFirst ? "New" : "Price"}
      </button>
    </div>
  );
}
