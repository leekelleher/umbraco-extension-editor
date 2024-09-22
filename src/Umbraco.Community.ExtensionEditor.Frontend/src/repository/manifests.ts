export const manifests = [
    {
        type: 'repository',
        alias: 'Umbx.ExtensionEditor.Repository.Detail',
        name: '[Extension Editor] Detail Repository',
        api: () => import('./detail.repository.js'),
    },
    {
        type: 'store',
        alias: 'Umbx.ExtensionEditor.Store.Detail',
        name: '[Extension Editor] Detail Store',
        api: () => import('./detail.store.js'),
    },
];
