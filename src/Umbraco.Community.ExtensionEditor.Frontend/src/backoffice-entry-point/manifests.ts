export const manifests = [
    {
        type: "backofficeEntryPoint",
        alias: "Umbx.ExtensionEditor.BackofficeEntryPoint",
        name: "[Extension Editor] Backoffice Entry Point",
        js: () => import("./entry-point.js"),
    }
];
