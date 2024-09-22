import { ManifestMenuItem } from "@umbraco-cms/backoffice/extension-registry";

export const manifests: Array<ManifestMenuItem> = [
    {
        type: 'menuItem',
        alias: 'Umbx.ExtensionEditor.MenuItem',
        name: '[Extension Editor] Menu Item',
        meta: {
            label: 'Extension Editor',
            icon: 'icon-umbraco',
            entityType: 'extension',
            menus: ['Umb.Menu.AdvancedSettings'],
        },
    },
];