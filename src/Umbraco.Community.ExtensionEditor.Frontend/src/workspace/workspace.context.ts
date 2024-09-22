import { UmbxExtensionDetailModel } from '../types.js';
import { UmbxExtensionEditorCollectionElement } from './collection.element.js';
import { UmbxExtensionEditorDetailRepository } from '../repository/detail.repository.js';
import { UmbxExtensionEditorWorkspaceElement } from './editor.element.js';
import { UmbContextToken } from '@umbraco-cms/backoffice/context-api';
import { UmbObjectState } from '@umbraco-cms/backoffice/observable-api';
import { UmbSubmittableWorkspaceContextBase, UmbWorkspaceIsNewRedirectController, } from '@umbraco-cms/backoffice/workspace';
import type { UmbSubmittableWorkspaceContext, UmbRoutableWorkspaceContext, UmbWorkspaceContext } from '@umbraco-cms/backoffice/workspace';
import type { UmbControllerHost } from '@umbraco-cms/backoffice/controller-api';

export class UmbxExtensionEditorWorkspaceContext
    extends UmbSubmittableWorkspaceContextBase<UmbxExtensionDetailModel>
    implements UmbSubmittableWorkspaceContext, UmbRoutableWorkspaceContext {

    public readonly repository = new UmbxExtensionEditorDetailRepository(this);

    #data = new UmbObjectState<UmbxExtensionDetailModel | undefined>(undefined);
    readonly data = this.#data.asObservable();

    readonly unique = this.#data.asObservablePart((data) => data?.unique);

    constructor(host: UmbControllerHost) {
        super(host, 'Umbx.ExtensionEditor.Workspace');

        this.routes.setRoutes([
            {
                path: 'create',
                component: UmbxExtensionEditorWorkspaceElement,
                setup: async () => {
                    this.create();
                    new UmbWorkspaceIsNewRedirectController(
                        this,
                        this,
                        this.getHostElement().shadowRoot!.querySelector('umb-router-slot')!,
                    );
                },
            },
            {
                path: 'edit/:unique',
                component: UmbxExtensionEditorWorkspaceElement,
                setup: (_component, info) => {
                    this.removeUmbControllerByAlias('isNewRedirectController');
                    this.load(info.match.params.unique);
                },
            },
            {
                path: '**',
                component: UmbxExtensionEditorCollectionElement,
                setup: (_component) => {
                    this.removeUmbControllerByAlias('isNewRedirectController');
                },
            }
        ]);
    }

    async create() {
        this.resetState();
        const { data } = await this.repository.createScaffold();
        if (!data) return;
        this.setIsNew(true);
        this.#data.update(data);
        return { data };
    }

    async load(unique: string) {
        this.resetState();
        const { data } = await this.repository.requestByUnique(unique);
        if (data) {
            this.setIsNew(false);
            this.#data.update(data);
        }
    }

    getData(): UmbxExtensionDetailModel | undefined {
        throw new Error('Method not implemented.');
    }

    getEntityType = () => 'extension';

    getUnique = () => this.#data.getValue()?.unique;

    protected override resetState() {
        super.resetState();
        this.#data.setValue(undefined);
    }

    protected submit(): Promise<void> {
        return new Promise<void>((resolve) => { console.log('submit'); resolve(); });
    }
}

export { UmbxExtensionEditorWorkspaceContext as api };

export const UMBX_EXTENSION_EDITOR_WORKSPACE_CONTEXT = new UmbContextToken<
    UmbWorkspaceContext,
    UmbxExtensionEditorWorkspaceContext
>(
    'UmbWorkspaceContext',
    undefined,
    (context): context is UmbxExtensionEditorWorkspaceContext => context.getEntityType?.() === 'extension',
);

