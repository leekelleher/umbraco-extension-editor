import { tryExecuteAndNotify } from '@umbraco-cms/backoffice/resources';
import { ScriptService } from '@umbraco-cms/backoffice/external/backend-api';
import { UmbxExtensionDetailModel } from '../types.js';
import { UmbServerFilePathUniqueSerializer, appendFileExtensionIfNeeded } from '@umbraco-cms/backoffice/server-file-system';
import type { CreateScriptRequestModel, UpdateScriptRequestModel } from '@umbraco-cms/backoffice/external/backend-api';
import type { UmbControllerHost } from '@umbraco-cms/backoffice/controller-api';
import type { UmbDetailDataSource } from '@umbraco-cms/backoffice/repository';

export class UmbxExtensionEditorDetailServerDataSource implements UmbDetailDataSource<UmbxExtensionDetailModel> {
    #host: UmbControllerHost;
    #serverFilePathUniqueSerializer = new UmbServerFilePathUniqueSerializer();

    constructor(host: UmbControllerHost) {
        this.#host = host;
    }

    async createScaffold(preset: Partial<UmbxExtensionDetailModel> = {}) {
        const data: UmbxExtensionDetailModel = {
            entityType: 'extension',
            unique: '',
            ...preset,
        };

        return { data };
    }

    async create(model: UmbxExtensionDetailModel, parentUnique: string | null = null) {
        if (!model) throw new Error('Data is missing');
        //if (!model.name) throw new Error('Name is missing');

        const parentPath = this.#serverFilePathUniqueSerializer.toServerPath(parentUnique);

        // TODO: make data mapper to prevent errors
        const requestBody: CreateScriptRequestModel = {
            parent: parentPath ? { path: parentPath } : null,
            name: appendFileExtensionIfNeeded('' /*model.name*/, '.js'),
            content: '', //model.content,
        };

        const { data, error } = await tryExecuteAndNotify(this.#host, ScriptService.postScript({ requestBody }));

        if (data) {
            const newPath = decodeURIComponent(data);
            const newPathUnique = this.#serverFilePathUniqueSerializer.toUnique(newPath);
            return this.read(newPathUnique);
        }

        return { error };
    }

    async read(unique: string) {
        if (!unique) throw new Error('Unique is missing');

        const path = this.#serverFilePathUniqueSerializer.toServerPath(unique);
        if (!path) throw new Error('Path is missing');

        const { data, error } = await tryExecuteAndNotify(
            this.#host,
            ScriptService.getScriptByPath({ path: encodeURIComponent(path) }),
        );

        if (error || !data) {
            return { error };
        }

        const script: DataSourceDetailModel = {
            entityType: 'extension',
            unique: this.#serverFilePathUniqueSerializer.toUnique(data.path),
            //name: data.name,
            //content: data.content,
        };

        return { data: script };
    }

    async update(model: DataSourceDetailModel) {
        if (!model.unique) throw new Error('Unique is missing');

        const path = this.#serverFilePathUniqueSerializer.toServerPath(model.unique);
        if (!path) throw new Error('Path is missing');

        const requestBody: UpdateScriptRequestModel = { content: '' /* model.content */ };

        const { error } = await tryExecuteAndNotify(
            this.#host,
            ScriptService.putScriptByPath({ path: encodeURIComponent(path), requestBody }),
        );

        if (!error) {
            return this.read(model.unique);
        }

        return { error };
    }

    async delete(unique: string) {
        if (!unique) throw new Error('Unique is missing');

        const path = this.#serverFilePathUniqueSerializer.toServerPath(unique);
        if (!path) throw new Error('Path is missing');

        return tryExecuteAndNotify(
            this.#host,
            ScriptService.deleteScriptByPath({ path: encodeURIComponent(path) }),
        );
    }
}
