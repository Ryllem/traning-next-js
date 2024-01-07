export const getFetch = async (url: string) => {
    const res = await fetch(url)
    return await res.json()
}

export const postFetch = async (url: string, data: Record<string, string>) => {
    const config = {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data), // le type utilisé pour le corps doit correspondre à l'en-tête "Content-Type"
      };
    const res = await fetch(url, config)
    return await res.json()
}

export const deleteFetch = async (url: string, data: Record<string, string>) => {
    const config = {
        method: "DELETE", // *GET, POST, PUT, DELETE, etc.
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data), // le type utilisé pour le corps doit correspondre à l'en-tête "Content-Type"
      };
    const res = await fetch(url, config)
    return await res.json()
}

