const renderEngine = cc.renderer.renderEngine;
const renderer = renderEngine.renderer;
const CustomMaterial = require('CustomMaterial');
const shader = {
    name: 'TestShader',
    params: [
        { name: 'time', type: renderer.PARAM_FLOAT, default: 0 }
    ],
    start() {
        this._start = Date.now();
        this._notTime = 0;
    },
    update(sprite, material) {
        const now = Date.now();
        let time = (now - this._start) / 1000;
        // if (time >= 1) {
        //     time = 0;
        //     this._start = now;
        // }

        material.setParamValue('time', Math.sin(time) * 0.1 + 0.05);

        // if (this._notTime !== undefined){
        //     this._notTime ++;
        //     if (this._notTime > 10){
        //         this._notTime = 0;
        //         material.setParamValue('time', time);
        //     }
        // }
        
    },
    defines: [],
    vert: `
        uniform mat4 viewProj;
        attribute vec3 a_position;
        attribute vec2 a_uv0;
        varying vec2 uv0;
        varying mat4 viewProjV;
        void main(){
            vec4 pos = viewProj * vec4(a_position, 1);
            gl_Position = pos;
            uv0 = a_uv0;
            viewProjV = viewProj;
        }
    `,
    frag: `
        uniform sampler2D texture;
        uniform vec4 color;
        uniform float time;
        varying vec2 uv0;
        void main(){
            vec4 src_color = color * texture2D(texture, uv0).rgba;
            float width = 0.03;
            float start = tan(time);
            if (uv0.x >  start && uv0.x < start + width){
                gl_FragColor = vec4(src_color.r + 0.4, src_color.g + 0.4, src_color.b + 0.4, 1);
            }else {
                gl_FragColor = src_color;

            }
        }
    `,
}
console.log("test shader");
CustomMaterial.addShader(shader);