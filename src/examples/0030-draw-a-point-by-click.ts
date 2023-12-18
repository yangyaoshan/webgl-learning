// @ts-ignore
import { getWebGLContext, initShaders } from "../lib/cuon-utils.js"
export const drawAPoint = (canvas: HTMLCanvasElement) => {
  const VSHADER_SOURCE = `
  attribute vec4 a_Position;
  void main() {
    gl_Position = a_Position;
    gl_PointSize = 10.0;
  }`
  const FSHADER_SOURCE = `
  precision mediump float;
  uniform vec4 u_FragColor;
  void main() {
    gl_FragColor = u_FragColor;
  }`
  function main() {
    const gl = getWebGLContext(canvas) as WebGL2RenderingContext
    // 初始化着色器
    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
      console.log("fail")
      return
    }

    const a_Position = gl.getAttribLocation(gl.program, "a_Position")
    const u_FragColor = gl.getUniformLocation(gl.program, "u_FragColor")
    canvas.onmousedown = function (e: MouseEvent) {
      click(e, gl, canvas, a_Position, u_FragColor)
    }

    // gl.vertexAttrib3f(a_Position, 0.0, 0.0, 0.0)

    // 设置背景色
    gl.clearColor(0.0, 0.0, 0.0, 1.0)

    // 清空canvas
    gl.clear(gl.COLOR_BUFFER_BIT)

    // 绘制一个点
    // gl.drawArrays(gl.POINTS, 0, 1)
  }
  const g_point: Array<[number, number]> = []
  const g_color: Array<[number, number, number, number]> = []
  function click(
    e: MouseEvent,
    gl: WebGL2RenderingContext,
    canvas: HTMLCanvasElement,
    a_Position: number,
    u_FragColor: WebGLUniformLocation
  ) {
    let x = e.clientX
    let y = e.clientY
    const rect = (e?.target as HTMLElement)?.getBoundingClientRect()
    x = (x - rect.left - canvas.width / 2) / (canvas.width / 2)
    y = (canvas.height / 2 - (y - rect.top)) / (canvas.height / 2)
    g_point.push([x, y])
    // g_color.push
    if (x >= 0.0 && y >= 0.0) {
      g_color.push([1.0, 0.0, 0.0, 1.0])
    } else if (x < 0.0 && y < 0.0) {
      g_color.push([0.0, 1.0, 0.0, 1.0])
    } else {
      g_color.push([0.0, 0.0, 1.0, 1.0])
    }
    console.log(
      "🚀 ~ file: draw-a-point-by-click.ts:62 ~ drawAPoint ~ g_color:",
      g_color
    )

    gl.clear(gl.COLOR_BUFFER_BIT)

    const len = g_point.length
    for (let i = 0; i < len; i++) {
      const rgba = g_color[i]
      gl.vertexAttrib3f(a_Position, g_point[i][0], g_point[i][1], 0.0)
      gl.uniform4f(u_FragColor, ...rgba)

      gl.drawArrays(gl.POINTS, 0, 1)
    }
  }
  main()
}
