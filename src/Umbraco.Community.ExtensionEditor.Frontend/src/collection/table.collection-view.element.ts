import { css, customElement, html, state } from '@umbraco-cms/backoffice/external/lit';
import { UmbLitElement } from '@umbraco-cms/backoffice/lit-element';
import { UMB_COLLECTION_CONTEXT } from '@umbraco-cms/backoffice/collection';
import type { UmbDefaultCollectionContext } from '@umbraco-cms/backoffice/collection';
import type { UmbTableColumn, UmbTableConfig, UmbTableItem } from '@umbraco-cms/backoffice/components';

const elementName = 'umbx-extension-editor-collection-view-table';

@customElement(elementName)
export class UmbxExtensionEditorCollectionViewTableElement extends UmbLitElement {
    @state()
    private _tableConfig: UmbTableConfig = {
        allowSelection: false,
    };

    @state()
    private _tableColumns: Array<UmbTableColumn> = [
        {
            name: this.localize.term('general_name'),
            alias: 'name',
        },
    ];

    @state()
    private _tableItems: Array<UmbTableItem> = [];

    #collectionContext?: UmbDefaultCollectionContext;

    constructor() {
        super();

        this.consumeContext(UMB_COLLECTION_CONTEXT, (instance) => {
            this.#collectionContext = instance;
            this.#observeCollectionItems();
        });
    }

    #observeCollectionItems() {
        if (!this.#collectionContext) return;
        this.observe(this.#collectionContext.items, (items) => this.#createTableItems(items), 'umbCollectionItemsObserver');
    }

    #createTableItems(items: Array<any>) {
        this._tableItems = items.map((item, index) => {
            return {
                id: item.unique,
                icon: 'icon-umbraco',
                data: [
                    {
                        columnAlias: 'name',
                        value: `Extension ${index + 1}`,
                    },
                ],
            };
        });
    }

    override render() {
        return html`
            <umb-table
                .config=${this._tableConfig}
                .columns=${this._tableColumns}
                .items=${this._tableItems}>
            </umb-table>
        `;
    }

    static override styles = [
        css``,
    ];
}

export { UmbxExtensionEditorCollectionViewTableElement as element };

declare global {
    interface HTMLElementTagNameMap {
        [elementName]: UmbxExtensionEditorCollectionViewTableElement;
    }
}
