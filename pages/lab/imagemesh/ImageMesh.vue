<template>
  <div ref="main">
    <canvas ref="canvas" :width="width" :height="height" />
    <script ref="shader-vs" type="x-shader/x-vertex">
      attribute vec3 aVertexPosition;
      attribute vec2 aTextureCoord;
      uniform mat4 uMVPMatrix;
      uniform vec3 uCursor;
      varying vec4 fragColor;
      varying highp vec2 vTextureCoord;
      void main(void) {
        vec3 diff = aVertexPosition - uCursor;
        float dist = length(diff) * 0.05;
        if(dist > 0.5) {
          //dist = 0.0;
        }
        //gl_Position = uMVPMatrix * vec4(aVertexPosition, 1.0) + vec4(diff, 1.0) * dist;
        gl_Position = uMVPMatrix * vec4(aVertexPosition[0], aVertexPosition[1], -dist, 1.0);
        gl_PointSize = 4.0;
        float c = length(aVertexPosition) * 0.2;
        fragColor = vec4(1.0, c, c, 1.0);
        if(dist > 0.0)
          fragColor = vec4(0, 1, 0, 1.0);
        vTextureCoord = aTextureCoord;
      }
    </script>
    <script ref="shader-fs" type="x-shader/x-fragment">
      precision mediump float;
      varying vec4 fragColor;
      varying highp vec2 vTextureCoord;
      uniform sampler2D uSampler;
      void main(void) {
        // vec2 coord = gl_PointCoord - vec2(0.5);  //from [0,1] to [-0.5,0.5]
        //if(length(coord) > 0.5)                 //outside of circle radius?
        //  discard;
        //float l = 1.0 - length(coord) * 2.0;
        //gl_FragColor = vec4(l, l, l, 1.0);
        //float c = gl_VertexID;
        //gl_FragColor = vec4(c, 1.0, 1.0, 1.0);
        //gl_FragColor = fragColor;
        gl_FragColor = texture2D(uSampler, vTextureCoord);
      }
    </script>
    <script ref="fs-points" type="x-shader/x-fragment">
      precision mediump float;
      void main(void) {
        gl_FragColor = vec4(1.0, 0.5, 0.5, 1.0);
      }
    </script>
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      default: null
    },
    clearColor: {
      type: Array,
      default: () => { return [0, 0, 0, 1] },
    }
  },
  data() {
    return {
      width: 0,
      height: 0,
      eventListeners: []
    }
  },
  mounted() {
    if(process.browser) {
      if(typeof mat4 == 'undefined') {
        const script = document.createElement('script')
        script.onload = event => {
          this.init()
        }
        document.head.appendChild(script)
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gl-matrix/2.7.1/gl-matrix-min.js'
      } else {
        this.init()
      }
    }
  },
  destroyed() {
    if(process.browser) {
      this.removeEventListeners()
    }
  },
  methods: {
    addEventListener(object, type, callback) {
      object.addEventListener(type, callback)
      this.eventListeners.push([object, type, callback])
    },
    removeEventListeners() {
      for(const array of this.eventListeners) {
        array[0].removeEventListener(array[1], array[2])
      }
    },
    init() {
      const self = this
      const canvas = this.$refs.canvas
      const gl = canvas.getContext('webgl')

      if(gl === null) {
        console.error('WebGL not supported')
        return
      }

      function loadTexture(gl, url) {
        const texture = gl.createTexture()
        const level = 0
        const internalFormat = gl.RGBA
        const width = 1
        const height = 1
        const border = 0
        const srcFormat = gl.RGBA
        const srcType = gl.UNSIGNED_BYTE
        const pixel = new Uint8Array([0, 0, 255, 255])

        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(
          gl.TEXTURE_2D,
          level,
          internalFormat,
          width,
          height,
          border,
          srcFormat,
          srcType,
          pixel
        )

        const image = new Image()
        image.onload = function() {
          gl.bindTexture(gl.TEXTURE_2D, texture)
          gl.texImage2D(gl.TEXTURE_2D, level, internalFormat, srcFormat, srcType, image)
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
        }
        image.onerror = function(event) {
          console.error('texture error', event)
        }
        if ((new URL(url)).origin !== window.location.origin) {
          image.crossOrigin = ''
        }
        image.src = url

        return texture;
      }

      function getShader(gl, id) {
        const script = self.$refs[id]
        if(!script) {
          console.error('Shader not found: ' + id)
          return null
        }
        const typeMap = {
          'x-shader/x-fragment': gl.FRAGMENT_SHADER,
          'x-shader/x-vertex': gl.VERTEX_SHADER,
        }
        if(!typeMap[script.type]) {
          console.error('Shader type not supported: ' + script.type)
          return null
        }
        let shader = gl.createShader(typeMap[script.type])
        gl.shaderSource(shader, script.textContent)
        gl.compileShader(shader)
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.error('Error compiling shader', gl.getShaderInfoLog(shader))
            return null
        }
        return shader
      }

      let shaderProgram;
      let shaderProgram2;
      let mvMatrix = mat4.create()
      let pMatrix = mat4.create()
      let mvpMatrix = mat4.create()
      let vertexBuffer;
      let indexBuffer;
      let uCursor = vec3.create()
      let n = 4
      let texture = loadTexture(gl, this.src)

      this.addEventListener(document, 'mousemove', event => {
        const x = (event.pageX - canvas.offsetLeft) / canvas.offsetWidth
        const y = (event.pageY - canvas.offsetTop) / canvas.offsetHeight
        vec3.set(uCursor, x, y, 0)
      })

      let initCanvas = () => {
        this.width = this.$refs.main.offsetWidth
        this.height = this.width * 0.5625

        gl.viewportWidth = this.width;
        gl.viewportHeight = this.height;

        gl.clearColor(...self.clearColor)
        gl.enable(gl.DEPTH_TEST)

        mat4.perspective(pMatrix, glMatrix.toRadian(55), 1, 0.1, 10.0)
      }

      this.addEventListener(canvas, 'resize', event => {
        initCanvas()
      })

      function initShaders() {
        var fragmentShader = getShader(gl, 'shader-fs')
        var vertexShader = getShader(gl, 'shader-vs')
        shaderProgram = gl.createProgram()
        gl.attachShader(shaderProgram, vertexShader)
        gl.attachShader(shaderProgram, fragmentShader)
        gl.linkProgram(shaderProgram)
        if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
          alert('Could not initialise shaders')
        }
        shaderProgram.aVertexPosition = gl.getAttribLocation(shaderProgram, 'aVertexPosition')
        shaderProgram.aTextureCoord = gl.getAttribLocation(shaderProgram, 'aTextureCoord')
        gl.enableVertexAttribArray(shaderProgram.aVertexPosition)
        gl.enableVertexAttribArray(shaderProgram.aTextureCoord)
        shaderProgram.uMVPMatrix = gl.getUniformLocation(shaderProgram, 'uMVPMatrix')
        shaderProgram.uCursor = gl.getUniformLocation(shaderProgram, 'uCursor')
        shaderProgram.uSampler = gl.getUniformLocation(shaderProgram, 'uSampler')

        /* var fragmentShader = getShader(gl, 'fs-points')
        //var vertexShader = getShader(gl, 'shader-vs')
        shaderProgram2 = gl.createProgram()
        gl.attachShader(shaderProgram2, vertexShader)
        gl.attachShader(shaderProgram2, fragmentShader)
        gl.linkProgram(shaderProgram2)
        if (!gl.getProgramParameter(shaderProgram2, gl.LINK_STATUS)) {
          alert('Could not initialise shaders')
        }
        shaderProgram2.aVertexPosition = gl.getAttribLocation(shaderProgram2, 'aVertexPosition')
        shaderProgram2.aTextureCoord = gl.getAttribLocation(shaderProgram2, 'aTextureCoord')
        gl.enableVertexAttribArray(shaderProgram2.aVertexPosition)
        gl.enableVertexAttribArray(shaderProgram2.aTextureCoord)
        shaderProgram2.uMVPMatrix = gl.getUniformLocation(shaderProgram2, 'uMVPMatrix')
        shaderProgram2.uCursor = gl.getUniformLocation(shaderProgram2, 'uCursor') */
      }

      function initBuffers() {
        vertexBuffer = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
        let vertices = []
        for(let x = 0; x < n; ++x) {
          for(let y = 0; y < n; ++y) {
            vertices.push(x, y, Math.random() * 0, 0, 0)
            vertices.push(x + 1, y, Math.random() * 0, 0, 0)
            vertices.push(x, y + 1, Math.random() * 0, 0, 0)
            vertices.push(x, y + 1, Math.random() * 0, 0, 0)
            vertices.push(x + 1, y, Math.random() * 0, 0, 0)
            vertices.push(x + 1, y + 1, Math.random() * 0, 0, 0)
          }
        }
        vertices = vertices.map(x => {
          return x * 1.0 / n
        })
        console.log(vertices.slice(vertices.length - 10))
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)
        vertexBuffer.itemSize = 5
        vertexBuffer.numItems = vertices.length / vertexBuffer.itemSize
        console.log(vertexBuffer.numItems)

        let indices = []
        for(let y = 0; y < 1; ++y) {
            for(let x = 0; x < 1; ++x) {
                let start = y * n + x;
                indices.push(
                  start,
                  start + 1,
                  start + 2,
                  start + 2,
                  start + 1,
                  start + 3,
                )
            }
        }

        indexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
        indexBuffer.numItems = indices.length / 2
      }

      let zmin = -0.95;
      let zmax = -0.90;
      let zdir = 1;
      let z = zmin;

      function drawScene(now, delta) {
        gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight)
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
        z += now * 0.0000000005 * zdir
        if(z < zmin) {
          z = zmin;
          zdir = -zdir;
        } else if(z > zmax) {
          z = zmax;
          zdir = -zdir;
        }
        mat4.identity(mvMatrix)
        mat4.translate(mvMatrix, mvMatrix, [-.5, .5, z])
        mat4.rotateX(mvMatrix, mvMatrix, glMatrix.toRadian(180))
        //mat4.rotateY(mvMatrix, mvMatrix, now * 0.001)
        mat4.multiply(mvpMatrix, pMatrix, mvMatrix)
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)

        if(shaderProgram2) {
          gl.useProgram(shaderProgram2)
          //gl.enable(gl.BLEND);
          //gl.blendColor(1, 1, 1, 1);
          //gl.blendFunc(gl.CONSTANT_COLOR, gl.SRC_ALPHA_SATURATE);
          gl.vertexAttribPointer(shaderProgram2.aVertexPosition, 3, gl.FLOAT, false, vertexBuffer.itemSize * 4, 0 * 4)
          gl.vertexAttribPointer(shaderProgram2.aTextureCoord, 2, gl.FLOAT, false, vertexBuffer.itemSize * 4, 0 * 4)
          gl.uniformMatrix4fv(shaderProgram2.uMVPMatrix, false, mvpMatrix)
          gl.uniform3fv(shaderProgram2.uCursor, uCursor)
          gl.drawArrays(gl.POINTS, 0, vertexBuffer.numItems)
        }

        gl.useProgram(shaderProgram)
        gl.vertexAttribPointer(shaderProgram.aVertexPosition, 3, gl.FLOAT, false, vertexBuffer.itemSize * 4, 0 * 4)
        gl.vertexAttribPointer(shaderProgram.aTextureCoord, 2, gl.FLOAT, false, vertexBuffer.itemSize * 4, 0 * 4)
        gl.uniformMatrix4fv(shaderProgram.uMVPMatrix, false, mvpMatrix)
        gl.uniform3fv(shaderProgram.uCursor, uCursor)
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.uniform1i(shaderProgram.uSampler, 0);
        //gl.disable(gl.BLEND);
        //mat4.translate(mvMatrix, mvMatrix, [.0, .0, -0.01])
        //mat4.multiply(mvpMatrix, pMatrix, mvMatrix)
        //gl.uniformMatrix4fv(shaderProgram.uMVPMatrix, false, mvpMatrix)
        gl.drawArrays(gl.TRIANGLES, 0, vertexBuffer.numItems)

      }

      initCanvas()
      initShaders()
      initBuffers()

      let lastFrame = 0
      function update(now) {
        if(!lastFrame) {
          lastFrame = now
        }
        let delta = now - lastFrame
        if(delta > 0) {
          drawScene(now, delta)
          lastFrame = now
        }
        requestAnimationFrame(update)
      }

      update()
    }
  }
}
</script>
