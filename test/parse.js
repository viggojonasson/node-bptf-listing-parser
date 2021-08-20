const { assert } = require('chai');
const { parseListing } = require('../dist/index');

describe('Listing Parsing', () => {
    const paintedListing = {
        item: {
            attributes: [
                {
                    defindex: 142,
                    float_value: 5322826,
                },
            ],
        },
    };

    const spelledListing = {
        item: {
            attributes: [
                {
                    defindex: 1005,
                    float_value: 5322826,
                },
            ],
        },
    };

    it('Painted Listing', () => {
        assert.deepEqual(parseListing(paintedListing), {
            parts: [],
            paint: "Noble Hatter's Violet",
            spells: [],
        });
    });

    it('Spelled Listing', () => {
        assert.deepEqual(parseListing(spelledListing), {
            spells: ['Violent Violet Footprints'],
            paint: '',
            parts: [],
        });
    });
});
