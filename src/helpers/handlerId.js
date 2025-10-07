export function gerarIdKey() {
    return crypto?.randomUUID?.() ?? Math.random().toString(36).slice(2);
}

export function gerarIdBasic() {
    return parseInt(Math.random() * 1000);
}
