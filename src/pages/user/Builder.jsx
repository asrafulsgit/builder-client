import { useState } from "react";
import { library } from "../../components/library/Library";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { apiRequiest } from "../../utils/baseApi";

const Builder = () => {
  const [canvas, setCanvas] = useState([]);
  const [projectName, setProjectName] = useState("");
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

  // Drop into canvas
  const handleDrop = (e) => {
    e.preventDefault();
    if (!dragItem) return;

    // Prevent duplicate componentId
    const isExist = canvas.find((c) => c.componentId === dragItem.id);
    if (isExist) return;

    setCanvas((prev) => [
      ...prev,
      { id: uuidv4(), componentId: dragItem.id},
    ]);
    setDragItem(null);
  };

  // Filter components by search
  const filtered = library.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  // save template 
  const handleSaveTemplate = async()=>{
      if(!projectName.trim()) return toast.error("Please, Enter Your project name.");
      if(canvas.length === 0) return toast.error("There is no content to save.");
      console.log(canvas)
      const templateData = {
        name : projectName,
        components : canvas
      }

      try {
        await apiRequiest('POST','/template/create',templateData);
        toast.success('Your template is saved');
      } catch (error) {
        toast.error(error?.respone?.data?.message);
      }
      
  }

  return (
    <div className="flex gap-2  h-screen">
      {/* Left Sidebar */}
      <div className="w-3/7 border  overflow-y-auto">
        <div className="sticky top-0 p-1 z-10 bg-white">
          <h2 className="font-bold text-lg mb-4">Components</h2>
          <input
            type="text"
            placeholder="Search components..."
            className="w-full mb-3  border-2 border-yellow-500 outline-none  rounded px-2 py-3 text-xl "
            value={search}
            onChange={(e) =>{
                console.log('object')
              setSearch(e.target.value)
              }}
          />
        </div>
        <div className="p-1">
          {filtered.map((c) => (
          <div
            key={c.id}
            draggable
            onDragStart={() => setDragItem(c)}
            className="border mb-2 cursor-pointer hover:bg-gray-100 rounded"
          >
            <div className="pointer-events-none">
              <c.component />
            </div>
          </div>
        ))}
        </div>
      </div>

      {/* Right Canvas */}
      <div
        className="flex-1 border bg-gray-50 overflow-y-auto"
        onDragOver={(e)=> e.preventDefault()}
        onDrop={handleDrop}
      >
        <div className="sticky top-0 z-20 bg-white flex justify-between items-center p-3 ">
          <h2 className="font-bold text-lg mb-4">Live Preview</h2>
          <div className="space-x-4">
            <input type="text" placeholder="Enter project name" 
            className="px-2 py-1 border-2 border-yellow-500 rounded-lg focus:outline-none" onChange={(e)=>setProjectName(e.target.value)}/>
            <button disabled={canvas.length === 0} onClick={handleSaveTemplate} 
            className={`bg-yellow-500 px-3 py-1.5 rounded-lg ${canvas.length === 0 ? "cursor-no-drop" : "cursor-pointer"}`}>Save Project</button>
          </div>
        </div>

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
