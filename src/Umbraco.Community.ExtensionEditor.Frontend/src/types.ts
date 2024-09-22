export const UMBX_EXTENSION_ENTITY_TYPE = 'extension';

export type UmbxExtensionEntityType = typeof UMBX_EXTENSION_ENTITY_TYPE;

export interface UmbxExtensionDetailModel {
    entityType: UmbxExtensionEntityType;
    unique: string;
}