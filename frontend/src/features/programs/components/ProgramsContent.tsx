import { useMemo, useState } from "react";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { Link } from "react-router-dom";

interface ProgramCard {
  id: string;
  name: string;
  description: string;
  duration: string;
  fee: number;
  level: "Bachelor" | "Master";
}

const programs: ProgramCard[] = [
  {
    id: "1",
    name: "BSc CSIT",
    description:
      "A computer science and information technology program focused on software, systems, and practical computing.",
    duration: "4 Years",
    fee: 450000,
    level: "Bachelor",
  },
  {
    id: "2",
    name: "BBA",
    description:
      "A business administration program covering management, finance, marketing, entrepreneurship, and leadership.",
    duration: "4 Years",
    fee: 400000,
    level: "Bachelor",
  },
  {
    id: "3",
    name: "BCA",
    description:
      "An application-oriented computing program focused on software development and computer applications.",
    duration: "4 Years",
    fee: 380000,
    level: "Bachelor",
  },
  {
    id: "4",
    name: "BIT",
    description:
      "An information technology program covering programming, databases, networking, and modern IT systems.",
    duration: "4 Years",
    fee: 420000,
    level: "Bachelor",
  },
  {
    id: "5",
    name: "BBM",
    description:
      "A management-focused undergraduate program designed around business and organizational skills.",
    duration: "4 Years",
    fee: 390000,
    level: "Bachelor",
  },
  {
    id: "6",
    name: "MBA",
    description:
      "An advanced management program focused on strategic thinking, leadership, and business decision-making.",
    duration: "2 Years",
    fee: 500000,
    level: "Master",
  },
];

const durationOptions = ["2 Years", "3 Years", "4 Years"];

const ITEMS_PER_PAGE = 6;

