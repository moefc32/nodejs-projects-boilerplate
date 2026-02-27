export function stripUUID(uuid) {
    if (!uuid) return null;
    return uuid.replace(/-/g, '');
}

export function parseUUID(stripped) {
    if (!stripped) return null;

    return stripped.replace(
        /^(.{8})(.{4})(.{4})(.{4})(.{12})$/,
        '$1-$2-$3-$4-$5'
    );
}
