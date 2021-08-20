import { BuyListing, SellListing } from './types/bptf';

import parts from './lib/parts';
import spells from './lib/spells';
import paints from './lib/paints';

export interface ParseResult {
    paint: string;
    spells: string[];
    parts: string[];
}

export const parseListing = (
    listing: BuyListing | SellListing
): ParseResult => {
    const parsed: ParseResult = {
        parts: [],
        paint: '',
        spells: [],
    };

    if (!listing.item.attributes) return parsed;

    for (let i = 0; i < listing.item.attributes.length; i++) {
        const attribute = listing.item.attributes[i];

        if (!attribute.defindex) continue;

        if (attribute.defindex == 142) {
            parsed.paint = paints[attribute.float_value];
        } else if ([380, 382, 384].includes(attribute.defindex)) {
            parsed.parts.push(parts[attribute.float_value]);
        } else if (spells[attribute.defindex]) {
            parsed.spells.push(
                spells[attribute.defindex][attribute.float_value]
            );
        }
    }

    return parsed;
};

export const data = {
    parts,
    spells,
    paints,
};
