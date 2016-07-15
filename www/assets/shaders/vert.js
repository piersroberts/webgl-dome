vertexShader = `const float PI = 3.14159265;

void main() {
    vec4  pos   = modelViewMatrix * vec4(position, 1.0);
    float lenxy = length(pos.xy);

    if (lenxy != 0.0) {
        float phi = atan(lenxy, -pos.z);
        pos.xy = normalize(pos.xy);
        float r = phi / (PI / 2.0);
        pos.xy *= r;
    }

    gl_Position = projectionMatrix * pos;
}`