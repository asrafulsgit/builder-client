import { useState } from "react";
import { library } from "../../components/library/Library";

const  Builder=()=> {
  const [canvas, setCanvas] = useState([]);

  // Add new component
  const addComponent = (componentId) => {
    const comp = library.find((c) => c.id === componentId);
    if (!comp) return;
    setCanvas((prev) => [
      ...prev,
      { id: Date.now().toString(), componentId, order: prev.length },
    ]);
  };

  // Delete component
  const deleteComponent = (id) => {
    setCanvas((prev) => prev.filter((c) => c.id !== id));
  };

  // Move component up/down
  const moveComponent = (id, direction) => {
    setCanvas((prev) => {
      const index = prev.findIndex((c) => c.id === id);
      if (index === -1) return prev;

      const newArr = [...prev];
      const [item] = newArr.splice(index, 1);
      const newIndex = direction === "up" ? index - 1 : index + 1;

      if (newIndex < 0 || newIndex >= newArr.length) return prev;
      newArr.splice(newIndex, 0, item);
      return newArr;
    });
  };

  return (
    <div className="flex h-screen">
      {/* Left Sidebar - Components */}
      <div className="w-3/7 border-r p-4 overflow-y-auto">
        <h2 className="font-bold text-lg mb-4">Components</h2>
        {library.map((c) => (
          <div
            key={c.id}
            onClick={() => addComponent(c.id)}
            className="border p-2 mb-2 cursor-pointer hover:bg-gray-100"
          >
            {c.name}
          </div>
        ))}
      </div>

      {/* Right Side - Builder Preview */}
      <div className="flex-1 p-6 overflow-y-auto bg-gray-50">
        <h2 className="font-bold text-lg mb-4">Live Builder</h2>

        {canvas.length === 0 && (
          <div className="text-gray-400 text-center mt-20">
            Add components from the left panel
          </div>
        )}

        {canvas.map((c, i) => {
          const Comp = library.find(
            (x) => x.id === c.componentId
          )?.component;

          return (
            <div
              key={c.id}
              className="relative border mb-4 group hover:shadow-lg transition p-2"
            >
              <div className="absolute right-2 top-2 hidden group-hover:flex gap-2">
                <button
                  className="bg-red-500 text-white text-xs px-2 py-1 rounded"
                  onClick={() => deleteComponent(c.id)}
                >
                  Delete
                </button>
                <button
                  className="bg-gray-500 text-white text-xs px-2 py-1 rounded"
                  onClick={() => moveComponent(c.id, "up")}
                >
                  ↑
                </button>
                <button
                  className="bg-gray-500 text-white text-xs px-2 py-1 rounded"
                  onClick={() => moveComponent(c.id, "down")}
                >
                  ↓
                </button>
              </div>
              {Comp && <Comp />}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Builder;
