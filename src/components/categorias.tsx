import React, { useEffect, useRef, useState } from "react";

export type CategoryItem = {
  title: string;
  imageSrc: string;
  alt?: string;
  href?: string;
};

export type ImageCategoryCarouselProps = {
  title?: string;
  cardWidth?: number;     // px
  cardHeight?: number;    // px
  speedSeconds?: number;  // sólo para autoplay
  pauseOnHover?: boolean; // sólo para autoplay
  autoplay?: boolean;     // por defecto OFF: scroll manual (wheel/drag)
  snap?: boolean;         // snap al inicio de cada tarjeta
  categories?: CategoryItem[];
};

const DEFAULTS: CategoryItem[] = [
  { title: "Exóticos", imageSrc: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop", alt: "Paisaje exótico" },
  { title: "Deportivos", imageSrc: "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1200&auto=format&fit=crop", alt: "Estadio" },
  { title: "Playas", imageSrc: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=80&w=1200&auto=format&fit=crop", alt: "Playa turquesa" },
  { title: "Nieve & Ski", imageSrc: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop", alt: "Montaña nevada" },
  { title: "Escapadas Urbanas", imageSrc: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=1200&auto=format&fit=crop", alt: "Ciudad de noche" },
  { title: "Cruceros", imageSrc: "https://images.unsplash.com/photo-1544551763-7ef42064b2a7?q=80&w=1200&auto=format&fit=crop", alt: "Crucero" },
  { title: "Culturales", imageSrc: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop", alt: "Templo europeo" },
  { title: "Gastronomía", imageSrc: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop", alt: "Mesa gourmet" },
  { title: "Bienestar & Spa", imageSrc: "https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?q=80&w=1200&auto=format&fit=crop", alt: "Spa" },
  { title: "Luna de Miel", imageSrc: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1200&auto=format&fit=crop", alt: "Isla paradisíaca" },
  { title: "Naturaleza", imageSrc: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200&auto=format&fit=crop", alt: "Bosque" },
  { title: "Ruta del Vino", imageSrc: "https://images.unsplash.com/photo-1444723121867-7a241cacace9?q=80&w=1200&auto=format&fit=crop", alt: "Viñedo" },
];

/** Redirige la rueda vertical a scroll horizontal cuando el mouse está sobre el riel */
function useWheelPan(ref: React.RefObject<HTMLElement>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      // si hay desplazamiento horizontal nativo, mantenelo
      const intendHorizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY);
      if (!intendHorizontal) {
        // convertí deltaY a scrollLeft y frená el scroll de la página
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    };
    // Necesitamos passive:false para poder prevenir el scroll de la página
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel as any);
  }, [ref]);
}

/** Permite click+drag para scrollear horizontalmente (UX tipo “grabbable”) */
function useDragScroll(ref: React.RefObject<HTMLElement>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let isDown = false;
    let startX = 0;
    let startScroll = 0;

    const onDown = (e: PointerEvent) => {
      isDown = true;
      startX = e.clientX;
      startScroll = el.scrollLeft;
      el.setPointerCapture(e.pointerId);
      el.classList.add("cursor-grabbing");
    };
    const onMove = (e: PointerEvent) => {
      if (!isDown) return;
      const dx = e.clientX - startX;
      el.scrollLeft = startScroll - dx;
      e.preventDefault();
    };
    const onUp = (e: PointerEvent) => {
      isDown = false;
      el.releasePointerCapture(e.pointerId);
      el.classList.remove("cursor-grabbing");
    };

    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);
    return () => {
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
    };
  }, [ref]);
}

function Track({
  items,
  cardWidth,
  cardHeight,
  speedSeconds,
  pauseOnHover,
  autoplay,
  snap,
}: {
  items: CategoryItem[];
  cardWidth: number;
  cardHeight: number;
  speedSeconds: number;
  pauseOnHover: boolean;
  autoplay: boolean;
  snap: boolean;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);

  // Interacciones fluidas sin pelear con el scroll de la página
  useWheelPan(wrapRef);
  useDragScroll(wrapRef);

  const scrollByCards = (dir: 1 | -1) => {
    const el = wrapRef.current;
    if (!el) return;
    const step = cardWidth * 2 + 32; // 2 tarjetas aprox + márgenes
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <div className="relative">
      {/* Gradientes de borde para indicar overflow */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white to-transparent" />

      {/* Controles */}
      <button
        type="button"
        aria-label="Anterior"
        onClick={() => scrollByCards(-1)}
        className="absolute left-1 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/90 border border-gray-200 shadow p-2 hover:bg-white"
      >
        ‹
      </button>
      <button
        type="button"
        aria-label="Siguiente"
        onClick={() => scrollByCards(1)}
        className="absolute right-1 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/90 border border-gray-200 shadow p-2 hover:bg-white"
      >
        ›
      </button>

      <div
        ref={wrapRef}
        className={[
          "relative overflow-x-auto overflow-y-hidden w-full",
          "flex items-stretch gap-0",
          "cursor-grab select-none",
          snap ? "snap-x snap-mandatory" : "",
          // mejora en táctiles: prioridad a pan-x
          "touch-pan-x",
          // ocultar scrollbars opcional (se vuelve visible si el SO lo fuerza)
          "scrollbar-thin",
        ].join(" ")}
        style={{
          height: `${cardHeight + 40}px`,
          // para Safari/iOS (ocultar barra)
          WebkitOverflowScrolling: "touch",
        }}
        aria-label="Carrusel de categorías"
        role="region"
      >
        <div className="flex w-max flex-nowrap items-center">
          {items.map((item, idx) => (
            <Card key={`${item.title}-${idx}`} item={item} width={cardWidth} height={cardHeight} snap={snap} />
          ))}
        </div>
      </div>

      {/* Autoplay opcional (marquee) — si lo activás, dejamos también el scroll manual */}
      {autoplay && (
        <style>{`
          @keyframes ge-marquee-x { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
          .ge-autoplay > .inner {
            width: max-content;
            animation: ge-marquee-x var(--ge-duration, ${speedSeconds}s) linear infinite;
          }
          .ge-autoplay:hover > .inner { ${pauseOnHover ? "animation-play-state: paused;" : ""} }
          @media (prefers-reduced-motion: reduce) { .ge-autoplay > .inner { animation: none !important; } }
        `}</style>
      )}
    </div>
  );
}

function Card({
  item,
  width,
  height,
  snap,
}: {
  item: CategoryItem;
  width: number;
  height: number;
  snap: boolean;
}) {
  const content = (
    <figure
      className={[
        "mx-2 flex-none w-[var(--w)]",
        "rounded-2xl overflow-hidden border border-gray-200 bg-white",
        "shadow-sm hover:shadow-md transition-shadow duration-300",
        snap ? "snap-start" : "",
      ].join(" ")}
      style={{ ["--w" as any]: `${width}px` }}
    >
      <div className="relative" style={{ height }}>
        <img
          src={item.imageSrc}
          alt={item.alt ?? item.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 will-change-transform hover:scale-[1.05]"
        />
      </div>
      <figcaption className="p-3 text-center">
        <span className="block text-sm font-medium text-gray-900">{item.title}</span>
      </figcaption>
    </figure>
  );
  return item.href ? (
    <a href={item.href} aria-label={`Ver categoría ${item.title}`}>
      {content}
    </a>
  ) : (
    content
  );
}

const ImageCategoryCarousel: React.FC<ImageCategoryCarouselProps> = ({
  title = "Descubrí categorías de paquetes",
  cardWidth = 320,
  cardHeight = 200,
  speedSeconds = 30,
  pauseOnHover = true,
  autoplay = false, // ← por defecto NO animado
  snap = true,
  categories = DEFAULTS,
}) => {
  return (
    <section className="w-full bg-white">
      {/* utilidades para ocultar barra de scroll de forma más agresiva (opcional) */}
      <style>{`
        .scrollbar-thin::-webkit-scrollbar { height: 8px; }
        .scrollbar-thin::-webkit-scrollbar-thumb { background: transparent; }
        .scrollbar-thin:hover::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.15); border-radius: 9999px; }
        .touch-pan-x { touch-action: pan-x; }
      `}</style>

      <div className="px-4 py-10 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-8">
        <header className="mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{title}</h2>
          <p className="mt-1 text-gray-600">
            Desplazá con la rueda, arrastrá con el mouse o swipe en mobile. Botones ‹ › para avanzar.
          </p>
        </header>

        <Track
          items={categories}
          cardWidth={cardWidth}
          cardHeight={cardHeight}
          speedSeconds={speedSeconds}
          pauseOnHover={pauseOnHover}
          autoplay={autoplay}
          snap={snap}
        />
      </div>
    </section>
  );
};

export default ImageCategoryCarousel;
