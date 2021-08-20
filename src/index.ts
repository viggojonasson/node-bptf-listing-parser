import parts from './lib/parts';
import spells from './lib/spells';
import paints from './lib/paints';

export interface ParseResult {
    paint: string;
    spells: string[];
    parts: string[];
}

// BPTF Types from danocmx

export type BuyListing = Listing & {
    item: BuyOrderItem;
    intent: 0;
};

export type SellListing = Listing & {
    item: SellOrderItem;
    intent: 1;
};

export type Listing = {
    id: string;
    steamid: string;
    appid: number;
    currencies: {
        metal: number;
        keys: number;
    };
    offers: number;
    buyout: number;
    details: string;
    created: number;
    bump: number;
    intent: 1 | 0;
    automatic: number;
    count: number;
    promoted: number;
};

export type OrderItem = {
    defindex: number;
    quality: number;
    attributes: Attributes[];
    name: string;
    quantity: string;
};

export type SellOrderItem = OrderItem & {
    id: number;
    original_id: number;
    level: number;
    inventory: number;
    origin: number;
    style: number;
};

export type BuyOrderItem = OrderItem & {
    'user-id': string;
};

export type Attributes = {
    float_value?: number;
    defindex: number;
    value?: number | string;
};

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
