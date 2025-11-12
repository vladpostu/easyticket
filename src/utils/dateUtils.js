export function invertiData(data) {
    if(!data) return data;

    const parts = data.split("-")
    const [anno, mese, giorno] = parts;

    return `${giorno}/${mese}/${anno}`
}