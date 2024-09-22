export const manifests = [
    {
        type: 'collection',
        kind: 'default',
        alias: 'Umbx.ExtensionEditor.Collection',
        name: '[Extension Editor] Collection',
        meta: {
            repositoryAlias: 'Umbx.ExtensionEditor.Repository',
        },
    },
    {
        type: 'collectionAction',
        kind: 'button',
        name: '[Extension Editor] Create Collection Action',
        alias: 'Umbx.ExtensionEditor.CollectionAction.Create',
        meta: {
            label: '#general_create',
            href: 'section/settings/workspace/extension/create',
        },
        conditions: [
            {
                alias: 'Umb.Condition.CollectionAlias',
                match: 'Umbx.ExtensionEditor.Collection',
            },
        ],
    },
    {
        type: 'repository',
        alias: 'Umbx.ExtensionEditor.Repository',
        name: '[Extension Editor] Collection Repository',
        api: () => import('./collection.repository.js'),
    },
    {
        type: 'collectionView',
        alias: 'Umbx.ExtensionEditor.CollectionView.Table',
        name: '[Extension Editor] Table Collection View',
        element: () => import('./table.collection-view.element.js'),
        meta: {
            label: 'Table',
            icon: 'icon-list',
            pathName: 'table',
        },
        conditions: [
            {
                alias: 'Umb.Condition.CollectionAlias',
                match: 'Umbx.ExtensionEditor.Collection',
            },
        ],
    },
];
