export function gerarIdKey() {
    return crypto?.randomUUID?.() ?? Math.random().toString(36).slice(2);
}
