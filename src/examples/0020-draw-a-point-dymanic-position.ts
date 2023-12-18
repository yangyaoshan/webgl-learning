// @ts-ignore
import { getWebGLContext, initShaders } from "../lib/cuon-utils.js"
export const drawAPoint = (canvas: HTMLCanvasElement) => {
  const VSHADER_SOURCE = `
  attribute vec4 a_Position;
  void main() {
    gl_Position = a_Position;
    gl_PointSize = 10.0;
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

    console.log(
      "🚀 ~ file: draw-a-point-dymanic-position.ts:22 ~ main ~ gl.program:",
      gl.program
    )
    const a_Position = gl.getAttribLocation(gl.program, "a_Position")

    gl.vertexAttrib3f(a_Position, 0.0, 0.0, 0.0)

    // 设置背景色
    gl.clearColor(0.0, 0.0, 0.0, 1.0)

    // 清空canvas
    gl.clear(gl.COLOR_BUFFER_BIT)

    // 绘制一个点
    gl.drawArrays(gl.POINTS, 0, 1)
  }
  main()
}
