'use client';

import { useState, useRef, MouseEvent as ReactMouseEvent } from 'react';
import { Move, RotateCw, ZoomIn, ZoomOut, RefreshCw, Layers } from 'lucide-react';
import { products } from '@/data/products';

interface VisualizerItem {
  id: string;
  name: string;
  url: string;
  width: number;
  depth: number;
}

export default function RoomVisualizer() {
  // Scenes
  const scenes = [
    {
      id: 'living',
      name: 'Modern Living Room',
      url: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=1200&q=80',
    },
    {
      id: 'dining',
      name: 'Artisan Dining Room',
      url: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1200&q=80',
    },
  ];

  // Furniture items to place
  const furnitureItems: VisualizerItem[] = products
    .filter((p) => p.images[0]?.url)
    .map((p) => ({
      id: p.id,
      name: p.name,
      url: p.images[0].url,
      width: p.dimensions.width,
      depth: p.dimensions.depth,
    }));

  const [activeScene, setActiveScene] = useState(scenes[0]);
  const [selectedItem, setSelectedItem] = useState<VisualizerItem>(furnitureItems[0]);

  // Position, Rotation, Scale states
  const [position, setPosition] = useState({ x: 150, y: 150 });
  const [rotation, setRotation] = useState(0);
  const [scale, setScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);

  const dragStart = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleMouseDown = (e: ReactMouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
    dragStart.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    let newX = e.clientX - dragStart.current.x;
    let newY = e.clientY - dragStart.current.y;

    // Boundaries check
    newX = Math.max(0, Math.min(newX, rect.width - 150));
    newY = Math.max(0, Math.min(newY, rect.height - 150));

    setPosition({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Bind mouse move and mouse up handlers globally during drag
  useState(() => {
    if (typeof window !== 'undefined') {
      const onMouseMove = (e: MouseEvent) => handleMouseMove(e);
      const onMouseUp = () => handleMouseUp();

      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);

      return () => {
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
      };
    }
  });

  const handleReset = () => {
    setPosition({ x: 150, y: 150 });
    setRotation(0);
    setScale(1);
  };

  return (
    <div className="bg-white border border-cream/25 rounded-3xl p-6 md:p-8 space-y-8 text-left shadow-sm">
      
      {/* Control Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        
        {/* Scene Picker (span 4) */}
        <div className="lg:col-span-4 space-y-2">
          <label className="text-xs font-semibold text-charcoal/50 uppercase tracking-wider font-body">
            1. Select Room Scene
          </label>
          <div className="flex gap-2">
            {scenes.map((scene) => (
              <button
                key={scene.id}
                onClick={() => setActiveScene(scene)}
                className={`flex-grow px-4 py-2.5 rounded-xl text-xs font-semibold font-body border transition-all cursor-pointer ${
                  activeScene.id === scene.id
                    ? 'bg-gold border-gold text-charcoal shadow-sm'
                    : 'bg-cream/5 border-cream/25 text-charcoal/70 hover:border-gold hover:text-gold'
                }`}
              >
                {scene.name}
              </button>
            ))}
          </div>
        </div>

        {/* Product Picker (span 4) */}
        <div className="lg:col-span-4 space-y-2">
          <label className="text-xs font-semibold text-charcoal/50 uppercase tracking-wider font-body">
            2. Choose Furniture
          </label>
          <select
            value={selectedItem.id}
            onChange={(e) => {
              const item = furnitureItems.find((i) => i.id === e.target.value);
              if (item) {
                setSelectedItem(item);
                handleReset();
              }
            }}
            className="w-full px-4 py-2.5 bg-cream/5 border border-cream/25 rounded-xl text-xs md:text-sm font-body text-charcoal focus:outline-none focus:border-gold transition-colors cursor-pointer"
          >
            {furnitureItems.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        {/* Sliders & Resets (span 4) */}
        <div className="lg:col-span-4 flex justify-between items-center gap-4 pt-4 lg:pt-0">
          {/* Scale Slider */}
          <div className="space-y-1.5 flex-grow">
            <span className="text-[10px] font-semibold text-charcoal/40 uppercase tracking-wider font-body block">
              Perspective Scale: {Math.round(scale * 100)}%
            </span>
            <input
              type="range"
              min="0.5"
              max="1.5"
              step="0.05"
              value={scale}
              onChange={(e) => setScale(Number(e.target.value))}
              className="w-full accent-gold cursor-pointer"
            />
          </div>

          <div className="flex gap-2">
            {/* Rotate */}
            <button
              onClick={() => setRotation((r) => (r + 90) % 360)}
              className="p-3 border border-cream/35 hover:border-gold text-gold hover:bg-gold/5 rounded-xl cursor-pointer"
              title="Rotate 90°"
            >
              <RotateCw className="w-4 h-4" />
            </button>
            {/* Reset */}
            <button
              onClick={handleReset}
              className="p-3 border border-cream/35 hover:border-gold text-gold hover:bg-gold/5 rounded-xl cursor-pointer"
              title="Reset position"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Visualizer Canvas */}
      <div
        ref={containerRef}
        className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-inner border border-cream/20 bg-zinc-900 select-none cursor-crosshair"
        style={{
          backgroundImage: `url(${activeScene.url})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Helper visual instructions overlay */}
        <div className="absolute top-4 left-4 bg-charcoal/70 backdrop-blur-md border border-cream/15 text-cream px-3 py-1.5 rounded-lg text-[10px] font-semibold uppercase tracking-wider font-body flex items-center gap-1.5 pointer-events-none">
          <Move className="w-3.5 h-3.5 text-gold animate-bounce" />
          <span>Drag piece to arrange</span>
        </div>

        {/* Draggable Furniture Overlay Item */}
        <div
          onMouseDown={handleMouseDown}
          className="absolute w-[180px] h-[180px] flex items-center justify-center cursor-move"
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
            transform: `rotate(${rotation}deg) scale(${scale})`,
            transition: isDragging ? 'none' : 'transform 0.2s ease-out, left 0.2s ease-out, top 0.2s ease-out',
          }}
        >
          {/* Subtle outline on hover/drag */}
          <div className={`absolute inset-0 rounded-2xl border-2 border-dashed ${isDragging ? 'border-gold bg-gold/5' : 'border-transparent hover:border-gold/30'} transition-all`} />

          {/* Product image */}
          <img
            src={selectedItem.url}
            alt={selectedItem.name}
            className="max-w-[90%] max-h-[90%] object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.5)] pointer-events-none"
          />
        </div>
      </div>

      {/* Info specs detail banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-cream/10 border border-cream/20 rounded-2xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gold/10 border border-gold/20 rounded-xl flex items-center justify-center text-gold">
            <Layers className="w-5 h-5" />
          </div>
          <div className="text-left font-body">
            <p className="text-xs font-bold text-charcoal">{selectedItem.name}</p>
            <p className="text-[10px] text-charcoal/50">
              True Dimension: {selectedItem.width}W &times; {selectedItem.depth}D cm
            </p>
          </div>
        </div>

        <p className="text-[10px] text-charcoal/40 leading-relaxed font-body max-w-sm text-left sm:text-right">
          This digital visualization matches catalog dimensions to evaluate wall space configurations and traffic corridors.
        </p>
      </div>
    </div>
  );
}
