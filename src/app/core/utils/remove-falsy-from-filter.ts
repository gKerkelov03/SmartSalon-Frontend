import { GeneralFilterInterface } from '../models/general-filter.model';

export const removeFalsyFromFilter = (
	filter: GeneralFilterInterface
): GeneralFilterInterface => {
	type ObjectKey = keyof typeof filter;

	Object.keys(filter).forEach((key: string) => {
		const propertyAcces = key as ObjectKey;
		if (!filter[propertyAcces]) {
			delete filter[propertyAcces];
		}
	});

	return filter;
};
