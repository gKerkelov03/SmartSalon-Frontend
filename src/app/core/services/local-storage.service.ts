import { Injectable } from '@angular/core';
import { LocalStorageItem } from '../models/local-storage-item.model';

@Injectable({
    providedIn: 'root',
})
export class LocalStorageService {
    getItem<T extends LocalStorageItem>(key: string): T | LocalStorageItem {
        const valueAsString = localStorage.getItem(key);

        if (valueAsString === null) {
            return null;
        }

        //JSON.parse throws error when passed normal string like 'gosho' or 'javascript'
        try {
            const valueAsObject: Record<string, string | number> =
                JSON.parse(valueAsString);

            return valueAsObject;
        } catch {
            const valueAsNumber = Number.parseFloat(valueAsString);

            if (Number.isNaN(valueAsNumber)) {
                return valueAsString;
            }

            return valueAsNumber;
        }
    }

    setItem(key: string, item: Record<string, any> | number | string): void {
        if (typeof item === 'string') {
            localStorage.setItem(key, item);
        } else {
            localStorage.setItem(key, JSON.stringify(item));
        }
    }

    deleteItem(key: string): void {
        localStorage.removeItem(key);
    }

    clearStorage(): void {
        localStorage.clear();
    }
}
