import { PointerEventTypes } from "@babylonjs/core";

export function enableRaycasting(scene, callback = defaultCallback) {
    scene.onPointerObservable.add((pointerInfo) => {
        if (pointerInfo.type !== PointerEventTypes.POINTERPICK) {
            return;
        }

        const pickResult = pointerInfo.pickInfo;

        if (!pickResult?.hit || !pickResult.pickedMesh) {
            console.log("Nothing clicked");
            return;
        }

        callback(pickResult);
    });
}

function defaultCallback(pickResult) {
    const mesh = pickResult.pickedMesh;

    console.log("Clicked:", {
        object: mesh,
        name: mesh.name,
        id: mesh.id,
        position: mesh.position,
    });
}