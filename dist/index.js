"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.data = exports.parseListing = void 0;
const parts_1 = __importDefault(require("./lib/parts"));
const spells_1 = __importDefault(require("./lib/spells"));
const paints_1 = __importDefault(require("./lib/paints"));
const parseListing = (listing) => {
    const parsed = {
        parts: [],
        paint: '',
        spells: [],
    };
    if (!listing.item.attributes)
        return parsed;
    for (let i = 0; i < listing.item.attributes.length; i++) {
        const attribute = listing.item.attributes[i];
        if (!attribute.defindex)
            continue;
        if (attribute.defindex == 142) {
            parsed.paint = paints_1.default[attribute.float_value];
        }
        else if ([380, 382, 384].includes(attribute.defindex)) {
            parsed.parts.push(parts_1.default[attribute.float_value]);
        }
        else if (spells_1.default[attribute.defindex]) {
            parsed.spells.push(spells_1.default[attribute.defindex][attribute.float_value]);
        }
    }
    return parsed;
};
exports.parseListing = parseListing;
exports.data = {
    parts: parts_1.default,
    spells: spells_1.default,
    paints: paints_1.default,
};
