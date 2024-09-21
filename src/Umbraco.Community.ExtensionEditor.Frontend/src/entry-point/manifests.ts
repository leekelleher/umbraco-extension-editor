export const manifests = [
    {
        type: "backofficeEntryPoint",
        alias: "Umb.ExtensionEditor.BackofficeEntryPoint",
        name: "[Extension Editor] Backoffice Entry Point",
        js: () => import("./entry-point.js"),
    }
];
