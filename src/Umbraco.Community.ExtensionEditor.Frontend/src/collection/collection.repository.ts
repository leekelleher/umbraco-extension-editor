import type { UmbCollectionFilterModel, UmbCollectionRepository } from '@umbraco-cms/backoffice/collection';
import type { UmbControllerHost } from '@umbraco-cms/backoffice/controller-api';
import { UmbRepositoryBase } from '@umbraco-cms/backoffice/repository';

export class UmbxExtensionEditorCollectionRepository extends UmbRepositoryBase implements UmbCollectionRepository {

    constructor(host: UmbControllerHost) {
        super(host);
    }

    async requestCollection(filter: UmbCollectionFilterModel) {
        //console.log('requestCollection', filter);

        const items = [
            { entityType: 'extension', unique: '123' },
            { entityType: 'extension', unique: '456' },
            { entityType: 'extension', unique: '789' },
        ];

        return { data: { items, total: items.length } };
    }
}

export default UmbxExtensionEditorCollectionRepository;
