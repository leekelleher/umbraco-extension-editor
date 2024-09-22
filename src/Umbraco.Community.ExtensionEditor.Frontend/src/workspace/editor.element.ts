import { css, customElement, html, state } from '@umbraco-cms/backoffice/external/lit';
import { umbFocus, UmbLitElement } from '@umbraco-cms/backoffice/lit-element';
import { UMBX_EXTENSION_EDITOR_WORKSPACE_CONTEXT } from './workspace.context.js';

import '@umbraco-cms/backoffice/code-editor';

const elementName = 'umbx-extension-editor-workspace';

@customElement(elementName)
export class UmbxExtensionEditorWorkspaceElement extends UmbLitElement {
    @state()
    private _isNew?: boolean;

    #context?: typeof UMBX_EXTENSION_EDITOR_WORKSPACE_CONTEXT.TYPE;

    #code = `import type { UmbBlockDataType, UmbBlockEditorCustomViewElement } from '@umbraco-cms/backoffice/extension-registry';
import { css, customElement, html, property } from '@umbraco-cms/backoffice/external/lit';
import { UmbLitElement } from '@umbraco-cms/backoffice/lit-element';

@customElement('umb-custom-view-test')
export class UmbCustomViewTestElement extends UmbLitElement implements UmbBlockEditorCustomViewElement {
	@property({ attribute: false })
	content?: UmbBlockDataType;

	protected override render() {
		return html\` Hello \${this.content?.headline} \`;
	}

	static override styles = [
		css\`
			:host {
				display: block;
				height: 100%;
				box-sizing: border-box;
				background-color: #dddddd;
				border-radius: 9px;
				padding: 12px;
			}
		\`,
	];
}

export { UmbCustomViewTestElement as element };
`;

    #manifest = `{
    "type": "blockEditorCustomView",
    "alias": "Umb.blockEditorCustomView.TestView",
    "name": "Block Editor Custom View Test",
    "elementName": "umb-custom-view-test",
    "forContentTypeAlias": "elementTypeHeadline",
    "forBlockEditor": "block-grid"
}`;

    constructor() {
        super();

        this.consumeContext(UMBX_EXTENSION_EDITOR_WORKSPACE_CONTEXT, (context) => {
            this.#context = context;

            this.observe(this.#context.isNew, (isNew) => {
                this._isNew = isNew;
            });
        });
    }

    override render() {
        console.log('render', this._isNew);
        return html`
            <umb-workspace-editor
                alias="Umbx.ExtensionEditor.Workspace"
                back-path="section/settings/workspace/extension"}>
                <div slot="header">
                    <uui-input
                        label=${this.localize.term('placeholders_entername')}
                        placeholder=${this.localize.term('placeholders_entername')}
                        value=""
                        ${umbFocus()}>
                    </uui-input>
                </div>
                <div id="main">
                    <uui-box headline="JavaScript">
                        <umb-code-editor language="typescript" .code=${this.#code}></umb-code-editor>
                    </uui-box>
                    <uui-box headline="Manifest">
                        <umb-code-editor language="json" .code=${this.#manifest}></umb-code-editor>
                    </uui-box>
                </div>
            </umb-workspace-editor>
        `;
    }

    static override styles = [
        css`
            :host {
                display: block;
                height: 100%;
            }

            umb-code-editor {
                --editor-height: calc(100dvh - 260px);
            }

            #main {
                display: flex;
                flex-direction: row;
            }

            uui-box {
                --uui-box-default-padding: 0;
                --uui-color-divider-standalone: transparent;

                flex: 1;

                margin: 1rem;
                min-height: calc(100dvh - 260px);
            }

            div[slot=header] {
                width: 100%;
            }

            uui-input {
                width: 100%;
            }
         `,
    ];
}

export { UmbxExtensionEditorWorkspaceElement as element };

declare global {
    interface HTMLElementTagNameMap {
        [elementName]: UmbxExtensionEditorWorkspaceElement;
    }
}