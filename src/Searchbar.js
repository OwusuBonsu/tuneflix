export default function Searchbar() {
  return (
    <>
      <div className="flex justify-end">
        <input
          className="w-72 h-10 mx-3 my-2 opacity-60 rounded-3xl bg-gray-800 text-white text-center"
          id="search"
          placeholder="Search..."
          type="text"
        />
      </div>
    </>
  );
}
