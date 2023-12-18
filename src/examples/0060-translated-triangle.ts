// @ts-ignore
import { getWebGLContext, initShaders } from "../lib/cuon-utils.js"
export const drawAPoint = (canvas: HTMLCanvasElement) => {
  const VSHADER_SOURCE = `
  attribute vec4 a_Position;
  uniform vec4 u_Translation;
  void main() {
    gl_Position = a_Position + u_Translation;
  }`
  const FSHADER_SOURCE = `void main() {
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
  }`
  const tX = 0.5
  const tY = 0.5
  const tZ = 0.5
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
    gl.drawArrays(gl.TRIANGLES, 0, n)
  }
  function initVertexBuffers(gl: WebGL2RenderingContext) {
    const vertices = new Float32Array([0.0, 0.5, -0.5, -0.5, 0.5, -0.5])
    const n = 3

    // 创建缓冲区对象
    const vertexBuffer = gl.createBuffer()
    if (!vertexBuffer) {
      console.log("Failed to create the buffer object")
      return -1
    }
    // 将缓冲区对象绑定到目标
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)

    // 向缓冲区对象写入数据
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)

    const a_Position = gl.getAttribLocation(gl.program, "a_Position")
    const u_Translation = gl.getUniformLocation(gl.program, "u_Translation")

    // 将缓冲区对象分配给a_Position变量
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0)
    gl.uniform4f(u_Translation, tX, tY, tZ, 0.0)

    // 链接a_Position变量与分配给它的缓冲区对象
    gl.enableVertexAttribArray(a_Position)
    return n
  }
  main()
}
