import { useState } from "react";
import { library } from "../../components/library/Library";
import { v4 as uuidv4 } from "uuid";

const Builder = () => {
  const [canvas, setCanvas] = useState([]);
  const [dragItem, setDragItem] = useState(null);
  const [search, setSearch] = useState("");

  // Delete component
  const deleteComponent = (id) => {
    setCanvas((prev) => prev.filter((c) => c.id !== id));
  };

  // Move component manually
  const moveComponent = (id, direction) => {
    setCanvas((prev) => {
      const index = prev.findIndex((c) => c.id === id);
      if (index === -1) return prev;

      const newIndex = direction === "up" ? index - 1 : index + 1;
      if (newIndex < 0 || newIndex >= prev.length) return prev;

      const newArr = [...prev];
      const [moved] = newArr.splice(index, 1);
      newArr.splice(newIndex, 0, moved);
      return newArr;
    });
  };

  // Drag from left library
  const handleDragStart = (c) => {
    setDragItem(c);
  };

  // Drop into canvas
  const handleDrop = (e) => {
    e.preventDefault();
    if (!dragItem) return;

    // Prevent duplicate componentId
    const isExist = canvas.find((c) => c.componentId === dragItem.id);
    if (isExist) return;

    setCanvas((prev) => [
      ...prev,
      { id: uuidv4(), componentId: dragItem.id, order: prev.length + 1 },
    ]);

    setDragItem(null);
  };

  // Allow drop
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Filter components by search
  const filtered = library.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex h-screen">
      {/* Left Sidebar */}
      <div className="w-3/7 border-r p-1 overflow-y-auto">
        <h2 className="font-bold text-lg mb-4">Components</h2>
        <input
          type="text"
          placeholder="Search components..."
          className="w-full mb-3 border rounded px-2 py-1 text-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {filtered.map((c) => (
          <div
            key={c.id}
            draggable
            onDragStart={() => handleDragStart(c)}
            className="border mb-2 cursor-pointer hover:bg-gray-100 rounded"
          >
            <div className="pointer-events-none">
              <c.component />
            </div>
          </div>
        ))}
      </div>

      {/* Right Canvas */}
      <div
        className="flex-1 bg-gray-50 overflow-y-auto"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <h2 className="font-bold pt-2 pl-2 text-lg mb-4">Live Preview</h2>

        {canvas.length === 0 && (
          <div className="text-gray-400 text-center mt-20">
            Add components from the left panel
          </div>
        )}

        {canvas.map((c) => {
          const Comp = library.find((x) => x.id === c.componentId)?.component;
          return (
            <div
              key={c.id}
              className="relative group hover:border border-transparent hover:border-yellow-400 transition"
            >
              {/* Action buttons */}
              <div className="absolute right-2 top-2 z-10 hidden group-hover:flex gap-2">
                <button
                  onClick={() => deleteComponent(c.id)}
                  className="bg-red-500 text-white text-xs px-2 py-1 rounded"
                >
                  Delete
                </button>
                <button
                  onClick={() => moveComponent(c.id, "up")}
                  className="bg-gray-500 text-white text-xs px-2 py-1 rounded"
                >
                  ↑
                </button>
                <button
                  onClick={() => moveComponent(c.id, "down")}
                  className="bg-gray-500 text-white text-xs px-2 py-1 rounded"
                >
                  ↓
                </button>
              </div>

              {/* Component Render */}
              {Comp && <Comp />}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Builder;
