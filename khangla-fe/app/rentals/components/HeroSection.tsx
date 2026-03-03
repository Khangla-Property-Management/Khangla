import SearchBar from "./SearchBar";

export default function HeroSection() {
  return (
    <section className="pt-20 pb-12 px-6 text-center">
      <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
        Find your <span className="text-[#5B7C99]">perfect stay.</span>
      </h1>
      <p className="text-slate-500 mb-10">
        Discover curated rentals across the kingdom.
      </p>

      <SearchBar />
    </section>
  );
}
