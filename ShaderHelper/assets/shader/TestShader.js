const renderEngine = cc.renderer.renderEngine;
const renderer = renderEngine.renderer;
const CustomMaterial = require('CustomMaterial');
let size = {
    width: cc.view.getVisibleSize().width / cc.view.getDevicePixelRatio(),
    height: cc.view.getVisibleSize().height / cc.view.getDevicePixelRatio()
}
const shader = {
    name: 'TestShader',
    params: [
        { name: 'time', type: renderer.PARAM_FLOAT, default: 0 },
        { name: 'size', type: renderer.PARAM_FLOAT2, default: [360, 640] }
    ],
    start(sprite, material) {
        this._start = Date.now();
        this._notTime = 0;

        console.log("size", size, cc.view.getDevicePixelRatio());
        material.setParamValue('size', [360, 640]);
    },
    update(sprite, material, dt) {
        // if (time >= 1) {
        //     time = 0;
        //     this._start = now;
        // }
        this._notTime += dt;
        if (this._notTime > 1) {
            this._notTime = 0;
        }

        material.setParamValue('time', this._notTime * 2 - 1);
        material.setParamValue('size', [360, 640]);

        // material.setParamValue('size', [200,200]);
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
        uniform vec2 size;

        varying vec2 uv0;
        
        
        void main(){


            // vec4 color = 
            // vec2 coordPos = vec2(gl_FragCoord.x / 360.0 * 2.0 - 1.0, gl_FragCoord.y / 640.0 * 2.0 - 1.0);


            // float ss = sin(time  + coordPos.y);
            // coordPos *= ss;


            // coordPos.y = coordPos.y - 0.25;
            // float r = length(coordPos);
            // float a = atan(coordPos.x, coordPos.y) / 3.1415926;
            // float h = abs(a);
            // float d = (13.0*h - 22.0*h*h + 10.0*h*h*h)/(6.0-5.0*h);
            // vec3 bgColor = vec3(1.0, 1.0, 1.0);
            // vec3 redColor = vec3(1.0, 0.0, 0.0);
            // float s = smoothstep(0.0, 0.1, d - r);
            // float c = clamp( s   , 0.0, 1.0);
            // vec3 endColor = mix(bgColor, redColor, s);
            // gl_FragColor = vec4(endColor.xyz, 1.0);

        }
    `,
}
console.log("test shader");
CustomMaterial.addShader(shader);