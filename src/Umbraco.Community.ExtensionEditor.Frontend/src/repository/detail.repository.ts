import { UmbxExtensionDetailModel } from '../types.js';
import { UmbxExtensionEditorDetailServerDataSource } from './detail.server.data-source.js';
import { UMBX_EXTENSION_EDITOR_DETAIL_STORE_CONTEXT } from './detail.store.js';
import { UmbDetailRepositoryBase } from '@umbraco-cms/backoffice/repository';
import type { UmbControllerHost } from '@umbraco-cms/backoffice/controller-api';

export class UmbxExtensionEditorDetailRepository extends UmbDetailRepositoryBase<UmbxExtensionDetailModel> {
    constructor(host: UmbControllerHost) {
        super(host, UmbxExtensionEditorDetailServerDataSource, UMBX_EXTENSION_EDITOR_DETAIL_STORE_CONTEXT);
    }

    override async create(model: UmbxExtensionDetailModel) {
        return super.create(model, null);
    }
}

export default UmbxExtensionEditorDetailRepository;
