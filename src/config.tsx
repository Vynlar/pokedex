type Config = {
    baseUrl: string,
}

const config: Config = {
    baseUrl: "https://intern-pokedex.myriadapps.com/api",
}

type Theme = {
    colors: {
        brand: string,
        greyLightest: string

    }
}

export const theme: Theme = {
    colors: {
        brand: "rgba(85, 166, 156, 1)",
        greyLightest: "rgba(233, 233, 233, 1)",
    }
}

export default config;