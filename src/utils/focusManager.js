import { HighlightLayer } from "@babylonjs/core/Layers/highlightLayer";
import { Color3 } from "@babylonjs/core/Maths/math.color";
import { Animation } from "@babylonjs/core/Animations/animation";

let highlightLayer;
let selectedMesh = null;

// 场景准备好后，初始化高亮图层
export function initFocusManager(scene) {
    highlightLayer = new HighlightLayer("highlightLayer", scene);
}

// 选中对象：取消旧高亮，添加新高亮，移动相机
export function focusMesh(scene, mesh) {
    if (selectedMesh) {
        highlightLayer.removeMesh(selectedMesh);
        selectedMesh = null;
    }

    if (!mesh) return;

    selectedMesh = mesh;
    highlightLayer.addMesh(mesh, Color3.Blue());

    zoomToMesh(scene, mesh);
}

function zoomToMesh(scene, mesh) {
    const camera = scene.activeCamera;
    if (!camera) return;

    const bounds = mesh.getBoundingInfo().boundingBox;
    const center = bounds.centerWorld.clone();
    const size = bounds.maximumWorld
        .subtract(bounds.minimumWorld)
        .length();

    const transitions = [
        ["target", camera.target.clone(), center],
        ["radius", camera.radius, Math.max(size * 2, 3)],
        ["beta", camera.beta, 1.1],
    ];

    for (const [property, from, to] of transitions) {
        Animation.CreateAndStartAnimation(
            `focus-${property}`,
            camera,
            property,
            60,
            45,
            from,
            to,
            Animation.ANIMATIONLOOPMODE_CONSTANT
        );
    }
}