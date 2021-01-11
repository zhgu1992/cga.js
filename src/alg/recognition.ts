import { Vec3 } from '../math/Vec3';
import { Point } from '../struct/3d/Point';
import { Line } from '../struct/3d/Line';
import { vectorCompare } from './sort';
import { Plane } from '../struct/3d/Plane'; 
import { Vec2 } from '../math/Vec2';
import { Polygon } from '../struct/3d/Polygon';

/**
 * 计算共面点集所在的平面 前提是所有的点都在一个平面上
 * @param {Array<Vec3>} points 
 */
export function recognitionPlane(points: Vec3[] | any) {
    points.sort(vectorCompare);
    var line = new Line(points[0], points.get(-1));
    var maxDistance = -Infinity;
    var ipos = -1;
    for (let i = 1; i < points.length - 1; i++) {
        const pt = points[i];
        const distance: any | number = line.distancePoint(pt).distance;
        if (distance > maxDistance) {
            maxDistance = distance;
            ipos = i;
        }
    }
    var plane = new Plane();
    plane.setFromThreePoint(points[0], points.get(-1), points[ipos]);

    return plane;
}

/**
 * 识别多边形顺逆时针  格林求和 投影到XY平面
 * @param points 
 */
export function recognitionCCW(points: Vec2[] | Vec3[]) {
    let d = 0;
    for (var i = 0; i < points.length - 1; i++) {
        var p = points[i]
        var p1 = points[i + 1]
        d += -0.5 * (p1.y + p.y) * (p1.x + p.x);
    }
    return d > 0;
}


/**
 * robust 识别出点集或者多边形的法线
 * @param {Polygon|Array<Point|Vector3>} points 
 * @returns {Vector3} 法线
 */
export function recognitionPolygonNormal(points: Polygon | Vec3[] | any) {
    return recognitionPlane(points).normal;
}

