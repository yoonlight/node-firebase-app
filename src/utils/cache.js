import LRU from "lru-cache";

const options = {
	max: 500,
};

export const cache = new LRU(options);
