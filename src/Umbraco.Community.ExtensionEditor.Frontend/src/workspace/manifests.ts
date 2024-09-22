import { ManifestTypes } from '@umbraco-cms/backoffice/extension-registry';
import { UmbSubmitWorkspaceAction } from '@umbraco-cms/backoffice/workspace';

export const manifests: Array<ManifestTypes> = [
    {
        type: 'workspace',
        kind: 'routable',
        alias: 'Umbx.ExtensionEditor.Workspace',
        name: '[Extension Editor] Workspace',
        api: () => import('./workspace.context.js'),
        meta: {
            entityType: 'extension',
        },
    },
    {
        type: 'workspaceAction',
        kind: 'default',
        alias: 'Umbx.ExtensionEditor.WorkspaceAction.Save',
        name: '[Extension Editor] Save Workspace Action',
        api: UmbSubmitWorkspaceAction,
        meta: {
            label: '#buttons_save',
            look: 'primary',
            color: 'positive',
        },
        conditions: [
            {
                alias: 'Umb.Condition.WorkspaceAlias',
                match: 'Umbx.ExtensionEditor.Workspace',
            },
        ],
    }
];
