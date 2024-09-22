import { UmbxExtensionDetailModel } from '../types.js';
import { UmbContextToken } from '@umbraco-cms/backoffice/context-api';
import { UmbDetailStoreBase } from '@umbraco-cms/backoffice/store';
import type { UmbControllerHost } from '@umbraco-cms/backoffice/controller-api';

export class UmbxExtensionEditorDetailStore extends UmbDetailStoreBase<UmbxExtensionDetailModel> {
    constructor(host: UmbControllerHost) {
        super(host, UMBX_EXTENSION_EDITOR_DETAIL_STORE_CONTEXT.toString());
    }
}

export default UmbxExtensionEditorDetailStore;


export const UMBX_EXTENSION_EDITOR_DETAIL_STORE_CONTEXT = new UmbContextToken<UmbxExtensionEditorDetailStore>('UmbxExtensionEditorDetailStore');
