import { useRef, useState } from "react";

const messages = [
  "Hi, I’m Pip!",
  "I’m cheering you on.",
  "Let’s build something useful.",
];

export default function Pet() {
  const [messageIndex, setMessageIndex] = useState(-1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const wrapperRef = useRef(null);
  const dragRef = useRef(null);
  const wasDraggedRef = useRef(false);
  const isTalking = messageIndex >= 0;

  function talkToPip() {
    setMessageIndex((current) => (current + 1) % messages.length);
  }

  function handlePointerDown(event) {
    if (event.pointerType === "mouse" && event.button !== 0) return;

    const wrapperRect = wrapperRef.current.getBoundingClientRect();
    const heroRect = wrapperRef.current.closest(".hero").getBoundingClientRect();
    dragRef.current = {
      pointerX: event.clientX,
      pointerY: event.clientY,
      position,
      wrapperRect,
      heroRect,
      moved: false,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
    setDragging(true);
  }

  function handlePointerMove(event) {
    if (!dragRef.current) return;

    const drag = dragRef.current;
    const deltaX = event.clientX - drag.pointerX;
    const deltaY = event.clientY - drag.pointerY;
    if (Math.abs(deltaX) + Math.abs(deltaY) > 3) drag.moved = true;

    const minX = drag.position.x + drag.heroRect.left - drag.wrapperRect.left;
    const maxX = drag.position.x + drag.heroRect.right - drag.wrapperRect.right;
    const minY = drag.position.y + drag.heroRect.top - drag.wrapperRect.top;
    const maxY = drag.position.y + drag.heroRect.bottom - drag.wrapperRect.bottom;

    setPosition({
      x: Math.min(maxX, Math.max(minX, drag.position.x + deltaX)),
      y: Math.min(maxY, Math.max(minY, drag.position.y + deltaY)),
    });
  }

  function handlePointerUp() {
    if (!dragRef.current) return;
    wasDraggedRef.current = dragRef.current.moved;
    dragRef.current = null;
    setDragging(false);
    window.setTimeout(() => { wasDraggedRef.current = false; }, 0);
  }

  function handleKeyDown(event) {
    const step = event.shiftKey ? 32 : 16;
    const directions = {
      ArrowUp: [0, -step],
      ArrowDown: [0, step],
      ArrowLeft: [-step, 0],
      ArrowRight: [step, 0],
    };
    const direction = directions[event.key];
    if (!direction) return;

    event.preventDefault();
    const wrapperRect = wrapperRef.current.getBoundingClientRect();
    const heroRect = wrapperRef.current.closest(".hero").getBoundingClientRect();
    const minX = position.x + heroRect.left - wrapperRect.left;
    const maxX = position.x + heroRect.right - wrapperRect.right;
    const minY = position.y + heroRect.top - wrapperRect.top;
    const maxY = position.y + heroRect.bottom - wrapperRect.bottom;
    setPosition({
      x: Math.min(maxX, Math.max(minX, position.x + direction[0])),
      y: Math.min(maxY, Math.max(minY, position.y + direction[1])),
    });
  }

  return (
    <div
      ref={wrapperRef}
      className="hero-pet-wrap"
      style={{ "--pet-x": `${position.x}px`, "--pet-y": `${position.y}px` }}
    >
      <button
        type="button"
        className={`hero-pet${isTalking ? " is-talking" : ""}${dragging ? " is-dragging" : ""}`}
        onClick={() => {
          if (wasDraggedRef.current) {
            wasDraggedRef.current = false;
            return;
          }
          talkToPip();
        }}
        onKeyDown={handleKeyDown}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        aria-label={isTalking ? "Move Pip with the arrow keys, or ask Pip to say something else" : "Move Pip with the arrow keys, or say hello to Pip"}
        aria-keyshortcuts="ArrowUp ArrowDown ArrowLeft ArrowRight"
        aria-expanded={isTalking}
        aria-controls="hero-pet-message"
        aria-describedby={isTalking ? "hero-pet-message" : undefined}
      >
        <span className="hero-pet-creature" aria-hidden="true">
          <span className="hero-pet-antenna" />
          <span className="hero-pet-ear hero-pet-ear-left" />
          <span className="hero-pet-ear hero-pet-ear-right" />
          <span className="hero-pet-face">
            <span className="hero-pet-eye hero-pet-eye-left" />
            <span className="hero-pet-eye hero-pet-eye-right" />
            <span className="hero-pet-cheek hero-pet-cheek-left" />
            <span className="hero-pet-cheek hero-pet-cheek-right" />
            <span className="hero-pet-mouth" />
          </span>
          <span className="hero-pet-belly" />
        </span>
        <span className="hero-pet-shadow" aria-hidden="true" />
      </button>
      <span id="hero-pet-message" className="hero-pet-message" role="status" hidden={!isTalking}>
        {messages[messageIndex]}
      </span>
      <span className="hero-pet-name" aria-hidden="true">PIP · MOVE ME</span>
    </div>
  );
}
