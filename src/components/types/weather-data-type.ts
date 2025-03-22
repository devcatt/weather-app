export type weatherDataType<T> = {
        main: {
            temp: number
            feels_like: number
        },
        weather: Object | T | Array<Object>
} 