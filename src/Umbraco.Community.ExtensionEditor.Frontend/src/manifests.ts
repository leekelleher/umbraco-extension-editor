import { manifests as backofficeEntryPoint } from './backoffice-entry-point/manifests.js';
import { manifests as collection } from './collection/manifests.js';
import { manifests as menuItem } from './menu-item/manifests.js';
import { manifests as repository } from './repository/manifests.js';
import { manifests as workspace } from './workspace/manifests.js';
import type { ManifestTypes } from '@umbraco-cms/backoffice/extension-registry';

export const manifests: Array<ManifestTypes> = [
    ...backofficeEntryPoint,
    ...collection,
    ...menuItem,
    ...repository,
    ...workspace
];
