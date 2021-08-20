# bptf-listing-parser
Parse bptf listings into readable objects containing spells, paints and parts. 

### Parse a listing
```ts
import {parseListing} from 'bptf-listing-parser';

console.log(parseListing({
        item: {
            attributes: [
                {
                    defindex: 142,
                    float_value: 5322826,
                },
            ],
        },
    }));
```
