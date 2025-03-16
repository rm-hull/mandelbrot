import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from "@testing-library/jest-dom/matchers";

expect.extend(matchers);

afterEach(() => {
  cleanup();
});

Object.defineProperty(HTMLCanvasElement.prototype, "getContext", {
  value: function (contextType: string) {
      if (contextType === "webgl" || contextType === "experimental-webgl") {
          return {
              viewport: () => {},
              clearColor: () => {},
              clear: () => {},
              createBuffer: () => ({}),
              bindBuffer: () => ({}),
              bufferData: () => {},
              createShader: () => ({}),
              shaderSource: () => {},
              compileShader: () => {},
              createProgram: () => ({}),
              attachShader: () => {},
              linkProgram: () => {},
              useProgram: () => {},
              getUniformLocation: () => ({}),
              uniform1f: () => {},
              uniform2f: () => {},
              uniform1i: () => {},
              drawArrays: () => {},
              getShaderParameter: () => ({}),
              getProgramParameter: () => ({}),
              getAttribLocation: () => ({}),
              enableVertexAttribArray: () => {},
              vertexAttribPointer: () => {},
              deleteProgram: () => {},
              deleteShader: () => {},
              deleteBuffer: () => {},

              // Add other stub methods as needed.
          };
      }
      return null;
  },
});
