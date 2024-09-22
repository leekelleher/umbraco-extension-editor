import { customElement, html } from '@umbraco-cms/backoffice/external/lit';
import { UmbLitElement } from '@umbraco-cms/backoffice/lit-element';

const elementName = 'umbx-extension-editor-collection';

@customElement(elementName)
export class UmbxExtensionEditorCollectionElement extends UmbLitElement {
    override render() {
        return html`
            <umb-body-layout main-no-padding headline="Extension Editor">
                <umb-collection alias="Umbx.ExtensionEditor.Collection"></umb-collection>
            </umb-body-layout>
        `;
    }
}

export { UmbxExtensionEditorCollectionElement as element };

declare global {
    interface HTMLElementTagNameMap {
        [elementName]: UmbxExtensionEditorCollectionElement;
    }
}