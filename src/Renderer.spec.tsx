import { describe, it, expect } from "vitest";
import { render, fireEvent, act } from "@testing-library/react";
import Renderer from "./Renderer";

describe("Renderer Component", () => {
  it("renders canvas and controls", () => {
    const { container, getByText } = render(<Renderer />);
    const canvas = container.querySelector("canvas");
    expect(canvas).toBeInTheDocument();
    expect(getByText(/WebGL Mandelbrot Renderer/i)).toBeInTheDocument();
  });

  it("updates zoom on wheel event", () => {
    const { container, getByText } = render(<Renderer />);
    const canvas = container.querySelector("canvas") as Element;
    // Get the initial zoom value from the controls.
    const zoomControl = getByText(/Zoom:/i).nextElementSibling;
    const initialZoom = zoomControl?.textContent;
    // Fire a wheel event to change the zoom.
    act(() => {
      fireEvent.wheel(canvas, { deltaY: -100 });
    });
    // Check that the zoom value has been updated.
    const updatedZoom = getByText(/Zoom:/i).nextElementSibling?.textContent;
    expect(updatedZoom).not.toEqual(initialZoom);
  });

  it("updates center on mouse drag", () => {
    const { container, getByText } = render(<Renderer />);
    const canvas = container.querySelector("canvas") as Element;
    // Record the initial center value.
    const centerXControl = getByText(/x =/i);
    const initialCenterX = centerXControl.textContent;
    
    act(() => {
      fireEvent.mouseDown(canvas, { clientX: 100, clientY: 100 });
    });
    act(() => {
      fireEvent.mouseMove(canvas, { clientX: 120, clientY: 120 });
    });
    act(() => {
      fireEvent.mouseUp(canvas);
    });
    
    // After dragging, the center text should have changed.
    const updatedCenterX = getByText(/x =/i).textContent;
    expect(updatedCenterX).not.toEqual(initialCenterX);
  });

  it("updates center on touch drag", () => {
    const { container, getByText } = render(<Renderer />);
    const canvas = container.querySelector("canvas") as Element;
    // Record the initial center value.
    const centerYControl = getByText(/y =/i);
    const initialCenterY = centerYControl.textContent;
    
    act(() => {
      fireEvent.touchStart(canvas, {
        touches: [{ clientX: 100, clientY: 100 }],
      });
    });
    act(() => {
      fireEvent.touchMove(canvas, {
        touches: [{ clientX: 130, clientY: 130 }],
      });
    });
    act(() => {
      fireEvent.touchEnd(canvas);
    });
    
    // After dragging, the center text should have updated.
    const updatedCenterY = getByText(/y =/i).textContent;
    expect(updatedCenterY).not.toEqual(initialCenterY);
  });
});
