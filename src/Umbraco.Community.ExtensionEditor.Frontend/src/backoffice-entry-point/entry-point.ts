import { UmbEntryPointOnInit } from '@umbraco-cms/backoffice/extension-api';

export const onInit: UmbEntryPointOnInit = async (_host) => {
    console.log("onInit");

    // TODO: Call API endpoint to get the custom extension manifests; load in accordingly.

};
