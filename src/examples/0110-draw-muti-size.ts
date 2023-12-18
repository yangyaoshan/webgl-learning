// @ts-ignore
import { getWebGLContext, initShaders } from "../lib/cuon-utils.js"
export const drawAPoint = (canvas: HTMLCanvasElement) => {
  const VSHADER_SOURCE = `
  attribute vec4 a_Position;
  attribute float a_PointSize;
  void main() {
    gl_Position = a_Position;
    gl_PointSize = a_PointSize;
  }`
  const FSHADER_SOURCE = `void main() {
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
  }`
  function main() {
    const gl = getWebGLContext(canvas) as WebGL2RenderingContext
    // 初始化着色器
    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
      console.log("fail")
      return
    }

    const n = initVertexBuffers(gl)
    if (n < 0) {
      console.log("Failed to set the positions of the vertices")
      return
    }

    // 设置背景色
    gl.clearColor(0.0, 0.0, 0.0, 1.0)

    // 清空canvas
    gl.clear(gl.COLOR_BUFFER_BIT)

    // 绘制一个点
    gl.drawArrays(gl.POINTS, 0, n)
  }
  function initVertexBuffers(gl: WebGL2RenderingContext) {
    const vertices = new Float32Array([0.0, 0.5, -0.5, -0.5, 0.5, -0.5])
    const sizes = new Float32Array([10.0, 20.0, 30.0])
    const n = 3

    // 创建缓冲区对象
    const vertexBuffer = gl.createBuffer()
    const sizeBuffer = gl.createBuffer()
    if (!vertexBuffer) {
      console.log("Failed to create the buffer object")
      return -1
    }
    // 将缓冲区对象绑定到目标
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)

    // 向缓冲区对象写入数据
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)

    const a_Position = gl.getAttribLocation(gl.program, "a_Position")

    // 将缓冲区对象分配给a_Position变量
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0)

    // 链接a_Position变量与分配给它的缓冲区对象
    gl.enableVertexAttribArray(a_Position)

    gl.bindBuffer(gl.ARRAY_BUFFER, sizeBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, sizes, gl.STATIC_DRAW)
    const a_PointSize = gl.getAttribLocation(gl.program, "a_PointSize")
    gl.vertexAttribPointer(a_PointSize, 1, gl.FLOAT, false, 0, 0)
    gl.enableVertexAttribArray(a_PointSize)
    return n
  }
  main()
}
