import { ShaderMaterial } from "three";

const uniformData = {
  u_time: {
    type: "f",
    value: 0,
  },
  distance: {
    type: "f",
    value: 0,
  },
};

const textMaterial = new ShaderMaterial({
  // wireframe: true,
  uniforms: uniformData,
  vertexShader: `
  // uniform float u_time;
  // varying vec2 vUv;
  varying float zPos;
  varying float waveHeight;

  void main(){
    // vUv = uv;
    // zPos = 0.;

    // vec3 displacement = vec3(0);
    // waveHeight = .5 + .5 * sin(position.y + u_time);

    // displacement *= waveHeight;

    vec4 wordPos = projectionMatrix *
      modelViewMatrix * vec4(position, 1.);

    zPos = wordPos.z;
    gl_Position = wordPos;
  }
`,
  fragmentShader: `
  // varying vec2 vUv;
  // uniform float u_time;
  uniform float distance;
  varying float zPos;
  varying float waveHeight;

  vec3 hsl2rgb( in vec3 c )
  {
    vec3 rgb = clamp( abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),6.0)-3.0)-1.0, 0.0, 1.0 );

    return c.z + c.y * (rgb-0.5)*(1.0-abs(2.0*c.z-1.0));
  }

  void main(){
    vec3 color = hsl2rgb(vec3(zPos * .2 + distance * .3, 1, 0.9));
    // color.rg *= .5 + .5 * sin(zPos * 3.);

    gl_FragColor = vec4(color,1.0);
  }`,
});

export default textMaterial;