export function ProgramsContent() {
  const [search, setSearch] = useState("");
  const [sidebarSearch, setSidebarSearch] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("All Programs");
  const [selectedDurations, setSelectedDurations] = useState<string[]>([]);
  const [minFee, setMinFee] = useState("");
  const [maxFee, setMaxFee] = useState("");
  const [sortBy, setSortBy] = useState("Latest");
  const [page, setPage] = useState(1);

  const filteredPrograms = useMemo(() => {
    let result = [...programs];

    const combinedSearch = search || sidebarSearch;

    if (combinedSearch.trim()) {
      const value = combinedSearch.toLowerCase().trim();

      result = result.filter(
        (program) =>
          program.name.toLowerCase().includes(value) ||
          program.description.toLowerCase().includes(value),
      );
    }

    if (selectedLevel !== "All Programs") {
      result = result.filter(
        (program) => program.level === selectedLevel,
      );
    }

    if (selectedDurations.length > 0) {
      result = result.filter((program) =>
        selectedDurations.includes(program.duration),
      );
    }

    if (minFee) {
      result = result.filter(
        (program) => program.fee >= Number(minFee),
      );
    }

    if (maxFee) {
      result = result.filter(
        (program) => program.fee <= Number(maxFee),
      );
    }

    if (sortBy === "Fee: Low to High") {
      result.sort((a, b) => a.fee - b.fee);
    }

    if (sortBy === "Fee: High to Low") {
      result.sort((a, b) => b.fee - a.fee);
    }

    return result;
  }, [
    search,
    sidebarSearch,
    selectedLevel,
    selectedDurations,
    minFee,
    maxFee,
    sortBy,
  ]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredPrograms.length / ITEMS_PER_PAGE),
  );

  const visiblePrograms = filteredPrograms.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  const toggleDuration = (duration: string) => {
    setSelectedDurations((current) =>
      current.includes(duration)
        ? current.filter((item) => item !== duration)
        : [...current, duration],
    );

    setPage(1);
  };

  const applyFilters = () => {
    setSearch(sidebarSearch);
    setPage(1);
  };

  const resetFilters = () => {
    setSearch("");
    setSidebarSearch("");
    setSelectedLevel("All Programs");
    setSelectedDurations([]);
    setMinFee("");
    setMaxFee("");
    setSortBy("Latest");
    setPage(1);
  };

  return (
    <section className="bg-[#faf9f6] dark:bg-stone-950">
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="grid gap-8 lg:grid-cols-[250px_minmax(0,1fr)]">
          {/* Search & Filter */}
          <aside className="h-fit rounded-2xl border border-stone-200 bg-white p-6 dark:border-stone-800 dark:bg-stone-900">
            <div className="flex items-center gap-2">
              <SlidersHorizontal size={18} />

              <h2 className="text-sm font-bold uppercase tracking-wide">
                Search & Filter
              </h2>
            </div>

            {/* Search */}
            <div className="mt-6">
              <label
                htmlFor="program-filter-search"
                className="mb-2 block text-sm font-medium"
              >
                Search
              </label>

              <div className="relative">
                <Search
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
                />

                <input
                  id="program-filter-search"
                  value={sidebarSearch}
                  onChange={(event) => {
                    setSidebarSearch(event.target.value);
                    setPage(1);
                  }}
                  placeholder="Search..."
                  className="h-11 w-full rounded-lg border border-stone-300 bg-white pl-10 pr-3 text-sm outline-none focus:border-[#173f35] dark:border-stone-700 dark:bg-stone-950 dark:focus:border-[#d6b56a]"
                />
              </div>
            </div>

            {/* Program */}
            <div className="mt-7">
              <label
                htmlFor="program-level"
                className="mb-2 block text-sm font-medium"
              >
                Program
              </label>

              <div className="relative">
                <select
                  id="program-level"
                  value={selectedLevel}
                  onChange={(event) => {
                    setSelectedLevel(event.target.value);
                    setPage(1);
                  }}
                  className="h-11 w-full appearance-none rounded-lg border border-stone-300 bg-white px-3 pr-9 text-sm outline-none dark:border-stone-700 dark:bg-stone-950"
                >
                  <option>All Programs</option>
                  <option>Bachelor</option>
                  <option>Master</option>
                </select>

                <ChevronDown
                  size={17}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-stone-400"
                />
              </div>
            </div>

            {/* Duration */}
            <div className="mt-7">
              <p className="text-sm font-medium">Duration</p>

              <div className="mt-3 space-y-3">
                {durationOptions.map((duration) => (
                  <label
                    key={duration}
                    className="flex cursor-pointer items-center gap-3 text-sm text-stone-600 dark:text-stone-300"
                  >
                    <input
                      type="checkbox"
                      checked={selectedDurations.includes(duration)}
                      onChange={() => toggleDuration(duration)}
                      className="h-4 w-4 accent-[#173f35]"
                    />

                    {duration}
                  </label>
                ))}
              </div>
            </div>

            {/* Fee */}
            <div className="mt-7">
              <p className="text-sm font-medium">Fee</p>

              <div className="mt-3 grid grid-cols-2 gap-3">
                <input
                  type="number"
                  min="0"
                  value={minFee}
                  onChange={(event) => {
                    setMinFee(event.target.value);
                    setPage(1);
                  }}
                  placeholder="Min"
                  className="h-11 w-full rounded-lg border border-stone-300 bg-white px-3 text-sm outline-none dark:border-stone-700 dark:bg-stone-950"
                />

                <input
                  type="number"
                  min="0"
                  value={maxFee}
                  onChange={(event) => {
                    setMaxFee(event.target.value);
                    setPage(1);
                  }}
                  placeholder="Max"
                  className="h-11 w-full rounded-lg border border-stone-300 bg-white px-3 text-sm outline-none dark:border-stone-700 dark:bg-stone-950"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="mt-7 space-y-3">
              <button
                type="button"
                onClick={applyFilters}
                className="w-full rounded-lg bg-[#173f35] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#12342d] dark:bg-[#c69a45] dark:text-stone-950"
              >
                Apply Filters
              </button>

              <button
                type="button"
                onClick={resetFilters}
                className="w-full rounded-lg border border-stone-300 px-4 py-3 text-sm font-semibold text-stone-700 transition hover:bg-stone-100 dark:border-stone-700 dark:text-stone-200 dark:hover:bg-stone-800"
              >
                Reset
              </button>
            </div>
          </aside>

          {/* Programs Area */}
          <div>
            {/* Toolbar */}
            <div className="mb-6 flex flex-col gap-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-[#173f35] dark:text-stone-100">
                    All Programs
                  </h2>

                  <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
                    {filteredPrograms.length}{" "}
                    {filteredPrograms.length === 1
                      ? "Program"
                      : "Programs"}
                  </p>
                </div>

                <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                  <div className="relative sm:w-56">
                    <Search
                      size={17}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
                    />

                    <input
                      value={search}
                      onChange={(event) => {
                        setSearch(event.target.value);
                        setPage(1);
                      }}
                      placeholder="Search programs..."
                      className="h-11 w-full rounded-lg border border-stone-300 bg-white pl-10 pr-3 text-sm outline-none dark:border-stone-700 dark:bg-stone-900"
                    />
                  </div>

                  <div className="relative sm:w-40">
                    <select
                      value={sortBy}
                      onChange={(event) => {
                        setSortBy(event.target.value);
                        setPage(1);
                      }}
                      className="h-11 w-full appearance-none rounded-lg border border-stone-300 bg-white px-3 pr-8 text-sm outline-none dark:border-stone-700 dark:bg-stone-900"
                    >
                      <option>Latest</option>
                      <option>Fee: Low to High</option>
                      <option>Fee: High to Low</option>
                    </select>

                    <ChevronDown
                      size={16}
                      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-stone-400"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Cards */}
            {visiblePrograms.length > 0 ? (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {visiblePrograms.map((program) => (
                  <article
                    key={program.id}
                    className="group flex flex-col rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md dark:border-stone-800 dark:bg-stone-900"
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#f1eadb] text-2xl dark:bg-stone-800">
                      🎓
                    </div>

                    <div className="mt-5 flex-1">
                      <span className="text-xs font-semibold uppercase tracking-wide text-[#8d6b2f] dark:text-[#d6b56a]">
                        {program.level}
                      </span>

                      <h3 className="mt-2 text-xl font-bold text-[#173f35] dark:text-stone-100">
                        {program.name}
                      </h3>

                      <p className="mt-3 line-clamp-3 text-sm leading-6 text-stone-600 dark:text-stone-400">
                        {program.description}
                      </p>

                      <div className="mt-5 flex items-center justify-between border-t border-stone-200 pt-4 text-sm dark:border-stone-800">
                        <div>
                          <p className="text-xs text-stone-500">
                            Duration
                          </p>

                          <p className="mt-1 font-semibold">
                            {program.duration}
                          </p>
                        </div>

                        <div className="text-right">
                          <p className="text-xs text-stone-500">
                            Fee
                          </p>

                          <p className="mt-1 font-semibold">
                            Rs. {program.fee.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>

                    <Link
                      to={`/programs/${program.id}`}
                      className="mt-6 block rounded-lg border border-[#173f35] px-4 py-2.5 text-center text-sm font-semibold text-[#173f35] transition hover:bg-[#173f35] hover:text-white dark:border-[#d6b56a] dark:text-[#d6b56a] dark:hover:bg-[#d6b56a] dark:hover:text-stone-950"
                    >
                      View Details
                    </Link>
                  </article>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-stone-300 bg-white px-6 py-16 text-center dark:border-stone-700 dark:bg-stone-900">
                <Search
                  className="mx-auto text-stone-400"
                  size={28}
                />

                <h3 className="mt-4 text-lg font-semibold">
                  No programs found
                </h3>

                <p className="mt-2 text-sm text-stone-500 dark:text-stone-400">
                  Try changing your search or filter criteria.
                </p>

                <button
                  type="button"
                  onClick={resetFilters}
                  className="mt-5 rounded-lg bg-[#173f35] px-5 py-2.5 text-sm font-semibold text-white"
                >
                  Reset Filters
                </button>
              </div>
            )}

            {/* Pagination */}
            {filteredPrograms.length > 0 && (
              <div className="mt-10 flex items-center justify-center gap-2">
                <button
                  type="button"
                  disabled={page === 1}
                  onClick={() =>
                    setPage((current) => Math.max(1, current - 1))
                  }
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-stone-300 text-stone-600 transition hover:bg-stone-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-stone-700 dark:text-stone-300 dark:hover:bg-stone-800"
                >
                  <ChevronLeft size={17} />
                </button>

                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1,
                ).map((pageNumber) => (
                  <button
                    key={pageNumber}
                    type="button"
                    onClick={() => setPage(pageNumber)}
                    className={`h-10 min-w-10 rounded-lg px-3 text-sm font-semibold transition ${
                      page === pageNumber
                        ? "bg-[#173f35] text-white dark:bg-[#d6b56a] dark:text-stone-950"
                        : "border border-stone-300 text-stone-600 hover:bg-stone-100 dark:border-stone-700 dark:text-stone-300 dark:hover:bg-stone-800"
                    }`}
                  >
                    {pageNumber}
                  </button>
                ))}

                <button
                  type="button"
                  disabled={page === totalPages}
                  onClick={() =>
                    setPage((current) =>
                      Math.min(totalPages, current + 1),
                    )
                  }
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-stone-300 text-stone-600 transition hover:bg-stone-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-stone-700 dark:text-stone-300 dark:hover:bg-stone-800"
                >
                  <ChevronRight size={17} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}