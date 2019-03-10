(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],{

/***/ "./node_modules/@turf/bbox/index.js":
/*!******************************************!*\
  !*** ./node_modules/@turf/bbox/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var coordEach = __webpack_require__(/*! @turf/meta */ "./node_modules/@turf/meta/index.js").coordEach;

/**
 * Takes a set of features, calculates the bbox of all input features, and returns a bounding box.
 *
 * @name bbox
 * @param {FeatureCollection|Feature<any>} geojson input features
 * @returns {Array<number>} bbox extent in [minX, minY, maxX, maxY] order
 * @example
 * var line = turf.lineString([[-74, 40], [-78, 42], [-82, 35]]);
 * var bbox = turf.bbox(line);
 * var bboxPolygon = turf.bboxPolygon(bbox);
 *
 * //addToMap
 * var addToMap = [line, bboxPolygon]
 */
module.exports = function (geojson) {
    var bbox = [Infinity, Infinity, -Infinity, -Infinity];
    coordEach(geojson, function (coord) {
        if (bbox[0] > coord[0]) bbox[0] = coord[0];
        if (bbox[1] > coord[1]) bbox[1] = coord[1];
        if (bbox[2] < coord[0]) bbox[2] = coord[0];
        if (bbox[3] < coord[1]) bbox[3] = coord[1];
    });
    return bbox;
};


/***/ }),

/***/ "./node_modules/@turf/helpers/index.js":
/*!*********************************************!*\
  !*** ./node_modules/@turf/helpers/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Wraps a GeoJSON {@link Geometry} in a GeoJSON {@link Feature}.
 *
 * @name feature
 * @param {Geometry} geometry input geometry
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Array<number>} [bbox] BBox [west, south, east, north]
 * @param {string|number} [id] Identifier
 * @returns {Feature} a GeoJSON Feature
 * @example
 * var geometry = {
 *   "type": "Point",
 *   "coordinates": [110, 50]
 * };
 *
 * var feature = turf.feature(geometry);
 *
 * //=feature
 */
function feature(geometry, properties, bbox, id) {
    if (geometry === undefined) throw new Error('geometry is required');
    if (properties && properties.constructor !== Object) throw new Error('properties must be an Object');
    if (bbox && bbox.length !== 4) throw new Error('bbox must be an Array of 4 numbers');
    if (id && ['string', 'number'].indexOf(typeof id) === -1) throw new Error('id must be a number or a string');

    var feat = {type: 'Feature'};
    if (id) feat.id = id;
    if (bbox) feat.bbox = bbox;
    feat.properties = properties || {};
    feat.geometry = geometry;
    return feat;
}

/**
 * Creates a GeoJSON {@link Geometry} from a Geometry string type & coordinates.
 * For GeometryCollection type use `helpers.geometryCollection`
 *
 * @name geometry
 * @param {string} type Geometry Type
 * @param {Array<number>} coordinates Coordinates
 * @param {Array<number>} [bbox] BBox [west, south, east, north]
 * @returns {Geometry} a GeoJSON Geometry
 * @example
 * var type = 'Point';
 * var coordinates = [110, 50];
 *
 * var geometry = turf.geometry(type, coordinates);
 *
 * //=geometry
 */
function geometry(type, coordinates, bbox) {
    // Validation
    if (!type) throw new Error('type is required');
    if (!coordinates) throw new Error('coordinates is required');
    if (!Array.isArray(coordinates)) throw new Error('coordinates must be an Array');
    if (bbox && bbox.length !== 4) throw new Error('bbox must be an Array of 4 numbers');

    var geom;
    switch (type) {
    case 'Point': geom = point(coordinates).geometry; break;
    case 'LineString': geom = lineString(coordinates).geometry; break;
    case 'Polygon': geom = polygon(coordinates).geometry; break;
    case 'MultiPoint': geom = multiPoint(coordinates).geometry; break;
    case 'MultiLineString': geom = multiLineString(coordinates).geometry; break;
    case 'MultiPolygon': geom = multiPolygon(coordinates).geometry; break;
    default: throw new Error(type + ' is invalid');
    }
    if (bbox) geom.bbox = bbox;
    return geom;
}

/**
 * Takes coordinates and properties (optional) and returns a new {@link Point} feature.
 *
 * @name point
 * @param {Array<number>} coordinates longitude, latitude position (each in decimal degrees)
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Array<number>} [bbox] BBox [west, south, east, north]
 * @param {string|number} [id] Identifier
 * @returns {Feature<Point>} a Point feature
 * @example
 * var point = turf.point([-75.343, 39.984]);
 *
 * //=point
 */
function point(coordinates, properties, bbox, id) {
    if (!coordinates) throw new Error('No coordinates passed');
    if (coordinates.length === undefined) throw new Error('Coordinates must be an array');
    if (coordinates.length < 2) throw new Error('Coordinates must be at least 2 numbers long');
    if (!isNumber(coordinates[0]) || !isNumber(coordinates[1])) throw new Error('Coordinates must contain numbers');

    return feature({
        type: 'Point',
        coordinates: coordinates
    }, properties, bbox, id);
}

/**
 * Takes an array of LinearRings and optionally an {@link Object} with properties and returns a {@link Polygon} feature.
 *
 * @name polygon
 * @param {Array<Array<Array<number>>>} coordinates an array of LinearRings
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Array<number>} [bbox] BBox [west, south, east, north]
 * @param {string|number} [id] Identifier
 * @returns {Feature<Polygon>} a Polygon feature
 * @throws {Error} throw an error if a LinearRing of the polygon has too few positions
 * or if a LinearRing of the Polygon does not have matching Positions at the beginning & end.
 * @example
 * var polygon = turf.polygon([[
 *   [-2.275543, 53.464547],
 *   [-2.275543, 53.489271],
 *   [-2.215118, 53.489271],
 *   [-2.215118, 53.464547],
 *   [-2.275543, 53.464547]
 * ]], { name: 'poly1', population: 400});
 *
 * //=polygon
 */
function polygon(coordinates, properties, bbox, id) {
    if (!coordinates) throw new Error('No coordinates passed');

    for (var i = 0; i < coordinates.length; i++) {
        var ring = coordinates[i];
        if (ring.length < 4) {
            throw new Error('Each LinearRing of a Polygon must have 4 or more Positions.');
        }
        for (var j = 0; j < ring[ring.length - 1].length; j++) {
            // Check if first point of Polygon contains two numbers
            if (i === 0 && j === 0 && !isNumber(ring[0][0]) || !isNumber(ring[0][1])) throw new Error('Coordinates must contain numbers');
            if (ring[ring.length - 1][j] !== ring[0][j]) {
                throw new Error('First and last Position are not equivalent.');
            }
        }
    }

    return feature({
        type: 'Polygon',
        coordinates: coordinates
    }, properties, bbox, id);
}

/**
 * Creates a {@link LineString} based on a
 * coordinate array. Properties can be added optionally.
 *
 * @name lineString
 * @param {Array<Array<number>>} coordinates an array of Positions
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Array<number>} [bbox] BBox [west, south, east, north]
 * @param {string|number} [id] Identifier
 * @returns {Feature<LineString>} a LineString feature
 * @throws {Error} if no coordinates are passed
 * @example
 * var linestring1 = turf.lineString([
 *   [-21.964416, 64.148203],
 *   [-21.956176, 64.141316],
 *   [-21.93901, 64.135924],
 *   [-21.927337, 64.136673]
 * ]);
 * var linestring2 = turf.lineString([
 *   [-21.929054, 64.127985],
 *   [-21.912918, 64.134726],
 *   [-21.916007, 64.141016],
 *   [-21.930084, 64.14446]
 * ], {name: 'line 1', distance: 145});
 *
 * //=linestring1
 *
 * //=linestring2
 */
function lineString(coordinates, properties, bbox, id) {
    if (!coordinates) throw new Error('No coordinates passed');
    if (coordinates.length < 2) throw new Error('Coordinates must be an array of two or more positions');
    // Check if first point of LineString contains two numbers
    if (!isNumber(coordinates[0][1]) || !isNumber(coordinates[0][1])) throw new Error('Coordinates must contain numbers');

    return feature({
        type: 'LineString',
        coordinates: coordinates
    }, properties, bbox, id);
}

/**
 * Takes one or more {@link Feature|Features} and creates a {@link FeatureCollection}.
 *
 * @name featureCollection
 * @param {Feature[]} features input features
 * @param {Array<number>} [bbox] BBox [west, south, east, north]
 * @param {string|number} [id] Identifier
 * @returns {FeatureCollection} a FeatureCollection of input features
 * @example
 * var features = [
 *  turf.point([-75.343, 39.984], {name: 'Location A'}),
 *  turf.point([-75.833, 39.284], {name: 'Location B'}),
 *  turf.point([-75.534, 39.123], {name: 'Location C'})
 * ];
 *
 * var collection = turf.featureCollection(features);
 *
 * //=collection
 */
function featureCollection(features, bbox, id) {
    if (!features) throw new Error('No features passed');
    if (!Array.isArray(features)) throw new Error('features must be an Array');
    if (bbox && bbox.length !== 4) throw new Error('bbox must be an Array of 4 numbers');
    if (id && ['string', 'number'].indexOf(typeof id) === -1) throw new Error('id must be a number or a string');

    var fc = {type: 'FeatureCollection'};
    if (id) fc.id = id;
    if (bbox) fc.bbox = bbox;
    fc.features = features;
    return fc;
}

/**
 * Creates a {@link Feature<MultiLineString>} based on a
 * coordinate array. Properties can be added optionally.
 *
 * @name multiLineString
 * @param {Array<Array<Array<number>>>} coordinates an array of LineStrings
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Array<number>} [bbox] BBox [west, south, east, north]
 * @param {string|number} [id] Identifier
 * @returns {Feature<MultiLineString>} a MultiLineString feature
 * @throws {Error} if no coordinates are passed
 * @example
 * var multiLine = turf.multiLineString([[[0,0],[10,10]]]);
 *
 * //=multiLine
 */
function multiLineString(coordinates, properties, bbox, id) {
    if (!coordinates) throw new Error('No coordinates passed');

    return feature({
        type: 'MultiLineString',
        coordinates: coordinates
    }, properties, bbox, id);
}

/**
 * Creates a {@link Feature<MultiPoint>} based on a
 * coordinate array. Properties can be added optionally.
 *
 * @name multiPoint
 * @param {Array<Array<number>>} coordinates an array of Positions
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Array<number>} [bbox] BBox [west, south, east, north]
 * @param {string|number} [id] Identifier
 * @returns {Feature<MultiPoint>} a MultiPoint feature
 * @throws {Error} if no coordinates are passed
 * @example
 * var multiPt = turf.multiPoint([[0,0],[10,10]]);
 *
 * //=multiPt
 */
function multiPoint(coordinates, properties, bbox, id) {
    if (!coordinates) throw new Error('No coordinates passed');

    return feature({
        type: 'MultiPoint',
        coordinates: coordinates
    }, properties, bbox, id);
}

/**
 * Creates a {@link Feature<MultiPolygon>} based on a
 * coordinate array. Properties can be added optionally.
 *
 * @name multiPolygon
 * @param {Array<Array<Array<Array<number>>>>} coordinates an array of Polygons
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Array<number>} [bbox] BBox [west, south, east, north]
 * @param {string|number} [id] Identifier
 * @returns {Feature<MultiPolygon>} a multipolygon feature
 * @throws {Error} if no coordinates are passed
 * @example
 * var multiPoly = turf.multiPolygon([[[[0,0],[0,10],[10,10],[10,0],[0,0]]]]);
 *
 * //=multiPoly
 *
 */
function multiPolygon(coordinates, properties, bbox, id) {
    if (!coordinates) throw new Error('No coordinates passed');

    return feature({
        type: 'MultiPolygon',
        coordinates: coordinates
    }, properties, bbox, id);
}

/**
 * Creates a {@link Feature<GeometryCollection>} based on a
 * coordinate array. Properties can be added optionally.
 *
 * @name geometryCollection
 * @param {Array<Geometry>} geometries an array of GeoJSON Geometries
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Array<number>} [bbox] BBox [west, south, east, north]
 * @param {string|number} [id] Identifier
 * @returns {Feature<GeometryCollection>} a GeoJSON GeometryCollection Feature
 * @example
 * var pt = {
 *     "type": "Point",
 *       "coordinates": [100, 0]
 *     };
 * var line = {
 *     "type": "LineString",
 *     "coordinates": [ [101, 0], [102, 1] ]
 *   };
 * var collection = turf.geometryCollection([pt, line]);
 *
 * //=collection
 */
function geometryCollection(geometries, properties, bbox, id) {
    if (!geometries) throw new Error('geometries is required');
    if (!Array.isArray(geometries)) throw new Error('geometries must be an Array');

    return feature({
        type: 'GeometryCollection',
        geometries: geometries
    }, properties, bbox, id);
}

// https://en.wikipedia.org/wiki/Great-circle_distance#Radius_for_spherical_Earth
var factors = {
    miles: 3960,
    nauticalmiles: 3441.145,
    degrees: 57.2957795,
    radians: 1,
    inches: 250905600,
    yards: 6969600,
    meters: 6373000,
    metres: 6373000,
    centimeters: 6.373e+8,
    centimetres: 6.373e+8,
    kilometers: 6373,
    kilometres: 6373,
    feet: 20908792.65
};

var areaFactors = {
    kilometers: 0.000001,
    kilometres: 0.000001,
    meters: 1,
    metres: 1,
    centimetres: 10000,
    millimeter: 1000000,
    acres: 0.000247105,
    miles: 3.86e-7,
    yards: 1.195990046,
    feet: 10.763910417,
    inches: 1550.003100006
};
/**
 * Round number to precision
 *
 * @param {number} num Number
 * @param {number} [precision=0] Precision
 * @returns {number} rounded number
 * @example
 * turf.round(120.4321)
 * //=120
 *
 * turf.round(120.4321, 2)
 * //=120.43
 */
function round(num, precision) {
    if (num === undefined || num === null || isNaN(num)) throw new Error('num is required');
    if (precision && !(precision >= 0)) throw new Error('precision must be a positive number');
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(num * multiplier) / multiplier;
}

/**
 * Convert a distance measurement (assuming a spherical Earth) from radians to a more friendly unit.
 * Valid units: miles, nauticalmiles, inches, yards, meters, metres, kilometers, centimeters, feet
 *
 * @name radiansToDistance
 * @param {number} radians in radians across the sphere
 * @param {string} [units=kilometers] can be degrees, radians, miles, or kilometers inches, yards, metres, meters, kilometres, kilometers.
 * @returns {number} distance
 */
function radiansToDistance(radians, units) {
    if (radians === undefined || radians === null) throw new Error('radians is required');

    var factor = factors[units || 'kilometers'];
    if (!factor) throw new Error('units is invalid');
    return radians * factor;
}

/**
 * Convert a distance measurement (assuming a spherical Earth) from a real-world unit into radians
 * Valid units: miles, nauticalmiles, inches, yards, meters, metres, kilometers, centimeters, feet
 *
 * @name distanceToRadians
 * @param {number} distance in real units
 * @param {string} [units=kilometers] can be degrees, radians, miles, or kilometers inches, yards, metres, meters, kilometres, kilometers.
 * @returns {number} radians
 */
function distanceToRadians(distance, units) {
    if (distance === undefined || distance === null) throw new Error('distance is required');

    var factor = factors[units || 'kilometers'];
    if (!factor) throw new Error('units is invalid');
    return distance / factor;
}

/**
 * Convert a distance measurement (assuming a spherical Earth) from a real-world unit into degrees
 * Valid units: miles, nauticalmiles, inches, yards, meters, metres, centimeters, kilometres, feet
 *
 * @name distanceToDegrees
 * @param {number} distance in real units
 * @param {string} [units=kilometers] can be degrees, radians, miles, or kilometers inches, yards, metres, meters, kilometres, kilometers.
 * @returns {number} degrees
 */
function distanceToDegrees(distance, units) {
    return radians2degrees(distanceToRadians(distance, units));
}

/**
 * Converts any bearing angle from the north line direction (positive clockwise)
 * and returns an angle between 0-360 degrees (positive clockwise), 0 being the north line
 *
 * @name bearingToAngle
 * @param {number} bearing angle, between -180 and +180 degrees
 * @returns {number} angle between 0 and 360 degrees
 */
function bearingToAngle(bearing) {
    if (bearing === null || bearing === undefined) throw new Error('bearing is required');

    var angle = bearing % 360;
    if (angle < 0) angle += 360;
    return angle;
}

/**
 * Converts an angle in radians to degrees
 *
 * @name radians2degrees
 * @param {number} radians angle in radians
 * @returns {number} degrees between 0 and 360 degrees
 */
function radians2degrees(radians) {
    if (radians === null || radians === undefined) throw new Error('radians is required');

    var degrees = radians % (2 * Math.PI);
    return degrees * 180 / Math.PI;
}

/**
 * Converts an angle in degrees to radians
 *
 * @name degrees2radians
 * @param {number} degrees angle between 0 and 360 degrees
 * @returns {number} angle in radians
 */
function degrees2radians(degrees) {
    if (degrees === null || degrees === undefined) throw new Error('degrees is required');

    var radians = degrees % 360;
    return radians * Math.PI / 180;
}


/**
 * Converts a distance to the requested unit.
 * Valid units: miles, nauticalmiles, inches, yards, meters, metres, kilometers, centimeters, feet
 *
 * @param {number} distance to be converted
 * @param {string} originalUnit of the distance
 * @param {string} [finalUnit=kilometers] returned unit
 * @returns {number} the converted distance
 */
function convertDistance(distance, originalUnit, finalUnit) {
    if (distance === null || distance === undefined) throw new Error('distance is required');
    if (!(distance >= 0)) throw new Error('distance must be a positive number');

    var convertedDistance = radiansToDistance(distanceToRadians(distance, originalUnit), finalUnit || 'kilometers');
    return convertedDistance;
}

/**
 * Converts a area to the requested unit.
 * Valid units: kilometers, kilometres, meters, metres, centimetres, millimeter, acre, mile, yard, foot, inch
 * @param {number} area to be converted
 * @param {string} [originalUnit=meters] of the distance
 * @param {string} [finalUnit=kilometers] returned unit
 * @returns {number} the converted distance
 */
function convertArea(area, originalUnit, finalUnit) {
    if (area === null || area === undefined) throw new Error('area is required');
    if (!(area >= 0)) throw new Error('area must be a positive number');

    var startFactor = areaFactors[originalUnit || 'meters'];
    if (!startFactor) throw new Error('invalid original units');

    var finalFactor = areaFactors[finalUnit || 'kilometers'];
    if (!finalFactor) throw new Error('invalid final units');

    return (area / startFactor) * finalFactor;
}

/**
 * isNumber
 *
 * @param {*} num Number to validate
 * @returns {boolean} true/false
 * @example
 * turf.isNumber(123)
 * //=true
 * turf.isNumber('foo')
 * //=false
 */
function isNumber(num) {
    return !isNaN(num) && num !== null && !Array.isArray(num);
}

module.exports = {
    feature: feature,
    geometry: geometry,
    featureCollection: featureCollection,
    geometryCollection: geometryCollection,
    point: point,
    multiPoint: multiPoint,
    lineString: lineString,
    multiLineString: multiLineString,
    polygon: polygon,
    multiPolygon: multiPolygon,
    radiansToDistance: radiansToDistance,
    distanceToRadians: distanceToRadians,
    distanceToDegrees: distanceToDegrees,
    radians2degrees: radians2degrees,
    degrees2radians: degrees2radians,
    bearingToAngle: bearingToAngle,
    convertDistance: convertDistance,
    convertArea: convertArea,
    round: round,
    isNumber: isNumber
};


/***/ }),

/***/ "./node_modules/@turf/meta/index.js":
/*!******************************************!*\
  !*** ./node_modules/@turf/meta/index.js ***!
  \******************************************/
/*! exports provided: coordEach, coordReduce, propEach, propReduce, featureEach, featureReduce, coordAll, geomEach, geomReduce, flattenEach, flattenReduce, segmentEach, segmentReduce, feature, lineString, lineEach, lineReduce */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "coordEach", function() { return coordEach; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "coordReduce", function() { return coordReduce; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "propEach", function() { return propEach; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "propReduce", function() { return propReduce; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "featureEach", function() { return featureEach; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "featureReduce", function() { return featureReduce; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "coordAll", function() { return coordAll; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "geomEach", function() { return geomEach; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "geomReduce", function() { return geomReduce; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "flattenEach", function() { return flattenEach; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "flattenReduce", function() { return flattenReduce; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "segmentEach", function() { return segmentEach; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "segmentReduce", function() { return segmentReduce; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "feature", function() { return feature; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lineString", function() { return lineString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lineEach", function() { return lineEach; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lineReduce", function() { return lineReduce; });
/**
 * GeoJSON BBox
 *
 * @private
 * @typedef {[number, number, number, number]} BBox
 */

/**
 * GeoJSON Id
 *
 * @private
 * @typedef {(number|string)} Id
 */

/**
 * GeoJSON FeatureCollection
 *
 * @private
 * @typedef {Object} FeatureCollection
 * @property {string} type
 * @property {?Id} id
 * @property {?BBox} bbox
 * @property {Feature[]} features
 */

/**
 * GeoJSON Feature
 *
 * @private
 * @typedef {Object} Feature
 * @property {string} type
 * @property {?Id} id
 * @property {?BBox} bbox
 * @property {*} properties
 * @property {Geometry} geometry
 */

/**
 * GeoJSON Geometry
 *
 * @private
 * @typedef {Object} Geometry
 * @property {string} type
 * @property {any[]} coordinates
 */

/**
 * Callback for coordEach
 *
 * @callback coordEachCallback
 * @param {Array<number>} currentCoord The current coordinate being processed.
 * @param {number} coordIndex The current index of the coordinate being processed.
 * Starts at index 0.
 * @param {number} featureIndex The current index of the feature being processed.
 * @param {number} featureSubIndex The current subIndex of the feature being processed.
 */

/**
 * Iterate over coordinates in any GeoJSON object, similar to Array.forEach()
 *
 * @name coordEach
 * @param {(FeatureCollection|Feature|Geometry)} geojson any GeoJSON object
 * @param {Function} callback a method that takes (currentCoord, coordIndex, featureIndex, featureSubIndex)
 * @param {boolean} [excludeWrapCoord=false] whether or not to include the final coordinate of LinearRings that wraps the ring in its iteration.
 * @example
 * var features = turf.featureCollection([
 *   turf.point([26, 37], {"foo": "bar"}),
 *   turf.point([36, 53], {"hello": "world"})
 * ]);
 *
 * turf.coordEach(features, function (currentCoord, coordIndex, featureIndex, featureSubIndex) {
 *   //=currentCoord
 *   //=coordIndex
 *   //=featureIndex
 *   //=featureSubIndex
 * });
 */
function coordEach(geojson, callback, excludeWrapCoord) {
    // Handles null Geometry -- Skips this GeoJSON
    if (geojson === null) return;
    var featureIndex, geometryIndex, j, k, l, geometry, stopG, coords,
        geometryMaybeCollection,
        wrapShrink = 0,
        coordIndex = 0,
        isGeometryCollection,
        type = geojson.type,
        isFeatureCollection = type === 'FeatureCollection',
        isFeature = type === 'Feature',
        stop = isFeatureCollection ? geojson.features.length : 1;

    // This logic may look a little weird. The reason why it is that way
    // is because it's trying to be fast. GeoJSON supports multiple kinds
    // of objects at its root: FeatureCollection, Features, Geometries.
    // This function has the responsibility of handling all of them, and that
    // means that some of the `for` loops you see below actually just don't apply
    // to certain inputs. For instance, if you give this just a
    // Point geometry, then both loops are short-circuited and all we do
    // is gradually rename the input until it's called 'geometry'.
    //
    // This also aims to allocate as few resources as possible: just a
    // few numbers and booleans, rather than any temporary arrays as would
    // be required with the normalization approach.
    for (featureIndex = 0; featureIndex < stop; featureIndex++) {
        geometryMaybeCollection = (isFeatureCollection ? geojson.features[featureIndex].geometry :
            (isFeature ? geojson.geometry : geojson));
        isGeometryCollection = (geometryMaybeCollection) ? geometryMaybeCollection.type === 'GeometryCollection' : false;
        stopG = isGeometryCollection ? geometryMaybeCollection.geometries.length : 1;

        for (geometryIndex = 0; geometryIndex < stopG; geometryIndex++) {
            var featureSubIndex = 0;
            geometry = isGeometryCollection ?
                geometryMaybeCollection.geometries[geometryIndex] : geometryMaybeCollection;

            // Handles null Geometry -- Skips this geometry
            if (geometry === null) continue;
            coords = geometry.coordinates;
            var geomType = geometry.type;

            wrapShrink = (excludeWrapCoord && (geomType === 'Polygon' || geomType === 'MultiPolygon')) ? 1 : 0;

            switch (geomType) {
            case null:
                break;
            case 'Point':
                callback(coords, coordIndex, featureIndex, featureSubIndex);
                coordIndex++;
                featureSubIndex++;
                break;
            case 'LineString':
            case 'MultiPoint':
                for (j = 0; j < coords.length; j++) {
                    callback(coords[j], coordIndex, featureIndex, featureSubIndex);
                    coordIndex++;
                    if (geomType === 'MultiPoint') featureSubIndex++;
                }
                if (geomType === 'LineString') featureSubIndex++;
                break;
            case 'Polygon':
            case 'MultiLineString':
                for (j = 0; j < coords.length; j++) {
                    for (k = 0; k < coords[j].length - wrapShrink; k++) {
                        callback(coords[j][k], coordIndex, featureIndex, featureSubIndex);
                        coordIndex++;
                    }
                    if (geomType === 'MultiLineString') featureSubIndex++;
                }
                if (geomType === 'Polygon') featureSubIndex++;
                break;
            case 'MultiPolygon':
                for (j = 0; j < coords.length; j++) {
                    for (k = 0; k < coords[j].length; k++)
                        for (l = 0; l < coords[j][k].length - wrapShrink; l++) {
                            callback(coords[j][k][l], coordIndex, featureIndex, featureSubIndex);
                            coordIndex++;
                        }
                    featureSubIndex++;
                }
                break;
            case 'GeometryCollection':
                for (j = 0; j < geometry.geometries.length; j++)
                    coordEach(geometry.geometries[j], callback, excludeWrapCoord);
                break;
            default:
                throw new Error('Unknown Geometry Type');
            }
        }
    }
}

/**
 * Callback for coordReduce
 *
 * The first time the callback function is called, the values provided as arguments depend
 * on whether the reduce method has an initialValue argument.
 *
 * If an initialValue is provided to the reduce method:
 *  - The previousValue argument is initialValue.
 *  - The currentValue argument is the value of the first element present in the array.
 *
 * If an initialValue is not provided:
 *  - The previousValue argument is the value of the first element present in the array.
 *  - The currentValue argument is the value of the second element present in the array.
 *
 * @callback coordReduceCallback
 * @param {*} previousValue The accumulated value previously returned in the last invocation
 * of the callback, or initialValue, if supplied.
 * @param {Array<number>} currentCoord The current coordinate being processed.
 * @param {number} coordIndex The current index of the coordinate being processed.
 * Starts at index 0, if an initialValue is provided, and at index 1 otherwise.
 * @param {number} featureIndex The current index of the feature being processed.
 * @param {number} featureSubIndex The current subIndex of the feature being processed.
 */

/**
 * Reduce coordinates in any GeoJSON object, similar to Array.reduce()
 *
 * @name coordReduce
 * @param {FeatureCollection|Geometry|Feature} geojson any GeoJSON object
 * @param {Function} callback a method that takes (previousValue, currentCoord, coordIndex)
 * @param {*} [initialValue] Value to use as the first argument to the first call of the callback.
 * @param {boolean} [excludeWrapCoord=false] whether or not to include the final coordinate of LinearRings that wraps the ring in its iteration.
 * @returns {*} The value that results from the reduction.
 * @example
 * var features = turf.featureCollection([
 *   turf.point([26, 37], {"foo": "bar"}),
 *   turf.point([36, 53], {"hello": "world"})
 * ]);
 *
 * turf.coordReduce(features, function (previousValue, currentCoord, coordIndex, featureIndex, featureSubIndex) {
 *   //=previousValue
 *   //=currentCoord
 *   //=coordIndex
 *   //=featureIndex
 *   //=featureSubIndex
 *   return currentCoord;
 * });
 */
function coordReduce(geojson, callback, initialValue, excludeWrapCoord) {
    var previousValue = initialValue;
    coordEach(geojson, function (currentCoord, coordIndex, featureIndex, featureSubIndex) {
        if (coordIndex === 0 && initialValue === undefined) previousValue = currentCoord;
        else previousValue = callback(previousValue, currentCoord, coordIndex, featureIndex, featureSubIndex);
    }, excludeWrapCoord);
    return previousValue;
}

/**
 * Callback for propEach
 *
 * @callback propEachCallback
 * @param {Object} currentProperties The current properties being processed.
 * @param {number} featureIndex The index of the current element being processed in the
 * array.Starts at index 0, if an initialValue is provided, and at index 1 otherwise.
 */

/**
 * Iterate over properties in any GeoJSON object, similar to Array.forEach()
 *
 * @name propEach
 * @param {(FeatureCollection|Feature)} geojson any GeoJSON object
 * @param {Function} callback a method that takes (currentProperties, featureIndex)
 * @example
 * var features = turf.featureCollection([
 *     turf.point([26, 37], {foo: 'bar'}),
 *     turf.point([36, 53], {hello: 'world'})
 * ]);
 *
 * turf.propEach(features, function (currentProperties, featureIndex) {
 *   //=currentProperties
 *   //=featureIndex
 * });
 */
function propEach(geojson, callback) {
    var i;
    switch (geojson.type) {
    case 'FeatureCollection':
        for (i = 0; i < geojson.features.length; i++) {
            callback(geojson.features[i].properties, i);
        }
        break;
    case 'Feature':
        callback(geojson.properties, 0);
        break;
    }
}


/**
 * Callback for propReduce
 *
 * The first time the callback function is called, the values provided as arguments depend
 * on whether the reduce method has an initialValue argument.
 *
 * If an initialValue is provided to the reduce method:
 *  - The previousValue argument is initialValue.
 *  - The currentValue argument is the value of the first element present in the array.
 *
 * If an initialValue is not provided:
 *  - The previousValue argument is the value of the first element present in the array.
 *  - The currentValue argument is the value of the second element present in the array.
 *
 * @callback propReduceCallback
 * @param {*} previousValue The accumulated value previously returned in the last invocation
 * of the callback, or initialValue, if supplied.
 * @param {*} currentProperties The current properties being processed.
 * @param {number} featureIndex The index of the current element being processed in the
 * array.Starts at index 0, if an initialValue is provided, and at index 1 otherwise.
 */

/**
 * Reduce properties in any GeoJSON object into a single value,
 * similar to how Array.reduce works. However, in this case we lazily run
 * the reduction, so an array of all properties is unnecessary.
 *
 * @name propReduce
 * @param {(FeatureCollection|Feature)} geojson any GeoJSON object
 * @param {Function} callback a method that takes (previousValue, currentProperties, featureIndex)
 * @param {*} [initialValue] Value to use as the first argument to the first call of the callback.
 * @returns {*} The value that results from the reduction.
 * @example
 * var features = turf.featureCollection([
 *     turf.point([26, 37], {foo: 'bar'}),
 *     turf.point([36, 53], {hello: 'world'})
 * ]);
 *
 * turf.propReduce(features, function (previousValue, currentProperties, featureIndex) {
 *   //=previousValue
 *   //=currentProperties
 *   //=featureIndex
 *   return currentProperties
 * });
 */
function propReduce(geojson, callback, initialValue) {
    var previousValue = initialValue;
    propEach(geojson, function (currentProperties, featureIndex) {
        if (featureIndex === 0 && initialValue === undefined) previousValue = currentProperties;
        else previousValue = callback(previousValue, currentProperties, featureIndex);
    });
    return previousValue;
}

/**
 * Callback for featureEach
 *
 * @callback featureEachCallback
 * @param {Feature<any>} currentFeature The current feature being processed.
 * @param {number} featureIndex The index of the current element being processed in the
 * array.Starts at index 0, if an initialValue is provided, and at index 1 otherwise.
 */

/**
 * Iterate over features in any GeoJSON object, similar to
 * Array.forEach.
 *
 * @name featureEach
 * @param {(FeatureCollection|Feature|Geometry)} geojson any GeoJSON object
 * @param {Function} callback a method that takes (currentFeature, featureIndex)
 * @example
 * var features = turf.featureCollection([
 *   turf.point([26, 37], {foo: 'bar'}),
 *   turf.point([36, 53], {hello: 'world'})
 * ]);
 *
 * turf.featureEach(features, function (currentFeature, featureIndex) {
 *   //=currentFeature
 *   //=featureIndex
 * });
 */
function featureEach(geojson, callback) {
    if (geojson.type === 'Feature') {
        callback(geojson, 0);
    } else if (geojson.type === 'FeatureCollection') {
        for (var i = 0; i < geojson.features.length; i++) {
            callback(geojson.features[i], i);
        }
    }
}

/**
 * Callback for featureReduce
 *
 * The first time the callback function is called, the values provided as arguments depend
 * on whether the reduce method has an initialValue argument.
 *
 * If an initialValue is provided to the reduce method:
 *  - The previousValue argument is initialValue.
 *  - The currentValue argument is the value of the first element present in the array.
 *
 * If an initialValue is not provided:
 *  - The previousValue argument is the value of the first element present in the array.
 *  - The currentValue argument is the value of the second element present in the array.
 *
 * @callback featureReduceCallback
 * @param {*} previousValue The accumulated value previously returned in the last invocation
 * of the callback, or initialValue, if supplied.
 * @param {Feature} currentFeature The current Feature being processed.
 * @param {number} featureIndex The index of the current element being processed in the
 * array.Starts at index 0, if an initialValue is provided, and at index 1 otherwise.
 */

/**
 * Reduce features in any GeoJSON object, similar to Array.reduce().
 *
 * @name featureReduce
 * @param {(FeatureCollection|Feature|Geometry)} geojson any GeoJSON object
 * @param {Function} callback a method that takes (previousValue, currentFeature, featureIndex)
 * @param {*} [initialValue] Value to use as the first argument to the first call of the callback.
 * @returns {*} The value that results from the reduction.
 * @example
 * var features = turf.featureCollection([
 *   turf.point([26, 37], {"foo": "bar"}),
 *   turf.point([36, 53], {"hello": "world"})
 * ]);
 *
 * turf.featureReduce(features, function (previousValue, currentFeature, featureIndex) {
 *   //=previousValue
 *   //=currentFeature
 *   //=featureIndex
 *   return currentFeature
 * });
 */
function featureReduce(geojson, callback, initialValue) {
    var previousValue = initialValue;
    featureEach(geojson, function (currentFeature, featureIndex) {
        if (featureIndex === 0 && initialValue === undefined) previousValue = currentFeature;
        else previousValue = callback(previousValue, currentFeature, featureIndex);
    });
    return previousValue;
}

/**
 * Get all coordinates from any GeoJSON object.
 *
 * @name coordAll
 * @param {(FeatureCollection|Feature|Geometry)} geojson any GeoJSON object
 * @returns {Array<Array<number>>} coordinate position array
 * @example
 * var features = turf.featureCollection([
 *   turf.point([26, 37], {foo: 'bar'}),
 *   turf.point([36, 53], {hello: 'world'})
 * ]);
 *
 * var coords = turf.coordAll(features);
 * //= [[26, 37], [36, 53]]
 */
function coordAll(geojson) {
    var coords = [];
    coordEach(geojson, function (coord) {
        coords.push(coord);
    });
    return coords;
}

/**
 * Callback for geomEach
 *
 * @callback geomEachCallback
 * @param {Geometry} currentGeometry The current geometry being processed.
 * @param {number} currentIndex The index of the current element being processed in the
 * array. Starts at index 0, if an initialValue is provided, and at index 1 otherwise.
 * @param {number} currentProperties The current feature properties being processed.
 */

/**
 * Iterate over each geometry in any GeoJSON object, similar to Array.forEach()
 *
 * @name geomEach
 * @param {(FeatureCollection|Feature|Geometry)} geojson any GeoJSON object
 * @param {Function} callback a method that takes (currentGeometry, featureIndex, currentProperties)
 * @example
 * var features = turf.featureCollection([
 *     turf.point([26, 37], {foo: 'bar'}),
 *     turf.point([36, 53], {hello: 'world'})
 * ]);
 *
 * turf.geomEach(features, function (currentGeometry, featureIndex, currentProperties) {
 *   //=currentGeometry
 *   //=featureIndex
 *   //=currentProperties
 * });
 */
function geomEach(geojson, callback) {
    var i, j, g, geometry, stopG,
        geometryMaybeCollection,
        isGeometryCollection,
        geometryProperties,
        featureIndex = 0,
        isFeatureCollection = geojson.type === 'FeatureCollection',
        isFeature = geojson.type === 'Feature',
        stop = isFeatureCollection ? geojson.features.length : 1;

    // This logic may look a little weird. The reason why it is that way
    // is because it's trying to be fast. GeoJSON supports multiple kinds
    // of objects at its root: FeatureCollection, Features, Geometries.
    // This function has the responsibility of handling all of them, and that
    // means that some of the `for` loops you see below actually just don't apply
    // to certain inputs. For instance, if you give this just a
    // Point geometry, then both loops are short-circuited and all we do
    // is gradually rename the input until it's called 'geometry'.
    //
    // This also aims to allocate as few resources as possible: just a
    // few numbers and booleans, rather than any temporary arrays as would
    // be required with the normalization approach.
    for (i = 0; i < stop; i++) {

        geometryMaybeCollection = (isFeatureCollection ? geojson.features[i].geometry :
            (isFeature ? geojson.geometry : geojson));
        geometryProperties = (isFeatureCollection ? geojson.features[i].properties :
            (isFeature ? geojson.properties : {}));
        isGeometryCollection = (geometryMaybeCollection) ? geometryMaybeCollection.type === 'GeometryCollection' : false;
        stopG = isGeometryCollection ? geometryMaybeCollection.geometries.length : 1;

        for (g = 0; g < stopG; g++) {
            geometry = isGeometryCollection ?
                geometryMaybeCollection.geometries[g] : geometryMaybeCollection;

            // Handle null Geometry
            if (geometry === null) {
                callback(null, featureIndex, geometryProperties);
                continue;
            }
            switch (geometry.type) {
            case 'Point':
            case 'LineString':
            case 'MultiPoint':
            case 'Polygon':
            case 'MultiLineString':
            case 'MultiPolygon': {
                callback(geometry, featureIndex, geometryProperties);
                break;
            }
            case 'GeometryCollection': {
                for (j = 0; j < geometry.geometries.length; j++) {
                    callback(geometry.geometries[j], featureIndex, geometryProperties);
                }
                break;
            }
            default:
                throw new Error('Unknown Geometry Type');
            }
        }
        // Only increase `featureIndex` per each feature
        featureIndex++;
    }
}

/**
 * Callback for geomReduce
 *
 * The first time the callback function is called, the values provided as arguments depend
 * on whether the reduce method has an initialValue argument.
 *
 * If an initialValue is provided to the reduce method:
 *  - The previousValue argument is initialValue.
 *  - The currentValue argument is the value of the first element present in the array.
 *
 * If an initialValue is not provided:
 *  - The previousValue argument is the value of the first element present in the array.
 *  - The currentValue argument is the value of the second element present in the array.
 *
 * @callback geomReduceCallback
 * @param {*} previousValue The accumulated value previously returned in the last invocation
 * of the callback, or initialValue, if supplied.
 * @param {Geometry} currentGeometry The current Feature being processed.
 * @param {number} currentIndex The index of the current element being processed in the
 * array.Starts at index 0, if an initialValue is provided, and at index 1 otherwise.
 * @param {Object} currentProperties The current feature properties being processed.
 */

/**
 * Reduce geometry in any GeoJSON object, similar to Array.reduce().
 *
 * @name geomReduce
 * @param {(FeatureCollection|Feature|Geometry)} geojson any GeoJSON object
 * @param {Function} callback a method that takes (previousValue, currentGeometry, featureIndex, currentProperties)
 * @param {*} [initialValue] Value to use as the first argument to the first call of the callback.
 * @returns {*} The value that results from the reduction.
 * @example
 * var features = turf.featureCollection([
 *     turf.point([26, 37], {foo: 'bar'}),
 *     turf.point([36, 53], {hello: 'world'})
 * ]);
 *
 * turf.geomReduce(features, function (previousValue, currentGeometry, featureIndex, currentProperties) {
 *   //=previousValue
 *   //=currentGeometry
 *   //=featureIndex
 *   //=currentProperties
 *   return currentGeometry
 * });
 */
function geomReduce(geojson, callback, initialValue) {
    var previousValue = initialValue;
    geomEach(geojson, function (currentGeometry, currentIndex, currentProperties) {
        if (currentIndex === 0 && initialValue === undefined) previousValue = currentGeometry;
        else previousValue = callback(previousValue, currentGeometry, currentIndex, currentProperties);
    });
    return previousValue;
}

/**
 * Callback for flattenEach
 *
 * @callback flattenEachCallback
 * @param {Feature} currentFeature The current flattened feature being processed.
 * @param {number} featureIndex The index of the current element being processed in the
 * array. Starts at index 0, if an initialValue is provided, and at index 1 otherwise.
 * @param {number} featureSubIndex The subindex of the current element being processed in the
 * array. Starts at index 0 and increases if the flattened feature was a multi-geometry.
 */

/**
 * Iterate over flattened features in any GeoJSON object, similar to
 * Array.forEach.
 *
 * @name flattenEach
 * @param {(FeatureCollection|Feature|Geometry)} geojson any GeoJSON object
 * @param {Function} callback a method that takes (currentFeature, featureIndex, featureSubIndex)
 * @example
 * var features = turf.featureCollection([
 *     turf.point([26, 37], {foo: 'bar'}),
 *     turf.multiPoint([[40, 30], [36, 53]], {hello: 'world'})
 * ]);
 *
 * turf.flattenEach(features, function (currentFeature, featureIndex, featureSubIndex) {
 *   //=currentFeature
 *   //=featureIndex
 *   //=featureSubIndex
 * });
 */
function flattenEach(geojson, callback) {
    geomEach(geojson, function (geometry, featureIndex, properties) {
        // Callback for single geometry
        var type = (geometry === null) ? null : geometry.type;
        switch (type) {
        case null:
        case 'Point':
        case 'LineString':
        case 'Polygon':
            callback(feature(geometry, properties), featureIndex, 0);
            return;
        }

        var geomType;

        // Callback for multi-geometry
        switch (type) {
        case 'MultiPoint':
            geomType = 'Point';
            break;
        case 'MultiLineString':
            geomType = 'LineString';
            break;
        case 'MultiPolygon':
            geomType = 'Polygon';
            break;
        }

        geometry.coordinates.forEach(function (coordinate, featureSubIndex) {
            var geom = {
                type: geomType,
                coordinates: coordinate
            };
            callback(feature(geom, properties), featureIndex, featureSubIndex);
        });

    });
}

/**
 * Callback for flattenReduce
 *
 * The first time the callback function is called, the values provided as arguments depend
 * on whether the reduce method has an initialValue argument.
 *
 * If an initialValue is provided to the reduce method:
 *  - The previousValue argument is initialValue.
 *  - The currentValue argument is the value of the first element present in the array.
 *
 * If an initialValue is not provided:
 *  - The previousValue argument is the value of the first element present in the array.
 *  - The currentValue argument is the value of the second element present in the array.
 *
 * @callback flattenReduceCallback
 * @param {*} previousValue The accumulated value previously returned in the last invocation
 * of the callback, or initialValue, if supplied.
 * @param {Feature} currentFeature The current Feature being processed.
 * @param {number} featureIndex The index of the current element being processed in the
 * array.Starts at index 0, if an initialValue is provided, and at index 1 otherwise.
 * @param {number} featureSubIndex The subindex of the current element being processed in the
 * array. Starts at index 0 and increases if the flattened feature was a multi-geometry.
 */

/**
 * Reduce flattened features in any GeoJSON object, similar to Array.reduce().
 *
 * @name flattenReduce
 * @param {(FeatureCollection|Feature|Geometry)} geojson any GeoJSON object
 * @param {Function} callback a method that takes (previousValue, currentFeature, featureIndex, featureSubIndex)
 * @param {*} [initialValue] Value to use as the first argument to the first call of the callback.
 * @returns {*} The value that results from the reduction.
 * @example
 * var features = turf.featureCollection([
 *     turf.point([26, 37], {foo: 'bar'}),
 *     turf.multiPoint([[40, 30], [36, 53]], {hello: 'world'})
 * ]);
 *
 * turf.flattenReduce(features, function (previousValue, currentFeature, featureIndex, featureSubIndex) {
 *   //=previousValue
 *   //=currentFeature
 *   //=featureIndex
 *   //=featureSubIndex
 *   return currentFeature
 * });
 */
function flattenReduce(geojson, callback, initialValue) {
    var previousValue = initialValue;
    flattenEach(geojson, function (currentFeature, featureIndex, featureSubIndex) {
        if (featureIndex === 0 && featureSubIndex === 0 && initialValue === undefined) previousValue = currentFeature;
        else previousValue = callback(previousValue, currentFeature, featureIndex, featureSubIndex);
    });
    return previousValue;
}

/**
 * Callback for segmentEach
 *
 * @callback segmentEachCallback
 * @param {Feature<LineString>} currentSegment The current segment being processed.
 * @param {number} featureIndex The featureIndex currently being processed, starts at index 0.
 * @param {number} featureSubIndex The featureSubIndex currently being processed, starts at index 0.
 * @param {number} segmentIndex The segmentIndex currently being processed, starts at index 0.
 * @returns {void}
 */

/**
 * Iterate over 2-vertex line segment in any GeoJSON object, similar to Array.forEach()
 * (Multi)Point geometries do not contain segments therefore they are ignored during this operation.
 *
 * @param {(FeatureCollection|Feature|Geometry)} geojson any GeoJSON
 * @param {Function} callback a method that takes (currentSegment, featureIndex, featureSubIndex)
 * @returns {void}
 * @example
 * var polygon = turf.polygon([[[-50, 5], [-40, -10], [-50, -10], [-40, 5], [-50, 5]]]);
 *
 * // Iterate over GeoJSON by 2-vertex segments
 * turf.segmentEach(polygon, function (currentSegment, featureIndex, featureSubIndex, segmentIndex) {
 *   //= currentSegment
 *   //= featureIndex
 *   //= featureSubIndex
 *   //= segmentIndex
 * });
 *
 * // Calculate the total number of segments
 * var total = 0;
 * turf.segmentEach(polygon, function () {
 *     total++;
 * });
 */
function segmentEach(geojson, callback) {
    flattenEach(geojson, function (feature, featureIndex, featureSubIndex) {
        var segmentIndex = 0;

        // Exclude null Geometries
        if (!feature.geometry) return;
        // (Multi)Point geometries do not contain segments therefore they are ignored during this operation.
        var type = feature.geometry.type;
        if (type === 'Point' || type === 'MultiPoint') return;

        // Generate 2-vertex line segments
        coordReduce(feature, function (previousCoords, currentCoord) {
            var currentSegment = lineString([previousCoords, currentCoord], feature.properties);
            callback(currentSegment, featureIndex, featureSubIndex, segmentIndex);
            segmentIndex++;
            return currentCoord;
        });
    });
}

/**
 * Callback for segmentReduce
 *
 * The first time the callback function is called, the values provided as arguments depend
 * on whether the reduce method has an initialValue argument.
 *
 * If an initialValue is provided to the reduce method:
 *  - The previousValue argument is initialValue.
 *  - The currentValue argument is the value of the first element present in the array.
 *
 * If an initialValue is not provided:
 *  - The previousValue argument is the value of the first element present in the array.
 *  - The currentValue argument is the value of the second element present in the array.
 *
 * @callback segmentReduceCallback
 * @param {*} [previousValue] The accumulated value previously returned in the last invocation
 * of the callback, or initialValue, if supplied.
 * @param {Feature<LineString>} [currentSegment] The current segment being processed.
 * @param {number} featureIndex The featureIndex currently being processed, starts at index 0.
 * @param {number} featureSubIndex The featureSubIndex currently being processed, starts at index 0.
 * @param {number} segmentIndex The segmentIndex currently being processed, starts at index 0.
 */

/**
 * Reduce 2-vertex line segment in any GeoJSON object, similar to Array.reduce()
 * (Multi)Point geometries do not contain segments therefore they are ignored during this operation.
 *
 * @param {(FeatureCollection|Feature|Geometry)} geojson any GeoJSON
 * @param {Function} callback a method that takes (previousValue, currentSegment, currentIndex)
 * @param {*} [initialValue] Value to use as the first argument to the first call of the callback.
 * @returns {void}
 * @example
 * var polygon = turf.polygon([[[-50, 5], [-40, -10], [-50, -10], [-40, 5], [-50, 5]]]);
 *
 * // Iterate over GeoJSON by 2-vertex segments
 * turf.segmentReduce(polygon, function (previousSegment, currentSegment, featureIndex, featureSubIndex, segmentIndex) {
 *   //= previousSegment
 *   //= currentSegment
 *   //= featureIndex
 *   //= featureSubIndex
 *   //= segmentInex
 *   return currentSegment
 * });
 *
 * // Calculate the total number of segments
 * var initialValue = 0
 * var total = turf.segmentReduce(polygon, function (previousValue) {
 *     previousValue++;
 *     return previousValue;
 * }, initialValue);
 */
function segmentReduce(geojson, callback, initialValue) {
    var previousValue = initialValue;
    var started = false;
    segmentEach(geojson, function (currentSegment, featureIndex, featureSubIndex, segmentIndex) {
        if (started === false && initialValue === undefined) previousValue = currentSegment;
        else previousValue = callback(previousValue, currentSegment, featureIndex, featureSubIndex, segmentIndex);
        started = true;
    });
    return previousValue;
}

/**
 * Create Feature
 *
 * @private
 * @param {Geometry} geometry GeoJSON Geometry
 * @param {Object} properties Properties
 * @returns {Feature} GeoJSON Feature
 */
function feature(geometry, properties) {
    if (geometry === undefined) throw new Error('No geometry passed');

    return {
        type: 'Feature',
        properties: properties || {},
        geometry: geometry
    };
}

/**
 * Create LineString
 *
 * @private
 * @param {Array<Array<number>>} coordinates Line Coordinates
 * @param {Object} properties Properties
 * @returns {Feature<LineString>} GeoJSON LineString Feature
 */
function lineString(coordinates, properties) {
    if (!coordinates) throw new Error('No coordinates passed');
    if (coordinates.length < 2) throw new Error('Coordinates must be an array of two or more positions');

    return {
        type: 'Feature',
        properties: properties || {},
        geometry: {
            type: 'LineString',
            coordinates: coordinates
        }
    };
}


/**
 * Callback for lineEach
 *
 * @callback lineEachCallback
 * @param {Feature<LineString>} currentLine The current LineString|LinearRing being processed.
 * @param {number} lineIndex The index of the current element being processed in the array, starts at index 0.
 * @param {number} lineSubIndex The sub-index of the current line being processed at index 0
 */

/**
 * Iterate over line or ring coordinates in LineString, Polygon, MultiLineString, MultiPolygon Features or Geometries,
 * similar to Array.forEach.
 *
 * @name lineEach
 * @param {Geometry|Feature<LineString|Polygon|MultiLineString|MultiPolygon>} geojson object
 * @param {Function} callback a method that takes (currentLine, lineIndex, lineSubIndex)
 * @example
 * var mtLn = turf.multiLineString([
 *   turf.lineString([[26, 37], [35, 45]]),
 *   turf.lineString([[36, 53], [38, 50], [41, 55]])
 * ]);
 *
 * turf.lineEach(mtLn, function (currentLine, lineIndex) {
 *   //=currentLine
 *   //=lineIndex
 * });
 */
function lineEach(geojson, callback) {
    // validation
    if (!geojson) throw new Error('geojson is required');
    var type = geojson.geometry ? geojson.geometry.type : geojson.type;
    if (!type) throw new Error('invalid geojson');
    if (type === 'FeatureCollection') throw new Error('FeatureCollection is not supported');
    if (type === 'GeometryCollection') throw new Error('GeometryCollection is not supported');
    var coordinates = geojson.geometry ? geojson.geometry.coordinates : geojson.coordinates;
    if (!coordinates) throw new Error('geojson must contain coordinates');

    switch (type) {
    case 'LineString':
        callback(coordinates, 0, 0);
        return;
    case 'Polygon':
    case 'MultiLineString':
        var subIndex = 0;
        for (var line = 0; line < coordinates.length; line++) {
            if (type === 'MultiLineString') subIndex = line;
            callback(coordinates[line], line, subIndex);
        }
        return;
    case 'MultiPolygon':
        for (var multi = 0; multi < coordinates.length; multi++) {
            for (var ring = 0; ring < coordinates[multi].length; ring++) {
                callback(coordinates[multi][ring], ring, multi);
            }
        }
        return;
    default:
        throw new Error(type + ' geometry not supported');
    }
}

/**
 * Callback for lineReduce
 *
 * The first time the callback function is called, the values provided as arguments depend
 * on whether the reduce method has an initialValue argument.
 *
 * If an initialValue is provided to the reduce method:
 *  - The previousValue argument is initialValue.
 *  - The currentValue argument is the value of the first element present in the array.
 *
 * If an initialValue is not provided:
 *  - The previousValue argument is the value of the first element present in the array.
 *  - The currentValue argument is the value of the second element present in the array.
 *
 * @callback lineReduceCallback
 * @param {*} previousValue The accumulated value previously returned in the last invocation
 * of the callback, or initialValue, if supplied.
 * @param {Feature<LineString>} currentLine The current LineString|LinearRing being processed.
 * @param {number} lineIndex The index of the current element being processed in the
 * array. Starts at index 0, if an initialValue is provided, and at index 1 otherwise.
 * @param {number} lineSubIndex The sub-index of the current line being processed at index 0
 */

/**
 * Reduce features in any GeoJSON object, similar to Array.reduce().
 *
 * @name lineReduce
 * @param {Geometry|Feature<LineString|Polygon|MultiLineString|MultiPolygon>} geojson object
 * @param {Function} callback a method that takes (previousValue, currentFeature, featureIndex)
 * @param {*} [initialValue] Value to use as the first argument to the first call of the callback.
 * @returns {*} The value that results from the reduction.
 * @example
 * var mtp = turf.multiPolygon([
 *   turf.polygon([[[12,48],[2,41],[24,38],[12,48]], [[9,44],[13,41],[13,45],[9,44]]]),
 *   turf.polygon([[[5, 5], [0, 0], [2, 2], [4, 4], [5, 5]]])
 * ]);
 *
 * turf.lineReduce(mtp, function (previousValue, currentLine, lineIndex, lineSubIndex) {
 *   //=previousValue
 *   //=currentLine
 *   //=lineIndex
 *   //=lineSubIndex
 *   return currentLine
 * }, 2);
 */
function lineReduce(geojson, callback, initialValue) {
    var previousValue = initialValue;
    lineEach(geojson, function (currentLine, lineIndex, lineSubIndex) {
        if (lineIndex === 0 && initialValue === undefined) previousValue = currentLine;
        else previousValue = callback(previousValue, currentLine, lineIndex, lineSubIndex);
    });
    return previousValue;
}


/***/ }),

/***/ "./node_modules/deep-equal/index.js":
/*!******************************************!*\
  !*** ./node_modules/deep-equal/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var pSlice = Array.prototype.slice;
var objectKeys = __webpack_require__(/*! ./lib/keys.js */ "./node_modules/deep-equal/lib/keys.js");
var isArguments = __webpack_require__(/*! ./lib/is_arguments.js */ "./node_modules/deep-equal/lib/is_arguments.js");

var deepEqual = module.exports = function (actual, expected, opts) {
  if (!opts) opts = {};
  // 7.1. All identical values are equivalent, as determined by ===.
  if (actual === expected) {
    return true;

  } else if (actual instanceof Date && expected instanceof Date) {
    return actual.getTime() === expected.getTime();

  // 7.3. Other pairs that do not both pass typeof value == 'object',
  // equivalence is determined by ==.
  } else if (!actual || !expected || typeof actual != 'object' && typeof expected != 'object') {
    return opts.strict ? actual === expected : actual == expected;

  // 7.4. For all other Object pairs, including Array objects, equivalence is
  // determined by having the same number of owned properties (as verified
  // with Object.prototype.hasOwnProperty.call), the same set of keys
  // (although not necessarily the same order), equivalent values for every
  // corresponding key, and an identical 'prototype' property. Note: this
  // accounts for both named and indexed properties on Arrays.
  } else {
    return objEquiv(actual, expected, opts);
  }
}

function isUndefinedOrNull(value) {
  return value === null || value === undefined;
}

function isBuffer (x) {
  if (!x || typeof x !== 'object' || typeof x.length !== 'number') return false;
  if (typeof x.copy !== 'function' || typeof x.slice !== 'function') {
    return false;
  }
  if (x.length > 0 && typeof x[0] !== 'number') return false;
  return true;
}

function objEquiv(a, b, opts) {
  var i, key;
  if (isUndefinedOrNull(a) || isUndefinedOrNull(b))
    return false;
  // an identical 'prototype' property.
  if (a.prototype !== b.prototype) return false;
  //~~~I've managed to break Object.keys through screwy arguments passing.
  //   Converting to array solves the problem.
  if (isArguments(a)) {
    if (!isArguments(b)) {
      return false;
    }
    a = pSlice.call(a);
    b = pSlice.call(b);
    return deepEqual(a, b, opts);
  }
  if (isBuffer(a)) {
    if (!isBuffer(b)) {
      return false;
    }
    if (a.length !== b.length) return false;
    for (i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }
  try {
    var ka = objectKeys(a),
        kb = objectKeys(b);
  } catch (e) {//happens when one is a string literal and the other isn't
    return false;
  }
  // having the same number of owned properties (keys incorporates
  // hasOwnProperty)
  if (ka.length != kb.length)
    return false;
  //the same set of keys (although not necessarily the same order),
  ka.sort();
  kb.sort();
  //~~~cheap key test
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] != kb[i])
      return false;
  }
  //equivalent values for every corresponding key, and
  //~~~possibly expensive deep test
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!deepEqual(a[key], b[key], opts)) return false;
  }
  return typeof a === typeof b;
}


/***/ }),

/***/ "./node_modules/deep-equal/lib/is_arguments.js":
/*!*****************************************************!*\
  !*** ./node_modules/deep-equal/lib/is_arguments.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var supportsArgumentsClass = (function(){
  return Object.prototype.toString.call(arguments)
})() == '[object Arguments]';

exports = module.exports = supportsArgumentsClass ? supported : unsupported;

exports.supported = supported;
function supported(object) {
  return Object.prototype.toString.call(object) == '[object Arguments]';
};

exports.unsupported = unsupported;
function unsupported(object){
  return object &&
    typeof object == 'object' &&
    typeof object.length == 'number' &&
    Object.prototype.hasOwnProperty.call(object, 'callee') &&
    !Object.prototype.propertyIsEnumerable.call(object, 'callee') ||
    false;
};


/***/ }),

/***/ "./node_modules/deep-equal/lib/keys.js":
/*!*********************************************!*\
  !*** ./node_modules/deep-equal/lib/keys.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}


/***/ }),

/***/ "./node_modules/kdbush/src/kdbush.js":
/*!*******************************************!*\
  !*** ./node_modules/kdbush/src/kdbush.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var sort = __webpack_require__(/*! ./sort */ "./node_modules/kdbush/src/sort.js");
var range = __webpack_require__(/*! ./range */ "./node_modules/kdbush/src/range.js");
var within = __webpack_require__(/*! ./within */ "./node_modules/kdbush/src/within.js");

module.exports = kdbush;

function kdbush(points, getX, getY, nodeSize, ArrayType) {
    return new KDBush(points, getX, getY, nodeSize, ArrayType);
}

function KDBush(points, getX, getY, nodeSize, ArrayType) {
    getX = getX || defaultGetX;
    getY = getY || defaultGetY;
    ArrayType = ArrayType || Array;

    this.nodeSize = nodeSize || 64;
    this.points = points;

    this.ids = new ArrayType(points.length);
    this.coords = new ArrayType(points.length * 2);

    for (var i = 0; i < points.length; i++) {
        this.ids[i] = i;
        this.coords[2 * i] = getX(points[i]);
        this.coords[2 * i + 1] = getY(points[i]);
    }

    sort(this.ids, this.coords, this.nodeSize, 0, this.ids.length - 1, 0);
}

KDBush.prototype = {
    range: function (minX, minY, maxX, maxY) {
        return range(this.ids, this.coords, minX, minY, maxX, maxY, this.nodeSize);
    },

    within: function (x, y, r) {
        return within(this.ids, this.coords, x, y, r, this.nodeSize);
    }
};

function defaultGetX(p) { return p[0]; }
function defaultGetY(p) { return p[1]; }


/***/ }),

/***/ "./node_modules/kdbush/src/range.js":
/*!******************************************!*\
  !*** ./node_modules/kdbush/src/range.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = range;

function range(ids, coords, minX, minY, maxX, maxY, nodeSize) {
    var stack = [0, ids.length - 1, 0];
    var result = [];
    var x, y;

    while (stack.length) {
        var axis = stack.pop();
        var right = stack.pop();
        var left = stack.pop();

        if (right - left <= nodeSize) {
            for (var i = left; i <= right; i++) {
                x = coords[2 * i];
                y = coords[2 * i + 1];
                if (x >= minX && x <= maxX && y >= minY && y <= maxY) result.push(ids[i]);
            }
            continue;
        }

        var m = Math.floor((left + right) / 2);

        x = coords[2 * m];
        y = coords[2 * m + 1];

        if (x >= minX && x <= maxX && y >= minY && y <= maxY) result.push(ids[m]);

        var nextAxis = (axis + 1) % 2;

        if (axis === 0 ? minX <= x : minY <= y) {
            stack.push(left);
            stack.push(m - 1);
            stack.push(nextAxis);
        }
        if (axis === 0 ? maxX >= x : maxY >= y) {
            stack.push(m + 1);
            stack.push(right);
            stack.push(nextAxis);
        }
    }

    return result;
}


/***/ }),

/***/ "./node_modules/kdbush/src/sort.js":
/*!*****************************************!*\
  !*** ./node_modules/kdbush/src/sort.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = sortKD;

function sortKD(ids, coords, nodeSize, left, right, depth) {
    if (right - left <= nodeSize) return;

    var m = Math.floor((left + right) / 2);

    select(ids, coords, m, left, right, depth % 2);

    sortKD(ids, coords, nodeSize, left, m - 1, depth + 1);
    sortKD(ids, coords, nodeSize, m + 1, right, depth + 1);
}

function select(ids, coords, k, left, right, inc) {

    while (right > left) {
        if (right - left > 600) {
            var n = right - left + 1;
            var m = k - left + 1;
            var z = Math.log(n);
            var s = 0.5 * Math.exp(2 * z / 3);
            var sd = 0.5 * Math.sqrt(z * s * (n - s) / n) * (m - n / 2 < 0 ? -1 : 1);
            var newLeft = Math.max(left, Math.floor(k - m * s / n + sd));
            var newRight = Math.min(right, Math.floor(k + (n - m) * s / n + sd));
            select(ids, coords, k, newLeft, newRight, inc);
        }

        var t = coords[2 * k + inc];
        var i = left;
        var j = right;

        swapItem(ids, coords, left, k);
        if (coords[2 * right + inc] > t) swapItem(ids, coords, left, right);

        while (i < j) {
            swapItem(ids, coords, i, j);
            i++;
            j--;
            while (coords[2 * i + inc] < t) i++;
            while (coords[2 * j + inc] > t) j--;
        }

        if (coords[2 * left + inc] === t) swapItem(ids, coords, left, j);
        else {
            j++;
            swapItem(ids, coords, j, right);
        }

        if (j <= k) left = j + 1;
        if (k <= j) right = j - 1;
    }
}

function swapItem(ids, coords, i, j) {
    swap(ids, i, j);
    swap(coords, 2 * i, 2 * j);
    swap(coords, 2 * i + 1, 2 * j + 1);
}

function swap(arr, i, j) {
    var tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
}


/***/ }),

/***/ "./node_modules/kdbush/src/within.js":
/*!*******************************************!*\
  !*** ./node_modules/kdbush/src/within.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = within;

function within(ids, coords, qx, qy, r, nodeSize) {
    var stack = [0, ids.length - 1, 0];
    var result = [];
    var r2 = r * r;

    while (stack.length) {
        var axis = stack.pop();
        var right = stack.pop();
        var left = stack.pop();

        if (right - left <= nodeSize) {
            for (var i = left; i <= right; i++) {
                if (sqDist(coords[2 * i], coords[2 * i + 1], qx, qy) <= r2) result.push(ids[i]);
            }
            continue;
        }

        var m = Math.floor((left + right) / 2);

        var x = coords[2 * m];
        var y = coords[2 * m + 1];

        if (sqDist(x, y, qx, qy) <= r2) result.push(ids[m]);

        var nextAxis = (axis + 1) % 2;

        if (axis === 0 ? qx - r <= x : qy - r <= y) {
            stack.push(left);
            stack.push(m - 1);
            stack.push(nextAxis);
        }
        if (axis === 0 ? qx + r >= x : qy + r >= y) {
            stack.push(m + 1);
            stack.push(right);
            stack.push(nextAxis);
        }
    }

    return result;
}

function sqDist(ax, ay, bx, by) {
    var dx = ax - bx;
    var dy = ay - by;
    return dx * dx + dy * dy;
}


/***/ }),

/***/ "./node_modules/mapbox-gl/dist/mapbox-gl.js":
/*!**************************************************!*\
  !*** ./node_modules/mapbox-gl/dist/mapbox-gl.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* Mapbox GL JS is licensed under the 3-Clause BSD License. Full text of license: https://github.com/mapbox/mapbox-gl-js/blob/v0.52.0/LICENSE.txt */
(function (global, factory) {
 true ? module.exports = factory() :
undefined;
}(this, (function () { 'use strict';

/* eslint-disable */

var shared, worker, mapboxgl;
// define gets called three times: one for each chunk. we rely on the order
// they're imported to know which is which
function define(_, chunk) {
if (!shared) {
    shared = chunk;
} else if (!worker) {
    worker = chunk;
} else {
    var workerBundleString = 'var sharedChunk = {}; (' + shared + ')(sharedChunk); (' + worker + ')(sharedChunk);'

    var sharedChunk = {};
    shared(sharedChunk);
    mapboxgl = chunk(sharedChunk);
    mapboxgl.workerUrl = window.URL.createObjectURL(new Blob([workerBundleString], { type: 'text/javascript' }));
}
}


define(["exports"],function(t){"use strict";function e(t,e){return t(e={exports:{}},e.exports),e.exports}var r=n;function n(t,e,r,n){this.cx=3*t,this.bx=3*(r-t)-this.cx,this.ax=1-this.cx-this.bx,this.cy=3*e,this.by=3*(n-e)-this.cy,this.ay=1-this.cy-this.by,this.p1x=t,this.p1y=n,this.p2x=r,this.p2y=n;}n.prototype.sampleCurveX=function(t){return ((this.ax*t+this.bx)*t+this.cx)*t},n.prototype.sampleCurveY=function(t){return ((this.ay*t+this.by)*t+this.cy)*t},n.prototype.sampleCurveDerivativeX=function(t){return (3*this.ax*t+2*this.bx)*t+this.cx},n.prototype.solveCurveX=function(t,e){var r,n,i,a,o;for(void 0===e&&(e=1e-6),i=t,o=0;o<8;o++){if(a=this.sampleCurveX(i)-t,Math.abs(a)<e)return i;var s=this.sampleCurveDerivativeX(i);if(Math.abs(s)<1e-6)break;i-=a/s;}if((i=t)<(r=0))return r;if(i>(n=1))return n;for(;r<n;){if(a=this.sampleCurveX(i),Math.abs(a-t)<e)return i;t>a?r=i:n=i,i=.5*(n-r)+r;}return i},n.prototype.solve=function(t,e){return this.sampleCurveY(this.solveCurveX(t,e))};var i=a;function a(t,e){this.x=t,this.y=e;}function o(t,e){if(Array.isArray(t)){if(!Array.isArray(e)||t.length!==e.length)return !1;for(var r=0;r<t.length;r++)if(!o(t[r],e[r]))return !1;return !0}if("object"==typeof t&&null!==t&&null!==e){if("object"!=typeof e)return !1;if(Object.keys(t).length!==Object.keys(e).length)return !1;for(var n in t)if(!o(t[n],e[n]))return !1;return !0}return t===e}function s(t,e,n,i){var a=new r(t,e,n,i);return function(t){return a.solve(t)}}a.prototype={clone:function(){return new a(this.x,this.y)},add:function(t){return this.clone()._add(t)},sub:function(t){return this.clone()._sub(t)},multByPoint:function(t){return this.clone()._multByPoint(t)},divByPoint:function(t){return this.clone()._divByPoint(t)},mult:function(t){return this.clone()._mult(t)},div:function(t){return this.clone()._div(t)},rotate:function(t){return this.clone()._rotate(t)},rotateAround:function(t,e){return this.clone()._rotateAround(t,e)},matMult:function(t){return this.clone()._matMult(t)},unit:function(){return this.clone()._unit()},perp:function(){return this.clone()._perp()},round:function(){return this.clone()._round()},mag:function(){return Math.sqrt(this.x*this.x+this.y*this.y)},equals:function(t){return this.x===t.x&&this.y===t.y},dist:function(t){return Math.sqrt(this.distSqr(t))},distSqr:function(t){var e=t.x-this.x,r=t.y-this.y;return e*e+r*r},angle:function(){return Math.atan2(this.y,this.x)},angleTo:function(t){return Math.atan2(this.y-t.y,this.x-t.x)},angleWith:function(t){return this.angleWithSep(t.x,t.y)},angleWithSep:function(t,e){return Math.atan2(this.x*e-this.y*t,this.x*t+this.y*e)},_matMult:function(t){var e=t[0]*this.x+t[1]*this.y,r=t[2]*this.x+t[3]*this.y;return this.x=e,this.y=r,this},_add:function(t){return this.x+=t.x,this.y+=t.y,this},_sub:function(t){return this.x-=t.x,this.y-=t.y,this},_mult:function(t){return this.x*=t,this.y*=t,this},_div:function(t){return this.x/=t,this.y/=t,this},_multByPoint:function(t){return this.x*=t.x,this.y*=t.y,this},_divByPoint:function(t){return this.x/=t.x,this.y/=t.y,this},_unit:function(){return this._div(this.mag()),this},_perp:function(){var t=this.y;return this.y=this.x,this.x=-t,this},_rotate:function(t){var e=Math.cos(t),r=Math.sin(t),n=e*this.x-r*this.y,i=r*this.x+e*this.y;return this.x=n,this.y=i,this},_rotateAround:function(t,e){var r=Math.cos(t),n=Math.sin(t),i=e.x+r*(this.x-e.x)-n*(this.y-e.y),a=e.y+n*(this.x-e.x)+r*(this.y-e.y);return this.x=i,this.y=a,this},_round:function(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}},a.convert=function(t){return t instanceof a?t:Array.isArray(t)?new a(t[0],t[1]):t};var u=s(.25,.1,.25,1);function p(t,e,r){return Math.min(r,Math.max(e,t))}function l(t,e,r){var n=r-e,i=((t-e)%n+n)%n+e;return i===e?r:i}function c(t){for(var e=[],r=arguments.length-1;r-- >0;)e[r]=arguments[r+1];for(var n=0,i=e;n<i.length;n+=1){var a=i[n];for(var o in a)t[o]=a[o];}return t}var h=1;function f(){return h++}function y(){return function t(e){return e?(e^16*Math.random()>>e/4).toString(16):([1e7]+-[1e3]+-4e3+-8e3+-1e11).replace(/[018]/g,t)}()}function d(t){return !!t&&/^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(t)}function m(t,e){t.forEach(function(t){e[t]&&(e[t]=e[t].bind(e));});}function v(t,e){return -1!==t.indexOf(e,t.length-e.length)}function g(t,e,r){var n={};for(var i in t)n[i]=e.call(r||this,t[i],i,t);return n}function x(t,e,r){var n={};for(var i in t)e.call(r||this,t[i],i,t)&&(n[i]=t[i]);return n}function b(t){return Array.isArray(t)?t.map(b):"object"==typeof t&&t?g(t,b):t}var _={};function w(t){_[t]||("undefined"!=typeof console&&console.warn(t),_[t]=!0);}function A(t,e,r){return (r.y-t.y)*(e.x-t.x)>(e.y-t.y)*(r.x-t.x)}function k(t){for(var e=0,r=0,n=t.length,i=n-1,a=void 0,o=void 0;r<n;i=r++)a=t[r],e+=((o=t[i]).x-a.x)*(a.y+o.y);return e}function S(t){try{var e=self[t];return e.setItem("_mapbox_test_",1),e.removeItem("_mapbox_test_"),!0}catch(t){return !1}}var z,I,B=self.performance&&self.performance.now?self.performance.now.bind(self.performance):Date.now.bind(Date),E=self.requestAnimationFrame||self.mozRequestAnimationFrame||self.webkitRequestAnimationFrame||self.msRequestAnimationFrame,P=self.cancelAnimationFrame||self.mozCancelAnimationFrame||self.webkitCancelAnimationFrame||self.msCancelAnimationFrame,V={now:B,frame:function(t){var e=E(t);return {cancel:function(){return P(e)}}},getImageData:function(t){var e=self.document.createElement("canvas"),r=e.getContext("2d");if(!r)throw new Error("failed to create canvas 2d context");return e.width=t.width,e.height=t.height,r.drawImage(t,0,0,t.width,t.height),r.getImageData(0,0,t.width,t.height)},resolveURL:function(t){var e=self.document.createElement("a");return e.href=t,e.href},hardwareConcurrency:self.navigator.hardwareConcurrency||4,get devicePixelRatio(){return self.devicePixelRatio}},M={API_URL:"https://api.mapbox.com",get EVENTS_URL(){return 0===this.API_URL.indexOf("https://api.mapbox.cn")?"https://events.mapbox.cn/events/v2":"https://events.mapbox.com/events/v2"},REQUIRE_ACCESS_TOKEN:!0,ACCESS_TOKEN:null,MAX_PARALLEL_IMAGE_REQUESTS:16},C={supported:!1,testSupport:function(t){if(T||!I)return;if(!I.complete)return void(z=t);F(t);}},T=!1;function F(t){var e=t.createTexture();t.bindTexture(t.TEXTURE_2D,e);try{if(t.texImage2D(t.TEXTURE_2D,0,t.RGBA,t.RGBA,t.UNSIGNED_BYTE,I),t.isContextLost())return;C.supported=!0;}catch(t){}t.deleteTexture(e),T=!0;}self.document&&((I=self.document.createElement("img")).onload=function(){z&&F(z),z=null;},I.onerror=function(){T=!0,z=null;},I.src="data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAQAAAAfQ//73v/+BiOh/AAA=");var L="See https://www.mapbox.com/api-documentation/#access-tokens";function O(t,e){var r=Z(M.API_URL);if(t.protocol=r.protocol,t.authority=r.authority,"/"!==r.path&&(t.path=""+r.path+t.path),!M.REQUIRE_ACCESS_TOKEN)return X(t);if(!(e=e||M.ACCESS_TOKEN))throw new Error("An API access token is required to use Mapbox GL. "+L);if("s"===e[0])throw new Error("Use a public access token (pk.*) with Mapbox GL, not a secret access token (sk.*). "+L);return t.params.push("access_token="+e),X(t)}function D(t){return 0===t.indexOf("mapbox:")}var U=/^((https?:)?\/\/)?([^\/]+\.)?mapbox\.c(n|om)(\/|\?|$)/i;function j(t){return U.test(t)}var q=/(\.(png|jpg)\d*)(?=$)/,R=/\.[\w]+$/,N=function(t){var e=Z(t);if(!e.path.match(/(^\/v4\/)/)||!e.path.match(R))return t;var r="mapbox://tiles/";r+=e.path.replace("/v4/","");var n=e.params.filter(function(t){return !t.match(/^access_token=/)});return n.length&&(r+="?"+n.join("&")),r},G=/^(\w+):\/\/([^\/?]*)(\/[^?]+)?\??(.+)?/;function Z(t){var e=t.match(G);if(!e)throw new Error("Unable to parse URL object");return {protocol:e[1],authority:e[2],path:e[3]||"/",params:e[4]?e[4].split("&"):[]}}function X(t){var e=t.params.length?"?"+t.params.join("&"):"";return t.protocol+"://"+t.authority+t.path+e}var K=function(t){this.type=t,this.anonId=null,this.eventData={lastSuccess:null,accessToken:M.ACCESS_TOKEN},this.queue=[],this.pendingRequest=null;};K.prototype.fetchEventData=function(){var t=S("localStorage"),e="mapbox.eventData:"+(M.ACCESS_TOKEN||""),r="mapbox.eventData.uuid:"+(M.ACCESS_TOKEN||"");if(t)try{var n=self.localStorage.getItem(e);n&&(this.eventData=JSON.parse(n));var i=self.localStorage.getItem(r);i&&(this.anonId=i);}catch(t){w("Unable to read from LocalStorage");}},K.prototype.saveEventData=function(){var t=S("localStorage"),e="mapbox.eventData:"+(M.ACCESS_TOKEN||""),r="mapbox.eventData.uuid:"+(M.ACCESS_TOKEN||"");if(t)try{self.localStorage.setItem(r,this.anonId),this.eventData.lastSuccess&&self.localStorage.setItem(e,JSON.stringify(this.eventData));}catch(t){w("Unable to write to LocalStorage");}},K.prototype.processRequests=function(){},K.prototype.postEvent=function(t,e,r){var n=this,i=Z(M.EVENTS_URL);i.params.push("access_token="+(M.ACCESS_TOKEN||""));var a={event:this.type,created:new Date(t).toISOString(),sdkIdentifier:"mapbox-gl-js",sdkVersion:"0.52.0",userId:this.anonId},o=e?c(a,e):a,s={url:X(i),headers:{"Content-Type":"text/plain"},body:JSON.stringify([o])};this.pendingRequest=it(s,function(t){n.pendingRequest=null,r(t),n.saveEventData(),n.processRequests();});},K.prototype.queueRequest=function(t){this.queue.push(t),this.processRequests();};var H=function(t){function e(){t.call(this,"map.load"),this.success={};}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.postMapLoadEvent=function(t,e){M.ACCESS_TOKEN&&Array.isArray(t)&&t.some(function(t){return j(t)})&&this.queueRequest({id:e,timestamp:Date.now()});},e.prototype.processRequests=function(){var t=this;if(!this.pendingRequest&&0!==this.queue.length){var e=this.queue.shift(),r=e.id,n=e.timestamp;r&&this.success[r]||(this.anonId||this.fetchEventData(),d(this.anonId)||(this.anonId=y()),this.postEvent(n,{},function(e){e||r&&(t.success[r]=!0);}));}},e}(K),J=new(function(t){function e(){t.call(this,"appUserTurnstile");}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.postTurnstileEvent=function(t){M.ACCESS_TOKEN&&Array.isArray(t)&&t.some(function(t){return j(t)})&&this.queueRequest(Date.now());},e.prototype.processRequests=function(){var t=this;if(!this.pendingRequest&&0!==this.queue.length){var e=!!this.eventData.accessToken&&this.eventData.accessToken!==M.ACCESS_TOKEN;e&&(this.anonId=this.eventData.lastSuccess=null),this.anonId&&this.eventData.lastSuccess||this.fetchEventData(),d(this.anonId)||(this.anonId=y(),e=!0);var r=this.queue.shift();if(this.eventData.lastSuccess){var n=new Date(this.eventData.lastSuccess),i=new Date(r),a=(r-this.eventData.lastSuccess)/864e5;e=e||a>=1||a<-1||n.getDate()!==i.getDate();}else e=!0;if(!e)return this.processRequests();this.postEvent(r,{"enabled.telemetry":!1},function(e){e||(t.eventData.lastSuccess=r,t.eventData.accessToken=M.ACCESS_TOKEN);});}},e}(K)),Y=J.postTurnstileEvent.bind(J),$=new H,W=$.postMapLoadEvent.bind($),Q={Unknown:"Unknown",Style:"Style",Source:"Source",Tile:"Tile",Glyphs:"Glyphs",SpriteImage:"SpriteImage",SpriteJSON:"SpriteJSON",Image:"Image"};"function"==typeof Object.freeze&&Object.freeze(Q);var tt=function(t){function e(e,r,n){401===r&&j(n)&&(e+=": you may have provided an invalid Mapbox access token. See https://www.mapbox.com/api-documentation/#access-tokens"),t.call(this,e),this.status=r,this.url=n,this.name=this.constructor.name,this.message=e;}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.toString=function(){return this.name+": "+this.message+" ("+this.status+"): "+this.url},e}(Error),et="undefined"!=typeof WorkerGlobalScope&&"undefined"!=typeof self&&self instanceof WorkerGlobalScope?function(){return self.worker&&self.worker.referrer}:function(){var t=self.location.origin;if(t&&"null"!==t&&"file://"!==t)return t+self.location.pathname};var rt=self.fetch&&self.Request&&self.AbortController?function(t,e){var r=new self.AbortController,n=new self.Request(t.url,{method:t.method||"GET",body:t.body,credentials:t.credentials,headers:t.headers,referrer:et(),signal:r.signal});return "json"===t.type&&n.headers.set("Accept","application/json"),self.fetch(n).then(function(r){r.ok?r[t.type||"text"]().then(function(t){e(null,t,r.headers.get("Cache-Control"),r.headers.get("Expires"));}).catch(function(t){return e(new Error(t.message))}):e(new tt(r.statusText,r.status,t.url));}).catch(function(t){20!==t.code&&e(new Error(t.message));}),{cancel:function(){return r.abort()}}}:function(t,e){var r=new self.XMLHttpRequest;for(var n in r.open(t.method||"GET",t.url,!0),"arrayBuffer"===t.type&&(r.responseType="arraybuffer"),t.headers)r.setRequestHeader(n,t.headers[n]);return "json"===t.type&&r.setRequestHeader("Accept","application/json"),r.withCredentials="include"===t.credentials,r.onerror=function(){e(new Error(r.statusText));},r.onload=function(){if((r.status>=200&&r.status<300||0===r.status)&&null!==r.response){var n=r.response;if("json"===t.type)try{n=JSON.parse(r.response);}catch(t){return e(t)}e(null,n,r.getResponseHeader("Cache-Control"),r.getResponseHeader("Expires"));}else e(new tt(r.statusText,r.status,t.url));},r.send(t.body),{cancel:function(){return r.abort()}}},nt=function(t,e){return rt(c(t,{type:"arrayBuffer"}),e)},it=function(t,e){return rt(c(t,{method:"POST"}),e)};var at,ot;at=[],ot=0;var st=function(t,e){if(ot>=M.MAX_PARALLEL_IMAGE_REQUESTS){var r={requestParameters:t,callback:e,cancelled:!1};return at.push(r),{cancel:function(){r.cancelled=!0;}}}ot++;var n=!1,i=function(){if(!n)for(n=!0,ot--;at.length&&ot<M.MAX_PARALLEL_IMAGE_REQUESTS;){var t=at.shift(),e=t.requestParameters,r=t.callback;t.cancelled||st(e,r);}},a=nt(t,function(t,r,n,a){if(i(),t)e(t);else if(r){var o=new self.Image,s=self.URL||self.webkitURL;o.onload=function(){e(null,o),s.revokeObjectURL(o.src);},o.onerror=function(){return e(new Error("Could not load image. Please make sure to use a supported image type such as PNG or JPEG. Note that SVGs are not supported."))};var u=new self.Blob([new Uint8Array(r)],{type:"image/png"});o.cacheControl=n,o.expires=a,o.src=r.byteLength?s.createObjectURL(u):"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQYV2NgAAIAAAUAAarVyFEAAAAASUVORK5CYII=";}});return {cancel:function(){a.cancel(),i();}}};function ut(t,e,r){r[t]&&-1!==r[t].indexOf(e)||(r[t]=r[t]||[],r[t].push(e));}function pt(t,e,r){if(r&&r[t]){var n=r[t].indexOf(e);-1!==n&&r[t].splice(n,1);}}var lt=function(t,e){void 0===e&&(e={}),c(this,e),this.type=t;},ct=function(t){function e(e,r){void 0===r&&(r={}),t.call(this,"error",c({error:e},r));}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e}(lt),ht=function(){};ht.prototype.on=function(t,e){return this._listeners=this._listeners||{},ut(t,e,this._listeners),this},ht.prototype.off=function(t,e){return pt(t,e,this._listeners),pt(t,e,this._oneTimeListeners),this},ht.prototype.once=function(t,e){return this._oneTimeListeners=this._oneTimeListeners||{},ut(t,e,this._oneTimeListeners),this},ht.prototype.fire=function(t,e){"string"==typeof t&&(t=new lt(t,e||{}));var r=t.type;if(this.listens(r)){t.target=this;for(var n=0,i=this._listeners&&this._listeners[r]?this._listeners[r].slice():[];n<i.length;n+=1){i[n].call(this,t);}for(var a=0,o=this._oneTimeListeners&&this._oneTimeListeners[r]?this._oneTimeListeners[r].slice():[];a<o.length;a+=1){var s=o[a];pt(r,s,this._oneTimeListeners),s.call(this,t);}var u=this._eventedParent;u&&(c(t,"function"==typeof this._eventedParentData?this._eventedParentData():this._eventedParentData),u.fire(t));}else t instanceof ct&&console.error(t.error);return this},ht.prototype.listens=function(t){return this._listeners&&this._listeners[t]&&this._listeners[t].length>0||this._oneTimeListeners&&this._oneTimeListeners[t]&&this._oneTimeListeners[t].length>0||this._eventedParent&&this._eventedParent.listens(t)},ht.prototype.setEventedParent=function(t,e){return this._eventedParent=t,this._eventedParentData=e,this};var ft={$version:8,$root:{version:{required:!0,type:"enum",values:[8]},name:{type:"string"},metadata:{type:"*"},center:{type:"array",value:"number"},zoom:{type:"number"},bearing:{type:"number",default:0,period:360,units:"degrees"},pitch:{type:"number",default:0,units:"degrees"},light:{type:"light"},sources:{required:!0,type:"sources"},sprite:{type:"string"},glyphs:{type:"string"},transition:{type:"transition"},layers:{required:!0,type:"array",value:"layer"}},sources:{"*":{type:"source"}},source:["source_vector","source_raster","source_raster_dem","source_geojson","source_video","source_image"],source_vector:{type:{required:!0,type:"enum",values:{vector:{}}},url:{type:"string"},tiles:{type:"array",value:"string"},bounds:{type:"array",value:"number",length:4,default:[-180,-85.051129,180,85.051129]},scheme:{type:"enum",values:{xyz:{},tms:{}},default:"xyz"},minzoom:{type:"number",default:0},maxzoom:{type:"number",default:22},attribution:{type:"string"},"*":{type:"*"}},source_raster:{type:{required:!0,type:"enum",values:{raster:{}}},url:{type:"string"},tiles:{type:"array",value:"string"},bounds:{type:"array",value:"number",length:4,default:[-180,-85.051129,180,85.051129]},minzoom:{type:"number",default:0},maxzoom:{type:"number",default:22},tileSize:{type:"number",default:512,units:"pixels"},scheme:{type:"enum",values:{xyz:{},tms:{}},default:"xyz"},attribution:{type:"string"},"*":{type:"*"}},source_raster_dem:{type:{required:!0,type:"enum",values:{"raster-dem":{}}},url:{type:"string"},tiles:{type:"array",value:"string"},bounds:{type:"array",value:"number",length:4,default:[-180,-85.051129,180,85.051129]},minzoom:{type:"number",default:0},maxzoom:{type:"number",default:22},tileSize:{type:"number",default:512,units:"pixels"},attribution:{type:"string"},encoding:{type:"enum",values:{terrarium:{},mapbox:{}},default:"mapbox"},"*":{type:"*"}},source_geojson:{type:{required:!0,type:"enum",values:{geojson:{}}},data:{type:"*"},maxzoom:{type:"number",default:18},attribution:{type:"string"},buffer:{type:"number",default:128,maximum:512,minimum:0},tolerance:{type:"number",default:.375},cluster:{type:"boolean",default:!1},clusterRadius:{type:"number",default:50,minimum:0},clusterMaxZoom:{type:"number"},lineMetrics:{type:"boolean",default:!1},generateId:{type:"boolean",default:!1}},source_video:{type:{required:!0,type:"enum",values:{video:{}}},urls:{required:!0,type:"array",value:"string"},coordinates:{required:!0,type:"array",length:4,value:{type:"array",length:2,value:"number"}}},source_image:{type:{required:!0,type:"enum",values:{image:{}}},url:{required:!0,type:"string"},coordinates:{required:!0,type:"array",length:4,value:{type:"array",length:2,value:"number"}}},layer:{id:{type:"string",required:!0},type:{type:"enum",values:{fill:{},line:{},symbol:{},circle:{},heatmap:{},"fill-extrusion":{},raster:{},hillshade:{},background:{}},required:!0},metadata:{type:"*"},source:{type:"string"},"source-layer":{type:"string"},minzoom:{type:"number",minimum:0,maximum:24},maxzoom:{type:"number",minimum:0,maximum:24},filter:{type:"filter"},layout:{type:"layout"},paint:{type:"paint"}},layout:["layout_fill","layout_line","layout_circle","layout_heatmap","layout_fill-extrusion","layout_symbol","layout_raster","layout_hillshade","layout_background"],layout_background:{visibility:{type:"enum",values:{visible:{},none:{}},default:"visible","property-type":"constant"}},layout_fill:{visibility:{type:"enum",values:{visible:{},none:{}},default:"visible","property-type":"constant"}},layout_circle:{visibility:{type:"enum",values:{visible:{},none:{}},default:"visible","property-type":"constant"}},layout_heatmap:{visibility:{type:"enum",values:{visible:{},none:{}},default:"visible","property-type":"constant"}},layout_line:{"line-cap":{type:"enum",values:{butt:{},round:{},square:{}},default:"butt",expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"},"line-join":{type:"enum",values:{bevel:{},round:{},miter:{}},default:"miter",expression:{interpolated:!1,parameters:["zoom","feature"]},"property-type":"data-driven"},"line-miter-limit":{type:"number",default:2,requires:[{"line-join":"miter"}],expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"},"line-round-limit":{type:"number",default:1.05,requires:[{"line-join":"round"}],expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"},visibility:{type:"enum",values:{visible:{},none:{}},default:"visible","property-type":"constant"}},layout_symbol:{"symbol-placement":{type:"enum",values:{point:{},line:{},"line-center":{}},default:"point",expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"},"symbol-spacing":{type:"number",default:250,minimum:1,units:"pixels",requires:[{"symbol-placement":"line"}],expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"},"symbol-avoid-edges":{type:"boolean",default:!1,expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"},"symbol-z-order":{type:"enum",values:{"viewport-y":{},source:{}},default:"viewport-y",expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"},"icon-allow-overlap":{type:"boolean",default:!1,requires:["icon-image"],expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"},"icon-ignore-placement":{type:"boolean",default:!1,requires:["icon-image"],expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"},"icon-optional":{type:"boolean",default:!1,requires:["icon-image","text-field"],expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"},"icon-rotation-alignment":{type:"enum",values:{map:{},viewport:{},auto:{}},default:"auto",requires:["icon-image"],expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"},"icon-size":{type:"number",default:1,minimum:0,units:"factor of the original icon size",requires:["icon-image"],expression:{interpolated:!0,parameters:["zoom","feature"]},"property-type":"data-driven"},"icon-text-fit":{type:"enum",values:{none:{},width:{},height:{},both:{}},default:"none",requires:["icon-image","text-field"],expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"},"icon-text-fit-padding":{type:"array",value:"number",length:4,default:[0,0,0,0],units:"pixels",requires:["icon-image","text-field",{"icon-text-fit":["both","width","height"]}],expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"},"icon-image":{type:"string",tokens:!0,expression:{interpolated:!1,parameters:["zoom","feature"]},"property-type":"data-driven"},"icon-rotate":{type:"number",default:0,period:360,units:"degrees",requires:["icon-image"],expression:{interpolated:!0,parameters:["zoom","feature"]},"property-type":"data-driven"},"icon-padding":{type:"number",default:2,minimum:0,units:"pixels",requires:["icon-image"],expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"},"icon-keep-upright":{type:"boolean",default:!1,requires:["icon-image",{"icon-rotation-alignment":"map"},{"symbol-placement":["line","line-center"]}],expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"},"icon-offset":{type:"array",value:"number",length:2,default:[0,0],requires:["icon-image"],expression:{interpolated:!0,parameters:["zoom","feature"]},"property-type":"data-driven"},"icon-anchor":{type:"enum",values:{center:{},left:{},right:{},top:{},bottom:{},"top-left":{},"top-right":{},"bottom-left":{},"bottom-right":{}},default:"center",requires:["icon-image"],expression:{interpolated:!1,parameters:["zoom","feature"]},"property-type":"data-driven"},"icon-pitch-alignment":{type:"enum",values:{map:{},viewport:{},auto:{}},default:"auto",requires:["icon-image"],expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"},"text-pitch-alignment":{type:"enum",values:{map:{},viewport:{},auto:{}},default:"auto",requires:["text-field"],expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"},"text-rotation-alignment":{type:"enum",values:{map:{},viewport:{},auto:{}},default:"auto",requires:["text-field"],expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"},"text-field":{type:"formatted",default:"",tokens:!0,expression:{interpolated:!1,parameters:["zoom","feature"]},"property-type":"data-driven"},"text-font":{type:"array",value:"string",default:["Open Sans Regular","Arial Unicode MS Regular"],requires:["text-field"],expression:{interpolated:!1,parameters:["zoom","feature"]},"property-type":"data-driven"},"text-size":{type:"number",default:16,minimum:0,units:"pixels",requires:["text-field"],expression:{interpolated:!0,parameters:["zoom","feature"]},"property-type":"data-driven"},"text-max-width":{type:"number",default:10,minimum:0,units:"ems",requires:["text-field"],expression:{interpolated:!0,parameters:["zoom","feature"]},"property-type":"data-driven"},"text-line-height":{type:"number",default:1.2,units:"ems",requires:["text-field"],expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"},"text-letter-spacing":{type:"number",default:0,units:"ems",requires:["text-field"],expression:{interpolated:!0,parameters:["zoom","feature"]},"property-type":"data-driven"},"text-justify":{type:"enum",values:{left:{},center:{},right:{}},default:"center",requires:["text-field"],expression:{interpolated:!1,parameters:["zoom","feature"]},"property-type":"data-driven"},"text-anchor":{type:"enum",values:{center:{},left:{},right:{},top:{},bottom:{},"top-left":{},"top-right":{},"bottom-left":{},"bottom-right":{}},default:"center",requires:["text-field"],expression:{interpolated:!1,parameters:["zoom","feature"]},"property-type":"data-driven"},"text-max-angle":{type:"number",default:45,units:"degrees",requires:["text-field",{"symbol-placement":["line","line-center"]}],expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"},"text-rotate":{type:"number",default:0,period:360,units:"degrees",requires:["text-field"],expression:{interpolated:!0,parameters:["zoom","feature"]},"property-type":"data-driven"},"text-padding":{type:"number",default:2,minimum:0,units:"pixels",requires:["text-field"],expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"},"text-keep-upright":{type:"boolean",default:!0,requires:["text-field",{"text-rotation-alignment":"map"},{"symbol-placement":["line","line-center"]}],expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"},"text-transform":{type:"enum",values:{none:{},uppercase:{},lowercase:{}},default:"none",requires:["text-field"],expression:{interpolated:!1,parameters:["zoom","feature"]},"property-type":"data-driven"},"text-offset":{type:"array",value:"number",units:"ems",length:2,default:[0,0],requires:["text-field"],expression:{interpolated:!0,parameters:["zoom","feature"]},"property-type":"data-driven"},"text-allow-overlap":{type:"boolean",default:!1,requires:["text-field"],expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"},"text-ignore-placement":{type:"boolean",default:!1,requires:["text-field"],expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"},"text-optional":{type:"boolean",default:!1,requires:["text-field","icon-image"],expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"},visibility:{type:"enum",values:{visible:{},none:{}},default:"visible","property-type":"constant"}},layout_raster:{visibility:{type:"enum",values:{visible:{},none:{}},default:"visible","property-type":"constant"}},layout_hillshade:{visibility:{type:"enum",values:{visible:{},none:{}},default:"visible","property-type":"constant"}},filter:{type:"array",value:"*"},filter_operator:{type:"enum",values:{"==":{},"!=":{},">":{},">=":{},"<":{},"<=":{},in:{},"!in":{},all:{},any:{},none:{},has:{},"!has":{}}},geometry_type:{type:"enum",values:{Point:{},LineString:{},Polygon:{}}},function_stop:{type:"array",minimum:0,maximum:22,value:["number","color"],length:2},expression:{type:"array",value:"*",minimum:1},expression_name:{type:"enum",values:{let:{group:"Variable binding"},var:{group:"Variable binding"},literal:{group:"Types"},array:{group:"Types"},at:{group:"Lookup"},case:{group:"Decision"},match:{group:"Decision"},coalesce:{group:"Decision"},step:{group:"Ramps, scales, curves"},interpolate:{group:"Ramps, scales, curves"},"interpolate-hcl":{group:"Ramps, scales, curves"},"interpolate-lab":{group:"Ramps, scales, curves"},ln2:{group:"Math"},pi:{group:"Math"},e:{group:"Math"},typeof:{group:"Types"},string:{group:"Types"},number:{group:"Types"},boolean:{group:"Types"},object:{group:"Types"},collator:{group:"Types"},format:{group:"Types"},"to-string":{group:"Types"},"to-number":{group:"Types"},"to-boolean":{group:"Types"},"to-rgba":{group:"Color"},"to-color":{group:"Types"},rgb:{group:"Color"},rgba:{group:"Color"},get:{group:"Lookup"},has:{group:"Lookup"},length:{group:"Lookup"},properties:{group:"Feature data"},"feature-state":{group:"Feature data"},"geometry-type":{group:"Feature data"},id:{group:"Feature data"},zoom:{group:"Zoom"},"heatmap-density":{group:"Heatmap"},"line-progress":{group:"Feature data"},"+":{group:"Math"},"*":{group:"Math"},"-":{group:"Math"},"/":{group:"Math"},"%":{group:"Math"},"^":{group:"Math"},sqrt:{group:"Math"},log10:{group:"Math"},ln:{group:"Math"},log2:{group:"Math"},sin:{group:"Math"},cos:{group:"Math"},tan:{group:"Math"},asin:{group:"Math"},acos:{group:"Math"},atan:{group:"Math"},min:{group:"Math"},max:{group:"Math"},round:{group:"Math"},abs:{group:"Math"},ceil:{group:"Math"},floor:{group:"Math"},"==":{group:"Decision"},"!=":{group:"Decision"},">":{group:"Decision"},"<":{group:"Decision"},">=":{group:"Decision"},"<=":{group:"Decision"},all:{group:"Decision"},any:{group:"Decision"},"!":{group:"Decision"},"is-supported-script":{group:"String"},upcase:{group:"String"},downcase:{group:"String"},concat:{group:"String"},"resolved-locale":{group:"String"}}},light:{anchor:{type:"enum",default:"viewport",values:{map:{},viewport:{}},"property-type":"data-constant",transition:!1,expression:{interpolated:!1,parameters:["zoom"]}},position:{type:"array",default:[1.15,210,30],length:3,value:"number","property-type":"data-constant",transition:!0,expression:{interpolated:!0,parameters:["zoom"]}},color:{type:"color","property-type":"data-constant",default:"#ffffff",expression:{interpolated:!0,parameters:["zoom"]},transition:!0},intensity:{type:"number","property-type":"data-constant",default:.5,minimum:0,maximum:1,expression:{interpolated:!0,parameters:["zoom"]},transition:!0}},paint:["paint_fill","paint_line","paint_circle","paint_heatmap","paint_fill-extrusion","paint_symbol","paint_raster","paint_hillshade","paint_background"],paint_fill:{"fill-antialias":{type:"boolean",default:!0,expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"},"fill-opacity":{type:"number",default:1,minimum:0,maximum:1,transition:!0,expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"},"fill-color":{type:"color",default:"#000000",transition:!0,requires:[{"!":"fill-pattern"}],expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"},"fill-outline-color":{type:"color",transition:!0,requires:[{"!":"fill-pattern"},{"fill-antialias":!0}],expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"},"fill-translate":{type:"array",value:"number",length:2,default:[0,0],transition:!0,units:"pixels",expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"},"fill-translate-anchor":{type:"enum",values:{map:{},viewport:{}},default:"map",requires:["fill-translate"],expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"},"fill-pattern":{type:"string",transition:!0,expression:{interpolated:!1,parameters:["zoom","feature"]},"property-type":"cross-faded-data-driven"}},paint_line:{"line-opacity":{type:"number",default:1,minimum:0,maximum:1,transition:!0,expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"},"line-color":{type:"color",default:"#000000",transition:!0,requires:[{"!":"line-pattern"}],expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"},"line-translate":{type:"array",value:"number",length:2,default:[0,0],transition:!0,units:"pixels",expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"},"line-translate-anchor":{type:"enum",values:{map:{},viewport:{}},default:"map",requires:["line-translate"],expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"},"line-width":{type:"number",default:1,minimum:0,transition:!0,units:"pixels",expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"},"line-gap-width":{type:"number",default:0,minimum:0,transition:!0,units:"pixels",expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"},"line-offset":{type:"number",default:0,transition:!0,units:"pixels",expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"},"line-blur":{type:"number",default:0,minimum:0,transition:!0,units:"pixels",expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"},"line-dasharray":{type:"array",value:"number",minimum:0,transition:!0,units:"line widths",requires:[{"!":"line-pattern"}],expression:{interpolated:!1,parameters:["zoom"]},"property-type":"cross-faded"},"line-pattern":{type:"string",transition:!0,expression:{interpolated:!1,parameters:["zoom","feature"]},"property-type":"cross-faded-data-driven"},"line-gradient":{type:"color",transition:!1,requires:[{"!":"line-dasharray"},{"!":"line-pattern"},{source:"geojson",has:{lineMetrics:!0}}],expression:{interpolated:!0,parameters:["line-progress"]},"property-type":"color-ramp"}},paint_circle:{"circle-radius":{type:"number",default:5,minimum:0,transition:!0,units:"pixels",expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"},"circle-color":{type:"color",default:"#000000",transition:!0,expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"},"circle-blur":{type:"number",default:0,transition:!0,expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"},"circle-opacity":{type:"number",default:1,minimum:0,maximum:1,transition:!0,expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"},"circle-translate":{type:"array",value:"number",length:2,default:[0,0],transition:!0,units:"pixels",expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"},"circle-translate-anchor":{type:"enum",values:{map:{},viewport:{}},default:"map",requires:["circle-translate"],expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"},"circle-pitch-scale":{type:"enum",values:{map:{},viewport:{}},default:"map",expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"},"circle-pitch-alignment":{type:"enum",values:{map:{},viewport:{}},default:"viewport",expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"},"circle-stroke-width":{type:"number",default:0,minimum:0,transition:!0,units:"pixels",expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"},"circle-stroke-color":{type:"color",default:"#000000",transition:!0,expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"},"circle-stroke-opacity":{type:"number",default:1,minimum:0,maximum:1,transition:!0,expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"}},paint_heatmap:{"heatmap-radius":{type:"number",default:30,minimum:1,transition:!0,units:"pixels",expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"},"heatmap-weight":{type:"number",default:1,minimum:0,transition:!1,expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"},"heatmap-intensity":{type:"number",default:1,minimum:0,transition:!0,expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"},"heatmap-color":{type:"color",default:["interpolate",["linear"],["heatmap-density"],0,"rgba(0, 0, 255, 0)",.1,"royalblue",.3,"cyan",.5,"lime",.7,"yellow",1,"red"],transition:!1,expression:{interpolated:!0,parameters:["heatmap-density"]},"property-type":"color-ramp"},"heatmap-opacity":{type:"number",default:1,minimum:0,maximum:1,transition:!0,expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"}},paint_symbol:{"icon-opacity":{type:"number",default:1,minimum:0,maximum:1,transition:!0,requires:["icon-image"],expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"},"icon-color":{type:"color",default:"#000000",transition:!0,requires:["icon-image"],expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"},"icon-halo-color":{type:"color",default:"rgba(0, 0, 0, 0)",transition:!0,requires:["icon-image"],expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"},"icon-halo-width":{type:"number",default:0,minimum:0,transition:!0,units:"pixels",requires:["icon-image"],expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"},"icon-halo-blur":{type:"number",default:0,minimum:0,transition:!0,units:"pixels",requires:["icon-image"],expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"},"icon-translate":{type:"array",value:"number",length:2,default:[0,0],transition:!0,units:"pixels",requires:["icon-image"],expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"},"icon-translate-anchor":{type:"enum",values:{map:{},viewport:{}},default:"map",requires:["icon-image","icon-translate"],expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"},"text-opacity":{type:"number",default:1,minimum:0,maximum:1,transition:!0,requires:["text-field"],expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"},"text-color":{type:"color",default:"#000000",transition:!0,requires:["text-field"],expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"},"text-halo-color":{type:"color",default:"rgba(0, 0, 0, 0)",transition:!0,requires:["text-field"],expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"},"text-halo-width":{type:"number",default:0,minimum:0,transition:!0,units:"pixels",requires:["text-field"],expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"},"text-halo-blur":{type:"number",default:0,minimum:0,transition:!0,units:"pixels",requires:["text-field"],expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"},"text-translate":{type:"array",value:"number",length:2,default:[0,0],transition:!0,units:"pixels",requires:["text-field"],expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"},"text-translate-anchor":{type:"enum",values:{map:{},viewport:{}},default:"map",requires:["text-field","text-translate"],expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"}},paint_raster:{"raster-opacity":{type:"number",default:1,minimum:0,maximum:1,transition:!0,expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"},"raster-hue-rotate":{type:"number",default:0,period:360,transition:!0,units:"degrees",expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"},"raster-brightness-min":{type:"number",default:0,minimum:0,maximum:1,transition:!0,expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"},"raster-brightness-max":{type:"number",default:1,minimum:0,maximum:1,transition:!0,expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"},"raster-saturation":{type:"number",default:0,minimum:-1,maximum:1,transition:!0,expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"},"raster-contrast":{type:"number",default:0,minimum:-1,maximum:1,transition:!0,expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"},"raster-resampling":{type:"enum",values:{linear:{},nearest:{}},default:"linear",expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"},"raster-fade-duration":{type:"number",default:300,minimum:0,transition:!1,units:"milliseconds",expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"}},paint_hillshade:{"hillshade-illumination-direction":{type:"number",default:335,minimum:0,maximum:359,transition:!1,expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"},"hillshade-illumination-anchor":{type:"enum",values:{map:{},viewport:{}},default:"viewport",expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"},"hillshade-exaggeration":{type:"number",default:.5,minimum:0,maximum:1,transition:!0,expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"},"hillshade-shadow-color":{type:"color",default:"#000000",transition:!0,expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"},"hillshade-highlight-color":{type:"color",default:"#FFFFFF",transition:!0,expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"},"hillshade-accent-color":{type:"color",default:"#000000",transition:!0,expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"}},paint_background:{"background-color":{type:"color",default:"#000000",transition:!0,requires:[{"!":"background-pattern"}],expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"},"background-pattern":{type:"string",transition:!0,expression:{interpolated:!1,parameters:["zoom"]},"property-type":"cross-faded"},"background-opacity":{type:"number",default:1,minimum:0,maximum:1,transition:!0,expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"}},transition:{duration:{type:"number",default:300,minimum:0,units:"milliseconds"},delay:{type:"number",default:0,minimum:0,units:"milliseconds"}},"layout_fill-extrusion":{visibility:{type:"enum",values:{visible:{},none:{}},default:"visible","property-type":"constant"}},function:{expression:{type:"expression"},stops:{type:"array",value:"function_stop"},base:{type:"number",default:1,minimum:0},property:{type:"string",default:"$zoom"},type:{type:"enum",values:{identity:{},exponential:{},interval:{},categorical:{}},default:"exponential"},colorSpace:{type:"enum",values:{rgb:{},lab:{},hcl:{}},default:"rgb"},default:{type:"*",required:!1}},"paint_fill-extrusion":{"fill-extrusion-opacity":{type:"number",default:1,minimum:0,maximum:1,transition:!0,expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"},"fill-extrusion-color":{type:"color",default:"#000000",transition:!0,requires:[{"!":"fill-extrusion-pattern"}],expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"},"fill-extrusion-translate":{type:"array",value:"number",length:2,default:[0,0],transition:!0,units:"pixels",expression:{interpolated:!0,parameters:["zoom"]},"property-type":"data-constant"},"fill-extrusion-translate-anchor":{type:"enum",values:{map:{},viewport:{}},default:"map",requires:["fill-extrusion-translate"],expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"},"fill-extrusion-pattern":{type:"string",transition:!0,expression:{interpolated:!1,parameters:["zoom","feature"]},"property-type":"cross-faded-data-driven"},"fill-extrusion-height":{type:"number",default:0,minimum:0,units:"meters",transition:!0,expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"},"fill-extrusion-base":{type:"number",default:0,minimum:0,units:"meters",transition:!0,requires:["fill-extrusion-height"],expression:{interpolated:!0,parameters:["zoom","feature","feature-state"]},"property-type":"data-driven"},"fill-extrusion-vertical-gradient":{type:"boolean",default:!0,transition:!1,expression:{interpolated:!1,parameters:["zoom"]},"property-type":"data-constant"}},"property-type":{"data-driven":{type:"property-type"},"cross-faded":{type:"property-type"},"cross-faded-data-driven":{type:"property-type"},"color-ramp":{type:"property-type"},"data-constant":{type:"property-type"},constant:{type:"property-type"}}},yt=function(t,e,r,n){this.message=(t?t+": ":"")+r,n&&(this.identifier=n),null!=e&&e.__line__&&(this.line=e.__line__);};function dt(t){var e=t.key,r=t.value;return r?[new yt(e,r,"constants have been deprecated as of v8")]:[]}function mt(t){for(var e=[],r=arguments.length-1;r-- >0;)e[r]=arguments[r+1];for(var n=0,i=e;n<i.length;n+=1){var a=i[n];for(var o in a)t[o]=a[o];}return t}function vt(t){return t instanceof Number||t instanceof String||t instanceof Boolean?t.valueOf():t}function gt(t){return Array.isArray(t)?t.map(gt):vt(t)}var xt=function(t){function e(e,r){t.call(this,r),this.message=r,this.key=e;}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e}(Error),bt=function(t,e){void 0===e&&(e=[]),this.parent=t,this.bindings={};for(var r=0,n=e;r<n.length;r+=1){var i=n[r],a=i[0],o=i[1];this.bindings[a]=o;}};bt.prototype.concat=function(t){return new bt(this,t)},bt.prototype.get=function(t){if(this.bindings[t])return this.bindings[t];if(this.parent)return this.parent.get(t);throw new Error(t+" not found in scope.")},bt.prototype.has=function(t){return !!this.bindings[t]||!!this.parent&&this.parent.has(t)};var _t={kind:"null"},wt={kind:"number"},At={kind:"string"},kt={kind:"boolean"},St={kind:"color"},zt={kind:"object"},It={kind:"value"},Bt={kind:"collator"},Et={kind:"formatted"};function Pt(t,e){return {kind:"array",itemType:t,N:e}}function Vt(t){if("array"===t.kind){var e=Vt(t.itemType);return "number"==typeof t.N?"array<"+e+", "+t.N+">":"value"===t.itemType.kind?"array":"array<"+e+">"}return t.kind}var Mt=[_t,wt,At,kt,St,Et,zt,Pt(It)];function Ct(t,e){if("error"===e.kind)return null;if("array"===t.kind){if("array"===e.kind&&(0===e.N&&"value"===e.itemType.kind||!Ct(t.itemType,e.itemType))&&("number"!=typeof t.N||t.N===e.N))return null}else{if(t.kind===e.kind)return null;if("value"===t.kind)for(var r=0,n=Mt;r<n.length;r+=1){if(!Ct(n[r],e))return null}}return "Expected "+Vt(t)+" but found "+Vt(e)+" instead."}var Tt=e(function(t,e){var r={transparent:[0,0,0,0],aliceblue:[240,248,255,1],antiquewhite:[250,235,215,1],aqua:[0,255,255,1],aquamarine:[127,255,212,1],azure:[240,255,255,1],beige:[245,245,220,1],bisque:[255,228,196,1],black:[0,0,0,1],blanchedalmond:[255,235,205,1],blue:[0,0,255,1],blueviolet:[138,43,226,1],brown:[165,42,42,1],burlywood:[222,184,135,1],cadetblue:[95,158,160,1],chartreuse:[127,255,0,1],chocolate:[210,105,30,1],coral:[255,127,80,1],cornflowerblue:[100,149,237,1],cornsilk:[255,248,220,1],crimson:[220,20,60,1],cyan:[0,255,255,1],darkblue:[0,0,139,1],darkcyan:[0,139,139,1],darkgoldenrod:[184,134,11,1],darkgray:[169,169,169,1],darkgreen:[0,100,0,1],darkgrey:[169,169,169,1],darkkhaki:[189,183,107,1],darkmagenta:[139,0,139,1],darkolivegreen:[85,107,47,1],darkorange:[255,140,0,1],darkorchid:[153,50,204,1],darkred:[139,0,0,1],darksalmon:[233,150,122,1],darkseagreen:[143,188,143,1],darkslateblue:[72,61,139,1],darkslategray:[47,79,79,1],darkslategrey:[47,79,79,1],darkturquoise:[0,206,209,1],darkviolet:[148,0,211,1],deeppink:[255,20,147,1],deepskyblue:[0,191,255,1],dimgray:[105,105,105,1],dimgrey:[105,105,105,1],dodgerblue:[30,144,255,1],firebrick:[178,34,34,1],floralwhite:[255,250,240,1],forestgreen:[34,139,34,1],fuchsia:[255,0,255,1],gainsboro:[220,220,220,1],ghostwhite:[248,248,255,1],gold:[255,215,0,1],goldenrod:[218,165,32,1],gray:[128,128,128,1],green:[0,128,0,1],greenyellow:[173,255,47,1],grey:[128,128,128,1],honeydew:[240,255,240,1],hotpink:[255,105,180,1],indianred:[205,92,92,1],indigo:[75,0,130,1],ivory:[255,255,240,1],khaki:[240,230,140,1],lavender:[230,230,250,1],lavenderblush:[255,240,245,1],lawngreen:[124,252,0,1],lemonchiffon:[255,250,205,1],lightblue:[173,216,230,1],lightcoral:[240,128,128,1],lightcyan:[224,255,255,1],lightgoldenrodyellow:[250,250,210,1],lightgray:[211,211,211,1],lightgreen:[144,238,144,1],lightgrey:[211,211,211,1],lightpink:[255,182,193,1],lightsalmon:[255,160,122,1],lightseagreen:[32,178,170,1],lightskyblue:[135,206,250,1],lightslategray:[119,136,153,1],lightslategrey:[119,136,153,1],lightsteelblue:[176,196,222,1],lightyellow:[255,255,224,1],lime:[0,255,0,1],limegreen:[50,205,50,1],linen:[250,240,230,1],magenta:[255,0,255,1],maroon:[128,0,0,1],mediumaquamarine:[102,205,170,1],mediumblue:[0,0,205,1],mediumorchid:[186,85,211,1],mediumpurple:[147,112,219,1],mediumseagreen:[60,179,113,1],mediumslateblue:[123,104,238,1],mediumspringgreen:[0,250,154,1],mediumturquoise:[72,209,204,1],mediumvioletred:[199,21,133,1],midnightblue:[25,25,112,1],mintcream:[245,255,250,1],mistyrose:[255,228,225,1],moccasin:[255,228,181,1],navajowhite:[255,222,173,1],navy:[0,0,128,1],oldlace:[253,245,230,1],olive:[128,128,0,1],olivedrab:[107,142,35,1],orange:[255,165,0,1],orangered:[255,69,0,1],orchid:[218,112,214,1],palegoldenrod:[238,232,170,1],palegreen:[152,251,152,1],paleturquoise:[175,238,238,1],palevioletred:[219,112,147,1],papayawhip:[255,239,213,1],peachpuff:[255,218,185,1],peru:[205,133,63,1],pink:[255,192,203,1],plum:[221,160,221,1],powderblue:[176,224,230,1],purple:[128,0,128,1],rebeccapurple:[102,51,153,1],red:[255,0,0,1],rosybrown:[188,143,143,1],royalblue:[65,105,225,1],saddlebrown:[139,69,19,1],salmon:[250,128,114,1],sandybrown:[244,164,96,1],seagreen:[46,139,87,1],seashell:[255,245,238,1],sienna:[160,82,45,1],silver:[192,192,192,1],skyblue:[135,206,235,1],slateblue:[106,90,205,1],slategray:[112,128,144,1],slategrey:[112,128,144,1],snow:[255,250,250,1],springgreen:[0,255,127,1],steelblue:[70,130,180,1],tan:[210,180,140,1],teal:[0,128,128,1],thistle:[216,191,216,1],tomato:[255,99,71,1],turquoise:[64,224,208,1],violet:[238,130,238,1],wheat:[245,222,179,1],white:[255,255,255,1],whitesmoke:[245,245,245,1],yellow:[255,255,0,1],yellowgreen:[154,205,50,1]};function n(t){return (t=Math.round(t))<0?0:t>255?255:t}function i(t){return t<0?0:t>1?1:t}function a(t){return "%"===t[t.length-1]?n(parseFloat(t)/100*255):n(parseInt(t))}function o(t){return "%"===t[t.length-1]?i(parseFloat(t)/100):i(parseFloat(t))}function s(t,e,r){return r<0?r+=1:r>1&&(r-=1),6*r<1?t+(e-t)*r*6:2*r<1?e:3*r<2?t+(e-t)*(2/3-r)*6:t}try{e.parseCSSColor=function(t){var e,i=t.replace(/ /g,"").toLowerCase();if(i in r)return r[i].slice();if("#"===i[0])return 4===i.length?(e=parseInt(i.substr(1),16))>=0&&e<=4095?[(3840&e)>>4|(3840&e)>>8,240&e|(240&e)>>4,15&e|(15&e)<<4,1]:null:7===i.length&&(e=parseInt(i.substr(1),16))>=0&&e<=16777215?[(16711680&e)>>16,(65280&e)>>8,255&e,1]:null;var u=i.indexOf("("),p=i.indexOf(")");if(-1!==u&&p+1===i.length){var l=i.substr(0,u),c=i.substr(u+1,p-(u+1)).split(","),h=1;switch(l){case"rgba":if(4!==c.length)return null;h=o(c.pop());case"rgb":return 3!==c.length?null:[a(c[0]),a(c[1]),a(c[2]),h];case"hsla":if(4!==c.length)return null;h=o(c.pop());case"hsl":if(3!==c.length)return null;var f=(parseFloat(c[0])%360+360)%360/360,y=o(c[1]),d=o(c[2]),m=d<=.5?d*(y+1):d+y-d*y,v=2*d-m;return [n(255*s(v,m,f+1/3)),n(255*s(v,m,f)),n(255*s(v,m,f-1/3)),h];default:return null}}return null};}catch(t){}}).parseCSSColor,Ft=function(t,e,r,n){void 0===n&&(n=1),this.r=t,this.g=e,this.b=r,this.a=n;};Ft.parse=function(t){if(t){if(t instanceof Ft)return t;if("string"==typeof t){var e=Tt(t);if(e)return new Ft(e[0]/255*e[3],e[1]/255*e[3],e[2]/255*e[3],e[3])}}},Ft.prototype.toString=function(){var t=this.toArray(),e=t[0],r=t[1],n=t[2],i=t[3];return "rgba("+Math.round(e)+","+Math.round(r)+","+Math.round(n)+","+i+")"},Ft.prototype.toArray=function(){var t=this.r,e=this.g,r=this.b,n=this.a;return 0===n?[0,0,0,0]:[255*t/n,255*e/n,255*r/n,n]},Ft.black=new Ft(0,0,0,1),Ft.white=new Ft(1,1,1,1),Ft.transparent=new Ft(0,0,0,0),Ft.red=new Ft(1,0,0,1);var Lt=function(t,e,r){this.sensitivity=t?e?"variant":"case":e?"accent":"base",this.locale=r,this.collator=new Intl.Collator(this.locale?this.locale:[],{sensitivity:this.sensitivity,usage:"search"});};Lt.prototype.compare=function(t,e){return this.collator.compare(t,e)},Lt.prototype.resolvedLocale=function(){return new Intl.Collator(this.locale?this.locale:[]).resolvedOptions().locale};var Ot=function(t,e,r){this.text=t,this.scale=e,this.fontStack=r;},Dt=function(t){this.sections=t;};function Ut(t,e,r,n){return "number"==typeof t&&t>=0&&t<=255&&"number"==typeof e&&e>=0&&e<=255&&"number"==typeof r&&r>=0&&r<=255?void 0===n||"number"==typeof n&&n>=0&&n<=1?null:"Invalid rgba value ["+[t,e,r,n].join(", ")+"]: 'a' must be between 0 and 1.":"Invalid rgba value ["+("number"==typeof n?[t,e,r,n]:[t,e,r]).join(", ")+"]: 'r', 'g', and 'b' must be between 0 and 255."}function jt(t){if(null===t)return _t;if("string"==typeof t)return At;if("boolean"==typeof t)return kt;if("number"==typeof t)return wt;if(t instanceof Ft)return St;if(t instanceof Lt)return Bt;if(t instanceof Dt)return Et;if(Array.isArray(t)){for(var e,r=t.length,n=0,i=t;n<i.length;n+=1){var a=jt(i[n]);if(e){if(e===a)continue;e=It;break}e=a;}return Pt(e||It,r)}return zt}function qt(t){var e=typeof t;return null===t?"":"string"===e||"number"===e||"boolean"===e?String(t):t instanceof Ft||t instanceof Dt?t.toString():JSON.stringify(t)}Dt.fromString=function(t){return new Dt([new Ot(t,null,null)])},Dt.prototype.toString=function(){return this.sections.map(function(t){return t.text}).join("")},Dt.prototype.serialize=function(){for(var t=["format"],e=0,r=this.sections;e<r.length;e+=1){var n=r[e];t.push(n.text);var i={};n.fontStack&&(i["text-font"]=["literal",n.fontStack.split(",")]),n.scale&&(i["font-scale"]=n.scale),t.push(i);}return t};var Rt=function(t,e){this.type=t,this.value=e;};Rt.parse=function(t,e){if(2!==t.length)return e.error("'literal' expression requires exactly one argument, but found "+(t.length-1)+" instead.");if(!function t(e){if(null===e)return !0;if("string"==typeof e)return !0;if("boolean"==typeof e)return !0;if("number"==typeof e)return !0;if(e instanceof Ft)return !0;if(e instanceof Lt)return !0;if(e instanceof Dt)return !0;if(Array.isArray(e)){for(var r=0,n=e;r<n.length;r+=1)if(!t(n[r]))return !1;return !0}if("object"==typeof e){for(var i in e)if(!t(e[i]))return !1;return !0}return !1}(t[1]))return e.error("invalid value");var r=t[1],n=jt(r),i=e.expectedType;return "array"!==n.kind||0!==n.N||!i||"array"!==i.kind||"number"==typeof i.N&&0!==i.N||(n=i),new Rt(n,r)},Rt.prototype.evaluate=function(){return this.value},Rt.prototype.eachChild=function(){},Rt.prototype.possibleOutputs=function(){return [this.value]},Rt.prototype.serialize=function(){return "array"===this.type.kind||"object"===this.type.kind?["literal",this.value]:this.value instanceof Ft?["rgba"].concat(this.value.toArray()):this.value instanceof Dt?this.value.serialize():this.value};var Nt=function(t){this.name="ExpressionEvaluationError",this.message=t;};Nt.prototype.toJSON=function(){return this.message};var Gt={string:At,number:wt,boolean:kt,object:zt},Zt=function(t,e){this.type=t,this.args=e;};Zt.parse=function(t,e){if(t.length<2)return e.error("Expected at least one argument.");var r,n=1,i=t[0];if("array"===i){var a,o;if(t.length>2){var s=t[1];if("string"!=typeof s||!(s in Gt)||"object"===s)return e.error('The item type argument of "array" must be one of string, number, boolean',1);a=Gt[s],n++;}else a=It;if(t.length>3){if(null!==t[2]&&("number"!=typeof t[2]||t[2]<0||t[2]!==Math.floor(t[2])))return e.error('The length argument to "array" must be a positive integer literal',2);o=t[2],n++;}r=Pt(a,o);}else r=Gt[i];for(var u=[];n<t.length;n++){var p=e.parse(t[n],n,It);if(!p)return null;u.push(p);}return new Zt(r,u)},Zt.prototype.evaluate=function(t){for(var e=0;e<this.args.length;e++){var r=this.args[e].evaluate(t);if(!Ct(this.type,jt(r)))return r;if(e===this.args.length-1)throw new Nt("Expected value to be of type "+Vt(this.type)+", but found "+Vt(jt(r))+" instead.")}return null},Zt.prototype.eachChild=function(t){this.args.forEach(t);},Zt.prototype.possibleOutputs=function(){return (t=[]).concat.apply(t,this.args.map(function(t){return t.possibleOutputs()}));var t;},Zt.prototype.serialize=function(){var t=this.type,e=[t.kind];if("array"===t.kind){var r=t.itemType;if("string"===r.kind||"number"===r.kind||"boolean"===r.kind){e.push(r.kind);var n=t.N;("number"==typeof n||this.args.length>1)&&e.push(n);}}return e.concat(this.args.map(function(t){return t.serialize()}))};var Xt=function(t){this.type=Et,this.sections=t;};Xt.parse=function(t,e){if(t.length<3)return e.error("Expected at least two arguments.");if((t.length-1)%2!=0)return e.error("Expected an even number of arguments.");for(var r=[],n=1;n<t.length-1;n+=2){var i=e.parse(t[n],1,It);if(!i)return null;var a=i.type.kind;if("string"!==a&&"value"!==a&&"null"!==a)return e.error("Formatted text type must be 'string', 'value', or 'null'.");var o=t[n+1];if("object"!=typeof o||Array.isArray(o))return e.error("Format options argument must be an object.");var s=null;if(o["font-scale"]&&!(s=e.parse(o["font-scale"],1,wt)))return null;var u=null;if(o["text-font"]&&!(u=e.parse(o["text-font"],1,Pt(At))))return null;r.push({text:i,scale:s,font:u});}return new Xt(r)},Xt.prototype.evaluate=function(t){return new Dt(this.sections.map(function(e){return new Ot(qt(e.text.evaluate(t)),e.scale?e.scale.evaluate(t):null,e.font?e.font.evaluate(t).join(","):null)}))},Xt.prototype.eachChild=function(t){for(var e=0,r=this.sections;e<r.length;e+=1){var n=r[e];t(n.text),n.scale&&t(n.scale),n.font&&t(n.font);}},Xt.prototype.possibleOutputs=function(){return [void 0]},Xt.prototype.serialize=function(){for(var t=["format"],e=0,r=this.sections;e<r.length;e+=1){var n=r[e];t.push(n.text.serialize());var i={};n.scale&&(i["font-scale"]=n.scale.serialize()),n.font&&(i["text-font"]=n.font.serialize()),t.push(i);}return t};var Kt={"to-boolean":kt,"to-color":St,"to-number":wt,"to-string":At},Ht=function(t,e){this.type=t,this.args=e;};Ht.parse=function(t,e){if(t.length<2)return e.error("Expected at least one argument.");var r=t[0];if(("to-boolean"===r||"to-string"===r)&&2!==t.length)return e.error("Expected one argument.");for(var n=Kt[r],i=[],a=1;a<t.length;a++){var o=e.parse(t[a],a,It);if(!o)return null;i.push(o);}return new Ht(n,i)},Ht.prototype.evaluate=function(t){if("boolean"===this.type.kind)return Boolean(this.args[0].evaluate(t));if("color"===this.type.kind){for(var e,r,n=0,i=this.args;n<i.length;n+=1){if(r=null,(e=i[n].evaluate(t))instanceof Ft)return e;if("string"==typeof e){var a=t.parseColor(e);if(a)return a}else if(Array.isArray(e)&&!(r=e.length<3||e.length>4?"Invalid rbga value "+JSON.stringify(e)+": expected an array containing either three or four numeric values.":Ut(e[0],e[1],e[2],e[3])))return new Ft(e[0]/255,e[1]/255,e[2]/255,e[3])}throw new Nt(r||"Could not parse color from value '"+("string"==typeof e?e:JSON.stringify(e))+"'")}if("number"===this.type.kind){for(var o=null,s=0,u=this.args;s<u.length;s+=1){if(null===(o=u[s].evaluate(t)))return 0;var p=Number(o);if(!isNaN(p))return p}throw new Nt("Could not convert "+JSON.stringify(o)+" to number.")}return "formatted"===this.type.kind?Dt.fromString(qt(this.args[0].evaluate(t))):qt(this.args[0].evaluate(t))},Ht.prototype.eachChild=function(t){this.args.forEach(t);},Ht.prototype.possibleOutputs=function(){return (t=[]).concat.apply(t,this.args.map(function(t){return t.possibleOutputs()}));var t;},Ht.prototype.serialize=function(){if("formatted"===this.type.kind)return new Xt([{text:this.args[0],scale:null,font:null}]).serialize();var t=["to-"+this.type.kind];return this.eachChild(function(e){t.push(e.serialize());}),t};var Jt=["Unknown","Point","LineString","Polygon"],Yt=function(){this.globals=null,this.feature=null,this.featureState=null,this._parseColorCache={};};Yt.prototype.id=function(){return this.feature&&"id"in this.feature?this.feature.id:null},Yt.prototype.geometryType=function(){return this.feature?"number"==typeof this.feature.type?Jt[this.feature.type]:this.feature.type:null},Yt.prototype.properties=function(){return this.feature&&this.feature.properties||{}},Yt.prototype.parseColor=function(t){var e=this._parseColorCache[t];return e||(e=this._parseColorCache[t]=Ft.parse(t)),e};var $t=function(t,e,r,n){this.name=t,this.type=e,this._evaluate=r,this.args=n;};$t.prototype.evaluate=function(t){return this._evaluate(t,this.args)},$t.prototype.eachChild=function(t){this.args.forEach(t);},$t.prototype.possibleOutputs=function(){return [void 0]},$t.prototype.serialize=function(){return [this.name].concat(this.args.map(function(t){return t.serialize()}))},$t.parse=function(t,e){var r=t[0],n=$t.definitions[r];if(!n)return e.error('Unknown expression "'+r+'". If you wanted a literal array, use ["literal", [...]].',0);for(var i,a=Array.isArray(n)?n[0]:n.type,o=Array.isArray(n)?[[n[1],n[2]]]:n.overloads,s=o.filter(function(e){var r=e[0];return !Array.isArray(r)||r.length===t.length-1}),u=null,p=0,l=s;p<l.length;p+=1){var c=l[p],h=c[0],f=c[1];u=new ne(e.registry,e.path,null,e.scope);for(var y=[],d=!1,m=1;m<t.length;m++){var v=t[m],g=Array.isArray(h)?h[m-1]:h.type,x=u.parse(v,1+y.length,g);if(!x){d=!0;break}y.push(x);}if(!d)if(Array.isArray(h)&&h.length!==y.length)u.error("Expected "+h.length+" arguments, but found "+y.length+" instead.");else{for(var b=0;b<y.length;b++){var _=Array.isArray(h)?h[b]:h.type,w=y[b];u.concat(b+1).checkSubtype(_,w.type);}if(0===u.errors.length)return new $t(r,a,f,y)}}if(1===s.length)(i=e.errors).push.apply(i,u.errors);else{for(var A=(s.length?s:o).map(function(t){var e,r=t[0];return e=r,Array.isArray(e)?"("+e.map(Vt).join(", ")+")":"("+Vt(e.type)+"...)"}).join(" | "),k=[],S=1;S<t.length;S++){var z=e.parse(t[S],1+k.length);if(!z)return null;k.push(Vt(z.type));}e.error("Expected arguments of type "+A+", but found ("+k.join(", ")+") instead.");}return null},$t.register=function(t,e){for(var r in $t.definitions=e,e)t[r]=$t;};var Wt=function(t,e,r){this.type=Bt,this.locale=r,this.caseSensitive=t,this.diacriticSensitive=e;};function Qt(t){if(t instanceof $t){if("get"===t.name&&1===t.args.length)return !1;if("feature-state"===t.name)return !1;if("has"===t.name&&1===t.args.length)return !1;if("properties"===t.name||"geometry-type"===t.name||"id"===t.name)return !1;if(/^filter-/.test(t.name))return !1}var e=!0;return t.eachChild(function(t){e&&!Qt(t)&&(e=!1);}),e}function te(t){if(t instanceof $t&&"feature-state"===t.name)return !1;var e=!0;return t.eachChild(function(t){e&&!te(t)&&(e=!1);}),e}function ee(t,e){if(t instanceof $t&&e.indexOf(t.name)>=0)return !1;var r=!0;return t.eachChild(function(t){r&&!ee(t,e)&&(r=!1);}),r}Wt.parse=function(t,e){if(2!==t.length)return e.error("Expected one argument.");var r=t[1];if("object"!=typeof r||Array.isArray(r))return e.error("Collator options argument must be an object.");var n=e.parse(void 0!==r["case-sensitive"]&&r["case-sensitive"],1,kt);if(!n)return null;var i=e.parse(void 0!==r["diacritic-sensitive"]&&r["diacritic-sensitive"],1,kt);if(!i)return null;var a=null;return r.locale&&!(a=e.parse(r.locale,1,At))?null:new Wt(n,i,a)},Wt.prototype.evaluate=function(t){return new Lt(this.caseSensitive.evaluate(t),this.diacriticSensitive.evaluate(t),this.locale?this.locale.evaluate(t):null)},Wt.prototype.eachChild=function(t){t(this.caseSensitive),t(this.diacriticSensitive),this.locale&&t(this.locale);},Wt.prototype.possibleOutputs=function(){return [void 0]},Wt.prototype.serialize=function(){var t={};return t["case-sensitive"]=this.caseSensitive.serialize(),t["diacritic-sensitive"]=this.diacriticSensitive.serialize(),this.locale&&(t.locale=this.locale.serialize()),["collator",t]};var re=function(t,e){this.type=e.type,this.name=t,this.boundExpression=e;};re.parse=function(t,e){if(2!==t.length||"string"!=typeof t[1])return e.error("'var' expression requires exactly one string literal argument.");var r=t[1];return e.scope.has(r)?new re(r,e.scope.get(r)):e.error('Unknown variable "'+r+'". Make sure "'+r+'" has been bound in an enclosing "let" expression before using it.',1)},re.prototype.evaluate=function(t){return this.boundExpression.evaluate(t)},re.prototype.eachChild=function(){},re.prototype.possibleOutputs=function(){return [void 0]},re.prototype.serialize=function(){return ["var",this.name]};var ne=function(t,e,r,n,i){void 0===e&&(e=[]),void 0===n&&(n=new bt),void 0===i&&(i=[]),this.registry=t,this.path=e,this.key=e.map(function(t){return "["+t+"]"}).join(""),this.scope=n,this.errors=i,this.expectedType=r;};function ie(t,e){for(var r,n,i=0,a=t.length-1,o=0;i<=a;){if(r=t[o=Math.floor((i+a)/2)],n=t[o+1],e===r||e>r&&e<n)return o;if(r<e)i=o+1;else{if(!(r>e))throw new Nt("Input is not a number.");a=o-1;}}return Math.max(o-1,0)}ne.prototype.parse=function(t,e,r,n,i){return void 0===i&&(i={}),e?this.concat(e,r,n)._parse(t,i):this._parse(t,i)},ne.prototype._parse=function(t,e){function r(t,e,r){return "assert"===r?new Zt(e,[t]):"coerce"===r?new Ht(e,[t]):t}if(null!==t&&"string"!=typeof t&&"boolean"!=typeof t&&"number"!=typeof t||(t=["literal",t]),Array.isArray(t)){if(0===t.length)return this.error('Expected an array with at least one element. If you wanted a literal array, use ["literal", []].');var n=t[0];if("string"!=typeof n)return this.error("Expression name must be a string, but found "+typeof n+' instead. If you wanted a literal array, use ["literal", [...]].',0),null;var i=this.registry[n];if(i){var a=i.parse(t,this);if(!a)return null;if(this.expectedType){var o=this.expectedType,s=a.type;if("string"!==o.kind&&"number"!==o.kind&&"boolean"!==o.kind&&"object"!==o.kind&&"array"!==o.kind||"value"!==s.kind)if("color"!==o.kind&&"formatted"!==o.kind||"value"!==s.kind&&"string"!==s.kind){if(this.checkSubtype(o,s))return null}else a=r(a,o,e.typeAnnotation||"coerce");else a=r(a,o,e.typeAnnotation||"assert");}if(!(a instanceof Rt)&&function t(e){if(e instanceof re)return t(e.boundExpression);if(e instanceof $t&&"error"===e.name)return !1;if(e instanceof Wt)return !1;var r=e instanceof Ht||e instanceof Zt;var n=!0;e.eachChild(function(e){n=r?n&&t(e):n&&e instanceof Rt;});if(!n)return !1;return Qt(e)&&ee(e,["zoom","heatmap-density","line-progress","is-supported-script"])}(a)){var u=new Yt;try{a=new Rt(a.type,a.evaluate(u));}catch(t){return this.error(t.message),null}}return a}return this.error('Unknown expression "'+n+'". If you wanted a literal array, use ["literal", [...]].',0)}return void 0===t?this.error("'undefined' value invalid. Use null instead."):"object"==typeof t?this.error('Bare objects invalid. Use ["literal", {...}] instead.'):this.error("Expected an array, but found "+typeof t+" instead.")},ne.prototype.concat=function(t,e,r){var n="number"==typeof t?this.path.concat(t):this.path,i=r?this.scope.concat(r):this.scope;return new ne(this.registry,n,e||null,i,this.errors)},ne.prototype.error=function(t){for(var e=[],r=arguments.length-1;r-- >0;)e[r]=arguments[r+1];var n=""+this.key+e.map(function(t){return "["+t+"]"}).join("");this.errors.push(new xt(n,t));},ne.prototype.checkSubtype=function(t,e){var r=Ct(t,e);return r&&this.error(r),r};var ae=function(t,e,r){this.type=t,this.input=e,this.labels=[],this.outputs=[];for(var n=0,i=r;n<i.length;n+=1){var a=i[n],o=a[0],s=a[1];this.labels.push(o),this.outputs.push(s);}};function oe(t,e,r){return t*(1-r)+e*r}ae.parse=function(t,e){var r=t[1],n=t.slice(2);if(t.length-1<4)return e.error("Expected at least 4 arguments, but found only "+(t.length-1)+".");if((t.length-1)%2!=0)return e.error("Expected an even number of arguments.");if(!(r=e.parse(r,1,wt)))return null;var i=[],a=null;e.expectedType&&"value"!==e.expectedType.kind&&(a=e.expectedType),n.unshift(-1/0);for(var o=0;o<n.length;o+=2){var s=n[o],u=n[o+1],p=o+1,l=o+2;if("number"!=typeof s)return e.error('Input/output pairs for "step" expressions must be defined using literal numeric values (not computed expressions) for the input values.',p);if(i.length&&i[i.length-1][0]>=s)return e.error('Input/output pairs for "step" expressions must be arranged with input values in strictly ascending order.',p);var c=e.parse(u,l,a);if(!c)return null;a=a||c.type,i.push([s,c]);}return new ae(a,r,i)},ae.prototype.evaluate=function(t){var e=this.labels,r=this.outputs;if(1===e.length)return r[0].evaluate(t);var n=this.input.evaluate(t);if(n<=e[0])return r[0].evaluate(t);var i=e.length;return n>=e[i-1]?r[i-1].evaluate(t):r[ie(e,n)].evaluate(t)},ae.prototype.eachChild=function(t){t(this.input);for(var e=0,r=this.outputs;e<r.length;e+=1){t(r[e]);}},ae.prototype.possibleOutputs=function(){return (t=[]).concat.apply(t,this.outputs.map(function(t){return t.possibleOutputs()}));var t;},ae.prototype.serialize=function(){for(var t=["step",this.input.serialize()],e=0;e<this.labels.length;e++)e>0&&t.push(this.labels[e]),t.push(this.outputs[e].serialize());return t};var se=Object.freeze({number:oe,color:function(t,e,r){return new Ft(oe(t.r,e.r,r),oe(t.g,e.g,r),oe(t.b,e.b,r),oe(t.a,e.a,r))},array:function(t,e,r){return t.map(function(t,n){return oe(t,e[n],r)})}}),ue=.95047,pe=1,le=1.08883,ce=4/29,he=6/29,fe=3*he*he,ye=he*he*he,de=Math.PI/180,me=180/Math.PI;function ve(t){return t>ye?Math.pow(t,1/3):t/fe+ce}function ge(t){return t>he?t*t*t:fe*(t-ce)}function xe(t){return 255*(t<=.0031308?12.92*t:1.055*Math.pow(t,1/2.4)-.055)}function be(t){return (t/=255)<=.04045?t/12.92:Math.pow((t+.055)/1.055,2.4)}function _e(t){var e=be(t.r),r=be(t.g),n=be(t.b),i=ve((.4124564*e+.3575761*r+.1804375*n)/ue),a=ve((.2126729*e+.7151522*r+.072175*n)/pe);return {l:116*a-16,a:500*(i-a),b:200*(a-ve((.0193339*e+.119192*r+.9503041*n)/le)),alpha:t.a}}function we(t){var e=(t.l+16)/116,r=isNaN(t.a)?e:e+t.a/500,n=isNaN(t.b)?e:e-t.b/200;return e=pe*ge(e),r=ue*ge(r),n=le*ge(n),new Ft(xe(3.2404542*r-1.5371385*e-.4985314*n),xe(-.969266*r+1.8760108*e+.041556*n),xe(.0556434*r-.2040259*e+1.0572252*n),t.alpha)}var Ae={forward:_e,reverse:we,interpolate:function(t,e,r){return {l:oe(t.l,e.l,r),a:oe(t.a,e.a,r),b:oe(t.b,e.b,r),alpha:oe(t.alpha,e.alpha,r)}}},ke={forward:function(t){var e=_e(t),r=e.l,n=e.a,i=e.b,a=Math.atan2(i,n)*me;return {h:a<0?a+360:a,c:Math.sqrt(n*n+i*i),l:r,alpha:t.a}},reverse:function(t){var e=t.h*de,r=t.c;return we({l:t.l,a:Math.cos(e)*r,b:Math.sin(e)*r,alpha:t.alpha})},interpolate:function(t,e,r){return {h:function(t,e,r){var n=e-t;return t+r*(n>180||n<-180?n-360*Math.round(n/360):n)}(t.h,e.h,r),c:oe(t.c,e.c,r),l:oe(t.l,e.l,r),alpha:oe(t.alpha,e.alpha,r)}}},Se=Object.freeze({lab:Ae,hcl:ke}),ze=function(t,e,r,n,i){this.type=t,this.operator=e,this.interpolation=r,this.input=n,this.labels=[],this.outputs=[];for(var a=0,o=i;a<o.length;a+=1){var s=o[a],u=s[0],p=s[1];this.labels.push(u),this.outputs.push(p);}};function Ie(t,e,r,n){var i=n-r,a=t-r;return 0===i?0:1===e?a/i:(Math.pow(e,a)-1)/(Math.pow(e,i)-1)}ze.interpolationFactor=function(t,e,n,i){var a=0;if("exponential"===t.name)a=Ie(e,t.base,n,i);else if("linear"===t.name)a=Ie(e,1,n,i);else if("cubic-bezier"===t.name){var o=t.controlPoints;a=new r(o[0],o[1],o[2],o[3]).solve(Ie(e,1,n,i));}return a},ze.parse=function(t,e){var r=t[0],n=t[1],i=t[2],a=t.slice(3);if(!Array.isArray(n)||0===n.length)return e.error("Expected an interpolation type expression.",1);if("linear"===n[0])n={name:"linear"};else if("exponential"===n[0]){var o=n[1];if("number"!=typeof o)return e.error("Exponential interpolation requires a numeric base.",1,1);n={name:"exponential",base:o};}else{if("cubic-bezier"!==n[0])return e.error("Unknown interpolation type "+String(n[0]),1,0);var s=n.slice(1);if(4!==s.length||s.some(function(t){return "number"!=typeof t||t<0||t>1}))return e.error("Cubic bezier interpolation requires four numeric arguments with values between 0 and 1.",1);n={name:"cubic-bezier",controlPoints:s};}if(t.length-1<4)return e.error("Expected at least 4 arguments, but found only "+(t.length-1)+".");if((t.length-1)%2!=0)return e.error("Expected an even number of arguments.");if(!(i=e.parse(i,2,wt)))return null;var u=[],p=null;"interpolate-hcl"===r||"interpolate-lab"===r?p=St:e.expectedType&&"value"!==e.expectedType.kind&&(p=e.expectedType);for(var l=0;l<a.length;l+=2){var c=a[l],h=a[l+1],f=l+3,y=l+4;if("number"!=typeof c)return e.error('Input/output pairs for "interpolate" expressions must be defined using literal numeric values (not computed expressions) for the input values.',f);if(u.length&&u[u.length-1][0]>=c)return e.error('Input/output pairs for "interpolate" expressions must be arranged with input values in strictly ascending order.',f);var d=e.parse(h,y,p);if(!d)return null;p=p||d.type,u.push([c,d]);}return "number"===p.kind||"color"===p.kind||"array"===p.kind&&"number"===p.itemType.kind&&"number"==typeof p.N?new ze(p,r,n,i,u):e.error("Type "+Vt(p)+" is not interpolatable.")},ze.prototype.evaluate=function(t){var e=this.labels,r=this.outputs;if(1===e.length)return r[0].evaluate(t);var n=this.input.evaluate(t);if(n<=e[0])return r[0].evaluate(t);var i=e.length;if(n>=e[i-1])return r[i-1].evaluate(t);var a=ie(e,n),o=e[a],s=e[a+1],u=ze.interpolationFactor(this.interpolation,n,o,s),p=r[a].evaluate(t),l=r[a+1].evaluate(t);return "interpolate"===this.operator?se[this.type.kind.toLowerCase()](p,l,u):"interpolate-hcl"===this.operator?ke.reverse(ke.interpolate(ke.forward(p),ke.forward(l),u)):Ae.reverse(Ae.interpolate(Ae.forward(p),Ae.forward(l),u))},ze.prototype.eachChild=function(t){t(this.input);for(var e=0,r=this.outputs;e<r.length;e+=1){t(r[e]);}},ze.prototype.possibleOutputs=function(){return (t=[]).concat.apply(t,this.outputs.map(function(t){return t.possibleOutputs()}));var t;},ze.prototype.serialize=function(){var t;t="linear"===this.interpolation.name?["linear"]:"exponential"===this.interpolation.name?1===this.interpolation.base?["linear"]:["exponential",this.interpolation.base]:["cubic-bezier"].concat(this.interpolation.controlPoints);for(var e=[this.operator,t,this.input.serialize()],r=0;r<this.labels.length;r++)e.push(this.labels[r],this.outputs[r].serialize());return e};var Be=function(t,e){this.type=t,this.args=e;};Be.parse=function(t,e){if(t.length<2)return e.error("Expectected at least one argument.");var r=null,n=e.expectedType;n&&"value"!==n.kind&&(r=n);for(var i=[],a=0,o=t.slice(1);a<o.length;a+=1){var s=o[a],u=e.parse(s,1+i.length,r,void 0,{typeAnnotation:"omit"});if(!u)return null;r=r||u.type,i.push(u);}var p=n&&i.some(function(t){return Ct(n,t.type)});return new Be(p?It:r,i)},Be.prototype.evaluate=function(t){for(var e=null,r=0,n=this.args;r<n.length;r+=1){if(null!==(e=n[r].evaluate(t)))break}return e},Be.prototype.eachChild=function(t){this.args.forEach(t);},Be.prototype.possibleOutputs=function(){return (t=[]).concat.apply(t,this.args.map(function(t){return t.possibleOutputs()}));var t;},Be.prototype.serialize=function(){var t=["coalesce"];return this.eachChild(function(e){t.push(e.serialize());}),t};var Ee=function(t,e){this.type=e.type,this.bindings=[].concat(t),this.result=e;};Ee.prototype.evaluate=function(t){return this.result.evaluate(t)},Ee.prototype.eachChild=function(t){for(var e=0,r=this.bindings;e<r.length;e+=1){t(r[e][1]);}t(this.result);},Ee.parse=function(t,e){if(t.length<4)return e.error("Expected at least 3 arguments, but found "+(t.length-1)+" instead.");for(var r=[],n=1;n<t.length-1;n+=2){var i=t[n];if("string"!=typeof i)return e.error("Expected string, but found "+typeof i+" instead.",n);if(/[^a-zA-Z0-9_]/.test(i))return e.error("Variable names must contain only alphanumeric characters or '_'.",n);var a=e.parse(t[n+1],n+1);if(!a)return null;r.push([i,a]);}var o=e.parse(t[t.length-1],t.length-1,e.expectedType,r);return o?new Ee(r,o):null},Ee.prototype.possibleOutputs=function(){return this.result.possibleOutputs()},Ee.prototype.serialize=function(){for(var t=["let"],e=0,r=this.bindings;e<r.length;e+=1){var n=r[e],i=n[0],a=n[1];t.push(i,a.serialize());}return t.push(this.result.serialize()),t};var Pe=function(t,e,r){this.type=t,this.index=e,this.input=r;};Pe.parse=function(t,e){if(3!==t.length)return e.error("Expected 2 arguments, but found "+(t.length-1)+" instead.");var r=e.parse(t[1],1,wt),n=e.parse(t[2],2,Pt(e.expectedType||It));if(!r||!n)return null;var i=n.type;return new Pe(i.itemType,r,n)},Pe.prototype.evaluate=function(t){var e=this.index.evaluate(t),r=this.input.evaluate(t);if(e<0)throw new Nt("Array index out of bounds: "+e+" < 0.");if(e>=r.length)throw new Nt("Array index out of bounds: "+e+" > "+(r.length-1)+".");if(e!==Math.floor(e))throw new Nt("Array index must be an integer, but found "+e+" instead.");return r[e]},Pe.prototype.eachChild=function(t){t(this.index),t(this.input);},Pe.prototype.possibleOutputs=function(){return [void 0]},Pe.prototype.serialize=function(){return ["at",this.index.serialize(),this.input.serialize()]};var Ve=function(t,e,r,n,i,a){this.inputType=t,this.type=e,this.input=r,this.cases=n,this.outputs=i,this.otherwise=a;};Ve.parse=function(t,e){if(t.length<5)return e.error("Expected at least 4 arguments, but found only "+(t.length-1)+".");if(t.length%2!=1)return e.error("Expected an even number of arguments.");var r,n;e.expectedType&&"value"!==e.expectedType.kind&&(n=e.expectedType);for(var i={},a=[],o=2;o<t.length-1;o+=2){var s=t[o],u=t[o+1];Array.isArray(s)||(s=[s]);var p=e.concat(o);if(0===s.length)return p.error("Expected at least one branch label.");for(var l=0,c=s;l<c.length;l+=1){var h=c[l];if("number"!=typeof h&&"string"!=typeof h)return p.error("Branch labels must be numbers or strings.");if("number"==typeof h&&Math.abs(h)>Number.MAX_SAFE_INTEGER)return p.error("Branch labels must be integers no larger than "+Number.MAX_SAFE_INTEGER+".");if("number"==typeof h&&Math.floor(h)!==h)return p.error("Numeric branch labels must be integer values.");if(r){if(p.checkSubtype(r,jt(h)))return null}else r=jt(h);if(void 0!==i[String(h)])return p.error("Branch labels must be unique.");i[String(h)]=a.length;}var f=e.parse(u,o,n);if(!f)return null;n=n||f.type,a.push(f);}var y=e.parse(t[1],1,It);if(!y)return null;var d=e.parse(t[t.length-1],t.length-1,n);return d?"value"!==y.type.kind&&e.concat(1).checkSubtype(r,y.type)?null:new Ve(r,n,y,i,a,d):null},Ve.prototype.evaluate=function(t){var e=this.input.evaluate(t);return (jt(e)===this.inputType&&this.outputs[this.cases[e]]||this.otherwise).evaluate(t)},Ve.prototype.eachChild=function(t){t(this.input),this.outputs.forEach(t),t(this.otherwise);},Ve.prototype.possibleOutputs=function(){return (t=[]).concat.apply(t,this.outputs.map(function(t){return t.possibleOutputs()})).concat(this.otherwise.possibleOutputs());var t;},Ve.prototype.serialize=function(){for(var t=this,e=["match",this.input.serialize()],r=[],n={},i=0,a=Object.keys(this.cases).sort();i<a.length;i+=1){var o=a[i],s=n[t.cases[o]];void 0===s?(n[t.cases[o]]=r.length,r.push([t.cases[o],[o]])):r[s][1].push(o);}for(var u=function(e){return "number"===t.inputType.kind?Number(e):e},p=0,l=r;p<l.length;p+=1){var c=l[p],h=c[0],f=c[1];1===f.length?e.push(u(f[0])):e.push(f.map(u)),e.push(t.outputs[h].serialize());}return e.push(this.otherwise.serialize()),e};var Me=function(t,e,r){this.type=t,this.branches=e,this.otherwise=r;};function Ce(t,e){return "=="===t||"!="===t?"boolean"===e.kind||"string"===e.kind||"number"===e.kind||"null"===e.kind||"value"===e.kind:"string"===e.kind||"number"===e.kind||"value"===e.kind}function Te(t,e,r,n){return 0===n.compare(e,r)}function Fe(t,e,r){var n="=="!==t&&"!="!==t;return function(){function i(t,e,r){this.type=kt,this.lhs=t,this.rhs=e,this.collator=r,this.hasUntypedArgument="value"===t.type.kind||"value"===e.type.kind;}return i.parse=function(t,e){if(3!==t.length&&4!==t.length)return e.error("Expected two or three arguments.");var r=t[0],a=e.parse(t[1],1,It);if(!a)return null;if(!Ce(r,a.type))return e.concat(1).error('"'+r+"\" comparisons are not supported for type '"+Vt(a.type)+"'.");var o=e.parse(t[2],2,It);if(!o)return null;if(!Ce(r,o.type))return e.concat(2).error('"'+r+"\" comparisons are not supported for type '"+Vt(o.type)+"'.");if(a.type.kind!==o.type.kind&&"value"!==a.type.kind&&"value"!==o.type.kind)return e.error("Cannot compare types '"+Vt(a.type)+"' and '"+Vt(o.type)+"'.");n&&("value"===a.type.kind&&"value"!==o.type.kind?a=new Zt(o.type,[a]):"value"!==a.type.kind&&"value"===o.type.kind&&(o=new Zt(a.type,[o])));var s=null;if(4===t.length){if("string"!==a.type.kind&&"string"!==o.type.kind&&"value"!==a.type.kind&&"value"!==o.type.kind)return e.error("Cannot use collator to compare non-string types.");if(!(s=e.parse(t[3],3,Bt)))return null}return new i(a,o,s)},i.prototype.evaluate=function(i){var a=this.lhs.evaluate(i),o=this.rhs.evaluate(i);if(n&&this.hasUntypedArgument){var s=jt(a),u=jt(o);if(s.kind!==u.kind||"string"!==s.kind&&"number"!==s.kind)throw new Nt('Expected arguments for "'+t+'" to be (string, string) or (number, number), but found ('+s.kind+", "+u.kind+") instead.")}if(this.collator&&!n&&this.hasUntypedArgument){var p=jt(a),l=jt(o);if("string"!==p.kind||"string"!==l.kind)return e(i,a,o)}return this.collator?r(i,a,o,this.collator.evaluate(i)):e(i,a,o)},i.prototype.eachChild=function(t){t(this.lhs),t(this.rhs),this.collator&&t(this.collator);},i.prototype.possibleOutputs=function(){return [!0,!1]},i.prototype.serialize=function(){var e=[t];return this.eachChild(function(t){e.push(t.serialize());}),e},i}()}Me.parse=function(t,e){if(t.length<4)return e.error("Expected at least 3 arguments, but found only "+(t.length-1)+".");if(t.length%2!=0)return e.error("Expected an odd number of arguments.");var r;e.expectedType&&"value"!==e.expectedType.kind&&(r=e.expectedType);for(var n=[],i=1;i<t.length-1;i+=2){var a=e.parse(t[i],i,kt);if(!a)return null;var o=e.parse(t[i+1],i+1,r);if(!o)return null;n.push([a,o]),r=r||o.type;}var s=e.parse(t[t.length-1],t.length-1,r);return s?new Me(r,n,s):null},Me.prototype.evaluate=function(t){for(var e=0,r=this.branches;e<r.length;e+=1){var n=r[e],i=n[0],a=n[1];if(i.evaluate(t))return a.evaluate(t)}return this.otherwise.evaluate(t)},Me.prototype.eachChild=function(t){for(var e=0,r=this.branches;e<r.length;e+=1){var n=r[e],i=n[0],a=n[1];t(i),t(a);}t(this.otherwise);},Me.prototype.possibleOutputs=function(){return (t=[]).concat.apply(t,this.branches.map(function(t){t[0];return t[1].possibleOutputs()})).concat(this.otherwise.possibleOutputs());var t;},Me.prototype.serialize=function(){var t=["case"];return this.eachChild(function(e){t.push(e.serialize());}),t};var Le=Fe("==",function(t,e,r){return e===r},Te),Oe=Fe("!=",function(t,e,r){return e!==r},function(t,e,r,n){return !Te(0,e,r,n)}),De=Fe("<",function(t,e,r){return e<r},function(t,e,r,n){return n.compare(e,r)<0}),Ue=Fe(">",function(t,e,r){return e>r},function(t,e,r,n){return n.compare(e,r)>0}),je=Fe("<=",function(t,e,r){return e<=r},function(t,e,r,n){return n.compare(e,r)<=0}),qe=Fe(">=",function(t,e,r){return e>=r},function(t,e,r,n){return n.compare(e,r)>=0}),Re=function(t){this.type=wt,this.input=t;};Re.parse=function(t,e){if(2!==t.length)return e.error("Expected 1 argument, but found "+(t.length-1)+" instead.");var r=e.parse(t[1],1);return r?"array"!==r.type.kind&&"string"!==r.type.kind&&"value"!==r.type.kind?e.error("Expected argument of type string or array, but found "+Vt(r.type)+" instead."):new Re(r):null},Re.prototype.evaluate=function(t){var e=this.input.evaluate(t);if("string"==typeof e)return e.length;if(Array.isArray(e))return e.length;throw new Nt("Expected value to be of type string or array, but found "+Vt(jt(e))+" instead.")},Re.prototype.eachChild=function(t){t(this.input);},Re.prototype.possibleOutputs=function(){return [void 0]},Re.prototype.serialize=function(){var t=["length"];return this.eachChild(function(e){t.push(e.serialize());}),t};var Ne={"==":Le,"!=":Oe,">":Ue,"<":De,">=":qe,"<=":je,array:Zt,at:Pe,boolean:Zt,case:Me,coalesce:Be,collator:Wt,format:Xt,interpolate:ze,"interpolate-hcl":ze,"interpolate-lab":ze,length:Re,let:Ee,literal:Rt,match:Ve,number:Zt,object:Zt,step:ae,string:Zt,"to-boolean":Ht,"to-color":Ht,"to-number":Ht,"to-string":Ht,var:re};function Ge(t,e){var r=e[0],n=e[1],i=e[2],a=e[3];r=r.evaluate(t),n=n.evaluate(t),i=i.evaluate(t);var o=a?a.evaluate(t):1,s=Ut(r,n,i,o);if(s)throw new Nt(s);return new Ft(r/255*o,n/255*o,i/255*o,o)}function Ze(t,e){return t in e}function Xe(t,e){var r=e[t];return void 0===r?null:r}function Ke(t){return {type:t}}function He(t){return {result:"success",value:t}}function Je(t){return {result:"error",value:t}}function Ye(t){return "data-driven"===t["property-type"]||"cross-faded-data-driven"===t["property-type"]}function $e(t){return !!t.expression&&t.expression.parameters.indexOf("zoom")>-1}function We(t){return !!t.expression&&t.expression.interpolated}function Qe(t){return t instanceof Number?"number":t instanceof String?"string":t instanceof Boolean?"boolean":Array.isArray(t)?"array":null===t?"null":typeof t}function tr(t){return "object"==typeof t&&null!==t&&!Array.isArray(t)}function er(t){return t}function rr(t,e,r){return void 0!==t?t:void 0!==e?e:void 0!==r?r:void 0}function nr(t,e,r,n,i){return rr(typeof r===i?n[r]:void 0,t.default,e.default)}function ir(t,e,r){if("number"!==Qe(r))return rr(t.default,e.default);var n=t.stops.length;if(1===n)return t.stops[0][1];if(r<=t.stops[0][0])return t.stops[0][1];if(r>=t.stops[n-1][0])return t.stops[n-1][1];var i=sr(t.stops,r);return t.stops[i][1]}function ar(t,e,r){var n=void 0!==t.base?t.base:1;if("number"!==Qe(r))return rr(t.default,e.default);var i=t.stops.length;if(1===i)return t.stops[0][1];if(r<=t.stops[0][0])return t.stops[0][1];if(r>=t.stops[i-1][0])return t.stops[i-1][1];var a=sr(t.stops,r),o=function(t,e,r,n){var i=n-r,a=t-r;return 0===i?0:1===e?a/i:(Math.pow(e,a)-1)/(Math.pow(e,i)-1)}(r,n,t.stops[a][0],t.stops[a+1][0]),s=t.stops[a][1],u=t.stops[a+1][1],p=se[e.type]||er;if(t.colorSpace&&"rgb"!==t.colorSpace){var l=Se[t.colorSpace];p=function(t,e){return l.reverse(l.interpolate(l.forward(t),l.forward(e),o))};}return "function"==typeof s.evaluate?{evaluate:function(){for(var t=[],e=arguments.length;e--;)t[e]=arguments[e];var r=s.evaluate.apply(void 0,t),n=u.evaluate.apply(void 0,t);if(void 0!==r&&void 0!==n)return p(r,n,o)}}:p(s,u,o)}function or(t,e,r){return "color"===e.type?r=Ft.parse(r):"formatted"===e.type?r=Dt.fromString(r.toString()):Qe(r)===e.type||"enum"===e.type&&e.values[r]||(r=void 0),rr(r,t.default,e.default)}function sr(t,e){for(var r,n,i=0,a=t.length-1,o=0;i<=a;){if(r=t[o=Math.floor((i+a)/2)][0],n=t[o+1][0],e===r||e>r&&e<n)return o;r<e?i=o+1:r>e&&(a=o-1);}return Math.max(o-1,0)}$t.register(Ne,{error:[{kind:"error"},[At],function(t,e){var r=e[0];throw new Nt(r.evaluate(t))}],typeof:[At,[It],function(t,e){return Vt(jt(e[0].evaluate(t)))}],"to-rgba":[Pt(wt,4),[St],function(t,e){return e[0].evaluate(t).toArray()}],rgb:[St,[wt,wt,wt],Ge],rgba:[St,[wt,wt,wt,wt],Ge],has:{type:kt,overloads:[[[At],function(t,e){return Ze(e[0].evaluate(t),t.properties())}],[[At,zt],function(t,e){var r=e[0],n=e[1];return Ze(r.evaluate(t),n.evaluate(t))}]]},get:{type:It,overloads:[[[At],function(t,e){return Xe(e[0].evaluate(t),t.properties())}],[[At,zt],function(t,e){var r=e[0],n=e[1];return Xe(r.evaluate(t),n.evaluate(t))}]]},"feature-state":[It,[At],function(t,e){return Xe(e[0].evaluate(t),t.featureState||{})}],properties:[zt,[],function(t){return t.properties()}],"geometry-type":[At,[],function(t){return t.geometryType()}],id:[It,[],function(t){return t.id()}],zoom:[wt,[],function(t){return t.globals.zoom}],"heatmap-density":[wt,[],function(t){return t.globals.heatmapDensity||0}],"line-progress":[wt,[],function(t){return t.globals.lineProgress||0}],"+":[wt,Ke(wt),function(t,e){for(var r=0,n=0,i=e;n<i.length;n+=1){r+=i[n].evaluate(t);}return r}],"*":[wt,Ke(wt),function(t,e){for(var r=1,n=0,i=e;n<i.length;n+=1){r*=i[n].evaluate(t);}return r}],"-":{type:wt,overloads:[[[wt,wt],function(t,e){var r=e[0],n=e[1];return r.evaluate(t)-n.evaluate(t)}],[[wt],function(t,e){return -e[0].evaluate(t)}]]},"/":[wt,[wt,wt],function(t,e){var r=e[0],n=e[1];return r.evaluate(t)/n.evaluate(t)}],"%":[wt,[wt,wt],function(t,e){var r=e[0],n=e[1];return r.evaluate(t)%n.evaluate(t)}],ln2:[wt,[],function(){return Math.LN2}],pi:[wt,[],function(){return Math.PI}],e:[wt,[],function(){return Math.E}],"^":[wt,[wt,wt],function(t,e){var r=e[0],n=e[1];return Math.pow(r.evaluate(t),n.evaluate(t))}],sqrt:[wt,[wt],function(t,e){var r=e[0];return Math.sqrt(r.evaluate(t))}],log10:[wt,[wt],function(t,e){var r=e[0];return Math.log(r.evaluate(t))/Math.LN10}],ln:[wt,[wt],function(t,e){var r=e[0];return Math.log(r.evaluate(t))}],log2:[wt,[wt],function(t,e){var r=e[0];return Math.log(r.evaluate(t))/Math.LN2}],sin:[wt,[wt],function(t,e){var r=e[0];return Math.sin(r.evaluate(t))}],cos:[wt,[wt],function(t,e){var r=e[0];return Math.cos(r.evaluate(t))}],tan:[wt,[wt],function(t,e){var r=e[0];return Math.tan(r.evaluate(t))}],asin:[wt,[wt],function(t,e){var r=e[0];return Math.asin(r.evaluate(t))}],acos:[wt,[wt],function(t,e){var r=e[0];return Math.acos(r.evaluate(t))}],atan:[wt,[wt],function(t,e){var r=e[0];return Math.atan(r.evaluate(t))}],min:[wt,Ke(wt),function(t,e){return Math.min.apply(Math,e.map(function(e){return e.evaluate(t)}))}],max:[wt,Ke(wt),function(t,e){return Math.max.apply(Math,e.map(function(e){return e.evaluate(t)}))}],abs:[wt,[wt],function(t,e){var r=e[0];return Math.abs(r.evaluate(t))}],round:[wt,[wt],function(t,e){var r=e[0].evaluate(t);return r<0?-Math.round(-r):Math.round(r)}],floor:[wt,[wt],function(t,e){var r=e[0];return Math.floor(r.evaluate(t))}],ceil:[wt,[wt],function(t,e){var r=e[0];return Math.ceil(r.evaluate(t))}],"filter-==":[kt,[At,It],function(t,e){var r=e[0],n=e[1];return t.properties()[r.value]===n.value}],"filter-id-==":[kt,[It],function(t,e){var r=e[0];return t.id()===r.value}],"filter-type-==":[kt,[At],function(t,e){var r=e[0];return t.geometryType()===r.value}],"filter-<":[kt,[At,It],function(t,e){var r=e[0],n=e[1],i=t.properties()[r.value],a=n.value;return typeof i==typeof a&&i<a}],"filter-id-<":[kt,[It],function(t,e){var r=e[0],n=t.id(),i=r.value;return typeof n==typeof i&&n<i}],"filter->":[kt,[At,It],function(t,e){var r=e[0],n=e[1],i=t.properties()[r.value],a=n.value;return typeof i==typeof a&&i>a}],"filter-id->":[kt,[It],function(t,e){var r=e[0],n=t.id(),i=r.value;return typeof n==typeof i&&n>i}],"filter-<=":[kt,[At,It],function(t,e){var r=e[0],n=e[1],i=t.properties()[r.value],a=n.value;return typeof i==typeof a&&i<=a}],"filter-id-<=":[kt,[It],function(t,e){var r=e[0],n=t.id(),i=r.value;return typeof n==typeof i&&n<=i}],"filter->=":[kt,[At,It],function(t,e){var r=e[0],n=e[1],i=t.properties()[r.value],a=n.value;return typeof i==typeof a&&i>=a}],"filter-id->=":[kt,[It],function(t,e){var r=e[0],n=t.id(),i=r.value;return typeof n==typeof i&&n>=i}],"filter-has":[kt,[It],function(t,e){return e[0].value in t.properties()}],"filter-has-id":[kt,[],function(t){return null!==t.id()}],"filter-type-in":[kt,[Pt(At)],function(t,e){return e[0].value.indexOf(t.geometryType())>=0}],"filter-id-in":[kt,[Pt(It)],function(t,e){return e[0].value.indexOf(t.id())>=0}],"filter-in-small":[kt,[At,Pt(It)],function(t,e){var r=e[0];return e[1].value.indexOf(t.properties()[r.value])>=0}],"filter-in-large":[kt,[At,Pt(It)],function(t,e){var r=e[0],n=e[1];return function(t,e,r,n){for(;r<=n;){var i=r+n>>1;if(e[i]===t)return !0;e[i]>t?n=i-1:r=i+1;}return !1}(t.properties()[r.value],n.value,0,n.value.length-1)}],all:{type:kt,overloads:[[[kt,kt],function(t,e){var r=e[0],n=e[1];return r.evaluate(t)&&n.evaluate(t)}],[Ke(kt),function(t,e){for(var r=0,n=e;r<n.length;r+=1){if(!n[r].evaluate(t))return !1}return !0}]]},any:{type:kt,overloads:[[[kt,kt],function(t,e){var r=e[0],n=e[1];return r.evaluate(t)||n.evaluate(t)}],[Ke(kt),function(t,e){for(var r=0,n=e;r<n.length;r+=1){if(n[r].evaluate(t))return !0}return !1}]]},"!":[kt,[kt],function(t,e){return !e[0].evaluate(t)}],"is-supported-script":[kt,[At],function(t,e){var r=e[0],n=t.globals&&t.globals.isSupportedScript;return !n||n(r.evaluate(t))}],upcase:[At,[At],function(t,e){return e[0].evaluate(t).toUpperCase()}],downcase:[At,[At],function(t,e){return e[0].evaluate(t).toLowerCase()}],concat:[At,Ke(It),function(t,e){return e.map(function(e){return qt(e.evaluate(t))}).join("")}],"resolved-locale":[At,[Bt],function(t,e){return e[0].evaluate(t).resolvedLocale()}]});var ur=function(t,e){var r;this.expression=t,this._warningHistory={},this._evaluator=new Yt,this._defaultValue="color"===(r=e).type&&tr(r.default)?new Ft(0,0,0,0):"color"===r.type?Ft.parse(r.default)||null:void 0===r.default?null:r.default,this._enumValues="enum"===e.type?e.values:null;};function pr(t){return Array.isArray(t)&&t.length>0&&"string"==typeof t[0]&&t[0]in Ne}function lr(t,e){var r=new ne(Ne,[],function(t){var e={color:St,string:At,number:wt,enum:At,boolean:kt,formatted:Et};if("array"===t.type)return Pt(e[t.value]||It,t.length);return e[t.type]}(e)),n=r.parse(t,void 0,void 0,void 0,"string"===e.type?{typeAnnotation:"coerce"}:void 0);return n?He(new ur(n,e)):Je(r.errors)}ur.prototype.evaluateWithoutErrorHandling=function(t,e,r){return this._evaluator.globals=t,this._evaluator.feature=e,this._evaluator.featureState=r,this.expression.evaluate(this._evaluator)},ur.prototype.evaluate=function(t,e,r){this._evaluator.globals=t,this._evaluator.feature=e||null,this._evaluator.featureState=r||null;try{var n=this.expression.evaluate(this._evaluator);if(null==n)return this._defaultValue;if(this._enumValues&&!(n in this._enumValues))throw new Nt("Expected value to be one of "+Object.keys(this._enumValues).map(function(t){return JSON.stringify(t)}).join(", ")+", but found "+JSON.stringify(n)+" instead.");return n}catch(t){return this._warningHistory[t.message]||(this._warningHistory[t.message]=!0,"undefined"!=typeof console&&console.warn(t.message)),this._defaultValue}};var cr=function(t,e){this.kind=t,this._styleExpression=e,this.isStateDependent="constant"!==t&&!te(e.expression);};cr.prototype.evaluateWithoutErrorHandling=function(t,e,r){return this._styleExpression.evaluateWithoutErrorHandling(t,e,r)},cr.prototype.evaluate=function(t,e,r){return this._styleExpression.evaluate(t,e,r)};var hr=function(t,e,r){this.kind=t,this.zoomStops=r.labels,this._styleExpression=e,this.isStateDependent="camera"!==t&&!te(e.expression),r instanceof ze&&(this._interpolationType=r.interpolation);};function fr(t,e){if("error"===(t=lr(t,e)).result)return t;var r=t.value.expression,n=Qt(r);if(!n&&!Ye(e))return Je([new xt("","data expressions not supported")]);var i=ee(r,["zoom"]);if(!i&&!$e(e))return Je([new xt("","zoom expressions not supported")]);var a=function t(e){var r=null;if(e instanceof Ee)r=t(e.result);else if(e instanceof Be)for(var n=0,i=e.args;n<i.length;n+=1){var a=i[n];if(r=t(a))break}else(e instanceof ae||e instanceof ze)&&e.input instanceof $t&&"zoom"===e.input.name&&(r=e);if(r instanceof xt)return r;e.eachChild(function(e){var n=t(e);n instanceof xt?r=n:!r&&n?r=new xt("",'"zoom" expression may only be used as input to a top-level "step" or "interpolate" expression.'):r&&n&&r!==n&&(r=new xt("",'Only one zoom-based "step" or "interpolate" subexpression may be used in an expression.'));});return r}(r);return a||i?a instanceof xt?Je([a]):a instanceof ze&&!We(e)?Je([new xt("",'"interpolate" expressions cannot be used with this property')]):He(a?new hr(n?"camera":"composite",t.value,a):new cr(n?"constant":"source",t.value)):Je([new xt("",'"zoom" expression may only be used as input to a top-level "step" or "interpolate" expression.')])}hr.prototype.evaluateWithoutErrorHandling=function(t,e,r){return this._styleExpression.evaluateWithoutErrorHandling(t,e,r)},hr.prototype.evaluate=function(t,e,r){return this._styleExpression.evaluate(t,e,r)},hr.prototype.interpolationFactor=function(t,e,r){return this._interpolationType?ze.interpolationFactor(this._interpolationType,t,e,r):0};var yr=function(t,e){this._parameters=t,this._specification=e,mt(this,function t(e,r){var n,i,a,o="color"===r.type,s=e.stops&&"object"==typeof e.stops[0][0],u=s||void 0!==e.property,p=s||!u,l=e.type||(We(r)?"exponential":"interval");if(o&&((e=mt({},e)).stops&&(e.stops=e.stops.map(function(t){return [t[0],Ft.parse(t[1])]})),e.default?e.default=Ft.parse(e.default):e.default=Ft.parse(r.default)),e.colorSpace&&"rgb"!==e.colorSpace&&!Se[e.colorSpace])throw new Error("Unknown color space: "+e.colorSpace);if("exponential"===l)n=ar;else if("interval"===l)n=ir;else if("categorical"===l){n=nr,i=Object.create(null);for(var c=0,h=e.stops;c<h.length;c+=1){var f=h[c];i[f[0]]=f[1];}a=typeof e.stops[0][0];}else{if("identity"!==l)throw new Error('Unknown function type "'+l+'"');n=or;}if(s){for(var y={},d=[],m=0;m<e.stops.length;m++){var v=e.stops[m],g=v[0].zoom;void 0===y[g]&&(y[g]={zoom:g,type:e.type,property:e.property,default:e.default,stops:[]},d.push(g)),y[g].stops.push([v[0].value,v[1]]);}for(var x=[],b=0,_=d;b<_.length;b+=1){var w=_[b];x.push([y[w].zoom,t(y[w],r)]);}return {kind:"composite",interpolationFactor:ze.interpolationFactor.bind(void 0,{name:"linear"}),zoomStops:x.map(function(t){return t[0]}),evaluate:function(t,n){var i=t.zoom;return ar({stops:x,base:e.base},r,i).evaluate(i,n)}}}return p?{kind:"camera",interpolationFactor:"exponential"===l?ze.interpolationFactor.bind(void 0,{name:"exponential",base:void 0!==e.base?e.base:1}):function(){return 0},zoomStops:e.stops.map(function(t){return t[0]}),evaluate:function(t){var o=t.zoom;return n(e,r,o,i,a)}}:{kind:"source",evaluate:function(t,o){var s=o&&o.properties?o.properties[e.property]:void 0;return void 0===s?rr(e.default,r.default):n(e,r,s,i,a)}}}(this._parameters,this._specification));};function dr(t,e){if(tr(t))return new yr(t,e);if(pr(t)){var r=fr(t,e);if("error"===r.result)throw new Error(r.value.map(function(t){return t.key+": "+t.message}).join(", "));return r.value}var n=t;return "string"==typeof t&&"color"===e.type&&(n=Ft.parse(t)),{kind:"constant",evaluate:function(){return n}}}function mr(t){var e=t.key,r=t.value,n=t.valueSpec||{},i=t.objectElementValidators||{},a=t.style,o=t.styleSpec,s=[],u=Qe(r);if("object"!==u)return [new yt(e,r,"object expected, "+u+" found")];for(var p in r){var l=p.split(".")[0],c=n[l]||n["*"],h=void 0;if(i[l])h=i[l];else if(n[l])h=jr;else if(i["*"])h=i["*"];else{if(!n["*"]){s.push(new yt(e,r[p],'unknown property "'+p+'"'));continue}h=jr;}s=s.concat(h({key:(e?e+".":e)+p,value:r[p],valueSpec:c,style:a,styleSpec:o,object:r,objectKey:p},r));}for(var f in n)i[f]||n[f].required&&void 0===n[f].default&&void 0===r[f]&&s.push(new yt(e,r,'missing required property "'+f+'"'));return s}function vr(t){var e=t.value,r=t.valueSpec,n=t.style,i=t.styleSpec,a=t.key,o=t.arrayElementValidator||jr;if("array"!==Qe(e))return [new yt(a,e,"array expected, "+Qe(e)+" found")];if(r.length&&e.length!==r.length)return [new yt(a,e,"array length "+r.length+" expected, length "+e.length+" found")];if(r["min-length"]&&e.length<r["min-length"])return [new yt(a,e,"array length at least "+r["min-length"]+" expected, length "+e.length+" found")];var s={type:r.value};i.$version<7&&(s.function=r.function),"object"===Qe(r.value)&&(s=r.value);for(var u=[],p=0;p<e.length;p++)u=u.concat(o({array:e,arrayIndex:p,value:e[p],valueSpec:s,style:n,styleSpec:i,key:a+"["+p+"]"}));return u}function gr(t){var e=t.key,r=t.value,n=t.valueSpec,i=Qe(r);return "number"!==i?[new yt(e,r,"number expected, "+i+" found")]:"minimum"in n&&r<n.minimum?[new yt(e,r,r+" is less than the minimum value "+n.minimum)]:"maximum"in n&&r>n.maximum?[new yt(e,r,r+" is greater than the maximum value "+n.maximum)]:[]}function xr(t){var e,r,n,i=t.valueSpec,a=vt(t.value.type),o={},s="categorical"!==a&&void 0===t.value.property,u=!s,p="array"===Qe(t.value.stops)&&"array"===Qe(t.value.stops[0])&&"object"===Qe(t.value.stops[0][0]),l=mr({key:t.key,value:t.value,valueSpec:t.styleSpec.function,style:t.style,styleSpec:t.styleSpec,objectElementValidators:{stops:function(t){if("identity"===a)return [new yt(t.key,t.value,'identity function may not have a "stops" property')];var e=[],r=t.value;e=e.concat(vr({key:t.key,value:r,valueSpec:t.valueSpec,style:t.style,styleSpec:t.styleSpec,arrayElementValidator:c})),"array"===Qe(r)&&0===r.length&&e.push(new yt(t.key,r,"array must have at least one stop"));return e},default:function(t){return jr({key:t.key,value:t.value,valueSpec:i,style:t.style,styleSpec:t.styleSpec})}}});return "identity"===a&&s&&l.push(new yt(t.key,t.value,'missing required property "property"')),"identity"===a||t.value.stops||l.push(new yt(t.key,t.value,'missing required property "stops"')),"exponential"===a&&t.valueSpec.expression&&!We(t.valueSpec)&&l.push(new yt(t.key,t.value,"exponential functions not supported")),t.styleSpec.$version>=8&&(u&&!Ye(t.valueSpec)?l.push(new yt(t.key,t.value,"property functions not supported")):s&&!$e(t.valueSpec)&&l.push(new yt(t.key,t.value,"zoom functions not supported"))),"categorical"!==a&&!p||void 0!==t.value.property||l.push(new yt(t.key,t.value,'"property" property is required')),l;function c(t){var e=[],a=t.value,s=t.key;if("array"!==Qe(a))return [new yt(s,a,"array expected, "+Qe(a)+" found")];if(2!==a.length)return [new yt(s,a,"array length 2 expected, length "+a.length+" found")];if(p){if("object"!==Qe(a[0]))return [new yt(s,a,"object expected, "+Qe(a[0])+" found")];if(void 0===a[0].zoom)return [new yt(s,a,"object stop key must have zoom")];if(void 0===a[0].value)return [new yt(s,a,"object stop key must have value")];if(n&&n>vt(a[0].zoom))return [new yt(s,a[0].zoom,"stop zoom values must appear in ascending order")];vt(a[0].zoom)!==n&&(n=vt(a[0].zoom),r=void 0,o={}),e=e.concat(mr({key:s+"[0]",value:a[0],valueSpec:{zoom:{}},style:t.style,styleSpec:t.styleSpec,objectElementValidators:{zoom:gr,value:h}}));}else e=e.concat(h({key:s+"[0]",value:a[0],valueSpec:{},style:t.style,styleSpec:t.styleSpec},a));return pr(gt(a[1]))?e.concat([new yt(s+"[1]",a[1],"expressions are not allowed in function stops.")]):e.concat(jr({key:s+"[1]",value:a[1],valueSpec:i,style:t.style,styleSpec:t.styleSpec}))}function h(t,n){var s=Qe(t.value),u=vt(t.value),p=null!==t.value?t.value:n;if(e){if(s!==e)return [new yt(t.key,p,s+" stop domain type must match previous stop domain type "+e)]}else e=s;if("number"!==s&&"string"!==s&&"boolean"!==s)return [new yt(t.key,p,"stop domain value must be a number, string, or boolean")];if("number"!==s&&"categorical"!==a){var l="number expected, "+s+" found";return Ye(i)&&void 0===a&&(l+='\nIf you intended to use a categorical function, specify `"type": "categorical"`.'),[new yt(t.key,p,l)]}return "categorical"!==a||"number"!==s||isFinite(u)&&Math.floor(u)===u?"categorical"!==a&&"number"===s&&void 0!==r&&u<r?[new yt(t.key,p,"stop domain values must appear in ascending order")]:(r=u,"categorical"===a&&u in o?[new yt(t.key,p,"stop domain values must be unique")]:(o[u]=!0,[])):[new yt(t.key,p,"integer expected, found "+u)]}}function br(t){var e=("property"===t.expressionContext?fr:lr)(gt(t.value),t.valueSpec);return "error"===e.result?e.value.map(function(e){return new yt(""+t.key+e.key,t.value,e.message)}):"property"===t.expressionContext&&"text-font"===t.propertyKey&&-1!==e.value._styleExpression.expression.possibleOutputs().indexOf(void 0)?[new yt(t.key,t.value,'Invalid data expression for "'+t.propertyKey+'". Output values must be contained as literals within the expression.')]:"property"!==t.expressionContext||"layout"!==t.propertyType||te(e.value._styleExpression.expression)?"filter"!==t.expressionContext||te(e.value.expression)?[]:[new yt(t.key,t.value,'"feature-state" data expressions are not supported with filters.')]:[new yt(t.key,t.value,'"feature-state" data expressions are not supported with layout properties.')]}function _r(t){var e=t.key,r=t.value,n=t.valueSpec,i=[];return Array.isArray(n.values)?-1===n.values.indexOf(vt(r))&&i.push(new yt(e,r,"expected one of ["+n.values.join(", ")+"], "+JSON.stringify(r)+" found")):-1===Object.keys(n.values).indexOf(vt(r))&&i.push(new yt(e,r,"expected one of ["+Object.keys(n.values).join(", ")+"], "+JSON.stringify(r)+" found")),i}function wr(t){if(!0===t||!1===t)return !0;if(!Array.isArray(t)||0===t.length)return !1;switch(t[0]){case"has":return t.length>=2&&"$id"!==t[1]&&"$type"!==t[1];case"in":case"!in":case"!has":case"none":return !1;case"==":case"!=":case">":case">=":case"<":case"<=":return 3!==t.length||Array.isArray(t[1])||Array.isArray(t[2]);case"any":case"all":for(var e=0,r=t.slice(1);e<r.length;e+=1){var n=r[e];if(!wr(n)&&"boolean"!=typeof n)return !1}return !0;default:return !0}}yr.deserialize=function(t){return new yr(t._parameters,t._specification)},yr.serialize=function(t){return {_parameters:t._parameters,_specification:t._specification}};var Ar={type:"boolean",default:!1,transition:!1,"property-type":"data-driven",expression:{interpolated:!1,parameters:["zoom","feature"]}};function kr(t){if(null==t)return function(){return !0};wr(t)||(t=zr(t));var e=lr(t,Ar);if("error"===e.result)throw new Error(e.value.map(function(t){return t.key+": "+t.message}).join(", "));return function(t,r){return e.value.evaluate(t,r)}}function Sr(t,e){return t<e?-1:t>e?1:0}function zr(t){if(!t)return !0;var e,r=t[0];return t.length<=1?"any"!==r:"=="===r?Ir(t[1],t[2],"=="):"!="===r?Pr(Ir(t[1],t[2],"==")):"<"===r||">"===r||"<="===r||">="===r?Ir(t[1],t[2],r):"any"===r?(e=t.slice(1),["any"].concat(e.map(zr))):"all"===r?["all"].concat(t.slice(1).map(zr)):"none"===r?["all"].concat(t.slice(1).map(zr).map(Pr)):"in"===r?Br(t[1],t.slice(2)):"!in"===r?Pr(Br(t[1],t.slice(2))):"has"===r?Er(t[1]):"!has"!==r||Pr(Er(t[1]))}function Ir(t,e,r){switch(t){case"$type":return ["filter-type-"+r,e];case"$id":return ["filter-id-"+r,e];default:return ["filter-"+r,t,e]}}function Br(t,e){if(0===e.length)return !1;switch(t){case"$type":return ["filter-type-in",["literal",e]];case"$id":return ["filter-id-in",["literal",e]];default:return e.length>200&&!e.some(function(t){return typeof t!=typeof e[0]})?["filter-in-large",t,["literal",e.sort(Sr)]]:["filter-in-small",t,["literal",e]]}}function Er(t){switch(t){case"$type":return !0;case"$id":return ["filter-has-id"];default:return ["filter-has",t]}}function Pr(t){return ["!",t]}function Vr(t){return wr(gt(t.value))?br(mt({},t,{expressionContext:"filter",valueSpec:{value:"boolean"}})):function t(e){var r=e.value;var n=e.key;if("array"!==Qe(r))return [new yt(n,r,"array expected, "+Qe(r)+" found")];var i=e.styleSpec;var a;var o=[];if(r.length<1)return [new yt(n,r,"filter array must have at least 1 element")];o=o.concat(_r({key:n+"[0]",value:r[0],valueSpec:i.filter_operator,style:e.style,styleSpec:e.styleSpec}));switch(vt(r[0])){case"<":case"<=":case">":case">=":r.length>=2&&"$type"===vt(r[1])&&o.push(new yt(n,r,'"$type" cannot be use with operator "'+r[0]+'"'));case"==":case"!=":3!==r.length&&o.push(new yt(n,r,'filter array for operator "'+r[0]+'" must have 3 elements'));case"in":case"!in":r.length>=2&&"string"!==(a=Qe(r[1]))&&o.push(new yt(n+"[1]",r[1],"string expected, "+a+" found"));for(var s=2;s<r.length;s++)a=Qe(r[s]),"$type"===vt(r[1])?o=o.concat(_r({key:n+"["+s+"]",value:r[s],valueSpec:i.geometry_type,style:e.style,styleSpec:e.styleSpec})):"string"!==a&&"number"!==a&&"boolean"!==a&&o.push(new yt(n+"["+s+"]",r[s],"string, number, or boolean expected, "+a+" found"));break;case"any":case"all":case"none":for(var u=1;u<r.length;u++)o=o.concat(t({key:n+"["+u+"]",value:r[u],style:e.style,styleSpec:e.styleSpec}));break;case"has":case"!has":a=Qe(r[1]),2!==r.length?o.push(new yt(n,r,'filter array for "'+r[0]+'" operator must have 2 elements')):"string"!==a&&o.push(new yt(n+"[1]",r[1],"string expected, "+a+" found"));}return o}(t)}function Mr(t,e){var r=t.key,n=t.style,i=t.styleSpec,a=t.value,o=t.objectKey,s=i[e+"_"+t.layerType];if(!s)return [];var u=o.match(/^(.*)-transition$/);if("paint"===e&&u&&s[u[1]]&&s[u[1]].transition)return jr({key:r,value:a,valueSpec:i.transition,style:n,styleSpec:i});var p,l=t.valueSpec||s[o];if(!l)return [new yt(r,a,'unknown property "'+o+'"')];if("string"===Qe(a)&&Ye(l)&&!l.tokens&&(p=/^{([^}]+)}$/.exec(a)))return [new yt(r,a,'"'+o+'" does not support interpolation syntax\nUse an identity property function instead: `{ "type": "identity", "property": '+JSON.stringify(p[1])+" }`.")];var c=[];return "symbol"===t.layerType&&("text-field"===o&&n&&!n.glyphs&&c.push(new yt(r,a,'use of "text-field" requires a style "glyphs" property')),"text-font"===o&&tr(gt(a))&&"identity"===vt(a.type)&&c.push(new yt(r,a,'"text-font" does not support identity functions'))),c.concat(jr({key:t.key,value:a,valueSpec:l,style:n,styleSpec:i,expressionContext:"property",propertyType:e,propertyKey:o}))}function Cr(t){return Mr(t,"paint")}function Tr(t){return Mr(t,"layout")}function Fr(t){var e=[],r=t.value,n=t.key,i=t.style,a=t.styleSpec;r.type||r.ref||e.push(new yt(n,r,'either "type" or "ref" is required'));var o,s=vt(r.type),u=vt(r.ref);if(r.id)for(var p=vt(r.id),l=0;l<t.arrayIndex;l++){var c=i.layers[l];vt(c.id)===p&&e.push(new yt(n,r.id,'duplicate layer id "'+r.id+'", previously used at line '+c.id.__line__));}if("ref"in r)["type","source","source-layer","filter","layout"].forEach(function(t){t in r&&e.push(new yt(n,r[t],'"'+t+'" is prohibited for ref layers'));}),i.layers.forEach(function(t){vt(t.id)===u&&(o=t);}),o?o.ref?e.push(new yt(n,r.ref,"ref cannot reference another ref layer")):s=vt(o.type):e.push(new yt(n,r.ref,'ref layer "'+u+'" not found'));else if("background"!==s)if(r.source){var h=i.sources&&i.sources[r.source],f=h&&vt(h.type);h?"vector"===f&&"raster"===s?e.push(new yt(n,r.source,'layer "'+r.id+'" requires a raster source')):"raster"===f&&"raster"!==s?e.push(new yt(n,r.source,'layer "'+r.id+'" requires a vector source')):"vector"!==f||r["source-layer"]?"raster-dem"===f&&"hillshade"!==s?e.push(new yt(n,r.source,"raster-dem source can only be used with layer type 'hillshade'.")):"line"!==s||!r.paint||!r.paint["line-gradient"]||"geojson"===f&&h.lineMetrics||e.push(new yt(n,r,'layer "'+r.id+'" specifies a line-gradient, which requires a GeoJSON source with `lineMetrics` enabled.')):e.push(new yt(n,r,'layer "'+r.id+'" must specify a "source-layer"')):e.push(new yt(n,r.source,'source "'+r.source+'" not found'));}else e.push(new yt(n,r,'missing required property "source"'));return e=e.concat(mr({key:n,value:r,valueSpec:a.layer,style:t.style,styleSpec:t.styleSpec,objectElementValidators:{"*":function(){return []},type:function(){return jr({key:n+".type",value:r.type,valueSpec:a.layer.type,style:t.style,styleSpec:t.styleSpec,object:r,objectKey:"type"})},filter:Vr,layout:function(t){return mr({layer:r,key:t.key,value:t.value,style:t.style,styleSpec:t.styleSpec,objectElementValidators:{"*":function(t){return Tr(mt({layerType:s},t))}}})},paint:function(t){return mr({layer:r,key:t.key,value:t.value,style:t.style,styleSpec:t.styleSpec,objectElementValidators:{"*":function(t){return Cr(mt({layerType:s},t))}}})}}}))}function Lr(t){var e=t.value,r=t.key,n=t.styleSpec,i=t.style;if(!e.type)return [new yt(r,e,'"type" is required')];var a=vt(e.type),o=[];switch(a){case"vector":case"raster":case"raster-dem":if(o=o.concat(mr({key:r,value:e,valueSpec:n["source_"+a.replace("-","_")],style:t.style,styleSpec:n})),"url"in e)for(var s in e)["type","url","tileSize"].indexOf(s)<0&&o.push(new yt(r+"."+s,e[s],'a source with a "url" property may not include a "'+s+'" property'));return o;case"geojson":return mr({key:r,value:e,valueSpec:n.source_geojson,style:i,styleSpec:n});case"video":return mr({key:r,value:e,valueSpec:n.source_video,style:i,styleSpec:n});case"image":return mr({key:r,value:e,valueSpec:n.source_image,style:i,styleSpec:n});case"canvas":return o.push(new yt(r,null,"Please use runtime APIs to add canvas sources, rather than including them in stylesheets.","source.canvas")),o;default:return _r({key:r+".type",value:e.type,valueSpec:{values:["vector","raster","raster-dem","geojson","video","image"]},style:i,styleSpec:n})}}function Or(t){var e=t.value,r=t.styleSpec,n=r.light,i=t.style,a=[],o=Qe(e);if(void 0===e)return a;if("object"!==o)return a=a.concat([new yt("light",e,"object expected, "+o+" found")]);for(var s in e){var u=s.match(/^(.*)-transition$/);a=u&&n[u[1]]&&n[u[1]].transition?a.concat(jr({key:s,value:e[s],valueSpec:r.transition,style:i,styleSpec:r})):n[s]?a.concat(jr({key:s,value:e[s],valueSpec:n[s],style:i,styleSpec:r})):a.concat([new yt(s,e[s],'unknown property "'+s+'"')]);}return a}function Dr(t){var e=t.value,r=t.key,n=Qe(e);return "string"!==n?[new yt(r,e,"string expected, "+n+" found")]:[]}var Ur={"*":function(){return []},array:vr,boolean:function(t){var e=t.value,r=t.key,n=Qe(e);return "boolean"!==n?[new yt(r,e,"boolean expected, "+n+" found")]:[]},number:gr,color:function(t){var e=t.key,r=t.value,n=Qe(r);return "string"!==n?[new yt(e,r,"color expected, "+n+" found")]:null===Tt(r)?[new yt(e,r,'color expected, "'+r+'" found')]:[]},constants:dt,enum:_r,filter:Vr,function:xr,layer:Fr,object:mr,source:Lr,light:Or,string:Dr,formatted:function(t){return 0===Dr(t).length?[]:br(t)}};function jr(t){var e=t.value,r=t.valueSpec,n=t.styleSpec;return r.expression&&tr(vt(e))?xr(t):r.expression&&pr(gt(e))?br(t):r.type&&Ur[r.type]?Ur[r.type](t):mr(mt({},t,{valueSpec:r.type?n[r.type]:r}))}function qr(t){var e=t.value,r=t.key,n=Dr(t);return n.length?n:(-1===e.indexOf("{fontstack}")&&n.push(new yt(r,e,'"glyphs" url must include a "{fontstack}" token')),-1===e.indexOf("{range}")&&n.push(new yt(r,e,'"glyphs" url must include a "{range}" token')),n)}function Rr(t,e){e=e||ft;var r=[];return r=r.concat(jr({key:"",value:t,valueSpec:e.$root,styleSpec:e,style:t,objectElementValidators:{glyphs:qr,"*":function(){return []}}})),t.constants&&(r=r.concat(dt({key:"constants",value:t.constants,style:t,styleSpec:e}))),Nr(r)}function Nr(t){return [].concat(t).sort(function(t,e){return t.line-e.line})}function Gr(t){return function(){for(var e=[],r=arguments.length;r--;)e[r]=arguments[r];return Nr(t.apply(this,e))}}Rr.source=Gr(Lr),Rr.light=Gr(Or),Rr.layer=Gr(Fr),Rr.filter=Gr(Vr),Rr.paintProperty=Gr(Cr),Rr.layoutProperty=Gr(Tr);var Zr=Rr,Xr=Rr.light,Kr=Rr.paintProperty,Hr=Rr.layoutProperty;function Jr(t,e){var r=!1;if(e&&e.length)for(var n=0,i=e;n<i.length;n+=1){var a=i[n];t.fire(new ct(new Error(a.message))),r=!0;}return r}var Yr=Wr,$r=3;function Wr(t,e,r){var n=this.cells=[];if(t instanceof ArrayBuffer){this.arrayBuffer=t;var i=new Int32Array(this.arrayBuffer);t=i[0],e=i[1],r=i[2],this.d=e+2*r;for(var a=0;a<this.d*this.d;a++){var o=i[$r+a],s=i[$r+a+1];n.push(o===s?null:i.subarray(o,s));}var u=i[$r+n.length],p=i[$r+n.length+1];this.keys=i.subarray(u,p),this.bboxes=i.subarray(p),this.insert=this._insertReadonly;}else{this.d=e+2*r;for(var l=0;l<this.d*this.d;l++)n.push([]);this.keys=[],this.bboxes=[];}this.n=e,this.extent=t,this.padding=r,this.scale=e/t,this.uid=0;var c=r/e*t;this.min=-c,this.max=t+c;}Wr.prototype.insert=function(t,e,r,n,i){this._forEachCell(e,r,n,i,this._insertCell,this.uid++),this.keys.push(t),this.bboxes.push(e),this.bboxes.push(r),this.bboxes.push(n),this.bboxes.push(i);},Wr.prototype._insertReadonly=function(){throw"Cannot insert into a GridIndex created from an ArrayBuffer."},Wr.prototype._insertCell=function(t,e,r,n,i,a){this.cells[i].push(a);},Wr.prototype.query=function(t,e,r,n){var i=this.min,a=this.max;if(t<=i&&e<=i&&a<=r&&a<=n)return Array.prototype.slice.call(this.keys);var o=[];return this._forEachCell(t,e,r,n,this._queryCell,o,{}),o},Wr.prototype._queryCell=function(t,e,r,n,i,a,o){var s=this.cells[i];if(null!==s)for(var u=this.keys,p=this.bboxes,l=0;l<s.length;l++){var c=s[l];if(void 0===o[c]){var h=4*c;t<=p[h+2]&&e<=p[h+3]&&r>=p[h+0]&&n>=p[h+1]?(o[c]=!0,a.push(u[c])):o[c]=!1;}}},Wr.prototype._forEachCell=function(t,e,r,n,i,a,o){for(var s=this._convertToCellCoord(t),u=this._convertToCellCoord(e),p=this._convertToCellCoord(r),l=this._convertToCellCoord(n),c=s;c<=p;c++)for(var h=u;h<=l;h++){var f=this.d*h+c;if(i.call(this,t,e,r,n,f,a,o))return}},Wr.prototype._convertToCellCoord=function(t){return Math.max(0,Math.min(this.d-1,Math.floor(t*this.scale)+this.padding))},Wr.prototype.toArrayBuffer=function(){if(this.arrayBuffer)return this.arrayBuffer;for(var t=this.cells,e=$r+this.cells.length+1+1,r=0,n=0;n<this.cells.length;n++)r+=this.cells[n].length;var i=new Int32Array(e+r+this.keys.length+this.bboxes.length);i[0]=this.extent,i[1]=this.n,i[2]=this.padding;for(var a=e,o=0;o<t.length;o++){var s=t[o];i[$r+o]=a,i.set(s,a),a+=s.length;}return i[$r+t.length]=a,i.set(this.keys,a),a+=this.keys.length,i[$r+t.length+1]=a,i.set(this.bboxes,a),a+=this.bboxes.length,i.buffer};var Qr=self.ImageData,tn={};function en(t,e,r){void 0===r&&(r={}),Object.defineProperty(e,"_classRegistryKey",{value:t,writeable:!1}),tn[t]={klass:e,omit:r.omit||[],shallow:r.shallow||[]};}for(var rn in en("Object",Object),Yr.serialize=function(t,e){var r=t.toArrayBuffer();return e&&e.push(r),{buffer:r}},Yr.deserialize=function(t){return new Yr(t.buffer)},en("Grid",Yr),en("Color",Ft),en("Error",Error),en("StylePropertyFunction",yr),en("StyleExpression",ur,{omit:["_evaluator"]}),en("ZoomDependentExpression",hr),en("ZoomConstantExpression",cr),en("CompoundExpression",$t,{omit:["_evaluate"]}),Ne)Ne[rn]._classRegistryKey||en("Expression_"+rn,Ne[rn]);function nn(t,e){if(null==t||"boolean"==typeof t||"number"==typeof t||"string"==typeof t||t instanceof Boolean||t instanceof Number||t instanceof String||t instanceof Date||t instanceof RegExp)return t;if(t instanceof ArrayBuffer)return e&&e.push(t),t;if(ArrayBuffer.isView(t)){var r=t;return e&&e.push(r.buffer),r}if(t instanceof Qr)return e&&e.push(t.data.buffer),t;if(Array.isArray(t)){for(var n=[],i=0,a=t;i<a.length;i+=1){var o=a[i];n.push(nn(o,e));}return n}if("object"==typeof t){var s=t.constructor,u=s._classRegistryKey;if(!u)throw new Error("can't serialize object of unregistered class");var p=s.serialize?s.serialize(t,e):{};if(!s.serialize){for(var l in t)if(t.hasOwnProperty(l)&&!(tn[u].omit.indexOf(l)>=0)){var c=t[l];p[l]=tn[u].shallow.indexOf(l)>=0?c:nn(c,e);}t instanceof Error&&(p.message=t.message);}if(p.$name)throw new Error("$name property is reserved for worker serialization logic.");return "Object"!==u&&(p.$name=u),p}throw new Error("can't serialize object of type "+typeof t)}function an(t){if(null==t||"boolean"==typeof t||"number"==typeof t||"string"==typeof t||t instanceof Boolean||t instanceof Number||t instanceof String||t instanceof Date||t instanceof RegExp||t instanceof ArrayBuffer||ArrayBuffer.isView(t)||t instanceof Qr)return t;if(Array.isArray(t))return t.map(an);if("object"==typeof t){var e=t.$name||"Object",r=tn[e].klass;if(!r)throw new Error("can't deserialize unregistered class "+e);if(r.deserialize)return r.deserialize(t);for(var n=Object.create(r.prototype),i=0,a=Object.keys(t);i<a.length;i+=1){var o=a[i];if("$name"!==o){var s=t[o];n[o]=tn[e].shallow.indexOf(o)>=0?s:an(s);}}return n}throw new Error("can't deserialize object of type "+typeof t)}var on=function(){this.first=!0;};on.prototype.update=function(t,e){var r=Math.floor(t);return this.first?(this.first=!1,this.lastIntegerZoom=r,this.lastIntegerZoomTime=0,this.lastZoom=t,this.lastFloorZoom=r,!0):(this.lastFloorZoom>r?(this.lastIntegerZoom=r+1,this.lastIntegerZoomTime=e):this.lastFloorZoom<r&&(this.lastIntegerZoom=r,this.lastIntegerZoomTime=e),t!==this.lastZoom&&(this.lastZoom=t,this.lastFloorZoom=r,!0))};var sn={"Latin-1 Supplement":function(t){return t>=128&&t<=255},Arabic:function(t){return t>=1536&&t<=1791},"Arabic Supplement":function(t){return t>=1872&&t<=1919},"Arabic Extended-A":function(t){return t>=2208&&t<=2303},"Hangul Jamo":function(t){return t>=4352&&t<=4607},"Unified Canadian Aboriginal Syllabics":function(t){return t>=5120&&t<=5759},Khmer:function(t){return t>=6016&&t<=6143},"Unified Canadian Aboriginal Syllabics Extended":function(t){return t>=6320&&t<=6399},"General Punctuation":function(t){return t>=8192&&t<=8303},"Letterlike Symbols":function(t){return t>=8448&&t<=8527},"Number Forms":function(t){return t>=8528&&t<=8591},"Miscellaneous Technical":function(t){return t>=8960&&t<=9215},"Control Pictures":function(t){return t>=9216&&t<=9279},"Optical Character Recognition":function(t){return t>=9280&&t<=9311},"Enclosed Alphanumerics":function(t){return t>=9312&&t<=9471},"Geometric Shapes":function(t){return t>=9632&&t<=9727},"Miscellaneous Symbols":function(t){return t>=9728&&t<=9983},"Miscellaneous Symbols and Arrows":function(t){return t>=11008&&t<=11263},"CJK Radicals Supplement":function(t){return t>=11904&&t<=12031},"Kangxi Radicals":function(t){return t>=12032&&t<=12255},"Ideographic Description Characters":function(t){return t>=12272&&t<=12287},"CJK Symbols and Punctuation":function(t){return t>=12288&&t<=12351},Hiragana:function(t){return t>=12352&&t<=12447},Katakana:function(t){return t>=12448&&t<=12543},Bopomofo:function(t){return t>=12544&&t<=12591},"Hangul Compatibility Jamo":function(t){return t>=12592&&t<=12687},Kanbun:function(t){return t>=12688&&t<=12703},"Bopomofo Extended":function(t){return t>=12704&&t<=12735},"CJK Strokes":function(t){return t>=12736&&t<=12783},"Katakana Phonetic Extensions":function(t){return t>=12784&&t<=12799},"Enclosed CJK Letters and Months":function(t){return t>=12800&&t<=13055},"CJK Compatibility":function(t){return t>=13056&&t<=13311},"CJK Unified Ideographs Extension A":function(t){return t>=13312&&t<=19903},"Yijing Hexagram Symbols":function(t){return t>=19904&&t<=19967},"CJK Unified Ideographs":function(t){return t>=19968&&t<=40959},"Yi Syllables":function(t){return t>=40960&&t<=42127},"Yi Radicals":function(t){return t>=42128&&t<=42191},"Hangul Jamo Extended-A":function(t){return t>=43360&&t<=43391},"Hangul Syllables":function(t){return t>=44032&&t<=55215},"Hangul Jamo Extended-B":function(t){return t>=55216&&t<=55295},"Private Use Area":function(t){return t>=57344&&t<=63743},"CJK Compatibility Ideographs":function(t){return t>=63744&&t<=64255},"Arabic Presentation Forms-A":function(t){return t>=64336&&t<=65023},"Vertical Forms":function(t){return t>=65040&&t<=65055},"CJK Compatibility Forms":function(t){return t>=65072&&t<=65103},"Small Form Variants":function(t){return t>=65104&&t<=65135},"Arabic Presentation Forms-B":function(t){return t>=65136&&t<=65279},"Halfwidth and Fullwidth Forms":function(t){return t>=65280&&t<=65519}};function un(t){for(var e=0,r=t;e<r.length;e+=1){if(ln(r[e].charCodeAt(0)))return !0}return !1}function pn(t){return !sn.Arabic(t)&&(!sn["Arabic Supplement"](t)&&(!sn["Arabic Extended-A"](t)&&(!sn["Arabic Presentation Forms-A"](t)&&!sn["Arabic Presentation Forms-B"](t))))}function ln(t){return 746===t||747===t||!(t<4352)&&(!!sn["Bopomofo Extended"](t)||(!!sn.Bopomofo(t)||(!(!sn["CJK Compatibility Forms"](t)||t>=65097&&t<=65103)||(!!sn["CJK Compatibility Ideographs"](t)||(!!sn["CJK Compatibility"](t)||(!!sn["CJK Radicals Supplement"](t)||(!!sn["CJK Strokes"](t)||(!(!sn["CJK Symbols and Punctuation"](t)||t>=12296&&t<=12305||t>=12308&&t<=12319||12336===t)||(!!sn["CJK Unified Ideographs Extension A"](t)||(!!sn["CJK Unified Ideographs"](t)||(!!sn["Enclosed CJK Letters and Months"](t)||(!!sn["Hangul Compatibility Jamo"](t)||(!!sn["Hangul Jamo Extended-A"](t)||(!!sn["Hangul Jamo Extended-B"](t)||(!!sn["Hangul Jamo"](t)||(!!sn["Hangul Syllables"](t)||(!!sn.Hiragana(t)||(!!sn["Ideographic Description Characters"](t)||(!!sn.Kanbun(t)||(!!sn["Kangxi Radicals"](t)||(!!sn["Katakana Phonetic Extensions"](t)||(!(!sn.Katakana(t)||12540===t)||(!(!sn["Halfwidth and Fullwidth Forms"](t)||65288===t||65289===t||65293===t||t>=65306&&t<=65310||65339===t||65341===t||65343===t||t>=65371&&t<=65503||65507===t||t>=65512&&t<=65519)||(!(!sn["Small Form Variants"](t)||t>=65112&&t<=65118||t>=65123&&t<=65126)||(!!sn["Unified Canadian Aboriginal Syllabics"](t)||(!!sn["Unified Canadian Aboriginal Syllabics Extended"](t)||(!!sn["Vertical Forms"](t)||(!!sn["Yijing Hexagram Symbols"](t)||(!!sn["Yi Syllables"](t)||!!sn["Yi Radicals"](t))))))))))))))))))))))))))))))}function cn(t){return !(ln(t)||function(t){return !!(sn["Latin-1 Supplement"](t)&&(167===t||169===t||174===t||177===t||188===t||189===t||190===t||215===t||247===t)||sn["General Punctuation"](t)&&(8214===t||8224===t||8225===t||8240===t||8241===t||8251===t||8252===t||8258===t||8263===t||8264===t||8265===t||8273===t)||sn["Letterlike Symbols"](t)||sn["Number Forms"](t)||sn["Miscellaneous Technical"](t)&&(t>=8960&&t<=8967||t>=8972&&t<=8991||t>=8996&&t<=9e3||9003===t||t>=9085&&t<=9114||t>=9150&&t<=9165||9167===t||t>=9169&&t<=9179||t>=9186&&t<=9215)||sn["Control Pictures"](t)&&9251!==t||sn["Optical Character Recognition"](t)||sn["Enclosed Alphanumerics"](t)||sn["Geometric Shapes"](t)||sn["Miscellaneous Symbols"](t)&&!(t>=9754&&t<=9759)||sn["Miscellaneous Symbols and Arrows"](t)&&(t>=11026&&t<=11055||t>=11088&&t<=11097||t>=11192&&t<=11243)||sn["CJK Symbols and Punctuation"](t)||sn.Katakana(t)||sn["Private Use Area"](t)||sn["CJK Compatibility Forms"](t)||sn["Small Form Variants"](t)||sn["Halfwidth and Fullwidth Forms"](t)||8734===t||8756===t||8757===t||t>=9984&&t<=10087||t>=10102&&t<=10131||65532===t||65533===t)}(t))}function hn(t,e){return !(!e&&(t>=1424&&t<=2303||sn["Arabic Presentation Forms-A"](t)||sn["Arabic Presentation Forms-B"](t)))&&!(t>=2304&&t<=3583||t>=3840&&t<=4255||sn.Khmer(t))}var fn,yn=!1,dn=null,mn=!1,vn=new ht,gn={applyArabicShaping:null,processBidirectionalText:null,processStyledBidirectionalText:null,isLoaded:function(){return mn||null!=gn.applyArabicShaping}},xn=function(t,e){this.zoom=t,e?(this.now=e.now,this.fadeDuration=e.fadeDuration,this.zoomHistory=e.zoomHistory,this.transition=e.transition):(this.now=0,this.fadeDuration=0,this.zoomHistory=new on,this.transition={});};xn.prototype.isSupportedScript=function(t){return function(t,e){for(var r=0,n=t;r<n.length;r+=1)if(!hn(n[r].charCodeAt(0),e))return !1;return !0}(t,gn.isLoaded())},xn.prototype.crossFadingFactor=function(){return 0===this.fadeDuration?1:Math.min((this.now-this.zoomHistory.lastIntegerZoomTime)/this.fadeDuration,1)},xn.prototype.getCrossfadeParameters=function(){var t=this.zoom,e=t-Math.floor(t),r=this.crossFadingFactor();return t>this.zoomHistory.lastIntegerZoom?{fromScale:2,toScale:1,t:e+(1-e)*r}:{fromScale:.5,toScale:1,t:1-(1-r)*e}};var bn=function(t,e){this.property=t,this.value=e,this.expression=dr(void 0===e?t.specification.default:e,t.specification);};bn.prototype.isDataDriven=function(){return "source"===this.expression.kind||"composite"===this.expression.kind},bn.prototype.possiblyEvaluate=function(t){return this.property.possiblyEvaluate(this,t)};var _n=function(t){this.property=t,this.value=new bn(t,void 0);};_n.prototype.transitioned=function(t,e){return new An(this.property,this.value,e,c({},t.transition,this.transition),t.now)},_n.prototype.untransitioned=function(){return new An(this.property,this.value,null,{},0)};var wn=function(t){this._properties=t,this._values=Object.create(t.defaultTransitionablePropertyValues);};wn.prototype.getValue=function(t){return b(this._values[t].value.value)},wn.prototype.setValue=function(t,e){this._values.hasOwnProperty(t)||(this._values[t]=new _n(this._values[t].property)),this._values[t].value=new bn(this._values[t].property,null===e?void 0:b(e));},wn.prototype.getTransition=function(t){return b(this._values[t].transition)},wn.prototype.setTransition=function(t,e){this._values.hasOwnProperty(t)||(this._values[t]=new _n(this._values[t].property)),this._values[t].transition=b(e)||void 0;},wn.prototype.serialize=function(){for(var t={},e=0,r=Object.keys(this._values);e<r.length;e+=1){var n=r[e],i=this.getValue(n);void 0!==i&&(t[n]=i);var a=this.getTransition(n);void 0!==a&&(t[n+"-transition"]=a);}return t},wn.prototype.transitioned=function(t,e){for(var r=new kn(this._properties),n=0,i=Object.keys(this._values);n<i.length;n+=1){var a=i[n];r._values[a]=this._values[a].transitioned(t,e._values[a]);}return r},wn.prototype.untransitioned=function(){for(var t=new kn(this._properties),e=0,r=Object.keys(this._values);e<r.length;e+=1){var n=r[e];t._values[n]=this._values[n].untransitioned();}return t};var An=function(t,e,r,n,i){this.property=t,this.value=e,this.begin=i+n.delay||0,this.end=this.begin+n.duration||0,t.specification.transition&&(n.delay||n.duration)&&(this.prior=r);};An.prototype.possiblyEvaluate=function(t){var e=t.now||0,r=this.value.possiblyEvaluate(t),n=this.prior;if(n){if(e>this.end)return this.prior=null,r;if(this.value.isDataDriven())return this.prior=null,r;if(e<this.begin)return n.possiblyEvaluate(t);var i=(e-this.begin)/(this.end-this.begin);return this.property.interpolate(n.possiblyEvaluate(t),r,function(t){if(t<=0)return 0;if(t>=1)return 1;var e=t*t,r=e*t;return 4*(t<.5?r:3*(t-e)+r-.75)}(i))}return r};var kn=function(t){this._properties=t,this._values=Object.create(t.defaultTransitioningPropertyValues);};kn.prototype.possiblyEvaluate=function(t){for(var e=new In(this._properties),r=0,n=Object.keys(this._values);r<n.length;r+=1){var i=n[r];e._values[i]=this._values[i].possiblyEvaluate(t);}return e},kn.prototype.hasTransition=function(){for(var t=0,e=Object.keys(this._values);t<e.length;t+=1){var r=e[t];if(this._values[r].prior)return !0}return !1};var Sn=function(t){this._properties=t,this._values=Object.create(t.defaultPropertyValues);};Sn.prototype.getValue=function(t){return b(this._values[t].value)},Sn.prototype.setValue=function(t,e){this._values[t]=new bn(this._values[t].property,null===e?void 0:b(e));},Sn.prototype.serialize=function(){for(var t={},e=0,r=Object.keys(this._values);e<r.length;e+=1){var n=r[e],i=this.getValue(n);void 0!==i&&(t[n]=i);}return t},Sn.prototype.possiblyEvaluate=function(t){for(var e=new In(this._properties),r=0,n=Object.keys(this._values);r<n.length;r+=1){var i=n[r];e._values[i]=this._values[i].possiblyEvaluate(t);}return e};var zn=function(t,e,r){this.property=t,this.value=e,this.parameters=r;};zn.prototype.isConstant=function(){return "constant"===this.value.kind},zn.prototype.constantOr=function(t){return "constant"===this.value.kind?this.value.value:t},zn.prototype.evaluate=function(t,e){return this.property.evaluate(this.value,this.parameters,t,e)};var In=function(t){this._properties=t,this._values=Object.create(t.defaultPossiblyEvaluatedValues);};In.prototype.get=function(t){return this._values[t]};var Bn=function(t){this.specification=t;};Bn.prototype.possiblyEvaluate=function(t,e){return t.expression.evaluate(e)},Bn.prototype.interpolate=function(t,e,r){var n=se[this.specification.type];return n?n(t,e,r):t};var En=function(t){this.specification=t;};En.prototype.possiblyEvaluate=function(t,e){return "constant"===t.expression.kind||"camera"===t.expression.kind?new zn(this,{kind:"constant",value:t.expression.evaluate(e)},e):new zn(this,t.expression,e)},En.prototype.interpolate=function(t,e,r){if("constant"!==t.value.kind||"constant"!==e.value.kind)return t;if(void 0===t.value.value||void 0===e.value.value)return new zn(this,{kind:"constant",value:void 0},t.parameters);var n=se[this.specification.type];return n?new zn(this,{kind:"constant",value:n(t.value.value,e.value.value,r)},t.parameters):t},En.prototype.evaluate=function(t,e,r,n){return "constant"===t.kind?t.value:t.evaluate(e,r,n)};var Pn=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.possiblyEvaluate=function(t,e){if(void 0===t.value)return new zn(this,{kind:"constant",value:void 0},e);if("constant"===t.expression.kind){var r=t.expression.evaluate(e),n=this._calculate(r,r,r,e);return new zn(this,{kind:"constant",value:n},e)}if("camera"===t.expression.kind){var i=this._calculate(t.expression.evaluate({zoom:e.zoom-1}),t.expression.evaluate({zoom:e.zoom}),t.expression.evaluate({zoom:e.zoom+1}),e);return new zn(this,{kind:"constant",value:i},e)}return new zn(this,t.expression,e)},e.prototype.evaluate=function(t,e,r,n){if("source"===t.kind){var i=t.evaluate(e,r,n);return this._calculate(i,i,i,e)}return "composite"===t.kind?this._calculate(t.evaluate({zoom:Math.floor(e.zoom)-1},r,n),t.evaluate({zoom:Math.floor(e.zoom)},r,n),t.evaluate({zoom:Math.floor(e.zoom)+1},r,n),e):t.value},e.prototype._calculate=function(t,e,r,n){return n.zoom>n.zoomHistory.lastIntegerZoom?{from:t,to:e}:{from:r,to:e}},e.prototype.interpolate=function(t){return t},e}(En),Vn=function(t){this.specification=t;};Vn.prototype.possiblyEvaluate=function(t,e){if(void 0!==t.value){if("constant"===t.expression.kind){var r=t.expression.evaluate(e);return this._calculate(r,r,r,e)}return this._calculate(t.expression.evaluate(new xn(Math.floor(e.zoom-1),e)),t.expression.evaluate(new xn(Math.floor(e.zoom),e)),t.expression.evaluate(new xn(Math.floor(e.zoom+1),e)),e)}},Vn.prototype._calculate=function(t,e,r,n){return n.zoom>n.zoomHistory.lastIntegerZoom?{from:t,to:e}:{from:r,to:e}},Vn.prototype.interpolate=function(t){return t};var Mn=function(t){this.specification=t;};Mn.prototype.possiblyEvaluate=function(t,e){return !!t.expression.evaluate(e)},Mn.prototype.interpolate=function(){return !1};var Cn=function(t){for(var e in this.properties=t,this.defaultPropertyValues={},this.defaultTransitionablePropertyValues={},this.defaultTransitioningPropertyValues={},this.defaultPossiblyEvaluatedValues={},t){var r=t[e],n=this.defaultPropertyValues[e]=new bn(r,void 0),i=this.defaultTransitionablePropertyValues[e]=new _n(r);this.defaultTransitioningPropertyValues[e]=i.untransitioned(),this.defaultPossiblyEvaluatedValues[e]=n.possiblyEvaluate({});}};en("DataDrivenProperty",En),en("DataConstantProperty",Bn),en("CrossFadedDataDrivenProperty",Pn),en("CrossFadedProperty",Vn),en("ColorRampProperty",Mn);var Tn=function(t){function e(e,r){if(t.call(this),this.id=e.id,this.type=e.type,this.visibility="visible",this._featureFilter=function(){return !0},"custom"!==e.type&&(e=e,this.metadata=e.metadata,this.minzoom=e.minzoom,this.maxzoom=e.maxzoom,"background"!==e.type&&(this.source=e.source,this.sourceLayer=e["source-layer"],this.filter=e.filter),r.layout&&(this._unevaluatedLayout=new Sn(r.layout)),r.paint)){for(var n in this._transitionablePaint=new wn(r.paint),e.paint)this.setPaintProperty(n,e.paint[n],{validate:!1});for(var i in e.layout)this.setLayoutProperty(i,e.layout[i],{validate:!1});this._transitioningPaint=this._transitionablePaint.untransitioned();}}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.getCrossfadeParameters=function(){return this._crossfadeParameters},e.prototype.getLayoutProperty=function(t){return "visibility"===t?this.visibility:this._unevaluatedLayout.getValue(t)},e.prototype.setLayoutProperty=function(t,e,r){if(void 0===r&&(r={}),null!=e){var n="layers."+this.id+".layout."+t;if(this._validate(Hr,n,t,e,r))return}"visibility"!==t?this._unevaluatedLayout.setValue(t,e):this.visibility="none"===e?e:"visible";},e.prototype.getPaintProperty=function(t){return v(t,"-transition")?this._transitionablePaint.getTransition(t.slice(0,-"-transition".length)):this._transitionablePaint.getValue(t)},e.prototype.setPaintProperty=function(t,e,r){if(void 0===r&&(r={}),null!=e){var n="layers."+this.id+".paint."+t;if(this._validate(Kr,n,t,e,r))return !1}if(v(t,"-transition"))return this._transitionablePaint.setTransition(t.slice(0,-"-transition".length),e||void 0),!1;var i=this._transitionablePaint._values[t],a="cross-faded-data-driven"===i.property.specification["property-type"]&&!i.value.value&&e,o=this._transitionablePaint._values[t].value.isDataDriven();this._transitionablePaint.setValue(t,e);var s=this._transitionablePaint._values[t].value.isDataDriven();return this._handleSpecialPaintPropertyUpdate(t),s||o||a},e.prototype._handleSpecialPaintPropertyUpdate=function(t){},e.prototype.isHidden=function(t){return !!(this.minzoom&&t<this.minzoom)||(!!(this.maxzoom&&t>=this.maxzoom)||"none"===this.visibility)},e.prototype.updateTransitions=function(t){this._transitioningPaint=this._transitionablePaint.transitioned(t,this._transitioningPaint);},e.prototype.hasTransition=function(){return this._transitioningPaint.hasTransition()},e.prototype.recalculate=function(t){t.getCrossfadeParameters&&(this._crossfadeParameters=t.getCrossfadeParameters()),this._unevaluatedLayout&&(this.layout=this._unevaluatedLayout.possiblyEvaluate(t)),this.paint=this._transitioningPaint.possiblyEvaluate(t);},e.prototype.serialize=function(){var t={id:this.id,type:this.type,source:this.source,"source-layer":this.sourceLayer,metadata:this.metadata,minzoom:this.minzoom,maxzoom:this.maxzoom,filter:this.filter,layout:this._unevaluatedLayout&&this._unevaluatedLayout.serialize(),paint:this._transitionablePaint&&this._transitionablePaint.serialize()};return "none"===this.visibility&&(t.layout=t.layout||{},t.layout.visibility="none"),x(t,function(t,e){return !(void 0===t||"layout"===e&&!Object.keys(t).length||"paint"===e&&!Object.keys(t).length)})},e.prototype._validate=function(t,e,r,n,i){return void 0===i&&(i={}),(!i||!1!==i.validate)&&Jr(this,t.call(Zr,{key:e,layerType:this.type,objectKey:r,value:n,styleSpec:ft,style:{glyphs:!0,sprite:!0}}))},e.prototype.hasOffscreenPass=function(){return !1},e.prototype.resize=function(){},e.prototype.isStateDependent=function(){for(var t in this.paint._values){var e=this.paint.get(t);if(e instanceof zn&&Ye(e.property.specification)&&(("source"===e.value.kind||"composite"===e.value.kind)&&e.value.isStateDependent))return !0}return !1},e}(ht),Fn={Int8:Int8Array,Uint8:Uint8Array,Int16:Int16Array,Uint16:Uint16Array,Int32:Int32Array,Uint32:Uint32Array,Float32:Float32Array},Ln=function(t,e){this._structArray=t,this._pos1=e*this.size,this._pos2=this._pos1/2,this._pos4=this._pos1/4,this._pos8=this._pos1/8;},On=function(){this.isTransferred=!1,this.capacity=-1,this.resize(0);};function Dn(t,e){void 0===e&&(e=1);var r=0,n=0;return {members:t.map(function(t){var i,a=(i=t.type,Fn[i].BYTES_PER_ELEMENT),o=r=Un(r,Math.max(e,a)),s=t.components||1;return n=Math.max(n,a),r+=a*s,{name:t.name,type:t.type,components:s,offset:o}}),size:Un(r,Math.max(n,e)),alignment:e}}function Un(t,e){return Math.ceil(t/e)*e}On.serialize=function(t,e){return t._trim(),e&&(t.isTransferred=!0,e.push(t.arrayBuffer)),{length:t.length,arrayBuffer:t.arrayBuffer}},On.deserialize=function(t){var e=Object.create(this.prototype);return e.arrayBuffer=t.arrayBuffer,e.length=t.length,e.capacity=t.arrayBuffer.byteLength/e.bytesPerElement,e._refreshViews(),e},On.prototype._trim=function(){this.length!==this.capacity&&(this.capacity=this.length,this.arrayBuffer=this.arrayBuffer.slice(0,this.length*this.bytesPerElement),this._refreshViews());},On.prototype.clear=function(){this.length=0;},On.prototype.resize=function(t){this.reserve(t),this.length=t;},On.prototype.reserve=function(t){if(t>this.capacity){this.capacity=Math.max(t,Math.floor(5*this.capacity),128),this.arrayBuffer=new ArrayBuffer(this.capacity*this.bytesPerElement);var e=this.uint8;this._refreshViews(),e&&this.uint8.set(e);}},On.prototype._refreshViews=function(){throw new Error("_refreshViews() must be implemented by each concrete StructArray layout")};var jn=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype._refreshViews=function(){this.uint8=new Uint8Array(this.arrayBuffer),this.int16=new Int16Array(this.arrayBuffer);},e.prototype.emplaceBack=function(t,e){var r=this.length;return this.resize(r+1),this.emplace(r,t,e)},e.prototype.emplace=function(t,e,r){var n=2*t;return this.int16[n+0]=e,this.int16[n+1]=r,t},e}(On);jn.prototype.bytesPerElement=4,en("StructArrayLayout2i4",jn);var qn=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype._refreshViews=function(){this.uint8=new Uint8Array(this.arrayBuffer),this.int16=new Int16Array(this.arrayBuffer);},e.prototype.emplaceBack=function(t,e,r,n){var i=this.length;return this.resize(i+1),this.emplace(i,t,e,r,n)},e.prototype.emplace=function(t,e,r,n,i){var a=4*t;return this.int16[a+0]=e,this.int16[a+1]=r,this.int16[a+2]=n,this.int16[a+3]=i,t},e}(On);qn.prototype.bytesPerElement=8,en("StructArrayLayout4i8",qn);var Rn=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype._refreshViews=function(){this.uint8=new Uint8Array(this.arrayBuffer),this.int16=new Int16Array(this.arrayBuffer);},e.prototype.emplaceBack=function(t,e,r,n,i,a){var o=this.length;return this.resize(o+1),this.emplace(o,t,e,r,n,i,a)},e.prototype.emplace=function(t,e,r,n,i,a,o){var s=6*t;return this.int16[s+0]=e,this.int16[s+1]=r,this.int16[s+2]=n,this.int16[s+3]=i,this.int16[s+4]=a,this.int16[s+5]=o,t},e}(On);Rn.prototype.bytesPerElement=12,en("StructArrayLayout2i4i12",Rn);var Nn=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype._refreshViews=function(){this.uint8=new Uint8Array(this.arrayBuffer),this.int16=new Int16Array(this.arrayBuffer);},e.prototype.emplaceBack=function(t,e,r,n,i,a,o,s){var u=this.length;return this.resize(u+1),this.emplace(u,t,e,r,n,i,a,o,s)},e.prototype.emplace=function(t,e,r,n,i,a,o,s,u){var p=6*t,l=12*t;return this.int16[p+0]=e,this.int16[p+1]=r,this.int16[p+2]=n,this.int16[p+3]=i,this.uint8[l+8]=a,this.uint8[l+9]=o,this.uint8[l+10]=s,this.uint8[l+11]=u,t},e}(On);Nn.prototype.bytesPerElement=12,en("StructArrayLayout4i4ub12",Nn);var Gn=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype._refreshViews=function(){this.uint8=new Uint8Array(this.arrayBuffer),this.uint16=new Uint16Array(this.arrayBuffer);},e.prototype.emplaceBack=function(t,e,r,n,i,a,o,s){var u=this.length;return this.resize(u+1),this.emplace(u,t,e,r,n,i,a,o,s)},e.prototype.emplace=function(t,e,r,n,i,a,o,s,u){var p=8*t;return this.uint16[p+0]=e,this.uint16[p+1]=r,this.uint16[p+2]=n,this.uint16[p+3]=i,this.uint16[p+4]=a,this.uint16[p+5]=o,this.uint16[p+6]=s,this.uint16[p+7]=u,t},e}(On);Gn.prototype.bytesPerElement=16,en("StructArrayLayout8ui16",Gn);var Zn=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype._refreshViews=function(){this.uint8=new Uint8Array(this.arrayBuffer),this.int16=new Int16Array(this.arrayBuffer),this.uint16=new Uint16Array(this.arrayBuffer);},e.prototype.emplaceBack=function(t,e,r,n,i,a,o,s){var u=this.length;return this.resize(u+1),this.emplace(u,t,e,r,n,i,a,o,s)},e.prototype.emplace=function(t,e,r,n,i,a,o,s,u){var p=8*t;return this.int16[p+0]=e,this.int16[p+1]=r,this.int16[p+2]=n,this.int16[p+3]=i,this.uint16[p+4]=a,this.uint16[p+5]=o,this.uint16[p+6]=s,this.uint16[p+7]=u,t},e}(On);Zn.prototype.bytesPerElement=16,en("StructArrayLayout4i4ui16",Zn);var Xn=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype._refreshViews=function(){this.uint8=new Uint8Array(this.arrayBuffer),this.float32=new Float32Array(this.arrayBuffer);},e.prototype.emplaceBack=function(t,e,r){var n=this.length;return this.resize(n+1),this.emplace(n,t,e,r)},e.prototype.emplace=function(t,e,r,n){var i=3*t;return this.float32[i+0]=e,this.float32[i+1]=r,this.float32[i+2]=n,t},e}(On);Xn.prototype.bytesPerElement=12,en("StructArrayLayout3f12",Xn);var Kn=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype._refreshViews=function(){this.uint8=new Uint8Array(this.arrayBuffer),this.uint32=new Uint32Array(this.arrayBuffer);},e.prototype.emplaceBack=function(t){var e=this.length;return this.resize(e+1),this.emplace(e,t)},e.prototype.emplace=function(t,e){var r=1*t;return this.uint32[r+0]=e,t},e}(On);Kn.prototype.bytesPerElement=4,en("StructArrayLayout1ul4",Kn);var Hn=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype._refreshViews=function(){this.uint8=new Uint8Array(this.arrayBuffer),this.int16=new Int16Array(this.arrayBuffer),this.uint32=new Uint32Array(this.arrayBuffer),this.uint16=new Uint16Array(this.arrayBuffer);},e.prototype.emplaceBack=function(t,e,r,n,i,a,o,s,u,p,l){var c=this.length;return this.resize(c+1),this.emplace(c,t,e,r,n,i,a,o,s,u,p,l)},e.prototype.emplace=function(t,e,r,n,i,a,o,s,u,p,l,c){var h=12*t,f=6*t;return this.int16[h+0]=e,this.int16[h+1]=r,this.int16[h+2]=n,this.int16[h+3]=i,this.int16[h+4]=a,this.int16[h+5]=o,this.uint32[f+3]=s,this.uint16[h+8]=u,this.uint16[h+9]=p,this.int16[h+10]=l,this.int16[h+11]=c,t},e}(On);Hn.prototype.bytesPerElement=24,en("StructArrayLayout6i1ul2ui2i24",Hn);var Jn=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype._refreshViews=function(){this.uint8=new Uint8Array(this.arrayBuffer),this.int16=new Int16Array(this.arrayBuffer);},e.prototype.emplaceBack=function(t,e,r,n,i,a){var o=this.length;return this.resize(o+1),this.emplace(o,t,e,r,n,i,a)},e.prototype.emplace=function(t,e,r,n,i,a,o){var s=6*t;return this.int16[s+0]=e,this.int16[s+1]=r,this.int16[s+2]=n,this.int16[s+3]=i,this.int16[s+4]=a,this.int16[s+5]=o,t},e}(On);Jn.prototype.bytesPerElement=12,en("StructArrayLayout2i2i2i12",Jn);var Yn=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype._refreshViews=function(){this.uint8=new Uint8Array(this.arrayBuffer);},e.prototype.emplaceBack=function(t,e){var r=this.length;return this.resize(r+1),this.emplace(r,t,e)},e.prototype.emplace=function(t,e,r){var n=4*t;return this.uint8[n+0]=e,this.uint8[n+1]=r,t},e}(On);Yn.prototype.bytesPerElement=4,en("StructArrayLayout2ub4",Yn);var $n=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype._refreshViews=function(){this.uint8=new Uint8Array(this.arrayBuffer),this.int16=new Int16Array(this.arrayBuffer),this.uint16=new Uint16Array(this.arrayBuffer),this.uint32=new Uint32Array(this.arrayBuffer),this.float32=new Float32Array(this.arrayBuffer);},e.prototype.emplaceBack=function(t,e,r,n,i,a,o,s,u,p,l,c,h,f){var y=this.length;return this.resize(y+1),this.emplace(y,t,e,r,n,i,a,o,s,u,p,l,c,h,f)},e.prototype.emplace=function(t,e,r,n,i,a,o,s,u,p,l,c,h,f,y){var d=20*t,m=10*t,v=40*t;return this.int16[d+0]=e,this.int16[d+1]=r,this.uint16[d+2]=n,this.uint16[d+3]=i,this.uint32[m+2]=a,this.uint32[m+3]=o,this.uint32[m+4]=s,this.uint16[d+10]=u,this.uint16[d+11]=p,this.uint16[d+12]=l,this.float32[m+7]=c,this.float32[m+8]=h,this.uint8[v+36]=f,this.uint8[v+37]=y,t},e}(On);$n.prototype.bytesPerElement=40,en("StructArrayLayout2i2ui3ul3ui2f2ub40",$n);var Wn=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype._refreshViews=function(){this.uint8=new Uint8Array(this.arrayBuffer),this.int16=new Int16Array(this.arrayBuffer),this.uint16=new Uint16Array(this.arrayBuffer),this.uint32=new Uint32Array(this.arrayBuffer);},e.prototype.emplaceBack=function(t,e,r,n,i,a,o,s,u,p,l,c,h,f){var y=this.length;return this.resize(y+1),this.emplace(y,t,e,r,n,i,a,o,s,u,p,l,c,h,f)},e.prototype.emplace=function(t,e,r,n,i,a,o,s,u,p,l,c,h,f,y){var d=16*t,m=8*t;return this.int16[d+0]=e,this.int16[d+1]=r,this.int16[d+2]=n,this.int16[d+3]=i,this.uint16[d+4]=a,this.uint16[d+5]=o,this.uint16[d+6]=s,this.uint16[d+7]=u,this.uint16[d+8]=p,this.uint16[d+9]=l,this.uint16[d+10]=c,this.uint16[d+11]=h,this.uint16[d+12]=f,this.uint32[m+7]=y,t},e}(On);Wn.prototype.bytesPerElement=32,en("StructArrayLayout4i9ui1ul32",Wn);var Qn=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype._refreshViews=function(){this.uint8=new Uint8Array(this.arrayBuffer),this.float32=new Float32Array(this.arrayBuffer);},e.prototype.emplaceBack=function(t){var e=this.length;return this.resize(e+1),this.emplace(e,t)},e.prototype.emplace=function(t,e){var r=1*t;return this.float32[r+0]=e,t},e}(On);Qn.prototype.bytesPerElement=4,en("StructArrayLayout1f4",Qn);var ti=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype._refreshViews=function(){this.uint8=new Uint8Array(this.arrayBuffer),this.int16=new Int16Array(this.arrayBuffer);},e.prototype.emplaceBack=function(t,e,r){var n=this.length;return this.resize(n+1),this.emplace(n,t,e,r)},e.prototype.emplace=function(t,e,r,n){var i=3*t;return this.int16[i+0]=e,this.int16[i+1]=r,this.int16[i+2]=n,t},e}(On);ti.prototype.bytesPerElement=6,en("StructArrayLayout3i6",ti);var ei=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype._refreshViews=function(){this.uint8=new Uint8Array(this.arrayBuffer),this.uint32=new Uint32Array(this.arrayBuffer),this.uint16=new Uint16Array(this.arrayBuffer);},e.prototype.emplaceBack=function(t,e,r){var n=this.length;return this.resize(n+1),this.emplace(n,t,e,r)},e.prototype.emplace=function(t,e,r,n){var i=2*t,a=4*t;return this.uint32[i+0]=e,this.uint16[a+2]=r,this.uint16[a+3]=n,t},e}(On);ei.prototype.bytesPerElement=8,en("StructArrayLayout1ul2ui8",ei);var ri=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype._refreshViews=function(){this.uint8=new Uint8Array(this.arrayBuffer),this.uint16=new Uint16Array(this.arrayBuffer);},e.prototype.emplaceBack=function(t,e,r){var n=this.length;return this.resize(n+1),this.emplace(n,t,e,r)},e.prototype.emplace=function(t,e,r,n){var i=3*t;return this.uint16[i+0]=e,this.uint16[i+1]=r,this.uint16[i+2]=n,t},e}(On);ri.prototype.bytesPerElement=6,en("StructArrayLayout3ui6",ri);var ni=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype._refreshViews=function(){this.uint8=new Uint8Array(this.arrayBuffer),this.uint16=new Uint16Array(this.arrayBuffer);},e.prototype.emplaceBack=function(t,e){var r=this.length;return this.resize(r+1),this.emplace(r,t,e)},e.prototype.emplace=function(t,e,r){var n=2*t;return this.uint16[n+0]=e,this.uint16[n+1]=r,t},e}(On);ni.prototype.bytesPerElement=4,en("StructArrayLayout2ui4",ni);var ii=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype._refreshViews=function(){this.uint8=new Uint8Array(this.arrayBuffer),this.uint16=new Uint16Array(this.arrayBuffer);},e.prototype.emplaceBack=function(t){var e=this.length;return this.resize(e+1),this.emplace(e,t)},e.prototype.emplace=function(t,e){var r=1*t;return this.uint16[r+0]=e,t},e}(On);ii.prototype.bytesPerElement=2,en("StructArrayLayout1ui2",ii);var ai=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype._refreshViews=function(){this.uint8=new Uint8Array(this.arrayBuffer),this.float32=new Float32Array(this.arrayBuffer);},e.prototype.emplaceBack=function(t,e){var r=this.length;return this.resize(r+1),this.emplace(r,t,e)},e.prototype.emplace=function(t,e,r){var n=2*t;return this.float32[n+0]=e,this.float32[n+1]=r,t},e}(On);ai.prototype.bytesPerElement=8,en("StructArrayLayout2f8",ai);var oi=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype._refreshViews=function(){this.uint8=new Uint8Array(this.arrayBuffer),this.float32=new Float32Array(this.arrayBuffer);},e.prototype.emplaceBack=function(t,e,r,n){var i=this.length;return this.resize(i+1),this.emplace(i,t,e,r,n)},e.prototype.emplace=function(t,e,r,n,i){var a=4*t;return this.float32[a+0]=e,this.float32[a+1]=r,this.float32[a+2]=n,this.float32[a+3]=i,t},e}(On);oi.prototype.bytesPerElement=16,en("StructArrayLayout4f16",oi);var si=function(t){function e(){t.apply(this,arguments);}t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e;var r={anchorPointX:{configurable:!0},anchorPointY:{configurable:!0},x1:{configurable:!0},y1:{configurable:!0},x2:{configurable:!0},y2:{configurable:!0},featureIndex:{configurable:!0},sourceLayerIndex:{configurable:!0},bucketIndex:{configurable:!0},radius:{configurable:!0},signedDistanceFromAnchor:{configurable:!0},anchorPoint:{configurable:!0}};return r.anchorPointX.get=function(){return this._structArray.int16[this._pos2+0]},r.anchorPointX.set=function(t){this._structArray.int16[this._pos2+0]=t;},r.anchorPointY.get=function(){return this._structArray.int16[this._pos2+1]},r.anchorPointY.set=function(t){this._structArray.int16[this._pos2+1]=t;},r.x1.get=function(){return this._structArray.int16[this._pos2+2]},r.x1.set=function(t){this._structArray.int16[this._pos2+2]=t;},r.y1.get=function(){return this._structArray.int16[this._pos2+3]},r.y1.set=function(t){this._structArray.int16[this._pos2+3]=t;},r.x2.get=function(){return this._structArray.int16[this._pos2+4]},r.x2.set=function(t){this._structArray.int16[this._pos2+4]=t;},r.y2.get=function(){return this._structArray.int16[this._pos2+5]},r.y2.set=function(t){this._structArray.int16[this._pos2+5]=t;},r.featureIndex.get=function(){return this._structArray.uint32[this._pos4+3]},r.featureIndex.set=function(t){this._structArray.uint32[this._pos4+3]=t;},r.sourceLayerIndex.get=function(){return this._structArray.uint16[this._pos2+8]},r.sourceLayerIndex.set=function(t){this._structArray.uint16[this._pos2+8]=t;},r.bucketIndex.get=function(){return this._structArray.uint16[this._pos2+9]},r.bucketIndex.set=function(t){this._structArray.uint16[this._pos2+9]=t;},r.radius.get=function(){return this._structArray.int16[this._pos2+10]},r.radius.set=function(t){this._structArray.int16[this._pos2+10]=t;},r.signedDistanceFromAnchor.get=function(){return this._structArray.int16[this._pos2+11]},r.signedDistanceFromAnchor.set=function(t){this._structArray.int16[this._pos2+11]=t;},r.anchorPoint.get=function(){return new i(this.anchorPointX,this.anchorPointY)},Object.defineProperties(e.prototype,r),e}(Ln);si.prototype.size=24;var ui=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.get=function(t){return new si(this,t)},e}(Hn);en("CollisionBoxArray",ui);var pi=function(t){function e(){t.apply(this,arguments);}t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e;var r={anchorX:{configurable:!0},anchorY:{configurable:!0},glyphStartIndex:{configurable:!0},numGlyphs:{configurable:!0},vertexStartIndex:{configurable:!0},lineStartIndex:{configurable:!0},lineLength:{configurable:!0},segment:{configurable:!0},lowerSize:{configurable:!0},upperSize:{configurable:!0},lineOffsetX:{configurable:!0},lineOffsetY:{configurable:!0},writingMode:{configurable:!0},hidden:{configurable:!0}};return r.anchorX.get=function(){return this._structArray.int16[this._pos2+0]},r.anchorX.set=function(t){this._structArray.int16[this._pos2+0]=t;},r.anchorY.get=function(){return this._structArray.int16[this._pos2+1]},r.anchorY.set=function(t){this._structArray.int16[this._pos2+1]=t;},r.glyphStartIndex.get=function(){return this._structArray.uint16[this._pos2+2]},r.glyphStartIndex.set=function(t){this._structArray.uint16[this._pos2+2]=t;},r.numGlyphs.get=function(){return this._structArray.uint16[this._pos2+3]},r.numGlyphs.set=function(t){this._structArray.uint16[this._pos2+3]=t;},r.vertexStartIndex.get=function(){return this._structArray.uint32[this._pos4+2]},r.vertexStartIndex.set=function(t){this._structArray.uint32[this._pos4+2]=t;},r.lineStartIndex.get=function(){return this._structArray.uint32[this._pos4+3]},r.lineStartIndex.set=function(t){this._structArray.uint32[this._pos4+3]=t;},r.lineLength.get=function(){return this._structArray.uint32[this._pos4+4]},r.lineLength.set=function(t){this._structArray.uint32[this._pos4+4]=t;},r.segment.get=function(){return this._structArray.uint16[this._pos2+10]},r.segment.set=function(t){this._structArray.uint16[this._pos2+10]=t;},r.lowerSize.get=function(){return this._structArray.uint16[this._pos2+11]},r.lowerSize.set=function(t){this._structArray.uint16[this._pos2+11]=t;},r.upperSize.get=function(){return this._structArray.uint16[this._pos2+12]},r.upperSize.set=function(t){this._structArray.uint16[this._pos2+12]=t;},r.lineOffsetX.get=function(){return this._structArray.float32[this._pos4+7]},r.lineOffsetX.set=function(t){this._structArray.float32[this._pos4+7]=t;},r.lineOffsetY.get=function(){return this._structArray.float32[this._pos4+8]},r.lineOffsetY.set=function(t){this._structArray.float32[this._pos4+8]=t;},r.writingMode.get=function(){return this._structArray.uint8[this._pos1+36]},r.writingMode.set=function(t){this._structArray.uint8[this._pos1+36]=t;},r.hidden.get=function(){return this._structArray.uint8[this._pos1+37]},r.hidden.set=function(t){this._structArray.uint8[this._pos1+37]=t;},Object.defineProperties(e.prototype,r),e}(Ln);pi.prototype.size=40;var li=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.get=function(t){return new pi(this,t)},e}($n);en("PlacedSymbolArray",li);var ci=function(t){function e(){t.apply(this,arguments);}t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e;var r={anchorX:{configurable:!0},anchorY:{configurable:!0},horizontalPlacedTextSymbolIndex:{configurable:!0},verticalPlacedTextSymbolIndex:{configurable:!0},key:{configurable:!0},textBoxStartIndex:{configurable:!0},textBoxEndIndex:{configurable:!0},iconBoxStartIndex:{configurable:!0},iconBoxEndIndex:{configurable:!0},featureIndex:{configurable:!0},numGlyphVertices:{configurable:!0},numVerticalGlyphVertices:{configurable:!0},numIconVertices:{configurable:!0},crossTileID:{configurable:!0}};return r.anchorX.get=function(){return this._structArray.int16[this._pos2+0]},r.anchorX.set=function(t){this._structArray.int16[this._pos2+0]=t;},r.anchorY.get=function(){return this._structArray.int16[this._pos2+1]},r.anchorY.set=function(t){this._structArray.int16[this._pos2+1]=t;},r.horizontalPlacedTextSymbolIndex.get=function(){return this._structArray.int16[this._pos2+2]},r.horizontalPlacedTextSymbolIndex.set=function(t){this._structArray.int16[this._pos2+2]=t;},r.verticalPlacedTextSymbolIndex.get=function(){return this._structArray.int16[this._pos2+3]},r.verticalPlacedTextSymbolIndex.set=function(t){this._structArray.int16[this._pos2+3]=t;},r.key.get=function(){return this._structArray.uint16[this._pos2+4]},r.key.set=function(t){this._structArray.uint16[this._pos2+4]=t;},r.textBoxStartIndex.get=function(){return this._structArray.uint16[this._pos2+5]},r.textBoxStartIndex.set=function(t){this._structArray.uint16[this._pos2+5]=t;},r.textBoxEndIndex.get=function(){return this._structArray.uint16[this._pos2+6]},r.textBoxEndIndex.set=function(t){this._structArray.uint16[this._pos2+6]=t;},r.iconBoxStartIndex.get=function(){return this._structArray.uint16[this._pos2+7]},r.iconBoxStartIndex.set=function(t){this._structArray.uint16[this._pos2+7]=t;},r.iconBoxEndIndex.get=function(){return this._structArray.uint16[this._pos2+8]},r.iconBoxEndIndex.set=function(t){this._structArray.uint16[this._pos2+8]=t;},r.featureIndex.get=function(){return this._structArray.uint16[this._pos2+9]},r.featureIndex.set=function(t){this._structArray.uint16[this._pos2+9]=t;},r.numGlyphVertices.get=function(){return this._structArray.uint16[this._pos2+10]},r.numGlyphVertices.set=function(t){this._structArray.uint16[this._pos2+10]=t;},r.numVerticalGlyphVertices.get=function(){return this._structArray.uint16[this._pos2+11]},r.numVerticalGlyphVertices.set=function(t){this._structArray.uint16[this._pos2+11]=t;},r.numIconVertices.get=function(){return this._structArray.uint16[this._pos2+12]},r.numIconVertices.set=function(t){this._structArray.uint16[this._pos2+12]=t;},r.crossTileID.get=function(){return this._structArray.uint32[this._pos4+7]},r.crossTileID.set=function(t){this._structArray.uint32[this._pos4+7]=t;},Object.defineProperties(e.prototype,r),e}(Ln);ci.prototype.size=32;var hi=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.get=function(t){return new ci(this,t)},e}(Wn);en("SymbolInstanceArray",hi);var fi=function(t){function e(){t.apply(this,arguments);}t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e;var r={offsetX:{configurable:!0}};return r.offsetX.get=function(){return this._structArray.float32[this._pos4+0]},r.offsetX.set=function(t){this._structArray.float32[this._pos4+0]=t;},Object.defineProperties(e.prototype,r),e}(Ln);fi.prototype.size=4;var yi=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.getoffsetX=function(t){return this.float32[1*t+0]},e.prototype.get=function(t){return new fi(this,t)},e}(Qn);en("GlyphOffsetArray",yi);var di=function(t){function e(){t.apply(this,arguments);}t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e;var r={x:{configurable:!0},y:{configurable:!0},tileUnitDistanceFromAnchor:{configurable:!0}};return r.x.get=function(){return this._structArray.int16[this._pos2+0]},r.x.set=function(t){this._structArray.int16[this._pos2+0]=t;},r.y.get=function(){return this._structArray.int16[this._pos2+1]},r.y.set=function(t){this._structArray.int16[this._pos2+1]=t;},r.tileUnitDistanceFromAnchor.get=function(){return this._structArray.int16[this._pos2+2]},r.tileUnitDistanceFromAnchor.set=function(t){this._structArray.int16[this._pos2+2]=t;},Object.defineProperties(e.prototype,r),e}(Ln);di.prototype.size=6;var mi=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.getx=function(t){return this.int16[3*t+0]},e.prototype.gety=function(t){return this.int16[3*t+1]},e.prototype.gettileUnitDistanceFromAnchor=function(t){return this.int16[3*t+2]},e.prototype.get=function(t){return new di(this,t)},e}(ti);en("SymbolLineVertexArray",mi);var vi=function(t){function e(){t.apply(this,arguments);}t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e;var r={featureIndex:{configurable:!0},sourceLayerIndex:{configurable:!0},bucketIndex:{configurable:!0}};return r.featureIndex.get=function(){return this._structArray.uint32[this._pos4+0]},r.featureIndex.set=function(t){this._structArray.uint32[this._pos4+0]=t;},r.sourceLayerIndex.get=function(){return this._structArray.uint16[this._pos2+2]},r.sourceLayerIndex.set=function(t){this._structArray.uint16[this._pos2+2]=t;},r.bucketIndex.get=function(){return this._structArray.uint16[this._pos2+3]},r.bucketIndex.set=function(t){this._structArray.uint16[this._pos2+3]=t;},Object.defineProperties(e.prototype,r),e}(Ln);vi.prototype.size=8;var gi=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.get=function(t){return new vi(this,t)},e}(ei);en("FeatureIndexArray",gi);var xi=Dn([{name:"a_pos",components:2,type:"Int16"}],4),bi=xi.members,_i=(xi.size,xi.alignment,function(t){void 0===t&&(t=[]),this.segments=t;});function wi(t,e){return 256*(t=p(Math.floor(t),0,255))+(e=p(Math.floor(e),0,255))}_i.prototype.prepareSegment=function(t,e,r){var n=this.segments[this.segments.length-1];return t>_i.MAX_VERTEX_ARRAY_LENGTH&&w("Max vertices per segment is "+_i.MAX_VERTEX_ARRAY_LENGTH+": bucket requested "+t),(!n||n.vertexLength+t>_i.MAX_VERTEX_ARRAY_LENGTH)&&(n={vertexOffset:e.length,primitiveOffset:r.length,vertexLength:0,primitiveLength:0},this.segments.push(n)),n},_i.prototype.get=function(){return this.segments},_i.prototype.destroy=function(){for(var t=0,e=this.segments;t<e.length;t+=1){var r=e[t];for(var n in r.vaos)r.vaos[n].destroy();}},_i.simpleSegment=function(t,e,r,n){return new _i([{vertexOffset:t,primitiveOffset:e,vertexLength:r,primitiveLength:n,vaos:{}}])},_i.MAX_VERTEX_ARRAY_LENGTH=Math.pow(2,16)-1,en("SegmentVector",_i);var Ai=function(){this.ids=[],this.positions=[],this.indexed=!1;};function ki(t,e,r){var n=t[e];t[e]=t[r],t[r]=n;}Ai.prototype.add=function(t,e,r,n){this.ids.push(t),this.positions.push(e,r,n);},Ai.prototype.getPositions=function(t){for(var e=0,r=this.ids.length-1;e<r;){var n=e+r>>1;this.ids[n]>=t?r=n:e=n+1;}for(var i=[];this.ids[e]===t;){var a=this.positions[3*e],o=this.positions[3*e+1],s=this.positions[3*e+2];i.push({index:a,start:o,end:s}),e++;}return i},Ai.serialize=function(t,e){var r=new Float64Array(t.ids),n=new Uint32Array(t.positions);return function t(e,r,n,i){if(n>=i)return;var a=e[n+i>>1];var o=n-1;var s=i+1;for(;;){do{o++;}while(e[o]<a);do{s--;}while(e[s]>a);if(o>=s)break;ki(e,o,s),ki(r,3*o,3*s),ki(r,3*o+1,3*s+1),ki(r,3*o+2,3*s+2);}t(e,r,n,s);t(e,r,s+1,i);}(r,n,0,r.length-1),e.push(r.buffer,n.buffer),{ids:r,positions:n}},Ai.deserialize=function(t){var e=new Ai;return e.ids=t.ids,e.positions=t.positions,e.indexed=!0,e},en("FeaturePositionMap",Ai);var Si=function(t,e){this.gl=t.gl,this.location=e;},zi=function(t){function e(e,r){t.call(this,e,r),this.current=0;}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.set=function(t){this.current!==t&&(this.current=t,this.gl.uniform1i(this.location,t));},e}(Si),Ii=function(t){function e(e,r){t.call(this,e,r),this.current=0;}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.set=function(t){this.current!==t&&(this.current=t,this.gl.uniform1f(this.location,t));},e}(Si),Bi=function(t){function e(e,r){t.call(this,e,r),this.current=[0,0];}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.set=function(t){t[0]===this.current[0]&&t[1]===this.current[1]||(this.current=t,this.gl.uniform2f(this.location,t[0],t[1]));},e}(Si),Ei=function(t){function e(e,r){t.call(this,e,r),this.current=[0,0,0];}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.set=function(t){t[0]===this.current[0]&&t[1]===this.current[1]&&t[2]===this.current[2]||(this.current=t,this.gl.uniform3f(this.location,t[0],t[1],t[2]));},e}(Si),Pi=function(t){function e(e,r){t.call(this,e,r),this.current=[0,0,0,0];}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.set=function(t){t[0]===this.current[0]&&t[1]===this.current[1]&&t[2]===this.current[2]&&t[3]===this.current[3]||(this.current=t,this.gl.uniform4f(this.location,t[0],t[1],t[2],t[3]));},e}(Si),Vi=function(t){function e(e,r){t.call(this,e,r),this.current=Ft.transparent;}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.set=function(t){t.r===this.current.r&&t.g===this.current.g&&t.b===this.current.b&&t.a===this.current.a||(this.current=t,this.gl.uniform4f(this.location,t.r,t.g,t.b,t.a));},e}(Si),Mi=new Float32Array(16),Ci=function(t){function e(e,r){t.call(this,e,r),this.current=Mi;}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.set=function(t){if(t[12]!==this.current[12]||t[0]!==this.current[0])return this.current=t,void this.gl.uniformMatrix4fv(this.location,!1,t);for(var e=1;e<16;e++)if(t[e]!==this.current[e]){this.current=t,this.gl.uniformMatrix4fv(this.location,!1,t);break}},e}(Si);function Ti(t){return [wi(255*t.r,255*t.g),wi(255*t.b,255*t.a)]}var Fi=function(t,e,r){this.value=t,this.names=e,this.uniformNames=this.names.map(function(t){return "u_"+t}),this.type=r,this.maxValue=-1/0;};Fi.prototype.defines=function(){return this.names.map(function(t){return "#define HAS_UNIFORM_u_"+t})},Fi.prototype.setConstantPatternPositions=function(){},Fi.prototype.populatePaintArray=function(){},Fi.prototype.updatePaintArray=function(){},Fi.prototype.upload=function(){},Fi.prototype.destroy=function(){},Fi.prototype.setUniforms=function(t,e,r,n){e.set(n.constantOr(this.value));},Fi.prototype.getBinding=function(t,e){return "color"===this.type?new Vi(t,e):new Ii(t,e)},Fi.serialize=function(t){var e=t.value,r=t.names,n=t.type;return {value:nn(e),names:r,type:n}},Fi.deserialize=function(t){var e=t.value,r=t.names,n=t.type;return new Fi(an(e),r,n)};var Li=function(t,e,r){this.value=t,this.names=e,this.uniformNames=this.names.map(function(t){return "u_"+t}),this.type=r,this.maxValue=-1/0,this.patternPositions={patternTo:null,patternFrom:null};};Li.prototype.defines=function(){return this.names.map(function(t){return "#define HAS_UNIFORM_u_"+t})},Li.prototype.populatePaintArray=function(){},Li.prototype.updatePaintArray=function(){},Li.prototype.upload=function(){},Li.prototype.destroy=function(){},Li.prototype.setConstantPatternPositions=function(t,e){this.patternPositions.patternTo=t.tlbr,this.patternPositions.patternFrom=e.tlbr;},Li.prototype.setUniforms=function(t,e,r,n,i){var a=this.patternPositions;"u_pattern_to"===i&&a.patternTo&&e.set(a.patternTo),"u_pattern_from"===i&&a.patternFrom&&e.set(a.patternFrom);},Li.prototype.getBinding=function(t,e){return new Pi(t,e)};var Oi=function(t,e,r,n){this.expression=t,this.names=e,this.type=r,this.uniformNames=this.names.map(function(t){return "a_"+t}),this.maxValue=-1/0,this.paintVertexAttributes=e.map(function(t){return {name:"a_"+t,type:"Float32",components:"color"===r?2:1,offset:0}}),this.paintVertexArray=new n;};Oi.prototype.defines=function(){return []},Oi.prototype.setConstantPatternPositions=function(){},Oi.prototype.populatePaintArray=function(t,e){var r=this.paintVertexArray,n=r.length;r.reserve(t);var i=this.expression.evaluate(new xn(0),e,{});if("color"===this.type)for(var a=Ti(i),o=n;o<t;o++)r.emplaceBack(a[0],a[1]);else{for(var s=n;s<t;s++)r.emplaceBack(i);this.maxValue=Math.max(this.maxValue,i);}},Oi.prototype.updatePaintArray=function(t,e,r,n){var i=this.paintVertexArray,a=this.expression.evaluate({zoom:0},r,n);if("color"===this.type)for(var o=Ti(a),s=t;s<e;s++)i.emplace(s,o[0],o[1]);else{for(var u=t;u<e;u++)i.emplace(u,a);this.maxValue=Math.max(this.maxValue,a);}},Oi.prototype.upload=function(t){this.paintVertexArray&&this.paintVertexArray.arrayBuffer&&(this.paintVertexBuffer&&this.paintVertexBuffer.buffer?this.paintVertexBuffer.updateData(this.paintVertexArray):this.paintVertexBuffer=t.createVertexBuffer(this.paintVertexArray,this.paintVertexAttributes,this.expression.isStateDependent));},Oi.prototype.destroy=function(){this.paintVertexBuffer&&this.paintVertexBuffer.destroy();},Oi.prototype.setUniforms=function(t,e){e.set(0);},Oi.prototype.getBinding=function(t,e){return new Ii(t,e)};var Di=function(t,e,r,n,i,a){this.expression=t,this.names=e,this.uniformNames=this.names.map(function(t){return "a_"+t+"_t"}),this.type=r,this.useIntegerZoom=n,this.zoom=i,this.maxValue=-1/0;var o=a;this.paintVertexAttributes=e.map(function(t){return {name:"a_"+t,type:"Float32",components:"color"===r?4:2,offset:0}}),this.paintVertexArray=new o;};Di.prototype.defines=function(){return []},Di.prototype.setConstantPatternPositions=function(){},Di.prototype.populatePaintArray=function(t,e){var r=this.paintVertexArray,n=r.length;r.reserve(t);var i=this.expression.evaluate(new xn(this.zoom),e,{}),a=this.expression.evaluate(new xn(this.zoom+1),e,{});if("color"===this.type)for(var o=Ti(i),s=Ti(a),u=n;u<t;u++)r.emplaceBack(o[0],o[1],s[0],s[1]);else{for(var p=n;p<t;p++)r.emplaceBack(i,a);this.maxValue=Math.max(this.maxValue,i,a);}},Di.prototype.updatePaintArray=function(t,e,r,n){var i=this.paintVertexArray,a=this.expression.evaluate({zoom:this.zoom},r,n),o=this.expression.evaluate({zoom:this.zoom+1},r,n);if("color"===this.type)for(var s=Ti(a),u=Ti(o),p=t;p<e;p++)i.emplace(p,s[0],s[1],u[0],u[1]);else{for(var l=t;l<e;l++)i.emplace(l,a,o);this.maxValue=Math.max(this.maxValue,a,o);}},Di.prototype.upload=function(t){this.paintVertexArray&&this.paintVertexArray.arrayBuffer&&(this.paintVertexBuffer&&this.paintVertexBuffer.buffer?this.paintVertexBuffer.updateData(this.paintVertexArray):this.paintVertexBuffer=t.createVertexBuffer(this.paintVertexArray,this.paintVertexAttributes,this.expression.isStateDependent));},Di.prototype.destroy=function(){this.paintVertexBuffer&&this.paintVertexBuffer.destroy();},Di.prototype.interpolationFactor=function(t){return this.useIntegerZoom?this.expression.interpolationFactor(Math.floor(t),this.zoom,this.zoom+1):this.expression.interpolationFactor(t,this.zoom,this.zoom+1)},Di.prototype.setUniforms=function(t,e,r){e.set(this.interpolationFactor(r.zoom));},Di.prototype.getBinding=function(t,e){return new Ii(t,e)};var Ui=function(t,e,r,n,i,a,o){this.expression=t,this.names=e,this.type=r,this.uniformNames=this.names.map(function(t){return "a_"+t+"_t"}),this.useIntegerZoom=n,this.zoom=i,this.maxValue=-1/0,this.layerId=o,this.paintVertexAttributes=e.map(function(t){return {name:"a_"+t,type:"Uint16",components:4,offset:0}}),this.zoomInPaintVertexArray=new a,this.zoomOutPaintVertexArray=new a;};Ui.prototype.defines=function(){return []},Ui.prototype.setConstantPatternPositions=function(){},Ui.prototype.populatePaintArray=function(t,e,r){var n=this.zoomInPaintVertexArray,i=this.zoomOutPaintVertexArray,a=this.layerId,o=n.length;if(n.reserve(t),i.reserve(t),r&&e.patterns&&e.patterns[a]){var s=e.patterns[a],u=s.min,p=s.mid,l=s.max,c=r[u],h=r[p],f=r[l];if(!c||!h||!f)return;for(var y=o;y<t;y++)n.emplaceBack(h.tl[0],h.tl[1],h.br[0],h.br[1],c.tl[0],c.tl[1],c.br[0],c.br[1]),i.emplaceBack(h.tl[0],h.tl[1],h.br[0],h.br[1],f.tl[0],f.tl[1],f.br[0],f.br[1]);}},Ui.prototype.updatePaintArray=function(t,e,r,n,i){var a=this.zoomInPaintVertexArray,o=this.zoomOutPaintVertexArray,s=this.layerId;if(i&&r.patterns&&r.patterns[s]){var u=r.patterns[s],p=u.min,l=u.mid,c=u.max,h=i[p],f=i[l],y=i[c];if(!h||!f||!y)return;for(var d=t;d<e;d++)a.emplace(d,f.tl[0],f.tl[1],f.br[0],f.br[1],h.tl[0],h.tl[1],h.br[0],h.br[1]),o.emplace(d,f.tl[0],f.tl[1],f.br[0],f.br[1],y.tl[0],y.tl[1],y.br[0],y.br[1]);}},Ui.prototype.upload=function(t){this.zoomInPaintVertexArray&&this.zoomInPaintVertexArray.arrayBuffer&&this.zoomOutPaintVertexArray&&this.zoomOutPaintVertexArray.arrayBuffer&&(this.zoomInPaintVertexBuffer=t.createVertexBuffer(this.zoomInPaintVertexArray,this.paintVertexAttributes,this.expression.isStateDependent),this.zoomOutPaintVertexBuffer=t.createVertexBuffer(this.zoomOutPaintVertexArray,this.paintVertexAttributes,this.expression.isStateDependent));},Ui.prototype.destroy=function(){this.zoomOutPaintVertexBuffer&&this.zoomOutPaintVertexBuffer.destroy(),this.zoomInPaintVertexBuffer&&this.zoomInPaintVertexBuffer.destroy();},Ui.prototype.setUniforms=function(t,e){e.set(0);},Ui.prototype.getBinding=function(t,e){return new Ii(t,e)};var ji=function(){this.binders={},this.cacheKey="",this._buffers=[],this._featureMap=new Ai,this._bufferOffset=0;};ji.createDynamic=function(t,e,r){var n=new ji,i=[];for(var a in t.paint._values)if(r(a)){var o=t.paint.get(a);if(o instanceof zn&&Ye(o.property.specification)){var s=Ri(a,t.type),u=o.property.specification.type,p=o.property.useIntegerZoom;if("cross-faded"===o.property.specification["property-type"]||"cross-faded-data-driven"===o.property.specification["property-type"])if("constant"===o.value.kind)n.binders[a]=new Li(o.value.value,s,u),i.push("/u_"+a);else{var l=Ni(a,u,"source");n.binders[a]=new Ui(o.value,s,u,p,e,l,t.id),i.push("/a_"+a);}else if("constant"===o.value.kind)n.binders[a]=new Fi(o.value.value,s,u),i.push("/u_"+a);else if("source"===o.value.kind){var c=Ni(a,u,"source");n.binders[a]=new Oi(o.value,s,u,c),i.push("/a_"+a);}else{var h=Ni(a,u,"composite");n.binders[a]=new Di(o.value,s,u,p,e,h),i.push("/z_"+a);}}}return n.cacheKey=i.sort().join(""),n},ji.prototype.populatePaintArrays=function(t,e,r,n){for(var i in this.binders){this.binders[i].populatePaintArray(t,e,n);}void 0!==e.id&&this._featureMap.add(+e.id,r,this._bufferOffset,t),this._bufferOffset=t;},ji.prototype.setConstantPatternPositions=function(t,e){for(var r in this.binders){this.binders[r].setConstantPatternPositions(t,e);}},ji.prototype.updatePaintArrays=function(t,e,r,n){var i=!1;for(var a in t)for(var o=0,s=this._featureMap.getPositions(+a);o<s.length;o+=1){var u=s[o],p=e.feature(u.index);for(var l in this.binders){var c=this.binders[l];if(!(c instanceof Fi||c instanceof Li)&&!0===c.expression.isStateDependent){var h=r.paint.get(l);c.expression=h.value,c.updatePaintArray(u.start,u.end,p,t[a],n),i=!0;}}}return i},ji.prototype.defines=function(){var t=[];for(var e in this.binders)t.push.apply(t,this.binders[e].defines());return t},ji.prototype.getPaintVertexBuffers=function(){return this._buffers},ji.prototype.getUniforms=function(t,e){var r={};for(var n in this.binders)for(var i=this.binders[n],a=0,o=i.uniformNames;a<o.length;a+=1){var s=o[a];r[s]=i.getBinding(t,e[s]);}return r},ji.prototype.setUniforms=function(t,e,r,n){for(var i in this.binders)for(var a=this.binders[i],o=0,s=a.uniformNames;o<s.length;o+=1){var u=s[o];a.setUniforms(t,e[u],n,r.get(i),u);}},ji.prototype.updatePatternPaintBuffers=function(t){var e=[];for(var r in this.binders){var n=this.binders[r];if(n instanceof Ui){var i=2===t.fromScale?n.zoomInPaintVertexBuffer:n.zoomOutPaintVertexBuffer;i&&e.push(i);}else(n instanceof Oi||n instanceof Di)&&n.paintVertexBuffer&&e.push(n.paintVertexBuffer);}this._buffers=e;},ji.prototype.upload=function(t){for(var e in this.binders)this.binders[e].upload(t);var r=[];for(var n in this.binders){var i=this.binders[n];(i instanceof Oi||i instanceof Di)&&i.paintVertexBuffer&&r.push(i.paintVertexBuffer);}this._buffers=r;},ji.prototype.destroy=function(){for(var t in this.binders)this.binders[t].destroy();};var qi=function(t,e,r,n){void 0===n&&(n=function(){return !0}),this.programConfigurations={};for(var i=0,a=e;i<a.length;i+=1){var o=a[i];this.programConfigurations[o.id]=ji.createDynamic(o,r,n),this.programConfigurations[o.id].layoutAttributes=t;}this.needsUpload=!1;};function Ri(t,e){return {"text-opacity":["opacity"],"icon-opacity":["opacity"],"text-color":["fill_color"],"icon-color":["fill_color"],"text-halo-color":["halo_color"],"icon-halo-color":["halo_color"],"text-halo-blur":["halo_blur"],"icon-halo-blur":["halo_blur"],"text-halo-width":["halo_width"],"icon-halo-width":["halo_width"],"line-gap-width":["gapwidth"],"line-pattern":["pattern_to","pattern_from"],"fill-pattern":["pattern_to","pattern_from"],"fill-extrusion-pattern":["pattern_to","pattern_from"]}[t]||[t.replace(e+"-","").replace(/-/g,"_")]}function Ni(t,e,r){var n={color:{source:ai,composite:oi},number:{source:Qn,composite:ai}},i=function(t){return {"line-pattern":{source:Gn,composite:Gn},"fill-pattern":{source:Gn,composite:Gn},"fill-extrusion-pattern":{source:Gn,composite:Gn}}[t]}(t);return i&&i[r]||n[e][r]}qi.prototype.populatePaintArrays=function(t,e,r,n){for(var i in this.programConfigurations)this.programConfigurations[i].populatePaintArrays(t,e,r,n);this.needsUpload=!0;},qi.prototype.updatePaintArrays=function(t,e,r,n){for(var i=0,a=r;i<a.length;i+=1){var o=a[i];this.needsUpload=this.programConfigurations[o.id].updatePaintArrays(t,e,o,n)||this.needsUpload;}},qi.prototype.get=function(t){return this.programConfigurations[t]},qi.prototype.upload=function(t){if(this.needsUpload){for(var e in this.programConfigurations)this.programConfigurations[e].upload(t);this.needsUpload=!1;}},qi.prototype.destroy=function(){for(var t in this.programConfigurations)this.programConfigurations[t].destroy();},en("ConstantBinder",Fi),en("CrossFadedConstantBinder",Li),en("SourceExpressionBinder",Oi),en("CrossFadedCompositeBinder",Ui),en("CompositeExpressionBinder",Di),en("ProgramConfiguration",ji,{omit:["_buffers"]}),en("ProgramConfigurationSet",qi);var Gi=8192;var Zi,Xi=(Zi=16,{min:-1*Math.pow(2,Zi-1),max:Math.pow(2,Zi-1)-1});function Ki(t){for(var e=Gi/t.extent,r=t.loadGeometry(),n=0;n<r.length;n++)for(var i=r[n],a=0;a<i.length;a++){var o=i[a];o.x=Math.round(o.x*e),o.y=Math.round(o.y*e),(o.x<Xi.min||o.x>Xi.max||o.y<Xi.min||o.y>Xi.max)&&w("Geometry exceeds allowed extent, reduce your vector tile buffer size");}return r}function Hi(t,e,r,n,i){t.emplaceBack(2*e+(n+1)/2,2*r+(i+1)/2);}var Ji=function(t){this.zoom=t.zoom,this.overscaling=t.overscaling,this.layers=t.layers,this.layerIds=this.layers.map(function(t){return t.id}),this.index=t.index,this.hasPattern=!1,this.layoutVertexArray=new jn,this.indexArray=new ri,this.segments=new _i,this.programConfigurations=new qi(bi,t.layers,t.zoom);};function Yi(t,e,r){for(var n=0;n<t.length;n++){var i=t[n];if(aa(i,e))return !0;if(ra(e,i,r))return !0}return !1}function $i(t,e){if(1===t.length&&1===t[0].length)return ia(e,t[0][0]);for(var r=0;r<e.length;r++)for(var n=e[r],i=0;i<n.length;i++)if(ia(t,n[i]))return !0;for(var a=0;a<t.length;a++){for(var o=t[a],s=0;s<o.length;s++)if(ia(e,o[s]))return !0;for(var u=0;u<e.length;u++)if(ta(o,e[u]))return !0}return !1}function Wi(t,e,r){for(var n=0;n<e.length;n++)for(var i=e[n],a=0;a<t.length;a++){var o=t[a];if(o.length>=3)for(var s=0;s<i.length;s++)if(aa(o,i[s]))return !0;if(Qi(o,i,r))return !0}return !1}function Qi(t,e,r){if(t.length>1){if(ta(t,e))return !0;for(var n=0;n<e.length;n++)if(ra(e[n],t,r))return !0}for(var i=0;i<t.length;i++)if(ra(t[i],e,r))return !0;return !1}function ta(t,e){if(0===t.length||0===e.length)return !1;for(var r=0;r<t.length-1;r++)for(var n=t[r],i=t[r+1],a=0;a<e.length-1;a++){if(ea(n,i,e[a],e[a+1]))return !0}return !1}function ea(t,e,r,n){return A(t,r,n)!==A(e,r,n)&&A(t,e,r)!==A(t,e,n)}function ra(t,e,r){var n=r*r;if(1===e.length)return t.distSqr(e[0])<n;for(var i=1;i<e.length;i++){if(na(t,e[i-1],e[i])<n)return !0}return !1}function na(t,e,r){var n=e.distSqr(r);if(0===n)return t.distSqr(e);var i=((t.x-e.x)*(r.x-e.x)+(t.y-e.y)*(r.y-e.y))/n;return i<0?t.distSqr(e):i>1?t.distSqr(r):t.distSqr(r.sub(e)._mult(i)._add(e))}function ia(t,e){for(var r,n,i,a=!1,o=0;o<t.length;o++)for(var s=0,u=(r=t[o]).length-1;s<r.length;u=s++)n=r[s],i=r[u],n.y>e.y!=i.y>e.y&&e.x<(i.x-n.x)*(e.y-n.y)/(i.y-n.y)+n.x&&(a=!a);return a}function aa(t,e){for(var r=!1,n=0,i=t.length-1;n<t.length;i=n++){var a=t[n],o=t[i];a.y>e.y!=o.y>e.y&&e.x<(o.x-a.x)*(e.y-a.y)/(o.y-a.y)+a.x&&(r=!r);}return r}function oa(t,e,r){var n=e.paint.get(t).value;return "constant"===n.kind?n.value:r.programConfigurations.get(e.id).binders[t].maxValue}function sa(t){return Math.sqrt(t[0]*t[0]+t[1]*t[1])}function ua(t,e,r,n,a){if(!e[0]&&!e[1])return t;var o=i.convert(e);"viewport"===r&&o._rotate(-n);for(var s=[],u=0;u<t.length;u++){for(var p=t[u],l=[],c=0;c<p.length;c++)l.push(p[c].sub(o._mult(a)));s.push(l);}return s}Ji.prototype.populate=function(t,e){for(var r=0,n=t;r<n.length;r+=1){var i=n[r],a=i.feature,o=i.index,s=i.sourceLayerIndex;if(this.layers[0]._featureFilter(new xn(this.zoom),a)){var u=Ki(a);this.addFeature(a,u,o),e.featureIndex.insert(a,u,o,s,this.index);}}},Ji.prototype.update=function(t,e,r){this.stateDependentLayers.length&&this.programConfigurations.updatePaintArrays(t,e,this.stateDependentLayers,r);},Ji.prototype.isEmpty=function(){return 0===this.layoutVertexArray.length},Ji.prototype.uploadPending=function(){return !this.uploaded||this.programConfigurations.needsUpload},Ji.prototype.upload=function(t){this.uploaded||(this.layoutVertexBuffer=t.createVertexBuffer(this.layoutVertexArray,bi),this.indexBuffer=t.createIndexBuffer(this.indexArray)),this.programConfigurations.upload(t),this.uploaded=!0;},Ji.prototype.destroy=function(){this.layoutVertexBuffer&&(this.layoutVertexBuffer.destroy(),this.indexBuffer.destroy(),this.programConfigurations.destroy(),this.segments.destroy());},Ji.prototype.addFeature=function(t,e,r){for(var n=0,i=e;n<i.length;n+=1)for(var a=0,o=i[n];a<o.length;a+=1){var s=o[a],u=s.x,p=s.y;if(!(u<0||u>=Gi||p<0||p>=Gi)){var l=this.segments.prepareSegment(4,this.layoutVertexArray,this.indexArray),c=l.vertexLength;Hi(this.layoutVertexArray,u,p,-1,-1),Hi(this.layoutVertexArray,u,p,1,-1),Hi(this.layoutVertexArray,u,p,1,1),Hi(this.layoutVertexArray,u,p,-1,1),this.indexArray.emplaceBack(c,c+1,c+2),this.indexArray.emplaceBack(c,c+3,c+2),l.vertexLength+=4,l.primitiveLength+=2;}}this.programConfigurations.populatePaintArrays(this.layoutVertexArray.length,t,r,{});},en("CircleBucket",Ji,{omit:["layers"]});var pa={paint:new Cn({"circle-radius":new En(ft.paint_circle["circle-radius"]),"circle-color":new En(ft.paint_circle["circle-color"]),"circle-blur":new En(ft.paint_circle["circle-blur"]),"circle-opacity":new En(ft.paint_circle["circle-opacity"]),"circle-translate":new Bn(ft.paint_circle["circle-translate"]),"circle-translate-anchor":new Bn(ft.paint_circle["circle-translate-anchor"]),"circle-pitch-scale":new Bn(ft.paint_circle["circle-pitch-scale"]),"circle-pitch-alignment":new Bn(ft.paint_circle["circle-pitch-alignment"]),"circle-stroke-width":new En(ft.paint_circle["circle-stroke-width"]),"circle-stroke-color":new En(ft.paint_circle["circle-stroke-color"]),"circle-stroke-opacity":new En(ft.paint_circle["circle-stroke-opacity"])})},la="undefined"!=typeof Float32Array?Float32Array:Array;Math.PI;function ca(){var t=new la(9);return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=1,t[5]=0,t[6]=0,t[7]=0,t[8]=1,t}function ha(){var t=new la(3);return t[0]=0,t[1]=0,t[2]=0,t}function fa(t){var e=t[0],r=t[1],n=t[2];return Math.sqrt(e*e+r*r+n*n)}function ya(t,e,r){var n=new la(3);return n[0]=t,n[1]=e,n[2]=r,n}function da(t,e){var r=e[0],n=e[1],i=e[2],a=r*r+n*n+i*i;return a>0&&(a=1/Math.sqrt(a),t[0]=e[0]*a,t[1]=e[1]*a,t[2]=e[2]*a),t}function ma(t,e){return t[0]*e[0]+t[1]*e[1]+t[2]*e[2]}function va(t,e,r){var n=e[0],i=e[1],a=e[2],o=r[0],s=r[1],u=r[2];return t[0]=i*u-a*s,t[1]=a*o-n*u,t[2]=n*s-i*o,t}var ga,xa=fa,ba=(ga=ha(),function(t,e,r,n,i,a){var o,s;for(e||(e=3),r||(r=0),s=n?Math.min(n*e+r,t.length):t.length,o=r;o<s;o+=e)ga[0]=t[o],ga[1]=t[o+1],ga[2]=t[o+2],i(ga,ga,a),t[o]=ga[0],t[o+1]=ga[1],t[o+2]=ga[2];return t});function _a(){var t=new la(4);return t[0]=0,t[1]=0,t[2]=0,t[3]=0,t}function wa(t,e){var r=e[0],n=e[1],i=e[2],a=e[3],o=r*r+n*n+i*i+a*a;return o>0&&(o=1/Math.sqrt(o),t[0]=r*o,t[1]=n*o,t[2]=i*o,t[3]=a*o),t}function Aa(t,e,r){var n=e[0],i=e[1],a=e[2],o=e[3];return t[0]=r[0]*n+r[4]*i+r[8]*a+r[12]*o,t[1]=r[1]*n+r[5]*i+r[9]*a+r[13]*o,t[2]=r[2]*n+r[6]*i+r[10]*a+r[14]*o,t[3]=r[3]*n+r[7]*i+r[11]*a+r[15]*o,t}var ka=function(){var t=_a();return function(e,r,n,i,a,o){var s,u;for(r||(r=4),n||(n=0),u=i?Math.min(i*r+n,e.length):e.length,s=n;s<u;s+=r)t[0]=e[s],t[1]=e[s+1],t[2]=e[s+2],t[3]=e[s+3],a(t,t,o),e[s]=t[0],e[s+1]=t[1],e[s+2]=t[2],e[s+3]=t[3];return e}}();function Sa(){var t=new la(4);return t[0]=0,t[1]=0,t[2]=0,t[3]=1,t}function za(t,e,r,n){var i,a,o,s,u,p=e[0],l=e[1],c=e[2],h=e[3],f=r[0],y=r[1],d=r[2],m=r[3];return (a=p*f+l*y+c*d+h*m)<0&&(a=-a,f=-f,y=-y,d=-d,m=-m),1-a>1e-6?(i=Math.acos(a),o=Math.sin(i),s=Math.sin((1-n)*i)/o,u=Math.sin(n*i)/o):(s=1-n,u=n),t[0]=s*p+u*f,t[1]=s*l+u*y,t[2]=s*c+u*d,t[3]=s*h+u*m,t}var Ia,Ba,Ea,Pa,Va,Ma,Ca=wa;Ia=ha(),Ba=ya(1,0,0),Ea=ya(0,1,0),Pa=Sa(),Va=Sa(),Ma=ca();!function(){var t,e=((t=new la(2))[0]=0,t[1]=0,t);}();var Ta=function(t){function e(e){t.call(this,e,pa);}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.createBucket=function(t){return new Ji(t)},e.prototype.queryRadius=function(t){var e=t;return oa("circle-radius",this,e)+oa("circle-stroke-width",this,e)+sa(this.paint.get("circle-translate"))},e.prototype.queryIntersectsFeature=function(t,e,r,n,i,a,o,s){for(var u=ua(t,this.paint.get("circle-translate"),this.paint.get("circle-translate-anchor"),a.angle,o),p=this.paint.get("circle-radius").evaluate(e,r)+this.paint.get("circle-stroke-width").evaluate(e,r),l="map"===this.paint.get("circle-pitch-alignment"),c=l?u:function(t,e,r){return t.map(function(t){return t.map(function(t){return Fa(t,e,r)})})}(u,s,a),h=l?p*o:p,f=0,y=n;f<y.length;f+=1)for(var d=0,m=y[f];d<m.length;d+=1){var v=m[d],g=l?v:Fa(v,s,a),x=h,b=Aa([],[v.x,v.y,0,1],s);if("viewport"===this.paint.get("circle-pitch-scale")&&"map"===this.paint.get("circle-pitch-alignment")?x*=b[3]/a.cameraToCenterDistance:"map"===this.paint.get("circle-pitch-scale")&&"viewport"===this.paint.get("circle-pitch-alignment")&&(x*=a.cameraToCenterDistance/b[3]),Yi(c,g,x))return !0}return !1},e}(Tn);function Fa(t,e,r){var n=Aa([],[t.x,t.y,0,1],e);return new i((n[0]/n[3]+1)*r.width*.5,(n[1]/n[3]+1)*r.height*.5)}var La=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e}(Ji);function Oa(t,e,r,n){var i=e.width,a=e.height;if(n){if(n.length!==i*a*r)throw new RangeError("mismatched image size")}else n=new Uint8Array(i*a*r);return t.width=i,t.height=a,t.data=n,t}function Da(t,e,r){var n=e.width,i=e.height;if(n!==t.width||i!==t.height){var a=Oa({},{width:n,height:i},r);Ua(t,a,{x:0,y:0},{x:0,y:0},{width:Math.min(t.width,n),height:Math.min(t.height,i)},r),t.width=n,t.height=i,t.data=a.data;}}function Ua(t,e,r,n,i,a){if(0===i.width||0===i.height)return e;if(i.width>t.width||i.height>t.height||r.x>t.width-i.width||r.y>t.height-i.height)throw new RangeError("out of range source coordinates for image copy");if(i.width>e.width||i.height>e.height||n.x>e.width-i.width||n.y>e.height-i.height)throw new RangeError("out of range destination coordinates for image copy");for(var o=t.data,s=e.data,u=0;u<i.height;u++)for(var p=((r.y+u)*t.width+r.x)*a,l=((n.y+u)*e.width+n.x)*a,c=0;c<i.width*a;c++)s[l+c]=o[p+c];return e}en("HeatmapBucket",La,{omit:["layers"]});var ja=function(t,e){Oa(this,t,1,e);};ja.prototype.resize=function(t){Da(this,t,1);},ja.prototype.clone=function(){return new ja({width:this.width,height:this.height},new Uint8Array(this.data))},ja.copy=function(t,e,r,n,i){Ua(t,e,r,n,i,1);};var qa=function(t,e){Oa(this,t,4,e);};qa.prototype.resize=function(t){Da(this,t,4);},qa.prototype.clone=function(){return new qa({width:this.width,height:this.height},new Uint8Array(this.data))},qa.copy=function(t,e,r,n,i){Ua(t,e,r,n,i,4);},en("AlphaImage",ja),en("RGBAImage",qa);var Ra={paint:new Cn({"heatmap-radius":new En(ft.paint_heatmap["heatmap-radius"]),"heatmap-weight":new En(ft.paint_heatmap["heatmap-weight"]),"heatmap-intensity":new Bn(ft.paint_heatmap["heatmap-intensity"]),"heatmap-color":new Mn(ft.paint_heatmap["heatmap-color"]),"heatmap-opacity":new Bn(ft.paint_heatmap["heatmap-opacity"])})};function Na(t,e){for(var r=new Uint8Array(1024),n={},i=0,a=0;i<256;i++,a+=4){n[e]=i/255;var o=t.evaluate(n);r[a+0]=Math.floor(255*o.r/o.a),r[a+1]=Math.floor(255*o.g/o.a),r[a+2]=Math.floor(255*o.b/o.a),r[a+3]=Math.floor(255*o.a);}return new qa({width:256,height:1},r)}var Ga=function(t){function e(e){t.call(this,e,Ra),this._updateColorRamp();}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.createBucket=function(t){return new La(t)},e.prototype._handleSpecialPaintPropertyUpdate=function(t){"heatmap-color"===t&&this._updateColorRamp();},e.prototype._updateColorRamp=function(){var t=this._transitionablePaint._values["heatmap-color"].value.expression;this.colorRamp=Na(t,"heatmapDensity"),this.colorRampTexture=null;},e.prototype.resize=function(){this.heatmapFbo&&(this.heatmapFbo.destroy(),this.heatmapFbo=null);},e.prototype.queryRadius=function(){return 0},e.prototype.queryIntersectsFeature=function(){return !1},e.prototype.hasOffscreenPass=function(){return 0!==this.paint.get("heatmap-opacity")&&"none"!==this.visibility},e}(Tn),Za={paint:new Cn({"hillshade-illumination-direction":new Bn(ft.paint_hillshade["hillshade-illumination-direction"]),"hillshade-illumination-anchor":new Bn(ft.paint_hillshade["hillshade-illumination-anchor"]),"hillshade-exaggeration":new Bn(ft.paint_hillshade["hillshade-exaggeration"]),"hillshade-shadow-color":new Bn(ft.paint_hillshade["hillshade-shadow-color"]),"hillshade-highlight-color":new Bn(ft.paint_hillshade["hillshade-highlight-color"]),"hillshade-accent-color":new Bn(ft.paint_hillshade["hillshade-accent-color"])})},Xa=function(t){function e(e){t.call(this,e,Za);}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.hasOffscreenPass=function(){return 0!==this.paint.get("hillshade-exaggeration")&&"none"!==this.visibility},e}(Tn),Ka=Dn([{name:"a_pos",components:2,type:"Int16"}],4),Ha=Ka.members,Ja=(Ka.size,Ka.alignment,$a),Ya=$a;function $a(t,e,r){r=r||2;var n,i,a,o,s,u,p,l=e&&e.length,c=l?e[0]*r:t.length,h=Wa(t,0,c,r,!0),f=[];if(!h)return f;if(l&&(h=function(t,e,r,n){var i,a,o,s,u,p=[];for(i=0,a=e.length;i<a;i++)o=e[i]*n,s=i<a-1?e[i+1]*n:t.length,(u=Wa(t,o,s,n,!1))===u.next&&(u.steiner=!0),p.push(uo(u));for(p.sort(ao),i=0;i<p.length;i++)oo(p[i],r),r=Qa(r,r.next);return r}(t,e,h,r)),t.length>80*r){n=a=t[0],i=o=t[1];for(var y=r;y<c;y+=r)(s=t[y])<n&&(n=s),(u=t[y+1])<i&&(i=u),s>a&&(a=s),u>o&&(o=u);p=0!==(p=Math.max(a-n,o-i))?1/p:0;}return to(h,f,r,n,i,p),f}function Wa(t,e,r,n,i){var a,o;if(i===bo(t,e,r,n)>0)for(a=e;a<r;a+=n)o=vo(a,t[a],t[a+1],o);else for(a=r-n;a>=e;a-=n)o=vo(a,t[a],t[a+1],o);return o&&ho(o,o.next)&&(go(o),o=o.next),o}function Qa(t,e){if(!t)return t;e||(e=t);var r,n=t;do{if(r=!1,n.steiner||!ho(n,n.next)&&0!==co(n.prev,n,n.next))n=n.next;else{if(go(n),(n=e=n.prev)===n.next)break;r=!0;}}while(r||n!==e);return e}function to(t,e,r,n,i,a,o){if(t){!o&&a&&function(t,e,r,n){var i=t;do{null===i.z&&(i.z=so(i.x,i.y,e,r,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;}while(i!==t);i.prevZ.nextZ=null,i.prevZ=null,function(t){var e,r,n,i,a,o,s,u,p=1;do{for(r=t,t=null,a=null,o=0;r;){for(o++,n=r,s=0,e=0;e<p&&(s++,n=n.nextZ);e++);for(u=p;s>0||u>0&&n;)0!==s&&(0===u||!n||r.z<=n.z)?(i=r,r=r.nextZ,s--):(i=n,n=n.nextZ,u--),a?a.nextZ=i:t=i,i.prevZ=a,a=i;r=n;}a.nextZ=null,p*=2;}while(o>1)}(i);}(t,n,i,a);for(var s,u,p=t;t.prev!==t.next;)if(s=t.prev,u=t.next,a?ro(t,n,i,a):eo(t))e.push(s.i/r),e.push(t.i/r),e.push(u.i/r),go(t),t=u.next,p=u.next;else if((t=u)===p){o?1===o?to(t=no(t,e,r),e,r,n,i,a,2):2===o&&io(t,e,r,n,i,a):to(Qa(t),e,r,n,i,a,1);break}}}function eo(t){var e=t.prev,r=t,n=t.next;if(co(e,r,n)>=0)return !1;for(var i=t.next.next;i!==t.prev;){if(po(e.x,e.y,r.x,r.y,n.x,n.y,i.x,i.y)&&co(i.prev,i,i.next)>=0)return !1;i=i.next;}return !0}function ro(t,e,r,n){var i=t.prev,a=t,o=t.next;if(co(i,a,o)>=0)return !1;for(var s=i.x<a.x?i.x<o.x?i.x:o.x:a.x<o.x?a.x:o.x,u=i.y<a.y?i.y<o.y?i.y:o.y:a.y<o.y?a.y:o.y,p=i.x>a.x?i.x>o.x?i.x:o.x:a.x>o.x?a.x:o.x,l=i.y>a.y?i.y>o.y?i.y:o.y:a.y>o.y?a.y:o.y,c=so(s,u,e,r,n),h=so(p,l,e,r,n),f=t.prevZ,y=t.nextZ;f&&f.z>=c&&y&&y.z<=h;){if(f!==t.prev&&f!==t.next&&po(i.x,i.y,a.x,a.y,o.x,o.y,f.x,f.y)&&co(f.prev,f,f.next)>=0)return !1;if(f=f.prevZ,y!==t.prev&&y!==t.next&&po(i.x,i.y,a.x,a.y,o.x,o.y,y.x,y.y)&&co(y.prev,y,y.next)>=0)return !1;y=y.nextZ;}for(;f&&f.z>=c;){if(f!==t.prev&&f!==t.next&&po(i.x,i.y,a.x,a.y,o.x,o.y,f.x,f.y)&&co(f.prev,f,f.next)>=0)return !1;f=f.prevZ;}for(;y&&y.z<=h;){if(y!==t.prev&&y!==t.next&&po(i.x,i.y,a.x,a.y,o.x,o.y,y.x,y.y)&&co(y.prev,y,y.next)>=0)return !1;y=y.nextZ;}return !0}function no(t,e,r){var n=t;do{var i=n.prev,a=n.next.next;!ho(i,a)&&fo(i,n,n.next,a)&&yo(i,a)&&yo(a,i)&&(e.push(i.i/r),e.push(n.i/r),e.push(a.i/r),go(n),go(n.next),n=t=a),n=n.next;}while(n!==t);return n}function io(t,e,r,n,i,a){var o=t;do{for(var s=o.next.next;s!==o.prev;){if(o.i!==s.i&&lo(o,s)){var u=mo(o,s);return o=Qa(o,o.next),u=Qa(u,u.next),to(o,e,r,n,i,a),void to(u,e,r,n,i,a)}s=s.next;}o=o.next;}while(o!==t)}function ao(t,e){return t.x-e.x}function oo(t,e){if(e=function(t,e){var r,n=e,i=t.x,a=t.y,o=-1/0;do{if(a<=n.y&&a>=n.next.y&&n.next.y!==n.y){var s=n.x+(a-n.y)*(n.next.x-n.x)/(n.next.y-n.y);if(s<=i&&s>o){if(o=s,s===i){if(a===n.y)return n;if(a===n.next.y)return n.next}r=n.x<n.next.x?n:n.next;}}n=n.next;}while(n!==e);if(!r)return null;if(i===o)return r.prev;var u,p=r,l=r.x,c=r.y,h=1/0;n=r.next;for(;n!==p;)i>=n.x&&n.x>=l&&i!==n.x&&po(a<c?i:o,a,l,c,a<c?o:i,a,n.x,n.y)&&((u=Math.abs(a-n.y)/(i-n.x))<h||u===h&&n.x>r.x)&&yo(n,t)&&(r=n,h=u),n=n.next;return r}(t,e)){var r=mo(e,t);Qa(r,r.next);}}function so(t,e,r,n,i){return (t=1431655765&((t=858993459&((t=252645135&((t=16711935&((t=32767*(t-r)*i)|t<<8))|t<<4))|t<<2))|t<<1))|(e=1431655765&((e=858993459&((e=252645135&((e=16711935&((e=32767*(e-n)*i)|e<<8))|e<<4))|e<<2))|e<<1))<<1}function uo(t){var e=t,r=t;do{e.x<r.x&&(r=e),e=e.next;}while(e!==t);return r}function po(t,e,r,n,i,a,o,s){return (i-o)*(e-s)-(t-o)*(a-s)>=0&&(t-o)*(n-s)-(r-o)*(e-s)>=0&&(r-o)*(a-s)-(i-o)*(n-s)>=0}function lo(t,e){return t.next.i!==e.i&&t.prev.i!==e.i&&!function(t,e){var r=t;do{if(r.i!==t.i&&r.next.i!==t.i&&r.i!==e.i&&r.next.i!==e.i&&fo(r,r.next,t,e))return !0;r=r.next;}while(r!==t);return !1}(t,e)&&yo(t,e)&&yo(e,t)&&function(t,e){var r=t,n=!1,i=(t.x+e.x)/2,a=(t.y+e.y)/2;do{r.y>a!=r.next.y>a&&r.next.y!==r.y&&i<(r.next.x-r.x)*(a-r.y)/(r.next.y-r.y)+r.x&&(n=!n),r=r.next;}while(r!==t);return n}(t,e)}function co(t,e,r){return (e.y-t.y)*(r.x-e.x)-(e.x-t.x)*(r.y-e.y)}function ho(t,e){return t.x===e.x&&t.y===e.y}function fo(t,e,r,n){return !!(ho(t,e)&&ho(r,n)||ho(t,n)&&ho(r,e))||co(t,e,r)>0!=co(t,e,n)>0&&co(r,n,t)>0!=co(r,n,e)>0}function yo(t,e){return co(t.prev,t,t.next)<0?co(t,e,t.next)>=0&&co(t,t.prev,e)>=0:co(t,e,t.prev)<0||co(t,t.next,e)<0}function mo(t,e){var r=new xo(t.i,t.x,t.y),n=new xo(e.i,e.x,e.y),i=t.next,a=e.prev;return t.next=e,e.prev=t,r.next=i,i.prev=r,n.next=r,r.prev=n,a.next=n,n.prev=a,n}function vo(t,e,r,n){var i=new xo(t,e,r);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function go(t){t.next.prev=t.prev,t.prev.next=t.next,t.prevZ&&(t.prevZ.nextZ=t.nextZ),t.nextZ&&(t.nextZ.prevZ=t.prevZ);}function xo(t,e,r){this.i=t,this.x=e,this.y=r,this.prev=null,this.next=null,this.z=null,this.prevZ=null,this.nextZ=null,this.steiner=!1;}function bo(t,e,r,n){for(var i=0,a=e,o=r-n;a<r;a+=n)i+=(t[o]-t[a])*(t[a+1]+t[o+1]),o=a;return i}$a.deviation=function(t,e,r,n){var i=e&&e.length,a=i?e[0]*r:t.length,o=Math.abs(bo(t,0,a,r));if(i)for(var s=0,u=e.length;s<u;s++){var p=e[s]*r,l=s<u-1?e[s+1]*r:t.length;o-=Math.abs(bo(t,p,l,r));}var c=0;for(s=0;s<n.length;s+=3){var h=n[s]*r,f=n[s+1]*r,y=n[s+2]*r;c+=Math.abs((t[h]-t[y])*(t[f+1]-t[h+1])-(t[h]-t[f])*(t[y+1]-t[h+1]));}return 0===o&&0===c?0:Math.abs((c-o)/o)},$a.flatten=function(t){for(var e=t[0][0].length,r={vertices:[],holes:[],dimensions:e},n=0,i=0;i<t.length;i++){for(var a=0;a<t[i].length;a++)for(var o=0;o<e;o++)r.vertices.push(t[i][a][o]);i>0&&(n+=t[i-1].length,r.holes.push(n));}return r},Ja.default=Ya;var _o=Ao,wo=Ao;function Ao(t,e,r,n,i){!function t(e,r,n,i,a){for(;i>n;){if(i-n>600){var o=i-n+1,s=r-n+1,u=Math.log(o),p=.5*Math.exp(2*u/3),l=.5*Math.sqrt(u*p*(o-p)/o)*(s-o/2<0?-1:1),c=Math.max(n,Math.floor(r-s*p/o+l)),h=Math.min(i,Math.floor(r+(o-s)*p/o+l));t(e,r,c,h,a);}var f=e[r],y=n,d=i;for(ko(e,n,r),a(e[i],f)>0&&ko(e,n,i);y<d;){for(ko(e,y,d),y++,d--;a(e[y],f)<0;)y++;for(;a(e[d],f)>0;)d--;}0===a(e[n],f)?ko(e,n,d):ko(e,++d,i),d<=r&&(n=d+1),r<=d&&(i=d-1);}}(t,e,r||0,n||t.length-1,i||So);}function ko(t,e,r){var n=t[e];t[e]=t[r],t[r]=n;}function So(t,e){return t<e?-1:t>e?1:0}function zo(t,e){var r=t.length;if(r<=1)return [t];for(var n,i,a=[],o=0;o<r;o++){var s=k(t[o]);0!==s&&(t[o].area=Math.abs(s),void 0===i&&(i=s<0),i===s<0?(n&&a.push(n),n=[t[o]]):n.push(t[o]));}if(n&&a.push(n),e>1)for(var u=0;u<a.length;u++)a[u].length<=e||(_o(a[u],e,1,a[u].length-1,Io),a[u]=a[u].slice(0,e));return a}function Io(t,e){return e.area-t.area}function Bo(t,e,r){for(var n=r.patternDependencies,i=!1,a=0,o=e;a<o.length;a+=1){var s=o[a].paint.get(t+"-pattern");s.isConstant()||(i=!0);var u=s.constantOr(null);u&&(i=!0,n[u.to]=!0,n[u.from]=!0);}return i}function Eo(t,e,r,n,i){for(var a=i.patternDependencies,o=0,s=e;o<s.length;o+=1){var u=s[o],p=u.paint.get(t+"-pattern").value;if("constant"!==p.kind){var l=p.evaluate({zoom:n-1},r,{}),c=p.evaluate({zoom:n},r,{}),h=p.evaluate({zoom:n+1},r,{});a[l]=!0,a[c]=!0,a[h]=!0,r.patterns[u.id]={min:l,mid:c,max:h};}}return r}_o.default=wo;var Po=function(t){this.zoom=t.zoom,this.overscaling=t.overscaling,this.layers=t.layers,this.layerIds=this.layers.map(function(t){return t.id}),this.index=t.index,this.hasPattern=!1,this.layoutVertexArray=new jn,this.indexArray=new ri,this.indexArray2=new ni,this.programConfigurations=new qi(Ha,t.layers,t.zoom),this.segments=new _i,this.segments2=new _i;};Po.prototype.populate=function(t,e){this.features=[],this.hasPattern=Bo("fill",this.layers,e);for(var r=0,n=t;r<n.length;r+=1){var i=n[r],a=i.feature,o=i.index,s=i.sourceLayerIndex;if(this.layers[0]._featureFilter(new xn(this.zoom),a)){var u=Ki(a),p={sourceLayerIndex:s,index:o,geometry:u,properties:a.properties,type:a.type,patterns:{}};void 0!==a.id&&(p.id=a.id),this.hasPattern?this.features.push(Eo("fill",this.layers,p,this.zoom,e)):this.addFeature(p,u,o,{}),e.featureIndex.insert(a,u,o,s,this.index);}}},Po.prototype.update=function(t,e,r){this.stateDependentLayers.length&&this.programConfigurations.updatePaintArrays(t,e,this.stateDependentLayers,r);},Po.prototype.addFeatures=function(t,e){for(var r=0,n=this.features;r<n.length;r+=1){var i=n[r],a=i.geometry;this.addFeature(i,a,i.index,e);}},Po.prototype.isEmpty=function(){return 0===this.layoutVertexArray.length},Po.prototype.uploadPending=function(){return !this.uploaded||this.programConfigurations.needsUpload},Po.prototype.upload=function(t){this.uploaded||(this.layoutVertexBuffer=t.createVertexBuffer(this.layoutVertexArray,Ha),this.indexBuffer=t.createIndexBuffer(this.indexArray),this.indexBuffer2=t.createIndexBuffer(this.indexArray2)),this.programConfigurations.upload(t),this.uploaded=!0;},Po.prototype.destroy=function(){this.layoutVertexBuffer&&(this.layoutVertexBuffer.destroy(),this.indexBuffer.destroy(),this.indexBuffer2.destroy(),this.programConfigurations.destroy(),this.segments.destroy(),this.segments2.destroy());},Po.prototype.addFeature=function(t,e,r,n){for(var i=0,a=zo(e,500);i<a.length;i+=1){for(var o=a[i],s=0,u=0,p=o;u<p.length;u+=1){s+=p[u].length;}for(var l=this.segments.prepareSegment(s,this.layoutVertexArray,this.indexArray),c=l.vertexLength,h=[],f=[],y=0,d=o;y<d.length;y+=1){var m=d[y];if(0!==m.length){m!==o[0]&&f.push(h.length/2);var v=this.segments2.prepareSegment(m.length,this.layoutVertexArray,this.indexArray2),g=v.vertexLength;this.layoutVertexArray.emplaceBack(m[0].x,m[0].y),this.indexArray2.emplaceBack(g+m.length-1,g),h.push(m[0].x),h.push(m[0].y);for(var x=1;x<m.length;x++)this.layoutVertexArray.emplaceBack(m[x].x,m[x].y),this.indexArray2.emplaceBack(g+x-1,g+x),h.push(m[x].x),h.push(m[x].y);v.vertexLength+=m.length,v.primitiveLength+=m.length;}}for(var b=Ja(h,f),_=0;_<b.length;_+=3)this.indexArray.emplaceBack(c+b[_],c+b[_+1],c+b[_+2]);l.vertexLength+=s,l.primitiveLength+=b.length/3;}this.programConfigurations.populatePaintArrays(this.layoutVertexArray.length,t,r,n);},en("FillBucket",Po,{omit:["layers","features"]});var Vo={paint:new Cn({"fill-antialias":new Bn(ft.paint_fill["fill-antialias"]),"fill-opacity":new En(ft.paint_fill["fill-opacity"]),"fill-color":new En(ft.paint_fill["fill-color"]),"fill-outline-color":new En(ft.paint_fill["fill-outline-color"]),"fill-translate":new Bn(ft.paint_fill["fill-translate"]),"fill-translate-anchor":new Bn(ft.paint_fill["fill-translate-anchor"]),"fill-pattern":new Pn(ft.paint_fill["fill-pattern"])})},Mo=function(t){function e(e){t.call(this,e,Vo);}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.recalculate=function(e){t.prototype.recalculate.call(this,e);var r=this.paint._values["fill-outline-color"];"constant"===r.value.kind&&void 0===r.value.value&&(this.paint._values["fill-outline-color"]=this.paint._values["fill-color"]);},e.prototype.createBucket=function(t){return new Po(t)},e.prototype.queryRadius=function(){return sa(this.paint.get("fill-translate"))},e.prototype.queryIntersectsFeature=function(t,e,r,n,i,a,o){return $i(ua(t,this.paint.get("fill-translate"),this.paint.get("fill-translate-anchor"),a.angle,o),n)},e}(Tn),Co=Dn([{name:"a_pos",components:2,type:"Int16"},{name:"a_normal_ed",components:4,type:"Int16"}],4),To=Co.members,Fo=(Co.size,Co.alignment,Math.pow(2,13));function Lo(t,e,r,n,i,a,o,s){t.emplaceBack(e,r,2*Math.floor(n*Fo)+o,i*Fo*2,a*Fo*2,Math.round(s));}var Oo=function(t){this.zoom=t.zoom,this.overscaling=t.overscaling,this.layers=t.layers,this.layerIds=this.layers.map(function(t){return t.id}),this.index=t.index,this.hasPattern=!1,this.layoutVertexArray=new Rn,this.indexArray=new ri,this.programConfigurations=new qi(To,t.layers,t.zoom),this.segments=new _i;};function Do(t,e){return t.x===e.x&&(t.x<0||t.x>Gi)||t.y===e.y&&(t.y<0||t.y>Gi)}function Uo(t){return t.every(function(t){return t.x<0})||t.every(function(t){return t.x>Gi})||t.every(function(t){return t.y<0})||t.every(function(t){return t.y>Gi})}Oo.prototype.populate=function(t,e){this.features=[],this.hasPattern=Bo("fill-extrusion",this.layers,e);for(var r=0,n=t;r<n.length;r+=1){var i=n[r],a=i.feature,o=i.index,s=i.sourceLayerIndex;if(this.layers[0]._featureFilter(new xn(this.zoom),a)){var u=Ki(a),p={sourceLayerIndex:s,index:o,geometry:u,properties:a.properties,type:a.type,patterns:{}};void 0!==a.id&&(p.id=a.id),this.hasPattern?this.features.push(Eo("fill-extrusion",this.layers,p,this.zoom,e)):this.addFeature(p,u,o,{}),e.featureIndex.insert(a,u,o,s,this.index);}}},Oo.prototype.addFeatures=function(t,e){for(var r=0,n=this.features;r<n.length;r+=1){var i=n[r],a=i.geometry;this.addFeature(i,a,i.index,e);}},Oo.prototype.update=function(t,e,r){this.stateDependentLayers.length&&this.programConfigurations.updatePaintArrays(t,e,this.stateDependentLayers,r);},Oo.prototype.isEmpty=function(){return 0===this.layoutVertexArray.length},Oo.prototype.uploadPending=function(){return !this.uploaded||this.programConfigurations.needsUpload},Oo.prototype.upload=function(t){this.uploaded||(this.layoutVertexBuffer=t.createVertexBuffer(this.layoutVertexArray,To),this.indexBuffer=t.createIndexBuffer(this.indexArray)),this.programConfigurations.upload(t),this.uploaded=!0;},Oo.prototype.destroy=function(){this.layoutVertexBuffer&&(this.layoutVertexBuffer.destroy(),this.indexBuffer.destroy(),this.programConfigurations.destroy(),this.segments.destroy());},Oo.prototype.addFeature=function(t,e,r,n){for(var i=0,a=zo(e,500);i<a.length;i+=1){for(var o=a[i],s=0,u=0,p=o;u<p.length;u+=1){s+=p[u].length;}for(var l=this.segments.prepareSegment(4,this.layoutVertexArray,this.indexArray),c=0,h=o;c<h.length;c+=1){var f=h[c];if(0!==f.length&&!Uo(f))for(var y=0,d=0;d<f.length;d++){var m=f[d];if(d>=1){var v=f[d-1];if(!Do(m,v)){l.vertexLength+4>_i.MAX_VERTEX_ARRAY_LENGTH&&(l=this.segments.prepareSegment(4,this.layoutVertexArray,this.indexArray));var g=m.sub(v)._perp()._unit(),x=v.dist(m);y+x>32768&&(y=0),Lo(this.layoutVertexArray,m.x,m.y,g.x,g.y,0,0,y),Lo(this.layoutVertexArray,m.x,m.y,g.x,g.y,0,1,y),y+=x,Lo(this.layoutVertexArray,v.x,v.y,g.x,g.y,0,0,y),Lo(this.layoutVertexArray,v.x,v.y,g.x,g.y,0,1,y);var b=l.vertexLength;this.indexArray.emplaceBack(b,b+2,b+1),this.indexArray.emplaceBack(b+1,b+2,b+3),l.vertexLength+=4,l.primitiveLength+=2;}}}}l.vertexLength+s>_i.MAX_VERTEX_ARRAY_LENGTH&&(l=this.segments.prepareSegment(s,this.layoutVertexArray,this.indexArray));for(var _=[],w=[],A=l.vertexLength,k=0,S=o;k<S.length;k+=1){var z=S[k];if(0!==z.length){z!==o[0]&&w.push(_.length/2);for(var I=0;I<z.length;I++){var B=z[I];Lo(this.layoutVertexArray,B.x,B.y,0,0,1,1,0),_.push(B.x),_.push(B.y);}}}for(var E=Ja(_,w),P=0;P<E.length;P+=3)this.indexArray.emplaceBack(A+E[P],A+E[P+2],A+E[P+1]);l.primitiveLength+=E.length/3,l.vertexLength+=s;}this.programConfigurations.populatePaintArrays(this.layoutVertexArray.length,t,r,n);},en("FillExtrusionBucket",Oo,{omit:["layers","features"]});var jo={paint:new Cn({"fill-extrusion-opacity":new Bn(ft["paint_fill-extrusion"]["fill-extrusion-opacity"]),"fill-extrusion-color":new En(ft["paint_fill-extrusion"]["fill-extrusion-color"]),"fill-extrusion-translate":new Bn(ft["paint_fill-extrusion"]["fill-extrusion-translate"]),"fill-extrusion-translate-anchor":new Bn(ft["paint_fill-extrusion"]["fill-extrusion-translate-anchor"]),"fill-extrusion-pattern":new Pn(ft["paint_fill-extrusion"]["fill-extrusion-pattern"]),"fill-extrusion-height":new En(ft["paint_fill-extrusion"]["fill-extrusion-height"]),"fill-extrusion-base":new En(ft["paint_fill-extrusion"]["fill-extrusion-base"]),"fill-extrusion-vertical-gradient":new Bn(ft["paint_fill-extrusion"]["fill-extrusion-vertical-gradient"])})},qo=function(t){function e(e){t.call(this,e,jo);}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.createBucket=function(t){return new Oo(t)},e.prototype.queryRadius=function(){return sa(this.paint.get("fill-extrusion-translate"))},e.prototype.queryIntersectsFeature=function(t,e,r,n,i,a,o){return $i(ua(t,this.paint.get("fill-extrusion-translate"),this.paint.get("fill-extrusion-translate-anchor"),a.angle,o),n)},e.prototype.hasOffscreenPass=function(){return 0!==this.paint.get("fill-extrusion-opacity")&&"none"!==this.visibility},e.prototype.resize=function(){this.viewportFrame&&(this.viewportFrame.destroy(),this.viewportFrame=null);},e}(Tn),Ro=Dn([{name:"a_pos_normal",components:4,type:"Int16"},{name:"a_data",components:4,type:"Uint8"}],4),No=Ro.members,Go=(Ro.size,Ro.alignment,Zo);function Zo(t,e,r,n,i){this.properties={},this.extent=r,this.type=0,this._pbf=t,this._geometry=-1,this._keys=n,this._values=i,t.readFields(Xo,this,e);}function Xo(t,e,r){1==t?e.id=r.readVarint():2==t?function(t,e){var r=t.readVarint()+t.pos;for(;t.pos<r;){var n=e._keys[t.readVarint()],i=e._values[t.readVarint()];e.properties[n]=i;}}(r,e):3==t?e.type=r.readVarint():4==t&&(e._geometry=r.pos);}function Ko(t){for(var e,r,n=0,i=0,a=t.length,o=a-1;i<a;o=i++)e=t[i],n+=((r=t[o]).x-e.x)*(e.y+r.y);return n}Zo.types=["Unknown","Point","LineString","Polygon"],Zo.prototype.loadGeometry=function(){var t=this._pbf;t.pos=this._geometry;for(var e,r=t.readVarint()+t.pos,n=1,a=0,o=0,s=0,u=[];t.pos<r;){if(a<=0){var p=t.readVarint();n=7&p,a=p>>3;}if(a--,1===n||2===n)o+=t.readSVarint(),s+=t.readSVarint(),1===n&&(e&&u.push(e),e=[]),e.push(new i(o,s));else{if(7!==n)throw new Error("unknown command "+n);e&&e.push(e[0].clone());}}return e&&u.push(e),u},Zo.prototype.bbox=function(){var t=this._pbf;t.pos=this._geometry;for(var e=t.readVarint()+t.pos,r=1,n=0,i=0,a=0,o=1/0,s=-1/0,u=1/0,p=-1/0;t.pos<e;){if(n<=0){var l=t.readVarint();r=7&l,n=l>>3;}if(n--,1===r||2===r)(i+=t.readSVarint())<o&&(o=i),i>s&&(s=i),(a+=t.readSVarint())<u&&(u=a),a>p&&(p=a);else if(7!==r)throw new Error("unknown command "+r)}return [o,u,s,p]},Zo.prototype.toGeoJSON=function(t,e,r){var n,i,a=this.extent*Math.pow(2,r),o=this.extent*t,s=this.extent*e,u=this.loadGeometry(),p=Zo.types[this.type];function l(t){for(var e=0;e<t.length;e++){var r=t[e],n=180-360*(r.y+s)/a;t[e]=[360*(r.x+o)/a-180,360/Math.PI*Math.atan(Math.exp(n*Math.PI/180))-90];}}switch(this.type){case 1:var c=[];for(n=0;n<u.length;n++)c[n]=u[n][0];l(u=c);break;case 2:for(n=0;n<u.length;n++)l(u[n]);break;case 3:for(u=function(t){var e=t.length;if(e<=1)return [t];for(var r,n,i=[],a=0;a<e;a++){var o=Ko(t[a]);0!==o&&(void 0===n&&(n=o<0),n===o<0?(r&&i.push(r),r=[t[a]]):r.push(t[a]));}r&&i.push(r);return i}(u),n=0;n<u.length;n++)for(i=0;i<u[n].length;i++)l(u[n][i]);}1===u.length?u=u[0]:p="Multi"+p;var h={type:"Feature",geometry:{type:p,coordinates:u},properties:this.properties};return "id"in this&&(h.id=this.id),h};var Ho=Jo;function Jo(t,e){this.version=1,this.name=null,this.extent=4096,this.length=0,this._pbf=t,this._keys=[],this._values=[],this._features=[],t.readFields(Yo,this,e),this.length=this._features.length;}function Yo(t,e,r){15===t?e.version=r.readVarint():1===t?e.name=r.readString():5===t?e.extent=r.readVarint():2===t?e._features.push(r.pos):3===t?e._keys.push(r.readString()):4===t&&e._values.push(function(t){var e=null,r=t.readVarint()+t.pos;for(;t.pos<r;){var n=t.readVarint()>>3;e=1===n?t.readString():2===n?t.readFloat():3===n?t.readDouble():4===n?t.readVarint64():5===n?t.readVarint():6===n?t.readSVarint():7===n?t.readBoolean():null;}return e}(r));}function $o(t,e,r){if(3===t){var n=new Ho(r,r.readVarint()+r.pos);n.length&&(e[n.name]=n);}}Jo.prototype.feature=function(t){if(t<0||t>=this._features.length)throw new Error("feature index out of bounds");this._pbf.pos=this._features[t];var e=this._pbf.readVarint()+this._pbf.pos;return new Go(this._pbf,e,this.extent,this._keys,this._values)};var Wo={VectorTile:function(t,e){this.layers=t.readFields($o,{},e);},VectorTileFeature:Go,VectorTileLayer:Ho},Qo=Wo.VectorTileFeature.types,ts=63,es=Math.cos(Math.PI/180*37.5),rs=.5,ns=Math.pow(2,14)/rs;function is(t,e,r,n,i,a,o){t.emplaceBack(e.x,e.y,n?1:0,i?1:-1,Math.round(ts*r.x)+128,Math.round(ts*r.y)+128,1+(0===a?0:a<0?-1:1)|(o*rs&63)<<2,o*rs>>6);}var as=function(t){this.zoom=t.zoom,this.overscaling=t.overscaling,this.layers=t.layers,this.layerIds=this.layers.map(function(t){return t.id}),this.index=t.index,this.features=[],this.hasPattern=!1,this.layoutVertexArray=new Nn,this.indexArray=new ri,this.programConfigurations=new qi(No,t.layers,t.zoom),this.segments=new _i;};function os(t,e){return (t/e.tileTotal*(e.end-e.start)+e.start)*(ns-1)}as.prototype.populate=function(t,e){this.features=[],this.hasPattern=Bo("line",this.layers,e);for(var r=0,n=t;r<n.length;r+=1){var i=n[r],a=i.feature,o=i.index,s=i.sourceLayerIndex;if(this.layers[0]._featureFilter(new xn(this.zoom),a)){var u=Ki(a),p={sourceLayerIndex:s,index:o,geometry:u,properties:a.properties,type:a.type,patterns:{}};void 0!==a.id&&(p.id=a.id),this.hasPattern?this.features.push(Eo("line",this.layers,p,this.zoom,e)):this.addFeature(p,u,o,{}),e.featureIndex.insert(a,u,o,s,this.index);}}},as.prototype.update=function(t,e,r){this.stateDependentLayers.length&&this.programConfigurations.updatePaintArrays(t,e,this.stateDependentLayers,r);},as.prototype.addFeatures=function(t,e){for(var r=0,n=this.features;r<n.length;r+=1){var i=n[r],a=i.geometry;this.addFeature(i,a,i.index,e);}},as.prototype.isEmpty=function(){return 0===this.layoutVertexArray.length},as.prototype.uploadPending=function(){return !this.uploaded||this.programConfigurations.needsUpload},as.prototype.upload=function(t){this.uploaded||(this.layoutVertexBuffer=t.createVertexBuffer(this.layoutVertexArray,No),this.indexBuffer=t.createIndexBuffer(this.indexArray)),this.programConfigurations.upload(t),this.uploaded=!0;},as.prototype.destroy=function(){this.layoutVertexBuffer&&(this.layoutVertexBuffer.destroy(),this.indexBuffer.destroy(),this.programConfigurations.destroy(),this.segments.destroy());},as.prototype.addFeature=function(t,e,r,n){for(var i=this.layers[0].layout,a=i.get("line-join").evaluate(t,{}),o=i.get("line-cap"),s=i.get("line-miter-limit"),u=i.get("line-round-limit"),p=0,l=e;p<l.length;p+=1){var c=l[p];this.addLine(c,t,a,o,s,u,r,n);}},as.prototype.addLine=function(t,e,r,n,i,a,o,s){var u=null;e.properties&&e.properties.hasOwnProperty("mapbox_clip_start")&&e.properties.hasOwnProperty("mapbox_clip_end")&&(u={start:e.properties.mapbox_clip_start,end:e.properties.mapbox_clip_end,tileTotal:void 0});for(var p="Polygon"===Qo[e.type],l=t.length;l>=2&&t[l-1].equals(t[l-2]);)l--;for(var c=0;c<l-1&&t[c].equals(t[c+1]);)c++;if(!(l<(p?3:2))){u&&(u.tileTotal=function(t,e,r){for(var n,i,a=0,o=e;o<r-1;o++)n=t[o],i=t[o+1],a+=n.dist(i);return a}(t,c,l)),"bevel"===r&&(i=1.05);var h=Gi/(512*this.overscaling)*15,f=t[c],y=this.segments.prepareSegment(10*l,this.layoutVertexArray,this.indexArray);this.distance=0;var d,m,v,g=n,x=p?"butt":n,b=!0,_=void 0,w=void 0,A=void 0,k=void 0;this.e1=this.e2=this.e3=-1,p&&(d=t[l-2],k=f.sub(d)._unit()._perp());for(var S=c;S<l;S++)if(!(w=p&&S===l-1?t[c+1]:t[S+1])||!t[S].equals(w)){k&&(A=k),d&&(_=d),d=t[S],k=w?w.sub(d)._unit()._perp():A;var z=(A=A||k).add(k);0===z.x&&0===z.y||z._unit();var I=z.x*k.x+z.y*k.y,B=0!==I?1/I:1/0,E=I<es&&_&&w;if(E&&S>c){var P=d.dist(_);if(P>2*h){var V=d.sub(d.sub(_)._mult(h/P)._round());this.distance+=V.dist(_),this.addCurrentVertex(V,this.distance,A.mult(1),0,0,!1,y,u),_=V;}}var M=_&&w,C=M?r:w?g:x;if(M&&"round"===C&&(B<a?C="miter":B<=2&&(C="fakeround")),"miter"===C&&B>i&&(C="bevel"),"bevel"===C&&(B>2&&(C="flipbevel"),B<i&&(C="miter")),_&&(this.distance+=d.dist(_)),"miter"===C)z._mult(B),this.addCurrentVertex(d,this.distance,z,0,0,!1,y,u);else if("flipbevel"===C){if(B>100)z=k.clone().mult(-1);else{var T=A.x*k.y-A.y*k.x>0?-1:1,F=B*A.add(k).mag()/A.sub(k).mag();z._perp()._mult(F*T);}this.addCurrentVertex(d,this.distance,z,0,0,!1,y,u),this.addCurrentVertex(d,this.distance,z.mult(-1),0,0,!1,y,u);}else if("bevel"===C||"fakeround"===C){var L=A.x*k.y-A.y*k.x>0,O=-Math.sqrt(B*B-1);if(L?(v=0,m=O):(m=0,v=O),b||this.addCurrentVertex(d,this.distance,A,m,v,!1,y,u),"fakeround"===C){for(var D=Math.floor(8*(.5-(I-.5))),U=void 0,j=0;j<D;j++)U=k.mult((j+1)/(D+1))._add(A)._unit(),this.addPieSliceVertex(d,this.distance,U,L,y,u);this.addPieSliceVertex(d,this.distance,z,L,y,u);for(var q=D-1;q>=0;q--)U=A.mult((q+1)/(D+1))._add(k)._unit(),this.addPieSliceVertex(d,this.distance,U,L,y,u);}w&&this.addCurrentVertex(d,this.distance,k,-m,-v,!1,y,u);}else"butt"===C?(b||this.addCurrentVertex(d,this.distance,A,0,0,!1,y,u),w&&this.addCurrentVertex(d,this.distance,k,0,0,!1,y,u)):"square"===C?(b||(this.addCurrentVertex(d,this.distance,A,1,1,!1,y,u),this.e1=this.e2=-1),w&&this.addCurrentVertex(d,this.distance,k,-1,-1,!1,y,u)):"round"===C&&(b||(this.addCurrentVertex(d,this.distance,A,0,0,!1,y,u),this.addCurrentVertex(d,this.distance,A,1,1,!0,y,u),this.e1=this.e2=-1),w&&(this.addCurrentVertex(d,this.distance,k,-1,-1,!0,y,u),this.addCurrentVertex(d,this.distance,k,0,0,!1,y,u)));if(E&&S<l-1){var R=d.dist(w);if(R>2*h){var N=d.add(w.sub(d)._mult(h/R)._round());this.distance+=N.dist(d),this.addCurrentVertex(N,this.distance,k.mult(1),0,0,!1,y,u),d=N;}}b=!1;}this.programConfigurations.populatePaintArrays(this.layoutVertexArray.length,e,o,s);}},as.prototype.addCurrentVertex=function(t,e,r,n,i,a,o,s){var u,p=this.layoutVertexArray,l=this.indexArray;s&&(e=os(e,s)),u=r.clone(),n&&u._sub(r.perp()._mult(n)),is(p,t,u,a,!1,n,e),this.e3=o.vertexLength++,this.e1>=0&&this.e2>=0&&(l.emplaceBack(this.e1,this.e2,this.e3),o.primitiveLength++),this.e1=this.e2,this.e2=this.e3,u=r.mult(-1),i&&u._sub(r.perp()._mult(i)),is(p,t,u,a,!0,-i,e),this.e3=o.vertexLength++,this.e1>=0&&this.e2>=0&&(l.emplaceBack(this.e1,this.e2,this.e3),o.primitiveLength++),this.e1=this.e2,this.e2=this.e3,e>ns/2&&!s&&(this.distance=0,this.addCurrentVertex(t,this.distance,r,n,i,a,o));},as.prototype.addPieSliceVertex=function(t,e,r,n,i,a){r=r.mult(n?-1:1);var o=this.layoutVertexArray,s=this.indexArray;a&&(e=os(e,a)),is(o,t,r,!1,n,0,e),this.e3=i.vertexLength++,this.e1>=0&&this.e2>=0&&(s.emplaceBack(this.e1,this.e2,this.e3),i.primitiveLength++),n?this.e2=this.e3:this.e1=this.e3;},en("LineBucket",as,{omit:["layers","features"]});var ss=new Cn({"line-cap":new Bn(ft.layout_line["line-cap"]),"line-join":new En(ft.layout_line["line-join"]),"line-miter-limit":new Bn(ft.layout_line["line-miter-limit"]),"line-round-limit":new Bn(ft.layout_line["line-round-limit"])}),us={paint:new Cn({"line-opacity":new En(ft.paint_line["line-opacity"]),"line-color":new En(ft.paint_line["line-color"]),"line-translate":new Bn(ft.paint_line["line-translate"]),"line-translate-anchor":new Bn(ft.paint_line["line-translate-anchor"]),"line-width":new En(ft.paint_line["line-width"]),"line-gap-width":new En(ft.paint_line["line-gap-width"]),"line-offset":new En(ft.paint_line["line-offset"]),"line-blur":new En(ft.paint_line["line-blur"]),"line-dasharray":new Vn(ft.paint_line["line-dasharray"]),"line-pattern":new Pn(ft.paint_line["line-pattern"]),"line-gradient":new Mn(ft.paint_line["line-gradient"])}),layout:ss},ps=new(function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.possiblyEvaluate=function(e,r){return r=new xn(Math.floor(r.zoom),{now:r.now,fadeDuration:r.fadeDuration,zoomHistory:r.zoomHistory,transition:r.transition}),t.prototype.possiblyEvaluate.call(this,e,r)},e.prototype.evaluate=function(e,r,n,i){return r=c({},r,{zoom:Math.floor(r.zoom)}),t.prototype.evaluate.call(this,e,r,n,i)},e}(En))(us.paint.properties["line-width"].specification);ps.useIntegerZoom=!0;var ls=function(t){function e(e){t.call(this,e,us);}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype._handleSpecialPaintPropertyUpdate=function(t){"line-gradient"===t&&this._updateGradient();},e.prototype._updateGradient=function(){var t=this._transitionablePaint._values["line-gradient"].value.expression;this.gradient=Na(t,"lineProgress"),this.gradientTexture=null;},e.prototype.recalculate=function(e){t.prototype.recalculate.call(this,e),this.paint._values["line-floorwidth"]=ps.possiblyEvaluate(this._transitioningPaint._values["line-width"].value,e);},e.prototype.createBucket=function(t){return new as(t)},e.prototype.queryRadius=function(t){var e=t,r=cs(oa("line-width",this,e),oa("line-gap-width",this,e)),n=oa("line-offset",this,e);return r/2+Math.abs(n)+sa(this.paint.get("line-translate"))},e.prototype.queryIntersectsFeature=function(t,e,r,n,a,o,s){var u=ua(t,this.paint.get("line-translate"),this.paint.get("line-translate-anchor"),o.angle,s),p=s/2*cs(this.paint.get("line-width").evaluate(e,r),this.paint.get("line-gap-width").evaluate(e,r)),l=this.paint.get("line-offset").evaluate(e,r);return l&&(n=function(t,e){for(var r=[],n=new i(0,0),a=0;a<t.length;a++){for(var o=t[a],s=[],u=0;u<o.length;u++){var p=o[u-1],l=o[u],c=o[u+1],h=0===u?n:l.sub(p)._unit()._perp(),f=u===o.length-1?n:c.sub(l)._unit()._perp(),y=h._add(f)._unit(),d=y.x*f.x+y.y*f.y;y._mult(1/d),s.push(y._mult(e)._add(l));}r.push(s);}return r}(n,l*s)),Wi(u,n,p)},e}(Tn);function cs(t,e){return e>0?e+2*t:t}var hs=Dn([{name:"a_pos_offset",components:4,type:"Int16"},{name:"a_data",components:4,type:"Uint16"}]),fs=Dn([{name:"a_projected_pos",components:3,type:"Float32"}],4),ys=(Dn([{name:"a_fade_opacity",components:1,type:"Uint32"}],4),Dn([{name:"a_placed",components:2,type:"Uint8"}],4)),ds=(Dn([{type:"Int16",name:"anchorPointX"},{type:"Int16",name:"anchorPointY"},{type:"Int16",name:"x1"},{type:"Int16",name:"y1"},{type:"Int16",name:"x2"},{type:"Int16",name:"y2"},{type:"Uint32",name:"featureIndex"},{type:"Uint16",name:"sourceLayerIndex"},{type:"Uint16",name:"bucketIndex"},{type:"Int16",name:"radius"},{type:"Int16",name:"signedDistanceFromAnchor"}]),Dn([{name:"a_pos",components:2,type:"Int16"},{name:"a_anchor_pos",components:2,type:"Int16"},{name:"a_extrude",components:2,type:"Int16"}],4)),ms=Dn([{name:"a_pos",components:2,type:"Int16"},{name:"a_anchor_pos",components:2,type:"Int16"},{name:"a_extrude",components:2,type:"Int16"}],4);Dn([{type:"Int16",name:"anchorX"},{type:"Int16",name:"anchorY"},{type:"Uint16",name:"glyphStartIndex"},{type:"Uint16",name:"numGlyphs"},{type:"Uint32",name:"vertexStartIndex"},{type:"Uint32",name:"lineStartIndex"},{type:"Uint32",name:"lineLength"},{type:"Uint16",name:"segment"},{type:"Uint16",name:"lowerSize"},{type:"Uint16",name:"upperSize"},{type:"Float32",name:"lineOffsetX"},{type:"Float32",name:"lineOffsetY"},{type:"Uint8",name:"writingMode"},{type:"Uint8",name:"hidden"}]),Dn([{type:"Int16",name:"anchorX"},{type:"Int16",name:"anchorY"},{type:"Int16",name:"horizontalPlacedTextSymbolIndex"},{type:"Int16",name:"verticalPlacedTextSymbolIndex"},{type:"Uint16",name:"key"},{type:"Uint16",name:"textBoxStartIndex"},{type:"Uint16",name:"textBoxEndIndex"},{type:"Uint16",name:"iconBoxStartIndex"},{type:"Uint16",name:"iconBoxEndIndex"},{type:"Uint16",name:"featureIndex"},{type:"Uint16",name:"numGlyphVertices"},{type:"Uint16",name:"numVerticalGlyphVertices"},{type:"Uint16",name:"numIconVertices"},{type:"Uint32",name:"crossTileID"}]),Dn([{type:"Float32",name:"offsetX"}]),Dn([{type:"Int16",name:"x"},{type:"Int16",name:"y"},{type:"Int16",name:"tileUnitDistanceFromAnchor"}]);function vs(t,e,r){return t.sections.forEach(function(t){t.text=function(t,e,r){var n=e.layout.get("text-transform").evaluate(r,{});return "uppercase"===n?t=t.toLocaleUpperCase():"lowercase"===n&&(t=t.toLocaleLowerCase()),gn.applyArabicShaping&&(t=gn.applyArabicShaping(t)),t}(t.text,e,r);}),t}var gs={"!":"︕","#":"＃",$:"＄","%":"％","&":"＆","(":"︵",")":"︶","*":"＊","+":"＋",",":"︐","-":"︲",".":"・","/":"／",":":"︓",";":"︔","<":"︿","=":"＝",">":"﹀","?":"︖","@":"＠","[":"﹇","\\":"＼","]":"﹈","^":"＾",_:"︳","`":"｀","{":"︷","|":"―","}":"︸","~":"～","¢":"￠","£":"￡","¥":"￥","¦":"￤","¬":"￢","¯":"￣","–":"︲","—":"︱","‘":"﹃","’":"﹄","“":"﹁","”":"﹂","…":"︙","‧":"・","₩":"￦","、":"︑","。":"︒","〈":"︿","〉":"﹀","《":"︽","》":"︾","「":"﹁","」":"﹂","『":"﹃","』":"﹄","【":"︻","】":"︼","〔":"︹","〕":"︺","〖":"︗","〗":"︘","！":"︕","（":"︵","）":"︶","，":"︐","－":"︲","．":"・","：":"︓","；":"︔","＜":"︿","＞":"﹀","？":"︖","［":"﹇","］":"﹈","＿":"︳","｛":"︷","｜":"―","｝":"︸","｟":"︵","｠":"︶","｡":"︒","｢":"﹁","｣":"﹂"};var xs=function(t){function e(e,r,n,i){t.call(this,e,r),this.angle=n,void 0!==i&&(this.segment=i);}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.clone=function(){return new e(this.x,this.y,this.angle,this.segment)},e}(i);en("Anchor",xs);var bs=256;function _s(t,e){var r=e.expression;if("constant"===r.kind)return {functionType:"constant",layoutSize:r.evaluate(new xn(t+1))};if("source"===r.kind)return {functionType:"source"};for(var n=r.zoomStops,i=0;i<n.length&&n[i]<=t;)i++;for(var a=i=Math.max(0,i-1);a<n.length&&n[a]<t+1;)a++;a=Math.min(n.length-1,a);var o={min:n[i],max:n[a]};return "composite"===r.kind?{functionType:"composite",zoomRange:o,propertyValue:e.value}:{functionType:"camera",layoutSize:r.evaluate(new xn(t+1)),zoomRange:o,sizeRange:{min:r.evaluate(new xn(o.min)),max:r.evaluate(new xn(o.max))},propertyValue:e.value}}var ws=Wo.VectorTileFeature.types,As=[{name:"a_fade_opacity",components:1,type:"Uint8",offset:0}];function ks(t,e,r,n,i,a,o,s){t.emplaceBack(e,r,Math.round(32*n),Math.round(32*i),a,o,s?s[0]:0,s?s[1]:0);}function Ss(t,e,r){t.emplaceBack(e.x,e.y,r),t.emplaceBack(e.x,e.y,r),t.emplaceBack(e.x,e.y,r),t.emplaceBack(e.x,e.y,r);}var zs=function(t){this.layoutVertexArray=new Zn,this.indexArray=new ri,this.programConfigurations=t,this.segments=new _i,this.dynamicLayoutVertexArray=new Xn,this.opacityVertexArray=new Kn,this.placedSymbolArray=new li;};zs.prototype.upload=function(t,e,r,n){r&&(this.layoutVertexBuffer=t.createVertexBuffer(this.layoutVertexArray,hs.members),this.indexBuffer=t.createIndexBuffer(this.indexArray,e),this.dynamicLayoutVertexBuffer=t.createVertexBuffer(this.dynamicLayoutVertexArray,fs.members,!0),this.opacityVertexBuffer=t.createVertexBuffer(this.opacityVertexArray,As,!0),this.opacityVertexBuffer.itemSize=1),(r||n)&&this.programConfigurations.upload(t);},zs.prototype.destroy=function(){this.layoutVertexBuffer&&(this.layoutVertexBuffer.destroy(),this.indexBuffer.destroy(),this.programConfigurations.destroy(),this.segments.destroy(),this.dynamicLayoutVertexBuffer.destroy(),this.opacityVertexBuffer.destroy());},en("SymbolBuffers",zs);var Is=function(t,e,r){this.layoutVertexArray=new t,this.layoutAttributes=e,this.indexArray=new r,this.segments=new _i,this.collisionVertexArray=new Yn;};Is.prototype.upload=function(t){this.layoutVertexBuffer=t.createVertexBuffer(this.layoutVertexArray,this.layoutAttributes),this.indexBuffer=t.createIndexBuffer(this.indexArray),this.collisionVertexBuffer=t.createVertexBuffer(this.collisionVertexArray,ys.members,!0);},Is.prototype.destroy=function(){this.layoutVertexBuffer&&(this.layoutVertexBuffer.destroy(),this.indexBuffer.destroy(),this.segments.destroy(),this.collisionVertexBuffer.destroy());},en("CollisionBuffers",Is);var Bs=function(t){this.collisionBoxArray=t.collisionBoxArray,this.zoom=t.zoom,this.overscaling=t.overscaling,this.layers=t.layers,this.layerIds=this.layers.map(function(t){return t.id}),this.index=t.index,this.pixelRatio=t.pixelRatio,this.sourceLayerIndex=t.sourceLayerIndex,this.hasPattern=!1;var e=this.layers[0]._unevaluatedLayout._values;this.textSizeData=_s(this.zoom,e["text-size"]),this.iconSizeData=_s(this.zoom,e["icon-size"]);var r=this.layers[0].layout,n="viewport-y"===r.get("symbol-z-order");this.sortFeaturesByY=n&&(r.get("text-allow-overlap")||r.get("icon-allow-overlap")||r.get("text-ignore-placement")||r.get("icon-ignore-placement")),this.sourceID=t.sourceID;};Bs.prototype.createArrays=function(){this.text=new zs(new qi(hs.members,this.layers,this.zoom,function(t){return /^text/.test(t)})),this.icon=new zs(new qi(hs.members,this.layers,this.zoom,function(t){return /^icon/.test(t)})),this.collisionBox=new Is(Jn,ds.members,ni),this.collisionCircle=new Is(Jn,ms.members,ri),this.glyphOffsetArray=new yi,this.lineVertexArray=new mi,this.symbolInstances=new hi;},Bs.prototype.calculateGlyphDependencies=function(t,e,r,n){for(var i=0;i<t.length;i++)if(e[t.charCodeAt(i)]=!0,r&&n){var a=gs[t.charAt(i)];a&&(e[a.charCodeAt(0)]=!0);}},Bs.prototype.populate=function(t,e){var r=this.layers[0],n=r.layout,i=n.get("text-font"),a=n.get("text-field"),o=n.get("icon-image"),s=("constant"!==a.value.kind||a.value.value.toString().length>0)&&("constant"!==i.value.kind||i.value.value.length>0),u="constant"!==o.value.kind||o.value.value&&o.value.value.length>0;if(this.features=[],s||u){for(var p=e.iconDependencies,l=e.glyphDependencies,c=new xn(this.zoom),h=0,f=t;h<f.length;h+=1){var y=f[h],d=y.feature,m=y.index,v=y.sourceLayerIndex;if(r._featureFilter(c,d)){var g=void 0;if(s){var x=r.getValueAndResolveTokens("text-field",d);g=vs(x instanceof Dt?x:Dt.fromString(x),r,d);}var b=void 0;if(u&&(b=r.getValueAndResolveTokens("icon-image",d)),g||b){var _={text:g,icon:b,index:m,sourceLayerIndex:v,geometry:Ki(d),properties:d.properties,type:ws[d.type]};if(void 0!==d.id&&(_.id=d.id),this.features.push(_),b&&(p[b]=!0),g)for(var w=i.evaluate(d,{}).join(","),A="map"===n.get("text-rotation-alignment")&&"point"!==n.get("symbol-placement"),k=0,S=g.sections;k<S.length;k+=1){var z=S[k],I=un(g.toString()),B=z.fontStack||w,E=l[B]=l[B]||{};this.calculateGlyphDependencies(z.text,E,A,I);}}}}"line"===n.get("symbol-placement")&&(this.features=function(t){var e={},r={},n=[],i=0;function a(e){n.push(t[e]),i++;}function o(t,e,i){var a=r[t];return delete r[t],r[e]=a,n[a].geometry[0].pop(),n[a].geometry[0]=n[a].geometry[0].concat(i[0]),a}function s(t,r,i){var a=e[r];return delete e[r],e[t]=a,n[a].geometry[0].shift(),n[a].geometry[0]=i[0].concat(n[a].geometry[0]),a}function u(t,e,r){var n=r?e[0][e[0].length-1]:e[0][0];return t+":"+n.x+":"+n.y}for(var p=0;p<t.length;p++){var l=t[p],c=l.geometry,h=l.text?l.text.toString():null;if(h){var f=u(h,c),y=u(h,c,!0);if(f in r&&y in e&&r[f]!==e[y]){var d=s(f,y,c),m=o(f,y,n[d].geometry);delete e[f],delete r[y],r[u(h,n[m].geometry,!0)]=m,n[d].geometry=null;}else f in r?o(f,y,c):y in e?s(f,y,c):(a(p),e[f]=i-1,r[y]=i-1);}else a(p);}return n.filter(function(t){return t.geometry})}(this.features));}},Bs.prototype.update=function(t,e,r){this.stateDependentLayers.length&&(this.text.programConfigurations.updatePaintArrays(t,e,this.layers,r),this.icon.programConfigurations.updatePaintArrays(t,e,this.layers,r));},Bs.prototype.isEmpty=function(){return 0===this.symbolInstances.length},Bs.prototype.uploadPending=function(){return !this.uploaded||this.text.programConfigurations.needsUpload||this.icon.programConfigurations.needsUpload},Bs.prototype.upload=function(t){this.uploaded||(this.collisionBox.upload(t),this.collisionCircle.upload(t)),this.text.upload(t,this.sortFeaturesByY,!this.uploaded,this.text.programConfigurations.needsUpload),this.icon.upload(t,this.sortFeaturesByY,!this.uploaded,this.icon.programConfigurations.needsUpload),this.uploaded=!0;},Bs.prototype.destroy=function(){this.text.destroy(),this.icon.destroy(),this.collisionBox.destroy(),this.collisionCircle.destroy();},Bs.prototype.addToLineVertexArray=function(t,e){var r=this.lineVertexArray.length;if(void 0!==t.segment){for(var n=t.dist(e[t.segment+1]),i=t.dist(e[t.segment]),a={},o=t.segment+1;o<e.length;o++)a[o]={x:e[o].x,y:e[o].y,tileUnitDistanceFromAnchor:n},o<e.length-1&&(n+=e[o+1].dist(e[o]));for(var s=t.segment||0;s>=0;s--)a[s]={x:e[s].x,y:e[s].y,tileUnitDistanceFromAnchor:i},s>0&&(i+=e[s-1].dist(e[s]));for(var u=0;u<e.length;u++){var p=a[u];this.lineVertexArray.emplaceBack(p.x,p.y,p.tileUnitDistanceFromAnchor);}}return {lineStartIndex:r,lineLength:this.lineVertexArray.length-r}},Bs.prototype.addSymbols=function(t,e,r,n,i,a,o,s,u,p){for(var l=t.indexArray,c=t.layoutVertexArray,h=t.dynamicLayoutVertexArray,f=t.segments.prepareSegment(4*e.length,t.layoutVertexArray,t.indexArray),y=this.glyphOffsetArray.length,d=f.vertexLength,m=0,v=e;m<v.length;m+=1){var g=v[m],x=g.tl,b=g.tr,_=g.bl,w=g.br,A=g.tex,k=f.vertexLength,S=g.glyphOffset[1];ks(c,s.x,s.y,x.x,S+x.y,A.x,A.y,r),ks(c,s.x,s.y,b.x,S+b.y,A.x+A.w,A.y,r),ks(c,s.x,s.y,_.x,S+_.y,A.x,A.y+A.h,r),ks(c,s.x,s.y,w.x,S+w.y,A.x+A.w,A.y+A.h,r),Ss(h,s,0),l.emplaceBack(k,k+1,k+2),l.emplaceBack(k+1,k+2,k+3),f.vertexLength+=4,f.primitiveLength+=2,this.glyphOffsetArray.emplaceBack(g.glyphOffset[0]);}t.placedSymbolArray.emplaceBack(s.x,s.y,y,this.glyphOffsetArray.length-y,d,u,p,s.segment,r?r[0]:0,r?r[1]:0,n[0],n[1],o,!1),t.programConfigurations.populatePaintArrays(t.layoutVertexArray.length,a,a.index,{});},Bs.prototype._addCollisionDebugVertex=function(t,e,r,n,i,a){return e.emplaceBack(0,0),t.emplaceBack(r.x,r.y,n,i,Math.round(a.x),Math.round(a.y))},Bs.prototype.addCollisionDebugVertices=function(t,e,r,n,a,o,s,u){var p=a.segments.prepareSegment(4,a.layoutVertexArray,a.indexArray),l=p.vertexLength,c=a.layoutVertexArray,h=a.collisionVertexArray,f=s.anchorX,y=s.anchorY;if(this._addCollisionDebugVertex(c,h,o,f,y,new i(t,e)),this._addCollisionDebugVertex(c,h,o,f,y,new i(r,e)),this._addCollisionDebugVertex(c,h,o,f,y,new i(r,n)),this._addCollisionDebugVertex(c,h,o,f,y,new i(t,n)),p.vertexLength+=4,u){var d=a.indexArray;d.emplaceBack(l,l+1,l+2),d.emplaceBack(l,l+2,l+3),p.primitiveLength+=2;}else{var m=a.indexArray;m.emplaceBack(l,l+1),m.emplaceBack(l+1,l+2),m.emplaceBack(l+2,l+3),m.emplaceBack(l+3,l),p.primitiveLength+=4;}},Bs.prototype.addDebugCollisionBoxes=function(t,e,r){for(var n=t;n<e;n++){var i=this.collisionBoxArray.get(n),a=i.x1,o=i.y1,s=i.x2,u=i.y2,p=i.radius>0;this.addCollisionDebugVertices(a,o,s,u,p?this.collisionCircle:this.collisionBox,i.anchorPoint,r,p);}},Bs.prototype.generateCollisionDebugBuffers=function(){for(var t=0;t<this.symbolInstances.length;t++){var e=this.symbolInstances.get(t);this.addDebugCollisionBoxes(e.textBoxStartIndex,e.textBoxEndIndex,e),this.addDebugCollisionBoxes(e.iconBoxStartIndex,e.iconBoxEndIndex,e);}},Bs.prototype._deserializeCollisionBoxesForSymbol=function(t,e,r,n,i){for(var a={},o=e;o<r;o++){var s=t.get(o);if(0===s.radius){a.textBox={x1:s.x1,y1:s.y1,x2:s.x2,y2:s.y2,anchorPointX:s.anchorPointX,anchorPointY:s.anchorPointY},a.textFeatureIndex=s.featureIndex;break}a.textCircles||(a.textCircles=[],a.textFeatureIndex=s.featureIndex);a.textCircles.push(s.anchorPointX,s.anchorPointY,s.radius,s.signedDistanceFromAnchor,1);}for(var u=n;u<i;u++){var p=t.get(u);if(0===p.radius){a.iconBox={x1:p.x1,y1:p.y1,x2:p.x2,y2:p.y2,anchorPointX:p.anchorPointX,anchorPointY:p.anchorPointY},a.iconFeatureIndex=p.featureIndex;break}}return a},Bs.prototype.deserializeCollisionBoxes=function(t){this.collisionArrays=[];for(var e=0;e<this.symbolInstances.length;e++){var r=this.symbolInstances.get(e);this.collisionArrays.push(this._deserializeCollisionBoxesForSymbol(t,r.textBoxStartIndex,r.textBoxEndIndex,r.iconBoxStartIndex,r.iconBoxEndIndex));}},Bs.prototype.hasTextData=function(){return this.text.segments.get().length>0},Bs.prototype.hasIconData=function(){return this.icon.segments.get().length>0},Bs.prototype.hasCollisionBoxData=function(){return this.collisionBox.segments.get().length>0},Bs.prototype.hasCollisionCircleData=function(){return this.collisionCircle.segments.get().length>0},Bs.prototype.addIndicesForPlacedTextSymbol=function(t){for(var e=this.text.placedSymbolArray.get(t),r=e.vertexStartIndex+4*e.numGlyphs,n=e.vertexStartIndex;n<r;n+=4)this.text.indexArray.emplaceBack(n,n+1,n+2),this.text.indexArray.emplaceBack(n+1,n+2,n+3);},Bs.prototype.sortFeatures=function(t){if(this.sortFeaturesByY&&this.sortedAngle!==t&&(this.sortedAngle=t,!(this.text.segments.get().length>1||this.icon.segments.get().length>1))){for(var e=[],r=0;r<this.symbolInstances.length;r++)e.push(r);for(var n=Math.sin(t),i=Math.cos(t),a=[],o=[],s=0;s<this.symbolInstances.length;s++){var u=this.symbolInstances.get(s);a.push(0|Math.round(n*u.anchorX+i*u.anchorY)),o.push(u.featureIndex);}e.sort(function(t,e){return a[t]-a[e]||o[e]-o[t]}),this.text.indexArray.clear(),this.icon.indexArray.clear(),this.featureSortOrder=[];for(var p=0,l=e;p<l.length;p+=1){var c=l[p],h=this.symbolInstances.get(c);this.featureSortOrder.push(h.featureIndex),h.horizontalPlacedTextSymbolIndex>=0&&this.addIndicesForPlacedTextSymbol(h.horizontalPlacedTextSymbolIndex),h.verticalPlacedTextSymbolIndex>=0&&this.addIndicesForPlacedTextSymbol(h.verticalPlacedTextSymbolIndex);var f=this.icon.placedSymbolArray.get(c);if(f.numGlyphs){var y=f.vertexStartIndex;this.icon.indexArray.emplaceBack(y,y+1,y+2),this.icon.indexArray.emplaceBack(y+1,y+2,y+3);}}this.text.indexBuffer&&this.text.indexBuffer.updateData(this.text.indexArray),this.icon.indexBuffer&&this.icon.indexBuffer.updateData(this.icon.indexArray);}},en("SymbolBucket",Bs,{omit:["layers","collisionBoxArray","features","compareText"]}),Bs.MAX_GLYPHS=65535,Bs.addDynamicAttributes=Ss;var Es=new Cn({"symbol-placement":new Bn(ft.layout_symbol["symbol-placement"]),"symbol-spacing":new Bn(ft.layout_symbol["symbol-spacing"]),"symbol-avoid-edges":new Bn(ft.layout_symbol["symbol-avoid-edges"]),"symbol-z-order":new Bn(ft.layout_symbol["symbol-z-order"]),"icon-allow-overlap":new Bn(ft.layout_symbol["icon-allow-overlap"]),"icon-ignore-placement":new Bn(ft.layout_symbol["icon-ignore-placement"]),"icon-optional":new Bn(ft.layout_symbol["icon-optional"]),"icon-rotation-alignment":new Bn(ft.layout_symbol["icon-rotation-alignment"]),"icon-size":new En(ft.layout_symbol["icon-size"]),"icon-text-fit":new Bn(ft.layout_symbol["icon-text-fit"]),"icon-text-fit-padding":new Bn(ft.layout_symbol["icon-text-fit-padding"]),"icon-image":new En(ft.layout_symbol["icon-image"]),"icon-rotate":new En(ft.layout_symbol["icon-rotate"]),"icon-padding":new Bn(ft.layout_symbol["icon-padding"]),"icon-keep-upright":new Bn(ft.layout_symbol["icon-keep-upright"]),"icon-offset":new En(ft.layout_symbol["icon-offset"]),"icon-anchor":new En(ft.layout_symbol["icon-anchor"]),"icon-pitch-alignment":new Bn(ft.layout_symbol["icon-pitch-alignment"]),"text-pitch-alignment":new Bn(ft.layout_symbol["text-pitch-alignment"]),"text-rotation-alignment":new Bn(ft.layout_symbol["text-rotation-alignment"]),"text-field":new En(ft.layout_symbol["text-field"]),"text-font":new En(ft.layout_symbol["text-font"]),"text-size":new En(ft.layout_symbol["text-size"]),"text-max-width":new En(ft.layout_symbol["text-max-width"]),"text-line-height":new Bn(ft.layout_symbol["text-line-height"]),"text-letter-spacing":new En(ft.layout_symbol["text-letter-spacing"]),"text-justify":new En(ft.layout_symbol["text-justify"]),"text-anchor":new En(ft.layout_symbol["text-anchor"]),"text-max-angle":new Bn(ft.layout_symbol["text-max-angle"]),"text-rotate":new En(ft.layout_symbol["text-rotate"]),"text-padding":new Bn(ft.layout_symbol["text-padding"]),"text-keep-upright":new Bn(ft.layout_symbol["text-keep-upright"]),"text-transform":new En(ft.layout_symbol["text-transform"]),"text-offset":new En(ft.layout_symbol["text-offset"]),"text-allow-overlap":new Bn(ft.layout_symbol["text-allow-overlap"]),"text-ignore-placement":new Bn(ft.layout_symbol["text-ignore-placement"]),"text-optional":new Bn(ft.layout_symbol["text-optional"])}),Ps={paint:new Cn({"icon-opacity":new En(ft.paint_symbol["icon-opacity"]),"icon-color":new En(ft.paint_symbol["icon-color"]),"icon-halo-color":new En(ft.paint_symbol["icon-halo-color"]),"icon-halo-width":new En(ft.paint_symbol["icon-halo-width"]),"icon-halo-blur":new En(ft.paint_symbol["icon-halo-blur"]),"icon-translate":new Bn(ft.paint_symbol["icon-translate"]),"icon-translate-anchor":new Bn(ft.paint_symbol["icon-translate-anchor"]),"text-opacity":new En(ft.paint_symbol["text-opacity"]),"text-color":new En(ft.paint_symbol["text-color"]),"text-halo-color":new En(ft.paint_symbol["text-halo-color"]),"text-halo-width":new En(ft.paint_symbol["text-halo-width"]),"text-halo-blur":new En(ft.paint_symbol["text-halo-blur"]),"text-translate":new Bn(ft.paint_symbol["text-translate"]),"text-translate-anchor":new Bn(ft.paint_symbol["text-translate-anchor"])}),layout:Es},Vs=function(t){function e(e){t.call(this,e,Ps);}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.recalculate=function(e){t.prototype.recalculate.call(this,e),"auto"===this.layout.get("icon-rotation-alignment")&&("point"!==this.layout.get("symbol-placement")?this.layout._values["icon-rotation-alignment"]="map":this.layout._values["icon-rotation-alignment"]="viewport"),"auto"===this.layout.get("text-rotation-alignment")&&("point"!==this.layout.get("symbol-placement")?this.layout._values["text-rotation-alignment"]="map":this.layout._values["text-rotation-alignment"]="viewport"),"auto"===this.layout.get("text-pitch-alignment")&&(this.layout._values["text-pitch-alignment"]=this.layout.get("text-rotation-alignment")),"auto"===this.layout.get("icon-pitch-alignment")&&(this.layout._values["icon-pitch-alignment"]=this.layout.get("icon-rotation-alignment"));},e.prototype.getValueAndResolveTokens=function(t,e){var r,n=this.layout.get(t).evaluate(e,{}),i=this._unevaluatedLayout._values[t];return i.isDataDriven()||pr(i.value)?n:(r=e.properties,n.replace(/{([^{}]+)}/g,function(t,e){return e in r?String(r[e]):""}))},e.prototype.createBucket=function(t){return new Bs(t)},e.prototype.queryRadius=function(){return 0},e.prototype.queryIntersectsFeature=function(){return !1},e}(Tn),Ms={paint:new Cn({"background-color":new Bn(ft.paint_background["background-color"]),"background-pattern":new Vn(ft.paint_background["background-pattern"]),"background-opacity":new Bn(ft.paint_background["background-opacity"])})},Cs=function(t){function e(e){t.call(this,e,Ms);}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e}(Tn),Ts={paint:new Cn({"raster-opacity":new Bn(ft.paint_raster["raster-opacity"]),"raster-hue-rotate":new Bn(ft.paint_raster["raster-hue-rotate"]),"raster-brightness-min":new Bn(ft.paint_raster["raster-brightness-min"]),"raster-brightness-max":new Bn(ft.paint_raster["raster-brightness-max"]),"raster-saturation":new Bn(ft.paint_raster["raster-saturation"]),"raster-contrast":new Bn(ft.paint_raster["raster-contrast"]),"raster-resampling":new Bn(ft.paint_raster["raster-resampling"]),"raster-fade-duration":new Bn(ft.paint_raster["raster-fade-duration"])})},Fs=function(t){function e(e){t.call(this,e,Ts);}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e}(Tn);var Ls=function(t){function e(e){t.call(this,e,{}),this.implementation=e;}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.hasOffscreenPass=function(){return void 0!==this.implementation.prerender||"3d"===this.implementation.renderingMode},e.prototype.recalculate=function(){},e.prototype.updateTransitions=function(){},e.prototype.hasTransition=function(){},e.prototype.serialize=function(){},e.prototype.resize=function(){this.viewportFrame&&(this.viewportFrame.destroy(),this.viewportFrame=null);},e.prototype.onAdd=function(t){this.implementation.onAdd&&this.implementation.onAdd(t,t.painter.context.gl);},e.prototype.onRemove=function(t){this.implementation.onRemove&&this.implementation.onRemove(t);},e}(Tn),Os={circle:Ta,heatmap:Ga,hillshade:Xa,fill:Mo,"fill-extrusion":qo,line:ls,symbol:Vs,background:Cs,raster:Fs};function Ds(t){for(var e=0,r=0,n=0,i=t;n<i.length;n+=1){var a=i[n];e+=a.w*a.h,r=Math.max(r,a.w);}t.sort(function(t,e){return e.h-t.h});for(var o=[{x:0,y:0,w:Math.max(Math.ceil(Math.sqrt(e/.95)),r),h:1/0}],s=0,u=0,p=0,l=t;p<l.length;p+=1)for(var c=l[p],h=o.length-1;h>=0;h--){var f=o[h];if(!(c.w>f.w||c.h>f.h)){if(c.x=f.x,c.y=f.y,u=Math.max(u,c.y+c.h),s=Math.max(s,c.x+c.w),c.w===f.w&&c.h===f.h){var y=o.pop();h<o.length&&(o[h]=y);}else c.h===f.h?(f.x+=c.w,f.w-=c.w):c.w===f.w?(f.y+=c.h,f.h-=c.h):(o.push({x:f.x+c.w,y:f.y,w:f.w-c.w,h:c.h}),f.y+=c.h,f.h-=c.h);break}}return {w:s,h:u,fill:e/(s*u)||0}}var Us=function(t,e){var r=e.pixelRatio;this.paddedRect=t,this.pixelRatio=r;},js={tl:{configurable:!0},br:{configurable:!0},tlbr:{configurable:!0},displaySize:{configurable:!0}};js.tl.get=function(){return [this.paddedRect.x+1,this.paddedRect.y+1]},js.br.get=function(){return [this.paddedRect.x+this.paddedRect.w-1,this.paddedRect.y+this.paddedRect.h-1]},js.tlbr.get=function(){return this.tl.concat(this.br)},js.displaySize.get=function(){return [(this.paddedRect.w-2)/this.pixelRatio,(this.paddedRect.h-2)/this.pixelRatio]},Object.defineProperties(Us.prototype,js);var qs=function(t,e){var r={},n={},i=[];for(var a in t){var o=t[a],s={x:0,y:0,w:o.data.width+2,h:o.data.height+2};i.push(s),r[a]=new Us(s,o);}for(var u in e){var p=e[u],l={x:0,y:0,w:p.data.width+2,h:p.data.height+2};i.push(l),n[u]=new Us(l,p);}var c=Ds(i),h=c.w,f=c.h,y=new qa({width:h||1,height:f||1});for(var d in t){var m=t[d],v=r[d].paddedRect;qa.copy(m.data,y,{x:0,y:0},{x:v.x+1,y:v.y+1},m.data);}for(var g in e){var x=e[g],b=n[g].paddedRect,_=b.x+1,w=b.y+1,A=x.data.width,k=x.data.height;qa.copy(x.data,y,{x:0,y:0},{x:_,y:w},x.data),qa.copy(x.data,y,{x:0,y:k-1},{x:_,y:w-1},{width:A,height:1}),qa.copy(x.data,y,{x:0,y:0},{x:_,y:w+k},{width:A,height:1}),qa.copy(x.data,y,{x:A-1,y:0},{x:_-1,y:w},{width:1,height:k}),qa.copy(x.data,y,{x:0,y:0},{x:_+A,y:w},{width:1,height:k});}this.image=y,this.iconPositions=r,this.patternPositions=n;};en("ImagePosition",Us),en("ImageAtlas",qs);var Rs=self.HTMLImageElement,Ns=self.HTMLCanvasElement,Gs=self.HTMLVideoElement,Zs=self.ImageData,Xs=function(t,e,r,n){this.context=t,this.format=r,this.texture=t.gl.createTexture(),this.update(e,n);};Xs.prototype.update=function(t,e){var r=t.width,n=t.height,i=!this.size||this.size[0]!==r||this.size[1]!==n,a=this.context,o=a.gl;this.useMipmap=Boolean(e&&e.useMipmap),o.bindTexture(o.TEXTURE_2D,this.texture),a.pixelStoreUnpackFlipY.set(!1),a.pixelStoreUnpack.set(1),a.pixelStoreUnpackPremultiplyAlpha.set(this.format===o.RGBA&&(!e||!1!==e.premultiply)),i?(this.size=[r,n],t instanceof Rs||t instanceof Ns||t instanceof Gs||t instanceof Zs?o.texImage2D(o.TEXTURE_2D,0,this.format,this.format,o.UNSIGNED_BYTE,t):o.texImage2D(o.TEXTURE_2D,0,this.format,r,n,0,this.format,o.UNSIGNED_BYTE,t.data)):t instanceof Rs||t instanceof Ns||t instanceof Gs||t instanceof Zs?o.texSubImage2D(o.TEXTURE_2D,0,0,0,o.RGBA,o.UNSIGNED_BYTE,t):o.texSubImage2D(o.TEXTURE_2D,0,0,0,r,n,o.RGBA,o.UNSIGNED_BYTE,t.data),this.useMipmap&&this.isSizePowerOfTwo()&&o.generateMipmap(o.TEXTURE_2D);},Xs.prototype.bind=function(t,e,r){var n=this.context.gl;n.bindTexture(n.TEXTURE_2D,this.texture),r!==n.LINEAR_MIPMAP_NEAREST||this.isSizePowerOfTwo()||(r=n.LINEAR),t!==this.filter&&(n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MAG_FILTER,t),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,r||t),this.filter=t),e!==this.wrap&&(n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,e),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,e),this.wrap=e);},Xs.prototype.isSizePowerOfTwo=function(){return this.size[0]===this.size[1]&&Math.log(this.size[0])/Math.LN2%1==0},Xs.prototype.destroy=function(){this.context.gl.deleteTexture(this.texture),this.texture=null;};var Ks=function(t,e,r,n,i){var a,o,s=8*i-n-1,u=(1<<s)-1,p=u>>1,l=-7,c=r?i-1:0,h=r?-1:1,f=t[e+c];for(c+=h,a=f&(1<<-l)-1,f>>=-l,l+=s;l>0;a=256*a+t[e+c],c+=h,l-=8);for(o=a&(1<<-l)-1,a>>=-l,l+=n;l>0;o=256*o+t[e+c],c+=h,l-=8);if(0===a)a=1-p;else{if(a===u)return o?NaN:1/0*(f?-1:1);o+=Math.pow(2,n),a-=p;}return (f?-1:1)*o*Math.pow(2,a-n)},Hs=function(t,e,r,n,i,a){var o,s,u,p=8*a-i-1,l=(1<<p)-1,c=l>>1,h=23===i?Math.pow(2,-24)-Math.pow(2,-77):0,f=n?0:a-1,y=n?1:-1,d=e<0||0===e&&1/e<0?1:0;for(e=Math.abs(e),isNaN(e)||e===1/0?(s=isNaN(e)?1:0,o=l):(o=Math.floor(Math.log(e)/Math.LN2),e*(u=Math.pow(2,-o))<1&&(o--,u*=2),(e+=o+c>=1?h/u:h*Math.pow(2,1-c))*u>=2&&(o++,u/=2),o+c>=l?(s=0,o=l):o+c>=1?(s=(e*u-1)*Math.pow(2,i),o+=c):(s=e*Math.pow(2,c-1)*Math.pow(2,i),o=0));i>=8;t[r+f]=255&s,f+=y,s/=256,i-=8);for(o=o<<i|s,p+=i;p>0;t[r+f]=255&o,f+=y,o/=256,p-=8);t[r+f-y]|=128*d;},Js=Ys;function Ys(t){this.buf=ArrayBuffer.isView&&ArrayBuffer.isView(t)?t:new Uint8Array(t||0),this.pos=0,this.type=0,this.length=this.buf.length;}Ys.Varint=0,Ys.Fixed64=1,Ys.Bytes=2,Ys.Fixed32=5;function $s(t){return t.type===Ys.Bytes?t.readVarint()+t.pos:t.pos+1}function Ws(t,e,r){return r?4294967296*e+(t>>>0):4294967296*(e>>>0)+(t>>>0)}function Qs(t,e,r){var n=e<=16383?1:e<=2097151?2:e<=268435455?3:Math.ceil(Math.log(e)/(7*Math.LN2));r.realloc(n);for(var i=r.pos-1;i>=t;i--)r.buf[i+n]=r.buf[i];}function tu(t,e){for(var r=0;r<t.length;r++)e.writeVarint(t[r]);}function eu(t,e){for(var r=0;r<t.length;r++)e.writeSVarint(t[r]);}function ru(t,e){for(var r=0;r<t.length;r++)e.writeFloat(t[r]);}function nu(t,e){for(var r=0;r<t.length;r++)e.writeDouble(t[r]);}function iu(t,e){for(var r=0;r<t.length;r++)e.writeBoolean(t[r]);}function au(t,e){for(var r=0;r<t.length;r++)e.writeFixed32(t[r]);}function ou(t,e){for(var r=0;r<t.length;r++)e.writeSFixed32(t[r]);}function su(t,e){for(var r=0;r<t.length;r++)e.writeFixed64(t[r]);}function uu(t,e){for(var r=0;r<t.length;r++)e.writeSFixed64(t[r]);}function pu(t,e){return (t[e]|t[e+1]<<8|t[e+2]<<16)+16777216*t[e+3]}function lu(t,e,r){t[r]=e,t[r+1]=e>>>8,t[r+2]=e>>>16,t[r+3]=e>>>24;}function cu(t,e){return (t[e]|t[e+1]<<8|t[e+2]<<16)+(t[e+3]<<24)}Ys.prototype={destroy:function(){this.buf=null;},readFields:function(t,e,r){for(r=r||this.length;this.pos<r;){var n=this.readVarint(),i=n>>3,a=this.pos;this.type=7&n,t(i,e,this),this.pos===a&&this.skip(n);}return e},readMessage:function(t,e){return this.readFields(t,e,this.readVarint()+this.pos)},readFixed32:function(){var t=pu(this.buf,this.pos);return this.pos+=4,t},readSFixed32:function(){var t=cu(this.buf,this.pos);return this.pos+=4,t},readFixed64:function(){var t=pu(this.buf,this.pos)+4294967296*pu(this.buf,this.pos+4);return this.pos+=8,t},readSFixed64:function(){var t=pu(this.buf,this.pos)+4294967296*cu(this.buf,this.pos+4);return this.pos+=8,t},readFloat:function(){var t=Ks(this.buf,this.pos,!0,23,4);return this.pos+=4,t},readDouble:function(){var t=Ks(this.buf,this.pos,!0,52,8);return this.pos+=8,t},readVarint:function(t){var e,r,n=this.buf;return e=127&(r=n[this.pos++]),r<128?e:(e|=(127&(r=n[this.pos++]))<<7,r<128?e:(e|=(127&(r=n[this.pos++]))<<14,r<128?e:(e|=(127&(r=n[this.pos++]))<<21,r<128?e:function(t,e,r){var n,i,a=r.buf;if(i=a[r.pos++],n=(112&i)>>4,i<128)return Ws(t,n,e);if(i=a[r.pos++],n|=(127&i)<<3,i<128)return Ws(t,n,e);if(i=a[r.pos++],n|=(127&i)<<10,i<128)return Ws(t,n,e);if(i=a[r.pos++],n|=(127&i)<<17,i<128)return Ws(t,n,e);if(i=a[r.pos++],n|=(127&i)<<24,i<128)return Ws(t,n,e);if(i=a[r.pos++],n|=(1&i)<<31,i<128)return Ws(t,n,e);throw new Error("Expected varint not more than 10 bytes")}(e|=(15&(r=n[this.pos]))<<28,t,this))))},readVarint64:function(){return this.readVarint(!0)},readSVarint:function(){var t=this.readVarint();return t%2==1?(t+1)/-2:t/2},readBoolean:function(){return Boolean(this.readVarint())},readString:function(){var t=this.readVarint()+this.pos,e=function(t,e,r){var n="",i=e;for(;i<r;){var a,o,s,u=t[i],p=null,l=u>239?4:u>223?3:u>191?2:1;if(i+l>r)break;1===l?u<128&&(p=u):2===l?128==(192&(a=t[i+1]))&&(p=(31&u)<<6|63&a)<=127&&(p=null):3===l?(a=t[i+1],o=t[i+2],128==(192&a)&&128==(192&o)&&((p=(15&u)<<12|(63&a)<<6|63&o)<=2047||p>=55296&&p<=57343)&&(p=null)):4===l&&(a=t[i+1],o=t[i+2],s=t[i+3],128==(192&a)&&128==(192&o)&&128==(192&s)&&((p=(15&u)<<18|(63&a)<<12|(63&o)<<6|63&s)<=65535||p>=1114112)&&(p=null)),null===p?(p=65533,l=1):p>65535&&(p-=65536,n+=String.fromCharCode(p>>>10&1023|55296),p=56320|1023&p),n+=String.fromCharCode(p),i+=l;}return n}(this.buf,this.pos,t);return this.pos=t,e},readBytes:function(){var t=this.readVarint()+this.pos,e=this.buf.subarray(this.pos,t);return this.pos=t,e},readPackedVarint:function(t,e){var r=$s(this);for(t=t||[];this.pos<r;)t.push(this.readVarint(e));return t},readPackedSVarint:function(t){var e=$s(this);for(t=t||[];this.pos<e;)t.push(this.readSVarint());return t},readPackedBoolean:function(t){var e=$s(this);for(t=t||[];this.pos<e;)t.push(this.readBoolean());return t},readPackedFloat:function(t){var e=$s(this);for(t=t||[];this.pos<e;)t.push(this.readFloat());return t},readPackedDouble:function(t){var e=$s(this);for(t=t||[];this.pos<e;)t.push(this.readDouble());return t},readPackedFixed32:function(t){var e=$s(this);for(t=t||[];this.pos<e;)t.push(this.readFixed32());return t},readPackedSFixed32:function(t){var e=$s(this);for(t=t||[];this.pos<e;)t.push(this.readSFixed32());return t},readPackedFixed64:function(t){var e=$s(this);for(t=t||[];this.pos<e;)t.push(this.readFixed64());return t},readPackedSFixed64:function(t){var e=$s(this);for(t=t||[];this.pos<e;)t.push(this.readSFixed64());return t},skip:function(t){var e=7&t;if(e===Ys.Varint)for(;this.buf[this.pos++]>127;);else if(e===Ys.Bytes)this.pos=this.readVarint()+this.pos;else if(e===Ys.Fixed32)this.pos+=4;else{if(e!==Ys.Fixed64)throw new Error("Unimplemented type: "+e);this.pos+=8;}},writeTag:function(t,e){this.writeVarint(t<<3|e);},realloc:function(t){for(var e=this.length||16;e<this.pos+t;)e*=2;if(e!==this.length){var r=new Uint8Array(e);r.set(this.buf),this.buf=r,this.length=e;}},finish:function(){return this.length=this.pos,this.pos=0,this.buf.subarray(0,this.length)},writeFixed32:function(t){this.realloc(4),lu(this.buf,t,this.pos),this.pos+=4;},writeSFixed32:function(t){this.realloc(4),lu(this.buf,t,this.pos),this.pos+=4;},writeFixed64:function(t){this.realloc(8),lu(this.buf,-1&t,this.pos),lu(this.buf,Math.floor(t*(1/4294967296)),this.pos+4),this.pos+=8;},writeSFixed64:function(t){this.realloc(8),lu(this.buf,-1&t,this.pos),lu(this.buf,Math.floor(t*(1/4294967296)),this.pos+4),this.pos+=8;},writeVarint:function(t){(t=+t||0)>268435455||t<0?function(t,e){var r,n;t>=0?(r=t%4294967296|0,n=t/4294967296|0):(n=~(-t/4294967296),4294967295^(r=~(-t%4294967296))?r=r+1|0:(r=0,n=n+1|0));if(t>=0x10000000000000000||t<-0x10000000000000000)throw new Error("Given varint doesn't fit into 10 bytes");e.realloc(10),function(t,e,r){r.buf[r.pos++]=127&t|128,t>>>=7,r.buf[r.pos++]=127&t|128,t>>>=7,r.buf[r.pos++]=127&t|128,t>>>=7,r.buf[r.pos++]=127&t|128,t>>>=7,r.buf[r.pos]=127&t;}(r,0,e),function(t,e){var r=(7&t)<<4;if(e.buf[e.pos++]|=r|((t>>>=3)?128:0),!t)return;if(e.buf[e.pos++]=127&t|((t>>>=7)?128:0),!t)return;if(e.buf[e.pos++]=127&t|((t>>>=7)?128:0),!t)return;if(e.buf[e.pos++]=127&t|((t>>>=7)?128:0),!t)return;if(e.buf[e.pos++]=127&t|((t>>>=7)?128:0),!t)return;e.buf[e.pos++]=127&t;}(n,e);}(t,this):(this.realloc(4),this.buf[this.pos++]=127&t|(t>127?128:0),t<=127||(this.buf[this.pos++]=127&(t>>>=7)|(t>127?128:0),t<=127||(this.buf[this.pos++]=127&(t>>>=7)|(t>127?128:0),t<=127||(this.buf[this.pos++]=t>>>7&127))));},writeSVarint:function(t){this.writeVarint(t<0?2*-t-1:2*t);},writeBoolean:function(t){this.writeVarint(Boolean(t));},writeString:function(t){t=String(t),this.realloc(4*t.length),this.pos++;var e=this.pos;this.pos=function(t,e,r){for(var n,i,a=0;a<e.length;a++){if((n=e.charCodeAt(a))>55295&&n<57344){if(!i){n>56319||a+1===e.length?(t[r++]=239,t[r++]=191,t[r++]=189):i=n;continue}if(n<56320){t[r++]=239,t[r++]=191,t[r++]=189,i=n;continue}n=i-55296<<10|n-56320|65536,i=null;}else i&&(t[r++]=239,t[r++]=191,t[r++]=189,i=null);n<128?t[r++]=n:(n<2048?t[r++]=n>>6|192:(n<65536?t[r++]=n>>12|224:(t[r++]=n>>18|240,t[r++]=n>>12&63|128),t[r++]=n>>6&63|128),t[r++]=63&n|128);}return r}(this.buf,t,this.pos);var r=this.pos-e;r>=128&&Qs(e,r,this),this.pos=e-1,this.writeVarint(r),this.pos+=r;},writeFloat:function(t){this.realloc(4),Hs(this.buf,t,this.pos,!0,23,4),this.pos+=4;},writeDouble:function(t){this.realloc(8),Hs(this.buf,t,this.pos,!0,52,8),this.pos+=8;},writeBytes:function(t){var e=t.length;this.writeVarint(e),this.realloc(e);for(var r=0;r<e;r++)this.buf[this.pos++]=t[r];},writeRawMessage:function(t,e){this.pos++;var r=this.pos;t(e,this);var n=this.pos-r;n>=128&&Qs(r,n,this),this.pos=r-1,this.writeVarint(n),this.pos+=n;},writeMessage:function(t,e,r){this.writeTag(t,Ys.Bytes),this.writeRawMessage(e,r);},writePackedVarint:function(t,e){this.writeMessage(t,tu,e);},writePackedSVarint:function(t,e){this.writeMessage(t,eu,e);},writePackedBoolean:function(t,e){this.writeMessage(t,iu,e);},writePackedFloat:function(t,e){this.writeMessage(t,ru,e);},writePackedDouble:function(t,e){this.writeMessage(t,nu,e);},writePackedFixed32:function(t,e){this.writeMessage(t,au,e);},writePackedSFixed32:function(t,e){this.writeMessage(t,ou,e);},writePackedFixed64:function(t,e){this.writeMessage(t,su,e);},writePackedSFixed64:function(t,e){this.writeMessage(t,uu,e);},writeBytesField:function(t,e){this.writeTag(t,Ys.Bytes),this.writeBytes(e);},writeFixed32Field:function(t,e){this.writeTag(t,Ys.Fixed32),this.writeFixed32(e);},writeSFixed32Field:function(t,e){this.writeTag(t,Ys.Fixed32),this.writeSFixed32(e);},writeFixed64Field:function(t,e){this.writeTag(t,Ys.Fixed64),this.writeFixed64(e);},writeSFixed64Field:function(t,e){this.writeTag(t,Ys.Fixed64),this.writeSFixed64(e);},writeVarintField:function(t,e){this.writeTag(t,Ys.Varint),this.writeVarint(e);},writeSVarintField:function(t,e){this.writeTag(t,Ys.Varint),this.writeSVarint(e);},writeStringField:function(t,e){this.writeTag(t,Ys.Bytes),this.writeString(e);},writeFloatField:function(t,e){this.writeTag(t,Ys.Fixed32),this.writeFloat(e);},writeDoubleField:function(t,e){this.writeTag(t,Ys.Fixed64),this.writeDouble(e);},writeBooleanField:function(t,e){this.writeVarintField(t,Boolean(e));}};var hu=3;function fu(t,e,r){1===t&&r.readMessage(yu,e);}function yu(t,e,r){if(3===t){var n=r.readMessage(du,{}),i=n.id,a=n.bitmap,o=n.width,s=n.height,u=n.left,p=n.top,l=n.advance;e.push({id:i,bitmap:new ja({width:o+2*hu,height:s+2*hu},a),metrics:{width:o,height:s,left:u,top:p,advance:l}});}}function du(t,e,r){1===t?e.id=r.readVarint():2===t?e.bitmap=r.readBytes():3===t?e.width=r.readVarint():4===t?e.height=r.readVarint():5===t?e.left=r.readSVarint():6===t?e.top=r.readSVarint():7===t&&(e.advance=r.readVarint());}var mu=hu,vu=function(t,e,r){this.target=t,this.parent=e,this.mapId=r,this.callbacks={},this.callbackID=0,m(["receive"],this),this.target.addEventListener("message",this.receive,!1);};function gu(t,e,r){var n=2*Math.PI*6378137/256/Math.pow(2,r);return [t*n-2*Math.PI*6378137/2,e*n-2*Math.PI*6378137/2]}vu.prototype.send=function(t,e,r,n){var i=r?this.mapId+":"+this.callbackID++:null;r&&(this.callbacks[i]=r);var a=[];this.target.postMessage({targetMapId:n,sourceMapId:this.mapId,type:t,id:String(i),data:nn(e,a)},a);},vu.prototype.receive=function(t){var e,r=this,n=t.data,i=n.id;if(!n.targetMapId||this.mapId===n.targetMapId){var a=function(t,e){var n=[];r.target.postMessage({sourceMapId:r.mapId,type:"<response>",id:String(i),error:t?nn(t):null,data:nn(e,n)},n);};if("<response>"===n.type)e=this.callbacks[n.id],delete this.callbacks[n.id],e&&n.error?e(an(n.error)):e&&e(null,an(n.data));else if(void 0!==n.id&&this.parent[n.type])this.parent[n.type](n.sourceMapId,an(n.data),a);else if(void 0!==n.id&&this.parent.getWorkerSource){var o=n.type.split("."),s=an(n.data);this.parent.getWorkerSource(n.sourceMapId,o[0],s.source)[o[1]](s,a);}else this.parent[n.type](an(n.data));}},vu.prototype.remove=function(){this.target.removeEventListener("message",this.receive,!1);};var xu=function(t,e){t&&(e?this.setSouthWest(t).setNorthEast(e):4===t.length?this.setSouthWest([t[0],t[1]]).setNorthEast([t[2],t[3]]):this.setSouthWest(t[0]).setNorthEast(t[1]));};xu.prototype.setNorthEast=function(t){return this._ne=t instanceof bu?new bu(t.lng,t.lat):bu.convert(t),this},xu.prototype.setSouthWest=function(t){return this._sw=t instanceof bu?new bu(t.lng,t.lat):bu.convert(t),this},xu.prototype.extend=function(t){var e,r,n=this._sw,i=this._ne;if(t instanceof bu)e=t,r=t;else{if(!(t instanceof xu))return Array.isArray(t)?t.every(Array.isArray)?this.extend(xu.convert(t)):this.extend(bu.convert(t)):this;if(e=t._sw,r=t._ne,!e||!r)return this}return n||i?(n.lng=Math.min(e.lng,n.lng),n.lat=Math.min(e.lat,n.lat),i.lng=Math.max(r.lng,i.lng),i.lat=Math.max(r.lat,i.lat)):(this._sw=new bu(e.lng,e.lat),this._ne=new bu(r.lng,r.lat)),this},xu.prototype.getCenter=function(){return new bu((this._sw.lng+this._ne.lng)/2,(this._sw.lat+this._ne.lat)/2)},xu.prototype.getSouthWest=function(){return this._sw},xu.prototype.getNorthEast=function(){return this._ne},xu.prototype.getNorthWest=function(){return new bu(this.getWest(),this.getNorth())},xu.prototype.getSouthEast=function(){return new bu(this.getEast(),this.getSouth())},xu.prototype.getWest=function(){return this._sw.lng},xu.prototype.getSouth=function(){return this._sw.lat},xu.prototype.getEast=function(){return this._ne.lng},xu.prototype.getNorth=function(){return this._ne.lat},xu.prototype.toArray=function(){return [this._sw.toArray(),this._ne.toArray()]},xu.prototype.toString=function(){return "LngLatBounds("+this._sw.toString()+", "+this._ne.toString()+")"},xu.prototype.isEmpty=function(){return !(this._sw&&this._ne)},xu.convert=function(t){return !t||t instanceof xu?t:new xu(t)};var bu=function(t,e){if(isNaN(t)||isNaN(e))throw new Error("Invalid LngLat object: ("+t+", "+e+")");if(this.lng=+t,this.lat=+e,this.lat>90||this.lat<-90)throw new Error("Invalid LngLat latitude value: must be between -90 and 90")};function _u(t){return 2*Math.PI*6378137*Math.cos(t*Math.PI/180)}function wu(t){return (180+t)/360}function Au(t){return (180-180/Math.PI*Math.log(Math.tan(Math.PI/4+t*Math.PI/360)))/360}function ku(t,e){return t/_u(e)}function Su(t){var e=180-360*t;return 360/Math.PI*Math.atan(Math.exp(e*Math.PI/180))-90}bu.prototype.wrap=function(){return new bu(l(this.lng,-180,180),this.lat)},bu.prototype.toArray=function(){return [this.lng,this.lat]},bu.prototype.toString=function(){return "LngLat("+this.lng+", "+this.lat+")"},bu.prototype.toBounds=function(t){var e=360*t/40075017,r=e/Math.cos(Math.PI/180*this.lat);return new xu(new bu(this.lng-r,this.lat-e),new bu(this.lng+r,this.lat+e))},bu.convert=function(t){if(t instanceof bu)return t;if(Array.isArray(t)&&(2===t.length||3===t.length))return new bu(Number(t[0]),Number(t[1]));if(!Array.isArray(t)&&"object"==typeof t&&null!==t)return new bu(Number("lng"in t?t.lng:t.lon),Number(t.lat));throw new Error("`LngLatLike` argument must be specified as a LngLat instance, an object {lng: <lng>, lat: <lat>}, an object {lon: <lng>, lat: <lat>}, or an array of [<lng>, <lat>]")};var zu=function(t,e,r){void 0===r&&(r=0),this.x=+t,this.y=+e,this.z=+r;};zu.fromLngLat=function(t,e){void 0===e&&(e=0);var r=bu.convert(t);return new zu(wu(r.lng),Au(r.lat),ku(e,r.lat))},zu.prototype.toLngLat=function(){return new bu(360*this.x-180,Su(this.y))},zu.prototype.toAltitude=function(){return t=this.z,e=this.y,t*_u(Su(e));var t,e;};var Iu=function(t,e,r){this.z=t,this.x=e,this.y=r,this.key=Pu(0,t,e,r);};Iu.prototype.equals=function(t){return this.z===t.z&&this.x===t.x&&this.y===t.y},Iu.prototype.url=function(t,e){var r,n,i,a,o,s=(r=this.x,n=this.y,i=this.z,a=gu(256*r,256*(n=Math.pow(2,i)-n-1),i),o=gu(256*(r+1),256*(n+1),i),a[0]+","+a[1]+","+o[0]+","+o[1]),u=function(t,e,r){for(var n,i="",a=t;a>0;a--)i+=(e&(n=1<<a-1)?1:0)+(r&n?2:0);return i}(this.z,this.x,this.y);return t[(this.x+this.y)%t.length].replace("{prefix}",(this.x%16).toString(16)+(this.y%16).toString(16)).replace("{z}",String(this.z)).replace("{x}",String(this.x)).replace("{y}",String("tms"===e?Math.pow(2,this.z)-this.y-1:this.y)).replace("{quadkey}",u).replace("{bbox-epsg-3857}",s)},Iu.prototype.getTilePoint=function(t){var e=Math.pow(2,this.z);return new i((t.x*e-this.x)*Gi,(t.y*e-this.y)*Gi)};var Bu=function(t,e){this.wrap=t,this.canonical=e,this.key=Pu(t,e.z,e.x,e.y);},Eu=function(t,e,r,n,i){this.overscaledZ=t,this.wrap=e,this.canonical=new Iu(r,+n,+i),this.key=Pu(e,t,n,i);};function Pu(t,e,r,n){(t*=2)<0&&(t=-1*t-1);var i=1<<e;return 32*(i*i*t+i*n+r)+e}Eu.prototype.equals=function(t){return this.overscaledZ===t.overscaledZ&&this.wrap===t.wrap&&this.canonical.equals(t.canonical)},Eu.prototype.scaledTo=function(t){var e=this.canonical.z-t;return t>this.canonical.z?new Eu(t,this.wrap,this.canonical.z,this.canonical.x,this.canonical.y):new Eu(t,this.wrap,t,this.canonical.x>>e,this.canonical.y>>e)},Eu.prototype.isChildOf=function(t){if(t.wrap!==this.wrap)return !1;var e=this.canonical.z-t.canonical.z;return 0===t.overscaledZ||t.overscaledZ<this.overscaledZ&&t.canonical.x===this.canonical.x>>e&&t.canonical.y===this.canonical.y>>e},Eu.prototype.children=function(t){if(this.overscaledZ>=t)return [new Eu(this.overscaledZ+1,this.wrap,this.canonical.z,this.canonical.x,this.canonical.y)];var e=this.canonical.z+1,r=2*this.canonical.x,n=2*this.canonical.y;return [new Eu(e,this.wrap,e,r,n),new Eu(e,this.wrap,e,r+1,n),new Eu(e,this.wrap,e,r,n+1),new Eu(e,this.wrap,e,r+1,n+1)]},Eu.prototype.isLessThan=function(t){return this.wrap<t.wrap||!(this.wrap>t.wrap)&&(this.overscaledZ<t.overscaledZ||!(this.overscaledZ>t.overscaledZ)&&(this.canonical.x<t.canonical.x||!(this.canonical.x>t.canonical.x)&&this.canonical.y<t.canonical.y))},Eu.prototype.wrapped=function(){return new Eu(this.overscaledZ,0,this.canonical.z,this.canonical.x,this.canonical.y)},Eu.prototype.unwrapTo=function(t){return new Eu(this.overscaledZ,t,this.canonical.z,this.canonical.x,this.canonical.y)},Eu.prototype.overscaleFactor=function(){return Math.pow(2,this.overscaledZ-this.canonical.z)},Eu.prototype.toUnwrapped=function(){return new Bu(this.wrap,this.canonical)},Eu.prototype.toString=function(){return this.overscaledZ+"/"+this.canonical.x+"/"+this.canonical.y},Eu.prototype.getTilePoint=function(t){return this.canonical.getTilePoint(new zu(t.x-this.wrap,t.y))},en("CanonicalTileID",Iu),en("OverscaledTileID",Eu,{omit:["posMatrix"]});var Vu=function(t,e,r){if(this.uid=t,e.height!==e.width)throw new RangeError("DEM tiles must be square");if(r&&"mapbox"!==r&&"terrarium"!==r)return w('"'+r+'" is not a valid encoding type. Valid types include "mapbox" and "terrarium".');var n=this.dim=e.height;this.border=Math.max(Math.ceil(e.height/2),1),this.stride=this.dim+2*this.border,this.data=new Int32Array(this.stride*this.stride);for(var i=e.data,a="terrarium"===r?this._unpackTerrarium:this._unpackMapbox,o=0;o<n;o++)for(var s=0;s<n;s++){var u=4*(o*n+s);this.set(s,o,a(i[u],i[u+1],i[u+2]));}for(var p=0;p<n;p++)this.set(-1,p,this.get(0,p)),this.set(n,p,this.get(n-1,p)),this.set(p,-1,this.get(p,0)),this.set(p,n,this.get(p,n-1));this.set(-1,-1,this.get(0,0)),this.set(n,-1,this.get(n-1,0)),this.set(-1,n,this.get(0,n-1)),this.set(n,n,this.get(n-1,n-1));};Vu.prototype.set=function(t,e,r){this.data[this._idx(t,e)]=r+65536;},Vu.prototype.get=function(t,e){return this.data[this._idx(t,e)]-65536},Vu.prototype._idx=function(t,e){if(t<-this.border||t>=this.dim+this.border||e<-this.border||e>=this.dim+this.border)throw new RangeError("out of range source coordinates for DEM data");return (e+this.border)*this.stride+(t+this.border)},Vu.prototype._unpackMapbox=function(t,e,r){return (256*t*256+256*e+r)/10-1e4},Vu.prototype._unpackTerrarium=function(t,e,r){return 256*t+e+r/256-32768},Vu.prototype.getPixels=function(){return new qa({width:this.dim+2*this.border,height:this.dim+2*this.border},new Uint8Array(this.data.buffer))},Vu.prototype.backfillBorder=function(t,e,r){if(this.dim!==t.dim)throw new Error("dem dimension mismatch");var n=e*this.dim,i=e*this.dim+this.dim,a=r*this.dim,o=r*this.dim+this.dim;switch(e){case-1:n=i-1;break;case 1:i=n+1;}switch(r){case-1:a=o-1;break;case 1:o=a+1;}for(var s=p(n,-this.border,this.dim+this.border),u=p(i,-this.border,this.dim+this.border),l=p(a,-this.border,this.dim+this.border),c=p(o,-this.border,this.dim+this.border),h=-e*this.dim,f=-r*this.dim,y=l;y<c;y++)for(var d=s;d<u;d++)this.set(d,y,t.get(d+h,y+f));},en("DEMData",Vu);var Mu=Dn([{name:"a_pos",type:"Int16",components:2},{name:"a_texture_pos",type:"Int16",components:2}]);var Cu=function(t){this._stringToNumber={},this._numberToString=[];for(var e=0;e<t.length;e++){var r=t[e];this._stringToNumber[r]=e,this._numberToString[e]=r;}};Cu.prototype.encode=function(t){return this._stringToNumber[t]},Cu.prototype.decode=function(t){return this._numberToString[t]};var Tu=function(t,e,r,n){this.type="Feature",this._vectorTileFeature=t,t._z=e,t._x=r,t._y=n,this.properties=t.properties,null!=t.id&&(this.id=t.id);},Fu={geometry:{configurable:!0}};Fu.geometry.get=function(){return void 0===this._geometry&&(this._geometry=this._vectorTileFeature.toGeoJSON(this._vectorTileFeature._x,this._vectorTileFeature._y,this._vectorTileFeature._z).geometry),this._geometry},Fu.geometry.set=function(t){this._geometry=t;},Tu.prototype.toJSON=function(){var t={geometry:this.geometry};for(var e in this)"_geometry"!==e&&"_vectorTileFeature"!==e&&(t[e]=this[e]);return t},Object.defineProperties(Tu.prototype,Fu);var Lu=function(){this.state={},this.stateChanges={};};Lu.prototype.updateState=function(t,e,r){var n=String(e);this.stateChanges[t]=this.stateChanges[t]||{},this.stateChanges[t][n]=this.stateChanges[t][n]||{},c(this.stateChanges[t][n],r);},Lu.prototype.getState=function(t,e){var r=String(e),n=this.state[t]||{},i=this.stateChanges[t]||{};return c({},n[r],i[r])},Lu.prototype.initializeTileState=function(t,e){t.setFeatureState(this.state,e);},Lu.prototype.coalesceChanges=function(t,e){var r={};for(var n in this.stateChanges){this.state[n]=this.state[n]||{};var i={};for(var a in this.stateChanges[n])this.state[n][a]||(this.state[n][a]={}),c(this.state[n][a],this.stateChanges[n][a]),i[a]=this.state[n][a];r[n]=i;}if(this.stateChanges={},0!==Object.keys(r).length)for(var o in t){t[o].setFeatureState(r,e);}};var Ou=function(t,e,r){this.tileID=t,this.x=t.canonical.x,this.y=t.canonical.y,this.z=t.canonical.z,this.grid=e||new Yr(Gi,16,0),this.featureIndexArray=r||new gi;};function Du(t,e){return e-t}Ou.prototype.insert=function(t,e,r,n,i){var a=this.featureIndexArray.length;this.featureIndexArray.emplaceBack(r,n,i);for(var o=0;o<e.length;o++){for(var s=e[o],u=[1/0,1/0,-1/0,-1/0],p=0;p<s.length;p++){var l=s[p];u[0]=Math.min(u[0],l.x),u[1]=Math.min(u[1],l.y),u[2]=Math.max(u[2],l.x),u[3]=Math.max(u[3],l.y);}u[0]<Gi&&u[1]<Gi&&u[2]>=0&&u[3]>=0&&this.grid.insert(a,u[0],u[1],u[2],u[3]);}},Ou.prototype.loadVTLayers=function(){return this.vtLayers||(this.vtLayers=new Wo.VectorTile(new Js(this.rawTileData)).layers,this.sourceLayerCoder=new Cu(this.vtLayers?Object.keys(this.vtLayers).sort():["_geojsonTileLayer"])),this.vtLayers},Ou.prototype.query=function(t,e,r){var n=this;this.loadVTLayers();for(var i=t.params||{},a=Gi/t.tileSize/t.scale,o=kr(i.filter),s=t.queryGeometry,u=t.queryPadding*a,p=1/0,l=1/0,c=-1/0,h=-1/0,f=0;f<s.length;f++)for(var y=s[f],d=0;d<y.length;d++){var m=y[d];p=Math.min(p,m.x),l=Math.min(l,m.y),c=Math.max(c,m.x),h=Math.max(h,m.y);}var v=this.grid.query(p-u,l-u,c+u,h+u);v.sort(Du);for(var g,x={},b=function(u){var p=v[u];if(p!==g){g=p;var l=n.featureIndexArray.get(p),c=null;n.loadMatchingFeature(x,l.bucketIndex,l.sourceLayerIndex,l.featureIndex,o,i.layers,e,function(e,i){c||(c=Ki(e));var o={};return e.id&&(o=r.getState(i.sourceLayer||"_geojsonTileLayer",e.id)),i.queryIntersectsFeature(s,e,o,c,n.z,t.transform,a,t.posMatrix)});}},_=0;_<v.length;_++)b(_);return x},Ou.prototype.loadMatchingFeature=function(t,e,r,n,i,a,o,s){var u=this.bucketLayerIDs[e];if(!a||function(t,e){for(var r=0;r<t.length;r++)if(e.indexOf(t[r])>=0)return !0;return !1}(a,u)){var p=this.sourceLayerCoder.decode(r),l=this.vtLayers[p].feature(n);if(i(new xn(this.tileID.overscaledZ),l))for(var c=0;c<u.length;c++){var h=u[c];if(!(a&&a.indexOf(h)<0)){var f=o[h];if(f&&(!s||s(l,f))){var y=new Tu(l,this.z,this.x,this.y);y.layer=f.serialize();var d=t[h];void 0===d&&(d=t[h]=[]),d.push({featureIndex:n,feature:y});}}}}},Ou.prototype.lookupSymbolFeatures=function(t,e,r,n,i,a){var o={};this.loadVTLayers();for(var s=kr(n),u=0,p=t;u<p.length;u+=1){var l=p[u];this.loadMatchingFeature(o,e,r,l,s,i,a);}return o},Ou.prototype.hasLayer=function(t){for(var e=0,r=this.bucketLayerIDs;e<r.length;e+=1)for(var n=0,i=r[e];n<i.length;n+=1){if(t===i[n])return !0}return !1},en("FeatureIndex",Ou,{omit:["rawTileData","sourceLayerCoder"]});var Uu=function(t,e){this.tileID=t,this.uid=f(),this.uses=0,this.tileSize=e,this.buckets={},this.expirationTime=null,this.queryPadding=0,this.hasSymbolBuckets=!1,this.expiredRequestCount=0,this.state="loading";};Uu.prototype.registerFadeDuration=function(t){var e=t+this.timeAdded;e<V.now()||this.fadeEndTime&&e<this.fadeEndTime||(this.fadeEndTime=e);},Uu.prototype.wasRequested=function(){return "errored"===this.state||"loaded"===this.state||"reloading"===this.state},Uu.prototype.loadVectorData=function(t,e,r){if(this.hasData()&&this.unloadVectorData(),this.state="loaded",t){for(var n in t.featureIndex&&(this.latestFeatureIndex=t.featureIndex,t.rawTileData?(this.latestRawTileData=t.rawTileData,this.latestFeatureIndex.rawTileData=t.rawTileData):this.latestRawTileData&&(this.latestFeatureIndex.rawTileData=this.latestRawTileData)),this.collisionBoxArray=t.collisionBoxArray,this.buckets=function(t,e){var r={};if(!e)return r;for(var n=0,i=t;n<i.length;n+=1){var a=i[n],o=a.layerIds.map(function(t){return e.getLayer(t)}).filter(Boolean);if(0!==o.length){a.layers=o,a.stateDependentLayers=o.filter(function(t){return t.isStateDependent()});for(var s=0,u=o;s<u.length;s+=1)r[u[s].id]=a;}}return r}(t.buckets,e.style),this.hasSymbolBuckets=!1,this.buckets){var i=this.buckets[n];if(i instanceof Bs){if(this.hasSymbolBuckets=!0,!r)break;i.justReloaded=!0;}}for(var a in this.queryPadding=0,this.buckets){var o=this.buckets[a];this.queryPadding=Math.max(this.queryPadding,e.style.getLayer(a).queryRadius(o));}t.imageAtlas&&(this.imageAtlas=t.imageAtlas),t.glyphAtlasImage&&(this.glyphAtlasImage=t.glyphAtlasImage);}else this.collisionBoxArray=new ui;},Uu.prototype.unloadVectorData=function(){for(var t in this.buckets)this.buckets[t].destroy();this.buckets={},this.imageAtlasTexture&&this.imageAtlasTexture.destroy(),this.imageAtlas&&(this.imageAtlas=null),this.glyphAtlasTexture&&this.glyphAtlasTexture.destroy(),this.latestFeatureIndex=null,this.state="unloaded";},Uu.prototype.unloadDEMData=function(){this.dem=null,this.neighboringTiles=null,this.state="unloaded";},Uu.prototype.getBucket=function(t){return this.buckets[t.id]},Uu.prototype.upload=function(t){for(var e in this.buckets){var r=this.buckets[e];r.uploadPending()&&r.upload(t);}var n=t.gl;this.imageAtlas&&!this.imageAtlas.uploaded&&(this.imageAtlasTexture=new Xs(t,this.imageAtlas.image,n.RGBA),this.imageAtlas.uploaded=!0),this.glyphAtlasImage&&(this.glyphAtlasTexture=new Xs(t,this.glyphAtlasImage,n.ALPHA),this.glyphAtlasImage=null);},Uu.prototype.queryRenderedFeatures=function(t,e,r,n,i,a,o,s){return this.latestFeatureIndex&&this.latestFeatureIndex.rawTileData?this.latestFeatureIndex.query({queryGeometry:r,scale:n,tileSize:this.tileSize,posMatrix:s,transform:a,params:i,queryPadding:this.queryPadding*o},t,e):{}},Uu.prototype.querySourceFeatures=function(t,e){if(this.latestFeatureIndex&&this.latestFeatureIndex.rawTileData){var r=this.latestFeatureIndex.loadVTLayers(),n=e?e.sourceLayer:"",i=r._geojsonTileLayer||r[n];if(i)for(var a=kr(e&&e.filter),o=this.tileID.canonical,s=o.z,u=o.x,p=o.y,l={z:s,x:u,y:p},c=0;c<i.length;c++){var h=i.feature(c);if(a(new xn(this.tileID.overscaledZ),h)){var f=new Tu(h,s,u,p);f.tile=l,t.push(f);}}}},Uu.prototype.clearMask=function(){this.segments&&(this.segments.destroy(),delete this.segments),this.maskedBoundsBuffer&&(this.maskedBoundsBuffer.destroy(),delete this.maskedBoundsBuffer),this.maskedIndexBuffer&&(this.maskedIndexBuffer.destroy(),delete this.maskedIndexBuffer);},Uu.prototype.setMask=function(t,e){if(!o(this.mask,t)&&(this.mask=t,this.clearMask(),!o(t,{0:!0}))){var r=new qn,n=new ri;this.segments=new _i,this.segments.prepareSegment(0,r,n);for(var a=Object.keys(t),s=0;s<a.length;s++){var u=t[a[s]],p=Gi>>u.z,l=new i(u.x*p,u.y*p),c=new i(l.x+p,l.y+p),h=this.segments.prepareSegment(4,r,n);r.emplaceBack(l.x,l.y,l.x,l.y),r.emplaceBack(c.x,l.y,c.x,l.y),r.emplaceBack(l.x,c.y,l.x,c.y),r.emplaceBack(c.x,c.y,c.x,c.y);var f=h.vertexLength;n.emplaceBack(f,f+1,f+2),n.emplaceBack(f+1,f+2,f+3),h.vertexLength+=4,h.primitiveLength+=2;}this.maskedBoundsBuffer=e.createVertexBuffer(r,Mu.members),this.maskedIndexBuffer=e.createIndexBuffer(n);}},Uu.prototype.hasData=function(){return "loaded"===this.state||"reloading"===this.state||"expired"===this.state},Uu.prototype.patternsLoaded=function(){return this.imageAtlas&&!!Object.keys(this.imageAtlas.patternPositions).length},Uu.prototype.setExpiryData=function(t){var e=this.expirationTime;if(t.cacheControl){var r=function(t){var e={};if(t.replace(/(?:^|(?:\s*\,\s*))([^\x00-\x20\(\)<>@\,;\:\\"\/\[\]\?\=\{\}\x7F]+)(?:\=(?:([^\x00-\x20\(\)<>@\,;\:\\"\/\[\]\?\=\{\}\x7F]+)|(?:\"((?:[^"\\]|\\.)*)\")))?/g,function(t,r,n,i){var a=n||i;return e[r]=!a||a.toLowerCase(),""}),e["max-age"]){var r=parseInt(e["max-age"],10);isNaN(r)?delete e["max-age"]:e["max-age"]=r;}return e}(t.cacheControl);r["max-age"]&&(this.expirationTime=Date.now()+1e3*r["max-age"]);}else t.expires&&(this.expirationTime=new Date(t.expires).getTime());if(this.expirationTime){var n=Date.now(),i=!1;if(this.expirationTime>n)i=!1;else if(e)if(this.expirationTime<e)i=!0;else{var a=this.expirationTime-e;a?this.expirationTime=n+Math.max(a,3e4):i=!0;}else i=!0;i?(this.expiredRequestCount++,this.state="expired"):this.expiredRequestCount=0;}},Uu.prototype.getExpiryTimeout=function(){if(this.expirationTime)return this.expiredRequestCount?1e3*(1<<Math.min(this.expiredRequestCount-1,31)):Math.min(this.expirationTime-(new Date).getTime(),Math.pow(2,31)-1)},Uu.prototype.setFeatureState=function(t,e){if(this.latestFeatureIndex&&this.latestFeatureIndex.rawTileData&&0!==Object.keys(t).length){var r=this.latestFeatureIndex.loadVTLayers();for(var n in this.buckets){var i=this.buckets[n],a=i.layers[0].sourceLayer||"_geojsonTileLayer",o=r[a],s=t[a];o&&s&&0!==Object.keys(s).length&&(i.update(s,o,this.imageAtlas&&this.imageAtlas.patternPositions||{}),e&&e.style&&(this.queryPadding=Math.max(this.queryPadding,e.style.getLayer(n).queryRadius(i))));}}},Uu.prototype.holdingForFade=function(){return void 0!==this.symbolFadeHoldUntil},Uu.prototype.symbolFadeFinished=function(){return !this.symbolFadeHoldUntil||this.symbolFadeHoldUntil<V.now()},Uu.prototype.clearFadeHold=function(){this.symbolFadeHoldUntil=void 0;},Uu.prototype.setHoldDuration=function(t){this.symbolFadeHoldUntil=V.now()+t;};var ju={horizontal:1,vertical:2,horizontalOnly:3},qu=function(){this.text="",this.sectionIndex=[],this.sections=[];};qu.fromFeature=function(t,e){for(var r=new qu,n=0;n<t.sections.length;n++){var i=t.sections[n];r.sections.push({scale:i.scale||1,fontStack:i.fontStack||e}),r.text+=i.text;for(var a=0;a<i.text.length;a++)r.sectionIndex.push(n);}return r},qu.prototype.length=function(){return this.text.length},qu.prototype.getSection=function(t){return this.sections[this.sectionIndex[t]]},qu.prototype.getCharCode=function(t){return this.text.charCodeAt(t)},qu.prototype.verticalizePunctuation=function(){this.text=function(t){for(var e="",r=0;r<t.length;r++){var n=t.charCodeAt(r+1)||null,i=t.charCodeAt(r-1)||null;n&&cn(n)&&!gs[t[r+1]]||i&&cn(i)&&!gs[t[r-1]]||!gs[t[r]]?e+=t[r]:e+=gs[t[r]];}return e}(this.text);},qu.prototype.trim=function(){for(var t=0,e=0;e<this.text.length&&Ru[this.text.charCodeAt(e)];e++)t++;for(var r=this.text.length,n=this.text.length-1;n>=0&&n>=t&&Ru[this.text.charCodeAt(n)];n--)r--;this.text=this.text.substring(t,r),this.sectionIndex=this.sectionIndex.slice(t,r);},qu.prototype.substring=function(t,e){var r=new qu;return r.text=this.text.substring(t,e),r.sectionIndex=this.sectionIndex.slice(t,e),r.sections=this.sections,r},qu.prototype.toString=function(){return this.text},qu.prototype.getMaxScale=function(){var t=this;return this.sectionIndex.reduce(function(e,r){return Math.max(e,t.sections[r].scale)},0)};var Ru={9:!0,10:!0,11:!0,12:!0,13:!0,32:!0},Nu={};function Gu(t,e,r,n){var i=Math.pow(t-e,2);return n?t<e?i/2:2*i:i+Math.abs(r)*r}function Zu(t,e){var r=0;return 10===t&&(r-=1e4),40!==t&&65288!==t||(r+=50),41!==e&&65289!==e||(r+=50),r}function Xu(t,e,r,n,i,a){for(var o=null,s=Gu(e,r,i,a),u=0,p=n;u<p.length;u+=1){var l=p[u],c=Gu(e-l.x,r,i,a)+l.badness;c<=s&&(o=l,s=c);}return {index:t,x:e,priorBreak:o,badness:s}}function Ku(t,e,r,n){if(!r)return [];if(!t)return [];for(var i,a=[],o=function(t,e,r,n){for(var i=0,a=0;a<t.length();a++){var o=t.getSection(a),s=n[o.fontStack],u=s&&s[t.getCharCode(a)];u&&(i+=u.metrics.advance*o.scale+e);}return i/Math.max(1,Math.ceil(i/r))}(t,e,r,n),s=0,u=0;u<t.length();u++){var p=t.getSection(u),l=t.getCharCode(u),c=n[p.fontStack],h=c&&c[l];h&&!Ru[l]&&(s+=h.metrics.advance*p.scale+e),u<t.length()-1&&(Nu[l]||!((i=l)<11904)&&(sn["Bopomofo Extended"](i)||sn.Bopomofo(i)||sn["CJK Compatibility Forms"](i)||sn["CJK Compatibility Ideographs"](i)||sn["CJK Compatibility"](i)||sn["CJK Radicals Supplement"](i)||sn["CJK Strokes"](i)||sn["CJK Symbols and Punctuation"](i)||sn["CJK Unified Ideographs Extension A"](i)||sn["CJK Unified Ideographs"](i)||sn["Enclosed CJK Letters and Months"](i)||sn["Halfwidth and Fullwidth Forms"](i)||sn.Hiragana(i)||sn["Ideographic Description Characters"](i)||sn["Kangxi Radicals"](i)||sn["Katakana Phonetic Extensions"](i)||sn.Katakana(i)||sn["Vertical Forms"](i)||sn["Yi Radicals"](i)||sn["Yi Syllables"](i)))&&a.push(Xu(u+1,s,o,a,Zu(l,t.getCharCode(u+1)),!1));}return function t(e){return e?t(e.priorBreak).concat(e.index):[]}(Xu(t.length(),s,o,a,0,!0))}function Hu(t){var e=.5,r=.5;switch(t){case"right":case"top-right":case"bottom-right":e=1;break;case"left":case"top-left":case"bottom-left":e=0;}switch(t){case"bottom":case"bottom-right":case"bottom-left":r=1;break;case"top":case"top-right":case"top-left":r=0;}return {horizontalAlign:e,verticalAlign:r}}function Ju(t,e,r,n,i){if(i){var a=t[n],o=e[a.fontStack],s=o&&o[a.glyph];if(s)for(var u=s.metrics.advance*a.scale,p=(t[n].x+u)*i,l=r;l<=n;l++)t[l].x-=p;}}Nu[10]=!0,Nu[32]=!0,Nu[38]=!0,Nu[40]=!0,Nu[41]=!0,Nu[43]=!0,Nu[45]=!0,Nu[47]=!0,Nu[173]=!0,Nu[183]=!0,Nu[8203]=!0,Nu[8208]=!0,Nu[8211]=!0,Nu[8231]=!0,t.createCommonjsModule=e,t.Point=i,t.window=self,t.getJSON=function(t,e){return rt(c(t,{type:"json"}),e)},t.getImage=st,t.ResourceType=Q,t.browser=V,t.normalizeSpriteURL=function(t,e,r,n){var i=Z(t);return D(t)?(i.path="/styles/v1"+i.path+"/sprite"+e+r,O(i,n)):(i.path+=""+e+r,X(i))},t.RGBAImage=qa,t.potpack=Ds,t.ImagePosition=Us,t.Texture=Xs,t.normalizeGlyphsURL=function(t,e){if(!D(t))return t;var r=Z(t);return r.path="/fonts/v1"+r.path,O(r,e)},t.getArrayBuffer=nt,t.parseGlyphPBF=function(t){return new Js(t).readFields(fu,[])},t.isChar=sn,t.asyncAll=function(t,e,r){if(!t.length)return r(null,[]);var n=t.length,i=new Array(t.length),a=null;t.forEach(function(t,o){e(t,function(t,e){t&&(a=t),i[o]=e,0==--n&&r(a,i);});});},t.AlphaImage=ja,t.styleSpec=ft,t.endsWith=v,t.extend=c,t.sphericalToCartesian=function(t){var e=t[0],r=t[1],n=t[2];return r+=90,r*=Math.PI/180,n*=Math.PI/180,{x:e*Math.cos(r)*Math.sin(n),y:e*Math.sin(r)*Math.sin(n),z:e*Math.cos(n)}},t.Evented=ht,t.validateStyle=Zr,t.validateLight=Xr,t.emitValidationErrors=Jr,t.Color=Ft,t.number=oe,t.Properties=Cn,t.Transitionable=wn,t.Transitioning=kn,t.PossiblyEvaluated=In,t.DataConstantProperty=Bn,t.warnOnce=w,t.uniqueId=f,t.Actor=vu,t.pick=function(t,e){for(var r={},n=0;n<e.length;n++){var i=e[n];i in t&&(r[i]=t[i]);}return r},t.normalizeSourceURL=function(t,e){if(!D(t))return t;var r=Z(t);return r.path="/v4/"+r.authority+".json",r.params.push("secure"),O(r,e)},t.canonicalizeTileset=function(t,e){if(!D(e))return t.tiles||[];for(var r=[],n=0,i=t.tiles;n<i.length;n+=1){var a=i[n],o=N(a);r.push(o);}return r},t.LngLatBounds=xu,t.mercatorXfromLng=wu,t.mercatorYfromLat=Au,t.Event=lt,t.ErrorEvent=ct,t.normalizeTileURL=function(t,e,r){if(!e||!D(e))return t;var n=Z(t),i=V.devicePixelRatio>=2||512===r?"@2x":"",a=C.supported?".webp":"$1";return n.path=n.path.replace(q,""+i+a),n.path="/v4"+n.path,O(n)},t.postTurnstileEvent=Y,t.postMapLoadEvent=W,t.OverscaledTileID=Eu,t.EXTENT=Gi,t.CanonicalTileID=Iu,t.StructArrayLayout4i8=qn,t.rasterBoundsAttributes=Mu,t.SegmentVector=_i,t.MercatorCoordinate=zu,t.getVideo=function(t,e){var r,n,i=self.document.createElement("video");i.muted=!0,i.onloadstart=function(){e(null,i);};for(var a=0;a<t.length;a++){var o=self.document.createElement("source");r=t[a],n=void 0,(n=self.document.createElement("a")).href=r,(n.protocol!==self.document.location.protocol||n.host!==self.document.location.host)&&(i.crossOrigin="Anonymous"),o.src=t[a],i.appendChild(o);}return {cancel:function(){}}},t.ValidationError=yt,t.bindAll=m,t.isEqual=o,t.Tile=Uu,t.keysDifference=function(t,e){var r=[];for(var n in t)n in e||r.push(n);return r},t.SourceFeatureState=Lu,t.refProperties=["type","source","source-layer","minzoom","maxzoom","filter","layout"],t.create=function(){var t=new la(16);return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=1,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=1,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t},t.identity=function(t){return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=1,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=1,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t},t.invert=function(t,e){var r=e[0],n=e[1],i=e[2],a=e[3],o=e[4],s=e[5],u=e[6],p=e[7],l=e[8],c=e[9],h=e[10],f=e[11],y=e[12],d=e[13],m=e[14],v=e[15],g=r*s-n*o,x=r*u-i*o,b=r*p-a*o,_=n*u-i*s,w=n*p-a*s,A=i*p-a*u,k=l*d-c*y,S=l*m-h*y,z=l*v-f*y,I=c*m-h*d,B=c*v-f*d,E=h*v-f*m,P=g*E-x*B+b*I+_*z-w*S+A*k;return P?(P=1/P,t[0]=(s*E-u*B+p*I)*P,t[1]=(i*B-n*E-a*I)*P,t[2]=(d*A-m*w+v*_)*P,t[3]=(h*w-c*A-f*_)*P,t[4]=(u*z-o*E-p*S)*P,t[5]=(r*E-i*z+a*S)*P,t[6]=(m*b-y*A-v*x)*P,t[7]=(l*A-h*b+f*x)*P,t[8]=(o*B-s*z+p*k)*P,t[9]=(n*z-r*B-a*k)*P,t[10]=(y*w-d*b+v*g)*P,t[11]=(c*b-l*w-f*g)*P,t[12]=(s*S-o*I-u*k)*P,t[13]=(r*I-n*S+i*k)*P,t[14]=(d*x-y*_-m*g)*P,t[15]=(l*_-c*x+h*g)*P,t):null},t.multiply=function(t,e,r){var n=e[0],i=e[1],a=e[2],o=e[3],s=e[4],u=e[5],p=e[6],l=e[7],c=e[8],h=e[9],f=e[10],y=e[11],d=e[12],m=e[13],v=e[14],g=e[15],x=r[0],b=r[1],_=r[2],w=r[3];return t[0]=x*n+b*s+_*c+w*d,t[1]=x*i+b*u+_*h+w*m,t[2]=x*a+b*p+_*f+w*v,t[3]=x*o+b*l+_*y+w*g,x=r[4],b=r[5],_=r[6],w=r[7],t[4]=x*n+b*s+_*c+w*d,t[5]=x*i+b*u+_*h+w*m,t[6]=x*a+b*p+_*f+w*v,t[7]=x*o+b*l+_*y+w*g,x=r[8],b=r[9],_=r[10],w=r[11],t[8]=x*n+b*s+_*c+w*d,t[9]=x*i+b*u+_*h+w*m,t[10]=x*a+b*p+_*f+w*v,t[11]=x*o+b*l+_*y+w*g,x=r[12],b=r[13],_=r[14],w=r[15],t[12]=x*n+b*s+_*c+w*d,t[13]=x*i+b*u+_*h+w*m,t[14]=x*a+b*p+_*f+w*v,t[15]=x*o+b*l+_*y+w*g,t},t.translate=function(t,e,r){var n,i,a,o,s,u,p,l,c,h,f,y,d=r[0],m=r[1],v=r[2];return e===t?(t[12]=e[0]*d+e[4]*m+e[8]*v+e[12],t[13]=e[1]*d+e[5]*m+e[9]*v+e[13],t[14]=e[2]*d+e[6]*m+e[10]*v+e[14],t[15]=e[3]*d+e[7]*m+e[11]*v+e[15]):(n=e[0],i=e[1],a=e[2],o=e[3],s=e[4],u=e[5],p=e[6],l=e[7],c=e[8],h=e[9],f=e[10],y=e[11],t[0]=n,t[1]=i,t[2]=a,t[3]=o,t[4]=s,t[5]=u,t[6]=p,t[7]=l,t[8]=c,t[9]=h,t[10]=f,t[11]=y,t[12]=n*d+s*m+c*v+e[12],t[13]=i*d+u*m+h*v+e[13],t[14]=a*d+p*m+f*v+e[14],t[15]=o*d+l*m+y*v+e[15]),t},t.scale=function(t,e,r){var n=r[0],i=r[1],a=r[2];return t[0]=e[0]*n,t[1]=e[1]*n,t[2]=e[2]*n,t[3]=e[3]*n,t[4]=e[4]*i,t[5]=e[5]*i,t[6]=e[6]*i,t[7]=e[7]*i,t[8]=e[8]*a,t[9]=e[9]*a,t[10]=e[10]*a,t[11]=e[11]*a,t[12]=e[12],t[13]=e[13],t[14]=e[14],t[15]=e[15],t},t.rotateX=function(t,e,r){var n=Math.sin(r),i=Math.cos(r),a=e[4],o=e[5],s=e[6],u=e[7],p=e[8],l=e[9],c=e[10],h=e[11];return e!==t&&(t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3],t[12]=e[12],t[13]=e[13],t[14]=e[14],t[15]=e[15]),t[4]=a*i+p*n,t[5]=o*i+l*n,t[6]=s*i+c*n,t[7]=u*i+h*n,t[8]=p*i-a*n,t[9]=l*i-o*n,t[10]=c*i-s*n,t[11]=h*i-u*n,t},t.rotateZ=function(t,e,r){var n=Math.sin(r),i=Math.cos(r),a=e[0],o=e[1],s=e[2],u=e[3],p=e[4],l=e[5],c=e[6],h=e[7];return e!==t&&(t[8]=e[8],t[9]=e[9],t[10]=e[10],t[11]=e[11],t[12]=e[12],t[13]=e[13],t[14]=e[14],t[15]=e[15]),t[0]=a*i+p*n,t[1]=o*i+l*n,t[2]=s*i+c*n,t[3]=u*i+h*n,t[4]=p*i-a*n,t[5]=l*i-o*n,t[6]=c*i-s*n,t[7]=h*i-u*n,t},t.perspective=function(t,e,r,n,i){var a=1/Math.tan(e/2),o=1/(n-i);return t[0]=a/r,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=a,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=(i+n)*o,t[11]=-1,t[12]=0,t[13]=0,t[14]=2*i*n*o,t[15]=0,t},t.ortho=function(t,e,r,n,i,a,o){var s=1/(e-r),u=1/(n-i),p=1/(a-o);return t[0]=-2*s,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=-2*u,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=2*p,t[11]=0,t[12]=(e+r)*s,t[13]=(i+n)*u,t[14]=(o+a)*p,t[15]=1,t},t.create$1=_a,t.normalize=wa,t.transformMat4=Aa,t.forEach=ka,t.getSizeData=_s,t.evaluateSizeForFeature=function(t,e,r){var n=e;return "source"===t.functionType?r.lowerSize/bs:"composite"===t.functionType?oe(r.lowerSize/bs,r.upperSize/bs,n.uSizeT):n.uSize},t.evaluateSizeForZoom=function(t,e,r){if("constant"===t.functionType)return {uSizeT:0,uSize:t.layoutSize};if("source"===t.functionType)return {uSizeT:0,uSize:0};if("camera"===t.functionType){var n=t.propertyValue,i=t.zoomRange,a=t.sizeRange,o=p(dr(n,r.specification).interpolationFactor(e,i.min,i.max),0,1);return {uSizeT:0,uSize:a.min+o*(a.max-a.min)}}var s=t.propertyValue,u=t.zoomRange;return {uSizeT:p(dr(s,r.specification).interpolationFactor(e,u.min,u.max),0,1),uSize:0}},t.SIZE_PACK_FACTOR=bs,t.addDynamicAttributes=Ss,t.properties=Ps,t.WritingMode=ju,t.multiPolygonIntersectsBufferedPoint=Yi,t.multiPolygonIntersectsMultiPolygon=$i,t.multiPolygonIntersectsBufferedMultiLine=Wi,t.polygonIntersectsPolygon=function(t,e){for(var r=0;r<t.length;r++)if(aa(e,t[r]))return !0;for(var n=0;n<e.length;n++)if(aa(t,e[n]))return !0;return !!ta(t,e)},t.distToSegmentSquared=na,t.SymbolInstanceArray=hi,t.StyleLayer=Tn,t.createStyleLayer=function(t){return "custom"===t.type?new Ls(t):new Os[t.type](t)},t.clone=b,t.filterObject=x,t.mapObject=g,t.getReferrer=et,t.isMapboxURL=D,t.normalizeStyleURL=function(t,e){if(!D(t))return t;var r=Z(t);return r.path="/styles/v1"+r.path,O(r,e)},t.registerForPluginAvailability=function(t){return dn?t({pluginURL:dn,completionCallback:fn}):vn.once("pluginAvailable",t),t},t.evented=vn,t.ZoomHistory=on,t.validateCustomStyleLayer=function(t){var e=[],r=t.id;return void 0===r&&e.push({message:"layers."+r+': missing required property "id"'}),void 0===t.render&&e.push({message:"layers."+r+': missing required method "render"'}),t.renderingMode&&"2d"!==t.renderingMode&&"3d"!==t.renderingMode&&e.push({message:"layers."+r+': property "renderingMode" must be either "2d" or "3d"'}),e},t.createLayout=Dn,t.ProgramConfiguration=ji,t.Uniform1i=zi,t.Uniform1f=Ii,t.Uniform2f=Bi,t.Uniform4f=Pi,t.Uniform3f=Ei,t.UniformMatrix4f=Ci,t.create$2=ca,t.fromRotation=function(t,e){var r=Math.sin(e),n=Math.cos(e);return t[0]=n,t[1]=r,t[2]=0,t[3]=-r,t[4]=n,t[5]=0,t[6]=0,t[7]=0,t[8]=1,t},t.create$3=ha,t.length=fa,t.fromValues=ya,t.normalize$1=da,t.dot=ma,t.cross=va,t.transformMat3=function(t,e,r){var n=e[0],i=e[1],a=e[2];return t[0]=n*r[0]+i*r[3]+a*r[6],t[1]=n*r[1]+i*r[4]+a*r[7],t[2]=n*r[2]+i*r[5]+a*r[8],t},t.len=xa,t.forEach$1=ba,t.UniformColor=Vi,t.clamp=p,t.StructArrayLayout2i4=jn,t.StructArrayLayout2ui4=ni,t.StructArrayLayout3ui6=ri,t.StructArrayLayout1ui2=ii,t.LngLat=bu,t.mercatorZfromAltitude=ku,t.wrap=l,t.UnwrappedTileID=Bu,t.create$4=function(){var t=new la(4);return t[0]=1,t[1]=0,t[2]=0,t[3]=1,t},t.rotate=function(t,e,r){var n=e[0],i=e[1],a=e[2],o=e[3],s=Math.sin(r),u=Math.cos(r);return t[0]=n*u+a*s,t[1]=i*u+o*s,t[2]=n*-s+a*u,t[3]=i*-s+o*u,t},t.ease=u,t.bezier=s,t.config=M,t.EvaluationParameters=xn,t.webpSupported=C,t.version="0.52.0",t.setRTLTextPlugin=function(t,e){if(yn)throw new Error("setRTLTextPlugin cannot be called multiple times.");yn=!0,dn=V.resolveURL(t),fn=function(t){t?(yn=!1,dn=null,e&&e(t)):mn=!0;},vn.fire(new lt("pluginAvailable",{pluginURL:dn,completionCallback:fn}));},t.values=function(t){var e=[];for(var r in t)e.push(t[r]);return e},t.featureFilter=kr,t.Anchor=xs,t.GLYPH_PBF_BORDER=mu,t.shapeText=function(t,e,r,n,i,a,o,s,u,p,l){var c=qu.fromFeature(t,r);l===ju.vertical&&c.verticalizePunctuation();var h,f=[],y={positionedGlyphs:f,text:c,top:u[1],bottom:u[1],left:u[0],right:u[0],writingMode:l},d=gn.processBidirectionalText,m=gn.processStyledBidirectionalText;if(d&&1===c.sections.length){h=[];for(var v=0,g=d(c.toString(),Ku(c,s,n,e));v<g.length;v+=1){var x=g[v],b=new qu;b.text=x,b.sections=c.sections;for(var _=0;_<x.length;_++)b.sectionIndex.push(0);h.push(b);}}else if(m){h=[];for(var w=0,A=m(c.text,c.sectionIndex,Ku(c,s,n,e));w<A.length;w+=1){var k=A[w],S=new qu;S.text=k[0],S.sectionIndex=k[1],S.sections=c.sections,h.push(S);}}else h=function(t,e){for(var r=[],n=t.text,i=0,a=0,o=e;a<o.length;a+=1){var s=o[a];r.push(t.substring(i,s)),i=s;}return i<n.length&&r.push(t.substring(i,n.length)),r}(c,Ku(c,s,n,e));return function(t,e,r,n,i,a,o,s,u){for(var p=0,l=-17,c=0,h=t.positionedGlyphs,f="right"===a?1:"left"===a?0:.5,y=0,d=r;y<d.length;y+=1){var m=d[y];m.trim();var v=m.getMaxScale();if(m.length()){for(var g=h.length,x=0;x<m.length();x++){var b=m.getSection(x),_=m.getCharCode(x),w=24*(v-b.scale),A=e[b.fontStack],k=A&&A[_];k&&(ln(_)&&o!==ju.horizontal?(h.push({glyph:_,x:p,y:w,vertical:!0,scale:b.scale,fontStack:b.fontStack}),p+=u*b.scale+s):(h.push({glyph:_,x:p,y:l+w,vertical:!1,scale:b.scale,fontStack:b.fontStack}),p+=k.metrics.advance*b.scale+s));}if(h.length!==g){var S=p-s;c=Math.max(S,c),Ju(h,e,g,h.length-1,f);}p=0,l+=n*v;}else l+=n;}var z=Hu(i),I=z.horizontalAlign,B=z.verticalAlign;!function(t,e,r,n,i,a,o){for(var s=(e-r)*i,u=(-n*o+.5)*a,p=0;p<t.length;p++)t[p].x+=s,t[p].y+=u;}(h,f,I,B,c,n,r.length);var E=l- -17;t.top+=-B*E,t.bottom=t.top+E,t.left+=-I*c,t.right=t.left+c;}(y,e,h,i,a,o,l,s,p),!!f.length&&(y.text=y.text.toString(),y)},t.shapeIcon=function(t,e,r){var n=Hu(r),i=n.horizontalAlign,a=n.verticalAlign,o=e[0],s=e[1],u=o-t.displaySize[0]*i,p=u+t.displaySize[0],l=s-t.displaySize[1]*a;return {image:t,top:l,bottom:l+t.displaySize[1],left:u,right:p}},t.allowsVerticalWritingMode=un,t.allowsLetterSpacing=function(t){for(var e=0,r=t;e<r.length;e+=1)if(!pn(r[e].charCodeAt(0)))return !1;return !0},t.classifyRings=zo,t.SymbolBucket=Bs,t.register=en,t.FeatureIndex=Ou,t.CollisionBoxArray=ui,t.DictionaryCoder=Cu,t.LineBucket=as,t.FillBucket=Po,t.FillExtrusionBucket=Oo,t.ImageAtlas=qs,t.mvt=Wo,t.Protobuf=Js,t.DEMData=Vu,t.vectorTile=Wo,t.Point$1=i,t.pbf=Js,t.plugin=gn;});

define(["./shared.js"],function(e){"use strict";function t(e){var r=typeof e;if("number"===r||"boolean"===r||"string"===r||null==e)return JSON.stringify(e);if(Array.isArray(e)){for(var n="[",o=0,i=e;o<i.length;o+=1){n+=t(i[o])+",";}return n+"]"}for(var a=Object.keys(e).sort(),s="{",l=0;l<a.length;l++)s+=JSON.stringify(a[l])+":"+t(e[a[l]])+",";return s+"}"}function r(r){for(var n="",o=0,i=e.refProperties;o<i.length;o+=1){n+="/"+t(r[i[o]]);}return n}var n=function(e){e&&this.replace(e);};function o(e,t,r,n,o){if(void 0===t.segment)return !0;for(var i=t,a=t.segment+1,s=0;s>-r/2;){if(--a<0)return !1;s-=e[a].dist(i),i=e[a];}s+=e[a].dist(e[a+1]),a++;for(var l=[],u=0;s<r/2;){var h=e[a-1],c=e[a],f=e[a+1];if(!f)return !1;var p=h.angleTo(c)-c.angleTo(f);for(p=Math.abs((p+3*Math.PI)%(2*Math.PI)-Math.PI),l.push({distance:s,angleDelta:p}),u+=p;s-l[0].distance>n;)u-=l.shift().angleDelta;if(u>o)return !1;a++,s+=c.dist(f);}return !0}function i(e){for(var t=0,r=0;r<e.length-1;r++)t+=e[r].dist(e[r+1]);return t}function a(e,t,r){return e?.6*t*r:0}function s(e,t){return Math.max(e?e.right-e.left:0,t?t.right-t.left:0)}function l(t,r,n,l,u,h){for(var c=a(n,u,h),f=s(n,l)*h,p=0,d=i(t)/2,g=0;g<t.length-1;g++){var m=t[g],v=t[g+1],y=m.dist(v);if(p+y>d){var x=(d-p)/y,w=e.number(m.x,v.x,x),M=e.number(m.y,v.y,x),S=new e.Anchor(w,M,v.angleTo(m),g);return S._round(),!c||o(t,S,f,c,r)?S:void 0}p+=y;}}function u(t,r,n,l,u,h,c,f,p){var d=a(l,h,c),g=s(l,u),m=g*c,v=0===t[0].x||t[0].x===p||0===t[0].y||t[0].y===p;return r-m<r/4&&(r=m+r/4),function t(r,n,a,s,l,u,h,c,f){var p=u/2;var d=i(r);var g=0,m=n-a;var v=[];for(var y=0;y<r.length-1;y++){for(var x=r[y],w=r[y+1],M=x.dist(w),S=w.angleTo(x);m+a<g+M;){var _=((m+=a)-g)/M,P=e.number(x.x,w.x,_),b=e.number(x.y,w.y,_);if(P>=0&&P<f&&b>=0&&b<f&&m-p>=0&&m+p<=d){var T=new e.Anchor(P,b,S,y);T._round(),s&&!o(r,T,u,s,l)||v.push(T);}}g+=M;}c||v.length||h||(v=t(r,g/2,a,s,l,u,h,!0,f));return v}(t,v?r/2*f%r:(g/2+2*h)*c*f%r,r,d,n,m,v,!1,p)}n.prototype.replace=function(e){this._layerConfigs={},this._layers={},this.update(e,[]);},n.prototype.update=function(t,n){for(var o=this,i=0,a=t;i<a.length;i+=1){var s=a[i];o._layerConfigs[s.id]=s;var l=o._layers[s.id]=e.createStyleLayer(s);l._featureFilter=e.featureFilter(l.filter);}for(var u=0,h=n;u<h.length;u+=1){var c=h[u];delete o._layerConfigs[c],delete o._layers[c];}this.familiesBySource={};for(var f=0,p=function(e){for(var t={},n=0;n<e.length;n++){var o=r(e[n]),i=t[o];i||(i=t[o]=[]),i.push(e[n]);}var a=[];for(var s in t)a.push(t[s]);return a}(e.values(this._layerConfigs));f<p.length;f+=1){var d=p[f].map(function(e){return o._layers[e.id]}),g=d[0];if("none"!==g.visibility){var m=g.source||"",v=o.familiesBySource[m];v||(v=o.familiesBySource[m]={});var y=g.sourceLayer||"_geojsonTileLayer",x=v[y];x||(x=v[y]=[]),x.push(d);}}};var h=function(t,r,n,o,i,a,s,l,u,h,c,f){var p=s.top*l-u,d=s.bottom*l+u,g=s.left*l-u,m=s.right*l+u;if(this.boxStartIndex=t.length,h){var v=d-p,y=m-g;v>0&&(v=Math.max(10*l,v),this._addLineCollisionCircles(t,r,n,n.segment,y,v,o,i,a,c));}else{if(f){var x=new e.Point(g,p),w=new e.Point(m,p),M=new e.Point(g,d),S=new e.Point(m,d),_=f*Math.PI/180;x._rotate(_),w._rotate(_),M._rotate(_),S._rotate(_),g=Math.min(x.x,w.x,M.x,S.x),m=Math.max(x.x,w.x,M.x,S.x),p=Math.min(x.y,w.y,M.y,S.y),d=Math.max(x.y,w.y,M.y,S.y);}t.emplaceBack(n.x,n.y,g,p,m,d,o,i,a,0,0);}this.boxEndIndex=t.length;};h.prototype._addLineCollisionCircles=function(e,t,r,n,o,i,a,s,l,u){var h=i/2,c=Math.floor(o/h)||1,f=1+.4*Math.log(u)/Math.LN2,p=Math.floor(c*f/2),d=-i/2,g=r,m=n+1,v=d,y=-o/2,x=y-o/4;do{if(--m<0){if(v>y)return;m=0;break}v-=t[m].dist(g),g=t[m];}while(v>x);for(var w=t[m].dist(t[m+1]),M=-p;M<c+p;M++){var S=M*h,_=y+S;if(S<0&&(_+=S),S>o&&(_+=S-o),!(_<v)){for(;v+w<_;){if(v+=w,++m+1>=t.length)return;w=t[m].dist(t[m+1]);}var P=_-v,b=t[m],T=t[m+1].sub(b)._unit()._mult(P)._add(b)._round(),I=Math.abs(_-d)<h?0:.8*(_-d);e.emplaceBack(T.x,T.y,-i/2,-i/2,i/2,i/2,a,s,l,i/2,I);}}};var c=p,f=p;function p(e,t){if(!(this instanceof p))return new p(e,t);if(this.data=e||[],this.length=this.data.length,this.compare=t||d,this.length>0)for(var r=(this.length>>1)-1;r>=0;r--)this._down(r);}function d(e,t){return e<t?-1:e>t?1:0}function g(t,r,n){void 0===r&&(r=1),void 0===n&&(n=!1);for(var o=1/0,i=1/0,a=-1/0,s=-1/0,l=t[0],u=0;u<l.length;u++){var h=l[u];(!u||h.x<o)&&(o=h.x),(!u||h.y<i)&&(i=h.y),(!u||h.x>a)&&(a=h.x),(!u||h.y>s)&&(s=h.y);}var f=a-o,p=s-i,d=Math.min(f,p),g=d/2,y=new c(null,m);if(0===d)return new e.Point(o,i);for(var x=o;x<a;x+=d)for(var w=i;w<s;w+=d)y.push(new v(x+g,w+g,g,t));for(var M=function(e){for(var t=0,r=0,n=0,o=e[0],i=0,a=o.length,s=a-1;i<a;s=i++){var l=o[i],u=o[s],h=l.x*u.y-u.x*l.y;r+=(l.x+u.x)*h,n+=(l.y+u.y)*h,t+=3*h;}return new v(r/t,n/t,0,e)}(t),S=y.length;y.length;){var _=y.pop();(_.d>M.d||!M.d)&&(M=_,n&&console.log("found best %d after %d probes",Math.round(1e4*_.d)/1e4,S)),_.max-M.d<=r||(g=_.h/2,y.push(new v(_.p.x-g,_.p.y-g,g,t)),y.push(new v(_.p.x+g,_.p.y-g,g,t)),y.push(new v(_.p.x-g,_.p.y+g,g,t)),y.push(new v(_.p.x+g,_.p.y+g,g,t)),S+=4);}return n&&(console.log("num probes: "+S),console.log("best distance: "+M.d)),M.p}function m(e,t){return t.max-e.max}function v(t,r,n,o){this.p=new e.Point(t,r),this.h=n,this.d=function(t,r){for(var n=!1,o=1/0,i=0;i<r.length;i++)for(var a=r[i],s=0,l=a.length,u=l-1;s<l;u=s++){var h=a[s],c=a[u];h.y>t.y!=c.y>t.y&&t.x<(c.x-h.x)*(t.y-h.y)/(c.y-h.y)+h.x&&(n=!n),o=Math.min(o,e.distToSegmentSquared(t,h,c));}return (n?1:-1)*Math.sqrt(o)}(this.p,o),this.max=this.d+this.h*Math.SQRT2;}p.prototype={push:function(e){this.data.push(e),this.length++,this._up(this.length-1);},pop:function(){if(0!==this.length){var e=this.data[0];return this.length--,this.length>0&&(this.data[0]=this.data[this.length],this._down(0)),this.data.pop(),e}},peek:function(){return this.data[0]},_up:function(e){for(var t=this.data,r=this.compare,n=t[e];e>0;){var o=e-1>>1,i=t[o];if(r(n,i)>=0)break;t[e]=i,e=o;}t[e]=n;},_down:function(e){for(var t=this.data,r=this.compare,n=this.length>>1,o=t[e];e<n;){var i=1+(e<<1),a=i+1,s=t[i];if(a<this.length&&r(t[a],s)<0&&(i=a,s=t[a]),r(s,o)>=0)break;t[e]=s,e=i;}t[e]=o;}},c.default=f;var y=e.createCommonjsModule(function(e){e.exports=function(e,t){var r,n,o,i,a,s,l,u;for(r=3&e.length,n=e.length-r,o=t,a=3432918353,s=461845907,u=0;u<n;)l=255&e.charCodeAt(u)|(255&e.charCodeAt(++u))<<8|(255&e.charCodeAt(++u))<<16|(255&e.charCodeAt(++u))<<24,++u,o=27492+(65535&(i=5*(65535&(o=(o^=l=(65535&(l=(l=(65535&l)*a+(((l>>>16)*a&65535)<<16)&4294967295)<<15|l>>>17))*s+(((l>>>16)*s&65535)<<16)&4294967295)<<13|o>>>19))+((5*(o>>>16)&65535)<<16)&4294967295))+((58964+(i>>>16)&65535)<<16);switch(l=0,r){case 3:l^=(255&e.charCodeAt(u+2))<<16;case 2:l^=(255&e.charCodeAt(u+1))<<8;case 1:o^=l=(65535&(l=(l=(65535&(l^=255&e.charCodeAt(u)))*a+(((l>>>16)*a&65535)<<16)&4294967295)<<15|l>>>17))*s+(((l>>>16)*s&65535)<<16)&4294967295;}return o^=e.length,o=2246822507*(65535&(o^=o>>>16))+((2246822507*(o>>>16)&65535)<<16)&4294967295,o=3266489909*(65535&(o^=o>>>13))+((3266489909*(o>>>16)&65535)<<16)&4294967295,(o^=o>>>16)>>>0};}),x=e.createCommonjsModule(function(e){e.exports=function(e,t){for(var r,n=e.length,o=t^n,i=0;n>=4;)r=1540483477*(65535&(r=255&e.charCodeAt(i)|(255&e.charCodeAt(++i))<<8|(255&e.charCodeAt(++i))<<16|(255&e.charCodeAt(++i))<<24))+((1540483477*(r>>>16)&65535)<<16),o=1540483477*(65535&o)+((1540483477*(o>>>16)&65535)<<16)^(r=1540483477*(65535&(r^=r>>>24))+((1540483477*(r>>>16)&65535)<<16)),n-=4,++i;switch(n){case 3:o^=(255&e.charCodeAt(i+2))<<16;case 2:o^=(255&e.charCodeAt(i+1))<<8;case 1:o=1540483477*(65535&(o^=255&e.charCodeAt(i)))+((1540483477*(o>>>16)&65535)<<16);}return o=1540483477*(65535&(o^=o>>>13))+((1540483477*(o>>>16)&65535)<<16),(o^=o>>>15)>>>0};}),w=y,M=y,S=x;function _(t,r,n,o,i,a){t.createArrays();var s=512*t.overscaling;t.tilePixelRatio=e.EXTENT/s,t.compareText={},t.iconsNeedLinear=!1;var l=t.layers[0].layout,u=t.layers[0]._unevaluatedLayout._values,h={};if("composite"===t.textSizeData.functionType){var c=t.textSizeData.zoomRange,f=c.min,p=c.max;h.compositeTextSizes=[u["text-size"].possiblyEvaluate(new e.EvaluationParameters(f)),u["text-size"].possiblyEvaluate(new e.EvaluationParameters(p))];}if("composite"===t.iconSizeData.functionType){var d=t.iconSizeData.zoomRange,g=d.min,m=d.max;h.compositeIconSizes=[u["icon-size"].possiblyEvaluate(new e.EvaluationParameters(g)),u["icon-size"].possiblyEvaluate(new e.EvaluationParameters(m))];}h.layoutTextSize=u["text-size"].possiblyEvaluate(new e.EvaluationParameters(t.zoom+1)),h.layoutIconSize=u["icon-size"].possiblyEvaluate(new e.EvaluationParameters(t.zoom+1)),h.textMaxSize=u["text-size"].possiblyEvaluate(new e.EvaluationParameters(18));for(var v=24*l.get("text-line-height"),y="map"===l.get("text-rotation-alignment")&&"point"!==l.get("symbol-placement"),x=l.get("text-keep-upright"),w=0,M=t.features;w<M.length;w+=1){var S=M[w],_=l.get("text-font").evaluate(S,{}).join(","),b=n,T={},I=S.text;if(I){var k=I.toString(),z=l.get("text-offset").evaluate(S,{}).map(function(e){return 24*e}),C=24*l.get("text-letter-spacing").evaluate(S,{}),E=e.allowsLetterSpacing(k)?C:0,A=l.get("text-anchor").evaluate(S,{}),L=l.get("text-justify").evaluate(S,{}),D="point"===l.get("symbol-placement")?24*l.get("text-max-width").evaluate(S,{}):0;T.horizontal=e.shapeText(I,r,_,D,v,A,L,E,z,24,e.WritingMode.horizontal),e.allowsVerticalWritingMode(k)&&y&&x&&(T.vertical=e.shapeText(I,r,_,D,v,A,L,E,z,24,e.WritingMode.vertical));}var O=void 0;if(S.icon){var N=o[S.icon];N&&(O=e.shapeIcon(i[S.icon],l.get("icon-offset").evaluate(S,{}),l.get("icon-anchor").evaluate(S,{})),void 0===t.sdfIcons?t.sdfIcons=N.sdf:t.sdfIcons!==N.sdf&&e.warnOnce("Style sheet warning: Cannot mix SDF and non-SDF icons in one buffer"),N.pixelRatio!==t.pixelRatio?t.iconsNeedLinear=!0:0!==l.get("icon-rotate").constantOr(1)&&(t.iconsNeedLinear=!0));}(T.horizontal||O)&&P(t,S,T,O,b,h);}a&&t.generateCollisionDebugBuffers();}function P(t,r,n,o,i,a){var s=a.layoutTextSize.evaluate(r,{}),c=a.layoutIconSize.evaluate(r,{}),f=a.textMaxSize.evaluate(r,{});void 0===f&&(f=s);var p=t.layers[0].layout,d=p.get("text-offset").evaluate(r,{}),m=p.get("icon-offset").evaluate(r,{}),v=s/24,y=t.tilePixelRatio*v,x=t.tilePixelRatio*f/24,M=t.tilePixelRatio*c,S=t.tilePixelRatio*p.get("symbol-spacing"),_=p.get("text-padding")*t.tilePixelRatio,P=p.get("icon-padding")*t.tilePixelRatio,k=p.get("text-max-angle")/180*Math.PI,z="map"===p.get("text-rotation-alignment")&&"point"!==p.get("symbol-placement"),C="map"===p.get("icon-rotation-alignment")&&"point"!==p.get("symbol-placement"),E=p.get("symbol-placement"),A=S/2,L=function(s,l){l.x<0||l.x>=e.EXTENT||l.y<0||l.y>=e.EXTENT||function(t,r,n,o,i,a,s,l,u,c,f,p,d,g,m,v,y,x,M,S,_){var P,I,k=t.addToLineVertexArray(r,n),z=0,C=0,E=0,A=w(o.horizontal?o.horizontal.text:""),L=[];if(o.horizontal){var D=a.layout.get("text-rotate").evaluate(M,{});P=new h(s,n,r,l,u,c,o.horizontal,f,p,d,t.overscaling,D),C+=T(t,r,o.horizontal,a,d,M,g,k,o.vertical?e.WritingMode.horizontal:e.WritingMode.horizontalOnly,L,S,_),o.vertical&&(E+=T(t,r,o.vertical,a,d,M,g,k,e.WritingMode.vertical,L,S,_));}var O=P?P.boxStartIndex:t.collisionBoxArray.length,N=P?P.boxEndIndex:t.collisionBoxArray.length;if(i){var R=function(t,r,n,o,i,a){var s,l,u,h,c=r.image,f=n.layout,p=r.top-1/c.pixelRatio,d=r.left-1/c.pixelRatio,g=r.bottom+1/c.pixelRatio,m=r.right+1/c.pixelRatio;if("none"!==f.get("icon-text-fit")&&i){var v=m-d,y=g-p,x=f.get("text-size").evaluate(a,{})/24,w=i.left*x,M=i.right*x,S=i.top*x,_=M-w,P=i.bottom*x-S,b=f.get("icon-text-fit-padding")[0],T=f.get("icon-text-fit-padding")[1],I=f.get("icon-text-fit-padding")[2],k=f.get("icon-text-fit-padding")[3],z="width"===f.get("icon-text-fit")?.5*(P-y):0,C="height"===f.get("icon-text-fit")?.5*(_-v):0,E="width"===f.get("icon-text-fit")||"both"===f.get("icon-text-fit")?_:v,A="height"===f.get("icon-text-fit")||"both"===f.get("icon-text-fit")?P:y;s=new e.Point(w+C-k,S+z-b),l=new e.Point(w+C+T+E,S+z-b),u=new e.Point(w+C+T+E,S+z+I+A),h=new e.Point(w+C-k,S+z+I+A);}else s=new e.Point(d,p),l=new e.Point(m,p),u=new e.Point(m,g),h=new e.Point(d,g);var L=n.layout.get("icon-rotate").evaluate(a,{})*Math.PI/180;if(L){var D=Math.sin(L),O=Math.cos(L),N=[O,-D,D,O];s._matMult(N),l._matMult(N),h._matMult(N),u._matMult(N);}return [{tl:s,tr:l,bl:h,br:u,tex:c.paddedRect,writingMode:void 0,glyphOffset:[0,0]}]}(0,i,a,0,o.horizontal,M),F=a.layout.get("icon-rotate").evaluate(M,{});I=new h(s,n,r,l,u,c,i,m,v,!1,t.overscaling,F),z=4*R.length;var B=t.iconSizeData,Z=null;"source"===B.functionType?(Z=[e.SIZE_PACK_FACTOR*a.layout.get("icon-size").evaluate(M,{})])[0]>b&&e.warnOnce(t.layerIds[0]+': Value for "icon-size" is >= 256. Reduce your "icon-size".'):"composite"===B.functionType&&((Z=[e.SIZE_PACK_FACTOR*_.compositeIconSizes[0].evaluate(M,{}),e.SIZE_PACK_FACTOR*_.compositeIconSizes[1].evaluate(M,{})])[0]>b||Z[1]>b)&&e.warnOnce(t.layerIds[0]+': Value for "icon-size" is >= 256. Reduce your "icon-size".'),t.addSymbols(t.icon,R,Z,x,y,M,!1,r,k.lineStartIndex,k.lineLength);}var j=I?I.boxStartIndex:t.collisionBoxArray.length,G=I?I.boxEndIndex:t.collisionBoxArray.length;t.glyphOffsetArray.length>=e.SymbolBucket.MAX_GLYPHS&&e.warnOnce("Too many glyphs being rendered in a tile. See https://github.com/mapbox/mapbox-gl-js/issues/2907");t.symbolInstances.emplaceBack(r.x,r.y,L.length>0?L[0]:-1,L.length>1?L[1]:-1,A,O,N,j,G,l,C,E,z,0);}(t,l,s,n,o,t.layers[0],t.collisionBoxArray,r.index,r.sourceLayerIndex,t.index,y,_,z,d,M,P,C,m,r,i,a);};if("line"===E)for(var D=0,O=function(t,r,n,o,i){for(var a=[],s=0;s<t.length;s++)for(var l=t[s],u=void 0,h=0;h<l.length-1;h++){var c=l[h],f=l[h+1];c.x<r&&f.x<r||(c.x<r?c=new e.Point(r,c.y+(f.y-c.y)*((r-c.x)/(f.x-c.x)))._round():f.x<r&&(f=new e.Point(r,c.y+(f.y-c.y)*((r-c.x)/(f.x-c.x)))._round()),c.y<n&&f.y<n||(c.y<n?c=new e.Point(c.x+(f.x-c.x)*((n-c.y)/(f.y-c.y)),n)._round():f.y<n&&(f=new e.Point(c.x+(f.x-c.x)*((n-c.y)/(f.y-c.y)),n)._round()),c.x>=o&&f.x>=o||(c.x>=o?c=new e.Point(o,c.y+(f.y-c.y)*((o-c.x)/(f.x-c.x)))._round():f.x>=o&&(f=new e.Point(o,c.y+(f.y-c.y)*((o-c.x)/(f.x-c.x)))._round()),c.y>=i&&f.y>=i||(c.y>=i?c=new e.Point(c.x+(f.x-c.x)*((i-c.y)/(f.y-c.y)),i)._round():f.y>=i&&(f=new e.Point(c.x+(f.x-c.x)*((i-c.y)/(f.y-c.y)),i)._round()),u&&c.equals(u[u.length-1])||(u=[c],a.push(u)),u.push(f)))));}return a}(r.geometry,0,0,e.EXTENT,e.EXTENT);D<O.length;D+=1)for(var N=O[D],R=0,F=u(N,S,k,n.vertical||n.horizontal,o,24,x,t.overscaling,e.EXTENT);R<F.length;R+=1){var B=F[R],Z=n.horizontal;Z&&I(t,Z.text,A,B)||L(N,B);}else if("line-center"===E)for(var j=0,G=r.geometry;j<G.length;j+=1){var J=G[j];if(J.length>1){var X=l(J,k,n.vertical||n.horizontal,o,24,x);X&&L(J,X);}}else if("Polygon"===r.type)for(var V=0,W=e.classifyRings(r.geometry,0);V<W.length;V+=1){var Y=W[V],q=g(Y,16);L(Y[0],new e.Anchor(q.x,q.y,0));}else if("LineString"===r.type)for(var U=0,K=r.geometry;U<K.length;U+=1){var H=K[U];L(H,new e.Anchor(H[0].x,H[0].y,0));}else if("Point"===r.type)for(var Q=0,$=r.geometry;Q<$.length;Q+=1)for(var ee=0,te=$[Q];ee<te.length;ee+=1){var re=te[ee];L([re],new e.Anchor(re.x,re.y,0));}}w.murmur3=M,w.murmur2=S;var b=65535;function T(t,r,n,o,i,a,s,l,u,h,c,f){var p=function(t,r,n,o,i,a){for(var s=n.layout.get("text-rotate").evaluate(i,{})*Math.PI/180,l=n.layout.get("text-offset").evaluate(i,{}).map(function(e){return 24*e}),u=r.positionedGlyphs,h=[],c=0;c<u.length;c++){var f=u[c],p=a[f.fontStack],d=p&&p[f.glyph];if(d){var g=d.rect;if(g){var m=e.GLYPH_PBF_BORDER+1,v=d.metrics.advance*f.scale/2,y=o?[f.x+v,f.y]:[0,0],x=o?[0,0]:[f.x+v+l[0],f.y+l[1]],w=(d.metrics.left-m)*f.scale-v+x[0],M=(-d.metrics.top-m)*f.scale+x[1],S=w+g.w*f.scale,_=M+g.h*f.scale,P=new e.Point(w,M),b=new e.Point(S,M),T=new e.Point(w,_),I=new e.Point(S,_);if(o&&f.vertical){var k=new e.Point(-v,v),z=-Math.PI/2,C=new e.Point(5,0);P._rotateAround(z,k)._add(C),b._rotateAround(z,k)._add(C),T._rotateAround(z,k)._add(C),I._rotateAround(z,k)._add(C);}if(s){var E=Math.sin(s),A=Math.cos(s),L=[A,-E,E,A];P._matMult(L),b._matMult(L),T._matMult(L),I._matMult(L);}h.push({tl:P,tr:b,bl:T,br:I,tex:g,writingMode:r.writingMode,glyphOffset:y});}}}return h}(0,n,o,i,a,c),d=t.textSizeData,g=null;return "source"===d.functionType?(g=[e.SIZE_PACK_FACTOR*o.layout.get("text-size").evaluate(a,{})])[0]>b&&e.warnOnce(t.layerIds[0]+': Value for "text-size" is >= 256. Reduce your "text-size".'):"composite"===d.functionType&&((g=[e.SIZE_PACK_FACTOR*f.compositeTextSizes[0].evaluate(a,{}),e.SIZE_PACK_FACTOR*f.compositeTextSizes[1].evaluate(a,{})])[0]>b||g[1]>b)&&e.warnOnce(t.layerIds[0]+': Value for "text-size" is >= 256. Reduce your "text-size".'),t.addSymbols(t.text,p,g,s,i,a,u,r,l.lineStartIndex,l.lineLength),h.push(t.text.placedSymbolArray.length-1),4*p.length}function I(e,t,r,n){var o=e.compareText;if(t in o){for(var i=o[t],a=i.length-1;a>=0;a--)if(n.dist(i[a])<r)return !0}else o[t]=[];return o[t].push(n),!1}var k=function(t){var r={},n=[];for(var o in t){var i=t[o],a=r[o]={};for(var s in i){var l=i[+s];if(l&&0!==l.bitmap.width&&0!==l.bitmap.height){var u={x:0,y:0,w:l.bitmap.width+2,h:l.bitmap.height+2};n.push(u),a[s]={rect:u,metrics:l.metrics};}}}var h=e.potpack(n),c=h.w,f=h.h,p=new e.AlphaImage({width:c||1,height:f||1});for(var d in t){var g=t[d];for(var m in g){var v=g[+m];if(v&&0!==v.bitmap.width&&0!==v.bitmap.height){var y=r[d][m].rect;e.AlphaImage.copy(v.bitmap,p,{x:0,y:0},{x:y.x+1,y:y.y+1},v.bitmap);}}}this.image=p,this.positions=r;};e.register("GlyphAtlas",k);var z=function(t){this.tileID=new e.OverscaledTileID(t.tileID.overscaledZ,t.tileID.wrap,t.tileID.canonical.z,t.tileID.canonical.x,t.tileID.canonical.y),this.uid=t.uid,this.zoom=t.zoom,this.pixelRatio=t.pixelRatio,this.tileSize=t.tileSize,this.source=t.source,this.overscaling=this.tileID.overscaleFactor(),this.showCollisionBoxes=t.showCollisionBoxes,this.collectResourceTiming=!!t.collectResourceTiming,this.returnDependencies=!!t.returnDependencies;};function C(t,r){for(var n=new e.EvaluationParameters(r),o=0,i=t;o<i.length;o+=1){i[o].recalculate(n);}}z.prototype.parse=function(t,r,n,o){var i=this;this.status="parsing",this.data=t,this.collisionBoxArray=new e.CollisionBoxArray;var a=new e.DictionaryCoder(Object.keys(t.layers).sort()),s=new e.FeatureIndex(this.tileID);s.bucketLayerIDs=[];var l,u,h,c,f={},p={featureIndex:s,iconDependencies:{},patternDependencies:{},glyphDependencies:{}},d=r.familiesBySource[this.source];for(var g in d){var m=t.layers[g];if(m){1===m.version&&e.warnOnce('Vector tile source "'+i.source+'" layer "'+g+'" does not use vector tile spec v2 and therefore may have some rendering errors.');for(var v=a.encode(g),y=[],x=0;x<m.length;x++){var w=m.feature(x);y.push({feature:w,index:x,sourceLayerIndex:v});}for(var M=0,S=d[g];M<S.length;M+=1){var P=S[M],b=P[0];if(!(b.minzoom&&i.zoom<Math.floor(b.minzoom)))if(!(b.maxzoom&&i.zoom>=b.maxzoom))if("none"!==b.visibility)C(P,i.zoom),(f[b.id]=b.createBucket({index:s.bucketLayerIDs.length,layers:P,zoom:i.zoom,pixelRatio:i.pixelRatio,overscaling:i.overscaling,collisionBoxArray:i.collisionBoxArray,sourceLayerIndex:v,sourceID:i.source})).populate(y,p),s.bucketLayerIDs.push(P.map(function(e){return e.id}));}}}var T=e.mapObject(p.glyphDependencies,function(e){return Object.keys(e).map(Number)});Object.keys(T).length?n.send("getGlyphs",{uid:this.uid,stacks:T},function(e,t){l||(l=e,u=t,E.call(i));}):u={};var I=Object.keys(p.iconDependencies);I.length?n.send("getImages",{icons:I},function(e,t){l||(l=e,h=t,E.call(i));}):h={};var z=Object.keys(p.patternDependencies);function E(){if(l)return o(l);if(u&&h&&c){var t=new k(u),r=new e.ImageAtlas(h,c);for(var n in f){var i=f[n];i instanceof e.SymbolBucket?(C(i.layers,this.zoom),_(i,u,t.positions,h,r.iconPositions,this.showCollisionBoxes)):i.hasPattern&&(i instanceof e.LineBucket||i instanceof e.FillBucket||i instanceof e.FillExtrusionBucket)&&(C(i.layers,this.zoom),i.addFeatures(p,r.patternPositions));}this.status="done",o(null,{buckets:e.values(f).filter(function(e){return !e.isEmpty()}),featureIndex:s,collisionBoxArray:this.collisionBoxArray,glyphAtlasImage:t.image,imageAtlas:r,glyphMap:this.returnDependencies?u:null,iconMap:this.returnDependencies?h:null,glyphPositions:this.returnDependencies?t.positions:null});}}z.length?n.send("getImages",{icons:z},function(e,t){l||(l=e,c=t,E.call(i));}):c={},E.call(this);};var E="undefined"!=typeof performance,A={getEntriesByName:function(e){return !!(E&&performance&&performance.getEntriesByName)&&performance.getEntriesByName(e)},mark:function(e){return !!(E&&performance&&performance.mark)&&performance.mark(e)},measure:function(e,t,r){return !!(E&&performance&&performance.measure)&&performance.measure(e,t,r)},clearMarks:function(e){return !!(E&&performance&&performance.clearMarks)&&performance.clearMarks(e)},clearMeasures:function(e){return !!(E&&performance&&performance.clearMeasures)&&performance.clearMeasures(e)}},L=function(e){this._marks={start:[e.url,"start"].join("#"),end:[e.url,"end"].join("#"),measure:e.url.toString()},A.mark(this._marks.start);};function D(t,r){var n=e.getArrayBuffer(t.request,function(t,n,o,i){t?r(t):n&&r(null,{vectorTile:new e.mvt.VectorTile(new e.Protobuf(n)),rawData:n,cacheControl:o,expires:i});});return function(){n.cancel(),r();}}L.prototype.finish=function(){A.mark(this._marks.end);var e=A.getEntriesByName(this._marks.measure);return 0===e.length&&(A.measure(this._marks.measure,this._marks.start,this._marks.end),e=A.getEntriesByName(this._marks.measure),A.clearMarks(this._marks.start),A.clearMarks(this._marks.end),A.clearMeasures(this._marks.measure)),e},A.Performance=L;var O=function(e,t,r){this.actor=e,this.layerIndex=t,this.loadVectorData=r||D,this.loading={},this.loaded={};};O.prototype.loadTile=function(t,r){var n=this,o=t.uid;this.loading||(this.loading={});var i=!!(t&&t.request&&t.request.collectResourceTiming)&&new A.Performance(t.request),a=this.loading[o]=new z(t);a.abort=this.loadVectorData(t,function(t,s){if(delete n.loading[o],t||!s)return a.status="done",n.loaded[o]=a,r(t);var l=s.rawData,u={};s.expires&&(u.expires=s.expires),s.cacheControl&&(u.cacheControl=s.cacheControl);var h={};if(i){var c=i.finish();c&&(h.resourceTiming=JSON.parse(JSON.stringify(c)));}a.vectorTile=s.vectorTile,a.parse(s.vectorTile,n.layerIndex,n.actor,function(t,n){if(t||!n)return r(t);r(null,e.extend({rawTileData:l.slice(0)},n,u,h));}),n.loaded=n.loaded||{},n.loaded[o]=a;});},O.prototype.reloadTile=function(e,t){var r=this.loaded,n=e.uid,o=this;if(r&&r[n]){var i=r[n];i.showCollisionBoxes=e.showCollisionBoxes;var a=function(e,r){var n=i.reloadCallback;n&&(delete i.reloadCallback,i.parse(i.vectorTile,o.layerIndex,o.actor,n)),t(e,r);};"parsing"===i.status?i.reloadCallback=a:"done"===i.status&&(i.vectorTile?i.parse(i.vectorTile,this.layerIndex,this.actor,a):a());}},O.prototype.abortTile=function(e,t){var r=this.loading,n=e.uid;r&&r[n]&&r[n].abort&&(r[n].abort(),delete r[n]),t();},O.prototype.removeTile=function(e,t){var r=this.loaded,n=e.uid;r&&r[n]&&delete r[n],t();};var N=function(){this.loaded={};};N.prototype.loadTile=function(t,r){var n=t.uid,o=t.encoding,i=t.rawImageData,a=new e.DEMData(n,i,o);this.loaded=this.loaded||{},this.loaded[n]=a,r(null,a);},N.prototype.removeTile=function(e){var t=this.loaded,r=e.uid;t&&t[r]&&delete t[r];};var R={RADIUS:6378137,FLATTENING:1/298.257223563,POLAR_RADIUS:6356752.3142};function F(e){var t=0;if(e&&e.length>0){t+=Math.abs(B(e[0]));for(var r=1;r<e.length;r++)t-=Math.abs(B(e[r]));}return t}function B(e){var t,r,n,o,i,a,s=0,l=e.length;if(l>2){for(a=0;a<l;a++)a===l-2?(n=l-2,o=l-1,i=0):a===l-1?(n=l-1,o=0,i=1):(n=a,o=a+1,i=a+2),t=e[n],r=e[o],s+=(Z(e[i][0])-Z(t[0]))*Math.sin(Z(r[1]));s=s*R.RADIUS*R.RADIUS/2;}return s}function Z(e){return e*Math.PI/180}var j={geometry:function e(t){var r,n=0;switch(t.type){case"Polygon":return F(t.coordinates);case"MultiPolygon":for(r=0;r<t.coordinates.length;r++)n+=F(t.coordinates[r]);return n;case"Point":case"MultiPoint":case"LineString":case"MultiLineString":return 0;case"GeometryCollection":for(r=0;r<t.geometries.length;r++)n+=e(t.geometries[r]);return n}},ring:B},G=function e(t,r){switch(t&&t.type||null){case"FeatureCollection":return t.features=t.features.map(J(e,r)),t;case"Feature":return t.geometry=e(t.geometry,r),t;case"Polygon":case"MultiPolygon":return function(e,t){"Polygon"===e.type?e.coordinates=X(e.coordinates,t):"MultiPolygon"===e.type&&(e.coordinates=e.coordinates.map(J(X,t)));return e}(t,r);default:return t}};function J(e,t){return function(r){return e(r,t)}}function X(e,t){t=!!t,e[0]=V(e[0],t);for(var r=1;r<e.length;r++)e[r]=V(e[r],!t);return e}function V(e,t){return function(e){return j.ring(e)>=0}(e)===t?e:e.reverse()}var W=e.mvt.VectorTileFeature.prototype.toGeoJSON,Y=function(t){this._feature=t,this.extent=e.EXTENT,this.type=t.type,this.properties=t.tags,"id"in t&&!isNaN(t.id)&&(this.id=parseInt(t.id,10));};Y.prototype.loadGeometry=function(){if(1===this._feature.type){for(var t=[],r=0,n=this._feature.geometry;r<n.length;r+=1){var o=n[r];t.push([new e.Point(o[0],o[1])]);}return t}for(var i=[],a=0,s=this._feature.geometry;a<s.length;a+=1){for(var l=[],u=0,h=s[a];u<h.length;u+=1){var c=h[u];l.push(new e.Point(c[0],c[1]));}i.push(l);}return i},Y.prototype.toGeoJSON=function(e,t,r){return W.call(this,e,t,r)};var q=function(t){this.layers={_geojsonTileLayer:this},this.name="_geojsonTileLayer",this.extent=e.EXTENT,this.length=t.length,this._features=t;};q.prototype.feature=function(e){return new Y(this._features[e])};var U=e.vectorTile.VectorTileFeature,K=H;function H(e,t){this.options=t||{},this.features=e,this.length=e.length;}function Q(e,t){this.id="number"==typeof e.id?e.id:void 0,this.type=e.type,this.rawGeometry=1===e.type?[e.geometry]:e.geometry,this.properties=e.tags,this.extent=t||4096;}H.prototype.feature=function(e){return new Q(this.features[e],this.options.extent)},Q.prototype.loadGeometry=function(){var t=this.rawGeometry;this.geometry=[];for(var r=0;r<t.length;r++){for(var n=t[r],o=[],i=0;i<n.length;i++)o.push(new e.Point$1(n[i][0],n[i][1]));this.geometry.push(o);}return this.geometry},Q.prototype.bbox=function(){this.geometry||this.loadGeometry();for(var e=this.geometry,t=1/0,r=-1/0,n=1/0,o=-1/0,i=0;i<e.length;i++)for(var a=e[i],s=0;s<a.length;s++){var l=a[s];t=Math.min(t,l.x),r=Math.max(r,l.x),n=Math.min(n,l.y),o=Math.max(o,l.y);}return [t,n,r,o]},Q.prototype.toGeoJSON=U.prototype.toGeoJSON;var $=ne,ee=ne,te=function(e,t){t=t||{};var r={};for(var n in e)r[n]=new K(e[n].features,t),r[n].name=n,r[n].version=t.version,r[n].extent=t.extent;return ne({layers:r})},re=K;function ne(t){var r=new e.pbf;return function(e,t){for(var r in e.layers)t.writeMessage(3,oe,e.layers[r]);}(t,r),r.finish()}function oe(e,t){var r;t.writeVarintField(15,e.version||1),t.writeStringField(1,e.name||""),t.writeVarintField(5,e.extent||4096);var n={keys:[],values:[],keycache:{},valuecache:{}};for(r=0;r<e.length;r++)n.feature=e.feature(r),t.writeMessage(2,ie,n);var o=n.keys;for(r=0;r<o.length;r++)t.writeStringField(3,o[r]);var i=n.values;for(r=0;r<i.length;r++)t.writeMessage(4,he,i[r]);}function ie(e,t){var r=e.feature;void 0!==r.id&&t.writeVarintField(1,r.id),t.writeMessage(2,ae,e),t.writeVarintField(3,r.type),t.writeMessage(4,ue,r);}function ae(e,t){var r=e.feature,n=e.keys,o=e.values,i=e.keycache,a=e.valuecache;for(var s in r.properties){var l=i[s];void 0===l&&(n.push(s),l=n.length-1,i[s]=l),t.writeVarint(l);var u=r.properties[s],h=typeof u;"string"!==h&&"boolean"!==h&&"number"!==h&&(u=JSON.stringify(u));var c=h+":"+u,f=a[c];void 0===f&&(o.push(u),f=o.length-1,a[c]=f),t.writeVarint(f);}}function se(e,t){return (t<<3)+(7&e)}function le(e){return e<<1^e>>31}function ue(e,t){for(var r=e.loadGeometry(),n=e.type,o=0,i=0,a=r.length,s=0;s<a;s++){var l=r[s],u=1;1===n&&(u=l.length),t.writeVarint(se(1,u));for(var h=3===n?l.length-1:l.length,c=0;c<h;c++){1===c&&1!==n&&t.writeVarint(se(2,h-1));var f=l[c].x-o,p=l[c].y-i;t.writeVarint(le(f)),t.writeVarint(le(p)),o+=f,i+=p;}3===n&&t.writeVarint(se(7,0));}}function he(e,t){var r=typeof e;"string"===r?t.writeStringField(1,e):"boolean"===r?t.writeBooleanField(7,e):"number"===r&&(e%1!=0?t.writeDoubleField(3,e):e<0?t.writeSVarintField(6,e):t.writeVarintField(5,e));}function ce(e,t,r,n,o,i){if(!(o-n<=r)){var a=n+o>>1;!function e(t,r,n,o,i,a){for(;i>o;){if(i-o>600){var s=i-o+1,l=n-o+1,u=Math.log(s),h=.5*Math.exp(2*u/3),c=.5*Math.sqrt(u*h*(s-h)/s)*(l-s/2<0?-1:1),f=Math.max(o,Math.floor(n-l*h/s+c)),p=Math.min(i,Math.floor(n+(s-l)*h/s+c));e(t,r,n,f,p,a);}var d=r[2*n+a],g=o,m=i;for(fe(t,r,o,n),r[2*i+a]>d&&fe(t,r,o,i);g<m;){for(fe(t,r,g,m),g++,m--;r[2*g+a]<d;)g++;for(;r[2*m+a]>d;)m--;}r[2*o+a]===d?fe(t,r,o,m):fe(t,r,++m,i),m<=n&&(o=m+1),n<=m&&(i=m-1);}}(e,t,a,n,o,i%2),ce(e,t,r,n,a-1,i+1),ce(e,t,r,a+1,o,i+1);}}function fe(e,t,r,n){pe(e,r,n),pe(t,2*r,2*n),pe(t,2*r+1,2*n+1);}function pe(e,t,r){var n=e[t];e[t]=e[r],e[r]=n;}function de(e,t,r,n){var o=e-r,i=t-n;return o*o+i*i}$.fromVectorTileJs=ee,$.fromGeojsonVt=te,$.GeoJSONWrapper=re;var ge=function(e){return e[0]},me=function(e){return e[1]},ve=function(e,t,r,n,o){void 0===t&&(t=ge),void 0===r&&(r=me),void 0===n&&(n=64),void 0===o&&(o=Float64Array),this.nodeSize=n,this.points=e;for(var i=e.length<65536?Uint16Array:Uint32Array,a=this.ids=new i(e.length),s=this.coords=new o(2*e.length),l=0;l<e.length;l++)a[l]=l,s[2*l]=t(e[l]),s[2*l+1]=r(e[l]);ce(a,s,n,0,a.length-1,0);};ve.prototype.range=function(e,t,r,n){return function(e,t,r,n,o,i,a){for(var s,l,u=[0,e.length-1,0],h=[];u.length;){var c=u.pop(),f=u.pop(),p=u.pop();if(f-p<=a)for(var d=p;d<=f;d++)s=t[2*d],l=t[2*d+1],s>=r&&s<=o&&l>=n&&l<=i&&h.push(e[d]);else{var g=Math.floor((p+f)/2);s=t[2*g],l=t[2*g+1],s>=r&&s<=o&&l>=n&&l<=i&&h.push(e[g]);var m=(c+1)%2;(0===c?r<=s:n<=l)&&(u.push(p),u.push(g-1),u.push(m)),(0===c?o>=s:i>=l)&&(u.push(g+1),u.push(f),u.push(m));}}return h}(this.ids,this.coords,e,t,r,n,this.nodeSize)},ve.prototype.within=function(e,t,r){return function(e,t,r,n,o,i){for(var a=[0,e.length-1,0],s=[],l=o*o;a.length;){var u=a.pop(),h=a.pop(),c=a.pop();if(h-c<=i)for(var f=c;f<=h;f++)de(t[2*f],t[2*f+1],r,n)<=l&&s.push(e[f]);else{var p=Math.floor((c+h)/2),d=t[2*p],g=t[2*p+1];de(d,g,r,n)<=l&&s.push(e[p]);var m=(u+1)%2;(0===u?r-o<=d:n-o<=g)&&(a.push(c),a.push(p-1),a.push(m)),(0===u?r+o>=d:n+o>=g)&&(a.push(p+1),a.push(h),a.push(m));}}return s}(this.ids,this.coords,e,t,r,this.nodeSize)};var ye={minZoom:0,maxZoom:16,radius:40,extent:512,nodeSize:64,log:!1,reduce:null,initial:function(){return {}},map:function(e){return e}},xe=function(e){this.options=Te(Object.create(ye),e),this.trees=new Array(this.options.maxZoom+1);};function we(e,t,r,n,o){return {x:e,y:t,zoom:1/0,id:r,parentId:-1,numPoints:n,properties:o}}function Me(e,t){var r=e.geometry.coordinates,n=r[0],o=r[1];return {x:Pe(n),y:be(o),zoom:1/0,index:t,parentId:-1}}function Se(e){return {type:"Feature",id:e.id,properties:_e(e),geometry:{type:"Point",coordinates:[(n=e.x,360*(n-.5)),(t=e.y,r=(180-360*t)*Math.PI/180,360*Math.atan(Math.exp(r))/Math.PI-90)]}};var t,r,n;}function _e(e){var t=e.numPoints,r=t>=1e4?Math.round(t/1e3)+"k":t>=1e3?Math.round(t/100)/10+"k":t;return Te(Te({},e.properties),{cluster:!0,cluster_id:e.id,point_count:t,point_count_abbreviated:r})}function Pe(e){return e/360+.5}function be(e){var t=Math.sin(e*Math.PI/180),r=.5-.25*Math.log((1+t)/(1-t))/Math.PI;return r<0?0:r>1?1:r}function Te(e,t){for(var r in t)e[r]=t[r];return e}function Ie(e){return e.x}function ke(e){return e.y}function ze(e,t,r,n,o,i){var a=o-r,s=i-n;if(0!==a||0!==s){var l=((e-r)*a+(t-n)*s)/(a*a+s*s);l>1?(r=o,n=i):l>0&&(r+=a*l,n+=s*l);}return (a=e-r)*a+(s=t-n)*s}function Ce(e,t,r,n){var o={id:void 0===e?null:e,type:t,geometry:r,tags:n,minX:1/0,minY:1/0,maxX:-1/0,maxY:-1/0};return function(e){var t=e.geometry,r=e.type;if("Point"===r||"MultiPoint"===r||"LineString"===r)Ee(e,t);else if("Polygon"===r||"MultiLineString"===r)for(var n=0;n<t.length;n++)Ee(e,t[n]);else if("MultiPolygon"===r)for(n=0;n<t.length;n++)for(var o=0;o<t[n].length;o++)Ee(e,t[n][o]);}(o),o}function Ee(e,t){for(var r=0;r<t.length;r+=3)e.minX=Math.min(e.minX,t[r]),e.minY=Math.min(e.minY,t[r+1]),e.maxX=Math.max(e.maxX,t[r]),e.maxY=Math.max(e.maxY,t[r+1]);}function Ae(e,t,r,n){if(t.geometry){var o=t.geometry.coordinates,i=t.geometry.type,a=Math.pow(r.tolerance/((1<<r.maxZoom)*r.extent),2),s=[],l=t.id;if(r.promoteId?l=t.properties[r.promoteId]:r.generateId&&(l=n||0),"Point"===i)Le(o,s);else if("MultiPoint"===i)for(var u=0;u<o.length;u++)Le(o[u],s);else if("LineString"===i)De(o,s,a,!1);else if("MultiLineString"===i){if(r.lineMetrics){for(u=0;u<o.length;u++)s=[],De(o[u],s,a,!1),e.push(Ce(l,"LineString",s,t.properties));return}Oe(o,s,a,!1);}else if("Polygon"===i)Oe(o,s,a,!0);else{if("MultiPolygon"!==i){if("GeometryCollection"===i){for(u=0;u<t.geometry.geometries.length;u++)Ae(e,{id:l,geometry:t.geometry.geometries[u],properties:t.properties},r,n);return}throw new Error("Input data is not a valid GeoJSON object.")}for(u=0;u<o.length;u++){var h=[];Oe(o[u],h,a,!0),s.push(h);}}e.push(Ce(l,i,s,t.properties));}}function Le(e,t){t.push(Ne(e[0])),t.push(Re(e[1])),t.push(0);}function De(e,t,r,n){for(var o,i,a=0,s=0;s<e.length;s++){var l=Ne(e[s][0]),u=Re(e[s][1]);t.push(l),t.push(u),t.push(0),s>0&&(a+=n?(o*u-l*i)/2:Math.sqrt(Math.pow(l-o,2)+Math.pow(u-i,2))),o=l,i=u;}var h=t.length-3;t[2]=1,function e(t,r,n,o){for(var i,a=o,s=n-r>>1,l=n-r,u=t[r],h=t[r+1],c=t[n],f=t[n+1],p=r+3;p<n;p+=3){var d=ze(t[p],t[p+1],u,h,c,f);if(d>a)i=p,a=d;else if(d===a){var g=Math.abs(p-s);g<l&&(i=p,l=g);}}a>o&&(i-r>3&&e(t,r,i,o),t[i+2]=a,n-i>3&&e(t,i,n,o));}(t,0,h,r),t[h+2]=1,t.size=Math.abs(a),t.start=0,t.end=t.size;}function Oe(e,t,r,n){for(var o=0;o<e.length;o++){var i=[];De(e[o],i,r,n),t.push(i);}}function Ne(e){return e/360+.5}function Re(e){var t=Math.sin(e*Math.PI/180),r=.5-.25*Math.log((1+t)/(1-t))/Math.PI;return r<0?0:r>1?1:r}function Fe(e,t,r,n,o,i,a,s){if(n/=t,i>=(r/=t)&&a<n)return e;if(a<r||i>=n)return null;for(var l=[],u=0;u<e.length;u++){var h=e[u],c=h.geometry,f=h.type,p=0===o?h.minX:h.minY,d=0===o?h.maxX:h.maxY;if(p>=r&&d<n)l.push(h);else if(!(d<r||p>=n)){var g=[];if("Point"===f||"MultiPoint"===f)Be(c,g,r,n,o);else if("LineString"===f)Ze(c,g,r,n,o,!1,s.lineMetrics);else if("MultiLineString"===f)Ge(c,g,r,n,o,!1);else if("Polygon"===f)Ge(c,g,r,n,o,!0);else if("MultiPolygon"===f)for(var m=0;m<c.length;m++){var v=[];Ge(c[m],v,r,n,o,!0),v.length&&g.push(v);}if(g.length){if(s.lineMetrics&&"LineString"===f){for(m=0;m<g.length;m++)l.push(Ce(h.id,f,g[m],h.tags));continue}"LineString"!==f&&"MultiLineString"!==f||(1===g.length?(f="LineString",g=g[0]):f="MultiLineString"),"Point"!==f&&"MultiPoint"!==f||(f=3===g.length?"Point":"MultiPoint"),l.push(Ce(h.id,f,g,h.tags));}}}return l.length?l:null}function Be(e,t,r,n,o){for(var i=0;i<e.length;i+=3){var a=e[i+o];a>=r&&a<=n&&(t.push(e[i]),t.push(e[i+1]),t.push(e[i+2]));}}function Ze(e,t,r,n,o,i,a){for(var s,l,u=je(e),h=0===o?Xe:Ve,c=e.start,f=0;f<e.length-3;f+=3){var p=e[f],d=e[f+1],g=e[f+2],m=e[f+3],v=e[f+4],y=0===o?p:d,x=0===o?m:v,w=!1;a&&(s=Math.sqrt(Math.pow(p-m,2)+Math.pow(d-v,2))),y<r?x>r&&(l=h(u,p,d,m,v,r),a&&(u.start=c+s*l)):y>n?x<n&&(l=h(u,p,d,m,v,n),a&&(u.start=c+s*l)):Je(u,p,d,g),x<r&&y>=r&&(l=h(u,p,d,m,v,r),w=!0),x>n&&y<=n&&(l=h(u,p,d,m,v,n),w=!0),!i&&w&&(a&&(u.end=c+s*l),t.push(u),u=je(e)),a&&(c+=s);}var M=e.length-3;p=e[M],d=e[M+1],g=e[M+2],(y=0===o?p:d)>=r&&y<=n&&Je(u,p,d,g),M=u.length-3,i&&M>=3&&(u[M]!==u[0]||u[M+1]!==u[1])&&Je(u,u[0],u[1],u[2]),u.length&&t.push(u);}function je(e){var t=[];return t.size=e.size,t.start=e.start,t.end=e.end,t}function Ge(e,t,r,n,o,i){for(var a=0;a<e.length;a++)Ze(e[a],t,r,n,o,i,!1);}function Je(e,t,r,n){e.push(t),e.push(r),e.push(n);}function Xe(e,t,r,n,o,i){var a=(i-t)/(n-t);return e.push(i),e.push(r+(o-r)*a),e.push(1),a}function Ve(e,t,r,n,o,i){var a=(i-r)/(o-r);return e.push(t+(n-t)*a),e.push(i),e.push(1),a}function We(e,t){for(var r=[],n=0;n<e.length;n++){var o,i=e[n],a=i.type;if("Point"===a||"MultiPoint"===a||"LineString"===a)o=Ye(i.geometry,t);else if("MultiLineString"===a||"Polygon"===a){o=[];for(var s=0;s<i.geometry.length;s++)o.push(Ye(i.geometry[s],t));}else if("MultiPolygon"===a)for(o=[],s=0;s<i.geometry.length;s++){for(var l=[],u=0;u<i.geometry[s].length;u++)l.push(Ye(i.geometry[s][u],t));o.push(l);}r.push(Ce(i.id,a,o,i.tags));}return r}function Ye(e,t){var r=[];r.size=e.size,void 0!==e.start&&(r.start=e.start,r.end=e.end);for(var n=0;n<e.length;n+=3)r.push(e[n]+t,e[n+1],e[n+2]);return r}function qe(e,t){if(e.transformed)return e;var r,n,o,i=1<<e.z,a=e.x,s=e.y;for(r=0;r<e.features.length;r++){var l=e.features[r],u=l.geometry,h=l.type;if(l.geometry=[],1===h)for(n=0;n<u.length;n+=2)l.geometry.push(Ue(u[n],u[n+1],t,i,a,s));else for(n=0;n<u.length;n++){var c=[];for(o=0;o<u[n].length;o+=2)c.push(Ue(u[n][o],u[n][o+1],t,i,a,s));l.geometry.push(c);}}return e.transformed=!0,e}function Ue(e,t,r,n,o,i){return [Math.round(r*(e*n-o)),Math.round(r*(t*n-i))]}function Ke(e,t,r,n,o){for(var i=t===o.maxZoom?0:o.tolerance/((1<<t)*o.extent),a={features:[],numPoints:0,numSimplified:0,numFeatures:0,source:null,x:r,y:n,z:t,transformed:!1,minX:2,minY:1,maxX:-1,maxY:0},s=0;s<e.length;s++){a.numFeatures++,He(a,e[s],i,o);var l=e[s].minX,u=e[s].minY,h=e[s].maxX,c=e[s].maxY;l<a.minX&&(a.minX=l),u<a.minY&&(a.minY=u),h>a.maxX&&(a.maxX=h),c>a.maxY&&(a.maxY=c);}return a}function He(e,t,r,n){var o=t.geometry,i=t.type,a=[];if("Point"===i||"MultiPoint"===i)for(var s=0;s<o.length;s+=3)a.push(o[s]),a.push(o[s+1]),e.numPoints++,e.numSimplified++;else if("LineString"===i)Qe(a,o,e,r,!1,!1);else if("MultiLineString"===i||"Polygon"===i)for(s=0;s<o.length;s++)Qe(a,o[s],e,r,"Polygon"===i,0===s);else if("MultiPolygon"===i)for(var l=0;l<o.length;l++){var u=o[l];for(s=0;s<u.length;s++)Qe(a,u[s],e,r,!0,0===s);}if(a.length){var h=t.tags||null;if("LineString"===i&&n.lineMetrics){for(var c in h={},t.tags)h[c]=t.tags[c];h.mapbox_clip_start=o.start/o.size,h.mapbox_clip_end=o.end/o.size;}var f={geometry:a,type:"Polygon"===i||"MultiPolygon"===i?3:"LineString"===i||"MultiLineString"===i?2:1,tags:h};null!==t.id&&(f.id=t.id),e.features.push(f);}}function Qe(e,t,r,n,o,i){var a=n*n;if(n>0&&t.size<(o?a:n))r.numPoints+=t.length/3;else{for(var s=[],l=0;l<t.length;l+=3)(0===n||t[l+2]>a)&&(r.numSimplified++,s.push(t[l]),s.push(t[l+1])),r.numPoints++;o&&function(e,t){for(var r=0,n=0,o=e.length,i=o-2;n<o;i=n,n+=2)r+=(e[n]-e[i])*(e[n+1]+e[i+1]);if(r>0===t)for(n=0,o=e.length;n<o/2;n+=2){var a=e[n],s=e[n+1];e[n]=e[o-2-n],e[n+1]=e[o-1-n],e[o-2-n]=a,e[o-1-n]=s;}}(s,i),e.push(s);}}function $e(e,t){var r=(t=this.options=function(e,t){for(var r in t)e[r]=t[r];return e}(Object.create(this.options),t)).debug;if(r&&console.time("preprocess data"),t.maxZoom<0||t.maxZoom>24)throw new Error("maxZoom should be in the 0-24 range");if(t.promoteId&&t.generateId)throw new Error("promoteId and generateId cannot be used together.");var n=function(e,t){var r=[];if("FeatureCollection"===e.type)for(var n=0;n<e.features.length;n++)Ae(r,e.features[n],t,n);else"Feature"===e.type?Ae(r,e,t):Ae(r,{geometry:e},t);return r}(e,t);this.tiles={},this.tileCoords=[],r&&(console.timeEnd("preprocess data"),console.log("index: maxZoom: %d, maxPoints: %d",t.indexMaxZoom,t.indexMaxPoints),console.time("generate tiles"),this.stats={},this.total=0),(n=function(e,t){var r=t.buffer/t.extent,n=e,o=Fe(e,1,-1-r,r,0,-1,2,t),i=Fe(e,1,1-r,2+r,0,-1,2,t);return (o||i)&&(n=Fe(e,1,-r,1+r,0,-1,2,t)||[],o&&(n=We(o,1).concat(n)),i&&(n=n.concat(We(i,-1)))),n}(n,t)).length&&this.splitTile(n,0,0,0),r&&(n.length&&console.log("features: %d, points: %d",this.tiles[0].numFeatures,this.tiles[0].numPoints),console.timeEnd("generate tiles"),console.log("tiles generated:",this.total,JSON.stringify(this.stats)));}function et(e,t,r){return 32*((1<<e)*r+t)+e}function tt(e,t){var r=e.tileID.canonical;if(!this._geoJSONIndex)return t(null,null);var n=this._geoJSONIndex.getTile(r.z,r.x,r.y);if(!n)return t(null,null);var o=new q(n.features),i=$(o);0===i.byteOffset&&i.byteLength===i.buffer.byteLength||(i=new Uint8Array(i)),t(null,{vectorTile:o,rawData:i.buffer});}xe.prototype.load=function(e){var t=this.options,r=t.log,n=t.minZoom,o=t.maxZoom,i=t.nodeSize;r&&console.time("total time");var a="prepare "+e.length+" points";r&&console.time(a),this.points=e;for(var s=[],l=0;l<e.length;l++)e[l].geometry&&s.push(Me(e[l],l));this.trees[o+1]=new ve(s,Ie,ke,i,Float32Array),r&&console.timeEnd(a);for(var u=o;u>=n;u--){var h=+Date.now();s=this._cluster(s,u),this.trees[u]=new ve(s,Ie,ke,i,Float32Array),r&&console.log("z%d: %d clusters in %dms",u,s.length,+Date.now()-h);}return r&&console.timeEnd("total time"),this},xe.prototype.getClusters=function(e,t){var r=((e[0]+180)%360+360)%360-180,n=Math.max(-90,Math.min(90,e[1])),o=180===e[2]?180:((e[2]+180)%360+360)%360-180,i=Math.max(-90,Math.min(90,e[3]));if(e[2]-e[0]>=360)r=-180,o=180;else if(r>o){var a=this.getClusters([r,n,180,i],t),s=this.getClusters([-180,n,o,i],t);return a.concat(s)}for(var l=this.trees[this._limitZoom(t)],u=[],h=0,c=l.range(Pe(r),be(i),Pe(o),be(n));h<c.length;h+=1){var f=c[h],p=l.points[f];u.push(p.numPoints?Se(p):this.points[p.index]);}return u},xe.prototype.getChildren=function(e){var t=e>>5,r=e%32,n="No cluster with the specified id.",o=this.trees[r];if(!o)throw new Error(n);var i=o.points[t];if(!i)throw new Error(n);for(var a=this.options.radius/(this.options.extent*Math.pow(2,r-1)),s=[],l=0,u=o.within(i.x,i.y,a);l<u.length;l+=1){var h=u[l],c=o.points[h];c.parentId===e&&s.push(c.numPoints?Se(c):this.points[c.index]);}if(0===s.length)throw new Error(n);return s},xe.prototype.getLeaves=function(e,t,r){t=t||10,r=r||0;var n=[];return this._appendLeaves(n,e,t,r,0),n},xe.prototype.getTile=function(e,t,r){var n=this.trees[this._limitZoom(e)],o=Math.pow(2,e),i=this.options,a=i.extent,s=i.radius/a,l=(r-s)/o,u=(r+1+s)/o,h={features:[]};return this._addTileFeatures(n.range((t-s)/o,l,(t+1+s)/o,u),n.points,t,r,o,h),0===t&&this._addTileFeatures(n.range(1-s/o,l,1,u),n.points,o,r,o,h),t===o-1&&this._addTileFeatures(n.range(0,l,s/o,u),n.points,-1,r,o,h),h.features.length?h:null},xe.prototype.getClusterExpansionZoom=function(e){for(var t=e%32-1;t<=this.options.maxZoom;){var r=this.getChildren(e);if(t++,1!==r.length)break;e=r[0].properties.cluster_id;}return t},xe.prototype._appendLeaves=function(e,t,r,n,o){for(var i=0,a=this.getChildren(t);i<a.length;i+=1){var s=a[i],l=s.properties;if(l&&l.cluster?o+l.point_count<=n?o+=l.point_count:o=this._appendLeaves(e,l.cluster_id,r,n,o):o<n?o++:e.push(s),e.length===r)break}return o},xe.prototype._addTileFeatures=function(e,t,r,n,o,i){for(var a=0,s=e;a<s.length;a+=1){var l=t[s[a]],u={type:1,geometry:[[Math.round(this.options.extent*(l.x*o-r)),Math.round(this.options.extent*(l.y*o-n))]],tags:l.numPoints?_e(l):this.points[l.index].properties},h=l.numPoints?l.id:this.points[l.index].id;void 0!==h&&(u.id=h),i.features.push(u);}},xe.prototype._limitZoom=function(e){return Math.max(this.options.minZoom,Math.min(e,this.options.maxZoom+1))},xe.prototype._cluster=function(e,t){for(var r=[],n=this.options,o=n.radius,i=n.extent,a=n.reduce,s=n.initial,l=o/(i*Math.pow(2,t)),u=0;u<e.length;u++){var h=e[u];if(!(h.zoom<=t)){h.zoom=t;var c=this.trees[t+1],f=c.within(h.x,h.y,l),p=h.numPoints||1,d=h.x*p,g=h.y*p,m=null;a&&(m=s(),this._accumulate(m,h));for(var v=(u<<5)+(t+1),y=0,x=f;y<x.length;y+=1){var w=x[y],M=c.points[w];if(!(M.zoom<=t)){M.zoom=t;var S=M.numPoints||1;d+=M.x*S,g+=M.y*S,p+=S,M.parentId=v,a&&this._accumulate(m,M);}}1===p?r.push(h):(h.parentId=v,r.push(we(d/p,g/p,v,p,m)));}}return r},xe.prototype._accumulate=function(e,t){var r=this.options,n=r.map;(0,r.reduce)(e,t.numPoints?t.properties:n(this.points[t.index].properties));},$e.prototype.options={maxZoom:14,indexMaxZoom:5,indexMaxPoints:1e5,tolerance:3,extent:4096,buffer:64,lineMetrics:!1,promoteId:null,generateId:!1,debug:0},$e.prototype.splitTile=function(e,t,r,n,o,i,a){for(var s=[e,t,r,n],l=this.options,u=l.debug;s.length;){n=s.pop(),r=s.pop(),t=s.pop(),e=s.pop();var h=1<<t,c=et(t,r,n),f=this.tiles[c];if(!f&&(u>1&&console.time("creation"),f=this.tiles[c]=Ke(e,t,r,n,l),this.tileCoords.push({z:t,x:r,y:n}),u)){u>1&&(console.log("tile z%d-%d-%d (features: %d, points: %d, simplified: %d)",t,r,n,f.numFeatures,f.numPoints,f.numSimplified),console.timeEnd("creation"));var p="z"+t;this.stats[p]=(this.stats[p]||0)+1,this.total++;}if(f.source=e,o){if(t===l.maxZoom||t===o)continue;var d=1<<o-t;if(r!==Math.floor(i/d)||n!==Math.floor(a/d))continue}else if(t===l.indexMaxZoom||f.numPoints<=l.indexMaxPoints)continue;if(f.source=null,0!==e.length){u>1&&console.time("clipping");var g,m,v,y,x,w,M=.5*l.buffer/l.extent,S=.5-M,_=.5+M,P=1+M;g=m=v=y=null,x=Fe(e,h,r-M,r+_,0,f.minX,f.maxX,l),w=Fe(e,h,r+S,r+P,0,f.minX,f.maxX,l),e=null,x&&(g=Fe(x,h,n-M,n+_,1,f.minY,f.maxY,l),m=Fe(x,h,n+S,n+P,1,f.minY,f.maxY,l),x=null),w&&(v=Fe(w,h,n-M,n+_,1,f.minY,f.maxY,l),y=Fe(w,h,n+S,n+P,1,f.minY,f.maxY,l),w=null),u>1&&console.timeEnd("clipping"),s.push(g||[],t+1,2*r,2*n),s.push(m||[],t+1,2*r,2*n+1),s.push(v||[],t+1,2*r+1,2*n),s.push(y||[],t+1,2*r+1,2*n+1);}}},$e.prototype.getTile=function(e,t,r){var n=this.options,o=n.extent,i=n.debug;if(e<0||e>24)return null;var a=1<<e,s=et(e,t=(t%a+a)%a,r);if(this.tiles[s])return qe(this.tiles[s],o);i>1&&console.log("drilling down to z%d-%d-%d",e,t,r);for(var l,u=e,h=t,c=r;!l&&u>0;)u--,h=Math.floor(h/2),c=Math.floor(c/2),l=this.tiles[et(u,h,c)];return l&&l.source?(i>1&&console.log("found parent tile z%d-%d-%d",u,h,c),i>1&&console.time("drilling down"),this.splitTile(l.source,u,h,c,e,t,r),i>1&&console.timeEnd("drilling down"),this.tiles[s]?qe(this.tiles[s],o):null):null};var rt=function(t){function r(e,r,n){t.call(this,e,r,tt),n&&(this.loadGeoJSON=n);}return t&&(r.__proto__=t),r.prototype=Object.create(t&&t.prototype),r.prototype.constructor=r,r.prototype.loadData=function(e,t){this._pendingCallback&&this._pendingCallback(null,{abandoned:!0}),this._pendingCallback=t,this._pendingLoadDataParams=e,this._state&&"Idle"!==this._state?this._state="NeedsLoadData":(this._state="Coalescing",this._loadData());},r.prototype._loadData=function(){var e=this;if(this._pendingCallback&&this._pendingLoadDataParams){var t=this._pendingCallback,r=this._pendingLoadDataParams;delete this._pendingCallback,delete this._pendingLoadDataParams;var n=!!(r&&r.request&&r.request.collectResourceTiming)&&new A.Performance(r.request);this.loadGeoJSON(r,function(o,i){if(o||!i)return t(o);if("object"!=typeof i)return t(new Error("Input data is not a valid GeoJSON object."));G(i,!0);try{e._geoJSONIndex=r.cluster?new xe(r.superclusterOptions).load(i.features):function(e,t){return new $e(e,t)}(i,r.geojsonVtOptions);}catch(o){return t(o)}e.loaded={};var a={};if(n){var s=n.finish();s&&(a.resourceTiming={},a.resourceTiming[r.source]=JSON.parse(JSON.stringify(s)));}t(null,a);});}},r.prototype.coalesce=function(){"Coalescing"===this._state?this._state="Idle":"NeedsLoadData"===this._state&&(this._state="Coalescing",this._loadData());},r.prototype.reloadTile=function(e,r){var n=this.loaded,o=e.uid;return n&&n[o]?t.prototype.reloadTile.call(this,e,r):this.loadTile(e,r)},r.prototype.loadGeoJSON=function(t,r){if(t.request)e.getJSON(t.request,r);else{if("string"!=typeof t.data)return r(new Error("Input data is not a valid GeoJSON object."));try{return r(null,JSON.parse(t.data))}catch(e){return r(new Error("Input data is not a valid GeoJSON object."))}}},r.prototype.removeSource=function(e,t){this._pendingCallback&&this._pendingCallback(null,{abandoned:!0}),t();},r.prototype.getClusterExpansionZoom=function(e,t){t(null,this._geoJSONIndex.getClusterExpansionZoom(e.clusterId));},r.prototype.getClusterChildren=function(e,t){t(null,this._geoJSONIndex.getChildren(e.clusterId));},r.prototype.getClusterLeaves=function(e,t){t(null,this._geoJSONIndex.getLeaves(e.clusterId,e.limit,e.offset));},r}(O),nt=function(t){var r=this;this.self=t,this.actor=new e.Actor(t,this),this.layerIndexes={},this.workerSourceTypes={vector:O,geojson:rt},this.workerSources={},this.demWorkerSources={},this.self.registerWorkerSource=function(e,t){if(r.workerSourceTypes[e])throw new Error('Worker source with name "'+e+'" already registered.');r.workerSourceTypes[e]=t;},this.self.registerRTLTextPlugin=function(t){if(e.plugin.isLoaded())throw new Error("RTL text plugin already registered.");e.plugin.applyArabicShaping=t.applyArabicShaping,e.plugin.processBidirectionalText=t.processBidirectionalText,e.plugin.processStyledBidirectionalText=t.processStyledBidirectionalText;};};return nt.prototype.setReferrer=function(e,t){this.referrer=t;},nt.prototype.setLayers=function(e,t,r){this.getLayerIndex(e).replace(t),r();},nt.prototype.updateLayers=function(e,t,r){this.getLayerIndex(e).update(t.layers,t.removedIds),r();},nt.prototype.loadTile=function(e,t,r){this.getWorkerSource(e,t.type,t.source).loadTile(t,r);},nt.prototype.loadDEMTile=function(e,t,r){this.getDEMWorkerSource(e,t.source).loadTile(t,r);},nt.prototype.reloadTile=function(e,t,r){this.getWorkerSource(e,t.type,t.source).reloadTile(t,r);},nt.prototype.abortTile=function(e,t,r){this.getWorkerSource(e,t.type,t.source).abortTile(t,r);},nt.prototype.removeTile=function(e,t,r){this.getWorkerSource(e,t.type,t.source).removeTile(t,r);},nt.prototype.removeDEMTile=function(e,t){this.getDEMWorkerSource(e,t.source).removeTile(t);},nt.prototype.removeSource=function(e,t,r){if(this.workerSources[e]&&this.workerSources[e][t.type]&&this.workerSources[e][t.type][t.source]){var n=this.workerSources[e][t.type][t.source];delete this.workerSources[e][t.type][t.source],void 0!==n.removeSource?n.removeSource(t,r):r();}},nt.prototype.loadWorkerSource=function(e,t,r){try{this.self.importScripts(t.url),r();}catch(e){r(e.toString());}},nt.prototype.loadRTLTextPlugin=function(t,r,n){try{e.plugin.isLoaded()||(this.self.importScripts(r),n(e.plugin.isLoaded()?null:new Error("RTL Text Plugin failed to import scripts from "+r)));}catch(e){n(e.toString());}},nt.prototype.getLayerIndex=function(e){var t=this.layerIndexes[e];return t||(t=this.layerIndexes[e]=new n),t},nt.prototype.getWorkerSource=function(e,t,r){var n=this;if(this.workerSources[e]||(this.workerSources[e]={}),this.workerSources[e][t]||(this.workerSources[e][t]={}),!this.workerSources[e][t][r]){var o={send:function(t,r,o){n.actor.send(t,r,o,e);}};this.workerSources[e][t][r]=new this.workerSourceTypes[t](o,this.getLayerIndex(e));}return this.workerSources[e][t][r]},nt.prototype.getDEMWorkerSource=function(e,t){return this.demWorkerSources[e]||(this.demWorkerSources[e]={}),this.demWorkerSources[e][t]||(this.demWorkerSources[e][t]=new N),this.demWorkerSources[e][t]},"undefined"!=typeof WorkerGlobalScope&&"undefined"!=typeof self&&self instanceof WorkerGlobalScope&&(self.worker=new nt(self)),nt});

define(["./shared.js"],function(t){"use strict";var e=t.createCommonjsModule(function(t){function e(t){return !!("undefined"!=typeof window&&"undefined"!=typeof document&&Array.prototype&&Array.prototype.every&&Array.prototype.filter&&Array.prototype.forEach&&Array.prototype.indexOf&&Array.prototype.lastIndexOf&&Array.prototype.map&&Array.prototype.some&&Array.prototype.reduce&&Array.prototype.reduceRight&&Array.isArray&&Function.prototype&&Function.prototype.bind&&Object.keys&&Object.create&&Object.getPrototypeOf&&Object.getOwnPropertyNames&&Object.isSealed&&Object.isFrozen&&Object.isExtensible&&Object.getOwnPropertyDescriptor&&Object.defineProperty&&Object.defineProperties&&Object.seal&&Object.freeze&&Object.preventExtensions&&"JSON"in window&&"parse"in JSON&&"stringify"in JSON&&function(){if(!("Worker"in window&&"Blob"in window&&"URL"in window))return !1;var t,e,i=new Blob([""],{type:"text/javascript"}),o=URL.createObjectURL(i);try{e=new Worker(o),t=!0;}catch(e){t=!1;}e&&e.terminate();return URL.revokeObjectURL(o),t}()&&"Uint8ClampedArray"in window&&ArrayBuffer.isView&&function(t){void 0===i[t]&&(i[t]=function(t){var i=document.createElement("canvas"),o=Object.create(e.webGLContextAttributes);return o.failIfMajorPerformanceCaveat=t,i.probablySupportsContext?i.probablySupportsContext("webgl",o)||i.probablySupportsContext("experimental-webgl",o):i.supportsContext?i.supportsContext("webgl",o)||i.supportsContext("experimental-webgl",o):i.getContext("webgl",o)||i.getContext("experimental-webgl",o)}(t));return i[t]}(t&&t.failIfMajorPerformanceCaveat))}t.exports?t.exports=e:window&&(window.mapboxgl=window.mapboxgl||{},window.mapboxgl.supported=e);var i={};e.webGLContextAttributes={antialias:!1,alpha:!0,stencil:!0,depth:!0};}),i={create:function(e,i,o){var r=t.window.document.createElement(e);return i&&(r.className=i),o&&o.appendChild(r),r},createNS:function(e,i){return t.window.document.createElementNS(e,i)}},o=t.window.document?t.window.document.documentElement.style:null;function r(t){if(!o)return null;for(var e=0;e<t.length;e++)if(t[e]in o)return t[e];return t[0]}var a,n=r(["userSelect","MozUserSelect","WebkitUserSelect","msUserSelect"]);i.disableDrag=function(){o&&n&&(a=o[n],o[n]="none");},i.enableDrag=function(){o&&n&&(o[n]=a);};var s=r(["transform","WebkitTransform"]);i.setTransform=function(t,e){t.style[s]=e;};var l=!1;try{var c=Object.defineProperty({},"passive",{get:function(){l=!0;}});t.window.addEventListener("test",c,c),t.window.removeEventListener("test",c,c);}catch(t){l=!1;}i.addEventListener=function(t,e,i,o){void 0===o&&(o={}),"passive"in o&&l?t.addEventListener(e,i,o):t.addEventListener(e,i,o.capture);},i.removeEventListener=function(t,e,i,o){void 0===o&&(o={}),"passive"in o&&l?t.removeEventListener(e,i,o):t.removeEventListener(e,i,o.capture);};var u=function(e){e.preventDefault(),e.stopPropagation(),t.window.removeEventListener("click",u,!0);};i.suppressClick=function(){t.window.addEventListener("click",u,!0),t.window.setTimeout(function(){t.window.removeEventListener("click",u,!0);},0);},i.mousePos=function(e,i){var o=e.getBoundingClientRect();return i=i.touches?i.touches[0]:i,new t.Point(i.clientX-o.left-e.clientLeft,i.clientY-o.top-e.clientTop)},i.touchPos=function(e,i){for(var o=e.getBoundingClientRect(),r=[],a="touchend"===i.type?i.changedTouches:i.touches,n=0;n<a.length;n++)r.push(new t.Point(a[n].clientX-o.left-e.clientLeft,a[n].clientY-o.top-e.clientTop));return r},i.mouseButton=function(e){return void 0!==t.window.InstallTrigger&&2===e.button&&e.ctrlKey&&t.window.navigator.platform.toUpperCase().indexOf("MAC")>=0?0:e.button},i.remove=function(t){t.parentNode&&t.parentNode.removeChild(t);};var h=function(){this.images={},this.loaded=!1,this.requestors=[],this.patterns={},this.atlasImage=new t.RGBAImage({width:1,height:1}),this.dirty=!0;};h.prototype.isLoaded=function(){return this.loaded},h.prototype.setLoaded=function(t){if(this.loaded!==t&&(this.loaded=t,t)){for(var e=0,i=this.requestors;e<i.length;e+=1){var o=i[e],r=o.ids,a=o.callback;this._notify(r,a);}this.requestors=[];}},h.prototype.getImage=function(t){return this.images[t]},h.prototype.addImage=function(t,e){this.images[t]=e;},h.prototype.removeImage=function(t){delete this.images[t],delete this.patterns[t];},h.prototype.listImages=function(){return Object.keys(this.images)},h.prototype.getImages=function(t,e){var i=!0;if(!this.isLoaded())for(var o=0,r=t;o<r.length;o+=1){var a=r[o];this.images[a]||(i=!1);}this.isLoaded()||i?this._notify(t,e):this.requestors.push({ids:t,callback:e});},h.prototype._notify=function(t,e){for(var i={},o=0,r=t;o<r.length;o+=1){var a=r[o],n=this.images[a];n&&(i[a]={data:n.data.clone(),pixelRatio:n.pixelRatio,sdf:n.sdf});}e(null,i);},h.prototype.getPixelSize=function(){var t=this.atlasImage;return {width:t.width,height:t.height}},h.prototype.getPattern=function(e){var i=this.patterns[e];if(i)return i.position;var o=this.getImage(e);if(!o)return null;var r={w:o.data.width+2,h:o.data.height+2,x:0,y:0},a=new t.ImagePosition(r,o);return this.patterns[e]={bin:r,position:a},this._updatePatternAtlas(),a},h.prototype.bind=function(e){var i=e.gl;this.atlasTexture?this.dirty&&(this.atlasTexture.update(this.atlasImage),this.dirty=!1):this.atlasTexture=new t.Texture(e,this.atlasImage,i.RGBA),this.atlasTexture.bind(i.LINEAR,i.CLAMP_TO_EDGE);},h.prototype._updatePatternAtlas=function(){var e=[];for(var i in this.patterns)e.push(this.patterns[i].bin);var o=t.potpack(e),r=o.w,a=o.h,n=this.atlasImage;for(var s in n.resize({width:r||1,height:a||1}),this.patterns){var l=this.patterns[s].bin,c=l.x+1,u=l.y+1,h=this.images[s].data,p=h.width,d=h.height;t.RGBAImage.copy(h,n,{x:0,y:0},{x:c,y:u},{width:p,height:d}),t.RGBAImage.copy(h,n,{x:0,y:d-1},{x:c,y:u-1},{width:p,height:1}),t.RGBAImage.copy(h,n,{x:0,y:0},{x:c,y:u+d},{width:p,height:1}),t.RGBAImage.copy(h,n,{x:p-1,y:0},{x:c-1,y:u},{width:1,height:d}),t.RGBAImage.copy(h,n,{x:0,y:0},{x:c+p,y:u},{width:1,height:d});}this.dirty=!0;};var p=_,d=1e20;function _(t,e,i,o,r,a){this.fontSize=t||24,this.buffer=void 0===e?3:e,this.cutoff=o||.25,this.fontFamily=r||"sans-serif",this.fontWeight=a||"normal",this.radius=i||8;var n=this.size=this.fontSize+2*this.buffer;this.canvas=document.createElement("canvas"),this.canvas.width=this.canvas.height=n,this.ctx=this.canvas.getContext("2d"),this.ctx.font=this.fontWeight+" "+this.fontSize+"px "+this.fontFamily,this.ctx.textBaseline="middle",this.ctx.fillStyle="black",this.gridOuter=new Float64Array(n*n),this.gridInner=new Float64Array(n*n),this.f=new Float64Array(n),this.d=new Float64Array(n),this.z=new Float64Array(n+1),this.v=new Int16Array(n),this.middle=Math.round(n/2*(navigator.userAgent.indexOf("Gecko/")>=0?1.2:1));}function f(t,e,i,o,r,a,n){for(var s=0;s<e;s++){for(var l=0;l<i;l++)o[l]=t[l*e+s];for(m(o,r,a,n,i),l=0;l<i;l++)t[l*e+s]=r[l];}for(l=0;l<i;l++){for(s=0;s<e;s++)o[s]=t[l*e+s];for(m(o,r,a,n,e),s=0;s<e;s++)t[l*e+s]=Math.sqrt(r[s]);}}function m(t,e,i,o,r){i[0]=0,o[0]=-d,o[1]=+d;for(var a=1,n=0;a<r;a++){for(var s=(t[a]+a*a-(t[i[n]]+i[n]*i[n]))/(2*a-2*i[n]);s<=o[n];)n--,s=(t[a]+a*a-(t[i[n]]+i[n]*i[n]))/(2*a-2*i[n]);i[++n]=a,o[n]=s,o[n+1]=+d;}for(a=0,n=0;a<r;a++){for(;o[n+1]<a;)n++;e[a]=(a-i[n])*(a-i[n])+t[i[n]];}}_.prototype.draw=function(t){this.ctx.clearRect(0,0,this.size,this.size),this.ctx.fillText(t,this.buffer,this.middle);for(var e=this.ctx.getImageData(0,0,this.size,this.size),i=new Uint8ClampedArray(this.size*this.size),o=0;o<this.size*this.size;o++){var r=e.data[4*o+3]/255;this.gridOuter[o]=1===r?0:0===r?d:Math.pow(Math.max(0,.5-r),2),this.gridInner[o]=1===r?d:0===r?0:Math.pow(Math.max(0,r-.5),2);}for(f(this.gridOuter,this.size,this.size,this.f,this.d,this.v,this.z),f(this.gridInner,this.size,this.size,this.f,this.d,this.v,this.z),o=0;o<this.size*this.size;o++){var a=this.gridOuter[o]-this.gridInner[o];i[o]=Math.max(0,Math.min(255,Math.round(255-255*(a/this.radius+this.cutoff))));}return i};var g=function(t,e){this.requestTransform=t,this.localIdeographFontFamily=e,this.entries={};};g.prototype.setURL=function(t){this.url=t;},g.prototype.getGlyphs=function(e,i){var o=this,r=[];for(var a in e)for(var n=0,s=e[a];n<s.length;n+=1){var l=s[n];r.push({stack:a,id:l});}t.asyncAll(r,function(t,e){var i=t.stack,r=t.id,a=o.entries[i];a||(a=o.entries[i]={glyphs:{},requests:{}});var n=a.glyphs[r];if(void 0===n)if(n=o._tinySDF(a,i,r))e(null,{stack:i,id:r,glyph:n});else{var s=Math.floor(r/256);if(256*s>65535)e(new Error("glyphs > 65535 not supported"));else{var l=a.requests[s];l||(l=a.requests[s]=[],g.loadGlyphRange(i,s,o.url,o.requestTransform,function(t,e){if(e)for(var i in e)a.glyphs[+i]=e[+i];for(var o=0,r=l;o<r.length;o+=1){(0,r[o])(t,e);}delete a.requests[s];})),l.push(function(t,o){t?e(t):o&&e(null,{stack:i,id:r,glyph:o[r]||null});});}}else e(null,{stack:i,id:r,glyph:n});},function(t,e){if(t)i(t);else if(e){for(var o={},r=0,a=e;r<a.length;r+=1){var n=a[r],s=n.stack,l=n.id,c=n.glyph;(o[s]||(o[s]={}))[l]=c&&{id:c.id,bitmap:c.bitmap.clone(),metrics:c.metrics};}i(null,o);}});},g.prototype._tinySDF=function(e,i,o){var r=this.localIdeographFontFamily;if(r&&(t.isChar["CJK Unified Ideographs"](o)||t.isChar["Hangul Syllables"](o))){var a=e.tinySDF;if(!a){var n="400";/bold/i.test(i)?n="900":/medium/i.test(i)?n="500":/light/i.test(i)&&(n="200"),a=e.tinySDF=new g.TinySDF(24,3,8,.25,r,n);}return {id:o,bitmap:new t.AlphaImage({width:30,height:30},a.draw(String.fromCharCode(o))),metrics:{width:24,height:24,left:0,top:-8,advance:24}}}},g.loadGlyphRange=function(e,i,o,r,a){var n=256*i,s=n+255,l=r(t.normalizeGlyphsURL(o).replace("{fontstack}",e).replace("{range}",n+"-"+s),t.ResourceType.Glyphs);t.getArrayBuffer(l,function(e,i){if(e)a(e);else if(i){for(var o={},r=0,n=t.parseGlyphPBF(i);r<n.length;r+=1){var s=n[r];o[s.id]=s;}a(null,o);}});},g.TinySDF=p;var v=function(){this.specification=t.styleSpec.light.position;};v.prototype.possiblyEvaluate=function(e,i){return t.sphericalToCartesian(e.expression.evaluate(i))},v.prototype.interpolate=function(e,i,o){return {x:t.number(e.x,i.x,o),y:t.number(e.y,i.y,o),z:t.number(e.z,i.z,o)}};var y=new t.Properties({anchor:new t.DataConstantProperty(t.styleSpec.light.anchor),position:new v,color:new t.DataConstantProperty(t.styleSpec.light.color),intensity:new t.DataConstantProperty(t.styleSpec.light.intensity)}),x=function(e){function i(i){e.call(this),this._transitionable=new t.Transitionable(y),this.setLight(i),this._transitioning=this._transitionable.untransitioned();}return e&&(i.__proto__=e),i.prototype=Object.create(e&&e.prototype),i.prototype.constructor=i,i.prototype.getLight=function(){return this._transitionable.serialize()},i.prototype.setLight=function(e,i){if(void 0===i&&(i={}),!this._validate(t.validateLight,e,i))for(var o in e){var r=e[o];t.endsWith(o,"-transition")?this._transitionable.setTransition(o.slice(0,-"-transition".length),r):this._transitionable.setValue(o,r);}},i.prototype.updateTransitions=function(t){this._transitioning=this._transitionable.transitioned(t,this._transitioning);},i.prototype.hasTransition=function(){return this._transitioning.hasTransition()},i.prototype.recalculate=function(t){this.properties=this._transitioning.possiblyEvaluate(t);},i.prototype._validate=function(e,i,o){return (!o||!1!==o.validate)&&t.emitValidationErrors(this,e.call(t.validateStyle,t.extend({value:i,style:{glyphs:!0,sprite:!0},styleSpec:t.styleSpec})))},i}(t.Evented),b=function(t,e){this.width=t,this.height=e,this.nextRow=0,this.bytes=4,this.data=new Uint8Array(this.width*this.height*this.bytes),this.positions={};};b.prototype.getDash=function(t,e){var i=t.join(",")+String(e);return this.positions[i]||(this.positions[i]=this.addDash(t,e)),this.positions[i]},b.prototype.addDash=function(e,i){var o=i?7:0,r=2*o+1;if(this.nextRow+r>this.height)return t.warnOnce("LineAtlas out of space"),null;for(var a=0,n=0;n<e.length;n++)a+=e[n];for(var s=this.width/a,l=s/2,c=e.length%2==1,u=-o;u<=o;u++)for(var h=this.nextRow+o+u,p=this.width*h,d=c?-e[e.length-1]:0,_=e[0],f=1,m=0;m<this.width;m++){for(;_<m/s;)d=_,_+=e[f],c&&f===e.length-1&&(_+=e[0]),f++;var g=Math.abs(m-d*s),v=Math.abs(m-_*s),y=Math.min(g,v),x=f%2==1,b=void 0;if(i){var w=o?u/o*(l+1):0;if(x){var E=l-Math.abs(w);b=Math.sqrt(y*y+E*E);}else b=l-Math.sqrt(y*y+w*w);}else b=(x?1:-1)*y;this.data[3+4*(p+m)]=Math.max(0,Math.min(255,b+128));}var T={y:(this.nextRow+o+.5)/this.height,height:2*o/this.height,width:a};return this.nextRow+=r,this.dirty=!0,T},b.prototype.bind=function(t){var e=t.gl;this.texture?(e.bindTexture(e.TEXTURE_2D,this.texture),this.dirty&&(this.dirty=!1,e.texSubImage2D(e.TEXTURE_2D,0,0,0,this.width,this.height,e.RGBA,e.UNSIGNED_BYTE,this.data))):(this.texture=e.createTexture(),e.bindTexture(e.TEXTURE_2D,this.texture),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.REPEAT),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.REPEAT),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,this.width,this.height,0,e.RGBA,e.UNSIGNED_BYTE,this.data));};var w=function e(i,o){this.workerPool=i,this.actors=[],this.currentActor=0,this.id=t.uniqueId();for(var r=this.workerPool.acquire(this.id),a=0;a<r.length;a++){var n=r[a],s=new e.Actor(n,o,this.id);s.name="Worker "+a,this.actors.push(s);}};function E(e,i,o){var r=function(i,r){if(i)return o(i);if(r){var a=t.pick(r,["tiles","minzoom","maxzoom","attribution","mapbox_logo","bounds"]);r.vector_layers&&(a.vectorLayers=r.vector_layers,a.vectorLayerIds=a.vectorLayers.map(function(t){return t.id})),e.url&&(a.tiles=t.canonicalizeTileset(a,e.url)),o(null,a);}};return e.url?t.getJSON(i(t.normalizeSourceURL(e.url),t.ResourceType.Source),r):t.browser.frame(function(){return r(null,e)})}w.prototype.broadcast=function(e,i,o){o=o||function(){},t.asyncAll(this.actors,function(t,o){t.send(e,i,o);},o);},w.prototype.send=function(t,e,i,o){return ("number"!=typeof o||isNaN(o))&&(o=this.currentActor=(this.currentActor+1)%this.actors.length),this.actors[o].send(t,e,i),o},w.prototype.remove=function(){this.actors.forEach(function(t){t.remove();}),this.actors=[],this.workerPool.release(this.id);},w.Actor=t.Actor;var T=function(e,i,o){this.bounds=t.LngLatBounds.convert(this.validateBounds(e)),this.minzoom=i||0,this.maxzoom=o||24;};T.prototype.validateBounds=function(t){return Array.isArray(t)&&4===t.length?[Math.max(-180,t[0]),Math.max(-90,t[1]),Math.min(180,t[2]),Math.min(90,t[3])]:[-180,-90,180,90]},T.prototype.contains=function(e){var i=Math.pow(2,e.z),o=Math.floor(t.mercatorXfromLng(this.bounds.getWest())*i),r=Math.floor(t.mercatorYfromLat(this.bounds.getNorth())*i),a=Math.ceil(t.mercatorXfromLng(this.bounds.getEast())*i),n=Math.ceil(t.mercatorYfromLat(this.bounds.getSouth())*i);return e.x>=o&&e.x<a&&e.y>=r&&e.y<n};var I=function(e){function i(i,o,r,a){if(e.call(this),this.id=i,this.dispatcher=r,this.type="vector",this.minzoom=0,this.maxzoom=22,this.scheme="xyz",this.tileSize=512,this.reparseOverscaled=!0,this.isTileClipped=!0,t.extend(this,t.pick(o,["url","scheme","tileSize"])),this._options=t.extend({type:"vector"},o),this._collectResourceTiming=o.collectResourceTiming,512!==this.tileSize)throw new Error("vector tile sources must have a tileSize of 512");this.setEventedParent(a);}return e&&(i.__proto__=e),i.prototype=Object.create(e&&e.prototype),i.prototype.constructor=i,i.prototype.load=function(){var e=this;this.fire(new t.Event("dataloading",{dataType:"source"})),this._tileJSONRequest=E(this._options,this.map._transformRequest,function(i,o){e._tileJSONRequest=null,i?e.fire(new t.ErrorEvent(i)):o&&(t.extend(e,o),o.bounds&&(e.tileBounds=new T(o.bounds,e.minzoom,e.maxzoom)),t.postTurnstileEvent(o.tiles),t.postMapLoadEvent(o.tiles,e.map._getMapId()),e.fire(new t.Event("data",{dataType:"source",sourceDataType:"metadata"})),e.fire(new t.Event("data",{dataType:"source",sourceDataType:"content"})));});},i.prototype.hasTile=function(t){return !this.tileBounds||this.tileBounds.contains(t.canonical)},i.prototype.onAdd=function(t){this.map=t,this.load();},i.prototype.onRemove=function(){this._tileJSONRequest&&(this._tileJSONRequest.cancel(),this._tileJSONRequest=null);},i.prototype.serialize=function(){return t.extend({},this._options)},i.prototype.loadTile=function(e,i){var o=t.normalizeTileURL(e.tileID.canonical.url(this.tiles,this.scheme),this.url),r={request:this.map._transformRequest(o,t.ResourceType.Tile),uid:e.uid,tileID:e.tileID,zoom:e.tileID.overscaledZ,tileSize:this.tileSize*e.tileID.overscaleFactor(),type:this.type,source:this.id,pixelRatio:t.browser.devicePixelRatio,showCollisionBoxes:this.map.showCollisionBoxes};function a(t,o){return e.aborted?i(null):t&&404!==t.status?i(t):(o&&o.resourceTiming&&(e.resourceTiming=o.resourceTiming),this.map._refreshExpiredTiles&&o&&e.setExpiryData(o),e.loadVectorData(o,this.map.painter),i(null),void(e.reloadCallback&&(this.loadTile(e,e.reloadCallback),e.reloadCallback=null)))}r.request.collectResourceTiming=this._collectResourceTiming,void 0===e.workerID||"expired"===e.state?e.workerID=this.dispatcher.send("loadTile",r,a.bind(this)):"loading"===e.state?e.reloadCallback=i:this.dispatcher.send("reloadTile",r,a.bind(this),e.workerID);},i.prototype.abortTile=function(t){this.dispatcher.send("abortTile",{uid:t.uid,type:this.type,source:this.id},void 0,t.workerID);},i.prototype.unloadTile=function(t){t.unloadVectorData(),this.dispatcher.send("removeTile",{uid:t.uid,type:this.type,source:this.id},void 0,t.workerID);},i.prototype.hasTransition=function(){return !1},i}(t.Evented),C=function(e){function i(i,o,r,a){e.call(this),this.id=i,this.dispatcher=r,this.setEventedParent(a),this.type="raster",this.minzoom=0,this.maxzoom=22,this.roundZoom=!0,this.scheme="xyz",this.tileSize=512,this._loaded=!1,this._options=t.extend({},o),t.extend(this,t.pick(o,["url","scheme","tileSize"]));}return e&&(i.__proto__=e),i.prototype=Object.create(e&&e.prototype),i.prototype.constructor=i,i.prototype.load=function(){var e=this;this.fire(new t.Event("dataloading",{dataType:"source"})),this._tileJSONRequest=E(this._options,this.map._transformRequest,function(i,o){e._tileJSONRequest=null,i?e.fire(new t.ErrorEvent(i)):o&&(t.extend(e,o),o.bounds&&(e.tileBounds=new T(o.bounds,e.minzoom,e.maxzoom)),t.postTurnstileEvent(o.tiles),t.postMapLoadEvent(o.tiles,e.map._getMapId()),e.fire(new t.Event("data",{dataType:"source",sourceDataType:"metadata"})),e.fire(new t.Event("data",{dataType:"source",sourceDataType:"content"})));});},i.prototype.onAdd=function(t){this.map=t,this.load();},i.prototype.onRemove=function(){this._tileJSONRequest&&(this._tileJSONRequest.cancel(),this._tileJSONRequest=null);},i.prototype.serialize=function(){return t.extend({},this._options)},i.prototype.hasTile=function(t){return !this.tileBounds||this.tileBounds.contains(t.canonical)},i.prototype.loadTile=function(e,i){var o=this,r=t.normalizeTileURL(e.tileID.canonical.url(this.tiles,this.scheme),this.url,this.tileSize);e.request=t.getImage(this.map._transformRequest(r,t.ResourceType.Tile),function(r,a){if(delete e.request,e.aborted)e.state="unloaded",i(null);else if(r)e.state="errored",i(r);else if(a){o.map._refreshExpiredTiles&&e.setExpiryData(a),delete a.cacheControl,delete a.expires;var n=o.map.painter.context,s=n.gl;e.texture=o.map.painter.getTileTexture(a.width),e.texture?e.texture.update(a,{useMipmap:!0}):(e.texture=new t.Texture(n,a,s.RGBA,{useMipmap:!0}),e.texture.bind(s.LINEAR,s.CLAMP_TO_EDGE,s.LINEAR_MIPMAP_NEAREST),n.extTextureFilterAnisotropic&&s.texParameterf(s.TEXTURE_2D,n.extTextureFilterAnisotropic.TEXTURE_MAX_ANISOTROPY_EXT,n.extTextureFilterAnisotropicMax)),e.state="loaded",i(null);}});},i.prototype.abortTile=function(t,e){t.request&&(t.request.cancel(),delete t.request),e();},i.prototype.unloadTile=function(t,e){t.texture&&this.map.painter.saveTileTexture(t.texture),e();},i.prototype.hasTransition=function(){return !1},i}(t.Evented),S=function(e){function i(i,o,r,a){e.call(this,i,o,r,a),this.type="raster-dem",this.maxzoom=22,this._options=t.extend({},o),this.encoding=o.encoding||"mapbox";}return e&&(i.__proto__=e),i.prototype=Object.create(e&&e.prototype),i.prototype.constructor=i,i.prototype.serialize=function(){return {type:"raster-dem",url:this.url,tileSize:this.tileSize,tiles:this.tiles,bounds:this.bounds,encoding:this.encoding}},i.prototype.loadTile=function(e,i){var o=t.normalizeTileURL(e.tileID.canonical.url(this.tiles,this.scheme),this.url,this.tileSize);e.request=t.getImage(this.map._transformRequest(o,t.ResourceType.Tile),function(o,r){if(delete e.request,e.aborted)e.state="unloaded",i(null);else if(o)e.state="errored",i(o);else if(r){this.map._refreshExpiredTiles&&e.setExpiryData(r),delete r.cacheControl,delete r.expires;var a=t.browser.getImageData(r),n={uid:e.uid,coord:e.tileID,source:this.id,rawImageData:a,encoding:this.encoding};e.workerID&&"expired"!==e.state||(e.workerID=this.dispatcher.send("loadDEMTile",n,function(t,o){t&&(e.state="errored",i(t));o&&(e.dem=o,e.needsHillshadePrepare=!0,e.state="loaded",i(null));}.bind(this)));}}.bind(this)),e.neighboringTiles=this._getNeighboringTiles(e.tileID);},i.prototype._getNeighboringTiles=function(e){var i=e.canonical,o=Math.pow(2,i.z),r=(i.x-1+o)%o,a=0===i.x?e.wrap-1:e.wrap,n=(i.x+1+o)%o,s=i.x+1===o?e.wrap+1:e.wrap,l={};return l[new t.OverscaledTileID(e.overscaledZ,a,i.z,r,i.y).key]={backfilled:!1},l[new t.OverscaledTileID(e.overscaledZ,s,i.z,n,i.y).key]={backfilled:!1},i.y>0&&(l[new t.OverscaledTileID(e.overscaledZ,a,i.z,r,i.y-1).key]={backfilled:!1},l[new t.OverscaledTileID(e.overscaledZ,e.wrap,i.z,i.x,i.y-1).key]={backfilled:!1},l[new t.OverscaledTileID(e.overscaledZ,s,i.z,n,i.y-1).key]={backfilled:!1}),i.y+1<o&&(l[new t.OverscaledTileID(e.overscaledZ,a,i.z,r,i.y+1).key]={backfilled:!1},l[new t.OverscaledTileID(e.overscaledZ,e.wrap,i.z,i.x,i.y+1).key]={backfilled:!1},l[new t.OverscaledTileID(e.overscaledZ,s,i.z,n,i.y+1).key]={backfilled:!1}),l},i.prototype.unloadTile=function(t){t.demTexture&&this.map.painter.saveTileTexture(t.demTexture),t.fbo&&(t.fbo.destroy(),delete t.fbo),t.dem&&delete t.dem,delete t.neighboringTiles,t.state="unloaded",this.dispatcher.send("removeDEMTile",{uid:t.uid,source:this.id},void 0,t.workerID);},i}(C),z=function(e){function i(i,o,r,a){e.call(this),this.id=i,this.type="geojson",this.minzoom=0,this.maxzoom=18,this.tileSize=512,this.isTileClipped=!0,this.reparseOverscaled=!0,this._removed=!1,this.dispatcher=r,this.setEventedParent(a),this._data=o.data,this._options=t.extend({},o),this._collectResourceTiming=o.collectResourceTiming,this._resourceTiming=[],void 0!==o.maxzoom&&(this.maxzoom=o.maxzoom),o.type&&(this.type=o.type),o.attribution&&(this.attribution=o.attribution);var n=t.EXTENT/this.tileSize;this.workerOptions=t.extend({source:this.id,cluster:o.cluster||!1,geojsonVtOptions:{buffer:(void 0!==o.buffer?o.buffer:128)*n,tolerance:(void 0!==o.tolerance?o.tolerance:.375)*n,extent:t.EXTENT,maxZoom:this.maxzoom,lineMetrics:o.lineMetrics||!1,generateId:o.generateId||!1},superclusterOptions:{maxZoom:void 0!==o.clusterMaxZoom?Math.min(o.clusterMaxZoom,this.maxzoom-1):this.maxzoom-1,extent:t.EXTENT,radius:(o.clusterRadius||50)*n,log:!1}},o.workerOptions);}return e&&(i.__proto__=e),i.prototype=Object.create(e&&e.prototype),i.prototype.constructor=i,i.prototype.load=function(){var e=this;this.fire(new t.Event("dataloading",{dataType:"source"})),this._updateWorkerData(function(i){if(i)e.fire(new t.ErrorEvent(i));else{var o={dataType:"source",sourceDataType:"metadata"};e._collectResourceTiming&&e._resourceTiming&&e._resourceTiming.length>0&&(o.resourceTiming=e._resourceTiming,e._resourceTiming=[]),e.fire(new t.Event("data",o));}});},i.prototype.onAdd=function(t){this.map=t,this.load();},i.prototype.setData=function(e){var i=this;return this._data=e,this.fire(new t.Event("dataloading",{dataType:"source"})),this._updateWorkerData(function(e){if(e)i.fire(new t.ErrorEvent(e));else{var o={dataType:"source",sourceDataType:"content"};i._collectResourceTiming&&i._resourceTiming&&i._resourceTiming.length>0&&(o.resourceTiming=i._resourceTiming,i._resourceTiming=[]),i.fire(new t.Event("data",o));}}),this},i.prototype.getClusterExpansionZoom=function(t,e){return this.dispatcher.send("geojson.getClusterExpansionZoom",{clusterId:t,source:this.id},e,this.workerID),this},i.prototype.getClusterChildren=function(t,e){return this.dispatcher.send("geojson.getClusterChildren",{clusterId:t,source:this.id},e,this.workerID),this},i.prototype.getClusterLeaves=function(t,e,i,o){return this.dispatcher.send("geojson.getClusterLeaves",{source:this.id,clusterId:t,limit:e,offset:i},o,this.workerID),this},i.prototype._updateWorkerData=function(e){var i=this,o=t.extend({},this.workerOptions),r=this._data;"string"==typeof r?(o.request=this.map._transformRequest(t.browser.resolveURL(r),t.ResourceType.Source),o.request.collectResourceTiming=this._collectResourceTiming):o.data=JSON.stringify(r),this.workerID=this.dispatcher.send(this.type+".loadData",o,function(t,r){i._removed||r&&r.abandoned||(i._loaded=!0,r&&r.resourceTiming&&r.resourceTiming[i.id]&&(i._resourceTiming=r.resourceTiming[i.id].slice(0)),i.dispatcher.send(i.type+".coalesce",{source:o.source},null,i.workerID),e(t));},this.workerID);},i.prototype.loadTile=function(e,i){var o=this,r=void 0===e.workerID?"loadTile":"reloadTile",a={type:this.type,uid:e.uid,tileID:e.tileID,zoom:e.tileID.overscaledZ,maxZoom:this.maxzoom,tileSize:this.tileSize,source:this.id,pixelRatio:t.browser.devicePixelRatio,showCollisionBoxes:this.map.showCollisionBoxes};e.workerID=this.dispatcher.send(r,a,function(t,a){return e.unloadVectorData(),e.aborted?i(null):t?i(t):(e.loadVectorData(a,o.map.painter,"reloadTile"===r),i(null))},this.workerID);},i.prototype.abortTile=function(t){t.aborted=!0;},i.prototype.unloadTile=function(t){t.unloadVectorData(),this.dispatcher.send("removeTile",{uid:t.uid,type:this.type,source:this.id},null,t.workerID);},i.prototype.onRemove=function(){this._removed=!0,this.dispatcher.send("removeSource",{type:this.type,source:this.id},null,this.workerID);},i.prototype.serialize=function(){return t.extend({},this._options,{type:this.type,data:this._data})},i.prototype.hasTransition=function(){return !1},i}(t.Evented),L=function(e){function i(t,i,o,r){e.call(this),this.id=t,this.dispatcher=o,this.coordinates=i.coordinates,this.type="image",this.minzoom=0,this.maxzoom=22,this.tileSize=512,this.tiles={},this.setEventedParent(r),this.options=i;}return e&&(i.__proto__=e),i.prototype=Object.create(e&&e.prototype),i.prototype.constructor=i,i.prototype.load=function(e,i){var o=this;this.fire(new t.Event("dataloading",{dataType:"source"})),this.url=this.options.url,t.getImage(this.map._transformRequest(this.url,t.ResourceType.Image),function(r,a){r?o.fire(new t.ErrorEvent(r)):a&&(o.image=a,e&&(o.coordinates=e),i&&i(),o._finishLoading());});},i.prototype.updateImage=function(t){var e=this;return this.image&&t.url?(this.options.url=t.url,this.load(t.coordinates,function(){e.texture=null;}),this):this},i.prototype._finishLoading=function(){this.map&&(this.setCoordinates(this.coordinates),this.fire(new t.Event("data",{dataType:"source",sourceDataType:"metadata"})));},i.prototype.onAdd=function(t){this.map=t,this.load();},i.prototype.setCoordinates=function(e){var i=this;this.coordinates=e;var o=e.map(t.MercatorCoordinate.fromLngLat);this.tileID=function(e){for(var i=1/0,o=1/0,r=-1/0,a=-1/0,n=0,s=e;n<s.length;n+=1){var l=s[n];i=Math.min(i,l.x),o=Math.min(o,l.y),r=Math.max(r,l.x),a=Math.max(a,l.y);}var c=r-i,u=a-o,h=Math.max(c,u),p=Math.max(0,Math.floor(-Math.log(h)/Math.LN2)),d=Math.pow(2,p);return new t.CanonicalTileID(p,Math.floor((i+r)/2*d),Math.floor((o+a)/2*d))}(o),this.minzoom=this.maxzoom=this.tileID.z;var r=o.map(function(t){return i.tileID.getTilePoint(t)._round()});return this._boundsArray=new t.StructArrayLayout4i8,this._boundsArray.emplaceBack(r[0].x,r[0].y,0,0),this._boundsArray.emplaceBack(r[1].x,r[1].y,t.EXTENT,0),this._boundsArray.emplaceBack(r[3].x,r[3].y,0,t.EXTENT),this._boundsArray.emplaceBack(r[2].x,r[2].y,t.EXTENT,t.EXTENT),this.boundsBuffer&&(this.boundsBuffer.destroy(),delete this.boundsBuffer),this.fire(new t.Event("data",{dataType:"source",sourceDataType:"content"})),this},i.prototype.prepare=function(){if(0!==Object.keys(this.tiles).length&&this.image){var e=this.map.painter.context,i=e.gl;for(var o in this.boundsBuffer||(this.boundsBuffer=e.createVertexBuffer(this._boundsArray,t.rasterBoundsAttributes.members)),this.boundsSegments||(this.boundsSegments=t.SegmentVector.simpleSegment(0,0,4,2)),this.texture||(this.texture=new t.Texture(e,this.image,i.RGBA),this.texture.bind(i.LINEAR,i.CLAMP_TO_EDGE)),this.tiles){var r=this.tiles[o];"loaded"!==r.state&&(r.state="loaded",r.texture=this.texture);}}},i.prototype.loadTile=function(t,e){this.tileID&&this.tileID.equals(t.tileID.canonical)?(this.tiles[String(t.tileID.wrap)]=t,t.buckets={},e(null)):(t.state="errored",e(null));},i.prototype.serialize=function(){return {type:"image",url:this.options.url,coordinates:this.coordinates}},i.prototype.hasTransition=function(){return !1},i}(t.Evented);var P=function(e){function i(t,i,o,r){e.call(this,t,i,o,r),this.roundZoom=!0,this.type="video",this.options=i;}return e&&(i.__proto__=e),i.prototype=Object.create(e&&e.prototype),i.prototype.constructor=i,i.prototype.load=function(){var e=this,i=this.options;this.urls=[];for(var o=0,r=i.urls;o<r.length;o+=1){var a=r[o];e.urls.push(e.map._transformRequest(a,t.ResourceType.Source).url);}t.getVideo(this.urls,function(i,o){i?e.fire(new t.ErrorEvent(i)):o&&(e.video=o,e.video.loop=!0,e.video.addEventListener("playing",function(){e.map.triggerRepaint();}),e.map&&e.video.play(),e._finishLoading());});},i.prototype.getVideo=function(){return this.video},i.prototype.onAdd=function(t){this.map||(this.map=t,this.load(),this.video&&(this.video.play(),this.setCoordinates(this.coordinates)));},i.prototype.prepare=function(){if(!(0===Object.keys(this.tiles).length||this.video.readyState<2)){var e=this.map.painter.context,i=e.gl;for(var o in this.boundsBuffer||(this.boundsBuffer=e.createVertexBuffer(this._boundsArray,t.rasterBoundsAttributes.members)),this.boundsSegments||(this.boundsSegments=t.SegmentVector.simpleSegment(0,0,4,2)),this.texture?this.video.paused||(this.texture.bind(i.LINEAR,i.CLAMP_TO_EDGE),i.texSubImage2D(i.TEXTURE_2D,0,0,0,i.RGBA,i.UNSIGNED_BYTE,this.video)):(this.texture=new t.Texture(e,this.video,i.RGBA),this.texture.bind(i.LINEAR,i.CLAMP_TO_EDGE)),this.tiles){var r=this.tiles[o];"loaded"!==r.state&&(r.state="loaded",r.texture=this.texture);}}},i.prototype.serialize=function(){return {type:"video",urls:this.urls,coordinates:this.coordinates}},i.prototype.hasTransition=function(){return this.video&&!this.video.paused},i}(L),D=function(e){function i(i,o,r,a){e.call(this,i,o,r,a),o.coordinates?Array.isArray(o.coordinates)&&4===o.coordinates.length&&!o.coordinates.some(function(t){return !Array.isArray(t)||2!==t.length||t.some(function(t){return "number"!=typeof t})})||this.fire(new t.ErrorEvent(new t.ValidationError("sources."+i,null,'"coordinates" property must be an array of 4 longitude/latitude array pairs'))):this.fire(new t.ErrorEvent(new t.ValidationError("sources."+i,null,'missing required property "coordinates"'))),o.animate&&"boolean"!=typeof o.animate&&this.fire(new t.ErrorEvent(new t.ValidationError("sources."+i,null,'optional "animate" property must be a boolean value'))),o.canvas?"string"==typeof o.canvas||o.canvas instanceof t.window.HTMLCanvasElement||this.fire(new t.ErrorEvent(new t.ValidationError("sources."+i,null,'"canvas" must be either a string representing the ID of the canvas element from which to read, or an HTMLCanvasElement instance'))):this.fire(new t.ErrorEvent(new t.ValidationError("sources."+i,null,'missing required property "canvas"'))),this.options=o,this.animate=void 0===o.animate||o.animate;}return e&&(i.__proto__=e),i.prototype=Object.create(e&&e.prototype),i.prototype.constructor=i,i.prototype.load=function(){this.canvas||(this.canvas=this.options.canvas instanceof t.window.HTMLCanvasElement?this.options.canvas:t.window.document.getElementById(this.options.canvas)),this.width=this.canvas.width,this.height=this.canvas.height,this._hasInvalidDimensions()?this.fire(new t.ErrorEvent(new Error("Canvas dimensions cannot be less than or equal to zero."))):(this.play=function(){this._playing=!0,this.map.triggerRepaint();},this.pause=function(){this._playing=!1;},this._finishLoading());},i.prototype.getCanvas=function(){return this.canvas},i.prototype.onAdd=function(t){this.map=t,this.load(),this.canvas&&this.animate&&this.play();},i.prototype.onRemove=function(){this.pause();},i.prototype.prepare=function(){var e=!1;if(this.canvas.width!==this.width&&(this.width=this.canvas.width,e=!0),this.canvas.height!==this.height&&(this.height=this.canvas.height,e=!0),!this._hasInvalidDimensions()&&0!==Object.keys(this.tiles).length){var i=this.map.painter.context,o=i.gl;for(var r in this.boundsBuffer||(this.boundsBuffer=i.createVertexBuffer(this._boundsArray,t.rasterBoundsAttributes.members)),this.boundsSegments||(this.boundsSegments=t.SegmentVector.simpleSegment(0,0,4,2)),this.texture?(e||this._playing)&&this.texture.update(this.canvas,{premultiply:!0}):this.texture=new t.Texture(i,this.canvas,o.RGBA,{premultiply:!0}),this.tiles){var a=this.tiles[r];"loaded"!==a.state&&(a.state="loaded",a.texture=this.texture);}}},i.prototype.serialize=function(){return {type:"canvas",coordinates:this.coordinates}},i.prototype.hasTransition=function(){return this._playing},i.prototype._hasInvalidDimensions=function(){for(var t=0,e=[this.canvas.width,this.canvas.height];t<e.length;t+=1){var i=e[t];if(isNaN(i)||i<=0)return !0}return !1},i}(L),R={vector:I,raster:C,"raster-dem":S,geojson:z,video:P,image:L,canvas:D},M=function(e,i,o,r){var a=new R[i.type](e,i,o,r);if(a.id!==e)throw new Error("Expected Source id to be "+e+" instead of "+a.id);return t.bindAll(["load","abort","unload","serialize","prepare"],a),a};function A(t,e,i,o,r){var a=r.maxPitchScaleFactor(),n=t.tilesIn(i,a);n.sort(k);for(var s=[],l=0,c=n;l<c.length;l+=1){var u=c[l];s.push({wrappedTileID:u.tileID.wrapped().key,queryResults:u.tile.queryRenderedFeatures(e,t._state,u.queryGeometry,u.scale,o,r,a,t.transform.calculatePosMatrix(u.tileID.toUnwrapped()))});}var h=function(t){for(var e={},i={},o=0,r=t;o<r.length;o+=1){var a=r[o],n=a.queryResults,s=a.wrappedTileID,l=i[s]=i[s]||{};for(var c in n)for(var u=n[c],h=l[c]=l[c]||{},p=e[c]=e[c]||[],d=0,_=u;d<_.length;d+=1){var f=_[d];h[f.featureIndex]||(h[f.featureIndex]=!0,p.push(f.feature));}}return e}(s);for(var p in h)h[p].forEach(function(e){var i=t.getFeatureState(e.layer["source-layer"],e.id);e.source=e.layer.source,e.layer["source-layer"]&&(e.sourceLayer=e.layer["source-layer"]),e.state=i;});return h}function k(t,e){var i=t.tileID,o=e.tileID;return i.overscaledZ-o.overscaledZ||i.canonical.y-o.canonical.y||i.wrap-o.wrap||i.canonical.x-o.canonical.x}var B=function(t,e){this.max=t,this.onRemove=e,this.reset();};B.prototype.reset=function(){for(var t in this.data)for(var e=0,i=this.data[t];e<i.length;e+=1){var o=i[e];o.timeout&&clearTimeout(o.timeout),this.onRemove(o.value);}return this.data={},this.order=[],this},B.prototype.add=function(t,e,i){var o=this,r=t.wrapped().key;void 0===this.data[r]&&(this.data[r]=[]);var a={value:e,timeout:void 0};if(void 0!==i&&(a.timeout=setTimeout(function(){o.remove(t,a);},i)),this.data[r].push(a),this.order.push(r),this.order.length>this.max){var n=this._getAndRemoveByKey(this.order[0]);n&&this.onRemove(n);}return this},B.prototype.has=function(t){return t.wrapped().key in this.data},B.prototype.getAndRemove=function(t){return this.has(t)?this._getAndRemoveByKey(t.wrapped().key):null},B.prototype._getAndRemoveByKey=function(t){var e=this.data[t].shift();return e.timeout&&clearTimeout(e.timeout),0===this.data[t].length&&delete this.data[t],this.order.splice(this.order.indexOf(t),1),e.value},B.prototype.get=function(t){return this.has(t)?this.data[t.wrapped().key][0].value:null},B.prototype.remove=function(t,e){if(!this.has(t))return this;var i=t.wrapped().key,o=void 0===e?0:this.data[i].indexOf(e),r=this.data[i][o];return this.data[i].splice(o,1),r.timeout&&clearTimeout(r.timeout),0===this.data[i].length&&delete this.data[i],this.onRemove(r.value),this.order.splice(this.order.indexOf(i),1),this},B.prototype.setMaxSize=function(t){for(this.max=t;this.order.length>this.max;){var e=this._getAndRemoveByKey(this.order[0]);e&&this.onRemove(e);}return this};var O=function(t,e,i){this.context=t;var o=t.gl;this.buffer=o.createBuffer(),this.dynamicDraw=Boolean(i),this.context.unbindVAO(),t.bindElementBuffer.set(this.buffer),o.bufferData(o.ELEMENT_ARRAY_BUFFER,e.arrayBuffer,this.dynamicDraw?o.DYNAMIC_DRAW:o.STATIC_DRAW),this.dynamicDraw||delete e.arrayBuffer;};O.prototype.bind=function(){this.context.bindElementBuffer.set(this.buffer);},O.prototype.updateData=function(t){var e=this.context.gl;this.context.unbindVAO(),this.bind(),e.bufferSubData(e.ELEMENT_ARRAY_BUFFER,0,t.arrayBuffer);},O.prototype.destroy=function(){var t=this.context.gl;this.buffer&&(t.deleteBuffer(this.buffer),delete this.buffer);};var F={Int8:"BYTE",Uint8:"UNSIGNED_BYTE",Int16:"SHORT",Uint16:"UNSIGNED_SHORT",Int32:"INT",Uint32:"UNSIGNED_INT",Float32:"FLOAT"},U=function(t,e,i,o){this.length=e.length,this.attributes=i,this.itemSize=e.bytesPerElement,this.dynamicDraw=o,this.context=t;var r=t.gl;this.buffer=r.createBuffer(),t.bindVertexBuffer.set(this.buffer),r.bufferData(r.ARRAY_BUFFER,e.arrayBuffer,this.dynamicDraw?r.DYNAMIC_DRAW:r.STATIC_DRAW),this.dynamicDraw||delete e.arrayBuffer;};U.prototype.bind=function(){this.context.bindVertexBuffer.set(this.buffer);},U.prototype.updateData=function(t){var e=this.context.gl;this.bind(),e.bufferSubData(e.ARRAY_BUFFER,0,t.arrayBuffer);},U.prototype.enableAttributes=function(t,e){for(var i=0;i<this.attributes.length;i++){var o=this.attributes[i],r=e.attributes[o.name];void 0!==r&&t.enableVertexAttribArray(r);}},U.prototype.setVertexAttribPointers=function(t,e,i){for(var o=0;o<this.attributes.length;o++){var r=this.attributes[o],a=e.attributes[r.name];void 0!==a&&t.vertexAttribPointer(a,r.components,t[F[r.type]],!1,this.itemSize,r.offset+this.itemSize*(i||0));}},U.prototype.destroy=function(){var t=this.context.gl;this.buffer&&(t.deleteBuffer(this.buffer),delete this.buffer);};var N=function(t){this.gl=t.gl,this.default=this.getDefault(),this.current=this.default,this.dirty=!1;};N.prototype.get=function(){return this.current},N.prototype.set=function(t){},N.prototype.getDefault=function(){return this.default},N.prototype.setDefault=function(){this.set(this.default);};var Z=function(e){function i(){e.apply(this,arguments);}return e&&(i.__proto__=e),i.prototype=Object.create(e&&e.prototype),i.prototype.constructor=i,i.prototype.getDefault=function(){return t.Color.transparent},i.prototype.set=function(t){var e=this.current;(t.r!==e.r||t.g!==e.g||t.b!==e.b||t.a!==e.a||this.dirty)&&(this.gl.clearColor(t.r,t.g,t.b,t.a),this.current=t,this.dirty=!1);},i}(N),j=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.getDefault=function(){return 1},e.prototype.set=function(t){(t!==this.current||this.dirty)&&(this.gl.clearDepth(t),this.current=t,this.dirty=!1);},e}(N),V=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.getDefault=function(){return 0},e.prototype.set=function(t){(t!==this.current||this.dirty)&&(this.gl.clearStencil(t),this.current=t,this.dirty=!1);},e}(N),q=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.getDefault=function(){return [!0,!0,!0,!0]},e.prototype.set=function(t){var e=this.current;(t[0]!==e[0]||t[1]!==e[1]||t[2]!==e[2]||t[3]!==e[3]||this.dirty)&&(this.gl.colorMask(t[0],t[1],t[2],t[3]),this.current=t,this.dirty=!1);},e}(N),G=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.getDefault=function(){return !0},e.prototype.set=function(t){(t!==this.current||this.dirty)&&(this.gl.depthMask(t),this.current=t,this.dirty=!1);},e}(N),W=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.getDefault=function(){return 255},e.prototype.set=function(t){(t!==this.current||this.dirty)&&(this.gl.stencilMask(t),this.current=t,this.dirty=!1);},e}(N),X=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.getDefault=function(){return {func:this.gl.ALWAYS,ref:0,mask:255}},e.prototype.set=function(t){var e=this.current;(t.func!==e.func||t.ref!==e.ref||t.mask!==e.mask||this.dirty)&&(this.gl.stencilFunc(t.func,t.ref,t.mask),this.current=t,this.dirty=!1);},e}(N),H=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.getDefault=function(){var t=this.gl;return [t.KEEP,t.KEEP,t.KEEP]},e.prototype.set=function(t){var e=this.current;(t[0]!==e[0]||t[1]!==e[1]||t[2]!==e[2]||this.dirty)&&(this.gl.stencilOp(t[0],t[1],t[2]),this.current=t,this.dirty=!1);},e}(N),K=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.getDefault=function(){return !1},e.prototype.set=function(t){if(t!==this.current||this.dirty){var e=this.gl;t?e.enable(e.STENCIL_TEST):e.disable(e.STENCIL_TEST),this.current=t,this.dirty=!1;}},e}(N),Y=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.getDefault=function(){return [0,1]},e.prototype.set=function(t){var e=this.current;(t[0]!==e[0]||t[1]!==e[1]||this.dirty)&&(this.gl.depthRange(t[0],t[1]),this.current=t,this.dirty=!1);},e}(N),J=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.getDefault=function(){return !1},e.prototype.set=function(t){if(t!==this.current||this.dirty){var e=this.gl;t?e.enable(e.DEPTH_TEST):e.disable(e.DEPTH_TEST),this.current=t,this.dirty=!1;}},e}(N),Q=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.getDefault=function(){return this.gl.LESS},e.prototype.set=function(t){(t!==this.current||this.dirty)&&(this.gl.depthFunc(t),this.current=t,this.dirty=!1);},e}(N),$=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.getDefault=function(){return !1},e.prototype.set=function(t){if(t!==this.current||this.dirty){var e=this.gl;t?e.enable(e.BLEND):e.disable(e.BLEND),this.current=t,this.dirty=!1;}},e}(N),tt=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.getDefault=function(){var t=this.gl;return [t.ONE,t.ZERO]},e.prototype.set=function(t){var e=this.current;(t[0]!==e[0]||t[1]!==e[1]||this.dirty)&&(this.gl.blendFunc(t[0],t[1]),this.current=t,this.dirty=!1);},e}(N),et=function(e){function i(){e.apply(this,arguments);}return e&&(i.__proto__=e),i.prototype=Object.create(e&&e.prototype),i.prototype.constructor=i,i.prototype.getDefault=function(){return t.Color.transparent},i.prototype.set=function(t){var e=this.current;(t.r!==e.r||t.g!==e.g||t.b!==e.b||t.a!==e.a||this.dirty)&&(this.gl.blendColor(t.r,t.g,t.b,t.a),this.current=t,this.dirty=!1);},i}(N),it=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.getDefault=function(){return this.gl.FUNC_ADD},e.prototype.set=function(t){(t!==this.current||this.dirty)&&(this.gl.blendEquation(t),this.current=t,this.dirty=!1);},e}(N),ot=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.getDefault=function(){return !1},e.prototype.set=function(t){if(t!==this.current||this.dirty){var e=this.gl;t?e.enable(e.CULL_FACE):e.disable(e.CULL_FACE),this.current=t,this.dirty=!1;}},e}(N),rt=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.getDefault=function(){return this.gl.BACK},e.prototype.set=function(t){(t!==this.current||this.dirty)&&(this.gl.cullFace(t),this.current=t,this.dirty=!1);},e}(N),at=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.getDefault=function(){return this.gl.CCW},e.prototype.set=function(t){(t!==this.current||this.dirty)&&(this.gl.frontFace(t),this.current=t,this.dirty=!1);},e}(N),nt=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.getDefault=function(){return null},e.prototype.set=function(t){(t!==this.current||this.dirty)&&(this.gl.useProgram(t),this.current=t,this.dirty=!1);},e}(N),st=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.getDefault=function(){return this.gl.TEXTURE0},e.prototype.set=function(t){(t!==this.current||this.dirty)&&(this.gl.activeTexture(t),this.current=t,this.dirty=!1);},e}(N),lt=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.getDefault=function(){var t=this.gl;return [0,0,t.drawingBufferWidth,t.drawingBufferHeight]},e.prototype.set=function(t){var e=this.current;(t[0]!==e[0]||t[1]!==e[1]||t[2]!==e[2]||t[3]!==e[3]||this.dirty)&&(this.gl.viewport(t[0],t[1],t[2],t[3]),this.current=t,this.dirty=!1);},e}(N),ct=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.getDefault=function(){return null},e.prototype.set=function(t){if(t!==this.current||this.dirty){var e=this.gl;e.bindFramebuffer(e.FRAMEBUFFER,t),this.current=t,this.dirty=!1;}},e}(N),ut=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.getDefault=function(){return null},e.prototype.set=function(t){if(t!==this.current||this.dirty){var e=this.gl;e.bindRenderbuffer(e.RENDERBUFFER,t),this.current=t,this.dirty=!1;}},e}(N),ht=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.getDefault=function(){return null},e.prototype.set=function(t){if(t!==this.current||this.dirty){var e=this.gl;e.bindTexture(e.TEXTURE_2D,t),this.current=t,this.dirty=!1;}},e}(N),pt=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.getDefault=function(){return null},e.prototype.set=function(t){if(t!==this.current||this.dirty){var e=this.gl;e.bindBuffer(e.ARRAY_BUFFER,t),this.current=t,this.dirty=!1;}},e}(N),dt=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.getDefault=function(){return null},e.prototype.set=function(t){var e=this.gl;e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t),this.current=t,this.dirty=!1;},e}(N),_t=function(t){function e(e){t.call(this,e),this.vao=e.extVertexArrayObject;}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.getDefault=function(){return null},e.prototype.set=function(t){this.vao&&(t!==this.current||this.dirty)&&(this.vao.bindVertexArrayOES(t),this.current=t,this.dirty=!1);},e}(N),ft=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.getDefault=function(){return 4},e.prototype.set=function(t){if(t!==this.current||this.dirty){var e=this.gl;e.pixelStorei(e.UNPACK_ALIGNMENT,t),this.current=t,this.dirty=!1;}},e}(N),mt=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.getDefault=function(){return !1},e.prototype.set=function(t){if(t!==this.current||this.dirty){var e=this.gl;e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t),this.current=t,this.dirty=!1;}},e}(N),gt=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.getDefault=function(){return !1},e.prototype.set=function(t){if(t!==this.current||this.dirty){var e=this.gl;e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,t),this.current=t,this.dirty=!1;}},e}(N),vt=function(t){function e(e,i){t.call(this,e),this.context=e,this.parent=i;}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.getDefault=function(){return null},e}(N),yt=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.setDirty=function(){this.dirty=!0;},e.prototype.set=function(t){if(t!==this.current||this.dirty){this.context.bindFramebuffer.set(this.parent);var e=this.gl;e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0),this.current=t,this.dirty=!1;}},e}(vt),xt=function(t){function e(){t.apply(this,arguments);}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.set=function(t){if(t!==this.current||this.dirty){this.context.bindFramebuffer.set(this.parent);var e=this.gl;e.framebufferRenderbuffer(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.RENDERBUFFER,t),this.current=t,this.dirty=!1;}},e}(vt),bt=function(t,e,i){this.context=t,this.width=e,this.height=i;var o=t.gl,r=this.framebuffer=o.createFramebuffer();this.colorAttachment=new yt(t,r),this.depthAttachment=new xt(t,r);};bt.prototype.destroy=function(){var t=this.context.gl,e=this.colorAttachment.get();e&&t.deleteTexture(e);var i=this.depthAttachment.get();i&&t.deleteRenderbuffer(i),t.deleteFramebuffer(this.framebuffer);};var wt=function(t,e,i){this.func=t,this.mask=e,this.range=i;};wt.ReadOnly=!1,wt.ReadWrite=!0,wt.disabled=new wt(519,wt.ReadOnly,[0,1]);var Et=function(t,e,i,o,r,a){this.test=t,this.ref=e,this.mask=i,this.fail=o,this.depthFail=r,this.pass=a;};Et.disabled=new Et({func:519,mask:0},0,0,7680,7680,7680);var Tt=function(t,e,i){this.blendFunction=t,this.blendColor=e,this.mask=i;};Tt.Replace=[1,0],Tt.disabled=new Tt(Tt.Replace,t.Color.transparent,[!1,!1,!1,!1]),Tt.unblended=new Tt(Tt.Replace,t.Color.transparent,[!0,!0,!0,!0]),Tt.alphaBlended=new Tt([1,771],t.Color.transparent,[!0,!0,!0,!0]);var It=function(t,e,i){this.enable=t,this.mode=e,this.frontFace=i;};It.disabled=new It(!1,1029,2305),It.backCCW=new It(!0,1029,2305);var Ct=function(t){this.gl=t,this.extVertexArrayObject=this.gl.getExtension("OES_vertex_array_object"),this.clearColor=new Z(this),this.clearDepth=new j(this),this.clearStencil=new V(this),this.colorMask=new q(this),this.depthMask=new G(this),this.stencilMask=new W(this),this.stencilFunc=new X(this),this.stencilOp=new H(this),this.stencilTest=new K(this),this.depthRange=new Y(this),this.depthTest=new J(this),this.depthFunc=new Q(this),this.blend=new $(this),this.blendFunc=new tt(this),this.blendColor=new et(this),this.blendEquation=new it(this),this.cullFace=new ot(this),this.cullFaceSide=new rt(this),this.frontFace=new at(this),this.program=new nt(this),this.activeTexture=new st(this),this.viewport=new lt(this),this.bindFramebuffer=new ct(this),this.bindRenderbuffer=new ut(this),this.bindTexture=new ht(this),this.bindVertexBuffer=new pt(this),this.bindElementBuffer=new dt(this),this.bindVertexArrayOES=this.extVertexArrayObject&&new _t(this),this.pixelStoreUnpack=new ft(this),this.pixelStoreUnpackPremultiplyAlpha=new mt(this),this.pixelStoreUnpackFlipY=new gt(this),this.extTextureFilterAnisotropic=t.getExtension("EXT_texture_filter_anisotropic")||t.getExtension("MOZ_EXT_texture_filter_anisotropic")||t.getExtension("WEBKIT_EXT_texture_filter_anisotropic"),this.extTextureFilterAnisotropic&&(this.extTextureFilterAnisotropicMax=t.getParameter(this.extTextureFilterAnisotropic.MAX_TEXTURE_MAX_ANISOTROPY_EXT)),this.extTextureHalfFloat=t.getExtension("OES_texture_half_float"),this.extTextureHalfFloat&&t.getExtension("OES_texture_half_float_linear");};Ct.prototype.setDirty=function(){this.clearColor.dirty=!0,this.clearDepth.dirty=!0,this.clearStencil.dirty=!0,this.colorMask.dirty=!0,this.depthMask.dirty=!0,this.stencilMask.dirty=!0,this.stencilFunc.dirty=!0,this.stencilOp.dirty=!0,this.stencilTest.dirty=!0,this.depthRange.dirty=!0,this.depthTest.dirty=!0,this.depthFunc.dirty=!0,this.blend.dirty=!0,this.blendFunc.dirty=!0,this.blendColor.dirty=!0,this.blendEquation.dirty=!0,this.cullFace.dirty=!0,this.cullFaceSide.dirty=!0,this.frontFace.dirty=!0,this.program.dirty=!0,this.activeTexture.dirty=!0,this.viewport.dirty=!0,this.bindFramebuffer.dirty=!0,this.bindRenderbuffer.dirty=!0,this.bindTexture.dirty=!0,this.bindVertexBuffer.dirty=!0,this.bindElementBuffer.dirty=!0,this.extVertexArrayObject&&(this.bindVertexArrayOES.dirty=!0),this.pixelStoreUnpack.dirty=!0,this.pixelStoreUnpackPremultiplyAlpha.dirty=!0,this.pixelStoreUnpackFlipY.dirty=!0;},Ct.prototype.createIndexBuffer=function(t,e){return new O(this,t,e)},Ct.prototype.createVertexBuffer=function(t,e,i){return new U(this,t,e,i)},Ct.prototype.createRenderbuffer=function(t,e,i){var o=this.gl,r=o.createRenderbuffer();return this.bindRenderbuffer.set(r),o.renderbufferStorage(o.RENDERBUFFER,t,e,i),this.bindRenderbuffer.set(null),r},Ct.prototype.createFramebuffer=function(t,e){return new bt(this,t,e)},Ct.prototype.clear=function(t){var e=t.color,i=t.depth,o=this.gl,r=0;e&&(r|=o.COLOR_BUFFER_BIT,this.clearColor.set(e),this.colorMask.set([!0,!0,!0,!0])),void 0!==i&&(r|=o.DEPTH_BUFFER_BIT,this.depthRange.set([0,1]),this.clearDepth.set(i),this.depthMask.set(!0)),o.clear(r);},Ct.prototype.setCullFace=function(t){!1===t.enable?this.cullFace.set(!1):(this.cullFace.set(!0),this.cullFaceSide.set(t.mode),this.frontFace.set(t.frontFace));},Ct.prototype.setDepthMode=function(t){t.func!==this.gl.ALWAYS||t.mask?(this.depthTest.set(!0),this.depthFunc.set(t.func),this.depthMask.set(t.mask),this.depthRange.set(t.range)):this.depthTest.set(!1);},Ct.prototype.setStencilMode=function(t){t.test.func!==this.gl.ALWAYS||t.mask?(this.stencilTest.set(!0),this.stencilMask.set(t.mask),this.stencilOp.set([t.fail,t.depthFail,t.pass]),this.stencilFunc.set({func:t.test.func,ref:t.ref,mask:t.test.mask})):this.stencilTest.set(!1);},Ct.prototype.setColorMode=function(e){t.isEqual(e.blendFunction,Tt.Replace)?this.blend.set(!1):(this.blend.set(!0),this.blendFunc.set(e.blendFunction),this.blendColor.set(e.blendColor)),this.colorMask.set(e.mask);},Ct.prototype.unbindVAO=function(){this.extVertexArrayObject&&this.bindVertexArrayOES.set(null);};var St=function(e){function i(i,o,r){var a=this;e.call(this),this.id=i,this.dispatcher=r,this.on("data",function(t){"source"===t.dataType&&"metadata"===t.sourceDataType&&(a._sourceLoaded=!0),a._sourceLoaded&&!a._paused&&"source"===t.dataType&&"content"===t.sourceDataType&&(a.reload(),a.transform&&a.update(a.transform));}),this.on("error",function(){a._sourceErrored=!0;}),this._source=M(i,o,r,this),this._tiles={},this._cache=new B(0,this._unloadTile.bind(this)),this._timers={},this._cacheTimers={},this._maxTileCacheSize=null,this._coveredTiles={},this._state=new t.SourceFeatureState;}return e&&(i.__proto__=e),i.prototype=Object.create(e&&e.prototype),i.prototype.constructor=i,i.prototype.onAdd=function(t){this.map=t,this._maxTileCacheSize=t?t._maxTileCacheSize:null,this._source&&this._source.onAdd&&this._source.onAdd(t);},i.prototype.onRemove=function(t){this._source&&this._source.onRemove&&this._source.onRemove(t);},i.prototype.loaded=function(){if(this._sourceErrored)return !0;if(!this._sourceLoaded)return !1;for(var t in this._tiles){var e=this._tiles[t];if("loaded"!==e.state&&"errored"!==e.state)return !1}return !0},i.prototype.getSource=function(){return this._source},i.prototype.pause=function(){this._paused=!0;},i.prototype.resume=function(){if(this._paused){var t=this._shouldReloadOnResume;this._paused=!1,this._shouldReloadOnResume=!1,t&&this.reload(),this.transform&&this.update(this.transform);}},i.prototype._loadTile=function(t,e){return this._source.loadTile(t,e)},i.prototype._unloadTile=function(t){if(this._source.unloadTile)return this._source.unloadTile(t,function(){})},i.prototype._abortTile=function(t){if(this._source.abortTile)return this._source.abortTile(t,function(){})},i.prototype.serialize=function(){return this._source.serialize()},i.prototype.prepare=function(t){for(var e in this._source.prepare&&this._source.prepare(),this._state.coalesceChanges(this._tiles,this.map?this.map.painter:null),this._tiles)this._tiles[e].upload(t);},i.prototype.getIds=function(){return Object.keys(this._tiles).map(Number).sort(zt)},i.prototype.getRenderableIds=function(e){var i=this,o=[];for(var r in i._tiles)i._isIdRenderable(+r,e)&&o.push(+r);return e?o.sort(function(e,o){var r=i._tiles[e].tileID,a=i._tiles[o].tileID,n=new t.Point(r.canonical.x,r.canonical.y)._rotate(i.transform.angle),s=new t.Point(a.canonical.x,a.canonical.y)._rotate(i.transform.angle);return r.overscaledZ-a.overscaledZ||s.y-n.y||s.x-n.x}):o.sort(zt)},i.prototype.hasRenderableParent=function(t){var e=this.findLoadedParent(t,0);return !!e&&this._isIdRenderable(e.tileID.key)},i.prototype._isIdRenderable=function(t,e){return this._tiles[t]&&this._tiles[t].hasData()&&!this._coveredTiles[t]&&(e||!this._tiles[t].holdingForFade())},i.prototype.reload=function(){if(this._paused)this._shouldReloadOnResume=!0;else for(var t in this._cache.reset(),this._tiles)"errored"!==this._tiles[t].state&&this._reloadTile(t,"reloading");},i.prototype._reloadTile=function(t,e){var i=this._tiles[t];i&&("loading"!==i.state&&(i.state=e),this._loadTile(i,this._tileLoaded.bind(this,i,t,e)));},i.prototype._tileLoaded=function(e,i,o,r){if(r)return e.state="errored",void(404!==r.status?this._source.fire(new t.ErrorEvent(r,{tile:e})):this.update(this.transform));e.timeAdded=t.browser.now(),"expired"===o&&(e.refreshedUponExpiration=!0),this._setTileReloadTimer(i,e),"raster-dem"===this.getSource().type&&e.dem&&this._backfillDEM(e),this._state.initializeTileState(e,this.map?this.map.painter:null),this._source.fire(new t.Event("data",{dataType:"source",tile:e,coord:e.tileID}));},i.prototype._backfillDEM=function(t){for(var e=this.getRenderableIds(),i=0;i<e.length;i++){var o=e[i];if(t.neighboringTiles&&t.neighboringTiles[o]){var r=this.getTileByID(o);a(t,r),a(r,t);}}function a(t,e){t.needsHillshadePrepare=!0;var i=e.tileID.canonical.x-t.tileID.canonical.x,o=e.tileID.canonical.y-t.tileID.canonical.y,r=Math.pow(2,t.tileID.canonical.z),a=e.tileID.key;0===i&&0===o||Math.abs(o)>1||(Math.abs(i)>1&&(1===Math.abs(i+r)?i+=r:1===Math.abs(i-r)&&(i-=r)),e.dem&&t.dem&&(t.dem.backfillBorder(e.dem,i,o),t.neighboringTiles&&t.neighboringTiles[a]&&(t.neighboringTiles[a].backfilled=!0)));}},i.prototype.getTile=function(t){return this.getTileByID(t.key)},i.prototype.getTileByID=function(t){return this._tiles[t]},i.prototype.getZoom=function(t){return t.zoom+t.scaleZoom(t.tileSize/this._source.tileSize)},i.prototype._retainLoadedChildren=function(t,e,i,o){for(var r in this._tiles){var a=this._tiles[r];if(!(o[r]||!a.hasData()||a.tileID.overscaledZ<=e||a.tileID.overscaledZ>i)){for(var n=a.tileID;a&&a.tileID.overscaledZ>e+1;){var s=a.tileID.scaledTo(a.tileID.overscaledZ-1);(a=this._tiles[s.key])&&a.hasData()&&(n=s);}for(var l=n;l.overscaledZ>e;)if(t[(l=l.scaledTo(l.overscaledZ-1)).key]){o[n.key]=n;break}}}},i.prototype.findLoadedParent=function(t,e){for(var i=t.overscaledZ-1;i>=e;i--){var o=t.scaledTo(i);if(!o)return;var r=String(o.key),a=this._tiles[r];if(a&&a.hasData())return a;if(this._cache.has(o))return this._cache.get(o)}},i.prototype.updateCacheSize=function(t){var e=(Math.ceil(t.width/this._source.tileSize)+1)*(Math.ceil(t.height/this._source.tileSize)+1),i=Math.floor(5*e),o="number"==typeof this._maxTileCacheSize?Math.min(this._maxTileCacheSize,i):i;this._cache.setMaxSize(o);},i.prototype.handleWrapJump=function(t){var e=(t-(void 0===this._prevLng?t:this._prevLng))/360,i=Math.round(e);if(this._prevLng=t,i){var o={};for(var r in this._tiles){var a=this._tiles[r];a.tileID=a.tileID.unwrapTo(a.tileID.wrap+i),o[a.tileID.key]=a;}for(var n in this._tiles=o,this._timers)clearTimeout(this._timers[n]),delete this._timers[n];for(var s in this._tiles){var l=this._tiles[s];this._setTileReloadTimer(s,l);}}},i.prototype.update=function(e){var o=this;if(this.transform=e,this._sourceLoaded&&!this._paused){var r;this.updateCacheSize(e),this.handleWrapJump(this.transform.center.lng),this._coveredTiles={},this.used?this._source.tileID?r=e.getVisibleUnwrappedCoordinates(this._source.tileID).map(function(e){return new t.OverscaledTileID(e.canonical.z,e.wrap,e.canonical.z,e.canonical.x,e.canonical.y)}):(r=e.coveringTiles({tileSize:this._source.tileSize,minzoom:this._source.minzoom,maxzoom:this._source.maxzoom,roundZoom:this._source.roundZoom,reparseOverscaled:this._source.reparseOverscaled}),this._source.hasTile&&(r=r.filter(function(t){return o._source.hasTile(t)}))):r=[];var a=(this._source.roundZoom?Math.round:Math.floor)(this.getZoom(e)),n=Math.max(a-i.maxOverzooming,this._source.minzoom),s=Math.max(a+i.maxUnderzooming,this._source.minzoom),l=this._updateRetainedTiles(r,a);if(Lt(this._source.type)){for(var c={},u={},h=0,p=Object.keys(l);h<p.length;h+=1){var d=p[h],_=l[d],f=o._tiles[d];if(f&&!(f.fadeEndTime&&f.fadeEndTime<=t.browser.now())){var m=o.findLoadedParent(_,n);m&&(o._addTile(m.tileID),c[m.tileID.key]=m.tileID),u[d]=_;}}for(var g in this._retainLoadedChildren(u,a,s,l),c)l[g]||(o._coveredTiles[g]=!0,l[g]=c[g]);}for(var v in l)o._tiles[v].clearFadeHold();for(var y=0,x=t.keysDifference(this._tiles,l);y<x.length;y+=1){var b=x[y],w=o._tiles[b];w.hasSymbolBuckets&&!w.holdingForFade()?w.setHoldDuration(o.map._fadeDuration):w.hasSymbolBuckets&&!w.symbolFadeFinished()||o._removeTile(b);}}},i.prototype.releaseSymbolFadeTiles=function(){for(var t in this._tiles)this._tiles[t].holdingForFade()&&this._removeTile(t);},i.prototype._updateRetainedTiles=function(t,e){for(var o={},r={},a=Math.max(e-i.maxOverzooming,this._source.minzoom),n=Math.max(e+i.maxUnderzooming,this._source.minzoom),s={},l=0,c=t;l<c.length;l+=1){var u=c[l],h=this._addTile(u);o[u.key]=u,h.hasData()||e<this._source.maxzoom&&(s[u.key]=u);}this._retainLoadedChildren(s,e,n,o);for(var p=0,d=t;p<d.length;p+=1){var _=d[p],f=this._tiles[_.key];if(!f.hasData()){if(e+1>this._source.maxzoom){var m=_.children(this._source.maxzoom)[0],g=this.getTile(m);if(g&&g.hasData()){o[m.key]=m;continue}}else{var v=_.children(this._source.maxzoom);if(o[v[0].key]&&o[v[1].key]&&o[v[2].key]&&o[v[3].key])continue}for(var y=f.wasRequested(),x=_.overscaledZ-1;x>=a;--x){var b=_.scaledTo(x);if(r[b.key])break;if(r[b.key]=!0,!(f=this.getTile(b))&&y&&(f=this._addTile(b)),f&&(o[b.key]=b,y=f.wasRequested(),f.hasData()))break}}}return o},i.prototype._addTile=function(e){var i=this._tiles[e.key];if(i)return i;(i=this._cache.getAndRemove(e))&&(this._setTileReloadTimer(e.key,i),i.tileID=e,this._state.initializeTileState(i,this.map?this.map.painter:null),this._cacheTimers[e.key]&&(clearTimeout(this._cacheTimers[e.key]),delete this._cacheTimers[e.key],this._setTileReloadTimer(e.key,i)));var o=Boolean(i);return o||(i=new t.Tile(e,this._source.tileSize*e.overscaleFactor()),this._loadTile(i,this._tileLoaded.bind(this,i,e.key,i.state))),i?(i.uses++,this._tiles[e.key]=i,o||this._source.fire(new t.Event("dataloading",{tile:i,coord:i.tileID,dataType:"source"})),i):null},i.prototype._setTileReloadTimer=function(t,e){var i=this;t in this._timers&&(clearTimeout(this._timers[t]),delete this._timers[t]);var o=e.getExpiryTimeout();o&&(this._timers[t]=setTimeout(function(){i._reloadTile(t,"expired"),delete i._timers[t];},o));},i.prototype._removeTile=function(t){var e=this._tiles[t];e&&(e.uses--,delete this._tiles[t],this._timers[t]&&(clearTimeout(this._timers[t]),delete this._timers[t]),e.uses>0||(e.hasData()?this._cache.add(e.tileID,e,e.getExpiryTimeout()):(e.aborted=!0,this._abortTile(e),this._unloadTile(e))));},i.prototype.clearTiles=function(){for(var t in this._shouldReloadOnResume=!1,this._paused=!1,this._tiles)this._removeTile(t);this._cache.reset();},i.prototype.tilesIn=function(e,i){for(var o=[],r=this.getIds(),a=1/0,n=1/0,s=-1/0,l=-1/0,c=0;c<e.length;c++){var u=e[c];a=Math.min(a,u.x),n=Math.min(n,u.y),s=Math.max(s,u.x),l=Math.max(l,u.y);}for(var h=0;h<r.length;h++){var p=this._tiles[r[h]];if(!p.holdingForFade()){var d=p.tileID,_=Math.pow(2,this.transform.zoom-p.tileID.overscaledZ),f=i*p.queryPadding*t.EXTENT/p.tileSize/_,m=[d.getTilePoint(new t.MercatorCoordinate(a,n)),d.getTilePoint(new t.MercatorCoordinate(s,l))];if(m[0].x-f<t.EXTENT&&m[0].y-f<t.EXTENT&&m[1].x+f>=0&&m[1].y+f>=0){for(var g=[],v=0;v<e.length;v++)g.push(d.getTilePoint(e[v]));o.push({tile:p,tileID:d,queryGeometry:[g],scale:_});}}}return o},i.prototype.getVisibleCoordinates=function(t){for(var e=this,i=this.getRenderableIds(t).map(function(t){return e._tiles[t].tileID}),o=0,r=i;o<r.length;o+=1){var a=r[o];a.posMatrix=e.transform.calculatePosMatrix(a.toUnwrapped());}return i},i.prototype.hasTransition=function(){if(this._source.hasTransition())return !0;if(Lt(this._source.type))for(var e in this._tiles){var i=this._tiles[e];if(void 0!==i.fadeEndTime&&i.fadeEndTime>=t.browser.now())return !0}return !1},i.prototype.setFeatureState=function(t,e,i){t=t||"_geojsonTileLayer",this._state.updateState(t,e,i);},i.prototype.getFeatureState=function(t,e){return t=t||"_geojsonTileLayer",this._state.getState(t,e)},i}(t.Evented);function zt(t,e){return t%32-e%32||e-t}function Lt(t){return "raster"===t||"image"===t||"video"===t}function Pt(){return new t.window.Worker(Jo.workerUrl)}St.maxOverzooming=10,St.maxUnderzooming=3;var Dt=function(){this.active={};};Dt.prototype.acquire=function(t){if(!this.workers)for(this.workers=[];this.workers.length<Dt.workerCount;)this.workers.push(new Pt);return this.active[t]=!0,this.workers.slice()},Dt.prototype.release=function(t){delete this.active[t],0===Object.keys(this.active).length&&(this.workers.forEach(function(t){t.terminate();}),this.workers=null);};var Rt,Mt=Math.floor(t.browser.hardwareConcurrency/2);function At(e,i){var o={};for(var r in e)"ref"!==r&&(o[r]=e[r]);return t.refProperties.forEach(function(t){t in i&&(o[t]=i[t]);}),o}function kt(t){t=t.slice();for(var e=Object.create(null),i=0;i<t.length;i++)e[t[i].id]=t[i];for(var o=0;o<t.length;o++)"ref"in t[o]&&(t[o]=At(t[o],e[t[o].ref]));return t}Dt.workerCount=Math.max(Math.min(Mt,6),1);var Bt={setStyle:"setStyle",addLayer:"addLayer",removeLayer:"removeLayer",setPaintProperty:"setPaintProperty",setLayoutProperty:"setLayoutProperty",setFilter:"setFilter",addSource:"addSource",removeSource:"removeSource",setGeoJSONSourceData:"setGeoJSONSourceData",setLayerZoomRange:"setLayerZoomRange",setLayerProperty:"setLayerProperty",setCenter:"setCenter",setZoom:"setZoom",setBearing:"setBearing",setPitch:"setPitch",setSprite:"setSprite",setGlyphs:"setGlyphs",setTransition:"setTransition",setLight:"setLight"};function Ot(t,e,i){i.push({command:Bt.addSource,args:[t,e[t]]});}function Ft(t,e,i){e.push({command:Bt.removeSource,args:[t]}),i[t]=!0;}function Ut(t,e,i,o){Ft(t,i,o),Ot(t,e,i);}function Nt(e,i,o){var r;for(r in e[o])if(e[o].hasOwnProperty(r)&&"data"!==r&&!t.isEqual(e[o][r],i[o][r]))return !1;for(r in i[o])if(i[o].hasOwnProperty(r)&&"data"!==r&&!t.isEqual(e[o][r],i[o][r]))return !1;return !0}function Zt(e,i,o,r,a,n){var s;for(s in i=i||{},e=e||{})e.hasOwnProperty(s)&&(t.isEqual(e[s],i[s])||o.push({command:n,args:[r,s,i[s],a]}));for(s in i)i.hasOwnProperty(s)&&!e.hasOwnProperty(s)&&(t.isEqual(e[s],i[s])||o.push({command:n,args:[r,s,i[s],a]}));}function jt(t){return t.id}function Vt(t,e){return t[e.id]=e,t}function qt(e,i){if(!e)return [{command:Bt.setStyle,args:[i]}];var o=[];try{if(!t.isEqual(e.version,i.version))return [{command:Bt.setStyle,args:[i]}];t.isEqual(e.center,i.center)||o.push({command:Bt.setCenter,args:[i.center]}),t.isEqual(e.zoom,i.zoom)||o.push({command:Bt.setZoom,args:[i.zoom]}),t.isEqual(e.bearing,i.bearing)||o.push({command:Bt.setBearing,args:[i.bearing]}),t.isEqual(e.pitch,i.pitch)||o.push({command:Bt.setPitch,args:[i.pitch]}),t.isEqual(e.sprite,i.sprite)||o.push({command:Bt.setSprite,args:[i.sprite]}),t.isEqual(e.glyphs,i.glyphs)||o.push({command:Bt.setGlyphs,args:[i.glyphs]}),t.isEqual(e.transition,i.transition)||o.push({command:Bt.setTransition,args:[i.transition]}),t.isEqual(e.light,i.light)||o.push({command:Bt.setLight,args:[i.light]});var r={},a=[];!function(e,i,o,r){var a;for(a in i=i||{},e=e||{})e.hasOwnProperty(a)&&(i.hasOwnProperty(a)||Ft(a,o,r));for(a in i)i.hasOwnProperty(a)&&(e.hasOwnProperty(a)?t.isEqual(e[a],i[a])||("geojson"===e[a].type&&"geojson"===i[a].type&&Nt(e,i,a)?o.push({command:Bt.setGeoJSONSourceData,args:[a,i[a].data]}):Ut(a,i,o,r)):Ot(a,i,o));}(e.sources,i.sources,a,r);var n=[];e.layers&&e.layers.forEach(function(t){r[t.source]?o.push({command:Bt.removeLayer,args:[t.id]}):n.push(t);}),o=o.concat(a),function(e,i,o){i=i||[];var r,a,n,s,l,c,u,h=(e=e||[]).map(jt),p=i.map(jt),d=e.reduce(Vt,{}),_=i.reduce(Vt,{}),f=h.slice(),m=Object.create(null);for(r=0,a=0;r<h.length;r++)n=h[r],_.hasOwnProperty(n)?a++:(o.push({command:Bt.removeLayer,args:[n]}),f.splice(f.indexOf(n,a),1));for(r=0,a=0;r<p.length;r++)n=p[p.length-1-r],f[f.length-1-r]!==n&&(d.hasOwnProperty(n)?(o.push({command:Bt.removeLayer,args:[n]}),f.splice(f.lastIndexOf(n,f.length-a),1)):a++,c=f[f.length-r],o.push({command:Bt.addLayer,args:[_[n],c]}),f.splice(f.length-r,0,n),m[n]=!0);for(r=0;r<p.length;r++)if(s=d[n=p[r]],l=_[n],!m[n]&&!t.isEqual(s,l))if(t.isEqual(s.source,l.source)&&t.isEqual(s["source-layer"],l["source-layer"])&&t.isEqual(s.type,l.type)){for(u in Zt(s.layout,l.layout,o,n,null,Bt.setLayoutProperty),Zt(s.paint,l.paint,o,n,null,Bt.setPaintProperty),t.isEqual(s.filter,l.filter)||o.push({command:Bt.setFilter,args:[n,l.filter]}),t.isEqual(s.minzoom,l.minzoom)&&t.isEqual(s.maxzoom,l.maxzoom)||o.push({command:Bt.setLayerZoomRange,args:[n,l.minzoom,l.maxzoom]}),s)s.hasOwnProperty(u)&&"layout"!==u&&"paint"!==u&&"filter"!==u&&"metadata"!==u&&"minzoom"!==u&&"maxzoom"!==u&&(0===u.indexOf("paint.")?Zt(s[u],l[u],o,n,u.slice(6),Bt.setPaintProperty):t.isEqual(s[u],l[u])||o.push({command:Bt.setLayerProperty,args:[n,u,l[u]]}));for(u in l)l.hasOwnProperty(u)&&!s.hasOwnProperty(u)&&"layout"!==u&&"paint"!==u&&"filter"!==u&&"metadata"!==u&&"minzoom"!==u&&"maxzoom"!==u&&(0===u.indexOf("paint.")?Zt(s[u],l[u],o,n,u.slice(6),Bt.setPaintProperty):t.isEqual(s[u],l[u])||o.push({command:Bt.setLayerProperty,args:[n,u,l[u]]}));}else o.push({command:Bt.removeLayer,args:[n]}),c=f[f.lastIndexOf(n)+1],o.push({command:Bt.addLayer,args:[l,c]});}(n,i.layers,o);}catch(t){console.warn("Unable to compute style diff:",t),o=[{command:Bt.setStyle,args:[i]}];}return o}var Gt=function(t,e,i){var o=this.boxCells=[],r=this.circleCells=[];this.xCellCount=Math.ceil(t/i),this.yCellCount=Math.ceil(e/i);for(var a=0;a<this.xCellCount*this.yCellCount;a++)o.push([]),r.push([]);this.circleKeys=[],this.boxKeys=[],this.bboxes=[],this.circles=[],this.width=t,this.height=e,this.xScale=this.xCellCount/t,this.yScale=this.yCellCount/e,this.boxUid=0,this.circleUid=0;};Gt.prototype.keysLength=function(){return this.boxKeys.length+this.circleKeys.length},Gt.prototype.insert=function(t,e,i,o,r){this._forEachCell(e,i,o,r,this._insertBoxCell,this.boxUid++),this.boxKeys.push(t),this.bboxes.push(e),this.bboxes.push(i),this.bboxes.push(o),this.bboxes.push(r);},Gt.prototype.insertCircle=function(t,e,i,o){this._forEachCell(e-o,i-o,e+o,i+o,this._insertCircleCell,this.circleUid++),this.circleKeys.push(t),this.circles.push(e),this.circles.push(i),this.circles.push(o);},Gt.prototype._insertBoxCell=function(t,e,i,o,r,a){this.boxCells[r].push(a);},Gt.prototype._insertCircleCell=function(t,e,i,o,r,a){this.circleCells[r].push(a);},Gt.prototype._query=function(t,e,i,o,r,a){if(i<0||t>this.width||o<0||e>this.height)return !r&&[];var n=[];if(t<=0&&e<=0&&this.width<=i&&this.height<=o){if(r)return !0;for(var s=0;s<this.boxKeys.length;s++)n.push({key:this.boxKeys[s],x1:this.bboxes[4*s],y1:this.bboxes[4*s+1],x2:this.bboxes[4*s+2],y2:this.bboxes[4*s+3]});for(var l=0;l<this.circleKeys.length;l++){var c=this.circles[3*l],u=this.circles[3*l+1],h=this.circles[3*l+2];n.push({key:this.circleKeys[l],x1:c-h,y1:u-h,x2:c+h,y2:u+h});}return a?n.filter(a):n}var p={hitTest:r,seenUids:{box:{},circle:{}}};return this._forEachCell(t,e,i,o,this._queryCell,n,p,a),r?n.length>0:n},Gt.prototype._queryCircle=function(t,e,i,o,r){var a=t-i,n=t+i,s=e-i,l=e+i;if(n<0||a>this.width||l<0||s>this.height)return !o&&[];var c=[],u={hitTest:o,circle:{x:t,y:e,radius:i},seenUids:{box:{},circle:{}}};return this._forEachCell(a,s,n,l,this._queryCellCircle,c,u,r),o?c.length>0:c},Gt.prototype.query=function(t,e,i,o,r){return this._query(t,e,i,o,!1,r)},Gt.prototype.hitTest=function(t,e,i,o,r){return this._query(t,e,i,o,!0,r)},Gt.prototype.hitTestCircle=function(t,e,i,o){return this._queryCircle(t,e,i,!0,o)},Gt.prototype._queryCell=function(t,e,i,o,r,a,n,s){var l=n.seenUids,c=this.boxCells[r];if(null!==c)for(var u=this.bboxes,h=0,p=c;h<p.length;h+=1){var d=p[h];if(!l.box[d]){l.box[d]=!0;var _=4*d;if(t<=u[_+2]&&e<=u[_+3]&&i>=u[_+0]&&o>=u[_+1]&&(!s||s(this.boxKeys[d]))){if(n.hitTest)return a.push(!0),!0;a.push({key:this.boxKeys[d],x1:u[_],y1:u[_+1],x2:u[_+2],y2:u[_+3]});}}}var f=this.circleCells[r];if(null!==f)for(var m=this.circles,g=0,v=f;g<v.length;g+=1){var y=v[g];if(!l.circle[y]){l.circle[y]=!0;var x=3*y;if(this._circleAndRectCollide(m[x],m[x+1],m[x+2],t,e,i,o)&&(!s||s(this.circleKeys[y]))){if(n.hitTest)return a.push(!0),!0;var b=m[x],w=m[x+1],E=m[x+2];a.push({key:this.circleKeys[y],x1:b-E,y1:w-E,x2:b+E,y2:w+E});}}}},Gt.prototype._queryCellCircle=function(t,e,i,o,r,a,n,s){var l=n.circle,c=n.seenUids,u=this.boxCells[r];if(null!==u)for(var h=this.bboxes,p=0,d=u;p<d.length;p+=1){var _=d[p];if(!c.box[_]){c.box[_]=!0;var f=4*_;if(this._circleAndRectCollide(l.x,l.y,l.radius,h[f+0],h[f+1],h[f+2],h[f+3])&&(!s||s(this.boxKeys[_])))return a.push(!0),!0}}var m=this.circleCells[r];if(null!==m)for(var g=this.circles,v=0,y=m;v<y.length;v+=1){var x=y[v];if(!c.circle[x]){c.circle[x]=!0;var b=3*x;if(this._circlesCollide(g[b],g[b+1],g[b+2],l.x,l.y,l.radius)&&(!s||s(this.circleKeys[x])))return a.push(!0),!0}}},Gt.prototype._forEachCell=function(t,e,i,o,r,a,n,s){for(var l=this._convertToXCellCoord(t),c=this._convertToYCellCoord(e),u=this._convertToXCellCoord(i),h=this._convertToYCellCoord(o),p=l;p<=u;p++)for(var d=c;d<=h;d++){var _=this.xCellCount*d+p;if(r.call(this,t,e,i,o,_,a,n,s))return}},Gt.prototype._convertToXCellCoord=function(t){return Math.max(0,Math.min(this.xCellCount-1,Math.floor(t*this.xScale)))},Gt.prototype._convertToYCellCoord=function(t){return Math.max(0,Math.min(this.yCellCount-1,Math.floor(t*this.yScale)))},Gt.prototype._circlesCollide=function(t,e,i,o,r,a){var n=o-t,s=r-e,l=i+a;return l*l>n*n+s*s},Gt.prototype._circleAndRectCollide=function(t,e,i,o,r,a,n){var s=(a-o)/2,l=Math.abs(t-(o+s));if(l>s+i)return !1;var c=(n-r)/2,u=Math.abs(e-(r+c));if(u>c+i)return !1;if(l<=s||u<=c)return !0;var h=l-s,p=u-c;return h*h+p*p<=i*i};var Wt=t.properties.layout;function Xt(e,i,o,r,a){var n=t.identity(new Float32Array(16));return i?(t.identity(n),t.scale(n,n,[1/a,1/a,1]),o||t.rotateZ(n,n,r.angle)):(t.scale(n,n,[r.width/2,-r.height/2,1]),t.translate(n,n,[1,-1,0]),t.multiply(n,n,e)),n}function Ht(e,i,o,r,a){var n=t.identity(new Float32Array(16));return i?(t.multiply(n,n,e),t.scale(n,n,[a,a,1]),o||t.rotateZ(n,n,-r.angle)):(t.scale(n,n,[1,-1,1]),t.translate(n,n,[-1,-1,0]),t.scale(n,n,[2/r.width,2/r.height,1])),n}function Kt(e,i){var o=[e.x,e.y,0,1];ae(o,o,i);var r=o[3];return {point:new t.Point(o[0]/r,o[1]/r),signedDistanceFromCamera:r}}function Yt(t,e){var i=t[0]/t[3],o=t[1]/t[3];return i>=-e[0]&&i<=e[0]&&o>=-e[1]&&o<=e[1]}function Jt(e,i,o,r,a,n,s,l){var c=r?e.textSizeData:e.iconSizeData,u=t.evaluateSizeForZoom(c,o.transform.zoom,Wt.properties[r?"text-size":"icon-size"]),h=[256/o.width*2+1,256/o.height*2+1],p=r?e.text.dynamicLayoutVertexArray:e.icon.dynamicLayoutVertexArray;p.clear();for(var d=e.lineVertexArray,_=r?e.text.placedSymbolArray:e.icon.placedSymbolArray,f=o.transform.width/o.transform.height,m=!1,g=0;g<_.length;g++){var v=_.get(g);if(v.hidden||v.writingMode===t.WritingMode.vertical&&!m)re(v.numGlyphs,p);else{m=!1;var y=[v.anchorX,v.anchorY,0,1];if(t.transformMat4(y,y,i),Yt(y,h)){var x=.5+y[3]/o.transform.cameraToCenterDistance*.5,b=t.evaluateSizeForFeature(c,u,v),w=s?b*x:b/x,E=new t.Point(v.anchorX,v.anchorY),T=Kt(E,a).point,I={},C=te(v,w,!1,l,i,a,n,e.glyphOffsetArray,d,p,T,E,I,f);m=C.useVertical,(C.notEnoughRoom||m||C.needsFlipping&&te(v,w,!0,l,i,a,n,e.glyphOffsetArray,d,p,T,E,I,f).notEnoughRoom)&&re(v.numGlyphs,p);}else re(v.numGlyphs,p);}}r?e.text.dynamicLayoutVertexBuffer.updateData(p):e.icon.dynamicLayoutVertexBuffer.updateData(p);}function Qt(t,e,i,o,r,a,n,s,l,c,u,h){var p=s.glyphStartIndex+s.numGlyphs,d=s.lineStartIndex,_=s.lineStartIndex+s.lineLength,f=e.getoffsetX(s.glyphStartIndex),m=e.getoffsetX(p-1),g=ie(t*f,i,o,r,a,n,s.segment,d,_,l,c,u,h);if(!g)return null;var v=ie(t*m,i,o,r,a,n,s.segment,d,_,l,c,u,h);return v?{first:g,last:v}:null}function $t(e,i,o,r){if(e===t.WritingMode.horizontal&&Math.abs(o.y-i.y)>Math.abs(o.x-i.x)*r)return {useVertical:!0};return (e===t.WritingMode.vertical?i.y<o.y:i.x>o.x)?{needsFlipping:!0}:null}function te(e,i,o,r,a,n,s,l,c,u,h,p,d,_){var f,m=i/24,g=e.lineOffsetX*i,v=e.lineOffsetY*i;if(e.numGlyphs>1){var y=e.glyphStartIndex+e.numGlyphs,x=e.lineStartIndex,b=e.lineStartIndex+e.lineLength,w=Qt(m,l,g,v,o,h,p,e,c,n,d,!1);if(!w)return {notEnoughRoom:!0};var E=Kt(w.first.point,s).point,T=Kt(w.last.point,s).point;if(r&&!o){var I=$t(e.writingMode,E,T,_);if(I)return I}f=[w.first];for(var C=e.glyphStartIndex+1;C<y-1;C++)f.push(ie(m*l.getoffsetX(C),g,v,o,h,p,e.segment,x,b,c,n,d,!1));f.push(w.last);}else{if(r&&!o){var S=Kt(p,a).point,z=e.lineStartIndex+e.segment+1,L=new t.Point(c.getx(z),c.gety(z)),P=Kt(L,a),D=P.signedDistanceFromCamera>0?P.point:ee(p,L,S,1,a),R=$t(e.writingMode,S,D,_);if(R)return R}var M=ie(m*l.getoffsetX(e.glyphStartIndex),g,v,o,h,p,e.segment,e.lineStartIndex,e.lineStartIndex+e.lineLength,c,n,d,!1);if(!M)return {notEnoughRoom:!0};f=[M];}for(var A=0,k=f;A<k.length;A+=1){var B=k[A];t.addDynamicAttributes(u,B.point,B.angle);}return {}}function ee(t,e,i,o,r){var a=Kt(t.add(t.sub(e)._unit()),r).point,n=i.sub(a);return i.add(n._mult(o/n.mag()))}function ie(e,i,o,r,a,n,s,l,c,u,h,p,d){var _=r?e-i:e+i,f=_>0?1:-1,m=0;r&&(f*=-1,m=Math.PI),f<0&&(m+=Math.PI);for(var g=f>0?l+s:l+s+1,v=g,y=a,x=a,b=0,w=0,E=Math.abs(_);b+w<=E;){if((g+=f)<l||g>=c)return null;if(x=y,void 0===(y=p[g])){var T=new t.Point(u.getx(g),u.gety(g)),I=Kt(T,h);if(I.signedDistanceFromCamera>0)y=p[g]=I.point;else{var C=g-f;y=ee(0===b?n:new t.Point(u.getx(C),u.gety(C)),T,x,E-b+1,h);}}b+=w,w=x.dist(y);}var S=(E-b)/w,z=y.sub(x),L=z.mult(S)._add(x);return L._add(z._unit()._perp()._mult(o*f)),{point:L,angle:m+Math.atan2(y.y-x.y,y.x-x.x),tileDistance:d?{prevTileDistance:g-f===v?0:u.gettileUnitDistanceFromAnchor(g-f),lastSegmentViewportDistance:E-b}:null}}var oe=new Float32Array([-1/0,-1/0,0,-1/0,-1/0,0,-1/0,-1/0,0,-1/0,-1/0,0]);function re(t,e){for(var i=0;i<t;i++){var o=e.length;e.resize(o+4),e.float32.set(oe,3*o);}}function ae(t,e,i){var o=e[0],r=e[1];return t[0]=i[0]*o+i[4]*r+i[12],t[1]=i[1]*o+i[5]*r+i[13],t[3]=i[3]*o+i[7]*r+i[15],t}var ne=function(t,e,i){void 0===e&&(e=new Gt(t.width+200,t.height+200,25)),void 0===i&&(i=new Gt(t.width+200,t.height+200,25)),this.transform=t,this.grid=e,this.ignoredGrid=i,this.pitchfactor=Math.cos(t._pitch)*t.cameraToCenterDistance,this.screenRightBoundary=t.width+100,this.screenBottomBoundary=t.height+100,this.gridRightBoundary=t.width+200,this.gridBottomBoundary=t.height+200;};function se(t,e,i){t[e+4]=i?1:0;}function le(e,i,o){return i*(t.EXTENT/(e.tileSize*Math.pow(2,o-e.tileID.overscaledZ)))}ne.prototype.placeCollisionBox=function(t,e,i,o,r){var a=this.projectAndGetPerspectiveRatio(o,t.anchorPointX,t.anchorPointY),n=i*a.perspectiveRatio,s=t.x1*n+a.point.x,l=t.y1*n+a.point.y,c=t.x2*n+a.point.x,u=t.y2*n+a.point.y;return !this.isInsideGrid(s,l,c,u)||!e&&this.grid.hitTest(s,l,c,u,r)?{box:[],offscreen:!1}:{box:[s,l,c,u],offscreen:this.isOffscreen(s,l,c,u)}},ne.prototype.approximateTileDistance=function(t,e,i,o,r){var a=r?1:o/this.pitchfactor,n=t.lastSegmentViewportDistance*i;return t.prevTileDistance+n+(a-1)*n*Math.abs(Math.sin(e))},ne.prototype.placeCollisionCircles=function(e,i,o,r,a,n,s,l,c,u,h,p,d){var _=[],f=this.projectAnchor(c,a.anchorX,a.anchorY),m=l/24,g=a.lineOffsetX*l,v=a.lineOffsetY*l,y=new t.Point(a.anchorX,a.anchorY),x=Qt(m,s,g,v,!1,Kt(y,u).point,y,a,n,u,{},!0),b=!1,w=!1,E=!0,T=f.perspectiveRatio*r,I=1/(r*o),C=0,S=0;x&&(C=this.approximateTileDistance(x.first.tileDistance,x.first.angle,I,f.cameraDistance,p),S=this.approximateTileDistance(x.last.tileDistance,x.last.angle,I,f.cameraDistance,p));for(var z=0;z<e.length;z+=5){var L=e[z],P=e[z+1],D=e[z+2],R=e[z+3];if(!x||R<-C||R>S)se(e,z,!1);else{var M=this.projectPoint(c,L,P),A=D*T;if(_.length>0){var k=M.x-_[_.length-4],B=M.y-_[_.length-3];if(A*A*2>k*k+B*B)if(z+8<e.length){var O=e[z+8];if(O>-C&&O<S){se(e,z,!1);continue}}}var F=z/5;_.push(M.x,M.y,A,F),se(e,z,!0);var U=M.x-A,N=M.y-A,Z=M.x+A,j=M.y+A;if(E=E&&this.isOffscreen(U,N,Z,j),w=w||this.isInsideGrid(U,N,Z,j),!i&&this.grid.hitTestCircle(M.x,M.y,A,d)){if(!h)return {circles:[],offscreen:!1};b=!0;}}}return {circles:b||!w?[]:_,offscreen:E}},ne.prototype.queryRenderedSymbols=function(e){if(0===e.length||0===this.grid.keysLength()&&0===this.ignoredGrid.keysLength())return {};for(var i=[],o=1/0,r=1/0,a=-1/0,n=-1/0,s=0,l=e;s<l.length;s+=1){var c=l[s],u=new t.Point(c.x+100,c.y+100);o=Math.min(o,u.x),r=Math.min(r,u.y),a=Math.max(a,u.x),n=Math.max(n,u.y),i.push(u);}for(var h={},p={},d=0,_=this.grid.query(o,r,a,n).concat(this.ignoredGrid.query(o,r,a,n));d<_.length;d+=1){var f=_[d],m=f.key;if(void 0===h[m.bucketInstanceId]&&(h[m.bucketInstanceId]={}),!h[m.bucketInstanceId][m.featureIndex]){var g=[new t.Point(f.x1,f.y1),new t.Point(f.x2,f.y1),new t.Point(f.x2,f.y2),new t.Point(f.x1,f.y2)];t.polygonIntersectsPolygon(i,g)&&(h[m.bucketInstanceId][m.featureIndex]=!0,void 0===p[m.bucketInstanceId]&&(p[m.bucketInstanceId]=[]),p[m.bucketInstanceId].push(m.featureIndex));}}return p},ne.prototype.insertCollisionBox=function(t,e,i,o,r){var a={bucketInstanceId:i,featureIndex:o,collisionGroupID:r};(e?this.ignoredGrid:this.grid).insert(a,t[0],t[1],t[2],t[3]);},ne.prototype.insertCollisionCircles=function(t,e,i,o,r){for(var a=e?this.ignoredGrid:this.grid,n={bucketInstanceId:i,featureIndex:o,collisionGroupID:r},s=0;s<t.length;s+=4)a.insertCircle(n,t[s],t[s+1],t[s+2]);},ne.prototype.projectAnchor=function(t,e,i){var o=[e,i,0,1];return ae(o,o,t),{perspectiveRatio:.5+this.transform.cameraToCenterDistance/o[3]*.5,cameraDistance:o[3]}},ne.prototype.projectPoint=function(e,i,o){var r=[i,o,0,1];return ae(r,r,e),new t.Point((r[0]/r[3]+1)/2*this.transform.width+100,(-r[1]/r[3]+1)/2*this.transform.height+100)},ne.prototype.projectAndGetPerspectiveRatio=function(e,i,o){var r=[i,o,0,1];return ae(r,r,e),{point:new t.Point((r[0]/r[3]+1)/2*this.transform.width+100,(-r[1]/r[3]+1)/2*this.transform.height+100),perspectiveRatio:.5+this.transform.cameraToCenterDistance/r[3]*.5}},ne.prototype.isOffscreen=function(t,e,i,o){return i<100||t>=this.screenRightBoundary||o<100||e>this.screenBottomBoundary},ne.prototype.isInsideGrid=function(t,e,i,o){return i>=0&&t<this.gridRightBoundary&&o>=0&&e<this.gridBottomBoundary};var ce=function(t,e,i,o){this.opacity=t?Math.max(0,Math.min(1,t.opacity+(t.placed?e:-e))):o&&i?1:0,this.placed=i;};ce.prototype.isHidden=function(){return 0===this.opacity&&!this.placed};var ue=function(t,e,i,o,r){this.text=new ce(t?t.text:null,e,i,r),this.icon=new ce(t?t.icon:null,e,o,r);};ue.prototype.isHidden=function(){return this.text.isHidden()&&this.icon.isHidden()};var he=function(t,e,i){this.text=t,this.icon=e,this.skipFade=i;},pe=function(t,e,i,o,r){this.bucketInstanceId=t,this.featureIndex=e,this.sourceLayerIndex=i,this.bucketIndex=o,this.tileID=r;},de=function(t){this.crossSourceCollisions=t,this.maxGroupID=0,this.collisionGroups={};};de.prototype.get=function(t){if(this.crossSourceCollisions)return {ID:0,predicate:null};if(!this.collisionGroups[t]){var e=++this.maxGroupID;this.collisionGroups[t]={ID:e,predicate:function(t){return t.collisionGroupID===e}};}return this.collisionGroups[t]};var _e=function(t,e,i){this.transform=t.clone(),this.collisionIndex=new ne(this.transform),this.placements={},this.opacities={},this.stale=!1,this.commitTime=0,this.fadeDuration=e,this.retainedQueryData={},this.collisionGroups=new de(i);};function fe(t,e,i){t.emplaceBack(e?1:0,i?1:0),t.emplaceBack(e?1:0,i?1:0),t.emplaceBack(e?1:0,i?1:0),t.emplaceBack(e?1:0,i?1:0);}_e.prototype.placeLayerTile=function(e,i,o,r){var a=i.getBucket(e),n=i.latestFeatureIndex;if(a&&n&&e.id===a.layerIds[0]){var s=i.collisionBoxArray,l=a.layers[0].layout,c=Math.pow(2,this.transform.zoom-i.tileID.overscaledZ),u=i.tileSize/t.EXTENT,h=this.transform.calculatePosMatrix(i.tileID.toUnwrapped()),p=Xt(h,"map"===l.get("text-pitch-alignment"),"map"===l.get("text-rotation-alignment"),this.transform,le(i,1,this.transform.zoom)),d=Xt(h,"map"===l.get("icon-pitch-alignment"),"map"===l.get("icon-rotation-alignment"),this.transform,le(i,1,this.transform.zoom));this.retainedQueryData[a.bucketInstanceId]=new pe(a.bucketInstanceId,n,a.sourceLayerIndex,a.index,i.tileID),this.placeLayerBucket(a,h,p,d,c,u,o,i.holdingForFade(),r,s);}},_e.prototype.placeLayerBucket=function(e,i,o,r,a,n,s,l,c,u){var h=e.layers[0].layout,p=t.evaluateSizeForZoom(e.textSizeData,this.transform.zoom,t.properties.layout.properties["text-size"]),d=h.get("text-optional"),_=h.get("icon-optional"),f=h.get("text-allow-overlap"),m=h.get("icon-allow-overlap"),g=f&&(m||!e.hasIconData()||_),v=m&&(f||!e.hasTextData()||d),y=this.collisionGroups.get(e.sourceID);!e.collisionArrays&&u&&e.deserializeCollisionBoxes(u);for(var x=0;x<e.symbolInstances.length;x++){var b=e.symbolInstances.get(x);if(!c[b.crossTileID]){if(l){this.placements[b.crossTileID]=new he(!1,!1,!1);continue}var w=!1,E=!1,T=!0,I=null,C=null,S=null,z=0,L=0,P=e.collisionArrays[x];P.textFeatureIndex&&(z=P.textFeatureIndex),P.textBox&&(w=(I=this.collisionIndex.placeCollisionBox(P.textBox,h.get("text-allow-overlap"),n,i,y.predicate)).box.length>0,T=T&&I.offscreen);var D=P.textCircles;if(D){var R=e.text.placedSymbolArray.get(b.horizontalPlacedTextSymbolIndex),M=t.evaluateSizeForFeature(e.textSizeData,p,R);C=this.collisionIndex.placeCollisionCircles(D,h.get("text-allow-overlap"),a,n,R,e.lineVertexArray,e.glyphOffsetArray,M,i,o,s,"map"===h.get("text-pitch-alignment"),y.predicate),w=h.get("text-allow-overlap")||C.circles.length>0,T=T&&C.offscreen;}P.iconFeatureIndex&&(L=P.iconFeatureIndex),P.iconBox&&(E=(S=this.collisionIndex.placeCollisionBox(P.iconBox,h.get("icon-allow-overlap"),n,i,y.predicate)).box.length>0,T=T&&S.offscreen);var A=d||0===b.numGlyphVertices&&0===b.numVerticalGlyphVertices,k=_||0===b.numIconVertices;A||k?k?A||(E=E&&w):w=E&&w:E=w=E&&w,w&&I&&this.collisionIndex.insertCollisionBox(I.box,h.get("text-ignore-placement"),e.bucketInstanceId,z,y.ID),E&&S&&this.collisionIndex.insertCollisionBox(S.box,h.get("icon-ignore-placement"),e.bucketInstanceId,L,y.ID),w&&C&&this.collisionIndex.insertCollisionCircles(C.circles,h.get("text-ignore-placement"),e.bucketInstanceId,z,y.ID),this.placements[b.crossTileID]=new he(w||g,E||v,T||e.justReloaded),c[b.crossTileID]=!0;}}e.justReloaded=!1;},_e.prototype.commit=function(t,e){this.commitTime=e;var i=!1,o=t&&0!==this.fadeDuration?(this.commitTime-t.commitTime)/this.fadeDuration:1,r=t?t.opacities:{};for(var a in this.placements){var n=this.placements[a],s=r[a];s?(this.opacities[a]=new ue(s,o,n.text,n.icon),i=i||n.text!==s.text.placed||n.icon!==s.icon.placed):(this.opacities[a]=new ue(null,o,n.text,n.icon,n.skipFade),i=i||n.text||n.icon);}for(var l in r){var c=r[l];if(!this.opacities[l]){var u=new ue(c,o,!1,!1);u.isHidden()||(this.opacities[l]=u,i=i||c.text.placed||c.icon.placed);}}i?this.lastPlacementChangeTime=e:"number"!=typeof this.lastPlacementChangeTime&&(this.lastPlacementChangeTime=t?t.lastPlacementChangeTime:e);},_e.prototype.updateLayerOpacities=function(t,e){for(var i={},o=0,r=e;o<r.length;o+=1){var a=r[o],n=a.getBucket(t);n&&a.latestFeatureIndex&&t.id===n.layerIds[0]&&this.updateBucketOpacities(n,i,a.collisionBoxArray);}},_e.prototype.updateBucketOpacities=function(t,e,i){t.hasTextData()&&t.text.opacityVertexArray.clear(),t.hasIconData()&&t.icon.opacityVertexArray.clear(),t.hasCollisionBoxData()&&t.collisionBox.collisionVertexArray.clear(),t.hasCollisionCircleData()&&t.collisionCircle.collisionVertexArray.clear();var o=t.layers[0].layout,r=new ue(null,0,!1,!1,!0),a=o.get("text-allow-overlap"),n=o.get("icon-allow-overlap"),s=new ue(null,0,a&&(n||!t.hasIconData()||o.get("icon-optional")),n&&(a||!t.hasTextData()||o.get("text-optional")),!0);!t.collisionArrays&&i&&(t.hasCollisionBoxData()||t.hasCollisionCircleData())&&t.deserializeCollisionBoxes(i);for(var l=0;l<t.symbolInstances.length;l++){var c=t.symbolInstances.get(l),u=e[c.crossTileID],h=this.opacities[c.crossTileID];u?h=r:h||(h=s,this.opacities[c.crossTileID]=h),e[c.crossTileID]=!0;var p=c.numGlyphVertices>0||c.numVerticalGlyphVertices>0,d=c.numIconVertices>0;if(p){for(var _=Ee(h.text),f=(c.numGlyphVertices+c.numVerticalGlyphVertices)/4,m=0;m<f;m++)t.text.opacityVertexArray.emplaceBack(_);t.text.placedSymbolArray.get(c.horizontalPlacedTextSymbolIndex).hidden=h.text.isHidden(),c.verticalPlacedTextSymbolIndex>=0&&(t.text.placedSymbolArray.get(c.verticalPlacedTextSymbolIndex).hidden=h.text.isHidden());}if(d){for(var g=Ee(h.icon),v=0;v<c.numIconVertices/4;v++)t.icon.opacityVertexArray.emplaceBack(g);t.icon.placedSymbolArray.get(l).hidden=h.icon.isHidden();}if(t.hasCollisionBoxData()||t.hasCollisionCircleData()){var y=t.collisionArrays[l];if(y){y.textBox&&fe(t.collisionBox.collisionVertexArray,h.text.placed,!1),y.iconBox&&fe(t.collisionBox.collisionVertexArray,h.icon.placed,!1);var x=y.textCircles;if(x&&t.hasCollisionCircleData())for(var b=0;b<x.length;b+=5){var w=u||0===x[b+4];fe(t.collisionCircle.collisionVertexArray,h.text.placed,w);}}}}t.sortFeatures(this.transform.angle),this.retainedQueryData[t.bucketInstanceId]&&(this.retainedQueryData[t.bucketInstanceId].featureSortOrder=t.featureSortOrder),t.hasTextData()&&t.text.opacityVertexBuffer&&t.text.opacityVertexBuffer.updateData(t.text.opacityVertexArray),t.hasIconData()&&t.icon.opacityVertexBuffer&&t.icon.opacityVertexBuffer.updateData(t.icon.opacityVertexArray),t.hasCollisionBoxData()&&t.collisionBox.collisionVertexBuffer&&t.collisionBox.collisionVertexBuffer.updateData(t.collisionBox.collisionVertexArray),t.hasCollisionCircleData()&&t.collisionCircle.collisionVertexBuffer&&t.collisionCircle.collisionVertexBuffer.updateData(t.collisionCircle.collisionVertexArray);},_e.prototype.symbolFadeChange=function(t){return 0===this.fadeDuration?1:(t-this.commitTime)/this.fadeDuration},_e.prototype.hasTransitions=function(t){return this.stale||t-this.lastPlacementChangeTime<this.fadeDuration},_e.prototype.stillRecent=function(t){return this.commitTime+this.fadeDuration>t},_e.prototype.setStale=function(){this.stale=!0;};var me=Math.pow(2,25),ge=Math.pow(2,24),ve=Math.pow(2,17),ye=Math.pow(2,16),xe=Math.pow(2,9),be=Math.pow(2,8),we=Math.pow(2,1);function Ee(t){if(0===t.opacity&&!t.placed)return 0;if(1===t.opacity&&t.placed)return 4294967295;var e=t.placed?1:0,i=Math.floor(127*t.opacity);return i*me+e*ge+i*ve+e*ye+i*xe+e*be+i*we+e}var Te=function(){this._currentTileIndex=0,this._seenCrossTileIDs={};};Te.prototype.continuePlacement=function(t,e,i,o,r){for(;this._currentTileIndex<t.length;){var a=t[this._currentTileIndex];if(e.placeLayerTile(o,a,i,this._seenCrossTileIDs),this._currentTileIndex++,r())return !0}};var Ie=function(t,e,i,o,r,a){this.placement=new _e(t,r,a),this._currentPlacementIndex=e.length-1,this._forceFullPlacement=i,this._showCollisionBoxes=o,this._done=!1;};Ie.prototype.isDone=function(){return this._done},Ie.prototype.continuePlacement=function(e,i,o){for(var r=this,a=t.browser.now(),n=function(){var e=t.browser.now()-a;return !r._forceFullPlacement&&e>2};this._currentPlacementIndex>=0;){var s=i[e[r._currentPlacementIndex]],l=r.placement.collisionIndex.transform.zoom;if("symbol"===s.type&&(!s.minzoom||s.minzoom<=l)&&(!s.maxzoom||s.maxzoom>l)){if(r._inProgressLayer||(r._inProgressLayer=new Te),r._inProgressLayer.continuePlacement(o[s.source],r.placement,r._showCollisionBoxes,s,n))return;delete r._inProgressLayer;}r._currentPlacementIndex--;}this._done=!0;},Ie.prototype.commit=function(t,e){return this.placement.commit(t,e),this.placement};var Ce=512/t.EXTENT/2,Se=function(t,e,i){this.tileID=t,this.indexedSymbolInstances={},this.bucketInstanceId=i;for(var o=0;o<e.length;o++){var r=e.get(o),a=r.key;this.indexedSymbolInstances[a]||(this.indexedSymbolInstances[a]=[]),this.indexedSymbolInstances[a].push({crossTileID:r.crossTileID,coord:this.getScaledCoordinates(r,t)});}};Se.prototype.getScaledCoordinates=function(e,i){var o=i.canonical.z-this.tileID.canonical.z,r=Ce/Math.pow(2,o);return {x:Math.floor((i.canonical.x*t.EXTENT+e.anchorX)*r),y:Math.floor((i.canonical.y*t.EXTENT+e.anchorY)*r)}},Se.prototype.findMatches=function(t,e,i){for(var o=this.tileID.canonical.z<e.canonical.z?1:Math.pow(2,this.tileID.canonical.z-e.canonical.z),r=0;r<t.length;r++){var a=t.get(r);if(!a.crossTileID){var n=this.indexedSymbolInstances[a.key];if(n)for(var s=this.getScaledCoordinates(a,e),l=0,c=n;l<c.length;l+=1){var u=c[l];if(Math.abs(u.coord.x-s.x)<=o&&Math.abs(u.coord.y-s.y)<=o&&!i[u.crossTileID]){i[u.crossTileID]=!0,a.crossTileID=u.crossTileID;break}}}}};var ze=function(){this.maxCrossTileID=0;};ze.prototype.generate=function(){return ++this.maxCrossTileID};var Le=function(){this.indexes={},this.usedCrossTileIDs={},this.lng=0;};Le.prototype.handleWrapJump=function(t){var e=Math.round((t-this.lng)/360);if(0!==e)for(var i in this.indexes){var o=this.indexes[i],r={};for(var a in o){var n=o[a];n.tileID=n.tileID.unwrapTo(n.tileID.wrap+e),r[n.tileID.key]=n;}this.indexes[i]=r;}this.lng=t;},Le.prototype.addBucket=function(t,e,i){if(this.indexes[t.overscaledZ]&&this.indexes[t.overscaledZ][t.key]){if(this.indexes[t.overscaledZ][t.key].bucketInstanceId===e.bucketInstanceId)return !1;this.removeBucketCrossTileIDs(t.overscaledZ,this.indexes[t.overscaledZ][t.key]);}for(var o=0;o<e.symbolInstances.length;o++){e.symbolInstances.get(o).crossTileID=0;}this.usedCrossTileIDs[t.overscaledZ]||(this.usedCrossTileIDs[t.overscaledZ]={});var r=this.usedCrossTileIDs[t.overscaledZ];for(var a in this.indexes){var n=this.indexes[a];if(Number(a)>t.overscaledZ)for(var s in n){var l=n[s];l.tileID.isChildOf(t)&&l.findMatches(e.symbolInstances,t,r);}else{var c=n[t.scaledTo(Number(a)).key];c&&c.findMatches(e.symbolInstances,t,r);}}for(var u=0;u<e.symbolInstances.length;u++){var h=e.symbolInstances.get(u);h.crossTileID||(h.crossTileID=i.generate(),r[h.crossTileID]=!0);}return void 0===this.indexes[t.overscaledZ]&&(this.indexes[t.overscaledZ]={}),this.indexes[t.overscaledZ][t.key]=new Se(t,e.symbolInstances,e.bucketInstanceId),!0},Le.prototype.removeBucketCrossTileIDs=function(t,e){for(var i in e.indexedSymbolInstances)for(var o=0,r=e.indexedSymbolInstances[i];o<r.length;o+=1){var a=r[o];delete this.usedCrossTileIDs[t][a.crossTileID];}},Le.prototype.removeStaleBuckets=function(t){var e=!1;for(var i in this.indexes){var o=this.indexes[i];for(var r in o)t[o[r].bucketInstanceId]||(this.removeBucketCrossTileIDs(i,o[r]),delete o[r],e=!0);}return e};var Pe=function(){this.layerIndexes={},this.crossTileIDs=new ze,this.maxBucketInstanceId=0,this.bucketsInCurrentPlacement={};};Pe.prototype.addLayer=function(t,e,i){var o=this.layerIndexes[t.id];void 0===o&&(o=this.layerIndexes[t.id]=new Le);var r=!1,a={};o.handleWrapJump(i);for(var n=0,s=e;n<s.length;n+=1){var l=s[n],c=l.getBucket(t);c&&t.id===c.layerIds[0]&&(c.bucketInstanceId||(c.bucketInstanceId=++this.maxBucketInstanceId),o.addBucket(l.tileID,c,this.crossTileIDs)&&(r=!0),a[c.bucketInstanceId]=!0);}return o.removeStaleBuckets(a)&&(r=!0),r},Pe.prototype.pruneUnusedLayers=function(t){var e={};for(var i in t.forEach(function(t){e[t]=!0;}),this.layerIndexes)e[i]||delete this.layerIndexes[i];};var De=function(e,i){return t.emitValidationErrors(e,i&&i.filter(function(t){return "source.canvas"!==t.identifier}))},Re=t.pick(Bt,["addLayer","removeLayer","setPaintProperty","setLayoutProperty","setFilter","addSource","removeSource","setLayerZoomRange","setLight","setTransition","setGeoJSONSourceData"]),Me=t.pick(Bt,["setCenter","setZoom","setBearing","setPitch"]),Ae=function(e){function i(o,r){var a=this;void 0===r&&(r={}),e.call(this),this.map=o,this.dispatcher=new w((Rt||(Rt=new Dt),Rt),this),this.imageManager=new h,this.glyphManager=new g(o._transformRequest,r.localIdeographFontFamily),this.lineAtlas=new b(256,512),this.crossTileSymbolIndex=new Pe,this._layers={},this._order=[],this.sourceCaches={},this.zoomHistory=new t.ZoomHistory,this._loaded=!1,this._resetUpdates(),this.dispatcher.broadcast("setReferrer",t.getReferrer());var n=this;this._rtlTextPluginCallback=i.registerForPluginAvailability(function(t){for(var e in n.dispatcher.broadcast("loadRTLTextPlugin",t.pluginURL,t.completionCallback),n.sourceCaches)n.sourceCaches[e].reload();}),this.on("data",function(t){if("source"===t.dataType&&"metadata"===t.sourceDataType){var e=a.sourceCaches[t.sourceId];if(e){var i=e.getSource();if(i&&i.vectorLayerIds)for(var o in a._layers){var r=a._layers[o];r.source===i.id&&a._validateLayer(r);}}}});}return e&&(i.__proto__=e),i.prototype=Object.create(e&&e.prototype),i.prototype.constructor=i,i.prototype.loadURL=function(e,i){var o=this;void 0===i&&(i={}),this.fire(new t.Event("dataloading",{dataType:"style"}));var r="boolean"==typeof i.validate?i.validate:!t.isMapboxURL(e);e=t.normalizeStyleURL(e,i.accessToken);var a=this.map._transformRequest(e,t.ResourceType.Style);this._request=t.getJSON(a,function(e,i){o._request=null,e?o.fire(new t.ErrorEvent(e)):i&&o._load(i,r);});},i.prototype.loadJSON=function(e,i){var o=this;void 0===i&&(i={}),this.fire(new t.Event("dataloading",{dataType:"style"})),this._request=t.browser.frame(function(){o._request=null,o._load(e,!1!==i.validate);});},i.prototype._load=function(e,i){var o=this;if(!i||!De(this,t.validateStyle(e))){for(var r in this._loaded=!0,this.stylesheet=e,e.sources)o.addSource(r,e.sources[r],{validate:!1});e.sprite?this._spriteRequest=function(e,i,o){var r,a,n,s=t.browser.devicePixelRatio>1?"@2x":"",l=t.getJSON(i(t.normalizeSpriteURL(e,s,".json"),t.ResourceType.SpriteJSON),function(t,e){l=null,n||(n=t,r=e,u());}),c=t.getImage(i(t.normalizeSpriteURL(e,s,".png"),t.ResourceType.SpriteImage),function(t,e){c=null,n||(n=t,a=e,u());});function u(){if(n)o(n);else if(r&&a){var e=t.browser.getImageData(a),i={};for(var s in r){var l=r[s],c=l.width,u=l.height,h=l.x,p=l.y,d=l.sdf,_=l.pixelRatio,f=new t.RGBAImage({width:c,height:u});t.RGBAImage.copy(e,f,{x:h,y:p},{x:0,y:0},{width:c,height:u}),i[s]={data:f,pixelRatio:_,sdf:d};}o(null,i);}}return {cancel:function(){l&&(l.cancel(),l=null),c&&(c.cancel(),c=null);}}}(e.sprite,this.map._transformRequest,function(e,i){if(o._spriteRequest=null,e)o.fire(new t.ErrorEvent(e));else if(i)for(var r in i)o.imageManager.addImage(r,i[r]);o.imageManager.setLoaded(!0),o.fire(new t.Event("data",{dataType:"style"}));}):this.imageManager.setLoaded(!0),this.glyphManager.setURL(e.glyphs);var a=kt(this.stylesheet.layers);this._order=a.map(function(t){return t.id}),this._layers={};for(var n=0,s=a;n<s.length;n+=1){var l=s[n];(l=t.createStyleLayer(l)).setEventedParent(o,{layer:{id:l.id}}),o._layers[l.id]=l;}this.dispatcher.broadcast("setLayers",this._serializeLayers(this._order)),this.light=new x(this.stylesheet.light),this.fire(new t.Event("data",{dataType:"style"})),this.fire(new t.Event("style.load"));}},i.prototype._validateLayer=function(e){var i=this.sourceCaches[e.source];if(i){var o=e.sourceLayer;if(o){var r=i.getSource();("geojson"===r.type||r.vectorLayerIds&&-1===r.vectorLayerIds.indexOf(o))&&this.fire(new t.ErrorEvent(new Error('Source layer "'+o+'" does not exist on source "'+r.id+'" as specified by style layer "'+e.id+'"')));}}},i.prototype.loaded=function(){if(!this._loaded)return !1;if(Object.keys(this._updatedSources).length)return !1;for(var t in this.sourceCaches)if(!this.sourceCaches[t].loaded())return !1;return !!this.imageManager.isLoaded()},i.prototype._serializeLayers=function(t){for(var e=[],i=0,o=t;i<o.length;i+=1){var r=o[i],a=this._layers[r];"custom"!==a.type&&e.push(a.serialize());}return e},i.prototype.hasTransitions=function(){if(this.light&&this.light.hasTransition())return !0;for(var t in this.sourceCaches)if(this.sourceCaches[t].hasTransition())return !0;for(var e in this._layers)if(this._layers[e].hasTransition())return !0;return !1},i.prototype._checkLoaded=function(){if(!this._loaded)throw new Error("Style is not done loading")},i.prototype.update=function(e){if(this._loaded){var i=this._changed;if(this._changed){var o=Object.keys(this._updatedLayers),r=Object.keys(this._removedLayers);for(var a in(o.length||r.length)&&this._updateWorkerLayers(o,r),this._updatedSources){var n=this._updatedSources[a];"reload"===n?this._reloadSource(a):"clear"===n&&this._clearSource(a);}for(var s in this._updatedPaintProps)this._layers[s].updateTransitions(e);this.light.updateTransitions(e),this._resetUpdates();}for(var l in this.sourceCaches)this.sourceCaches[l].used=!1;for(var c=0,u=this._order;c<u.length;c+=1){var h=u[c],p=this._layers[h];p.recalculate(e),!p.isHidden(e.zoom)&&p.source&&(this.sourceCaches[p.source].used=!0);}this.light.recalculate(e),this.z=e.zoom,i&&this.fire(new t.Event("data",{dataType:"style"}));}},i.prototype._updateWorkerLayers=function(t,e){this.dispatcher.broadcast("updateLayers",{layers:this._serializeLayers(t),removedIds:e});},i.prototype._resetUpdates=function(){this._changed=!1,this._updatedLayers={},this._removedLayers={},this._updatedSources={},this._updatedPaintProps={};},i.prototype.setState=function(e){var i=this;if(this._checkLoaded(),De(this,t.validateStyle(e)))return !1;(e=t.clone(e)).layers=kt(e.layers);var o=qt(this.serialize(),e).filter(function(t){return !(t.command in Me)});if(0===o.length)return !1;var r=o.filter(function(t){return !(t.command in Re)});if(r.length>0)throw new Error("Unimplemented: "+r.map(function(t){return t.command}).join(", ")+".");return o.forEach(function(t){"setTransition"!==t.command&&i[t.command].apply(i,t.args);}),this.stylesheet=e,!0},i.prototype.addImage=function(e,i){if(this.getImage(e))return this.fire(new t.ErrorEvent(new Error("An image with this name already exists.")));this.imageManager.addImage(e,i),this.fire(new t.Event("data",{dataType:"style"}));},i.prototype.getImage=function(t){return this.imageManager.getImage(t)},i.prototype.removeImage=function(e){if(!this.getImage(e))return this.fire(new t.ErrorEvent(new Error("No image with this name exists.")));this.imageManager.removeImage(e),this.fire(new t.Event("data",{dataType:"style"}));},i.prototype.listImages=function(){return this._checkLoaded(),this.imageManager.listImages()},i.prototype.addSource=function(e,i,o){var r=this;if(void 0===o&&(o={}),this._checkLoaded(),void 0!==this.sourceCaches[e])throw new Error("There is already a source with this ID");if(!i.type)throw new Error("The type property must be defined, but the only the following properties were given: "+Object.keys(i).join(", ")+".");if(!(["vector","raster","geojson","video","image"].indexOf(i.type)>=0)||!this._validate(t.validateStyle.source,"sources."+e,i,null,o)){this.map&&this.map._collectResourceTiming&&(i.collectResourceTiming=!0);var a=this.sourceCaches[e]=new St(e,i,this.dispatcher);a.style=this,a.setEventedParent(this,function(){return {isSourceLoaded:r.loaded(),source:a.serialize(),sourceId:e}}),a.onAdd(this.map),this._changed=!0;}},i.prototype.removeSource=function(e){if(this._checkLoaded(),void 0===this.sourceCaches[e])throw new Error("There is no source with this ID");for(var i in this._layers)if(this._layers[i].source===e)return this.fire(new t.ErrorEvent(new Error('Source "'+e+'" cannot be removed while layer "'+i+'" is using it.')));var o=this.sourceCaches[e];delete this.sourceCaches[e],delete this._updatedSources[e],o.fire(new t.Event("data",{sourceDataType:"metadata",dataType:"source",sourceId:e})),o.setEventedParent(null),o.clearTiles(),o.onRemove&&o.onRemove(this.map),this._changed=!0;},i.prototype.setGeoJSONSourceData=function(t,e){this._checkLoaded(),this.sourceCaches[t].getSource().setData(e),this._changed=!0;},i.prototype.getSource=function(t){return this.sourceCaches[t]&&this.sourceCaches[t].getSource()},i.prototype.addLayer=function(e,i,o){void 0===o&&(o={}),this._checkLoaded();var r=e.id;if(this.getLayer(r))this.fire(new t.ErrorEvent(new Error('Layer with id "'+r+'" already exists on this map')));else{var a;if("custom"===e.type){if(De(this,t.validateCustomStyleLayer(e)))return;a=t.createStyleLayer(e);}else{if("object"==typeof e.source&&(this.addSource(r,e.source),e=t.clone(e),e=t.extend(e,{source:r})),this._validate(t.validateStyle.layer,"layers."+r,e,{arrayIndex:-1},o))return;a=t.createStyleLayer(e),this._validateLayer(a),a.setEventedParent(this,{layer:{id:r}});}var n=i?this._order.indexOf(i):this._order.length;if(i&&-1===n)this.fire(new t.ErrorEvent(new Error('Layer with id "'+i+'" does not exist on this map.')));else{if(this._order.splice(n,0,r),this._layerOrderChanged=!0,this._layers[r]=a,this._removedLayers[r]&&a.source&&"custom"!==a.type){var s=this._removedLayers[r];delete this._removedLayers[r],s.type!==a.type?this._updatedSources[a.source]="clear":(this._updatedSources[a.source]="reload",this.sourceCaches[a.source].pause());}this._updateLayer(a),a.onAdd&&a.onAdd(this.map);}}},i.prototype.moveLayer=function(e,i){if(this._checkLoaded(),this._changed=!0,this._layers[e]){if(e!==i){var o=this._order.indexOf(e);this._order.splice(o,1);var r=i?this._order.indexOf(i):this._order.length;i&&-1===r?this.fire(new t.ErrorEvent(new Error('Layer with id "'+i+'" does not exist on this map.'))):(this._order.splice(r,0,e),this._layerOrderChanged=!0);}}else this.fire(new t.ErrorEvent(new Error("The layer '"+e+"' does not exist in the map's style and cannot be moved.")));},i.prototype.removeLayer=function(e){this._checkLoaded();var i=this._layers[e];if(i){i.setEventedParent(null);var o=this._order.indexOf(e);this._order.splice(o,1),this._layerOrderChanged=!0,this._changed=!0,this._removedLayers[e]=i,delete this._layers[e],delete this._updatedLayers[e],delete this._updatedPaintProps[e],i.onRemove&&i.onRemove(this.map);}else this.fire(new t.ErrorEvent(new Error("The layer '"+e+"' does not exist in the map's style and cannot be removed.")));},i.prototype.getLayer=function(t){return this._layers[t]},i.prototype.setLayerZoomRange=function(e,i,o){this._checkLoaded();var r=this.getLayer(e);r?r.minzoom===i&&r.maxzoom===o||(null!=i&&(r.minzoom=i),null!=o&&(r.maxzoom=o),this._updateLayer(r)):this.fire(new t.ErrorEvent(new Error("The layer '"+e+"' does not exist in the map's style and cannot have zoom extent.")));},i.prototype.setFilter=function(e,i,o){void 0===o&&(o={}),this._checkLoaded();var r=this.getLayer(e);if(r){if(!t.isEqual(r.filter,i))return null==i?(r.filter=void 0,void this._updateLayer(r)):void(this._validate(t.validateStyle.filter,"layers."+r.id+".filter",i,null,o)||(r.filter=t.clone(i),this._updateLayer(r)))}else this.fire(new t.ErrorEvent(new Error("The layer '"+e+"' does not exist in the map's style and cannot be filtered.")));},i.prototype.getFilter=function(e){return t.clone(this.getLayer(e).filter)},i.prototype.setLayoutProperty=function(e,i,o,r){void 0===r&&(r={}),this._checkLoaded();var a=this.getLayer(e);a?t.isEqual(a.getLayoutProperty(i),o)||(a.setLayoutProperty(i,o,r),this._updateLayer(a)):this.fire(new t.ErrorEvent(new Error("The layer '"+e+"' does not exist in the map's style and cannot be styled.")));},i.prototype.getLayoutProperty=function(e,i){var o=this.getLayer(e);if(o)return o.getLayoutProperty(i);this.fire(new t.ErrorEvent(new Error("The layer '"+e+"' does not exist in the map's style.")));},i.prototype.setPaintProperty=function(e,i,o,r){void 0===r&&(r={}),this._checkLoaded();var a=this.getLayer(e);a?t.isEqual(a.getPaintProperty(i),o)||(a.setPaintProperty(i,o,r)&&this._updateLayer(a),this._changed=!0,this._updatedPaintProps[e]=!0):this.fire(new t.ErrorEvent(new Error("The layer '"+e+"' does not exist in the map's style and cannot be styled.")));},i.prototype.getPaintProperty=function(t,e){return this.getLayer(t).getPaintProperty(e)},i.prototype.setFeatureState=function(e,i){this._checkLoaded();var o=e.source,r=e.sourceLayer,a=this.sourceCaches[o],n=parseInt(e.id,10);void 0!==a?"vector"!==a.getSource().type||r?isNaN(n)||n<0?this.fire(new t.ErrorEvent(new Error("The feature id parameter must be provided and non-negative."))):a.setFeatureState(r,n,i):this.fire(new t.ErrorEvent(new Error("The sourceLayer parameter must be provided for vector source types."))):this.fire(new t.ErrorEvent(new Error("The source '"+o+"' does not exist in the map's style.")));},i.prototype.getFeatureState=function(e){this._checkLoaded();var i=e.source,o=e.sourceLayer,r=this.sourceCaches[i],a=parseInt(e.id,10);if(void 0!==r)if("vector"!==r.getSource().type||o){if(!(isNaN(a)||a<0))return r.getFeatureState(o,a);this.fire(new t.ErrorEvent(new Error("The feature id parameter must be provided and non-negative.")));}else this.fire(new t.ErrorEvent(new Error("The sourceLayer parameter must be provided for vector source types.")));else this.fire(new t.ErrorEvent(new Error("The source '"+i+"' does not exist in the map's style.")));},i.prototype.getTransition=function(){return t.extend({duration:300,delay:0},this.stylesheet&&this.stylesheet.transition)},i.prototype.serialize=function(){return t.filterObject({version:this.stylesheet.version,name:this.stylesheet.name,metadata:this.stylesheet.metadata,light:this.stylesheet.light,center:this.stylesheet.center,zoom:this.stylesheet.zoom,bearing:this.stylesheet.bearing,pitch:this.stylesheet.pitch,sprite:this.stylesheet.sprite,glyphs:this.stylesheet.glyphs,transition:this.stylesheet.transition,sources:t.mapObject(this.sourceCaches,function(t){return t.serialize()}),layers:this._serializeLayers(this._order)},function(t){return void 0!==t})},i.prototype._updateLayer=function(t){this._updatedLayers[t.id]=!0,t.source&&!this._updatedSources[t.source]&&(this._updatedSources[t.source]="reload",this.sourceCaches[t.source].pause()),this._changed=!0;},i.prototype._flattenRenderedFeatures=function(t){for(var e=[],i=this._order.length-1;i>=0;i--)for(var o=this._order[i],r=0,a=t;r<a.length;r+=1){var n=a[r][o];if(n)for(var s=0,l=n;s<l.length;s+=1){var c=l[s];e.push(c);}}return e},i.prototype.queryRenderedFeatures=function(e,i,o){i&&i.filter&&this._validate(t.validateStyle.filter,"queryRenderedFeatures.filter",i.filter);var r={};if(i&&i.layers){if(!Array.isArray(i.layers))return this.fire(new t.ErrorEvent(new Error("parameters.layers must be an Array."))),[];for(var a=0,n=i.layers;a<n.length;a+=1){var s=n[a],l=this._layers[s];if(!l)return this.fire(new t.ErrorEvent(new Error("The layer '"+s+"' does not exist in the map's style and cannot be queried for features."))),[];r[l.source]=!0;}}var c=[],u=e.map(function(t){return o.pointCoordinate(t)});for(var h in this.sourceCaches)i.layers&&!r[h]||c.push(A(this.sourceCaches[h],this._layers,u,i,o));return this.placement&&c.push(function(t,e,i,o,r,a){for(var n={},s=r.queryRenderedSymbols(i),l=[],c=0,u=Object.keys(s).map(Number);c<u.length;c+=1){var h=u[c];l.push(a[h]);}l.sort(k);for(var p=function(){var e=_[d],i=e.featureIndex.lookupSymbolFeatures(s[e.bucketInstanceId],e.bucketIndex,e.sourceLayerIndex,o.filter,o.layers,t);for(var r in i){var a=n[r]=n[r]||[],l=i[r];l.sort(function(t,i){var o=e.featureSortOrder;if(o){var r=o.indexOf(t.featureIndex);return o.indexOf(i.featureIndex)-r}return i.featureIndex-t.featureIndex});for(var c=0,u=l;c<u.length;c+=1){var h=u[c];a.push(h.feature);}}},d=0,_=l;d<_.length;d+=1)p();var f=function(i){n[i].forEach(function(o){var r=t[i],a=e[r.source].getFeatureState(o.layer["source-layer"],o.id);o.source=o.layer.source,o.layer["source-layer"]&&(o.sourceLayer=o.layer["source-layer"]),o.state=a;});};for(var m in n)f(m);return n}(this._layers,this.sourceCaches,e,i,this.placement.collisionIndex,this.placement.retainedQueryData)),this._flattenRenderedFeatures(c)},i.prototype.querySourceFeatures=function(e,i){i&&i.filter&&this._validate(t.validateStyle.filter,"querySourceFeatures.filter",i.filter);var o=this.sourceCaches[e];return o?function(t,e){for(var i=t.getRenderableIds().map(function(e){return t.getTileByID(e)}),o=[],r={},a=0;a<i.length;a++){var n=i[a],s=n.tileID.canonical.key;r[s]||(r[s]=!0,n.querySourceFeatures(o,e));}return o}(o,i):[]},i.prototype.addSourceType=function(t,e,o){return i.getSourceType(t)?o(new Error('A source type called "'+t+'" already exists.')):(i.setSourceType(t,e),e.workerSourceURL?void this.dispatcher.broadcast("loadWorkerSource",{name:t,url:e.workerSourceURL},o):o(null,null))},i.prototype.getLight=function(){return this.light.getLight()},i.prototype.setLight=function(e,i){void 0===i&&(i={}),this._checkLoaded();var o=this.light.getLight(),r=!1;for(var a in e)if(!t.isEqual(e[a],o[a])){r=!0;break}if(r){var n={now:t.browser.now(),transition:t.extend({duration:300,delay:0},this.stylesheet.transition)};this.light.setLight(e,i),this.light.updateTransitions(n);}},i.prototype._validate=function(e,i,o,r,a){return void 0===a&&(a={}),(!a||!1!==a.validate)&&De(this,e.call(t.validateStyle,t.extend({key:i,style:this.serialize(),value:o,styleSpec:t.styleSpec},r)))},i.prototype._remove=function(){for(var e in this._request&&(this._request.cancel(),this._request=null),this._spriteRequest&&(this._spriteRequest.cancel(),this._spriteRequest=null),t.evented.off("pluginAvailable",this._rtlTextPluginCallback),this.sourceCaches)this.sourceCaches[e].clearTiles();this.dispatcher.remove();},i.prototype._clearSource=function(t){this.sourceCaches[t].clearTiles();},i.prototype._reloadSource=function(t){this.sourceCaches[t].resume(),this.sourceCaches[t].reload();},i.prototype._updateSources=function(t){for(var e in this.sourceCaches)this.sourceCaches[e].update(t);},i.prototype._generateCollisionBoxes=function(){for(var t in this.sourceCaches)this._reloadSource(t);},i.prototype._updatePlacement=function(e,i,o,r){for(var a=!1,n=!1,s={},l=0,c=this._order;l<c.length;l+=1){var u=c[l],h=this._layers[u];if("symbol"===h.type){if(!s[h.source]){var p=this.sourceCaches[h.source];s[h.source]=p.getRenderableIds(!0).map(function(t){return p.getTileByID(t)}).sort(function(t,e){return e.tileID.overscaledZ-t.tileID.overscaledZ||(t.tileID.isLessThan(e.tileID)?-1:1)});}var d=this.crossTileSymbolIndex.addLayer(h,s[h.source],e.center.lng);a=a||d;}}this.crossTileSymbolIndex.pruneUnusedLayers(this._order);var _=this._layerOrderChanged||0===o;if((_||!this.pauseablePlacement||this.pauseablePlacement.isDone()&&!this.placement.stillRecent(t.browser.now()))&&(this.pauseablePlacement=new Ie(e,this._order,_,i,o,r),this._layerOrderChanged=!1),this.pauseablePlacement.isDone()?this.placement.setStale():(this.pauseablePlacement.continuePlacement(this._order,this._layers,s),this.pauseablePlacement.isDone()&&(this.placement=this.pauseablePlacement.commit(this.placement,t.browser.now()),n=!0),a&&this.pauseablePlacement.placement.setStale()),n||a)for(var f=0,m=this._order;f<m.length;f+=1){var g=m[f],v=this._layers[g];"symbol"===v.type&&this.placement.updateLayerOpacities(v,s[v.source]);}return !this.pauseablePlacement.isDone()||this.placement.hasTransitions(t.browser.now())},i.prototype._releaseSymbolFadeTiles=function(){for(var t in this.sourceCaches)this.sourceCaches[t].releaseSymbolFadeTiles();},i.prototype.getImages=function(t,e,i){this.imageManager.getImages(e.icons,i);},i.prototype.getGlyphs=function(t,e,i){this.glyphManager.getGlyphs(e.stacks,i);},i}(t.Evented);Ae.getSourceType=function(t){return R[t]},Ae.setSourceType=function(t,e){R[t]=e;},Ae.registerForPluginAvailability=t.registerForPluginAvailability;var ke=t.createLayout([{name:"a_pos",type:"Int16",components:2}]),Be=li("#ifdef GL_ES\nprecision mediump float;\n#else\n#if !defined(lowp)\n#define lowp\n#endif\n#if !defined(mediump)\n#define mediump\n#endif\n#if !defined(highp)\n#define highp\n#endif\n#endif","#ifdef GL_ES\nprecision highp float;\n#else\n#if !defined(lowp)\n#define lowp\n#endif\n#if !defined(mediump)\n#define mediump\n#endif\n#if !defined(highp)\n#define highp\n#endif\n#endif\nvec2 unpack_float(const float packedValue) {int packedIntValue=int(packedValue);int v0=packedIntValue/256;return vec2(v0,packedIntValue-v0*256);}vec2 unpack_opacity(const float packedOpacity) {int intOpacity=int(packedOpacity)/2;return vec2(float(intOpacity)/127.0,mod(packedOpacity,2.0));}vec4 decode_color(const vec2 encodedColor) {return vec4(unpack_float(encodedColor[0])/255.0,unpack_float(encodedColor[1])/255.0\n);}float unpack_mix_vec2(const vec2 packedValue,const float t) {return mix(packedValue[0],packedValue[1],t);}vec4 unpack_mix_color(const vec4 packedColors,const float t) {vec4 minColor=decode_color(vec2(packedColors[0],packedColors[1]));vec4 maxColor=decode_color(vec2(packedColors[2],packedColors[3]));return mix(minColor,maxColor,t);}vec2 get_pattern_pos(const vec2 pixel_coord_upper,const vec2 pixel_coord_lower,const vec2 pattern_size,const float tile_units_to_pixels,const vec2 pos) {vec2 offset=mod(mod(mod(pixel_coord_upper,pattern_size)*256.0,pattern_size)*256.0+pixel_coord_lower,pattern_size);return (tile_units_to_pixels*pos+offset)/pattern_size;}"),Oe=li("uniform vec4 u_color;uniform float u_opacity;void main() {gl_FragColor=u_color*u_opacity;\n#ifdef OVERDRAW_INSPECTOR\ngl_FragColor=vec4(1.0);\n#endif\n}","attribute vec2 a_pos;uniform mat4 u_matrix;void main() {gl_Position=u_matrix*vec4(a_pos,0,1);}"),Fe=li("uniform vec2 u_pattern_tl_a;uniform vec2 u_pattern_br_a;uniform vec2 u_pattern_tl_b;uniform vec2 u_pattern_br_b;uniform vec2 u_texsize;uniform float u_mix;uniform float u_opacity;uniform sampler2D u_image;varying vec2 v_pos_a;varying vec2 v_pos_b;void main() {vec2 imagecoord=mod(v_pos_a,1.0);vec2 pos=mix(u_pattern_tl_a/u_texsize,u_pattern_br_a/u_texsize,imagecoord);vec4 color1=texture2D(u_image,pos);vec2 imagecoord_b=mod(v_pos_b,1.0);vec2 pos2=mix(u_pattern_tl_b/u_texsize,u_pattern_br_b/u_texsize,imagecoord_b);vec4 color2=texture2D(u_image,pos2);gl_FragColor=mix(color1,color2,u_mix)*u_opacity;\n#ifdef OVERDRAW_INSPECTOR\ngl_FragColor=vec4(1.0);\n#endif\n}","uniform mat4 u_matrix;uniform vec2 u_pattern_size_a;uniform vec2 u_pattern_size_b;uniform vec2 u_pixel_coord_upper;uniform vec2 u_pixel_coord_lower;uniform float u_scale_a;uniform float u_scale_b;uniform float u_tile_units_to_pixels;attribute vec2 a_pos;varying vec2 v_pos_a;varying vec2 v_pos_b;void main() {gl_Position=u_matrix*vec4(a_pos,0,1);v_pos_a=get_pattern_pos(u_pixel_coord_upper,u_pixel_coord_lower,u_scale_a*u_pattern_size_a,u_tile_units_to_pixels,a_pos);v_pos_b=get_pattern_pos(u_pixel_coord_upper,u_pixel_coord_lower,u_scale_b*u_pattern_size_b,u_tile_units_to_pixels,a_pos);}"),Ue=li("#pragma mapbox: define highp vec4 color\n#pragma mapbox: define mediump float radius\n#pragma mapbox: define lowp float blur\n#pragma mapbox: define lowp float opacity\n#pragma mapbox: define highp vec4 stroke_color\n#pragma mapbox: define mediump float stroke_width\n#pragma mapbox: define lowp float stroke_opacity\nvarying vec3 v_data;void main() {\n#pragma mapbox: initialize highp vec4 color\n#pragma mapbox: initialize mediump float radius\n#pragma mapbox: initialize lowp float blur\n#pragma mapbox: initialize lowp float opacity\n#pragma mapbox: initialize highp vec4 stroke_color\n#pragma mapbox: initialize mediump float stroke_width\n#pragma mapbox: initialize lowp float stroke_opacity\nvec2 extrude=v_data.xy;float extrude_length=length(extrude);lowp float antialiasblur=v_data.z;float antialiased_blur=-max(blur,antialiasblur);float opacity_t=smoothstep(0.0,antialiased_blur,extrude_length-1.0);float color_t=stroke_width < 0.01 ? 0.0 : smoothstep(antialiased_blur,0.0,extrude_length-radius/(radius+stroke_width));gl_FragColor=opacity_t*mix(color*opacity,stroke_color*stroke_opacity,color_t);\n#ifdef OVERDRAW_INSPECTOR\ngl_FragColor=vec4(1.0);\n#endif\n}","uniform mat4 u_matrix;uniform bool u_scale_with_map;uniform bool u_pitch_with_map;uniform vec2 u_extrude_scale;uniform highp float u_camera_to_center_distance;attribute vec2 a_pos;\n#pragma mapbox: define highp vec4 color\n#pragma mapbox: define mediump float radius\n#pragma mapbox: define lowp float blur\n#pragma mapbox: define lowp float opacity\n#pragma mapbox: define highp vec4 stroke_color\n#pragma mapbox: define mediump float stroke_width\n#pragma mapbox: define lowp float stroke_opacity\nvarying vec3 v_data;void main(void) {\n#pragma mapbox: initialize highp vec4 color\n#pragma mapbox: initialize mediump float radius\n#pragma mapbox: initialize lowp float blur\n#pragma mapbox: initialize lowp float opacity\n#pragma mapbox: initialize highp vec4 stroke_color\n#pragma mapbox: initialize mediump float stroke_width\n#pragma mapbox: initialize lowp float stroke_opacity\nvec2 extrude=vec2(mod(a_pos,2.0)*2.0-1.0);vec2 circle_center=floor(a_pos*0.5);if (u_pitch_with_map) {vec2 corner_position=circle_center;if (u_scale_with_map) {corner_position+=extrude*(radius+stroke_width)*u_extrude_scale;} else {vec4 projected_center=u_matrix*vec4(circle_center,0,1);corner_position+=extrude*(radius+stroke_width)*u_extrude_scale*(projected_center.w/u_camera_to_center_distance);}gl_Position=u_matrix*vec4(corner_position,0,1);} else {gl_Position=u_matrix*vec4(circle_center,0,1);if (u_scale_with_map) {gl_Position.xy+=extrude*(radius+stroke_width)*u_extrude_scale*u_camera_to_center_distance;} else {gl_Position.xy+=extrude*(radius+stroke_width)*u_extrude_scale*gl_Position.w;}}lowp float antialiasblur=1.0/DEVICE_PIXEL_RATIO/(radius+stroke_width);v_data=vec3(extrude.x,extrude.y,antialiasblur);}"),Ne=li("void main() {gl_FragColor=vec4(1.0);}","attribute vec2 a_pos;uniform mat4 u_matrix;void main() {gl_Position=u_matrix*vec4(a_pos,0,1);}"),Ze=li("#pragma mapbox: define highp float weight\nuniform highp float u_intensity;varying vec2 v_extrude;\n#define GAUSS_COEF 0.3989422804014327\nvoid main() {\n#pragma mapbox: initialize highp float weight\nfloat d=-0.5*3.0*3.0*dot(v_extrude,v_extrude);float val=weight*u_intensity*GAUSS_COEF*exp(d);gl_FragColor=vec4(val,1.0,1.0,1.0);\n#ifdef OVERDRAW_INSPECTOR\ngl_FragColor=vec4(1.0);\n#endif\n}","#pragma mapbox: define highp float weight\n#pragma mapbox: define mediump float radius\nuniform mat4 u_matrix;uniform float u_extrude_scale;uniform float u_opacity;uniform float u_intensity;attribute vec2 a_pos;varying vec2 v_extrude;const highp float ZERO=1.0/255.0/16.0;\n#define GAUSS_COEF 0.3989422804014327\nvoid main(void) {\n#pragma mapbox: initialize highp float weight\n#pragma mapbox: initialize mediump float radius\nvec2 unscaled_extrude=vec2(mod(a_pos,2.0)*2.0-1.0);float S=sqrt(-2.0*log(ZERO/weight/u_intensity/GAUSS_COEF))/3.0;v_extrude=S*unscaled_extrude;vec2 extrude=v_extrude*radius*u_extrude_scale;vec4 pos=vec4(floor(a_pos*0.5)+extrude,0,1);gl_Position=u_matrix*pos;}"),je=li("uniform sampler2D u_image;uniform sampler2D u_color_ramp;uniform float u_opacity;varying vec2 v_pos;void main() {float t=texture2D(u_image,v_pos).r;vec4 color=texture2D(u_color_ramp,vec2(t,0.5));gl_FragColor=color*u_opacity;\n#ifdef OVERDRAW_INSPECTOR\ngl_FragColor=vec4(0.0);\n#endif\n}","uniform mat4 u_matrix;uniform vec2 u_world;attribute vec2 a_pos;varying vec2 v_pos;void main() {gl_Position=u_matrix*vec4(a_pos*u_world,0,1);v_pos.x=a_pos.x;v_pos.y=1.0-a_pos.y;}"),Ve=li("varying float v_placed;varying float v_notUsed;void main() {float alpha=0.5;gl_FragColor=vec4(1.0,0.0,0.0,1.0)*alpha;if (v_placed > 0.5) {gl_FragColor=vec4(0.0,0.0,1.0,0.5)*alpha;}if (v_notUsed > 0.5) {gl_FragColor*=.1;}}","attribute vec2 a_pos;attribute vec2 a_anchor_pos;attribute vec2 a_extrude;attribute vec2 a_placed;uniform mat4 u_matrix;uniform vec2 u_extrude_scale;uniform float u_camera_to_center_distance;varying float v_placed;varying float v_notUsed;void main() {vec4 projectedPoint=u_matrix*vec4(a_anchor_pos,0,1);highp float camera_to_anchor_distance=projectedPoint.w;highp float collision_perspective_ratio=clamp(0.5+0.5*(u_camera_to_center_distance/camera_to_anchor_distance),0.0,4.0);gl_Position=u_matrix*vec4(a_pos,0.0,1.0);gl_Position.xy+=a_extrude*u_extrude_scale*gl_Position.w*collision_perspective_ratio;v_placed=a_placed.x;v_notUsed=a_placed.y;}"),qe=li("uniform float u_overscale_factor;varying float v_placed;varying float v_notUsed;varying float v_radius;varying vec2 v_extrude;varying vec2 v_extrude_scale;void main() {float alpha=0.5;vec4 color=vec4(1.0,0.0,0.0,1.0)*alpha;if (v_placed > 0.5) {color=vec4(0.0,0.0,1.0,0.5)*alpha;}if (v_notUsed > 0.5) {color*=.2;}float extrude_scale_length=length(v_extrude_scale);float extrude_length=length(v_extrude)*extrude_scale_length;float stroke_width=15.0*extrude_scale_length/u_overscale_factor;float radius=v_radius*extrude_scale_length;float distance_to_edge=abs(extrude_length-radius);float opacity_t=smoothstep(-stroke_width,0.0,-distance_to_edge);gl_FragColor=opacity_t*color;}","attribute vec2 a_pos;attribute vec2 a_anchor_pos;attribute vec2 a_extrude;attribute vec2 a_placed;uniform mat4 u_matrix;uniform vec2 u_extrude_scale;uniform float u_camera_to_center_distance;varying float v_placed;varying float v_notUsed;varying float v_radius;varying vec2 v_extrude;varying vec2 v_extrude_scale;void main() {vec4 projectedPoint=u_matrix*vec4(a_anchor_pos,0,1);highp float camera_to_anchor_distance=projectedPoint.w;highp float collision_perspective_ratio=clamp(0.5+0.5*(u_camera_to_center_distance/camera_to_anchor_distance),0.0,4.0);gl_Position=u_matrix*vec4(a_pos,0.0,1.0);highp float padding_factor=1.2;gl_Position.xy+=a_extrude*u_extrude_scale*padding_factor*gl_Position.w*collision_perspective_ratio;v_placed=a_placed.x;v_notUsed=a_placed.y;v_radius=abs(a_extrude.y);v_extrude=a_extrude*padding_factor;v_extrude_scale=u_extrude_scale*u_camera_to_center_distance*collision_perspective_ratio;}"),Ge=li("uniform highp vec4 u_color;void main() {gl_FragColor=u_color;}","attribute vec2 a_pos;uniform mat4 u_matrix;void main() {gl_Position=u_matrix*vec4(a_pos,0,1);}"),We=li("#pragma mapbox: define highp vec4 color\n#pragma mapbox: define lowp float opacity\nvoid main() {\n#pragma mapbox: initialize highp vec4 color\n#pragma mapbox: initialize lowp float opacity\ngl_FragColor=color*opacity;\n#ifdef OVERDRAW_INSPECTOR\ngl_FragColor=vec4(1.0);\n#endif\n}","attribute vec2 a_pos;uniform mat4 u_matrix;\n#pragma mapbox: define highp vec4 color\n#pragma mapbox: define lowp float opacity\nvoid main() {\n#pragma mapbox: initialize highp vec4 color\n#pragma mapbox: initialize lowp float opacity\ngl_Position=u_matrix*vec4(a_pos,0,1);}"),Xe=li("#pragma mapbox: define highp vec4 outline_color\n#pragma mapbox: define lowp float opacity\nvarying vec2 v_pos;void main() {\n#pragma mapbox: initialize highp vec4 outline_color\n#pragma mapbox: initialize lowp float opacity\nfloat dist=length(v_pos-gl_FragCoord.xy);float alpha=1.0-smoothstep(0.0,1.0,dist);gl_FragColor=outline_color*(alpha*opacity);\n#ifdef OVERDRAW_INSPECTOR\ngl_FragColor=vec4(1.0);\n#endif\n}","attribute vec2 a_pos;uniform mat4 u_matrix;uniform vec2 u_world;varying vec2 v_pos;\n#pragma mapbox: define highp vec4 outline_color\n#pragma mapbox: define lowp float opacity\nvoid main() {\n#pragma mapbox: initialize highp vec4 outline_color\n#pragma mapbox: initialize lowp float opacity\ngl_Position=u_matrix*vec4(a_pos,0,1);v_pos=(gl_Position.xy/gl_Position.w+1.0)/2.0*u_world;}"),He=li("uniform vec2 u_texsize;uniform sampler2D u_image;uniform float u_fade;varying vec2 v_pos_a;varying vec2 v_pos_b;varying vec2 v_pos;\n#pragma mapbox: define lowp float opacity\n#pragma mapbox: define lowp vec4 pattern_from\n#pragma mapbox: define lowp vec4 pattern_to\nvoid main() {\n#pragma mapbox: initialize lowp float opacity\n#pragma mapbox: initialize mediump vec4 pattern_from\n#pragma mapbox: initialize mediump vec4 pattern_to\nvec2 pattern_tl_a=pattern_from.xy;vec2 pattern_br_a=pattern_from.zw;vec2 pattern_tl_b=pattern_to.xy;vec2 pattern_br_b=pattern_to.zw;vec2 imagecoord=mod(v_pos_a,1.0);vec2 pos=mix(pattern_tl_a/u_texsize,pattern_br_a/u_texsize,imagecoord);vec4 color1=texture2D(u_image,pos);vec2 imagecoord_b=mod(v_pos_b,1.0);vec2 pos2=mix(pattern_tl_b/u_texsize,pattern_br_b/u_texsize,imagecoord_b);vec4 color2=texture2D(u_image,pos2);float dist=length(v_pos-gl_FragCoord.xy);float alpha=1.0-smoothstep(0.0,1.0,dist);gl_FragColor=mix(color1,color2,u_fade)*alpha*opacity;\n#ifdef OVERDRAW_INSPECTOR\ngl_FragColor=vec4(1.0);\n#endif\n}","uniform mat4 u_matrix;uniform vec2 u_world;uniform vec2 u_pixel_coord_upper;uniform vec2 u_pixel_coord_lower;uniform vec4 u_scale;attribute vec2 a_pos;varying vec2 v_pos_a;varying vec2 v_pos_b;varying vec2 v_pos;\n#pragma mapbox: define lowp float opacity\n#pragma mapbox: define lowp vec4 pattern_from\n#pragma mapbox: define lowp vec4 pattern_to\nvoid main() {\n#pragma mapbox: initialize lowp float opacity\n#pragma mapbox: initialize mediump vec4 pattern_from\n#pragma mapbox: initialize mediump vec4 pattern_to\nvec2 pattern_tl_a=pattern_from.xy;vec2 pattern_br_a=pattern_from.zw;vec2 pattern_tl_b=pattern_to.xy;vec2 pattern_br_b=pattern_to.zw;float pixelRatio=u_scale.x;float tileRatio=u_scale.y;float fromScale=u_scale.z;float toScale=u_scale.w;gl_Position=u_matrix*vec4(a_pos,0,1);vec2 display_size_a=vec2((pattern_br_a.x-pattern_tl_a.x)/pixelRatio,(pattern_br_a.y-pattern_tl_a.y)/pixelRatio);vec2 display_size_b=vec2((pattern_br_b.x-pattern_tl_b.x)/pixelRatio,(pattern_br_b.y-pattern_tl_b.y)/pixelRatio);v_pos_a=get_pattern_pos(u_pixel_coord_upper,u_pixel_coord_lower,fromScale*display_size_a,tileRatio,a_pos);v_pos_b=get_pattern_pos(u_pixel_coord_upper,u_pixel_coord_lower,toScale*display_size_b,tileRatio,a_pos);v_pos=(gl_Position.xy/gl_Position.w+1.0)/2.0*u_world;}"),Ke=li("uniform vec2 u_texsize;uniform float u_fade;uniform sampler2D u_image;varying vec2 v_pos_a;varying vec2 v_pos_b;\n#pragma mapbox: define lowp float opacity\n#pragma mapbox: define lowp vec4 pattern_from\n#pragma mapbox: define lowp vec4 pattern_to\nvoid main() {\n#pragma mapbox: initialize lowp float opacity\n#pragma mapbox: initialize mediump vec4 pattern_from\n#pragma mapbox: initialize mediump vec4 pattern_to\nvec2 pattern_tl_a=pattern_from.xy;vec2 pattern_br_a=pattern_from.zw;vec2 pattern_tl_b=pattern_to.xy;vec2 pattern_br_b=pattern_to.zw;vec2 imagecoord=mod(v_pos_a,1.0);vec2 pos=mix(pattern_tl_a/u_texsize,pattern_br_a/u_texsize,imagecoord);vec4 color1=texture2D(u_image,pos);vec2 imagecoord_b=mod(v_pos_b,1.0);vec2 pos2=mix(pattern_tl_b/u_texsize,pattern_br_b/u_texsize,imagecoord_b);vec4 color2=texture2D(u_image,pos2);gl_FragColor=mix(color1,color2,u_fade)*opacity;\n#ifdef OVERDRAW_INSPECTOR\ngl_FragColor=vec4(1.0);\n#endif\n}","uniform mat4 u_matrix;uniform vec2 u_pixel_coord_upper;uniform vec2 u_pixel_coord_lower;uniform vec4 u_scale;attribute vec2 a_pos;varying vec2 v_pos_a;varying vec2 v_pos_b;\n#pragma mapbox: define lowp float opacity\n#pragma mapbox: define lowp vec4 pattern_from\n#pragma mapbox: define lowp vec4 pattern_to\nvoid main() {\n#pragma mapbox: initialize lowp float opacity\n#pragma mapbox: initialize mediump vec4 pattern_from\n#pragma mapbox: initialize mediump vec4 pattern_to\nvec2 pattern_tl_a=pattern_from.xy;vec2 pattern_br_a=pattern_from.zw;vec2 pattern_tl_b=pattern_to.xy;vec2 pattern_br_b=pattern_to.zw;float pixelRatio=u_scale.x;float tileZoomRatio=u_scale.y;float fromScale=u_scale.z;float toScale=u_scale.w;vec2 display_size_a=vec2((pattern_br_a.x-pattern_tl_a.x)/pixelRatio,(pattern_br_a.y-pattern_tl_a.y)/pixelRatio);vec2 display_size_b=vec2((pattern_br_b.x-pattern_tl_b.x)/pixelRatio,(pattern_br_b.y-pattern_tl_b.y)/pixelRatio);gl_Position=u_matrix*vec4(a_pos,0,1);v_pos_a=get_pattern_pos(u_pixel_coord_upper,u_pixel_coord_lower,fromScale*display_size_a,tileZoomRatio,a_pos);v_pos_b=get_pattern_pos(u_pixel_coord_upper,u_pixel_coord_lower,toScale*display_size_b,tileZoomRatio,a_pos);}"),Ye=li("varying vec4 v_color;void main() {gl_FragColor=v_color;\n#ifdef OVERDRAW_INSPECTOR\ngl_FragColor=vec4(1.0);\n#endif\n}","uniform mat4 u_matrix;uniform vec3 u_lightcolor;uniform lowp vec3 u_lightpos;uniform lowp float u_lightintensity;uniform float u_vertical_gradient;attribute vec2 a_pos;attribute vec4 a_normal_ed;varying vec4 v_color;\n#pragma mapbox: define highp float base\n#pragma mapbox: define highp float height\n#pragma mapbox: define highp vec4 color\nvoid main() {\n#pragma mapbox: initialize highp float base\n#pragma mapbox: initialize highp float height\n#pragma mapbox: initialize highp vec4 color\nvec3 normal=a_normal_ed.xyz;base=max(0.0,base);height=max(0.0,height);float t=mod(normal.x,2.0);gl_Position=u_matrix*vec4(a_pos,t > 0.0 ? height : base,1);float colorvalue=color.r*0.2126+color.g*0.7152+color.b*0.0722;v_color=vec4(0.0,0.0,0.0,1.0);vec4 ambientlight=vec4(0.03,0.03,0.03,1.0);color+=ambientlight;float directional=clamp(dot(normal/16384.0,u_lightpos),0.0,1.0);directional=mix((1.0-u_lightintensity),max((1.0-colorvalue+u_lightintensity),1.0),directional);if (normal.y !=0.0) {directional*=((1.0-u_vertical_gradient)+(u_vertical_gradient*clamp((t+base)*pow(height/150.0,0.5),mix(0.7,0.98,1.0-u_lightintensity),1.0)));}v_color.r+=clamp(color.r*directional*u_lightcolor.r,mix(0.0,0.3,1.0-u_lightcolor.r),1.0);v_color.g+=clamp(color.g*directional*u_lightcolor.g,mix(0.0,0.3,1.0-u_lightcolor.g),1.0);v_color.b+=clamp(color.b*directional*u_lightcolor.b,mix(0.0,0.3,1.0-u_lightcolor.b),1.0);}"),Je=li("uniform vec2 u_texsize;uniform float u_fade;uniform sampler2D u_image;varying vec2 v_pos_a;varying vec2 v_pos_b;varying vec4 v_lighting;\n#pragma mapbox: define lowp float base\n#pragma mapbox: define lowp float height\n#pragma mapbox: define lowp vec4 pattern_from\n#pragma mapbox: define lowp vec4 pattern_to\nvoid main() {\n#pragma mapbox: initialize lowp float base\n#pragma mapbox: initialize lowp float height\n#pragma mapbox: initialize mediump vec4 pattern_from\n#pragma mapbox: initialize mediump vec4 pattern_to\nvec2 pattern_tl_a=pattern_from.xy;vec2 pattern_br_a=pattern_from.zw;vec2 pattern_tl_b=pattern_to.xy;vec2 pattern_br_b=pattern_to.zw;vec2 imagecoord=mod(v_pos_a,1.0);vec2 pos=mix(pattern_tl_a/u_texsize,pattern_br_a/u_texsize,imagecoord);vec4 color1=texture2D(u_image,pos);vec2 imagecoord_b=mod(v_pos_b,1.0);vec2 pos2=mix(pattern_tl_b/u_texsize,pattern_br_b/u_texsize,imagecoord_b);vec4 color2=texture2D(u_image,pos2);vec4 mixedColor=mix(color1,color2,u_fade);gl_FragColor=mixedColor*v_lighting;\n#ifdef OVERDRAW_INSPECTOR\ngl_FragColor=vec4(1.0);\n#endif\n}","uniform mat4 u_matrix;uniform vec2 u_pixel_coord_upper;uniform vec2 u_pixel_coord_lower;uniform float u_height_factor;uniform vec4 u_scale;uniform float u_vertical_gradient;uniform vec3 u_lightcolor;uniform lowp vec3 u_lightpos;uniform lowp float u_lightintensity;attribute vec2 a_pos;attribute vec4 a_normal_ed;varying vec2 v_pos_a;varying vec2 v_pos_b;varying vec4 v_lighting;\n#pragma mapbox: define lowp float base\n#pragma mapbox: define lowp float height\n#pragma mapbox: define lowp vec4 pattern_from\n#pragma mapbox: define lowp vec4 pattern_to\nvoid main() {\n#pragma mapbox: initialize lowp float base\n#pragma mapbox: initialize lowp float height\n#pragma mapbox: initialize mediump vec4 pattern_from\n#pragma mapbox: initialize mediump vec4 pattern_to\nvec2 pattern_tl_a=pattern_from.xy;vec2 pattern_br_a=pattern_from.zw;vec2 pattern_tl_b=pattern_to.xy;vec2 pattern_br_b=pattern_to.zw;float pixelRatio=u_scale.x;float tileRatio=u_scale.y;float fromScale=u_scale.z;float toScale=u_scale.w;vec3 normal=a_normal_ed.xyz;float edgedistance=a_normal_ed.w;vec2 display_size_a=vec2((pattern_br_a.x-pattern_tl_a.x)/pixelRatio,(pattern_br_a.y-pattern_tl_a.y)/pixelRatio);vec2 display_size_b=vec2((pattern_br_b.x-pattern_tl_b.x)/pixelRatio,(pattern_br_b.y-pattern_tl_b.y)/pixelRatio);base=max(0.0,base);height=max(0.0,height);float t=mod(normal.x,2.0);float z=t > 0.0 ? height : base;gl_Position=u_matrix*vec4(a_pos,z,1);vec2 pos=normal.x==1.0 && normal.y==0.0 && normal.z==16384.0\n? a_pos\n: vec2(edgedistance,z*u_height_factor);v_pos_a=get_pattern_pos(u_pixel_coord_upper,u_pixel_coord_lower,fromScale*display_size_a,tileRatio,pos);v_pos_b=get_pattern_pos(u_pixel_coord_upper,u_pixel_coord_lower,toScale*display_size_b,tileRatio,pos);v_lighting=vec4(0.0,0.0,0.0,1.0);float directional=clamp(dot(normal/16383.0,u_lightpos),0.0,1.0);directional=mix((1.0-u_lightintensity),max((0.5+u_lightintensity),1.0),directional);if (normal.y !=0.0) {directional*=((1.0-u_vertical_gradient)+(u_vertical_gradient*clamp((t+base)*pow(height/150.0,0.5),mix(0.7,0.98,1.0-u_lightintensity),1.0)));}v_lighting.rgb+=clamp(directional*u_lightcolor,mix(vec3(0.0),vec3(0.3),1.0-u_lightcolor),vec3(1.0));}"),Qe=li("uniform sampler2D u_image;uniform float u_opacity;varying vec2 v_pos;void main() {gl_FragColor=texture2D(u_image,v_pos)*u_opacity;\n#ifdef OVERDRAW_INSPECTOR\ngl_FragColor=vec4(0.0);\n#endif\n}","uniform mat4 u_matrix;uniform vec2 u_world;attribute vec2 a_pos;varying vec2 v_pos;void main() {gl_Position=u_matrix*vec4(a_pos*u_world,0,1);v_pos.x=a_pos.x;v_pos.y=1.0-a_pos.y;}"),$e=li("#ifdef GL_ES\nprecision highp float;\n#endif\nuniform sampler2D u_image;varying vec2 v_pos;uniform vec2 u_dimension;uniform float u_zoom;uniform float u_maxzoom;float getElevation(vec2 coord,float bias) {vec4 data=texture2D(u_image,coord)*255.0;return (data.r+data.g*256.0+data.b*256.0*256.0)/4.0;}void main() {vec2 epsilon=1.0/u_dimension;float a=getElevation(v_pos+vec2(-epsilon.x,-epsilon.y),0.0);float b=getElevation(v_pos+vec2(0,-epsilon.y),0.0);float c=getElevation(v_pos+vec2(epsilon.x,-epsilon.y),0.0);float d=getElevation(v_pos+vec2(-epsilon.x,0),0.0);float e=getElevation(v_pos,0.0);float f=getElevation(v_pos+vec2(epsilon.x,0),0.0);float g=getElevation(v_pos+vec2(-epsilon.x,epsilon.y),0.0);float h=getElevation(v_pos+vec2(0,epsilon.y),0.0);float i=getElevation(v_pos+vec2(epsilon.x,epsilon.y),0.0);float exaggeration=u_zoom < 2.0 ? 0.4 : u_zoom < 4.5 ? 0.35 : 0.3;vec2 deriv=vec2((c+f+f+i)-(a+d+d+g),(g+h+h+i)-(a+b+b+c))/ pow(2.0,(u_zoom-u_maxzoom)*exaggeration+19.2562-u_zoom);gl_FragColor=clamp(vec4(deriv.x/2.0+0.5,deriv.y/2.0+0.5,1.0,1.0),0.0,1.0);\n#ifdef OVERDRAW_INSPECTOR\ngl_FragColor=vec4(1.0);\n#endif\n}","uniform mat4 u_matrix;attribute vec2 a_pos;attribute vec2 a_texture_pos;varying vec2 v_pos;void main() {gl_Position=u_matrix*vec4(a_pos,0,1);v_pos=(a_texture_pos/8192.0)/2.0+0.25;}"),ti=li("uniform sampler2D u_image;varying vec2 v_pos;uniform vec2 u_latrange;uniform vec2 u_light;uniform vec4 u_shadow;uniform vec4 u_highlight;uniform vec4 u_accent;\n#define PI 3.141592653589793\nvoid main() {vec4 pixel=texture2D(u_image,v_pos);vec2 deriv=((pixel.rg*2.0)-1.0);float scaleFactor=cos(radians((u_latrange[0]-u_latrange[1])*(1.0-v_pos.y)+u_latrange[1]));float slope=atan(1.25*length(deriv)/scaleFactor);float aspect=deriv.x !=0.0 ? atan(deriv.y,-deriv.x) : PI/2.0*(deriv.y > 0.0 ? 1.0 :-1.0);float intensity=u_light.x;float azimuth=u_light.y+PI;float base=1.875-intensity*1.75;float maxValue=0.5*PI;float scaledSlope=intensity !=0.5 ? ((pow(base,slope)-1.0)/(pow(base,maxValue)-1.0))*maxValue : slope;float accent=cos(scaledSlope);vec4 accent_color=(1.0-accent)*u_accent*clamp(intensity*2.0,0.0,1.0);float shade=abs(mod((aspect+azimuth)/PI+0.5,2.0)-1.0);vec4 shade_color=mix(u_shadow,u_highlight,shade)*sin(scaledSlope)*clamp(intensity*2.0,0.0,1.0);gl_FragColor=accent_color*(1.0-shade_color.a)+shade_color;\n#ifdef OVERDRAW_INSPECTOR\ngl_FragColor=vec4(1.0);\n#endif\n}","uniform mat4 u_matrix;attribute vec2 a_pos;attribute vec2 a_texture_pos;varying vec2 v_pos;void main() {gl_Position=u_matrix*vec4(a_pos,0,1);v_pos=a_texture_pos/8192.0;}"),ei=li("#pragma mapbox: define highp vec4 color\n#pragma mapbox: define lowp float blur\n#pragma mapbox: define lowp float opacity\nvarying vec2 v_width2;varying vec2 v_normal;varying float v_gamma_scale;void main() {\n#pragma mapbox: initialize highp vec4 color\n#pragma mapbox: initialize lowp float blur\n#pragma mapbox: initialize lowp float opacity\nfloat dist=length(v_normal)*v_width2.s;float blur2=(blur+1.0/DEVICE_PIXEL_RATIO)*v_gamma_scale;float alpha=clamp(min(dist-(v_width2.t-blur2),v_width2.s-dist)/blur2,0.0,1.0);gl_FragColor=color*(alpha*opacity);\n#ifdef OVERDRAW_INSPECTOR\ngl_FragColor=vec4(1.0);\n#endif\n}","\n#define ANTIALIASING 1.0/DEVICE_PIXEL_RATIO/2.0\n#define scale 0.015873016\nattribute vec4 a_pos_normal;attribute vec4 a_data;uniform mat4 u_matrix;uniform mediump float u_ratio;uniform vec2 u_gl_units_to_pixels;varying vec2 v_normal;varying vec2 v_width2;varying float v_gamma_scale;varying highp float v_linesofar;\n#pragma mapbox: define highp vec4 color\n#pragma mapbox: define lowp float blur\n#pragma mapbox: define lowp float opacity\n#pragma mapbox: define mediump float gapwidth\n#pragma mapbox: define lowp float offset\n#pragma mapbox: define mediump float width\nvoid main() {\n#pragma mapbox: initialize highp vec4 color\n#pragma mapbox: initialize lowp float blur\n#pragma mapbox: initialize lowp float opacity\n#pragma mapbox: initialize mediump float gapwidth\n#pragma mapbox: initialize lowp float offset\n#pragma mapbox: initialize mediump float width\nvec2 a_extrude=a_data.xy-128.0;float a_direction=mod(a_data.z,4.0)-1.0;v_linesofar=(floor(a_data.z/4.0)+a_data.w*64.0)*2.0;vec2 pos=a_pos_normal.xy;mediump vec2 normal=a_pos_normal.zw;v_normal=normal;gapwidth=gapwidth/2.0;float halfwidth=width/2.0;offset=-1.0*offset;float inset=gapwidth+(gapwidth > 0.0 ? ANTIALIASING : 0.0);float outset=gapwidth+halfwidth*(gapwidth > 0.0 ? 2.0 : 1.0)+(halfwidth==0.0 ? 0.0 : ANTIALIASING);mediump vec2 dist=outset*a_extrude*scale;mediump float u=0.5*a_direction;mediump float t=1.0-abs(u);mediump vec2 offset2=offset*a_extrude*scale*normal.y*mat2(t,-u,u,t);vec4 projected_extrude=u_matrix*vec4(dist/u_ratio,0.0,0.0);gl_Position=u_matrix*vec4(pos+offset2/u_ratio,0.0,1.0)+projected_extrude;float extrude_length_without_perspective=length(dist);float extrude_length_with_perspective=length(projected_extrude.xy/gl_Position.w*u_gl_units_to_pixels);v_gamma_scale=extrude_length_without_perspective/extrude_length_with_perspective;v_width2=vec2(outset,inset);}"),ii=li("#pragma mapbox: define lowp float blur\n#pragma mapbox: define lowp float opacity\nuniform sampler2D u_image;varying vec2 v_width2;varying vec2 v_normal;varying float v_gamma_scale;varying highp float v_lineprogress;void main() {\n#pragma mapbox: initialize lowp float blur\n#pragma mapbox: initialize lowp float opacity\nfloat dist=length(v_normal)*v_width2.s;float blur2=(blur+1.0/DEVICE_PIXEL_RATIO)*v_gamma_scale;float alpha=clamp(min(dist-(v_width2.t-blur2),v_width2.s-dist)/blur2,0.0,1.0);vec4 color=texture2D(u_image,vec2(v_lineprogress,0.5));gl_FragColor=color*(alpha*opacity);\n#ifdef OVERDRAW_INSPECTOR\ngl_FragColor=vec4(1.0);\n#endif\n}","\n#define MAX_LINE_DISTANCE 32767.0\n#define ANTIALIASING 1.0/DEVICE_PIXEL_RATIO/2.0\n#define scale 0.015873016\nattribute vec4 a_pos_normal;attribute vec4 a_data;uniform mat4 u_matrix;uniform mediump float u_ratio;uniform vec2 u_gl_units_to_pixels;varying vec2 v_normal;varying vec2 v_width2;varying float v_gamma_scale;varying highp float v_lineprogress;\n#pragma mapbox: define lowp float blur\n#pragma mapbox: define lowp float opacity\n#pragma mapbox: define mediump float gapwidth\n#pragma mapbox: define lowp float offset\n#pragma mapbox: define mediump float width\nvoid main() {\n#pragma mapbox: initialize lowp float blur\n#pragma mapbox: initialize lowp float opacity\n#pragma mapbox: initialize mediump float gapwidth\n#pragma mapbox: initialize lowp float offset\n#pragma mapbox: initialize mediump float width\nvec2 a_extrude=a_data.xy-128.0;float a_direction=mod(a_data.z,4.0)-1.0;v_lineprogress=(floor(a_data.z/4.0)+a_data.w*64.0)*2.0/MAX_LINE_DISTANCE;vec2 pos=a_pos_normal.xy;mediump vec2 normal=a_pos_normal.zw;v_normal=normal;gapwidth=gapwidth/2.0;float halfwidth=width/2.0;offset=-1.0*offset;float inset=gapwidth+(gapwidth > 0.0 ? ANTIALIASING : 0.0);float outset=gapwidth+halfwidth*(gapwidth > 0.0 ? 2.0 : 1.0)+(halfwidth==0.0 ? 0.0 : ANTIALIASING);mediump vec2 dist=outset*a_extrude*scale;mediump float u=0.5*a_direction;mediump float t=1.0-abs(u);mediump vec2 offset2=offset*a_extrude*scale*normal.y*mat2(t,-u,u,t);vec4 projected_extrude=u_matrix*vec4(dist/u_ratio,0.0,0.0);gl_Position=u_matrix*vec4(pos+offset2/u_ratio,0.0,1.0)+projected_extrude;float extrude_length_without_perspective=length(dist);float extrude_length_with_perspective=length(projected_extrude.xy/gl_Position.w*u_gl_units_to_pixels);v_gamma_scale=extrude_length_without_perspective/extrude_length_with_perspective;v_width2=vec2(outset,inset);}"),oi=li("uniform vec2 u_texsize;uniform float u_fade;uniform mediump vec4 u_scale;uniform sampler2D u_image;varying vec2 v_normal;varying vec2 v_width2;varying float v_linesofar;varying float v_gamma_scale;\n#pragma mapbox: define lowp vec4 pattern_from\n#pragma mapbox: define lowp vec4 pattern_to\n#pragma mapbox: define lowp float blur\n#pragma mapbox: define lowp float opacity\nvoid main() {\n#pragma mapbox: initialize mediump vec4 pattern_from\n#pragma mapbox: initialize mediump vec4 pattern_to\n#pragma mapbox: initialize lowp float blur\n#pragma mapbox: initialize lowp float opacity\nvec2 pattern_tl_a=pattern_from.xy;vec2 pattern_br_a=pattern_from.zw;vec2 pattern_tl_b=pattern_to.xy;vec2 pattern_br_b=pattern_to.zw;float pixelRatio=u_scale.x;float tileZoomRatio=u_scale.y;float fromScale=u_scale.z;float toScale=u_scale.w;vec2 display_size_a=vec2((pattern_br_a.x-pattern_tl_a.x)/pixelRatio,(pattern_br_a.y-pattern_tl_a.y)/pixelRatio);vec2 display_size_b=vec2((pattern_br_b.x-pattern_tl_b.x)/pixelRatio,(pattern_br_b.y-pattern_tl_b.y)/pixelRatio);vec2 pattern_size_a=vec2(display_size_a.x*fromScale/tileZoomRatio,display_size_a.y);vec2 pattern_size_b=vec2(display_size_b.x*toScale/tileZoomRatio,display_size_b.y);float dist=length(v_normal)*v_width2.s;float blur2=(blur+1.0/DEVICE_PIXEL_RATIO)*v_gamma_scale;float alpha=clamp(min(dist-(v_width2.t-blur2),v_width2.s-dist)/blur2,0.0,1.0);float x_a=mod(v_linesofar/pattern_size_a.x,1.0);float x_b=mod(v_linesofar/pattern_size_b.x,1.0);float y_a=0.5+(v_normal.y*clamp(v_width2.s,0.0,(pattern_size_a.y+2.0)/2.0)/pattern_size_a.y);float y_b=0.5+(v_normal.y*clamp(v_width2.s,0.0,(pattern_size_b.y+2.0)/2.0)/pattern_size_b.y);vec2 pos_a=mix(pattern_tl_a/u_texsize,pattern_br_a/u_texsize,vec2(x_a,y_a));vec2 pos_b=mix(pattern_tl_b/u_texsize,pattern_br_b/u_texsize,vec2(x_b,y_b));vec4 color=mix(texture2D(u_image,pos_a),texture2D(u_image,pos_b),u_fade);gl_FragColor=color*alpha*opacity;\n#ifdef OVERDRAW_INSPECTOR\ngl_FragColor=vec4(1.0);\n#endif\n}","\n#define scale 0.015873016\n#define LINE_DISTANCE_SCALE 2.0\n#define ANTIALIASING 1.0/DEVICE_PIXEL_RATIO/2.0\nattribute vec4 a_pos_normal;attribute vec4 a_data;uniform mat4 u_matrix;uniform vec2 u_gl_units_to_pixels;uniform mediump float u_ratio;varying vec2 v_normal;varying vec2 v_width2;varying float v_linesofar;varying float v_gamma_scale;\n#pragma mapbox: define lowp float blur\n#pragma mapbox: define lowp float opacity\n#pragma mapbox: define lowp float offset\n#pragma mapbox: define mediump float gapwidth\n#pragma mapbox: define mediump float width\n#pragma mapbox: define lowp vec4 pattern_from\n#pragma mapbox: define lowp vec4 pattern_to\nvoid main() {\n#pragma mapbox: initialize lowp float blur\n#pragma mapbox: initialize lowp float opacity\n#pragma mapbox: initialize lowp float offset\n#pragma mapbox: initialize mediump float gapwidth\n#pragma mapbox: initialize mediump float width\n#pragma mapbox: initialize mediump vec4 pattern_from\n#pragma mapbox: initialize mediump vec4 pattern_to\nvec2 a_extrude=a_data.xy-128.0;float a_direction=mod(a_data.z,4.0)-1.0;float a_linesofar=(floor(a_data.z/4.0)+a_data.w*64.0)*LINE_DISTANCE_SCALE;vec2 pos=a_pos_normal.xy;mediump vec2 normal=a_pos_normal.zw;v_normal=normal;gapwidth=gapwidth/2.0;float halfwidth=width/2.0;offset=-1.0*offset;float inset=gapwidth+(gapwidth > 0.0 ? ANTIALIASING : 0.0);float outset=gapwidth+halfwidth*(gapwidth > 0.0 ? 2.0 : 1.0)+(halfwidth==0.0 ? 0.0 : ANTIALIASING);mediump vec2 dist=outset*a_extrude*scale;mediump float u=0.5*a_direction;mediump float t=1.0-abs(u);mediump vec2 offset2=offset*a_extrude*scale*normal.y*mat2(t,-u,u,t);vec4 projected_extrude=u_matrix*vec4(dist/u_ratio,0.0,0.0);gl_Position=u_matrix*vec4(pos+offset2/u_ratio,0.0,1.0)+projected_extrude;float extrude_length_without_perspective=length(dist);float extrude_length_with_perspective=length(projected_extrude.xy/gl_Position.w*u_gl_units_to_pixels);v_gamma_scale=extrude_length_without_perspective/extrude_length_with_perspective;v_linesofar=a_linesofar;v_width2=vec2(outset,inset);}"),ri=li("uniform sampler2D u_image;uniform float u_sdfgamma;uniform float u_mix;varying vec2 v_normal;varying vec2 v_width2;varying vec2 v_tex_a;varying vec2 v_tex_b;varying float v_gamma_scale;\n#pragma mapbox: define highp vec4 color\n#pragma mapbox: define lowp float blur\n#pragma mapbox: define lowp float opacity\n#pragma mapbox: define mediump float width\n#pragma mapbox: define lowp float floorwidth\nvoid main() {\n#pragma mapbox: initialize highp vec4 color\n#pragma mapbox: initialize lowp float blur\n#pragma mapbox: initialize lowp float opacity\n#pragma mapbox: initialize mediump float width\n#pragma mapbox: initialize lowp float floorwidth\nfloat dist=length(v_normal)*v_width2.s;float blur2=(blur+1.0/DEVICE_PIXEL_RATIO)*v_gamma_scale;float alpha=clamp(min(dist-(v_width2.t-blur2),v_width2.s-dist)/blur2,0.0,1.0);float sdfdist_a=texture2D(u_image,v_tex_a).a;float sdfdist_b=texture2D(u_image,v_tex_b).a;float sdfdist=mix(sdfdist_a,sdfdist_b,u_mix);alpha*=smoothstep(0.5-u_sdfgamma/floorwidth,0.5+u_sdfgamma/floorwidth,sdfdist);gl_FragColor=color*(alpha*opacity);\n#ifdef OVERDRAW_INSPECTOR\ngl_FragColor=vec4(1.0);\n#endif\n}","\n#define scale 0.015873016\n#define LINE_DISTANCE_SCALE 2.0\n#define ANTIALIASING 1.0/DEVICE_PIXEL_RATIO/2.0\nattribute vec4 a_pos_normal;attribute vec4 a_data;uniform mat4 u_matrix;uniform mediump float u_ratio;uniform vec2 u_patternscale_a;uniform float u_tex_y_a;uniform vec2 u_patternscale_b;uniform float u_tex_y_b;uniform vec2 u_gl_units_to_pixels;varying vec2 v_normal;varying vec2 v_width2;varying vec2 v_tex_a;varying vec2 v_tex_b;varying float v_gamma_scale;\n#pragma mapbox: define highp vec4 color\n#pragma mapbox: define lowp float blur\n#pragma mapbox: define lowp float opacity\n#pragma mapbox: define mediump float gapwidth\n#pragma mapbox: define lowp float offset\n#pragma mapbox: define mediump float width\n#pragma mapbox: define lowp float floorwidth\nvoid main() {\n#pragma mapbox: initialize highp vec4 color\n#pragma mapbox: initialize lowp float blur\n#pragma mapbox: initialize lowp float opacity\n#pragma mapbox: initialize mediump float gapwidth\n#pragma mapbox: initialize lowp float offset\n#pragma mapbox: initialize mediump float width\n#pragma mapbox: initialize lowp float floorwidth\nvec2 a_extrude=a_data.xy-128.0;float a_direction=mod(a_data.z,4.0)-1.0;float a_linesofar=(floor(a_data.z/4.0)+a_data.w*64.0)*LINE_DISTANCE_SCALE;vec2 pos=a_pos_normal.xy;mediump vec2 normal=a_pos_normal.zw;v_normal=normal;gapwidth=gapwidth/2.0;float halfwidth=width/2.0;offset=-1.0*offset;float inset=gapwidth+(gapwidth > 0.0 ? ANTIALIASING : 0.0);float outset=gapwidth+halfwidth*(gapwidth > 0.0 ? 2.0 : 1.0)+(halfwidth==0.0 ? 0.0 : ANTIALIASING);mediump vec2 dist=outset*a_extrude*scale;mediump float u=0.5*a_direction;mediump float t=1.0-abs(u);mediump vec2 offset2=offset*a_extrude*scale*normal.y*mat2(t,-u,u,t);vec4 projected_extrude=u_matrix*vec4(dist/u_ratio,0.0,0.0);gl_Position=u_matrix*vec4(pos+offset2/u_ratio,0.0,1.0)+projected_extrude;float extrude_length_without_perspective=length(dist);float extrude_length_with_perspective=length(projected_extrude.xy/gl_Position.w*u_gl_units_to_pixels);v_gamma_scale=extrude_length_without_perspective/extrude_length_with_perspective;v_tex_a=vec2(a_linesofar*u_patternscale_a.x/floorwidth,normal.y*u_patternscale_a.y+u_tex_y_a);v_tex_b=vec2(a_linesofar*u_patternscale_b.x/floorwidth,normal.y*u_patternscale_b.y+u_tex_y_b);v_width2=vec2(outset,inset);}"),ai=li("uniform float u_fade_t;uniform float u_opacity;uniform sampler2D u_image0;uniform sampler2D u_image1;varying vec2 v_pos0;varying vec2 v_pos1;uniform float u_brightness_low;uniform float u_brightness_high;uniform float u_saturation_factor;uniform float u_contrast_factor;uniform vec3 u_spin_weights;void main() {vec4 color0=texture2D(u_image0,v_pos0);vec4 color1=texture2D(u_image1,v_pos1);if (color0.a > 0.0) {color0.rgb=color0.rgb/color0.a;}if (color1.a > 0.0) {color1.rgb=color1.rgb/color1.a;}vec4 color=mix(color0,color1,u_fade_t);color.a*=u_opacity;vec3 rgb=color.rgb;rgb=vec3(dot(rgb,u_spin_weights.xyz),dot(rgb,u_spin_weights.zxy),dot(rgb,u_spin_weights.yzx));float average=(color.r+color.g+color.b)/3.0;rgb+=(average-rgb)*u_saturation_factor;rgb=(rgb-0.5)*u_contrast_factor+0.5;vec3 u_high_vec=vec3(u_brightness_low,u_brightness_low,u_brightness_low);vec3 u_low_vec=vec3(u_brightness_high,u_brightness_high,u_brightness_high);gl_FragColor=vec4(mix(u_high_vec,u_low_vec,rgb)*color.a,color.a);\n#ifdef OVERDRAW_INSPECTOR\ngl_FragColor=vec4(1.0);\n#endif\n}","uniform mat4 u_matrix;uniform vec2 u_tl_parent;uniform float u_scale_parent;uniform float u_buffer_scale;attribute vec2 a_pos;attribute vec2 a_texture_pos;varying vec2 v_pos0;varying vec2 v_pos1;void main() {gl_Position=u_matrix*vec4(a_pos,0,1);v_pos0=(((a_texture_pos/8192.0)-0.5)/u_buffer_scale )+0.5;v_pos1=(v_pos0*u_scale_parent)+u_tl_parent;}"),ni=li("uniform sampler2D u_texture;\n#pragma mapbox: define lowp float opacity\nvarying vec2 v_tex;varying float v_fade_opacity;void main() {\n#pragma mapbox: initialize lowp float opacity\nlowp float alpha=opacity*v_fade_opacity;gl_FragColor=texture2D(u_texture,v_tex)*alpha;\n#ifdef OVERDRAW_INSPECTOR\ngl_FragColor=vec4(1.0);\n#endif\n}","const float PI=3.141592653589793;attribute vec4 a_pos_offset;attribute vec4 a_data;attribute vec3 a_projected_pos;attribute float a_fade_opacity;uniform bool u_is_size_zoom_constant;uniform bool u_is_size_feature_constant;uniform highp float u_size_t;uniform highp float u_size;uniform highp float u_camera_to_center_distance;uniform highp float u_pitch;uniform bool u_rotate_symbol;uniform highp float u_aspect_ratio;uniform float u_fade_change;\n#pragma mapbox: define lowp float opacity\nuniform mat4 u_matrix;uniform mat4 u_label_plane_matrix;uniform mat4 u_gl_coord_matrix;uniform bool u_is_text;uniform bool u_pitch_with_map;uniform vec2 u_texsize;varying vec2 v_tex;varying float v_fade_opacity;void main() {\n#pragma mapbox: initialize lowp float opacity\nvec2 a_pos=a_pos_offset.xy;vec2 a_offset=a_pos_offset.zw;vec2 a_tex=a_data.xy;vec2 a_size=a_data.zw;highp float segment_angle=-a_projected_pos[2];float size;if (!u_is_size_zoom_constant && !u_is_size_feature_constant) {size=mix(a_size[0],a_size[1],u_size_t)/256.0;} else if (u_is_size_zoom_constant && !u_is_size_feature_constant) {size=a_size[0]/256.0;} else if (!u_is_size_zoom_constant && u_is_size_feature_constant) {size=u_size;} else {size=u_size;}vec4 projectedPoint=u_matrix*vec4(a_pos,0,1);highp float camera_to_anchor_distance=projectedPoint.w;highp float distance_ratio=u_pitch_with_map ?\ncamera_to_anchor_distance/u_camera_to_center_distance :\nu_camera_to_center_distance/camera_to_anchor_distance;highp float perspective_ratio=clamp(0.5+0.5*distance_ratio,0.0,4.0);size*=perspective_ratio;float fontScale=u_is_text ? size/24.0 : size;highp float symbol_rotation=0.0;if (u_rotate_symbol) {vec4 offsetProjectedPoint=u_matrix*vec4(a_pos+vec2(1,0),0,1);vec2 a=projectedPoint.xy/projectedPoint.w;vec2 b=offsetProjectedPoint.xy/offsetProjectedPoint.w;symbol_rotation=atan((b.y-a.y)/u_aspect_ratio,b.x-a.x);}highp float angle_sin=sin(segment_angle+symbol_rotation);highp float angle_cos=cos(segment_angle+symbol_rotation);mat2 rotation_matrix=mat2(angle_cos,-1.0*angle_sin,angle_sin,angle_cos);vec4 projected_pos=u_label_plane_matrix*vec4(a_projected_pos.xy,0.0,1.0);gl_Position=u_gl_coord_matrix*vec4(projected_pos.xy/projected_pos.w+rotation_matrix*(a_offset/32.0*fontScale),0.0,1.0);v_tex=a_tex/u_texsize;vec2 fade_opacity=unpack_opacity(a_fade_opacity);float fade_change=fade_opacity[1] > 0.5 ? u_fade_change :-u_fade_change;v_fade_opacity=max(0.0,min(1.0,fade_opacity[0]+fade_change));}"),si=li("#define SDF_PX 8.0\n#define EDGE_GAMMA 0.105/DEVICE_PIXEL_RATIO\nuniform bool u_is_halo;\n#pragma mapbox: define highp vec4 fill_color\n#pragma mapbox: define highp vec4 halo_color\n#pragma mapbox: define lowp float opacity\n#pragma mapbox: define lowp float halo_width\n#pragma mapbox: define lowp float halo_blur\nuniform sampler2D u_texture;uniform highp float u_gamma_scale;uniform bool u_is_text;varying vec2 v_data0;varying vec3 v_data1;void main() {\n#pragma mapbox: initialize highp vec4 fill_color\n#pragma mapbox: initialize highp vec4 halo_color\n#pragma mapbox: initialize lowp float opacity\n#pragma mapbox: initialize lowp float halo_width\n#pragma mapbox: initialize lowp float halo_blur\nvec2 tex=v_data0.xy;float gamma_scale=v_data1.x;float size=v_data1.y;float fade_opacity=v_data1[2];float fontScale=u_is_text ? size/24.0 : size;lowp vec4 color=fill_color;highp float gamma=EDGE_GAMMA/(fontScale*u_gamma_scale);lowp float buff=(256.0-64.0)/256.0;if (u_is_halo) {color=halo_color;gamma=(halo_blur*1.19/SDF_PX+EDGE_GAMMA)/(fontScale*u_gamma_scale);buff=(6.0-halo_width/fontScale)/SDF_PX;}lowp float dist=texture2D(u_texture,tex).a;highp float gamma_scaled=gamma*gamma_scale;highp float alpha=smoothstep(buff-gamma_scaled,buff+gamma_scaled,dist);gl_FragColor=color*(alpha*opacity*fade_opacity);\n#ifdef OVERDRAW_INSPECTOR\ngl_FragColor=vec4(1.0);\n#endif\n}","const float PI=3.141592653589793;attribute vec4 a_pos_offset;attribute vec4 a_data;attribute vec3 a_projected_pos;attribute float a_fade_opacity;uniform bool u_is_size_zoom_constant;uniform bool u_is_size_feature_constant;uniform highp float u_size_t;uniform highp float u_size;\n#pragma mapbox: define highp vec4 fill_color\n#pragma mapbox: define highp vec4 halo_color\n#pragma mapbox: define lowp float opacity\n#pragma mapbox: define lowp float halo_width\n#pragma mapbox: define lowp float halo_blur\nuniform mat4 u_matrix;uniform mat4 u_label_plane_matrix;uniform mat4 u_gl_coord_matrix;uniform bool u_is_text;uniform bool u_pitch_with_map;uniform highp float u_pitch;uniform bool u_rotate_symbol;uniform highp float u_aspect_ratio;uniform highp float u_camera_to_center_distance;uniform float u_fade_change;uniform vec2 u_texsize;varying vec2 v_data0;varying vec3 v_data1;void main() {\n#pragma mapbox: initialize highp vec4 fill_color\n#pragma mapbox: initialize highp vec4 halo_color\n#pragma mapbox: initialize lowp float opacity\n#pragma mapbox: initialize lowp float halo_width\n#pragma mapbox: initialize lowp float halo_blur\nvec2 a_pos=a_pos_offset.xy;vec2 a_offset=a_pos_offset.zw;vec2 a_tex=a_data.xy;vec2 a_size=a_data.zw;highp float segment_angle=-a_projected_pos[2];float size;if (!u_is_size_zoom_constant && !u_is_size_feature_constant) {size=mix(a_size[0],a_size[1],u_size_t)/256.0;} else if (u_is_size_zoom_constant && !u_is_size_feature_constant) {size=a_size[0]/256.0;} else if (!u_is_size_zoom_constant && u_is_size_feature_constant) {size=u_size;} else {size=u_size;}vec4 projectedPoint=u_matrix*vec4(a_pos,0,1);highp float camera_to_anchor_distance=projectedPoint.w;highp float distance_ratio=u_pitch_with_map ?\ncamera_to_anchor_distance/u_camera_to_center_distance :\nu_camera_to_center_distance/camera_to_anchor_distance;highp float perspective_ratio=clamp(0.5+0.5*distance_ratio,0.0,4.0);size*=perspective_ratio;float fontScale=u_is_text ? size/24.0 : size;highp float symbol_rotation=0.0;if (u_rotate_symbol) {vec4 offsetProjectedPoint=u_matrix*vec4(a_pos+vec2(1,0),0,1);vec2 a=projectedPoint.xy/projectedPoint.w;vec2 b=offsetProjectedPoint.xy/offsetProjectedPoint.w;symbol_rotation=atan((b.y-a.y)/u_aspect_ratio,b.x-a.x);}highp float angle_sin=sin(segment_angle+symbol_rotation);highp float angle_cos=cos(segment_angle+symbol_rotation);mat2 rotation_matrix=mat2(angle_cos,-1.0*angle_sin,angle_sin,angle_cos);vec4 projected_pos=u_label_plane_matrix*vec4(a_projected_pos.xy,0.0,1.0);gl_Position=u_gl_coord_matrix*vec4(projected_pos.xy/projected_pos.w+rotation_matrix*(a_offset/32.0*fontScale),0.0,1.0);float gamma_scale=gl_Position.w;vec2 tex=a_tex/u_texsize;vec2 fade_opacity=unpack_opacity(a_fade_opacity);float fade_change=fade_opacity[1] > 0.5 ? u_fade_change :-u_fade_change;float interpolated_fade_opacity=max(0.0,min(1.0,fade_opacity[0]+fade_change));v_data0=vec2(tex.x,tex.y);v_data1=vec3(gamma_scale,size,interpolated_fade_opacity);}");function li(t,e){var i=/#pragma mapbox: ([\w]+) ([\w]+) ([\w]+) ([\w]+)/g,o={};return {fragmentSource:t=t.replace(i,function(t,e,i,r,a){return o[a]=!0,"define"===e?"\n#ifndef HAS_UNIFORM_u_"+a+"\nvarying "+i+" "+r+" "+a+";\n#else\nuniform "+i+" "+r+" u_"+a+";\n#endif\n":"\n#ifdef HAS_UNIFORM_u_"+a+"\n    "+i+" "+r+" "+a+" = u_"+a+";\n#endif\n"}),vertexSource:e=e.replace(i,function(t,e,i,r,a){var n="float"===r?"vec2":"vec4",s=a.match(/color/)?"color":n;return o[a]?"define"===e?"\n#ifndef HAS_UNIFORM_u_"+a+"\nuniform lowp float a_"+a+"_t;\nattribute "+i+" "+n+" a_"+a+";\nvarying "+i+" "+r+" "+a+";\n#else\nuniform "+i+" "+r+" u_"+a+";\n#endif\n":"vec4"===s?"\n#ifndef HAS_UNIFORM_u_"+a+"\n    "+a+" = a_"+a+";\n#else\n    "+i+" "+r+" "+a+" = u_"+a+";\n#endif\n":"\n#ifndef HAS_UNIFORM_u_"+a+"\n    "+a+" = unpack_mix_"+s+"(a_"+a+", a_"+a+"_t);\n#else\n    "+i+" "+r+" "+a+" = u_"+a+";\n#endif\n":"define"===e?"\n#ifndef HAS_UNIFORM_u_"+a+"\nuniform lowp float a_"+a+"_t;\nattribute "+i+" "+n+" a_"+a+";\n#else\nuniform "+i+" "+r+" u_"+a+";\n#endif\n":"vec4"===s?"\n#ifndef HAS_UNIFORM_u_"+a+"\n    "+i+" "+r+" "+a+" = a_"+a+";\n#else\n    "+i+" "+r+" "+a+" = u_"+a+";\n#endif\n":"\n#ifndef HAS_UNIFORM_u_"+a+"\n    "+i+" "+r+" "+a+" = unpack_mix_"+s+"(a_"+a+", a_"+a+"_t);\n#else\n    "+i+" "+r+" "+a+" = u_"+a+";\n#endif\n"})}}var ci=Object.freeze({prelude:Be,background:Oe,backgroundPattern:Fe,circle:Ue,clippingMask:Ne,heatmap:Ze,heatmapTexture:je,collisionBox:Ve,collisionCircle:qe,debug:Ge,fill:We,fillOutline:Xe,fillOutlinePattern:He,fillPattern:Ke,fillExtrusion:Ye,fillExtrusionPattern:Je,extrusionTexture:Qe,hillshadePrepare:$e,hillshade:ti,line:ei,lineGradient:ii,linePattern:oi,lineSDF:ri,raster:ai,symbolIcon:ni,symbolSDF:si}),ui=function(){this.boundProgram=null,this.boundLayoutVertexBuffer=null,this.boundPaintVertexBuffers=[],this.boundIndexBuffer=null,this.boundVertexOffset=null,this.boundDynamicVertexBuffer=null,this.vao=null;};ui.prototype.bind=function(t,e,i,o,r,a,n,s){this.context=t;for(var l=this.boundPaintVertexBuffers.length!==o.length,c=0;!l&&c<o.length;c++)this.boundPaintVertexBuffers[c]!==o[c]&&(l=!0);var u=!this.vao||this.boundProgram!==e||this.boundLayoutVertexBuffer!==i||l||this.boundIndexBuffer!==r||this.boundVertexOffset!==a||this.boundDynamicVertexBuffer!==n||this.boundDynamicVertexBuffer2!==s;!t.extVertexArrayObject||u?this.freshBind(e,i,o,r,a,n,s):(t.bindVertexArrayOES.set(this.vao),n&&n.bind(),r&&r.dynamicDraw&&r.bind(),s&&s.bind());},ui.prototype.freshBind=function(t,e,i,o,r,a,n){var s,l=t.numAttributes,c=this.context,u=c.gl;if(c.extVertexArrayObject)this.vao&&this.destroy(),this.vao=c.extVertexArrayObject.createVertexArrayOES(),c.bindVertexArrayOES.set(this.vao),s=0,this.boundProgram=t,this.boundLayoutVertexBuffer=e,this.boundPaintVertexBuffers=i,this.boundIndexBuffer=o,this.boundVertexOffset=r,this.boundDynamicVertexBuffer=a,this.boundDynamicVertexBuffer2=n;else{s=c.currentNumAttributes||0;for(var h=l;h<s;h++)u.disableVertexAttribArray(h);}e.enableAttributes(u,t);for(var p=0,d=i;p<d.length;p+=1){d[p].enableAttributes(u,t);}a&&a.enableAttributes(u,t),n&&n.enableAttributes(u,t),e.bind(),e.setVertexAttribPointers(u,t,r);for(var _=0,f=i;_<f.length;_+=1){var m=f[_];m.bind(),m.setVertexAttribPointers(u,t,r);}a&&(a.bind(),a.setVertexAttribPointers(u,t,r)),o&&o.bind(),n&&(n.bind(),n.setVertexAttribPointers(u,t,r)),c.currentNumAttributes=l;},ui.prototype.destroy=function(){this.vao&&(this.context.extVertexArrayObject.deleteVertexArrayOES(this.vao),this.vao=null);};var hi=function(e,i,o,r,a){var n=e.gl;this.program=n.createProgram();var s=o.defines().concat("#define DEVICE_PIXEL_RATIO "+t.browser.devicePixelRatio.toFixed(1));a&&s.push("#define OVERDRAW_INSPECTOR;");var l=s.concat(Be.fragmentSource,i.fragmentSource).join("\n"),c=s.concat(Be.vertexSource,i.vertexSource).join("\n"),u=n.createShader(n.FRAGMENT_SHADER);n.shaderSource(u,l),n.compileShader(u),n.attachShader(this.program,u);var h=n.createShader(n.VERTEX_SHADER);n.shaderSource(h,c),n.compileShader(h),n.attachShader(this.program,h);for(var p=o.layoutAttributes||[],d=0;d<p.length;d++)n.bindAttribLocation(this.program,d,p[d].name);n.linkProgram(this.program),this.numAttributes=n.getProgramParameter(this.program,n.ACTIVE_ATTRIBUTES),this.attributes={};for(var _={},f=0;f<this.numAttributes;f++){var m=n.getActiveAttrib(this.program,f);m&&(this.attributes[m.name]=n.getAttribLocation(this.program,m.name));}for(var g=n.getProgramParameter(this.program,n.ACTIVE_UNIFORMS),v=0;v<g;v++){var y=n.getActiveUniform(this.program,v);y&&(_[y.name]=n.getUniformLocation(this.program,y.name));}this.fixedUniforms=r(e,_),this.binderUniforms=o.getUniforms(e,_);};function pi(e,i,o){var r=1/le(o,1,i.transform.tileZoom),a=Math.pow(2,o.tileID.overscaledZ),n=o.tileSize*Math.pow(2,i.transform.tileZoom)/a,s=n*(o.tileID.canonical.x+o.tileID.wrap*a),l=n*o.tileID.canonical.y;return {u_image:0,u_texsize:o.imageAtlasTexture.size,u_scale:[t.browser.devicePixelRatio,r,e.fromScale,e.toScale],u_fade:e.t,u_pixel_coord_upper:[s>>16,l>>16],u_pixel_coord_lower:[65535&s,65535&l]}}hi.prototype.draw=function(t,e,i,o,r,a,n,s,l,c,u,h,p,d,_,f){var m,g=t.gl;for(var v in t.program.set(this.program),t.setDepthMode(i),t.setStencilMode(o),t.setColorMode(r),t.setCullFace(a),this.fixedUniforms)this.fixedUniforms[v].set(n[v]);d&&d.setUniforms(t,this.binderUniforms,h,{zoom:p});for(var y=(m={},m[g.LINES]=2,m[g.TRIANGLES]=3,m[g.LINE_STRIP]=1,m)[e],x=0,b=u.get();x<b.length;x+=1){var w=b[x],E=w.vaos||(w.vaos={});(E[s]||(E[s]=new ui)).bind(t,this,l,d?d.getPaintVertexBuffers():[],c,w.vertexOffset,_,f),g.drawElements(e,w.primitiveLength*y,g.UNSIGNED_SHORT,w.primitiveOffset*y*2);}};var di=function(e,i,o){var r=i.style.light,a=r.properties.get("position"),n=[a.x,a.y,a.z],s=t.create$2();"viewport"===r.properties.get("anchor")&&t.fromRotation(s,-i.transform.angle),t.transformMat3(n,n,s);var l=r.properties.get("color");return {u_matrix:e,u_lightpos:n,u_lightintensity:r.properties.get("intensity"),u_lightcolor:[l.r,l.g,l.b],u_vertical_gradient:+o}},_i=function(e,i,o,r,a,n){return t.extend(di(e,i,o),pi(a,i,n),{u_height_factor:-Math.pow(2,r.overscaledZ)/n.tileSize/8})},fi=function(e,i,o){var r=t.create();t.ortho(r,0,e.width,e.height,0,0,1);var a=e.context.gl;return {u_matrix:r,u_world:[a.drawingBufferWidth,a.drawingBufferHeight],u_image:o,u_opacity:i}},mi=function(t){return {u_matrix:t}},gi=function(e,i,o,r){return t.extend(mi(e),pi(o,i,r))},vi=function(t,e){return {u_matrix:t,u_world:e}},yi=function(e,i,o,r,a){return t.extend(gi(e,i,o,r),{u_world:a})},xi=function(t,e,i,o){var r,a,n=t.transform;if("map"===o.paint.get("circle-pitch-alignment")){var s=le(i,1,n.zoom);r=!0,a=[s,s];}else r=!1,a=n.pixelsToGLUnits;return {u_camera_to_center_distance:n.cameraToCenterDistance,u_scale_with_map:+("map"===o.paint.get("circle-pitch-scale")),u_matrix:t.translatePosMatrix(e.posMatrix,i,o.paint.get("circle-translate"),o.paint.get("circle-translate-anchor")),u_pitch_with_map:+r,u_extrude_scale:a}},bi=function(e,i){return {u_matrix:new t.UniformMatrix4f(e,i.u_matrix),u_camera_to_center_distance:new t.Uniform1f(e,i.u_camera_to_center_distance),u_pixels_to_tile_units:new t.Uniform1f(e,i.u_pixels_to_tile_units),u_extrude_scale:new t.Uniform2f(e,i.u_extrude_scale),u_overscale_factor:new t.Uniform1f(e,i.u_overscale_factor)}},wi=function(t,e,i){var o=le(i,1,e.zoom),r=Math.pow(2,e.zoom-i.tileID.overscaledZ),a=i.tileID.overscaleFactor();return {u_matrix:t,u_camera_to_center_distance:e.cameraToCenterDistance,u_pixels_to_tile_units:o,u_extrude_scale:[e.pixelsToGLUnits[0]/(o*r),e.pixelsToGLUnits[1]/(o*r)],u_overscale_factor:a}},Ei=function(t,e){return {u_matrix:t,u_color:e}},Ti=function(t){return {u_matrix:t}},Ii=function(t,e,i,o){return {u_matrix:t,u_extrude_scale:le(e,1,i),u_intensity:o}},Ci=function(e,i,o,r){var a=t.create();t.ortho(a,0,e.width,e.height,0,0,1);var n=e.context.gl;return {u_matrix:a,u_world:[n.drawingBufferWidth,n.drawingBufferHeight],u_image:o,u_color_ramp:r,u_opacity:i.paint.get("heatmap-opacity")}},Si=function(e,i,o){var r=o.paint.get("hillshade-shadow-color"),a=o.paint.get("hillshade-highlight-color"),n=o.paint.get("hillshade-accent-color"),s=o.paint.get("hillshade-illumination-direction")*(Math.PI/180);"viewport"===o.paint.get("hillshade-illumination-anchor")&&(s-=e.transform.angle);var l,c,u,h=!e.options.moving;return {u_matrix:e.transform.calculatePosMatrix(i.tileID.toUnwrapped(),h),u_image:0,u_latrange:(l=i.tileID,c=Math.pow(2,l.canonical.z),u=l.canonical.y,[new t.MercatorCoordinate(0,u/c).toLngLat().lat,new t.MercatorCoordinate(0,(u+1)/c).toLngLat().lat]),u_light:[o.paint.get("hillshade-exaggeration"),s],u_shadow:r,u_highlight:a,u_accent:n}},zi=function(e,i){var o=e.dem.dim,r=t.create();return t.ortho(r,0,t.EXTENT,-t.EXTENT,0,0,1),t.translate(r,r,[0,-t.EXTENT,0]),{u_matrix:r,u_image:1,u_dimension:[2*o,2*o],u_zoom:e.tileID.overscaledZ,u_maxzoom:i}};var Li=function(t,e,i){var o=t.transform;return {u_matrix:Ai(t,e,i),u_ratio:1/le(e,1,o.zoom),u_gl_units_to_pixels:[1/o.pixelsToGLUnits[0],1/o.pixelsToGLUnits[1]]}},Pi=function(e,i,o){return t.extend(Li(e,i,o),{u_image:0})},Di=function(e,i,o,r){var a=e.transform,n=Mi(i,a);return {u_matrix:Ai(e,i,o),u_texsize:i.imageAtlasTexture.size,u_ratio:1/le(i,1,a.zoom),u_image:0,u_scale:[t.browser.devicePixelRatio,n,r.fromScale,r.toScale],u_fade:r.t,u_gl_units_to_pixels:[1/a.pixelsToGLUnits[0],1/a.pixelsToGLUnits[1]]}},Ri=function(e,i,o,r,a){var n=e.transform,s=e.lineAtlas,l=Mi(i,n),c="round"===o.layout.get("line-cap"),u=s.getDash(r.from,c),h=s.getDash(r.to,c),p=u.width*a.fromScale,d=h.width*a.toScale;return t.extend(Li(e,i,o),{u_patternscale_a:[l/p,-u.height/2],u_patternscale_b:[l/d,-h.height/2],u_sdfgamma:s.width/(256*Math.min(p,d)*t.browser.devicePixelRatio)/2,u_image:0,u_tex_y_a:u.y,u_tex_y_b:h.y,u_mix:a.t})};function Mi(t,e){return 1/le(t,1,e.tileZoom)}function Ai(t,e,i){return t.translatePosMatrix(e.tileID.posMatrix,e,i.paint.get("line-translate"),i.paint.get("line-translate-anchor"))}var ki=function(t,e,i,o,r){return {u_matrix:t,u_tl_parent:e,u_scale_parent:i,u_buffer_scale:1,u_fade_t:o.mix,u_opacity:o.opacity*r.paint.get("raster-opacity"),u_image0:0,u_image1:1,u_brightness_low:r.paint.get("raster-brightness-min"),u_brightness_high:r.paint.get("raster-brightness-max"),u_saturation_factor:(n=r.paint.get("raster-saturation"),n>0?1-1/(1.001-n):-n),u_contrast_factor:(a=r.paint.get("raster-contrast"),a>0?1/(1-a):1+a),u_spin_weights:function(t){t*=Math.PI/180;var e=Math.sin(t),i=Math.cos(t);return [(2*i+1)/3,(-Math.sqrt(3)*e-i+1)/3,(Math.sqrt(3)*e-i+1)/3]}(r.paint.get("raster-hue-rotate"))};var a,n;};var Bi=function(t,e,i,o,r,a,n,s,l,c){var u=r.transform;return {u_is_size_zoom_constant:+("constant"===t||"source"===t),u_is_size_feature_constant:+("constant"===t||"camera"===t),u_size_t:e?e.uSizeT:0,u_size:e?e.uSize:0,u_camera_to_center_distance:u.cameraToCenterDistance,u_pitch:u.pitch/360*2*Math.PI,u_rotate_symbol:+i,u_aspect_ratio:u.width/u.height,u_fade_change:r.options.fadeDuration?r.symbolFadeChange:1,u_matrix:a,u_label_plane_matrix:n,u_gl_coord_matrix:s,u_is_text:+l,u_pitch_with_map:+o,u_texsize:c,u_texture:0}},Oi=function(e,i,o,r,a,n,s,l,c,u,h){var p=a.transform;return t.extend(Bi(e,i,o,r,a,n,s,l,c,u),{u_gamma_scale:r?Math.cos(p._pitch)*p.cameraToCenterDistance:1,u_is_halo:+h})},Fi=function(t,e,i){return {u_matrix:t,u_opacity:e,u_color:i}},Ui=function(e,i,o,r,a,n){return t.extend(function(t,e,i,o){var r=i.imageManager.getPattern(t.from),a=i.imageManager.getPattern(t.to),n=i.imageManager.getPixelSize(),s=n.width,l=n.height,c=Math.pow(2,o.tileID.overscaledZ),u=o.tileSize*Math.pow(2,i.transform.tileZoom)/c,h=u*(o.tileID.canonical.x+o.tileID.wrap*c),p=u*o.tileID.canonical.y;return {u_image:0,u_pattern_tl_a:r.tl,u_pattern_br_a:r.br,u_pattern_tl_b:a.tl,u_pattern_br_b:a.br,u_texsize:[s,l],u_mix:e.t,u_pattern_size_a:r.displaySize,u_pattern_size_b:a.displaySize,u_scale_a:e.fromScale,u_scale_b:e.toScale,u_tile_units_to_pixels:1/le(o,1,i.transform.tileZoom),u_pixel_coord_upper:[h>>16,p>>16],u_pixel_coord_lower:[65535&h,65535&p]}}(r,n,o,a),{u_matrix:e,u_opacity:i})},Ni={fillExtrusion:function(e,i){return {u_matrix:new t.UniformMatrix4f(e,i.u_matrix),u_lightpos:new t.Uniform3f(e,i.u_lightpos),u_lightintensity:new t.Uniform1f(e,i.u_lightintensity),u_lightcolor:new t.Uniform3f(e,i.u_lightcolor),u_vertical_gradient:new t.Uniform1f(e,i.u_vertical_gradient)}},fillExtrusionPattern:function(e,i){return {u_matrix:new t.UniformMatrix4f(e,i.u_matrix),u_lightpos:new t.Uniform3f(e,i.u_lightpos),u_lightintensity:new t.Uniform1f(e,i.u_lightintensity),u_lightcolor:new t.Uniform3f(e,i.u_lightcolor),u_vertical_gradient:new t.Uniform1f(e,i.u_vertical_gradient),u_height_factor:new t.Uniform1f(e,i.u_height_factor),u_image:new t.Uniform1i(e,i.u_image),u_texsize:new t.Uniform2f(e,i.u_texsize),u_pixel_coord_upper:new t.Uniform2f(e,i.u_pixel_coord_upper),u_pixel_coord_lower:new t.Uniform2f(e,i.u_pixel_coord_lower),u_scale:new t.Uniform4f(e,i.u_scale),u_fade:new t.Uniform1f(e,i.u_fade)}},extrusionTexture:function(e,i){return {u_matrix:new t.UniformMatrix4f(e,i.u_matrix),u_world:new t.Uniform2f(e,i.u_world),u_image:new t.Uniform1i(e,i.u_image),u_opacity:new t.Uniform1f(e,i.u_opacity)}},fill:function(e,i){return {u_matrix:new t.UniformMatrix4f(e,i.u_matrix)}},fillPattern:function(e,i){return {u_matrix:new t.UniformMatrix4f(e,i.u_matrix),u_image:new t.Uniform1i(e,i.u_image),u_texsize:new t.Uniform2f(e,i.u_texsize),u_pixel_coord_upper:new t.Uniform2f(e,i.u_pixel_coord_upper),u_pixel_coord_lower:new t.Uniform2f(e,i.u_pixel_coord_lower),u_scale:new t.Uniform4f(e,i.u_scale),u_fade:new t.Uniform1f(e,i.u_fade)}},fillOutline:function(e,i){return {u_matrix:new t.UniformMatrix4f(e,i.u_matrix),u_world:new t.Uniform2f(e,i.u_world)}},fillOutlinePattern:function(e,i){return {u_matrix:new t.UniformMatrix4f(e,i.u_matrix),u_world:new t.Uniform2f(e,i.u_world),u_image:new t.Uniform1i(e,i.u_image),u_texsize:new t.Uniform2f(e,i.u_texsize),u_pixel_coord_upper:new t.Uniform2f(e,i.u_pixel_coord_upper),u_pixel_coord_lower:new t.Uniform2f(e,i.u_pixel_coord_lower),u_scale:new t.Uniform4f(e,i.u_scale),u_fade:new t.Uniform1f(e,i.u_fade)}},circle:function(e,i){return {u_camera_to_center_distance:new t.Uniform1f(e,i.u_camera_to_center_distance),u_scale_with_map:new t.Uniform1i(e,i.u_scale_with_map),u_pitch_with_map:new t.Uniform1i(e,i.u_pitch_with_map),u_extrude_scale:new t.Uniform2f(e,i.u_extrude_scale),u_matrix:new t.UniformMatrix4f(e,i.u_matrix)}},collisionBox:bi,collisionCircle:bi,debug:function(e,i){return {u_color:new t.UniformColor(e,i.u_color),u_matrix:new t.UniformMatrix4f(e,i.u_matrix)}},clippingMask:function(e,i){return {u_matrix:new t.UniformMatrix4f(e,i.u_matrix)}},heatmap:function(e,i){return {u_extrude_scale:new t.Uniform1f(e,i.u_extrude_scale),u_intensity:new t.Uniform1f(e,i.u_intensity),u_matrix:new t.UniformMatrix4f(e,i.u_matrix)}},heatmapTexture:function(e,i){return {u_matrix:new t.UniformMatrix4f(e,i.u_matrix),u_world:new t.Uniform2f(e,i.u_world),u_image:new t.Uniform1i(e,i.u_image),u_color_ramp:new t.Uniform1i(e,i.u_color_ramp),u_opacity:new t.Uniform1f(e,i.u_opacity)}},hillshade:function(e,i){return {u_matrix:new t.UniformMatrix4f(e,i.u_matrix),u_image:new t.Uniform1i(e,i.u_image),u_latrange:new t.Uniform2f(e,i.u_latrange),u_light:new t.Uniform2f(e,i.u_light),u_shadow:new t.UniformColor(e,i.u_shadow),u_highlight:new t.UniformColor(e,i.u_highlight),u_accent:new t.UniformColor(e,i.u_accent)}},hillshadePrepare:function(e,i){return {u_matrix:new t.UniformMatrix4f(e,i.u_matrix),u_image:new t.Uniform1i(e,i.u_image),u_dimension:new t.Uniform2f(e,i.u_dimension),u_zoom:new t.Uniform1f(e,i.u_zoom),u_maxzoom:new t.Uniform1f(e,i.u_maxzoom)}},line:function(e,i){return {u_matrix:new t.UniformMatrix4f(e,i.u_matrix),u_ratio:new t.Uniform1f(e,i.u_ratio),u_gl_units_to_pixels:new t.Uniform2f(e,i.u_gl_units_to_pixels)}},lineGradient:function(e,i){return {u_matrix:new t.UniformMatrix4f(e,i.u_matrix),u_ratio:new t.Uniform1f(e,i.u_ratio),u_gl_units_to_pixels:new t.Uniform2f(e,i.u_gl_units_to_pixels),u_image:new t.Uniform1i(e,i.u_image)}},linePattern:function(e,i){return {u_matrix:new t.UniformMatrix4f(e,i.u_matrix),u_texsize:new t.Uniform2f(e,i.u_texsize),u_ratio:new t.Uniform1f(e,i.u_ratio),u_image:new t.Uniform1i(e,i.u_image),u_gl_units_to_pixels:new t.Uniform2f(e,i.u_gl_units_to_pixels),u_scale:new t.Uniform4f(e,i.u_scale),u_fade:new t.Uniform1f(e,i.u_fade)}},lineSDF:function(e,i){return {u_matrix:new t.UniformMatrix4f(e,i.u_matrix),u_ratio:new t.Uniform1f(e,i.u_ratio),u_gl_units_to_pixels:new t.Uniform2f(e,i.u_gl_units_to_pixels),u_patternscale_a:new t.Uniform2f(e,i.u_patternscale_a),u_patternscale_b:new t.Uniform2f(e,i.u_patternscale_b),u_sdfgamma:new t.Uniform1f(e,i.u_sdfgamma),u_image:new t.Uniform1i(e,i.u_image),u_tex_y_a:new t.Uniform1f(e,i.u_tex_y_a),u_tex_y_b:new t.Uniform1f(e,i.u_tex_y_b),u_mix:new t.Uniform1f(e,i.u_mix)}},raster:function(e,i){return {u_matrix:new t.UniformMatrix4f(e,i.u_matrix),u_tl_parent:new t.Uniform2f(e,i.u_tl_parent),u_scale_parent:new t.Uniform1f(e,i.u_scale_parent),u_buffer_scale:new t.Uniform1f(e,i.u_buffer_scale),u_fade_t:new t.Uniform1f(e,i.u_fade_t),u_opacity:new t.Uniform1f(e,i.u_opacity),u_image0:new t.Uniform1i(e,i.u_image0),u_image1:new t.Uniform1i(e,i.u_image1),u_brightness_low:new t.Uniform1f(e,i.u_brightness_low),u_brightness_high:new t.Uniform1f(e,i.u_brightness_high),u_saturation_factor:new t.Uniform1f(e,i.u_saturation_factor),u_contrast_factor:new t.Uniform1f(e,i.u_contrast_factor),u_spin_weights:new t.Uniform3f(e,i.u_spin_weights)}},symbolIcon:function(e,i){return {u_is_size_zoom_constant:new t.Uniform1i(e,i.u_is_size_zoom_constant),u_is_size_feature_constant:new t.Uniform1i(e,i.u_is_size_feature_constant),u_size_t:new t.Uniform1f(e,i.u_size_t),u_size:new t.Uniform1f(e,i.u_size),u_camera_to_center_distance:new t.Uniform1f(e,i.u_camera_to_center_distance),u_pitch:new t.Uniform1f(e,i.u_pitch),u_rotate_symbol:new t.Uniform1i(e,i.u_rotate_symbol),u_aspect_ratio:new t.Uniform1f(e,i.u_aspect_ratio),u_fade_change:new t.Uniform1f(e,i.u_fade_change),u_matrix:new t.UniformMatrix4f(e,i.u_matrix),u_label_plane_matrix:new t.UniformMatrix4f(e,i.u_label_plane_matrix),u_gl_coord_matrix:new t.UniformMatrix4f(e,i.u_gl_coord_matrix),u_is_text:new t.Uniform1f(e,i.u_is_text),u_pitch_with_map:new t.Uniform1i(e,i.u_pitch_with_map),u_texsize:new t.Uniform2f(e,i.u_texsize),u_texture:new t.Uniform1i(e,i.u_texture)}},symbolSDF:function(e,i){return {u_is_size_zoom_constant:new t.Uniform1i(e,i.u_is_size_zoom_constant),u_is_size_feature_constant:new t.Uniform1i(e,i.u_is_size_feature_constant),u_size_t:new t.Uniform1f(e,i.u_size_t),u_size:new t.Uniform1f(e,i.u_size),u_camera_to_center_distance:new t.Uniform1f(e,i.u_camera_to_center_distance),u_pitch:new t.Uniform1f(e,i.u_pitch),u_rotate_symbol:new t.Uniform1i(e,i.u_rotate_symbol),u_aspect_ratio:new t.Uniform1f(e,i.u_aspect_ratio),u_fade_change:new t.Uniform1f(e,i.u_fade_change),u_matrix:new t.UniformMatrix4f(e,i.u_matrix),u_label_plane_matrix:new t.UniformMatrix4f(e,i.u_label_plane_matrix),u_gl_coord_matrix:new t.UniformMatrix4f(e,i.u_gl_coord_matrix),u_is_text:new t.Uniform1f(e,i.u_is_text),u_pitch_with_map:new t.Uniform1i(e,i.u_pitch_with_map),u_texsize:new t.Uniform2f(e,i.u_texsize),u_texture:new t.Uniform1i(e,i.u_texture),u_gamma_scale:new t.Uniform1f(e,i.u_gamma_scale),u_is_halo:new t.Uniform1f(e,i.u_is_halo)}},background:function(e,i){return {u_matrix:new t.UniformMatrix4f(e,i.u_matrix),u_opacity:new t.Uniform1f(e,i.u_opacity),u_color:new t.UniformColor(e,i.u_color)}},backgroundPattern:function(e,i){return {u_matrix:new t.UniformMatrix4f(e,i.u_matrix),u_opacity:new t.Uniform1f(e,i.u_opacity),u_image:new t.Uniform1i(e,i.u_image),u_pattern_tl_a:new t.Uniform2f(e,i.u_pattern_tl_a),u_pattern_br_a:new t.Uniform2f(e,i.u_pattern_br_a),u_pattern_tl_b:new t.Uniform2f(e,i.u_pattern_tl_b),u_pattern_br_b:new t.Uniform2f(e,i.u_pattern_br_b),u_texsize:new t.Uniform2f(e,i.u_texsize),u_mix:new t.Uniform1f(e,i.u_mix),u_pattern_size_a:new t.Uniform2f(e,i.u_pattern_size_a),u_pattern_size_b:new t.Uniform2f(e,i.u_pattern_size_b),u_scale_a:new t.Uniform1f(e,i.u_scale_a),u_scale_b:new t.Uniform1f(e,i.u_scale_b),u_pixel_coord_upper:new t.Uniform2f(e,i.u_pixel_coord_upper),u_pixel_coord_lower:new t.Uniform2f(e,i.u_pixel_coord_lower),u_tile_units_to_pixels:new t.Uniform1f(e,i.u_tile_units_to_pixels)}}};function Zi(e,i){for(var o=e.sort(function(t,e){return t.tileID.isLessThan(e.tileID)?-1:e.tileID.isLessThan(t.tileID)?1:0}),r=0;r<o.length;r++){var a={},n=o[r],s=o.slice(r+1);ji(n.tileID.wrapped(),n.tileID,s,new t.OverscaledTileID(0,n.tileID.wrap+1,0,0,0),a),n.setMask(a,i);}}function ji(e,i,o,r,a){for(var n=0;n<o.length;n++){var s=o[n];if(r.isLessThan(s.tileID))break;if(i.key===s.tileID.key)return;if(s.tileID.isChildOf(i)){for(var l=i.children(1/0),c=0;c<l.length;c++){ji(e,l[c],o.slice(n),r,a);}return}}var u=i.overscaledZ-e.overscaledZ,h=new t.CanonicalTileID(u,i.canonical.x-(e.canonical.x<<u),i.canonical.y-(e.canonical.y<<u));a[h.key]=a[h.key]||h;}function Vi(t,e,i,o,r){for(var a=t.context,n=a.gl,s=r?t.useProgram("collisionCircle"):t.useProgram("collisionBox"),l=0;l<o.length;l++){var c=o[l],u=e.getTile(c),h=u.getBucket(i);if(h){var p=r?h.collisionCircle:h.collisionBox;p&&s.draw(a,r?n.TRIANGLES:n.LINES,wt.disabled,Et.disabled,t.colorModeForRenderPass(),It.disabled,wi(c.posMatrix,t.transform,u),i.id,p.layoutVertexBuffer,p.indexBuffer,p.segments,null,t.transform.zoom,null,null,p.collisionVertexBuffer);}}}var qi=t.identity(new Float32Array(16)),Gi=t.properties.layout;function Wi(e,i,o,r,a,n,s,l,c,u,h,p){for(var d,_,f=e.context,m=f.gl,g=e.transform,v="map"===l,y="map"===c,x=v&&"point"!==o.layout.get("symbol-placement"),b=v&&!y&&!x,w=e.depthModeForSublayer(0,wt.ReadOnly),E=0,T=r;E<T.length;E+=1){var I=T[E],C=i.getTile(I),S=C.getBucket(o);if(S){var z=a?S.text:S.icon;if(z&&z.segments.get().length){var L=z.programConfigurations.get(o.id),P=a||S.sdfIcons,D=a?S.textSizeData:S.iconSizeData;d||(d=e.useProgram(P?"symbolSDF":"symbolIcon",L),_=t.evaluateSizeForZoom(D,g.zoom,Gi.properties[a?"text-size":"icon-size"])),f.activeTexture.set(m.TEXTURE0);var R=void 0;if(a)C.glyphAtlasTexture.bind(m.LINEAR,m.CLAMP_TO_EDGE),R=C.glyphAtlasTexture.size;else{var M=1!==o.layout.get("icon-size").constantOr(0)||S.iconsNeedLinear,A=y||0!==g.pitch;C.imageAtlasTexture.bind(P||e.options.rotating||e.options.zooming||M||A?m.LINEAR:m.NEAREST,m.CLAMP_TO_EDGE),R=C.imageAtlasTexture.size;}var k=le(C,1,e.transform.zoom),B=Xt(I.posMatrix,y,v,e.transform,k),O=Ht(I.posMatrix,y,v,e.transform,k);x&&Jt(S,I.posMatrix,e,a,B,O,y,u);var F=e.translatePosMatrix(I.posMatrix,C,n,s),U=x?qi:B,N=e.translatePosMatrix(O,C,n,s,!0),Z=void 0;if(P){var j=0!==o.paint.get(a?"text-halo-width":"icon-halo-width").constantOr(1);Z=Oi(D.functionType,_,b,y,e,F,U,N,a,R,!0),j&&Xi(z,o,e,d,w,h,p,Z),Z.u_is_halo=0;}else Z=Bi(D.functionType,_,b,y,e,F,U,N,a,R);Xi(z,o,e,d,w,h,p,Z);}}}}function Xi(t,e,i,o,r,a,n,s){var l=i.context,c=l.gl;o.draw(l,c.TRIANGLES,r,a,n,It.disabled,s,e.id,t.layoutVertexBuffer,t.indexBuffer,t.segments,e.paint,i.transform.zoom,t.programConfigurations.get(e.id),t.dynamicLayoutVertexBuffer,t.opacityVertexBuffer);}function Hi(t,e,i,o,r,a,n){var s,l,c,u,h,p=t.context.gl,d=i.paint.get("fill-pattern"),_=d&&d.constantOr(1),f=i.getCrossfadeParameters();n?(l=_&&!i.getPaintProperty("fill-outline-color")?"fillOutlinePattern":"fillOutline",s=p.LINES):(l=_?"fillPattern":"fill",s=p.TRIANGLES);for(var m=0,g=o;m<g.length;m+=1){var v=g[m],y=e.getTile(v);if(!_||y.patternsLoaded()){var x=y.getBucket(i);if(x){var b=x.programConfigurations.get(i.id),w=t.useProgram(l,b);_&&(t.context.activeTexture.set(p.TEXTURE0),y.imageAtlasTexture.bind(p.LINEAR,p.CLAMP_TO_EDGE),b.updatePatternPaintBuffers(f));var E=d.constantOr(null);if(E&&y.imageAtlas){var T=y.imageAtlas.patternPositions[E.to],I=y.imageAtlas.patternPositions[E.from];T&&I&&b.setConstantPatternPositions(T,I);}var C=t.translatePosMatrix(v.posMatrix,y,i.paint.get("fill-translate"),i.paint.get("fill-translate-anchor"));if(n){u=x.indexBuffer2,h=x.segments2;var S=[p.drawingBufferWidth,p.drawingBufferHeight];c="fillOutlinePattern"===l&&_?yi(C,t,f,y,S):vi(C,S);}else u=x.indexBuffer,h=x.segments,c=_?gi(C,t,f,y):mi(C);w.draw(t.context,s,r,t.stencilModeForClipping(v),a,It.disabled,c,i.id,x.layoutVertexBuffer,u,h,i.paint,t.transform.zoom,b);}}}}function Ki(e,i){var o=e.context,r=o.gl,a=i.viewportFrame;if(e.depthRboNeedsClear&&e.setupOffscreenDepthRenderbuffer(),!a){var n=new t.Texture(o,{width:e.width,height:e.height,data:null},r.RGBA);n.bind(r.LINEAR,r.CLAMP_TO_EDGE),(a=i.viewportFrame=o.createFramebuffer(e.width,e.height)).colorAttachment.set(n.texture);}o.bindFramebuffer.set(a.framebuffer),a.depthAttachment.set(e.depthRbo),e.depthRboNeedsClear&&(o.clear({depth:1}),e.depthRboNeedsClear=!1),o.clear({color:t.Color.transparent}),o.setStencilMode(Et.disabled),o.setDepthMode(new wt(r.LEQUAL,wt.ReadWrite,[0,1])),o.setColorMode(e.colorModeForRenderPass());}function Yi(t,e,i){var o=e.viewportFrame;if(o){var r=t.context,a=r.gl;r.activeTexture.set(a.TEXTURE0),a.bindTexture(a.TEXTURE_2D,o.colorAttachment.get()),t.useProgram("extrusionTexture").draw(r,a.TRIANGLES,wt.disabled,Et.disabled,t.colorModeForRenderPass(),It.disabled,fi(t,i,0),e.id,t.viewportBuffer,t.quadTriangleIndexBuffer,t.viewportSegments,e.paint,t.transform.zoom);}}function Ji(t,e,i,o,r,a){var n=t.context,s=n.gl,l=e.fbo;if(l){var c=t.useProgram("hillshade");n.activeTexture.set(s.TEXTURE0),s.bindTexture(s.TEXTURE_2D,l.colorAttachment.get());var u=Si(t,e,i);e.maskedBoundsBuffer&&e.maskedIndexBuffer&&e.segments?c.draw(n,s.TRIANGLES,o,r,a,It.disabled,u,i.id,e.maskedBoundsBuffer,e.maskedIndexBuffer,e.segments):c.draw(n,s.TRIANGLES,o,r,a,It.disabled,u,i.id,t.rasterBoundsBuffer,t.quadTriangleIndexBuffer,t.rasterBoundsSegments);}}function Qi(e,i,o,r,a,n,s){var l=e.context,c=l.gl;if(i.dem&&i.dem.data){var u=i.dem.dim,h=i.dem.stride,p=i.dem.getPixels();if(l.activeTexture.set(c.TEXTURE1),l.pixelStoreUnpackPremultiplyAlpha.set(!1),i.demTexture=i.demTexture||e.getTileTexture(h),i.demTexture){var d=i.demTexture;d.update(p,{premultiply:!1}),d.bind(c.NEAREST,c.CLAMP_TO_EDGE);}else i.demTexture=new t.Texture(l,p,c.RGBA,{premultiply:!1}),i.demTexture.bind(c.NEAREST,c.CLAMP_TO_EDGE);l.activeTexture.set(c.TEXTURE0);var _=i.fbo;if(!_){var f=new t.Texture(l,{width:u,height:u,data:null},c.RGBA);f.bind(c.LINEAR,c.CLAMP_TO_EDGE),(_=i.fbo=l.createFramebuffer(u,u)).colorAttachment.set(f.texture);}l.bindFramebuffer.set(_.framebuffer),l.viewport.set([0,0,u,u]),e.useProgram("hillshadePrepare").draw(l,c.TRIANGLES,a,n,s,It.disabled,zi(i,r),o.id,e.rasterBoundsBuffer,e.quadTriangleIndexBuffer,e.rasterBoundsSegments),i.needsHillshadePrepare=!1;}}function $i(e,i,o,r,a){var n=r.paint.get("raster-fade-duration");if(n>0){var s=t.browser.now(),l=(s-e.timeAdded)/n,c=i?(s-i.timeAdded)/n:-1,u=o.getSource(),h=a.coveringZoomLevel({tileSize:u.tileSize,roundZoom:u.roundZoom}),p=!i||Math.abs(i.tileID.overscaledZ-h)>Math.abs(e.tileID.overscaledZ-h),d=p&&e.refreshedUponExpiration?1:t.clamp(p?l:1-c,0,1);return e.refreshedUponExpiration&&l>=1&&(e.refreshedUponExpiration=!1),i?{opacity:1,mix:1-d}:{opacity:d,mix:0}}return {opacity:1,mix:0}}function to(e,i,o){var r=e.context,a=r.gl,n=o.posMatrix,s=e.useProgram("debug"),l=wt.disabled,c=Et.disabled,u=e.colorModeForRenderPass(),h="$debug";s.draw(r,a.LINE_STRIP,l,c,u,It.disabled,Ei(n,t.Color.red),h,e.debugBuffer,e.tileBorderIndexBuffer,e.debugSegments);for(var p=function(t,e,i,o){o=o||1;var r,a,n,s,l,c,u,h,p=[];for(r=0,a=t.length;r<a;r++)if(l=eo[t[r]]){for(h=null,n=0,s=l[1].length;n<s;n+=2)-1===l[1][n]&&-1===l[1][n+1]?h=null:(c=e+l[1][n]*o,u=i-l[1][n+1]*o,h&&p.push(h.x,h.y,c,u),h={x:c,y:u});e+=l[0]*o;}return p}(o.toString(),50,200,5),d=new t.StructArrayLayout2i4,_=new t.StructArrayLayout2ui4,f=0;f<p.length;f+=2)d.emplaceBack(p[f],p[f+1]),_.emplaceBack(f,f+1);for(var m=r.createVertexBuffer(d,ke.members),g=r.createIndexBuffer(_),v=t.SegmentVector.simpleSegment(0,0,d.length/2,d.length/2),y=i.getTile(o).tileSize,x=t.EXTENT/(Math.pow(2,e.transform.zoom-o.overscaledZ)*y),b=[[-1,-1],[-1,1],[1,-1],[1,1]],w=0;w<b.length;w++){var E=b[w];s.draw(r,a.LINES,l,c,u,It.disabled,Ei(t.translate([],n,[x*E[0],x*E[1],0]),t.Color.white),h,m,g,v);}s.draw(r,a.LINES,l,c,u,It.disabled,Ei(n,t.Color.black),h,m,g,v);}var eo={" ":[16,[]],"!":[10,[5,21,5,7,-1,-1,5,2,4,1,5,0,6,1,5,2]],'"':[16,[4,21,4,14,-1,-1,12,21,12,14]],"#":[21,[11,25,4,-7,-1,-1,17,25,10,-7,-1,-1,4,12,18,12,-1,-1,3,6,17,6]],$:[20,[8,25,8,-4,-1,-1,12,25,12,-4,-1,-1,17,18,15,20,12,21,8,21,5,20,3,18,3,16,4,14,5,13,7,12,13,10,15,9,16,8,17,6,17,3,15,1,12,0,8,0,5,1,3,3]],"%":[24,[21,21,3,0,-1,-1,8,21,10,19,10,17,9,15,7,14,5,14,3,16,3,18,4,20,6,21,8,21,10,20,13,19,16,19,19,20,21,21,-1,-1,17,7,15,6,14,4,14,2,16,0,18,0,20,1,21,3,21,5,19,7,17,7]],"&":[26,[23,12,23,13,22,14,21,14,20,13,19,11,17,6,15,3,13,1,11,0,7,0,5,1,4,2,3,4,3,6,4,8,5,9,12,13,13,14,14,16,14,18,13,20,11,21,9,20,8,18,8,16,9,13,11,10,16,3,18,1,20,0,22,0,23,1,23,2]],"'":[10,[5,19,4,20,5,21,6,20,6,18,5,16,4,15]],"(":[14,[11,25,9,23,7,20,5,16,4,11,4,7,5,2,7,-2,9,-5,11,-7]],")":[14,[3,25,5,23,7,20,9,16,10,11,10,7,9,2,7,-2,5,-5,3,-7]],"*":[16,[8,21,8,9,-1,-1,3,18,13,12,-1,-1,13,18,3,12]],"+":[26,[13,18,13,0,-1,-1,4,9,22,9]],",":[10,[6,1,5,0,4,1,5,2,6,1,6,-1,5,-3,4,-4]],"-":[26,[4,9,22,9]],".":[10,[5,2,4,1,5,0,6,1,5,2]],"/":[22,[20,25,2,-7]],0:[20,[9,21,6,20,4,17,3,12,3,9,4,4,6,1,9,0,11,0,14,1,16,4,17,9,17,12,16,17,14,20,11,21,9,21]],1:[20,[6,17,8,18,11,21,11,0]],2:[20,[4,16,4,17,5,19,6,20,8,21,12,21,14,20,15,19,16,17,16,15,15,13,13,10,3,0,17,0]],3:[20,[5,21,16,21,10,13,13,13,15,12,16,11,17,8,17,6,16,3,14,1,11,0,8,0,5,1,4,2,3,4]],4:[20,[13,21,3,7,18,7,-1,-1,13,21,13,0]],5:[20,[15,21,5,21,4,12,5,13,8,14,11,14,14,13,16,11,17,8,17,6,16,3,14,1,11,0,8,0,5,1,4,2,3,4]],6:[20,[16,18,15,20,12,21,10,21,7,20,5,17,4,12,4,7,5,3,7,1,10,0,11,0,14,1,16,3,17,6,17,7,16,10,14,12,11,13,10,13,7,12,5,10,4,7]],7:[20,[17,21,7,0,-1,-1,3,21,17,21]],8:[20,[8,21,5,20,4,18,4,16,5,14,7,13,11,12,14,11,16,9,17,7,17,4,16,2,15,1,12,0,8,0,5,1,4,2,3,4,3,7,4,9,6,11,9,12,13,13,15,14,16,16,16,18,15,20,12,21,8,21]],9:[20,[16,14,15,11,13,9,10,8,9,8,6,9,4,11,3,14,3,15,4,18,6,20,9,21,10,21,13,20,15,18,16,14,16,9,15,4,13,1,10,0,8,0,5,1,4,3]],":":[10,[5,14,4,13,5,12,6,13,5,14,-1,-1,5,2,4,1,5,0,6,1,5,2]],";":[10,[5,14,4,13,5,12,6,13,5,14,-1,-1,6,1,5,0,4,1,5,2,6,1,6,-1,5,-3,4,-4]],"<":[24,[20,18,4,9,20,0]],"=":[26,[4,12,22,12,-1,-1,4,6,22,6]],">":[24,[4,18,20,9,4,0]],"?":[18,[3,16,3,17,4,19,5,20,7,21,11,21,13,20,14,19,15,17,15,15,14,13,13,12,9,10,9,7,-1,-1,9,2,8,1,9,0,10,1,9,2]],"@":[27,[18,13,17,15,15,16,12,16,10,15,9,14,8,11,8,8,9,6,11,5,14,5,16,6,17,8,-1,-1,12,16,10,14,9,11,9,8,10,6,11,5,-1,-1,18,16,17,8,17,6,19,5,21,5,23,7,24,10,24,12,23,15,22,17,20,19,18,20,15,21,12,21,9,20,7,19,5,17,4,15,3,12,3,9,4,6,5,4,7,2,9,1,12,0,15,0,18,1,20,2,21,3,-1,-1,19,16,18,8,18,6,19,5]],A:[18,[9,21,1,0,-1,-1,9,21,17,0,-1,-1,4,7,14,7]],B:[21,[4,21,4,0,-1,-1,4,21,13,21,16,20,17,19,18,17,18,15,17,13,16,12,13,11,-1,-1,4,11,13,11,16,10,17,9,18,7,18,4,17,2,16,1,13,0,4,0]],C:[21,[18,16,17,18,15,20,13,21,9,21,7,20,5,18,4,16,3,13,3,8,4,5,5,3,7,1,9,0,13,0,15,1,17,3,18,5]],D:[21,[4,21,4,0,-1,-1,4,21,11,21,14,20,16,18,17,16,18,13,18,8,17,5,16,3,14,1,11,0,4,0]],E:[19,[4,21,4,0,-1,-1,4,21,17,21,-1,-1,4,11,12,11,-1,-1,4,0,17,0]],F:[18,[4,21,4,0,-1,-1,4,21,17,21,-1,-1,4,11,12,11]],G:[21,[18,16,17,18,15,20,13,21,9,21,7,20,5,18,4,16,3,13,3,8,4,5,5,3,7,1,9,0,13,0,15,1,17,3,18,5,18,8,-1,-1,13,8,18,8]],H:[22,[4,21,4,0,-1,-1,18,21,18,0,-1,-1,4,11,18,11]],I:[8,[4,21,4,0]],J:[16,[12,21,12,5,11,2,10,1,8,0,6,0,4,1,3,2,2,5,2,7]],K:[21,[4,21,4,0,-1,-1,18,21,4,7,-1,-1,9,12,18,0]],L:[17,[4,21,4,0,-1,-1,4,0,16,0]],M:[24,[4,21,4,0,-1,-1,4,21,12,0,-1,-1,20,21,12,0,-1,-1,20,21,20,0]],N:[22,[4,21,4,0,-1,-1,4,21,18,0,-1,-1,18,21,18,0]],O:[22,[9,21,7,20,5,18,4,16,3,13,3,8,4,5,5,3,7,1,9,0,13,0,15,1,17,3,18,5,19,8,19,13,18,16,17,18,15,20,13,21,9,21]],P:[21,[4,21,4,0,-1,-1,4,21,13,21,16,20,17,19,18,17,18,14,17,12,16,11,13,10,4,10]],Q:[22,[9,21,7,20,5,18,4,16,3,13,3,8,4,5,5,3,7,1,9,0,13,0,15,1,17,3,18,5,19,8,19,13,18,16,17,18,15,20,13,21,9,21,-1,-1,12,4,18,-2]],R:[21,[4,21,4,0,-1,-1,4,21,13,21,16,20,17,19,18,17,18,15,17,13,16,12,13,11,4,11,-1,-1,11,11,18,0]],S:[20,[17,18,15,20,12,21,8,21,5,20,3,18,3,16,4,14,5,13,7,12,13,10,15,9,16,8,17,6,17,3,15,1,12,0,8,0,5,1,3,3]],T:[16,[8,21,8,0,-1,-1,1,21,15,21]],U:[22,[4,21,4,6,5,3,7,1,10,0,12,0,15,1,17,3,18,6,18,21]],V:[18,[1,21,9,0,-1,-1,17,21,9,0]],W:[24,[2,21,7,0,-1,-1,12,21,7,0,-1,-1,12,21,17,0,-1,-1,22,21,17,0]],X:[20,[3,21,17,0,-1,-1,17,21,3,0]],Y:[18,[1,21,9,11,9,0,-1,-1,17,21,9,11]],Z:[20,[17,21,3,0,-1,-1,3,21,17,21,-1,-1,3,0,17,0]],"[":[14,[4,25,4,-7,-1,-1,5,25,5,-7,-1,-1,4,25,11,25,-1,-1,4,-7,11,-7]],"\\":[14,[0,21,14,-3]],"]":[14,[9,25,9,-7,-1,-1,10,25,10,-7,-1,-1,3,25,10,25,-1,-1,3,-7,10,-7]],"^":[16,[6,15,8,18,10,15,-1,-1,3,12,8,17,13,12,-1,-1,8,17,8,0]],_:[16,[0,-2,16,-2]],"`":[10,[6,21,5,20,4,18,4,16,5,15,6,16,5,17]],a:[19,[15,14,15,0,-1,-1,15,11,13,13,11,14,8,14,6,13,4,11,3,8,3,6,4,3,6,1,8,0,11,0,13,1,15,3]],b:[19,[4,21,4,0,-1,-1,4,11,6,13,8,14,11,14,13,13,15,11,16,8,16,6,15,3,13,1,11,0,8,0,6,1,4,3]],c:[18,[15,11,13,13,11,14,8,14,6,13,4,11,3,8,3,6,4,3,6,1,8,0,11,0,13,1,15,3]],d:[19,[15,21,15,0,-1,-1,15,11,13,13,11,14,8,14,6,13,4,11,3,8,3,6,4,3,6,1,8,0,11,0,13,1,15,3]],e:[18,[3,8,15,8,15,10,14,12,13,13,11,14,8,14,6,13,4,11,3,8,3,6,4,3,6,1,8,0,11,0,13,1,15,3]],f:[12,[10,21,8,21,6,20,5,17,5,0,-1,-1,2,14,9,14]],g:[19,[15,14,15,-2,14,-5,13,-6,11,-7,8,-7,6,-6,-1,-1,15,11,13,13,11,14,8,14,6,13,4,11,3,8,3,6,4,3,6,1,8,0,11,0,13,1,15,3]],h:[19,[4,21,4,0,-1,-1,4,10,7,13,9,14,12,14,14,13,15,10,15,0]],i:[8,[3,21,4,20,5,21,4,22,3,21,-1,-1,4,14,4,0]],j:[10,[5,21,6,20,7,21,6,22,5,21,-1,-1,6,14,6,-3,5,-6,3,-7,1,-7]],k:[17,[4,21,4,0,-1,-1,14,14,4,4,-1,-1,8,8,15,0]],l:[8,[4,21,4,0]],m:[30,[4,14,4,0,-1,-1,4,10,7,13,9,14,12,14,14,13,15,10,15,0,-1,-1,15,10,18,13,20,14,23,14,25,13,26,10,26,0]],n:[19,[4,14,4,0,-1,-1,4,10,7,13,9,14,12,14,14,13,15,10,15,0]],o:[19,[8,14,6,13,4,11,3,8,3,6,4,3,6,1,8,0,11,0,13,1,15,3,16,6,16,8,15,11,13,13,11,14,8,14]],p:[19,[4,14,4,-7,-1,-1,4,11,6,13,8,14,11,14,13,13,15,11,16,8,16,6,15,3,13,1,11,0,8,0,6,1,4,3]],q:[19,[15,14,15,-7,-1,-1,15,11,13,13,11,14,8,14,6,13,4,11,3,8,3,6,4,3,6,1,8,0,11,0,13,1,15,3]],r:[13,[4,14,4,0,-1,-1,4,8,5,11,7,13,9,14,12,14]],s:[17,[14,11,13,13,10,14,7,14,4,13,3,11,4,9,6,8,11,7,13,6,14,4,14,3,13,1,10,0,7,0,4,1,3,3]],t:[12,[5,21,5,4,6,1,8,0,10,0,-1,-1,2,14,9,14]],u:[19,[4,14,4,4,5,1,7,0,10,0,12,1,15,4,-1,-1,15,14,15,0]],v:[16,[2,14,8,0,-1,-1,14,14,8,0]],w:[22,[3,14,7,0,-1,-1,11,14,7,0,-1,-1,11,14,15,0,-1,-1,19,14,15,0]],x:[17,[3,14,14,0,-1,-1,14,14,3,0]],y:[16,[2,14,8,0,-1,-1,14,14,8,0,6,-4,4,-6,2,-7,1,-7]],z:[17,[14,14,3,0,-1,-1,3,14,14,14,-1,-1,3,0,14,0]],"{":[14,[9,25,7,24,6,23,5,21,5,19,6,17,7,16,8,14,8,12,6,10,-1,-1,7,24,6,22,6,20,7,18,8,17,9,15,9,13,8,11,4,9,8,7,9,5,9,3,8,1,7,0,6,-2,6,-4,7,-6,-1,-1,6,8,8,6,8,4,7,2,6,1,5,-1,5,-3,6,-5,7,-6,9,-7]],"|":[8,[4,25,4,-7]],"}":[14,[5,25,7,24,8,23,9,21,9,19,8,17,7,16,6,14,6,12,8,10,-1,-1,7,24,8,22,8,20,7,18,6,17,5,15,5,13,6,11,10,9,6,7,5,5,5,3,6,1,7,0,8,-2,8,-4,7,-6,-1,-1,8,8,6,6,6,4,7,2,8,1,9,-1,9,-3,8,-5,7,-6,5,-7]],"~":[24,[3,6,3,8,4,11,6,12,8,12,10,11,14,8,16,7,18,7,20,8,21,10,-1,-1,3,8,4,10,6,11,8,11,10,10,14,7,16,6,18,6,20,7,21,10,21,12]]};var io={symbol:function(t,e,i,o){if("translucent"===t.renderPass){var r=Et.disabled,a=t.colorModeForRenderPass();0!==i.paint.get("icon-opacity").constantOr(1)&&Wi(t,e,i,o,!1,i.paint.get("icon-translate"),i.paint.get("icon-translate-anchor"),i.layout.get("icon-rotation-alignment"),i.layout.get("icon-pitch-alignment"),i.layout.get("icon-keep-upright"),r,a),0!==i.paint.get("text-opacity").constantOr(1)&&Wi(t,e,i,o,!0,i.paint.get("text-translate"),i.paint.get("text-translate-anchor"),i.layout.get("text-rotation-alignment"),i.layout.get("text-pitch-alignment"),i.layout.get("text-keep-upright"),r,a),e.map.showCollisionBoxes&&function(t,e,i,o){Vi(t,e,i,o,!1),Vi(t,e,i,o,!0);}(t,e,i,o);}},circle:function(t,e,i,o){if("translucent"===t.renderPass){var r=i.paint.get("circle-opacity"),a=i.paint.get("circle-stroke-width"),n=i.paint.get("circle-stroke-opacity");if(0!==r.constantOr(1)||0!==a.constantOr(1)&&0!==n.constantOr(1))for(var s=t.context,l=s.gl,c=t.depthModeForSublayer(0,wt.ReadOnly),u=Et.disabled,h=t.colorModeForRenderPass(),p=0;p<o.length;p++){var d=o[p],_=e.getTile(d),f=_.getBucket(i);if(f){var m=f.programConfigurations.get(i.id);t.useProgram("circle",m).draw(s,l.TRIANGLES,c,u,h,It.disabled,xi(t,d,_,i),i.id,f.layoutVertexBuffer,f.indexBuffer,f.segments,i.paint,t.transform.zoom,m);}}}},heatmap:function(e,i,o,r){if(0!==o.paint.get("heatmap-opacity"))if("offscreen"===e.renderPass){var a=e.context,n=a.gl,s=e.depthModeForSublayer(0,wt.ReadOnly),l=Et.disabled,c=new Tt([n.ONE,n.ONE],t.Color.transparent,[!0,!0,!0,!0]);!function(t,e,i){var o=t.gl;t.activeTexture.set(o.TEXTURE1),t.viewport.set([0,0,e.width/4,e.height/4]);var r=i.heatmapFbo;if(r)o.bindTexture(o.TEXTURE_2D,r.colorAttachment.get()),t.bindFramebuffer.set(r.framebuffer);else{var a=o.createTexture();o.bindTexture(o.TEXTURE_2D,a),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_S,o.CLAMP_TO_EDGE),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_T,o.CLAMP_TO_EDGE),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MIN_FILTER,o.LINEAR),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MAG_FILTER,o.LINEAR),r=i.heatmapFbo=t.createFramebuffer(e.width/4,e.height/4),function t(e,i,o,r){var a=e.gl;a.texImage2D(a.TEXTURE_2D,0,a.RGBA,i.width/4,i.height/4,0,a.RGBA,e.extTextureHalfFloat?e.extTextureHalfFloat.HALF_FLOAT_OES:a.UNSIGNED_BYTE,null),r.colorAttachment.set(o),e.extTextureHalfFloat&&a.checkFramebufferStatus(a.FRAMEBUFFER)!==a.FRAMEBUFFER_COMPLETE&&(e.extTextureHalfFloat=null,r.colorAttachment.setDirty(),t(e,i,o,r));}(t,e,a,r);}}(a,e,o),a.clear({color:t.Color.transparent});for(var u=0;u<r.length;u++){var h=r[u];if(!i.hasRenderableParent(h)){var p=i.getTile(h),d=p.getBucket(o);if(d){var _=d.programConfigurations.get(o.id),f=e.useProgram("heatmap",_),m=e.transform.zoom;f.draw(a,n.TRIANGLES,s,l,c,It.disabled,Ii(h.posMatrix,p,m,o.paint.get("heatmap-intensity")),o.id,d.layoutVertexBuffer,d.indexBuffer,d.segments,o.paint,e.transform.zoom,_);}}}a.viewport.set([0,0,e.width,e.height]);}else"translucent"===e.renderPass&&(e.context.setColorMode(e.colorModeForRenderPass()),function(e,i){var o=e.context,r=o.gl,a=i.heatmapFbo;if(a){o.activeTexture.set(r.TEXTURE0),r.bindTexture(r.TEXTURE_2D,a.colorAttachment.get()),o.activeTexture.set(r.TEXTURE1);var n=i.colorRampTexture;n||(n=i.colorRampTexture=new t.Texture(o,i.colorRamp,r.RGBA)),n.bind(r.LINEAR,r.CLAMP_TO_EDGE),e.useProgram("heatmapTexture").draw(o,r.TRIANGLES,wt.disabled,Et.disabled,e.colorModeForRenderPass(),It.disabled,Ci(e,i,0,1),i.id,e.viewportBuffer,e.quadTriangleIndexBuffer,e.viewportSegments,i.paint,e.transform.zoom);}}(e,o));},line:function(e,i,o,r){if("translucent"===e.renderPass){var a=o.paint.get("line-opacity"),n=o.paint.get("line-width");if(0!==a.constantOr(1)&&0!==n.constantOr(1)){var s=e.depthModeForSublayer(0,wt.ReadOnly),l=e.colorModeForRenderPass(),c=o.paint.get("line-dasharray"),u=o.paint.get("line-pattern"),h=u.constantOr(1),p=o.paint.get("line-gradient"),d=o.getCrossfadeParameters(),_=c?"lineSDF":h?"linePattern":p?"lineGradient":"line",f=e.context,m=f.gl,g=!0;if(p){f.activeTexture.set(m.TEXTURE0);var v=o.gradientTexture;if(!o.gradient)return;v||(v=o.gradientTexture=new t.Texture(f,o.gradient,m.RGBA)),v.bind(m.LINEAR,m.CLAMP_TO_EDGE);}for(var y=0,x=r;y<x.length;y+=1){var b=x[y],w=i.getTile(b);if(!h||w.patternsLoaded()){var E=w.getBucket(o);if(E){var T=E.programConfigurations.get(o.id),I=e.context.program.get(),C=e.useProgram(_,T),S=g||C.program!==I,z=u.constantOr(null);if(z&&w.imageAtlas){var L=w.imageAtlas.patternPositions[z.to],P=w.imageAtlas.patternPositions[z.from];L&&P&&T.setConstantPatternPositions(L,P);}var D=c?Ri(e,w,o,c,d):h?Di(e,w,o,d):p?Pi(e,w,o):Li(e,w,o);c&&(S||e.lineAtlas.dirty)?(f.activeTexture.set(m.TEXTURE0),e.lineAtlas.bind(f)):h&&(f.activeTexture.set(m.TEXTURE0),w.imageAtlasTexture.bind(m.LINEAR,m.CLAMP_TO_EDGE),T.updatePatternPaintBuffers(d)),C.draw(f,m.TRIANGLES,s,e.stencilModeForClipping(b),l,It.disabled,D,o.id,E.layoutVertexBuffer,E.indexBuffer,E.segments,o.paint,e.transform.zoom,T),g=!1;}}}}}},fill:function(e,i,o,r){var a=o.paint.get("fill-color"),n=o.paint.get("fill-opacity");if(0!==n.constantOr(1)){var s=e.colorModeForRenderPass(),l=o.paint.get("fill-pattern").constantOr(1)||1!==a.constantOr(t.Color.transparent).a||1!==n.constantOr(0)?"translucent":"opaque";if(e.renderPass===l){var c=e.depthModeForSublayer(1,"opaque"===e.renderPass?wt.ReadWrite:wt.ReadOnly);Hi(e,i,o,r,c,s,!1);}if("translucent"===e.renderPass&&o.paint.get("fill-antialias")){var u=e.depthModeForSublayer(o.getPaintProperty("fill-outline-color")?2:0,wt.ReadOnly);Hi(e,i,o,r,u,s,!0);}}},"fill-extrusion":function(t,e,i,o){if(0!==i.paint.get("fill-extrusion-opacity"))if("offscreen"===t.renderPass){Ki(t,i);var r=new wt(t.context.gl.LEQUAL,wt.ReadWrite,[0,1]),a=Et.disabled,n=t.colorModeForRenderPass();!function(t,e,i,o,r,a,n){for(var s=t.context,l=s.gl,c=i.paint.get("fill-extrusion-pattern"),u=c.constantOr(1),h=i.getCrossfadeParameters(),p=0,d=o;p<d.length;p+=1){var _=d[p],f=e.getTile(_),m=f.getBucket(i);if(m){var g=m.programConfigurations.get(i.id),v=t.useProgram(u?"fillExtrusionPattern":"fillExtrusion",g);u&&(t.context.activeTexture.set(l.TEXTURE0),f.imageAtlasTexture.bind(l.LINEAR,l.CLAMP_TO_EDGE),g.updatePatternPaintBuffers(h));var y=c.constantOr(null);if(y&&f.imageAtlas){var x=f.imageAtlas.patternPositions[y.to],b=f.imageAtlas.patternPositions[y.from];x&&b&&g.setConstantPatternPositions(x,b);}var w=t.translatePosMatrix(_.posMatrix,f,i.paint.get("fill-extrusion-translate"),i.paint.get("fill-extrusion-translate-anchor")),E=i.paint.get("fill-extrusion-vertical-gradient"),T=u?_i(w,t,E,_,h,f):di(w,t,E);v.draw(s,s.gl.TRIANGLES,r,a,n,It.backCCW,T,i.id,m.layoutVertexBuffer,m.indexBuffer,m.segments,i.paint,t.transform.zoom,g);}}}(t,e,i,o,r,a,n);}else"translucent"===t.renderPass&&Yi(t,i,i.paint.get("fill-extrusion-opacity"));},hillshade:function(t,e,i,o){if("offscreen"===t.renderPass||"translucent"===t.renderPass){for(var r=t.context,a=e.getSource().maxzoom,n=t.depthModeForSublayer(0,wt.ReadOnly),s=Et.disabled,l=t.colorModeForRenderPass(),c=0,u=o;c<u.length;c+=1){var h=u[c],p=e.getTile(h);p.needsHillshadePrepare&&"offscreen"===t.renderPass?Qi(t,p,i,a,n,s,l):"translucent"===t.renderPass&&Ji(t,p,i,n,s,l);}r.viewport.set([0,0,t.width,t.height]);}},raster:function(t,e,i,o){if("translucent"===t.renderPass&&0!==i.paint.get("raster-opacity"))for(var r=t.context,a=r.gl,n=e.getSource(),s=t.useProgram("raster"),l=Et.disabled,c=t.colorModeForRenderPass(),u=o.length&&o[0].overscaledZ,h=!t.options.moving,p=0,d=o;p<d.length;p+=1){var _=d[p],f=t.depthModeForSublayer(_.overscaledZ-u,1===i.paint.get("raster-opacity")?wt.ReadWrite:wt.ReadOnly,a.LESS),m=e.getTile(_),g=t.transform.calculatePosMatrix(_.toUnwrapped(),h);m.registerFadeDuration(i.paint.get("raster-fade-duration"));var v=e.findLoadedParent(_,0),y=$i(m,v,e,i,t.transform),x=void 0,b=void 0,w="nearest"===i.paint.get("raster-resampling")?a.NEAREST:a.LINEAR;r.activeTexture.set(a.TEXTURE0),m.texture.bind(w,a.CLAMP_TO_EDGE,a.LINEAR_MIPMAP_NEAREST),r.activeTexture.set(a.TEXTURE1),v?(v.texture.bind(w,a.CLAMP_TO_EDGE,a.LINEAR_MIPMAP_NEAREST),x=Math.pow(2,v.tileID.overscaledZ-m.tileID.overscaledZ),b=[m.tileID.canonical.x*x%1,m.tileID.canonical.y*x%1]):m.texture.bind(w,a.CLAMP_TO_EDGE,a.LINEAR_MIPMAP_NEAREST);var E=ki(g,b||[0,0],x||1,y,i);n instanceof L?s.draw(r,a.TRIANGLES,f,l,c,It.disabled,E,i.id,n.boundsBuffer,t.quadTriangleIndexBuffer,n.boundsSegments):m.maskedBoundsBuffer&&m.maskedIndexBuffer&&m.segments?s.draw(r,a.TRIANGLES,f,l,c,It.disabled,E,i.id,m.maskedBoundsBuffer,m.maskedIndexBuffer,m.segments,i.paint,t.transform.zoom):s.draw(r,a.TRIANGLES,f,l,c,It.disabled,E,i.id,t.rasterBoundsBuffer,t.quadTriangleIndexBuffer,t.rasterBoundsSegments);}},background:function(t,e,i){var o=i.paint.get("background-color"),r=i.paint.get("background-opacity");if(0!==r){var a=t.context,n=a.gl,s=t.transform,l=s.tileSize,c=i.paint.get("background-pattern");if(!t.isPatternMissing(c)){var u=c||1!==o.a||1!==r?"translucent":"opaque";if(t.renderPass===u){var h=Et.disabled,p=t.depthModeForSublayer(0,"opaque"===u?wt.ReadWrite:wt.ReadOnly),d=t.colorModeForRenderPass(),_=t.useProgram(c?"backgroundPattern":"background"),f=s.coveringTiles({tileSize:l});c&&(a.activeTexture.set(n.TEXTURE0),t.imageManager.bind(t.context));for(var m=i.getCrossfadeParameters(),g=0,v=f;g<v.length;g+=1){var y=v[g],x=t.transform.calculatePosMatrix(y.toUnwrapped()),b=c?Ui(x,r,t,c,{tileID:y,tileSize:l},m):Fi(x,r,o);_.draw(a,n.TRIANGLES,p,h,d,It.disabled,b,i.id,t.tileExtentBuffer,t.quadTriangleIndexBuffer,t.tileExtentSegments);}}}}},debug:function(t,e,i){for(var o=0;o<i.length;o++)to(t,e,i[o]);},custom:function(t,e,i){var o=t.context,r=i.implementation;if("offscreen"===t.renderPass){var a=r.prerender;a&&(t.setCustomLayerDefaults(),a.call(r,o.gl,t.transform.customLayerMatrix()),o.setDirty(),t.setBaseState()),"3d"===r.renderingMode&&(t.setCustomLayerDefaults(),Ki(t,i),r.render(o.gl,t.transform.customLayerMatrix()),o.setDirty(),t.setBaseState());}else if("translucent"===t.renderPass)if("3d"===r.renderingMode)Yi(t,i,1);else{t.setCustomLayerDefaults(),o.setColorMode(t.colorModeForRenderPass()),o.setStencilMode(Et.disabled);var n=t.depthModeForSublayer(0,wt.ReadOnly);o.setDepthMode(n),r.render(o.gl,t.transform.customLayerMatrix()),o.setDirty(),t.setBaseState(),o.bindFramebuffer.set(null);}}},oo=function(e,i){this.context=new Ct(e),this.transform=i,this._tileTextures={},this.setup(),this.numSublayers=St.maxUnderzooming+St.maxOverzooming+1,this.depthEpsilon=1/Math.pow(2,16),this.depthRboNeedsClear=!0,this.emptyProgramConfiguration=new t.ProgramConfiguration,this.crossTileSymbolIndex=new Pe;};function ro(t,e){if(t.y>e.y){var i=t;t=e,e=i;}return {x0:t.x,y0:t.y,x1:e.x,y1:e.y,dx:e.x-t.x,dy:e.y-t.y}}function ao(t,e,i,o,r){var a=Math.max(i,Math.floor(e.y0)),n=Math.min(o,Math.ceil(e.y1));if(t.x0===e.x0&&t.y0===e.y0?t.x0+e.dy/t.dy*t.dx<e.x1:t.x1-e.dy/t.dy*t.dx<e.x0){var s=t;t=e,e=s;}for(var l=t.dx/t.dy,c=e.dx/e.dy,u=t.dx>0,h=e.dx<0,p=a;p<n;p++){var d=l*Math.max(0,Math.min(t.dy,p+u-t.y0))+t.x0,_=c*Math.max(0,Math.min(e.dy,p+h-e.y0))+e.x0;r(Math.floor(_),Math.ceil(d),p);}}function no(t,e,i,o,r,a){var n,s=ro(t,e),l=ro(e,i),c=ro(i,t);s.dy>l.dy&&(n=s,s=l,l=n),s.dy>c.dy&&(n=s,s=c,c=n),l.dy>c.dy&&(n=l,l=c,c=n),s.dy&&ao(c,s,o,r,a),l.dy&&ao(c,l,o,r,a);}oo.prototype.resize=function(e,i){var o=this.context.gl;if(this.width=e*t.browser.devicePixelRatio,this.height=i*t.browser.devicePixelRatio,this.context.viewport.set([0,0,this.width,this.height]),this.style)for(var r=0,a=this.style._order;r<a.length;r+=1){var n=a[r];this.style._layers[n].resize();}this.depthRbo&&(o.deleteRenderbuffer(this.depthRbo),this.depthRbo=null);},oo.prototype.setup=function(){var e=this.context,i=new t.StructArrayLayout2i4;i.emplaceBack(0,0),i.emplaceBack(t.EXTENT,0),i.emplaceBack(0,t.EXTENT),i.emplaceBack(t.EXTENT,t.EXTENT),this.tileExtentBuffer=e.createVertexBuffer(i,ke.members),this.tileExtentSegments=t.SegmentVector.simpleSegment(0,0,4,2);var o=new t.StructArrayLayout2i4;o.emplaceBack(0,0),o.emplaceBack(t.EXTENT,0),o.emplaceBack(0,t.EXTENT),o.emplaceBack(t.EXTENT,t.EXTENT),this.debugBuffer=e.createVertexBuffer(o,ke.members),this.debugSegments=t.SegmentVector.simpleSegment(0,0,4,5);var r=new t.StructArrayLayout4i8;r.emplaceBack(0,0,0,0),r.emplaceBack(t.EXTENT,0,t.EXTENT,0),r.emplaceBack(0,t.EXTENT,0,t.EXTENT),r.emplaceBack(t.EXTENT,t.EXTENT,t.EXTENT,t.EXTENT),this.rasterBoundsBuffer=e.createVertexBuffer(r,t.rasterBoundsAttributes.members),this.rasterBoundsSegments=t.SegmentVector.simpleSegment(0,0,4,2);var a=new t.StructArrayLayout2i4;a.emplaceBack(0,0),a.emplaceBack(1,0),a.emplaceBack(0,1),a.emplaceBack(1,1),this.viewportBuffer=e.createVertexBuffer(a,ke.members),this.viewportSegments=t.SegmentVector.simpleSegment(0,0,4,2);var n=new t.StructArrayLayout1ui2;n.emplaceBack(0),n.emplaceBack(1),n.emplaceBack(3),n.emplaceBack(2),n.emplaceBack(0),this.tileBorderIndexBuffer=e.createIndexBuffer(n);var s=new t.StructArrayLayout3ui6;s.emplaceBack(0,1,2),s.emplaceBack(2,1,3),this.quadTriangleIndexBuffer=e.createIndexBuffer(s);var l=this.context.gl;this.stencilClearMode=new Et({func:l.ALWAYS,mask:0},0,255,l.ZERO,l.ZERO,l.ZERO);},oo.prototype.clearStencil=function(){var e=this.context,i=e.gl,o=t.create();t.ortho(o,0,this.width,this.height,0,0,1),t.scale(o,o,[i.drawingBufferWidth,i.drawingBufferHeight,0]),this.useProgram("clippingMask").draw(e,i.TRIANGLES,wt.disabled,this.stencilClearMode,Tt.disabled,It.disabled,Ti(o),"$clipping",this.viewportBuffer,this.quadTriangleIndexBuffer,this.viewportSegments);},oo.prototype._renderTileClippingMasks=function(t){var e=this.context,i=e.gl;e.setColorMode(Tt.disabled),e.setDepthMode(wt.disabled);var o=this.useProgram("clippingMask"),r=1;this._tileClippingMaskIDs={};for(var a=0,n=t;a<n.length;a+=1){var s=n[a],l=this._tileClippingMaskIDs[s.key]=r++;o.draw(e,i.TRIANGLES,wt.disabled,new Et({func:i.ALWAYS,mask:0},l,255,i.KEEP,i.KEEP,i.REPLACE),Tt.disabled,It.disabled,Ti(s.posMatrix),"$clipping",this.tileExtentBuffer,this.quadTriangleIndexBuffer,this.tileExtentSegments);}},oo.prototype.stencilModeForClipping=function(t){var e=this.context.gl;return new Et({func:e.EQUAL,mask:255},this._tileClippingMaskIDs[t.key],0,e.KEEP,e.KEEP,e.REPLACE)},oo.prototype.colorModeForRenderPass=function(){var e=this.context.gl;if(this._showOverdrawInspector){return new Tt([e.CONSTANT_COLOR,e.ONE],new t.Color(1/8,1/8,1/8,0),[!0,!0,!0,!0])}return "opaque"===this.renderPass?Tt.unblended:Tt.alphaBlended},oo.prototype.depthModeForSublayer=function(t,e,i){var o=1-((1+this.currentLayer)*this.numSublayers+t)*this.depthEpsilon;return new wt(i||this.context.gl.LEQUAL,e,[o,o])},oo.prototype.render=function(e,i){this.style=e,this.options=i,this.lineAtlas=e.lineAtlas,this.imageManager=e.imageManager,this.glyphManager=e.glyphManager,this.symbolFadeChange=e.placement.symbolFadeChange(t.browser.now());var o=this.style._order,r=this.style.sourceCaches;for(var a in r){var n=r[a];n.used&&n.prepare(this.context);}var s,l={},c={},u={};for(var h in r){var p=r[h];l[h]=p.getVisibleCoordinates(),c[h]=l[h].slice().reverse(),u[h]=p.getVisibleCoordinates(!0).reverse();}for(var d in r){var _=r[d],f=_.getSource();if("raster"===f.type||"raster-dem"===f.type){for(var m=[],g=0,v=l[d];g<v.length;g+=1){var y=v[g];m.push(_.getTile(y));}Zi(m,this.context);}}this.renderPass="offscreen",this.depthRboNeedsClear=!0;for(var x=0,b=o;x<b.length;x+=1){var w=b[x],E=this.style._layers[w];if(E.hasOffscreenPass()&&!E.isHidden(this.transform.zoom)){var T=c[E.source];("custom"===E.type||T.length)&&this.renderLayer(this,r[E.source],E,T);}}for(this.context.bindFramebuffer.set(null),this.context.clear({color:i.showOverdrawInspector?t.Color.black:t.Color.transparent,depth:1}),this._showOverdrawInspector=i.showOverdrawInspector,this.depthRange=(e._order.length+2)*this.numSublayers*this.depthEpsilon,this.renderPass="opaque",this.currentLayer=o.length-1;this.currentLayer>=0;this.currentLayer--){var I=this.style._layers[o[this.currentLayer]],C=r[I.source],S=l[I.source];I.source!==s&&C&&(this.clearStencil(),C.getSource().isTileClipped&&this._renderTileClippingMasks(S)),this.renderLayer(this,C,I,S),s=I.source;}for(this.renderPass="translucent",this.currentLayer=0,s=null;this.currentLayer<o.length;this.currentLayer++){var z=this.style._layers[o[this.currentLayer]],L=r[z.source],P=("symbol"===z.type?u:c)[z.source];z.source!==s&&L&&(this.clearStencil(),L.getSource().isTileClipped&&this._renderTileClippingMasks(l[z.source])),this.renderLayer(this,L,z,P),s=z.source;}if(this.options.showTileBoundaries)for(var D in r){io.debug(this,r[D],l[D]);break}this.setCustomLayerDefaults();},oo.prototype.setupOffscreenDepthRenderbuffer=function(){var t=this.context;this.depthRbo||(this.depthRbo=t.createRenderbuffer(t.gl.DEPTH_COMPONENT16,this.width,this.height));},oo.prototype.renderLayer=function(t,e,i,o){i.isHidden(this.transform.zoom)||("background"===i.type||"custom"===i.type||o.length)&&(this.id=i.id,io[i.type](t,e,i,o));},oo.prototype.translatePosMatrix=function(e,i,o,r,a){if(!o[0]&&!o[1])return e;var n=a?"map"===r?this.transform.angle:0:"viewport"===r?-this.transform.angle:0;if(n){var s=Math.sin(n),l=Math.cos(n);o=[o[0]*l-o[1]*s,o[0]*s+o[1]*l];}var c=[a?o[0]:le(i,o[0],this.transform.zoom),a?o[1]:le(i,o[1],this.transform.zoom),0],u=new Float32Array(16);return t.translate(u,e,c),u},oo.prototype.saveTileTexture=function(t){var e=this._tileTextures[t.size[0]];e?e.push(t):this._tileTextures[t.size[0]]=[t];},oo.prototype.getTileTexture=function(t){var e=this._tileTextures[t];return e&&e.length>0?e.pop():null},oo.prototype.isPatternMissing=function(t){if(!t)return !1;var e=this.imageManager.getPattern(t.from),i=this.imageManager.getPattern(t.to);return !e||!i},oo.prototype.useProgram=function(t,e){void 0===e&&(e=this.emptyProgramConfiguration),this.cache=this.cache||{};var i=""+t+(e.cacheKey||"")+(this._showOverdrawInspector?"/overdraw":"");return this.cache[i]||(this.cache[i]=new hi(this.context,ci[t],e,Ni[t],this._showOverdrawInspector)),this.cache[i]},oo.prototype.setCustomLayerDefaults=function(){this.context.unbindVAO(),this.context.cullFace.setDefault(),this.context.activeTexture.setDefault(),this.context.pixelStoreUnpack.setDefault(),this.context.pixelStoreUnpackPremultiplyAlpha.setDefault(),this.context.pixelStoreUnpackFlipY.setDefault();},oo.prototype.setBaseState=function(){var t=this.context.gl;this.context.cullFace.set(!1),this.context.viewport.set([0,0,this.width,this.height]),this.context.blendEquation.set(t.FUNC_ADD);};var so=function(e,i,o){this.tileSize=512,this.maxValidLatitude=85.051129,this._renderWorldCopies=void 0===o||o,this._minZoom=e||0,this._maxZoom=i||22,this.setMaxBounds(),this.width=0,this.height=0,this._center=new t.LngLat(0,0),this.zoom=0,this.angle=0,this._fov=.6435011087932844,this._pitch=0,this._unmodified=!0,this._posMatrixCache={},this._alignedPosMatrixCache={};},lo={minZoom:{configurable:!0},maxZoom:{configurable:!0},renderWorldCopies:{configurable:!0},worldSize:{configurable:!0},centerPoint:{configurable:!0},size:{configurable:!0},bearing:{configurable:!0},pitch:{configurable:!0},fov:{configurable:!0},zoom:{configurable:!0},center:{configurable:!0},unmodified:{configurable:!0},point:{configurable:!0}};so.prototype.clone=function(){var t=new so(this._minZoom,this._maxZoom,this._renderWorldCopies);return t.tileSize=this.tileSize,t.latRange=this.latRange,t.width=this.width,t.height=this.height,t._center=this._center,t.zoom=this.zoom,t.angle=this.angle,t._fov=this._fov,t._pitch=this._pitch,t._unmodified=this._unmodified,t._calcMatrices(),t},lo.minZoom.get=function(){return this._minZoom},lo.minZoom.set=function(t){this._minZoom!==t&&(this._minZoom=t,this.zoom=Math.max(this.zoom,t));},lo.maxZoom.get=function(){return this._maxZoom},lo.maxZoom.set=function(t){this._maxZoom!==t&&(this._maxZoom=t,this.zoom=Math.min(this.zoom,t));},lo.renderWorldCopies.get=function(){return this._renderWorldCopies},lo.renderWorldCopies.set=function(t){void 0===t?t=!0:null===t&&(t=!1),this._renderWorldCopies=t;},lo.worldSize.get=function(){return this.tileSize*this.scale},lo.centerPoint.get=function(){return this.size._div(2)},lo.size.get=function(){return new t.Point(this.width,this.height)},lo.bearing.get=function(){return -this.angle/Math.PI*180},lo.bearing.set=function(e){var i=-t.wrap(e,-180,180)*Math.PI/180;this.angle!==i&&(this._unmodified=!1,this.angle=i,this._calcMatrices(),this.rotationMatrix=t.create$4(),t.rotate(this.rotationMatrix,this.rotationMatrix,this.angle));},lo.pitch.get=function(){return this._pitch/Math.PI*180},lo.pitch.set=function(e){var i=t.clamp(e,0,60)/180*Math.PI;this._pitch!==i&&(this._unmodified=!1,this._pitch=i,this._calcMatrices());},lo.fov.get=function(){return this._fov/Math.PI*180},lo.fov.set=function(t){t=Math.max(.01,Math.min(60,t)),this._fov!==t&&(this._unmodified=!1,this._fov=t/180*Math.PI,this._calcMatrices());},lo.zoom.get=function(){return this._zoom},lo.zoom.set=function(t){var e=Math.min(Math.max(t,this.minZoom),this.maxZoom);this._zoom!==e&&(this._unmodified=!1,this._zoom=e,this.scale=this.zoomScale(e),this.tileZoom=Math.floor(e),this.zoomFraction=e-this.tileZoom,this._constrain(),this._calcMatrices());},lo.center.get=function(){return this._center},lo.center.set=function(t){t.lat===this._center.lat&&t.lng===this._center.lng||(this._unmodified=!1,this._center=t,this._constrain(),this._calcMatrices());},so.prototype.coveringZoomLevel=function(t){return (t.roundZoom?Math.round:Math.floor)(this.zoom+this.scaleZoom(this.tileSize/t.tileSize))},so.prototype.getVisibleUnwrappedCoordinates=function(e){var i=[new t.UnwrappedTileID(0,e)];if(this._renderWorldCopies)for(var o=this.pointCoordinate(new t.Point(0,0)),r=this.pointCoordinate(new t.Point(this.width,0)),a=this.pointCoordinate(new t.Point(this.width,this.height)),n=this.pointCoordinate(new t.Point(0,this.height)),s=Math.floor(Math.min(o.x,r.x,a.x,n.x)),l=Math.floor(Math.max(o.x,r.x,a.x,n.x)),c=s-1;c<=l+1;c++)0!==c&&i.push(new t.UnwrappedTileID(c,e));return i},so.prototype.coveringTiles=function(e){var i=this.coveringZoomLevel(e),o=i;if(void 0!==e.minzoom&&i<e.minzoom)return [];void 0!==e.maxzoom&&i>e.maxzoom&&(i=e.maxzoom);var r=t.MercatorCoordinate.fromLngLat(this.center),a=Math.pow(2,i),n=new t.Point(a*r.x-.5,a*r.y-.5);return function(e,i,o,r){void 0===r&&(r=!0);var a=1<<e,n={};function s(i,s,l){var c,u,h,p;if(l>=0&&l<=a)for(c=i;c<s;c++)u=Math.floor(c/a),h=(c%a+a)%a,0!==u&&!0!==r||(p=new t.OverscaledTileID(o,u,e,h,l),n[p.key]=p);}var l=i.map(function(e){return new t.Point(e.x,e.y)._mult(a)});return no(l[0],l[1],l[2],0,a,s),no(l[2],l[3],l[0],0,a,s),Object.keys(n).map(function(t){return n[t]})}(i,[this.pointCoordinate(new t.Point(0,0)),this.pointCoordinate(new t.Point(this.width,0)),this.pointCoordinate(new t.Point(this.width,this.height)),this.pointCoordinate(new t.Point(0,this.height))],e.reparseOverscaled?o:i,this._renderWorldCopies).sort(function(t,e){return n.dist(t.canonical)-n.dist(e.canonical)})},so.prototype.resize=function(t,e){this.width=t,this.height=e,this.pixelsToGLUnits=[2/t,-2/e],this._constrain(),this._calcMatrices();},lo.unmodified.get=function(){return this._unmodified},so.prototype.zoomScale=function(t){return Math.pow(2,t)},so.prototype.scaleZoom=function(t){return Math.log(t)/Math.LN2},so.prototype.project=function(e){var i=t.clamp(e.lat,-this.maxValidLatitude,this.maxValidLatitude);return new t.Point(t.mercatorXfromLng(e.lng)*this.worldSize,t.mercatorYfromLat(i)*this.worldSize)},so.prototype.unproject=function(e){return new t.MercatorCoordinate(e.x/this.worldSize,e.y/this.worldSize).toLngLat()},lo.point.get=function(){return this.project(this.center)},so.prototype.setLocationAtPoint=function(e,i){var o=this.pointCoordinate(i),r=this.pointCoordinate(this.centerPoint),a=this.locationCoordinate(e),n=new t.MercatorCoordinate(a.x-(o.x-r.x),a.y-(o.y-r.y));this.center=this.coordinateLocation(n),this._renderWorldCopies&&(this.center=this.center.wrap());},so.prototype.locationPoint=function(t){return this.coordinatePoint(this.locationCoordinate(t))},so.prototype.pointLocation=function(t){return this.coordinateLocation(this.pointCoordinate(t))},so.prototype.locationCoordinate=function(e){return t.MercatorCoordinate.fromLngLat(e)},so.prototype.coordinateLocation=function(t){return t.toLngLat()},so.prototype.pointCoordinate=function(e){var i=[e.x,e.y,0,1],o=[e.x,e.y,1,1];t.transformMat4(i,i,this.pixelMatrixInverse),t.transformMat4(o,o,this.pixelMatrixInverse);var r=i[3],a=o[3],n=i[0]/r,s=o[0]/a,l=i[1]/r,c=o[1]/a,u=i[2]/r,h=o[2]/a,p=u===h?0:(0-u)/(h-u);return new t.MercatorCoordinate(t.number(n,s,p)/this.worldSize,t.number(l,c,p)/this.worldSize)},so.prototype.coordinatePoint=function(e){var i=[e.x*this.worldSize,e.y*this.worldSize,0,1];return t.transformMat4(i,i,this.pixelMatrix),new t.Point(i[0]/i[3],i[1]/i[3])},so.prototype.getBounds=function(){return (new t.LngLatBounds).extend(this.pointLocation(new t.Point(0,0))).extend(this.pointLocation(new t.Point(this.width,0))).extend(this.pointLocation(new t.Point(this.width,this.height))).extend(this.pointLocation(new t.Point(0,this.height)))},so.prototype.getMaxBounds=function(){return this.latRange&&2===this.latRange.length&&this.lngRange&&2===this.lngRange.length?new t.LngLatBounds([this.lngRange[0],this.latRange[0]],[this.lngRange[1],this.latRange[1]]):null},so.prototype.setMaxBounds=function(t){t?(this.lngRange=[t.getWest(),t.getEast()],this.latRange=[t.getSouth(),t.getNorth()],this._constrain()):(this.lngRange=null,this.latRange=[-this.maxValidLatitude,this.maxValidLatitude]);},so.prototype.calculatePosMatrix=function(e,i){void 0===i&&(i=!1);var o=e.key,r=i?this._alignedPosMatrixCache:this._posMatrixCache;if(r[o])return r[o];var a=e.canonical,n=this.worldSize/this.zoomScale(a.z),s=a.x+Math.pow(2,a.z)*e.wrap,l=t.identity(new Float64Array(16));return t.translate(l,l,[s*n,a.y*n,0]),t.scale(l,l,[n/t.EXTENT,n/t.EXTENT,1]),t.multiply(l,i?this.alignedProjMatrix:this.projMatrix,l),r[o]=new Float32Array(l),r[o]},so.prototype.customLayerMatrix=function(){return this.mercatorMatrix.slice()},so.prototype._constrain=function(){if(this.center&&this.width&&this.height&&!this._constraining){this._constraining=!0;var e,i,o,r,a=-90,n=90,s=-180,l=180,c=this.size,u=this._unmodified;if(this.latRange){var h=this.latRange;a=t.mercatorYfromLat(h[1])*this.worldSize,e=(n=t.mercatorYfromLat(h[0])*this.worldSize)-a<c.y?c.y/(n-a):0;}if(this.lngRange){var p=this.lngRange;s=t.mercatorXfromLng(p[0])*this.worldSize,i=(l=t.mercatorXfromLng(p[1])*this.worldSize)-s<c.x?c.x/(l-s):0;}var d=this.point,_=Math.max(i||0,e||0);if(_)return this.center=this.unproject(new t.Point(i?(l+s)/2:d.x,e?(n+a)/2:d.y)),this.zoom+=this.scaleZoom(_),this._unmodified=u,void(this._constraining=!1);if(this.latRange){var f=d.y,m=c.y/2;f-m<a&&(r=a+m),f+m>n&&(r=n-m);}if(this.lngRange){var g=d.x,v=c.x/2;g-v<s&&(o=s+v),g+v>l&&(o=l-v);}void 0===o&&void 0===r||(this.center=this.unproject(new t.Point(void 0!==o?o:d.x,void 0!==r?r:d.y))),this._unmodified=u,this._constraining=!1;}},so.prototype._calcMatrices=function(){if(this.height){this.cameraToCenterDistance=.5/Math.tan(this._fov/2)*this.height;var e=this._fov/2,i=Math.PI/2+this._pitch,o=Math.sin(e)*this.cameraToCenterDistance/Math.sin(Math.PI-i-e),r=this.point,a=r.x,n=r.y,s=1.01*(Math.cos(Math.PI/2-this._pitch)*o+this.cameraToCenterDistance),l=new Float64Array(16);t.perspective(l,this._fov,this.width/this.height,1,s),t.scale(l,l,[1,-1,1]),t.translate(l,l,[0,0,-this.cameraToCenterDistance]),t.rotateX(l,l,this._pitch),t.rotateZ(l,l,this.angle),t.translate(l,l,[-a,-n,0]),this.mercatorMatrix=t.scale([],l,[this.worldSize,this.worldSize,this.worldSize]),t.scale(l,l,[1,1,t.mercatorZfromAltitude(1,this.center.lat)*this.worldSize,1]),this.projMatrix=l;var c=this.width%2/2,u=this.height%2/2,h=Math.cos(this.angle),p=Math.sin(this.angle),d=a-Math.round(a)+h*c+p*u,_=n-Math.round(n)+h*u+p*c,f=new Float64Array(l);if(t.translate(f,f,[d>.5?d-1:d,_>.5?_-1:_,0]),this.alignedProjMatrix=f,l=t.create(),t.scale(l,l,[this.width/2,-this.height/2,1]),t.translate(l,l,[1,-1,0]),this.pixelMatrix=t.multiply(new Float64Array(16),l,this.projMatrix),!(l=t.invert(new Float64Array(16),this.pixelMatrix)))throw new Error("failed to invert matrix");this.pixelMatrixInverse=l,this._posMatrixCache={},this._alignedPosMatrixCache={};}},so.prototype.maxPitchScaleFactor=function(){if(!this.pixelMatrixInverse)return 1;var e=this.pointCoordinate(new t.Point(0,0)),i=[e.x*this.worldSize,e.y*this.worldSize,0,1];return t.transformMat4(i,i,this.pixelMatrix)[3]/this.cameraToCenterDistance},Object.defineProperties(so.prototype,lo);var co=function(){var e,i,o,r,a;t.bindAll(["_onHashChange","_updateHash"],this),this._updateHash=(e=this._updateHashUnthrottled.bind(this),i=300,o=!1,r=0,a=function(){r=0,o&&(e(),r=setTimeout(a,i),o=!1);},function(){return o=!0,r||a(),r});};co.prototype.addTo=function(e){return this._map=e,t.window.addEventListener("hashchange",this._onHashChange,!1),this._map.on("moveend",this._updateHash),this},co.prototype.remove=function(){return t.window.removeEventListener("hashchange",this._onHashChange,!1),this._map.off("moveend",this._updateHash),clearTimeout(this._updateHash()),delete this._map,this},co.prototype.getHashString=function(t){var e=this._map.getCenter(),i=Math.round(100*this._map.getZoom())/100,o=Math.ceil((i*Math.LN2+Math.log(512/360/.5))/Math.LN10),r=Math.pow(10,o),a=Math.round(e.lng*r)/r,n=Math.round(e.lat*r)/r,s=this._map.getBearing(),l=this._map.getPitch(),c="";return c+=t?"#/"+a+"/"+n+"/"+i:"#"+i+"/"+n+"/"+a,(s||l)&&(c+="/"+Math.round(10*s)/10),l&&(c+="/"+Math.round(l)),c},co.prototype._onHashChange=function(){var e=t.window.location.hash.replace("#","").split("/");return e.length>=3&&(this._map.jumpTo({center:[+e[2],+e[1]],zoom:+e[0],bearing:+(e[3]||0),pitch:+(e[4]||0)}),!0)},co.prototype._updateHashUnthrottled=function(){var e=this.getHashString();try{t.window.history.replaceState(t.window.history.state,"",e);}catch(t){}};var uo=function(e){function o(o,r,a,n){void 0===n&&(n={});var s=i.mousePos(r.getCanvasContainer(),a),l=r.unproject(s);e.call(this,o,t.extend({point:s,lngLat:l,originalEvent:a},n)),this._defaultPrevented=!1,this.target=r;}e&&(o.__proto__=e),o.prototype=Object.create(e&&e.prototype),o.prototype.constructor=o;var r={defaultPrevented:{configurable:!0}};return o.prototype.preventDefault=function(){this._defaultPrevented=!0;},r.defaultPrevented.get=function(){return this._defaultPrevented},Object.defineProperties(o.prototype,r),o}(t.Event),ho=function(e){function o(o,r,a){var n=i.touchPos(r.getCanvasContainer(),a),s=n.map(function(t){return r.unproject(t)}),l=n.reduce(function(t,e,i,o){return t.add(e.div(o.length))},new t.Point(0,0)),c=r.unproject(l);e.call(this,o,{points:n,point:l,lngLats:s,lngLat:c,originalEvent:a}),this._defaultPrevented=!1;}e&&(o.__proto__=e),o.prototype=Object.create(e&&e.prototype),o.prototype.constructor=o;var r={defaultPrevented:{configurable:!0}};return o.prototype.preventDefault=function(){this._defaultPrevented=!0;},r.defaultPrevented.get=function(){return this._defaultPrevented},Object.defineProperties(o.prototype,r),o}(t.Event),po=function(t){function e(e,i,o){t.call(this,e,{originalEvent:o}),this._defaultPrevented=!1;}t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e;var i={defaultPrevented:{configurable:!0}};return e.prototype.preventDefault=function(){this._defaultPrevented=!0;},i.defaultPrevented.get=function(){return this._defaultPrevented},Object.defineProperties(e.prototype,i),e}(t.Event),_o=function(e){this._map=e,this._el=e.getCanvasContainer(),this._delta=0,t.bindAll(["_onWheel","_onTimeout","_onScrollFrame","_onScrollFinished"],this);};_o.prototype.isEnabled=function(){return !!this._enabled},_o.prototype.isActive=function(){return !!this._active},_o.prototype.isZooming=function(){return !!this._zooming},_o.prototype.enable=function(t){this.isEnabled()||(this._enabled=!0,this._aroundCenter=t&&"center"===t.around);},_o.prototype.disable=function(){this.isEnabled()&&(this._enabled=!1);},_o.prototype.onWheel=function(e){if(this.isEnabled()){var i=e.deltaMode===t.window.WheelEvent.DOM_DELTA_LINE?40*e.deltaY:e.deltaY,o=t.browser.now(),r=o-(this._lastWheelEventTime||0);this._lastWheelEventTime=o,0!==i&&i%4.000244140625==0?this._type="wheel":0!==i&&Math.abs(i)<4?this._type="trackpad":r>400?(this._type=null,this._lastValue=i,this._timeout=setTimeout(this._onTimeout,40,e)):this._type||(this._type=Math.abs(r*i)<200?"trackpad":"wheel",this._timeout&&(clearTimeout(this._timeout),this._timeout=null,i+=this._lastValue)),e.shiftKey&&i&&(i/=4),this._type&&(this._lastWheelEvent=e,this._delta-=i,this.isActive()||this._start(e)),e.preventDefault();}},_o.prototype._onTimeout=function(t){this._type="wheel",this._delta-=this._lastValue,this.isActive()||this._start(t);},_o.prototype._start=function(e){if(this._delta){this._frameId&&(this._map._cancelRenderFrame(this._frameId),this._frameId=null),this._active=!0,this._zooming=!0,this._map.fire(new t.Event("movestart",{originalEvent:e})),this._map.fire(new t.Event("zoomstart",{originalEvent:e})),this._finishTimeout&&clearTimeout(this._finishTimeout);var o=i.mousePos(this._el,e);this._around=t.LngLat.convert(this._aroundCenter?this._map.getCenter():this._map.unproject(o)),this._aroundPoint=this._map.transform.locationPoint(this._around),this._frameId||(this._frameId=this._map._requestRenderFrame(this._onScrollFrame));}},_o.prototype._onScrollFrame=function(){var e=this;if(this._frameId=null,this.isActive()){var i=this._map.transform;if(0!==this._delta){var o="wheel"===this._type&&Math.abs(this._delta)>4.000244140625?1/450:.01,r=2/(1+Math.exp(-Math.abs(this._delta*o)));this._delta<0&&0!==r&&(r=1/r);var a="number"==typeof this._targetZoom?i.zoomScale(this._targetZoom):i.scale;this._targetZoom=Math.min(i.maxZoom,Math.max(i.minZoom,i.scaleZoom(a*r))),"wheel"===this._type&&(this._startZoom=i.zoom,this._easing=this._smoothOutEasing(200)),this._delta=0;}var n="number"==typeof this._targetZoom?this._targetZoom:i.zoom,s=this._startZoom,l=this._easing,c=!1;if("wheel"===this._type&&s&&l){var u=Math.min((t.browser.now()-this._lastWheelEventTime)/200,1),h=l(u);i.zoom=t.number(s,n,h),u<1?this._frameId||(this._frameId=this._map._requestRenderFrame(this._onScrollFrame)):c=!0;}else i.zoom=n,c=!0;i.setLocationAtPoint(this._around,this._aroundPoint),this._map.fire(new t.Event("move",{originalEvent:this._lastWheelEvent})),this._map.fire(new t.Event("zoom",{originalEvent:this._lastWheelEvent})),c&&(this._active=!1,this._finishTimeout=setTimeout(function(){e._zooming=!1,e._map.fire(new t.Event("zoomend",{originalEvent:e._lastWheelEvent})),e._map.fire(new t.Event("moveend",{originalEvent:e._lastWheelEvent})),delete e._targetZoom;},200));}},_o.prototype._smoothOutEasing=function(e){var i=t.ease;if(this._prevEase){var o=this._prevEase,r=(t.browser.now()-o.start)/o.duration,a=o.easing(r+.01)-o.easing(r),n=.27/Math.sqrt(a*a+1e-4)*.01,s=Math.sqrt(.0729-n*n);i=t.bezier(n,s,.25,1);}return this._prevEase={start:t.browser.now(),duration:e,easing:i},i};var fo=function(e,i){this._map=e,this._el=e.getCanvasContainer(),this._container=e.getContainer(),this._clickTolerance=i.clickTolerance||1,t.bindAll(["_onMouseMove","_onMouseUp","_onKeyDown"],this);};fo.prototype.isEnabled=function(){return !!this._enabled},fo.prototype.isActive=function(){return !!this._active},fo.prototype.enable=function(){this.isEnabled()||(this._enabled=!0);},fo.prototype.disable=function(){this.isEnabled()&&(this._enabled=!1);},fo.prototype.onMouseDown=function(e){this.isEnabled()&&e.shiftKey&&0===e.button&&(t.window.document.addEventListener("mousemove",this._onMouseMove,!1),t.window.document.addEventListener("keydown",this._onKeyDown,!1),t.window.document.addEventListener("mouseup",this._onMouseUp,!1),i.disableDrag(),this._startPos=this._lastPos=i.mousePos(this._el,e),this._active=!0);},fo.prototype._onMouseMove=function(t){var e=i.mousePos(this._el,t);if(!(this._lastPos.equals(e)||!this._box&&e.dist(this._startPos)<this._clickTolerance)){var o=this._startPos;this._lastPos=e,this._box||(this._box=i.create("div","mapboxgl-boxzoom",this._container),this._container.classList.add("mapboxgl-crosshair"),this._fireEvent("boxzoomstart",t));var r=Math.min(o.x,e.x),a=Math.max(o.x,e.x),n=Math.min(o.y,e.y),s=Math.max(o.y,e.y);i.setTransform(this._box,"translate("+r+"px,"+n+"px)"),this._box.style.width=a-r+"px",this._box.style.height=s-n+"px";}},fo.prototype._onMouseUp=function(e){if(0===e.button){var o=this._startPos,r=i.mousePos(this._el,e);this._finish(),i.suppressClick(),o.x===r.x&&o.y===r.y?this._fireEvent("boxzoomcancel",e):this._map.fitScreenCoordinates(o,r,this._map.getBearing(),{linear:!0}).fire(new t.Event("boxzoomend",{originalEvent:e}));}},fo.prototype._onKeyDown=function(t){27===t.keyCode&&(this._finish(),this._fireEvent("boxzoomcancel",t));},fo.prototype._finish=function(){this._active=!1,t.window.document.removeEventListener("mousemove",this._onMouseMove,!1),t.window.document.removeEventListener("keydown",this._onKeyDown,!1),t.window.document.removeEventListener("mouseup",this._onMouseUp,!1),this._container.classList.remove("mapboxgl-crosshair"),this._box&&(i.remove(this._box),this._box=null),i.enableDrag(),delete this._startPos,delete this._lastPos;},fo.prototype._fireEvent=function(e,i){return this._map.fire(new t.Event(e,{originalEvent:i}))};var mo=t.bezier(0,0,.25,1),go=function(e,i){this._map=e,this._el=i.element||e.getCanvasContainer(),this._state="disabled",this._button=i.button||"right",this._bearingSnap=i.bearingSnap||0,this._pitchWithRotate=!1!==i.pitchWithRotate,t.bindAll(["onMouseDown","_onMouseMove","_onMouseUp","_onBlur","_onDragFrame"],this);};go.prototype.isEnabled=function(){return "disabled"!==this._state},go.prototype.isActive=function(){return "active"===this._state},go.prototype.enable=function(){this.isEnabled()||(this._state="enabled");},go.prototype.disable=function(){if(this.isEnabled())switch(this._state){case"active":this._state="disabled",this._unbind(),this._deactivate(),this._fireEvent("rotateend"),this._pitchWithRotate&&this._fireEvent("pitchend"),this._fireEvent("moveend");break;case"pending":this._state="disabled",this._unbind();break;default:this._state="disabled";}},go.prototype.onMouseDown=function(e){if("enabled"===this._state){if("right"===this._button){if(this._eventButton=i.mouseButton(e),this._eventButton!==(e.ctrlKey?0:2))return}else{if(e.ctrlKey||0!==i.mouseButton(e))return;this._eventButton=0;}i.disableDrag(),t.window.document.addEventListener("mousemove",this._onMouseMove,{capture:!0}),t.window.document.addEventListener("mouseup",this._onMouseUp),t.window.addEventListener("blur",this._onBlur),this._state="pending",this._inertia=[[t.browser.now(),this._map.getBearing()]],this._startPos=this._lastPos=i.mousePos(this._el,e),this._center=this._map.transform.centerPoint,e.preventDefault();}},go.prototype._onMouseMove=function(t){var e=i.mousePos(this._el,t);this._lastPos.equals(e)||(this._lastMoveEvent=t,this._lastPos=e,"pending"===this._state&&(this._state="active",this._fireEvent("rotatestart",t),this._fireEvent("movestart",t),this._pitchWithRotate&&this._fireEvent("pitchstart",t)),this._frameId||(this._frameId=this._map._requestRenderFrame(this._onDragFrame)));},go.prototype._onDragFrame=function(){this._frameId=null;var e=this._lastMoveEvent;if(e){var i=this._map.transform,o=this._startPos,r=this._lastPos,a=.8*(o.x-r.x),n=-.5*(o.y-r.y),s=i.bearing-a,l=i.pitch-n,c=this._inertia,u=c[c.length-1];this._drainInertiaBuffer(),c.push([t.browser.now(),this._map._normalizeBearing(s,u[1])]),i.bearing=s,this._pitchWithRotate&&(this._fireEvent("pitch",e),i.pitch=l),this._fireEvent("rotate",e),this._fireEvent("move",e),delete this._lastMoveEvent,this._startPos=this._lastPos;}},go.prototype._onMouseUp=function(t){if(i.mouseButton(t)===this._eventButton)switch(this._state){case"active":this._state="enabled",i.suppressClick(),this._unbind(),this._deactivate(),this._inertialRotate(t);break;case"pending":this._state="enabled",this._unbind();}},go.prototype._onBlur=function(t){switch(this._state){case"active":this._state="enabled",this._unbind(),this._deactivate(),this._fireEvent("rotateend",t),this._pitchWithRotate&&this._fireEvent("pitchend",t),this._fireEvent("moveend",t);break;case"pending":this._state="enabled",this._unbind();}},go.prototype._unbind=function(){t.window.document.removeEventListener("mousemove",this._onMouseMove,{capture:!0}),t.window.document.removeEventListener("mouseup",this._onMouseUp),t.window.removeEventListener("blur",this._onBlur),i.enableDrag();},go.prototype._deactivate=function(){this._frameId&&(this._map._cancelRenderFrame(this._frameId),this._frameId=null),delete this._lastMoveEvent,delete this._startPos,delete this._lastPos;},go.prototype._inertialRotate=function(t){var e=this;this._fireEvent("rotateend",t),this._drainInertiaBuffer();var i=this._map,o=i.getBearing(),r=this._inertia,a=function(){Math.abs(o)<e._bearingSnap?i.resetNorth({noMoveStart:!0},{originalEvent:t}):e._fireEvent("moveend",t),e._pitchWithRotate&&e._fireEvent("pitchend",t);};if(r.length<2)a();else{var n=r[0],s=r[r.length-1],l=r[r.length-2],c=i._normalizeBearing(o,l[1]),u=s[1]-n[1],h=u<0?-1:1,p=(s[0]-n[0])/1e3;if(0!==u&&0!==p){var d=Math.abs(u*(.25/p));d>180&&(d=180);var _=d/180;c+=h*d*(_/2),Math.abs(i._normalizeBearing(c,0))<this._bearingSnap&&(c=i._normalizeBearing(0,c)),i.rotateTo(c,{duration:1e3*_,easing:mo,noMoveStart:!0},{originalEvent:t});}else a();}},go.prototype._fireEvent=function(e,i){return this._map.fire(new t.Event(e,i?{originalEvent:i}:{}))},go.prototype._drainInertiaBuffer=function(){for(var e=this._inertia,i=t.browser.now();e.length>0&&i-e[0][0]>160;)e.shift();};var vo=t.bezier(0,0,.3,1),yo=function(e,i){this._map=e,this._el=e.getCanvasContainer(),this._state="disabled",this._clickTolerance=i.clickTolerance||1,t.bindAll(["_onMove","_onMouseUp","_onTouchEnd","_onBlur","_onDragFrame"],this);};yo.prototype.isEnabled=function(){return "disabled"!==this._state},yo.prototype.isActive=function(){return "active"===this._state},yo.prototype.enable=function(){this.isEnabled()||(this._el.classList.add("mapboxgl-touch-drag-pan"),this._state="enabled");},yo.prototype.disable=function(){if(this.isEnabled())switch(this._el.classList.remove("mapboxgl-touch-drag-pan"),this._state){case"active":this._state="disabled",this._unbind(),this._deactivate(),this._fireEvent("dragend"),this._fireEvent("moveend");break;case"pending":this._state="disabled",this._unbind();break;default:this._state="disabled";}},yo.prototype.onMouseDown=function(e){"enabled"===this._state&&(e.ctrlKey||0!==i.mouseButton(e)||(i.addEventListener(t.window.document,"mousemove",this._onMove,{capture:!0}),i.addEventListener(t.window.document,"mouseup",this._onMouseUp),this._start(e)));},yo.prototype.onTouchStart=function(e){"enabled"===this._state&&(e.touches.length>1||(i.addEventListener(t.window.document,"touchmove",this._onMove,{capture:!0,passive:!1}),i.addEventListener(t.window.document,"touchend",this._onTouchEnd),this._start(e)));},yo.prototype._start=function(e){t.window.addEventListener("blur",this._onBlur),this._state="pending",this._startPos=this._mouseDownPos=this._lastPos=i.mousePos(this._el,e),this._inertia=[[t.browser.now(),this._startPos]];},yo.prototype._onMove=function(e){e.preventDefault();var o=i.mousePos(this._el,e);this._lastPos.equals(o)||"pending"===this._state&&o.dist(this._mouseDownPos)<this._clickTolerance||(this._lastMoveEvent=e,this._lastPos=o,this._drainInertiaBuffer(),this._inertia.push([t.browser.now(),this._lastPos]),"pending"===this._state&&(this._state="active",this._fireEvent("dragstart",e),this._fireEvent("movestart",e)),this._frameId||(this._frameId=this._map._requestRenderFrame(this._onDragFrame)));},yo.prototype._onDragFrame=function(){this._frameId=null;var t=this._lastMoveEvent;if(t){var e=this._map.transform;e.setLocationAtPoint(e.pointLocation(this._startPos),this._lastPos),this._fireEvent("drag",t),this._fireEvent("move",t),this._startPos=this._lastPos,delete this._lastMoveEvent;}},yo.prototype._onMouseUp=function(t){if(0===i.mouseButton(t))switch(this._state){case"active":this._state="enabled",i.suppressClick(),this._unbind(),this._deactivate(),this._inertialPan(t);break;case"pending":this._state="enabled",this._unbind();}},yo.prototype._onTouchEnd=function(t){switch(this._state){case"active":this._state="enabled",this._unbind(),this._deactivate(),this._inertialPan(t);break;case"pending":this._state="enabled",this._unbind();}},yo.prototype._onBlur=function(t){switch(this._state){case"active":this._state="enabled",this._unbind(),this._deactivate(),this._fireEvent("dragend",t),this._fireEvent("moveend",t);break;case"pending":this._state="enabled",this._unbind();}},yo.prototype._unbind=function(){i.removeEventListener(t.window.document,"touchmove",this._onMove,{capture:!0,passive:!1}),i.removeEventListener(t.window.document,"touchend",this._onTouchEnd),i.removeEventListener(t.window.document,"mousemove",this._onMove,{capture:!0}),i.removeEventListener(t.window.document,"mouseup",this._onMouseUp),i.removeEventListener(t.window,"blur",this._onBlur);},yo.prototype._deactivate=function(){this._frameId&&(this._map._cancelRenderFrame(this._frameId),this._frameId=null),delete this._lastMoveEvent,delete this._startPos,delete this._mouseDownPos,delete this._lastPos;},yo.prototype._inertialPan=function(t){this._fireEvent("dragend",t),this._drainInertiaBuffer();var e=this._inertia;if(e.length<2)this._fireEvent("moveend",t);else{var i=e[e.length-1],o=e[0],r=i[1].sub(o[1]),a=(i[0]-o[0])/1e3;if(0===a||i[1].equals(o[1]))this._fireEvent("moveend",t);else{var n=r.mult(.3/a),s=n.mag();s>1400&&(s=1400,n._unit()._mult(s));var l=s/750,c=n.mult(-l/2);this._map.panBy(c,{duration:1e3*l,easing:vo,noMoveStart:!0},{originalEvent:t});}}},yo.prototype._fireEvent=function(e,i){return this._map.fire(new t.Event(e,i?{originalEvent:i}:{}))},yo.prototype._drainInertiaBuffer=function(){for(var e=this._inertia,i=t.browser.now();e.length>0&&i-e[0][0]>160;)e.shift();};var xo=function(e){this._map=e,this._el=e.getCanvasContainer(),t.bindAll(["_onKeyDown"],this);};function bo(t){return t*(2-t)}xo.prototype.isEnabled=function(){return !!this._enabled},xo.prototype.enable=function(){this.isEnabled()||(this._el.addEventListener("keydown",this._onKeyDown,!1),this._enabled=!0);},xo.prototype.disable=function(){this.isEnabled()&&(this._el.removeEventListener("keydown",this._onKeyDown),this._enabled=!1);},xo.prototype._onKeyDown=function(t){if(!(t.altKey||t.ctrlKey||t.metaKey)){var e=0,i=0,o=0,r=0,a=0;switch(t.keyCode){case 61:case 107:case 171:case 187:e=1;break;case 189:case 109:case 173:e=-1;break;case 37:t.shiftKey?i=-1:(t.preventDefault(),r=-1);break;case 39:t.shiftKey?i=1:(t.preventDefault(),r=1);break;case 38:t.shiftKey?o=1:(t.preventDefault(),a=-1);break;case 40:t.shiftKey?o=-1:(a=1,t.preventDefault());break;default:return}var n=this._map,s=n.getZoom(),l={duration:300,delayEndEvents:500,easing:bo,zoom:e?Math.round(s)+e*(t.shiftKey?2:1):s,bearing:n.getBearing()+15*i,pitch:n.getPitch()+10*o,offset:[100*-r,100*-a],center:n.getCenter()};n.easeTo(l,{originalEvent:t});}};var wo=function(e){this._map=e,t.bindAll(["_onDblClick","_onZoomEnd"],this);};wo.prototype.isEnabled=function(){return !!this._enabled},wo.prototype.isActive=function(){return !!this._active},wo.prototype.enable=function(){this.isEnabled()||(this._enabled=!0);},wo.prototype.disable=function(){this.isEnabled()&&(this._enabled=!1);},wo.prototype.onTouchStart=function(t){var e=this;this.isEnabled()&&(t.points.length>1||(this._tapped?(clearTimeout(this._tapped),this._tapped=null,this._zoom(t)):this._tapped=setTimeout(function(){e._tapped=null;},300)));},wo.prototype.onDblClick=function(t){this.isEnabled()&&(t.originalEvent.preventDefault(),this._zoom(t));},wo.prototype._zoom=function(t){this._active=!0,this._map.on("zoomend",this._onZoomEnd),this._map.zoomTo(this._map.getZoom()+(t.originalEvent.shiftKey?-1:1),{around:t.lngLat},t);},wo.prototype._onZoomEnd=function(){this._active=!1,this._map.off("zoomend",this._onZoomEnd);};var Eo=t.bezier(0,0,.15,1),To=function(e){this._map=e,this._el=e.getCanvasContainer(),t.bindAll(["_onMove","_onEnd","_onTouchFrame"],this);};To.prototype.isEnabled=function(){return !!this._enabled},To.prototype.enable=function(t){this.isEnabled()||(this._el.classList.add("mapboxgl-touch-zoom-rotate"),this._enabled=!0,this._aroundCenter=!!t&&"center"===t.around);},To.prototype.disable=function(){this.isEnabled()&&(this._el.classList.remove("mapboxgl-touch-zoom-rotate"),this._enabled=!1);},To.prototype.disableRotation=function(){this._rotationDisabled=!0;},To.prototype.enableRotation=function(){this._rotationDisabled=!1;},To.prototype.onStart=function(e){if(this.isEnabled()&&2===e.touches.length){var o=i.mousePos(this._el,e.touches[0]),r=i.mousePos(this._el,e.touches[1]),a=o.add(r).div(2);this._startVec=o.sub(r),this._startAround=this._map.transform.pointLocation(a),this._gestureIntent=void 0,this._inertia=[],i.addEventListener(t.window.document,"touchmove",this._onMove,{passive:!1}),i.addEventListener(t.window.document,"touchend",this._onEnd);}},To.prototype._getTouchEventData=function(t){var e=i.mousePos(this._el,t.touches[0]),o=i.mousePos(this._el,t.touches[1]),r=e.sub(o);return {vec:r,center:e.add(o).div(2),scale:r.mag()/this._startVec.mag(),bearing:this._rotationDisabled?0:180*r.angleWith(this._startVec)/Math.PI}},To.prototype._onMove=function(e){if(2===e.touches.length){var i=this._getTouchEventData(e),o=i.vec,r=i.scale,a=i.bearing;if(!this._gestureIntent){var n=this._rotationDisabled&&1!==r||Math.abs(1-r)>.15;Math.abs(a)>10?this._gestureIntent="rotate":n&&(this._gestureIntent="zoom"),this._gestureIntent&&(this._map.fire(new t.Event(this._gestureIntent+"start",{originalEvent:e})),this._map.fire(new t.Event("movestart",{originalEvent:e})),this._startVec=o);}this._lastTouchEvent=e,this._frameId||(this._frameId=this._map._requestRenderFrame(this._onTouchFrame)),e.preventDefault();}},To.prototype._onTouchFrame=function(){this._frameId=null;var e=this._gestureIntent;if(e){var i=this._map.transform;this._startScale||(this._startScale=i.scale,this._startBearing=i.bearing);var o=this._getTouchEventData(this._lastTouchEvent),r=o.center,a=o.bearing,n=o.scale,s=i.pointLocation(r),l=i.locationPoint(s);"rotate"===e&&(i.bearing=this._startBearing+a),i.zoom=i.scaleZoom(this._startScale*n),i.setLocationAtPoint(this._startAround,l),this._map.fire(new t.Event(e,{originalEvent:this._lastTouchEvent})),this._map.fire(new t.Event("move",{originalEvent:this._lastTouchEvent})),this._drainInertiaBuffer(),this._inertia.push([t.browser.now(),n,r]);}},To.prototype._onEnd=function(e){i.removeEventListener(t.window.document,"touchmove",this._onMove,{passive:!1}),i.removeEventListener(t.window.document,"touchend",this._onEnd);var o=this._gestureIntent,r=this._startScale;if(this._frameId&&(this._map._cancelRenderFrame(this._frameId),this._frameId=null),delete this._gestureIntent,delete this._startScale,delete this._startBearing,delete this._lastTouchEvent,o){this._map.fire(new t.Event(o+"end",{originalEvent:e})),this._drainInertiaBuffer();var a=this._inertia,n=this._map;if(a.length<2)n.snapToNorth({},{originalEvent:e});else{var s=a[a.length-1],l=a[0],c=n.transform.scaleZoom(r*s[1]),u=n.transform.scaleZoom(r*l[1]),h=c-u,p=(s[0]-l[0])/1e3,d=s[2];if(0!==p&&c!==u){var _=.15*h/p;Math.abs(_)>2.5&&(_=_>0?2.5:-2.5);var f=1e3*Math.abs(_/(12*.15)),m=c+_*f/2e3;m<0&&(m=0),n.easeTo({zoom:m,duration:f,easing:Eo,around:this._aroundCenter?n.getCenter():n.unproject(d),noMoveStart:!0},{originalEvent:e});}else n.snapToNorth({},{originalEvent:e});}}},To.prototype._drainInertiaBuffer=function(){for(var e=this._inertia,i=t.browser.now();e.length>2&&i-e[0][0]>160;)e.shift();};var Io={scrollZoom:_o,boxZoom:fo,dragRotate:go,dragPan:yo,keyboard:xo,doubleClickZoom:wo,touchZoomRotate:To};var Co=function(e){function i(i,o){e.call(this),this._moving=!1,this._zooming=!1,this.transform=i,this._bearingSnap=o.bearingSnap,t.bindAll(["_renderFrameCallback"],this);}return e&&(i.__proto__=e),i.prototype=Object.create(e&&e.prototype),i.prototype.constructor=i,i.prototype.getCenter=function(){return this.transform.center},i.prototype.setCenter=function(t,e){return this.jumpTo({center:t},e)},i.prototype.panBy=function(e,i,o){return e=t.Point.convert(e).mult(-1),this.panTo(this.transform.center,t.extend({offset:e},i),o)},i.prototype.panTo=function(e,i,o){return this.easeTo(t.extend({center:e},i),o)},i.prototype.getZoom=function(){return this.transform.zoom},i.prototype.setZoom=function(t,e){return this.jumpTo({zoom:t},e),this},i.prototype.zoomTo=function(e,i,o){return this.easeTo(t.extend({zoom:e},i),o)},i.prototype.zoomIn=function(t,e){return this.zoomTo(this.getZoom()+1,t,e),this},i.prototype.zoomOut=function(t,e){return this.zoomTo(this.getZoom()-1,t,e),this},i.prototype.getBearing=function(){return this.transform.bearing},i.prototype.setBearing=function(t,e){return this.jumpTo({bearing:t},e),this},i.prototype.rotateTo=function(e,i,o){return this.easeTo(t.extend({bearing:e},i),o)},i.prototype.resetNorth=function(e,i){return this.rotateTo(0,t.extend({duration:1e3},e),i),this},i.prototype.snapToNorth=function(t,e){return Math.abs(this.getBearing())<this._bearingSnap?this.resetNorth(t,e):this},i.prototype.getPitch=function(){return this.transform.pitch},i.prototype.setPitch=function(t,e){return this.jumpTo({pitch:t},e),this},i.prototype.cameraForBounds=function(e,i){return e=t.LngLatBounds.convert(e),this._cameraForBoxAndBearing(e.getNorthWest(),e.getSouthEast(),0,i)},i.prototype._cameraForBoxAndBearing=function(e,i,o,r){if("number"==typeof(r=t.extend({padding:{top:0,bottom:0,right:0,left:0},offset:[0,0],maxZoom:this.transform.maxZoom},r)).padding){var a=r.padding;r.padding={top:a,bottom:a,right:a,left:a};}if(t.isEqual(Object.keys(r.padding).sort(function(t,e){return t<e?-1:t>e?1:0}),["bottom","left","right","top"])){var n=this.transform,s=n.project(t.LngLat.convert(e)),l=n.project(t.LngLat.convert(i)),c=s.rotate(-o*Math.PI/180),u=l.rotate(-o*Math.PI/180),h=new t.Point(Math.max(c.x,u.x),Math.max(c.y,u.y)),p=new t.Point(Math.min(c.x,u.x),Math.min(c.y,u.y)),d=h.sub(p),_=(n.width-r.padding.left-r.padding.right)/d.x,f=(n.height-r.padding.top-r.padding.bottom)/d.y;if(!(f<0||_<0)){var m=Math.min(n.scaleZoom(n.scale*Math.min(_,f)),r.maxZoom),g=t.Point.convert(r.offset),v=(r.padding.left-r.padding.right)/2,y=(r.padding.top-r.padding.bottom)/2,x=new t.Point(g.x+v,g.y+y).mult(n.scale/n.zoomScale(m));return {center:n.unproject(s.add(l).div(2).sub(x)),zoom:m,bearing:o}}t.warnOnce("Map cannot fit within canvas with the given bounds, padding, and/or offset.");}else t.warnOnce("options.padding must be a positive number, or an Object with keys 'bottom', 'left', 'right', 'top'");},i.prototype.fitBounds=function(t,e,i){return this._fitInternal(this.cameraForBounds(t,e),e,i)},i.prototype.fitScreenCoordinates=function(e,i,o,r,a){return this._fitInternal(this._cameraForBoxAndBearing(this.transform.pointLocation(t.Point.convert(e)),this.transform.pointLocation(t.Point.convert(i)),o,r),r,a)},i.prototype._fitInternal=function(e,i,o){return e?(i=t.extend(e,i)).linear?this.easeTo(i,o):this.flyTo(i,o):this},i.prototype.jumpTo=function(e,i){this.stop();var o=this.transform,r=!1,a=!1,n=!1;return "zoom"in e&&o.zoom!==+e.zoom&&(r=!0,o.zoom=+e.zoom),void 0!==e.center&&(o.center=t.LngLat.convert(e.center)),"bearing"in e&&o.bearing!==+e.bearing&&(a=!0,o.bearing=+e.bearing),"pitch"in e&&o.pitch!==+e.pitch&&(n=!0,o.pitch=+e.pitch),this.fire(new t.Event("movestart",i)).fire(new t.Event("move",i)),r&&this.fire(new t.Event("zoomstart",i)).fire(new t.Event("zoom",i)).fire(new t.Event("zoomend",i)),a&&this.fire(new t.Event("rotatestart",i)).fire(new t.Event("rotate",i)).fire(new t.Event("rotateend",i)),n&&this.fire(new t.Event("pitchstart",i)).fire(new t.Event("pitch",i)).fire(new t.Event("pitchend",i)),this.fire(new t.Event("moveend",i))},i.prototype.easeTo=function(e,i){var o=this;this.stop(),!1===(e=t.extend({offset:[0,0],duration:500,easing:t.ease},e)).animate&&(e.duration=0);var r=this.transform,a=this.getZoom(),n=this.getBearing(),s=this.getPitch(),l="zoom"in e?+e.zoom:a,c="bearing"in e?this._normalizeBearing(e.bearing,n):n,u="pitch"in e?+e.pitch:s,h=r.centerPoint.add(t.Point.convert(e.offset)),p=r.pointLocation(h),d=t.LngLat.convert(e.center||p);this._normalizeCenter(d);var _,f,m=r.project(p),g=r.project(d).sub(m),v=r.zoomScale(l-a);return e.around&&(_=t.LngLat.convert(e.around),f=r.locationPoint(_)),this._zooming=l!==a,this._rotating=n!==c,this._pitching=u!==s,this._prepareEase(i,e.noMoveStart),clearTimeout(this._easeEndTimeoutID),this._ease(function(e){if(o._zooming&&(r.zoom=t.number(a,l,e)),o._rotating&&(r.bearing=t.number(n,c,e)),o._pitching&&(r.pitch=t.number(s,u,e)),_)r.setLocationAtPoint(_,f);else{var p=r.zoomScale(r.zoom-a),d=l>a?Math.min(2,v):Math.max(.5,v),y=Math.pow(d,1-e),x=r.unproject(m.add(g.mult(e*y)).mult(p));r.setLocationAtPoint(r.renderWorldCopies?x.wrap():x,h);}o._fireMoveEvents(i);},function(){e.delayEndEvents?o._easeEndTimeoutID=setTimeout(function(){return o._afterEase(i)},e.delayEndEvents):o._afterEase(i);},e),this},i.prototype._prepareEase=function(e,i){this._moving=!0,i||this.fire(new t.Event("movestart",e)),this._zooming&&this.fire(new t.Event("zoomstart",e)),this._rotating&&this.fire(new t.Event("rotatestart",e)),this._pitching&&this.fire(new t.Event("pitchstart",e));},i.prototype._fireMoveEvents=function(e){this.fire(new t.Event("move",e)),this._zooming&&this.fire(new t.Event("zoom",e)),this._rotating&&this.fire(new t.Event("rotate",e)),this._pitching&&this.fire(new t.Event("pitch",e));},i.prototype._afterEase=function(e){var i=this._zooming,o=this._rotating,r=this._pitching;this._moving=!1,this._zooming=!1,this._rotating=!1,this._pitching=!1,i&&this.fire(new t.Event("zoomend",e)),o&&this.fire(new t.Event("rotateend",e)),r&&this.fire(new t.Event("pitchend",e)),this.fire(new t.Event("moveend",e));},i.prototype.flyTo=function(e,i){var o=this;this.stop(),e=t.extend({offset:[0,0],speed:1.2,curve:1.42,easing:t.ease},e);var r=this.transform,a=this.getZoom(),n=this.getBearing(),s=this.getPitch(),l="zoom"in e?t.clamp(+e.zoom,r.minZoom,r.maxZoom):a,c="bearing"in e?this._normalizeBearing(e.bearing,n):n,u="pitch"in e?+e.pitch:s,h=r.zoomScale(l-a),p=r.centerPoint.add(t.Point.convert(e.offset)),d=r.pointLocation(p),_=t.LngLat.convert(e.center||d);this._normalizeCenter(_);var f=r.project(d),m=r.project(_).sub(f),g=e.curve,v=Math.max(r.width,r.height),y=v/h,x=m.mag();if("minZoom"in e){var b=t.clamp(Math.min(e.minZoom,a,l),r.minZoom,r.maxZoom),w=v/r.zoomScale(b-a);g=Math.sqrt(w/x*2);}var E=g*g;function T(t){var e=(y*y-v*v+(t?-1:1)*E*E*x*x)/(2*(t?y:v)*E*x);return Math.log(Math.sqrt(e*e+1)-e)}function I(t){return (Math.exp(t)-Math.exp(-t))/2}function C(t){return (Math.exp(t)+Math.exp(-t))/2}var S=T(0),z=function(t){return C(S)/C(S+g*t)},L=function(t){return v*((C(S)*(I(e=S+g*t)/C(e))-I(S))/E)/x;var e;},P=(T(1)-S)/g;if(Math.abs(x)<1e-6||!isFinite(P)){if(Math.abs(v-y)<1e-6)return this.easeTo(e,i);var D=y<v?-1:1;P=Math.abs(Math.log(y/v))/g,L=function(){return 0},z=function(t){return Math.exp(D*g*t)};}if("duration"in e)e.duration=+e.duration;else{var R="screenSpeed"in e?+e.screenSpeed/g:+e.speed;e.duration=1e3*P/R;}return e.maxDuration&&e.duration>e.maxDuration&&(e.duration=0),this._zooming=!0,this._rotating=n!==c,this._pitching=u!==s,this._prepareEase(i,!1),this._ease(function(e){var h=e*P,d=1/z(h);r.zoom=1===e?l:a+r.scaleZoom(d),o._rotating&&(r.bearing=t.number(n,c,e)),o._pitching&&(r.pitch=t.number(s,u,e));var g=1===e?_:r.unproject(f.add(m.mult(L(h))).mult(d));r.setLocationAtPoint(r.renderWorldCopies?g.wrap():g,p),o._fireMoveEvents(i);},function(){return o._afterEase(i)},e),this},i.prototype.isEasing=function(){return !!this._easeFrameId},i.prototype.stop=function(){if(this._easeFrameId&&(this._cancelRenderFrame(this._easeFrameId),delete this._easeFrameId,delete this._onEaseFrame),this._onEaseEnd){var t=this._onEaseEnd;delete this._onEaseEnd,t.call(this);}return this},i.prototype._ease=function(e,i,o){!1===o.animate||0===o.duration?(e(1),i()):(this._easeStart=t.browser.now(),this._easeOptions=o,this._onEaseFrame=e,this._onEaseEnd=i,this._easeFrameId=this._requestRenderFrame(this._renderFrameCallback));},i.prototype._renderFrameCallback=function(){var e=Math.min((t.browser.now()-this._easeStart)/this._easeOptions.duration,1);this._onEaseFrame(this._easeOptions.easing(e)),e<1?this._easeFrameId=this._requestRenderFrame(this._renderFrameCallback):this.stop();},i.prototype._normalizeBearing=function(e,i){e=t.wrap(e,-180,180);var o=Math.abs(e-i);return Math.abs(e-360-i)<o&&(e-=360),Math.abs(e+360-i)<o&&(e+=360),e},i.prototype._normalizeCenter=function(t){var e=this.transform;if(e.renderWorldCopies&&!e.lngRange){var i=t.lng-e.center.lng;t.lng+=i>180?-360:i<-180?360:0;}},i}(t.Evented),So=function(e){void 0===e&&(e={}),this.options=e,t.bindAll(["_updateEditLink","_updateData","_updateCompact"],this);};So.prototype.getDefaultPosition=function(){return "bottom-right"},So.prototype.onAdd=function(t){var e=this.options&&this.options.compact;return this._map=t,this._container=i.create("div","mapboxgl-ctrl mapboxgl-ctrl-attrib"),this._innerContainer=i.create("div","mapboxgl-ctrl-attrib-inner",this._container),e&&this._container.classList.add("mapboxgl-compact"),this._updateAttributions(),this._updateEditLink(),this._map.on("styledata",this._updateData),this._map.on("sourcedata",this._updateData),this._map.on("moveend",this._updateEditLink),void 0===e&&(this._map.on("resize",this._updateCompact),this._updateCompact()),this._container},So.prototype.onRemove=function(){i.remove(this._container),this._map.off("styledata",this._updateData),this._map.off("sourcedata",this._updateData),this._map.off("moveend",this._updateEditLink),this._map.off("resize",this._updateCompact),this._map=void 0;},So.prototype._updateEditLink=function(){var e=this._editLink;e||(e=this._editLink=this._container.querySelector(".mapbox-improve-map"));var i=[{key:"owner",value:this.styleOwner},{key:"id",value:this.styleId},{key:"access_token",value:t.config.ACCESS_TOKEN}];if(e){var o=i.reduce(function(t,e,o){return e.value&&(t+=e.key+"="+e.value+(o<i.length-1?"&":"")),t},"?");e.href="https://www.mapbox.com/feedback/"+o+(this._map._hash?this._map._hash.getHashString(!0):"");}},So.prototype._updateData=function(t){!t||"metadata"!==t.sourceDataType&&"style"!==t.dataType||(this._updateAttributions(),this._updateEditLink());},So.prototype._updateAttributions=function(){if(this._map.style){var t=[];if(this.options.customAttribution&&(Array.isArray(this.options.customAttribution)?t=t.concat(this.options.customAttribution.map(function(t){return "string"!=typeof t?"":t})):"string"==typeof this.options.customAttribution&&t.push(this.options.customAttribution)),this._map.style.stylesheet){var e=this._map.style.stylesheet;this.styleOwner=e.owner,this.styleId=e.id;}var i=this._map.style.sourceCaches;for(var o in i){var r=i[o];if(r.used){var a=r.getSource();a.attribution&&t.indexOf(a.attribution)<0&&t.push(a.attribution);}}t.sort(function(t,e){return t.length-e.length}),(t=t.filter(function(e,i){for(var o=i+1;o<t.length;o++)if(t[o].indexOf(e)>=0)return !1;return !0})).length?(this._innerContainer.innerHTML=t.join(" | "),this._container.classList.remove("mapboxgl-attrib-empty")):this._container.classList.add("mapboxgl-attrib-empty"),this._editLink=null;}},So.prototype._updateCompact=function(){this._map.getCanvasContainer().offsetWidth<=640?this._container.classList.add("mapboxgl-compact"):this._container.classList.remove("mapboxgl-compact");};var zo=function(){t.bindAll(["_updateLogo"],this),t.bindAll(["_updateCompact"],this);};zo.prototype.onAdd=function(t){this._map=t,this._container=i.create("div","mapboxgl-ctrl");var e=i.create("a","mapboxgl-ctrl-logo");return e.target="_blank",e.href="https://www.mapbox.com/",e.setAttribute("aria-label","Mapbox logo"),e.setAttribute("rel","noopener"),this._container.appendChild(e),this._container.style.display="none",this._map.on("sourcedata",this._updateLogo),this._updateLogo(),this._map.on("resize",this._updateCompact),this._updateCompact(),this._container},zo.prototype.onRemove=function(){i.remove(this._container),this._map.off("sourcedata",this._updateLogo),this._map.off("resize",this._updateCompact);},zo.prototype.getDefaultPosition=function(){return "bottom-left"},zo.prototype._updateLogo=function(t){t&&"metadata"!==t.sourceDataType||(this._container.style.display=this._logoRequired()?"block":"none");},zo.prototype._logoRequired=function(){if(this._map.style){var t=this._map.style.sourceCaches;for(var e in t){if(t[e].getSource().mapbox_logo)return !0}return !1}},zo.prototype._updateCompact=function(){var t=this._container.children;if(t.length){var e=t[0];this._map.getCanvasContainer().offsetWidth<250?e.classList.add("mapboxgl-compact"):e.classList.remove("mapboxgl-compact");}};var Lo=function(){this._queue=[],this._id=0,this._cleared=!1,this._currentlyRunning=!1;};Lo.prototype.add=function(t){var e=++this._id;return this._queue.push({callback:t,id:e,cancelled:!1}),e},Lo.prototype.remove=function(t){for(var e=this._currentlyRunning,i=0,o=e?this._queue.concat(e):this._queue;i<o.length;i+=1){var r=o[i];if(r.id===t)return void(r.cancelled=!0)}},Lo.prototype.run=function(){var t=this._currentlyRunning=this._queue;this._queue=[];for(var e=0,i=t;e<i.length;e+=1){var o=i[e];if(!o.cancelled&&(o.callback(),this._cleared))break}this._cleared=!1,this._currentlyRunning=!1;},Lo.prototype.clear=function(){this._currentlyRunning&&(this._cleared=!0),this._queue=[];};var Po=t.window.HTMLImageElement,Do=t.window.HTMLElement,Ro={center:[0,0],zoom:0,bearing:0,pitch:0,minZoom:0,maxZoom:22,interactive:!0,scrollZoom:!0,boxZoom:!0,dragRotate:!0,dragPan:!0,keyboard:!0,doubleClickZoom:!0,touchZoomRotate:!0,bearingSnap:7,clickTolerance:3,hash:!1,attributionControl:!0,failIfMajorPerformanceCaveat:!1,preserveDrawingBuffer:!1,trackResize:!0,renderWorldCopies:!0,refreshExpiredTiles:!0,maxTileCacheSize:null,transformRequest:null,fadeDuration:300,crossSourceCollisions:!0},Mo=function(o){function r(e){var r=this;if(null!=(e=t.extend({},Ro,e)).minZoom&&null!=e.maxZoom&&e.minZoom>e.maxZoom)throw new Error("maxZoom must be greater than minZoom");var a=new so(e.minZoom,e.maxZoom,e.renderWorldCopies);o.call(this,a,e),this._interactive=e.interactive,this._maxTileCacheSize=e.maxTileCacheSize,this._failIfMajorPerformanceCaveat=e.failIfMajorPerformanceCaveat,this._preserveDrawingBuffer=e.preserveDrawingBuffer,this._trackResize=e.trackResize,this._bearingSnap=e.bearingSnap,this._refreshExpiredTiles=e.refreshExpiredTiles,this._fadeDuration=e.fadeDuration,this._crossSourceCollisions=e.crossSourceCollisions,this._crossFadingFactor=1,this._collectResourceTiming=e.collectResourceTiming,this._renderTaskQueue=new Lo,this._controls=[],this._mapId=t.uniqueId();var n=e.transformRequest;if(this._transformRequest=n?function(t,e){return n(t,e)||{url:t}}:function(t){return {url:t}},"string"==typeof e.container){if(this._container=t.window.document.getElementById(e.container),!this._container)throw new Error("Container '"+e.container+"' not found.")}else{if(!(e.container instanceof Do))throw new Error("Invalid type: 'container' must be a String or HTMLElement.");this._container=e.container;}if(e.maxBounds&&this.setMaxBounds(e.maxBounds),t.bindAll(["_onWindowOnline","_onWindowResize","_contextLost","_contextRestored"],this),this._setupContainer(),this._setupPainter(),void 0===this.painter)throw new Error("Failed to initialize WebGL.");this.on("move",function(){return r._update(!1)}),this.on("moveend",function(){return r._update(!1)}),this.on("zoom",function(){return r._update(!0)}),void 0!==t.window&&(t.window.addEventListener("online",this._onWindowOnline,!1),t.window.addEventListener("resize",this._onWindowResize,!1)),function(t,e){var o=t.getCanvasContainer(),r=null,a=!1,n=null;for(var s in Io)t[s]=new Io[s](t,e),e.interactive&&e[s]&&t[s].enable(e[s]);i.addEventListener(o,"mouseout",function(e){t.fire(new uo("mouseout",t,e));}),i.addEventListener(o,"mousedown",function(r){a=!0,n=i.mousePos(o,r);var s=new uo("mousedown",t,r);t.fire(s),s.defaultPrevented||(e.interactive&&!t.doubleClickZoom.isActive()&&t.stop(),t.boxZoom.onMouseDown(r),t.boxZoom.isActive()||t.dragPan.isActive()||t.dragRotate.onMouseDown(r),t.boxZoom.isActive()||t.dragRotate.isActive()||t.dragPan.onMouseDown(r));}),i.addEventListener(o,"mouseup",function(e){var i=t.dragRotate.isActive();r&&!i&&t.fire(new uo("contextmenu",t,r)),r=null,a=!1,t.fire(new uo("mouseup",t,e));}),i.addEventListener(o,"mousemove",function(e){if(!t.dragPan.isActive()&&!t.dragRotate.isActive()){for(var i=e.target;i&&i!==o;)i=i.parentNode;i===o&&t.fire(new uo("mousemove",t,e));}}),i.addEventListener(o,"mouseover",function(e){for(var i=e.target;i&&i!==o;)i=i.parentNode;i===o&&t.fire(new uo("mouseover",t,e));}),i.addEventListener(o,"touchstart",function(i){var o=new ho("touchstart",t,i);t.fire(o),o.defaultPrevented||(e.interactive&&t.stop(),t.boxZoom.isActive()||t.dragRotate.isActive()||t.dragPan.onTouchStart(i),t.touchZoomRotate.onStart(i),t.doubleClickZoom.onTouchStart(o));},{passive:!1}),i.addEventListener(o,"touchmove",function(e){t.fire(new ho("touchmove",t,e));},{passive:!1}),i.addEventListener(o,"touchend",function(e){t.fire(new ho("touchend",t,e));}),i.addEventListener(o,"touchcancel",function(e){t.fire(new ho("touchcancel",t,e));}),i.addEventListener(o,"click",function(r){var a=i.mousePos(o,r);(a.equals(n)||a.dist(n)<e.clickTolerance)&&t.fire(new uo("click",t,r));}),i.addEventListener(o,"dblclick",function(e){var i=new uo("dblclick",t,e);t.fire(i),i.defaultPrevented||t.doubleClickZoom.onDblClick(i);}),i.addEventListener(o,"contextmenu",function(e){var i=t.dragRotate.isActive();a||i?a&&(r=e):t.fire(new uo("contextmenu",t,e)),(t.dragRotate.isEnabled()||t.listens("contextmenu"))&&e.preventDefault();}),i.addEventListener(o,"wheel",function(i){e.interactive&&t.stop();var o=new po("wheel",t,i);t.fire(o),o.defaultPrevented||t.scrollZoom.onWheel(i);},{passive:!1});}(this,e),this._hash=e.hash&&(new co).addTo(this),this._hash&&this._hash._onHashChange()||(this.jumpTo({center:e.center,zoom:e.zoom,bearing:e.bearing,pitch:e.pitch}),e.bounds&&(this.resize(),this.fitBounds(e.bounds,{duration:0}))),this.resize(),e.style&&this.setStyle(e.style,{localIdeographFontFamily:e.localIdeographFontFamily}),e.attributionControl&&this.addControl(new So({customAttribution:e.customAttribution})),this.addControl(new zo,e.logoPosition),this.on("style.load",function(){r.transform.unmodified&&r.jumpTo(r.style.stylesheet);}),this.on("data",function(e){r._update("style"===e.dataType),r.fire(new t.Event(e.dataType+"data",e));}),this.on("dataloading",function(e){r.fire(new t.Event(e.dataType+"dataloading",e));});}o&&(r.__proto__=o),r.prototype=Object.create(o&&o.prototype),r.prototype.constructor=r;var a={showTileBoundaries:{configurable:!0},showCollisionBoxes:{configurable:!0},showOverdrawInspector:{configurable:!0},repaint:{configurable:!0},vertices:{configurable:!0}};return r.prototype._getMapId=function(){return this._mapId},r.prototype.addControl=function(e,i){if(void 0===i&&e.getDefaultPosition&&(i=e.getDefaultPosition()),void 0===i&&(i="top-right"),!e||!e.onAdd)return this.fire(new t.ErrorEvent(new Error("Invalid argument to map.addControl(). Argument must be a control with onAdd and onRemove methods.")));var o=e.onAdd(this);this._controls.push(e);var r=this._controlPositions[i];return -1!==i.indexOf("bottom")?r.insertBefore(o,r.firstChild):r.appendChild(o),this},r.prototype.removeControl=function(e){if(!e||!e.onRemove)return this.fire(new t.ErrorEvent(new Error("Invalid argument to map.removeControl(). Argument must be a control with onAdd and onRemove methods.")));var i=this._controls.indexOf(e);return i>-1&&this._controls.splice(i,1),e.onRemove(this),this},r.prototype.resize=function(e){var i=this._containerDimensions(),o=i[0],r=i[1];return this._resizeCanvas(o,r),this.transform.resize(o,r),this.painter.resize(o,r),this.fire(new t.Event("movestart",e)).fire(new t.Event("move",e)).fire(new t.Event("resize",e)).fire(new t.Event("moveend",e)),this},r.prototype.getBounds=function(){return this.transform.getBounds()},r.prototype.getMaxBounds=function(){return this.transform.getMaxBounds()},r.prototype.setMaxBounds=function(e){return this.transform.setMaxBounds(t.LngLatBounds.convert(e)),this._update()},r.prototype.setMinZoom=function(t){if((t=null==t?0:t)>=0&&t<=this.transform.maxZoom)return this.transform.minZoom=t,this._update(),this.getZoom()<t&&this.setZoom(t),this;throw new Error("minZoom must be between 0 and the current maxZoom, inclusive")},r.prototype.getMinZoom=function(){return this.transform.minZoom},r.prototype.setMaxZoom=function(t){if((t=null==t?22:t)>=this.transform.minZoom)return this.transform.maxZoom=t,this._update(),this.getZoom()>t&&this.setZoom(t),this;throw new Error("maxZoom must be greater than the current minZoom")},r.prototype.getRenderWorldCopies=function(){return this.transform.renderWorldCopies},r.prototype.setRenderWorldCopies=function(t){return this.transform.renderWorldCopies=t,this._update()},r.prototype.getMaxZoom=function(){return this.transform.maxZoom},r.prototype.project=function(e){return this.transform.locationPoint(t.LngLat.convert(e))},r.prototype.unproject=function(e){return this.transform.pointLocation(t.Point.convert(e))},r.prototype.isMoving=function(){return this._moving||this.dragPan.isActive()||this.dragRotate.isActive()||this.scrollZoom.isActive()},r.prototype.isZooming=function(){return this._zooming||this.scrollZoom.isZooming()},r.prototype.isRotating=function(){return this._rotating||this.dragRotate.isActive()},r.prototype.on=function(t,e,i){var r,a=this;if(void 0===i)return o.prototype.on.call(this,t,e);var n=function(){if("mouseenter"===t||"mouseover"===t){var o=!1;return {layer:e,listener:i,delegates:{mousemove:function(r){var n=a.getLayer(e)?a.queryRenderedFeatures(r.point,{layers:[e]}):[];n.length?o||(o=!0,i.call(a,new uo(t,a,r.originalEvent,{features:n}))):o=!1;},mouseout:function(){o=!1;}}}}if("mouseleave"===t||"mouseout"===t){var n=!1;return {layer:e,listener:i,delegates:{mousemove:function(o){(a.getLayer(e)?a.queryRenderedFeatures(o.point,{layers:[e]}):[]).length?n=!0:n&&(n=!1,i.call(a,new uo(t,a,o.originalEvent)));},mouseout:function(e){n&&(n=!1,i.call(a,new uo(t,a,e.originalEvent)));}}}}return {layer:e,listener:i,delegates:(r={},r[t]=function(t){var o=a.getLayer(e)?a.queryRenderedFeatures(t.point,{layers:[e]}):[];o.length&&(t.features=o,i.call(a,t),delete t.features);},r)}}();for(var s in this._delegatedListeners=this._delegatedListeners||{},this._delegatedListeners[t]=this._delegatedListeners[t]||[],this._delegatedListeners[t].push(n),n.delegates)a.on(s,n.delegates[s]);return this},r.prototype.off=function(t,e,i){if(void 0===i)return o.prototype.off.call(this,t,e);if(this._delegatedListeners&&this._delegatedListeners[t])for(var r=this._delegatedListeners[t],a=0;a<r.length;a++){var n=r[a];if(n.layer===e&&n.listener===i){for(var s in n.delegates)this.off(s,n.delegates[s]);return r.splice(a,1),this}}return this},r.prototype.queryRenderedFeatures=function(e,i){if(!this.style)return [];var o;if(void 0!==i||void 0===e||e instanceof t.Point||Array.isArray(e)||(i=e,e=void 0),i=i||{},(e=e||[[0,0],[this.transform.width,this.transform.height]])instanceof t.Point||"number"==typeof e[0])o=[t.Point.convert(e)];else{var r=t.Point.convert(e[0]),a=t.Point.convert(e[1]);o=[r,new t.Point(a.x,r.y),a,new t.Point(r.x,a.y),r];}return this.style.queryRenderedFeatures(o,i,this.transform)},r.prototype.querySourceFeatures=function(t,e){return this.style.querySourceFeatures(t,e)},r.prototype.setStyle=function(t,e){return (!e||!1!==e.diff&&!e.localIdeographFontFamily)&&this.style&&t?(this._diffStyle(t,e),this):this._updateStyle(t,e)},r.prototype._updateStyle=function(t,e){return this.style&&(this.style.setEventedParent(null),this.style._remove()),t?(this.style=new Ae(this,e||{}),this.style.setEventedParent(this,{style:this.style}),"string"==typeof t?this.style.loadURL(t):this.style.loadJSON(t),this):(delete this.style,this)},r.prototype._diffStyle=function(e,i){var o=this;if("string"==typeof e){var r=t.normalizeStyleURL(e),a=this._transformRequest(r,t.ResourceType.Style);t.getJSON(a,function(e,r){e?o.fire(new t.ErrorEvent(e)):r&&o._updateDiff(r,i);});}else"object"==typeof e&&this._updateDiff(e,i);},r.prototype._updateDiff=function(e,i){try{this.style.setState(e)&&this._update(!0);}catch(o){t.warnOnce("Unable to perform style diff: "+(o.message||o.error||o)+".  Rebuilding the style from scratch."),this._updateStyle(e,i);}},r.prototype.getStyle=function(){if(this.style)return this.style.serialize()},r.prototype.isStyleLoaded=function(){return this.style?this.style.loaded():t.warnOnce("There is no style added to the map.")},r.prototype.addSource=function(t,e){return this.style.addSource(t,e),this._update(!0)},r.prototype.isSourceLoaded=function(e){var i=this.style&&this.style.sourceCaches[e];if(void 0!==i)return i.loaded();this.fire(new t.ErrorEvent(new Error("There is no source with ID '"+e+"'")));},r.prototype.areTilesLoaded=function(){var t=this.style&&this.style.sourceCaches;for(var e in t){var i=t[e]._tiles;for(var o in i){var r=i[o];if("loaded"!==r.state&&"errored"!==r.state)return !1}}return !0},r.prototype.addSourceType=function(t,e,i){return this.style.addSourceType(t,e,i)},r.prototype.removeSource=function(t){return this.style.removeSource(t),this._update(!0)},r.prototype.getSource=function(t){return this.style.getSource(t)},r.prototype.addImage=function(e,i,o){void 0===o&&(o={});var r=o.pixelRatio;void 0===r&&(r=1);var a=o.sdf;if(void 0===a&&(a=!1),i instanceof Po){var n=t.browser.getImageData(i),s=n.width,l=n.height,c=n.data;this.style.addImage(e,{data:new t.RGBAImage({width:s,height:l},c),pixelRatio:r,sdf:a});}else{if(void 0===i.width||void 0===i.height)return this.fire(new t.ErrorEvent(new Error("Invalid arguments to map.addImage(). The second argument must be an `HTMLImageElement`, `ImageData`, or object with `width`, `height`, and `data` properties with the same format as `ImageData`")));var u=i.width,h=i.height,p=i.data;this.style.addImage(e,{data:new t.RGBAImage({width:u,height:h},new Uint8Array(p)),pixelRatio:r,sdf:a});}},r.prototype.hasImage=function(e){return e?!!this.style.getImage(e):(this.fire(new t.ErrorEvent(new Error("Missing required image id"))),!1)},r.prototype.removeImage=function(t){this.style.removeImage(t);},r.prototype.loadImage=function(e,i){t.getImage(this._transformRequest(e,t.ResourceType.Image),i);},r.prototype.listImages=function(){return this.style.listImages()},r.prototype.addLayer=function(t,e){return this.style.addLayer(t,e),this._update(!0)},r.prototype.moveLayer=function(t,e){return this.style.moveLayer(t,e),this._update(!0)},r.prototype.removeLayer=function(t){return this.style.removeLayer(t),this._update(!0)},r.prototype.getLayer=function(t){return this.style.getLayer(t)},r.prototype.setFilter=function(t,e,i){return void 0===i&&(i={}),this.style.setFilter(t,e,i),this._update(!0)},r.prototype.setLayerZoomRange=function(t,e,i){return this.style.setLayerZoomRange(t,e,i),this._update(!0)},r.prototype.getFilter=function(t){return this.style.getFilter(t)},r.prototype.setPaintProperty=function(t,e,i,o){return void 0===o&&(o={}),this.style.setPaintProperty(t,e,i,o),this._update(!0)},r.prototype.getPaintProperty=function(t,e){return this.style.getPaintProperty(t,e)},r.prototype.setLayoutProperty=function(t,e,i,o){return void 0===o&&(o={}),this.style.setLayoutProperty(t,e,i,o),this._update(!0)},r.prototype.getLayoutProperty=function(t,e){return this.style.getLayoutProperty(t,e)},r.prototype.setLight=function(t,e){return void 0===e&&(e={}),this.style.setLight(t,e),this._update(!0)},r.prototype.getLight=function(){return this.style.getLight()},r.prototype.setFeatureState=function(t,e){return this.style.setFeatureState(t,e),this._update()},r.prototype.getFeatureState=function(t){return this.style.getFeatureState(t)},r.prototype.getContainer=function(){return this._container},r.prototype.getCanvasContainer=function(){return this._canvasContainer},r.prototype.getCanvas=function(){return this._canvas},r.prototype._containerDimensions=function(){var t=0,e=0;return this._container&&(t=this._container.clientWidth||400,e=this._container.clientHeight||300),[t,e]},r.prototype._detectMissingCSS=function(){"rgb(250, 128, 114)"!==t.window.getComputedStyle(this._missingCSSCanary).getPropertyValue("background-color")&&t.warnOnce("This page appears to be missing CSS declarations for Mapbox GL JS, which may cause the map to display incorrectly. Please ensure your page includes mapbox-gl.css, as described in https://www.mapbox.com/mapbox-gl-js/api/.");},r.prototype._setupContainer=function(){var t=this._container;t.classList.add("mapboxgl-map"),(this._missingCSSCanary=i.create("div","mapboxgl-canary",t)).style.visibility="hidden",this._detectMissingCSS();var e=this._canvasContainer=i.create("div","mapboxgl-canvas-container",t);this._interactive&&e.classList.add("mapboxgl-interactive"),this._canvas=i.create("canvas","mapboxgl-canvas",e),this._canvas.style.position="absolute",this._canvas.addEventListener("webglcontextlost",this._contextLost,!1),this._canvas.addEventListener("webglcontextrestored",this._contextRestored,!1),this._canvas.setAttribute("tabindex","0"),this._canvas.setAttribute("aria-label","Map");var o=this._containerDimensions();this._resizeCanvas(o[0],o[1]);var r=this._controlContainer=i.create("div","mapboxgl-control-container",t),a=this._controlPositions={};["top-left","top-right","bottom-left","bottom-right"].forEach(function(t){a[t]=i.create("div","mapboxgl-ctrl-"+t,r);});},r.prototype._resizeCanvas=function(e,i){var o=t.window.devicePixelRatio||1;this._canvas.width=o*e,this._canvas.height=o*i,this._canvas.style.width=e+"px",this._canvas.style.height=i+"px";},r.prototype._setupPainter=function(){var i=t.extend({failIfMajorPerformanceCaveat:this._failIfMajorPerformanceCaveat,preserveDrawingBuffer:this._preserveDrawingBuffer},e.webGLContextAttributes),o=this._canvas.getContext("webgl",i)||this._canvas.getContext("experimental-webgl",i);o?(this.painter=new oo(o,this.transform),t.webpSupported.testSupport(o)):this.fire(new t.ErrorEvent(new Error("Failed to initialize WebGL")));},r.prototype._contextLost=function(e){e.preventDefault(),this._frame&&(this._frame.cancel(),this._frame=null),this.fire(new t.Event("webglcontextlost",{originalEvent:e}));},r.prototype._contextRestored=function(e){this._setupPainter(),this.resize(),this._update(),this.fire(new t.Event("webglcontextrestored",{originalEvent:e}));},r.prototype.loaded=function(){return !this._styleDirty&&!this._sourcesDirty&&!!this.style&&this.style.loaded()},r.prototype._update=function(t){return this.style?(this._styleDirty=this._styleDirty||t,this._sourcesDirty=!0,this.triggerRepaint(),this):this},r.prototype._requestRenderFrame=function(t){return this._update(),this._renderTaskQueue.add(t)},r.prototype._cancelRenderFrame=function(t){this._renderTaskQueue.remove(t);},r.prototype._render=function(){this.painter.context.setDirty(),this.painter.setBaseState(),this._renderTaskQueue.run();var e=!1;if(this.style&&this._styleDirty){this._styleDirty=!1;var i=this.transform.zoom,o=t.browser.now();this.style.zoomHistory.update(i,o);var r=new t.EvaluationParameters(i,{now:o,fadeDuration:this._fadeDuration,zoomHistory:this.style.zoomHistory,transition:this.style.getTransition()}),a=r.crossFadingFactor();1===a&&a===this._crossFadingFactor||(e=!0,this._crossFadingFactor=a),this.style.update(r);}return this.style&&this._sourcesDirty&&(this._sourcesDirty=!1,this.style._updateSources(this.transform)),this._placementDirty=this.style&&this.style._updatePlacement(this.painter.transform,this.showCollisionBoxes,this._fadeDuration,this._crossSourceCollisions),this.painter.render(this.style,{showTileBoundaries:this.showTileBoundaries,showOverdrawInspector:this._showOverdrawInspector,rotating:this.isRotating(),zooming:this.isZooming(),moving:this.isMoving(),fadeDuration:this._fadeDuration}),this.fire(new t.Event("render")),this.loaded()&&!this._loaded&&(this._loaded=!0,this.fire(new t.Event("load"))),this.style&&(this.style.hasTransitions()||e)&&(this._styleDirty=!0),this.style&&!this._placementDirty&&this.style._releaseSymbolFadeTiles(),this._sourcesDirty||this._repaint||this._styleDirty||this._placementDirty?this.triggerRepaint():!this.isMoving()&&this.loaded()&&this.fire(new t.Event("idle")),this},r.prototype.remove=function(){this._hash&&this._hash.remove();for(var e=0,i=this._controls;e<i.length;e+=1){i[e].onRemove(this);}this._controls=[],this._frame&&(this._frame.cancel(),this._frame=null),this._renderTaskQueue.clear(),this.setStyle(null),void 0!==t.window&&(t.window.removeEventListener("resize",this._onWindowResize,!1),t.window.removeEventListener("online",this._onWindowOnline,!1));var o=this.painter.context.gl.getExtension("WEBGL_lose_context");o&&o.loseContext(),Ao(this._canvasContainer),Ao(this._controlContainer),Ao(this._missingCSSCanary),this._container.classList.remove("mapboxgl-map"),this.fire(new t.Event("remove"));},r.prototype.triggerRepaint=function(){var e=this;this.style&&!this._frame&&(this._frame=t.browser.frame(function(){e._frame=null,e._render();}));},r.prototype._onWindowOnline=function(){this._update();},r.prototype._onWindowResize=function(){this._trackResize&&this.resize()._update();},a.showTileBoundaries.get=function(){return !!this._showTileBoundaries},a.showTileBoundaries.set=function(t){this._showTileBoundaries!==t&&(this._showTileBoundaries=t,this._update());},a.showCollisionBoxes.get=function(){return !!this._showCollisionBoxes},a.showCollisionBoxes.set=function(t){this._showCollisionBoxes!==t&&(this._showCollisionBoxes=t,t?this.style._generateCollisionBoxes():this._update());},a.showOverdrawInspector.get=function(){return !!this._showOverdrawInspector},a.showOverdrawInspector.set=function(t){this._showOverdrawInspector!==t&&(this._showOverdrawInspector=t,this._update());},a.repaint.get=function(){return !!this._repaint},a.repaint.set=function(t){this._repaint=t,this._update();},a.vertices.get=function(){return !!this._vertices},a.vertices.set=function(t){this._vertices=t,this._update();},Object.defineProperties(r.prototype,a),r}(Co);function Ao(t){t.parentNode&&t.parentNode.removeChild(t);}var ko={showCompass:!0,showZoom:!0},Bo=function(e){var o=this;this.options=t.extend({},ko,e),this._container=i.create("div","mapboxgl-ctrl mapboxgl-ctrl-group"),this._container.addEventListener("contextmenu",function(t){return t.preventDefault()}),this.options.showZoom&&(this._zoomInButton=this._createButton("mapboxgl-ctrl-icon mapboxgl-ctrl-zoom-in","Zoom in",function(){return o._map.zoomIn()}),this._zoomOutButton=this._createButton("mapboxgl-ctrl-icon mapboxgl-ctrl-zoom-out","Zoom out",function(){return o._map.zoomOut()})),this.options.showCompass&&(t.bindAll(["_rotateCompassArrow"],this),this._compass=this._createButton("mapboxgl-ctrl-icon mapboxgl-ctrl-compass","Reset bearing to north",function(){return o._map.resetNorth()}),this._compassArrow=i.create("span","mapboxgl-ctrl-compass-arrow",this._compass));};function Oo(e,i,o){if(e=new t.LngLat(e.lng,e.lat),i){var r=new t.LngLat(e.lng-360,e.lat),a=new t.LngLat(e.lng+360,e.lat),n=o.locationPoint(e).distSqr(i);o.locationPoint(r).distSqr(i)<n?e=r:o.locationPoint(a).distSqr(i)<n&&(e=a);}for(;Math.abs(e.lng-o.center.lng)>180;){var s=o.locationPoint(e);if(s.x>=0&&s.y>=0&&s.x<=o.width&&s.y<=o.height)break;e.lng>o.center.lng?e.lng-=360:e.lng+=360;}return e}Bo.prototype._rotateCompassArrow=function(){var t="rotate("+this._map.transform.angle*(180/Math.PI)+"deg)";this._compassArrow.style.transform=t;},Bo.prototype.onAdd=function(t){return this._map=t,this.options.showCompass&&(this._map.on("rotate",this._rotateCompassArrow),this._rotateCompassArrow(),this._handler=new go(t,{button:"left",element:this._compass}),i.addEventListener(this._compass,"mousedown",this._handler.onMouseDown),this._handler.enable()),this._container},Bo.prototype.onRemove=function(){i.remove(this._container),this.options.showCompass&&(this._map.off("rotate",this._rotateCompassArrow),i.removeEventListener(this._compass,"mousedown",this._handler.onMouseDown),this._handler.disable(),delete this._handler),delete this._map;},Bo.prototype._createButton=function(t,e,o){var r=i.create("button",t,this._container);return r.type="button",r.title=e,r.setAttribute("aria-label",e),r.addEventListener("click",o),r};var Fo={center:"translate(-50%,-50%)",top:"translate(-50%,0)","top-left":"translate(0,0)","top-right":"translate(-100%,0)",bottom:"translate(-50%,-100%)","bottom-left":"translate(0,-100%)","bottom-right":"translate(-100%,-100%)",left:"translate(0,-50%)",right:"translate(-100%,-50%)"};function Uo(t,e,i){var o=t.classList;for(var r in Fo)o.remove("mapboxgl-"+i+"-anchor-"+r);o.add("mapboxgl-"+i+"-anchor-"+e);}var No,Zo=function(e){function o(o,r){if(e.call(this),(o instanceof t.window.HTMLElement||r)&&(o=t.extend({element:o},r)),t.bindAll(["_update","_onMove","_onUp","_addDragHandler","_onMapClick"],this),this._anchor=o&&o.anchor||"center",this._color=o&&o.color||"#3FB1CE",this._draggable=o&&o.draggable||!1,this._state="inactive",o&&o.element)this._element=o.element,this._offset=t.Point.convert(o&&o.offset||[0,0]);else{this._defaultMarker=!0,this._element=i.create("div");var a=i.createNS("http://www.w3.org/2000/svg","svg");a.setAttributeNS(null,"height","41px"),a.setAttributeNS(null,"width","27px"),a.setAttributeNS(null,"viewBox","0 0 27 41");var n=i.createNS("http://www.w3.org/2000/svg","g");n.setAttributeNS(null,"stroke","none"),n.setAttributeNS(null,"stroke-width","1"),n.setAttributeNS(null,"fill","none"),n.setAttributeNS(null,"fill-rule","evenodd");var s=i.createNS("http://www.w3.org/2000/svg","g");s.setAttributeNS(null,"fill-rule","nonzero");var l=i.createNS("http://www.w3.org/2000/svg","g");l.setAttributeNS(null,"transform","translate(3.0, 29.0)"),l.setAttributeNS(null,"fill","#000000");for(var c=0,u=[{rx:"10.5",ry:"5.25002273"},{rx:"10.5",ry:"5.25002273"},{rx:"9.5",ry:"4.77275007"},{rx:"8.5",ry:"4.29549936"},{rx:"7.5",ry:"3.81822308"},{rx:"6.5",ry:"3.34094679"},{rx:"5.5",ry:"2.86367051"},{rx:"4.5",ry:"2.38636864"}];c<u.length;c+=1){var h=u[c],p=i.createNS("http://www.w3.org/2000/svg","ellipse");p.setAttributeNS(null,"opacity","0.04"),p.setAttributeNS(null,"cx","10.5"),p.setAttributeNS(null,"cy","5.80029008"),p.setAttributeNS(null,"rx",h.rx),p.setAttributeNS(null,"ry",h.ry),l.appendChild(p);}var d=i.createNS("http://www.w3.org/2000/svg","g");d.setAttributeNS(null,"fill",this._color);var _=i.createNS("http://www.w3.org/2000/svg","path");_.setAttributeNS(null,"d","M27,13.5 C27,19.074644 20.250001,27.000002 14.75,34.500002 C14.016665,35.500004 12.983335,35.500004 12.25,34.500002 C6.7499993,27.000002 0,19.222562 0,13.5 C0,6.0441559 6.0441559,0 13.5,0 C20.955844,0 27,6.0441559 27,13.5 Z"),d.appendChild(_);var f=i.createNS("http://www.w3.org/2000/svg","g");f.setAttributeNS(null,"opacity","0.25"),f.setAttributeNS(null,"fill","#000000");var m=i.createNS("http://www.w3.org/2000/svg","path");m.setAttributeNS(null,"d","M13.5,0 C6.0441559,0 0,6.0441559 0,13.5 C0,19.222562 6.7499993,27 12.25,34.5 C13,35.522727 14.016664,35.500004 14.75,34.5 C20.250001,27 27,19.074644 27,13.5 C27,6.0441559 20.955844,0 13.5,0 Z M13.5,1 C20.415404,1 26,6.584596 26,13.5 C26,15.898657 24.495584,19.181431 22.220703,22.738281 C19.945823,26.295132 16.705119,30.142167 13.943359,33.908203 C13.743445,34.180814 13.612715,34.322738 13.5,34.441406 C13.387285,34.322738 13.256555,34.180814 13.056641,33.908203 C10.284481,30.127985 7.4148684,26.314159 5.015625,22.773438 C2.6163816,19.232715 1,15.953538 1,13.5 C1,6.584596 6.584596,1 13.5,1 Z"),f.appendChild(m);var g=i.createNS("http://www.w3.org/2000/svg","g");g.setAttributeNS(null,"transform","translate(6.0, 7.0)"),g.setAttributeNS(null,"fill","#FFFFFF");var v=i.createNS("http://www.w3.org/2000/svg","g");v.setAttributeNS(null,"transform","translate(8.0, 8.0)");var y=i.createNS("http://www.w3.org/2000/svg","circle");y.setAttributeNS(null,"fill","#000000"),y.setAttributeNS(null,"opacity","0.25"),y.setAttributeNS(null,"cx","5.5"),y.setAttributeNS(null,"cy","5.5"),y.setAttributeNS(null,"r","5.4999962");var x=i.createNS("http://www.w3.org/2000/svg","circle");x.setAttributeNS(null,"fill","#FFFFFF"),x.setAttributeNS(null,"cx","5.5"),x.setAttributeNS(null,"cy","5.5"),x.setAttributeNS(null,"r","5.4999962"),v.appendChild(y),v.appendChild(x),s.appendChild(l),s.appendChild(d),s.appendChild(f),s.appendChild(g),s.appendChild(v),a.appendChild(s),this._element.appendChild(a),this._offset=t.Point.convert(o&&o.offset||[0,-14]);}this._element.classList.add("mapboxgl-marker"),this._popup=null;}return e&&(o.__proto__=e),o.prototype=Object.create(e&&e.prototype),o.prototype.constructor=o,o.prototype.addTo=function(t){return this.remove(),this._map=t,t.getCanvasContainer().appendChild(this._element),t.on("move",this._update),t.on("moveend",this._update),this.setDraggable(this._draggable),this._update(),this._map.on("click",this._onMapClick),this},o.prototype.remove=function(){return this._map&&(this._map.off("click",this._onMapClick),this._map.off("move",this._update),this._map.off("moveend",this._update),this._map.off("mousedown",this._addDragHandler),this._map.off("touchstart",this._addDragHandler),this._map.off("mouseup",this._onUp),this._map.off("touchend",this._onUp),delete this._map),i.remove(this._element),this._popup&&this._popup.remove(),this},o.prototype.getLngLat=function(){return this._lngLat},o.prototype.setLngLat=function(e){return this._lngLat=t.LngLat.convert(e),this._pos=null,this._popup&&this._popup.setLngLat(this._lngLat),this._update(),this},o.prototype.getElement=function(){return this._element},o.prototype.setPopup=function(t){if(this._popup&&(this._popup.remove(),this._popup=null),t){if(!("offset"in t.options)){var e=Math.sqrt(Math.pow(13.5,2)/2);t.options.offset=this._defaultMarker?{top:[0,0],"top-left":[0,0],"top-right":[0,0],bottom:[0,-38.1],"bottom-left":[e,-1*(24.6+e)],"bottom-right":[-e,-1*(24.6+e)],left:[13.5,-24.6],right:[-13.5,-24.6]}:this._offset;}this._popup=t,this._lngLat&&this._popup.setLngLat(this._lngLat);}return this},o.prototype._onMapClick=function(t){var e=t.originalEvent.target,i=this._element;this._popup&&(e===i||i.contains(e))&&this.togglePopup();},o.prototype.getPopup=function(){return this._popup},o.prototype.togglePopup=function(){var t=this._popup;return t?(t.isOpen()?t.remove():t.addTo(this._map),this):this},o.prototype._update=function(t){this._map&&(this._map.transform.renderWorldCopies&&(this._lngLat=Oo(this._lngLat,this._pos,this._map.transform)),this._pos=this._map.project(this._lngLat)._add(this._offset),t&&"moveend"!==t.type||(this._pos=this._pos.round()),i.setTransform(this._element,Fo[this._anchor]+" translate("+this._pos.x+"px, "+this._pos.y+"px)"),Uo(this._element,this._anchor,"marker"));},o.prototype.getOffset=function(){return this._offset},o.prototype.setOffset=function(e){return this._offset=t.Point.convert(e),this._update(),this},o.prototype._onMove=function(e){this._pos=e.point.sub(this._positionDelta),this._lngLat=this._map.unproject(this._pos),this.setLngLat(this._lngLat),this._element.style.pointerEvents="none","pending"===this._state&&(this._state="active",this.fire(new t.Event("dragstart"))),this.fire(new t.Event("drag"));},o.prototype._onUp=function(){this._element.style.pointerEvents="auto",this._positionDelta=null,this._map.off("mousemove",this._onMove),this._map.off("touchmove",this._onMove),"active"===this._state&&this.fire(new t.Event("dragend")),this._state="inactive";},o.prototype._addDragHandler=function(t){this._element.contains(t.originalEvent.target)&&(t.preventDefault(),this._positionDelta=t.point.sub(this._pos).add(this._offset),this._state="pending",this._map.on("mousemove",this._onMove),this._map.on("touchmove",this._onMove),this._map.once("mouseup",this._onUp),this._map.once("touchend",this._onUp));},o.prototype.setDraggable=function(t){return this._draggable=!!t,this._map&&(t?(this._map.on("mousedown",this._addDragHandler),this._map.on("touchstart",this._addDragHandler)):(this._map.off("mousedown",this._addDragHandler),this._map.off("touchstart",this._addDragHandler))),this},o.prototype.isDraggable=function(){return this._draggable},o}(t.Evented),jo={positionOptions:{enableHighAccuracy:!1,maximumAge:0,timeout:6e3},fitBoundsOptions:{maxZoom:15},trackUserLocation:!1,showUserLocation:!0};var Vo=function(e){function o(i){e.call(this),this.options=t.extend({},jo,i),t.bindAll(["_onSuccess","_onError","_finish","_setupUI","_updateCamera","_updateMarker"],this);}return e&&(o.__proto__=e),o.prototype=Object.create(e&&e.prototype),o.prototype.constructor=o,o.prototype.onAdd=function(e){var o;return this._map=e,this._container=i.create("div","mapboxgl-ctrl mapboxgl-ctrl-group"),o=this._setupUI,void 0!==No?o(No):void 0!==t.window.navigator.permissions?t.window.navigator.permissions.query({name:"geolocation"}).then(function(t){No="denied"!==t.state,o(No);}):(No=!!t.window.navigator.geolocation,o(No)),this._container},o.prototype.onRemove=function(){void 0!==this._geolocationWatchID&&(t.window.navigator.geolocation.clearWatch(this._geolocationWatchID),this._geolocationWatchID=void 0),this.options.showUserLocation&&this._userLocationDotMarker&&this._userLocationDotMarker.remove(),i.remove(this._container),this._map=void 0;},o.prototype._onSuccess=function(e){if(this.options.trackUserLocation)switch(this._lastKnownPosition=e,this._watchState){case"WAITING_ACTIVE":case"ACTIVE_LOCK":case"ACTIVE_ERROR":this._watchState="ACTIVE_LOCK",this._geolocateButton.classList.remove("mapboxgl-ctrl-geolocate-waiting"),this._geolocateButton.classList.remove("mapboxgl-ctrl-geolocate-active-error"),this._geolocateButton.classList.add("mapboxgl-ctrl-geolocate-active");break;case"BACKGROUND":case"BACKGROUND_ERROR":this._watchState="BACKGROUND",this._geolocateButton.classList.remove("mapboxgl-ctrl-geolocate-waiting"),this._geolocateButton.classList.remove("mapboxgl-ctrl-geolocate-background-error"),this._geolocateButton.classList.add("mapboxgl-ctrl-geolocate-background");}this.options.showUserLocation&&"OFF"!==this._watchState&&this._updateMarker(e),this.options.trackUserLocation&&"ACTIVE_LOCK"!==this._watchState||this._updateCamera(e),this.options.showUserLocation&&this._dotElement.classList.remove("mapboxgl-user-location-dot-stale"),this.fire(new t.Event("geolocate",e)),this._finish();},o.prototype._updateCamera=function(e){var i=new t.LngLat(e.coords.longitude,e.coords.latitude),o=e.coords.accuracy;this._map.fitBounds(i.toBounds(o),this.options.fitBoundsOptions,{geolocateSource:!0});},o.prototype._updateMarker=function(t){t?this._userLocationDotMarker.setLngLat([t.coords.longitude,t.coords.latitude]).addTo(this._map):this._userLocationDotMarker.remove();},o.prototype._onError=function(e){if(this.options.trackUserLocation)if(1===e.code)this._watchState="OFF",this._geolocateButton.classList.remove("mapboxgl-ctrl-geolocate-waiting"),this._geolocateButton.classList.remove("mapboxgl-ctrl-geolocate-active"),this._geolocateButton.classList.remove("mapboxgl-ctrl-geolocate-active-error"),this._geolocateButton.classList.remove("mapboxgl-ctrl-geolocate-background"),this._geolocateButton.classList.remove("mapboxgl-ctrl-geolocate-background-error"),void 0!==this._geolocationWatchID&&this._clearWatch();else switch(this._watchState){case"WAITING_ACTIVE":this._watchState="ACTIVE_ERROR",this._geolocateButton.classList.remove("mapboxgl-ctrl-geolocate-active"),this._geolocateButton.classList.add("mapboxgl-ctrl-geolocate-active-error");break;case"ACTIVE_LOCK":this._watchState="ACTIVE_ERROR",this._geolocateButton.classList.remove("mapboxgl-ctrl-geolocate-active"),this._geolocateButton.classList.add("mapboxgl-ctrl-geolocate-active-error"),this._geolocateButton.classList.add("mapboxgl-ctrl-geolocate-waiting");break;case"BACKGROUND":this._watchState="BACKGROUND_ERROR",this._geolocateButton.classList.remove("mapboxgl-ctrl-geolocate-background"),this._geolocateButton.classList.add("mapboxgl-ctrl-geolocate-background-error"),this._geolocateButton.classList.add("mapboxgl-ctrl-geolocate-waiting");}"OFF"!==this._watchState&&this.options.showUserLocation&&this._dotElement.classList.add("mapboxgl-user-location-dot-stale"),this.fire(new t.Event("error",e)),this._finish();},o.prototype._finish=function(){this._timeoutId&&clearTimeout(this._timeoutId),this._timeoutId=void 0;},o.prototype._setupUI=function(e){var o=this;!1!==e?(this._container.addEventListener("contextmenu",function(t){return t.preventDefault()}),this._geolocateButton=i.create("button","mapboxgl-ctrl-icon mapboxgl-ctrl-geolocate",this._container),this._geolocateButton.type="button",this._geolocateButton.setAttribute("aria-label","Geolocate"),this.options.trackUserLocation&&(this._geolocateButton.setAttribute("aria-pressed","false"),this._watchState="OFF"),this.options.showUserLocation&&(this._dotElement=i.create("div","mapboxgl-user-location-dot"),this._userLocationDotMarker=new Zo(this._dotElement),this.options.trackUserLocation&&(this._watchState="OFF")),this._geolocateButton.addEventListener("click",this.trigger.bind(this)),this._setup=!0,this.options.trackUserLocation&&this._map.on("movestart",function(e){e.geolocateSource||"ACTIVE_LOCK"!==o._watchState||(o._watchState="BACKGROUND",o._geolocateButton.classList.add("mapboxgl-ctrl-geolocate-background"),o._geolocateButton.classList.remove("mapboxgl-ctrl-geolocate-active"),o.fire(new t.Event("trackuserlocationend")));})):t.warnOnce("Geolocation support is not available, the GeolocateControl will not be visible.");},o.prototype.trigger=function(){if(!this._setup)return t.warnOnce("Geolocate control triggered before added to a map"),!1;if(this.options.trackUserLocation){switch(this._watchState){case"OFF":this._watchState="WAITING_ACTIVE",this.fire(new t.Event("trackuserlocationstart"));break;case"WAITING_ACTIVE":case"ACTIVE_LOCK":case"ACTIVE_ERROR":case"BACKGROUND_ERROR":this._watchState="OFF",this._geolocateButton.classList.remove("mapboxgl-ctrl-geolocate-waiting"),this._geolocateButton.classList.remove("mapboxgl-ctrl-geolocate-active"),this._geolocateButton.classList.remove("mapboxgl-ctrl-geolocate-active-error"),this._geolocateButton.classList.remove("mapboxgl-ctrl-geolocate-background"),this._geolocateButton.classList.remove("mapboxgl-ctrl-geolocate-background-error"),this.fire(new t.Event("trackuserlocationend"));break;case"BACKGROUND":this._watchState="ACTIVE_LOCK",this._geolocateButton.classList.remove("mapboxgl-ctrl-geolocate-background"),this._lastKnownPosition&&this._updateCamera(this._lastKnownPosition),this.fire(new t.Event("trackuserlocationstart"));}switch(this._watchState){case"WAITING_ACTIVE":this._geolocateButton.classList.add("mapboxgl-ctrl-geolocate-waiting"),this._geolocateButton.classList.add("mapboxgl-ctrl-geolocate-active");break;case"ACTIVE_LOCK":this._geolocateButton.classList.add("mapboxgl-ctrl-geolocate-active");break;case"ACTIVE_ERROR":this._geolocateButton.classList.add("mapboxgl-ctrl-geolocate-waiting"),this._geolocateButton.classList.add("mapboxgl-ctrl-geolocate-active-error");break;case"BACKGROUND":this._geolocateButton.classList.add("mapboxgl-ctrl-geolocate-background");break;case"BACKGROUND_ERROR":this._geolocateButton.classList.add("mapboxgl-ctrl-geolocate-waiting"),this._geolocateButton.classList.add("mapboxgl-ctrl-geolocate-background-error");}"OFF"===this._watchState&&void 0!==this._geolocationWatchID?this._clearWatch():void 0===this._geolocationWatchID&&(this._geolocateButton.classList.add("mapboxgl-ctrl-geolocate-waiting"),this._geolocateButton.setAttribute("aria-pressed","true"),this._geolocationWatchID=t.window.navigator.geolocation.watchPosition(this._onSuccess,this._onError,this.options.positionOptions));}else t.window.navigator.geolocation.getCurrentPosition(this._onSuccess,this._onError,this.options.positionOptions),this._timeoutId=setTimeout(this._finish,1e4);return !0},o.prototype._clearWatch=function(){t.window.navigator.geolocation.clearWatch(this._geolocationWatchID),this._geolocationWatchID=void 0,this._geolocateButton.classList.remove("mapboxgl-ctrl-geolocate-waiting"),this._geolocateButton.setAttribute("aria-pressed","false"),this.options.showUserLocation&&this._updateMarker(null);},o}(t.Evented),qo={maxWidth:100,unit:"metric"},Go=function(e){this.options=t.extend({},qo,e),t.bindAll(["_onMove","setUnit"],this);};function Wo(t,e,i){var o,r,a,n,s,l,c=i&&i.maxWidth||100,u=t._container.clientHeight/2,h=(o=t.unproject([0,u]),r=t.unproject([c,u]),a=Math.PI/180,n=o.lat*a,s=r.lat*a,l=Math.sin(n)*Math.sin(s)+Math.cos(n)*Math.cos(s)*Math.cos((r.lng-o.lng)*a),6371e3*Math.acos(Math.min(l,1)));if(i&&"imperial"===i.unit){var p=3.2808*h;if(p>5280)Xo(e,c,p/5280,"mi");else Xo(e,c,p,"ft");}else if(i&&"nautical"===i.unit){Xo(e,c,h/1852,"nm");}else Xo(e,c,h,"m");}function Xo(t,e,i,o){var r,a,n,s=(r=i,a=Math.pow(10,(""+Math.floor(r)).length-1),n=(n=r/a)>=10?10:n>=5?5:n>=3?3:n>=2?2:n>=1?1:function(t){var e=Math.pow(10,Math.ceil(-Math.log(t)/Math.LN10));return Math.round(t*e)/e}(n),a*n),l=s/i;"m"===o&&s>=1e3&&(s/=1e3,o="km"),t.style.width=e*l+"px",t.innerHTML=s+o;}Go.prototype.getDefaultPosition=function(){return "bottom-left"},Go.prototype._onMove=function(){Wo(this._map,this._container,this.options);},Go.prototype.onAdd=function(t){return this._map=t,this._container=i.create("div","mapboxgl-ctrl mapboxgl-ctrl-scale",t.getContainer()),this._map.on("move",this._onMove),this._onMove(),this._container},Go.prototype.onRemove=function(){i.remove(this._container),this._map.off("move",this._onMove),this._map=void 0;},Go.prototype.setUnit=function(t){this.options.unit=t,Wo(this._map,this._container,this.options);};var Ho=function(e){this._fullscreen=!1,e&&e.container&&(e.container instanceof t.window.HTMLElement?this._container=e.container:t.warnOnce("Full screen control 'container' must be a DOM element.")),t.bindAll(["_onClickFullscreen","_changeIcon"],this),"onfullscreenchange"in t.window.document?this._fullscreenchange="fullscreenchange":"onmozfullscreenchange"in t.window.document?this._fullscreenchange="mozfullscreenchange":"onwebkitfullscreenchange"in t.window.document?this._fullscreenchange="webkitfullscreenchange":"onmsfullscreenchange"in t.window.document&&(this._fullscreenchange="MSFullscreenChange"),this._className="mapboxgl-ctrl";};Ho.prototype.onAdd=function(e){return this._map=e,this._container||(this._container=this._map.getContainer()),this._controlContainer=i.create("div",this._className+" mapboxgl-ctrl-group"),this._checkFullscreenSupport()?this._setupUI():(this._controlContainer.style.display="none",t.warnOnce("This device does not support fullscreen mode.")),this._controlContainer},Ho.prototype.onRemove=function(){i.remove(this._controlContainer),this._map=null,t.window.document.removeEventListener(this._fullscreenchange,this._changeIcon);},Ho.prototype._checkFullscreenSupport=function(){return !!(t.window.document.fullscreenEnabled||t.window.document.mozFullScreenEnabled||t.window.document.msFullscreenEnabled||t.window.document.webkitFullscreenEnabled)},Ho.prototype._setupUI=function(){var e=this._fullscreenButton=i.create("button",this._className+"-icon "+this._className+"-fullscreen",this._controlContainer);e.setAttribute("aria-label","Toggle fullscreen"),e.type="button",this._fullscreenButton.addEventListener("click",this._onClickFullscreen),t.window.document.addEventListener(this._fullscreenchange,this._changeIcon);},Ho.prototype._isFullscreen=function(){return this._fullscreen},Ho.prototype._changeIcon=function(){(t.window.document.fullscreenElement||t.window.document.mozFullScreenElement||t.window.document.webkitFullscreenElement||t.window.document.msFullscreenElement)===this._container!==this._fullscreen&&(this._fullscreen=!this._fullscreen,this._fullscreenButton.classList.toggle(this._className+"-shrink"),this._fullscreenButton.classList.toggle(this._className+"-fullscreen"));},Ho.prototype._onClickFullscreen=function(){this._isFullscreen()?t.window.document.exitFullscreen?t.window.document.exitFullscreen():t.window.document.mozCancelFullScreen?t.window.document.mozCancelFullScreen():t.window.document.msExitFullscreen?t.window.document.msExitFullscreen():t.window.document.webkitCancelFullScreen&&t.window.document.webkitCancelFullScreen():this._container.requestFullscreen?this._container.requestFullscreen():this._container.mozRequestFullScreen?this._container.mozRequestFullScreen():this._container.msRequestFullscreen?this._container.msRequestFullscreen():this._container.webkitRequestFullscreen&&this._container.webkitRequestFullscreen();};var Ko={closeButton:!0,closeOnClick:!0,className:""},Yo=function(e){function o(i){e.call(this),this.options=t.extend(Object.create(Ko),i),t.bindAll(["_update","_onClickClose"],this);}return e&&(o.__proto__=e),o.prototype=Object.create(e&&e.prototype),o.prototype.constructor=o,o.prototype.addTo=function(e){return this._map=e,this._map.on("move",this._update),this.options.closeOnClick&&this._map.on("click",this._onClickClose),this._update(),this.fire(new t.Event("open")),this},o.prototype.isOpen=function(){return !!this._map},o.prototype.remove=function(){return this._content&&i.remove(this._content),this._container&&(i.remove(this._container),delete this._container),this._map&&(this._map.off("move",this._update),this._map.off("click",this._onClickClose),delete this._map),this.fire(new t.Event("close")),this},o.prototype.getLngLat=function(){return this._lngLat},o.prototype.setLngLat=function(e){return this._lngLat=t.LngLat.convert(e),this._pos=null,this._update(),this},o.prototype.setText=function(e){return this.setDOMContent(t.window.document.createTextNode(e))},o.prototype.setHTML=function(e){var i,o=t.window.document.createDocumentFragment(),r=t.window.document.createElement("body");for(r.innerHTML=e;i=r.firstChild;)o.appendChild(i);return this.setDOMContent(o)},o.prototype.setDOMContent=function(t){return this._createContent(),this._content.appendChild(t),this._update(),this},o.prototype._createContent=function(){this._content&&i.remove(this._content),this._content=i.create("div","mapboxgl-popup-content",this._container),this.options.closeButton&&(this._closeButton=i.create("button","mapboxgl-popup-close-button",this._content),this._closeButton.type="button",this._closeButton.setAttribute("aria-label","Close popup"),this._closeButton.innerHTML="&#215;",this._closeButton.addEventListener("click",this._onClickClose));},o.prototype._update=function(){var e=this;if(this._map&&this._lngLat&&this._content){this._container||(this._container=i.create("div","mapboxgl-popup",this._map.getContainer()),this._tip=i.create("div","mapboxgl-popup-tip",this._container),this._container.appendChild(this._content),this.options.className&&this.options.className.split(" ").forEach(function(t){return e._container.classList.add(t)})),this._map.transform.renderWorldCopies&&(this._lngLat=Oo(this._lngLat,this._pos,this._map.transform));var o=this._pos=this._map.project(this._lngLat),r=this.options.anchor,a=function e(i){if(i){if("number"==typeof i){var o=Math.round(Math.sqrt(.5*Math.pow(i,2)));return {center:new t.Point(0,0),top:new t.Point(0,i),"top-left":new t.Point(o,o),"top-right":new t.Point(-o,o),bottom:new t.Point(0,-i),"bottom-left":new t.Point(o,-o),"bottom-right":new t.Point(-o,-o),left:new t.Point(i,0),right:new t.Point(-i,0)}}if(i instanceof t.Point||Array.isArray(i)){var r=t.Point.convert(i);return {center:r,top:r,"top-left":r,"top-right":r,bottom:r,"bottom-left":r,"bottom-right":r,left:r,right:r}}return {center:t.Point.convert(i.center||[0,0]),top:t.Point.convert(i.top||[0,0]),"top-left":t.Point.convert(i["top-left"]||[0,0]),"top-right":t.Point.convert(i["top-right"]||[0,0]),bottom:t.Point.convert(i.bottom||[0,0]),"bottom-left":t.Point.convert(i["bottom-left"]||[0,0]),"bottom-right":t.Point.convert(i["bottom-right"]||[0,0]),left:t.Point.convert(i.left||[0,0]),right:t.Point.convert(i.right||[0,0])}}return e(new t.Point(0,0))}(this.options.offset);if(!r){var n,s=this._container.offsetWidth,l=this._container.offsetHeight;n=o.y+a.bottom.y<l?["top"]:o.y>this._map.transform.height-l?["bottom"]:[],o.x<s/2?n.push("left"):o.x>this._map.transform.width-s/2&&n.push("right"),r=0===n.length?"bottom":n.join("-");}var c=o.add(a[r]).round();i.setTransform(this._container,Fo[r]+" translate("+c.x+"px,"+c.y+"px)"),Uo(this._container,r,"popup");}},o.prototype._onClickClose=function(){this.remove();},o}(t.Evented);var Jo={version:t.version,supported:e,setRTLTextPlugin:t.setRTLTextPlugin,Map:Mo,NavigationControl:Bo,GeolocateControl:Vo,AttributionControl:So,ScaleControl:Go,FullscreenControl:Ho,Popup:Yo,Marker:Zo,Style:Ae,LngLat:t.LngLat,LngLatBounds:t.LngLatBounds,Point:t.Point,MercatorCoordinate:t.MercatorCoordinate,Evented:t.Evented,config:t.config,get accessToken(){return t.config.ACCESS_TOKEN},set accessToken(e){t.config.ACCESS_TOKEN=e;},get baseApiUrl(){return t.config.API_URL},set baseApiUrl(e){t.config.API_URL=e;},get workerCount(){return Dt.workerCount},set workerCount(t){Dt.workerCount=t;},get maxParallelImageRequests(){return t.config.MAX_PARALLEL_IMAGE_REQUESTS},set maxParallelImageRequests(e){t.config.MAX_PARALLEL_IMAGE_REQUESTS=e;},workerUrl:""};return Jo});

//

return mapboxgl;

})));
//# sourceMappingURL=mapbox-gl.js.map


/***/ }),

/***/ "./node_modules/react-mapbox-gl/lib-esm/cluster.js":
/*!*********************************************************!*\
  !*** ./node_modules/react-mapbox-gl/lib-esm/cluster.js ***!
  \*********************************************************/
/*! exports provided: Cluster, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Cluster", function() { return Cluster; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var mapbox_gl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mapbox-gl */ "./node_modules/mapbox-gl/dist/mapbox-gl.js");
/* harmony import */ var mapbox_gl__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(mapbox_gl__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var supercluster__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! supercluster */ "./node_modules/supercluster/index.js");
/* harmony import */ var supercluster__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(supercluster__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _turf_bbox__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @turf/bbox */ "./node_modules/@turf/bbox/index.js");
/* harmony import */ var _turf_bbox__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_turf_bbox__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _turf_helpers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @turf/helpers */ "./node_modules/@turf/helpers/index.js");
/* harmony import */ var _turf_helpers__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_turf_helpers__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./context */ "./node_modules/react-mapbox-gl/lib-esm/context.js");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();






var Cluster = (function (_super) {
    __extends(Cluster, _super);
    function Cluster() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            superC: supercluster__WEBPACK_IMPORTED_MODULE_2___default()({
                radius: _this.props.radius,
                maxZoom: _this.props.maxZoom,
                minZoom: _this.props.minZoom,
                extent: _this.props.extent,
                nodeSize: _this.props.nodeSize,
                log: _this.props.log
            }),
            clusterPoints: []
        };
        _this.featureClusterMap = new WeakMap();
        _this.childrenChange = function (newChildren) {
            var superC = _this.state.superC;
            _this.featureClusterMap = new WeakMap();
            var features = _this.childrenToFeatures(newChildren);
            superC.load(features);
        };
        _this.mapChange = function (forceSetState) {
            if (forceSetState === void 0) { forceSetState = false; }
            var map = _this.props.map;
            var _a = _this.state, superC = _a.superC, clusterPoints = _a.clusterPoints;
            var zoom = map.getZoom();
            var canvas = map.getCanvas();
            var w = canvas.width;
            var h = canvas.height;
            var upLeft = map.unproject([0, 0]).toArray();
            var upRight = map.unproject([w, 0]).toArray();
            var downRight = map.unproject([w, h]).toArray();
            var downLeft = map.unproject([0, h]).toArray();
            var newPoints = superC.getClusters(_turf_bbox__WEBPACK_IMPORTED_MODULE_3__(Object(_turf_helpers__WEBPACK_IMPORTED_MODULE_4__["polygon"])([[upLeft, upRight, downRight, downLeft, upLeft]])), Math.round(zoom));
            if (newPoints.length !== clusterPoints.length || forceSetState) {
                _this.setState({ clusterPoints: newPoints });
            }
        };
        _this.childrenToFeatures = function (children) {
            return children.map(function (child) {
                var feature = _this.feature(child && child.props.coordinates);
                _this.featureClusterMap.set(feature, child);
                return feature;
            });
        };
        _this.getLeaves = function (feature, limit, offset) {
            var superC = _this.state.superC;
            return superC
                .getLeaves(feature.properties && feature.properties.cluster_id, limit || Infinity, offset)
                .map(function (leave) { return _this.featureClusterMap.get(leave); });
        };
        _this.zoomToClusterBounds = function (event) {
            var markers = Array.prototype.slice.call(event.currentTarget.children);
            var marker = _this.findMarkerElement(event.currentTarget, event.target);
            var index = markers.indexOf(marker);
            var cluster = _this.state.clusterPoints[index];
            if (!cluster.properties || !cluster.properties.cluster_id) {
                return;
            }
            var children = _this.state.superC.getLeaves(cluster.properties && cluster.properties.cluster_id, Infinity);
            var childrenBbox = _turf_bbox__WEBPACK_IMPORTED_MODULE_3__(Object(_turf_helpers__WEBPACK_IMPORTED_MODULE_4__["featureCollection"])(children));
            _this.props.map.fitBounds(mapbox_gl__WEBPACK_IMPORTED_MODULE_1__["LngLatBounds"].convert(childrenBbox), {
                padding: _this.props.zoomOnClickPadding
            });
        };
        return _this;
    }
    Cluster.prototype.componentWillMount = function () {
        var _a = this.props, children = _a.children, map = _a.map;
        if (children) {
            this.childrenChange(children);
        }
        map.on('move', this.mapChange);
        map.on('zoom', this.mapChange);
        this.mapChange();
    };
    Cluster.prototype.componentWillUnmount = function () {
        var map = this.props.map;
        map.off('move', this.mapChange);
        map.off('zoom', this.mapChange);
    };
    Cluster.prototype.componentWillReceiveProps = function (nextProps) {
        var children = this.props.children;
        if (children !== nextProps.children && nextProps.children) {
            this.childrenChange(nextProps.children);
            this.mapChange(true);
        }
    };
    Cluster.prototype.feature = function (coordinates) {
        return {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: coordinates
            },
            properties: {}
        };
    };
    Cluster.prototype.findMarkerElement = function (target, element) {
        if (element.parentElement === target) {
            return element;
        }
        return this.findMarkerElement(target, element.parentElement);
    };
    Cluster.prototype.render = function () {
        var _this = this;
        var _a = this.props, ClusterMarkerFactory = _a.ClusterMarkerFactory, style = _a.style, className = _a.className, tabIndex = _a.tabIndex;
        var clusterPoints = this.state.clusterPoints;
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { style: style, className: className, tabIndex: tabIndex, onClick: this.props.zoomOnClick ? this.zoomToClusterBounds : undefined }, clusterPoints.map(function (feature) {
            if (feature.properties && feature.properties.cluster) {
                return ClusterMarkerFactory(feature.geometry.coordinates, feature.properties.point_count, _this.getLeaves.bind(_this, feature));
            }
            return _this.featureClusterMap.get(feature);
        })));
    };
    Cluster.defaultProps = {
        radius: 60,
        minZoom: 0,
        maxZoom: 16,
        extent: 512,
        nodeSize: 64,
        log: false,
        zoomOnClick: false,
        zoomOnClickPadding: 20
    };
    return Cluster;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]));

/* harmony default export */ __webpack_exports__["default"] = (Object(_context__WEBPACK_IMPORTED_MODULE_5__["withMap"])(Cluster));
//# sourceMappingURL=cluster.js.map

/***/ }),

/***/ "./node_modules/react-mapbox-gl/lib-esm/context.js":
/*!*********************************************************!*\
  !*** ./node_modules/react-mapbox-gl/lib-esm/context.js ***!
  \*********************************************************/
/*! exports provided: MapContext, withMap */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MapContext", function() { return MapContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "withMap", function() { return withMap; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var MapContext = react__WEBPACK_IMPORTED_MODULE_0__["createContext"](undefined);
function withMap(Component) {
    return function MappedComponent(props) {
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"](MapContext.Consumer, null, function (map) { return react__WEBPACK_IMPORTED_MODULE_0__["createElement"](Component, __assign({ map: map }, props)); }));
    };
}
//# sourceMappingURL=context.js.map

/***/ }),

/***/ "./node_modules/react-mapbox-gl/lib-esm/feature.js":
/*!*********************************************************!*\
  !*** ./node_modules/react-mapbox-gl/lib-esm/feature.js ***!
  \*********************************************************/
/*! exports provided: Feature, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Feature", function() { return Feature; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var Feature = (function (_super) {
    __extends(Feature, _super);
    function Feature() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Feature.prototype.render = function () {
        return null;
    };
    return Feature;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]));

/* harmony default export */ __webpack_exports__["default"] = (Feature);
//# sourceMappingURL=feature.js.map

/***/ }),

/***/ "./node_modules/react-mapbox-gl/lib-esm/geojson-layer.js":
/*!***************************************************************!*\
  !*** ./node_modules/react-mapbox-gl/lib-esm/geojson-layer.js ***!
  \***************************************************************/
/*! exports provided: GeoJSONLayer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GeoJSONLayer", function() { return GeoJSONLayer; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _util_diff__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util/diff */ "./node_modules/react-mapbox-gl/lib-esm/util/diff.js");
/* harmony import */ var _util_uid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util/uid */ "./node_modules/react-mapbox-gl/lib-esm/util/uid.js");
/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./context */ "./node_modules/react-mapbox-gl/lib-esm/context.js");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var isEqual = __webpack_require__(/*! deep-equal */ "./node_modules/deep-equal/index.js");



var types = ['symbol', 'line', 'fill', 'fill-extrusion', 'circle'];
var toCamelCase = function (str) {
    return str
        .replace(/(?:^\w|[A-Z]|\b\w)/g, function (letter, index) {
        return index === 0 ? letter.toLowerCase() : letter.toUpperCase();
    })
        .replace(/[\s+]|-/g, '');
};
var eventToHandler = {
    mousemove: 'OnMouseMove',
    mouseenter: 'OnMouseEnter',
    mouseleave: 'OnMouseLeave',
    mousedown: 'OnMouseDown',
    mouseup: 'OnMouseUp',
    click: 'OnClick'
};
var GeoJSONLayer = (function (_super) {
    __extends(GeoJSONLayer, _super);
    function GeoJSONLayer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.id = _this.props.id || "geojson-" + Object(_util_uid__WEBPACK_IMPORTED_MODULE_2__["generateID"])();
        _this.source = __assign({ type: 'geojson' }, _this.props.sourceOptions, { data: _this.props.data });
        _this.layerIds = [];
        _this.buildLayerId = function (type) {
            return _this.id + "-" + type;
        };
        _this.createLayer = function (type) {
            var _a = _this.props, before = _a.before, layerOptions = _a.layerOptions, map = _a.map;
            var layerId = _this.buildLayerId(type);
            _this.layerIds.push(layerId);
            var paint = _this.props[toCamelCase(type) + "Paint"] || {};
            var visibility = Object.keys(paint).length ? 'visible' : 'none';
            var layout = _this.props[toCamelCase(type) + "Layout"] || {
                visibility: visibility
            };
            map.addLayer(__assign({ id: layerId, source: _this.id, type: type,
                paint: paint,
                layout: layout }, layerOptions), before);
            _this.mapLayerMouseHandlers(type);
        };
        _this.mapLayerMouseHandlers = function (type) {
            var map = _this.props.map;
            var layerId = _this.buildLayerId(type);
            var events = Object.keys(eventToHandler);
            events.forEach(function (event) {
                var handler = _this.props["" + toCamelCase(type) + eventToHandler[event]] || null;
                if (handler) {
                    map.on(event, layerId, handler);
                }
            });
        };
        _this.onStyleDataChange = function () {
            if (!_this.props.map.getSource(_this.id)) {
                _this.unbind();
                _this.initialize();
                _this.forceUpdate();
            }
        };
        _this.isGeoJSONSource = function (source) {
            return !!source &&
                typeof source.setData === 'function';
        };
        return _this;
    }
    GeoJSONLayer.prototype.initialize = function () {
        var map = this.props.map;
        map.addSource(this.id, this.source);
        this.createLayer('symbol');
        this.createLayer('line');
        this.createLayer('fill');
        this.createLayer('fill-extrusion');
        this.createLayer('circle');
    };
    GeoJSONLayer.prototype.unbind = function () {
        var _this = this;
        var map = this.props.map;
        if (map.getSource(this.id)) {
            var layers = map.getStyle().layers;
            if (layers) {
                layers
                    .filter(function (layer) { return layer.source === _this.id; })
                    .forEach(function (layer) { return map.removeLayer(layer.id); });
            }
            map.removeSource(this.id);
        }
        types.forEach(function (type) {
            var events = Object.keys(eventToHandler);
            events.forEach(function (event) {
                var prop = toCamelCase(type) + eventToHandler[event];
                if (_this.props[prop]) {
                    map.off(event, _this.buildLayerId(type), _this.props[prop]);
                }
            });
        });
        this.layerIds.forEach(function (lId) {
            if (map.getLayer(lId)) {
                map.removeLayer(lId);
            }
        });
    };
    GeoJSONLayer.prototype.componentWillMount = function () {
        var map = this.props.map;
        this.initialize();
        map.on('styledata', this.onStyleDataChange);
    };
    GeoJSONLayer.prototype.componentWillUnmount = function () {
        var map = this.props.map;
        if (!map || !map.getStyle()) {
            return;
        }
        map.off('styledata', this.onStyleDataChange);
        this.unbind();
    };
    GeoJSONLayer.prototype.componentWillReceiveProps = function (props) {
        var _this = this;
        var _a = this.props, data = _a.data, before = _a.before, layerOptions = _a.layerOptions, map = _a.map;
        var source = map.getSource(this.id);
        if (!this.isGeoJSONSource(source)) {
            return;
        }
        if (props.data !== data) {
            source.setData(props.data);
            this.source = __assign({ type: 'geojson' }, props.sourceOptions, { data: props.data });
        }
        var layerFilterChanged = props.layerOptions &&
            layerOptions &&
            !isEqual(props.layerOptions.filter, layerOptions.filter);
        types.forEach(function (type) {
            var layerId = _this.buildLayerId(type);
            if (props.layerOptions && layerFilterChanged) {
                map.setFilter(layerId, props.layerOptions.filter || []);
            }
            var paintProp = toCamelCase(type) + 'Paint';
            if (!isEqual(props[paintProp], _this.props[paintProp])) {
                var paintDiff_1 = Object(_util_diff__WEBPACK_IMPORTED_MODULE_1__["default"])(_this.props[paintProp], props[paintProp]);
                Object.keys(paintDiff_1).forEach(function (key) {
                    map.setPaintProperty(layerId, key, paintDiff_1[key]);
                });
            }
            var layoutProp = toCamelCase(type) + 'Layout';
            if (!isEqual(props[layoutProp], _this.props[layoutProp])) {
                var layoutDiff_1 = Object(_util_diff__WEBPACK_IMPORTED_MODULE_1__["default"])(_this.props[layoutProp], props[layoutProp]);
                Object.keys(layoutDiff_1).forEach(function (key) {
                    map.setLayoutProperty(layerId, key, layoutDiff_1[key]);
                });
            }
            var events = Object.keys(eventToHandler);
            events.forEach(function (event) {
                var prop = toCamelCase(type) + eventToHandler[event];
                if (props[prop] !== _this.props[prop]) {
                    if (_this.props[prop]) {
                        map.off(event, layerId, _this.props[prop]);
                    }
                    if (props[prop]) {
                        map.on(event, layerId, props[prop]);
                    }
                }
            });
            if (before !== props.before) {
                map.moveLayer(layerId, props.before);
            }
        });
    };
    GeoJSONLayer.prototype.render = function () {
        return null;
    };
    return GeoJSONLayer;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]));

/* harmony default export */ __webpack_exports__["default"] = (Object(_context__WEBPACK_IMPORTED_MODULE_3__["withMap"])(GeoJSONLayer));
//# sourceMappingURL=geojson-layer.js.map

/***/ }),

/***/ "./node_modules/react-mapbox-gl/lib-esm/image.js":
/*!*******************************************************!*\
  !*** ./node_modules/react-mapbox-gl/lib-esm/image.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./context */ "./node_modules/react-mapbox-gl/lib-esm/context.js");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var Image = (function (_super) {
    __extends(Image, _super);
    function Image() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Image.prototype.componentWillMount = function () {
        this.loadImage(this.props);
    };
    Image.prototype.componentWillUnmount = function () {
        Image.removeImage(this.props);
    };
    Image.prototype.componentWillReceiveProps = function (nextProps) {
        var id = this.props.id;
        if (nextProps.map !== this.props.map) {
            Image.removeImage(this.props);
        }
        if (nextProps.map && !nextProps.map.hasImage(id)) {
            this.loadImage(nextProps);
        }
    };
    Image.prototype.render = function () {
        return null;
    };
    Image.prototype.loadImage = function (props) {
        var _this = this;
        var map = props.map, id = props.id, url = props.url, data = props.data, options = props.options, onError = props.onError;
        if (data) {
            map.addImage(id, data, options);
            this.loaded();
        }
        else if (url) {
            map.loadImage(url, function (error, image) {
                if (error) {
                    if (onError) {
                        onError(error);
                    }
                    return;
                }
                map.addImage(id, image, options);
                _this.loaded();
            });
        }
    };
    Image.removeImage = function (props) {
        var id = props.id, map = props.map;
        if (map) {
            map.removeImage(id);
        }
    };
    Image.prototype.loaded = function () {
        var onLoaded = this.props.onLoaded;
        if (onLoaded) {
            onLoaded();
        }
    };
    return Image;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]));
/* harmony default export */ __webpack_exports__["default"] = (Object(_context__WEBPACK_IMPORTED_MODULE_1__["withMap"])(Image));
//# sourceMappingURL=image.js.map

/***/ }),

/***/ "./node_modules/react-mapbox-gl/lib-esm/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/react-mapbox-gl/lib-esm/index.js ***!
  \*******************************************************/
/*! exports provided: Feature, Layer, GeoJSONLayer, Map, Popup, ZoomControl, ScaleControl, Marker, Source, Cluster, RotationControl, Image, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Layer", function() { return Layer; });
/* harmony import */ var _map__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./map */ "./node_modules/react-mapbox-gl/lib-esm/map.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Map", function() { return _map__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _layer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./layer */ "./node_modules/react-mapbox-gl/lib-esm/layer.js");
/* harmony import */ var _layer_events_hoc__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./layer-events-hoc */ "./node_modules/react-mapbox-gl/lib-esm/layer-events-hoc.js");
/* harmony import */ var _geojson_layer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./geojson-layer */ "./node_modules/react-mapbox-gl/lib-esm/geojson-layer.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GeoJSONLayer", function() { return _geojson_layer__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _feature__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./feature */ "./node_modules/react-mapbox-gl/lib-esm/feature.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Feature", function() { return _feature__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _zoom_control__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./zoom-control */ "./node_modules/react-mapbox-gl/lib-esm/zoom-control.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ZoomControl", function() { return _zoom_control__WEBPACK_IMPORTED_MODULE_5__["default"]; });

/* harmony import */ var _popup__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./popup */ "./node_modules/react-mapbox-gl/lib-esm/popup.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Popup", function() { return _popup__WEBPACK_IMPORTED_MODULE_6__["default"]; });

/* harmony import */ var _scale_control__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./scale-control */ "./node_modules/react-mapbox-gl/lib-esm/scale-control.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ScaleControl", function() { return _scale_control__WEBPACK_IMPORTED_MODULE_7__["default"]; });

/* harmony import */ var _marker__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./marker */ "./node_modules/react-mapbox-gl/lib-esm/marker.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Marker", function() { return _marker__WEBPACK_IMPORTED_MODULE_8__["default"]; });

/* harmony import */ var _source__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./source */ "./node_modules/react-mapbox-gl/lib-esm/source.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Source", function() { return _source__WEBPACK_IMPORTED_MODULE_9__["default"]; });

/* harmony import */ var _cluster__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./cluster */ "./node_modules/react-mapbox-gl/lib-esm/cluster.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Cluster", function() { return _cluster__WEBPACK_IMPORTED_MODULE_10__["default"]; });

/* harmony import */ var _rotation_control__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./rotation-control */ "./node_modules/react-mapbox-gl/lib-esm/rotation-control.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RotationControl", function() { return _rotation_control__WEBPACK_IMPORTED_MODULE_11__["default"]; });

/* harmony import */ var _image__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./image */ "./node_modules/react-mapbox-gl/lib-esm/image.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Image", function() { return _image__WEBPACK_IMPORTED_MODULE_12__["default"]; });

/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./context */ "./node_modules/react-mapbox-gl/lib-esm/context.js");














var Layer = Object(_context__WEBPACK_IMPORTED_MODULE_13__["withMap"])(Object(_layer_events_hoc__WEBPACK_IMPORTED_MODULE_2__["default"])(_layer__WEBPACK_IMPORTED_MODULE_1__["default"]));

/* harmony default export */ __webpack_exports__["default"] = (_map__WEBPACK_IMPORTED_MODULE_0__["default"]);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/react-mapbox-gl/lib-esm/layer-events-hoc.js":
/*!******************************************************************!*\
  !*** ./node_modules/react-mapbox-gl/lib-esm/layer-events-hoc.js ***!
  \******************************************************************/
/*! exports provided: layerMouseTouchEvents, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "layerMouseTouchEvents", function() { return layerMouseTouchEvents; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _util_uid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util/uid */ "./node_modules/react-mapbox-gl/lib-esm/util/uid.js");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};


function layerMouseTouchEvents(WrappedComponent) {
    return (function (_super) {
        __extends(EnhancedLayer, _super);
        function EnhancedLayer() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.hover = [];
            _this.draggedChildren = undefined;
            _this.id = _this.props.id || "layer-" + Object(_util_uid__WEBPACK_IMPORTED_MODULE_1__["generateID"])();
            _this.getChildren = function () {
                return []
                    .concat(_this.props.children)
                    .filter(function (el) {
                    return typeof el !== 'undefined';
                });
            };
            _this.getChildFromId = function (children, id) { return children[id]; };
            _this.areFeaturesDraggable = function (children, featureIds) {
                if (featureIds === void 0) { featureIds = _this.hover; }
                return !!featureIds
                    .map(function (id) {
                    return _this.getChildFromId(children, id)
                        ? _this.getChildFromId(children, id).props.draggable
                        : false;
                })
                    .filter(Boolean).length;
            };
            _this.onClick = function (evt) {
                var features = evt.features;
                var children = _this.getChildren();
                var map = _this.props.map;
                if (features) {
                    features.forEach(function (feature) {
                        var id = feature.properties.id;
                        if (children) {
                            var child = _this.getChildFromId(children, id);
                            var onClick = child && child.props.onClick;
                            if (onClick) {
                                onClick(__assign({}, evt, { feature: feature, map: map }));
                            }
                        }
                    });
                }
            };
            _this.onMouseEnter = function (evt) {
                var children = _this.getChildren();
                var map = _this.props.map;
                _this.hover = [];
                evt.features.forEach(function (feature) {
                    var id = feature.properties.id;
                    var child = _this.getChildFromId(children, id);
                    _this.hover.push(id);
                    var onMouseEnter = child && child.props.onMouseEnter;
                    if (onMouseEnter) {
                        onMouseEnter(__assign({}, evt, { feature: feature, map: map }));
                    }
                });
                if (_this.areFeaturesDraggable(children)) {
                    map.dragPan.disable();
                }
            };
            _this.onMouseLeave = function (evt) {
                var children = _this.getChildren();
                var map = _this.props.map;
                if (_this.areFeaturesDraggable(children)) {
                    map.dragPan.enable();
                }
                _this.hover.forEach(function (id) {
                    var child = _this.getChildFromId(children, id);
                    var onMouseLeave = child && child.props.onMouseLeave;
                    if (onMouseLeave) {
                        onMouseLeave(__assign({}, evt, { map: map }));
                    }
                });
                if (!_this.draggedChildren) {
                    _this.hover = [];
                }
            };
            _this.onMouseDown = function () {
                if (_this.hover.length) {
                    _this.onFeatureDown('mousedown');
                }
            };
            _this.onTouchStart = function (evt) {
                _this.hover = evt.features.map(function (feature) { return feature.properties.id; });
                if (_this.hover.length) {
                    _this.onFeatureDown('touchstart');
                }
            };
            _this.onFeatureDown = function (startEvent) {
                var moveEvent = startEvent === 'mousedown' ? 'mousemove' : 'touchmove';
                var endEvent = startEvent === 'mousedown' ? 'mouseup' : 'touchend';
                var map = _this.props.map;
                map.once(moveEvent, _this.onFeatureDragStart);
                map.on(moveEvent, _this.onFeatureDrag);
                map.once(endEvent, function (evt) {
                    map.off(moveEvent, _this.onFeatureDragStart);
                    map.off(moveEvent, _this.onFeatureDrag);
                    _this.onFeatureDragEnd(evt);
                });
            };
            _this.onFeatureDragStart = function (evt) {
                var map = _this.props.map;
                var children = _this.getChildren();
                _this.hover.forEach(function (id) {
                    var child = _this.getChildFromId(children, id);
                    if (child && !child.props.draggable) {
                        return;
                    }
                    var onDragStart = child && child.props.onDragStart;
                    if (onDragStart) {
                        onDragStart(__assign({}, evt, { map: map }));
                    }
                });
            };
            _this.onFeatureDrag = function (evt) {
                var children = _this.getChildren();
                var map = _this.props.map;
                var _a = evt.lngLat, lng = _a.lng, lat = _a.lat;
                _this.draggedChildren = [];
                _this.hover.forEach(function (id) {
                    var child = _this.getChildFromId(children, id);
                    var onDrag = child && child.props.onDrag;
                    if (child && child.props.draggable) {
                        _this.draggedChildren.push(react__WEBPACK_IMPORTED_MODULE_0__["cloneElement"](child, {
                            coordinates: [lng, lat]
                        }));
                        if (onDrag) {
                            onDrag(__assign({}, evt, { map: map }));
                        }
                    }
                });
                _this.forceUpdate();
            };
            _this.onFeatureDragEnd = function (evt) {
                var map = _this.props.map;
                var children = _this.getChildren();
                _this.hover.forEach(function (id) {
                    var child = _this.getChildFromId(children, id);
                    var onDragEnd = child && child.props.onDragEnd;
                    if (onDragEnd && child.props.draggable && _this.draggedChildren) {
                        onDragEnd(__assign({}, evt, { map: map }));
                    }
                });
                _this.draggedChildren = undefined;
            };
            return _this;
        }
        EnhancedLayer.prototype.componentWillMount = function () {
            var map = this.props.map;
            map.on('click', this.id, this.onClick);
            map.on('mouseenter', this.id, this.onMouseEnter);
            map.on('mouseleave', this.id, this.onMouseLeave);
            map.on('mousedown', this.id, this.onMouseDown);
            map.on('touchstart', this.id, this.onTouchStart);
        };
        EnhancedLayer.prototype.componentWillUnmount = function () {
            var map = this.props.map;
            map.off('click', this.onClick);
            map.off('mouseenter', this.onMouseEnter);
            map.off('mouseleave', this.onMouseLeave);
            map.off('mousedown', this.onMouseDown);
            map.off('touchstart', this.onTouchStart);
        };
        EnhancedLayer.prototype.render = function () {
            return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"](WrappedComponent, __assign({}, this.props, { id: this.id, map: this.props.map, draggedChildren: this.draggedChildren })));
        };
        return EnhancedLayer;
    }(react__WEBPACK_IMPORTED_MODULE_0__["Component"]));
}
/* harmony default export */ __webpack_exports__["default"] = (layerMouseTouchEvents);
//# sourceMappingURL=layer-events-hoc.js.map

/***/ }),

/***/ "./node_modules/react-mapbox-gl/lib-esm/layer.js":
/*!*******************************************************!*\
  !*** ./node_modules/react-mapbox-gl/lib-esm/layer.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _util_diff__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util/diff */ "./node_modules/react-mapbox-gl/lib-esm/util/diff.js");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var isEqual = __webpack_require__(/*! deep-equal */ "./node_modules/deep-equal/index.js");

var eventToHandler = {
    mousemove: 'onMouseMove',
    mouseenter: 'onMouseEnter',
    mouseleave: 'onMouseLeave',
    mousedown: 'onMouseDown',
    mouseup: 'onMouseUp',
    click: 'onClick'
};
var Layer = (function (_super) {
    __extends(Layer, _super);
    function Layer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.source = __assign({ type: 'geojson' }, _this.props.geoJSONSourceOptions, { data: {
                type: 'FeatureCollection',
                features: []
            } });
        _this.geometry = function (coordinates) {
            switch (_this.props.type) {
                case 'symbol':
                case 'circle':
                    return {
                        type: 'Point',
                        coordinates: coordinates
                    };
                case 'fill':
                    if (coordinates.length > 1) {
                        return {
                            type: 'MultiPolygon',
                            coordinates: coordinates
                        };
                    }
                    return {
                        type: 'Polygon',
                        coordinates: coordinates
                    };
                case 'line':
                    return {
                        type: 'LineString',
                        coordinates: coordinates
                    };
                default:
                    return {
                        type: 'Point',
                        coordinates: coordinates
                    };
            }
        };
        _this.makeFeature = function (props, id) { return ({
            type: 'Feature',
            geometry: _this.geometry(props.coordinates),
            properties: __assign({}, props.properties, { id: id })
        }); };
        _this.initialize = function () {
            var _a = _this.props, type = _a.type, layout = _a.layout, paint = _a.paint, sourceId = _a.sourceId, before = _a.before, images = _a.images, id = _a.id, metadata = _a.metadata, sourceLayer = _a.sourceLayer, minZoom = _a.minZoom, maxZoom = _a.maxZoom, filter = _a.filter;
            var map = _this.props.map;
            var layer = {
                id: id,
                source: sourceId || id,
                type: type,
                layout: layout,
                paint: paint,
                metadata: metadata
            };
            if (sourceLayer) {
                layer['source-layer'] = sourceLayer;
            }
            if (minZoom) {
                layer.minzoom = minZoom;
            }
            if (maxZoom) {
                layer.maxzoom = maxZoom;
            }
            if (filter) {
                layer.filter = filter;
            }
            if (images) {
                var normalizedImages = !Array.isArray(images[0]) ? [images] : images;
                normalizedImages
                    .filter(function (image) { return !map.hasImage(image[0]); })
                    .forEach(function (image) {
                    map.addImage(image[0], image[1], image[2]);
                });
            }
            if (!sourceId && !map.getSource(id)) {
                map.addSource(id, _this.source);
            }
            if (!map.getLayer(id)) {
                map.addLayer(layer, before);
            }
            Object.entries(eventToHandler).forEach(function (_a) {
                var event = _a[0], propName = _a[1];
                var handler = _this.props[propName];
                if (handler) {
                    map.on(event, id, handler);
                }
            });
        };
        _this.onStyleDataChange = function () {
            if (!_this.props.map.getLayer(_this.props.id)) {
                _this.initialize();
                _this.forceUpdate();
            }
        };
        _this.getChildren = function () {
            var children = _this.props.children;
            if (!children) {
                return [];
            }
            if (Array.isArray(children)) {
                return children.reduce(function (arr, next) { return arr.concat(next); }, []);
            }
            return [children];
        };
        return _this;
    }
    Layer.prototype.componentWillMount = function () {
        var map = this.props.map;
        this.initialize();
        map.on('styledata', this.onStyleDataChange);
    };
    Layer.prototype.componentWillUnmount = function () {
        var _this = this;
        var map = this.props.map;
        var _a = this.props, images = _a.images, id = _a.id;
        if (!map || !map.getStyle()) {
            return;
        }
        if (map.getLayer(id)) {
            map.removeLayer(id);
        }
        if (!this.props.sourceId) {
            map.removeSource(id);
        }
        if (images) {
            var normalizedImages = !Array.isArray(images[0]) ? [images] : images;
            normalizedImages
                .map(function (_a) {
                var key = _a[0], rest = _a.slice(1);
                return key;
            })
                .forEach(map.removeImage);
        }
        map.off('styledata', this.onStyleDataChange);
        Object.entries(eventToHandler).forEach(function (_a) {
            var event = _a[0], propName = _a[1];
            var handler = _this.props[propName];
            if (handler) {
                map.off(event, id, handler);
            }
        });
    };
    Layer.prototype.componentWillReceiveProps = function (props) {
        var _this = this;
        var _a = this.props, paint = _a.paint, layout = _a.layout, before = _a.before, filter = _a.filter, id = _a.id, minZoom = _a.minZoom, maxZoom = _a.maxZoom;
        var map = this.props.map;
        if (!isEqual(props.paint, paint)) {
            var paintDiff_1 = Object(_util_diff__WEBPACK_IMPORTED_MODULE_1__["default"])(paint, props.paint);
            Object.keys(paintDiff_1).forEach(function (key) {
                map.setPaintProperty(id, key, paintDiff_1[key]);
            });
        }
        if (!isEqual(props.layout, layout)) {
            var layoutDiff_1 = Object(_util_diff__WEBPACK_IMPORTED_MODULE_1__["default"])(layout, props.layout);
            Object.keys(layoutDiff_1).forEach(function (key) {
                map.setLayoutProperty(id, key, layoutDiff_1[key]);
            });
        }
        if (props.filter && filter && !isEqual(props.filter, filter)) {
            map.setFilter(id, props.filter || []);
        }
        if (before !== props.before) {
            map.moveLayer(id, props.before);
        }
        if (minZoom !== props.minZoom || maxZoom !== props.maxZoom) {
            map.setLayerZoomRange(id, props.minZoom, props.maxZoom);
        }
        Object.entries(eventToHandler).forEach(function (_a) {
            var event = _a[0], propName = _a[1];
            var oldHandler = _this.props[propName];
            var newHandler = props[propName];
            if (oldHandler !== newHandler) {
                if (oldHandler) {
                    map.off(event, id, oldHandler);
                }
                if (newHandler) {
                    map.on(event, id, newHandler);
                }
            }
        });
    };
    Layer.prototype.render = function () {
        var _this = this;
        var map = this.props.map;
        var _a = this.props, sourceId = _a.sourceId, draggedChildren = _a.draggedChildren;
        var children = this.getChildren();
        if (draggedChildren) {
            var draggableChildrenIds_1 = draggedChildren.map(function (child) { return child.key; });
            children = children.map(function (child) {
                var indexChildren = draggableChildrenIds_1.indexOf(child.key);
                if (indexChildren !== -1) {
                    return draggedChildren[indexChildren];
                }
                return child;
            });
        }
        var features = children
            .map(function (_a, id) {
            var props = _a.props;
            return _this.makeFeature(props, id);
        })
            .filter(Boolean);
        var source = map.getSource(sourceId || this.props.id);
        if (source && !sourceId && source.setData) {
            source.setData({
                type: 'FeatureCollection',
                features: features
            });
        }
        return null;
    };
    Layer.defaultProps = {
        type: 'symbol',
        layout: {},
        paint: {}
    };
    return Layer;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]));
/* harmony default export */ __webpack_exports__["default"] = (Layer);
//# sourceMappingURL=layer.js.map

/***/ }),

/***/ "./node_modules/react-mapbox-gl/lib-esm/map-events.js":
/*!************************************************************!*\
  !*** ./node_modules/react-mapbox-gl/lib-esm/map-events.js ***!
  \************************************************************/
/*! exports provided: events, listenEvents, updateEvents */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "events", function() { return events; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "listenEvents", function() { return listenEvents; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateEvents", function() { return updateEvents; });
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var events = {
    onResize: 'resize',
    onDblClick: 'dblclick',
    onClick: 'click',
    onMouseMove: 'mousemove',
    onMouseOut: 'mouseout',
    onMoveStart: 'movestart',
    onMove: 'move',
    onMoveEnd: 'moveend',
    onMouseUp: 'mouseup',
    onMouseDown: 'mousedown',
    onDragStart: 'dragstart',
    onDrag: 'drag',
    onDragEnd: 'dragend',
    onZoomStart: 'zoomstart',
    onZoom: 'zoom',
    onZoomEnd: 'zoomend',
    onPitch: 'pitch',
    onPitchStart: 'pitchstart',
    onPitchEnd: 'pitchend',
    onWebGlContextLost: 'webglcontextlost',
    onWebGlContextRestored: 'webglcontextrestored',
    onRemove: 'remove',
    onContextMenu: 'contextmenu',
    onRender: 'render',
    onError: 'error',
    onSourceData: 'sourcedata',
    onDataLoading: 'dataloading',
    onStyleDataLoading: 'styledataloading',
    onTouchCancel: 'touchcancel',
    onData: 'data',
    onSourceDataLoading: 'sourcedataloading',
    onTouchMove: 'touchmove',
    onTouchEnd: 'touchend',
    onTouchStart: 'touchstart',
    onStyleData: 'styledata',
    onBoxZoomStart: 'boxzoomstart',
    onBoxZoomEnd: 'boxzoomend',
    onBoxZoomCancel: 'boxzoomcancel',
    onRotateStart: 'rotatestart',
    onRotate: 'rotate',
    onRotateEnd: 'rotateend'
};
var listenEvents = function (partialEvents, props, map) {
    return Object.keys(partialEvents).reduce(function (listeners, event) {
        var propEvent = props[event];
        if (propEvent) {
            var listener = function (evt) {
                propEvent(map, evt);
            };
            map.on(partialEvents[event], listener);
            listeners[event] = listener;
        }
        return listeners;
    }, {});
};
var updateEvents = function (listeners, nextProps, map) {
    var toListenOff = Object.keys(events).filter(function (eventKey) { return listeners[eventKey] && typeof nextProps[eventKey] !== 'function'; });
    toListenOff.forEach(function (key) {
        map.off(events[key], listeners[key]);
        delete listeners[key];
    });
    var toListenOn = Object.keys(events)
        .filter(function (key) { return !listeners[key] && typeof nextProps[key] === 'function'; })
        .reduce(function (acc, next) { return ((acc[next] = events[next]), acc); }, {});
    var newListeners = listenEvents(toListenOn, nextProps, map);
    return __assign({}, listeners, newListeners);
};
//# sourceMappingURL=map-events.js.map

/***/ }),

/***/ "./node_modules/react-mapbox-gl/lib-esm/map.js":
/*!*****************************************************!*\
  !*** ./node_modules/react-mapbox-gl/lib-esm/map.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var mapbox_gl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mapbox-gl */ "./node_modules/mapbox-gl/dist/mapbox-gl.js");
/* harmony import */ var mapbox_gl__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mapbox_gl__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _map_events__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./map-events */ "./node_modules/react-mapbox-gl/lib-esm/map-events.js");
/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./context */ "./node_modules/react-mapbox-gl/lib-esm/context.js");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};




var isEqual = __webpack_require__(/*! deep-equal */ "./node_modules/deep-equal/index.js");
var defaultZoom = [11];
var defaultMovingMethod = 'flyTo';
var defaultCenter = [-0.2416815, 51.5285582];
var ReactMapboxFactory = function (_a) {
    var accessToken = _a.accessToken, apiUrl = _a.apiUrl, _b = _a.minZoom, minZoom = _b === void 0 ? 0 : _b, _c = _a.maxZoom, maxZoom = _c === void 0 ? 20 : _c, _d = _a.hash, hash = _d === void 0 ? false : _d, _e = _a.preserveDrawingBuffer, preserveDrawingBuffer = _e === void 0 ? false : _e, _f = _a.scrollZoom, scrollZoom = _f === void 0 ? true : _f, _g = _a.interactive, interactive = _g === void 0 ? true : _g, _h = _a.dragRotate, dragRotate = _h === void 0 ? true : _h, _j = _a.attributionControl, attributionControl = _j === void 0 ? true : _j, customAttribution = _a.customAttribution, _k = _a.logoPosition, logoPosition = _k === void 0 ? 'bottom-left' : _k, _l = _a.renderWorldCopies, renderWorldCopies = _l === void 0 ? true : _l, _m = _a.trackResize, trackResize = _m === void 0 ? true : _m, _o = _a.touchZoomRotate, touchZoomRotate = _o === void 0 ? true : _o, _p = _a.doubleClickZoom, doubleClickZoom = _p === void 0 ? true : _p, _q = _a.keyboard, keyboard = _q === void 0 ? true : _q, _r = _a.dragPan, dragPan = _r === void 0 ? true : _r, _s = _a.boxZoom, boxZoom = _s === void 0 ? true : _s, _t = _a.refreshExpiredTiles, refreshExpiredTiles = _t === void 0 ? true : _t, _u = _a.failIfMajorPerformanceCaveat, failIfMajorPerformanceCaveat = _u === void 0 ? false : _u, _v = _a.bearingSnap, bearingSnap = _v === void 0 ? 7 : _v, _w = _a.injectCSS, injectCSS = _w === void 0 ? true : _w, transformRequest = _a.transformRequest;
    var _x;
    if (injectCSS) {
        __webpack_require__(/*! mapbox-gl/dist/mapbox-gl.css */ "./node_modules/mapbox-gl/dist/mapbox-gl.css");
    }
    return _x = (function (_super) {
            __extends(ReactMapboxGl, _super);
            function ReactMapboxGl() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.state = {
                    map: undefined,
                    ready: false
                };
                _this.listeners = {};
                _this._isMounted = true;
                _this.calcCenter = function (bounds) { return [
                    (bounds[0][0] + bounds[1][0]) / 2,
                    (bounds[0][1] + bounds[1][1]) / 2
                ]; };
                _this.setRef = function (x) {
                    _this.container = x;
                };
                return _this;
            }
            ReactMapboxGl.prototype.componentDidMount = function () {
                var _this = this;
                var _a = this.props, style = _a.style, onStyleLoad = _a.onStyleLoad, center = _a.center, pitch = _a.pitch, zoom = _a.zoom, fitBounds = _a.fitBounds, fitBoundsOptions = _a.fitBoundsOptions, bearing = _a.bearing, maxBounds = _a.maxBounds;
                mapbox_gl__WEBPACK_IMPORTED_MODULE_0__["accessToken"] = accessToken;
                if (apiUrl) {
                    mapbox_gl__WEBPACK_IMPORTED_MODULE_0__["config"].API_URL = apiUrl;
                }
                if (!Array.isArray(zoom)) {
                    throw new Error('zoom need to be an array type of length 1 for reliable update');
                }
                var opts = {
                    preserveDrawingBuffer: preserveDrawingBuffer,
                    hash: hash,
                    zoom: zoom[0],
                    minZoom: minZoom,
                    maxZoom: maxZoom,
                    maxBounds: maxBounds,
                    container: this.container,
                    center: fitBounds && center === defaultCenter
                        ? this.calcCenter(fitBounds)
                        : center,
                    style: style,
                    scrollZoom: scrollZoom,
                    attributionControl: attributionControl,
                    customAttribution: customAttribution,
                    interactive: interactive,
                    dragRotate: dragRotate,
                    renderWorldCopies: renderWorldCopies,
                    trackResize: trackResize,
                    touchZoomRotate: touchZoomRotate,
                    doubleClickZoom: doubleClickZoom,
                    keyboard: keyboard,
                    dragPan: dragPan,
                    boxZoom: boxZoom,
                    refreshExpiredTiles: refreshExpiredTiles,
                    logoPosition: logoPosition,
                    bearingSnap: bearingSnap,
                    failIfMajorPerformanceCaveat: failIfMajorPerformanceCaveat,
                    transformRequest: transformRequest
                };
                if (bearing) {
                    if (!Array.isArray(bearing)) {
                        throw new Error('bearing need to be an array type of length 1 for reliable update');
                    }
                    opts.bearing = bearing[0];
                }
                if (pitch) {
                    if (!Array.isArray(pitch)) {
                        throw new Error('pitch need to be an array type of length 1 for reliable update');
                    }
                    opts.pitch = pitch[0];
                }
                var map = new mapbox_gl__WEBPACK_IMPORTED_MODULE_0__["Map"](opts);
                this.setState({ map: map });
                if (fitBounds) {
                    map.fitBounds(fitBounds, fitBoundsOptions);
                }
                map.on('load', function (evt) {
                    if (_this._isMounted) {
                        _this.setState({ ready: true });
                    }
                    if (onStyleLoad) {
                        onStyleLoad(map, evt);
                    }
                });
                this.listeners = Object(_map_events__WEBPACK_IMPORTED_MODULE_2__["listenEvents"])(_map_events__WEBPACK_IMPORTED_MODULE_2__["events"], this.props, map);
            };
            ReactMapboxGl.prototype.componentWillUnmount = function () {
                var map = this.state.map;
                this._isMounted = false;
                if (map) {
                    map.remove();
                }
            };
            ReactMapboxGl.prototype.componentWillReceiveProps = function (nextProps) {
                var map = this.state.map;
                if (!map) {
                    return null;
                }
                this.listeners = Object(_map_events__WEBPACK_IMPORTED_MODULE_2__["updateEvents"])(this.listeners, nextProps, map);
                var center = map.getCenter();
                var zoom = map.getZoom();
                var bearing = map.getBearing();
                var pitch = map.getPitch();
                var didZoomUpdate = this.props.zoom !== nextProps.zoom &&
                    (nextProps.zoom && nextProps.zoom[0]) !== zoom;
                var didCenterUpdate = this.props.center !== nextProps.center &&
                    ((nextProps.center && nextProps.center[0]) !== center.lng ||
                        (nextProps.center && nextProps.center[1]) !== center.lat);
                var didBearingUpdate = this.props.bearing !== nextProps.bearing &&
                    (nextProps.bearing && nextProps.bearing[0]) !== bearing;
                var didPitchUpdate = this.props.pitch !== nextProps.pitch &&
                    (nextProps.pitch && nextProps.pitch[0]) !== pitch;
                if (nextProps.maxBounds) {
                    var didMaxBoundsUpdate = this.props.maxBounds !== nextProps.maxBounds;
                    if (didMaxBoundsUpdate) {
                        map.setMaxBounds(nextProps.maxBounds);
                    }
                }
                if (nextProps.fitBounds) {
                    var fitBounds = this.props.fitBounds;
                    var didFitBoundsUpdate = fitBounds !== nextProps.fitBounds ||
                        nextProps.fitBounds.length !== (fitBounds && fitBounds.length) ||
                        !!fitBounds.filter(function (c, i) {
                            var nc = nextProps.fitBounds && nextProps.fitBounds[i];
                            return c[0] !== (nc && nc[0]) || c[1] !== (nc && nc[1]);
                        })[0];
                    if (didFitBoundsUpdate ||
                        !isEqual(this.props.fitBoundsOptions, nextProps.fitBoundsOptions)) {
                        map.fitBounds(nextProps.fitBounds, nextProps.fitBoundsOptions);
                    }
                }
                if (didZoomUpdate ||
                    didCenterUpdate ||
                    didBearingUpdate ||
                    didPitchUpdate) {
                    var mm = nextProps.movingMethod || defaultMovingMethod;
                    var flyToOptions = nextProps.flyToOptions, animationOptions = nextProps.animationOptions;
                    map[mm](__assign({}, animationOptions, flyToOptions, { zoom: didZoomUpdate && nextProps.zoom ? nextProps.zoom[0] : zoom, center: didCenterUpdate ? nextProps.center : center, bearing: didBearingUpdate ? nextProps.bearing : bearing, pitch: didPitchUpdate ? nextProps.pitch : pitch }));
                }
                if (!isEqual(this.props.style, nextProps.style)) {
                    map.setStyle(nextProps.style);
                }
                return null;
            };
            ReactMapboxGl.prototype.render = function () {
                var _a = this.props, containerStyle = _a.containerStyle, className = _a.className, children = _a.children;
                var ready = this.state.ready;
                return (react__WEBPACK_IMPORTED_MODULE_1__["createElement"](_context__WEBPACK_IMPORTED_MODULE_3__["MapContext"].Provider, { value: this.state.map },
                    react__WEBPACK_IMPORTED_MODULE_1__["createElement"]("div", { ref: this.setRef, className: className, style: __assign({}, containerStyle) }, ready && children)));
            };
            return ReactMapboxGl;
        }(react__WEBPACK_IMPORTED_MODULE_1__["Component"])),
        _x.defaultProps = {
            onStyleLoad: function (map, evt) { return null; },
            center: defaultCenter,
            zoom: defaultZoom,
            bearing: 0,
            movingMethod: defaultMovingMethod,
            pitch: 0,
            containerStyle: {
                textAlign: 'left'
            }
        },
        _x;
};
/* harmony default export */ __webpack_exports__["default"] = (ReactMapboxFactory);
//# sourceMappingURL=map.js.map

/***/ }),

/***/ "./node_modules/react-mapbox-gl/lib-esm/marker.js":
/*!********************************************************!*\
  !*** ./node_modules/react-mapbox-gl/lib-esm/marker.js ***!
  \********************************************************/
/*! exports provided: Marker, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Marker", function() { return Marker; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _projected_layer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./projected-layer */ "./node_modules/react-mapbox-gl/lib-esm/projected-layer.js");
/* harmony import */ var _util_classname__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util/classname */ "./node_modules/react-mapbox-gl/lib-esm/util/classname.js");
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};



var defaultClassName = ['mapboxgl-marker'];
var Marker = function (props) { return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_projected_layer__WEBPACK_IMPORTED_MODULE_1__["default"], __assign({}, __assign({}, props), { type: "marker", className: Object(_util_classname__WEBPACK_IMPORTED_MODULE_2__["getClassName"])(defaultClassName, props.className) }))); };
/* harmony default export */ __webpack_exports__["default"] = (Marker);
//# sourceMappingURL=marker.js.map

/***/ }),

/***/ "./node_modules/react-mapbox-gl/lib-esm/popup.js":
/*!*******************************************************!*\
  !*** ./node_modules/react-mapbox-gl/lib-esm/popup.js ***!
  \*******************************************************/
/*! exports provided: defaultClassName, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultClassName", function() { return defaultClassName; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _projected_layer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./projected-layer */ "./node_modules/react-mapbox-gl/lib-esm/projected-layer.js");
/* harmony import */ var _util_classname__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util/classname */ "./node_modules/react-mapbox-gl/lib-esm/util/classname.js");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};



var defaultClassName = ['mapboxgl-popup'];
var Popup = (function (_super) {
    __extends(Popup, _super);
    function Popup() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Popup.prototype.render = function () {
        var _a = this.props, children = _a.children, className = _a.className;
        var props = __assign({}, this.props, { children: undefined });
        var childrenClassName = Object(_util_classname__WEBPACK_IMPORTED_MODULE_2__["getClassName"])(defaultClassName, className);
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_projected_layer__WEBPACK_IMPORTED_MODULE_1__["default"], __assign({}, props, { type: "popup", className: childrenClassName }),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "mapboxgl-popup-tip" }),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "mapboxgl-popup-content" }, children)));
    };
    return Popup;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]));
/* harmony default export */ __webpack_exports__["default"] = (Popup);
//# sourceMappingURL=popup.js.map

/***/ }),

/***/ "./node_modules/react-mapbox-gl/lib-esm/projected-layer.js":
/*!*****************************************************************!*\
  !*** ./node_modules/react-mapbox-gl/lib-esm/projected-layer.js ***!
  \*****************************************************************/
/*! exports provided: ProjectedLayer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjectedLayer", function() { return ProjectedLayer; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _util_overlays__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util/overlays */ "./node_modules/react-mapbox-gl/lib-esm/util/overlays.js");
/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./context */ "./node_modules/react-mapbox-gl/lib-esm/context.js");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};



var defaultStyle = {
    zIndex: 3
};
var ProjectedLayer = (function (_super) {
    __extends(ProjectedLayer, _super);
    function ProjectedLayer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.container = undefined;
        _this.prevent = false;
        _this.state = {};
        _this.setContainer = function (el) {
            if (el) {
                _this.container = el;
            }
        };
        _this.handleMapMove = function () {
            if (!_this.prevent) {
                _this.setState(Object(_util_overlays__WEBPACK_IMPORTED_MODULE_1__["overlayState"])(_this.props, _this.props.map, _this.container));
            }
        };
        return _this;
    }
    ProjectedLayer.prototype.componentDidMount = function () {
        var map = this.props.map;
        map.on('move', this.handleMapMove);
        this.handleMapMove();
    };
    ProjectedLayer.prototype.havePropsChanged = function (props, nextProps) {
        return (props.coordinates[0] !== nextProps.coordinates[0] ||
            props.coordinates[1] !== nextProps.coordinates[1] ||
            props.offset !== nextProps.offset ||
            props.anchor !== nextProps.anchor);
    };
    ProjectedLayer.prototype.componentWillReceiveProps = function (nextProps) {
        if (this.havePropsChanged(this.props, nextProps)) {
            this.setState(Object(_util_overlays__WEBPACK_IMPORTED_MODULE_1__["overlayState"])(nextProps, this.props.map, this.container));
        }
    };
    ProjectedLayer.prototype.componentWillUnmount = function () {
        var map = this.props.map;
        this.prevent = true;
        map.off('move', this.handleMapMove);
    };
    ProjectedLayer.prototype.render = function () {
        var _a = this.props, style = _a.style, children = _a.children, className = _a.className, onClick = _a.onClick, onDoubleClick = _a.onDoubleClick, onMouseEnter = _a.onMouseEnter, onMouseLeave = _a.onMouseLeave, onScroll = _a.onScroll, onWheel = _a.onWheel, type = _a.type, tabIndex = _a.tabIndex;
        var anchor = this.state.anchor;
        var finalStyle = __assign({}, defaultStyle, style, { transform: Object(_util_overlays__WEBPACK_IMPORTED_MODULE_1__["overlayTransform"])(this.state).join(' ') });
        var anchorClassname = anchor && type === 'popup' ? "mapboxgl-popup-anchor-" + anchor : '';
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: className + " " + anchorClassname, onClick: onClick, onDoubleClick: onDoubleClick, onMouseEnter: onMouseEnter, onMouseLeave: onMouseLeave, onScroll: onScroll, onWheel: onWheel, style: finalStyle, ref: this.setContainer, tabIndex: tabIndex }, children));
    };
    ProjectedLayer.defaultProps = {
        offset: 0,
        onClick: function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return args;
        }
    };
    return ProjectedLayer;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]));

/* harmony default export */ __webpack_exports__["default"] = (Object(_context__WEBPACK_IMPORTED_MODULE_2__["withMap"])(ProjectedLayer));
//# sourceMappingURL=projected-layer.js.map

/***/ }),

/***/ "./node_modules/react-mapbox-gl/lib-esm/rotation-control.js":
/*!******************************************************************!*\
  !*** ./node_modules/react-mapbox-gl/lib-esm/rotation-control.js ***!
  \******************************************************************/
/*! exports provided: RotationControl, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RotationControl", function() { return RotationControl; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./context */ "./node_modules/react-mapbox-gl/lib-esm/context.js");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};


var containerStyle = {
    position: 'absolute',
    zIndex: 10,
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0px 1px 4px rgba(0, 0, 0, .3)',
    border: '1px solid rgba(0, 0, 0, 0.1)'
};
var positions = {
    'top-right': { top: 62, right: 10, bottom: 'auto', left: 'auto' },
    'top-left': { top: 62, left: 10, bottom: 'auto', right: 'auto' },
    'bottom-right': { bottom: 63, right: 10, top: 'auto', left: 'auto' },
    'bottom-left': { bottom: 63, left: 10, top: 'auto', right: 'auto' }
};
var buttonStyle = {
    backgroundColor: '#f9f9f9',
    opacity: 0.95,
    transition: 'background-color 0.16s ease-out',
    cursor: 'pointer',
    border: 0,
    height: 26,
    width: 26,
    outline: 0,
    padding: 3
};
var buttonStyleHovered = {
    backgroundColor: '#fff',
    opacity: 1
};
var buttonStyleCompass = {
    borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2
};
var Icon = function () { return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("svg", { viewBox: "0 0 20 20" },
    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("polygon", { fill: "#333333", points: "6,9 10,1 14,9" }),
    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("polygon", { fill: "#CCCCCC", points: "6,11 10,19 14,11" }))); };
var compassSpan = {
    width: 20,
    height: 20,
    display: 'inline-block'
};
var COMPASS = [0][0];
var POSITIONS = Object.keys(positions);
var RotationControl = (function (_super) {
    __extends(RotationControl, _super);
    function RotationControl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            hover: undefined
        };
        _this.compassIcon = null;
        _this.onMouseOut = function () {
            if (!_this.state.hover) {
                _this.setState({ hover: undefined });
            }
        };
        _this.onMouseIn = function () {
            if (COMPASS !== _this.state.hover) {
                _this.setState({ hover: COMPASS });
            }
        };
        _this.onClickCompass = function () {
            _this.props.map.resetNorth();
        };
        _this.onMapRotate = function () {
            var map = _this.props.map;
            var rotate = "rotate(" + map.transform.angle *
                (180 / Math.PI) + "deg)";
            if (_this.compassIcon) {
                _this.compassIcon.style.transform = rotate;
            }
        };
        _this.assignRef = function (icon) {
            _this.compassIcon = icon;
        };
        return _this;
    }
    RotationControl.prototype.componentDidMount = function () {
        this.props.map.on('rotate', this.onMapRotate);
    };
    RotationControl.prototype.componentWillUnmount = function () {
        this.props.map.off('rotate', this.onMapRotate);
    };
    RotationControl.prototype.render = function () {
        var _a = this.props, position = _a.position, style = _a.style, className = _a.className, tabIndex = _a.tabIndex;
        var hover = this.state.hover;
        var controlStyle = __assign({}, buttonStyle, buttonStyleCompass, (hover === COMPASS ? buttonStyleHovered : {}));
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: className, tabIndex: tabIndex, style: __assign({}, containerStyle, positions[position], style) },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { style: controlStyle, onMouseOver: this.onMouseIn, onMouseOut: this.onMouseOut, onClick: this.onClickCompass },
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", { ref: this.assignRef, style: compassSpan },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](Icon, null)))));
    };
    RotationControl.defaultProps = {
        position: POSITIONS[0]
    };
    return RotationControl;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]));

/* harmony default export */ __webpack_exports__["default"] = (Object(_context__WEBPACK_IMPORTED_MODULE_1__["withMap"])(RotationControl));
//# sourceMappingURL=rotation-control.js.map

/***/ }),

/***/ "./node_modules/react-mapbox-gl/lib-esm/scale-control.js":
/*!***************************************************************!*\
  !*** ./node_modules/react-mapbox-gl/lib-esm/scale-control.js ***!
  \***************************************************************/
/*! exports provided: ScaleControl, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScaleControl", function() { return ScaleControl; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./context */ "./node_modules/react-mapbox-gl/lib-esm/context.js");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};


var scales = [
    0.01,
    0.02,
    0.05,
    0.1,
    0.2,
    0.5,
    1,
    2,
    5,
    10,
    20,
    50,
    100,
    200,
    500,
    1000,
    2 * 1000,
    5 * 1000,
    10 * 1000
];
var positions = {
    'top-right': { top: 10, right: 10, bottom: 'auto', left: 'auto' },
    'top-left': { top: 10, left: 10, bottom: 'auto', right: 'auto' },
    'bottom-right': { bottom: 10, right: 10, top: 'auto', left: 'auto' },
    'bottom-left': { bottom: 10, left: 10, top: 'auto', right: 'auto' }
};
var containerStyle = {
    position: 'absolute',
    zIndex: 10,
    boxShadow: '0px 1px 4px rgba(0, 0, 0, .3)',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    right: 50,
    backgroundColor: '#fff',
    opacity: 0.85,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'baseline',
    padding: '3px 7px'
};
var scaleStyle = {
    border: '2px solid #7e8490',
    boxShadow: '0px 1px 4px rgba(0, 0, 0, .3)',
    borderTop: 'none',
    height: 7,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1
};
var POSITIONS = Object.keys(positions);
var MEASUREMENTS = ['km', 'mi'];
var MILE_IN_KILOMETERS = 1.60934;
var MILE_IN_FEET = 5280;
var KILOMETER_IN_METERS = 1000;
var MIN_WIDTH_SCALE = 60;
var ScaleControl = (function (_super) {
    __extends(ScaleControl, _super);
    function ScaleControl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            chosenScale: 0,
            scaleWidth: MIN_WIDTH_SCALE
        };
        _this.setScale = function () {
            var _a = _this.props, measurement = _a.measurement, map = _a.map;
            var clientWidth = map._canvas.clientWidth;
            var _b = map.getBounds(), _ne = _b._ne, _sw = _b._sw;
            var totalWidth = _this._getDistanceTwoPoints([_sw.lng, _ne.lat], [_ne.lng, _ne.lat], measurement);
            var relativeWidth = totalWidth / clientWidth * MIN_WIDTH_SCALE;
            var chosenScale = scales.reduce(function (acc, curr) {
                if (!acc && curr > relativeWidth) {
                    return curr;
                }
                return acc;
            }, 0);
            var scaleWidth = chosenScale / totalWidth * clientWidth;
            _this.setState({
                chosenScale: chosenScale,
                scaleWidth: scaleWidth
            });
        };
        return _this;
    }
    ScaleControl.prototype.componentWillMount = function () {
        this.setScale();
        this.props.map.on('zoomend', this.setScale);
    };
    ScaleControl.prototype.componentWillUnmount = function () {
        if (this.props.map) {
            this.props.map.off('zoomend', this.setScale);
        }
    };
    ScaleControl.prototype._getDistanceTwoPoints = function (x, y, measurement) {
        if (measurement === void 0) { measurement = 'km'; }
        var lng1 = x[0], lat1 = x[1];
        var lng2 = y[0], lat2 = y[1];
        var R = measurement === 'km' ? 6371 : 6371 / MILE_IN_KILOMETERS;
        var dLat = this._deg2rad(lat2 - lat1);
        var dLng = this._deg2rad(lng2 - lng1);
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this._deg2rad(lat1)) *
                Math.cos(this._deg2rad(lat2)) *
                Math.sin(dLng / 2) *
                Math.sin(dLng / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        return d;
    };
    ScaleControl.prototype._deg2rad = function (deg) {
        return deg * (Math.PI / 180);
    };
    ScaleControl.prototype._displayMeasurement = function (measurement, chosenScale) {
        if (chosenScale >= 1) {
            return chosenScale + " " + measurement;
        }
        if (measurement === 'mi') {
            return Math.floor(chosenScale * MILE_IN_FEET) + " ft";
        }
        return Math.floor(chosenScale * KILOMETER_IN_METERS) + " m";
    };
    ScaleControl.prototype.render = function () {
        var _a = this.props, measurement = _a.measurement, style = _a.style, position = _a.position, className = _a.className, tabIndex = _a.tabIndex;
        var _b = this.state, chosenScale = _b.chosenScale, scaleWidth = _b.scaleWidth;
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { tabIndex: tabIndex, style: __assign({}, containerStyle, positions[position], style), className: className },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { style: __assign({}, scaleStyle, { width: scaleWidth }) }),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { style: { paddingLeft: 10 } }, this._displayMeasurement(measurement, chosenScale))));
    };
    ScaleControl.defaultProps = {
        measurement: MEASUREMENTS[0],
        position: POSITIONS[2]
    };
    return ScaleControl;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]));

/* harmony default export */ __webpack_exports__["default"] = (Object(_context__WEBPACK_IMPORTED_MODULE_1__["withMap"])(ScaleControl));
//# sourceMappingURL=scale-control.js.map

/***/ }),

/***/ "./node_modules/react-mapbox-gl/lib-esm/source.js":
/*!********************************************************!*\
  !*** ./node_modules/react-mapbox-gl/lib-esm/source.js ***!
  \********************************************************/
/*! exports provided: Source, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Source", function() { return Source; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./context */ "./node_modules/react-mapbox-gl/lib-esm/context.js");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};


var Source = (function (_super) {
    __extends(Source, _super);
    function Source() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.id = _this.props.id;
        _this.onStyleDataChange = function () {
            if (!_this.props.map.getLayer(_this.id)) {
                _this.initialize();
                _this.forceUpdate();
            }
        };
        _this.initialize = function () {
            var map = _this.props.map;
            var _a = _this.props, geoJsonSource = _a.geoJsonSource, tileJsonSource = _a.tileJsonSource, onSourceAdded = _a.onSourceAdded;
            if (!map.getSource(_this.id) && (geoJsonSource || tileJsonSource)) {
                if (geoJsonSource) {
                    map.addSource(_this.id, geoJsonSource);
                }
                else if (tileJsonSource) {
                    map.addSource(_this.id, tileJsonSource);
                }
                map.on('sourcedata', _this.onData);
                if (onSourceAdded) {
                    onSourceAdded(map.getSource(_this.id));
                }
            }
        };
        _this.onData = function () {
            var map = _this.props.map;
            var source = map.getSource(_this.props.id);
            if (!source || !map.isSourceLoaded(_this.props.id)) {
                return;
            }
            var onSourceLoaded = _this.props.onSourceLoaded;
            if (source && onSourceLoaded) {
                onSourceLoaded(source);
            }
            if (source && _this.props.geoJsonSource && _this.props.geoJsonSource.data) {
                source.setData(_this.props.geoJsonSource.data);
            }
            map.off('sourcedata', _this.onData);
        };
        return _this;
    }
    Source.prototype.componentWillMount = function () {
        var map = this.props.map;
        map.on('styledata', this.onStyleDataChange);
        this.initialize();
    };
    Source.prototype.removeSource = function () {
        var _this = this;
        var map = this.props.map;
        if (map.getSource(this.id)) {
            var _a = map.getStyle().layers, layers_1 = _a === void 0 ? [] : _a;
            layers_1 = layers_1
                .map(function (layer, idx) {
                var before = (layers_1[idx + 1] || { id: undefined }).id;
                return __assign({}, layer, { before: before });
            })
                .filter(function (layer) { return layer.source === _this.id; });
            layers_1.forEach(function (layer) { return map.removeLayer(layer.id); });
            map.removeSource(this.id);
            return layers_1.reverse();
        }
        return [];
    };
    Source.prototype.componentWillUnmount = function () {
        var map = this.props.map;
        if (!map || !map.getStyle()) {
            return;
        }
        map.off('styledata', this.onStyleDataChange);
        this.removeSource();
    };
    Source.prototype.componentWillReceiveProps = function (props) {
        var _a = this.props, geoJsonSource = _a.geoJsonSource, tileJsonSource = _a.tileJsonSource, map = _a.map;
        if (tileJsonSource && props.tileJsonSource) {
            var hasNewTilesSource = tileJsonSource.url !== props.tileJsonSource.url ||
                tileJsonSource.tiles !== props.tileJsonSource.tiles ||
                tileJsonSource.minzoom !== props.tileJsonSource.minzoom ||
                tileJsonSource.maxzoom !== props.tileJsonSource.maxzoom;
            if (hasNewTilesSource) {
                var layers = this.removeSource();
                map.addSource(this.id, props.tileJsonSource);
                layers.forEach(function (layer) { return map.addLayer(layer, layer.before); });
            }
        }
        if (geoJsonSource &&
            props.geoJsonSource &&
            props.geoJsonSource.data !== geoJsonSource.data &&
            props.geoJsonSource.data &&
            map.getSource(this.id)) {
            var source = map.getSource(this.id);
            source.setData(props.geoJsonSource.data);
        }
    };
    Source.prototype.render = function () {
        return null;
    };
    return Source;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]));

/* harmony default export */ __webpack_exports__["default"] = (Object(_context__WEBPACK_IMPORTED_MODULE_1__["withMap"])(Source));
//# sourceMappingURL=source.js.map

/***/ }),

/***/ "./node_modules/react-mapbox-gl/lib-esm/util/classname.js":
/*!****************************************************************!*\
  !*** ./node_modules/react-mapbox-gl/lib-esm/util/classname.js ***!
  \****************************************************************/
/*! exports provided: getClassName */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getClassName", function() { return getClassName; });
var getClassName = function (defaultClassName, className) {
    return className
        ? className
            .split(' ')
            .concat(defaultClassName)
            .join(' ')
        : defaultClassName.join(' ');
};
//# sourceMappingURL=classname.js.map

/***/ }),

/***/ "./node_modules/react-mapbox-gl/lib-esm/util/diff.js":
/*!***********************************************************!*\
  !*** ./node_modules/react-mapbox-gl/lib-esm/util/diff.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var diff = function (obj1, obj2) {
    var toMutate = {};
    Array.from(new Set(Object.keys(obj1).concat(Object.keys(obj2)))).map(function (key) {
        if (obj1[key] !== obj2[key]) {
            toMutate[key] = obj2[key];
        }
    });
    return toMutate;
};
/* harmony default export */ __webpack_exports__["default"] = (diff);
//# sourceMappingURL=diff.js.map

/***/ }),

/***/ "./node_modules/react-mapbox-gl/lib-esm/util/overlays.js":
/*!***************************************************************!*\
  !*** ./node_modules/react-mapbox-gl/lib-esm/util/overlays.js ***!
  \***************************************************************/
/*! exports provided: anchors, anchorTranslates, overlayState, overlayTransform */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "anchors", function() { return anchors; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "anchorTranslates", function() { return anchorTranslates; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "overlayState", function() { return overlayState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "overlayTransform", function() { return overlayTransform; });
/* harmony import */ var mapbox_gl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mapbox-gl */ "./node_modules/mapbox-gl/dist/mapbox-gl.js");
/* harmony import */ var mapbox_gl__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mapbox_gl__WEBPACK_IMPORTED_MODULE_0__);

var anchors = [
    'center',
    'top',
    'bottom',
    'left',
    'right',
    'top-left',
    'top-right',
    'bottom-left',
    'bottom-right'
];
var anchorTranslates = {
    center: 'translate(-50%, -50%)',
    top: 'translate(-50%, 0)',
    left: 'translate(0, -50%)',
    right: 'translate(-100%, -50%)',
    bottom: 'translate(-50%, -100%)',
    'top-left': 'translate(0, 0)',
    'top-right': 'translate(-100%, 0)',
    'bottom-left': 'translate(0, -100%)',
    'bottom-right': 'translate(-100%, -100%)'
};
var defaultElement = { offsetWidth: 0, offsetHeight: 0 };
var defaultPoint = [0, 0];
var projectCoordinates = function (map, coordinates) {
    return map.project(mapbox_gl__WEBPACK_IMPORTED_MODULE_0__["LngLat"].convert(coordinates));
};
var calculateAnchor = function (map, offsets, position, _a) {
    var _b = _a === void 0 ? defaultElement : _a, offsetHeight = _b.offsetHeight, offsetWidth = _b.offsetWidth;
    var anchor = [];
    if (position.y + offsets.bottom.y - offsetHeight < 0) {
        anchor = [anchors[1]];
    }
    else if (position.y + offsets.top.y + offsetHeight >
        map.transform.height) {
        anchor = [anchors[2]];
    }
    if (position.x < offsetWidth / 2) {
        anchor.push(anchors[3]);
    }
    else if (position.x > map.transform.width - offsetWidth / 2) {
        anchor.push(anchors[4]);
    }
    if (anchor.length === 0) {
        return anchors[2];
    }
    return anchor.join('-');
};
var normalizedOffsets = function (offset) {
    if (!offset) {
        return normalizedOffsets(new mapbox_gl__WEBPACK_IMPORTED_MODULE_0__["Point"](0, 0));
    }
    if (typeof offset === 'number') {
        var cornerOffset = Math.round(Math.sqrt(0.5 * Math.pow(offset, 2)));
        return {
            center: new mapbox_gl__WEBPACK_IMPORTED_MODULE_0__["Point"](offset, offset),
            top: new mapbox_gl__WEBPACK_IMPORTED_MODULE_0__["Point"](0, offset),
            bottom: new mapbox_gl__WEBPACK_IMPORTED_MODULE_0__["Point"](0, -offset),
            left: new mapbox_gl__WEBPACK_IMPORTED_MODULE_0__["Point"](offset, 0),
            right: new mapbox_gl__WEBPACK_IMPORTED_MODULE_0__["Point"](-offset, 0),
            'top-left': new mapbox_gl__WEBPACK_IMPORTED_MODULE_0__["Point"](cornerOffset, cornerOffset),
            'top-right': new mapbox_gl__WEBPACK_IMPORTED_MODULE_0__["Point"](-cornerOffset, cornerOffset),
            'bottom-left': new mapbox_gl__WEBPACK_IMPORTED_MODULE_0__["Point"](cornerOffset, -cornerOffset),
            'bottom-right': new mapbox_gl__WEBPACK_IMPORTED_MODULE_0__["Point"](-cornerOffset, -cornerOffset)
        };
    }
    if (offset instanceof mapbox_gl__WEBPACK_IMPORTED_MODULE_0__["Point"] || Array.isArray(offset)) {
        return anchors.reduce(function (res, anchor) {
            res[anchor] = mapbox_gl__WEBPACK_IMPORTED_MODULE_0__["Point"].convert(offset);
            return res;
        }, {});
    }
    return anchors.reduce(function (res, anchor) {
        res[anchor] = mapbox_gl__WEBPACK_IMPORTED_MODULE_0__["Point"].convert(offset[anchor] || defaultPoint);
        return res;
    }, {});
};
var overlayState = function (props, map, container) {
    var position = projectCoordinates(map, props.coordinates);
    var offsets = normalizedOffsets(props.offset);
    var anchor = props.anchor || calculateAnchor(map, offsets, position, container);
    return {
        anchor: anchor,
        position: position,
        offset: offsets[anchor]
    };
};
var moveTranslate = function (point) {
    return point ? "translate(" + point.x.toFixed(0) + "px, " + point.y.toFixed(0) + "px)" : '';
};
var overlayTransform = function (_a) {
    var anchor = _a.anchor, position = _a.position, offset = _a.offset;
    var res = [];
    if (position) {
        res.push(moveTranslate(position));
    }
    if (offset && offset.x !== undefined && offset.y !== undefined) {
        res.push(moveTranslate(offset));
    }
    if (anchor) {
        res.push(anchorTranslates[anchor]);
    }
    return res;
};
//# sourceMappingURL=overlays.js.map

/***/ }),

/***/ "./node_modules/react-mapbox-gl/lib-esm/util/uid.js":
/*!**********************************************************!*\
  !*** ./node_modules/react-mapbox-gl/lib-esm/util/uid.js ***!
  \**********************************************************/
/*! exports provided: generateID */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateID", function() { return generateID; });
var index = 0;
var generateID = function () {
    return (index += 1);
};
//# sourceMappingURL=uid.js.map

/***/ }),

/***/ "./node_modules/react-mapbox-gl/lib-esm/zoom-control.js":
/*!**************************************************************!*\
  !*** ./node_modules/react-mapbox-gl/lib-esm/zoom-control.js ***!
  \**************************************************************/
/*! exports provided: ZoomControl, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ZoomControl", function() { return ZoomControl; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./context */ "./node_modules/react-mapbox-gl/lib-esm/context.js");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};


var containerStyle = {
    position: 'absolute',
    zIndex: 10,
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0px 1px 4px rgba(0, 0, 0, .3)',
    border: '1px solid rgba(0, 0, 0, 0.1)'
};
var positions = {
    'top-right': { top: 10, right: 10, bottom: 'auto', left: 'auto' },
    'top-left': { top: 10, left: 10, bottom: 'auto', right: 'auto' },
    'bottom-right': { bottom: 10, right: 10, top: 'auto', left: 'auto' },
    'bottom-left': { bottom: 10, left: 10, top: 'auto', right: 'auto' }
};
var buttonStyle = {
    backgroundColor: '#f9f9f9',
    opacity: 0.95,
    transition: 'background-color 0.16s ease-out',
    cursor: 'pointer',
    border: 0,
    height: 26,
    width: 26,
    backgroundImage: "url('https://api.mapbox.com/mapbox.js/v2.4.0/images/icons-000000@2x.png')",
    backgroundPosition: '0px 0px',
    backgroundSize: '26px 260px',
    outline: 0
};
var buttonStyleHovered = {
    backgroundColor: '#fff',
    opacity: 1
};
var buttonStylePlus = {
    borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2
};
var buttonStyleMinus = {
    backgroundPosition: '0px -26px',
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2
};
var _a = [0, 1], PLUS = _a[0], MINUS = _a[1];
var POSITIONS = Object.keys(positions);
var ZoomControl = (function (_super) {
    __extends(ZoomControl, _super);
    function ZoomControl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            hover: undefined
        };
        _this.onMouseOut = function () {
            _this.setState({ hover: undefined });
        };
        _this.plusOver = function () {
            if (PLUS !== _this.state.hover) {
                _this.setState({ hover: PLUS });
            }
        };
        _this.minusOver = function () {
            if (MINUS !== _this.state.hover) {
                _this.setState({ hover: MINUS });
            }
        };
        _this.onClickPlus = function () {
            _this.props.onControlClick(_this.props.map, _this.props.zoomDiff);
        };
        _this.onClickMinus = function () {
            _this.props.onControlClick(_this.props.map, -_this.props.zoomDiff);
        };
        return _this;
    }
    ZoomControl.prototype.render = function () {
        var _a = this.props, position = _a.position, style = _a.style, className = _a.className, tabIndex = _a.tabIndex;
        var hover = this.state.hover;
        var plusStyle = __assign({}, buttonStyle, buttonStylePlus, (hover === PLUS ? buttonStyleHovered : {}));
        var minusStyle = __assign({}, buttonStyle, buttonStyleMinus, (hover === MINUS ? buttonStyleHovered : {}));
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: className, tabIndex: tabIndex, style: __assign({}, containerStyle, positions[position], style) },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { id: "zoomIn", type: "button", style: plusStyle, "aria-label": "Zoom in", onMouseOver: this.plusOver, onMouseOut: this.onMouseOut, onClick: this.onClickPlus }),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { id: "zoomOut", type: "button", style: minusStyle, "aria-label": "Zoom out", onMouseOver: this.minusOver, onMouseOut: this.onMouseOut, onClick: this.onClickMinus })));
    };
    ZoomControl.defaultProps = {
        position: POSITIONS[0],
        zoomDiff: 0.5,
        onControlClick: function (map, zoomDiff) {
            map.zoomTo(map.getZoom() + zoomDiff);
        }
    };
    return ZoomControl;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]));

/* harmony default export */ __webpack_exports__["default"] = (Object(_context__WEBPACK_IMPORTED_MODULE_1__["withMap"])(ZoomControl));
//# sourceMappingURL=zoom-control.js.map

/***/ }),

/***/ "./node_modules/supercluster/index.js":
/*!********************************************!*\
  !*** ./node_modules/supercluster/index.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var kdbush = __webpack_require__(/*! kdbush */ "./node_modules/kdbush/src/kdbush.js");

module.exports = supercluster;
module.exports.default = supercluster;

function supercluster(options) {
    return new SuperCluster(options);
}

function SuperCluster(options) {
    this.options = extend(Object.create(this.options), options);
    this.trees = new Array(this.options.maxZoom + 1);
}

SuperCluster.prototype = {
    options: {
        minZoom: 0,   // min zoom to generate clusters on
        maxZoom: 16,  // max zoom level to cluster the points on
        radius: 40,   // cluster radius in pixels
        extent: 512,  // tile extent (radius is calculated relative to it)
        nodeSize: 64, // size of the KD-tree leaf node, affects performance
        log: false,   // whether to log timing info

        // a reduce function for calculating custom cluster properties
        reduce: null, // function (accumulated, props) { accumulated.sum += props.sum; }

        // initial properties of a cluster (before running the reducer)
        initial: function () { return {}; }, // function () { return {sum: 0}; },

        // properties to use for individual points when running the reducer
        map: function (props) { return props; } // function (props) { return {sum: props.my_value}; },
    },

    load: function (points) {
        var log = this.options.log;

        if (log) console.time('total time');

        var timerId = 'prepare ' + points.length + ' points';
        if (log) console.time(timerId);

        this.points = points;

        // generate a cluster object for each point and index input points into a KD-tree
        var clusters = [];
        for (var i = 0; i < points.length; i++) {
            if (!points[i].geometry) {
                continue;
            }
            clusters.push(createPointCluster(points[i], i));
        }
        this.trees[this.options.maxZoom + 1] = kdbush(clusters, getX, getY, this.options.nodeSize, Float32Array);

        if (log) console.timeEnd(timerId);

        // cluster points on max zoom, then cluster the results on previous zoom, etc.;
        // results in a cluster hierarchy across zoom levels
        for (var z = this.options.maxZoom; z >= this.options.minZoom; z--) {
            var now = +Date.now();

            // create a new set of clusters for the zoom and index them with a KD-tree
            clusters = this._cluster(clusters, z);
            this.trees[z] = kdbush(clusters, getX, getY, this.options.nodeSize, Float32Array);

            if (log) console.log('z%d: %d clusters in %dms', z, clusters.length, +Date.now() - now);
        }

        if (log) console.timeEnd('total time');

        return this;
    },

    getClusters: function (bbox, zoom) {
        if (bbox[0] > bbox[2]) {
            var easternHem = this.getClusters([bbox[0], bbox[1], 180, bbox[3]], zoom);
            var westernHem = this.getClusters([-180, bbox[1], bbox[2], bbox[3]], zoom);
            return easternHem.concat(westernHem);
        }

        var tree = this.trees[this._limitZoom(zoom)];
        var ids = tree.range(lngX(bbox[0]), latY(bbox[3]), lngX(bbox[2]), latY(bbox[1]));
        var clusters = [];
        for (var i = 0; i < ids.length; i++) {
            var c = tree.points[ids[i]];
            clusters.push(c.numPoints ? getClusterJSON(c) : this.points[c.id]);
        }
        return clusters;
    },

    getChildren: function (clusterId) {
        var originId = clusterId >> 5;
        var originZoom = clusterId % 32;
        var errorMsg = 'No cluster with the specified id.';

        var index = this.trees[originZoom];
        if (!index) throw new Error(errorMsg);

        var origin = index.points[originId];
        if (!origin) throw new Error(errorMsg);

        var r = this.options.radius / (this.options.extent * Math.pow(2, originZoom - 1));
        var ids = index.within(origin.x, origin.y, r);
        var children = [];
        for (var i = 0; i < ids.length; i++) {
            var c = index.points[ids[i]];
            if (c.parentId === clusterId) {
                children.push(c.numPoints ? getClusterJSON(c) : this.points[c.id]);
            }
        }

        if (children.length === 0) throw new Error(errorMsg);

        return children;
    },

    getLeaves: function (clusterId, limit, offset) {
        limit = limit || 10;
        offset = offset || 0;

        var leaves = [];
        this._appendLeaves(leaves, clusterId, limit, offset, 0);

        return leaves;
    },

    getTile: function (z, x, y) {
        var tree = this.trees[this._limitZoom(z)];
        var z2 = Math.pow(2, z);
        var extent = this.options.extent;
        var r = this.options.radius;
        var p = r / extent;
        var top = (y - p) / z2;
        var bottom = (y + 1 + p) / z2;

        var tile = {
            features: []
        };

        this._addTileFeatures(
            tree.range((x - p) / z2, top, (x + 1 + p) / z2, bottom),
            tree.points, x, y, z2, tile);

        if (x === 0) {
            this._addTileFeatures(
                tree.range(1 - p / z2, top, 1, bottom),
                tree.points, z2, y, z2, tile);
        }
        if (x === z2 - 1) {
            this._addTileFeatures(
                tree.range(0, top, p / z2, bottom),
                tree.points, -1, y, z2, tile);
        }

        return tile.features.length ? tile : null;
    },

    getClusterExpansionZoom: function (clusterId) {
        var clusterZoom = (clusterId % 32) - 1;
        while (clusterZoom < this.options.maxZoom) {
            var children = this.getChildren(clusterId);
            clusterZoom++;
            if (children.length !== 1) break;
            clusterId = children[0].properties.cluster_id;
        }
        return clusterZoom;
    },

    _appendLeaves: function (result, clusterId, limit, offset, skipped) {
        var children = this.getChildren(clusterId);

        for (var i = 0; i < children.length; i++) {
            var props = children[i].properties;

            if (props && props.cluster) {
                if (skipped + props.point_count <= offset) {
                    // skip the whole cluster
                    skipped += props.point_count;
                } else {
                    // enter the cluster
                    skipped = this._appendLeaves(result, props.cluster_id, limit, offset, skipped);
                    // exit the cluster
                }
            } else if (skipped < offset) {
                // skip a single point
                skipped++;
            } else {
                // add a single point
                result.push(children[i]);
            }
            if (result.length === limit) break;
        }

        return skipped;
    },

    _addTileFeatures: function (ids, points, x, y, z2, tile) {
        for (var i = 0; i < ids.length; i++) {
            var c = points[ids[i]];
            tile.features.push({
                type: 1,
                geometry: [[
                    Math.round(this.options.extent * (c.x * z2 - x)),
                    Math.round(this.options.extent * (c.y * z2 - y))
                ]],
                tags: c.numPoints ? getClusterProperties(c) : this.points[c.id].properties
            });
        }
    },

    _limitZoom: function (z) {
        return Math.max(this.options.minZoom, Math.min(z, this.options.maxZoom + 1));
    },

    _cluster: function (points, zoom) {
        var clusters = [];
        var r = this.options.radius / (this.options.extent * Math.pow(2, zoom));

        // loop through each point
        for (var i = 0; i < points.length; i++) {
            var p = points[i];
            // if we've already visited the point at this zoom level, skip it
            if (p.zoom <= zoom) continue;
            p.zoom = zoom;

            // find all nearby points
            var tree = this.trees[zoom + 1];
            var neighborIds = tree.within(p.x, p.y, r);

            var numPoints = p.numPoints || 1;
            var wx = p.x * numPoints;
            var wy = p.y * numPoints;

            var clusterProperties = null;

            if (this.options.reduce) {
                clusterProperties = this.options.initial();
                this._accumulate(clusterProperties, p);
            }

            // encode both zoom and point index on which the cluster originated
            var id = (i << 5) + (zoom + 1);

            for (var j = 0; j < neighborIds.length; j++) {
                var b = tree.points[neighborIds[j]];
                // filter out neighbors that are already processed
                if (b.zoom <= zoom) continue;
                b.zoom = zoom; // save the zoom (so it doesn't get processed twice)

                var numPoints2 = b.numPoints || 1;
                wx += b.x * numPoints2; // accumulate coordinates for calculating weighted center
                wy += b.y * numPoints2;

                numPoints += numPoints2;
                b.parentId = id;

                if (this.options.reduce) {
                    this._accumulate(clusterProperties, b);
                }
            }

            if (numPoints === 1) {
                clusters.push(p);
            } else {
                p.parentId = id;
                clusters.push(createCluster(wx / numPoints, wy / numPoints, id, numPoints, clusterProperties));
            }
        }

        return clusters;
    },

    _accumulate: function (clusterProperties, point) {
        var properties = point.numPoints ?
            point.properties :
            this.options.map(this.points[point.id].properties);

        this.options.reduce(clusterProperties, properties);
    }
};

function createCluster(x, y, id, numPoints, properties) {
    return {
        x: x, // weighted cluster center
        y: y,
        zoom: Infinity, // the last zoom the cluster was processed at
        id: id, // encodes index of the first child of the cluster and its zoom level
        parentId: -1, // parent cluster id
        numPoints: numPoints,
        properties: properties
    };
}

function createPointCluster(p, id) {
    var coords = p.geometry.coordinates;
    return {
        x: lngX(coords[0]), // projected point coordinates
        y: latY(coords[1]),
        zoom: Infinity, // the last zoom the point was processed at
        id: id, // index of the source feature in the original input array
        parentId: -1 // parent cluster id
    };
}

function getClusterJSON(cluster) {
    return {
        type: 'Feature',
        properties: getClusterProperties(cluster),
        geometry: {
            type: 'Point',
            coordinates: [xLng(cluster.x), yLat(cluster.y)]
        }
    };
}

function getClusterProperties(cluster) {
    var count = cluster.numPoints;
    var abbrev =
        count >= 10000 ? Math.round(count / 1000) + 'k' :
        count >= 1000 ? (Math.round(count / 100) / 10) + 'k' : count;
    return extend(extend({}, cluster.properties), {
        cluster: true,
        cluster_id: cluster.id,
        point_count: count,
        point_count_abbreviated: abbrev
    });
}

// longitude/latitude to spherical mercator in [0..1] range
function lngX(lng) {
    return lng / 360 + 0.5;
}
function latY(lat) {
    var sin = Math.sin(lat * Math.PI / 180),
        y = (0.5 - 0.25 * Math.log((1 + sin) / (1 - sin)) / Math.PI);
    return y < 0 ? 0 : y > 1 ? 1 : y;
}

// spherical mercator to longitude/latitude
function xLng(x) {
    return (x - 0.5) * 360;
}
function yLat(y) {
    var y2 = (180 - y * 360) * Math.PI / 180;
    return 360 * Math.atan(Math.exp(y2)) / Math.PI - 90;
}

function extend(dest, src) {
    for (var id in src) dest[id] = src[id];
    return dest;
}

function getX(p) {
    return p.x;
}
function getY(p) {
    return p.y;
}


/***/ }),

/***/ "./pages/where/map.js":
/*!****************************!*\
  !*** ./pages/where/map.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-jsx/style */ "./node_modules/styled-jsx/style.js");
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_mapbox_gl__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-mapbox-gl */ "./node_modules/react-mapbox-gl/lib-esm/index.js");
/* harmony import */ var mapbox_gl_dist_mapbox_gl_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! mapbox-gl/dist/mapbox-gl.css */ "./node_modules/mapbox-gl/dist/mapbox-gl.css");
/* harmony import */ var mapbox_gl_dist_mapbox_gl_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(mapbox_gl_dist_mapbox_gl_css__WEBPACK_IMPORTED_MODULE_3__);
var _jsxFileName = "/home/antony/Progetti/Inglorious Coderz/ingloriouscoderz.github.io/pages/where/map.js";




var Map = Object(react_mapbox_gl__WEBPACK_IMPORTED_MODULE_2__["default"])({
  accessToken: "pk.eyJ1IjoiaWNlb25maXJlIiwiYSI6ImNqbm9rMzdhcDAwNDkzcG80eGM1dm90eHoifQ.pIx6nBmpnin5BOXScG5GUA"
});
var INGLORIOUS_HQ_COORDS = [7.658785500000022, 45.0932463];
var mapStyle = {
  width: '100%',
  height: '100%'
};
/* harmony default export */ __webpack_exports__["default"] = (function () {
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Map, {
    style: "mapbox://styles/mapbox/streets-v8",
    injectCSS: false,
    containerStyle: mapStyle,
    center: INGLORIOUS_HQ_COORDS,
    zoom: [14],
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_mapbox_gl__WEBPACK_IMPORTED_MODULE_2__["Marker"], {
    coordinates: INGLORIOUS_HQ_COORDS,
    anchor: "bottom",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "jsx-4156727340" + " " + "marker",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "jsx-4156727340" + " " + "icon",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 24
    },
    __self: this
  }))), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_mapbox_gl__WEBPACK_IMPORTED_MODULE_2__["ScaleControl"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27
    },
    __self: this
  }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_mapbox_gl__WEBPACK_IMPORTED_MODULE_2__["RotationControl"], {
    style: {
      top: 80
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 28
    },
    __self: this
  }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_mapbox_gl__WEBPACK_IMPORTED_MODULE_2__["ZoomControl"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 29
    },
    __self: this
  }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(styled_jsx_style__WEBPACK_IMPORTED_MODULE_0___default.a, {
    styleId: "4156727340",
    css: ".marker.jsx-4156727340{width:2rem;height:2rem;border-radius:50% 50% 50% 0;box-shadow:-1px 1px 4px rgba(0,0,0,0.5);background:#429aef;-webkit-transform:perspective(40px) rotateX(20deg) rotateZ(-45deg);-ms-transform:perspective(40px) rotateX(20deg) rotateZ(-45deg);transform:perspective(40px) rotateX(20deg) rotateZ(-45deg);-webkit-transform-origin:50% 50%;-ms-transform-origin:50% 50%;transform-origin:50% 50%;margin-bottom:1rem;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;}.icon.jsx-4156727340{width:1.5rem;height:1.5rem;border-radius:50%;box-shadow:0 0 10px rgba(0,0,0,0.5);background:url('/static/icons/android-chrome-192x192.png');background-size:cover;-webkit-transform:rotateZ(45deg);-ms-transform:rotateZ(45deg);transform:rotateZ(45deg);}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FudG9ueS9Qcm9nZXR0aS9Jbmdsb3Jpb3VzIENvZGVyei9pbmdsb3Jpb3VzY29kZXJ6LmdpdGh1Yi5pby9wYWdlcy93aGVyZS9tYXAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBOEJnQixBQUlvQixBQWNFLFdBYkQsRUFjRSxVQWJjLElBY1Ysa0JBQ3FCLE1BZEksOEJBZWdCLFVBZHhDLG1CQUN3Qyw4QkFjckMsc0JBQ0csdUZBQzNCLGtEQWYyQix1RkFDTixtQkFDTiwwRUFDVSxtR0FDSiw2RkFDckIiLCJmaWxlIjoiL2hvbWUvYW50b255L1Byb2dldHRpL0luZ2xvcmlvdXMgQ29kZXJ6L2luZ2xvcmlvdXNjb2RlcnouZ2l0aHViLmlvL3BhZ2VzL3doZXJlL21hcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdE1hcGJveEdsLCB7XG4gIE1hcmtlcixcbiAgU2NhbGVDb250cm9sLFxuICBSb3RhdGlvbkNvbnRyb2wsXG4gIFpvb21Db250cm9sLFxufSBmcm9tICdyZWFjdC1tYXBib3gtZ2wnXG5pbXBvcnQgJ21hcGJveC1nbC9kaXN0L21hcGJveC1nbC5jc3MnXG5cbmNvbnN0IE1hcCA9IFJlYWN0TWFwYm94R2woeyBhY2Nlc3NUb2tlbjogcHJvY2Vzcy5lbnYuTkVYVF9TVEFUSUNfTUFQQk9YX1RPS0VOIH0pXG5cbmNvbnN0IElOR0xPUklPVVNfSFFfQ09PUkRTID0gWzcuNjU4Nzg1NTAwMDAwMDIyLCA0NS4wOTMyNDYzXVxuXG5jb25zdCBtYXBTdHlsZSA9IHsgd2lkdGg6ICcxMDAlJywgaGVpZ2h0OiAnMTAwJScgfVxuXG5leHBvcnQgZGVmYXVsdCAoKSA9PiAoXG4gIDxNYXBcbiAgICBzdHlsZT1cIm1hcGJveDovL3N0eWxlcy9tYXBib3gvc3RyZWV0cy12OFwiXG4gICAgaW5qZWN0Q1NTPXtmYWxzZX1cbiAgICBjb250YWluZXJTdHlsZT17bWFwU3R5bGV9XG4gICAgY2VudGVyPXtJTkdMT1JJT1VTX0hRX0NPT1JEU31cbiAgICB6b29tPXtbMTRdfT5cbiAgICA8TWFya2VyIGNvb3JkaW5hdGVzPXtJTkdMT1JJT1VTX0hRX0NPT1JEU30gYW5jaG9yPVwiYm90dG9tXCI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1hcmtlclwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImljb25cIiAvPlxuICAgICAgPC9kaXY+XG4gICAgPC9NYXJrZXI+XG4gICAgPFNjYWxlQ29udHJvbCAvPlxuICAgIDxSb3RhdGlvbkNvbnRyb2wgc3R5bGU9e3sgdG9wOiA4MCB9fSAvPlxuICAgIDxab29tQ29udHJvbCAvPlxuXG4gICAgPHN0eWxlIGpzeD57YFxuICAgICAgLy8gTk9URTogc2VlIGh0dHBzOi8vY29kZXBlbi5pby9Fc2tvQ3J1ei9wZW4vT1ZnWnFYXG4gICAgICAubWFya2VyIHtcbiAgICAgICAgd2lkdGg6IDJyZW07XG4gICAgICAgIGhlaWdodDogMnJlbTtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNTAlIDUwJSA1MCUgMDtcbiAgICAgICAgYm94LXNoYWRvdzogLTFweCAxcHggNHB4IHJnYmEoMCwgMCwgMCwgMC41KTtcbiAgICAgICAgYmFja2dyb3VuZDogIzQyOWFlZjtcbiAgICAgICAgdHJhbnNmb3JtOiBwZXJzcGVjdGl2ZSg0MHB4KSByb3RhdGVYKDIwZGVnKSByb3RhdGVaKC00NWRlZyk7XG4gICAgICAgIHRyYW5zZm9ybS1vcmlnaW46IDUwJSA1MCU7XG4gICAgICAgIG1hcmdpbi1ib3R0b206IDFyZW07XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgfVxuXG4gICAgICAuaWNvbiB7XG4gICAgICAgIHdpZHRoOiAxLjVyZW07XG4gICAgICAgIGhlaWdodDogMS41cmVtO1xuICAgICAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgICAgIGJveC1zaGFkb3c6IDAgMCAxMHB4IHJnYmEoMCwgMCwgMCwgMC41KTtcbiAgICAgICAgYmFja2dyb3VuZDogdXJsKCcvc3RhdGljL2ljb25zL2FuZHJvaWQtY2hyb21lLTE5MngxOTIucG5nJyk7XG4gICAgICAgIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XG4gICAgICAgIHRyYW5zZm9ybTogcm90YXRlWig0NWRlZyk7XG4gICAgICB9XG4gICAgYH08L3N0eWxlPlxuICA8L01hcD5cbilcbiJdfQ== */\n/*@ sourceURL=/home/antony/Progetti/Inglorious Coderz/ingloriouscoderz.github.io/pages/where/map.js */",
    __self: this
  }));
});
    (function (Component, route) {
      if(!Component) return
      if (false) {}
      module.hot.accept()
      Component.__route = route

      if (module.hot.status() === 'idle') return

      var components = next.router.components
      for (var r in components) {
        if (!components.hasOwnProperty(r)) continue

        if (components[r].Component.__route === route) {
          next.router.update(r, Component)
        }
      }
    })(typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__.default : (module.exports.default || module.exports), "/where/map")
  
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ })

}]);
//# sourceMappingURL=1.js.map